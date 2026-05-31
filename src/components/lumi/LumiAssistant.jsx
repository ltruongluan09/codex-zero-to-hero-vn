import { useState } from "react";

const zaloCommunityUrl = "https://zalo.me/g/sf1nek4pce9gkmvz5cos";

const quickActions = [
  { label: "📄 Đọc thử tài liệu", href: "/docscan-ai" },
  { label: "✍️ Tạo caption", href: "/caption-ai" },
  { label: "🚀 Xem project mới", href: "/projects" },
];

export default function LumiAssistant() {
  const [open, setOpen] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [assistantReply, setAssistantReply] = useState("");

  const toggleOpen = () => {
    setOpen((value) => !value);
  };

  const rememberInteraction = () => {
    setShowCommunity(true);
  };

  const helpMeStart = () => {
    setShowCommunity(true);
    setAssistantReply("Nếu bạn mới bắt đầu, hãy thử DocScan trước. Chỉ cần upload tài liệu và xem AI phân tích.");
  };

  return (
    <aside className={open ? "lumi-assistant open" : "lumi-assistant"} aria-label="Lumi Assistant dẫn đường">
      <button className="lumi-assistant-orb" type="button" onClick={toggleOpen} aria-expanded={open}>
        <span className="lumi-orb-ring" />
        <img src="/lumi-bot.png" alt="" />
        <b>Lumi</b>
      </button>
      {open && (
        <div className="lumi-assistant-panel">
          <div className="lumi-assistant-head">
            <span>Lumi đang dẫn đường</span>
            <button type="button" onClick={toggleOpen} aria-label="Ẩn Lumi Assistant">×</button>
          </div>
          <div className="lumi-assistant-intro">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <h2>Bạn mới vào Lumi Labs?</h2>
              <p>Mình sẽ dẫn bạn thử nhanh một demo AI phù hợp.</p>
            </div>
          </div>
          <div className="lumi-assistant-quick-actions">
            {quickActions.map((action) => (
              <a key={action.href} href={action.href} onClick={rememberInteraction}>
                {action.label}
              </a>
            ))}
            <button type="button" onClick={helpMeStart}>
              💬 Tôi chưa biết bắt đầu từ đâu
            </button>
          </div>
          {assistantReply && <p className="lumi-assistant-reply">{assistantReply}</p>}
          {showCommunity && (
            <div className="lumi-assistant-community">
              <span>💡</span>
              <div>
                <strong>Muốn theo dõi hành trình build AI Hub?</strong>
                <small>Lumi thường update demo mới, workflow AI thực tế và nhận góp ý trong cộng đồng.</small>
                <a href={zaloCommunityUrl} target="_blank" rel="noreferrer">
                  Theo dõi hành trình
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
