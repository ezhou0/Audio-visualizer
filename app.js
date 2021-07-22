let audioAnalyser;
let freqArray;

function visualize() {
    //setup Web Audio API 
    let audio = new Audio();
    //fix CORS error
    audio.crossOrigin = "anonymous";
    //set context for either chrome or safari browsers
    audioContext = new (window.AudioContext || window.webkitAudioContext);

    audioAnalyser = audioContext.createAnalyser();
    // audio.src = "music/Adventures.mp3";
    audio.src = document.getElementById('songChoice').value;
    let source = audioContext.createMediaElementSource(audio);
    source.connect(audioAnalyser);
    audioAnalyser.connect(audioContext.destination);

    freqArray = new Uint8Array(audioAnalyser.frequencyBinCount);

    document.getElementById("play").style.display = "none";
    document.getElementById('nav').style.display = 'flex';
    audio.play();

    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContext = canvas.getContext("2d");
    // animatePlane();
    let option = document.getElementById('visChoice').value;
    switch(option){
        case 'circle':
            animateCircle();
            break;
        case 'classic':
            animatePlane();
            break;
    }
}

function animateCircle() {
    //setup the canvas
    // let canvas = document.getElementById("canvas");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvasContext = canvas.getContext("2d");

    //center of the circle
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = 200;
   

    //background styling
    let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height); //x1, y1, x2, y2
    gradient.addColorStop(0, "rgba(26, 13, 21, 1)")  //offset, color
    gradient.addColorStop(1, "rgba(36, 45, 33, 1)")  //offset, color
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    //Draw the circle
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    canvasContext.stroke();

    // const bars = 250;
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
    // let canvas = document.getElementById("canvas");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvasContext = canvas.getContext("2d");

    let gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height); //x1, y1, x2, y2
    gradient.addColorStop(0, "rgba(26, 13, 21, 1)")  //offset, color
    gradient.addColorStop(1, "rgba(36, 45, 33, 1)")  //offset, color
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    let bars = document.getElementById('barNum').value;
    audioAnalyser.getByteFrequencyData(freqArray);
    var bufferLength = audioAnalyser.frequencyBinCount;
    
    for (var i = 0; i < bars; i++) {
        let barHeight = freqArray[i];
        let x = 0;
        let y = 0;
        drawPlane(x, y, freqArray[i], canvasContext, barHeight);
       x+=1;
    }
    requestAnimationFrame(animatePlane);
}

function drawPlane(x, y, freq, canvasContext, barHeight) {
    //
   
    let barColor = document.getElementById('color').value;

    // let barWidth = 2;
    let barWidth = document.getElementById('barWidth').value;

    canvasContext.fillStyle = barColor;
    canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
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

  

