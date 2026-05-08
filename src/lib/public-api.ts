const DEFAULT_PRODUCTION_API_URL = "https://api.getxm.com";

export const getPublicApiBaseUrl = () => {
  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
  if (configuredApiUrl) {
    return configuredApiUrl;
  }

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    const isLocalHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";

    if (!isLocalHost) {
      return DEFAULT_PRODUCTION_API_URL;
    }
  }

  return "";
};
