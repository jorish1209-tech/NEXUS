import { brand } from "@/config/brand";
export function BrandMark({ light = false }: { light?: boolean }) {
  const index = brand.highlightedCharacterIndex;
  const highlight = brand.name[index];

  return <div className="brand" style={light ? { color: "#f9f5ed" } : undefined}>
    {highlight ? <>{brand.name.slice(0, index)}<span className="brand-x">{highlight}</span>{brand.name.slice(index + 1)}</> : brand.name}
  </div>;
}
