const {processFeed} = require("../../main/js");

describe('index', function () {

    describe('#processFeed()', function () {

        it('should process feed data', function () {

            processFeed(`${__dirname}/commerce-feed.csv`, `${__dirname}/processed.csv.gz`)

        });

    });

});
