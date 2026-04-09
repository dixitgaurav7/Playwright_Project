import {test, expect, Locator} from '@playwright/test';

test('dynamic tables', async ({page}) => {
  await page.goto('https://practice.expandtesting.com/dynamic-table');
  const table:Locator=page.locator('table.table tbody');
  await expect(table).toBeVisible();
  const rows:Locator[]=await table.locator('tr').all();
  console.log("Number of rows in a table:",rows.length);
  expect(rows).toHaveLength(4);

  // Read each row for chrome process
  let cpuLoad='';
  for(const row of rows){
    const processName:string= await row.locator("td").nth(0).innerText();
    if(processName==="chrome"){
      cpuLoad= await row.locator(`td:has-text("%")`).innerText();
      //cpuLoad= await row.locator("td",{has Text:`%`}).innerText();
      console.log("CPU load for chrome process is:", cpuLoad);
      break;
    }
  }

  //compare the value
 let yellowboxtext:string=await page.locator("chrome-cpu").innerText();
console.log("Yellow box text is:", yellowboxtext);
if(yellowboxtext.includes(cpuLoad)){
  console.log("CPU load of Chrome is equal");
}else{
  console.log("CPU load of Chrome is not equal")
}
expect(yellowboxtext).toContain(cpuLoad);
await page.waitForTimeout(5000);
});
