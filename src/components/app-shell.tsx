"use client";

import { useCallback, useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { ChartPage } from "@/components/chart-page";
import { Generating } from "@/components/generating";
import { Onboarding } from "@/components/onboarding";
import { SettingsPage } from "@/components/settings-page";
import { SharePage } from "@/components/share-page";
import { TodayPage } from "@/components/today-page";
import { Welcome } from "@/components/welcome";
import { getProfile, saveProfile } from "@/lib/storage";
import type { UserProfile } from "@/types";

export type Screen = "today" | "chart" | "share" | "settings";
type Flow = "loading" | "welcome" | "onboarding" | "generating" | "app";

export function AppShell() {
  const [flow, setFlow] = useState<Flow>("loading");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [screen, setScreen] = useState<Screen>("today");
  useEffect(() => {
    const saved = getProfile();
    const timer = window.setTimeout(() => {
      if (saved) setProfile(saved);
      setFlow(saved ? "app" : "welcome");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  const complete = useCallback((nextProfile: UserProfile) => { saveProfile(nextProfile); setProfile(nextProfile); setFlow("generating"); }, []);
  const openApp = useCallback(() => setFlow("app"), []);
  if (flow === "loading") return <main className="phone" />;
  if (flow === "welcome") return <main className="phone"><Welcome onStart={() => setFlow("onboarding")} /></main>;
  if (flow === "onboarding") return <main className="phone"><Onboarding onComplete={complete} /></main>;
  if (flow === "generating") return <main className="phone"><Generating onDone={openApp} /></main>;
  if (!profile) return null;
  return <main className="phone">{screen === "today" && <TodayPage profile={profile} onSettings={() => setScreen("settings")} />}{screen === "chart" && <ChartPage />}{screen === "share" && <SharePage />}{screen === "settings" && <SettingsPage profile={profile} onBack={() => setScreen("today")} />}{screen !== "settings" && <BottomNav screen={screen} setScreen={setScreen} />}</main>;
}
