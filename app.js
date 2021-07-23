let audioAnalyser;
let freqArray;

///modal related functions
let modal = document.getElementById('theModal');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

let modalButton = document.getElementsByClassName('modal-button');
function toggleModal(){
    modal.style.display = 'flex';
}



function visualize() {
    //setup Web Audio API 
    let audio = new Audio();
    //fix CORS error
    audio.crossOrigin = "anonymous";
    //set context for either chrome or safari browsers
    audioContext = new (window.AudioContext || window.webkitAudioContext);

    audioAnalyser = audioContext.createAnalyser();
   
    audio.src = document.getElementById('songChoice').value;
    let source = audioContext.createMediaElementSource(audio);
    source.connect(audioAnalyser);
    audioAnalyser.connect(audioContext.destination);

    freqArray = new Uint8Array(audioAnalyser.frequencyBinCount);

    document.getElementById("play").style.display = "none";
    document.getElementById('nav').style.display = 'flex';
    audio.play();

   //select animation type
    let option = document.getElementById('visChoice').value;
    switch(option){
        case 'circle':
            animateCircle();
            break;
        case 'classic':
            animatePlane();
            break;
        case 'wave':
            animateWave();
            break;
    }
}

function animateCircle() {
   
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext = canvas.getContext("2d");

    //background styling
    let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height); //x1, y1, x2, y2
    gradient.addColorStop(0, "rgba(26, 13, 21, 1)")  //offset, color
    gradient.addColorStop(1, "rgba(36, 45, 33, 1)")  //offset, color
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    //center of the circle
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = 200;
   
    //Draw the circle
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    canvasContext.stroke();

    // set number of bars to the slider value
    let bars = document.getElementById('barNum').value;
    const theta = 2 * Math.PI / bars;
    audioAnalyser.getByteFrequencyData(freqArray);
    for (let i = 0; i < bars; ++i) {
        let barHeight = freqArray[i] * 0.62;

        //start point
        let startX = centerX + radius * Math.cos(theta * i);
        let startY = centerY + radius * Math.sin(theta * i);

        //endpoint
        let endX = centerX + (radius + barHeight) * Math.cos(theta * i);
        let endY = centerY + (radius + barHeight) * Math.sin(theta * i);

        //draw that bar
        drawBar(startX, startY, endX, endY, freqArray[i], canvasContext);
    }

    window.requestAnimationFrame(animateCircle);
}

function drawBar(startX, startY, endX, endY, freq, canvasContext) {
    // barColor = "rgba(" + freq + ", " + freq + ", " + 205 + ")";

    let barColor = document.getElementById('color').value;
    
    // let barWidth = 2;
    let barWidth = document.getElementById('barWidth').value;

    canvasContext.strokeStyle = barColor;
    canvasContext.lineWidth = barWidth;
    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.stroke();
}


function animatePlane(){
    
    //setup the canvas
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext = canvas.getContext("2d");

    //canvas background
    let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height); //x1, y1, x2, y2
    gradient.addColorStop(0, "rgba(26, 13, 21, 1)")  //offset, color
    gradient.addColorStop(1, "rgba(36, 45, 33, 1)")  //offset, color
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    let bufferLength = audioAnalyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    //let bars = document.getElementById('barNum').value;

    // let barWidth = document.getElementById('barWidth').value;
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    function draw() {
        requestAnimationFrame(draw);

        x = 0;

        audioAnalyser.getByteFrequencyData(dataArray);

        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            // canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            canvasContext.fillStyle = document.getElementById('color').value;
            canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    draw();
    
}

function animateWave(){
    // //setup the canvas
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext = canvas.getContext("2d");

    // //canvas background
    

    let bufferLength = audioAnalyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let bars = document.getElementById('barNum').value;
    function draw(){
        requestAnimationFrame(draw);
        audioAnalyser.getByteTimeDomainData(dataArray);
        let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height); //x1, y1, x2, y2
        gradient.addColorStop(0, "rgba(26, 13, 21, 1)")  //offset, color
        gradient.addColorStop(1, "rgba(36, 45, 33, 1)")  //offset, color
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        // canvasContext.lineWidth = 2;
        canvasContext.lineWidth = document.getElementById('barWidth').value;
        // canvasContext.strokeStyle = 'rgb(0, 0, 0)';
        canvasContext.strokeStyle = document.getElementById('color').value;
        canvasContext.beginPath();
        //let sliceWidth = WIDTH * 1.0 / bufferLength;
        let sliceWidth = WIDTH * 1.0 / bars;

        let x = 0;
        for (let i = 0; i < bufferLength; i++) {

            let v = dataArray[i] / 128.0;
            let y = v * HEIGHT / 2;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }
        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    }
    draw();
}


///play pause functionality

function pause(){
    if (audioContext.state === 'running') {
        audioContext.suspend();
    }
}

function resume() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function replay(){
  
    audioContext.close().then(visualize());
}


///collapsable sidebar functionality

function toggleClass(){
    let nav = document.getElementById('nav');
    nav.classList.toggle('active');
};


  

