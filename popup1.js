
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition;

var diagnostic = document.querySelector('.output');
var color = "";
  
var bool=1;

var clicker;

function startRecognition() 
{
  recognition = new webkitSpeechRecognition();
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    recognition.start();
  recognition.onresult = function(event) 
  {
    var last = event.results.length - 1;
    color+= event.results[last][0].transcript;
    textSpace.value=color;
    diagnostic.textContent = 'Result received: ' + color + '.';
  }
  
};

function switchRecognition() 
{
  if (!recognition) 
  {
    startRecognition();
  }
  else 
  {
}
}

function stopRecogntion()
{
    recognition.stop();
    recognition=null;  
    document.getElementById('#over').value="Final"+color;
}

function init() 
{
    clicker = document.querySelector('#mic');
    textSpace=document.querySelector('#text');
    stopButton=document.querySelector('#stop');
    clicker.addEventListener('click', startRecognition, false);
    stopButton.addEventListener('click',stopRecognition,false);
}    

document.addEventListener('DOMContentLoaded', init);