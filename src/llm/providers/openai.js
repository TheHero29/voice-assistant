import OpenAI from 'openai';

export class OpenAIProvider {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateResponse(input) {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'gpt-3.5-turbo',
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI Error: ${error.message}`);
    }
  }
}