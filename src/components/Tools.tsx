/** "Tools you get on every plan" section. */
export default function Tools() {
  return (
    <section className="section alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Built in</span>
          <h2>Tools you get on every plan</h2>
        </div>
        <div className="features">
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-palette" /></svg></span>
            <h4>White-label branding</h4>
            <p>Your logo, colours, domain and email templates.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-lang" /></svg></span>
            <h4>Multi-language</h4>
            <p>English, বাংলা, العربية and any language you add.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-coins" /></svg></span>
            <h4>Multi-currency</h4>
            <p>BDT, USD, SAR, AED and more with exchange rates.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-card" /></svg></span>
            <h4>Online payments</h4>
            <p>Visa, Mastercard, PayPal, Stripe, Apple Pay and more.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-lock" /></svg></span>
            <h4>Roles & permissions</h4>
            <p>Control what each staff member and branch sees.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-phone" /></svg></span>
            <h4>Mobile friendly</h4>
            <p>Works on any phone; Android & iOS apps available.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-code" /></svg></span>
            <h4>REST API</h4>
            <p>Connect partner websites, apps and in-house tools.</p>
          </div>
          <div className="feature">
            <span className="f-ico"><svg><use href="#i-building" /></svg></span>
            <h4>Multi-branch</h4>
            <p>Separate branches with consolidated reports.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
