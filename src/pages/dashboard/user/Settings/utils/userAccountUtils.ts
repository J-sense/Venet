// Helper to format image URLs and fix mixed-content HTTP/HTTPS issues
export const getImageUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://")
  ) {
    return url.replace("http://", "https://");
  }
  return url;
};
