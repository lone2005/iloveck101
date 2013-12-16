'use strict';

iloveck101.controller('iloveck101ManagerCtrl', ['$scope', '$http', '$rootElement', 'iloveck101Storage', function iloveck101ManagerCtrl($scope, $http, $rootElement, iloveck101Storage) {
  $scope.storageID = iloveck101Storage.setStorageId('iloveck101');

  var albums = $scope.albums = iloveck101Storage.get();
  var createAlbumDialog = $scope.createAlbumDialog = {
    show: false
  };
  var updateCreateAlbumStatus = (function () {
    var msg = {
      processing: '處理中...',
      thisIsNotCK: '這.是.卡.題.諾.嗎.？說清楚啊！',
      urlgg: '這網頁好像掛掉了...'
    };
    return function (key) {
      if (key && msg.hasOwnProperty(key)) {
        createAlbumDialog.status = msg[key];
      } else {
        createAlbumDialog.status = null;
      }
    };
  })();

  $scope.galleryElement = $rootElement.find('.iloveck101-manager__gallery')[0];

  $scope.$watch('albums', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.updateStorageData();
    }
  }, true);

  $scope.updateStorageData = function () {
    iloveck101Storage.put(albums);
  };
  
  $scope.showCreateAlbumDialog = function () {
    createAlbumDialog.show = true;
  };

  $scope.hideCreateAlbumDialog = function (evt) {
    createAlbumDialog.show = false;
    updateCreateAlbumStatus();
  };

  $scope.checkUrlAndCreateAlbum = function () {
    updateCreateAlbumStatus('processing');
    var url = createAlbumDialog.ckurl;
    if (!$scope.isCKThreadUrl(url)) {
      return updateCreateAlbumStatus('thisIsNotCK');
    }
    $scope.isUrlAlive(url, function (alive) {
      if (alive) {
        $scope.hideCreateAlbumDialog();
        $scope.createAlbum(url);
      } else {
        updateCreateAlbumStatus('urlgg');
      }
    });
  };

  $scope.createAlbum = function (url) {
    var id = url.match(/thread-([-\w]+).html/)[1];
    albums.push({
      id: id,
      url: url,
      downloaded: false,
      name: 'unknown'
    });
  };

  $scope.removeAlbum = function (index) {
    albums.splice(index, 1);
    $scope.updateStorageData();
  };

  $scope.updateAlbumData = function (index, data) {
    var album = albums[index];
    var prop;
    for (prop in data) {
      if (data.hasOwnProperty(prop) && album.hasOwnProperty(prop)) {
        album[prop] = data[prop];
      }
    }
    $scope.updateStorageData();
  };

  $scope.isCKThreadUrl = function (url) {
    return /^https?:\/\/(?:[-_\w\d]+\.)?ck101.com\/thread-(?:[-\w])+.html/.test(url);
  };

  $scope.isUrlAlive = function (url, cb) {
    var url = $scope.getQueryUrl(url, '/html/head/title');
    $http.jsonp(url)
      .success(function (data) {
        cb(!!(data.query && data.query.results));
      })
      .error(function () {
        cb(false);
      });
    return $http.jsonp(url);
  };

  $scope.getQueryUrl = function (url, query) {
    var yql = 'select * from html where url="' + url + '" and compat="html5" and xpath="' + query + '"';
    return 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(yql) + '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
  };

  $scope.ignoreEvent = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };
  
}]);
