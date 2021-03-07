const {getProductWithUpdatedPrice} = require("../model/Product");

const outOfStockIndicator = "out of stock";
const inStockIndicator = "in stock";
const excludedBrands = ["Collier"];

function validateProducts(products){
    const validatedProducts = [];

    for (let product of products){
        if (isValidProduct(product)){
            const formattedProduct = convertPriceToUSD(product);
            validatedProducts.push(formattedProduct);
        }
    }

    return validatedProducts;
}

function convertPriceToUSD(product){
    const price = product.price.trim();
    const usdPrice = `$${price} USD`;
    return getProductWithUpdatedPrice(product, usdPrice);
}

function isValidProduct(product){
    return isInStock(product) && !isExcludedBrand(product);
}

function isInStock(product){
    if (null !== product.availability) {
        const productAvailability = product.availability.trim().toLowerCase();
        if (outOfStockIndicator !== productAvailability) {
            if (inStockIndicator !== productAvailability) {
                console.log(`Unexpected product availability ${product.availability} for product with id ${product.id}`);
            }
            return true;
        }
    }

    return false;
}

function isExcludedBrand(product){
    if (null !== product.brand) {
        return excludedBrands.some(brand => product.brand.toLowerCase().includes(brand.toLowerCase()));
    }
    return false;
}

module.exports ={
    //TODO: consider removing exports for all but validateProducts method and refactoring tests
    validateProducts, convertPriceToUSD, isValidProduct, isInStock, isExcludedBrand
}
