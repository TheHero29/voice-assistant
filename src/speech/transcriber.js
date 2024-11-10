import speech from '@google-cloud/speech';

const client = new speech.SpeechClient();

export async function transcribe(audioBuffer) {
  try {
    const audio = {
      content: audioBuffer.toString('base64')
    };
    
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US'
    };

    const request = {
      audio,
      config
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  } catch (error) {
    throw new Error(`Transcription failed: ${error.message}`);
  }
}