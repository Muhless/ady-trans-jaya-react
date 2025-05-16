const BASE_URL = "http://localhost:8080";

export function getFullImageUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return BASE_URL + path;
}
