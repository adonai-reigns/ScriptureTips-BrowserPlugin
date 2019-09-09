var STIndexApp = {
  
  init : function(){
    document.getElementById('tipDisableDomainSelector').style.display = 'hidden';
    setTimeout(function(){
      
      chrome.runtime.sendMessage({name : 'getSTBackgroundAppData'}, function(STBackgroundAppData){
        
        document.getElementById('tipDisableDomainName').innerText = STBackgroundAppData.currentDomain;
        document.getElementById('tipDisableDomainSelector').style.display = 'block';
        
        if(STBackgroundAppData.tipDisabledDomains.indexOf(document.getElementById('tipDisableDomainName').innerText)>-1){
          document.getElementById('tipDisableDomain').checked = "checked";
        }else{
          document.getElementById('tipDisableDomain').checked = null;
        }
        
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






