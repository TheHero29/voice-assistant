export class SpeechService {
  constructor() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      throw new Error('Speech recognition is not supported in this browser');
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.isListening = false;
    
    this.synthesis = window.speechSynthesis;
  }

  onStart(callback) {
    this.recognition.onstart = () => {
      this.isListening = true;
      callback();
    };
  }

  onResult(callback) {
    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      callback(transcript);
    };
  }

  onEnd(callback) {
    this.recognition.onend = () => {
      this.isListening = false;
      const finalTranscript = Array.from(this.recognition.results || [])
        .map(result => result[0].transcript)
        .join('');
      callback(finalTranscript);
    };
  }

  onError(callback) {
    this.recognition.onerror = (event) => {
      this.isListening = false;
      callback(event.error);
    };
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  async speak(text) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      this.synthesis.speak(utterance);
    });
  }
}