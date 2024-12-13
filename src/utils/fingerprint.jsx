const generateFingerprint = () => {
  const properties = [
    navigator.userAgent,
    navigator.language,
    window.screen.width, // Use window.screen instead of just screen
    window.screen.height, // Use window.screen instead of just screen
    new Date().getTimezoneOffset(),
  ];
  return btoa(properties.join("|")); // Encode properties into a Base64 fingerprint
};

export default generateFingerprint;
