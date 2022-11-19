/*Author: Ann Mary Varghese*/
var z = 0;

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        setInterval(setUI, 250); // Calling setUI function repeatedly to update the z value with a delay of 250 millisecond.
        setTimeout(fadeMessage, 6000); // Calling fadeMessage function 6 second after the application has been started.
    },
    
    
    // Bind Event Listeners
    bindEvents: function() {
        window.addEventListener("devicemotion", this.handleMotion, true);        
    },
    
    // Set z value
    handleMotion: function(event) {
     z = event.accelerationIncludingGravity.z;
	}
};

app.initialize();

// Handling vibrations according to the z value.
// Vibration value varies between 0 to 250
function handleVibration(zValue) {

	var vibrateDuration = 0;
	if(zValue>10 || zValue<-10){
		vibrateDuration = 250;
	}else {
		vibrateDuration = zValue * 25;
	}
	if(vibrateDuration<0){
		vibrateDuration = vibrateDuration * -1;
	}
	var successBool = window.navigator.vibrate([vibrateDuration]);
    console.log('vibration state: '+successBool);
}

//Round decimal point and set top margin
function setUI() {

   	z = z.toFixed(2);	// adjusting decimal point to 2
	var margin = '0px';
	if(z > 25){
		margin = '140px';
	} else if(z < -25){
		margin = '562px';
	}else{
		var unit = 326 - (z * 8);
		margin = unit+'px';
	}
	var parentElement = document.getElementById('needle');
	parentElement.innerHTML = z;
	parentElement.style.marginTop = margin;
	handleVibration(z);
}

function fadeMessage() {
	document.getElementById('vibration_message').classList.toggle('fade');
}
