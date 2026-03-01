# 🔖 Feishu Docx PowerWrite

Reliably write great-looking Feishu/Lark documents from OpenClaw agents.

## The Problem

Writing to Feishu Docx via API is full of hidden pitfalls:
- `create_feishu_doc` tool has a JSON parse bug and silently fails
- Single append calls over ~1500 chars return 400 errors
- Markdown tables render as scattered text fragments
- `$` symbols get parsed as LaTeX formulas
- Sub-agent token limits truncate long document writes
- Large document operations bloat session context

This skill encodes battle-tested solutions for all of these.

## Install

```bash
# Via ClawHub
clawhub install feishu-docx-powerwrite

# Or clone directly
git clone https://github.com/moltbot/feishu-docx-powerwrite.git \
  ~/.openclaw/workspace/skills/feishu-docx-powerwrite
```

## What's Inside

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent instructions — tool selection, chunked writing, table handling, escaping rules |
| `references/templates.md` | Ready-to-use templates (meeting notes, weekly update, spec/proposal) |
| `references/troubleshooting.md` | Common errors and fixes |
| `scripts/setup.sh` | Setup checklist |

## Core Rules

### 1. Tool Selection
- Use `feishu_doc(action="create")` + `feishu_doc(action="append")` — never `create_feishu_doc`
- Each append ≤ 1500 chars
- Long reports: split into 4-5 appends by section

### 2. Tables
Markdown tables (`| col |`) don't render in Feishu Docx. Use the native table API via `feishu_table.py` script.

### 3. Dollar Signs
Feishu interprets `$...$` as LaTeX. Replace `$82.78` with `82.78美元` or `USD 82.78`.

### 4. Long Documents
- Sub-agent searches, main session writes (sub-agent maxTokens truncates content)
- If sub-agent must write: chunk ≤ 3000 chars each
- Use `exec` output limiting (`tail`/`head`) to prevent context bloat

## Prerequisites

- OpenClaw with Feishu channel configured
- Feishu app with Docx/Drive scopes enabled
- `feishu_doc` tool available

## Learned From

This skill was distilled from 50+ Feishu document operations across research reports, meeting notes, and analysis documents. Every rule exists because we hit the bug in production.

## License

MIT
