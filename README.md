# webcrypto-test-suite
A library to ensure your WebCrypto polyfill or shim works correctly

# Why?
I wanted to trust the various WebCrypto polyfills and shims. WebCrypto has a spec and, assuming modern browsers implemented the spec properly, this ensures the polyfills and shims are compliant with that spec.

# Usage
The tests are implemented as Jasmine tests. This allows them to be included with the Jasmine, or Jasmine-compatible, test suite of your own library.

First, add the library to your devDependencies:

`npm install --save-dev webcrypto-test-suite`

Now, in one of your specs:

```typescript
require('webcrypto-test-suite')({
  crypto: your_crypto_implementation,

  // optional function to skip certain specs
  shouldSkip(specNameArray) {
    if (specNameArray.includes('ES256')) {
      return true;
    }
  }
});
```

This will register the tests with Jasmine and the results will be included with the rest of your test suite.


# Testing the tests
The karma tests included in the repo should run against unprefixed versions of WebCrypto in modern browsers. The baseline keys and signatures were generated in Chrome.

To run:

```
git clone git@github.com:kevlened/webcrypto-test-suite.git
cd webcrypto-test-suite
npm install

# runs default browsers once
npm test

# keeps default browsers open and reruns on changes
npm start
```

Default browsers:

- Chrome - must have Chrome installed
- Firefox - must have Firefox installed
- Edge - must be running tests on Win10
- Safari - must be running tests on MacOS

For more variety, browsers can be run individually:

- `npm run test:Safari`
- `npm run test:SafariTechPreview`
- `npm run test:Edge`
- `npm run test:EdgeVM`
    - This requires VirtualBox. You must create a `EDGE_VIRTUAL_BOX_UUID` environment variable with the VM's UUID. The VM's UUID can be found by running `VBoxManage list vms`. Ensure you have the VM booted before running the tests.
- `npm run test:Chrome`
- `npm run test:ChromeHeadless`
- `npm run test:Firefox`
- `npm run test:FirefoxHeadless`

`npm run start:{browser}` also works for the browsers above.

# Known Issues
Although modern browsers may include unprefixed WebCrypto implementations, that doesn't mean they pass all the tests. For discrepancies (notably with Safari and Edge), see the tests that are skipped in `src/harness.js`.

# License
MIT
