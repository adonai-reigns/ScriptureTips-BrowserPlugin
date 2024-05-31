var STOptionsApp = {
  
  
  defaultBibleServices : {
    Bible : [
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
    ],
    Quoran : [],
    Vedas : []
  },
  
  services : {
    Bible : [],
    Quoran : [],
    Vedas : []
  },
  
  init: function(){
    
    var form = document.forms['options'];
    
    this.getOption('defaultMode', function(value){
      form.mode.value = value;
    });

    form.mode.addEventListener('change', function(event){
       STOptionsApp.setOption('defaultMode', event.target.options[event.target.selectedIndex].value);
    });
    
    
    form.defaultBibleService.addEventListener('change', function(event){
      STOptionsApp.setOption('defaultBibleService', event.target.selectedIndex);
    });
    
    
    this.getOption('BibleServices', function(BibleServices){
      STOptionsApp.services.Bible = BibleServices || [];
      if(STOptionsApp.services.Bible.length < 1){
        STOptionsApp.services.Bible = STOptionsApp.defaultBibleServices.Bible;
      }
      
      STOptionsApp.redrawBibleServices();
      
    });
    
    this.getOption('QuoranServices', function(QuoranServices){
      STOptionsApp.services.Quoran = QuoranServices || [];
      // @TODO
    });
    
    this.getOption('VedasServices', function(VedasServices){
      STOptionsApp.services.Vedas = VedasServices || [];
      // @TODO
    
    });
    
    
    
    
    
  },
  
  redrawBibleServices : function(){
    
    var servicesBible = document.getElementById('servicesBible');
    servicesBible.innerHTML = '';
    for(var i in this.services.Bible){
      this.addBibleService(this.services.Bible[i].n, this.services.Bible[i].u, this.services.Bible[i].t, i);
    }
    
    var defaultBibleService = document.forms.options.defaultBibleService;
    defaultBibleService.innerHTML = '';
    for(var i in this.services.Bible){
      var serviceOption = document.createElement('option');
      serviceOption.value = this.services.Bible[i].u;
      serviceOption.innerText = this.services.Bible[i].n;
      defaultBibleService.append(serviceOption);
    }
    
    STOptionsApp.getOption('defaultBibleService', function(defaultBibleServiceId){
      defaultBibleService.value = defaultBibleService.options[defaultBibleServiceId].value;
      if(defaultBibleService.selectedIndex < 0){
        // maybe it was deleted and the deletion was not written in the db
        STOptionsApp.setOption('defaultBibleService', defaultBibleService.options[0].value);
      }
    });
    
    
    
  },
  
  deleteBibleService : function(id){
    STOptionsApp.services.Bible.splice(id, 1);
    if(STOptionsApp.services.Bible.length < 1){
      alert(STTranslations._('There needs to be at least one service that works!'));
      STOptionsApp.services.Bible = STOptionsApp.defaultBibleService.Bible;
    }
    STOptionsApp.setOption('BibleServices', STOptionsApp.services.Bible, function(){
      STOptionsApp.redrawBibleServices();
    });
  },
  
  addBibleService : function(name, url, translation, id){
    
    if(typeof id === 'undefined'){
      id = this.services.Bible.length;
      this.services.Bible[id] = {n:'',u:'',t:''};
    }
    
    var servicesBible = document.getElementById('servicesBible');
    
    var serviceLi = document.createElement('li');
    serviceLi.id = 'servicesBible-'+id;

    var nameLabel = document.createElement('label');
    nameLabel.className = 'name';
    nameLabel.innerText = 'Service Name';

    var serviceName = document.createElement('input');
    serviceName.type = 'text';
    serviceName.className = 'name';
    serviceName.value = name;
    serviceName.dataServiceId = id;
    serviceName.addEventListener('change', function(event){
      STOptionsApp.services.Bible[event.target.dataServiceId].n = event.target.value;
      STOptionsApp.setOption('BibleServices', STOptionsApp.services.Bible);
    });

    var urlLabel = document.createElement('label');
    urlLabel.className = 'url';
    urlLabel.innerText = 'Service URL';

    var serviceUrl = document.createElement('input');
    serviceUrl.type = 'text';
    serviceUrl.className = 'url';
    serviceUrl.value = url;
    serviceUrl.dataServiceId = id;
    serviceUrl.addEventListener('change', function(event){
      STOptionsApp.services.Bible[event.target.dataServiceId].u = event.target.value;
      STOptionsApp.setOption('BibleServices', STOptionsApp.services.Bible);
    });

    var translationLabel = document.createElement('label');
    translationLabel.className = 'translation';
    translationLabel.innerText = 'Default Translation';

    var serviceTranslation = document.createElement('input');
    serviceTranslation.type = 'text';
    serviceTranslation.className = 'translation';
    serviceTranslation.value = translation;
    serviceTranslation.dataServiceId = id;
    serviceTranslation.addEventListener('change', function(event){
      STOptionsApp.services.Bible[event.target.dataServiceId].t = event.target.value;
      STOptionsApp.setOption('BibleServices', STOptionsApp.services.Bible);
    });
    
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBibleService';
    deleteButton.innerText = "Delete";
    deleteButton.dataServiceId = id;
    deleteButton.addEventListener('click', function(event){
      event.preventDefault();
      if(confirm(STTranslations._('Are you sure you want to delete this service?'))){
        STOptionsApp.deleteBibleService(event.target.dataServiceId);
        
      }else{
        // cancelled the event
        return;
      }
    });

    var serviceNameField = document.createElement('div');
    serviceNameField.classList = 'form-field';
    serviceNameField.append(nameLabel);
    serviceNameField.append(serviceName);
    serviceLi.append(serviceNameField);

    var translationField = document.createElement('div');
    translationField.classList = 'form-field';
    translationField.append(translationLabel);
    translationField.append(serviceTranslation);
    serviceLi.append(translationField);

    var urlField = document.createElement('div');
    urlField.classList = 'form-field';
    urlField.append(urlLabel);
    urlField.append(serviceUrl);
    serviceLi.append(urlField);

    serviceLi.append(deleteButton);

    servicesBible.append(serviceLi);
  },
  
  
  showOptionsTab : function(scriptureName){
    return;
    document.getElementById('BibleTab').className.replace('active', '');
    document.getElementById('QuoranTab').className.replace('active', '');
    document.getElementById('VedasTab').className.replace('active', '');
    
    document.getElementById('tabContentBible').className = document.getElementById('tabContentBible').className.replace('active', '');
    document.getElementById('tabContentQuoran').className = document.getElementById('tabContentQuoran').className.replace('active', '');
    document.getElementById('tabContentVedas').className = document.getElementById('tabContentVedas').className.replace('active', '');
    
    document.getElementById(scriptureName+'Tab').className += ' active';
    document.getElementById('tabContent'+scriptureName).className += ' active';
    
  },
  
  getOption : function(name, callbackFunction){
    try{
      chrome.storage.sync.get(name).then(function(value){
        callbackFunction(value[name]);
      });
    } catch(e){
      callbackFunction(null);
    }
  },
  
  setOption : function(name, value, callbackFunction){
    try{
      var option = {};
      option[name] = value;
      chrome.storage.sync.set(option).then(callbackFunction);
    }catch(e){
      callbackFunction(false);
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  STOptionsApp.init();
  
//   document.getElementById('BibleTab').addEventListener('click', function(){
//     STOptionsApp.showOptionsTab('Bible');
//   });
//  document.getElementById('QuoranTab').addEventListener('click', function(){
//    STOptionsApp.showOptionsTab('Quoran');
//  });
//  document.getElementById('VedasTab').addEventListener('click', function(){
//    STOptionsApp.showOptionsTab('Vedas');
//  });

  document.getElementById('addBibleService').addEventListener('click', function(event){
    event.preventDefault();
    STOptionsApp.addBibleService('', '', '');
  });
    
}, false);

