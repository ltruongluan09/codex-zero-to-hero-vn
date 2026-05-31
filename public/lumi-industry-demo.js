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

document.querySelectorAll("[data-industry-demo]").forEach((root) => {
  root.querySelector("[data-industry-rerun]")?.addEventListener("click", () => runIndustryDemo(root));
  runIndustryDemo(root);
});
