import { assert } from '@esm-bundle/chai';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  let http: Http;

  beforeEach(() => {
    http = new Http();
  });

  it('has the headers', () => {
    assert.ok(http.headers);
  });

  it('has the payload', () => {
    assert.ok(http.payload);
  });

  it('has the response', () => {
    assert.ok(http.response);
  });

  it('has the formData', () => {
    assert.ok(http.formData);
  });

  it('has the request', () => {
    assert.ok(http.request);
  });
});
