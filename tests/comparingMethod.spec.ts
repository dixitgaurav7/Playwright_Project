import{test,expect,Locator} from '@playwright/test';

test('Comparing Methods', async ({ page }) => {
 await page.goto('https://demowebshop.tricentis.com/');
 const products:Locator = page.locator('.product-title');
 // 1) innerText()  vs textContent()
 //console.log(await products.nth(1).innerText());
 //console.log(await products.nth(1).textContent());
// const count = await products.count();
 //for(let i=0;i<count;i++){
   //const productName1:string|null=await products.nth(i).innerText();
   //console.log(productName1);
  // const productName:string|null=await products.nth(i).textContent();
  //// console.log(productName?.trim());
 //}

 /*console.log("**** Comparing allInnerText() with allTextContent() ****");
 //const productsNames1:string[] = await products.allInnerText();
 //console.log(productsNames1);
 const productsNames:(string|null)[] = await products.allTextContent();
 console.log("allTextContent():", productsNames);
 const trimmedNames = productsNames.map(text=>text?.trim());
 console.log("Trimmed Names:", trimmedNames);*/

const productsLocator:Locator[] = await products.all();
//console.log(await productsLocator[1].innerText());

/*for (let productloc of productsLocator)
    {

        console.log(await productloc.innerText());
    }*/

    for (let i in productsLocator)
    {

        console.log(await productsLocator[i].innerText());
    }

});








