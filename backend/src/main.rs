#[macro_use]
extern crate rocket;

use rocket::serde::{json::Json, Serialize};
use rocket::tokio::time::{sleep, Duration};

use rocket_cors::{AllowedHeaders, AllowedMethods, AllowedOrigins};

use std::str::FromStr;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]

struct GOODS {
    id: i32,
    name: String,
    value: i32,
}

#[get("/")]
fn get_all_goods() -> Json<GOODS> {
    Json(GOODS {
        id: 1,
        name: "test".to_string(),
        value: 1,
    })
}

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/delay/<seconds>")]
async fn delay(seconds: u64) -> String {
    sleep(Duration::from_secs(seconds)).await;
    format!("Waited for {} seconds", seconds)
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
        .mount("/api", routes![index, delay])
        .mount("/", routes![get_all_goods])
        .attach(cors)
        .launch()
        .await?;

    Ok(())
}
