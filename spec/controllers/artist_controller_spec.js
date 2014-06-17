describe("ArtistController", function() {

  var artistId = 'f5cb2b4f-bfba-4bfc-9d70-82d138829717';
  var artist = {
    name: 'AC/DC',
    albums: [
      { title: 'Back in Black' },
      { title: 'High Voltage' }
    ]
  }

  var deferredResponse;
  var scope;
  var service;

  beforeEach(function() {
    module("app");
  });

  beforeEach(inject(function($controller, $rootScope, $q, MusicBrainzService) {
    scope = $rootScope.$new();
    service = MusicBrainzService;

    deferredResponse = $q.defer();
    spyOn(service, 'getArtist').andReturn(deferredResponse.promise);

    $controller('ArtistController', {
      $scope: scope,
      $routeParams: { id: artistId },
      MusicBrainzService: service
    });
  }));

  it("should get artist from MusicBrainzService", function() {
    expect(service.getArtist).toHaveBeenCalledWith(artistId);
    deferredResponse.resolve(artist);
    scope.$apply();
    expect(scope.artist).toEqual(artist);
  });
});
