// 
//
//     { name: 'Adventures', url: 'music/Adventures.mp3' },
//     { name: 'Last Summer', url: 'music/Last_Summer.mp3' },
//     { name: 'Lemon Cake', url: 'music/Lemon_Cake' },
//     { name: 'Spring', url: 'music/Spring.mp3' },
//     { name: 'Where Are We', url: 'music/Where_Are_We.mp3' },
//
// window.onload = function () {

//     var file = document.getElementById("thefile");
//     var audio = document.getElementById("audio");
//     var playlistElem = document.getElementById('playlist');

//     var myAudio = document.getElementById("myAudio");
//     var isPlaying = false;

//     function togglePlay() {
//         isPlaying ? myAudio.pause() : myAudio.play();
//     };

//     myAudio.onplaying = function () {
//         isPlaying = true;
//     };
//     myAudio.onpause = function () {
//         isPlaying = false;
//     };




//     file.onchange = function () {
//         var files = this.files;
//         audio.src = URL.createObjectURL(files[0]);
//         audio.load();
//         audio.play();
//         var context = new AudioContext();
//         var src = context.createMediaElementSource(audio);
//         var analyser = context.createAnalyser();

//         var canvas = document.getElementById("canvas");
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         var ctx = canvas.getContext("2d");

//         src.connect(analyser);
//         analyser.connect(context.destination);

//         analyser.fftSize = 256;

//         var bufferLength = analyser.frequencyBinCount;
//         console.log(bufferLength);

//         var dataArray = new Uint8Array(bufferLength);

//         var WIDTH = canvas.width;
//         var HEIGHT = canvas.height;

//         var barWidth = (WIDTH / bufferLength) * 2.5;
//         var barHeight;
//         var x = 0;

//         function renderFrame() {
//             requestAnimationFrame(renderFrame);

//             x = 0;

//             analyser.getByteFrequencyData(dataArray);

//             ctx.fillStyle = "#000";
//             ctx.fillRect(0, 0, WIDTH, HEIGHT);

//             for (var i = 0; i < bufferLength; i++) {
//                 barHeight = dataArray[i];

//                 var r = barHeight + (25 * (i / bufferLength));
//                 var g = 250 * (i / bufferLength);
//                 var b = 50;

//                 ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//                 ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

//                 x += barWidth + 1;
//             }
//         }

//         audio.play();
//         renderFrame();
//     };
// };

// var file = document.getElementById("thefile");
// var audio = document.getElementById("audio");
// var playlistElem = document.getElementById('playlist');

// file.onchange = function () {
//     var files = this.files;
//     audio.src = URL.createObjectURL(files[0]);
//         audio.load();
//         audio.play();
//         createVisualiser(audio);
//         audio.play();
//     };

// function createVisualiser(audio) {
//     var context = new AudioContext();
//     var src = context.createMediaElementSource(audio);
//     var analyser = context.createAnalyser();

//     var canvas = document.getElementById("canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     var ctx = canvas.getContext("2d");

//     src.connect(analyser);
//     analyser.connect(context.destination);

//     analyser.fftSize = 256;

//     var bufferLength = analyser.frequencyBinCount;
//     console.log(bufferLength);

//     var dataArray = new Uint8Array(bufferLength);

//     var WIDTH = canvas.width;
//     var HEIGHT = canvas.height;

//     var barWidth = (WIDTH / bufferLength) * 2.5;
//     var barHeight;
//     var x = 0;

//     function renderFrame() {
//         requestAnimationFrame(renderFrame);

//         x = 0;

//         analyser.getByteFrequencyData(dataArray);

//         ctx.fillStyle = "#000";
//         ctx.fillRect(0, 0, WIDTH, HEIGHT);

//         for (var i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i];

//             var r = barHeight + (25 * (i / bufferLength));
//             var g = 250 * (i / bufferLength);
//             var b = 50;

//             ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//             ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

//             x += barWidth + 1;
//         }
//     }

    
//     renderFrame();
//     }


// let canvas = document.getElementById("audio_visual");

// let ctx = canvas.getContext("2d");
// let audioElement = document.getElementById("source");
// let audioCtx = new AudioContext();
// let analyser = audioCtx.createAnalyser();
// analyser.fftSize = 2048;
// let source = audioCtx.createMediaElementSource(audioElement);
// source.connect(analyser);
// source.connect(audioCtx.destination);
// let data = new Uint8Array(analyser.frequencyBinCount);
// requestAnimationFrame(loopingFunction);
// analyser.getByteFrequencyData(data); //passing our Uint data array


// function loopingFunction() {
//     requestAnimationFrame(loopingFunction);
//     analyser.getByteFrequencyData(data);
//     draw(data);
// }

// function draw(data) {
//     data = [...data];
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     let space = canvas.width / data.length;
//     data.forEach((value, i) => {
//         ctx.beginPath();
//         ctx.moveTo(space * i, canvas.height); //x,y
//         ctx.lineTo(space * i, canvas.height - value); //x,y
//         ctx.stroke();
//     })
// }

// audioElement.onplay = () => {

//     audioCtx.resume();
// }


// set to the size of device
canvas = document.getElementById("renderer");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");

// find the center of the window
center_x = canvas.width / 2;
center_y = canvas.height / 2;
radius = 150;

//draw a circle
ctx.beginPath();
ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
ctx.stroke();

for (var i = 0; i < bars; i++) {

    //divide a circle into equal parts
    rads = Math.PI * 2 / bars;

    bar_height = 100;
    bar_width = 2;

    x = center_x + Math.cos(rads * i) * (radius);
    y = center_y + Math.sin(rads * i) * (radius);
    x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
    y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

    //draw a bar
    drawBar(x, y, x_end, y_end, bar_width);

}
var canvas, ctx, center_x, center_y, radius, bars,
    x_end, y_end, bar_height, bar_width,
    frequency_array;

bars = 200;
bar_width = 2;

function initPage() {

    audio = new Audio();
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();

    audio.src = "music/Where_Are_We.mp3"; // the source path
    audio.muted = 'muted';
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);


    frequency_array = new Uint8Array(analyser.frequencyBinCount);

    audio.play();
    animationLooper();
}

function animationLooper() {

    // set to the size of device
    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    // find the center of the window
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    radius = 150;

    // style the background
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw a circle
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    analyser.getByteFrequencyData(frequency_array);
    for (var i = 0; i < bars; i++) {

        //divide a circle into equal parts
        rads = Math.PI * 2 / bars;

        bar_height = frequency_array[i] * 0.7;

        // set coordinates
        x = center_x + Math.cos(rads * i) * (radius);
        y = center_y + Math.sin(rads * i) * (radius);
        x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
        y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

        //draw a bar
        drawBar(x, y, x_end, y_end, bar_width, frequency_array[i]);

    }
    window.requestAnimationFrame(animationLooper);
}

// for drawing a bar
function drawBar(x1, y1, x2, y2, width, frequency) {

    var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

window.onload = function () {
    initPage();
}
