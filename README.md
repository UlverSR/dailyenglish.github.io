# Dagens engelske ord 🌞

A tiny website that shows one English "word of the day" for a small child, with a
big picture, the Danish translation, and a button that reads the word aloud in English.

## What's in here

```
word-of-the-day/
├── index.html            ← the website
├── words.json            ← your list of words (edit this to add words)
├── daily-word.js         ← only used by the optional daily e-mail
├── README.md             ← this file
└── .github/workflows/
    └── daily-word-email.yml   ← the optional daily e-mail
```

You only ever need to touch **words.json** to add or change words.

---

## Part A — Put it online for free (GitHub Pages)

1. Make a free account at github.com if you don't have one.
2. Create a new repository — call it something like `dagens-ord`. Make it **Public**.
3. Upload these files into it (drag them into the repo's "Add file → Upload files",
   or `git push` if you prefer). Keep the folder structure exactly as above.
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
6. Pick branch **main** and folder **/ (root)**, then **Save**.
7. Wait about a minute. Your site appears at:
   `https://YOUR-USERNAME.github.io/dagens-ord/`

Bookmark that link on your son's tablet/phone. The word changes automatically each day,
and the 🎲 button shows a new random word for extra practice.

---

## Part B — Optional: a daily e-mail reminder

This uses GitHub Actions (free) to e-mail you the day's word each morning. It's optional —
skip it if you don't want it.

It sends through Gmail, so you'll create a one-time "app password":

1. On the Google account you'll send **from**, turn on **2-Step Verification**
   (myaccount.google.com → Security).
2. Then create an **App password** (search "App passwords" in your Google account).
   Copy the 16-character password it gives you.
3. In your GitHub repo, go to **Settings → Secrets and variables → Actions → New repository secret**
   and add three secrets:
   - `MAIL_USERNAME` → your Gmail address (e.g. `you@gmail.com`)
   - `MAIL_PASSWORD` → the 16-character app password from step 2
   - `MAIL_TO` → where the reminder should go (can be the same address)
4. The workflow file is already included, so that's it. To test it right away:
   go to the **Actions** tab → **Dagens engelske ord (e-mail)** → **Run workflow**.
   You should get an e-mail within a minute.

**Timing:** it's set for 06:00 UTC (≈ 07:00 winter / 08:00 summer, Danish time). To change
it, edit the `cron` line in `.github/workflows/daily-word-email.yml`. A couple of notes GitHub
gives about scheduled jobs: they can start a few minutes late when GitHub is busy, and if the
repo has no activity for 60 days the schedule pauses (GitHub e-mails you; one click re-enables it).

---

## Adding your own words

Open **words.json** and add lines in the same pattern:

```json
{ "en": "spider", "da": "edderkop", "emoji": "🕷️" }
```

- `en` = the English word (also what the "Hør ordet" button says aloud)
- `da` = the Danish translation
- `emoji` = the picture

You can copy emoji from emojipedia.org. Keep the commas between items, and no comma after
the very last one. Both the website and the e-mail read from this one file.

---

## A note on the pictures

The pictures are emoji rather than Google Images. That's a deliberate choice: emoji always
load, never break, are always child-safe, and look great big on a screen — whereas hot-linking
Google image results is unreliable and runs into copyright/licensing issues on a public site.
If you'd really like real photos instead, that's possible but needs a free image-service API
key (e.g. Pexels or Unsplash) wired in — happy to set that up if you want it.
