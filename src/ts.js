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

// const _durationMatcher = /^(-?)P?(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)[Dd])?T?(?:(\d+)[Hh])?(?:(\d+)[Mm])?(?:(\d+|\d*\.\d+)[Ss])?(?:(\d+?)ms)?$/;
// ts.duration = function (value, reference) {
//     if (typeof value === 'number') return value;
//     if (typeof value === 'string') {
//         const [match, sign, YYYY, MM, DD, hh, mm, ss_ms, ms] = _durationMatcher.exec(value) || [];
//         if (!match) throw new Error('expected duration pattern');
//         const
//             date = ts.parse(reference),
//             years = parseInt(YYYY || 0),
//             months = parseInt(MM || 0),
//             days = parseInt(DD || 0),
//             hours = parseInt(hh || 0),
//             minutes = parseInt(mm || 0),
//             seconds = parseInt(ss_ms || 0),
//             milliseconds = 1000 * (parseFloat(ss_ms || 0) - seconds) + parseInt(ms || 0),
//             factor = sign === '-' ? -1 : 1,
//             target = new Date(
//                 date.getFullYear() + factor * years,
//                 date.getMonth() + factor * months,
//                 date.getDate() + factor * days,
//                 date.getHours() + factor * hours,
//                 date.getMinutes() + factor * minutes,
//                 date.getSeconds() + factor * seconds,
//                 date.getMilliseconds() + factor * milliseconds
//             );
//         return target.getTime() - date.getTime();
//     }
//     if (value instanceof Date) {
//         const date = ts.parse(reference);
//         return value.getTime() - date.getTime();
//     }
//     return 0;
// };

// ts.pause = function (value) {
//     const ms = ts.duration(value);
//     return new Promise((resolve) => {
//         if (ms >= 0) setTimeout(resolve, ms);
//         else setImmediate(resolve);
//     });
// };

util.sealModule(ts);
module.exports = ts;
