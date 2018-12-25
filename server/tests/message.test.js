const expect = require('expect');

const { generateMessage } = require("../utils/message")

describe('generateMessage', () => {
  it('Should generate the correct message object', () => {
      let message = generateMessage('Harrison', 'Hello there!');
      expect(message.from).toBe('Harrison');
      expect(message.text).toBe('Hello there!');
      expect(typeof message.createdAt === 'number');
  });
});