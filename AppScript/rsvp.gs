/**
 * รับคำตอบ RSVP จากเว็บการ์ดแต่งงาน แล้วเขียนลงชีท
 * ไฟล์: T&T_Wedding Planner  ·  แท็บ: [Respond]Guest list
 *
 * วิธีใช้: ดู README หัวข้อ "เชื่อมฟอร์มตอบรับกับ Google Sheet"
 */
var RSVP_SHEET_NAME = '[Respond]Guest list';

// หัวคอลัมน์ในแถวที่ 1 (ถ้าแท็บยังว่าง สคริปต์จะสร้างให้เอง)
// ถ้าชีทมีหัวคอลัมน์อยู่แล้วและชื่อต่างจากนี้ ให้แก้ชื่อฝั่งซ้ายให้ตรงกับในชีท
var COLUMNS = {
  'วันเวลาที่ตอบ':        function (p) { return new Date(); },
  'ชื่อ-นามสกุล':         function (p) { return p.name; },
  'แก้งค์':              function (p) { return p.gang; },
  'สถานะ':               function (p) { return p.attend; },
  'จำนวนคน':             function (p) { return Number(p.count || 0); },
  'ช่วงที่ร่วม':           function (p) { return p.part; },
  'ข้อความถึงบ่าวสาว':     function (p) { return p.wish; }
};

function handleRsvpPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    if (!p.name) return out({ ok: false, error: 'missing name' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(RSVP_SHEET_NAME) || ss.insertSheet(RSVP_SHEET_NAME);
    var names = Object.keys(COLUMNS);

    if (sh.getLastRow() === 0) {
      sh.appendRow(names);
      sh.setFrozenRows(1);
    }
    var header = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
    names.forEach(function (n) {               // เติมหัวคอลัมน์ที่ยังไม่มี
      if (header.indexOf(n) === -1) {
        header.push(n);
        sh.getRange(1, header.length).setValue(n);
      }
    });

    var row = header.map(function (h) {
      return COLUMNS[h] ? clean(COLUMNS[h](p)) : '';
    });
    sh.appendRow(row);
    return out({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// กันสูตรแปลก ๆ ที่แขกพิมพ์มา เช่น =IMPORTXML(...)
function clean(v) {
  if (typeof v === 'string') {
    v = v.slice(0, 1000);
    if (/^[=+\-@]/.test(v)) v = "'" + v;
  }
  return v;
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
