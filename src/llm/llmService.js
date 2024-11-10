import { GroqProvider } from './providers/groq.js';

export class LLMService {
  constructor(provider = 'groq') {
    this.provider = this.createProvider(provider);
  }

  createProvider(type) {
    switch (type.toLowerCase()) {
      case 'groq':
        return new GroqProvider();
      default:
        throw new Error(`Unsupported LLM provider: ${type}`);
    }
  }

  async generateResponse(input) {
    try {
      return await this.provider.generateResponse(input);
    } catch (error) {
      console.error('LLM Service Error:', error);
      throw error;
    }
  }
}