import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "请输入有效的邮箱地址。" },
        { status: 400 }
      );
    }

    // Buttondown API integration
    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error("[Subscribe] BUTTONDOWN_API_KEY not configured");
      return NextResponse.json(
        { success: false, message: "订阅服务暂时不可用。" },
        { status: 503 }
      );
    }

    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({ email_address: email, type: "regular" }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // 409 = already subscribed
      if (res.status === 409) {
        return NextResponse.json({
          success: true,
          message: "你已经订阅过了！",
        });
      }
      console.error(`[Subscribe] Buttondown error: ${res.status}`, err);
      return NextResponse.json(
        { success: false, message: "订阅失败，请稍后重试。" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "订阅成功！感谢关注。",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "服务器错误，请稍后重试。" },
      { status: 500 }
    );
  }
}
