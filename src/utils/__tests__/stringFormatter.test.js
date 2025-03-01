import { formatString } from '../stringFormatter';

describe('formatString', () => {
    it('should capitalize the first letter of each word', () => {
        const input = 'hello world';
        const expected = 'Hello World';
        const result = formatString(input);
        expect(result).toBe(expected);
    });

    it('should return an empty string if input is empty', () => {
        const input = '';
        const expected = '';
        const result = formatString(input);
        expect(result).toBe(expected);
    });

    it('should handle strings with multiple spaces', () => {
        const input = '  hello    world  ';
        const expected = '  Hello    World  ';
        const result = formatString(input);
        expect(result).toBe(expected);
    });

    it('should return the same string if there are no lowercase letters', () => {
        const input = 'HELLO WORLD';
        const expected = 'HELLO WORLD';
        const result = formatString(input);
        expect(result).toBe(expected);
    });
});
