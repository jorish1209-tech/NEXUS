import { useState } from "react";
import { exportFeedback } from "@/lib/export-feedback";
import { saveFeedback } from "@/lib/storage";
import type { FeedbackType, UserProfile } from "@/types";

const types: FeedbackType[] = ["Bug", "内容不准确", "页面不好用", "视觉问题", "功能建议"];
const localToday = () => { const date = new Date(); return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10); };

export function SettingsPage({ profile, feedbackPage, onBack, onSaveProfile, onReset }: { profile: UserProfile; feedbackPage: string; onBack: () => void; onSaveProfile: (profile: UserProfile) => void; onReset: () => void }) {
  const [draft, setDraft] = useState(profile);
  const [type, setType] = useState<FeedbackType>("内容不准确");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const update = (key: keyof UserProfile, value: string | boolean) => setDraft((previous) => ({ ...previous, [key]: value }));
  const saveProfile = () => { if (!draft.nickname.trim() || !draft.birthDate || !draft.birthCity.trim() || (!draft.birthTime && !draft.birthTimeUnknown)) { setMessage("请完成必填资料，或选择不知道出生时间。"); return; } onSaveProfile({ ...draft, nickname: draft.nickname.trim(), birthCity: draft.birthCity.trim() }); setMessage("出生资料已更新。"); };
  const submit = () => { if (!content.trim()) { setMessage("请填写反馈内容。"); return; } saveFeedback({ id: crypto.randomUUID(), type, content: content.trim(), page: feedbackPage, contact: contact.trim() || undefined, createdAt: new Date().toISOString() }); setContent(""); setContact(""); setMessage("反馈已保存在本机，感谢你的帮助。"); };
  const reset = () => { if (window.confirm("确定清除本机档案吗？这将返回欢迎页，反馈记录不会被删除。")) onReset(); };
  return <section className="page">
    <button onClick={onBack} style={{ border: 0, background: "transparent", padding: 0, color: "var(--navy)", fontSize: 14 }}>← 返回</button><p className="eyebrow" style={{ marginTop: 38 }}>SETTINGS</p><h1 className="display" style={{ fontSize: 32, margin: "8px 0 30px" }}>设置与反馈</h1>
    <div className="card"><p className="eyebrow" style={{ marginTop: 0 }}>测试档案</p><label className="form-label">昵称<input className="field" value={draft.nickname} onChange={(event) => update("nickname", event.target.value)} /></label><label className="form-label">出生日期<input className="field" type="date" max={localToday()} value={draft.birthDate} onChange={(event) => update("birthDate", event.target.value)} /></label><label className="form-label">出生时间<input className="field" type="time" disabled={draft.birthTimeUnknown} value={draft.birthTime} onChange={(event) => update("birthTime", event.target.value)} /></label><label className="check-row"><input type="checkbox" checked={draft.birthTimeUnknown} onChange={(event) => update("birthTimeUnknown", event.target.checked)} /> <span>不知道出生时间</span></label><label className="form-label">出生城市<input className="field" value={draft.birthCity} onChange={(event) => update("birthCity", event.target.value)} /></label><button className="secondary" style={{ width: "100%", marginTop: 18 }} onClick={saveProfile}>保存出生资料</button><button className="danger-button" style={{ width: "100%", marginTop: 10 }} onClick={reset}>清除档案并重新开始</button></div>
    <div style={{ marginTop: 35 }}><p className="eyebrow">帮助我们更好地理解你</p><h2 style={{ fontSize: 20, fontWeight: 500 }}>提交反馈</h2><p className="muted" style={{ fontSize: 13 }}>当前页面：{feedbackPage}</p><label className="muted" style={{ fontSize: 13 }}>反馈类型</label><select className="feedback-select" value={type} onChange={(event) => setType(event.target.value as FeedbackType)} style={{ margin: "7px 0 18px" }}>{types.map((item) => <option key={item}>{item}</option>)}</select><label className="muted" style={{ fontSize: 13 }}>反馈内容</label><textarea className="text-area" value={content} onChange={(event) => setContent(event.target.value)} placeholder="告诉我们你的感受或遇到的问题" style={{ marginTop: 7 }} /><label className="muted" style={{ fontSize: 13, display: "block", marginTop: 18 }}>联系方式（可选）</label><input className="field" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="邮箱或其他联系方式" /><button className="primary" style={{ width: "100%", marginTop: 27 }} onClick={submit}>保存反馈</button><button className="secondary" style={{ width: "100%", marginTop: 10 }} onClick={exportFeedback}>导出反馈 JSON</button><p className="muted" aria-live="polite" style={{ fontSize: 12, lineHeight: 1.6, minHeight: 20 }}>{message}</p></div>
  </section>;
}
