#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate juniper;

use std::pin::Pin;
use std::sync::Arc;

use anyhow::Result;
use futures::{Future, FutureExt};
use juniper_subscriptions::Coordinator;
use juniper_warp::subscriptions::graphql_subscriptions;
use warp::{http::Method, Filter};

use graphql::Context;

mod db;
mod graphql;
mod models;
mod schema;

pub async fn run() -> Result<()> {
    ::std::env::set_var("RUST_LOG", "warp_server");
    env_logger::init();

    let pool = db::setup()?;
    let schema = graphql::schema();
    let context = graphql::context(pool);

    let state = warp::any().map(move || context.clone());
    let graphql_filter = juniper_warp::make_graphql_filter(schema, state.clone().boxed());

    let coordinator = Arc::new(juniper_subscriptions::Coordinator::new(graphql::schema()));

    let log = warp::log("warp_server");
    log::info!("Listening on 127.0.0.1:3000");

    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(&[Method::GET, Method::POST])
        .allow_headers(vec!["content-type"]);

    let routes = (warp::path("subscriptions")
        .and(warp::ws())
        .and(state.clone())
        .and(warp::any().map(move || Arc::clone(&coordinator)))
        .map(
            |ws: warp::ws::Ws,
             ctx: Context,
             coordinator: Arc<Coordinator<'static, _, _, _, _, _>>| {
                ws.on_upgrade(|websocket| -> Pin<Box<dyn Future<Output = ()> + Send>> {
                    graphql_subscriptions(websocket, coordinator, ctx).boxed()
                })
            },
        )
        .with(log))
    .map(|reply| {
        // TODO#584: remove this workaround
        warp::reply::with_header(reply, "Sec-WebSocket-Protocol", "graphql-ws")
    })
    .or(warp::any()
        .and(warp::path("graphiql"))
        .and(juniper_warp::graphiql_filter("/graphql"))
        .or(warp::path("graphql").and(graphql_filter)))
    .with(cors)
    .with(log);

    warp::serve(routes).run(([127, 0, 0, 1], 3000)).await;

    Ok(())
}
