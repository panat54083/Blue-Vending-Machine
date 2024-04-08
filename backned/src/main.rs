#[macro_use]
extern crate rocket;

use backend::establish_connection;
use rocket::serde::{json::Json, Serialize};
use rocket_cors::{AllowedHeaders, AllowedMethods, AllowedOrigins};
use std::str::FromStr;

mod schema;
use schema::products;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct Product2 {
    name: String,
    price: f32,
    stock: u32,
}

#[get("/products")]
fn get_product_stock() -> Json<Vec<Product2>> {
    let connection = &mut establish_connection();
    let results = products.load(connection).expect("Error loading posts");

    println!("Displaying {} posts", results.len());
    for post in results {
        println!("{}", post.title);
        println!("-----------\n");
        println!("{}", post.body);
    }

    // Retrieve product stock information
    let products = vec![
        Product2 {
            name: "Coke".to_string(),
            price: 20.0,
            stock: 5,
        },
        Product2 {
            name: "Chips".to_string(),
            price: 30.0,
            stock: 7,
        },
        Product2 {
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
