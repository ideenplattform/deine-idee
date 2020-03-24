use juniper::{EmptySubscription, FieldResult};

use crate::db::Pool;
use crate::models::idea::Idea;

pub struct Context {
    connection: Pool,
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
    fn create_idea(context: &Context, title: String) -> FieldResult<Idea> {
        let conn = context.connection.get()?;
        let idea = crate::models::idea::Idea::create(&conn, title)?;

        Ok(idea)
    }
}

pub type Schema = juniper::RootNode<'static, Query, Mutation, EmptySubscription<Context>>;

pub fn schema() -> Schema {
    Schema::new(Query, Mutation, EmptySubscription::<Context>::new())
}

pub fn context(pool: Pool) -> Context {
    Context { connection: pool }
}
