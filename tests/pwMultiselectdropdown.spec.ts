import{test,expect,Locator} from '@playwright/test';

test('Verify single select dropdown',async ({page})=>{ 
    await page.goto('https://testautomationpractice.blogspot.com/');
    //1) select an option from dropdown
    //await page.locator('#colors').selectOption(['Red','Blue','Green']);//Using visible text
    //await page.locator('#colors').selectOption(['Red','green','white']);//Using value
   //await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'},{label:'White'}]);//Using label
    //await page.locator('#colors').selectOption([{index:0},{index:2},{index:3}]);
   //2) check no of options in dropdown
   const dropdownOption:Locator=page.locator('#colors>option');
   await expect(dropdownOption).toHaveCount(7);

  
   
  //3) check an option is present in dropdown or not

  const optionText:string[]=(await dropdownOption.allTextContents()).map(option=>option.trim());
  console.log(optionText);
  expect(optionText).toContain('Red');
 
  
  //4) get all options from dropdown and print them
  for (const option of optionText)
{

    console.log(option);
}
  
});