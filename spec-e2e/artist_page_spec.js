var protractor = require('protractor');
require('protractor/jasminewd');

describe('Artist page', function () {

  beforeEach(function () {
    browser.get('/#/artists');
    element(by.css('.artist-link')).click();
  });

  it('should show artist name', function () {
    expect(element(by.css('.artist-name')).isPresent()).toBe(true);
  });

  it('should show a list of albums', function () {
    expect(element(by.css('ul.albums')).isPresent()).toBe(true);
  });

  it('should link to Spotify next to each album', function () {
    element.all(by.css('ul.albums li')).each(function (album) {
      expect(album.isElementPresent(by.css('.spotify'))).toBe(true);
    });
  });
});
