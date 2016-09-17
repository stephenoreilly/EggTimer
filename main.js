var timer;
resetDisplay();
$("#start").click(function(){
  $("#start")[0].disabled = true;
  $("#stop")[0].disabled = false;
  $("#work").removeClass("grab");
  $("#break").removeClass("grab");
  document.body.style.backgroundImage = "url('https://pixabay.com/static/uploads/photo/2014/05/02/21/50/home-office-336378_1280.jpg')";

  disableSliders();
	startTimer(setFinishTime($("#work")[0]), "work");
});
$("#stop").click(function(){
  document.body.style.backgroundImage = "url('https://pixabay.com/static/uploads/photo/2014/10/22/17/25/running-498257_1280.jpg')";

  $("#stop")[0].disabled = true;
  $("#start")[0].disabled = false;
  $("#work").addClass("grab");
  $("#break").addClass("grab");
  clearTimeout(timer);
  resetDisplay();
  enableSliders();
});
function startTimer(finishTime, timerType){

	var timeNowSecs = new Date($.now()).getTime()/1000;
  var timeLeft = Math.round(finishTime - timeNowSecs);

  if(timeLeft <= 0){
    $("#display")[0].innerHTML = createDisplayString(0, timerType);
    if(timerType == "break"){
      finishTime = setFinishTime($("#work")[0]);
      timerType = "work";
      setBackgroundImage("work");
    } else {
      finishTime = setFinishTime($("#break")[0]);
      timerType = "break";
      setBackgroundImage("break");
    }
  } else {
    $("#display")[0].innerHTML = createDisplayString(timeLeft, timerType);
  }

  timer = setTimeout(function () {
    startTimer(finishTime, timerType)
  }, 500);
}

function setBackgroundImage(type){
  if(type=="work"){
    document.body.style.backgroundImage = "url('https://pixabay.com/static/uploads/photo/2014/05/02/21/50/home-office-336378_1280.jpg')";
  } else {
    document.body.style.backgroundImage = "url('https://pixabay.com/static/uploads/photo/2016/08/11/22/24/coffee-1587080_1280.jpg')";
  }
}

function createDisplayString(timeLeft, timerType){
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft - minutes * 60;
  if(minutes == 0){
    minString = ""
  } else {
    minString = minutes.toString() + "mins "
  }
  if(seconds == 0 && minutes != 0){
    secsString = ""
  } else {
    secsString = seconds.toString() + "secs "
  }
  return timerType + " for " + minString + secsString ;
}

function setFinishTime($element){
  return new Date($.now()).getTime()/1000 + getTimeFromElement($element);
}

function resetDisplay(){
  $("#display")[0].innerHTML = createDisplayString(getTimeFromElement($("#work")[0]), "work")
}

function getTimeFromElement($element){
  return parseInt($element.value) * 60
}

function updateWorkValue(value){
  $("#work-display-value")[0].innerHTML = value;
}

function updateBreakValue(value){
  $("#break-display-value")[0].innerHTML = value;
}

function disableSliders(){
  $("#break")[0].disabled = true;
  $("#work")[0].disabled = true;
}

function enableSliders(){
  $("#break")[0].disabled = false;
  $("#work")[0].disabled = false;
}