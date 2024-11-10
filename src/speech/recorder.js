import recorder from 'node-record-lpcm16';

export function startRecording() {
  return new Promise((resolve) => {
    const audioBuffer = [];
    
    const recording = recorder.record({
      sampleRateHertz: 16000,
      threshold: 0.5,
      silence: '1.0',
      keepSilence: true,
      recordProgram: 'rec'
    });

    recording.stream()
      .on('data', chunk => audioBuffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(audioBuffer)));
  });
}