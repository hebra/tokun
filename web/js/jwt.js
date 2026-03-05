import {
  base64urlDecode,
  base64urlEncode,
  base64urlToBytes,
  copyToClipboard,
} from "./utils.js";

const encodedTextArea = document.getElementById("encoded-token");
const headerTextArea = document.getElementById("header-editor");
const payloadTextArea = document.getElementById("payload-editor");
const signatureTextArea = document.getElementById("signature-editor");
const secretInput = document.getElementById("signature-secret");
const statusSpan = document.getElementById("signature-status");

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
 * Updates the signature status UI.
 * @param {'verified' | 'invalid' | 'missing' | 'none'} state - The current verification state.
 */
function updateStatus(state) {
  statusSpan.classList.remove("verified", "invalid", "missing");
  if (state === "verified") {
    statusSpan.textContent = "VERIFIED";
    statusSpan.classList.add("verified");
  } else if (state === "invalid") {
    statusSpan.textContent = "INVALID";
    statusSpan.classList.add("invalid");
  } else if (state === "missing") {
    statusSpan.textContent = "MISSING SECRET";
    statusSpan.classList.add("missing");
  } else {
    statusSpan.textContent = "NO TOKEN";
  }
}

/**
 * Updates the validation state of a JSON input textarea.
 * @param {HTMLTextAreaElement} textarea - The textarea to validate.
 */
function updateValidationState(textarea) {
  const value = textarea.value.trim();
  if (!value) {
    textarea.classList.remove("invalid-input");
    return;
  }
  try {
    JSON.parse(value);
    textarea.classList.remove("invalid-input");
  } catch {
    textarea.classList.add("invalid-input");
  }
}

/**
 * Verifies the JWT signature using the provided secret (for HS256, HS384, HS512).
 */
async function verifySignature() {
  const token = encodedTextArea.value.trim();
  const secret = secretInput.value;

  if (!token) {
    updateStatus("none");
    return;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    updateStatus("invalid");
    return;
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  try {
    const header = JSON.parse(base64urlDecode(headerB64));

    const algorithms = {
      HS256: "SHA-256",
      HS384: "SHA-384",
      HS512: "SHA-512",
    };

    const hash = algorithms[header.alg];

    if (hash) {
      // HMAC key cannot be empty in Web Crypto API, so we skip verification
      // if no secret is provided yet to avoid throwing DataError.
      if (!secret) {
        updateStatus("missing");
        return;
      }

      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const dataToSign = encoder.encode(`${headerB64}.${payloadB64}`);
      const signatureBytes = base64urlToBytes(signatureB64);

      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash },
        false,
        ["verify"],
      );

      const isValid = await crypto.subtle.verify(
        "HMAC",
        key,
        signatureBytes,
        dataToSign,
      );

      updateStatus(isValid ? "verified" : "invalid");
    } else {
      // For algorithms not yet supported (RS256, etc.)
      updateStatus("invalid");
    }
  } catch {
    // Gracefully handle verification errors (invalid format, atob failure, etc.)
    updateStatus("invalid");
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
    updateValidationState(headerTextArea);
    updateValidationState(payloadTextArea);
    updateStatus("none");
    return;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    // Not a valid JWT structure
    updateStatus("invalid");
    return;
  }

  try {
    headerTextArea.value = formatJSON(base64urlDecode(parts[0]));
    payloadTextArea.value = formatJSON(base64urlDecode(parts[1]));
    signatureTextArea.value = parts[2];

    updateValidationState(headerTextArea);
    updateValidationState(payloadTextArea);
    verifySignature();
  } catch {
    updateStatus("invalid");
  }
}

/**
 * Encodes the values from the editors and updates the encoded token.
 */
function handleDecodedChange() {
  updateValidationState(headerTextArea);
  updateValidationState(payloadTextArea);
  try {
    const header = base64urlEncode(headerTextArea.value.trim());
    const payload = base64urlEncode(payloadTextArea.value.trim());
    const signature = signatureTextArea.value.trim();

    encodedTextArea.value = `${header}.${payload}.${signature}`;
    verifySignature();
  } catch {
    // Silent fail for encoding errors during typing
  }
}

// Event Listeners
encodedTextArea.addEventListener("input", handleEncodedChange);
headerTextArea.addEventListener("input", handleDecodedChange);
payloadTextArea.addEventListener("input", handleDecodedChange);
signatureTextArea.addEventListener("input", handleDecodedChange);
secretInput.addEventListener("input", verifySignature);

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
} else {
  updateStatus("none");
}
