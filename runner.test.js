const Runner = require('./Main.js');

describe('When there is no file name', () => {
  it('Returns (REQUIRED: filename and extension.)', () => {
    Runner()
      .then((result) => { expect(result).toBe('REQUIRED: filename and extension.'); });
  });
});
