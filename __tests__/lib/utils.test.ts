import { cn, sanitizeFileContent } from '../../lib/utils';

    describe('Utility functions', () => {
      it('should merge class names correctly', () => {
        const result = cn('class1', 'class2', { 'class3': true, 'class4': false });
        expect(result).toBe('class1 class2 class3');
      });

      it('should handle empty inputs correctly for cn', () => {
        const result = cn();
        expect(result).toBe('');
      });

      it('should sanitize file content correctly', () => {
        const dirtyContent = 'Sample content \u0000 with invalid characters \uFFFD.';
        const cleanContent = sanitizeFileContent(dirtyContent);
        expect(cleanContent).toBe('Sample content  with invalid characters .');
      });
    });
