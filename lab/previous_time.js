const
    _ = require('./core.util.js');

function _parseDate(value) {
    if (_.isNumber(value)) return new Date(1e3 * value);
    if (value) return new Date(value);
    return new Date();
} // _parseDate

function _stringifyZoneOffset(date) {
    const
        offset = date.getTimezoneOffset(),
        hour   = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');

    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
} // _stringifyZoneOffset

function _stringifyTime(date) {
    const
        hour        = date.getHours().toString().padStart(2, '0'),
        minute      = date.getMinutes().toString().padStart(2, '0'),
        second      = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString().padStart(3, '0');

    return hour + ':' + minute + ':' + second + '.' + millisecond;
} // _stringifyTime

function _stringifyTimeUTC(date) {
    const
        hour        = date.getUTCHours().toString().padStart(2, '0'),
        minute      = date.getUTCMinutes().toString().padStart(2, '0'),
        second      = date.getUTCSeconds().toString().padStart(2, '0'),
        millisecond = date.getUTCMilliseconds().toString().padStart(3, '0');

    return hour + ':' + minute + ':' + second + '.' + millisecond;
} // _stringifyTimeUTC

function _stringifyDate(date) {
    const
        year  = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day   = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
} // _stringifyDate

function _stringifyDateUTC(date) {
    const
        year  = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        day   = date.getUTCDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
} // _stringifyDateUTC

/**
 * @param {boolean} [rounded=false]
 * @returns {number}
 * @see https://en.wikipedia.org/wiki/Unix_time Unix time
 */
exports.unixTime = function (rounded = false) {
    const value = 1e-3 * Date.now();
    return rounded ? Math.round(value) : value;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#time XML Schema - xsd:time
 */
exports.time = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZoneOffset(date);

    return timeStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#time XML Schema - xsd:time
 */
exports.localTime = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTime(date);

    return timeStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#time XML Schema - xsd:time
 */
exports.utcTime = function (value) {
    const
        date    = _parseDate(value),
        timeStr = _stringifyTimeUTC(date);

    return timeStr + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#date XML Schema - xsd:date
 */
exports.date = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        zoneStr = _stringifyZoneOffset(date);

    return dateStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#date XML Schema - xsd:date
 */
exports.localDate = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date);

    return dateStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#date XML Schema - xsd:date
 */
exports.utcDate = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDateUTC(date);

    return dateStr + 'Z';
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime XML Schema - xsd:dateTime
 */
exports.dateTime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        timeStr = _stringifyTime(date),
        zoneStr = _stringifyZoneOffset(date);

    return dateStr + 'T' + timeStr + zoneStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime XML Schema - xsd:dateTime
 */
exports.localDateTime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDate(date),
        timeStr = _stringifyTime(date);

    return dateStr + 'T' + timeStr;
};

/**
 * @param {number | string | Date} [value]
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc3339#section-5.6 RFC 3339 - Internet Date/Time Format
 * @see https://www.w3.org/TR/xmlschema11-2/#dateTime XML Schema - xsd:dateTime
 */
exports.utcDateTime = function (value) {
    const
        date    = _parseDate(value),
        dateStr = _stringifyDateUTC(date),
        timeStr = _stringifyTimeUTC(date);

    return dateStr + 'T' + timeStr + 'Z';
};

const _durationPattern = /^(-?)P?(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)[Dd])?T?(?:(\d+)[Hh])?(?:(\d+)[Mm])?(?:(\d+|\d*\.\d+)[Ss])?(?:(\d+?)ms)?$/;

/**
 * @param {number | string | Date} [value]
 * @param {number | string | Date} [reference]
 * @returns {number}
 */
exports.duration = function (value, reference) {
    if (_.isNumber(value)) return value;
    if (_.isString(value)) {
        const [match, sign, YYYY, MM, DD, hh, mm, ss_ms, ms] = _durationPattern.exec(value) || [];
        if (!match) throw new Error('expected duration pattern');
        const
            date         = _parseDate(reference),
            years        = parseInt(YYYY || 0),
            months       = parseInt(MM || 0),
            days         = parseInt(DD || 0),
            hours        = parseInt(hh || 0),
            minutes      = parseInt(mm || 0),
            seconds      = parseInt(ss_ms || 0),
            milliseconds = 1000 * (parseFloat(ss_ms || 0) - seconds) + parseInt(ms || 0),
            factor       = sign === '-' ? -1 : 1,
            target       = new Date(
                date.getFullYear() + factor * years,
                date.getMonth() + factor * months,
                date.getDate() + factor * days,
                date.getHours() + factor * hours,
                date.getMinutes() + factor * minutes,
                date.getSeconds() + factor * seconds,
                date.getMilliseconds() + factor * milliseconds
            );
        return (target.getTime() - date.getTime()) / 1e3;
    }
    if (_.isDate(value)) {
        const date = _parseDate(reference);
        return (value.getTime() - date.getTime()) / 1e3;
    }
    return 0;
};

/**
 * @param {number | string} value
 * @returns {Promise<void>}
 */
exports.pause = function (value) {
    const seconds = _.duration(value);
    return new Promise((resolve) => {
        if (seconds >= 0) setTimeout(resolve, 1e3 * seconds);
        else setImmediate(resolve);
    });
};
