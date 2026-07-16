import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration=readFileSync(new URL("../../supabase/migrations/202607160001_jangat_v1.sql",import.meta.url),"utf8").toLowerCase();
const seed=readFileSync(new URL("../../supabase/seed_jangat_v1.sql",import.meta.url),"utf8").toLowerCase();
const position=(fragment:string)=>migration.indexOf(fragment);

describe("migration JÀNGAT autonome",()=>{
  it("crée profiles avant ses dépendances",()=>{
    const profiles=position("create table if not exists public.profiles");
    expect(profiles).toBeGreaterThan(-1);
    expect(profiles).toBeLessThan(position("create table if not exists public.enrollments"));
    expect(profiles).toBeLessThan(position("create table if not exists public.user_gamification"));
    expect(profiles).toBeLessThan(position("create or replace function public.ensure_jangat_profile"));
    expect(profiles).toBeLessThan(position("create policy profiles_own_select"));
  });

  it("respecte l’ordre des clés étrangères du catalogue",()=>{
    expect(position("create table if not exists public.courses")).toBeLessThan(position("create table if not exists public.course_sections"));
    expect(position("create table if not exists public.course_sections")).toBeLessThan(position("create table if not exists public.course_units"));
    expect(position("create table if not exists public.course_units")).toBeLessThan(position("create table if not exists public.lessons"));
    expect(position("create table if not exists public.lessons")).toBeLessThan(position("create table if not exists public.lesson_steps"));
    expect(position("create table if not exists public.lesson_steps")).toBeLessThan(position("create table if not exists public.questions"));
  });

  it("crée fonctions et tables avant triggers et RLS",()=>{
    const rlsSection=position("-- 6. rls seulement après création de toutes les tables.");
    expect(position("create or replace function public.set_updated_at")).toBeLessThan(position("create trigger on_auth_user_created"));
    expect(position("create table if not exists public.rpc_idempotency")).toBeLessThan(rlsSection);
    expect(position("create table if not exists public.profiles")).toBeLessThan(rlsSection);
  });

  it("sécurise toutes les fonctions definer avec un search_path",()=>{
    const functions=migration.match(/security definer\s+set search_path = pg_catalog, public/g)??[];
    const withoutComments=migration.replace(/--.*$/gm,"");
    expect(functions).toHaveLength(8);
    expect(withoutComments).not.toMatch(/security definer(?!\s+set search_path)/);
  });

  it("crée toutes les tables utilisées par le seed",()=>{
    const seeded=[...seed.matchAll(/(?:insert into|update) public\\.([a-z_]+)/g)].map(match=>match[1]);
    for(const table of new Set(seeded)){
      expect(migration,`table ${table}`).toContain(`create table if not exists public.${table}`);
    }
  });
});
