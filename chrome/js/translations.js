var STTranslations = {
  
  _ : function(name, locale){
    if(typeof locale === 'undefined'){
      if(window.navigator.languages){
        locale = window.navigator.languages[0];
      }else{
        locale = window.navigator.userLanguage || window.navigator.language;
      }
      locale.replace('-', '_');
    }
    if(typeof this[name] !== 'undefined'){
      if(typeof this[name][locale] === 'string'){
        return this[name][locale];
      }
    }
    return name;
  },
  
  
  /**
   * Tools Page
   */
  
  "Scripture Tips - Tools" : { 
    en_GB : "Scripture Tips : Tools"
  },
  
  "Scripture Tips" : { 
    en_GB : "Scripture Links Plugin"
  },
  
  // tools form options
  "Mode" : {
    en_GB : "Mode"
  },
  "BB Code" : {
    en_GB : "BB Code"
  },
  "WIKI Markup Language" : {
    en_GB : "WIKI Markup Language"
  },
  "HTML" : {
    en_GB : "HTML"
  },
  
  "Service" : {
    en_GB : "Service"
  },
  "BibleGateway" : {
    en_GB : "BibleGateway"
  },
  "BibleHub" : {
    en_GB : "BibleHub"
  },
  "Blue Letter Bible" : {
    en_GB : "Blue Letter Bible"
  },
  
  "Input" : {
    en_GB : "Input"
  },
  "Output" : {
    en_GB : "Output"
  },
  "Process" : {
    en_GB : "Process"
  },
  "Undo" : {
    en_GB : "Undo"
  },
  "Redo" : {
    en_GB : "Redo"
  },
  
  
  

  /**
   * Settings Page
   */
  "Scripture Tips Settings" : {
    en_GB : "Scripture Tips Settings"
  },
  "Scripture Tips - Settings" : {
    en_GB : "Scripture Tips : Settings"
  },
  "Default Mode" : {
    en_GB : "Default Mode"
  },
  "Bible Services" : {
    en_GB : "Bible Services"
  },
  
  "Service Name" : {
    en_GB : "Service Name"
  },
  "Service URL" : {
    en_GB : "Service URL"
  },
  "Default Translation" : {
    en_GB : "Default Translation"
  },
  "Add Bible Service" : {
    en_GB : "Add a New Bible Service"
  },
  "Delete Service" : {
    en_GB : "Delete"
  },
  "There needs to be at least one service that works!" : {
    en_GB : "There needs to be at least one service that works!"
  },
  "Are you sure you want to delete this service?" : {
    en_GB : "Are you sure you want to delete this service?"
  }
  
  
  
};