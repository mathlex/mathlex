(function() {
  var BALANCED_PAIRS, CONSTANT, IDENTIFIER, INVERSES, KEYWORD, LEFT_DELIMS, LEFT_DELIMS_AUTOMATCH, Lexer, NUMBER, RIGHT_DELIMS, RIGHT_DELIMS_AUTOMATCH, SYMBOLS, WHITESPACE, b, j, l, len, r, ref,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
      return this.indexOf(str === 0);
    };
  }

  WHITESPACE = /^[\s]+/;

  NUMBER = /^\d*\.?\d+(?:[Ee][+-]?\d+)?/;

  IDENTIFIER = /^[a-zA-Z][a-zA-Z0-9_]*/;

  CONSTANT = /^#([a-zA-Z0-9]*)/;

  BALANCED_PAIRS = [
    {
      l: 'TLParen',
      r: 'TRParen',
      b: [true, true]
    }, {
      l: 'TLSqBracket',
      r: 'TRSqBracket',
      b: [true, true]
    }, {
      l: 'TLCurlyBrace',
      r: 'TRCurlyBrace',
      b: [true, true]
    }, {
      l: 'TLPipe',
      r: 'TRPipe',
      b: [true, true]
    }, {
      l: 'TLDoublePipe',
      r: 'TRDoublePipe',
      b: [true, true]
    }, {
      l: 'TLVector',
      r: 'TRVector',
      b: [true, true]
    }, {
      l: 'TIntegral',
      r: 'TDifferential',
      b: [true, false]
    }
  ];

  INVERSES = {};

  LEFT_DELIMS = [];

  LEFT_DELIMS_AUTOMATCH = [];

  RIGHT_DELIMS = [];

  RIGHT_DELIMS_AUTOMATCH = [];

  for (j = 0, len = BALANCED_PAIRS.length; j < len; j++) {
    ref = BALANCED_PAIRS[j], l = ref.l, r = ref.r, b = ref.b;
    INVERSES[r] = l;
    INVERSES[l] = r;
    LEFT_DELIMS.push(l);
    if (b[0]) {
      LEFT_DELIMS_AUTOMATCH.push(l);
    }
    RIGHT_DELIMS.push(r);
    if (b[1]) {
      RIGHT_DELIMS_AUTOMATCH.push(r);
    }
  }

  KEYWORD = function(str) {
    switch (str.toLowerCase()) {
      case 'false':
      case 'true':
        return 'TConstant';
      case 'int':
      case 'integral':
        return 'TIntegral';
      case 'lim':
      case 'limit':
        return 'TLimit';
      case 'sum':
        return 'TSum';
      case 'prod':
      case 'product':
        return 'TProduct';
      case 'infty':
      case 'infin':
      case 'infinity':
      case 'oo':
        return 'TInfinity';
      case 'forall':
        return 'TQForall';
      case 'exists':
        return 'TQExists';
      case 'unique':
        return 'TQUnique';
      case 'iff':
        return 'TIff';
      case 'onlyif':
      case 'implies':
        return 'TImplies';
      case 'if':
      case 'impliedby':
      case 'when':
      case 'whenever':
        return 'TIf';
      case 'then':
        return 'TThen';
      case 'and':
        return 'TAnd';
      case 'or':
        return 'TOr';
      case 'xor':
        return 'TXor';
      case 'not':
        return 'TNot';
      case 'equiv':
      case 'equivalent':
        return 'TEquiv';
      case 'nequiv':
      case 'nequivalent':
        return 'TNotEquiv';
      case 'as':
        return 'TRatioEqual';
      case 'congruent':
        return 'TCongruent';
      case 'sim':
      case 'similar':
        return 'TSimilar';
      case 'para':
      case 'parallel':
        return 'TParallel';
      case 'perp':
      case 'perpendicular':
        return 'TPerpendicular';
      case 'subset':
        return 'TSubset';
      case 'psubset':
      case 'propsubset':
      case 'propersubset':
        return 'TPropSubset';
      case 'supset':
      case 'superset':
        return 'TSuperset';
      case 'psuperset':
      case 'psupset':
      case 'propsuperset':
      case 'propsupset':
      case 'propersuperset':
      case 'propersupset':
        return 'TPropSuperset';
      case 'in':
        return 'TIn';
      case 'divides':
        return 'TDivides';
      case 'ndivides':
      case 'notdivides':
      case 'ndivide':
      case 'notdivide':
        return 'TNotDivides';
      case 'union':
        return 'TUnion';
      case 'intersect':
        return 'TIntersect';
      case 'minus':
        return 'TSetDiff';
      case 'choose':
        return 'TChoose';
      case 'mod':
        return 'TModulus';
      default:
        return 'TIdent';
    }
  };

  SYMBOLS = [
    {
      symbol: '<->',
      token: 'TIff'
    }, {
      symbol: '->',
      token: 'TImplies'
    }, {
      symbol: '<-',
      token: 'TIf'
    }, {
      symbol: '&&',
      token: 'TAnd'
    }, {
      symbol: '||',
      token: 'TOr'
    }, {
      symbol: '~',
      token: 'TTilde'
    }, {
      symbol: '<',
      token: 'TLess'
    }, {
      symbol: '<=',
      token: 'TLessEqual'
    }, {
      symbol: '===',
      token: 'TEquiv'
    }, {
      symbol: '!==',
      token: 'TNotEquiv'
    }, {
      symbol: '/==',
      token: 'TNotEquiv'
    }, {
      symbol: '~=',
      token: 'TCongruent'
    }, {
      symbol: '=',
      token: 'TEqual'
    }, {
      symbol: '==',
      token: 'TEqual'
    }, {
      symbol: '!=',
      token: 'TNotEqual'
    }, {
      symbol: '/=',
      token: 'TNotEqual'
    }, {
      symbol: '<>',
      token: 'TNotEqual'
    }, {
      symbol: '::',
      token: 'TRatioEqual'
    }, {
      symbol: '>=',
      token: 'TGreaterEqual'
    }, {
      symbol: '>',
      token: 'TGreater'
    }, {
      symbol: '|',
      token: 'TPipe'
    }, {
      symbol: '~|',
      token: 'TNotDivides'
    }, {
      symbol: '/|',
      token: 'TNotDivides'
    }, {
      symbol: '\\',
      token: 'TSetDiff'
    }, {
      symbol: '+',
      token: 'TPlus'
    }, {
      symbol: '-',
      token: 'TMinus'
    }, {
      symbol: '*',
      token: 'TTimes'
    }, {
      symbol: '/',
      token: 'TDivide'
    }, {
      symbol: '&/',
      token: 'TSlash'
    }, {
      symbol: '&:',
      token: 'TRatio'
    }, {
      symbol: '%',
      token: 'TModulus'
    }, {
      symbol: '^',
      token: 'TExponent'
    }, {
      symbol: '**',
      token: 'TExponent'
    }, {
      symbol: '&^',
      token: 'TSuperscript'
    }, {
      symbol: '&_',
      token: 'TSubscript'
    }, {
      symbol: '!',
      token: 'TBang'
    }, {
      symbol: '\'',
      token: 'TPrime'
    }, {
      symbol: '.',
      token: 'TDotDiff'
    }, {
      symbol: '@',
      token: 'TCompose'
    }, {
      symbol: '@@',
      token: 'TSelfCompose'
    }, {
      symbol: '&Re',
      token: 'TReal'
    }, {
      symbol: '&Im',
      token: 'TImaginary'
    }, {
      symbol: '&pd',
      token: 'TPartial'
    }, {
      symbol: '/&pd',
      token: 'TDivPartial'
    }, {
      symbol: '&d',
      token: 'TDifferential'
    }, {
      symbol: '/&d',
      token: 'TDivDiff'
    }, {
      symbol: '&D',
      token: 'TChangeDelta'
    }, {
      symbol: '&del',
      token: 'TGradient'
    }, {
      symbol: '&grad',
      token: 'TGradient'
    }, {
      symbol: '&del.',
      token: 'TDivergence'
    }, {
      symbol: '&div',
      token: 'TDivergence'
    }, {
      symbol: '&delx',
      token: 'TCurl'
    }, {
      symbol: '&curl',
      token: 'TCurl'
    }, {
      symbol: '&x',
      token: 'TCross'
    }, {
      symbol: '&.',
      token: 'TDot'
    }, {
      symbol: '&w',
      token: 'TWedge'
    }, {
      symbol: '&ox',
      token: 'TTensor'
    }, {
      symbol: '&o+',
      token: 'TDirectSum'
    }, {
      symbol: '&*',
      token: 'TCartesianProduct'
    }, {
      symbol: '&v',
      token: 'TVectorizer'
    }, {
      symbol: '&u',
      token: 'TUnitVectorizer'
    }, {
      symbol: '&pm',
      token: 'TPlusMinus'
    }, {
      symbol: '+/-',
      token: 'TPlusMinus'
    }, {
      symbol: '&mp',
      token: 'TMinusPlus'
    }, {
      symbol: '-/+',
      token: 'TMinusPlus'
    }, {
      symbol: '&Union',
      token: 'TUnion'
    }, {
      symbol: '&Intersect',
      token: 'TIntersect'
    }, {
      symbol: '(',
      token: 'TLParen'
    }, {
      symbol: ')',
      token: 'TRParen'
    }, {
      symbol: '{',
      token: 'TLCurlyBrace'
    }, {
      symbol: '}',
      token: 'TRCurlyBrace'
    }, {
      symbol: '[',
      token: 'TLSqBracket'
    }, {
      symbol: ']',
      token: 'TRSqBracket'
    }, {
      symbol: '[:',
      token: 'TLRangeInclusive'
    }, {
      symbol: ':]',
      token: 'TRRangeInclusive'
    }, {
      symbol: '(:',
      token: 'TLRangeExclusive'
    }, {
      symbol: ':)',
      token: 'TRRangeExclusive'
    }, {
      symbol: '|:',
      token: 'TLPipe'
    }, {
      symbol: ':|',
      token: 'TRPipe'
    }, {
      symbol: '||:',
      token: 'TLDoublePipe'
    }, {
      symbol: ':||',
      token: 'TRDoublePipe'
    }, {
      symbol: '<:',
      token: 'TLVector'
    }, {
      symbol: ':>',
      token: 'TRVector'
    }, {
      symbol: ':',
      token: 'TSuchThat'
    }, {
      symbol: ';',
      token: 'TSemicolon'
    }, {
      symbol: ',',
      token: 'TComma'
    }
  ];

  var Lexer = (function() {
    function Lexer() {}

    Lexer.prototype.tokenize = function(str1) {
      var consumed, i, tok;
      this.str = str1;
      this.delims = [];
      this.tokens = [];
      i = 0;
      while (this.chunk = this.str.slice(i)) {
        if (!(consumed = this.spaceToken() || this.numLiteral() || this.identifierOrKeywordToken() || this.constantToken() || this.opOrSep())) {
          throw SyntaxError;
        }
        i += consumed;
      }
      while (tok = this.delims.pop()) {
        this.token(tok, "auto-ins1-" + tok);
      }
      return this.tokens;
    };

    Lexer.prototype.token = function(tag, val) {
      if (indexOf.call(LEFT_DELIMS_AUTOMATCH, tag) >= 0) {
        this.delims.push(INVERSES[tag]);
      }
      if (indexOf.call(RIGHT_DELIMS, tag) >= 0) {
        this.pair(tag);
      }
      return this.tokens.push([tag, val]);
    };

    Lexer.prototype.spaceToken = function() {
      var match;
      if (!(match = WHITESPACE.exec(this.chunk))) {
        return 0;
      }
      return match[0].length;
    };

    Lexer.prototype.numLiteral = function() {
      var match, number, tag;
      if (!(match = NUMBER.exec(this.chunk))) {
        return 0;
      }
      number = match[0];
      tag = /[\.e]/i.exec(number) ? 'TFloatLit' : 'TIntLit';
      this.token(tag, parseFloat(number));
      return number.length;
    };

    Lexer.prototype.identifierOrKeywordToken = function() {
      var ident, match, tag;
      if (!(match = IDENTIFIER.exec(this.chunk))) {
        return 0;
      }
      ident = match[0];
      tag = KEYWORD(ident);
      this.token(tag, ident);
      return ident.length;
    };

    Lexer.prototype.constantToken = function() {
      var match;
      if (!(match = CONSTANT.exec(this.chunk))) {
        return 0;
      }
      this.token('TConstant', match[1]);
      return match[0].length;
    };

    Lexer.prototype.opOrSep = function() {
      var k, len1, x;
      for (k = 0, len1 = SYMBOLS.length; k < len1; k++) {
        x = SYMBOLS[k];
        if (this.chunk.slice(0, x.symbol.length) !== x.symbol) {
          continue;
        }
        this.token(x.token, x.symbol);
        return x.symbol.length;
      }
    };

    Lexer.prototype.pair = function(tag) {
      var expected, inverse, results;
      if (indexOf.call(this.delims, tag) < 0 && indexOf.call(RIGHT_DELIMS_AUTOMATCH, tag) >= 0) {
        inverse = INVERSES[tag];
        this.tokens.unshift([inverse, "auto-ins2-" + inverse]);
        this.delims.unshift(tag);
      }
      results = [];
      while (this.delims.length > 0 && tag !== (expected = this.delims.pop())) {
        results.push(this.token(expected, "auto-ins3-" + expected));
      }
      return results;
    };

    return Lexer;

  })();
  window.Lexer = Lexer
}).call(this);
