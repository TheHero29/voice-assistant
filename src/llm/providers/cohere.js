import { CohereClient } from 'cohere-ai';

export class CohereProvider {
  constructor() {
    this.client = new CohereClient({
      token: process.env.COHERE_API_KEY
    });
  }

  async generateResponse(input) {
    try {
      const response = await this.client.generate({
        prompt: input,
        model: 'command',
        maxTokens: 300
      });
      return response.generations[0].text;
    } catch (error) {
      throw new Error(`Cohere Error: ${error.message}`);
    }
  }
}