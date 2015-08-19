var Code = require('code'),
    Lab = require('lab'),
    Paper = require('../../index'),
    lab = exports.lab = Lab.script(),
    describe = lab.experiment,
    expect = Code.expect,
    it = lab.it;

function c(template, context) {
    return Paper.compile('template', {template: template}, context);
}

describe('for helper', function() {

    var context = {name: 'Joe'};

    it('should itarate 10 times', function(done) {

        expect(c('{{#for 10 this}}{{$index}}:{{name}} {{/for}}', context))
            .to.contain('1:Joe 2:Joe 3:Joe 4:Joe 5:Joe 6:Joe 7:Joe 8:Joe 9:Joe 10:Joe');

        expect(c('{{#for 1 10 this}}{{$index}}:{{name}} {{/for}}', context))
            .to.contain('1:Joe 2:Joe 3:Joe 4:Joe 5:Joe 6:Joe 7:Joe 8:Joe 9:Joe 10:Joe');

        expect(c('{{#for 0 9 this}}{{$index}}:{{name}} {{/for}}', context))
            .to.contain('0:Joe 1:Joe 2:Joe 3:Joe 4:Joe 5:Joe 6:Joe 7:Joe 8:Joe 9:Joe');

        done();
    });

    it('should throw an error when from is not 0 or 1', function(done) {
        try {
            c('{{#for 7 9 this}}.{{/for}}', context);
        } catch (ex) {
            expect(ex).to.exist();
        }

        try {
            c('{{#for -1 9 this}}.{{/for}}', context);
        } catch (ex) {
            expect(ex).to.exist();
        }

        done();
    });

    it('should not itarate more than 100 times', function(done) {

        expect(c('{{#for 0 3000 this}}.{{/for}}', context).length)
            .to.be.equal(100);

        done();
    });

    it('should render w/o context', function(done) {

        expect(c('{{#for 10}}{{$index}} {{/for}}', context))
            .to.be.equal('1 2 3 4 5 6 7 8 9 10 ');

        expect(c('{{#for 1 10}}{{$index}} {{/for}}', context))
            .to.be.equal('1 2 3 4 5 6 7 8 9 10 ');

        expect(c('{{#for 0 9}}{{$index}} {{/for}}', context))
            .to.be.equal('0 1 2 3 4 5 6 7 8 9 ');

        done();
    });
});
