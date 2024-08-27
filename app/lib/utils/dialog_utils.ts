export function getHighResLogo(logoUrl: string): string {
  // Check if the URL ends with '60.png'
  if (logoUrl.endsWith("60.png")) {
    // Replace '60.png' with '240.png' at the end of the URL
    return logoUrl.slice(0, -6) + "240.png";
  }
  // If the URL doesn't end with '60.png', return it unchanged
  return logoUrl;
}
