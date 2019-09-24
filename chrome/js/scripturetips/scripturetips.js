


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
  
  /**
   * Check whether text should be processed or not.
   * Use this on the innerHTML of the root-most node, to save doing recursive processing through each child-nodes, where it would be pointless.
   * It saves doing recursive processing where it is not used.
   * @param {type} text
   * @param {type} options
   * @returns boolean
   */
  preProcessValidation : function(text, options){
    if(typeof text !== 'string'){
      return false;
    }
    var newText = ScriptureTips.processText(text, options);
    return (newText !== text);
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




