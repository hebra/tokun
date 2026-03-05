/**
 * Reusable helper functions for the Tokun project.
 */

/**
 * Encodes a string to Base64URL.
 * @param {string} str - The string to encode.
 * @returns {string} The Base64URL encoded string.
 */
export function base64urlEncode(str) {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decodes a Base64URL encoded string.
 * @param {string} str - The Base64URL encoded string to decode.
 * @returns {string} The decoded string.
 */
export function base64urlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

/**
 * Copies text to the system clipboard.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Whether the copy was successful.
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    showToast("Failed to copy to clipboard.", "error");
    return false;
  }
}

/**
 * Displays a temporary toast notification.
 * @param {string} message - The message to display.
 * @param {'success' | 'error' | 'info'} type - The type of toast.
 */
export function showToast(message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Remove toast after animation
  setTimeout(() => {
    toast.classList.add("toast-fade-out");
    toast.addEventListener("transitionend", () => {
      toast.remove();
      if (toastContainer.childNodes.length === 0) {
        toastContainer.remove();
      }
    });
  }, 3000);
}
