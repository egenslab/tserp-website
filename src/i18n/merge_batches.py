#!/usr/bin/env python3
"""Merge translation batches into src/i18n/<lang>.json.

Each file in src/i18n/batches/ maps a key id (see _keys.json) to a list of translations in
the order of LANGS below. Run this, then build.py.
"""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
LANGS = ["ar", "ur", "zh", "ms", "id", "tr", "th"]

merged = {lang: {} for lang in LANGS}
for batch in sorted((HERE / "batches").glob("*.json")):
    for key, values in json.loads(batch.read_text(encoding="utf-8")).items():
        for lang, value in zip(LANGS, values):
            if value:
                merged[lang][key] = value
for lang, data in merged.items():
    (HERE / f"{lang}.json").write_text(json.dumps(data, ensure_ascii=False, indent=1, sort_keys=True), encoding="utf-8")
    print(lang, len(data))
