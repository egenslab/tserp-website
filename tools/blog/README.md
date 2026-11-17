# Blog tools

How a new post is made (all steps run from the repository root):

1. **Write**: the writer follows `BRIEF.md` and produces one post JSON; `python3 tools/blog/check.py <post.json>`
   must print OK.
2. **Artwork**: put the cover text and the post's `image_specs` in an art JSON (format at the top of `art.py`) and run
   `PW_NODE_PATH=<node_modules with playwright> python3 tools/blog/art.py <art.json> --preview`. It writes
   `public/assets/img/blog/<slug>-guide.jpg` and one JPG per in-article image (1600x900).
3. **Publish**: drop `keywords` and `image_specs`, insert the post at the top of `src/content/posts.json`, and add
   its date to `ISO_DATES` in `src/lib/content.ts`.
4. **Translate**: `npm run build > build.log`, then `python3 tools/blog/i18n_job.py extract build.log <jobdir>`.
   One translator per language follows `TRANSLATE.md`; `i18n_job.py merge <jobdir>` adds the results. Rebuild until
   the check prints "every visible text is translated in all languages."

`fonts/` holds Poppins (SIL Open Font License, see `fonts/OFL.txt`) so the artwork renders the same everywhere.
