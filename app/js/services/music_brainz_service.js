angular.module("app").factory("MusicBrainzService", function ($q, $http) {

  var getArtist = function (id) {
    var deferred = $q.defer();

    $http.get('http://musicbrainz.org/ws/2/artist/' + id + '?inc=release-groups&fmt=json')
      .success(function (data) {

        var albums = _.map(data['release-groups'], function (album) {
          return album.title;
        });

        var result = {
          name: data.name,
          albums: albums
        };

        deferred.resolve(result);
      });

    return deferred.promise;
  };

  return { getArtist: getArtist };
});
