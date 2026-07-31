import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { brand } from "@/config/brand";
import { generateShareCard } from "@/services/generation";
import { downloadFile, pngFileFromSvg } from "@/lib/png-export";
import type { UserProfile } from "@/types";

function makeSvg(card: ReturnType<typeof generateShareCard>[number]) {
  const escape = (text: string) => text.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" }[character] || character));
  const lines = card.text.match(/.{1,14}/g) || [card.text];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1420" viewBox="0 0 1080 1420"><rect width="1080" height="1420" fill="#25344b"/><ellipse cx="910" cy="460" rx="430" ry="150" fill="none" stroke="#ffffff" stroke-opacity=".27" stroke-width="2" transform="rotate(-28 910 460)"/><ellipse cx="860" cy="500" rx="270" ry="270" fill="none" stroke="#ffffff" stroke-opacity=".2" stroke-width="2"/><text x="80" y="105" font-family="Arial,sans-serif" font-size="25" fill="#f9f5ed" letter-spacing="8">${escape(brand.name)}</text><text x="80" y="166" font-family="Arial,sans-serif" font-size="18" fill="#d6d2c8" letter-spacing="5">${escape(card.eyebrow)}</text>${lines.map((line, index) => `<text x="80" y="${470 + index * 90}" font-family="serif" font-size="64" fill="#f9f5ed">${escape(line)}</text>`).join("")}<line x1="80" y1="1240" x2="1000" y2="1240" stroke="#ffffff" stroke-opacity=".3"/><text x="80" y="1305" font-family="Arial,sans-serif" font-size="22" fill="#d6d2c8" letter-spacing="4">${escape(brand.subtitle.toUpperCase())}</text></svg>`;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; }
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  if (!copied) throw new Error("当前浏览器无法复制文字，请手动长按复制。");
}

export function SharePage({ profile, onFeedback }: { profile: UserProfile; onFeedback: () => void }) {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("");
  const cards = generateShareCard(profile);
  const card = cards[selected];
  const saveImage = async () => {
    try {
      setMessage("正在生成高清 PNG…");
      const file = await pngFileFromSvg(makeSvg(card), `${brand.name.toLowerCase()}-${selected + 1}.png`);
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: brand.name, text: card.text });
        setMessage("已打开系统分享，可选择存储图像。");
      } else {
        downloadFile(file);
        setMessage("PNG 已开始下载。");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") { setMessage("已取消分享。"); return; }
      setMessage(error instanceof Error ? error.message : "导出失败，请稍后重试。");
    }
  };
  const copy = async () => { try { await copyText(card.text); setMessage("文字已复制。"); } catch (error) { setMessage(error instanceof Error ? error.message : "复制失败，请手动复制。"); } };
  return <section className="page">
    <BrandMark /><p className="eyebrow" style={{ marginTop: 38 }}>SAVE A MOMENT</p><h1 className="display" style={{ fontSize: 32, margin: "8px 0 22px" }}>分享你的观察</h1>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 5 }}>{cards.map((item, index) => <button key={item.name} className={index === selected ? "primary" : "secondary"} style={{ minHeight: 39, borderRadius: 20, whiteSpace: "nowrap", fontSize: 13 }} onClick={() => { setSelected(index); setMessage(""); }}>{item.name}</button>)}</div>
    <div className="share-card" style={{ margin: "25px 0" }}><BrandMark light /><p style={{ fontSize: 11, letterSpacing: ".12em", opacity: .75, marginTop: 36 }}>{card.eyebrow}</p><p className="display" style={{ fontSize: selected === 2 ? 26 : 34, lineHeight: 1.42, maxWidth: "92%", zIndex: 1, marginTop: "auto", marginBottom: 95 }}>{card.text}</p><div style={{ position: "absolute", bottom: 24, left: 25, fontSize: 11, letterSpacing: ".16em", opacity: .8 }}>{brand.subtitle}</div></div>
    <button className="primary" style={{ width: "100%" }} onClick={saveImage}>保存 / 分享 PNG</button><button className="secondary" style={{ width: "100%", marginTop: 10 }} onClick={copy}>复制文字</button>
    <p className="muted" aria-live="polite" style={{ fontSize: 12, lineHeight: 1.6, textAlign: "center", minHeight: 20 }}>{message || "将生成高分辨率 PNG；支持时会打开系统分享。"}</p><button className="text-button" onClick={onFeedback}>反馈分享页</button>
  </section>;
}
