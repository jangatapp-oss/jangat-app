import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./e2e",fullyParallel:false,retries:0,reporter:"list",
  use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure"},
  webServer:{command:"pnpm dev --host 127.0.0.1 --port 4173",url:"http://127.0.0.1:4173",reuseExistingServer:true,env:{...process.env,VITE_SUPABASE_URL:"https://example.supabase.co",VITE_SUPABASE_ANON_KEY:"public-anon-key-for-layout-tests-only-123456789"}},
  projects:[
    {name:"Desktop Chrome",use:{...devices["Desktop Chrome"]}},
    {name:"iPhone SE 375x667",use:{...devices["Desktop Chrome"],viewport:{width:375,height:667},deviceScaleFactor:2,isMobile:true,hasTouch:true}},
    {name:"iPhone X 375x812",use:{...devices["Desktop Chrome"],viewport:{width:375,height:812},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
    {name:"iPhone 14 390x844",use:{...devices["Desktop Chrome"],viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
    {name:"iPhone 15 393x852",use:{...devices["Desktop Chrome"],viewport:{width:393,height:852},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
    {name:"iPhone Plus 430x932",use:{...devices["Desktop Chrome"],viewport:{width:430,height:932},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
    {name:"iPhone landscape",use:{...devices["Desktop Chrome"],viewport:{width:844,height:390},deviceScaleFactor:3,isMobile:true,hasTouch:true}},
  ],
});
