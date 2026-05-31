import { useState } from "react";

export default function UserMenu({ profile, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const initial = profile?.name?.charAt(0) || profile?.email?.charAt(0) || "L";

  const handleSignOut = async () => {
    setSigningOut(true);
    setOpen(false);
    try {
      await onSignOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="user-menu">
      <button
        className="user-menu-trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {profile?.avatar ? (
          <img src={profile.avatar} alt="" />
        ) : (
          <span className="user-fallback">{initial}</span>
        )}
        <span>
          <strong>{profile?.name || "Bạn mới"}</strong>
          <small>{profile?.email}</small>
        </span>
        <span className="user-menu-chevron">⌄</span>
      </button>
      {open && (
        <div className="user-menu-popover">
          <div className="user-menu-card">
            {profile?.avatar ? <img src={profile.avatar} alt="" /> : <span className="user-fallback">{initial}</span>}
            <div>
              <strong>{profile?.name || "Bạn mới"}</strong>
              <small>{profile?.email}</small>
            </div>
          </div>
          <a href="/dashboard">Khu bắt đầu nhanh</a>
          <button type="button" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      )}
    </div>
  );
}
