const { parseMessage, formatMessage, handleError } = require('../../src/utils/helpers');

describe('Helper Functions', () => {
  describe('parseMessage', () => {
    it('should correctly parse a JSON string', () => {
      const message = JSON.stringify({ text: 'Hello, World!' });
      expect(parseMessage(message)).toEqual({ text: 'Hello, World!' });
    });

    it('should throw an error for invalid JSON', () => {
      const message = 'Invalid JSON';
      expect(() => parseMessage(message)).toThrow(SyntaxError);
    });
  });

  describe('formatMessage', () => {
    it('should correctly format a message', () => {
      const message = { text: 'Hello, World!' };
      expect(formatMessage(message)).toBe(JSON.stringify(message));
    });
  });

  describe('handleError', () => {
    it('should log the error message', () => {
      console.error = jest.fn();
      const error = new Error('An error occurred');
      handleError(error);
      expect(console.error).toHaveBeenCalledWith('An error occurred');
    });
  });
});