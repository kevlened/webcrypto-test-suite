const subtle = crypto.subtle;

const algorithms = {
  HS256: { name: 'HMAC', hash: { name: 'SHA-256' }},
  HS384: { name: 'HMAC', hash: { name: 'SHA-384' }},
  HS512: { name: 'HMAC', hash: { name: 'SHA-512' }},
  RS256: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' }},
  RS384: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-384' }},
  RS512: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-512' }},
  ES256: { name: 'ECDSA', hash: { name: 'SHA-256' }, namedCurve: 'P-256' },
  ES384: { name: 'ECDSA', hash: { name: 'SHA-384' }, namedCurve: 'P-384' },
  ES512: { name: 'ECDSA', hash: { name: 'SHA-512' }, namedCurve: 'P-521' }
};

const keys = {
  HS256: {
    shared: {alg: 'HS256', ext: true, k: 'exbIckCHFGdUfuPRwjXFXK_IqYMpFM30LoJYSHp-y4IQyO0YRDh0atzudr1S0UK1_tKn5BehGDk129N1is179g', key_ops: ['sign', 'verify'], kty: 'oct'},
  },
  HS384: {
    shared: {alg: 'HS384', ext: true, k: 'WV6mfck3BpEJfm_THCfew7IGIOAMqFQAuqen1LnoNAv8WfcvARPG77ei4Q_f-yi1GK8uoqkbTxDfvBwNxrE-G-1-nuagsHHluF-VpMnfNzLrXbZB-MQO3kMDUsYf7JtjbhpxxtvIdzTHzwl9j4YLvB90FoJwMMP0Y5LB2LlC8lQ', key_ops: ['sign', 'verify'], kty: 'oct'},
  },
  HS512: {
    shared: {alg: 'HS512', ext: true, k: 'wVCi2ajYM2L_9ku0Lqq_Xj5Ui8zCkpS8ltCdILgj3UN7eM4H7KMHTBJFp9oVqgIc1JyMxly2eWLxGOxamXhukSOQlsQIqC_G5sG-z4p2uknZIn3nNjKHLQSCrh16usQ0h-N5b4nEsZURtnTx9PtAE9ef8H5ja0VvLHvz0lE1OXs', key_ops: ['sign', 'verify'], kty: 'oct'},
  },
  RS256: {
    public: {alg: 'RS256', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'p0V6QDPjsjB2CddNxzjUVXKpGAODmqjS0QPMGSDXD_bR_kTyA2zwt2bKOyIyuOvmy8kp7En7hEebopKH9codgGnlZBV47xeyk24NaqI9ZTelrXjXOBjhNF13vTCaVTEI4a9-YFZhi_y07I-QJRU1k6c8vWLEQ6HljboX7YCtN6T1tUzu9-ZZ7qwbHZhZHN4YbbGQfmXJMflzzJ6FnT1qKmtt9zwrMgqhm_KXVuGq9G1LzWFo06nCZD3xJSwFT5d8qbG9gC3jHFaGF_1Vr3ywMAzkO2xGuOuuG0Rq1Nbl_n0yFCgBzYG6q7wEnMc1FUTfOBwj0Cj9CmT_VGSfTPjDoQ'},
    private: {alg: 'RS256', d: 'h-frbD68wgqd3WER0MxbuRFwUhKI2yBQKYLsUX5dPptMA0wBVscszda2eVVP4O_KlcjcRx_VO6TyzyQ_U3Tkg3GG78qCd8DJVwAT5o_rUlHkSw3jz7BnSiSnJRBYVN-CV9w-0gddOmAYoBwFAhw5a751m2qkDE9-M6j_x_jExG_yyxxdNPsdK5meY3CUljLKHimlC0X57kAyKhGuPglR5bYZX37-pTeguEhN2HhPrCNwuAu3-dwwwx0t-o6lQjpBmRKlWmYlMHnYL--WeUsSdWSxDH3kPQQfNOGrj0QoLIwBf0Yco8THtqE7utN3nKlO4gPGKQXvhnm3mB8D97wB', dp: 'rQqcRXB26UOVzsDYkqKjMWz3xKJAxv4bESrFinEp5Lcv3H-ZcniMZDLM_AhV_bqDiPq2I8m6SyezDq3QSvRd7GpuBNydONQYGjWpZa1uMnw4FkA0V9PtNvzneBVEwuvE46UMGFY7hN4eVQi5jENmFYlBvQ_bNwBlVLZiuFWQTJk', dq: 'quM9NcwJPKxrYgVMphJoUtloOUYYgl_J8wz2zqtXK3ZL8OQO4SvOBM370T4-L76doIX0Of5gn12ZeOerMwW14nBryzcgxKCN3ydz4mYTpTLPqVeFli7vrbFbBaAajxSs-diMLActblcNXF-nf-i5sgKepPtFLm7YFaa7fA3fjgk', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n:'p0V6QDPjsjB2CddNxzjUVXKpGAODmqjS0QPMGSDXD_bR_kTyA2zwt2bKOyIyuOvmy8kp7En7hEebopKH9codgGnlZBV47xeyk24NaqI9ZTelrXjXOBjhNF13vTCaVTEI4a9-YFZhi_y07I-QJRU1k6c8vWLEQ6HljboX7YCtN6T1tUzu9-ZZ7qwbHZhZHN4YbbGQfmXJMflzzJ6FnT1qKmtt9zwrMgqhm_KXVuGq9G1LzWFo06nCZD3xJSwFT5d8qbG9gC3jHFaGF_1Vr3ywMAzkO2xGuOuuG0Rq1Nbl_n0yFCgBzYG6q7wEnMc1FUTfOBwj0Cj9CmT_VGSfTPjDoQ', p: '1P9RmWhJF5Ojox6SXfT6mctHlidT6bQ-QJn4Q8T1Jb6LcbvqmqYscMG3V-T3_qf5SQ-ZIxCuCjF3mrm25Bxy_s3xyxgfc8Mr_b0xmjmmJ5Un-2K1kLZFqi9QeBKQQT1MURzy1k9mp4OUo8LGoRFYOqf7wsB9lU4v076WWDE9Ckk', q: 'yQrU_I31esjsa7Pf3ZWzCBdlWNrc7MdMRmEXrcTwMM-HX9H4fyQ47nfhX0mTU4INt9cHu-OAcAw_Bk4-NR5gKmF_pZMT-bN6fbE4URwjZnLvzTm4A-GICJIaQPwzTNQEWYbdCSMtBQZrIt7aLo2cvb1EfmJhcOgCaQmyc06Arpk', qi: 'gsX2O4w_BjXomeG2Ex0FyUQWiFaEKIYdFlhgcPxnWE4CGbVxxqs-Akc-xsp-TU1wffpj6Y6xcBs05VM_6-QRsFPEU6XIp6kPLbKZ4LvWUr5S8RbZd66bKDveCVdsfUTC9WbnqPUTxiqqGCa2Z0w3boaoPhA4erfncP5u0eUQmnI'},
  },
  RS384: {
    public: {alg: 'RS384', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'zJN18ACmEJ_nSr5d4fwuHl2DQJy9apG_Tkjd1RW_gD7PPhwPs7lR6-FB6zS__6Rl9W2NPLzhr0Q5LAE79e6gU-sMWajVSamntj3Fedap2LJJViwQPlPpmvoChANFRWopETxQwrQ18o-NP84YU-gT1TnjleHi5dBJFrqoP82zadbjR0QHGv2FXOfxYmJIX5aGxK3GPD4CpbguoEJ1phBwfmI8tLoOkS1e4BDloG1DXJ_t28xb8XA39ifpJFBWJhVdr9rPCozbRWw_w5xD8cQ__tixeYXnktGA5gORjoYgbjC8TPG9D4v3cOL8oxypn1ShVHAMsSkYHXY9REByJcNFjQ'},
    private: {alg: 'RS384', d: 'YSf9IFzmgUm3ykcLhjpCWth1b7egu555WQABHmREPO9XdDtWd7fhAKHLsR0tvAbDB2Kea4SWuCqx7kStydgo24HrLR-iH-hLRqEiioEYy9msO5kUo80tShVHIZP-D3_h_hYDktyMLGTho7ZI1nyHAsKJ49JR9GvNclZ2dkrGVNJHJOpsewJdNeZr5Gm7VmsHpKFSruDD3BqnpV19FvfPp_WDfT9zPAfLr_Oxr2J3S0bqWgJYSHLLSxQv3dFCJ0KlMj_LlIQJ3jVa2Bs66eMbks4erxi2vnkmUM07rvlMV7O0KwMlNDd1QI1vgd1Qe9RaPAxinogt6UXY_sjRfjhILw', dp: 'pZ-vYp5pDYlcMTRGGbkWJaCPhhSHyp1vCcFq2fDUn-ozGcSzcGrgDQ1eO8eiBmq0m0YWiZv1amat5iXwTk4syXf6kwi-OB1K4LXJaxR3TVC2eBfMKScnTsapbaid_o-gVwgvgf2k6aT1lZWh8RL9OJqG-9nC_KGEz8yOv_iUDSM', dq: 'f9qz0K-qWmuxS2anbnPpihUp4ylbwh9bWFLFgf-f5STOlsECVQI12eqhkymsikLvCtNFrXgHrLs-dkr9bEVlPRIMEdk3Nm9pT3ekEPIvicVG91DoD8ofW0QYfgfxWG77Rj4Ik058_u1IOrZrWL2_3FjpOwGnD9RdPxkO0qPiXIM', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n: 'zJN18ACmEJ_nSr5d4fwuHl2DQJy9apG_Tkjd1RW_gD7PPhwPs7lR6-FB6zS__6Rl9W2NPLzhr0Q5LAE79e6gU-sMWajVSamntj3Fedap2LJJViwQPlPpmvoChANFRWopETxQwrQ18o-NP84YU-gT1TnjleHi5dBJFrqoP82zadbjR0QHGv2FXOfxYmJIX5aGxK3GPD4CpbguoEJ1phBwfmI8tLoOkS1e4BDloG1DXJ_t28xb8XA39ifpJFBWJhVdr9rPCozbRWw_w5xD8cQ__tixeYXnktGA5gORjoYgbjC8TPG9D4v3cOL8oxypn1ShVHAMsSkYHXY9REByJcNFjQ', p: '_qODmif1jMqXOVaN5mATmDEVpFfWPno5OnR__LT_6hWmdOElAdJTCGLlSb3jrY9LGYWa5nMARbzGejyWSQG66_CgPz8n_w9pCBsDjfQKByu2ndozz1OeVjdJ43xbBAP1A4Q0Qvsu1VFK_rdS1tlti59OwORNIEVimgDeO9j85Lc', q: 'zatu66ToLe7xzLaEwRQGmQXGQXufew8FTsDHmNSZOVrT5IaNGsPnHiU7v9oyLi5eWlwu-xc2ZuF88keLEfhOSLJcWwt5ZzZFEybvv36CvHmuIOM1_9NBY7k4VU8QBO2rPfIUqAR5z2RP89OTSdulmtONsDQxJaQ0EzeXKZ7mS9s', qi: 'zznzwWLNW6pA3_0EY-PSUB-N1QOoE8xJ63PAwXdyJPokWNatkP80EC-Lx6qRfNxWsufNSBllKo9zaT0AhNX7wzQvzs5dBCBjLQFrtOyXmfWgNQ9mjQbs2x9N5668u5Vkr8rF7X8XTvRwkLy_lVN9aV9nOsFYsbgQKWtSHMNIneo'},
  },
  RS512: {
    public: {alg: 'RS512', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'tvkXuWnosKL_VVzr_7V0BzsNhR4JVvlbR_llfWrbwi3WtfudQ_vQ1PmyTuCIZI8Hqyadu_S0XVleUS_s5IIdTxQeGlIuE7D3tSIvfO5gkj9ISgOUQ_yZTo8ZRDMbHDSV9svV2XEsDUglE8-s_-J1Jv22lc4QrPIFxZm-W5hDE8iZiWx1Rh7oozJH742J0EnflfygVbngxnC8at_qtA1xYXeBSA_UaZvnlBsDXUiQXNhLPBcNKlhsAtEzei61zViOgiWwn6fPubjuxBOjLnYfHwtlQyd4GrwH0zrogSgsooq52Gxscw0ZtaSwVW9mqer0e8VHFak9VCOMnNa3T_j91Q'},
    private: {alg: 'RS512', d: 'BhwuVyI6w39F8IdQWDMqgz1NF8dnf3CHRFGHOpdxbDwUofIbj9QeZqZJ9olX9Ke0FVqOROMIjN95n1Nu4TiZGvVshet9n2m28-UG2fCp5-hWFSamcljCk9WCff0I6Dm3Ukz_QKofUvg4SL-UIt1glSM-0CTX-LaCS9V0_mEIyGXJdnB_2NiwUPg0Qmsb_N8Q48hGf8Q98Do8XVEtOznPkr5yZPrB_ggcC1BCBWtj5rpe5dsomMS81IyS86vcr1V-EZayrYG83A6uCvDM2TUhWLkq1ojRBaripbnsD6hnmSiwuj92E-26rb7t86X6mLMgJj-gVYAbRFqeHiQjh3nPEQ', dp: 'FQnLzNrI20WSuPK4fWhrMJbP3ZlrgEjLaSKtyWSnU2o2bHqBH6AgKCyeFF6-BhC7iFPSDplVHWmg4mAhbKe2zUhQ24_Gedc_s-ZsdRW9ciB5JH4Tocl3V0ZcABzHrv-KQoWJZwt38txW3sAjLN-KLqh07fTPCBjPYuN7INRbzcU', dq: 'B9RfbOl729Q0fTkwI9Xsch5_mpQGCUl8e518hLwFbTlW6aCb4W4k7lku_6Iv1rl3aiZWlXqFl1Y43U8vlJbAMmzNHfE4nz9wWZmB4hwUalhcJBMgdWET-FbtTNUWYnJNwZsj2TNShzP86plSgUy19dPxOXvUtKVk3UTy_AqFG1E', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n: 'tvkXuWnosKL_VVzr_7V0BzsNhR4JVvlbR_llfWrbwi3WtfudQ_vQ1PmyTuCIZI8Hqyadu_S0XVleUS_s5IIdTxQeGlIuE7D3tSIvfO5gkj9ISgOUQ_yZTo8ZRDMbHDSV9svV2XEsDUglE8-s_-J1Jv22lc4QrPIFxZm-W5hDE8iZiWx1Rh7oozJH742J0EnflfygVbngxnC8at_qtA1xYXeBSA_UaZvnlBsDXUiQXNhLPBcNKlhsAtEzei61zViOgiWwn6fPubjuxBOjLnYfHwtlQyd4GrwH0zrogSgsooq52Gxscw0ZtaSwVW9mqer0e8VHFak9VCOMnNa3T_j91Q', p: '8BS4fAlZHCWIYZi8psE4E7Pia3xISgJkvRhslyHdgFBRmtqVPwqk2v3qjvKC0m61eLpBdM52mvq1bK1NdqrhVODCKukLhy_PSPn_iEcT62b7inZ9Ev5mpaGOQ1g08kfSzXx_VcIsO-xJEGeAjsOlhP-racRmvlUd_Hj64znBEH0', q: 'wxr80Mgz6Wx3R_--TIOhAHs0FWDQboeq1rm8FEyGDxCPkifcYMG9FEHujwIXD4GrFWPwzCEBJ4BPxZoTchzjfzibOtNHffY6HWHfQcwSiSDAxbhpLLsFZO4N_kkfTC-FWEadVP44s7ynSNUVeZi_zyBrNgc4sodAsoAfPqNAOjk', qi: 'lBbhr6TY1bYKQZg90IN-FuMgQgquCisLt5cOL7Ut8XYcaIdV_QCy9ajHHrF4MBnc-L2DdO1uhGd8ex6DY_4U5wWhWyFDuzscwBFXXRDUPTu-VmulCQ-iIwKjpNMO1XSVtJnwIRC0hb4NH_Y0hLSurxW4IHaqcSnpwHW3RPyb-QA'},
  },
  ES256: {
    public: {crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '8B6DdEcf9LgGjkl07sjBmm43r_f_46chavGDCXdwTs4', y: 'ny6GcIxI8agD7zCZFfzMdh7PezRsU9UTra2BODJEE40'},
    private: {crv: 'P-256', d: 'cpNptDUu2vtVu3Hg21lQBP2fq1F7cetbijs2Q_Z7p7g', ext: true, key_ops: ['sign'], kty: 'EC', x: '8B6DdEcf9LgGjkl07sjBmm43r_f_46chavGDCXdwTs4', y: 'ny6GcIxI8agD7zCZFfzMdh7PezRsU9UTra2BODJEE40'},
  },
  ES384: {
    public: {crv: 'P-384', ext: true, key_ops: ['verify'], kty: 'EC', x: 'HkpD9lbkJQL8DRIqqOTFG-VMUX-asvxcGZ1XLpN5FM-VRHwtH0rCSGi1THHWk4x9', y: 'fG-hS1QebrLApgwFd7bCVIIAF1L3SNMrL_RKADi8JcHZkgKtSHjr8-ft7HG1lcuy'},
    private: {crv: 'P-384', d: 'KzEPTqZXwNAx5OIgRiUa-iw5dUnEe-i-fXemiyhCgNA8kpHQ64GPaVlsI4ZYeLrP', ext: true, key_ops: ['sign'], kty: 'EC', x: 'HkpD9lbkJQL8DRIqqOTFG-VMUX-asvxcGZ1XLpN5FM-VRHwtH0rCSGi1THHWk4x9', y: 'fG-hS1QebrLApgwFd7bCVIIAF1L3SNMrL_RKADi8JcHZkgKtSHjr8-ft7HG1lcuy'},
  },
  ES512: {
    public: {crv: 'P-521', ext: true, key_ops: ['verify'], kty: 'EC', x: 'AYCWh_Ke7CTWDY3ssog9SD8Ugjs7j_uUaZWcB1tR8upMkpd2peH4gp5BjtXYDEZrHQCF02YNWmuskyJttL6ZDp09', y: 'AfXjzgorxGOQFuGigV9Igm-5sqRiAJZWXzCHEjJjNj_SEtxC3N4iETCoUOhLys9nkV-t3Xog-1xYPIoQ0qUJ5157'},
    private: {crv: 'P-521', d: 'AT4boQwA47hWCiv0_220NwtyhJ5fRuSwukZh--SdNlh7YDUekEHoUbdI3s6Ss2hxnWMlF83r0cKLr5beQ7rjmCdb', ext: true, key_ops: ['sign'], kty: 'EC', x: 'AYCWh_Ke7CTWDY3ssog9SD8Ugjs7j_uUaZWcB1tR8upMkpd2peH4gp5BjtXYDEZrHQCF02YNWmuskyJttL6ZDp09', y: 'AfXjzgorxGOQFuGigV9Igm-5sqRiAJZWXzCHEjJjNj_SEtxC3N4iETCoUOhLys9nkV-t3Xog-1xYPIoQ0qUJ5157'},
  }
};

