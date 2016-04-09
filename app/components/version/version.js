'use strict';

angular.module('CVReader.version', [
  'CVReader.version.interpolate-filter',
  'CVReader.version.version-directive'
])

.value('version', '0.1');
