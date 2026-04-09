import { test, expect, Locator } from '@playwright/test';

test('Static Table Tests', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const rows: Locator = page.locator("table[name='BookTable'] tbody tr");

    // 1) Count the number of rows in the table and print it.
    const rowCount: number = await rows.count();
    console.log('Number of rows in the table:', rowCount);
    expect(rowCount).toBe(7);

    // 2) Count number of headers / columns.
    const columns: Locator = rows.first().locator('th');
    await expect(columns).toHaveCount(4);
    const columnCount: number = await columns.count();
    console.log('Number of columns in the table:', columnCount);
    expect(columnCount).toBe(4);

    // 3) Print all data from the second row.
    const secondRowCells: Locator = rows.nth(2).locator('td');
    const secondRowText: string[] = await secondRowCells.allInnerTexts();
    console.log('Data in the second row:', secondRowText);
    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

    for (const text of secondRowText) {
        console.log(text);
    }

    // 4) Read all data from table including header.
    console.log('BookName\tAuthor\tSubject\tPrice');
    const allRowData = await rows.all();
    for (const row of allRowData) {
        const isHeaderRow = await row.locator('th').count();
        const cells = isHeaderRow
            ? await row.locator('th').allInnerTexts()
            : await row.locator('td').allInnerTexts();
        console.log(cells.join('\t'));
    }

    // 5) Print book names where author is Mukesh.
    console.log('Books written by Mukesh.....');
    const mukeshBooks:string[]=[];
    for (const row of allRowData.slice(1)) {
        const cols = await row.locator('td').allInnerTexts();
        if (cols[1]?.trim() === 'Mukesh') {
            console.log(cols[0]);
        }
    }
    expect(mukeshBooks).toContain('Learn Java');
    expect(mukeshBooks).toHaveLength(2);
// 6) Calculate total price of books
let totalPrice=0;
for (let rows of allRowData.slice(1)){
    const cells = await rows.locator('td' ).allInnerTexts();
    const price=parseInt(cells[3]);
    totalPrice= totalPrice+price;
    console.log('Total Price of Books:', totalPrice);
}

});
