import { assert } from '@esm-bundle/chai';
import { DataMock } from "../../src/DataMock.js";

describe('DataMock', () => {
  describe('constructor()', () => {
    it('sets "types"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.types, 'object');
    });

    it('sets "person"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.person, 'object');
    });
    
    it('sets "internet"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.internet, 'object');
    });
    
    it('sets "lorem"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.lorem, 'object');
    });
    
    it('sets "random"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.random, 'object');
    });
    
    it('sets "time"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.time, 'object');
    });
    
    it('sets "word"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.word, 'object');
    });
    
    it('sets "http"', () => {
      const instance = new DataMock();
      assert.typeOf(instance.http, 'object');
    });
  });
});
