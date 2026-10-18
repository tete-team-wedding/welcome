var SPREADSHEET_ID = "13QOvAMPbrk6pwLJVs6K-HUFqOjfw6nDUeDsj-qZkhjA";
var SHEET_NAME = "[Stats]eCard Achievement";

var ACHIEVEMENT_IDS = [
  "achievementFirstContact",
  "countdown-started",
  "definitely-not-planning-trips",
  "color-me-impressed",
  "certified-third-wheeler",
  "the-grand-tour",
  "bilingual",
  "completionist",
  "google-maps-expert",
  "the-secret-garden",
  "the-whole-story",
  "one-more-time",
  "the-blessing",
];

var COMPLETION_HEADERS = [
  "Player ID",
  "Achievement ID",
  "Completed at",
  "Received at",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var completion = parseCompletion(e);
    lock.waitLock(10000);
    var sheet = ensureHeaders(getStatisticsSheet());
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var previousCompletions = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
      var isDuplicate = previousCompletions.some(function (row) {
        return row[0] === completion.playerId && row[1] === completion.achievementId;
      });
      if (isDuplicate) return jsonResponse({ ok: true, duplicate: true });
    }

    sheet.appendRow([
      completion.playerId,
      completion.achievementId,
      new Date(completion.completedAt),
      new Date(),
    ]);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function parseCompletion(e) {
  if (!e || !e.postData || typeof e.postData.contents !== "string") {
    throw new Error("Missing event payload.");
  }

  var completion;
  try {
    completion = JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error("Invalid JSON completion payload.");
  }

  if (!completion || typeof completion.playerId !== "string" ||
      !/^[a-f0-9-]{36}$/i.test(completion.playerId)) {
    throw new Error("Invalid player ID.");
  }
  if (ACHIEVEMENT_IDS.indexOf(completion.achievementId) === -1) {
    throw new Error("Invalid achievement ID.");
  }

  var completedAt = new Date(completion.completedAt);
  if (!completion.completedAt || isNaN(completedAt.getTime())) {
    throw new Error("Invalid completion timestamp.");
  }

  return {
    playerId: completion.playerId,
    achievementId: completion.achievementId,
    completedAt: completedAt.toISOString(),
  };
}

function getStatisticsSheet() {
  var spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Bind this script to a spreadsheet or set SPREADSHEET_ID.");
  }

  var sheet = spreadsheet.getSheetByName(SHEET_NAME || "Achievement statistics");
  if (!sheet && !SHEET_NAME) sheet = spreadsheet.insertSheet("Achievement statistics");
  if (!sheet) throw new Error("The configured statistics sheet was not found.");
  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, COMPLETION_HEADERS.length).setValues([COMPLETION_HEADERS]);
    return sheet;
  }

  var headers = sheet.getRange(1, 1, 1, COMPLETION_HEADERS.length).getValues()[0];
  if (COMPLETION_HEADERS.every(function (header, index) {
    return headers[index] === header;
  })) {
    return sheet;
  }

  throw new Error("The statistics sheet has unexpected headers. Check the configured SHEET_NAME.");
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
