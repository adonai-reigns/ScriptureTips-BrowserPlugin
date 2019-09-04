


var ScriptureTips = {
  
  originalText : null,
  processedText : null,
  
  scriptures : {
    bible : STBible
  },
  
  init : function(config){
    for(var i in this.scriptures){
      this.scriptures[i].init(config);
    }
  },
  
  processText : function(text, options){
    
    this.originalText = text;
    this.processedText = text;
    
    var scriptures = options.scriptures || [{name:'bible'}];
    
    for(var i in scriptures){
      this.processScripture(scriptures[i]);
    }
    
    return this.getProcessedText(options);
    
  },
  
  getProcessedText : function(options){
    
    return this.processedText;
  },
  
  processScripture : function(scriptureConfig){
    
    if(typeof this.scriptures[scriptureConfig.name] !== 'object'){
      // does not include a library for that scripture .. we should alert the developer
      // possible causes: typing mistake, or having not included the script that defines the library
      // scripture type mut be defined in config as an object with a name property, corresponding to the key in this.scriptures
      // eg: [{name:'bible},{name:'quoran'},{name:'vedas'}]
      throw "We need a valid interpreter for \""+scriptureConfig.name+"\"";
      return;
    }
    
    this.processedText = this.scriptures[scriptureConfig.name].processText(this.processedText, scriptureConfig);
    
    
  }
  
  
};




