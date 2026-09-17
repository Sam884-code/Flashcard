# Բառաքարտեր — English ⇄ Armenian Flashcards

A static web app for learning English–Armenian vocabulary: see the Armenian word, flip for the English translation, hear it pronounced, and mark words as **Գիտեմ** (Got it) or **Կրկնել** (Need review).

**Live:** https://flashcard-sam-s6.vercel.app/

## How data is stored

Everything is saved in the browser's `localStorage` under the key `barakarter.words.v2`.

- Each person, device and browser has its **own independent list**. Nothing is sent to a server.
- A first-time visitor starts with the default starter list (`DEFAULT_WORDS` in `app.js`). To start new users with an empty list, set `DEFAULT_WORDS = []`.
- Words, edits, and Got it / Review progress survive page refreshes.
- "Վերականգնել սկզբնական ցանկը" (in the My words tab) restores the starter list.
- Clearing site data or using a private window starts fresh.

## Files

```
index.html   markup
styles.css   styles (light + dark theme)
app.js       app logic: storage, study deck, word list, text-to-speech
vercel.json  static hosting config
```

No build step and no dependencies.

## Run locally

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel

**Option A — CLI**
```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production URL
```
When asked, choose "Other" as the framework, leave the build command empty and the output directory as `.`.

**Option B — GitHub**
1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project**, import the repository.
3. Framework preset: **Other**. No build command. Deploy.

**Option C — Drag and drop**
Open https://vercel.com/new and drop this folder.

## Keyboard shortcuts (study tab)

- `←` / `→` previous / next card
- `Space` / `Enter` flip the focused card
- `S` pronounce the English word
