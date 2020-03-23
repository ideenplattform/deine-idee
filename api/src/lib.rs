use juniper::{EmptyMutation, EmptySubscription, FieldResult};
use warp::Filter;

#[derive(juniper::GraphQLObject)]
struct Idea {
    title: String,
}

struct Context {}

impl juniper::Context for Context {}

struct Query;

#[juniper::graphql_object(Context = Context)]
impl Query {
    fn idea(context: &Context, id: String) -> FieldResult<Idea> {
        Ok(Idea {
            title: "Ideenplattform".to_owned(),
        })
    }

    fn ideas(context: &Context) -> FieldResult<Vec<Idea>> {
        Ok(vec![
            Idea {
                title: "Ideenplattform".to_owned(),
            }
        ])
    }
}

type Schema = juniper::RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

pub async fn run() {
    ::std::env::set_var("RUST_LOG", "warp_server");
    env_logger::init();

    let schema = Schema::new(
        Query,
        EmptyMutation::<Context>::new(),
        EmptySubscription::<Context>::new(),
    );

    let state = warp::any().map(move || Context {});
    let graphql_filter = juniper_warp::make_graphql_filter(schema, state.boxed());

    let log = warp::log("warp_server");
    log::info!("Listening on 127.0.0.1:3000");

    warp::serve(
        warp::get()
            .and(warp::path("graphiql"))
            .and(juniper_warp::graphiql_filter("/graphql"))
            .or(warp::path("graphql").and(graphql_filter))
            .or(warp::fs::dir("dist"))
            .with(log),
    )
    .run(([127, 0, 0, 1], 3000))
    .await
}
