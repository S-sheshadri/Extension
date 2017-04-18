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
    array=[];
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
      recognition.lang = "en-IN";
      recognition.start();


      recognition.onresult = function(e) 
      {
        meh=e.results[0][0].transcript;
        if(!array.length==e.resultIndex+1)
          {array.push(e.results[e.resultIndex][0].transcript);}
        else
          array[e.resultIndex]=e.results[e.resultIndex][0].transcript;
        console.log("results:",array);
        document.getElementById('transcript').value = array.join(".");
        //to change when typed
          area = document.querySelector('#transcript');
          if (area.addEventListener) 
          {
          area.addEventListener('input', function() 
              {
                    e.resultIndex=1;
                    array=[];
                    array.push(area.value);
                    console.log(array);
              }, false);
          }
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
   var newURL = 'https://www.google.com/search?q='+document.getElementById('transcript').value;
   console.log(newURL);
   chrome.tabs.create({ url: newURL });
}


function updateNote ()
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

  chrome.storage.sync.get('upNote', function(items) {
    console.log("bro",items['upNote']);
});
  starter = document.querySelector('#start');
  starter.onclick = function () 
  {
            navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
               var mediaConstraints = {
               audio: true
                };
     
            navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

            function onMediaSuccess(stream) 
            {
            startDictation();
            }

            function onMediaError(e) {
                alert('Please check "Use recording feature" in Option Page');
                chrome.tabs.create({
                    'url': "options.html"
                });
            }
    };
  searcher=document.querySelector('#google');
  searcher.addEventListener('click', searchGoogle, false);
  
  updater = document.querySelector('#update');
  updater.addEventListener('click', updateNote, false);
  
  opener = document.querySelector('#open');
  opener.addEventListener('click', openNote, false);

  copier = document.querySelector('#copy');
  copier.addEventListener('click', function()
    {
    document.getElementById("transcript").select(); 
    document.execCommand("Copy", false, null);
     }, false);
   // chrome.storage.sync.clear();
}
//On editing text area DONE
//