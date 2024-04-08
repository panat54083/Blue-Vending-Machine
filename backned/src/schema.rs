diesel::table! {
    products (id) {
        id -> Int4,
        name -> Varchar,
        price -> Double,
        stock -> Int4,
    }
}
