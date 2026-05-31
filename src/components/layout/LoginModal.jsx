import { useState } from "react";

function SocialLoginButton({ provider, onClick, disabled = false, label }) {
  const defaultLabel = provider === "facebook" ? "Đăng nhập bằng Facebook" : "Đăng nhập bằng Google";
  const letter = provider === "facebook" ? "f" : "G";

  return (
    <button className={`social-login-btn ${provider}`} type="button" onClick={onClick} disabled={disabled}>
      <span>{letter}</span>
      {label || defaultLabel}
    </button>
  );
}

export function LoginButton({ onClick }) {
  return (
    <button className="login-entry-btn" type="button" onClick={onClick}>
      <span>G</span>
      Đăng nhập
    </button>
  );
}

export default function LoginModal({ onClose, onGoogleLogin }) {
  const [loginStatus, setLoginStatus] = useState("idle");
  const [loginMessage, setLoginMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoginStatus("loading");
    setLoginMessage("Đang mở màn hình đăng nhập Google...");
    try {
      const result = await onGoogleLogin();
      if (result?.ok === false) {
        setLoginStatus("error");
        setLoginMessage(result.message);
      }
    } catch (error) {
      console.error("Google login failed", error);
      setLoginStatus("error");
      setLoginMessage("Đăng nhập chưa chạy được. Bạn thử refresh trang rồi bấm lại giúp mình nhé.");
    }
  };

  return (
    <div className="login-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="journey-widget-close" type="button" onClick={onClose} aria-label="Đóng đăng nhập">
          ×
        </button>
        <div className="login-modal-hero">
          <img src="/lumi-bot.png" alt="" />
          <span>Lumi Bot</span>
        </div>
        <span className="follow-badge">Tài khoản Lumi Labs</span>
        <h3 id="login-modal-title">Đăng nhập để lưu hành trình của bạn</h3>
        <p>
          Demo hiện đang mở miễn phí cho mọi người. Đăng nhập giúp bạn lưu project đang theo dõi
          và nhận bản cập nhật khi có demo mới.
        </p>
        <div className="login-benefits">
          <span>Lưu project yêu thích</span>
          <span>Nhận bản mới sớm</span>
          <span>Mở dashboard cá nhân</span>
        </div>
        <div className="social-login-stack">
          <SocialLoginButton
            provider="google"
            onClick={handleGoogleLogin}
            disabled={loginStatus === "loading"}
            label={loginStatus === "loading" ? "Đang mở Google..." : undefined}
          />
        </div>
        {loginMessage && (
          <p className={loginStatus === "error" ? "login-status error" : "login-status"}>
            {loginMessage}
          </p>
        )}
        <small className="login-note">Không cần mật khẩu mới. Bạn có thể đăng xuất bất cứ lúc nào.</small>
      </div>
    </div>
  );
}
