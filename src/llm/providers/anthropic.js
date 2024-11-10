import Anthropic from 'anthropic';

export class AnthropicProvider {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async generateResponse(input) {
    const completion = await this.client.messages.create({
      model: 'claude-2',
      max_tokens: 1024,
      messages: [{ role: 'user', content: input }]
    });

    return completion.content;
  }
}