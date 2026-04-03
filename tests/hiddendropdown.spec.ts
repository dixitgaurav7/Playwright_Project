import{test,expect,Locator} from '@playwright/test';

test("hidden dropdown",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.locator ('form i').nth(1).click();
    const options:Locator=page.locator("div[role='listbox'] div[role='option']");
    const count=await options.count();
    await expect(options).toHaveCount(3);
    await options.nth(0).click();

    // Print all the poption
    for(let i=0;i<count;i++)
    {
        console.log(await options.nth(i).textContent());
    }

    for(let i=0;i<count;i++){
        const text = await options.nth(i).textContent();
        if (text==='Automation Tester'){
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(5000);
    
});