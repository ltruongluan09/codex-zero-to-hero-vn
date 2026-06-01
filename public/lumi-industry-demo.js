function runIndustryDemo(root) {
  const statusEl = root.querySelector("[data-industry-status]");
  const outputEl = root.querySelector("[data-industry-output]");
  const flowSteps = Array.from(root.querySelectorAll("[data-industry-step]"));
  const statuses = (root.dataset.statuses || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  outputEl.style.opacity = "0.35";
  flowSteps.forEach((step) => step.classList.remove("is-active", "is-done"));
  root.querySelectorAll(".industry-fade").forEach((el) => {
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  });

  let index = 0;
  statusEl.textContent = statuses[index] || "Lumi đang xử lý...";
  flowSteps[0]?.classList.add("is-active");

  const timer = setInterval(() => {
    flowSteps[index]?.classList.remove("is-active");
    flowSteps[index]?.classList.add("is-done");
    index += 1;
    flowSteps[index]?.classList.add("is-active");
    statusEl.textContent = statuses[index] || statuses[statuses.length - 1] || "Xong.";

    if (index >= Math.max(statuses.length - 1, flowSteps.length - 1)) {
      clearInterval(timer);
      flowSteps.forEach((step) => step.classList.add("is-done"));
      outputEl.style.opacity = "1";
    }
  }, 650);
}

function textFromResult(result) {
  return Array.from(result.querySelectorAll("h2, h3, p, li"))
    .map((node) => node.textContent.trim())
    .filter(Boolean)
    .join("\n");
}

function ensureIndustryActions(result) {
  const head = result.querySelector(".industry-result-head");
  if (!head || head.querySelector(".industry-result-tools")) return;

  const tools = document.createElement("div");
  tools.className = "industry-result-tools";

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "industry-copy";
  copyButton.textContent = "Copy kết quả";

  const rerunLink = document.createElement("a");
  rerunLink.className = "industry-copy secondary";
  rerunLink.href = "#";
  rerunLink.textContent = "Xem Lumi chạy lại";

  tools.append(copyButton, rerunLink);
  head.appendChild(tools);

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(textFromResult(result));
    const old = copyButton.textContent;
    copyButton.textContent = "Đã copy";
    setTimeout(() => {
      copyButton.textContent = old;
    }, 1400);
  });

  rerunLink.addEventListener("click", (event) => {
    event.preventDefault();
    const demo = document.querySelector("[data-industry-demo]");
    if (demo) {
      demo.scrollIntoView({ behavior: "smooth", block: "center" });
      runIndustryDemo(demo);
    }
  });
}

function ensureIndustryFeedback(result) {
  if (result.querySelector("[data-lumi-feedback]")) return;
  const slot = document.createElement("div");
  slot.className = "industry-feedback-slot";
  slot.dataset.lumiFeedback = "";
  slot.dataset.feedbackProject = "beginner-article";
  slot.dataset.feedbackContext = result.dataset.miniLab || "beginner-industry-demo";
  slot.dataset.feedbackTitle = "Kết quả này có hữu ích không?";
  result.appendChild(slot);

  if (window.createFeedbackCard) {
    window.createFeedbackCard(slot);
  }
}

document.querySelectorAll("[data-industry-demo]").forEach((root) => {
  root.querySelector("[data-industry-rerun]")?.addEventListener("click", () => runIndustryDemo(root));
  runIndustryDemo(root);
});

document.querySelectorAll(".industry-result").forEach((result) => {
  ensureIndustryActions(result);
  ensureIndustryFeedback(result);
});
