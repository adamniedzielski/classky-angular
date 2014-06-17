describe("SpotifyService - getUrl", function() {

  var service;
  var http;
  var result;

  beforeEach(function() {
    module("app");
  });

  beforeEach(inject(function(SpotifyService, $httpBackend) {
    service = SpotifyService;
    http = $httpBackend
  }));

  afterEach(function() {
    http.verifyNoOutstandingRequest();
    http.verifyNoOutstandingExpectation();
  });

  describe("when the album is found on Spotify", function () {

    var response = {
      "info": {
        "num_results": 1,
        "limit": 100,
        "offset": 0,
        "query": "Angel (The Voice Performance) Jacquie Lee",
        "type": "album",
        "page": 1
      },
      "albums": [
        {
          "name": "Angel (The Voice Performance)",
          "popularity": "0.19",
          "external-ids": [
            {
              "type": "upc",
              "id": "00602537821617"
            }
          ],
          "href": "spotify:album:0Wgo9Ck79lWB8IJf3hpYfd",
          "artists": [
            {
              "href": "spotify:artist:7KxuvZkTSnP8wLLfS94ykd",
              "name": "Jacquie Lee"
            }
          ],
          "availability": {
            "territories": "CA US"
          }
        }
      ]
    };

    beforeEach(function() {
      http.expectGET(/spotify/).respond(response);
      service.getUrl('Jacquie Lee', 'Angel (The Voice Performance)').then(function (res) {
        result = res;
      });
      http.flush();
    });

    it("should return url for listening to this album on Spotify", function() {
      expect(result).toEqual('http://open.spotify.com/album/0Wgo9Ck79lWB8IJf3hpYfd');
    });
  });

  describe("when the album is not found on Spotify", function () {

    var response = {
      "info": {
          "num_results": 0,
          "limit": 100,
          "offset": 0,
          "query": "Unknown artist - Unknown",
          "type": "album",
          "page": 1
      },
      "albums": [ ]
    };

    beforeEach(function() {
      http.expectGET(/spotify/).respond(response);
      service.getUrl('Unknown artist - Unknown').then(function (res) {
        result = res;
      });
      http.flush();
    });

    it("should return undefined", function() {
      expect(result).toEqual(undefined);
    });
  });
});
