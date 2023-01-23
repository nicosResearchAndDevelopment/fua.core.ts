const
    util = require('./util.js');

const time = {};
// const time = function (value) {
//     return util.parseDate(value).getTime();
// };
//
// time.unix = function (value) {
//     // return util.parseDate(value).getTime() / 1000;
//     return time(value) / 1000;
// };
//
// time.unix.rounded = function (value) {
//     return Math.round(time.unix(value))
// };

// time.time = null;
// time.time.local = null;
// time.time.utc = null;
// time.date = null;
// time.dateTime = null;

// time.time = function (value) {
//     const date = util.parseDate(value);
//     return util.stringifyTime(date) + util.stringifyZoneOffset(date);
// };

// time.local = function (value) {
//
// };

// time.utc = function (value) {
//
// };

// TODO

util.sealModule(time);
module.exports = time;
