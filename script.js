const context = new (window.AudioContext || window.webkitAudioContext)();
    let screamCount1 = 0;
    function scream1(){
        const audio= document.getElementById('screamSound').cloneNode();
        audio.volume = Math.min(1,0.5 + screamCount * 0.2);
        audio.play();
        screamCount1++;

    }
    document.addEventListener("keydown",scream1);
    
    async function scream() {
      const response = await fetch('sound1.mp3.mpeg'); // Add your scream.mp3 to same folder
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      const source = context.createBufferSource();
      source.buffer = audioBuffer;

      // Distortion node (optional but fun)
      const gain = context.createGain();
      gain.gain.value = 0.5 + screamCount * 0.2; // increase volume slightly with each click

      const playbackRate = 1 + (Math.random() * 0.2); // slightly faster each time
      source.playbackRate.value = playbackRate;

      // Connect and play
      source.connect(gain).connect(context.destination);
      source.start();

      screamCount++;

    }
document.addEventListener("keydown",() => {
      scream();
    });