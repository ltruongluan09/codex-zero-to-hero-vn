function getFieldValue(form, name) {
  const field = form.querySelector(`[name="${name}"]`);
  return field ? field.value.trim() : "";
}

function setLoading(card, isLoading) {
  const button = card.querySelector("[data-mini-lab-run]");
  card.classList.toggle("is-loading", isLoading);
  if (button) {
    button.disabled = isLoading;
    button.textContent = isLoading ? "Lumi Bot đang làm..." : button.dataset.idleText || "Làm mẫu cho tôi";
  }
}

function renderResult(card, data) {
  const title = card.querySelector("[data-mini-lab-title]");
  const output = card.querySelector("[data-mini-lab-output]");
  const tips = card.querySelector("[data-mini-lab-tips]");

  if (title) title.textContent = data.title || "Kết quả từ Lumi Bot";
  if (output) output.textContent = data.result || "";
  if (tips) {
    tips.innerHTML = "";
    (data.tips || []).forEach((tip) => {
      const item = document.createElement("div");
      item.textContent = `• ${tip}`;
      tips.appendChild(item);
    });
  }

  card.classList.add("has-result");
  card.classList.remove("has-error");
}

function renderError(card, message) {
  const error = card.querySelector("[data-mini-lab-error]");
  if (error) error.textContent = message;
  card.classList.add("has-error");
}

async function copyResult(card, button) {
  const output = card.querySelector("[data-mini-lab-output]");
  const text = output?.textContent?.trim();
  if (!text) return;

  await navigator.clipboard.writeText(text);
  const old = button.textContent;
  button.textContent = "Đã copy!";
  setTimeout(() => {
    button.textContent = old;
  }, 1600);
}

document.querySelectorAll("[data-mini-lab]").forEach((card) => {
  const form = card.querySelector("[data-mini-lab-form]");
  const copyButton = card.querySelector("[data-mini-lab-copy]");
  const runButton = card.querySelector("[data-mini-lab-run]");

  if (runButton) runButton.dataset.idleText = runButton.textContent;

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fields = (card.dataset.fields || "")
      .split(",")
      .map((field) => field.trim())
      .filter(Boolean);

    const inputs = Object.fromEntries(fields.map((field) => [field, getFieldValue(form, field)]));

    setLoading(card, true);
    card.classList.remove("has-error");

    try {
      const response = await fetch("/api/mini-lab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: card.dataset.miniLab,
          inputs,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        renderError(card, data.error || "Lumi Bot chưa làm được phần này. Bạn thử lại giúp mình nhé.");
        return;
      }

      renderResult(card, data);
    } catch {
      renderError(card, "Kết nối hơi chập chờn. Bạn thử lại sau vài giây nhé.");
    } finally {
      setLoading(card, false);
    }
  });

  copyButton?.addEventListener("click", () => copyResult(card, copyButton));
});
