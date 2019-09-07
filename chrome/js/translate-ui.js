var STTranslate = {
  
  defaultLocale : 'en_US',
  locale : 'en_US',
  
  setLocale : function(locale){
    this.locale = locale.replace('-', '_');
  },
  
  changeLocale : function(locale){
    this.setLocale(locale);
    
    STTranslate.translateEl(document.getElementsByTagName('title')[0].childNodes[0]);
    
    var allTextNodes = STGetTextNodesIn(document.body);
    for(var i in allTextNodes){
      STTranslate.translateEl(allTextNodes[i]);
    }
    
  },
  
  translateEl : function(el, localeOverride){
    
    if(el.nodeValue !== null){
      // it is a translatable element 
      
      if(typeof el.stTranslate === 'undefined'){
        // initiate element for first use
        el.stTranslate = 'sys';
        el.stTranslateSys = el.nodeValue;
      }
      
      if(!STTranslations[el.stTranslateSys]){
        // worst-case scenario - no translations are available for this element
        el.nodeValue = el.stTranslateSys;
        //alert('worst case! '+el.stTranslateSys+' - '+el.nodeValue+' - '+el.tagName);
        return;
      }
      
      if(typeof(localeOverride) !== 'undefined'){
        
        if(typeof STTranslations[el.stTranslateSys][localeOverride] === 'undefined'){
          // no translations available for this element in the specified locale, fall back to system value
          el.nodeValue = el.stTranslateSys;
          el.stTranslate = 'sys';
          return;
        }else{
          // translate the element to the specified locale
          el.nodeValue = STTranslations[el.stTranslateSys][localeOverride];
          el.stTranslate = localeOverride;
        }

      }else{
        // send the element to be processed with a specified locale of the user's current setting
        if(!STTranslations[el.stTranslateSys][this.locale]){
          // no translations available for the user's locale, fall back to default locale
          return this.translateEl(el, this.locale);
        }else{
          el.nodeValue = STTranslations[el.stTranslateSys][this.locale];
          el.stTranslate = this.locale;
        }
      }
    }
  }
  
};


window.addEventListener('load', function() {
  var language;
  if(window.navigator.languages){
    language = window.navigator.languages[0];
  }else{
    language = window.navigator.userLanguage || window.navigator.language;
  }
  setTimeout(function(){
    STTranslate.changeLocale(language);
  }, 0);
}, false);













/**
 * 20190905 from http://cwestblog.com/2014/03/14/javascript-getting-all-text-nodes/
 * Gets an array of the matching text nodes contained by the specified element.
 * @param  {!Element} elem
 *     The DOM element which will be traversed.
 * @param  {function(!Node,!Element):boolean} opt_fnFilter
 *     Optional function that if a true-ish value is returned will cause the
 *     text node in question to be added to the array to be returned from
 *     getTextNodesIn().  The first argument passed will be the text node in
 *     question while the second will be the parent of the text node.
 * @return {!Array.<!Node>}
 *     Array of the matching text nodes contained by the specified element.
 */
function STGetTextNodesIn(elem, opt_fnFilter) {
  var textNodes = [];
  if (elem) {
    for (var nodes = elem.childNodes, i = nodes.length; i--;) {
      var node = nodes[i], nodeType = node.nodeType;
      if (nodeType == 3) {
        if (!opt_fnFilter || opt_fnFilter(node, elem)) {
          textNodes.push(node);
        }
      }
      else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
        textNodes = textNodes.concat(STGetTextNodesIn(node, opt_fnFilter));
      }
    }
  }
  return textNodes;
}

