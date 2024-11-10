import record from 'node-record-lpcm16';

export function recordAudio(duration = 5000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    
    const recorder = record.record({
      sampleRate: 16000,
      channels: 1,
      audioType: 'wav'
    });

    recorder.stream()
      .on('data', chunk => chunks.push(chunk))
      .on('error', error => reject(error));

    setTimeout(() => {
      recorder.stop();
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    }, duration);
  });
}