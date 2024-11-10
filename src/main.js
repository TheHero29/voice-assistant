import { LLMService } from './llm/llmService.js';
import { SpeechService } from './speech/speechService.js';

class VoiceAssistant {
  constructor() {
    this.llmService = new LLMService();
    this.speechService = new SpeechService();
    this.startBtn = document.getElementById('startBtn');
    this.statusDiv = document.getElementById('status');
    this.transcriptDiv = document.getElementById('transcript');
    this.responseDiv = document.getElementById('response');
    
    this.startBtn.addEventListener('click', () => this.toggleListening());
    this.setupSpeechHandlers();
  }

  setupSpeechHandlers() {
    this.speechService.onStart(() => {
      this.startBtn.textContent = 'Stop Listening';
      this.updateStatus('Listening...');
    });

    this.speechService.onResult((transcript) => {
      this.transcriptDiv.textContent = `You: ${transcript}`;
    });

    this.speechService.onEnd(async (finalTranscript) => {
      if (finalTranscript) {
        this.startBtn.textContent = 'Start Listening';
        this.updateStatus('Processing...');
        
        try {
          const response = await this.llmService.generateResponse(finalTranscript);
          this.responseDiv.textContent = `Assistant: ${response}`;
          await this.speechService.speak(response);
        } catch (error) {
          this.updateStatus(`Error: ${error.message}`);
        }
      }
      this.updateStatus('Ready');
    });

    this.speechService.onError((error) => {
      this.updateStatus(`Error: ${error.message}`);
      this.startBtn.textContent = 'Start Listening';
    });
  }

  toggleListening() {
    if (this.speechService.isListening) {
      this.speechService.stop();
    } else {
      this.speechService.start();
    }
  }

  updateStatus(message) {
    this.statusDiv.textContent = message;
  }
}

new VoiceAssistant();