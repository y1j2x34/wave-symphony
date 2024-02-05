import { hello } from '@/index';
import { describe, it, expect } from 'vitest';

describe('hello', () => {
    it('should say hello to the world', () => {
        expect(hello()).toBe('world');
    });
});
