import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./e2e",fullyParallel:false,retries:0,reporter:"list",
  use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure"},
  webServer:{command:"pnpm dev --host 127.0.0.1 --port 4173",url:"http://127.0.0.1:4173",reuseExistingServer:true},
  projects:[
    {name:"Desktop Chrome",use:{...devices["Desktop Chrome"]}},
    {name:"iPhone",use:{...devices["Desktop Chrome"],viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
    {name:"Android",use:{...devices["Pixel 7"]}},
  ],
});
