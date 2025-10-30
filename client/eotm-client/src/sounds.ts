export const onClickSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785736/switch_light1_an8ola.wav';
export const writeJournalSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785036/task_gzi29g.wav';
export const mapSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761803155/map_szgykj.wav';
export const profileSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761785015/book_2_xeekad.wav';
export const travelSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761787093/inv_open_aql2rd.wav';
export const journalSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761787951/book_4_lm8f0h.wav';
export const destinationSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761800847/inv_close_ggpdwn.wav';
export const likeSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761802705/like_ommlwd.wav';
export const dislikeSound = 'https://res.cloudinary.com/dhucaqc0o/video/upload/v1761802782/dislike_bsgwfn.wav';


const sounds: string[] = [
  onClickSound,
  writeJournalSound,
  mapSound,
  profileSound,
  travelSound,
  journalSound,
  destinationSound,
  likeSound,
  dislikeSound
];


const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: Record<string, AudioBuffer> = {};


export const preloadSounds = async (): Promise<void> => {
  const promises = sounds.map(async (src) => {
    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);
      audioBuffers[src] = buffer;
    } catch (err) {
      console.warn(`Failed to preload sound: ${src}`, err);
    }
  });

  await Promise.all(promises);
  console.log('All sounds preloaded');
};


export const playSound = (sound: string, volume: number = 1.0): void => {
  const buffer = audioBuffers[sound];
  if (!buffer) {
    console.warn(`Sound not loaded yet: ${sound}`);
    return;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

  source.connect(gainNode).connect(audioCtx.destination);
  source.start(0);
};


window.addEventListener('load', () => {
  preloadSounds().catch(err => console.error('Sound preload failed:', err));
});
