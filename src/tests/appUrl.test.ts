import { describe, expect, it } from "vitest";
import { buildAppUrl } from "../config/appUrl";

describe("URLs de redirection Supabase",()=>{
  it("construit le callback à la racine",()=>{
    expect(buildAppUrl("/auth/callback","https://staging.jangat.app","/"))
      .toBe("https://staging.jangat.app/auth/callback");
  });
  it("conserve le basename GitHub Pages",()=>{
    expect(buildAppUrl("/auth/callback","https://jangatapp-oss.github.io","/jangat-app/"))
      .toBe("https://jangatapp-oss.github.io/jangat-app/auth/callback");
  });
  it("normalise les barres obliques",()=>{
    expect(buildAppUrl("reset-password","https://jangat.app/","jangat-app"))
      .toBe("https://jangat.app/jangat-app/reset-password");
  });
});
