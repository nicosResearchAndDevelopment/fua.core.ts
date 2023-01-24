const
    expect = require('expect'),
    {describe, test} = require('mocha'),
    ts = require('../src/ts.js');

describe('fua.core.ts', function () {

    test.skip('develop', function () {
        console.log(ts);
        console.log(ts.time(NaN));
        console.log(ts.time.utc());
        console.log(ts.time.tz());
    });

    test('should output timestamp in milliseconds', function () {
        expect(typeof ts()).toBe('number');
        expect(ts()).toBeCloseTo(Date.now(), -1);
    });

    test('should accept value in milliseconds, dateString and dateObject', function () {
        expect(ts(Date.now())).toBeCloseTo(Date.now(), -1);
        expect(ts('2001-01-01')).toBeCloseTo(new Date('2001-01-01').getTime(), -1);
        expect(ts(new Date())).toBeCloseTo(Date.now(), -1);
    });

    test('should parse value in milliseconds or dateString into a dateObject', function () {
        expect(ts.parse(1000)).toBeInstanceOf(Date);
        expect(ts.parse('2001-01-01')).toBeInstanceOf(Date);
    });

    describe('unix', function () {

        test('should create the unix time in seconds', function () {
            expect(typeof ts.unix()).toBe('number');
            expect(ts.unix()).toBeCloseTo(Date.now() / 1000, -1);
            expect(ts.unix(Date.now())).toBeCloseTo(Date.now() / 1000, -1);
            expect(ts.unix('2001-01-01')).toBeCloseTo(new Date('2001-01-01').getTime() / 1000, -1);
            expect(ts.unix(new Date())).toBeCloseTo(Date.now() / 1000, -1);
        });

        test('should create rounded unix time in seconds without fraction', function () {
            expect(typeof ts.unix.rounded()).toBe('number');
            expect(Number.isInteger(ts.unix.rounded())).toBeTruthy();
            expect(Number.isInteger(ts.unix('2001-01-01T12:00:00.999'))).toBeFalsy();
            expect(Number.isInteger(ts.unix.rounded('2001-01-01T12:00:00.999'))).toBeTruthy();
        });

    });

    describe('time', function () {

        test('should create a timestamp in xsd time');
        test('should create a timestamp with timezone in xsd time');
        test('should create a utc timestamp in xsd time');

    });

    describe('date', function () {

        test('should create a timestamp in xsd date');
        test('should create a timestamp with timezone in xsd date');
        test('should create a utc timestamp in xsd date');

    });

    describe('dateTime', function () {

        test('should create a timestamp in xsd dateTime');
        test('should create a timestamp with timezone in xsd dateTime');
        test('should create a utc timestamp in xsd dateTime');

    });

    describe('duration', function () {

        test('should parse xsd duration into milliseconds');
        test('should create a duration from ts parameters');
        test('should accept a second argument for reference');
        test('should create a pause promise from a duration');

    });

});
