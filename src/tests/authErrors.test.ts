import { describe, expect, it } from "vitest";
import { classifyAuthError } from "../features/auth/authErrors";

describe("messages d’authentification",()=>{
  it("affiche l’e-mail non confirmé",()=>{
    const result=classifyAuthError({code:"email_not_confirmed",message:"Email not confirmed"},"auth");
    expect(result.guidance).toContain("pas encore confirmée");
    expect(result.code).toBe("email_not_confirmed");
  });
  it("traite mauvais mot de passe et utilisateur inexistant sans fuite d’information",()=>{
    const result=classifyAuthError({code:"invalid_credentials",message:"Invalid login credentials"},"auth");
    expect(result.guidance).toContain("mot de passe incorrect");
    expect(result.message).toBe("Invalid login credentials");
  });
  it("affiche un compte désactivé",()=>{
    const result=classifyAuthError({code:"user_banned",message:"User is banned"},"auth");
    expect(result.guidance).toContain("compte est désactivé");
  });
  it("identifie une politique RLS",()=>{
    expect(classifyAuthError({code:"42501",message:"row-level security policy"},"profile").source).toBe("rls");
  });
  it("identifie le schéma de profil absent",()=>{
    const result=classifyAuthError({code:"PGRST202",message:"function was not found in the schema cache"},"profile");
    expect(result.source).toBe("profile");
    expect(result.guidance).toContain("schéma JÀNGAT");
  });
});
