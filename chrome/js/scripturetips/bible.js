

var STBible = {
  
  
  searchUrl : null,
  searchUrlToken : null,
  
  initted : false,
  tokens : {},
  otBooks : [
    'Genesis',
	'Exodus',
	'Leviticus',
	'Numbers',
	'Deuteronomy',
	'Joshua',
	'Judges',
	'Ruth',
	'1 Samuel',
	'2 Samuel',
	'1 Kings',
	'2 Kings',
	'1 Chronicles',
	'2 Chronicles',
	'Ezra',
	'Nehemiah',
	'Esther',
	'Job',
	'Psalms',
	'Proverbs',
	'Ecclesiastes',
	'Songs',
	'Isaiah',
	'Jeremiah',
	'Lamentations',
	'Ezekiel',
	'Daniel',
	'Hosea',
	'Joel',
	'Amos',
	'Obadiah',
	'Jonah',
	'Micah',
	'Nahum',
	'Habakkuk',
	'Zephaniah',
	'Haggai',
	'Zechariah',
	'Malachi'
  ],
  ntBooks : [
    '1 John',
    '2 John',
    '3 John',
    'Matthew',
    'Mark',
    'Luke',
    'John',
    'Acts',
    'Romans',
    '1 Corinthians',
    '2 Corinthians',
    'Galatians',
    'Ephesians',
    'Philippians',
    'Colossians',
    '1 Thessalonians',
    '2 Thessalonians',
    '1 Timothy',
    '2 Timothy',
    'Titus',
    'Philemon',
    'Hebrews',
    'James',
    '1 Peter',
    '2 Peter',
    'Jude',
    'Revelation'
  ],
  
  singularBooks : [
    'Obadiah',
    'Jude',
    '3 John',
    '2 John',
    'Philemon'
  ],
  
  init : function(options){
    this.searchUrl = options.searchUrl || 'https://www.biblegateway.com/passage/?search=ST_BIBLE_SEARCH_TOKEN&version=TLV';
    this.searchUrlToken = options.searchUrlToken || 'ST_BIBLE_SEARCH_TOKEN';
    this.initted = true;
  },
  
  processText : function(text, scriptureOptions, generalOptions){
    if(!this.initted){
      throw "Bible class must be initialised before it will work.";
    }
    
    // we do no destruction to the original data
    var processedText = text;
    
    // a bit of a hack. Let us search for John's letters before the gospel of John
    processedText = processedText.replace(/1 John/g, this.tokenizeString('1 John'))
                                  .replace(/2 John/g, this.tokenizeString('2 John'))
                                  .replace(/3 John/g, this.tokenizeString('3 John'));
    
    var books = this.otBooks.concat(this.ntBooks);
    
    // we do not nest links inside existing links
    var parentFunction = this;
    switch(generalOptions.mode){
      case 'WIKIML':
          processedText = processedText.replace(/(\[http[s]?:\/\/[^\]]*\])/g, function(match){
            var token = parentFunction.tokenizeString(match, {prefix:'STEXEMPT',suffix:'TPMEXETS'});
            return token;
          });
          break;

        case 'BBCODE':
          processedText = processedText.replace(/\[url([^\[]*\[\/url\])/g, function(match){
            var token = parentFunction.tokenizeString(match, {prefix:'STEXEMPT',suffix:'TPMEXETS'});
            return token;
          });
          
          break;

        case 'HTML':
        default:
          processedText = processedText.replace(/(<a.*?<\/a>)/g, function(match){
            var token = parentFunction.tokenizeString(match, {prefix:'STEXEMPT',suffix:'TPMEXETS'});
            return token;
          });
      
    }
    
    for(var i in books){
      var bookName = books[i];
      var bookNameSearch = new RegExp(bookName, 'g');
      
      var bookToken = this.tokenizeString(bookName);
      var tokenSearch = new RegExp(bookToken, 'g');
      
      // we tokenize the book names in the text, to reduce naming conflicts for similarly named books
      processedText = processedText.replace(bookNameSearch, bookToken);
      var searchPattern = this.createBooknameSearch(bookName, bookToken);
      
      var parentFunction = this;
      processedText = processedText.replace(searchPattern, function(match){
        var tokenSearch = new RegExp(bookToken, 'g');
        var detokenizedMatch = match.replace(tokenSearch, bookName);
        var url = parentFunction.buildUrl(detokenizedMatch, scriptureOptions);
        var replacementString;
        
        switch(generalOptions.mode){
          case 'WIKIML':
            replacementString = '['+url+' '+match+']';
            break;
            
          case 'BBCODE':
            replacementString = '[url="'+url+'"]'+match+'[/url]';
            break;
            
          case 'HTML':
          default:
            scriptureOptions.htmlOptions = scriptureOptions.htmlOptions || {};
            var htmlClassname = (typeof scriptureOptions.htmlOptions.linkClassname === 'undefined') ? '' : ' '+scriptureOptions.htmlOptions.linkClassname;
            replacementString = '<a class="scripturetips-link'+htmlClassname+'" ';
            
            if(typeof scriptureOptions.htmlOptions.target !== 'undefined'){
              replacementString += 'target="'+scriptureOptions.htmlOptions.target+'" ';
            }
            
            if(typeof scriptureOptions.htmlOptions.onlick !== 'undefined'){
             // disabled until considerations of potential XSS risks have been decided
             // replacementString += 'onlick="'+scriptureOptions.htmlOptions.onclick+'" ';
            }
            
            replacementString += 'href="'+url+'">'+match+'</a>';
            
            break;
        }
        
        return replacementString;
      });
    }
    
    // translate link tokens back to link tags
    var parentFunction = this;
    processedText = processedText.replace(/(STEXEMPT[0-9]*TPMEXETS)/g, function(match){
      return parentFunction.detokenizeString(match);
    });
    
    
    // deconvert the tokens into real booknames now that processing has finished
    for(var i in books){
      var bookName = books[i];
      var bookToken = this.tokenizeString(bookName);
      var tokenSearch = new RegExp(bookToken, 'g');
      
      processedText = processedText.replace(tokenSearch, bookName);
      
    }
    
    return processedText;
    
  },
  
  
  buildUrl : function(searchPhrase){
    return this.searchUrl.replace(this.searchUrlToken, encodeURI(searchPhrase));
  },
  
  
  createBooknameSearch(bookName, bookToken){
    return new RegExp('('+bookToken+'\\s[0-9]{1,3}(([0-9],[0-9])||([^a-zA-Z,\\.\\(\\)\\[\\]\\s]))*)', 'g');
  },
  
  
  tokenizeString : function(text, options){
    options = options || {};
    var token = this.hashString(text, options);
    this.tokens[token] = text;
    return token;
  },
  
  detokenizeString : function(token){
    return this.tokens[token];
  },
  
  hashString : function(text, options){
    var hash = 0;
    if(text.length === 0){
      return hash;
    }
    for(var i = 0; i < text.length; i++){
      var char = text.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    if(hash < 0){
      // convert to positive integer
      hash = 0-hash;
    }
    var prefix = options.prefix || 'STHASH';
    var suffix = options.suffix || 'HSAHTS';
    
    
    return prefix+hash+suffix;
  }
  
};
