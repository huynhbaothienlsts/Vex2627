const SHEET_NAME = 'VEX_DATA';
const HEADERS = [
  'teamId', 'teamName', 'division', 'notebook', 'interviewJson', 'designJson',
  'comments', 'judge', 'finalized', 'autoJson', 'driverJson', 'updatedAt', 'updatedBy'
];

/**
 * Chạy một lần trong Apps Script gắn với Google Sheet.
 * Sau khi chạy, mở Execution log và sao chép API_TOKEN.
 */
function setupVexApi() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Hãy tạo Apps Script từ Extensions > Apps Script trong Google Sheet.');

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  if (!properties.getProperty('API_TOKEN')) properties.setProperty('API_TOKEN', Utilities.getUuid() + Utilities.getUuid());

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#172033').setFontColor('#ffffff');
  sheet.autoResizeColumns(1, HEADERS.length);

  console.log('API_TOKEN=' + properties.getProperty('API_TOKEN'));
  console.log('SPREADSHEET_ID=' + spreadsheet.getId());
}

function doGet() {
  return jsonOutput_({ ok: true, service: 'VEX Override scoring API', version: 1 });
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    verifyToken_(params.token);
    const action = params.action || '';
    const payload = params.payload ? JSON.parse(params.payload) : {};

    if (action === 'getState') return jsonOutput_({ ok: true, teams: readTeams_() });
    if (action === 'saveTeam') return jsonOutput_(saveTeam_(payload));
    throw new Error('Action không hợp lệ.');
  } catch (error) {
    return jsonOutput_({ ok: false, error: error.message || String(error) });
  }
}

function verifyToken_(token) {
  const expected = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!expected) throw new Error('API chưa được khởi tạo. Hãy chạy setupVexApi.');
  if (!token || token !== expected) throw new Error('API token không hợp lệ.');
}

function getSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) throw new Error('Thiếu SPREADSHEET_ID. Hãy chạy setupVexApi.');
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Không tìm thấy sheet ' + SHEET_NAME + '.');
  return sheet;
}

function saveTeam_(payload) {
  if (!payload || !payload.team || !payload.team.id || !payload.data) throw new Error('Dữ liệu đội không hợp lệ.');
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sheet = getSheet_();
    const team = payload.team;
    const data = payload.data;
    const row = findTeamRow_(sheet, team.id);
    const scope = String(payload.scope || 'all');
    const serverUpdatedAt = Date.now();
    const existing = row <= sheet.getLastRow()
      ? sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0]
      : [team.id, team.name || '', team.division || '', 0, '{}', '{}', '', '', false, '[0,0,0]', '[0,0,0]', 0, ''];
    const values = [[
      team.id, team.name || '', team.division || '', Number(data.notebook || 0),
      JSON.stringify(data.interview || {}), JSON.stringify(data.design || {}),
      data.comments || '', data.judge || '', Boolean(data.finalized),
      JSON.stringify(data.auto || [0,0,0]), JSON.stringify(data.driver || [0,0,0]),
      Math.max(Number(data._updatedAt || 0), serverUpdatedAt), payload.updatedBy || ''
    ]];
    if (scope === 'notebook') {
      values[0][4] = existing[4]; values[0][5] = existing[5]; values[0][6] = existing[6];
      values[0][7] = existing[7]; values[0][8] = existing[8]; values[0][9] = existing[9]; values[0][10] = existing[10];
    } else if (scope === 'judging') {
      values[0][3] = existing[3]; values[0][9] = existing[9]; values[0][10] = existing[10];
    } else if (scope === 'skills') {
      values[0][3] = existing[3]; values[0][4] = existing[4]; values[0][5] = existing[5];
      values[0][6] = existing[6]; values[0][7] = existing[7]; values[0][8] = existing[8];
    }
    sheet.getRange(row, 1, 1, HEADERS.length).setValues(values);
    SpreadsheetApp.flush();
    return { ok: true, teamId: team.id, updatedAt: values[0][11] };
  } finally {
    lock.releaseLock();
  }
}

function findTeamRow_(sheet, teamId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 2;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat().map(String);
  const index = ids.indexOf(String(teamId));
  return index >= 0 ? index + 2 : lastRow + 1;
}

function readTeams_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  const rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  const teams = {};
  rows.forEach(row => {
    const id = String(row[0] || '');
    if (!id) return;
    teams[id] = {
      notebook: Number(row[3] || 0),
      interview: parseJson_(row[4], {}),
      design: parseJson_(row[5], {}),
      comments: String(row[6] || ''),
      judge: String(row[7] || ''),
      finalized: row[8] === true || String(row[8]).toLowerCase() === 'true',
      auto: parseJson_(row[9], [0,0,0]),
      driver: parseJson_(row[10], [0,0,0]),
      _updatedAt: Number(row[11] || 0)
    };
  });
  return teams;
}

function parseJson_(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; }
  catch (_) { return fallback; }
}

function jsonOutput_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
