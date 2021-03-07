function Product(id, title, description, link, image_link, brand, price, availability) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.link = link;
        this.image_link = image_link;
        this.brand = brand;
        this.price = price;
        this.availability = availability;

}

function getProductWithUpdatedPrice(product, updatedPrice) {
        return new Product(product.id, product.title, product.description, product.link, product.image_link, product.brand, updatedPrice, product.availability);
}

module.exports ={
        Product, getProductWithUpdatedPrice
}
