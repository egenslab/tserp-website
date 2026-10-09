"use client";

import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demo request form. Validation runs in the browser only: connect it to your backend or a form
 * service in onSubmit (for example POST the FormData to your API) before going live.
 */
export default function ContactForm() {
  const [invalid, setInvalid] = useState({ name: false, email: false });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    setMsg({ ok: true, text: "Thanks. Our team will contact you within one business day." });
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
      <button className="btn btn-lime btn-block btn-lg" type="submit">Request a demo</button>
      <p className={msg ? `form-msg ${msg.ok ? "ok" : "err"}` : "form-msg"} id="formMsg" role="status">{msg?.text}</p>
    </form>
  );
}
