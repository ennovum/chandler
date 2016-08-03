import _ from 'lodash';

let TAGSLUG_SPLIT_REGEXP = /\s+/;

function parseTags(tagslug) {
    if (_.isArray(tagslug)) {
        return tagslug;
    }
    if (_.isString(tagslug)) {
        return tagslug.split(TAGSLUG_SPLIT_REGEXP);
    }

    return [];
}

function matchTags(tagslug1, tagslug2) {
    let tags1 = parseTags(tagslug1);
    let tags2 = parseTags(tagslug2);

    for (let i = 0, l = tags1.length; i < l; i++) {
        for (let j = 0, k = tags2.length; j < k; j++) {
            if (tags1[i] === tags2[j]) {
                return true;
            }
        }
    }

    return false;
}

const tagger = {parseTags, matchTags};

export default tagger;
export {tagger, parseTags, matchTags};
