const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
 
async function example(){
 
       var searchString = "Automation testing with Selenium";

       let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("chrome-extension://gidjknakejjidifgnjffbafhcicgdnod/urlinfo.html");
            
        await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
 
        var title = await driver.getTitle();
        console.log('Title is:',title);
        await driver.quit();
 
}
 
example()
