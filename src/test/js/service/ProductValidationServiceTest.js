const assert = require('assert');
const {validateProducts} = require("../../../main/js/service/ProductValidationService");
const {isValidProduct} = require("../../../main/js/service/ProductValidationService");
const {convertPriceToUSD} = require("../../../main/js/service/ProductValidationService");
const {isExcludedBrand} = require("../../../main/js/service/ProductValidationService");
const {isInStock} = require("../../../main/js/service/ProductValidationService");
const {Product} = require("../../../main/js/model/Product");

describe('ProductValidationService', function () {

    describe('#validateProducts()', function () {

        it('should remove out of stock products from product array', function () {
            let inStockProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            let firstOutOfStockProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            let secondOutOfStockProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "340.00", "out of stock");

            let productList = [inStockProduct, firstOutOfStockProduct, secondOutOfStockProduct];

            let expectedProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$590.00 USD", "in stock");

            let updatedProducts = validateProducts(productList);
            assert.equal(updatedProducts.length, 1);
            assert.equal(updatedProducts[0].id, expectedProduct.id)
            assert.equal(updatedProducts[0].title, expectedProduct.title);
            assert.equal(updatedProducts[0].description, expectedProduct.description);
            assert.equal(updatedProducts[0].link, expectedProduct.link);
            assert.equal(updatedProducts[0].image_link, expectedProduct.image_link);
            assert.equal(updatedProducts[0].brand, expectedProduct.brand);
            assert.equal(updatedProducts[0].price, expectedProduct.price);
            assert.equal(updatedProducts[0].availability, expectedProduct.availability);
        });

        it('should remove Collier products from product array', function () {
            let skilesProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            let firstCollierProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "in stock");
            let secondCollierProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "340.00", "in stock");


            let productList = [firstCollierProduct, secondCollierProduct, skilesProduct];

            let expectedProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$590.00 USD", "in stock");

            let updatedProducts = validateProducts(productList);
            assert.equal(updatedProducts.length, 1);
            assert.equal(updatedProducts[0].id, expectedProduct.id)
            assert.equal(updatedProducts[0].title, expectedProduct.title);
            assert.equal(updatedProducts[0].description, expectedProduct.description);
            assert.equal(updatedProducts[0].link, expectedProduct.link);
            assert.equal(updatedProducts[0].image_link, expectedProduct.image_link);
            assert.equal(updatedProducts[0].brand, expectedProduct.brand);
            assert.equal(updatedProducts[0].price, expectedProduct.price);
            assert.equal(updatedProducts[0].availability, expectedProduct.availability);
        });

        it('should remove Collier products and out of stock products from product array', function () {
            let skilesProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            let firstCollierProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "in stock");
            let secondCollierProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "340.00", "in stock");
            let firstOutOfStockProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            let secondOutOfStockProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "340.00", "out of stock");

            let productList = [firstCollierProduct, secondCollierProduct, skilesProduct, firstOutOfStockProduct, secondOutOfStockProduct];

            let expectedProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$590.00 USD", "in stock");

            let updatedProducts = validateProducts(productList);
            assert.equal(updatedProducts.length, 1);
            assert.equal(updatedProducts[0].id, expectedProduct.id)
            assert.equal(updatedProducts[0].title, expectedProduct.title);
            assert.equal(updatedProducts[0].description, expectedProduct.description);
            assert.equal(updatedProducts[0].link, expectedProduct.link);
            assert.equal(updatedProducts[0].image_link, expectedProduct.image_link);
            assert.equal(updatedProducts[0].brand, expectedProduct.brand);
            assert.equal(updatedProducts[0].price, expectedProduct.price);
            assert.equal(updatedProducts[0].availability, expectedProduct.availability);
        });

        it('should not remove valid products from product array', function () {
            let skilesProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            let creminProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Cremin and Glover", "590.00", "in stock");
            let friesenProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Friesen - Boyer", "590.00", "in stock");

            let productList = [creminProduct, friesenProduct, skilesProduct];

            let expectedSkilesProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$590.00 USD", "in stock");
            let expectedCreminProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Cremin and Glover", "$590.00 USD", "in stock");
            let expectedFriesenProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Friesen - Boyer", "$590.00 USD", "in stock");

            let updatedProducts = validateProducts(productList);
            assert.equal(updatedProducts.length, 3);

            assert.equal(updatedProducts[0].id, expectedCreminProduct.id)
            assert.equal(updatedProducts[0].title, expectedCreminProduct.title);
            assert.equal(updatedProducts[0].description, expectedCreminProduct.description);
            assert.equal(updatedProducts[0].link, expectedCreminProduct.link);
            assert.equal(updatedProducts[0].image_link, expectedCreminProduct.image_link);
            assert.equal(updatedProducts[0].brand, expectedCreminProduct.brand);
            assert.equal(updatedProducts[0].price, expectedCreminProduct.price);
            assert.equal(updatedProducts[0].availability, expectedCreminProduct.availability);

            assert.equal(updatedProducts[1].id, expectedFriesenProduct.id)
            assert.equal(updatedProducts[1].title, expectedFriesenProduct.title);
            assert.equal(updatedProducts[1].description, expectedFriesenProduct.description);
            assert.equal(updatedProducts[1].link, expectedFriesenProduct.link);
            assert.equal(updatedProducts[1].image_link, expectedFriesenProduct.image_link);
            assert.equal(updatedProducts[1].brand, expectedFriesenProduct.brand);
            assert.equal(updatedProducts[1].price, expectedFriesenProduct.price);
            assert.equal(updatedProducts[1].availability, expectedFriesenProduct.availability);

            assert.equal(updatedProducts[2].id, expectedSkilesProduct.id)
            assert.equal(updatedProducts[2].title, expectedSkilesProduct.title);
            assert.equal(updatedProducts[2].description, expectedSkilesProduct.description);
            assert.equal(updatedProducts[2].link, expectedSkilesProduct.link);
            assert.equal(updatedProducts[2].image_link, expectedSkilesProduct.image_link);
            assert.equal(updatedProducts[2].brand, expectedSkilesProduct.brand);
            assert.equal(updatedProducts[2].price, expectedSkilesProduct.price);
            assert.equal(updatedProducts[2].availability, expectedSkilesProduct.availability);
        });

        it('should return empty array if all products are invalid', function () {
            let firstCollierProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "in stock");
            let secondCollierProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "340.00", "in stock");
            let firstOutOfStockProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            let secondOutOfStockProduct = new Product("70396", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "340.00", "out of stock");

            let productList = [firstCollierProduct, secondCollierProduct, firstOutOfStockProduct, secondOutOfStockProduct];

            let updatedProducts = validateProducts(productList);
            assert.equal(updatedProducts.length, 0);
        });

    });

    describe('#convertPriceToUSD()', function () {

        it('should return product with formatted price', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            let expectedProduct = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$590.00 USD", "out of stock");

            let updatedProduct = convertPriceToUSD(product);
            assert.equal(updatedProduct.id, expectedProduct.id);
            assert.equal(updatedProduct.title, expectedProduct.title);
            assert.equal(updatedProduct.description, expectedProduct.description);
            assert.equal(updatedProduct.link, expectedProduct.link);
            assert.equal(updatedProduct.image_link, expectedProduct.image_link);
            assert.equal(updatedProduct.brand, expectedProduct.brand);
            assert.equal(updatedProduct.price, expectedProduct.price);
            assert.equal(updatedProduct.availability, expectedProduct.availability);
        });

    });

    describe('#isValidProduct()', function () {

        it('should return false when product brand is Collier and availability is out of stock', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "out of stock");
            assert.equal(isValidProduct(product), false)
        });

        it('should return false when product brand is not Collier and availability is out of stock', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            assert.equal(isValidProduct(product), false)
        });

        it('should return false when product brand is Collier and availability is not out of stock', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "out of stock");
            assert.equal(isValidProduct(product), false)
        });

        it('should return true when product brand is not Collier and availability is not Collier', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            assert.equal(isValidProduct(product), true)
        });

    });

    describe('#isInStock()', function () {

        it('should return false when product availability is out of stock lowercase', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "out of stock");
            assert.equal(isInStock(product), false)
        });

        it('should return false when product availability is out of stock uppercase', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "OUT OF STOCK");
            assert.equal(isInStock(product), false)
        });

        it('should return false when product availability is out of stock mixed case', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "Out Of Stock");
            assert.equal(isInStock(product), false)
        });

        it('should return false when product availability is out of stock with whitespace', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "   Out Of Stock   ");
            assert.equal(isInStock(product), false)
        });

        it('should return false when product availability is null', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", null);
            assert.equal(isInStock(product), false)
        });

        it('should return true when product availability is in stock', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            assert.equal(isInStock(product), true)
        });

        it('should return true when product availability is not in stock or out of stock', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "stock");
            assert.equal(isInStock(product), true)
        });

    });

    describe('#isExcludedBrand()', function () {

        it('should return true when product brand contains Collier lowercase', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "collier - Fahey", "590.00", "out of stock");
            assert.equal(isExcludedBrand(product), true)
        });

        it('should return true when product brand contains Collier uppercase', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "COLLIER - Fahey", "590.00", "OUT OF STOCK");
            assert.equal(isExcludedBrand(product), true)
        });

        it('should return true when product brand contains Collier mixed case', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "590.00", "Out Of Stock");
            assert.equal(isExcludedBrand(product), true)
        });

        it('should return true when product brand contains Collier at the end of the string', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Collier", "590.00", "out of stock");
            assert.equal(isExcludedBrand(product), true)
        });

        it('should return true when product brand contains Collier in the middle of the string', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Collier - Fahey", "590.00", "out of stock");
            assert.equal(isExcludedBrand(product), true)
        });

        it('should return false when product brand does not contain Collier', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "590.00", "in stock");
            assert.equal(isExcludedBrand(product), false)
        });

        it('should return false when product brand is null', function () {
            let product = new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", null, "590.00", "in stock");
            assert.equal(isExcludedBrand(product), false)
        });

    });

});
