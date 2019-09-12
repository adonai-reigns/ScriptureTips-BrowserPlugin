var STIndexApp = {
  
  init : function(){
    
    document.getElementById('tipDisableDomainSelector').style.display = 'hidden';
    
    setTimeout(function(){
      
      // we have to figure out whether the active tab is of a domain that the user has opted to exclude
      chrome.tabs.getSelected(null, function(tab){

        var urlFindings = tab.url.match(/(http[s]{0,1}:\/\/)([^\/]*)(\/{0,1}.*)/);
        if(urlFindings !== null && urlFindings.length >=3 ){
          // so now we know the domain name of the active tab
          document.getElementById('tipDisableDomainName').innerText = urlFindings[2];
          document.getElementById('tipDisableDomainSelector').style.display = 'block';
          
        }else{
          STBackgroundApp.currentDomain = '';
        }
        
        chrome.runtime.sendMessage({name : 'getSTBackgroundAppData'}, function(STBackgroundAppData){

          if(STBackgroundAppData.tipDisabledDomains.indexOf(document.getElementById('tipDisableDomainName').innerText)>-1){
            // yes, the user has excluded the app from operating on this domain
            document.getElementById('tipDisableDomain').checked = "checked";
          }else{
            // no the user has not excluded this domain from our processing
            document.getElementById('tipDisableDomain').checked = null;
          }

        });
          
      });
      
    }, 200);
    
    
    document.getElementById('tipDisableDomain').addEventListener('change', function(event){
      
      setTimeout(function(){
        
        if(event.target.checked){
          // save the addition of the domain to excluded domains
          chrome.runtime.sendMessage({
            name : 'addTipDisabledDomain', 
            domainName : document.getElementById('tipDisableDomainName').innerText
          });
          
        }else{
          // remove the domain from excluded domains
          chrome.runtime.sendMessage({
            name : 'removeTipDisabledDomain', 
            domainName : document.getElementById('tipDisableDomainName').innerText
          });
          
        }
        
      }, 200);
      
    });
    
    document.getElementById('openSettingsPageLink').addEventListener('click', function(){chrome.runtime.openOptionsPage();});
    
  }
  
};




document.addEventListener('DOMContentLoaded', function() {
  STIndexApp.init();
}, false);






