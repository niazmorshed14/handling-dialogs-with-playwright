import {test, expect} from "@playwright/test";

/*
    By default, dialogs are auto-dismissed by Playwright. 
    So we don't have to handle them. 
    However, we can register a dialog handler before the action 
    that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
    
    There are 3 types of dialogs. One is a normal alert box with ok button. 
    Second one is the confirmation box and the third one is the prompt.
*/

//type 1
test.skip ("Alert with Ok", async ({page}) => { //one kind of normal alert with ok button

    await page.goto("https://testautomationpractice.blogspot.com/");
    

    //writing dialog window handler. that means enabling alert handler. 
    //whenever any dialog comes in, it will be automatically handled.
    //we need to write this code before the dialog box appears.

    page.on('dialog', async dialog=> {
        await expect(dialog.type()).toContain('alert'); //returns the type of dialog box
        await expect(dialog.message()).toContain("I am an alert box!"); //validating the message contained by the dialog
        await dialog.accept(); //closing the dialog box
        await page.waitForTimeout(6000);


    });
    await page.click("//button[normalize-space()='Alert']"); //clicking on the button that triggers alert
    await page.waitForTimeout(6000);
});

//type 2
test.skip ("Confirmation dialog", async ({page}) => { //a kind of alert with both ok and cancel buttons

    await page.goto("https://testautomationpractice.blogspot.com/");
    

    page.on('dialog', async dialog=> {
        await expect(dialog.type()).toContain('confirm'); //returns the type of dialog box
        await expect(dialog.message()).toContain("Press a button!"); //validating the message contained by the dialog
        await dialog.accept(); //closing the dialog box by accepting the confirmation box (pressing ok button)
        //await dialog.dismiss(); //closing the dialog box by rejecting the confirmation box (pressing cancel button)
        await page.waitForTimeout(3000);


    });
    await page.click("//button[normalize-space()='Confirm Box']"); //clicking on the button that triggers confirmation alert
    //validating the message that appears after clicking on the button that triggers the confirmation alert
    await expect(page.locator("//p[@id='demo']")).toHaveText("You pressed OK!");
    await page.waitForTimeout(3000);
});


//type 3
test ("Prompt dialog", async ({page}) => { //a kind of dialog with both ok and cancel buttons as well as with an input box

    await page.goto("https://testautomationpractice.blogspot.com/");
    

    page.on('dialog', async dialog=> {
        await expect(dialog.type()).toContain('prompt'); 
        await expect(dialog.message()).toContain("Please enter your name:"); //validating the message contained by the dialog
        await expect(dialog.defaultValue()).toContain("Harry Potter"); //validating the default value contained in the input box of the prompt
        
        await dialog.accept("Md. Niaz Morshed"); //accepting the prompt by providing new input value 
        await page.waitForTimeout(3000);


    });
    await page.click("//button[normalize-space()='Prompt']"); //clicking on the button that triggers prompt
    //validating the message that appears after clicking on the button that triggers the prompt
    await expect(page.locator("//p[@id='demo']")).toHaveText("Hello Md. Niaz Morshed! How are you today?");
    await page.waitForTimeout(3000);
});