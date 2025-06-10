/**
 * Constructs the absolute URL for an API endpoint.
 * In production, it uses the NEXT_PUBLIC_API_URL environment variable.
 * In development, it uses a relative path to leverage the Next.js proxy.
 * @param path
 * @returns
 */
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  return `${baseUrl}${path}`;
}
