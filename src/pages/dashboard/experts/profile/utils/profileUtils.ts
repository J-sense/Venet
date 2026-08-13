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

// Helper to format API error messages into user-friendly strings
export const formatApiErrorMessage = (err: any): string => {
  if (!err) return "Failed to update profile. Please check your inputs.";

  const rawDetails =
    err?.data?.details ?? err?.details ?? err?.data?.message ?? err?.message;

  if (!rawDetails) return "Failed to update profile. Please try again.";

  let strVal = "";
  if (typeof rawDetails === "string") {
    strVal = rawDetails;
  } else if (typeof rawDetails === "object") {
    strVal = JSON.stringify(rawDetails);
  }

  if (
    strVal.includes("hourly_rate") &&
    (strVal.includes("valid number") || strVal.includes("invalid"))
  ) {
    return "A valid number is required for Hourly Rate (e.g. 45.00).";
  }
  if (strVal.includes("years_of_experience")) {
    return "A valid number is required for Years of Experience.";
  }

  if (typeof rawDetails === "string") {
    return rawDetails;
  }

  if (typeof rawDetails === "object" && rawDetails !== null) {
    const errorMessages: string[] = [];
    Object.entries(rawDetails).forEach(([k, v]) => {
      const valText = typeof v === "string" ? v : JSON.stringify(v);
      errorMessages.push(`${k}: ${valText}`);
    });
    if (errorMessages.length > 0) return errorMessages.join(" | ");
  }

  return "Failed to update profile. Please try again.";
};
