import { BrandMark } from "@/components/brand-mark";
import { Orbit } from "@/components/orbit";
import { chartSections } from "@/data/mock-profile";

export function ChartPage({ onFeedback }: { onFeedback: () => void }) {
  return <section className="page"><BrandMark /><div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", margin: "35px 0 30px" }}><div><p className="eyebrow">YOUR INNER MAP</p><h1 className="display" style={{ fontSize: 32, margin: 0 }}>本命星盘</h1></div><Orbit size="small" /></div><p className="muted" style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 25 }}>这不是对你的定义，而是一张帮助你观察内在运行方式的地图。</p><div style={{ display: "grid", gap: 13 }}>{chartSections.map((section, index) => <article className="card" key={section.title}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ fontSize: 17, margin: 0, fontWeight: 500 }}>{section.title}</h2><span className="eyebrow">0{index + 1}</span></div><div style={{ marginTop: 13 }}>{section.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><p style={{ fontSize: 14, lineHeight: 1.8, margin: "15px 0 0" }}>{section.text}</p></article>)}</div><button className="text-button" onClick={onFeedback}>反馈星盘内容</button></section>;
}
