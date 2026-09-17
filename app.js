/* ============================================================
   Բառաքարտեր — English ⇄ Armenian flashcards
   All data lives in this browser's localStorage, so every
   person / device / browser keeps its own independent list.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- config ---------------- */

  var STORAGE_KEY = "barakarter.words.v2"; // bumped so existing visitors get the new list

  // Starter list shown to anyone opening the app for the first time
  // (Sam's vocabulary, 113 words).
  // Set this to [] if new users should start with an empty list.
  var DEFAULT_WORDS = [
    { "en": "Heavy", "am": "Ծանր", "pos": "Ածական" },
    { "en": "dirty", "am": "Կեղտոտ", "pos": "Ածական" },
    { "en": "To seem", "am": "Թվալ", "pos": "Բայ" },
    { "en": "Seldom", "am": "Հազվադեպ" },
    { "en": "Suburb", "am": "Արվարձան" },
    { "en": "To belong", "am": "Պատկանել", "pos": "Բայ" },
    { "en": "Polite", "am": "Քաղաքավարի" },
    { "en": "Rude", "am": "Անքաղաքավարի" },
    { "en": "Throwing", "am": "Նետել" },
    { "en": "Supper", "am": "Ընթրիք" },
    { "en": "Arrange", "am": "Կազմակերպել", "context": "Ըստ շարքերի դասավորել" },
    { "en": "Passion", "am": "Ձգտում" },
    { "en": "Decade", "am": "Տասնամյակ" },
    { "en": "Enduring", "am": "Տոկուն" },
    { "en": "Pleasure", "am": "Հաճույք" },
    { "en": "Amusement", "am": "Զվարճանք" },
    { "en": "Theme", "am": "Թեմա" },
    { "en": "Through", "am": "Միջով" },
    { "en": "Legacy", "am": "Ժառանգության" },
    { "en": "According", "am": "Համաձայն" },
    { "en": "Grumbling", "am": "Փնփնթալ" },
    { "en": "Silly", "am": "Հիմար" },
    { "en": "Suppose", "am": "Ենթադրել" },
    { "en": "Competition", "am": "Մրցակցության" },
    { "en": "Patent", "am": "Արտոնագիր" },
    { "en": "Expanse", "am": "Ծախս" },
    { "en": "Lenghy", "am": "Երկարության" },
    { "en": "Illigble", "am": "Անընթեռնելի" },
    { "en": "Return", "am": "Հետ գնալ" },
    { "en": "End up", "am": "Վախճանը գրանցել" },
    { "en": "Clue", "am": "Հուշում" },
    { "en": "So that", "am": "Որպեսզի" },
    { "en": "Call in", "am": "Մուտք գործել ծրագիր" },
    { "en": "Hold auction", "am": "Աճուրդ անցկացնելու" },
    { "en": "Bin", "am": "Տարրա" },
    { "en": "Bidder", "am": "Գնորդ" },
    { "en": "To go in for sport", "am": "Սպորտով զբաղվել" },
    { "en": "Pensioner", "am": "Թոշակառու" },
    { "en": "Appear", "am": "Հայտնվել" },
    { "en": "Perhaps", "am": "Գուցե" },
    { "en": "Deal", "am": "Գործարք" },
    { "en": "However", "am": "Չնայած,անյնուամենայնիվ" },
    { "en": "District", "am": "Շրջան", "context": "Տարածաշրջան" },
    { "en": "Put off", "am": "Հետաձգել" },
    { "en": "Put down", "am": "Վայր դնել" },
    { "en": "Put away", "am": "Մի կողմ դնել" },
    { "en": "Differ", "am": "Տարբերվել" },
    { "en": "Porridge", "am": "Շիլա" },
    { "en": "Complain", "am": "Բողոքել" },
    { "en": "Properly", "am": "Պատշաճ կարպով" },
    { "en": "Arrangements", "am": "Պայմանավորվածություն", "pos": "Գոյական" },
    { "en": "Prepare", "am": "Նախապատրասվել" },
    { "en": "Suspect", "am": "Կասկած" },
    { "en": "Rarely", "am": "Հազվադեպ" },
    { "en": "Relate", "am": "Առնչվել" },
    { "en": "Norrow", "am": "Նեղ" },
    { "en": "Record", "am": "Գրանցել,ձայնագրել", "context": "Ցանկացած նկարահանում,ձայնագրում,ինչ-որ սարքով" },
    { "en": "Sample", "am": "Օրինակ,նմուշ", "context": "Բրածոի պես մի բան" },
    { "en": "Surface", "am": "Մակերես, մակերևույթ" },
    { "en": "Eruption", "am": "Ժայթքում" },
    { "en": "Gradual", "am": "Հետզհետե" },
    { "en": "Fossil", "am": "Բրածո" },
    { "en": "Backgammon", "am": "Նարդի" },
    { "en": "To beware", "am": "Զգուշանալ", "pos": "Բայ" },
    { "en": "Deceive", "am": "Խաբել", "pos": "Բայ" },
    { "en": "Omit", "am": "Բաց թողնել" },
    { "en": "Compaign", "am": "Արշավ", "pos": "Գոյական" },
    { "en": "Advertiser", "am": "Գովազդող" },
    { "en": "Claim", "am": "Պնդել,պահանջ" },
    { "en": "Against", "am": "Դեմ" },
    { "en": "Mislead", "am": "Շեղել,մոլորեցնել" },
    { "en": "Ad", "am": "Գովազդ" },
    { "en": "Pimple", "am": "Բշտիկ" },
    { "en": "Mention", "am": "Նշել" },
    { "en": "Deception", "am": "Խափեություն" },
    { "en": "Stray", "am": "Թափառող" },
    { "en": "Unfortunately", "am": "Դժբախտաբար, ցավոք" },
    { "en": "Repair", "am": "Վերանորոգում" },
    { "en": "Cure", "am": "Բուժել" },
    { "en": "Roaming", "am": "Շրջել,թափռել" },
    { "en": "Plump", "am": "Գեր,փարթամ" },
    { "en": "Fascinat", "am": "Հիացնել" },
    { "en": "Domesticat", "am": "Ընտելացնել" },
    { "en": "Require", "am": "Պահանջել" },
    { "en": "Uncharted", "am": "Չքարտեզագրված" },
    { "en": "To appeal", "am": "Դուր գալ" },
    { "en": "Daring", "am": "Համարձակություն" },
    { "en": "Evoke", "am": "Վեր հանել,առաջացնել" },
    { "en": "Charming", "am": "Հմայիչ" },
    { "en": "Soul", "am": "Հոգի" },
    { "en": "Suffer", "am": "Տառապել" },
    { "en": "Exert", "am": "Գործադրել" },
    { "en": "Consider", "am": "Հաշվի առնել,հարմարվել" },
    { "en": "Prominent", "am": "Աչքի ընկնող" },
    { "en": "Occasional", "am": "Ժամանակավոր", "context": "Առիթից առիթ" },
    { "en": "Exhibition", "am": "Ցուցահանդես, ցուցադրել" },
    { "en": "Though", "am": "Թեև, չնայած" },
    { "en": "Burnt down", "am": "Հիմնահատակ այրվել" },
    { "en": "Rape", "am": "Բռնաբարել", "pos": "Բայ" },
    { "en": "Form", "am": "Ձևափոխել, ձևաչափ" },
    { "en": "Keep up", "am": "Պահպանել տեպը" },
    { "en": "Preserve", "am": "Պահպանել" },
    { "en": "Wise", "am": "Իմաստուն" },
    { "en": "Distinguished", "am": "Տարբերակված", "pos": "Բայ" },
    { "en": "To be eager to do", "am": "Շատ ցանկանալ գնել" },
    { "en": "Cradle", "am": "Բնօրրան" },
    { "en": "Steam", "am": "Գոլորշի" },
    { "en": "Customery", "am": "Սովորական" },
    { "en": "Goods", "am": "Ապրանքներ" },
    { "en": "A great deal of", "am": "Շատ", "context": "Much . Synonym" },
    { "en": "To lay the table", "am": "Գցել" },
    { "en": "To do a favour", "am": "Լավություն անել" },
    { "en": "To cach a cold", "am": "Մրսել" }
  ];

  var STATUS_LABEL = { new: "Նոր", review: "Կրկնվող", got_it: "Գիտեմ" };
  var VALID_STATUS = { new: true, review: true, got_it: true };

  /* ---------------- storage ---------------- */

  var Store = (function () {
    var available = (function () {
      try {
        var probe = "__barakarter_probe__";
        window.localStorage.setItem(probe, "1");
        window.localStorage.removeItem(probe);
        return true;
      } catch (e) {
        return false;
      }
    })();

    function newId() {
      if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
      return "w-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    }

    function makeWord(fields, i) {
      var w = {
        id: newId(),
        en: String(fields.en || "").trim(),
        am: String(fields.am || "").trim(),
        status: "new",
        reviewCount: 0,
        createdAt: Date.now() + (i || 0)
      };
      if (fields.context) w.context = String(fields.context).trim();
      if (fields.pos) w.pos = String(fields.pos).trim();
      return w;
    }

    // Keep only well-formed entries so a damaged save can't break the app.
    function sanitize(list) {
      if (!Array.isArray(list)) return null;
      return list
        .filter(function (w) { return w && typeof w.en === "string" && typeof w.am === "string" && w.en && w.am; })
        .map(function (w, i) {
          return {
            id: typeof w.id === "string" && w.id ? w.id : newId(),
            en: w.en,
            am: w.am,
            context: typeof w.context === "string" && w.context ? w.context : undefined,
            pos: typeof w.pos === "string" && w.pos ? w.pos : undefined,
            status: VALID_STATUS[w.status] ? w.status : "new",
            reviewCount: Number(w.reviewCount) || 0,
            createdAt: Number(w.createdAt) || Date.now() + i,
            lastReviewed: Number(w.lastReviewed) || undefined
          };
        });
    }

    function defaults() {
      return DEFAULT_WORDS.map(makeWord);
    }

    // Returns { words, isFirstVisit, recovered }
    function load() {
      if (!available) return { words: defaults(), isFirstVisit: true, recovered: false };
      var raw = null;
      try { raw = window.localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
      if (raw === null) {
        var fresh = defaults();
        save(fresh);
        return { words: fresh, isFirstVisit: true, recovered: false };
      }
      try {
        var parsed = JSON.parse(raw);
        var words = sanitize(parsed && parsed.words);
        if (words) return { words: words, isFirstVisit: false, recovered: false };
      } catch (e) { /* fall through */ }
      var reset = defaults();
      save(reset);
      return { words: reset, isFirstVisit: false, recovered: true };
    }

    function save(words) {
      if (!available) return false;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, savedAt: Date.now(), words: words }));
        return true;
      } catch (e) {
        return false; // quota exceeded or storage blocked
      }
    }

    return { available: available, load: load, save: save, makeWord: makeWord, defaults: defaults, sanitize: sanitize };
  })();

  /* ---------------- dom ---------------- */

  var els = {};
  [
    "studyView", "listView", "statTotal", "statNew", "statReview", "statGood",
    "studyFilters", "listFilters", "studyEmpty", "studyDeck",
    "prevBtn", "nextBtn", "counterCur", "counterTotal", "progressFill",
    "cardStatusChip", "posBadge", "flashCard", "wordEn", "wordAm", "contextEn", "contextAm", "speakBtn",
    "reviewBtn", "gotItBtn", "sessionComplete", "scSummary", "restartBtn",
    "wordList", "listEmpty", "listFooter", "storageNote", "resetBtn",
    "addFab", "wordSheet", "sheetTitle", "inputEn", "inputAm", "inputContext", "inputPos",
    "cancelSheet", "saveSheet", "toast"
  ].forEach(function (id) { els[id] = document.getElementById(id); });

  /* ---------------- state ---------------- */

  var state = {
    words: [],
    activeTab: "study",
    studyFilter: "learn",
    listFilter: "all",
    deckIds: [],
    studyIndex: 0,
    flipped: false,
    sessionStats: { good: 0, review: 0 },
    pendingDelete: null,
    confirmReset: false,
    editingId: null
  };

  var toastTimer = null;

  function byId(id) {
    for (var i = 0; i < state.words.length; i++) if (state.words[i].id === id) return state.words[i];
    return null;
  }
  function currentDeck() { return state.deckIds.map(byId).filter(Boolean); }
  function inStudyPool(w) { return state.studyFilter === "all" || w.status !== "got_it"; }

  function buildDeck() {
    state.deckIds = state.words.filter(inStudyPool).map(function (w) { return w.id; });
    state.studyIndex = 0;
    state.flipped = false;
    state.sessionStats = { good: 0, review: 0 };
  }

  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.hidden = true; }, 2200);
  }

  function persist() {
    if (!Store.save(state.words) && Store.available) {
      showToast("Չհաջողվեց պահպանել․ սարքի հիշողությունը լցված է");
    }
  }

  /* ---------------- data ops ---------------- */

  function addWord(fields) {
    var w = Store.makeWord(fields);
    state.words.push(w);
    if (inStudyPool(w)) state.deckIds.push(w.id);
    persist();
    return w;
  }

  function updateWord(id, fields) {
    var w = byId(id);
    if (!w) return null;
    w.en = fields.en;
    w.am = fields.am;
    if (fields.context) w.context = fields.context; else delete w.context;
    if (fields.pos) w.pos = fields.pos; else delete w.pos;
    persist();
    return w;
  }

  function gradeWord(id, status) {
    var w = byId(id);
    if (!w) return;
    if (status === "got_it") state.sessionStats.good++; else state.sessionStats.review++;
    w.status = status;
    w.reviewCount = (w.reviewCount || 0) + 1;
    w.lastReviewed = Date.now();
    persist();
    state.studyIndex++;
    state.flipped = false;
    render();
  }

  function deleteWord(id) {
    var w = byId(id);
    var deckPos = state.deckIds.indexOf(id);
    state.words = state.words.filter(function (x) { return x.id !== id; });
    if (deckPos !== -1) {
      state.deckIds.splice(deckPos, 1);
      if (deckPos < state.studyIndex) state.studyIndex--;
    }
    state.pendingDelete = null;
    persist();
    if (w) showToast("«" + w.en + "» ջնջվեց");
    render();
  }

  function resetToDefaults() {
    state.words = Store.defaults();
    persist();
    state.confirmReset = false;
    buildDeck();
    render();
    showToast("Սկզբնական ցանկը վերականգնվեց");
  }

  /* ---------------- render ---------------- */

  function render() {
    renderStats();
    renderTabs();
    if (state.activeTab === "study") renderStudy(); else renderList();
  }

  function renderStats() {
    var n = 0, r = 0, g = 0;
    state.words.forEach(function (w) {
      if (w.status === "got_it") g++; else if (w.status === "review") r++; else n++;
    });
    els.statTotal.textContent = state.words.length;
    els.statNew.textContent = n;
    els.statReview.textContent = r;
    els.statGood.textContent = g;
  }

  function renderTabs() {
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (btn) {
      var on = btn.getAttribute("data-tab") === state.activeTab;
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    els.studyView.hidden = state.activeTab !== "study";
    els.listView.hidden = state.activeTab !== "list";
  }

  function setOptionalText(el, text) {
    el.textContent = text || "";
    el.hidden = !text;
  }

  function renderStudy() {
    var deck = currentDeck();
    var total = deck.length;

    if (total === 0) {
      els.studyEmpty.hidden = false;
      els.studyDeck.hidden = true;
      els.sessionComplete.hidden = true;
      els.studyEmpty.textContent = state.words.length === 0
        ? "Դեռ ոչ մի բառ չկա։ Սեղմի՛ր ներքևի + կոճակը և ավելացրու՛ քո առաջին բառը։"
        : "Այս ցանկում բոլոր բառերը սովորված են։ Փորձի՛ր «Բոլորը» բաժինը՝ կրկնելու համար։";
      return;
    }

    if (state.studyIndex >= total) {
      els.studyDeck.hidden = true;
      els.studyEmpty.hidden = true;
      els.sessionComplete.hidden = false;
      els.scSummary.textContent = "«Գիտեմ»՝ " + state.sessionStats.good + ", «Կրկնել»՝ " + state.sessionStats.review + " այս շրջանում";
      return;
    }

    els.sessionComplete.hidden = true;
    els.studyEmpty.hidden = true;
    els.studyDeck.hidden = false;

    var w = deck[state.studyIndex];
    els.counterCur.textContent = state.studyIndex + 1;
    els.counterTotal.textContent = total;
    els.progressFill.style.width = (state.studyIndex / total * 100) + "%";
    els.wordEn.textContent = w.en;
    els.wordAm.textContent = w.am;
    setOptionalText(els.contextEn, w.context);
    setOptionalText(els.contextAm, w.context);
    setOptionalText(els.posBadge, w.pos);

    els.flashCard.classList.toggle("flipped", state.flipped);
    els.prevBtn.disabled = state.studyIndex === 0;
    els.nextBtn.disabled = state.studyIndex === total - 1;

    var status = w.status || "new";
    els.cardStatusChip.textContent = STATUS_LABEL[status] || STATUS_LABEL.new;
    els.cardStatusChip.className = "status-chip status-" + status;
  }

  var ICON_EDIT = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
  var ICON_DELETE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderList() {
    var filtered = state.words
      .filter(function (w) { return state.listFilter === "all" || (w.status || "new") === state.listFilter; })
      .slice()
      .sort(function (a, b) { return (a.createdAt || 0) - (b.createdAt || 0); });

    els.listEmpty.hidden = filtered.length !== 0;
    els.wordList.innerHTML = "";

    filtered.forEach(function (w) {
      var li = el("li", "word-item");

      if (state.pendingDelete === w.id) {
        var row = el("div", "confirm-row");
        var actions = el("div", "confirm-actions");
        var yes = el("button", "confirm-yes", "Այո");
        var no = el("button", "confirm-no", "Ոչ");
        yes.addEventListener("click", function () { deleteWord(w.id); });
        no.addEventListener("click", function () { state.pendingDelete = null; render(); });
        actions.appendChild(yes); actions.appendChild(no);
        row.appendChild(el("span", null, "Ջնջե՞լ «" + w.en + "»"));
        row.appendChild(actions);
        li.appendChild(row);
        els.wordList.appendChild(li);
        return;
      }

      var text = el("div", "word-text");
      var en = el("div", "word-en", w.en);
      en.lang = "en";
      text.appendChild(en);
      text.appendChild(el("div", "word-am", w.am));

      var status = w.status || "new";
      var chip = el("span", "word-chip status-" + status, STATUS_LABEL[status] || STATUS_LABEL.new);

      var edit = el("button", "icon-btn");
      edit.setAttribute("aria-label", "Խմբագրել «" + w.en + "»");
      edit.innerHTML = ICON_EDIT;
      edit.addEventListener("click", function () { openSheet(w.id); });

      var del = el("button", "icon-btn danger");
      del.setAttribute("aria-label", "Ջնջել «" + w.en + "»");
      del.innerHTML = ICON_DELETE;
      del.addEventListener("click", function () { state.pendingDelete = w.id; render(); });

      li.appendChild(text); li.appendChild(chip); li.appendChild(edit); li.appendChild(del);
      els.wordList.appendChild(li);
    });

    renderListFooter();
  }

  function renderListFooter() {
    els.listFooter.innerHTML = "";
    if (state.confirmReset) {
      var row = el("div", "confirm-row");
      var actions = el("div", "confirm-actions");
      var yes = el("button", "confirm-yes", "Այո, վերականգնել");
      var no = el("button", "confirm-no", "Ոչ");
      yes.addEventListener("click", resetToDefaults);
      no.addEventListener("click", function () { state.confirmReset = false; render(); });
      actions.appendChild(yes); actions.appendChild(no);
      row.appendChild(el("span", null, "Քո բոլոր բառերն ու առաջընթացը կջնջվեն։"));
      row.appendChild(actions);
      els.listFooter.appendChild(row);
      return;
    }
    els.listFooter.appendChild(el("p", "storage-note", Store.available
      ? "Բառերը պահվում են միայն այս սարքում՝ այս բրաուզերում։"
      : "Այս բրաուզերը չի թույլատրում պահպանել․ փոփոխությունները կկորչեն էջը թարմացնելիս։"));
    var reset = el("button", "link-btn", "Վերականգնել սկզբնական ցանկը");
    reset.type = "button";
    reset.addEventListener("click", function () { state.confirmReset = true; render(); });
    els.listFooter.appendChild(reset);
  }

  /* ---------------- text-to-speech ---------------- */

  var Speech = (function () {
    var synth = window.speechSynthesis;
    var supported = !!synth && typeof window.SpeechSynthesisUtterance !== "undefined";
    var voice = null;

    function pickVoice() {
      var voices = synth.getVoices().filter(function (v) { return /^en([-_]|$)/i.test(v.lang); });
      var prefs = [/natural|neural|premium|enhanced/i, /google us english/i, /samantha|aria|jenny|guy/i];
      voice = null;
      for (var i = 0; i < prefs.length && !voice; i++) {
        var re = prefs[i];
        voice = voices.find(function (v) { return re.test(v.name) && /en[-_]US/i.test(v.lang); }) ||
                voices.find(function (v) { return re.test(v.name); }) || null;
      }
      if (!voice) voice = voices.find(function (v) { return /en[-_]US/i.test(v.lang); }) || voices[0] || null;
    }

    if (supported) {
      pickVoice();
      if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);
      else synth.onvoiceschanged = pickVoice;
    }

    function stop() {
      if (supported) synth.cancel();
      els.speakBtn.classList.remove("speaking");
    }

    function speak(text) {
      if (!supported || !text) return;
      synth.cancel();
      var u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = voice ? voice.lang : "en-US";
      u.rate = 0.9;
      u.onstart = function () { els.speakBtn.classList.add("speaking"); };
      u.onend = u.onerror = function () { els.speakBtn.classList.remove("speaking"); };
      synth.speak(u);
    }

    return { supported: supported, speak: speak, stop: stop };
  })();

  /* ---------------- add / edit sheet ---------------- */

  function openSheet(editId) {
    var w = editId ? byId(editId) : null;
    state.editingId = w ? w.id : null;
    els.sheetTitle.textContent = w ? "Խմբագրել բառը" : "Նոր բառ";
    els.saveSheet.textContent = w ? "Պահպանել" : "Ավելացնել";
    els.inputEn.value = w ? w.en : "";
    els.inputAm.value = w ? w.am : "";
    els.inputContext.value = w && w.context ? w.context : "";
    els.inputPos.value = w && w.pos ? w.pos : "";
    els.wordSheet.hidden = false;
    setTimeout(function () { els.inputEn.focus(); }, 20);
  }

  function closeSheet() {
    els.wordSheet.hidden = true;
    state.editingId = null;
  }

  function submitSheet() {
    var fields = {
      en: els.inputEn.value.trim(),
      am: els.inputAm.value.trim(),
      context: els.inputContext.value.trim(),
      pos: els.inputPos.value
    };
    if (!fields.en || !fields.am) {
      showToast("Լրացրո՛ւ առաջին երկու դաշտերը");
      return;
    }
    if (state.editingId) {
      updateWord(state.editingId, fields);
      showToast("«" + fields.en + "» թարմացվեց");
    } else {
      addWord(fields);
      showToast("«" + fields.en + "» ավելացվեց ցանկում");
    }
    closeSheet();
    render();
  }

  /* ---------------- events ---------------- */

  function bindEvents() {
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (btn) {
      btn.addEventListener("click", function () {
        state.activeTab = btn.getAttribute("data-tab");
        state.pendingDelete = null;
        state.confirmReset = false;
        Speech.stop();
        render();
      });
    });

    els.studyFilters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-sf]");
      if (!btn) return;
      state.studyFilter = btn.getAttribute("data-sf");
      Array.prototype.forEach.call(els.studyFilters.querySelectorAll(".chip"), function (c) {
        c.classList.toggle("active", c === btn);
      });
      buildDeck();
      render();
    });

    els.listFilters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lf]");
      if (!btn) return;
      state.listFilter = btn.getAttribute("data-lf");
      Array.prototype.forEach.call(els.listFilters.querySelectorAll(".chip"), function (c) {
        c.classList.toggle("active", c === btn);
      });
      render();
    });

    function toggleFlip() {
      state.flipped = !state.flipped;
      els.flashCard.classList.toggle("flipped", state.flipped);
    }
    els.flashCard.addEventListener("click", toggleFlip);
    els.flashCard.addEventListener("keydown", function (e) {
      if (e.target !== els.flashCard) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleFlip(); }
    });

    if (!Speech.supported) {
      els.speakBtn.hidden = true;
    } else {
      els.speakBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // don't flip the card
        Speech.speak(els.wordEn.textContent.trim());
      });
    }

    els.prevBtn.addEventListener("click", function () {
      if (state.studyIndex > 0) { Speech.stop(); state.studyIndex--; state.flipped = false; render(); }
    });
    els.nextBtn.addEventListener("click", function () {
      if (state.studyIndex < currentDeck().length - 1) { Speech.stop(); state.studyIndex++; state.flipped = false; render(); }
    });

    function gradeCurrent(status) {
      var w = currentDeck()[state.studyIndex];
      if (w) { Speech.stop(); gradeWord(w.id, status); }
    }
    els.reviewBtn.addEventListener("click", function () { gradeCurrent("review"); });
    els.gotItBtn.addEventListener("click", function () { gradeCurrent("got_it"); });
    els.restartBtn.addEventListener("click", function () { buildDeck(); render(); });

    els.addFab.addEventListener("click", function () { openSheet(null); });
    els.cancelSheet.addEventListener("click", closeSheet);
    els.saveSheet.addEventListener("click", submitSheet);
    els.wordSheet.addEventListener("click", function (e) { if (e.target === els.wordSheet) closeSheet(); });
    els.inputEn.addEventListener("keydown", function (e) { if (e.key === "Enter") els.inputAm.focus(); });
    els.inputAm.addEventListener("keydown", function (e) { if (e.key === "Enter") els.inputContext.focus(); });
    els.inputContext.addEventListener("keydown", function (e) { if (e.key === "Enter") els.inputPos.focus(); });
    els.inputPos.addEventListener("keydown", function (e) { if (e.key === "Enter") submitSheet(); });

    document.addEventListener("keydown", function (e) {
      if (!els.wordSheet.hidden) {
        if (e.key === "Escape") closeSheet();
        return;
      }
      if (state.activeTab !== "study" || e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft") els.prevBtn.click();
      else if (e.key === "ArrowRight") els.nextBtn.click();
      else if ((e.key === "s" || e.key === "S") && Speech.supported && !els.studyDeck.hidden) {
        Speech.speak(els.wordEn.textContent.trim());
      }
    });

    // Keep several open tabs of the app in sync.
    window.addEventListener("storage", function (e) {
      if (e.key !== STORAGE_KEY) return;
      if (e.newValue === null) { state.words = Store.load().words; buildDeck(); render(); return; }
      try {
        var words = Store.sanitize(JSON.parse(e.newValue).words);
        if (!words) return;
        state.words = words;
        render();
      } catch (err) { /* ignore malformed updates */ }
    });
  }

  /* ---------------- start ---------------- */

  var loaded = Store.load();
  state.words = loaded.words;
  buildDeck();
  bindEvents();
  render();
  if (loaded.recovered) showToast("Պահված տվյալները վնասված էին․ ցանկը վերականգնվեց");
  else if (!Store.available) showToast("Բրաուզերը չի թույլատրում պահպանել բառերը");
})();
