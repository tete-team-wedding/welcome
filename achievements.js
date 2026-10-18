(function () {
  var STORAGE_KEY = "teteTeamWedding.achievements";
  var NORMAL_ACHIEVEMENT_ICON = "✦";
  var HIDDEN_ACHIEVEMENT_ICON = "🔑";
  var ACHIEVEMENT_MENU_ORDER = [
    "first-contact",
    "countdown-started",
    "definitely-not-planning-trips",
    "color-me-impressed",
    "certified-third-wheeler",
    "the-grand-tour",
    "bilingual",
    "completionist",
    "google-maps-expert",
    "the-blessing",
    "the-secret-garden",
    "one-more-time",
    "the-whole-story"
  ];
  var ACHIEVEMENTS = [
    {
      id: "first-contact",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "จุดเริ่มต้น",
        en: "First Contact",
      },
      description: {
        th: "ยินดีต้อนรับสู่พื้นที่เล็ก ๆ ของเราสองคน",
        en: "Welcome to our wedding!",
      },
    },
    {
      id: "countdown-started",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "เริ่มนับถอยหลัง",
        en: "Countdown Started",
      },
      description: {
        th: "ทุกวินาที พาเราเข้าใกล้กันมากขึ้นอีกนิด",
        en: "Every second brings us closer.",
      },
    },
    {
      id: "definitely-not-planning-trips",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "ไม่ได้วางแผนเที่ยว จริง ๆ นะ",
        en: "Definitely Not Planning Trips",
      },
      description: {
        th: "คุณสำรวจครบทุกที่แล้ว แต่แค่ดูเฉย ๆ ใช่ไหมล่ะ?",
        en: "You’ve explored every travel category. Purely out of curiosity, of course.",
      },
    },
    {
      id: "color-me-impressed",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "ทุกสีมีความหมาย",
        en: "Color Me Impressed",
      },
      description: {
        th: "วันพิเศษทั้งที สีชุดก็ต้องใส่ใจ",
        en: "You’ve checked out every attire color. Looking good is part of the mission.",
      },
    },
    {
      id: "certified-third-wheeler",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "กขค. มืออาชีพ",
        en: "Certified Third Wheeler",
      },
      description: {
        th: "มางานแต่งทั้งที ก็ต้องดูให้ครบทุกช็อต",
        en: "You came for the wedding. You stayed for the couple pics.",
      },
    },
    {
      id: "the-grand-tour",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "นักสำรวจเว็บ",
        en: "The Grand Tour",
      },
      description: {
        th: "เดินทางมาถึงตรงนี้แล้ว เก็บครบทุกโมเมนต์หรือยัง?",
        en: "You made it to the bottom. We hope you enjoyed every moment here.",
      },
    },
    {
      id: "bilingual",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "ภาษาไหนก็ได้",
        en: "Bilingual",
      },
      description: {
        th: "แค่อยากรู้ว่าเวอร์ชันภาษาอังกฤษดีกว่าหรือเปล่า",
        en: "Just checking if the English version is better.",
      },
    },
    {
      id: "completionist",
      category: "normal",
      icon: NORMAL_ACHIEVEMENT_ICON,
      title: {
        th: "เก็บครบจบทุกอัน",
        en: "Completionist",
      },
      description: {
        th: "ไม่มีอะไรหลุดรอดสายตาคุณไปได้เลย สงสัยเราต้องทำให้ยากกว่านี้แล้ว",
        en: "Nothing gets past you. We should’ve made it harder.",
      },
    },
    {
      id: "google-maps-expert",
      category: "hidden",
      icon: HIDDEN_ACHIEVEMENT_ICON,
      title: {
        th: "ผู้เชี่ยวชาญเส้นทาง",
        en: "Google Maps Expert",
      },
      description: {
        th: "ปักหมุดไว้แล้ว ไม่หลงทางแน่นอน",
        en: "You’ve checked out our venue. No excuses for getting lost now.",
      },
    },
    {
      id: "the-secret-garden",
      category: "hidden",
      icon: HIDDEN_ACHIEVEMENT_ICON,
      title: {
        th: "สวนแห่งความลับ",
        en: "The Secret Garden",
      },
      description: {
        th: "ความอยากรู้เพียงนิดเดียว ทำให้ดอกไม้เบ่งบาน",
        en: "A little curiosity made everything bloom.",
      },
    },
    {
      id: "the-whole-story",
      category: "hidden",
      icon: HIDDEN_ACHIEVEMENT_ICON,
      title: {
        th: "เรื่องราวทั้งหมด",
        en: "The Whole Story",
      },
      description: {
        th: "ทุกความลับ ทุกเรื่องราวเล็ก ๆ คุณค้นพบครบหมดแล้ว",
        en: "Every little secret, every little story. You’ve found them all.",
      },
    },
    {
      id: "one-more-time",
      category: "hidden",
      icon: HIDDEN_ACHIEVEMENT_ICON,
      title: {
        th: "ลองอีกที",
        en: "One More Time",
      },
      description: {
        th: "ถ้ายังไม่เกิดอะไรขึ้น ก็ลองอีกทีแล้วกัน",
        en: "It has to do something eventually, right?",
      },
    },
    {
      id: "the-blessing",
      category: "hidden",
      icon: HIDDEN_ACHIEVEMENT_ICON,
      title: {
        th: "คำอวยพร",
        en: "The Blessing",
      },
      description: {
        th: "ขอบคุณที่ร่วมเติมเต็มเรื่องราวของเรา",
        en: "A little wish, a lifetime of love.",
      },
    },
  ];

  var state = createDefaultState();
  var activeToasts = [];
  var TOAST_DURATION = 5000;
  var TOAST_FADE_DURATION = 250;
  var ACHIEVEMENT_HIGHLIGHT_DURATION = 700;

  function createDefaultState() {
    return {
      version: 3,
      language: "th",
      playerId: "",
      unlocked: [],
      completionTimes: {},
      reportedAchievements: [],
      statsOutbox: [],
      progress: {},
      pendingToast: [],
    };
  }

  function getAchievementById(id) {
    for (var i = 0; i < ACHIEVEMENTS.length; i += 1) {
      if (ACHIEVEMENTS[i].id === id) return ACHIEVEMENTS[i];
    }
    return null;
  }

  function readStorageJSON(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      console.warn("Could not load achievement progress from local storage.", error);
      return null;
    }
  }

  function writeStorageJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Could not save achievement progress to local storage.", error);
      return false;
    }
  }

  function uniqueList(items) {
    var seen = {};
    var result = [];
    items.forEach(function (item) {
      if (!seen[item]) {
        seen[item] = true;
        result.push(item);
      }
    });
    return result;
  }

  function normalizeState(rawState) {
    var normalized = createDefaultState();
    if (!rawState || typeof rawState !== "object") {
      normalized.playerId = createPlayerId();
      return normalized;
    }
    normalized.version = 3;
    normalized.language = rawState.language === "en" ? "en" : "th";
    normalized.playerId =
      typeof rawState.playerId === "string" && /^[a-f0-9-]{36}$/i.test(rawState.playerId)
        ? rawState.playerId
        : createPlayerId();
    normalized.unlocked = Array.isArray(rawState.unlocked)
      ? uniqueList(rawState.unlocked.filter(function (id) { return !!getAchievementById(id); }))
      : [];
    normalized.reportedAchievements = Array.isArray(rawState.reportedAchievements)
      ? uniqueList(rawState.reportedAchievements.filter(function (id) {
          return !!getAchievementById(id);
        }))
      : [];
    if (rawState.completionTimes && typeof rawState.completionTimes === "object") {
      Object.keys(rawState.completionTimes).forEach(function (id) {
        var completedAt = rawState.completionTimes[id];
        if (getAchievementById(id) && typeof completedAt === "string" && !isNaN(Date.parse(completedAt))) {
          normalized.completionTimes[id] = completedAt;
        }
      });
    }
    normalized.statsOutbox = Array.isArray(rawState.statsOutbox)
      ? rawState.statsOutbox.filter(function (event) {
          return event && !!getAchievementById(event.achievementId) &&
            normalized.reportedAchievements.indexOf(event.achievementId) === -1 &&
            typeof event.completedAt === "string" && !isNaN(Date.parse(event.completedAt));
        }).map(function (event) {
          return {
            playerId: /^[a-f0-9-]{36}$/i.test(event.playerId || "")
              ? event.playerId
              : normalized.playerId,
            achievementId: event.achievementId,
            completedAt: event.completedAt,
          };
        })
      : [];
    normalized.progress = rawState.progress && typeof rawState.progress === "object" ? rawState.progress : {};
    var pendingToasts = Array.isArray(rawState.pendingToast)
      ? rawState.pendingToast
      : [rawState.pendingToast];
    normalized.pendingToast = uniqueList(
      pendingToasts.filter(function (id) {
        return typeof id === "string" && !!getAchievementById(id);
      }),
    );
    return normalized;
  }

  function storeState() {
    return writeStorageJSON(STORAGE_KEY, state);
  }

  function isUnlocked(id) {
    return state.unlocked.indexOf(id) !== -1;
  }

  function createPlayerId() {
    var crypto = window.crypto;
    if (crypto && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    var bytes = new Uint8Array(16);
    if (crypto && typeof crypto.getRandomValues === "function") {
      crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < bytes.length; i += 1) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    var hex = Array.prototype.map.call(bytes, function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
    return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" +
      hex.slice(16, 20) + "-" + hex.slice(20);
  }

  function createStatsEvent(achievementId, completedAt) {
    return {
      playerId: state.playerId,
      achievementId: achievementId,
      completedAt: completedAt,
    };
  }

  var statsRequestsInFlight = {};

  function flushStatsOutbox() {
    if (!window.APP_SCRIPT_URL || !window.fetch) return;

    state.statsOutbox.slice().forEach(function (event) {
      var requestKey = event.playerId + ":" + event.achievementId;
      if (statsRequestsInFlight[requestKey]) return;
      statsRequestsInFlight[requestKey] = true;
      fetch(window.APP_SCRIPT_URL + "?endpoint=achievement-stats", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          playerId: event.playerId,
          achievementId: getAchievementById(event.achievementId).title.en,
          completedAt: event.completedAt,
        }),
      })
        .then(function (response) {
          if (response.type === "opaque") return true;
          if (!response.ok) {
            throw new Error("Achievement statistics request failed with status " + response.status);
          }
          return response.json();
        })
        .then(function (payload) {
          if (payload === true) {
            state.reportedAchievements = uniqueList(
              state.reportedAchievements.concat(event.achievementId),
            );
            state.statsOutbox = state.statsOutbox.filter(function (queuedEvent) {
              return queuedEvent.playerId !== event.playerId ||
                queuedEvent.achievementId !== event.achievementId;
            });
            storeState();
            return;
          }
          if (!payload || payload.ok !== true) {
            throw new Error("Achievement statistics endpoint did not confirm the event");
          }
          state.reportedAchievements = uniqueList(
            state.reportedAchievements.concat(event.achievementId),
          );
          state.statsOutbox = state.statsOutbox.filter(function (queuedEvent) {
            return queuedEvent.playerId !== event.playerId ||
              queuedEvent.achievementId !== event.achievementId;
          });
          storeState();
        })
        .catch(function (error) {
          console.warn("Could not submit achievement statistics; it will be retried later.", error);
        })
        .then(function () {
          delete statsRequestsInFlight[requestKey];
        });
    });
  }

  function queueUnlockedAchievementStats() {
    var changed = false;
    state.unlocked.forEach(function (id) {
      if (!state.completionTimes[id]) {
        state.completionTimes[id] = new Date().toISOString();
        changed = true;
      }
      if (state.reportedAchievements.indexOf(id) !== -1) return;
      var isQueued = state.statsOutbox.some(function (event) {
        return event.achievementId === id;
      });
      if (!isQueued) {
        state.statsOutbox.push(createStatsEvent(id, state.completionTimes[id]));
        changed = true;
      }
    });
    if (changed) storeState();
  }

  function renderAchievementToggleIcon(animateSecretReveal) {
    var toggle = document.getElementById("achievementToggle");
    var icon = toggle && toggle.querySelector("img");
    if (!icon) return;

    var hasUnlockedSecret = ACHIEVEMENTS.some(function (definition) {
      return definition.category === "hidden" && isUnlocked(definition.id);
    });
    toggle.classList.toggle("is-secret", hasUnlockedSecret);
    if (hasUnlockedSecret && animateSecretReveal) {
      icon.classList.add("secret-revealed");
    }
    icon.src = hasUnlockedSecret
      ? "images/achievement-secret.png"
      : "images/achievement.png";
  }

  function getAchievementText(definition, field) {
    if (!definition) return "";
    var language = state.language === "en" ? "en" : "th";
    var value = definition[field] && definition[field][language];
    if (value) return value;
    return (definition[field] && definition[field].en) || definition.id;
  }

  function loadState() {
    var storedState = readStorageJSON(STORAGE_KEY);
    state = normalizeState(storedState);
    if (!storedState || storedState.version !== 3 || !storedState.playerId ||
        !Array.isArray(storedState.reportedAchievements)) {
      storeState();
    }
  }

  function renderLanguageToggle() {
    var button = document.getElementById("achievementLanguageToggle");
    if (button) {
      button.querySelectorAll("[data-language]").forEach(function (label) {
        label.classList.toggle("is-active", label.dataset.language === state.language);
      });
      button.setAttribute("aria-pressed", state.language === "en" ? "true" : "false");
      button.setAttribute(
        "aria-label",
        state.language === "en" ? "Switch achievement language" : "เปลี่ยนภาษาของความสำเร็จ",
      );
    }

    var popupTitle = document.getElementById("achievementPopupTitle");
    var popup = document.getElementById("achievementPopup");
    var toggle = document.getElementById("achievementToggle");
    var isEnglish = state.language === "en";
    if (popupTitle) popupTitle.textContent = isEnglish ? "Achievements" : "ความสำเร็จ";
    if (popup) popup.setAttribute("aria-label", isEnglish ? "Achievements" : "ความสำเร็จ");
    if (toggle) {
      toggle.setAttribute("aria-label", isEnglish ? "Show achievements" : "แสดงความสำเร็จ");
    }
  }

  function renderAchievementItem(item, definition) {
    var unlocked = isUnlocked(definition.id);
    var icon = item.querySelector(".achievement-icon");
    if (!icon) {
      icon = document.createElement("span");
      icon.className = "achievement-icon";
      icon.setAttribute("aria-hidden", "true");
      item.insertBefore(icon, item.firstChild);
    }
    icon.textContent = unlocked ? definition.icon : "";

    var title = item.querySelector(".achievement-name");
    if (!title) {
      title = document.createElement("span");
      title.className = "achievement-name";
      item.appendChild(title);
    }

    var description = item.querySelector(".achievement-description");
    if (!description) {
      description = document.createElement("span");
      description.className = "achievement-description";
      item.appendChild(description);
    }

    title.textContent = unlocked ? getAchievementText(definition, "title") : "???";
    description.textContent = unlocked ? getAchievementText(definition, "description") : "";
    description.hidden = !unlocked;
    item.classList.toggle("is-unlocked", unlocked);
    item.classList.toggle("is-secret", definition.category === "hidden");
  }

  function getAchievementMenuOrder(id) {
    var index = ACHIEVEMENT_MENU_ORDER.indexOf(id);
    return index === -1 ? ACHIEVEMENT_MENU_ORDER.length : index;
  }

  function renderAchievementRows(animateSecretReveal) {
    renderAchievementToggleIcon(animateSecretReveal);
    var list = document.querySelector("#achievementPopup ul");
    if (!list) return;

    var keyedRows = {};
    Array.prototype.forEach.call(list.querySelectorAll("li[data-achievement-id]"), function (item) {
      keyedRows[item.dataset.achievementId] = item;
    });

    ACHIEVEMENTS.slice().sort(function (a, b) {
      return getAchievementMenuOrder(a.id) - getAchievementMenuOrder(b.id);
    }).forEach(function (definition) {
      var shouldDisplay = definition.category === "normal" || isUnlocked(definition.id);
      if (!shouldDisplay) {
        if (keyedRows[definition.id]) {
          keyedRows[definition.id].remove();
        }
        return;
      }

      var item = keyedRows[definition.id];
      if (!item) {
        item = document.createElement("li");
        item.dataset.achievementId = definition.id;
        item.id = "achievement-" + definition.id;
        list.appendChild(item);
      }

      renderAchievementItem(item, definition);
      keyedRows[definition.id] = item;
    });

    Array.prototype.forEach.call(list.querySelectorAll("li[data-achievement-id]"), function (item) {
      var id = item.dataset.achievementId;
      var definition = getAchievementById(id);
      var shouldKeep = definition && (definition.category === "normal" || isUnlocked(id));
      if (!shouldKeep) {
        item.remove();
      }
    });
  }

  function queueToast(definition) {
    if (!definition) return;
    if (
      state.pendingToast.indexOf(definition.id) !== -1 ||
      activeToasts.some(function (entry) { return entry.definition.id === definition.id; })
    ) {
      return;
    }

    var lightbox = document.getElementById("lb");
    if (
      document.hidden ||
      (definition.id === "certified-third-wheeler" && lightbox && !lightbox.hidden)
    ) {
      state.pendingToast.push(definition.id);
      storeState();
      return;
    }
    showToast(definition);
  }

  function showToast(definition) {
    var template = document.getElementById("achievementToast");
    var container = document.getElementById("achievementToasts");
    if (!template || !container || !definition) return;

    var toast = template.cloneNode(true);
    toast.removeAttribute("id");
    Array.prototype.forEach.call(toast.querySelectorAll("[id]"), function (element) {
      element.removeAttribute("id");
    });
    toast.dataset.achievementId = definition.id;
    toast.hidden = false;
    toast.classList.remove("is-visible");
    container.insertBefore(toast, container.firstChild);
    renderToastText(definition, toast);

    var item = document.getElementById("achievement-" + definition.id);

    if (item) {
      item.classList.remove("just-unlocked");
      void item.offsetWidth;
      item.classList.add("just-unlocked");
    }

    var entry = {
      definition: definition,
      element: toast,
      item: item,
      timeoutId: null,
      highlightTimeoutId: null,
    };
    activeToasts.push(entry);
    toast.addEventListener("click", function (event) {
      event.stopPropagation();
      var toggle = document.getElementById("achievementToggle");
      var popup = document.getElementById("achievementPopup");
      if (toggle && popup && popup.hidden) {
        toggle.click();
      }
      removeToast(entry, true);
      var list = popup && popup.querySelector("ul");
      if (item && list) {
        var listRect = list.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();
        if (listRect.height > 0 && list.offsetHeight > 0) {
          var scale = list.offsetHeight / listRect.height;
          var listCenter = listRect.top + listRect.height / 2;
          var itemCenter = itemRect.top + itemRect.height / 2;
          list.scrollTop += (itemCenter - listCenter) * scale;
        }
      }
      if (item) {
        item.classList.remove("just-unlocked");
        void item.offsetWidth;
        item.classList.add("just-unlocked");
        entry.highlightTimeoutId = window.setTimeout(function () {
          item.classList.remove("just-unlocked");
        }, ACHIEVEMENT_HIGHLIGHT_DURATION);
      }
    });

    void toast.offsetWidth;
    toast.classList.add("is-visible");
    entry.timeoutId = window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () {
        removeToast(entry);
      }, TOAST_FADE_DURATION);
    }, TOAST_DURATION - TOAST_FADE_DURATION);
  }

  function removeToast(entry, keepHighlight) {
    window.clearTimeout(entry.timeoutId);
    window.clearTimeout(entry.highlightTimeoutId);
    entry.element.remove();
    if (!keepHighlight && entry.item) entry.item.classList.remove("just-unlocked");
    activeToasts = activeToasts.filter(function (activeEntry) {
      return activeEntry !== entry;
    });
  }

  function renderToastText(definition, toast) {
    var toastName = toast && toast.querySelector(".achievement-toast-name");
    var toastDescription = toast && toast.querySelector(".achievement-toast-description");
    var toastLabel = toast && toast.querySelector(".achievement-toast-label");
    var toastIcon = toast && toast.querySelector(".achievement-toast-sparkle");
    if (!toastName || !toastDescription || !toastLabel || !toastIcon) return;

    var isSecret = definition.category === "hidden";
    toast.classList.toggle("is-secret", isSecret);
    toastLabel.hidden = !isSecret;
    toastLabel.textContent = state.language === "en"
      ? "Secret Achievement Unlocked"
      : "ความสำเร็จลับ";
    toastIcon.textContent = isSecret
      ? HIDDEN_ACHIEVEMENT_ICON
      : NORMAL_ACHIEVEMENT_ICON;
    toastName.textContent = getAchievementText(definition, "title");
    toastDescription.textContent = getAchievementText(definition, "description");
  }

  function unlockAchievement(id, deferToast) {
    var definition = getAchievementById(id);
    if (!definition || isUnlocked(id)) return false;

    var completedAt = new Date().toISOString();
    state.unlocked = uniqueList(state.unlocked.concat(id));
    state.completionTimes[id] = completedAt;
    state.statsOutbox.push(createStatsEvent(id, completedAt));
    if (deferToast) {
      state.pendingToast = uniqueList(state.pendingToast.concat(id));
    }
    storeState();
    renderAchievementRows(definition.category === "hidden");
    if (id !== "completionist") {
      maybeUnlockCompletionist();
    }
    if (definition.category === "hidden" && id !== "the-whole-story") {
      maybeUnlockTouchGrassLater();
    }
    if (!deferToast) queueToast(definition);
    flushStatsOutbox();
    return true;
  }

  function getDressColors() {
    return Array.prototype.slice
      .call(document.querySelectorAll("#dress .dot[data-color]"))
      .map(function (button) {
        return button.dataset.color;
      })
      .filter(Boolean);
  }

  function handleColorClick(event) {
    var button = event.target.closest("button[data-color]");
    if (!button) return;

    var color = button.dataset.color;
    if (!color) return;

    if (!Array.isArray(state.progress["color-me-impressed"])) {
      state.progress["color-me-impressed"] = [];
    }

    if (state.progress["color-me-impressed"].indexOf(color) === -1) {
      state.progress["color-me-impressed"].push(color);
      storeState();
    }

    var allColors = getDressColors();
    if (
      allColors.length > 0 &&
      allColors.every(function (candidate) {
        return state.progress["color-me-impressed"].indexOf(candidate) !== -1;
      })
    ) {
      unlockAchievement("color-me-impressed");
    }
  }

  function getAchievementProgressList(id) {
    if (!Array.isArray(state.progress[id])) {
      state.progress[id] = [];
    }
    return state.progress[id];
  }

  function getSecretGardenProgress() {
    var progress = getAchievementProgressList("the-secret-garden");
    var nextProgress = [];
    progress.forEach(function (value) {
      var numericValue = Number(value);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue < 6) {
        nextProgress.push(numericValue);
      }
    });
    state.progress["the-secret-garden"] = uniqueList(nextProgress);
    return state.progress["the-secret-garden"];
  }

  function getNextSecretGardenIndex() {
    var progress = getSecretGardenProgress();
    for (var index = 0; index < 6; index += 1) {
      if (progress.indexOf(index) === -1) {
        return index;
      }
    }
    return null;
  }

  function renderSecretGarden() {
    var garden = document.getElementById("secretGarden");
    if (!garden) return;

    var pieces = Array.prototype.slice.call(garden.querySelectorAll(".secret-garden-piece"));
    var progress = getSecretGardenProgress();
    var hasGardenUnlock = isUnlocked("the-secret-garden");
    pieces.forEach(function (piece) {
      var index = Number(piece.dataset.index);
      var isActive = hasGardenUnlock || progress.indexOf(index) !== -1;
      piece.classList.toggle("is-active", isActive);
    });
    garden.classList.toggle("is-complete", hasGardenUnlock || progress.length >= 6);
    garden.setAttribute("aria-pressed", hasGardenUnlock ? "true" : "false");
  }

  function triggerGardenAnimation(target, animationClass) {
    if (!target || !animationClass) return;
    target.classList.remove(animationClass);
    void target.offsetWidth;
    target.classList.add(animationClass);
    window.setTimeout(function () {
      target.classList.remove(animationClass);
    }, 460);
  }

  function bindSecretGarden() {
    var garden = document.getElementById("secretGarden");
    if (!garden) return;

    garden.addEventListener("click", function () {
      if (isUnlocked("the-secret-garden")) {
        if (isUnlocked("one-more-time")) return;
        var clicks = Number(state.progress["one-more-time"]) || 0;
        state.progress["one-more-time"] = clicks + 1;
        storeState();
        triggerGardenAnimation(garden, "is-shaking");
        if (state.progress["one-more-time"] >= 5) {
          unlockAchievement("one-more-time");
        }
        return;
      }

      var nextIndex = getNextSecretGardenIndex();
      if (nextIndex === null) {
        unlockAchievement("the-secret-garden");
        return;
      }

      var progress = getSecretGardenProgress();
      var nextProgress = uniqueList(progress.concat(nextIndex));
      state.progress["the-secret-garden"] = nextProgress;
      storeState();
      renderSecretGarden();
      triggerGardenAnimation(garden, "is-blooming");

      if (nextProgress.length >= 6) {
        unlockAchievement("the-secret-garden");
      }
    });

    renderSecretGarden();
  }

  function syncTravelCategoryProgress() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll("#tabs button"));
    if (!buttons.length) return;

    var progress = getAchievementProgressList("definitely-not-planning-trips");
    buttons.forEach(function (button) {
      var name = (button.textContent || "").trim();
      if (!name) return;
      if (button.getAttribute("aria-pressed") === "true" && progress.indexOf(name) === -1) {
        progress.push(name);
      }
    });

    state.progress["definitely-not-planning-trips"] = uniqueList(progress);
    var allViewed = buttons.every(function (button) {
      var name = (button.textContent || "").trim();
      return !name || state.progress["definitely-not-planning-trips"].indexOf(name) !== -1;
    });

    if (allViewed) {
      unlockAchievement("definitely-not-planning-trips");
    }
  }

  function syncGalleryProgress() {
    var galleryState = window.__weddingGallery || {};
    var progress = getAchievementProgressList("certified-third-wheeler");
    var previousProgress = progress.slice();
    var activeIndex = Number(galleryState.activeIndex);
    if (!isNaN(activeIndex) && progress.indexOf(activeIndex) === -1) {
      progress.push(activeIndex);
    }

    var allSlides = Array.isArray(galleryState.uniqueIndexes) && galleryState.uniqueIndexes.length
      ? galleryState.uniqueIndexes.slice()
      : Array.prototype.slice
          .call(document.querySelectorAll(".gal-slide"))
          .map(function (slide) {
            return Number(slide.dataset.i);
          })
          .filter(function (index) {
            return !isNaN(index);
          });

    if (!allSlides.length) return;

    state.progress["certified-third-wheeler"] = uniqueList(progress);
    if (
      state.progress["certified-third-wheeler"].length !== previousProgress.length ||
      state.progress["certified-third-wheeler"].some(function (index, position) {
        return index !== previousProgress[position];
      })
    ) {
      storeState();
    }
    var allSeen = allSlides.every(function (index) {
      return state.progress["certified-third-wheeler"].indexOf(index) !== -1;
    });
    if (allSeen) {
      unlockAchievement("certified-third-wheeler");
    }
  }

  function getScrollTop() {
    return Math.max(
      window.scrollY || 0,
      document.documentElement.scrollTop || 0,
      document.body.scrollTop || 0,
    );
  }

  function isAtPageBottom() {
    return window.innerHeight + getScrollTop() >=
      document.documentElement.scrollHeight - 2;
  }

  function isGateOpen() {
    var gate = document.getElementById("gate");
    return gate && !gate.classList.contains("gone");
  }

  function updateScrollAchievements() {
    if (isGateOpen()) return;

    var countdown = document.querySelector(".countdown");
    if (countdown) {
      var countdownRect = countdown.getBoundingClientRect();
      var viewportMiddle = window.innerHeight / 2;
      if (countdownRect.top <= viewportMiddle && countdownRect.bottom >= viewportMiddle) {
        unlockAchievement("countdown-started");
      }
    }

    if (isAtPageBottom()) {
      unlockAchievement("the-grand-tour");
    }
  }

  function maybeUnlockCompletionist() {
    var normalIds = ACHIEVEMENTS.filter(function (definition) {
      return definition.category === "normal" && definition.id !== "completionist";
    }).map(function (definition) {
      return definition.id;
    });

    if (normalIds.length > 0 && normalIds.every(function (id) { return isUnlocked(id); })) {
      unlockAchievement("completionist");
    }
  }

  function maybeUnlockTouchGrassLater() {
    var hiddenIds = ACHIEVEMENTS.filter(function (definition) {
      return definition.category === "hidden" && definition.id !== "the-whole-story";
    }).map(function (definition) {
      return definition.id;
    });

    if (hiddenIds.length > 0 && hiddenIds.every(function (id) { return isUnlocked(id); })) {
      unlockAchievement("the-whole-story");
    }
  }

  function setLanguage(language) {
    if (language !== "en" && language !== "th") return;
    state.language = language;
    renderLanguageToggle();
    renderAchievementRows();
    storeState();
    activeToasts.forEach(function (entry) {
      renderToastText(entry.definition, entry.element);
    });

    if (state.language === "en" && !isUnlocked("bilingual")) {
      unlockAchievement("bilingual");
    }
  }

  function bindLanguageToggle() {
    var button = document.getElementById("achievementLanguageToggle");
    if (!button) return;

    button.addEventListener("click", function () {
      setLanguage(state.language === "en" ? "th" : "en");
    });
  }

  function bindAchievementToggle() {
    var toggle = document.getElementById("achievementToggle");
    var popup = document.getElementById("achievementPopup");
    if (!toggle || !popup) return;
    var dragStart = null;
    var wasDragged = false;

    function closePopup(returnFocus) {
      popup.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      if (returnFocus) toggle.focus();
    }

    function placePopup() {
      var margin = 12;
      var rightMargin = 28;
      var gap = 8;
      var buttonRect = toggle.getBoundingClientRect();
      var popupRect = popup.getBoundingClientRect();
      var left = Math.min(
        Math.max(margin, buttonRect.left),
        window.innerWidth - popupRect.width - rightMargin,
      );
      var top = buttonRect.bottom + gap;

      if (top + popupRect.height > window.innerHeight - margin) {
        top = buttonRect.top - popupRect.height - gap;
      }
      top = Math.max(
        margin,
        Math.min(top, window.innerHeight - popupRect.height - margin),
      );
      popup.style.left = left + "px";
      popup.style.top = top + "px";
    }

    toggle.addEventListener("pointerdown", function (event) {
      if (!event.isPrimary || event.button !== 0) return;
      var rect = toggle.getBoundingClientRect();
      dragStart = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: rect.left,
        top: rect.top,
      };
    });

    window.addEventListener("pointermove", function (event) {
      if (!dragStart || dragStart.pointerId !== event.pointerId) return;
      var deltaX = event.clientX - dragStart.x;
      var deltaY = event.clientY - dragStart.y;
      if (!wasDragged && Math.hypot(deltaX, deltaY) < 5) return;

      wasDragged = true;
      var rect = toggle.getBoundingClientRect();
      var margin = 8;
      var left = Math.max(margin, Math.min(
        dragStart.left + deltaX,
        window.innerWidth - rect.width - margin,
      ));
      var top = Math.max(margin, Math.min(
        dragStart.top + deltaY,
        window.innerHeight - rect.height - margin,
      ));
      var menu = toggle.parentElement;
      menu.style.left = left + "px";
      menu.style.top = top + "px";
      menu.style.right = "auto";
      menu.style.bottom = "auto";
      if (!popup.hidden) placePopup();
    });

    function endDrag(event) {
      if (!dragStart || dragStart.pointerId !== event.pointerId) return;
      dragStart = null;
      if (wasDragged) {
        window.setTimeout(function () {
          wasDragged = false;
        }, 0);
      }
    }

    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    toggle.addEventListener("click", function (event) {
      if (!wasDragged) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      wasDragged = false;
    });

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      popup.hidden = expanded;
      if (!expanded) placePopup();
    });

    window.addEventListener("resize", function () {
      if (!popup.hidden) placePopup();
    });

    document.addEventListener("click", function (event) {
      if (!popup.hidden && !event.target.closest(".achievement-menu")) {
        closePopup(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !popup.hidden) closePopup(true);
    });
  }

  function handlePageVisible() {
    if (document.visibilityState !== "visible" || !state.pendingToast.length) return;

    var lightbox = document.getElementById("lb");
    var pendingIds = state.pendingToast.filter(function (id) {
      return id !== "certified-third-wheeler" || !lightbox || lightbox.hidden;
    });
    if (!pendingIds.length) return;

    state.pendingToast = state.pendingToast.filter(function (id) {
      return pendingIds.indexOf(id) === -1;
    });
    storeState();

    pendingIds.forEach(function (id) {
      var definition = getAchievementById(id);
      if (definition) showToast(definition);
    });
  }

  function bindMapsAchievement() {
    var mapsLink = document.querySelector("#venue a[href*='google.com/maps']");
    if (!mapsLink) return;

    mapsLink.addEventListener("click", function () {
      unlockAchievement("google-maps-expert", true);
    });
  }

  function handleRsvpSuccess(event) {
    var wish = event.detail && event.detail.wish;
    if (typeof wish === "string" && wish.trim()) {
      unlockAchievement("the-blessing");
    }
  }

  function bindColorButtons() {
    var colorButtons = document.querySelectorAll("#dress .dot[data-color]");
    colorButtons.forEach(function (button) {
      button.addEventListener("click", handleColorClick);
    });
  }

  function bindFirstContact() {
    var openCard = document.getElementById("openCard");
    if (openCard) {
      openCard.addEventListener("click", function () {
        unlockAchievement("first-contact");
      });
    }
  }

  function observeWhenAvailable(selector, onAvailable) {
    var element = document.querySelector(selector);
    if (element) {
      onAvailable(element);
      return;
    }

    if (!("MutationObserver" in window)) return;

    var observer = new MutationObserver(function () {
      var readyElement = document.querySelector(selector);
      if (!readyElement) return;
      observer.disconnect();
      onAvailable(readyElement);
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
    });
  }

  function bindTravelCategoryProgress() {
    var tabs = document.getElementById("tabs");
    if (!tabs) return;

    tabs.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      if (button.getAttribute("aria-pressed") === "true") {
        syncTravelCategoryProgress();
      }
    });

    if ("MutationObserver" in window) {
      var tabsObserver = new MutationObserver(function () {
        syncTravelCategoryProgress();
      });
      tabsObserver.observe(tabs, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-pressed", "class"],
      });
    }

    syncTravelCategoryProgress();
  }

  function bindGalleryProgress() {
    var track = document.getElementById("galTrack");
    if (!track) return;

    document.addEventListener("wedding-gallery-changed", syncGalleryProgress);
    syncGalleryProgress();

    if ("MutationObserver" in window) {
      var galleryObserver = new MutationObserver(function () {
        syncGalleryProgress();
      });
      galleryObserver.observe(track, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  }

  function bindScrollProgress() {
    updateScrollAchievements();
    window.addEventListener("scroll", function () {
      updateScrollAchievements();
    }, { passive: true });
    window.addEventListener("resize", function () {
      updateScrollAchievements();
    });
  }

  function init() {
    loadState();
    if (getSecretGardenProgress().length >= 6 && !isUnlocked("the-secret-garden")) {
      unlockAchievement("the-secret-garden");
    }
    if ((Number(state.progress["one-more-time"]) || 0) >= 5 && !isUnlocked("one-more-time")) {
      unlockAchievement("one-more-time");
    }
    bindLanguageToggle();
    bindAchievementToggle();
    bindColorButtons();
    bindFirstContact();
    bindMapsAchievement();
    bindSecretGarden();
    document.addEventListener("wedding-rsvp-success", handleRsvpSuccess);
    observeWhenAvailable("#tabs", bindTravelCategoryProgress);
    observeWhenAvailable("#galTrack", bindGalleryProgress);
    bindScrollProgress();
    renderLanguageToggle();
    renderAchievementRows();
    maybeUnlockCompletionist();
    maybeUnlockTouchGrassLater();
    queueUnlockedAchievementStats();
    flushStatsOutbox();
    document.addEventListener("visibilitychange", handlePageVisible);
    window.addEventListener("focus", handlePageVisible);
    document.addEventListener("wedding-lightbox-closed", handlePageVisible);
    handlePageVisible();
  }

  init();
})();
