use anyhow::Result;
use diesel::prelude::*;

use crate::db::Connection;
use crate::schema::ideas;

#[derive(Queryable, juniper::GraphQLObject)]
pub struct Idea {
    pub id: i32,
    pub title: String,
}

#[derive(Insertable, juniper::GraphQLInputObject)]
#[table_name = "ideas"]
pub struct NewIdea {
    pub title: String,
}

impl Idea {
    pub fn create(conn: &Connection, title: String) -> Result<Idea> {
        let new_idea = NewIdea {
            title: title.clone(),
        };

        diesel::insert_into(ideas::table)
            .values(new_idea)
            .execute(conn)?;

        Ok(Idea { id: 1, title })
    }

    pub fn list(conn: &Connection) -> Result<Vec<Idea>> {
        let res = ideas::table.load(conn)?;

        Ok(res)
    }
}
