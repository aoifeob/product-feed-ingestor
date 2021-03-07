const assert = require('assert');
const {processFeed} = require("../../main/js");

describe('index', function () {

    describe('#processFeed()', function () {

        it('should process feed data', function () {

            processFeed(`${__dirname}/commerce-feed.csv.gz`, `${__dirname}/processed.csv.gz`)

        });

    });

});
