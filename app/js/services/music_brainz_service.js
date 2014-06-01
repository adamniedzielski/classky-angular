angular.module("app").factory("MusicBrainzService", function ($q, $http) {

  var BASE_URL = 'http://musicbrainz.org/ws/2/artist/'

  function getArtist(id) {
    var deferred = $q.defer();

    var params = {
      inc: 'release-groups',
      fmt: 'json'
    };

    $http.get(BASE_URL + id, { params: params })
      .success(function (data) {
        deferred.resolve(processResponse(data));
      });

    return deferred.promise;
  }

  function processResponse(data) {
    var albums = _.map(data['release-groups'], function (album) {
      return album.title;
    });

    return {
      name: data.name,
      albums: albums
    };
  }

  return { getArtist: getArtist };
});
