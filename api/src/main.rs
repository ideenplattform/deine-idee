use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    api::run().await?;

    Ok(())
}
