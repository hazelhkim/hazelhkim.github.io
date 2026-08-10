/**
 * Google Apps Script: expose free/busy (no event titles) for the Meet page.
 *
 * Setup (one time):
 * 1) Go to https://script.google.com → New project (signed in as your Gmail)
 * 2) Paste this whole file into Code.gs → Save
 * 3) Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4) Google will show “Google hasn’t verified this app”
 *    That is NORMAL for a personal script you own.
 *    Click Advanced → Go to <project name> (unsafe) → Allow
 *    You are only authorizing YOUR script to read YOUR calendar.
 *    Website visitors never see this screen.
 * 5) Copy the Web app URL
 * 6) Paste it into _data/meet.yaml as google_busy_url
 *
 * Privacy: only start/end of busy blocks are returned — never titles or notes.
 */

var HORIZON_DAYS = 28;

function doGet(e) {
  var cal = CalendarApp.getDefaultCalendar();
  var now = new Date();
  var end = new Date(now.getTime() + HORIZON_DAYS * 24 * 60 * 60 * 1000);
  var events = cal.getEvents(now, end);
  var busy = [];

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    if (ev.getTransparency() === CalendarApp.EventTransparency.TRANSPARENT) {
      continue;
    }
    busy.push({
      start: ev.getStartTime().toISOString(),
      end: ev.getEndTime().toISOString(),
    });
  }

  var payload = JSON.stringify({
    busy: busy,
    updated: now.toISOString(),
  });

  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + payload + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(payload).setMimeType(
    ContentService.MimeType.JSON
  );
}
