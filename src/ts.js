const
    util = require('./util.js');

/**
 * @param {number | string | Date} [value]
 * @returns {number}
 */
const ts = function (value) {
    return ts.parse(value).getTime();
};

/**
 * @param {number | string | Date} [value]
 * @returns {Date}
 */
ts.parse = function (value) {
    return (value ?? null) === null ? new Date() : new Date(value);
};

/**
 * @param {number | string | Date} [value]
 * @returns {number}
 */
ts.unix = function (value) {
    return ts(value) / 1000;
};

/**
 * @param {number | string | Date} [value]
 * @returns {number}
 */
ts.unix.rounded = function (value) {
    return Math.round(ts.unix(value))
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.zone = function (value) {
    const date = ts.parse(value);
    return util.zoneOffset(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {number}
 */
ts.zone.offset = function (value) {
    const date = ts.parse(value);
    return -60000 * date.getTimezoneOffset();
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.time = function (value) {
    const date = ts.parse(value);
    return util.localTime(date) + util.zoneOffset(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.time.utc = function (value) {
    const date = ts.parse(value);
    return util.utcTime(date) + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.time.local = function (value) {
    const date = ts.parse(value);
    return util.localTime(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.date = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + util.zoneOffset(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.date.utc = function (value) {
    const date = ts.parse(value);
    return util.utcDate(date) + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.date.local = function (value) {
    const date = ts.parse(value);
    return util.localDate(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.dateTime = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + 'T' + util.localTime(date) + util.zoneOffset(date);
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.dateTime.utc = function (value) {
    const date = ts.parse(value);
    return util.utcDate(date) + 'T' + util.utcTime(date) + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 */
ts.dateTime.local = function (value) {
    const date = ts.parse(value);
    return util.localDate(date) + 'T' + util.localTime(date);
};

/**
 * @param {number | string | Date} [value]
 * @param {number | string | Date} [reference]
 * @returns {number}
 */
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

/**
 * @param {number | string | Date} [value]
 * @returns {Promise<void>}
 */
ts.pause = function (value) {
    const delay = typeof value === 'number' ? value : ts.duration(value);
    return new Promise((resolve) => {
        if (delay >= 0) setTimeout(resolve, delay);
        else setImmediate(resolve);
    });
};

util.sealModule(ts);
module.exports = ts;
