#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

use anyhow::Result;
use warp::{http::Method, Filter};

mod db;
mod graphql;
mod models;
mod schema;

pub async fn run() -> Result<()> {
    ::std::env::set_var("RUST_LOG", "warp_server");
    env_logger::init();

    let pool = db::setup()?;
    let schema = graphql::schema();

    let state = warp::any().map(move || graphql::context(pool.clone()));
    let graphql_filter = juniper_warp::make_graphql_filter(schema, state.boxed());

    let log = warp::log("warp_server");
    log::info!("Listening on 127.0.0.1:3000");

    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(&[Method::GET, Method::POST])
        .allow_headers(vec!["content-type"]);

    warp::serve(
        warp::any()
            .and(warp::path("graphiql"))
            .and(juniper_warp::graphiql_filter("/graphql"))
            .or(warp::path("graphql").and(graphql_filter))
            .with(cors)
            .with(log),
    )
    .run(([127, 0, 0, 1], 3000))
    .await;

    Ok(())
}
