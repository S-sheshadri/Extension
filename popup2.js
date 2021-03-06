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
    if(document.getElementById('start'))
    {
      document.getElementById('start').id='listening';
    }
  else
    {
      document.getElementById('listening').id='start';
    }

    if (window.hasOwnProperty('webkitSpeechRecognition')) 
    {

      if(recognition)
        {
          recognition.stop();
          document.getElementById('transcript').value="";
          //to change mic color if needed 
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
        console.log(array);
        document.getElementById('transcript').value = script+array.join("");
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

  var color="#FFF";
  var obj =  {["^color"]:color};
   chrome.storage.sync.set(obj, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });

  type=document.getElementById('transcript');
  type.onkeyup=function (argument) 
  {
  array=[];
  array.push(type.value);
  }
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
  
  saver = document.querySelector('#save');
  saver.addEventListener('click', saveNote, false);
  
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