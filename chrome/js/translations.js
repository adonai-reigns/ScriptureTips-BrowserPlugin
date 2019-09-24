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
  
  "Default Bible Service" : {
    en_GB : "Default Bible Service"
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
  },
  
  
  
  
  
  
  
  
  
  /**
   * Index Page
   */
  "Scripture Tips - Index" : {
    en_GB : "Scripture Tips"
  },
  " Do not process " : {
    en_GB : " Do not process "
  },
  "What is it?" : {
    en_GB : "What is it?"
  },
  "What is it? (p1)" : {
    en_GB : "It's good to discuss scripture. But, it takes time to look up every scriptural reference\
        before we can give a response."
  },
  "What is it? (p2)" : {
    en_GB : "ScriptureTips automatically detects scripture references in the page, and then converts them to hyperlinks\
        so that you only need to click them."
  },
  "What is it? (p3)" : {
    en_GB : "Plus, there is a form that you can use to convert the scripture references in your own writing into links\
        before you send them to the reader."
  },
  "Features" : {
    en_GB : "Features"
  },
  "Features (li1)" : {
    en_GB : "Automatically converts scripture references into links"
  },
  "Features (li2)" : {
    en_GB : "Customise the link URL's to use your favourite online bible"
  },
  "Features (li3)" : {
    en_GB : "Converts scripture refrences in your own writing before posting online"
  },
  "Features (li4)" : {
    en_GB : "Supports BBCode. Wiki Markup Language and HTML"
  },
  "License, Credits and Acknowledgements" : {
    en_GB : "License, Credits and Acknowledgements"
  },
  
  
  /**
   * Acknowledgements page
   */
  
  "Scripture Tips - Acknowledgements" : {
    en_GB : "Scripture Tips - Acknowledgements"
  },
  "Free Software Forever!" : {
    en_GB : "Free Software Forever!"
  },
  "Free Software Forever! (p1)" : {
    en_GB : "This is free software. It costs nothing, and it is released as a Copyleft software. That means anyone\
        can freely use it, but nobody is allowed to make money from it."
  },
  "Free Software Forever! (p2)" : {
    en_GB : "This software was made with elements that were given freely, and the original artists have\
        only asked for an acknowledgement and a link to their portfolio:"
  },
  "Trustworthy: no backdoors, no snooping." : {
    en_GB : "Trustworthy: no backdoors, no snooping."
  },
  "Trustworthy (p1)" : {
    en_GB : "You give a lot of trust to the people that write software for your computer, because you are giving them permission\
        to command your computer and to see what you do with it. If you'd like to see exactly what happens when you\
        run this browser extension, you can read the source code on "
  },
  "Github" : {
    en_GB : "Github"
  }
  
  
  
  
  
  
};