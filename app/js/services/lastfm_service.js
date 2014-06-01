angular.module("app").factory("LastFMService", function ($q, $http) {

  var BASE_URL = 'http://ws.audioscrobbler.com/2.0';
  var API_KEY = 'cca4c83aff122fd01e10eb20e0cb8cf6';

  function getHypedArtists() {
    var deferred = $q.defer();

    var params = {
      method: 'chart.gethypedartists',
      api_key: API_KEY,
      format: 'json'
    };

    $http.get(BASE_URL, { params: params }).success(function (data) {
      deferred.resolve(processResponse(data));
    });

    return deferred.promise;
  }

  function processResponse(data) {
    var artists = _.map(data.artists.artist, buildArtist);
    artists = _.filter(artists, artistShouldHaveId);
    return artists;
  }

  function buildArtist(artistData) {
    var image = _.last(artistData.image)['#text'];

    return {
      id: artistData.mbid,
      name: artistData.name,
      image: image
    };
  }

  function artistShouldHaveId(artist) {
    return artist.id !== undefined && artist.id.length > 0;
  }

  return { getHypedArtists: getHypedArtists };
});
