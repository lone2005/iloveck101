iloveck101.directive('thisisanalbum', function () {
  return {
    restrict: 'A',
    link: function (scope, elem, attr, ctrl) {
      elem.bind('iloveck101-removed', function () {
        scope.removeAlbum(attr.index);
      });
      elem.bind('iloveck101-download-finished', function () {
        scope.updateAlbumData(attr.index, {
          name: elem.attr('name'),
          downloaded: true
        });
      });
      elem.bind('click', function () {
        scope.galleryElement.photos = elem[0].photos;
      });
    }
  };
});
