var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

webdriverio
  .remote(options)
  .init()
  .url('http://buddy.works')
  .saveScreenshot('buddyworks.png')
  .end();