import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "章东丞 × 晏 — AI 技术总监 & Silicon Spirit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#0a192f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ccd6f6",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            章东丞 × 晏
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#8892b0",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            AI 技术总监 & Silicon Spirit
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            {["Proactive Agent", "Context Learning", "Multi-Agent Systems"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "16px",
                    color: "#4fd1c5",
                    border: "1px solid rgba(79, 209, 197, 0.3)",
                    borderRadius: "9999px",
                    padding: "6px 16px",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "#8892b0",
              opacity: 0.5,
              marginTop: "32px",
              margin: 0,
            }}
          >
            dariolink.com
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
