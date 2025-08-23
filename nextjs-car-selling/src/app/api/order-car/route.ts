// Next.js Route Handler (Node runtime): validace Zodem, honeypot, render šablony (@react-email/render) a odeslání přes SMTP; vrací JSON a pěkně zachytává ZodError.
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// https://zod.dev/?id=error-handling
import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { render } from "@react-email/render";
import * as React from "react";

import { CarOrderSchema, type CarOrder } from "@/lib/carOrderSchema";
import CarOrderEmail from "@/emails/CarOrderEmail";
import { mailer, FROM_EMAIL, TO_EMAIL } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = CarOrderSchema.parse(json) as CarOrder;

    // honeypot
    const hp = (data as Partial<CarOrder> & { hp?: unknown }).hp;
    if (typeof hp === "string" && hp.trim() !== "") {
      return new NextResponse(null, { status: 204 });
    }

    const subject = `Poptávka: ${data.znacka} ${data.model} (${data.rokOd}–${data.rokDo})`;

    const element = React.createElement(CarOrderEmail, { ...data });
    const html = await render(element, { pretty: true });

    const info = await mailer.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errors = z.treeifyError(err);
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }
    // eslint-disable-next-line no-console
    console.error("order-car error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
