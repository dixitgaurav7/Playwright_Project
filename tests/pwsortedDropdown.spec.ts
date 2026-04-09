import { test,expect,Locator } from '@playwright/test';

test('Verify sorted dropdown options',async ({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/');
const dropDownOption:Locator=page.locator('#animal>option');
//const dropDownOption:Locator=page.locator('#colors>option');
//console.log(await dropDownOption.allTextContents());
const optionText:string[]=(await dropDownOption.allTextContents()).map(text=>text.trim());
const originalList:string[]=[...optionText];
const sortedList:string[]=[...optionText].sort();
console.log('Original List:',originalList);
console.log('Sorted List:',sortedList);

expect(originalList).toEqual(sortedList);
expect(originalList).toEqual(sortedList);
    //await page.waitForTimeout(5000);
});