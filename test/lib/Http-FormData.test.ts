/* eslint-disable no-unused-vars */
import { assert } from '@esm-bundle/chai';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  describe('Http.formData', () => {
    describe('filePart()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('adds a part', () => {
        const fd = new FormData();
        http.formData.filePart(fd);
        let addedName: string;
        let addedFile: File;
        let size = 0;
        for (const [name, value] of fd.entries()) {
          size += 1;
          addedName = name;
          addedFile = value as File;
        }
        assert.equal(size, 1, 'has one file');
        assert.typeOf(addedName, 'string', 'has file name');
        assert.typeOf(addedFile, 'file', 'has the file');
        assert.isAbove(addedFile.size, 0, 'the file has a content');
        assert.isNotEmpty(addedFile.name, 'the file has the name');
      });
    });
  
    describe('textPart()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('adds a clear text part', () => {
        const fd = new FormData();
        http.formData.textPart(fd, { clearText: true });
        let addedName: string;
        let addedText: string;
        let size = 0;
        for (const [name, value] of fd.entries()) {
          size += 1;
          addedName = name;
          addedText = value as string;
        }
        assert.equal(size, 1, 'has one file');
        assert.typeOf(addedName, 'string', 'has file name');
        assert.typeOf(addedText, 'string', 'has the contents');
      });
  
      it('adds a blob text part', () => {
        const fd = new FormData();
        http.formData.textPart(fd, { textMime: 'application/json' });
        let addedName: string;
        let addedValue: Blob;
        let size = 0;
        for (const [name, value] of fd.entries()) {
          size += 1;
          addedName = name;
          addedValue = value as Blob;
        }
        assert.equal(size, 1, 'has one file');
        assert.typeOf(addedName, 'string', 'has file name');
        assert.typeOf(addedValue, 'file', 'has the contents');
      });
    });
  
    describe('form()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns the form', () => {
        const result = http.formData.form();
        assert.typeOf(result, 'FormData');
      });
  
      it('adds parts', () => {
        const fd = http.formData.form();
        let size = 0;
        for (const _ of fd.entries()) {
          size += 1;
        }
        assert.isAbove(size, 0);
      });
  
      it('adds file parts only', () => {
        const fd = http.formData.form({ filePart: true, parts: 5 });
        for (const [, file] of fd.entries()) {
          assert.typeOf(file, 'File');
        }
      });
  
      it('adds text parts only', () => {
        const fd = http.formData.form({ parts: 5, textPart: true, clearText: true });
        for (const [, file] of fd.entries()) {
          assert.typeOf(file, 'string');
        }
      });
    });
  });
});
