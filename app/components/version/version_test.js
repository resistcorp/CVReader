'use strict';

describe('CVReader.version module', function() {
  beforeEach(module('CVReader.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
