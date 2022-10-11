use actix_web::{get, post, web, HttpResponse};

#[get("/posts")]
async fn find_all() -> Result<HttpResponse, CustomError> {
    let posts = web::block(|| Posts::find_all()).await.unwrap();
    Ok(HttpResponse::Ok().json(posts))
}
#[get("/posts/{id}")]
async fn find(id: web::Path<u32>) -> Result<HttpResponse, CustomError> {
    let post = Posts::find(id.into_inner())?;
    Ok(HttpResponse::Ok().json(post))
}
#[post("/posts")]
async fn create(post: web::Json) -> Result<HttpResponse, CustomError> {
    let post = Posts::create(post.into_inner())?;
    Ok(HttpResponse::Ok().json(post))
}

pub fn init_routes(config: &mut web::ServiceConfig) {
    config.service(find_all);
    config.service(find);
    config.service(create);
    config.service(update);
    config.service(delete);
}
