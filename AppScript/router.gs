function doPost(e) {
  var endpoint = e && e.parameter && e.parameter.endpoint;
  switch (endpoint) {
    case "rsvp":
      return handleRsvpPost(e);
    case "achievement-stats":
      return handleAchievementPost(e);
    default:
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        error: "Unknown endpoint."
      })).setMimeType(ContentService.MimeType.JSON);
  }
}
