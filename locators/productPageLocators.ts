import { request } from "@playwright/test";

export const productPageLocators = {
    settingIcon: "r#eact-burger-menu-btn",
    logoutLink : "#logout_sidebar_link",
    aboutLink : "#about_sidebar_link",
    requestDemoButton : "button:has-text('Request a demo')",
    tryFreeButton : "button:has-text('Try free')",
    productName : ".inventory_item_name",
    productDescription : ".inventory_item_desc",
    productPrice : ".inventory_item_price",
    addtoCartButton : "button:has-text('Add to cart')",
    filterDropdown : ".product_sort_container",
    filterNameAZ : "option[value='az']",
    filterNameZA : "option[value='za']",
    filterPriceLowHigh : "option[value='lohi']",
    filterPriceHighLow : "option[value='hilo']",
    cartLink : ".shopping_cart_link"
      
};
