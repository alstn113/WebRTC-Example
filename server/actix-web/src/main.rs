mod posts;

use actix_web::{App, HttpServer};
use dotenv::dotenv;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let host = env::var("HOST").expect("Please set host in .env");
    let port = env::var("PORT").expect("Please set port in .env");
    HttpServer::new(|| App::new().configure(posts::init_routes))
        .bind(format!("{}:{}", host, port))?
        .run()
        .await
}

// run
// cargo watch -x 'run --bin app'
