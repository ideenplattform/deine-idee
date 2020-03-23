#![macro_use]
extern crate tokio;

#[tokio::main]
async fn main() {
    server::run().await;
}
