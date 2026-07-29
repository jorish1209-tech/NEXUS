import { getFeedback } from "@/lib/storage";

export function exportFeedback() {
  const blob = new Blob([JSON.stringify(getFeedback(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "nexus-feedback.json";
  anchor.click();
  URL.revokeObjectURL(url);
}
