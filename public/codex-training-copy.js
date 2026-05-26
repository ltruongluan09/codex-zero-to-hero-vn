async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Use the fallback below when clipboard permission is not available.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (error) {
    ok = false;
  }
  textarea.remove();
  return ok;
}

function selectPromptText(target) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(target);
  selection.removeAllRanges();
  selection.addRange(range);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;

    const old = button.innerText;
    const copied = await copyText(target.innerText);
    if (!copied) selectPromptText(target);
    button.innerText = copied ? "Đã copy!" : "Đã chọn prompt";
    button.title = copied ? "" : "Nếu trình duyệt chặn copy tự động, bấm Ctrl+C để copy phần prompt đã chọn.";
    setTimeout(() => {
      button.innerText = old;
      button.title = "";
    }, 1800);
  });
});
