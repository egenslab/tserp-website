"use client";

import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Affiliate application form. Like the demo form, validation runs in the browser only:
 * connect onSubmit to your backend or a form service before going live.
 */
export default function AffiliateForm() {
  const [invalid, setInvalid] = useState({ name: false, email: false });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = { name: String(data.get("name") ?? "").trim() === "", email: !EMAIL.test(String(data.get("email") ?? "").trim()) };
    setInvalid(next);
    if (next.name || next.email) {
      setMsg({ ok: false, text: "Enter your name and a valid email address." });
      return;
    }
    setMsg({ ok: true, text: "Thanks for applying. We'll review your application and reply within two business days." });
    form.reset();
  };

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <h2>Apply to become an affiliate</h2>
      <div className="row2">
        <label htmlFor="a-name">Full name<input id="a-name" name="name" required autoComplete="name" className={invalid.name ? "invalid" : undefined} /></label>
        {" "}
        <label htmlFor="a-email">Email<input id="a-email" type="email" name="email" required autoComplete="email" className={invalid.email ? "invalid" : undefined} /></label>
      </div>
      <div className="row2">
        <label htmlFor="a-phone">Phone / WhatsApp<input id="a-phone" name="phone" autoComplete="tel" /></label>
        {" "}
        <label htmlFor="a-country">Country<input id="a-country" name="country" autoComplete="country-name" /></label>
      </div>
      <div className="row2">
        <label htmlFor="a-site">Website or channel<input id="a-site" name="website" type="url" placeholder="https://" /></label>
        {" "}
        <label htmlFor="a-type">I am a <select id="a-type" name="type"><option>Blogger or content creator</option><option>YouTuber or influencer</option><option>Web or IT agency</option><option>Travel consultant or trainer</option><option>TravelSuite ERP customer</option><option>Other</option></select> </label>
      </div>
      <label htmlFor="a-msg">How will you promote TravelSuite ERP?<textarea id="a-msg" name="message" rows={4} placeholder="Your audience, the countries you reach, how many agencies you know" /></label>
      {" "}
      <button className="btn btn-lime btn-block btn-lg" type="submit">Submit application</button>
      <p className={msg ? `form-msg ${msg.ok ? "ok" : "err"}` : "form-msg"} role="status">{msg?.text}</p>
    </form>
  );
}
