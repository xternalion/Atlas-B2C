import { ImageResponse } from "next/og";

export const alt = "Atlas — One Brand. Multiple Ventures.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -2 }}>
          Atlas
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#a1a1aa", marginTop: 16 }}>
          One Brand. Multiple Ventures.
        </div>
      </div>
    ),
    { ...size }
  );
}
