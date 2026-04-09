import{test,expect,Locator} from '@playwright/test';

test('Verify single select dropdown',async ({page})=>{ 
    await page.goto('https://testautomationpractice.blogspot.com/');
    //await page.locator('#country').selectOption('India');
   // await page.locator('#country').selectOption({value:'uk'});
   //await page.locator('#country').selectOption({label:'India'});
   //await page.locator('#country').selectOption({index:3});
   //2) check no of options in dropdown
  const dropdownOption:Locator = page.locator('#country>option');
  await expect(dropdownOption).toHaveCount(10);
  //3) check an option is present in dropdown or not
  const optionTexts:string[] = (await dropdownOption.allTextContents()).map(text=>text.trim());
  console.log(optionTexts);
  expect(optionTexts).toContain('Japan');
  //4) get all options from dropdown and print them
  for(const option of optionTexts)
   {
       console.log(option);
   }
  

   await page.waitForTimeout(5000);
});