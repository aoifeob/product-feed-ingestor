const assert = require('assert');
const {transformToProductsFile} = require("../../../main/js/service/CSVTransformerService");
const {Product} = require("../../../main/js/model/Product");

describe('CSVTransformerService', function () {

    describe('#transformToProductsFile()', function () {

        it('should format string into a ProductFile', function () {
            let expectedHeaders = 'id,title,description,link,image_link,brand,price,availability';
            let expectedProducts = [new Product('70395','Rustic Plastic Bike','Pizza','https://else.name','http://lorempixel.com/640/480','Skiles - Fahey','590.00','out of stock'),
                new Product('83808','Handmade Cotton Fish','Towels','http://dandre.biz','http://lorempixel.com/640/480','Franecki Group','386.00','in stock'),
                new Product('85821','Practical Frozen Pants','Pants','https://vickie.net','http://lorempixel.com/640/480','Graham and Sons','200.00','out of stock')];

            let inputString = ['id,title,description,link,image_link,brand,price,availability',
                '70395,Rustic Plastic Bike,Pizza,https://else.name,http://lorempixel.com/640/480,Skiles - Fahey,590.00,out of stock',
                '83808,Handmade Cotton Fish,Towels,http://dandre.biz,http://lorempixel.com/640/480,Franecki Group,386.00,in stock',
                '85821,Practical Frozen Pants,Pants,https://vickie.net,http://lorempixel.com/640/480,Graham and Sons,200.00,out of stock'];

            const productFile = transformToProductsFile(inputString);

            assert.equal(productFile.headers, expectedHeaders)
            assert.equal(productFile.products.length, 3)

            assert.equal(productFile.products[0].id, expectedProducts[0].id)
            assert.equal(productFile.products[0].title, expectedProducts[0].title)
            assert.equal(productFile.products[0].description, expectedProducts[0].description)
            assert.equal(productFile.products[0].link, expectedProducts[0].link)
            assert.equal(productFile.products[0].image_link, expectedProducts[0].image_link)
            assert.equal(productFile.products[0].brand, expectedProducts[0].brand)
            assert.equal(productFile.products[0].price, expectedProducts[0].price)
            assert.equal(productFile.products[0].availability, expectedProducts[0].availability)

            assert.equal(productFile.products[1].id, expectedProducts[1].id)
            assert.equal(productFile.products[1].title, expectedProducts[1].title)
            assert.equal(productFile.products[1].description, expectedProducts[1].description)
            assert.equal(productFile.products[1].link, expectedProducts[1].link)
            assert.equal(productFile.products[1].image_link, expectedProducts[1].image_link)
            assert.equal(productFile.products[1].brand, expectedProducts[1].brand)
            assert.equal(productFile.products[1].price, expectedProducts[1].price)
            assert.equal(productFile.products[1].availability, expectedProducts[1].availability)

            assert.equal(productFile.products[2].id, expectedProducts[2].id)
            assert.equal(productFile.products[2].title, expectedProducts[2].title)
            assert.equal(productFile.products[2].description, expectedProducts[2].description)
            assert.equal(productFile.products[2].link, expectedProducts[2].link)
            assert.equal(productFile.products[2].image_link, expectedProducts[2].image_link)
            assert.equal(productFile.products[2].brand, expectedProducts[2].brand)
            assert.equal(productFile.products[2].price, expectedProducts[2].price)
            assert.equal(productFile.products[2].availability, expectedProducts[2].availability)
        });

    });

});
