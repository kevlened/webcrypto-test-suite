const subtle = crypto.subtle;

const testBuffer = new Uint8Array([1,2,3]).buffer;

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
    signedBuffer: new Uint8Array([59, 244, 165, 1, 105, 69, 184, 153, 190, 16, 167, 134, 157, 130, 179, 49, 137, 147, 56, 255, 0, 8, 138, 131, 115, 50, 96, 254, 185, 187, 214, 31]).buffer
  },
  HS384: {
    shared: {alg: 'HS384', ext: true, k: 'WV6mfck3BpEJfm_THCfew7IGIOAMqFQAuqen1LnoNAv8WfcvARPG77ei4Q_f-yi1GK8uoqkbTxDfvBwNxrE-G-1-nuagsHHluF-VpMnfNzLrXbZB-MQO3kMDUsYf7JtjbhpxxtvIdzTHzwl9j4YLvB90FoJwMMP0Y5LB2LlC8lQ', key_ops: ['sign', 'verify'], kty: 'oct'},
    signedBuffer: new Uint8Array([50, 181, 167, 140, 125, 186, 142, 47, 193, 119, 9, 117, 201, 147, 108, 172, 245, 239, 211, 154, 35, 142, 203, 105, 193, 44, 96, 195, 52, 118, 159, 52, 120, 53, 30, 158, 38, 98, 91, 224, 162, 251, 145, 255, 95, 38, 215, 183]).buffer
  },
  HS512: {
    shared: {alg: 'HS512', ext: true, k: 'wVCi2ajYM2L_9ku0Lqq_Xj5Ui8zCkpS8ltCdILgj3UN7eM4H7KMHTBJFp9oVqgIc1JyMxly2eWLxGOxamXhukSOQlsQIqC_G5sG-z4p2uknZIn3nNjKHLQSCrh16usQ0h-N5b4nEsZURtnTx9PtAE9ef8H5ja0VvLHvz0lE1OXs', key_ops: ['sign', 'verify'], kty: 'oct'},
    signedBuffer: new Uint8Array([1, 74, 166, 3, 15, 141, 222, 221, 35, 124, 95, 182, 202, 23, 52, 91, 199, 135, 70, 175, 7, 3, 128, 81, 221, 104, 30, 197, 175, 172, 31, 166, 214, 152, 114, 32, 253, 29, 174, 135, 201, 111, 144, 9, 41, 101, 157, 85, 227, 116, 176, 54, 100, 215, 138, 94, 29, 166, 89, 243, 126, 142, 134, 119]).buffer
  },
  RS256: {
    public: {alg: 'RS256', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'p0V6QDPjsjB2CddNxzjUVXKpGAODmqjS0QPMGSDXD_bR_kTyA2zwt2bKOyIyuOvmy8kp7En7hEebopKH9codgGnlZBV47xeyk24NaqI9ZTelrXjXOBjhNF13vTCaVTEI4a9-YFZhi_y07I-QJRU1k6c8vWLEQ6HljboX7YCtN6T1tUzu9-ZZ7qwbHZhZHN4YbbGQfmXJMflzzJ6FnT1qKmtt9zwrMgqhm_KXVuGq9G1LzWFo06nCZD3xJSwFT5d8qbG9gC3jHFaGF_1Vr3ywMAzkO2xGuOuuG0Rq1Nbl_n0yFCgBzYG6q7wEnMc1FUTfOBwj0Cj9CmT_VGSfTPjDoQ'},
    private: {alg: 'RS256', d: 'h-frbD68wgqd3WER0MxbuRFwUhKI2yBQKYLsUX5dPptMA0wBVscszda2eVVP4O_KlcjcRx_VO6TyzyQ_U3Tkg3GG78qCd8DJVwAT5o_rUlHkSw3jz7BnSiSnJRBYVN-CV9w-0gddOmAYoBwFAhw5a751m2qkDE9-M6j_x_jExG_yyxxdNPsdK5meY3CUljLKHimlC0X57kAyKhGuPglR5bYZX37-pTeguEhN2HhPrCNwuAu3-dwwwx0t-o6lQjpBmRKlWmYlMHnYL--WeUsSdWSxDH3kPQQfNOGrj0QoLIwBf0Yco8THtqE7utN3nKlO4gPGKQXvhnm3mB8D97wB', dp: 'rQqcRXB26UOVzsDYkqKjMWz3xKJAxv4bESrFinEp5Lcv3H-ZcniMZDLM_AhV_bqDiPq2I8m6SyezDq3QSvRd7GpuBNydONQYGjWpZa1uMnw4FkA0V9PtNvzneBVEwuvE46UMGFY7hN4eVQi5jENmFYlBvQ_bNwBlVLZiuFWQTJk', dq: 'quM9NcwJPKxrYgVMphJoUtloOUYYgl_J8wz2zqtXK3ZL8OQO4SvOBM370T4-L76doIX0Of5gn12ZeOerMwW14nBryzcgxKCN3ydz4mYTpTLPqVeFli7vrbFbBaAajxSs-diMLActblcNXF-nf-i5sgKepPtFLm7YFaa7fA3fjgk', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n:'p0V6QDPjsjB2CddNxzjUVXKpGAODmqjS0QPMGSDXD_bR_kTyA2zwt2bKOyIyuOvmy8kp7En7hEebopKH9codgGnlZBV47xeyk24NaqI9ZTelrXjXOBjhNF13vTCaVTEI4a9-YFZhi_y07I-QJRU1k6c8vWLEQ6HljboX7YCtN6T1tUzu9-ZZ7qwbHZhZHN4YbbGQfmXJMflzzJ6FnT1qKmtt9zwrMgqhm_KXVuGq9G1LzWFo06nCZD3xJSwFT5d8qbG9gC3jHFaGF_1Vr3ywMAzkO2xGuOuuG0Rq1Nbl_n0yFCgBzYG6q7wEnMc1FUTfOBwj0Cj9CmT_VGSfTPjDoQ', p: '1P9RmWhJF5Ojox6SXfT6mctHlidT6bQ-QJn4Q8T1Jb6LcbvqmqYscMG3V-T3_qf5SQ-ZIxCuCjF3mrm25Bxy_s3xyxgfc8Mr_b0xmjmmJ5Un-2K1kLZFqi9QeBKQQT1MURzy1k9mp4OUo8LGoRFYOqf7wsB9lU4v076WWDE9Ckk', q: 'yQrU_I31esjsa7Pf3ZWzCBdlWNrc7MdMRmEXrcTwMM-HX9H4fyQ47nfhX0mTU4INt9cHu-OAcAw_Bk4-NR5gKmF_pZMT-bN6fbE4URwjZnLvzTm4A-GICJIaQPwzTNQEWYbdCSMtBQZrIt7aLo2cvb1EfmJhcOgCaQmyc06Arpk', qi: 'gsX2O4w_BjXomeG2Ex0FyUQWiFaEKIYdFlhgcPxnWE4CGbVxxqs-Akc-xsp-TU1wffpj6Y6xcBs05VM_6-QRsFPEU6XIp6kPLbKZ4LvWUr5S8RbZd66bKDveCVdsfUTC9WbnqPUTxiqqGCa2Z0w3boaoPhA4erfncP5u0eUQmnI'},
    signedBuffer: new Uint8Array([23, 243, 228, 22, 13, 116, 252, 99, 52, 101, 50, 178, 75, 4, 46, 142, 217, 18, 20, 195, 148, 89, 130, 146, 156, 232, 157, 135, 82, 251, 64, 247, 224, 188, 151, 233, 210, 1, 202, 64, 79, 147, 158, 91, 75, 246, 71, 230, 85, 136, 243, 201, 69, 48, 191, 85, 137, 138, 170, 190, 220, 153, 94, 172, 55, 137, 69, 225, 167, 55, 175, 107, 254, 86, 122, 27, 179, 88, 215, 137, 0, 159, 167, 204, 53, 67, 145, 113, 167, 183, 150, 18, 244, 68, 186, 36, 69, 225, 103, 145, 122, 241, 60, 10, 153, 6, 32, 253, 220, 8, 204, 6, 144, 88, 30, 58, 178, 227, 196, 132, 136, 242, 173, 222, 186, 24, 203, 56, 108, 193, 237, 215, 174, 136, 10, 170, 123, 218, 187, 73, 69, 250, 155, 181, 69, 152, 199, 238, 130, 12, 74, 132, 79, 66, 16, 164, 151, 155, 227, 82, 198, 154, 28, 74, 193, 81, 241, 161, 129, 89, 70, 232, 227, 129, 86, 154, 215, 201, 136, 210, 66, 161, 44, 8, 159, 136, 251, 1, 179, 53, 223, 242, 151, 106, 111, 212, 245, 86, 121, 237, 238, 227, 58, 12, 105, 134, 37, 73, 83, 177, 52, 112, 135, 180, 218, 183, 107, 75, 135, 209, 8, 114, 31, 255, 83, 12, 109, 203, 128, 113, 7, 239, 157, 243, 138, 19,211, 51, 140, 95, 122, 74, 108, 65, 93, 89, 172, 232, 237, 132, 195, 163, 202, 72, 206, 129]).buffer
  },
  RS384: {
    public: {alg: 'RS384', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'zJN18ACmEJ_nSr5d4fwuHl2DQJy9apG_Tkjd1RW_gD7PPhwPs7lR6-FB6zS__6Rl9W2NPLzhr0Q5LAE79e6gU-sMWajVSamntj3Fedap2LJJViwQPlPpmvoChANFRWopETxQwrQ18o-NP84YU-gT1TnjleHi5dBJFrqoP82zadbjR0QHGv2FXOfxYmJIX5aGxK3GPD4CpbguoEJ1phBwfmI8tLoOkS1e4BDloG1DXJ_t28xb8XA39ifpJFBWJhVdr9rPCozbRWw_w5xD8cQ__tixeYXnktGA5gORjoYgbjC8TPG9D4v3cOL8oxypn1ShVHAMsSkYHXY9REByJcNFjQ'},
    private: {alg: 'RS384', d: 'YSf9IFzmgUm3ykcLhjpCWth1b7egu555WQABHmREPO9XdDtWd7fhAKHLsR0tvAbDB2Kea4SWuCqx7kStydgo24HrLR-iH-hLRqEiioEYy9msO5kUo80tShVHIZP-D3_h_hYDktyMLGTho7ZI1nyHAsKJ49JR9GvNclZ2dkrGVNJHJOpsewJdNeZr5Gm7VmsHpKFSruDD3BqnpV19FvfPp_WDfT9zPAfLr_Oxr2J3S0bqWgJYSHLLSxQv3dFCJ0KlMj_LlIQJ3jVa2Bs66eMbks4erxi2vnkmUM07rvlMV7O0KwMlNDd1QI1vgd1Qe9RaPAxinogt6UXY_sjRfjhILw', dp: 'pZ-vYp5pDYlcMTRGGbkWJaCPhhSHyp1vCcFq2fDUn-ozGcSzcGrgDQ1eO8eiBmq0m0YWiZv1amat5iXwTk4syXf6kwi-OB1K4LXJaxR3TVC2eBfMKScnTsapbaid_o-gVwgvgf2k6aT1lZWh8RL9OJqG-9nC_KGEz8yOv_iUDSM', dq: 'f9qz0K-qWmuxS2anbnPpihUp4ylbwh9bWFLFgf-f5STOlsECVQI12eqhkymsikLvCtNFrXgHrLs-dkr9bEVlPRIMEdk3Nm9pT3ekEPIvicVG91DoD8ofW0QYfgfxWG77Rj4Ik058_u1IOrZrWL2_3FjpOwGnD9RdPxkO0qPiXIM', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n: 'zJN18ACmEJ_nSr5d4fwuHl2DQJy9apG_Tkjd1RW_gD7PPhwPs7lR6-FB6zS__6Rl9W2NPLzhr0Q5LAE79e6gU-sMWajVSamntj3Fedap2LJJViwQPlPpmvoChANFRWopETxQwrQ18o-NP84YU-gT1TnjleHi5dBJFrqoP82zadbjR0QHGv2FXOfxYmJIX5aGxK3GPD4CpbguoEJ1phBwfmI8tLoOkS1e4BDloG1DXJ_t28xb8XA39ifpJFBWJhVdr9rPCozbRWw_w5xD8cQ__tixeYXnktGA5gORjoYgbjC8TPG9D4v3cOL8oxypn1ShVHAMsSkYHXY9REByJcNFjQ', p: '_qODmif1jMqXOVaN5mATmDEVpFfWPno5OnR__LT_6hWmdOElAdJTCGLlSb3jrY9LGYWa5nMARbzGejyWSQG66_CgPz8n_w9pCBsDjfQKByu2ndozz1OeVjdJ43xbBAP1A4Q0Qvsu1VFK_rdS1tlti59OwORNIEVimgDeO9j85Lc', q: 'zatu66ToLe7xzLaEwRQGmQXGQXufew8FTsDHmNSZOVrT5IaNGsPnHiU7v9oyLi5eWlwu-xc2ZuF88keLEfhOSLJcWwt5ZzZFEybvv36CvHmuIOM1_9NBY7k4VU8QBO2rPfIUqAR5z2RP89OTSdulmtONsDQxJaQ0EzeXKZ7mS9s', qi: 'zznzwWLNW6pA3_0EY-PSUB-N1QOoE8xJ63PAwXdyJPokWNatkP80EC-Lx6qRfNxWsufNSBllKo9zaT0AhNX7wzQvzs5dBCBjLQFrtOyXmfWgNQ9mjQbs2x9N5668u5Vkr8rF7X8XTvRwkLy_lVN9aV9nOsFYsbgQKWtSHMNIneo'},
    signedBuffer: new Uint8Array([101, 184, 122, 207, 87, 59, 51, 34, 55, 150, 196, 120, 123, 167, 236, 226, 68, 179, 84, 223, 211, 81, 95, 171, 35, 42, 172, 106, 191, 19, 225, 251, 58, 247, 232, 50, 177, 46, 160, 141, 218, 232, 245, 24, 146, 235, 198, 99, 151, 29, 53, 201, 228, 69, 57, 4, 122, 237, 12, 140, 209, 1, 100, 220, 224, 68, 33, 58, 7, 215, 87, 121, 133, 160, 147, 251, 90, 142, 7, 153, 122, 85, 0, 72, 39, 40, 84, 241, 128, 175, 55, 242, 109, 174, 243, 184, 6, 236, 90, 189, 135, 144, 208, 87, 215, 207, 230, 22, 178, 165, 194, 103, 165, 55, 170, 187, 231, 123, 153, 141, 231, 143, 18, 216, 222, 86, 46, 23, 232, 215, 92, 23, 28, 218, 79, 19, 233, 220,25, 142, 24, 130, 88, 101, 172, 103, 116, 155, 63, 231, 226, 141, 182, 208, 208, 41, 160, 250, 155, 4, 206, 3, 42, 138, 150, 88, 253, 220, 25, 3, 90, 191, 13, 106, 45, 167, 184, 117, 41, 131, 107, 238, 80, 60, 32, 104, 246, 133, 106, 167, 96, 247, 56, 220, 211, 193, 42, 40, 202, 62, 43, 141, 246, 244, 59, 241, 13, 30, 28, 115, 150, 223, 103, 235, 157, 171, 218, 106, 46, 13, 168, 247, 225, 142, 108, 11, 8, 223, 145, 174, 195, 126, 194, 207, 39, 71, 96, 200, 184, 148, 157, 59, 64, 93, 156, 229, 66, 6, 99, 185, 112, 232, 104, 133, 83, 219]).buffer
  },
  RS512: {
    public: {alg: 'RS512', e: 'AQAB', ext: true, key_ops: ['verify'], kty: 'RSA', n: 'tvkXuWnosKL_VVzr_7V0BzsNhR4JVvlbR_llfWrbwi3WtfudQ_vQ1PmyTuCIZI8Hqyadu_S0XVleUS_s5IIdTxQeGlIuE7D3tSIvfO5gkj9ISgOUQ_yZTo8ZRDMbHDSV9svV2XEsDUglE8-s_-J1Jv22lc4QrPIFxZm-W5hDE8iZiWx1Rh7oozJH742J0EnflfygVbngxnC8at_qtA1xYXeBSA_UaZvnlBsDXUiQXNhLPBcNKlhsAtEzei61zViOgiWwn6fPubjuxBOjLnYfHwtlQyd4GrwH0zrogSgsooq52Gxscw0ZtaSwVW9mqer0e8VHFak9VCOMnNa3T_j91Q'},
    private: {alg: 'RS512', d: 'BhwuVyI6w39F8IdQWDMqgz1NF8dnf3CHRFGHOpdxbDwUofIbj9QeZqZJ9olX9Ke0FVqOROMIjN95n1Nu4TiZGvVshet9n2m28-UG2fCp5-hWFSamcljCk9WCff0I6Dm3Ukz_QKofUvg4SL-UIt1glSM-0CTX-LaCS9V0_mEIyGXJdnB_2NiwUPg0Qmsb_N8Q48hGf8Q98Do8XVEtOznPkr5yZPrB_ggcC1BCBWtj5rpe5dsomMS81IyS86vcr1V-EZayrYG83A6uCvDM2TUhWLkq1ojRBaripbnsD6hnmSiwuj92E-26rb7t86X6mLMgJj-gVYAbRFqeHiQjh3nPEQ', dp: 'FQnLzNrI20WSuPK4fWhrMJbP3ZlrgEjLaSKtyWSnU2o2bHqBH6AgKCyeFF6-BhC7iFPSDplVHWmg4mAhbKe2zUhQ24_Gedc_s-ZsdRW9ciB5JH4Tocl3V0ZcABzHrv-KQoWJZwt38txW3sAjLN-KLqh07fTPCBjPYuN7INRbzcU', dq: 'B9RfbOl729Q0fTkwI9Xsch5_mpQGCUl8e518hLwFbTlW6aCb4W4k7lku_6Iv1rl3aiZWlXqFl1Y43U8vlJbAMmzNHfE4nz9wWZmB4hwUalhcJBMgdWET-FbtTNUWYnJNwZsj2TNShzP86plSgUy19dPxOXvUtKVk3UTy_AqFG1E', e: 'AQAB', ext: true, key_ops: ['sign'], kty: 'RSA', n: 'tvkXuWnosKL_VVzr_7V0BzsNhR4JVvlbR_llfWrbwi3WtfudQ_vQ1PmyTuCIZI8Hqyadu_S0XVleUS_s5IIdTxQeGlIuE7D3tSIvfO5gkj9ISgOUQ_yZTo8ZRDMbHDSV9svV2XEsDUglE8-s_-J1Jv22lc4QrPIFxZm-W5hDE8iZiWx1Rh7oozJH742J0EnflfygVbngxnC8at_qtA1xYXeBSA_UaZvnlBsDXUiQXNhLPBcNKlhsAtEzei61zViOgiWwn6fPubjuxBOjLnYfHwtlQyd4GrwH0zrogSgsooq52Gxscw0ZtaSwVW9mqer0e8VHFak9VCOMnNa3T_j91Q', p: '8BS4fAlZHCWIYZi8psE4E7Pia3xISgJkvRhslyHdgFBRmtqVPwqk2v3qjvKC0m61eLpBdM52mvq1bK1NdqrhVODCKukLhy_PSPn_iEcT62b7inZ9Ev5mpaGOQ1g08kfSzXx_VcIsO-xJEGeAjsOlhP-racRmvlUd_Hj64znBEH0', q: 'wxr80Mgz6Wx3R_--TIOhAHs0FWDQboeq1rm8FEyGDxCPkifcYMG9FEHujwIXD4GrFWPwzCEBJ4BPxZoTchzjfzibOtNHffY6HWHfQcwSiSDAxbhpLLsFZO4N_kkfTC-FWEadVP44s7ynSNUVeZi_zyBrNgc4sodAsoAfPqNAOjk', qi: 'lBbhr6TY1bYKQZg90IN-FuMgQgquCisLt5cOL7Ut8XYcaIdV_QCy9ajHHrF4MBnc-L2DdO1uhGd8ex6DY_4U5wWhWyFDuzscwBFXXRDUPTu-VmulCQ-iIwKjpNMO1XSVtJnwIRC0hb4NH_Y0hLSurxW4IHaqcSnpwHW3RPyb-QA'},
    signedBuffer: new Uint8Array([5, 123, 224, 155, 133, 167, 149, 215, 194, 86, 151, 71, 77, 30, 154, 166, 155, 169, 185, 159, 129, 250, 227, 76, 240, 20, 76, 165, 11, 12, 152, 77, 184, 160, 177, 40, 138, 8, 79, 151, 60, 104, 50, 102, 216, 100, 231, 30, 81, 200, 175, 107, 206, 15, 222, 211, 168, 219, 107, 37, 67, 93, 121, 173, 33, 173, 126, 205, 221, 210, 157, 200, 245, 47, 75, 142, 134, 214, 234, 167, 66, 17, 118, 209, 28, 211, 142, 100, 58, 23, 118, 115, 125, 101, 72, 80, 236, 189, 85, 144, 168, 236, 112, 250, 165, 17, 227, 39, 152, 184, 137, 173, 13, 20, 253, 226, 231, 82, 254, 223, 44, 238, 33, 65, 104, 163, 124, 79, 175, 83, 3, 0, 86, 133, 23, 158, 114, 147, 225, 195, 14, 42, 62, 82, 209, 181, 193, 58, 143, 88, 191, 91, 206, 157, 234, 210, 60, 4, 92, 151, 239, 182, 31, 152, 98, 71, 217, 8, 253, 89, 77, 17, 182, 0, 1, 85, 5, 175, 199, 74, 152, 53, 254, 109, 192, 23, 167, 239, 75, 158, 4, 210, 89, 125, 168, 116, 220, 138, 57, 78, 144, 3, 162, 47, 164, 38, 204, 104, 179, 160, 15, 10, 92, 183, 244, 77, 200, 112, 230, 210, 13, 244, 32, 192, 149, 253, 130, 209, 62, 129, 18, 12, 37, 104, 186, 46, 232, 233, 221, 193, 222, 225, 61, 207, 40, 154, 173, 44, 136, 152, 89, 170, 181, 81, 195, 222]).buffer
  },
  ES256: {
    public: {crv: 'P-256', ext: true, key_ops: ['verify'], kty: 'EC', x: '8B6DdEcf9LgGjkl07sjBmm43r_f_46chavGDCXdwTs4', y: 'ny6GcIxI8agD7zCZFfzMdh7PezRsU9UTra2BODJEE40'},
    private: {crv: 'P-256', d: 'cpNptDUu2vtVu3Hg21lQBP2fq1F7cetbijs2Q_Z7p7g', ext: true, key_ops: ['sign'], kty: 'EC', x: '8B6DdEcf9LgGjkl07sjBmm43r_f_46chavGDCXdwTs4', y: 'ny6GcIxI8agD7zCZFfzMdh7PezRsU9UTra2BODJEE40'},
    signedBuffer: new Uint8Array([119, 66, 224, 126, 250, 75, 192, 4, 162, 253, 88, 65, 23, 23, 190, 245, 82, 199, 191, 170, 109, 165, 53, 165, 31, 105, 211, 52, 223, 240, 106, 43, 69, 197, 177, 180, 88, 240, 151, 231, 225, 77, 223, 238, 177, 124, 120, 148, 224, 87, 194, 71, 59, 113, 51, 149, 97, 76, 229, 126, 56, 184, 222, 58]).buffer
  },
  ES384: {
    public: {crv: 'P-384', ext: true, key_ops: ['verify'], kty: 'EC', x: 'HkpD9lbkJQL8DRIqqOTFG-VMUX-asvxcGZ1XLpN5FM-VRHwtH0rCSGi1THHWk4x9', y: 'fG-hS1QebrLApgwFd7bCVIIAF1L3SNMrL_RKADi8JcHZkgKtSHjr8-ft7HG1lcuy'},
    private: {crv: 'P-384', d: 'KzEPTqZXwNAx5OIgRiUa-iw5dUnEe-i-fXemiyhCgNA8kpHQ64GPaVlsI4ZYeLrP', ext: true, key_ops: ['sign'], kty: 'EC', x: 'HkpD9lbkJQL8DRIqqOTFG-VMUX-asvxcGZ1XLpN5FM-VRHwtH0rCSGi1THHWk4x9', y: 'fG-hS1QebrLApgwFd7bCVIIAF1L3SNMrL_RKADi8JcHZkgKtSHjr8-ft7HG1lcuy'},
    signedBuffer: new Uint8Array([212, 246, 245, 201, 86, 246, 166, 20, 192, 231, 218, 225, 233, 120, 74, 199, 52, 65, 153, 165, 30, 122, 197, 122, 208, 130, 109, 10, 34, 105, 44, 216, 97, 255, 165, 165, 213, 200, 223, 221, 12, 169, 103, 56, 225, 106, 9, 234, 0, 214, 211, 174, 188, 95, 118, 121, 114, 190, 164, 247, 234, 67, 128, 59, 80, 248, 178, 199, 234, 254, 130, 8, 77, 112, 82, 11, 86, 103, 184, 60, 115, 81, 220, 162, 127, 47, 220, 160, 160, 107, 176, 244, 46, 124, 185, 233]).buffer
  },
  ES512: {
    public: {crv: 'P-521', ext: true, key_ops: ['verify'], kty: 'EC', x: 'AYCWh_Ke7CTWDY3ssog9SD8Ugjs7j_uUaZWcB1tR8upMkpd2peH4gp5BjtXYDEZrHQCF02YNWmuskyJttL6ZDp09', y: 'AfXjzgorxGOQFuGigV9Igm-5sqRiAJZWXzCHEjJjNj_SEtxC3N4iETCoUOhLys9nkV-t3Xog-1xYPIoQ0qUJ5157'},
    private: {crv: 'P-521', d: 'AT4boQwA47hWCiv0_220NwtyhJ5fRuSwukZh--SdNlh7YDUekEHoUbdI3s6Ss2hxnWMlF83r0cKLr5beQ7rjmCdb', ext: true, key_ops: ['sign'], kty: 'EC', x: 'AYCWh_Ke7CTWDY3ssog9SD8Ugjs7j_uUaZWcB1tR8upMkpd2peH4gp5BjtXYDEZrHQCF02YNWmuskyJttL6ZDp09', y: 'AfXjzgorxGOQFuGigV9Igm-5sqRiAJZWXzCHEjJjNj_SEtxC3N4iETCoUOhLys9nkV-t3Xog-1xYPIoQ0qUJ5157'},
    signedBuffer: new Uint8Array([0, 70, 39, 13, 189, 184, 34, 252, 119, 97, 31, 26, 251, 224, 189, 1, 65, 194, 20, 46, 152, 84, 169, 193, 224, 143, 126, 215, 175, 89, 252, 247, 154, 83, 220, 106, 28, 181, 246, 55, 197, 220, 39, 8, 146, 14, 233, 148, 136, 78, 5, 21, 119, 58, 214, 50, 250, 31, 153, 170, 53, 75, 189, 246, 191, 45, 0, 121, 230, 221, 209, 182, 167, 177, 114, 102, 121, 88, 189, 164, 62, 242, 110, 7, 248, 167, 77, 85, 17, 117, 138, 92, 94, 19, 100, 232, 154, 21, 240, 170, 175, 194, 215, 80, 218, 89, 68, 108, 75, 227, 24, 130, 213, 231, 110, 73, 74, 45, 125, 147, 185, 172, 186, 32, 206, 209, 173, 203, 217, 131, 66, 50]).buffer
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

      it('sign', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].shared, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'], // usages
        )
        .then(function(signingKey) {
          return subtle.sign(
            algorithms[alg], // algo
            signingKey,
            testBuffer
          );
        })
        .then(function(signature) {
          expect(signature.constructor).toBe(ArrayBuffer);
          expect(new Uint8Array(signature)).toEqual(new Uint8Array(keys[alg].signedBuffer));
        });
      });

      it('verify', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].shared, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign', 'verify'], // usages
        )
        .then(function(verifyingKey) {
          return subtle.verify(
            algorithms[alg], // algo
            verifyingKey, // key
            keys[alg].signedBuffer,
            testBuffer
          );
        })
        .then(function(result) {
          expect(result).toEqual(true);
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

      it('sign', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].private, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign'], // usages
        )
        .then(function(signingKey) {
          return subtle.sign(
            algorithms[alg], // algo
            signingKey,
            testBuffer // buffer
          );
        })
        .then(function(signature) {
          expect(signature.constructor).toBe(ArrayBuffer);
          expect(new Uint8Array(signature)).toEqual(new Uint8Array(keys[alg].signedBuffer));
        });
      });

      it('verify', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].public, // key
          algorithms[alg], // algo
          true, // extractable
          ['verify'], // usages
        )
        .then(function(verifyingKey) {
          return subtle.verify(
            algorithms[alg], // algo
            verifyingKey, // key
            keys[alg].signedBuffer,
            testBuffer
          );
        })
        .then(function(result) {
          expect(result).toEqual(true);
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

      it('sign', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].private, // key
          algorithms[alg], // algo
          true, // extractable
          ['sign'], // usages
        )
        .then(function(signingKey) {
          return subtle.sign(
            algorithms[alg], // algo
            signingKey,
            testBuffer // buffer
          );
        })
        .then(function(signature) {
          expect(signature.constructor).toBe(ArrayBuffer);
          // every ES signature is different, so we immediately check the signature here
          return subtle.importKey(
            'jwk', // format
            keys[alg].public, // key
            algorithms[alg], // algo
            true, // extractable
            ['verify'], // usages
          )
          .then(function(verifyingKey) {
            return subtle.verify(
              algorithms[alg], // algo
              verifyingKey, // key
              signature,
              testBuffer
            );
          })
          .then(function(result) {
            expect(result).toEqual(true);
          });
        });
      });

      it('verify', function() {
        return subtle.importKey(
          'jwk', // format
          keys[alg].public, // key
          algorithms[alg], // algo
          true, // extractable
          ['verify'], // usages
        )
        .then(function(verifyingKey) {
          return subtle.verify(
            algorithms[alg], // algo
            verifyingKey, // key
            keys[alg].signedBuffer,
            testBuffer
          );
        })
        .then(function(result) {
          expect(result).toEqual(true);
        });
      });
    });
  });
});
