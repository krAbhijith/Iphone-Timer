const minute = document.getElementById("min")
const mil = document.getElementById("mil")
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapTime = document.getElementById("lap-time");
const lapNo = document.getElementById("lap-no");
const list = document.getElementById("list");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let pause = true;
let lap = true
let intervalId;
let hrs = 0;
let min = 0;
let sec = 0;
let millis = 0;
let lapCounter = [];

startBtn.addEventListener("click", () => {
    if(!pause){
        resetBtn.textContent = "Reset"
        startBtn.textContent = "Start"
        startBtn.style.backgroundColor = 'rgba(0, 128, 0, 0.486)'
        startBtn.style.color = 'rgb(26, 218, 26)'
        pause = true;
        lap = true;
        elapsedTime = Date.now() - startTime;
        console.log(elapsedTime);
        clearInterval(intervalId);
    }
    else{
        startBtn.textContent = "Stop";
        resetBtn.textContent = "Lap";
        startBtn.style.backgroundColor = 'rgba(102, 1, 1, 0.705)';
        startBtn.style.color = 'red';
        pause = false;
        lap = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    }
});

resetBtn.addEventListener("click", () => {
    if(!lap){
        list.innerHTML += '<li id="lap-no">Lap <span id="lap-time">00:00.00</span></li><hr>' 
    }else{
        clearInterval(intervalId);
        pause = true;
        startTime = 0;
        elapsedTime = 0;
        currentTime = 0;
        hrs = 0;
        min = 0;
        sec = 0;
        millis = 0;
        minute.style.fontSize = '80px'
        mil.style.fontSize = '80px'
        minute.textContent = `00:00.`; 
        mil.textContent = `00`;
        list.innerHTML = '';
    }
});

function updateTime(){
    elapsedTime = Date.now() - startTime;
    millis = elapsedTime % 100;
    sec = Math.floor((elapsedTime / 1000) % 60);
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);

    sec = zero(sec);
    min = zero(min);
    hrs = zero(hrs);
    
    minute.style.fontSize = '80px'
    mil.style.fontSize = '80px'
    minute.textContent = `${min}:${sec}.`; 
    mil.textContent = `${millis}`; 
    lapTime.textContent = `${min}:${sec}.${millis}`;

    function zero(time){
        return (("0") + time).length > 2 ? time : "0" + time;
    }

}
