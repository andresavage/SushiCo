#!/usr/bin/env python3
"""Copy schedule.json into schedule.html so the page has the data inline (no fetch).
   Run after editing schedule.json:  python inline_schedule.py
"""
import json
import re

HTML_PATH = "schedule.html"
JSON_PATH = "schedule.json"

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    json_str = json.dumps(data, indent=2)

    with open(HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    pattern = r'(<script type="application/json" id="schedule-data">)(.*?)(</script>)'
    replacement = r'\g<1>' + json_str + r'\g<3>'
    new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    if new_html == html:
        print("Could not find schedule-data block in", HTML_PATH)
        return 1
    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("Updated", HTML_PATH, "with data from", JSON_PATH)
    return 0

if __name__ == "__main__":
    exit(main())
