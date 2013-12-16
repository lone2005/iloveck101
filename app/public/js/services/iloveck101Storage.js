'use strict';

iloveck101.factory('iloveck101Storage', function () {
  var STORAGE_ID = 'iloveck101';
  return {
    setStorageId: function (id) {
      id && (STORAGE_ID = id);
      return STORAGE_ID;
    },
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    put: function (album) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(album));
    }
  };
});
