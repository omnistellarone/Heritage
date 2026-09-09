// Web Audio API ambient chime synthesizer for serene background sound
let audioCtx: AudioContext | null = null;
let isPlaying = false;
let intervalId: number | null = null;

export const toggleAmbientChime = (onStateChange?: (playing: boolean) => void) => {
  if (isPlaying) {
    stopAmbientChime();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startAmbientChime();
    if (onStateChange) onStateChange(true);
    return true;
  }
};

export const startAmbientChime = () => {
  if (isPlaying) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    audioCtx = new AudioContextClass();
    isPlaying = true;

    // Play initial serene chime chord
    playSereneChord();

    // Loop soft chimes every 12 seconds
    intervalId = window.setInterval(() => {
      if (isPlaying && audioCtx) {
        playSereneChord();
      }
    }, 12000);
  } catch (err) {
    console.warn('AudioContext not allowed or supported', err);
  }
};

export const stopAmbientChime = () => {
  isPlaying = false;
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch (e) {}
    audioCtx = null;
  }
};

const playSereneChord = () => {
  if (!audioCtx) return;
  
  // E-major pentatonic serene frequencies (E4, G#4, B4, E5, F#5)
  const freqs = [329.63, 415.30, 493.88, 659.25, 739.99];
  
  freqs.forEach((freq, index) => {
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const now = audioCtx.currentTime + index * 0.4; // Staggered arpeggio
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.5); // Soft swell
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.0); // Gentle 6-second fade decay

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 6.2);
  });
};
