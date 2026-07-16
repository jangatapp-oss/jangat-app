export type AuthErrorSource = "network" | "supabase" | "rls" | "profile" | "callback";

export type AuthUiError = {
  code: string;
  message: string;
  source: AuthErrorSource;
  guidance: string;
};

type ErrorLike = {
  code?: unknown;
  message?: unknown;
  status?: unknown;
  name?: unknown;
  details?: unknown;
};

function asErrorLike(error: unknown): ErrorLike {
  return typeof error === "object" && error !== null ? error as ErrorLike : {};
}

export function classifyAuthError(error: unknown, phase: "auth" | "profile" | "callback"): AuthUiError {
  const value = asErrorLike(error);
  const code = typeof value.code === "string"
    ? value.code
    : typeof value.name === "string"
      ? value.name
      : "unknown_error";
  const message = typeof value.message === "string"
    ? value.message
    : typeof error === "string"
      ? error
      : "Erreur sans message retournée par le service.";
  const normalized = `${code} ${message}`.toLowerCase();

  let source: AuthErrorSource = phase === "callback" ? "callback" : phase === "profile" ? "profile" : "supabase";
  let guidance = "Supabase a refusé cette opération d’authentification.";

  if (normalized.includes("fetch") || normalized.includes("network") || normalized.includes("failed to connect")) {
    source = "network";
    guidance = "Connexion réseau impossible. Vérifiez votre accès internet puis réessayez.";
  } else if (normalized.includes("email_not_confirmed") || normalized.includes("email not confirmed")) {
    guidance = "Votre adresse e-mail n’est pas encore confirmée. Ouvrez le lien reçu par e-mail.";
  } else if (normalized.includes("invalid_credentials") || normalized.includes("invalid login credentials")) {
    guidance = "Adresse e-mail ou mot de passe incorrect. Supabase ne distingue pas un compte inexistant d’un mauvais mot de passe.";
  } else if (normalized.includes("user_banned") || normalized.includes("banned") || normalized.includes("disabled")) {
    guidance = "Ce compte est désactivé. Contactez l’administrateur JÀNGAT.";
  } else if (normalized.includes("42501") || normalized.includes("row-level security") || normalized.includes("rls")) {
    source = "rls";
    guidance = "La politique de sécurité de la base refuse l’accès à ces données.";
  } else if (normalized.includes("pgrst202") || normalized.includes("pgrst205") || normalized.includes("schema cache")) {
    source = "profile";
    guidance = "La connexion Auth a réussi, mais le schéma JÀNGAT requis pour charger le profil n’est pas installé.";
  } else if (phase === "callback") {
    guidance = "Le lien de confirmation ou de récupération est invalide, incomplet ou expiré.";
  }

  return { code, message, source, guidance };
}

export function debugAuthError(
  error: AuthUiError,
  request: { action: string; email?: string; redirectTo?: string },
): void {
  if (!import.meta.env.DEV) return;
  console.groupCollapsed(`[JÀNGAT Auth] ${request.action} — ${error.source}`);
  console.error("Code :", error.code);
  console.error("Message :", error.message);
  console.info("Requête Auth :", request);
  console.info("Origine :", error.source);
  console.groupEnd();
}

export function debugAuthRequest(request: { action: string; email?: string; redirectTo?: string }): void {
  if (!import.meta.env.DEV) return;
  console.info("[JÀNGAT Auth] Requête", request);
}
