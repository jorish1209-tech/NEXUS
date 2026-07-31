import { useDemoContent } from "@/services/generation/demo-content";
import type { UserProfile } from "@/types";

function dateLabel() { return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" }).format(new Date()); }

export function TodayPage({ profile, onSettings, onFeedback }: { profile: UserProfile; onSettings: () => void; onFeedback: () => void }) {
  const content = useDemoContent(profile);
  const today = content?.today;
  if (!today) return <section className="page" aria-busy="true" />;
  return <section className="page">
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
      <div><p className="eyebrow" style={{ margin: 0 }}>你好，{profile.nickname}</p><p style={{ fontSize: 13, margin: "7px 0 0", color: "var(--muted)" }}>{dateLabel()}</p></div>
      <button aria-label="设置" onClick={onSettings} style={{ border: 0, background: "transparent", padding: 4, color: "var(--navy)" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.1A1.7 1.7 0 0 0 10.7 18.64a1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7.06 15a1.7 1.7 0 0 0-1.56-1.03h-.1v-3h.1A1.7 1.7 0 0 0 7.06 9.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56v-.1h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.1 2.1-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z" /></svg></button>
    </header>
    <main style={{ paddingTop: 60 }}>
      <p className="eyebrow">TODAY&apos;S ORBIT</p><h1 className="display" style={{ fontSize: 38, lineHeight: 1.22, margin: "14px 0 22px", maxWidth: 340 }}>{today.sentence}</h1>
      <div>{today.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
      <div className="card" style={{ marginTop: 38 }}><p className="eyebrow" style={{ marginTop: 0 }}>今日观察</p><p style={{ fontSize: 16, lineHeight: 1.85, marginBottom: 0 }}>{today.observation}</p></div>
      <div style={{ marginTop: 30, borderLeft: "1px solid var(--gold)", paddingLeft: 15 }}><p className="eyebrow" style={{ marginTop: 0 }}>今日行动</p><p style={{ lineHeight: 1.75, marginBottom: 0 }}>{today.action}</p></div>
      <div style={{ marginTop: 30 }}><p className="eyebrow">留给你的问题</p><p className="display" style={{ fontSize: 23, lineHeight: 1.45, marginBottom: 0 }}>{today.question}</p></div>
      <button className="text-button" onClick={onFeedback}>反馈今日内容</button>
    </main>
  </section>;
}
