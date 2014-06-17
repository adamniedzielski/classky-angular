angular.module("app").factory("SpotifyService", function ($q, $http) {

  var BASE_URL = 'http://ws.spotify.com/search/1/album.json';

  function getUrl(artist, album) {
    var deferred = $q.defer();

    var params = {
      q: [artist, album].join(' ')
    };

    $http.get(BASE_URL, { params: params })
      .success(function (data) {
        deferred.resolve(processResponse(data));
      });

    return deferred.promise;
  }

  function processResponse(data) {
    var bestMatch = _.first(data.albums);

    if (bestMatch) {
      var albumId = _.last(bestMatch.href.split(':'));
      return 'http://open.spotify.com/album/' + albumId;
    }
    else {
      return undefined;
    }
  }

  return { getUrl: getUrl };
});
