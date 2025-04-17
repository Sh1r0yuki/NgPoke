import { TruncatePipe } from './truncate.pipe';

fdescribe('Test du pipe truncate', () => {
  it('1. Should create the Instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('2. Should correctly parse an empty string', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('')).toBe('');
  });

  it('3. Should correctly parse an 10 length string', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('abcdefghij')).toBe('abcdefghij');
  });

  it('4. Should correctly parse an 30 length string', () => {
    const pipe = new TruncatePipe();
    expect(pipe.transform('abcdefghijabcdefghijabcdefghij')).toBe(
      'abcdefghijabcdefghij...'
    );
  });
});
