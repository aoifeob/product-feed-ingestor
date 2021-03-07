const assert = require('assert');
const sinon  = require('sinon');
const {Metadata} = require("../../../main/js/model/Metadata");
const {writeReport} = require("../../../main/js/service/ReportWriterService");

describe('ReportWriterService', function () {

    describe('#writeReport()', function () {

        it('should write metadata report to console', function () {
            let consoleSpy = sinon.spy(console, 'log');

            const metadata = new Metadata('10', '2', '500.00', '200.00');

            writeReport(metadata);

            assert(consoleSpy.calledWith(`Total Row Count: 10\nRemoved Row Count: 2\nMax Price: 500.00\nMin Price: 200.00`));

            consoleSpy.restore();
        });

    });

});
