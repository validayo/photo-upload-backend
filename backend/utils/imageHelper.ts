export const createThumbnail = (
  file: File,
  maxWidth = 300,
  maxHeight = 300
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context.");

      ctx.drawImage(img, 0, 0, width, height);
      const thumbnailUrl = canvas.toDataURL("image/webp", 0.8); // or "image/png"
      resolve(thumbnailUrl);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};