$("#start").click(function(){
	console.log("test");
	startTimer();
});
$("#stop").click(function(){
	console.log("test2");
	$("#circle").stop();
});
$("#break").click(function(){
	startBreak();
});
function startTimer(){
	runClock(3, "red");
}
function startBreak(){
	runClock(5, "green");
}

function runClock(timeInterval, clockColor){
	if(timeInterval == 0){
		clearIntervalForTimer();
	} else {
		$("#circle").css("background-color", clockColor);
		var timeInMinsPlusInterval = new Date($.now()).getTime()/1000 + timeInterval;
		var interval = setInterval(increaseBackgroundColor, 1);
	}
	function increaseBackgroundColor(){
		var time = (timeInMinsPlusInterval - new Date($.now()).getTime()/1000);
		var deg = 90 + 360 - time/timeInterval * 360;
		if(time > 0){
			$("#circle").css('background-image', 'linear-gradient(' + (deg + 1) + 'deg, transparent 50%, white 50%), linear-gradient('+ (deg) + 'deg, white 50%, transparent 50%');
		}else{
			$("#circle").css('background-image', 'linear-gradient(91deg, transparent 50%, white 50%), linear-gradient(90deg, white 50%, transparent 50%');
			clearIntervalForTimer();
			if(clockColor == "green"){
				$("#start").trigger("click");
			} else {
				$("#break").trigger("click");
			}
		}
	}
	function clearIntervalForTimer() {
    clearInterval(interval);
	}
}