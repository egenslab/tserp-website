/** Floating WhatsApp chat button, bottom right on every page. */
export default function WaFloat() {
  return (
    <a href="https://wa.me/8801325277120" target="_blank" rel="noopener" className="wa-float" aria-label="Chat with TravelSuite on WhatsApp">
      <span className="wa-avatar"><img src="/assets/img/support-agent.svg" alt="" width="44" height="44" /><span className="wa-badge"><svg><use href="#i-wa" /></svg></span></span>
      {" "}
      <span className="wa-text"><b>Need help?</b><small><i className="dot" />Chat on WhatsApp</small></span>
    </a>
  );
}
