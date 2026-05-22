const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

const SENSITIVE_SELECTOR = [
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
  "[data-lumi-sensitive]",
].join(",");

function maskSensitiveNode(node) {
  if (!(node instanceof Element)) return;

  if (node.matches(SENSITIVE_SELECTOR)) {
    node.setAttribute("data-clarity-mask", "True");
  }

  node.querySelectorAll?.(SENSITIVE_SELECTOR).forEach((element) => {
    element.setAttribute("data-clarity-mask", "True");
  });
}

export function protectClaritySensitiveFields() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const maskAll = () => maskSensitiveNode(document.body);
  let observerStarted = false;

  if (document.body) {
    maskAll();
  } else {
    document.addEventListener("DOMContentLoaded", maskAll, { once: true });
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(maskSensitiveNode);
    });
  });

  const startObserver = () => {
    if (!document.body || observerStarted) return;
    observerStarted = true;
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver, { once: true });
  } else {
    startObserver();
  }
}

export function initClarity() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!import.meta.env.PROD || !CLARITY_PROJECT_ID) return;
  if (window.__lumiClarityLoaded) return;

  window.__lumiClarityLoaded = true;

  window.clarity =
    window.clarity ||
    function clarityQueue() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  script.setAttribute("data-lumi-analytics", "microsoft-clarity");

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}
