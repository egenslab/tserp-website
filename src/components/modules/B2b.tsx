import { Icon } from "../ui";

/* B2B & B2C Booking: agent sales channel + customer accounts, one booking list. */

const BOOKINGS = [
  { ref: "HU-0101", svc: "Hajj & Umrah", cust: "Customer 01", src: "Agent", who: "Sky Travels", ic: "i-kaaba" },
  { ref: "HT-0102", svc: "Hotel", cust: "Customer 02", src: "Website", who: "Customer account", ic: "i-bed" },
  { ref: "VB-0103", svc: "Visa", cust: "Customer 03", src: "Agent", who: "Blue Dune Tours", ic: "i-passport" },
  { ref: "TR-0104", svc: "Tour", cust: "Customer 04", src: "Website", who: "Guest checkout", ic: "i-map" },
];

export function B2bTop1() {
  return (
    <section className="section alt bb-channels">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Two channels, one desk</span>
          <h2>Agent sales and customer bookings land in the same list</h2>
          <p>B2B sales come through your agents. B2C sales come from customers on your website. Both become ordinary bookings, so operations and accounts never work from two systems.</p>
        </div>

        <div className="bb-merge">
          <div className="bb-lane bb-lane-b2b">
            <div className="bb-lane-tag"><Icon name="i-users" /> B2B · Agent channel</div>
            <div className="bb-agent">
              <span className="bb-av">ST</span>
              <div>
                <p className="bb-agent-name"><span className="b">Sky Travels</span></p>
                <p className="bb-agent-meta">AGN-0001 · Agency · Commission: module default</p>
              </div>
            </div>
            <ul className="bb-lane-list">
              <li><Icon name="i-check" /> Agent profile with type, contact and status</li>
              <li><Icon name="i-check" /> Agent selected on the booking by your team</li>
              <li><Icon name="i-check" /> Sale and commission recorded per booking</li>
            </ul>
            <div className="bb-svc">
              <span><Icon name="i-bed" /> Hotel</span><span><Icon name="i-map" /> Tour</span>
              <span><Icon name="i-passport" /> Visa</span><span><Icon name="i-kaaba" /> Hajj &amp; Umrah</span>
            </div>
          </div>

          <div className="bb-hub">
            <div className="bb-hub-head">
              <span className="bb-hub-ic"><Icon name="i-layers" /></span>
              <div><h3>All bookings</h3><p>Every module, every source</p></div>
            </div>
            <ul className="bb-rows">
              {BOOKINGS.map((b) => (
                <li key={b.ref}>
                  <span className="bb-row-ic"><Icon name={b.ic} /></span>
                  <span className="bb-row-main"><span className="b">{b.ref}</span><small>{b.svc} · {b.cust}</small></span>
                  <span className={b.src === "Agent" ? "bb-src bb-src-a" : "bb-src bb-src-w"}>{b.src}</span>
                  <span className="bb-row-who">{b.who}</span>
                </li>
              ))}
            </ul>
            <p className="bb-note">Example data.</p>
          </div>

          <div className="bb-lane bb-lane-b2c">
            <div className="bb-lane-tag"><Icon name="i-globe" /> B2C · Customer site</div>
            <div className="bb-phone" aria-hidden="true">
              <div className="bb-phone-bar"><span /></div>
              <p className="bb-phone-t">Sign in to your account</p>
              <span className="bb-field">Email or phone</span>
              <span className="bb-field">Password</span>
              <span className="bb-btn">Sign in</span>
              <span className="bb-or">or</span>
              <span className="bb-btn bb-btn-ghost">Continue as guest</span>
            </div>
            <ul className="bb-lane-list">
              <li><Icon name="i-check" /> Customer portal accounts</li>
              <li><Icon name="i-check" /> Optional guest checkout</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const LANES = [
  {
    key: "pending", title: "Pending", sub: "Booking not completed yet",
    items: [["Hajj & Umrah", "Customer 05", "$5,000", "$250"], ["Visa", "Customer 06", "$400", "$20"]],
  },
  {
    key: "avail", title: "Available for payout", sub: "Booking completed",
    items: [["Tour", "Customer 07", "$1,200", "$60"], ["Hotel", "Customer 08", "$800", "$40"]],
  },
  {
    key: "paid", title: "Paid", sub: "Payout recorded",
    items: [["Visa", "Customer 09", "$1,000", "$50"]],
  },
];

export function B2bTop2() {
  return (
    <section className="section bb-comm">
      <div className="container">
        <div className="bb-comm-grid">
          <div className="bb-comm-intro">
            <span className="eyebrow">Agent commission</span>
            <h2>Commission that follows the booking, then waits for payout</h2>
            <p>Set one default rule for all agents and override it for any agent. Commission is earned on each booking and becomes available for payout only when the booking reaches the stage you choose.</p>

            <div className="bb-set">
              <div className="bb-set-head"><Icon name="i-percent" /> <span className="b">Agent settings</span></div>
              <p className="bb-set-l">Commission type</p>
              <div className="bb-seg"><span className="on">Percentage</span><span>Fixed per booking</span></div>
              <p className="bb-set-l">Commission (%)</p>
              <span className="bb-input">5</span>
              <p className="bb-set-l">Commission becomes available</p>
              <label className="bb-radio on"><span className="bb-dot" /> When booking is completed <em>Safer</em></label>
              <label className="bb-radio"><span className="bb-dot" /> When booking is confirmed</label>
              <p className="bb-set-foot"><Icon name="i-shield" /> An agent-level override takes priority over this default.</p>
            </div>
          </div>

          <div className="bb-flow">
            <div className="bb-lanes">
              {LANES.map((l, i) => (
                <div key={l.key} className={`bb-col bb-col-${l.key}`}>
                  <div className="bb-col-head">
                    <span className="bb-col-n">{i + 1}</span>
                    <div><h3>{l.title}</h3><p>{l.sub}</p></div>
                  </div>
                  {l.items.map(([svc, cust, sale, com]) => (
                    <div key={cust} className="bb-tok">
                      <span className="bb-tok-svc">{svc}</span>
                      <span className="bb-tok-c">{cust} · sale {sale}</span>
                      <span className="bb-tok-com">{com}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bb-bal">
              <div className="bb-bal-top">
                <div><span className="bb-bal-l">Sky Travels · commission summary</span><span className="bb-bal-v">Earned $150</span></div>
                <span className="bb-pay"><Icon name="i-wallet" /> Record payout</span>
              </div>
              <div className="bb-bar" role="img" aria-label="Earned commission split into paid and available">
                <span className="bb-bar-paid" style={{ width: "33%" }}>Paid $50</span>
                <span className="bb-bar-av" style={{ width: "67%" }}>Available $100</span>
              </div>
              <p className="bb-bal-foot">Pay any amount up to the available balance. Cancelled bookings never reach it.</p>
            </div>
            <p className="bb-note">Example data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "1", title: "Sign up", rule: "Allow customer registration",
    screen: (
      <>
        <p className="bb-phone-t">Create account</p>
        <span className="bb-field">Full name</span>
        <span className="bb-field">Email</span>
        <span className="bb-field bb-field-ph"><em>+00</em> Phone</span>
        <span className="bb-btn">Create account</span>
      </>
    ),
  },
  {
    n: "2", title: "Verify", rule: "Email verification · phone OTP",
    screen: (
      <>
        <p className="bb-phone-t">Check your inbox</p>
        <span className="bb-mail"><Icon name="i-mail" /> Verification link sent</span>
        <p className="bb-phone-s">Phone saved as unverified. Verify it later by OTP from your profile.</p>
        <div className="bb-otp"><span>4</span><span>7</span><span>1</span><span>9</span></div>
      </>
    ),
  },
  {
    n: "3", title: "Activate", rule: "Administrator approval · default status",
    screen: (
      <>
        <p className="bb-phone-t">Account pending</p>
        <span className="bb-pend"><Icon name="i-clock" /> Waiting for approval</span>
        <p className="bb-phone-s">Your agency activates the account, or new accounts start as Active.</p>
        <span className="bb-ok"><Icon name="i-check" /> Active</span>
      </>
    ),
  },
];

export function B2bBottom() {
  return (
    <section className="section alt mod-after bb-portal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Customer portal</span>
          <h2>Customer accounts on your rules</h2>
          <p>Choose how travellers join your B2C site: open sign-up, verified email and phone, manual approval, or booking as a guest without an account.</p>
        </div>

        <ol className="bb-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="bb-step">
              <div className="bb-phone" aria-hidden="true">
                <div className="bb-phone-bar"><span /></div>
                {s.screen}
              </div>
              <div className="bb-step-cap">
                <span className="bb-step-n">{s.n}</span>
                <div><h3>{s.title}</h3><p>{s.rule}</p></div>
              </div>
            </li>
          ))}
        </ol>

        <div className="bb-guest">
          <span className="bb-guest-ic"><Icon name="i-right" /></span>
          <div>
            <h3>Guest checkout skips all three</h3>
            <p>Turn on <span className="b">Allow guest checkout and booking</span> and public booking flows continue without a customer account.</p>
          </div>
          <div className="bb-guest-chips">
            <span>Login methods</span><span>Social login</span><span>Password &amp; security</span><span>Allowed phone countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
