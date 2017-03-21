var script="";
var array=[];
var note=null;
var allMyNotes=[];
var recognition=null;
var keys=[];

function startDictation() 
{
    document.getElementById('transcript').value="";
    script="";
    array=[]  
    if (window.hasOwnProperty('webkitSpeechRecognition')) 
    {

      if(recognition)
        {
          recognition.stop();
          document.getElementById('transcript').value="";
          script="";
          array=[];
          recognition=null;  
        }
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.start();


      recognition.onresult = function(e) 
      {
        meh=e.results[0][0].transcript;
        if(!array.length==e.resultIndex+1)
          {array.push(e.results[e.resultIndex][0].transcript);}
        else
          array[e.resultIndex]=e.results[e.resultIndex][0].transcript;
        
        document.getElementById('transcript').value = script+array.join(".");
      };


      recognition.onspeechstart = function(e)
       {
        if(!recognition)recognition.start()
       };
     
      recognition.onend =function(e)
      {
        script=document.getElementById('transcript').value;
        console.log("Recogniztion API stopped.Restarting now");
        recognition.stop();
      };
    }
  }


function searchGoogle()
{
   var newURL = 'https://www.google.com/search?q='+meh;
   chrome.tabs.create({ url: newURL });
}


function saveNote ()
{
   var d1=document.getElementById('transcript').value;
   console.log("Saving",d1);
   var obj =  {[new Date().getTime()]: d1};
   chrome.storage.sync.set(obj, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });

}




function openNote () 
{

chrome.storage.sync.get(null, function(items) {
    console.log(items);
});
window.open ('openNotes.html','_self',false)

}


  window.onload=function()
  {

  clicker = document.querySelector('#mic');
  clicker.addEventListener('click', startDictation, false);
  
  searcher=document.querySelector('#google');
  searcher.addEventListener('click', searchGoogle, false);
  
  saver = document.querySelector('#save');
  saver.addEventListener('click', saveNote, false);
  
  opener = document.querySelector('#open');
  opener.addEventListener('click', openNote, false);
  
 // chrome.storage.sync.clear();
}
