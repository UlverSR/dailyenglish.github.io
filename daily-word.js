// Picks today's word from words.json and prepares the e-mail.
// Used only by the optional daily-email workflow — the website does not need it.
const fs = require("fs");

const words = JSON.parse(fs.readFileSync("words.json", "utf8"));

const now = new Date();
const dayNumber = Math.floor(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000
);
const word = words[((dayNumber % words.length) + words.length) % words.length];

const subject = `Dagens engelske ord: ${word.en} ${word.emoji}`;

const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; text-align:center; padding:28px; background:#E7F8FF; border-radius:20px;">
    <div style="font-size:84px; line-height:1;">${word.emoji}</div>
    <div style="font-size:42px; font-weight:bold; color:#FF6B6B; margin-top:8px;">${word.en}</div>
    <div style="width:60px; height:5px; background:#FFD23F; border-radius:99px; margin:14px auto;"></div>
    <div style="font-size:24px; font-weight:bold; color:#2E3A4E;">🇩🇰 ${word.da}</div>
    <p style="color:#7a869a; margin-top:26px; font-size:15px;">God fornøjelse med dagens ord! 🌞</p>
  </div>
`;

// In GitHub Actions, hand the subject and body to the next step.
if (process.env.GITHUB_OUTPUT) {
  const write = (name, value) => {
    const d = "EOF_" + Math.random().toString(36).slice(2);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}<<${d}\n${value}\n${d}\n`);
  };
  write("subject", subject);
  write("html", html);
}

console.log("Today's word:", word.en, "/", word.da, word.emoji);
