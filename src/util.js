exports.sealModule = function sealModule(target) {
    Object.freeze(target);
    for (const child of Object.values(target)) {
        if (child instanceof Object) sealModule(child);
    }
};

exports.zoneOffset = function stringifyZoneOffset(date) {
    const
        offset = date.getTimezoneOffset(),
        hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');
    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
};

exports.localTime = function stringifyLocalTime(date) {
    const
        hour = date.getHours().toString().padStart(2, '0'),
        minute = date.getMinutes().toString().padStart(2, '0'),
        second = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString().padStart(3, '0');
    return hour + ':' + minute + ':' + second + '.' + millisecond;
};

exports.utcTime = function stringifyUTCTime(date) {
    const
        hour = date.getUTCHours().toString().padStart(2, '0'),
        minute = date.getUTCMinutes().toString().padStart(2, '0'),
        second = date.getUTCSeconds().toString().padStart(2, '0'),
        millisecond = date.getUTCMilliseconds().toString().padStart(3, '0');
    return hour + ':' + minute + ':' + second + '.' + millisecond;
};

exports.localDate = function stringifyLocalDate(date) {
    const
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
};

exports.utcDate = function stringifyUTCDate(date) {
    const
        year = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        day = date.getUTCDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
};
