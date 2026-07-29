import { useState } from "react";
import type { UserProfile } from "@/types";

const localToday = () => {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const steps = [
  { label: "怎么称呼你？", hint: "这是属于你的内在观察。", key: "nickname", type: "text", placeholder: "输入昵称" },
  { label: "你出生在哪一天？", hint: "我们用它建立你的观察起点。", key: "birthDate", type: "date", placeholder: "" },
  { label: "大约在什么时间？", hint: "不知道准确时间也没关系。", key: "birthTime", type: "time", placeholder: "" },
  { label: "你的出生城市是？", hint: "填写城市即可，无需详细地址。", key: "birthCity", type: "text", placeholder: "例如：上海" },
] as const;

export function Onboarding({ initialProfile, onComplete }: { initialProfile?: UserProfile; onComplete: (profile: UserProfile) => void }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(initialProfile ?? { nickname: "", birthDate: "", birthTime: "", birthTimeUnknown: false, birthCity: "" });
  const current = steps[step];
  const value = profile[current.key];
  const isTimeStep = current.key === "birthTime";
  const canContinue = isTimeStep ? profile.birthTimeUnknown || Boolean(value.trim()) : Boolean(value.trim());

  const update = (key: keyof UserProfile, nextValue: string | boolean) => setProfile((previous) => ({ ...previous, [key]: nextValue }));
  const next = () => {
    if (!canContinue) return;
    if (step === steps.length - 1) {
      onComplete({ ...profile, nickname: profile.nickname.trim(), birthCity: profile.birthCity.trim() });
    } else {
      setStep((previous) => previous + 1);
    }
  };

  return <section className="page">
    <div className="progress" style={{ margin: "-22px -22px 50px" }}><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
    <p className="eyebrow">0{step + 1} / 0{steps.length}</p>
    <h1 className="display" style={{ fontSize: 32, margin: "14px 0 10px" }}>{current.label}</h1>
    <p className="muted" style={{ marginBottom: 35 }}>{current.hint}</p>
    <input
      className="field"
      type={current.type}
      value={value}
      placeholder={current.placeholder}
      autoFocus
      disabled={isTimeStep && profile.birthTimeUnknown}
      max={current.key === "birthDate" ? localToday() : undefined}
      onChange={(event) => update(current.key, event.target.value)}
      onKeyDown={(event) => event.key === "Enter" && next()}
    />
    {isTimeStep && <label className="check-row"><input type="checkbox" checked={profile.birthTimeUnknown} onChange={(event) => update("birthTimeUnknown", event.target.checked)} /> <span>我不知道出生时间</span></label>}
    {step > 0 && <button className="secondary" style={{ marginTop: 25 }} onClick={() => setStep((previous) => previous - 1)}>上一步</button>}
    <div className="bottom-action"><button className="primary" style={{ width: "100%", opacity: canContinue ? 1 : .45 }} onClick={next}>{step === steps.length - 1 ? "生成我的观察" : "继续"}</button></div>
  </section>;
}