describe('webcrypto-test-suite', function() {
  ['HS256', 'HS384', 'HS512'].map(function(alg) {
    describe(alg, function() {
      it('generateKey', function() {
        return subtle.generateKey(
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'] // usages
        )
        .then(function(res) {
          expect(res).toBeDefined();
          expect(res.type).toEqual('secret');
          expect(res.extractable).toEqual(true);
          expect(res.usages).toEqual(['sign', 'verify']);
          expect(res.algorithm).toBeDefined();
          expect(res.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.algorithm.hash).toBeDefined();
          expect(res.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
        });
      });

      it('importKey', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].shared, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'], // usages
        )
        .then(function(res) {
          expect(res).toBeDefined();
          expect(res.type).toEqual('secret');
          expect(res.extractable).toEqual(true);
          expect(res.usages).toEqual(['sign', 'verify']);
          expect(res.algorithm).toBeDefined();
          expect(res.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.algorithm.hash).toBeDefined();
          expect(res.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
        });
      });

      it('exportKey', function() {
        const key = keys[alg].shared;
        return subtle.importKey(
          'jwk', // format
          key,
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'], // usages
        )
        .then(function(k) {
          return subtle.exportKey('jwk', k);
        })
        .then(function(res) {
          expect(res.alg).toEqual(key.alg);
          expect(res.ext).toEqual(key.ext);
          expect(res.key_ops).toEqual(['sign', 'verify']);
          expect(res.kty).toEqual(key.kty);
          expect(res.k).toEqual(key.k);
        });
      });
    });
  });

  ['RS256', 'RS384', 'RS512'].map(function(alg) {
    describe(alg, function() {
      it('generateKey', function() {
        const algo = Object.assign({
          modulusLength: 2048,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01])
        }, algorithms[alg]);
        return subtle.generateKey(
          algo,
          true, // extractable
          ['sign', 'verify'] // usages
        )
        .then(function(res) {
          expect(res.publicKey).toBeDefined();
          expect(res.publicKey.type).toEqual('public');
          expect(res.publicKey.extractable).toEqual(true);
          expect(res.publicKey.usages).toEqual(['verify']);
          expect(res.publicKey.algorithm).toBeDefined();
          expect(res.publicKey.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.publicKey.algorithm.hash).toBeDefined();
          expect(res.publicKey.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
          expect(res.publicKey.algorithm.modulusLength).toEqual(2048);
          expect(res.publicKey.algorithm.publicExponent).toEqual(new Uint8Array([1,0,1]));
  
          expect(res.privateKey).toBeDefined();
          expect(res.privateKey.type).toEqual('private');
          expect(res.privateKey.extractable).toEqual(true);
          expect(res.privateKey.usages).toEqual(['sign']);
          expect(res.privateKey.algorithm).toBeDefined();
          expect(res.privateKey.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.privateKey.algorithm.hash).toBeDefined();
          expect(res.privateKey.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
          expect(res.privateKey.algorithm.modulusLength).toEqual(2048);
          expect(res.privateKey.algorithm.publicExponent).toEqual(new Uint8Array([1,0,1]));
        });
      });

      describe('importKey', function() {
        it('imports a private key with key_ops', function() {
          return subtle.importKey(
            'jwk', // format
            keys[alg].private, // key
            algorithms[alg], // algo
            true, // extractable
            ['sign'], // usages
          )
          .then(function(res) {
            expect(res).toBeDefined();
            expect(res.type).toEqual('private');
            expect(res.extractable).toEqual(true);
            expect(res.usages).toEqual(['sign']);
            expect(res.algorithm).toBeDefined();
            expect(res.algorithm.name).toEqual(algorithms[alg].name);
            expect(res.algorithm.hash).toBeDefined();
            expect(res.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
            expect(res.algorithm.modulusLength).toEqual(2048);
            expect(res.algorithm.publicExponent).toEqual(new Uint8Array([1,0,1]));
          });
        });

        it('imports a private key without key_ops', function() {
          const key = Object.assign({}, keys[alg].private);
          delete key.key_ops;
          return subtle.importKey(
            'jwk', // format
            key,
            algorithms[alg], // algo
            true, // extractable
            ['sign'], // usages
          )
          .then(function(res) {
            expect(res).toBeDefined();
            expect(res.type).toEqual('private');
            expect(res.extractable).toEqual(true);
            expect(res.usages).toEqual(['sign']);
            expect(res.algorithm).toBeDefined();
            expect(res.algorithm.name).toEqual(algorithms[alg].name);
            expect(res.algorithm.hash).toBeDefined();
            expect(res.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
            expect(res.algorithm.modulusLength).toEqual(2048);
            expect(res.algorithm.publicExponent).toEqual(new Uint8Array([1,0,1]));
          });
        });

        it('imports a public key without key_ops', function() {
          const key = Object.assign({}, keys[alg].public);
          delete key.key_ops;
          return subtle.importKey(
            'jwk', // format
            key,
            algorithms[alg], // algo
            true, // extractable
            ['verify'], // usages
          )
          .then(function(res) {
            expect(res).toBeDefined();
            expect(res.type).toEqual('public');
            expect(res.extractable).toEqual(true);
            expect(res.usages).toEqual(['verify']);
            expect(res.algorithm).toBeDefined();
            expect(res.algorithm.name).toEqual(algorithms[alg].name);
            expect(res.algorithm.hash).toBeDefined();
            expect(res.algorithm.hash.name).toEqual(algorithms[alg].hash.name);
            expect(res.algorithm.modulusLength).toEqual(2048);
            expect(res.algorithm.publicExponent).toEqual(new Uint8Array([1,0,1]));
          });
        });
      });

      it('exportKey', function() {
        const key = keys[alg].private;
        return subtle.importKey(
          'jwk', // format
          key,
          algorithms[alg], // algo
          true, // extractable
          ['sign'], // usages
        )
        .then(function(k) {
          return subtle.exportKey('jwk', k);
        })
        .then(res => {
          expect(res.alg).toEqual(key.alg);
          expect(res.d).toEqual(key.d);
          expect(res.dp).toEqual(key.dp);
          expect(res.dq).toEqual(key.dq);
          expect(res.e).toEqual(key.e);
          expect(res.ext).toEqual(key.ext);
          expect(res.key_ops).toEqual(key.key_ops);
          expect(res.kty).toEqual(key.kty);
          expect(res.n).toEqual(key.n);
          expect(res.p).toEqual(key.p);
          expect(res.q).toEqual(key.q);
          expect(res.qi).toEqual(key.qi);
        });
      });
    });
  });

  ['ES256', 'ES384', 'ES512'].map(function(alg) {
    describe(alg, function() {
      it('generateKey', function() {
        return subtle.generateKey(
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'] // usages
        )
        .then(function(res) {
          expect(res.publicKey).toBeDefined();
          expect(res.publicKey.type).toEqual('public');
          expect(res.publicKey.extractable).toEqual(true);
          expect(res.publicKey.usages).toEqual(['verify']);
          expect(res.publicKey.algorithm).toBeDefined();
          expect(res.publicKey.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.publicKey.algorithm.namedCurve).toEqual(algorithms[alg].namedCurve);

          expect(res.privateKey).toBeDefined();
          expect(res.privateKey.type).toEqual('private');
          expect(res.privateKey.extractable).toEqual(true);
          expect(res.privateKey.usages).toEqual(['sign']);
          expect(res.privateKey.algorithm).toBeDefined();
          expect(res.privateKey.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.privateKey.algorithm.namedCurve).toEqual(algorithms[alg].namedCurve);
        });
      });

      it('importKey', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].private, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign'], // usages
        )
        .then(function(res) {
          expect(res).toBeDefined();
          expect(res.type).toEqual('private');
          expect(res.extractable).toEqual(true);
          expect(res.usages).toEqual(['sign']);
          expect(res.algorithm).toBeDefined();
          expect(res.algorithm.name).toEqual(algorithms[alg].name);
          expect(res.algorithm.namedCurve).toEqual(algorithms[alg].namedCurve);
        });
      });

      it('exportKey', function() {
        const key = keys[alg].private;
        return subtle.importKey(
          'jwk', // format
          key,
          algorithms[alg], // algo
          true, // extractable
          ['sign'], // usages
        )
        .then(function(k) {
          return subtle.exportKey('jwk', k);
        })
        .then(function(res) {
          expect(res.crv).toEqual(key.crv);
          expect(res.ext).toEqual(key.ext);
          expect(res.key_ops).toEqual(key.key_ops);
          expect(res.kty).toEqual(key.kty);
          expect(res.d).toEqual(key.d);
          expect(res.x).toEqual(key.x);
          expect(res.y).toEqual(key.y);
        });
      });
    });
  });
});
