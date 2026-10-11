"use client";

import { AI_LINKS, AI_PROMPT } from "@/lib/content";

/**
 * "Ask any AI" buttons. They open the assistant with our prompt in a new tab. Buttons rather than
 * links: they are actions, and eleven outbound links on every page only dilute the site's link profile.
 */
export default function AiCards() {
  return (
    <div className="ai-cards">
      {AI_LINKS.map((ai) => (
        <button key={ai.name} type="button" className="ai-card" aria-label={ai.name}
          onClick={() => window.open(ai.url + encodeURIComponent(AI_PROMPT), "_blank", "noopener")}>
          <span className="ai-logo"><img src={`/assets/img/partners/${ai.logo}.svg`} alt={`${ai.name} logo`} width={26} height={26} /></span>
          <span className="ai-name" data-no-i18n=""><span className="b">{ai.name}</span><small>{ai.maker}</small></span>
        </button>
      ))}
    </div>
  );
}
