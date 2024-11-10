import { OpenAIProvider } from './providers/openai.js';
import { AnthropicProvider } from './providers/anthropic.js';
import { CohereProvider } from './providers/cohere.js';

export class LLMFactory {
  static create(provider) {
    switch (provider.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider();
      case 'anthropic':
        return new AnthropicProvider();
      case 'cohere':
        return new CohereProvider();
      default:
        throw new Error(`Unsupported LLM provider: ${provider}`);
    }
  }
}