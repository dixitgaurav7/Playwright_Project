import {test,expect,Locator} from '@playwright/test';

test("pw Actions",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox:Locator = page.locator("#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const maxlength:string|null = await textBox.getAttribute("maxlength");
    expect(maxlength).toBe("15");
    await textBox.fill("Gaurav Dixit");
    const enteredValue:string = await textBox.inputValue();
    expect(enteredValue).toBe("Gaurav Dixit");
    await page.waitForTimeout(5000);
    console.log("text content of textBox: ", await textBox.inputValue());
});

//Radio Button

test("pw Radio Buttons",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio:Locator = page.locator("#male");
   await expect(maleRadio).toBeVisible();
   await expect(maleRadio).toBeEnabled();
   //await expect(maleRadio).not.toBeChecked();
   expect(await maleRadio.isChecked()).toBeFalsy();
   await maleRadio.check();
   expect(await maleRadio.isChecked()).toBeTruthy();
   await page.waitForTimeout(5000);
});


//CheckBoxes
test.only("pw CheckBoxes",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const sundayCheckBox:Locator = page.locator("#sunday");
    await expect(sundayCheckBox).toBeVisible();
    await expect(sundayCheckBox).toBeEnabled();
    await expect(sundayCheckBox).not.toBeChecked();
    await sundayCheckBox.check();
    await expect(sundayCheckBox).toBeChecked();
    await page.waitForTimeout(5000);

    //Selecting multiple checkboxes and assert each is checked
    const days:string[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayCheckboxes:Locator[] = days.map(day=>page.locator(`#${day}`));
    expect(dayCheckboxes.length).toBe(days.length);
    // Select all checkboxex and itterate through each checkbox and assert it is checked
    for (const checkbox of dayCheckboxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    // Uncheck last 3 checkboxes and assert it is unchecked
    for (const checkbox of dayCheckboxes.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
// Toggle checkboxes: if checked then uncheck and if unchecked then check
for(const checkbox of dayCheckboxes){
    if (await checkbox.isChecked()){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }else{
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
}
await page.waitForTimeout(5000);   

// Randomly select checkboxes and assert their state
const indexes:number[] = [1,3,5];
for (const i of indexes){
    dayCheckboxes[i].check();
    await expect(dayCheckboxes[i]).toBeChecked();
}

//Select checkbox based on the Label

const weekname:string = "Wednesday";
for (const label of days){
    if (label.toLowerCase()===weekname){
       const checkbox:Locator = page.getByLabel(label);
       await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

}

});
