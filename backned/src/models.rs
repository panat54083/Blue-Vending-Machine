use diesel::prelude::*;


#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::products)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Product {
    pub id: i32,
    name: String,
    price: f64,
    stock: i32,
}
