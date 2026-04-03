import { test, expect, Locator } from '@playwright/test';

test('Read data from all the table pages', async ({ page }) => {
  await page.goto(
    'https://datatables.net/examples/basic_init/zero_configuration.html'
  );

  let hasMorePages = true;

  while (hasMorePages) {
    const rows = await page.locator('#example tbody tr').all();
    for (const row of rows) {
      console.log(await row.innerText());
    }

    const nextButton: Locator = page.locator('span.paginate_button.next');
    const classes = await nextButton.getAttribute('class');
    const isDisabled = classes?.includes('disabled');

    if (isDisabled) {
      hasMorePages = false;
    } else {
      await nextButton.click();
      // wait for processing overlay to disappear after page change
      await expect(page.locator('#example_processing')).toBeHidden();
    }
  }
});

test('Filter the rows and check the row count', async ({ page }) => {
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
 const dropdown:Locator = page.locator('#dt-length-0');
 await dropdown.selectOption({label:'25'});
 const rows = await page.locator('#example tbody tr').all();
 expect(rows.length).toBe(25);
 const rows2= page.locator("#example tbody tr");
 await expect(rows2).toHaveCount(25);
 
});

test.only('Search for specific data in table', async ({ page }) => {
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

  const searchbox: Locator = page.locator('#dt-search-0');
  await searchbox.fill('Paul Byrd');

  // Better wait: wait until at least one row is visible
  await page.locator("#example tbody tr").first().waitFor();

  const rows = await page.locator("#example tbody tr").all();

  let matchFound = false; //  declared

  if (rows.length >= 1) {
    for (let row of rows) {
      const text = await row.innerText();
      if (text.includes("Paul Byrd")) {
        matchFound = true;
        break;
      }
    }
  } else {
    console.log("No Rows found with search text");
  }

  //  Assertion (important for test validation)
  expect(matchFound).toBeTruthy();
});

