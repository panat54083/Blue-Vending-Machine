#[macro_use]
extern crate rocket;

use rocket::serde::{json::Json, Serialize};
use rocket_cors::{AllowedHeaders, AllowedMethods, AllowedOrigins};
use std::str::FromStr;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct Product {
    name: String,
    price: f32,
    stock: u32,
}

#[get("/products")]
fn get_product_stock() -> Json<Vec<Product>> {
    // Retrieve product stock information
    let products = vec![
        Product {
            name: "Coke".to_string(),
            price: 20.0,
            stock: 5,
        },
        Product {
            name: "Chips".to_string(),
            price: 30.0,
            stock: 7,
        },
        Product {
            name: "Chocolate".to_string(),
            price: 40.0,
            stock: 3,
        },
    ];

    Json(products)
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let allowed_origins = AllowedOrigins::all();
    let allowed_methods: AllowedMethods = ["Get", "Post", "Delete"]
        .iter()
        .map(|s| FromStr::from_str(s).unwrap())
        .collect();

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods,
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS");

    let _rocket = rocket::build()
        .mount("/api/vending-machine", routes![get_product_stock])
        .attach(cors)
        .launch()
        .await?;

    Ok(())
}
