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

    // ─── TODO: Buttondown API integration ───
    // Replace the console.log below with:
    //
    // const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    //   },
    //   body: JSON.stringify({ email, type: "regular" }),
    // });
    //
    // if (!res.ok) {
    //   const err = await res.json();
    //   return NextResponse.json(
    //     { success: false, message: err.detail || "订阅失败" },
    //     { status: res.status }
    //   );
    // }
    // ─── End TODO ───

    console.log(`[Subscribe] New subscription: ${email}`);

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
