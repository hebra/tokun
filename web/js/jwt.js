import { base64urlDecode, base64urlEncode, copyToClipboard } from "./utils.js";

const encodedTextArea = document.getElementById("encoded-token");
const headerTextArea = document.getElementById("header-editor");
const payloadTextArea = document.getElementById("payload-editor");
const signatureTextArea = document.getElementById("signature-editor");

/**
 * Parses and formats JSON if possible.
 * @param {string} str - The string to parse.
 * @returns {string} Formatted JSON or the original string.
 */
function formatJSON(str) {
  try {
    const obj = JSON.parse(str);
    return JSON.stringify(obj, null, 2);
  } catch {
    return str;
  }
}

/**
 * Decodes the encoded token and updates the editors.
 */
function handleEncodedChange() {
  const token = encodedTextArea.value.trim();
  if (!token) {
    headerTextArea.value = "";
    payloadTextArea.value = "";
    signatureTextArea.value = "";
    return;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    // Not a valid JWT structure
    return;
  }

  try {
    headerTextArea.value = formatJSON(base64urlDecode(parts[0]));
    payloadTextArea.value = formatJSON(base64urlDecode(parts[1]));
    signatureTextArea.value = parts[2]; // Signature is usually not decoded further as it's binary/hash
  } catch (error) {
    console.error("Failed to decode JWT part:", error);
  }
}

/**
 * Encodes the values from the editors and updates the encoded token.
 */
function handleDecodedChange() {
  try {
    const header = base64urlEncode(headerTextArea.value.trim());
    const payload = base64urlEncode(payloadTextArea.value.trim());
    const signature = signatureTextArea.value.trim();

    encodedTextArea.value = `${header}.${payload}.${signature}`;
  } catch (error) {
    console.error("Failed to encode JWT:", error);
  }
}

// Event Listeners
encodedTextArea.addEventListener("input", handleEncodedChange);
headerTextArea.addEventListener("input", handleDecodedChange);
payloadTextArea.addEventListener("input", handleDecodedChange);
signatureTextArea.addEventListener("input", handleDecodedChange);

// Copy Buttons
document.getElementById("copy-encoded").addEventListener("click", () => {
  copyToClipboard(encodedTextArea.value);
});

document.getElementById("copy-header").addEventListener("click", () => {
  copyToClipboard(headerTextArea.value);
});

document.getElementById("copy-payload").addEventListener("click", () => {
  copyToClipboard(payloadTextArea.value);
});

document.getElementById("copy-signature").addEventListener("click", () => {
  copyToClipboard(signatureTextArea.value);
});

// Initial decode if token is present
if (encodedTextArea.value) {
  handleEncodedChange();
}
