use juniper::{FieldError, FieldResult};

use crate::db::Pool;
use crate::models::idea::Idea;
use futures::channel::mpsc;
use futures::channel::mpsc::Sender;
use futures::lock::Mutex;
use futures::{SinkExt, Stream};
use std::pin::Pin;
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
    connection: Pool,
    idea_senders: Arc<Mutex<Vec<Sender<Result<Vec<Idea>, FieldError>>>>>,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::graphql_object(Context = Context)]
impl Query {
    fn ideas(context: &Context) -> FieldResult<Vec<Idea>> {
        let conn = context.connection.get()?;
        Ok(crate::models::idea::Idea::list(&conn)?)
    }
}

pub struct Mutation;

#[juniper::graphql_object(Context = Context)]
impl Mutation {
    async fn create_idea(context: &Context, title: String) -> FieldResult<Idea> {
        let conn = context.connection.get()?;
        let idea = crate::models::idea::Idea::create(&conn, title)?;

        // inform the subscriptions about the new data
        let mut senders = context.idea_senders.lock().await;

        let mut iter = senders.iter_mut();

        loop {
            let next: &mut Sender<Result<Vec<Idea>, FieldError>>;
            match iter.next() {
                Some(val) => next = val,
                None => break,
            };
            next.send(Ok(vec![idea.clone()]))
                .await
                .unwrap_or_else(|_| eprintln!("error sending data to subscriber connection"));
        }
        Ok(idea)
    }
}

type IdeasStream = Pin<Box<dyn Stream<Item = Result<Vec<Idea>, FieldError>> + Send>>;

pub struct Subscription;

#[juniper::graphql_subscription(Context = Context)]
impl Subscription {
    async fn ideas(context: &Context) -> IdeasStream {
        let (mut tx, rx) = mpsc::channel::<Result<Vec<Idea>, FieldError>>(100);
        let conn = context.connection.get()?;
        let ideas = crate::models::idea::Idea::list(&conn)?;
        tx.send(Ok(ideas))
            .await
            .unwrap_or_else(|_| eprintln!("error sending data to subscriber connection"));

        let mut senders = context.idea_senders.lock().await;
        senders.push(tx);

        Box::pin(rx)
    }
}

pub type Schema = juniper::RootNode<'static, Query, Mutation, Subscription>;

pub fn schema() -> Schema {
    Schema::new(Query, Mutation, Subscription)
}

pub fn context(pool: Pool) -> Context {
    Context {
        connection: pool,
        idea_senders: Arc::new(Mutex::new(vec![])),
    }
}
