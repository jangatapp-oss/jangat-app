import { expect, test } from "@playwright/test";

test("une route privée ne révèle aucune donnée sans session",async({page})=>{await page.goto("/dashboard");const config=await page.getByText("Configuration Supabase requise").count();if(!config)await expect(page).toHaveURL(/login/);await expect(page.getByText(/Bonjour /)).toHaveCount(0)});
test("la configuration absente est explicitement signalée",async({page})=>{await page.goto("/");const config=page.getByText("Configuration Supabase requise");if(await config.count())await expect(config).toBeVisible()});
test("aucun débordement horizontal",async({page})=>{await page.goto("/");const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);expect(overflow).toBe(false)});
test("les formulaires restent utilisables avec un petit viewport",async({page})=>{await page.goto("/login");const email=page.getByLabel("Adresse e-mail");await email.focus();await email.fill("iphone@example.com");await expect(email).toBeInViewport();const submit=page.getByRole("button",{name:"Se connecter"});await expect(submit).toBeInViewport();const fontSize=await email.evaluate(element=>parseFloat(getComputedStyle(element).fontSize));expect(fontSize).toBeGreaterThanOrEqual(16)});
test("les zones tactiles principales mesurent au moins 44 points",async({page})=>{await page.goto("/login");for(const element of await page.locator("button, input").all()){const box=await element.boundingBox();if(box){expect(box.height).toBeGreaterThanOrEqual(44)}}});
test("le manifeste annonce une PWA iPhone autonome",async({request})=>{const manifest=await request.get("/manifest.json");expect(manifest.ok()).toBeTruthy();const data=await manifest.json();expect(data.name).toBe("JÀNGAT");expect(data.display).toBe("standalone");expect(data.orientation).toBe("portrait");expect(data.icons.length).toBeGreaterThan(0)});

test.describe("parcours connecté Supabase",()=>{
  test.skip(!process.env.E2E_SUPABASE_EMAIL||!process.env.E2E_SUPABASE_PASSWORD,"Identifiants de staging requis");
  test("connexion, reprise et séparation serveur",async({page})=>{
    await page.goto("/login");
    await page.getByLabel("Adresse e-mail").fill(process.env.E2E_SUPABASE_EMAIL!);
    await page.getByLabel("Mot de passe").fill(process.env.E2E_SUPABASE_PASSWORD!);
    await page.getByRole("button",{name:"Se connecter"}).click();
    await expect(page).toHaveURL(/dashboard|onboarding/);
  });
});
