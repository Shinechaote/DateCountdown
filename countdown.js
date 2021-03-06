var timeHTML;
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
Object.prototype.equals = function(b) {
    var a = this;
    for(i in a) {
        if(typeof b[i] == 'undefined') {
            return false;
        }
        if(typeof b[i] == 'object') {
            if(!b[i].equals(a[i])) {
                return false;
            }
        }
        if(b[i] != a[i]) {
            return false;
        }
    }
    for(i in b) {
        if(typeof a[i] == 'undefined') {
            return false;
        }
        if(typeof a[i] == 'object') {
            if(!a[i].equals(b[i])) {
                return false;
            }
        }
        if(a[i] != b[i]) {
            return false;
        }
    }
    return true;
}
function maxLengthCheck(object)
  {
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }
function setup(){
  if(isSafari){
    var date = new Date().getDate().toString();
    var month = (new Date().getMonth()+1).toString();
    var year = (new Date().getYear() + 1900).toString();
    document.getElementById('datePicker').type = "text";
    document.getElementById('datePicker').value = date + "." + month + "." + year;
  }
  else{
    document.getElementById('datePicker').valueAsDate = new Date();
  }
  document.getElementById('hours').value = new Date().getHours();
  document.getElementById("minutes").value = new Date().getMinutes();
	frameRate(60);
	timeHTML = daysOutput.innerHTML;
}
function draw(){
    var hours = 0;
    var minutes = 0;
    if(document.getElementById("hours").value < 0 || document.getElementById("hours").value >23 || document.getElementById("hours").value === null){
      document.getElementById("hours").style.backgroundColor = "red";
    }
    else{
      document.getElementById("hours").style.backgroundColor = null;
      hours = document.getElementById("hours").value;
    }
    if(document.getElementById("minutes").value < 0 || document.getElementById("minutes").value >59 || document.getElementById("minutes").value === null){
      document.getElementById("minutes").style.backgroundColor = "red";
    }
    else{
      document.getElementById("minutes").style.backgroundColor = null;
      minutes = document.getElementById("minutes").value;
    }
		var divisor=(1000*60*60*24);
		var unit = document.getElementById('format').value.toString();
		switch(document.getElementById('format').value.toString()){
			case "Milliseconds":
				divisor = (1);
				break;
			case "Seconds":
				divisor = (1000);
				break;
			case "Minutes":
				divisor = (1000*60);
				break;
			case "Hours":
				divisor = (1000*60*60);
				break;
			case "Days":
				break;
			case "Weeks":
				divisor = (1000*60*60*24*7);
				break;

		}
    var countdown_date = 0;
    if(isSafari){
      var countdown_date_arr = document.getElementById('datePicker').value.split(".");
      countdown_date = new Date(countdown_date_arr[2],countdown_date_arr[1]-1,countdown_date_arr[0]).getTime()+ hours*3600*1000 + minutes*60*1000;
    }
    else{
      var d = new Date();
      countdown_date = document.getElementById('datePicker').valueAsDate.getTime() + (hours- Math.trunc(-(d.getTimezoneOffset())/60))*3600*1000 + minutes*60*1000;
    }

		var current_date = new Date().getTime();
		var date_difference = countdown_date - current_date;

    date_difference = Math.trunc(date_difference / divisor);
		if(!timeHTML.equals("You have " + date_difference.toString() + " " + unit +" left")){
			daysOutput.innerHTML = "You have " + date_difference.toString() + " " + unit +" left";
		}

}
