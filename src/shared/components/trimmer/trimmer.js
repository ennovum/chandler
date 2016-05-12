const TRIM_LEFT_REGEX = /^\s*/;
const TRIM_RIGHT_REGEX = /\s*$/;

function trim(text) {
    return trimLeft(trimRight(text));
}

function trimLeft(text) {
    return text.replace(TRIM_LEFT_REGEX, '');
}

function trimRight(text) {
    return text.replace(TRIM_RIGHT_REGEX, '');
}

const trimmer = {trim, trimLeft, trimRight};

export default trimmer;
export {trimmer, trim, trimLeft, trimRight};
