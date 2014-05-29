var protractor = require('protractor');
require('protractor/jasminewd');

describe('Artist page', function () {

  beforeEach(function () {
    browser.get('/artists');
    element(by.css('.artist-link')).click();
  });

  it('should show artist name', function () {
    expect(element(by.css('.artist-name')).isPresent()).toBe(true);
  });

  it('should show a list of albums', function () {
    expect(element(by.css('ul.albums')).isPresent()).toBe(true);
  });
});
