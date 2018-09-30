self.AudioContext = (self.AudioContext || self.webkitAudioContext);
async function trollTransform(audioBuffer) {

  let ctx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

  // Source
  let source = ctx.createBufferSource();
  source.buffer = audioBuffer;

  // Wobble
  let oscillator1 = ctx.createOscillator();
  oscillator1.frequency.value = -10;
  oscillator1.type = 'sawtooth';

  let oscillator2 = ctx.createOscillator();
  oscillator2.frequency.value = 50;
  oscillator2.type = 'sawtooth';

  let oscillator3 = ctx.createOscillator();
  oscillator3.frequency.value = 30;
  oscillator3.type = 'sawtooth';
  // ---
  let oscillatorGain = ctx.createGain();
  oscillatorGain.gain.value = 0.007;
  // ---
  let oscillatorGain2 = ctx.createGain();
  oscillatorGain2.gain.value = 0.007;
  // ---
  let delay = ctx.createDelay();
  delay.delayTime.value = 0.01;
  // ---
  let delay2 = ctx.createDelay();
  delay2.delayTime.value = 0.01;

  let filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2000;

  let compressor = ctx.createDynamicsCompressor();
  let compressor2 = ctx.createDynamicsCompressor();
  let compressor3 = ctx.createDynamicsCompressor();
  let compressor4 = ctx.createDynamicsCompressor();
  let compressor5 = ctx.createDynamicsCompressor();

  // Create graph
  oscillator1.connect(oscillatorGain);
  oscillator2.connect(oscillatorGain);
  // oscillator3.connect(oscillatorGain);
  oscillatorGain.connect(delay.delayTime);
  // ---
  source.connect(compressor2)
  compressor2.connect(delay);
  delay.connect(compressor3)
  compressor3.connect(filter);
  filter.connect(compressor5)


  oscillator3.connect(oscillatorGain2);
  oscillatorGain2.connect(delay2.delayTime);

  source.connect(compressor)
  compressor.connect(delay2);
  delay2.connect(compressor4)
  compressor4.connect(filter)
  filter.connect(compressor5);

  compressor5.connect(ctx.destination);
  //
  //filter.connect(ctx.destination);
  //compressor.connect(ctx.destination);

  // source.connect(delay);
  // delay.connect(filter);
  // filter.connect(ctx.destination);

  // Render
  oscillator1.start(0);
  oscillator2.start(0);
  oscillator3.start(0);
  source.start(0);
  // fire.start(0);
  let outputAudioBuffer = await ctx.startRendering();
  return outputAudioBuffer;

}
