const assert = require('assert');
const {getFormattedData} = require("../../../main/js/service/CSVCreatorService");
const {Product} = require("../../../main/js/model/Product");
const {ProductsFile} = require("../../../main/js/model/ProductsFile");

describe('CSVCreatorService', function () {

    describe('#getFormattedData()', function () {

        it('should format product file data into a string', function () {
            let headers = 'id,title,description,link,image_link,brand,price,availability';
            let products = [new Product('70395','Rustic Plastic Bike','Pizza','https://else.name','http://lorempixel.com/640/480','Skiles - Fahey','590.00','out of stock'),
                new Product('83808','Handmade Cotton Fish','Towels','http://dandre.biz','http://lorempixel.com/640/480','Franecki Group','386.00','in stock'),
                new Product('85821','Practical Frozen Pants','Pants','https://vickie.net','http://lorempixel.com/640/480','Graham and Sons','200.00','out of stock')];

            let productFile = new ProductsFile(headers, products);

            let expectedData = 'id,title,description,link,image_link,brand,price,availability\r\n70395,Rustic Plastic Bike,Pizza,https://else.name,http://lorempixel.com/640/480,Skiles - Fahey,590.00,out of stock\r\n83808,Handmade Cotton Fish,Towels,http://dandre.biz,http://lorempixel.com/640/480,Franecki Group,386.00,in stock\r\n85821,Practical Frozen Pants,Pants,https://vickie.net,http://lorempixel.com/640/480,Graham and Sons,200.00,out of stock';

            assert.equal(getFormattedData(productFile), expectedData);
        });

        it('should format product file data with null headers into a string', function () {
            let products = [new Product('70395','Rustic Plastic Bike','Pizza','https://else.name','http://lorempixel.com/640/480','Skiles - Fahey','590.00','out of stock'),
                new Product('83808','Handmade Cotton Fish','Towels','http://dandre.biz','http://lorempixel.com/640/480','Franecki Group','386.00','in stock'),
                new Product('85821','Practical Frozen Pants','Pants','https://vickie.net','http://lorempixel.com/640/480','Graham and Sons','200.00','out of stock')];

            let productFile = new ProductsFile(null, products);

            let expectedData = '\r\n70395,Rustic Plastic Bike,Pizza,https://else.name,http://lorempixel.com/640/480,Skiles - Fahey,590.00,out of stock\r\n83808,Handmade Cotton Fish,Towels,http://dandre.biz,http://lorempixel.com/640/480,Franecki Group,386.00,in stock\r\n85821,Practical Frozen Pants,Pants,https://vickie.net,http://lorempixel.com/640/480,Graham and Sons,200.00,out of stock';

            assert.equal(getFormattedData(productFile), expectedData);
        });

        it('should format product file data with null products into a string', function () {
            let headers = 'id,title,description,link,image_link,brand,price,availability';

            let productFile = new ProductsFile(headers, null);

            let expectedData = 'id,title,description,link,image_link,brand,price,availability';

            assert.equal(getFormattedData(productFile), expectedData);
        });

        it('should format product file data with empty products array into a string', function () {
            let headers = 'id,title,description,link,image_link,brand,price,availability';

            let productFile = new ProductsFile(headers, []);

            let expectedData = 'id,title,description,link,image_link,brand,price,availability';

            assert.equal(getFormattedData(productFile), expectedData);
        });

        it('should return empty string if productFile is null', function () {
            let expectedData = '';

            assert.equal(getFormattedData(null), expectedData);
        });

    });

});
