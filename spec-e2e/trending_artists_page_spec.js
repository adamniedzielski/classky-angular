var protractor = require('protractor');
require('protractor/jasminewd');

describe('Trending artists page', function () {

  beforeEach(function () {
    browser.get('/artists');
  });

  it('should show a list of artists', function () {
    expect(element.all(by.css('.artist-link')).count()).toBeGreaterThan(0);
  });

  it('should display an image for each artist', function () {
    expect(element(by.css('.artist-link')).element(by.css('img')).isPresent()).toBe(true);
  });

  it('should link to artist page', function () {
    expect(element(by.css('.artist-link')).
      element(by.css('a')).getAttribute('href')).toContain('/artists/');
  });
});
