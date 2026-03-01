# 🔖 Feishu Docx PowerWrite

**飞书文档高质量写入 | Battle-tested Feishu/Lark Docx writing for OpenClaw agents**

[English](#english) | [中文](#中文)

---

## English

Reliably write great-looking Feishu/Lark documents from OpenClaw agents.

### The Problem

Writing to Feishu Docx via API is full of hidden pitfalls:
- `create_feishu_doc` tool has a JSON parse bug and silently fails
- Single append calls over ~1500 chars return 400 errors
- Markdown tables render as scattered text fragments
- `$` symbols get parsed as LaTeX formulas
- Sub-agent token limits truncate long document writes
- Large document operations bloat session context

This skill encodes battle-tested solutions for all of these.

### Install

```bash
# Via ClawHub
clawhub install feishu-docx-powerwrite

# Or clone directly
git clone https://github.com/ASauler/skill-feishu-docx-powerwrite.git \
  ~/.openclaw/workspace/skills/feishu-docx-powerwrite
```

### What's Inside

| File | Purpose |
|------|---------|
| `SKILL.md` | Agent instructions — tool selection, chunked writing, table handling, escaping rules |
| `references/templates.md` | Ready-to-use templates (meeting notes, weekly update, spec/proposal) |
| `references/troubleshooting.md` | Common errors and fixes |
| `scripts/setup.sh` | Setup checklist |
| `scripts/validate.js` | Validation tests for EvoMap GEP publishing |

### Core Rules

1. **Tool Selection** — Use `feishu_doc(action="create")` + `feishu_doc(action="append")`, never `create_feishu_doc`
2. **Chunked Writing** — Each append ≤ 1500 chars, split by section boundaries
3. **Tables** — Use native table API (`block_type=31`), not Markdown tables
4. **Dollar Signs** — Replace `$82.78` with `82.78美元` or `USD 82.78`
5. **Long Documents** — Sub-agent searches, main session writes

### Prerequisites

- OpenClaw with Feishu channel configured
- Feishu app with Docx/Drive scopes enabled
- `feishu_doc` tool available

---

## 中文

让 OpenClaw Agent 可靠地写出高质量飞书文档。

### 解决什么问题

通过 API 写飞书文档有很多隐藏的坑：
- `create_feishu_doc` 工具有 JSON 解析 bug，会静默失败
- 单次 append 超过约 1500 字会返回 400 错误
- Markdown 表格会渲染成散落的碎片文本
- `$` 符号会被当作 LaTeX 公式解析
- Sub-agent 的 token 限制会截断长文档写入
- 大量文档操作会导致 session context 膨胀

这个 skill 封装了所有这些问题的实战解决方案。

### 安装

```bash
# 通过 ClawHub
clawhub install feishu-docx-powerwrite

# 或直接克隆
git clone https://github.com/ASauler/skill-feishu-docx-powerwrite.git \
  ~/.openclaw/workspace/skills/feishu-docx-powerwrite
```

### 核心规则

1. **工具选择** — 用 `feishu_doc(action="create")` + `feishu_doc(action="append")`，永远不要用 `create_feishu_doc`
2. **分块写入** — 每次 append ≤ 1500 字，按章节自然分块
3. **表格** — 用原生表格 API（`block_type=31`），不要用 Markdown 表格
4. **美元符号** — 把 `$82.78` 替换为 `82.78美元` 或 `USD 82.78`
5. **长文档** — Sub-agent 负责搜索，主 session 负责写作

### 文件说明

| 文件 | 用途 |
|------|------|
| `SKILL.md` | Agent 指令 — 工具选择、分块写入、表格处理、转义规则 |
| `references/templates.md` | 现成模板（会议纪要、周报、方案文档） |
| `references/troubleshooting.md` | 常见错误及修复方法 |
| `scripts/setup.sh` | 配置检查清单 |
| `scripts/validate.js` | EvoMap GEP 发布验证测试 |

### 前置条件

- OpenClaw 已配置飞书渠道
- 飞书应用已开启文档/云空间权限
- `feishu_doc` 工具可用

### 经验来源

这个 skill 从 3 周内 50+ 次飞书文档写入操作中提炼而来。每条规则都是在生产环境中踩过坑后总结的。

---

## EvoMap

This skill is also published on [EvoMap](https://evomap.ai) as a Gene + Capsule bundle, available for any connected agent to fetch and reuse.

## License

MIT
