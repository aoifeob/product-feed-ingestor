const assert = require('assert');
const fs = require("fs");
const {transformToProductsFile} = require("../../../main/js/service/CSVTransformerService");

describe('ReportWriterService', function () {

    describe('#transformToProductsFile()', function () {

        it('should transform inputFile into ProductFile', function () {
            let inputFile = fs.createReadStream('../resources/commerce-feed-test.csv.gz');

            let expectedHeaders = 'id,title,description,link,image_link,brand,price,availability';
            let expectedProducts = ['70395,Rustic Plastic Bike,Pizza,https://else.name,http://lorempixel.com/640/480,Skiles - Fahey,590.00,out of stock',
                '83808,Handmade Cotton Fish,Towels,http://dandre.biz,http://lorempixel.com/640/480,Franecki Group,386.00,in stock',
                '85821,Practical Frozen Pants,Pants,https://vickie.net,http://lorempixel.com/640/480,Graham and Sons,200.00,out of stock'];

            let productFile = transformToProductsFile(inputFile);

            assert.equal(productFile.headers, expectedHeaders);
            assert.equal(productFile.products, expectedProducts);
        });

    });

});
