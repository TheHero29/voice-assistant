import { Groq } from 'groq-sdk';

export class GroqProvider {
  constructor() {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is required');
    }
    
    this.client = new Groq({
      apiKey: import.meta.env.VITE_GROQ_API_KEY
    });
  }

  async generateResponse(input) {
    try {
      const completion = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}