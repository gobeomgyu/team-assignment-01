type SoundKind = 'click' | 'navigate' | 'ballOpen' | 'appear';

const EFFECT_VOLUME = 1;
let audioContext: AudioContext | undefined;
let bgmStarted = false;

function getAudioContext() {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

function noise(context: AudioContext, startAt: number, duration: number, volume: number) {
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume * EFFECT_VOLUME, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(startAt);
}

function tone(
  context: AudioContext,
  startAt: number,
  frequency: number,
  endFrequency: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
  gain.gain.setValueAtTime(volume * EFFECT_VOLUME, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

export function playSound(kind: SoundKind = 'click') {
  try {
    const context = getAudioContext();
    const play = () => {
      const now = context.currentTime;
      if (kind === 'ballOpen') {
        noise(context, now, 0.11, 0.22);
        tone(context, now, 150, 90, 0.12, 0.2, 'square');
        tone(context, now + 0.07, 360, 980, 0.32, 0.16, 'sawtooth');
        tone(context, now + 0.12, 740, 1320, 0.28, 0.12, 'triangle');
      } else if (kind === 'appear') {
        [392, 523, 659, 988].forEach((frequency, index) => {
          tone(context, now + index * 0.095, frequency, frequency * 1.06, 0.28, 0.14 - index * 0.012, 'triangle');
        });
        noise(context, now + 0.27, 0.2, 0.09);
      } else if (kind === 'navigate') {
        tone(context, now, 330, 620, 0.13, 0.16, 'triangle');
        tone(context, now + 0.08, 620, 880, 0.13, 0.12, 'sine');
      } else {
        tone(context, now, 720, 480, 0.08, 0.1, 'sine');
      }
    };

    if (context.state === 'suspended') void context.resume().then(play);
    else play();
  } catch {
    // Sound is optional; unsupported or restricted audio must not block controls.
  }
}

function musicNote(
  context: AudioContext,
  destination: AudioNode,
  startAt: number,
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.018);
  gain.gain.setValueAtTime(volume, startAt + Math.max(0.02, duration - 0.06));
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain).connect(destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

function scheduleMusicLoop(context: AudioContext, master: GainNode) {
  const step = 60 / 124 / 2;
  const melody = [
    659, 784, 988, 784, 880, 784, 659, 587,
    659, 784, 1047, 988, 880, 784, 659, 784,
    523, 659, 784, 880, 784, 659, 587, 659,
    698, 880, 1047, 880, 784, 698, 659, 784,
  ];
  const bass = [131, 131, 147, 165, 175, 165, 147, 196];
  const pads = [[262, 330, 392], [294, 370, 440], [349, 440, 523], [330, 415, 494]];
  const start = context.currentTime + 0.06;

  melody.forEach((frequency, index) => {
    musicNote(context, master, start + index * step, frequency, step * 1.35, 0.58, 'triangle');
    if (index % 2 === 0) {
      musicNote(context, master, start + index * step, frequency / 2, step * 1.8, 0.14, 'sine');
    }
  });
  bass.forEach((frequency, index) => {
    musicNote(context, master, start + index * step * 4, frequency, step * 3.7, 0.58, 'sine');
    musicNote(context, master, start + (index * 4 + 2) * step, frequency * 2, step * 1.2, 0.12, 'triangle');
  });
  pads.forEach((chord, index) => {
    chord.forEach(frequency => {
      musicNote(context, master, start + index * step * 8, frequency, step * 7.7, 0.085, 'sine');
    });
  });

  const loopDuration = melody.length * step;
  window.setTimeout(() => scheduleMusicLoop(context, master), loopDuration * 1000);
}

function startBackgroundMusic() {
  if (bgmStarted) return;
  bgmStarted = true;
  const context = getAudioContext();
  const begin = () => {
    const master = context.createGain();
    const softFilter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    master.gain.value = 0.02;
    softFilter.type = 'lowpass';
    softFilter.frequency.value = 1900;
    softFilter.Q.value = 0.7;
    master.connect(softFilter).connect(compressor).connect(context.destination);
    scheduleMusicLoop(context, master);
  };
  if (context.state === 'suspended') void context.resume().then(begin);
  else begin();
}

export function enableInterfaceSounds(root: Document | HTMLElement = document) {
  root.addEventListener('pointerdown', startBackgroundMusic, { once: true });
  root.addEventListener('keydown', startBackgroundMusic, { once: true });

  root.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest<HTMLButtonElement | HTMLAnchorElement>('button, a.brand');
    if (!control || ('disabled' in control && control.disabled)) return;

    if (control.matches('.nav-button, .dex-dot, .back-button, .action-button, a.brand')) playSound('navigate');
    else if (!control.classList.contains('pokeball-choice')) playSound('click');
  });
}
