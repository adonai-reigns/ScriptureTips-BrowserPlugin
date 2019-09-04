


var ScriptureTips = {
  
  originalText : null,
  processedText : null,
  
  scriptures : {
    Bible : STBible
    // @TODO: Quoran, Vedas
  },
  
  init : function(config){
    for(var i in this.scriptures){
      this.scriptures[i].init(config);
    }
  },
  
  processText : function(text, options){
    
    this.originalText = text;
    this.processedText = text;
    
    var scriptures = options.scriptures || [{name:'Bible'}];
    options.options = options.options || {};
    
    for(var i in scriptures){
      this.processScripture(scriptures[i], options.options);
    }
    
    return this.getProcessedText(options.options);
    
  },
  
  getProcessedText : function(options){
    
    return this.processedText;
  },
  
  processScripture : function(scriptureOptions, generalOptions){
    
    if(typeof this.scriptures[scriptureOptions.name] !== 'object'){
      // does not include a library for that scripture .. we should alert the developer
      // possible causes: typing mistake, or having not included the script that defines the library
      // scripture type must be defined in scriptureOptions as an object with a name property corresponding to the key in this.scriptures
      // eg: [{name:'Bible},{name:'Quoran'},{name:'Vedas'}]
      throw "We need a valid interpreter for \""+scriptureOptions.name+"\"";
      return;
    }
    
    this.processedText = this.scriptures[scriptureOptions.name].processText(this.processedText, scriptureOptions, generalOptions);
    
    
  }
  
  
};




