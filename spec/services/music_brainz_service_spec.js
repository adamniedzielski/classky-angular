describe("MusicBrainzService - getArtist", function() {

  var response = {
    "country": null,
    "ipis": [ ],
    "area": null,
    "sort-name": "Lee, Jacquie",
    "name": "Jacquie Lee",
    "disambiguation": "",
    "life-span": {
      "ended": false,
      "begin": null,
      "end": null
    },
    "end_area": null,
    "release-groups": [
      {
        "disambiguation": "",
        "first-release-date": "2013-12-16",
        "secondary-types": [ ],
        "id": "626606a8-bb77-4d3c-87b7-bba983ba57aa",
        "title": "And I Am Telling You I’m Not Going (The Voice Performance)",
        "primary-type": "Single"
      },
      {
        "disambiguation": "",
        "first-release-date": "2013-12-09",
        "secondary-types": [ ],
        "id": "8475b9ff-a12a-4a9e-9d58-387e82562974",
        "title": "Angel (The Voice Performance)",
        "primary-type": "Single"
      },
      {
        "disambiguation": "",
        "first-release-date": "2013-12-02",
        "secondary-types": [ ],
        "id": "fb7d88b1-987c-4fb1-95c2-a8e9f3395efb",
        "title": "The Voice Within (The Voice Performance)",
        "primary-type": "Single"
      }
    ],
    "id": "f5cb2b4f-bfba-4bfc-9d70-82d138829717",
    "type": "Person",
    "begin_area": null
  }

  var service;
  var http;
  var result;

  beforeEach(function() {
    module("app");
  });

  beforeEach(inject(function(MusicBrainzService, $httpBackend) {
    service = MusicBrainzService;
    http = $httpBackend
  }));

  beforeEach(function() {
    http.expectGET(/musicbrainz/).respond(response);
    service.getArtist().then(function (res) {
      result = res;
    });
    http.flush();
  });

  afterEach(function() {
    http.verifyNoOutstandingRequest();
    http.verifyNoOutstandingExpectation();
  });

  it("should return artist with name and his albums", function() {
    expect(result.name).toEqual('Jacquie Lee');
    expect(result.albums).toEqual([
      { title: "And I Am Telling You I’m Not Going (The Voice Performance)" },
      { title: "Angel (The Voice Performance)" },
      { title: "The Voice Within (The Voice Performance)" }
    ]);
  });
});
