import type { AuthUiError } from "./authErrors";

const SOURCE_LABELS: Record<AuthUiError["source"], string> = {
  network: "Réseau",
  supabase: "Supabase Auth",
  rls: "Sécurité RLS",
  profile: "Profil utilisateur",
  callback: "Callback d’authentification",
};

export function AuthErrorPanel({ error }: { error: AuthUiError }) {
  return <div className="auth-error-panel" role="alert" aria-live="assertive">
    <strong>{SOURCE_LABELS[error.source]}</strong>
    <p>{error.guidance}</p>
    <code>{error.code} — {error.message}</code>
  </div>;
}
