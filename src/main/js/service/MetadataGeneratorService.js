const {Metadata} = require("../model/Metadata");

function generateMetadata(inputProducts, validatedProducts){
    const totalLines = inputProducts.length;
    const removedProducts = inputProducts.length - validatedProducts.length;
    const productPrices = getPricesFromProducts(validatedProducts);
    const maxPrice = getMaxPrice(productPrices);
    const minPrice = getMinPrice(productPrices);

    return new Metadata(totalLines, removedProducts, maxPrice, minPrice);
}

function getPricesFromProducts(products){
    const prices = [];

    for (let product of products){
        const strippedPrice = product.price.replace(/[^\d.-]/g, '');
        if ("" === strippedPrice || isNaN(strippedPrice)) {
            console.log(`Price ${product.price} for product id ${product.id} does not contain a valid number`)
        } else {
            prices.push(parseFloat(strippedPrice));
        }
    }

    return prices;
}

function getMaxPrice(prices){
    return Math.max(...prices);
}

function getMinPrice(prices){
    return Math.min(...prices);
}

module.exports = {
    generateMetadata, getPricesFromProducts, getMaxPrice, getMinPrice
}
