import { useEffect, useState } from "react";
import { getUserProfile, hasSupabaseConfig, supabase } from "../../supabaseClient";

const AUTH_RETURN_PATH_KEY = "lumi_auth_return_path";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [followedProjects, setFollowedProjects] = useState([]);
  const [membership, setMembership] = useState(null);
  const [authLoading, setAuthLoading] = useState(hasSupabaseConfig);

  const getCleanAuthPath = () => {
    const url = new URL(window.location.href);
    const hadAuthHash = url.hash.includes("access_token=") || url.hash.includes("error=");
    const hadAuthCode = url.searchParams.has("code");

    ["code", "error", "error_code", "error_description"].forEach((key) => {
      url.searchParams.delete(key);
    });

    if (hadAuthHash) {
      url.hash = "";
    }

    return {
      cleanPath: `${url.pathname}${url.search}${url.hash}` || "/",
      shouldClean: hadAuthHash || hadAuthCode,
    };
  };

  const cleanAuthUrl = () => {
    const { cleanPath, shouldClean } = getCleanAuthPath();

    if (shouldClean) {
      window.history.replaceState(null, "", cleanPath);
    }

    return cleanPath;
  };

  const finishAuthRedirect = () => {
    const returnPath = localStorage.getItem(AUTH_RETURN_PATH_KEY);
    const cleanPath = cleanAuthUrl();
    localStorage.removeItem(AUTH_RETURN_PATH_KEY);

    if (returnPath && returnPath !== cleanPath) {
      window.location.replace(returnPath);
      return true;
    }

    return false;
  };

  const loadFollowedProjects = async (userId) => {
    if (!supabase || !userId) return;

    const { data } = await supabase
      .from("followed_projects")
      .select("project_slug")
      .eq("user_id", userId);

    setFollowedProjects((data || []).map((item) => item.project_slug));
  };

  const syncProfile = async (currentUser) => {
    if (!supabase || !currentUser) return;
    const nextProfile = getUserProfile(currentUser);
    const provider = currentUser.app_metadata?.provider || "oauth";

    setProfile(nextProfile);

    await supabase.from("profiles").upsert(
      {
        id: currentUser.id,
        email: nextProfile.email,
        name: nextProfile.name,
        avatar_url: nextProfile.avatar,
        provider,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    await supabase.from("subscribers").upsert(
      {
        email: nextProfile.email,
        user_id: currentUser.id,
        name: nextProfile.name,
        avatar_url: nextProfile.avatar,
        source: "auth_login",
        provider,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );
  };

  const loadMembership = async (userId) => {
    if (!supabase || !userId) return;

    const { data, error } = await supabase
      .from("memberships")
      .select("plan,status,expires_at")
      .eq("user_id", userId)
      .maybeSingle();

    setMembership(error ? { plan: "free", status: "active" } : data || { plan: "free", status: "active" });
  };

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;

    const applySession = async (nextSession) => {
      if (!active) return false;

      setSession(nextSession);
      setUser(nextSession?.user || null);

      if (nextSession?.user) {
        setProfile(getUserProfile(nextSession.user));
        await Promise.race([
          Promise.allSettled([
            syncProfile(nextSession.user),
            loadFollowedProjects(nextSession.user.id),
            loadMembership(nextSession.user.id),
          ]),
          new Promise((resolve) => setTimeout(resolve, 1800)),
        ]);

        if (finishAuthRedirect()) return false;
      } else {
        setProfile(null);
        setFollowedProjects([]);
        setMembership(null);
      }

      return true;
    };

    const initAuth = async () => {
      const url = new URL(window.location.href);

      if (url.searchParams.has("code")) {
        try {
          await supabase.auth.exchangeCodeForSession(url.searchParams.get("code"));
        } catch (error) {
          console.error("OAuth callback exchange failed", error);
        } finally {
          cleanAuthUrl();
        }
      }

      try {
        const { data } = await Promise.race([
          supabase.auth.getSession(),
          new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 1800)),
        ]);
        await applySession(data.session);
      } catch (error) {
        console.warn("Auth init did not finish cleanly", error);
      } finally {
        if (active) setAuthLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      await applySession(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider) => {
    if (!supabase) {
      return {
        ok: false,
        message:
          "Chưa cấu hình đăng nhập ở môi trường này. Nếu đang chạy local, hãy thêm Supabase URL và Publishable Key vào file .env.local rồi khởi động lại dev server.",
      };
    }

    const returnPath = `${window.location.pathname}${window.location.search}`;
    const isLuanDomain = /(^|\.)luanai\.io\.vn$/.test(window.location.hostname);
    const redirectOrigin = isLuanDomain ? "https://luanai.io.vn" : window.location.origin;
    const redirectTo = `${redirectOrigin}${window.location.pathname}`;

    localStorage.setItem(AUTH_RETURN_PATH_KEY, returnPath || "/");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("OAuth login failed", error);
      return {
        ok: false,
        message: error.message || "Chưa mở được màn hình đăng nhập Google. Bạn thử lại giúp mình nhé.",
      };
    }

    if (data?.url) {
      window.location.assign(data.url);
      return { ok: true };
    }

    return {
      ok: false,
      message: "Chưa lấy được đường dẫn đăng nhập Google. Bạn thử refresh trang rồi bấm lại nhé.",
    };
  };

  const signOut = async () => {
    const clearLocalAuth = () => {
      setSession(null);
      setUser(null);
      setProfile(null);
      setFollowedProjects([]);
      setMembership(null);
    };

    localStorage.removeItem(AUTH_RETURN_PATH_KEY);
    cleanAuthUrl();

    try {
      if (supabase) {
        await Promise.race([
          supabase.auth.signOut({ scope: "local" }),
          new Promise((resolve) => setTimeout(resolve, 1600)),
        ]);
      }
    } catch (error) {
      console.warn("Supabase sign out did not finish cleanly", error);
    } finally {
      clearLocalAuth();
    }
  };

  const signInWithGoogle = () => signInWithProvider("google");
  const signInWithFacebook = () => signInWithProvider("facebook");

  const followProject = async (projectSlug) => {
    if (!supabase || !user) {
      await signInWithGoogle();
      return;
    }

    await supabase.from("followed_projects").upsert(
      {
        user_id: user.id,
        project_slug: projectSlug,
        created_at: new Date().toISOString(),
      },
      { onConflict: "user_id,project_slug" }
    );

    setFollowedProjects((items) =>
      items.includes(projectSlug) ? items : [...items, projectSlug]
    );
  };

  return {
    session,
    user,
    profile,
    followedProjects,
    membership,
    authLoading,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    followProject,
  };
}
