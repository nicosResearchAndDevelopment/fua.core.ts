const util = exports;

util.sealModule = function (target) {
    Object.freeze(target);
    for (const child of Object.values(target)) {
        if (child instanceof Object) util.sealModule(child);
    }
};

util.zoneOffset = function (date) {
    const
        offset = date.getTimezoneOffset(),
        hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');
    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
};

util.localTime = function (date) {
    const
        hour = date.getHours().toString().padStart(2, '0'),
        minute = date.getMinutes().toString().padStart(2, '0'),
        second = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString().padStart(3, '0');
    return hour + ':' + minute + ':' + second + '.' + millisecond;
};

util.utcTime = function (date) {
    const
        hour = date.getUTCHours().toString().padStart(2, '0'),
        minute = date.getUTCMinutes().toString().padStart(2, '0'),
        second = date.getUTCSeconds().toString().padStart(2, '0'),
        millisecond = date.getUTCMilliseconds().toString().padStart(3, '0');
    return hour + ':' + minute + ':' + second + '.' + millisecond;
};

util.localDate = function (date) {
    const
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
};

util.utcDate = function (date) {
    const
        year = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        day = date.getUTCDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
};

const _durationMatcher = /^(-?)P?(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)[Dd])?T?(?:(\d+)[Hh])?(?:(\d+)[Mm])?(?:(\d+|\d*\.\d+)[Ss])?(?:(\d+?)ms)?$/;

util.matchDuration = function (value) {
    const [match, sign, YYYY, MM, DD, hh, mm, ss_ms, ms] = _durationMatcher.exec(value) || [];
    return match ? {sign, YYYY, MM, DD, hh, mm, ss_ms, ms} : null;
};
