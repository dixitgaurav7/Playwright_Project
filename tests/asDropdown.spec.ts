import {expect,test,Locator} from "@playwright/test";
test("Auto suggest dropdown",async ({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.locator('[name="q"]').fill("smart");
    const options:Locator=page.locator("ul>li");
    const count=await options.count();
    console.log("Total options:",count);
    // printing all suggested option in dropdown
    //console.log("5th option:",await options.nth(4).textContent());
    for(let i=0;i<count;i++){
        console.log(await options.nth(i).textContent());

    }

// select click on smart phone
for(let i=0;i<count;i++){
    const text=await options.nth(i).innerText();
    if (text==='smart phone') {
        await options.nth(i).click();
        break;
    }

    }

    await page.waitForTimeout(3000);

    
});