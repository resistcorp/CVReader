'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('CV Reader', function() {


  it('should automatically redirect to /read/standard when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/read/standard");
  });


  describe('read standard', function() {

    beforeEach(function() {
      browser.get('index.html#/read');
    });


    it('should render the standard CV when user navigates to /read', function() {
      expect(element.all(by.css('[ng-view] #header #header-texts h3')).first().getText()).
        toMatch(/proficient, project-oriented/);
    });

  });

});
