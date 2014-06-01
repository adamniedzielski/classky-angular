describe("LastFMService - getHypedArtists", function() {

  var response = {
    "artists": {
      "artist": [
        {
          "name": "Jacquie Lee",
          "percentagechange": "2721",
          "mbid": "f5cb2b4f-bfba-4bfc-9d70-82d138829717",
          "url": "http://www.last.fm/music/Jacquie+Lee",
          "streamable": "0",
          "image": [
            {
              "#text": "http://userserve-ak.last.fm/serve/34/98795793.png",
              "size": "small"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/64/98795793.png",
              "size": "medium"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/126/98795793.png",
              "size": "large"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/252/98795793.png",
              "size": "extralarge"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/500/98795793/Jacquie+Lee+PNG.png",
              "size": "mega"
            }
          ]
        },
        {
          "name": "Gisela",
          "percentagechange": "751",
          "mbid": "",
          "url": "http://www.last.fm/music/Gisela",
          "streamable": "0",
          "image": [
            {
              "#text": "http://userserve-ak.last.fm/serve/34/98328297.png",
              "size": "small"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/64/98328297.png",
              "size": "medium"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/126/98328297.png",
              "size": "large"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/252/98328297.png",
              "size": "extralarge"
            },
            {
              "#text": "http://userserve-ak.last.fm/serve/500/98328297/Gisela+PNG+version.png",
              "size": "mega"
            }
          ]
        }
      ]
    }
  }

  var service;
  var http;
  var result;

  beforeEach(function() {
    module("app");
  });

  beforeEach(inject(function(LastFMService, $httpBackend) {
    service = LastFMService;
    http = $httpBackend
  }));

  beforeEach(function() {
    http.expectGET(/audioscrobbler/).respond(response);
    service.getHypedArtists().then(function (res) {
      result = res;
    });
    http.flush();
  });

  afterEach(function() {
    http.verifyNoOutstandingRequest();
    http.verifyNoOutstandingExpectation();
  });

  it("should return array of artists with id, image and name", function() {
    var jacquie = result[0];
    expect(jacquie.id).toEqual('f5cb2b4f-bfba-4bfc-9d70-82d138829717');
    expect(jacquie.image).toEqual('http://userserve-ak.last.fm/serve/500/98795793/Jacquie+Lee+PNG.png');
    expect(jacquie.name).toEqual('Jacquie Lee');
  });

  it("should filter out artists without id", function () {
    expect(result.length).toEqual(1);
  });
});
