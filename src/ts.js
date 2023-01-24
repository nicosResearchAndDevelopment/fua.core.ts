const
    util = require('./util.js');

const ts = function (value) {
    return ts.parse(value).getTime();
};

ts.parse = function (value) {
    return (value ?? null) === null ? new Date() : new Date(value);
};

ts.unix = function (value) {
    return ts(value) / 1000;
};

ts.unix.rounded = function (value) {
    return Math.round(ts.unix(value))
};

ts.zone = function (value) {
    const date = ts.parse(value);
    return util.zoneOffset(date);
};

ts.zone.offset = function (value) {
    const date = ts.parse(value);
    return -60000 * date.getTimezoneOffset();
};

ts.time = function (value) {
    const date = ts.parse(value);
    return util.localTime(date) + util.zoneOffset(date);
};

ts.time.utc = function (value) {
    const date = ts.parse(value);
    return util.utcTime(date) + 'Z';
};

ts.time.local = function (value) {
    const date = ts.parse(value);
    return util.localTime(date);
};

ts.date = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + util.zoneOffset(date);
};

ts.date.utc = function (value) {
    const date = ts.parse(value);
    return util.utcDate(date) + 'Z';
};

ts.date.local = function (value) {
    const date = ts.parse(value);
    return util.localDate(date);
};

ts.dateTime = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + 'T' + util.localTime(date) + util.zoneOffset(date);
};

ts.dateTime.utc = function (value) {
    const date = ts.parse(value);
    return util.utcDate(date) + 'T' + util.utcTime(date) + 'Z';
};

ts.dateTime.local = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + 'T' + util.localTime(date);
};

ts.duration = function (value, reference) {
    const match = typeof value === 'string' && util.matchDuration(value);
    if (!match) return ts(value) - ts(reference);
    const
        date = ts.parse(reference),
        years = match.YYYY ? parseInt(match.YYYY) : 0,
        months = match.MM ? parseInt(match.MM) : 0,
        days = match.DD ? parseInt(match.DD) : 0,
        hours = match.hh ? parseInt(match.hh) : 0,
        minutes = match.mm ? parseInt(match.mm) : 0,
        seconds = match.ss_ms ? parseInt(match.ss_ms) : 0,
        milliseconds = (match.ss_ms ? 1000 * (parseFloat(match.ss_ms) - seconds) : 0) + (match.ms ? parseInt(match.ms) : 0),
        factor = match.sign === '-' ? -1 : 1,
        target = new Date(
            date.getFullYear() + factor * years,
            date.getMonth() + factor * months,
            date.getDate() + factor * days,
            date.getHours() + factor * hours,
            date.getMinutes() + factor * minutes,
            date.getSeconds() + factor * seconds,
            date.getMilliseconds() + factor * milliseconds
        );
    return target.getTime() - date.getTime();
};

ts.pause = function (value) {
    const delay = typeof value === 'number' ? value : ts.duration(value);
    return new Promise((resolve) => {
        if (delay >= 0) setTimeout(resolve, delay);
        else setImmediate(resolve);
    });
};

util.sealModule(ts);
module.exports = ts;
