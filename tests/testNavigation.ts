import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function testNavigation() {
    const driver: WebDriver = await new Builder().forBrowser("chrome").build();

    try {
        console.log("Opening base URL...");
        await driver.get("http://localhost:5173/genshin3/"); // Base path

        // Wait until the "Mondstadt" button is visible and clickable
        console.log("Waiting for 'Mondstadt' button...");
        const mondstadtButton = await driver.wait(
            until.elementLocated(By.xpath("//button[.//a[text()='Mondstadt']]")),
            5000
        );

        await driver.wait(until.elementIsVisible(mondstadtButton), 5000);
        console.log("Clicking on 'Mondstadt' button...");
        await mondstadtButton.click();

        // Wait for the URL to update
        console.log("Waiting for navigation to '/Mondstadt'...");
        await driver.wait(until.urlContains("/Mondstadt"), 5000);

        // Verify the new page URL
        const currentUrl = await driver.getCurrentUrl();
        console.log("Current URL:", currentUrl);

        if (!currentUrl.endsWith("/Mondstadt")) {
            throw new Error("Navigation to Mondstadt failed. Expected URL to end with '/Mondstadt'.");
        }

        // Wait for the page title to be visible
        console.log("Verifying page title...");
        const pageTitleElement = await driver.wait(
            until.elementLocated(By.tagName("h1")),
            5000
        );

        const pageTitle = await pageTitleElement.getText();
        console.log("Page Title:", pageTitle);

        // Ensure the expected title is present
        if (pageTitle !== "Knights of Favonius") {
            throw new Error(`Unexpected page title: '${pageTitle}'. Expected 'Knights of Favonius'.`);
        }

        console.log("✅ Test Passed: Successfully navigated to the Mondstadt page.");

    } catch (error) {
        console.error("❌ Test Failed:", error);
    } finally {
        await driver.quit();
        console.log("Browser session closed.");
    }
}

testNavigation();
