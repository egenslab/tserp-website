# Translation jobs for new site text, done by translators (people or agents) per language.
#   python3 tools/blog/i18n_job.py extract <build.log> <jobdir>   texts the i18n check reported as missing -> <jobdir>/job.json
#   python3 tools/blog/i18n_job.py validate <jobdir> <lang>        check <jobdir>/out/<lang>-*.json against job.json
#   python3 tools/blog/i18n_job.py merge <jobdir>                  add finished translations to src/i18n/<lang>.json
# Translators follow tools/blog/TRANSLATE.md.
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LANGS = ["bn", "ar", "ur", "zh", "ms", "id", "tr", "th"]

def extract(log, jobdir):
    text = open(log).read()
    block = next((b for b in re.split(r"\n(?=[a-z]{2}: \d+ text)", text) if re.match(r"[a-z]{2}: \d+ text", b)), "")
    items = []
    for line in block.splitlines()[1:]:
        m = re.match(r"\s*\[[^\]]+\] (.*)", line)
        if m and m.group(1) not in items: items.append(m.group(1))
    os.makedirs(f"{jobdir}/out", exist_ok=True)
    json.dump({f"t{i + 1:04d}": t for i, t in enumerate(items)}, open(f"{jobdir}/job.json", "w"), ensure_ascii=False, indent=1)
    print(f"{len(items)} texts, {sum(len(t.split()) for t in items)} words -> {jobdir}/job.json")

def collected(jobdir, lang):
    out, bad = {}, []
    for f in sorted(glob.glob(f"{jobdir}/out/{lang}-*.json")):
        try: out.update(json.load(open(f)))
        except Exception as e: bad.append(f"INVALID JSON {os.path.basename(f)}: {e}")
    return out, bad

def validate(jobdir, lang):
    src = json.load(open(f"{jobdir}/job.json"))
    out, probs = collected(jobdir, lang)
    nums = re.compile(r"\d[\d,.]*")
    missing = [k for k in src if k not in out]
    for k, en in src.items():
        tr = out.get(k)
        if tr is None: continue
        if not isinstance(tr, str) or not tr.strip(): probs.append(f"{k}: empty"); continue
        if len(en) > 25 and tr.strip() == en.strip() and re.search(r"[a-z]{3}", en): probs.append(f"{k}: left in English")
        if lang != "bn":
            want = [x.strip(",.") for x in nums.findall(en)]
            if want and not all(x in tr for x in want): probs.append(f"{k}: numbers changed ({want})")
    print(f"{lang}: {len(src) - len(missing)}/{len(src)} translated, {len(missing)} missing")
    if missing: print("missing ids:", missing[:10])
    for p in probs[:30]: print(" -", p)
    print("OK" if not missing and not probs else "NOT DONE")

def merge(jobdir):
    src = json.load(open(f"{jobdir}/job.json"))
    for lang in LANGS:
        out, _ = collected(jobdir, lang)
        path = f"{ROOT}/src/i18n/{lang}.json"
        d = json.load(open(path)); n = 0
        for k, en in src.items():
            if isinstance(out.get(k), str) and out[k].strip() and en not in d:
                d[en] = out[k].strip(); n += 1
        open(path, "w").write(json.dumps(d, indent=1, ensure_ascii=False) + "\n")
        print(lang, n)

if __name__ == "__main__":
    cmd, *args = sys.argv[1:]
    {"extract": extract, "validate": validate, "merge": merge}[cmd](*args)
