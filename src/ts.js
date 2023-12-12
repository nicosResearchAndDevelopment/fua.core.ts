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

/** @typedef {Record<'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds', number>} DurationRecord */

/**
 * @param {number | string | Date | DurationRecord} [value]
 * @param {number | string | Date} [reference]
 * @returns {number}
 */
ts.duration = function (value, reference) {
    if (typeof value === 'object') {
        if (!value || (value instanceof Date)) return ts(value) - ts(reference);
        const date   = ts.parse(reference);
        const target = new Date(
            date.getFullYear() + (value.years || 0),
            date.getMonth() + (value.months || 0),
            date.getDate() + (value.days || 0),
            date.getHours() + (value.hours || 0),
            date.getMinutes() + (value.minutes || 0),
            date.getSeconds() + (value.seconds || 0),
            date.getMilliseconds() + (value.milliseconds || 0)
        );
        return target.getTime() - date.getTime();
    } else if (typeof value === 'string') {
        const match = util.matchDuration(value);
        if (!match) return ts(value) - ts(reference);
        const factor = (match.sign === '-') ? -1 : 1;
        const param  = {};
        if (match.YYYY) param.years = factor * parseInt(match.YYYY);
        if (match.MM) param.months = factor * parseInt(match.MM);
        if (match.DD) param.days = factor * parseInt(match.DD);
        if (match.hh) param.hours = factor * parseInt(match.hh);
        if (match.mm) param.minutes = factor * parseInt(match.mm);
        if (match.ss_ms) {
            const ss_ms   = factor * parseFloat(match.ss_ms);
            param.seconds = Math.trunc(ss_ms);
            if (ss_ms !== param.seconds) param.milliseconds = Math.round(1000 * (ss_ms - param.seconds));
        }
        if (match.ms) param.milliseconds = (param.milliseconds || 0) + factor * parseInt(match.ms);
        return ts.duration(param, reference);
    } else {
        return ts(value) - ts(reference);
    }
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
