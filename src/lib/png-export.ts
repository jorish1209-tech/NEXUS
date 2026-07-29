export async function pngFileFromSvg(svg: string, filename: string) {
  const sourceUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("图片预览生成失败，请稍后重试。"));
      nextImage.src = sourceUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1420;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("当前浏览器不支持图片导出。");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("PNG 生成失败，请稍后重试。")), "image/png");
    });
    return new File([blob], filename, { type: "image/png" });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  URL.revokeObjectURL(url);
}
