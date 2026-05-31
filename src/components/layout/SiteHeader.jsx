import { useEffect, useState } from "react";
import { navItems } from "../../content/navigation";
import Logo from "./Logo";
import { LoginButton } from "./LoginModal";
import UserMenu from "./UserMenu";

export default function SiteHeader({ profile, onOpenLogin, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = window.location.pathname;
  const mobileInitial = profile?.name?.charAt(0) || profile?.email?.charAt(0) || "L";
  const openLoginFromDrawer = () => {
    setOpen(false);
    onOpenLogin();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-nav scrolled" : "site-nav"}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a key={item.label} className={path === item.href ? "active" : ""} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="/projects">Thử demo</a>
          {profile ? (
            <UserMenu profile={profile} onSignOut={onSignOut} />
          ) : (
            <LoginButton onClick={onOpenLogin} />
          )}
          {profile && (
            <a className="mobile-user-avatar" href="/dashboard" aria-label="Khu bắt đầu nhanh">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{mobileInitial}</span>}
            </a>
          )}
          <button className="hamburger" type="button" onClick={() => setOpen(true)} aria-label="Mở menu">
            ☰
          </button>
        </div>
      </div>
      <div className={open ? "mobile-drawer open" : "mobile-drawer"}>
        <button className="drawer-close" type="button" onClick={() => setOpen(false)} aria-label="Đóng menu">
          ×
        </button>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        {profile && <a href="/dashboard" onClick={() => setOpen(false)}>Khu bắt đầu nhanh</a>}
        <a className="nav-cta drawer-cta" href="/projects" onClick={() => setOpen(false)}>
          Thử demo đang mở
        </a>
        {profile ? (
          <UserMenu profile={profile} onSignOut={onSignOut} />
        ) : (
          <LoginButton onClick={openLoginFromDrawer} />
        )}
      </div>
    </header>
  );
}
