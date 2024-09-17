import { cn } from '../../lib/utils';

describe('cn function', () => {
  it('should merge class names correctly', () => {
    const result = cn('class1', 'class2', { 'class3': true, 'class4': false });
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle mixed types of inputs', () => {
    const result = cn('class1', { 'class2': true }, ['class3', 'class4']);
    expect(result).toBe('class1 class2 class3 class4');
  });
});
