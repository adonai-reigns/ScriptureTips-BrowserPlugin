var STToolsApp = {
  
  target : null,
  history : [],
  historyPointer : -1,
  isProcessing : null,
  els : {
    source : null,
    target : null,
    mode : null,
    undo : null,
    redo : null
  },
  
  init : function(){
   
    var form = document.forms['tools'];
    
    
    // the source element, from which we read the input
    STToolsApp.els.source = form.source;
    
    // attach a function to the source so we can read and write it
    STToolsApp.els.source.STRead = function(){
      return this.value.slice(0);
    };
    STToolsApp.els.source.STPrint = function(text){
      this.value = text;
    };
    
    // this is the element to which we print the output after we have processed it
    STToolsApp.els.target = form.target;
    
    // attach a function to the target element so we can read and write it
    STToolsApp.els.target.STRead = function(){
      return this.value.slice(0);
    };
    STToolsApp.els.target.STPrint = function(text){
      this.value = text;
    };
    
    // determine the mode of markup language that we are working with
    STToolsApp.els.mode = form.mode;
    
    // initiate the undo buttons
    STToolsApp.els.redo = form.redo;
    STToolsApp.els.undo = form.undo;
    
    STToolsApp.els.redo.addEventListener('click', function(e){
      e.preventDefault();
      STToolsApp.executeRedo();
    }, false);

    
    STToolsApp.els.undo.addEventListener('click', function(e){
      e.preventDefault();
      STToolsApp.executeUndo();
    }, false);
    
    // initialise the process button
    STToolsApp.els.process = form.process;
    STToolsApp.els.process.addEventListener('click', function(){
      STToolsApp.process(this);
    }, false);
  
    STToolsApp.writeUndo({
      name : 'Initial State'
    });
    
    ScriptureTips.init();
    
  },
  
  
  // the handler of the process event, interfaces UI to API
  process : function(button){
    // is process locked?
    
    if(STToolsApp.isProcessing !== null){
      return;
    }
    
    
    // allow the button to work again if the script stalls
    STToolsApp.isProcessing = setTimeout(function(){
      if(STToolsApp.isProcessing === null){
        return;
      }
      STToolsApp.isProcessing = null;
      button.disabled = null;
    }, 5000);
    
    // disable the button
    button.disabled = 'disabled';
    STToolsApp.isProcessing = true;
    
    setTimeout(function(){
      
      var text = STToolsApp.els.source.STRead();
      
      var newText = STToolsApp.processText(text);
      
      STToolsApp.els.target.STPrint(newText);
      
      STToolsApp.writeUndo({
        name : "Generate Links"
      });

      button.disabled = null;
      clearTimeout(STToolsApp.isProcessing);
      STToolsApp.isProcessing = null;
    
    }, 1);
    
    
    
    
  },
  
  // the method that converts scripture patterns into links
  processText : function(text, mode){
    var newText = ScriptureTips.processText(text, {
      scriptures : [
        {
          name : 'bible'
        }
      ]
    });
    
    return newText;
  },
  
  
  writeUndo : function(config){
    
    // if we have done some undoing, then our pointer is behind the head of the stack. Slice the end off the stack
    if((STToolsApp.historyPointer+1) < STToolsApp.history.length){
      STToolsApp.history.splice(STToolsApp.historyPointer+1);
    }
    
    if(typeof config.state !== 'object'){
      config.state = {};
    }
    
    if(typeof config.state.source !== 'string'){
      config.state.source = STToolsApp.els.source.STRead();
    }
    if(typeof config.state.target !== 'string'){
      config.state.target = STToolsApp.els.target.STRead();
    }
    
    STToolsApp.history.push(config);
    
    // set our history pointer to look at the index of the present state
    STToolsApp.historyPointer = STToolsApp.history.length-1;
    
    // update the undo buttons
    STToolsApp.UI.undo.update();
    STToolsApp.UI.redo.update();
    
    
    
  },
  
  executeUndo : function(){
    
    STToolsApp.historyPointer--;
    if(STToolsApp.historyPointer < 0){
      // can't undo that much!
      STToolsApp.historyPointer = 0;
    }
    
    // restore the state at this undo point
    STToolsApp.els.source.STPrint(STToolsApp.history[STToolsApp.historyPointer].state.source);
    STToolsApp.els.target.STPrint(STToolsApp.history[STToolsApp.historyPointer].state.target);

    // update the undo buttons
    STToolsApp.UI.undo.update();
    STToolsApp.UI.redo.update();
    
  },
  
  executeRedo : function(){
    
    STToolsApp.historyPointer++;
    if(STToolsApp.historyPointer+1 >= STToolsApp.history.length){
      // can't redo that much!
      STToolsApp.historyPointer = STToolsApp.history.length-1;
    }
    
    // restore the state at this redo point
    STToolsApp.els.source.STPrint(STToolsApp.history[STToolsApp.historyPointer].state.source);
    STToolsApp.els.target.STPrint(STToolsApp.history[STToolsApp.historyPointer].state.target);
    
    // update the undo buttons
    STToolsApp.UI.undo.update();
    STToolsApp.UI.redo.update();
    
    
  },
  
  getMode : function(){
    return STToolsApp.mode.options[STToolsApp.mode.selectedIndex].value;
  },
  
  
  UI : {
    redo : {
      update : function(){
        if(STToolsApp.historyPointer+1 < STToolsApp.history.length){
          // there is a redo available
          STToolsApp.els.redo.disabled = null;
        }else{
          // no redo actions available
          STToolsApp.els.redo.disabled = 'disabled';
        }
      }
    },
    undo : {
      update : function(){
        if(STToolsApp.historyPointer <= 0 || STToolsApp.history.length < 2){
          // no undo actions available
          STToolsApp.els.undo.disabled = 'disabled';
        }else{
          // there is an undo available
          STToolsApp.els.undo.disabled = null;
        }
      }
    }
  }
  
};


document.addEventListener('DOMContentLoaded', function() {
  STToolsApp.init();
}, false);

