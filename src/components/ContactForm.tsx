"use client";

import { useState } from "react";
import { sendForm } from "@/lib/forms";
import { track } from "@/lib/track";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Demo request form. Validated in the browser, then emailed to the team through Web3Forms (src/lib/forms.ts). */
export default function ContactForm() {
  const [invalid, setInvalid] = useState({ name: false, email: false });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const next = { name: name === "", email: !EMAIL.test(email) };
    setInvalid(next);
    if (next.name || next.email) {
      setMsg({ ok: false, text: "Enter your name and a valid email address." });
      return;
    }
    setSending(true);
    setMsg({ ok: true, text: "Sending…" });
    const sent = await sendForm(form, `New demo request — ${String(data.get("company") ?? "").trim() || name}`);
    setSending(false);
    if (!sent) {
      setMsg({ ok: false, text: "Your message could not be sent. Please try again, or message us on WhatsApp at +880 13 2527 7120." });
      return;
    }
    setMsg({ ok: true, text: "Thanks. Our team will contact you within one business day." });
    track("lead");
    form.reset();
  };

  return (
    <form className="contact-form" id="contactForm" noValidate onSubmit={onSubmit}>
      <h2>Request a demo</h2>
      <div className="row2">
        <label htmlFor="f-name">Full name<input id="f-name" name="name" required autoComplete="name" className={invalid.name ? "invalid" : undefined} /></label>
        {" "}
        <label htmlFor="f-company">Agency name<input id="f-company" name="company" autoComplete="organization" /></label>
      </div>
      <div className="row2">
        <label htmlFor="f-email">Email<input id="f-email" type="email" name="email" required autoComplete="email" className={invalid.email ? "invalid" : undefined} /></label>
        {" "}
        <label htmlFor="f-phone">Phone / WhatsApp<input id="f-phone" name="phone" autoComplete="tel" /></label>
      </div>
      <div className="row2">
        <label htmlFor="f-plan">Interested in <select id="f-plan" name="plan"><option>Business plan</option><option>Starter plan</option><option>Growth plan</option><option>Enterprise</option><option>Hajj & Umrah module</option></select> </label>
        {" "}
        <label htmlFor="f-size">Team size <select id="f-size" name="size"><option>1–5 staff</option><option>6–20 staff</option><option>21–50 staff</option><option>50+ staff</option></select> </label>
      </div>
      <fieldset className="checks">
        <legend>Services you sell</legend>
        <label><input type="checkbox" name="svc" defaultValue="Flights" />Flights</label>
        {" "}
        <label><input type="checkbox" name="svc" defaultValue="Hotels" />Hotels</label>
        {" "}
        <label><input type="checkbox" name="svc" defaultValue="Hajj & Umrah" />Hajj & Umrah</label>
        {" "}
        <label><input type="checkbox" name="svc" defaultValue="Visa" />Visa</label>
        {" "}
        <label><input type="checkbox" name="svc" defaultValue="Tours" />Tours</label>
        {" "}
        <label><input type="checkbox" name="svc" defaultValue="Transport" />Transport</label>
      </fieldset>
      <label htmlFor="f-msg">Message<textarea id="f-msg" name="message" rows={4} placeholder="Number of agents, suppliers you use, anything else" /></label>
      {" "}
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-lime btn-block btn-lg" type="submit" disabled={sending}>Request a demo</button>
      <p className={msg ? `form-msg ${msg.ok ? "ok" : "err"}` : "form-msg"} id="formMsg" role="status">{msg?.text}</p>
    </form>
  );
}
