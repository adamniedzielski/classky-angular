angular.module("app").factory("LastFMService", function ($q, $http) {

  var getHypedArtists = function () {
    var deferred = $q.defer();

    $http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gethypedartists&api_key=cca4c83aff122fd01e10eb20e0cb8cf6&format=json')
      .success(function (data) {
      var artists = _.map(data.artists.artist, function (artist) {
        var image = _.last(artist.image)['#text'];

        return {
          id: artist.mbid,
          name: artist.name,
          image: image
        };
      });

      artists = _.filter(artists, function (artist) {
        return artist.id !== undefined && artist.id.length > 0;
      });

      deferred.resolve(artists);
    });

    return deferred.promise;
  };

  return { getHypedArtists: getHypedArtists };
});
