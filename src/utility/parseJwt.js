export function parseJwt(token) {
  try {
    // Get the second part of the token which contains the payload
    const base64Url = token.split(".")[1];
    // Replace '-' with '+' and '_' with '/' to make it base64 encoded string
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Decode base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse the JSON payload
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null; // Return null if token is invalid
  }
}
