
var STBackgroundApp = {
  currentUrl : null,
  currentDomain : null,
  tipDisabledDomains : [],
  
  init : function(){
    chrome.storage.sync.get('tipDisabledDomains', function(dbResponse){
      STBackgroundApp.tipDisabledDomains = dbResponse.tipDisabledDomains;
    });
  }
  
};



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.name === 'getSTBackgroundAppData') {
    sendResponse({
      currentUrl : STBackgroundApp.currentUrl,
      currentDomain : STBackgroundApp.currentDomain,
      tipDisabledDomains : STBackgroundApp.tipDisabledDomains
    });
  }
  
  if(message.name === 'updateTipDisabledDomains') {
    chrome.storage.sync.get('tipDisabledDomains', function(dbResponse){
      STBackgroundApp.tipDisabledDomains = dbResponse.tipDisabledDomains;
    });
  }
  if(message.name === 'addTipDisabledDomain') {
    if(STBackgroundApp.tipDisabledDomains.indexOf(message.domainName)<0){
      STBackgroundApp.tipDisabledDomains.push(message.domainName);
    }
    chrome.storage.sync.set({tipDisabledDomains : STBackgroundApp.tipDisabledDomains});
  }
  if(message.name === 'removeTipDisabledDomain') {
    while(STBackgroundApp.tipDisabledDomains.indexOf(message.domainName)>-1){
      STBackgroundApp.tipDisabledDomains.splice(STBackgroundApp.tipDisabledDomains.indexOf(message.domainName), 1);
    }
    chrome.storage.sync.set({tipDisabledDomains : STBackgroundApp.tipDisabledDomains});
  }
  
});
 
 
 
 
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  
    if(typeof(tab.url) === 'string'){
      if(tab.highlighted){
        // only process changes to the current active tab
        STBackgroundApp.currentUrl = tab.url;
        var urlFindings = tab.url.match(/(http[s]{0,1}:\/\/)([^\/]*)(\/{0,1}.*)/);
        if(urlFindings !== null && urlFindings.length >=3 ){
          STBackgroundApp.currentDomain = urlFindings[2];
        }else{
          STBackgroundApp.currentDomain = '';
        }
        
        
      }
    }
  
  
});





chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({defaultMode : 'HTML'});
  chrome.storage.sync.set({defaultService : 1});
  chrome.storage.sync.set({tipDisabledDomains : []});
  chrome.storage.sync.set({BibleServices : [
    {
      n : "BibleGateway.com",
      u : "https://www.biblegateway.com/passage/?search=ST_REFERENCE&version=ST_TRANSLATION",
      t : "TLV"
    },
    {
      n : "BibleHub.com",
      u : "https://biblemenus.com/search.php?q=ST_BOOKNAME%20ST_CHAPTER:ST_VERSE",
      t : "interlinear"
    },
    {
      n : "BlueLetterBible.org",
      u : "https://blueletterbible.org/search/presearch.cfm?Criteria=ST_REFERENCE&t=ST_TRANSLATION",
      t : "KJV"
    }
  ]});
});



STBackgroundApp.init();