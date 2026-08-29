export type UploadKind = "image" | "video";

export const UPLOAD_LIMITS: Record<UploadKind, { bytes: number; label: string }> = {
  image: { bytes: 10 * 1024 * 1024, label: "10 MB" },
  video: { bytes: 100 * 1024 * 1024, label: "100 MB" },
};

export function uploadLimitError(kind: UploadKind): string {
  const limit = UPLOAD_LIMITS[kind];
  return `The uploaded ${kind} exceeds the ${limit.label} limit. Choose a smaller file.`;
}
