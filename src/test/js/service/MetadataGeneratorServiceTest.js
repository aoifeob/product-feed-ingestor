const assert = require('assert');
const {generateMetadata} = require("../../../main/js/service/MetadataGeneratorService");
const {getPricesFromProducts} = require("../../../main/js/service/MetadataGeneratorService");
const {Product} = require("../../../main/js/model/Product");
const {getMaxPrice} = require("../../../main/js/service/MetadataGeneratorService");
const {getMinPrice} = require("../../../main/js/service/MetadataGeneratorService");

describe('MetadataGeneratorService', function () {

    describe('#generateMetadata()', function () {

        it('should generate metadata for reporting', function () {
            let inputProducts = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "Out Of Stock")]

            let validatedProducts = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "In Stock")]

            const metadata = generateMetadata(inputProducts, validatedProducts);
            assert.equal(metadata.totalRowCount, inputProducts.length);
            assert.equal(metadata.removedRowCount, inputProducts.length - validatedProducts.length);
            assert.equal(metadata.maxPrice, 200.00);
            assert.equal(metadata.minPrice, 15.00);
        });

    });

    describe('#getPricesFromProducts()', function () {

        it('should create an array of prices from product prices', function () {
            let products = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "Out Of Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "Out Of Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "Out Of Stock")]
            let expectedPrices = [100.00, 200.00, 15.00];

            const prices = getPricesFromProducts(products);

            assert.equal(prices.length, expectedPrices.length)
            assert.equal(prices[0], expectedPrices[0]);
            assert.equal(prices[1], expectedPrices[1]);
            assert.equal(prices[2], expectedPrices[2]);
        });

        it('should not include non-number prices when creating the array of prices', function () {
            let products = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "Out Of Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "Out Of Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "1.5.0 USD", "Out Of Stock")]
            let expectedPrices = [100.00, 200.00];

            const prices = getPricesFromProducts(products);

            assert.equal(prices.length, expectedPrices.length)
            assert.equal(prices[0], expectedPrices[0]);
            assert.equal(prices[1], expectedPrices[1]);
        });

    });

    describe('#getMaxPrice()', function () {

        it('should get largest price from array of prices', function () {
            let prices = [100.00, 200.00, 15.00, 1700.00, 2500.00];

            assert.equal(getMaxPrice(prices), 2500.00);
        });

    });

    describe('#getMinPrice()', function () {

        it('should get smallest price from array of prices', function () {
            let prices = [100.00, 200.00, 15.00, 1700.00, 2500.00];

            assert.equal(getMinPrice(prices), 15.00);
        });

    });


});
