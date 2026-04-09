import { test,expect,Locator } from '@playwright/test';

test('Verify duplicates dropdown',async ({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/');
const dropDownOption:Locator=page.locator('#animal>option');
//const dropDownOption:Locator=page.locator('#colors>option');
const optionText:string[]=(await dropDownOption.allTextContents()).map(text=>text.trim());
const myset= new Set<string>();
const duplicates:string[]=[];
for(const text of optionText){
    if(myset.has(text)){
        duplicates.push(text);
    }else{
        myset.add(text);
    }
}
console.log('Duplicates options are:===>', duplicates);
if(duplicates.length>0){
    console.log('Found duplicates in the dropdown.');
}else{
    console.log('No duplicates found in the dropdown.');
}

expect(duplicates.length).toBe(0);

});