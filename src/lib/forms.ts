/** Web3Forms access key: submissions are emailed to info@travelsuiteerp.com. Safe to publish. */
const WEB3FORMS_KEY = "d6e88871-d3e6-4799-8947-c8de699e0c32";

/**
 * Send a form to Web3Forms. Repeated fields (checkboxes) are joined with commas.
 * Returns true when the email was accepted. The hidden "botcheck" field stays empty for people;
 * a filled one marks the submission as spam.
 */
export async function sendForm(form: HTMLFormElement, subject: string): Promise<boolean> {
  const data = new FormData(form);
  const body: Record<string, string> = {};
  for (const key of new Set(data.keys())) body[key] = data.getAll(key).map(String).join(", ");
  body.access_key = WEB3FORMS_KEY;
  body.subject = subject;
  body.from_name = "TravelSuite ERP website";
  if (body.email) body.replyto = body.email;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    return res.ok && json?.success === true;
  } catch {
    return false;
  }
}
