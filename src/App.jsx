import { useState } from "react";
import { useAuth } from "./app/auth/useAuth";
import { useReveal } from "./app/hooks/useReveal";
import BusinessPilotPage from "./app/routes/BusinessPilotPage";
import DashboardPage from "./app/routes/DashboardPage";
import HomePage, { ChallengeSection } from "./app/routes/HomePage";
import ProjectsPage from "./app/routes/ProjectsPage";
import LumiAssistantWidget from "./components/lumi/LumiAssistant";
import LoginModal from "./components/layout/LoginModal";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import CaptionAISection from "./features/caption-ai/CaptionAISection";
import DocScanAISection from "./features/docscan-ai/DocScanAISection";
import PdfExcelAISection from "./features/pdf-excel-ai/PdfExcelAISection";

function AppShell({ auth, loginOpen, setLoginOpen, children, withFooter = true }) {
  return (
    <>
      <SiteHeader
        profile={auth.profile}
        onOpenLogin={() => setLoginOpen(true)}
        onSignOut={auth.signOut}
      />
      {children}
      {withFooter && <SiteFooter />}
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onGoogleLogin={auth.signInWithGoogle}
        />
      )}
      <LumiAssistantWidget />
    </>
  );
}

function App() {
  useReveal();
  const auth = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const currentPath = window.location.pathname;

  if (currentPath === "/dashboard") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen} withFooter={false}>
        <DashboardPage
          profile={auth.profile}
          followedProjects={auth.followedProjects}
          membership={auth.membership}
          authLoading={auth.authLoading}
          onGoogleLogin={auth.signInWithGoogle}
          onSignOut={auth.signOut}
          onFollowProject={auth.followProject}
        />
      </AppShell>
    );
  }

  if (currentPath === "/caption-ai") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <CaptionAISection profile={auth.profile} />
        </main>
      </AppShell>
    );
  }

  if (currentPath === "/docscan-ai") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <DocScanAISection profile={auth.profile} />
        </main>
      </AppShell>
    );
  }

  if (currentPath === "/pdf-excel-ai") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <PdfExcelAISection />
        </main>
      </AppShell>
    );
  }

  if (currentPath === "/business-pilot") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <BusinessPilotPage />
        </main>
      </AppShell>
    );
  }

  if (currentPath === "/projects") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <ProjectsPage />
        </main>
      </AppShell>
    );
  }

  if (currentPath === "/challenge") {
    return (
      <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen}>
        <main>
          <ChallengeSection />
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell auth={auth} loginOpen={loginOpen} setLoginOpen={setLoginOpen} withFooter={false}>
      <main>
        <HomePage />
      </main>
    </AppShell>
  );
}

export default App;
