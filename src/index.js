import dotenv from 'dotenv';
import { LLMService } from './llm/llmService.js';
import { recordAudio } from './audio/recorder.js';
import { transcribe } from './speech/transcriber.js';
import { speak } from './audio/speaker.js';

dotenv.config();

const llmService = new LLMService();

async function handleVoiceInput() {
  try {
    console.log('Listening...');
    const audioBuffer = await recordAudio();
    
    console.log('Transcribing...');
    const text = await transcribe(audioBuffer);
    console.log('You said:', text);
    
    console.log('Generating response...');
    const response = await llmService.generateResponse(text);
    console.log('Assistant:', response);
    
    console.log('Speaking response...');
    await speak(response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function main() {
  try {
    console.log('Voice Assistant started');
    console.log('Press Ctrl+C to exit');
    
    while (true) {
      await handleVoiceInput();
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();