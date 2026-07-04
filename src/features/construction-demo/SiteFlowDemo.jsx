import { createContext, useContext, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { siteLogs as initialSiteLogs } from "./data/mockData";
import DashboardLayout from "./layout/DashboardLayout";
import MobileLayout from "./layout/MobileLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectListPage from "./pages/ProjectListPage";
import SiteLogFormPage from "./pages/SiteLogFormPage";
import SiteLogListPage from "./pages/SiteLogListPage";

const SiteFlowContext = createContext(null);

export function useSiteFlow() {
  const context = useContext(SiteFlowContext);
  if (!context) throw new Error("useSiteFlow must be used inside SiteFlowProvider");
  return context;
}

function SiteFlowProvider({ children }) {
  const [logs, setLogs] = useState(initialSiteLogs);
  const value = useMemo(
    () => ({
      logs,
      addLog(log) {
        setLogs((current) => [log, ...current]);
      },
    }),
    [logs]
  );

  return <SiteFlowContext.Provider value={value}>{children}</SiteFlowContext.Provider>;
}

export default function SiteFlowDemo() {
  return (
    <BrowserRouter basename="/construction-demo">
      <SiteFlowProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectListPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="logs" element={<SiteLogListPage />} />
          </Route>
          <Route element={<MobileLayout />}>
            <Route path="logs/new" element={<SiteLogFormPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteFlowProvider>
    </BrowserRouter>
  );
}
