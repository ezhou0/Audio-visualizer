window.onload = function (){
   

    // const audio1 = document.getElementById('audio1');
    // let audio1mus = new Audio('Adventures.mp3');
    // audio1.addEventListener('click', function(){
    //     if (!audio1mus.paused) { /* Check if it's not paused */
    //         audio1mus.pause();  
    //     }
    //     else {
            
    //         audio1mus.play();
    //         /* To make it play again */
    //         visualizer();
    //            audio1mus.play();
    //     }
       
    // });
    
    let musicDropdown = document.getElementById('music-dropdown');
    let playbtn = document.getElementById('playbtn');
    let pausebtn = document.getElementById('pausebtn');

    // const container = document.getElementById('container');
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    let audioSource;
    let analyser;
    
    

    playbtn.addEventListener('click', function(){
        const musicSelect = musicDropdown.value;

        
        switch(musicSelect){
            case 'Adventures.mp3': 
                console.log(musicSelect);
                currAudio.src = musicSelect;
                currAudio.play();
                visualize();
                break;
            case 'Last_Summer.mp3':
                console.log(musicSelect);
                currAudio.src = musicSelect;
                currAudio.play();
                visualize();
                break;
            default: 
                break;
        }

        let currAudio = new Audio();
        const audioContext = new AudioContext();
        audioSource = audioContext.createMediaElementSource(currAudio);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const barWidth = canvas.width / bufferLength;
        let barHeight;
        let x = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                ctx.fillStyle = 'white';
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            }
            requestAnimationFrame(animate);
        }
        animate();
    });

    pausebtn.addEventListener('click', function(){
        console.log('pause');
        currAudio.pause();
    });

    
    



    




    
    // var visualizer = function () {


    //     var context = new AudioContext();
    //     var src = context.createMediaElementSource(currAudio);
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

    //         //ctx.fillStyle = "blue";
    //         var my_gradient = ctx.createLinearGradient(0, 0, canvas.width -100, 0);
    //         my_gradient.addColorStop(0, '#ff6e7f');
    //         my_gradient.addColorStop(1, '#bfe9ff');
    //         ctx.fillStyle = my_gradient;
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

       
    //     context = new window.AudioContext();
    //     analyser = context.createAnalyser();

    //     audio.src = ""; // the source path
    //     source = context.createMediaElementSource(audio);
    //     source.connect(analyser);
    //     analyser.connect(context.destination);


    //     frequency_array = new Uint8Array(analyser.frequencyBinCount);

        
    //     animationLooper();
    // }

    // function animationLooper() {

    //     // set to the size of device
    //     canvas = document.getElementById("renderer");
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    //     ctx = canvas.getContext("2d");

    //     // find the center of the window
    //     center_x = canvas.width / 2;
    //     center_y = canvas.height / 2;
    //     radius = 150;

    //     // style the background
    //     var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //     gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    //     gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    //     ctx.fillStyle = gradient;
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     //draw a circle
    //     ctx.beginPath();
    //     ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    //     ctx.stroke();

    //     analyser.getByteFrequencyData(frequency_array);
    //     for (var i = 0; i < bars; i++) {

    //         //divide a circle into equal parts
    //         rads = Math.PI * 2 / bars;

    //         bar_height = frequency_array[i] * 0.7;

    //         // set coordinates
    //         x = center_x + Math.cos(rads * i) * (radius);
    //         y = center_y + Math.sin(rads * i) * (radius);
    //         x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
    //         y_end = center_y + Math.sin(rads * i) * (radius + bar_height);

    //         //draw a bar
    //         drawBar(x, y, x_end, y_end, bar_width, frequency_array[i]);

    //     }
    //     window.requestAnimationFrame(animationLooper);
    // }

    // // for drawing a bar
    // function drawBar(x1, y1, x2, y2, width, frequency) {

    //     var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";

    //     ctx.strokeStyle = lineColor;
    //     ctx.lineWidth = width;
    //     ctx.beginPath();
    //     ctx.moveTo(x1, y1);
    //     ctx.lineTo(x2, y2);
    //     ctx.stroke();
    // }



}

