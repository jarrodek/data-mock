/** @typedef {import('../Time').Time} Time */
/** @typedef {import('../Types').Types} Types */
/** @typedef {import('../Lorem').Lorem} Lorem */
/** @typedef {import('../Random').Random} Random */
/** @typedef {import('../Internet').Internet} Internet */
/** @typedef {import('./HttpHeadersSchema').GenerateInit} GenerateInit */

export const HeadersSchema = {
  date: {
    group: 'general',
    request: true,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const d = init.time.date();
      return d.toUTCString();
    },
  },
  'cache-control': {
    group: 'general,caching',
    request: ['max-age={{number}}', 'max-stale', 'min-fresh={{number}}', 'no-cache', 'no-store', 'no-transform', 'only-if-cached'],
    response: ['must-revalidate', 'no-cache', 'no-store', 'no-transform', 'public', 'private', 'proxy-revalidate', 'max-age={{number}}', 's-maxage={{number}}'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['cache-control'][init.types];
      const value = /** @type string */ (init.random.pickOne(picks));
      return value.replace('{{number}}', init.types.number({ min: 1, max: 500000 }).toString());
    },
  },
  connection: {
    group: 'general',
    enum: ['keep-alive', 'close'],
    request: true,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => init.random.pickOne(HeadersSchema.connection.enum),
  },
  age: {
    group: 'caching',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => init.types.number({ min: 1, max: 500000 }).toString(),
  },
  expires: {
    group: 'caching',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const d = init.time.date();
      return d.toUTCString();
    },
  },
  pragma: {
    group: 'caching',
    request: false,
    response: true,
    /**
     * @returns {string}
     */
    generate: () => 'no-cache',
  },
  'last-modified': {
    group: 'conditional',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const d = init.time.date();
      return d.toUTCString();
    },
  },
  etag: {
    group: 'conditional',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => `W/${init.types.hash()}`,
  },
  'if-match': {
    group: 'conditional',
    request: true,
    response: false,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => `W/${init.types.hash()}`,
  },
  'if-none-match': {
    group: 'conditional',
    request: true,
    response: false,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => `W/${init.types.hash()}`,
  },
  'if-modified-since': {
    group: 'conditional',
    request: true,
    response: false,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const d = init.time.date();
      return d.toUTCString();
    },
  },
  accept: {
    group: 'content',
    request: true,
    response: false,
    enum: ['*/*', 'text/html', 'image/*', 'application/xhtml+xml', 'application/xml;q=0.9', 'application/json'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema.accept.enum;
      return init.random.pickOne(picks);
    },
  },
  'accept-charset': {
    group: 'content',
    request: true,
    response: false,
    enum: ['utf-8', 'iso-8859-1;q=0.5'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['accept-charset'].enum;
      return init.random.pickOne(picks);
    },
  },
  'accept-encoding': {
    group: 'content',
    request: true,
    response: false,
    enum: ['gzip', 'compress', 'deflate', 'br', 'identity', '*', 'gzip;q=1.0', '*;q=0.5'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['accept-encoding'].enum;
      return init.random.pickOne(picks);
    },
  },
  cookie: {
    group: 'cookies',
    request: true,
    response: false,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const size = init.types.number({ min: 1, max: 4 });
      return new Array(size)
        .fill(0)
        .map(() => `${init.lorem.word()}=${init.lorem.word()}`)
        .join('; ');
    },
  },
  'set-cookie': {
    group: 'cookies',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const size = init.types.number({ min: 1, max: 4 });
      return new Array(size)
        .fill(0)
        .map(() => `${init.lorem.word()}=${init.lorem.word()}`)
        .join('; ');
    },
  },
  'access-control-allow-origin': {
    group: 'cors',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => init.types.boolean() ? init.internet.domain() : '*',
  },
  origin: {
    group: 'cors',
    request: true,
    response: false,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => init.types.boolean() ? init.internet.domain() : '*',
  },
  'content-length': {
    group: 'content',
    request: true,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: init => init.types.number({ min: 0, max: 1000000 }).toString(),
  },
  'content-type': {
    group: 'content',
    request: true,
    response: true,
    enum: ['text/html', 'image/png', 'application/xml', 'application/json', 'text-plain', 'application/x-www-form-urlencoded'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['content-type'].enum;
      return init.random.pickOne(picks);
    },
  },
  'content-encoding': {
    group: 'content',
    request: true,
    response: true,
    enum: ['gzip', 'compress', 'deflate', 'br', 'identity', '*', 'gzip;q=1.0', '*;q=0.5'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['content-encoding'].enum;
      return init.random.pickOne(picks);
    },
  },
  'transfer-encoding': {
    group: 'content',
    request: false,
    response: true,
    enum: ['chunked', 'compress', 'deflate', 'gzip', 'identity'],
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const picks = HeadersSchema['transfer-encoding'].enum;
      return init.random.pickOne(picks);
    },
  },
  link: {
    group: 'general',
    request: false,
    response: true,
    /**
     * @param {GenerateInit} init
     * @returns {string}
     */
    generate: (init) => {
      const size = init.types.number({ min: 1, max: 4 });
      return new Array(size)
        .fill(0)
        .map(() => `<${init.internet.uri()}>; rel="${init.types.string()}"`)
        .join(', ');
    },
  },
};
