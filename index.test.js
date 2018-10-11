var wordCount = require('./index');
var assert = require('chai').assert;

describe('basic wordscount', function() {
    it('undefined test', function () {
        assert.throws(() => wordCount(), Error);
    });

    it('object test', function () {
        assert.throws(() => wordCount({}), Error);
    });

    it('null test', function () {
        assert.throws(() => wordCount(null), Error);
    });

    it('empty text test', function () {
        assert.isEmpty(wordCount(""));
    });

    it('only one word test', function () {
        assert.propertyVal(wordCount("#balancetaphrase"), 'balancetaphrase', 1);
    });

    it('special chars test', function () {
        assert.isEmpty(wordCount("[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©-_+]*$@"));
    });

    it('consecutive special chars test', function () {
        assert.isEmpty(wordCount("@@@@@@"));
    });

    it('dash word test', function () {
        assert.propertyVal(wordCount("cedric-delfour"), 'cedric-delfour', 1);
    });

    it('numeric test', function () {
        assert.propertyVal(wordCount("1234"), '1234', 1);
    });

    it('consecutive letter test', function () {
        var words = wordCount('cccccccccccccccccccccccccccccccc');

        assert.propertyVal(words, 'cccccccccccccccccccccccccccccccc', 1);
        assert.notProperty(words, 'cc');
        assert.notProperty(words, 'ccc');
    });

    it('quotation test', function () {
        assert.propertyVal(wordCount('De le poudre de perl1 p1-p1'), 'p1-p1', 1);
    });

    it('case unsensitive test', function () {
        assert.propertyVal(wordCount('De de'), 'de', 2);
    });

    it('complete sentence test', function () {
        var txt = "J'aime le jambon, car c'est bon. Voici mon email: jaimelejambon@cest.bon. C'est fiable a 100%. Mon test le dit, alors ça doit être vrai ! J'ai 33 ans (c'est faux)";
        var words = wordCount(txt);

        assert.notProperty(words, 'c');
        assert.propertyVal(words, 'mon', 2);
        assert.propertyVal(words, '33', 1);
        assert.propertyVal(words, 'le', 2);
        assert.propertyVal(words, 'bon', 2);
    });
});