import {test,expect} from "@playwright/test"
import path from "path";

const UI_URL="http://localhost:5173/"


test.beforeEach(async({page})=>{
    await page.goto(UI_URL);
    //get the sign in button
    await page.getByRole("link",{name:"Sign In"}).click();
    await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
    //next we need to fill the form
    await page.locator("[name=email]").fill('p@g.com');
    await page.locator("[name=password]").fill("111111");
    await page.getByRole("button",{name:"Log in"}).click();
    await expect(page.getByText("Signed in successfully")).toBeVisible(); 

})

test("should allow user to add a hotel",async({page})=>{
    await page.goto(`${UI_URL}add-hotel`)
    await page.locator('[name="name"]').fill("test hotel");
    await page.locator('[name="city"]').fill("test city");
    await page.locator('[name="country"]').fill("test country");
    await page.locator('[name="description"]').fill("test description");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3")
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("2")

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
        path.join(__dirname,"files","2.jpg"),

    ])

    await page.getByRole('button',{name:"Save"}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();






})

test("should display hotels",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`)
    await expect(page.getByText("test Hotel")).toBeVisible()
    await expect(page.getByText("test description")).toBeVisible()

    await expect(page.getByText("test city,test country")).toBeVisible()
    await expect(page.getByText("Budget")).toBeVisible()
    await expect(page.getByText("$ 100 per night")).toBeVisible();
    await expect(page.getByText("2 adults,2 children")).toBeVisible()
    await expect(page.getByText("3 star rating")).toBeVisible()

    await expect(page.getByRole("link",{name:"View Details"})).toBeVisible()
    await expect(page.getByRole("link",{name:"Add Hotel"})).toBeVisible()



})