const assert = require('assert');
const {generateMetadata} = require("../../../main/js/service/MetadataGeneratorService");
const {Product} = require("../../../main/js/model/Product");

describe('MetadataGeneratorService', function () {

    describe('#generateMetadata()', function () {

        it('should generate metadata for reporting', function () {
            let inputProducts = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Collier - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "Out Of Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$1.5.00 USD", "Out Of Stock")]

            let validatedProducts = [new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$100.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$200.00 USD", "In Stock"),
                new Product("70395", "Rustic Plastic Bike", "Pizza", "https://else.name", "http://lorempixel.com/640/480", "Skiles - Fahey", "$15.00 USD", "In Stock")]

            const metadata = generateMetadata(inputProducts, validatedProducts);
            assert.equal(metadata.totalRowCount, 6);
            assert.equal(metadata.removedRowCount, 3);
            assert.equal(metadata.maxPrice, 200.00);
            assert.equal(metadata.minPrice, 15.00);
        });

    });

});
