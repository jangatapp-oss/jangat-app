export function buildAppUrl(
  route: string,
  origin = window.location.origin,
  basePath = import.meta.env.BASE_URL,
): string {
  const baseSegments = basePath.split("/").filter(Boolean);
  const normalizedBase = baseSegments.length ? `/${baseSegments.join("/")}/` : "/";
  const normalizedRoute = route.replace(/^\/+/, "");
  return new URL(`${normalizedBase}${normalizedRoute}`, `${origin.replace(/\/+$/, "")}/`).toString();
}
