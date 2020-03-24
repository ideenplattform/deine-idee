use anyhow::Result;
use diesel::{r2d2, SqliteConnection};

pub type Connection = SqliteConnection;
pub type Pool = r2d2::Pool<r2d2::ConnectionManager<Connection>>;

embed_migrations!("./migrations/sqlite");

pub fn setup() -> Result<Pool> {
    let manager = r2d2::ConnectionManager::<SqliteConnection>::new(":memory:");
    let pool = r2d2::Pool::builder().build(manager)?;

    let connection = pool.get()?;
    embedded_migrations::run_with_output(&connection, &mut std::io::stdout())?;

    Ok(pool)
}
