const ua = navigator.userAgent;
const isSafari = ua.includes('Safari') && !ua.includes('Chrome');
const isEdge = ua.includes('Edge');
require('./')({
  crypto,
  shouldSkip(spec) {
    if (isSafari) {
      if (spec.includes('ES512')) return true;
      if (spec.includes('RS384') && spec.includes('exportKey')) return true;
      if (spec.includes('RS512') && spec.includes('exportKey')) return true;
    }
    if (isEdge) {
      if (spec.includes('ES256')) return true;
      if (spec.includes('ES384')) return true;
      if (spec.includes('ES512')) return true;
      if (spec.includes('RS256') && spec.includes('importKey')) return true;
      if (spec.includes('RS256') && spec.includes('exportKey')) return true;
      if (spec.includes('RS256') && spec.includes('generateKey')) return true;
      if (spec.includes('RS256') && spec.includes('sign')) return true;
      if (spec.includes('RS384') && spec.includes('importKey')) return true;
      if (spec.includes('RS384') && spec.includes('generateKey')) return true;
      if (spec.includes('RS512') && spec.includes('importKey')) return true;
      if (spec.includes('RS512') && spec.includes('generateKey')) return true;
    }
  }
});

// Must be run last. Check for console due to IE<10
describe('WebWorker compatibility', function() {
  it('skips all if "describe is undefined"', function() {
    delete window.describe;
    spyOn(console, 'log');
    require('./')();
    expect(console.log).toHaveBeenCalledWith('No global "describe" function found for specs');
  });
});
