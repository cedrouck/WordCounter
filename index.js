var MIN_LENGTH = 2;
var REGEXP_WORDS = /[\u00E0-\u00FC\w]+(-[\u00E0-\u00FC\w]+)*/g;

function isWord(pattern, minLength) {
    return typeof pattern == 'string' && pattern.length >= minLength /* && isNaN(pattern) */;
}

function wordCount(text, minLength = MIN_LENGTH) {
    var patterns = [];
    var words = {};

    if (typeof text !== 'string') {
        throw new Error('Error: data is not a string');
    }

    patterns = text.match(REGEXP_WORDS);

    if (typeof patterns === 'object' && patterns) {
        patterns.forEach(pattern => {
            if (isWord(pattern, minLength))
            {
                pattern = pattern.toLowerCase();
                words[pattern] = (words[pattern] || 0) + 1;
            } 
        });
    }

    return words;
}

module.exports = wordCount;