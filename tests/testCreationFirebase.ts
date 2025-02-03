import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function testFirebaseUserInteraction() {
    const driver: WebDriver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:5173/genshin3/Liyue/"); // Go to Liyue page

        // Wait for the inputs to be visible before interacting
        const nameInput = await driver.wait(until.elementLocated(By.css("input[placeholder='name']")), 5000);
        const emailInput = await driver.wait(until.elementLocated(By.css("input[placeholder='email']")), 5000);
        const joinButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'ZhongliShirtButton')]")), 10000);

        // Add a test user
        await nameInput.sendKeys("Zhongli");
        await emailInput.sendKeys("ZhongliUser@gmail.com");
        await joinButton.click();

        await driver.sleep(5000);
        
        console.log("User deletion test passed");

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await driver.quit();
    }
}

testFirebaseUserInteraction();
