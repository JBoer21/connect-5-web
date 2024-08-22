describe('Testing setup', () => {
    test('basic test setup is working', () => {
      expect(true).toBe(true);
    });
  
    test('basic math operations work', () => {
      expect(1 + 1).toBe(2);
      expect(5 - 3).toBe(2);
      expect(2 * 3).toBe(6);
      expect(10 / 2).toBe(5);
    });
  
    test('string operations work', () => {
      expect('hello'.length).toBe(5);
      expect('hello '.trim()).toBe('hello');
      expect('hello'.toUpperCase()).toBe('HELLO');
    });
  
    test('array operations work', () => {
      const array = [1, 2, 3];
      expect(array.length).toBe(3);
      expect(array.includes(2)).toBe(true);
      expect(array.indexOf(4)).toBe(-1);
    });
  });
  