// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
import { Svg } from '../../src/lib/Svg.js';

describe('Svg', () => {
  describe('image()', () => {
    let generator: Svg;

    before(() => {
      generator = new Svg();
    });

    it('returns a string', () => {
      const result = generator.image();
      assert.typeOf(result, 'string');
    });

    it('has the svg header', () => {
      const result = generator.image();
      assert.include(result, '<?xml version="1.0"?>');
    });

    it('has the default width as height', () => {
      const result = generator.image();
      assert.include(result, '<svg width="256" height="256">');
    });

    it('has the passed width as height', () => {
      const result = generator.image({ width: 100, height: 200 });
      assert.include(result, '<svg width="100" height="200">');
    });

    it('creates the background', () => {
      const src = generator.image();
      const parser = new DOMParser();
      const doc = parser.parseFromString(src, "image/svg+xml");
      const rect = doc.querySelector('rect');
      assert.ok(rect, 'has the rectangle');
      assert.equal(rect.getAttribute('width'), '256', 'has the image width');
      assert.equal(rect.getAttribute('height'), '256', 'has the image height');
      assert.isNotEmpty(rect.getAttribute('fill'), 'has the fill');
      assert.include(rect.getAttribute('fill'), '#', 'has the fill');
    });

    it('creates default shapes', () => {
      const src = generator.image();
      const parser = new DOMParser();
      const doc = parser.parseFromString(src, "image/svg+xml");
      const svg = doc.querySelector('svg');
      assert.isAbove(svg.children.length, 1, 'the SVG has shapes');
    });

    it('creates defined number of shapes', () => {
      const src = generator.image({ shapes: 6 });
      const parser = new DOMParser();
      const doc = parser.parseFromString(src, "image/svg+xml");
      const svg = doc.querySelector('svg');
      assert.lengthOf(svg.children, 7, 'the SVG has all shapes');
    });
  });
});
