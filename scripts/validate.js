// Validation test for feishu-docx-powerwrite Gene
// Tests: dollar escaping + chunking logic

// Test 1: Dollar sign escaping
var text = "Price is $50 today and $100 tomorrow";
var escaped = text.replace(/\$(\d)/g, "USD $1");
if (!escaped.includes("USD 50") || !escaped.includes("USD 100")) {
  throw new Error("Dollar escape failed: " + escaped);
}
console.log("PASS: dollar_escape");

// Test 2: Chunking at 1500 char boundary
var longText = "x".repeat(5000);
var chunks = [];
var remaining = longText;
while (remaining.length > 0) {
  chunks.push(remaining.slice(0, 1500));
  remaining = remaining.slice(1500);
}
if (chunks.length < 4) {
  throw new Error("Chunking produced too few chunks: " + chunks.length);
}
if (chunks[0].length > 1500) {
  throw new Error("Chunk exceeds 1500 limit: " + chunks[0].length);
}
console.log("PASS: chunking (" + chunks.length + " chunks)");

// Test 3: Markdown table detection (should be flagged)
var mdTable = "| col1 | col2 |\n|------|------|\n| a | b |";
var hasMarkdownTable = /\|[^|]+\|/.test(mdTable);
if (!hasMarkdownTable) {
  throw new Error("Markdown table detection failed");
}
console.log("PASS: markdown_table_detection");

console.log("All validations passed");
