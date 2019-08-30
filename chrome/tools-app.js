var STApp = {
  
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
    STApp.els.source = form.source;
    
    // attach a function to the source so we can read and write it
    STApp.els.source.STRead = function(){
      return this.value.slice(0);
    };
    STApp.els.source.STPrint = function(text){
      this.value = text;
    };
    
    // this is the element to which we print the output after we have processed it
    STApp.els.target = form.target;
    
    // attach a function to the target element so we can read and write it
    STApp.els.target.STRead = function(){
      return this.value.slice(0);
    };
    STApp.els.target.STPrint = function(text){
      this.value = text;
    };
    
    // determine the mode of markup language that we are working with
    STApp.els.mode = form.mode;
    
    // initiate the undo buttons
    STApp.els.redo = form.redo;
    STApp.els.undo = form.undo;
    
    STApp.els.redo.addEventListener('click', function(e){
      e.preventDefault();
      STApp.executeRedo();
    }, false);

    
    STApp.els.undo.addEventListener('click', function(e){
      e.preventDefault();
      STApp.executeUndo();
    }, false);
    
    // initialise the process button
    STApp.els.process = form.process;
    STApp.els.process.addEventListener('click', function(){
      STApp.process(this);
    }, false);
  
    STApp.writeUndo({
      name : 'Initial State'
    });
    
    
  },
  
  
  // the handler of the process event, interfaces UI to API
  process : function(button){
    // is process locked?
    
    if(STApp.isProcessing !== null){
      return;
    }
    
    
    // allow the button to work again if the script stalls
    STApp.isProcessing = setTimeout(function(){
      if(STApp.isProcessing === null){
        return;
      }
      STApp.isProcessing = null;
      button.disabled = null;
    }, 5000);
    
    // disable the button
    button.disabled = 'disabled';
    STApp.isProcessing = true;
    
    setTimeout(function(){
      
      var text = STApp.els.source.STRead();
      
      var newText = STApp.processText(text);
      
      STApp.els.target.STPrint(newText);
      
      STApp.writeUndo({
        name : "Generate Links"
      });

      button.disabled = null;
      clearTimeout(STApp.isProcessing);
      STApp.isProcessing = null;
    
    }, 1);
    
    
    
    
  },
  
  // the method that converts scripture patterns into links
  processText : function(text, mode){
    var newText = text;
    
    return newText;
  },
  
  
  writeUndo : function(config){
    
    // if we have done some undoing, then our pointer is behind the head of the stack. Slice the end off the stack
    if((STApp.historyPointer+1) < STApp.history.length){
      STApp.history.splice(STApp.historyPointer+1);
    }
    
    if(typeof config.state !== 'object'){
      config.state = {};
    }
    
    if(typeof config.state.source !== 'string'){
      config.state.source = STApp.els.source.STRead();
    }
    if(typeof config.state.target !== 'string'){
      config.state.target = STApp.els.target.STRead();
    }
    
    STApp.history.push(config);
    
    // set our history pointer to look at the index of the present state
    STApp.historyPointer = STApp.history.length-1;
    
    // update the undo buttons
    STApp.UI.undo.update();
    STApp.UI.redo.update();
    
    
    
  },
  
  executeUndo : function(){
    
    STApp.historyPointer--;
    if(STApp.historyPointer < 0){
      // can't undo that much!
      STApp.historyPointer = 0;
    }
    
    // restore the state at this undo point
    STApp.els.source.STPrint(STApp.history[STApp.historyPointer].state.source);
    STApp.els.target.STPrint(STApp.history[STApp.historyPointer].state.target);

    // update the undo buttons
    STApp.UI.undo.update();
    STApp.UI.redo.update();
    
  },
  
  executeRedo : function(){
    
    STApp.historyPointer++;
    if(STApp.historyPointer+1 >= STApp.history.length){
      // can't redo that much!
      STApp.historyPointer = STApp.history.length-1;
    }
    
    // restore the state at this redo point
    STApp.els.source.STPrint(STApp.history[STApp.historyPointer].state.source);
    STApp.els.target.STPrint(STApp.history[STApp.historyPointer].state.target);
    
    // update the undo buttons
    STApp.UI.undo.update();
    STApp.UI.redo.update();
    
    
  },
  
  getMode : function(){
    return STApp.mode.options[STApp.mode.selectedIndex].value;
  },
  
  
  UI : {
    redo : {
      update : function(){
        if(STApp.historyPointer+1 < STApp.history.length){
          // there is a redo available
          STApp.els.redo.disabled = null;
        }else{
          // no redo actions available
          STApp.els.redo.disabled = 'disabled';
        }
      }
    },
    undo : {
      update : function(){
        if(STApp.historyPointer <= 0 || STApp.history.length < 2){
          // no undo actions available
          STApp.els.undo.disabled = 'disabled';
        }else{
          // there is an undo available
          STApp.els.undo.disabled = null;
        }
      }
    }
  }
  
};


document.addEventListener('DOMContentLoaded', function() {
  STApp.init();
}, false);

