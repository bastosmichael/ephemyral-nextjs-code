import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2', { 'class3': true, 'class4': false });
    expect(result).toBe('class1 class2 class3');
  });

  it('handles undefined and null inputs', () => {
    const result = cn('class1', undefined, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    const result = cn('', 'class1', '', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles complex conditional classes', () => {
    const isActive = true;
    const isPrimary = false;
    const result = cn('base-class', {
      'active-class': isActive,
      'primary-class': isPrimary,
      'always-class': true,
    });
    expect(result).toBe('base-class active-class always-class');
  });
});
