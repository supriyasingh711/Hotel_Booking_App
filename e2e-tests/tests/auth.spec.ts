import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('should allow the user to log in', async ({ page }) => {
await page.goto(UI_URL);
//get the sign in button
await page.getByRole("link",{name:"Sign In"}).click();
await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
//next we need to fill the form
await page.locator("[name=email]").fill('p@g.com');
await page.locator("[name=password]").fill("111111");
await page.getByRole("button",{name:"Log in"}).click();
await expect(page.getByText("Signed in successfully")).toBeVisible();
await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();



});

//test for registration
test("should allow user to register",async({page})=>{
  const testEmail=`test_register_${Math.floor(Math.random()*90000)+10000 }@test.com`

  await page.goto(UI_URL)
  await page.getByRole("link",{name:"Sign In "}).click();
  await page.getByRole("link",{name:"Create an Account"}).click();
  await expect(page.getByRole("heading",{name: "Create an Account"})).toBeVisible();
  await page.locator("[name=firstName]").fill("test_firstname");
  await page.locator("[name=lastName]").fill("test_lastname");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("111111");
  await page.locator("[name=confirmPassword]").fill("111111");
  await page.getByRole("button",{name:"Create Account"}).click();
  await expect(page.getByText("user registered successfully")).toBeVisible();
await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();








})


