import { brand } from "@/config/brand";
import { BrandMark } from "@/components/brand-mark";
import { Orbit } from "@/components/orbit";

export function Welcome({ onStart }: { onStart: () => void }) {
  return <section className="page" style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
    <BrandMark />
    <div style={{ marginTop:"-8vh" }}><Orbit /><p className="eyebrow" style={{ marginTop:34 }}>{brand.subtitle}</p><h1 className="display" style={{ fontSize:38, lineHeight:1.15, margin:"10px 0" }}>{brand.chineseTagline}</h1><p className="muted" style={{ fontSize:15, lineHeight:1.8, maxWidth:270, margin:0 }}>{brand.description}</p></div>
    <button className="primary" onClick={onStart}>开始探索</button>
  </section>;
}
