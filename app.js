const TEAMS = [
  { id: 'spark', name: 'LSTS Spark', division: 'Middle School', interview: '16:00–16:10', skills: '15:00–15:10' },
  { id: 'nexus', name: 'LSTS Nexus', division: 'Middle School', interview: '16:10–16:20', skills: '15:10–15:20' },
  { id: 'singularity', name: 'LSTS Singularity', division: 'High School', interview: '15:00–15:10', skills: '16:00–16:10' },
  { id: 'vertex', name: 'LSTS Vertex', division: 'High School', interview: '15:10–15:20', skills: '16:10–16:20' },
  { id: 'curiosity', name: 'LSTS Curiosity', division: 'Middle School', interview: '15:20–15:30', skills: '15:40–15:50' },
  { id: 'peak', name: 'LSTS Peak', division: 'Middle School', interview: '15:30–15:40', skills: '15:50–16:00' },
  { id: 'noname', name: 'LSTS Noname', division: 'Middle School', interview: '15:40–15:50', skills: '15:20–15:30' },
  { id: 'flying-fish', name: 'LSTS Flying Fish', division: 'Middle School', interview: '15:50–16:00', skills: '15:30–15:40' }
];

const INTERVIEW = [
  ['own-work', 'Học sinh giải thích công việc của chính mình', 'Robot, code hoặc chiến thuật hoạt động thế nào; vì sao chọn giải pháp đó.'],
  ['trace-process', 'Truy vết được quá trình phát triển', 'Các lần thử theo thứ tự; thất bại và bước tiếp theo; điều làm thay đổi suy nghĩ.'],
  ['evidence', 'Chứng minh được giải pháp hoạt động', 'Cách kiểm thử, kết quả đo và thử nghiệm đã dẫn đến thay đổi thiết kế.'],
  ['learn-together', 'Học hỏi cùng nhau', 'Thành viên dạy nhau kỹ năng; bổ sung câu trả lời; có sự hiểu biết chung.'],
  ['shared-decisions', 'Cùng nhau ra quyết định', 'Cách đạt đồng thuận; xử lý bất đồng; quyết định do học sinh thực hiện.'],
  ['adapt-ideas', 'Biến ý tưởng bên ngoài thành của đội', 'Ghi nguồn, điều chỉnh cho robot, kiểm thử và hiểu vì sao giải pháp hoạt động.']
];

const DESIGN = [
  {
    id: 'strategy-fit', title: 'Phù hợp chiến thuật Override',
    levels: [
      'Không giải thích được mối liên hệ giữa thiết kế và chiến thuật.',
      'Thiết kế có chức năng cơ bản nhưng mục tiêu chiến thuật còn mơ hồ.',
      'Thiết kế hỗ trợ một số nhiệm vụ ghi điểm; có lý do lựa chọn ở mức cơ bản.',
      'Thiết kế bám sát các ưu tiên ghi điểm, có cân nhắc đánh đổi và tình huống thi đấu.',
      'Kiến trúc robot tích hợp rõ chiến thuật Autonomous và Driver; các ưu tiên, đánh đổi và phương án ứng biến được chứng minh bằng dữ liệu.'
    ]
  },
  {
    id: 'mechanism', title: 'Hiệu quả cơ cấu và hệ thống',
    levels: [
      'Cơ cấu chưa vận hành hoặc đội không giải thích được.',
      'Cơ cấu thực hiện được một phần nhiệm vụ nhưng thiếu ổn định hoặc khó điều khiển.',
      'Các cơ cấu chính vận hành được; bố trí và truyền động nhìn chung hợp lý.',
      'Cơ cấu phối hợp hiệu quả, xử lý game object ổn định và có giải thích kỹ thuật rõ ràng.',
      'Cơ cấu đạt hiệu suất cao, phối hợp mượt, tận dụng tốt không gian/công suất và có số liệu chứng minh chu kỳ hoặc độ chính xác.'
    ]
  },
  {
    id: 'reliability', title: 'Độ tin cậy và khả năng bảo trì',
    levels: [
      'Robot không bảo đảm vận hành an toàn hoặc không hoàn thành kiểm tra cơ bản.',
      'Có lỗi thường xuyên; dây điện, kết cấu hoặc quyền truy cập bảo trì còn bất hợp lý.',
      'Robot vận hành được; kết cấu và dây điện tương đối gọn, có thể sửa chữa.',
      'Robot chắc chắn, dây điện an toàn, thay pin/sửa lỗi nhanh; đội nhận diện được điểm hỏng chính.',
      'Thiết kế có chủ đích cho độ bền và bảo trì; có kiểm thử tải/chu kỳ, giải pháp dự phòng và minh chứng độ ổn định.'
    ]
  },
  {
    id: 'iteration', title: 'Cải tiến dựa trên thử nghiệm',
    levels: [
      'Không có bằng chứng thử nghiệm hoặc cải tiến.',
      'Có thay đổi nhưng không nêu nguyên nhân hay kết quả.',
      'Có ít nhất một vòng thử–sửa, nhưng dữ liệu hoặc liên kết còn hạn chế.',
      'Nhiều lần lặp có kết quả định tính/định lượng và giải thích rõ quyết định.',
      'Chuỗi nguyên mẫu–đo lường–phân tích–cải tiến liên tục; dữ liệu cho thấy hiệu suất tăng rõ rệt và có kế hoạch thử tiếp theo.'
    ]
  },
  {
    id: 'ownership', title: 'Sáng tạo và mức độ học sinh làm chủ',
    levels: [
      'Học sinh không giải thích được thiết kế hoặc phần lớn công việc không do đội thực hiện.',
      'Giải pháp chủ yếu sao chép; hiểu biết và sự tham gia của học sinh còn hạn chế.',
      'Học sinh giải thích được phần việc; có điều chỉnh ý tưởng tham khảo cho robot.',
      'Đội làm chủ thiết kế, phân công rõ và có những lựa chọn sáng tạo phù hợp nhu cầu.',
      'Đội thể hiện hiểu biết sâu, sáng tạo có mục đích, ghi nguồn đầy đủ và mọi thành viên có thể chứng minh vai trò trong quá trình phát triển.'
    ]
  }
];

const STORAGE_KEY = 'vex-override-selection-v1';
const SYNC_CONFIG_KEY = 'vex-override-gas-config-v1';
let state = loadState();
let syncConfig = loadSyncConfig();
let selectedJudgeTeam = TEAMS[0].id;
let selectedSkillTeam = TEAMS[0].id;
let syncTimers = {};

function emptyTeamState() {
  return { notebook: 0, interview: {}, design: {}, comments: '', judge: '', finalized: false, auto: [0,0,0], driver: [0,0,0], _updatedAt: 0 };
}

function loadSyncConfig() {
  try { return JSON.parse(localStorage.getItem(SYNC_CONFIG_KEY)) || { url: '', token: '', judgeName: '' }; }
  catch (_) { return { url: '', token: '', judgeName: '' }; }
}

function loadState() {
  const base = Object.fromEntries(TEAMS.map(t => [t.id, emptyTeamState()]));
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.teams) Object.keys(base).forEach(id => base[id] = { ...base[id], ...stored.teams[id] });
  } catch (_) {}
  return { teams: base, updatedAt: Date.now() };
}

function saveState(message = 'Đã lưu', teamId = '', scope = 'all') {
  if (teamId) state.teams[teamId]._updatedAt = Date.now();
  state.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setSyncStatus(syncConfig.url ? `${message} · chờ đồng bộ` : `${message} trên thiết bị`, syncConfig.url ? 'syncing' : '');
  if (teamId && syncConfig.url) queueTeamSync(teamId, scope);
}

function setSyncStatus(text, kind = '') {
  const pill = document.getElementById('syncConfig');
  if (!pill) return;
  pill.classList.toggle('syncing', kind === 'syncing');
  pill.classList.toggle('error', kind === 'error');
  document.getElementById('saveStatus').textContent = text;
}

function normalizeGasUrl(url) {
  const value = String(url || '').trim();
  return value.endsWith('/exec') ? value : '';
}

async function gasRequest(action, payload = {}) {
  if (!syncConfig.url) throw new Error('Chưa cấu hình URL Apps Script');
  const body = new URLSearchParams({ action, token: syncConfig.token, payload: JSON.stringify(payload) });
  const response = await fetch(syncConfig.url, { method: 'POST', body, redirect: 'follow', credentials: 'omit' });
  if (!response.ok) throw new Error(`Máy chủ trả về ${response.status}`);
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || 'Không thể đồng bộ');
  return result;
}

function queueTeamSync(teamId, scope) {
  const key = `${teamId}:${scope}`;
  clearTimeout(syncTimers[key]);
  syncTimers[key] = setTimeout(() => syncTeam(teamId, scope), 500);
}

async function syncTeam(teamId, scope = 'all') {
  try {
    setSyncStatus('Đang đồng bộ Google Sheets…', 'syncing');
    const team = TEAMS.find(t => t.id === teamId);
    await gasRequest('saveTeam', { team, data: state.teams[teamId], scope, updatedBy: syncConfig.judgeName || state.teams[teamId].judge || 'Không rõ' });
    setSyncStatus(`Đã đồng bộ · ${new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}`);
  } catch (error) {
    setSyncStatus('Lỗi đồng bộ · bấm để kiểm tra', 'error');
    toast(`Chưa đồng bộ được: ${error.message}`);
  }
}

async function pullRemoteState(showMessage = true) {
  if (!syncConfig.url) return;
  try {
    setSyncStatus('Đang tải dữ liệu chung…', 'syncing');
    const result = await gasRequest('getState');
    Object.entries(result.teams || {}).forEach(([id, remote]) => {
      if (state.teams[id] && Number(remote._updatedAt || 0) >= Number(state.teams[id]._updatedAt || 0)) state.teams[id] = { ...state.teams[id], ...remote };
    });
    state.updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderAll();
    setSyncStatus(`Đã đồng bộ · ${new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}`);
    if (showMessage) toast('Đã tải dữ liệu mới nhất từ Google Sheets');
  } catch (error) {
    setSyncStatus('Lỗi kết nối · bấm để cấu hình', 'error');
    if (showMessage) toast(`Không thể tải dữ liệu: ${error.message}`);
  }
}

async function configureSync() {
  const url = prompt('Dán URL Web App Google Apps Script (phải kết thúc bằng /exec):', syncConfig.url || '');
  if (url === null) return;
  const normalized = normalizeGasUrl(url);
  if (!normalized) { toast('URL chưa đúng. Hãy dùng URL triển khai kết thúc bằng /exec'); return; }
  const token = prompt('Dán API token do hàm setupVexApi tạo:', syncConfig.token || '');
  if (token === null || !token.trim()) { toast('Cần API token để bảo vệ dữ liệu'); return; }
  const judgeName = prompt('Tên thiết bị hoặc ban giám khảo:', syncConfig.judgeName || '');
  syncConfig = { url: normalized, token: token.trim(), judgeName: (judgeName || '').trim() };
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(syncConfig));
  await pullRemoteState();
}

function sumValues(obj) { return Object.values(obj || {}).reduce((a,b) => a + Number(b || 0), 0); }
function best(arr) { return Math.max(0, ...(arr || []).map(Number)); }
function round(n, d=1) { const p = 10 ** d; return Math.round((Number(n)+Number.EPSILON)*p)/p; }
function scoreTeam(teamState, maxAuto, maxDriver) {
  const notebook = Number(teamState.notebook || 0) / 64 * 20;
  const interview = sumValues(teamState.interview) / 12 * 20;
  const design = sumValues(teamState.design);
  const auto = maxAuto ? best(teamState.auto) / maxAuto * 20 : 0;
  const driver = maxDriver ? best(teamState.driver) / maxDriver * 20 : 0;
  return { notebook, interview, design, auto, driver, total: notebook + interview + design + auto + driver };
}

function rankedTeams() {
  const maxAuto = Math.max(...TEAMS.map(t => best(state.teams[t.id].auto)), 0);
  const maxDriver = Math.max(...TEAMS.map(t => best(state.teams[t.id].driver)), 0);
  return TEAMS.map(team => ({ team, raw: state.teams[team.id], score: scoreTeam(state.teams[team.id],maxAuto,maxDriver) }))
    .sort((a,b) => b.score.total-a.score.total || b.score.auto-a.score.auto || b.score.driver-a.score.driver || b.score.interview-a.score.interview || a.team.name.localeCompare(b.team.name));
}

function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === id));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  window.scrollTo({top:0,behavior:'smooth'});
}

function toast(text) {
  const el = document.getElementById('toast'); el.textContent = text; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove('show'),2200);
}

function renderOverview() {
  const ranked = rankedTeams();
  const complete = TEAMS.filter(t => state.teams[t.id].finalized).length;
  const skillsDone = TEAMS.filter(t => best(state.teams[t.id].auto) > 0 && best(state.teams[t.id].driver) > 0).length;
  const notebookDone = TEAMS.filter(t => Number(state.teams[t.id].notebook) > 0).length;
  const rows = ranked.map((r,i) => `<tr>
    <td><span class="rank ${i<3?'top':''}">${i+1}</span></td>
    <td><div class="team-name">${r.team.name}</div><div class="team-sub">${r.team.division}</div></td>
    <td>${round(r.score.notebook)}</td><td>${round(r.score.interview)}</td><td>${round(r.score.design)}</td>
    <td>${round(r.score.auto)}</td><td>${round(r.score.driver)}</td>
    <td class="score-big">${round(r.score.total,2)}</td>
    <td>${i<5?'<span class="qualify">Top 5</span>':'<span class="pending">Dự bị</span>'}</td>
  </tr>`).join('');
  document.getElementById('overview').innerHTML = `
    <div class="hero">
      <div><div class="eyebrow">V5RC 2026–2027 · Override</div><h1>Chọn 5 đội từ 8 đội<br>trên một thang điểm chung.</h1><p>Mỗi nội dung đóng góp tối đa 20 điểm. Hệ thống lưu điểm trên thiết bị này, tự chuẩn hóa Robot Skills và cập nhật thứ hạng ngay khi có dữ liệu.</p></div>
      <div class="hero-stats"><div class="hero-stat"><b>8</b><span>đội tham dự</span></div><div class="hero-stat"><b>5 × 20</b><span>điểm đánh giá</span></div><div class="hero-stat"><b>2</b><span>phòng chấm độc lập</span></div><div class="hero-stat"><b>Top 5</b><span>được đề xuất lựa chọn</span></div></div>
    </div>
    <div class="section-head"><div><div class="eyebrow">Tiến độ ngày thi</div><h2>Tình trạng nhập điểm</h2></div><div class="actions"><button class="btn dark" id="syncNow">Đồng bộ ngay</button><button class="btn" id="exportCsv">Xuất CSV</button><button class="btn" id="exportJson">Sao lưu JSON</button><button class="btn danger" id="resetData">Xóa dữ liệu thử</button></div></div>
    <div class="metric-grid">
      <div class="metric"><div class="metric-label">PHỎNG VẤN & THIẾT KẾ</div><div class="metric-value">${complete}/8</div><div class="metric-note">phiếu đã hoàn tất</div></div>
      <div class="metric"><div class="metric-label">ROBOT SKILLS</div><div class="metric-value">${skillsDone}/8</div><div class="metric-note">đủ cả hai nội dung</div></div>
      <div class="metric"><div class="metric-label">ENGINEERING NOTEBOOK</div><div class="metric-value">${notebookDone}/8</div><div class="metric-note">đã nhập điểm /64</div></div>
      <div class="metric"><div class="metric-label">DỮ LIỆU LƯU</div><div class="metric-value">Cục bộ</div><div class="metric-note">bản thử nghiệm trên thiết bị</div></div>
    </div>
    <div class="section-head"><div><div class="eyebrow">Bảng điều hành</div><h2>Xếp hạng tổng hợp</h2><p>Skills được chuẩn hóa theo điểm cao nhất trong 8 đội; hòa điểm xét Autonomous, Driver, rồi Phỏng vấn.</p></div></div>
    <div class="panel table-wrap"><table><thead><tr><th>#</th><th>Đội</th><th>Notebook<br>/20</th><th>Phỏng vấn<br>/20</th><th>Robot<br>/20</th><th>Auto<br>/20</th><th>Driver<br>/20</th><th>Tổng<br>/100</th><th>Kết quả</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="section-head"><div><div class="eyebrow">Quản trị điểm</div><h2>Nhập Engineering Notebook</h2></div></div>
    <div class="panel form-panel"><div class="admin-grid">${TEAMS.map(t=>`<div class="admin-input"><label for="nb-${t.id}">${t.name}</label><input id="nb-${t.id}" data-notebook="${t.id}" type="number" min="0" max="64" value="${state.teams[t.id].notebook || ''}" placeholder="/64"></div>`).join('')}</div></div>`;
  bindOverview();
}

function scoreOptions(type, criterionId, max, current) {
  const name = `${type}-${criterionId}`;
  return `<div><div class="score-options ${max===2?'interview':''}">${Array.from({length:max+1},(_,i)=>`<span><input type="radio" id="${name}-${i}" name="${name}" value="${i}" ${Number(current)===i?'checked':''}><label for="${name}-${i}">${i}</label></span>`).join('')}</div><div class="score-legend"><span>Chưa thể hiện</span><span>${max===2?'Cụ thể':'Xuất sắc'}</span></div></div>`;
}

function renderJudging() {
  const team = TEAMS.find(t=>t.id===selectedJudgeTeam); const d = state.teams[team.id];
  const intTotal = sumValues(d.interview); const desTotal = sumValues(d.design);
  const completed = Object.keys(d.interview).length + Object.keys(d.design).length;
  const teamOptions = TEAMS.map(t=>`<option value="${t.id}" ${t.id===team.id?'selected':''}>${t.name}</option>`).join('');
  document.getElementById('judging').innerHTML = `<div class="section-head"><div><div class="eyebrow">Phòng 228 · Ban giám khảo</div><h1>Phỏng vấn & Thiết kế robot</h1><p>Phiếu điện tử kết hợp rubric chính thức 12 điểm và rubric thiết kế 20 điểm.</p></div></div>
  <div class="grid-2">
    <aside class="panel sidebar">
      <div class="field"><label for="judge-team">Chọn đội</label><select id="judge-team">${teamOptions}</select></div>
      <div class="field"><label for="judge-name">Tên giám khảo / nhóm giám khảo</label><input id="judge-name" type="text" value="${escapeHtml(d.judge)}" placeholder="Ví dụ: Ban giám khảo 1"></div>
      <div class="schedule-card"><h3>Lịch của đội</h3><div class="schedule-row"><span>Phỏng vấn</span><b>${team.interview} · Phòng 228</b></div><div class="schedule-row"><span>Skills</span><b>${team.skills} · Phòng 207</b></div><div class="completion"><span style="width:${completed/11*100}%"></span></div><p>${completed}/11 tiêu chí đã chọn</p></div>
      <div class="note">Chỉ bấm “Hoàn tất phiếu” sau khi đã thống nhất điểm. Bản thử nghiệm vẫn cho phép mở lại và chỉnh sửa.</div>
    </aside>
    <div class="panel form-panel">
      <div class="form-title"><div><div class="eyebrow">${team.division}</div><h2>${team.name}</h2><p>${d.finalized?'Phiếu đã hoàn tất':'Phiếu đang chấm'}</p></div><div class="total-badge"><b>${intTotal + desTotal}</b><small>/ 32 điểm gốc</small></div></div>
      <div class="rubric-group"><div class="rubric-group-head"><h3>Phỏng vấn kỹ thuật</h3><b>${intTotal}/12</b></div>
        ${INTERVIEW.map(([id,title,help])=>`<div class="rubric-row"><div class="criterion-title">${title}</div><div class="criterion-help">${help}</div>${scoreOptions('interview',id,2,d.interview[id])}</div>`).join('')}
      </div>
      <div class="rubric-group"><div class="rubric-group-head"><h3>Thiết kế robot</h3><b>${desTotal}/20</b></div>
        ${DESIGN.map(item=>`<div class="rubric-row"><div class="criterion-title">${item.title}</div><div class="criterion-help">0: ${item.levels[0]}<br>4: ${item.levels[4]}</div>${scoreOptions('design',item.id,4,d.design[item.id])}</div>`).join('')}
      </div>
      <div class="field"><label for="judge-comments">Nhận xét và minh chứng chính</label><textarea id="judge-comments" placeholder="Ghi lại minh chứng cụ thể, điểm mạnh và đề xuất cải thiện…">${escapeHtml(d.comments)}</textarea></div>
      <div class="actions"><button class="btn primary" id="finalizeJudge">${d.finalized?'Mở lại phiếu':'Hoàn tất phiếu'}</button><button class="btn" data-view="rubric">Xem rubric đầy đủ</button></div>
    </div>
  </div>`;
  bindJudging();
}

function renderSkills() {
  const team = TEAMS.find(t=>t.id===selectedSkillTeam); const d = state.teams[team.id];
  document.getElementById('skills').innerHTML = `<div class="section-head"><div><div class="eyebrow">Phòng 207 · Ban giám khảo Skills</div><h1>Robot Skills</h1><p>Mỗi đội có tối đa 3 lượt Autonomous và 3 lượt Driver; hệ thống lấy điểm cao nhất.</p></div></div>
  <div class="panel form-panel" style="margin-bottom:18px"><div class="field" style="max-width:430px;margin:0"><label for="skill-team">Đội đang thi · ${team.skills}</label><select id="skill-team">${TEAMS.map(t=>`<option value="${t.id}" ${t.id===team.id?'selected':''}>${t.name} — ${t.skills}</option>`).join('')}</select></div></div>
  <div class="skills-layout">
    ${skillCard('auto','Autonomous Skills','Robot tự hành',d.auto)}
    ${skillCard('driver','Driver Skills','Điều khiển bởi học sinh',d.driver)}
  </div>
  <div class="note" style="margin-top:18px">Nhập 0 cho lượt hợp lệ nhưng không ghi điểm. Nếu lượt bị hủy, để trống và ghi vào biên bản vận hành. Điểm quy đổi được tính tương đối theo điểm tốt nhất của toàn bộ 8 đội.</div>`;
  bindSkills();
}

function skillCard(mode,title,chip,values) {
  return `<div class="panel skills-card"><div class="skills-head"><div><h2>${title}</h2><p>${chip}</p></div><span class="mode-chip">Tốt nhất / 3 lượt</span></div><div class="attempt-grid">${[0,1,2].map(i=>`<div class="attempt"><label for="${mode}-${i}">Lượt ${i+1}</label><input id="${mode}-${i}" data-skill-mode="${mode}" data-skill-index="${i}" type="number" min="0" step="1" value="${values[i]||''}" placeholder="Điểm"></div>`).join('')}</div><div class="best-score"><span>Điểm tốt nhất</span><b>${best(values)}</b></div></div>`;
}

function renderRubric() {
  document.getElementById('rubric').innerHTML = `<div class="rubric-page"><div class="rubric-hero"><div class="eyebrow">Rubric nội bộ · 20 điểm</div><h1>Đánh giá Thiết kế robot</h1><p>Giám khảo chấm những gì học sinh có thể giải thích và chứng minh trên robot. Mỗi hàng chọn một mức từ 0 đến 4; tổng tối đa 20 điểm và được quy đổi trực tiếp thành 20% kết quả.</p></div>
  <div class="panel rubric-table"><table><thead><tr><th>Tiêu chí</th><th class="level-4">4 · Xuất sắc</th><th class="level-3">3 · Thành thạo</th><th class="level-2">2 · Đang phát triển</th><th class="level-1">1 · Bắt đầu</th><th class="level-0">0 · Chưa thể hiện</th></tr></thead><tbody>
  ${DESIGN.map(d=>`<tr><td>${d.title}</td><td>${d.levels[4]}</td><td>${d.levels[3]}</td><td>${d.levels[2]}</td><td>${d.levels[1]}</td><td>${d.levels[0]}</td></tr>`).join('')}</tbody></table></div>
  <div class="section-head"><div><h2>Hướng dẫn sử dụng</h2></div></div><div class="panel form-panel"><p><b>Minh chứng ưu tiên:</b> quan sát robot, giải thích trực tiếp của học sinh, dữ liệu thử nghiệm và sự liên hệ với Engineering Notebook. Không chấm cao chỉ vì robot đẹp hoặc phức tạp.</p><p><b>Robot Inspection:</b> là điều kiện hợp lệ riêng, không cộng vào 20 điểm thiết kế. Đội chưa PASS cần hoàn tất thay đổi trước khi được chạy Skills.</p><p><b>Nguyên tắc:</b> nếu minh chứng nằm giữa hai mức, chọn mức thấp hơn và ghi điều còn thiếu trong phần nhận xét.</p></div></div>`;
}

function renderGame() {
  document.getElementById('game').innerHTML = `
    <div class="game-page">
      <section class="game-hero">
        <div class="game-hero-copy">
          <div class="eyebrow">V5RC 2026–2027</div>
          <h1>Override</h1>
          <p>Xếp Pins và Cups lên các Goal, điều khiển Toggles để sở hữu Yellow Pins, rồi đưa robot vào Midfield trước khi trận đấu kết thúc.</p>
          <div class="game-meta"><span>Game Manual v2.0</span><span>Sân 12 × 12 ft</span><span>2 liên minh · 4 robot</span></div>
          <a class="official-link" href="https://www.vexrobotics.com/v5/competition" target="_blank" rel="noopener">Xem luật chính thức ↗</a>
        </div>
        <div class="game-hero-art"><img src="assets/images/override-logo.jpg" alt="VEX V5 Robotics Competition Override"></div>
      </section>

      <div class="panel video-panel">
        <div class="video-frame">
          <iframe src="https://www.youtube.com/embed/68NxYIAzbkY?si=AsBlzY7C0NYf6T9s" title="Video giới thiệu VEX V5 Robotics Competition Override" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="video-copy"><div class="eyebrow">Video giới thiệu</div><h2 style="margin-top:8px">Xem Override vận hành</h2><p>Quan sát cách Pins, Cups, Goals, Toggles và Midfield kết hợp trong một trận đấu trước khi đọc phần tóm tắt luật bên dưới.</p></div>
      </div>

      <div class="section-head"><div><div class="eyebrow">Cách ghi điểm</div><h2>Bốn nguồn điểm chính</h2><p>Điểm được xác định sau khi trận đấu kết thúc và các vật thể đã dừng.</p></div></div>
      <div class="score-strip">
        <div class="score-tile"><b>12</b><span>điểm Autonomous Bonus cho liên minh thắng giai đoạn tự hành</span></div>
        <div class="score-tile"><b>5</b><span>điểm cho mỗi Alliance-colored Pin được Scored</span></div>
        <div class="score-tile"><b>10</b><span>điểm cho mỗi Yellow Pin được liên minh sở hữu</span></div>
        <div class="score-tile"><b>8</b><span>điểm cho mỗi robot kết thúc trận trong Midfield</span></div>
      </div>

      <div class="game-intro-grid">
        <figure class="game-visual-card"><img src="assets/images/field.png" alt="Toàn cảnh sân thi đấu V5RC Override"><figcaption>Sân thi đấu Override với các Goal, Toggles, Loaders và Midfield.</figcaption></figure>
        <div class="panel game-facts"><div class="eyebrow">Cấu trúc trận đấu</div><h2 style="margin-top:8px">15 giây tự hành, 1 phút 45 giây điều khiển</h2><p>Hai liên minh Đỏ và Xanh, mỗi liên minh gồm hai đội, thi đấu để đạt tổng điểm cao hơn.</p><div class="fact-list"><div class="fact"><b>56</b><span>Cups trên toàn sân</span></div><div class="fact"><b>63</b><span>Pins trên toàn sân</span></div><div class="fact"><b>9</b><span>Goals: 4 Short, 1 Tall và 4 Alliance Goals</span></div><div class="fact"><b>4 + 4</b><span>Toggles và Loaders</span></div></div><div class="source-note">Yellow Pin được 10 điểm cho liên minh sở hữu Toggle trong Quadrant tương ứng. Vì vậy, điều khiển Toggle có thể thay đổi giá trị của nhiều Pin cùng lúc.</div></div>
      </div>

      <div class="section-head"><div><div class="eyebrow">Luật cần nhớ</div><h2>Những giới hạn ảnh hưởng trực tiếp đến thiết kế</h2></div></div>
      <div class="rule-grid">
        <article class="rule-card"><span class="rule-code">SG2 · SG3</span><h3>Giới hạn mở rộng</h3><p>Trong trận, robot không được vượt quá kích thước ngang 24 × 24 inch và chiều cao tổng thể 50 inch, trừ những ngoại lệ được nêu rõ cho Endgame.</p></article>
        <article class="rule-card"><span class="rule-code">SG5</span><h3>Mỗi robot có một Preload</h3><p>Mỗi robot bắt đầu với một Alliance-colored Pin hợp lệ, tiếp xúc robot cùng màu và không tiếp xúc vật thể hoặc Field Element khác.</p></article>
        <article class="rule-card"><span class="rule-code">SG6</span><h3>Giới hạn Possession</h3><p>Robot chỉ được Possess tối đa một Pin và một Cup cùng lúc. Khi vượt giới hạn, robot phải ngừng các hành động khác để xử lý vật thể dư.</p></article>
        <article class="rule-card"><span class="rule-code">SG7</span><h3>Tôn trọng Autonomous Line</h3><p>Trong Autonomous, robot không được tác động lên phần sân, vật thể hoặc Field Element ở phía đối phương của Autonomous Line.</p></article>
        <article class="rule-card"><span class="rule-code">SG12</span><h3>Endgame thay đổi luật</h3><p>Trong Endgame, robot không được Place Scoring Objects lên Midfield Goal. Tranh chấp Midfield có thể mạnh và robot phải chấp nhận rủi ro tương tác cao hơn.</p></article>
        <article class="rule-card"><span class="rule-code">SG13</span><h3>Load Zone được bảo vệ</h3><p>Trong Driver Control, robot đang ở Load Zone của liên minh mình được bảo vệ. Đối thủ không được cản trở, chiếm giữ hoặc làm tích tụ vật thể tại Load Zone đó.</p></article>
      </div>

      <div class="section-head"><div><div class="eyebrow">Robot Skills</div><h2>Những điểm khác với trận đối kháng</h2></div></div>
      <div class="panel skills-explainer">
        <img src="assets/images/scoring-elements.png" alt="Cup và Pin của game Override">
        <div class="skills-copy"><h3>Thi đấu với một robot</h3><p>Robot bắt đầu ở Quadrant cạnh Red Alliance Station; Drive Team ở Red Alliance Station. Match Loads được đưa vào qua Red Alliance Loaders. Robot có thể thêm hoặc lấy Pins và Cups trên tất cả các Goals và di chuyển tự do sau khi trận bắt đầu.</p><p><b>Tính điểm Skills:</b> mỗi Red hoặc Blue Pin hợp lệ được 5 điểm; mỗi Yellow Pin được sở hữu được 10 điểm; robot kết thúc trong Midfield được 8 điểm. Yellow Pins trong Midfield được sở hữu nếu robot kết thúc trận trong Midfield.</p><p>Bản chấm vòng trường lấy điểm tốt nhất của Autonomous Skills và Driver Skills, sau đó chuẩn hóa riêng từng nội dung về tối đa 20 điểm.</p></div>
      </div>

      <div class="source-note"><b>Lưu ý:</b> Trang này chỉ là bản tóm tắt để học sinh và giám khảo tra cứu nhanh. Game Manual tiếng Anh phiên bản hiện hành và hệ thống Q&amp;A chính thức luôn có giá trị cao hơn nếu có khác biệt.</div>
    </div>`;
}

function renderGuide() {
  document.getElementById('guide').innerHTML = `
    <div class="guide-hero">
      <div class="eyebrow">Dành cho Ban giám khảo</div>
      <h1>Hướng dẫn chấm và nhập điểm</h1>
      <p>Thực hiện theo đúng phần việc của phòng mình. Mọi thay đổi được lưu trước trên thiết bị rồi đồng bộ lên Google Sheets.</p>
    </div>
    <div class="guide-grid">
      <article class="guide-card wide">
        <div class="guide-number">1</div>
        <h3>Chuẩn bị trước khi chấm</h3>
        <div class="connection-steps">
          <div class="connection-step"><b>Kết nối dữ liệu</b><span>Bấm trạng thái ở góc trên bên phải, nhập URL Apps Script, API token và tên giám khảo hoặc phòng thi.</span></div>
          <div class="connection-step"><b>Kiểm tra đồng bộ</b><span>Vào Tổng quan, bấm “Đồng bộ ngay”. Chỉ bắt đầu khi trạng thái hiển thị “Đã đồng bộ”.</span></div>
          <div class="connection-step"><b>Đúng thiết bị</b><span>Dùng trình duyệt thông thường, không dùng cửa sổ ẩn danh. Giữ nguyên một trình duyệt trong suốt buổi thi.</span></div>
        </div>
      </article>

      <article class="guide-card">
        <div class="guide-number">2</div>
        <h3>Phòng 228 · Phỏng vấn và Robot</h3>
        <ol>
          <li>Mở <strong>Phỏng vấn & Robot</strong> và chọn đúng đội theo lịch.</li>
          <li>Nhập tên giám khảo hoặc tên nhóm giám khảo.</li>
          <li>Chấm đủ 6 tiêu chí phỏng vấn, mỗi tiêu chí 0–2 điểm.</li>
          <li>Chấm đủ 5 tiêu chí thiết kế robot, mỗi tiêu chí 0–4 điểm.</li>
          <li>Ghi nhận xét bằng minh chứng cụ thể từ câu trả lời, robot hoặc dữ liệu thử nghiệm.</li>
          <li>Kiểm tra đủ 11/11 tiêu chí rồi bấm <strong>Hoàn tất phiếu</strong>.</li>
        </ol>
      </article>

      <article class="guide-card">
        <div class="guide-number">3</div>
        <h3>Phòng 207 · Robot Skills</h3>
        <ol>
          <li>Mở <strong>Robot Skills</strong> và chọn đúng đội theo khung giờ.</li>
          <li>Nhập điểm từng lượt Autonomous vào đúng ô.</li>
          <li>Nhập điểm từng lượt Driver vào đúng ô.</li>
          <li>Nhập <strong>0</strong> nếu lượt hợp lệ nhưng không ghi được điểm.</li>
          <li>Để trống lượt không diễn ra hoặc bị hủy; ghi vào biên bản vận hành nếu cần.</li>
          <li>Hệ thống tự lấy điểm cao nhất trong tối đa 3 lượt của mỗi nội dung.</li>
        </ol>
      </article>

      <article class="guide-card">
        <div class="guide-number">4</div>
        <h3>Nguyên tắc chấm</h3>
        <ul>
          <li>Chỉ chấm những gì học sinh <strong>giải thích hoặc chứng minh được</strong>.</li>
          <li>Nếu minh chứng nằm giữa hai mức, chọn mức thấp hơn và ghi phần còn thiếu.</li>
          <li>Robot Inspection là điều kiện hợp lệ riêng, không cộng vào điểm thiết kế robot.</li>
          <li>Không xem bảng xếp hạng tạm thời để điều chỉnh điểm đã chấm.</li>
          <li>Không chia sẻ nhận xét hoặc điểm chi tiết ra ngoài Ban giám khảo.</li>
        </ul>
      </article>

      <article class="guide-card">
        <div class="guide-number">5</div>
        <h3>Khi mất mạng hoặc lỗi đồng bộ</h3>
        <ol>
          <li>Tiếp tục nhập điểm; dữ liệu vẫn được lưu trên thiết bị.</li>
          <li>Không tải lại trang liên tục và không đổi sang trình duyệt khác.</li>
          <li>Khi mạng trở lại, bấm <strong>Đồng bộ ngay</strong>.</li>
          <li>Nếu vẫn báo lỗi, ghi lại đội và điểm trên giấy, rồi báo người phụ trách hệ thống.</li>
          <li>Không bấm “Xóa dữ liệu thử” trong thời gian thi.</li>
        </ol>
      </article>

      <article class="guide-card wide">
        <div class="guide-number">6</div>
        <h3>Kiểm tra trước khi kết thúc</h3>
        <div class="do-dont">
          <div class="do-list"><h3>Nên làm</h3><ul><li>Đối chiếu tên đội và khung giờ.</li><li>Chấm đủ mọi tiêu chí.</li><li>Ghi nhận xét ngắn nhưng có minh chứng.</li><li>Xác nhận trạng thái “Đã đồng bộ”.</li><li>Báo người phụ trách nếu cần mở lại phiếu.</li></ul></div>
          <div class="dont-list"><h3>Không nên làm</h3><ul><li>Chấm thay cho phòng khác.</li><li>Dùng nút quay lại để đổi dữ liệu.</li><li>Chia sẻ API token.</li><li>Xóa dữ liệu hoặc xóa lịch sử trình duyệt.</li><li>Cho học sinh xem điểm hay bảng xếp hạng tạm thời.</li></ul></div>
        </div>
      </article>
    </div>`;
}

function bindOverview() {
  document.querySelectorAll('[data-notebook]').forEach(input=>input.addEventListener('change',e=>{
    const id=e.target.dataset.notebook; state.teams[id].notebook=Math.min(64,Math.max(0,Number(e.target.value||0))); saveState('Đã lưu Notebook', id, 'notebook'); renderOverview();
  }));
  document.getElementById('syncNow').onclick = () => syncConfig.url ? pullRemoteState() : configureSync();
  document.getElementById('exportCsv').onclick = exportCsv;
  document.getElementById('exportJson').onclick = exportJson;
  document.getElementById('resetData').onclick = () => { if(confirm('Xóa toàn bộ dữ liệu thử trên thiết bị này?')) { localStorage.removeItem(STORAGE_KEY); state=loadState(); renderAll(); toast('Đã xóa dữ liệu thử'); } };
}

function bindJudging() {
  document.getElementById('judge-team').onchange=e=>{selectedJudgeTeam=e.target.value;renderJudging()};
  document.getElementById('judge-name').onchange=e=>{state.teams[selectedJudgeTeam].judge=e.target.value.trim();saveState('Đã lưu',selectedJudgeTeam,'judging')};
  document.getElementById('judge-comments').onchange=e=>{state.teams[selectedJudgeTeam].comments=e.target.value;saveState('Đã lưu',selectedJudgeTeam,'judging')};
  document.querySelectorAll('input[type=radio]').forEach(r=>r.onchange=e=>{const [type,...rest]=e.target.name.split('-'); const id=rest.join('-'); state.teams[selectedJudgeTeam][type][id]=Number(e.target.value);saveState('Đã lưu',selectedJudgeTeam,'judging');renderJudging()});
  document.getElementById('finalizeJudge').onclick=()=>{const d=state.teams[selectedJudgeTeam]; if(!d.finalized && (Object.keys(d.interview).length<6 || Object.keys(d.design).length<5)){toast('Cần chấm đủ 11 tiêu chí trước khi hoàn tất');return;} d.finalized=!d.finalized;saveState(d.finalized?'Đã hoàn tất phiếu':'Đã mở lại phiếu',selectedJudgeTeam,'judging');renderAll();toast(d.finalized?'Phiếu đã hoàn tất':'Phiếu đã mở lại')};
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
}

function bindSkills() {
  document.getElementById('skill-team').onchange=e=>{selectedSkillTeam=e.target.value;renderSkills()};
  document.querySelectorAll('[data-skill-mode]').forEach(input=>input.onchange=e=>{const {skillMode,skillIndex}=e.target.dataset; state.teams[selectedSkillTeam][skillMode][Number(skillIndex)]=Math.max(0,Number(e.target.value||0));saveState('Đã lưu lượt chạy',selectedSkillTeam,'skills');renderAll();switchView('skills');toast('Đã cập nhật điểm Skills')});
}

function exportCsv() {
  const rows=[['Rank','Team','Division','Notebook Raw','Notebook /20','Interview Raw','Interview /20','Robot Design /20','Auto Best','Auto /20','Driver Best','Driver /20','Total /100','Selected']];
  rankedTeams().forEach((r,i)=>rows.push([i+1,r.team.name,r.team.division,r.raw.notebook,round(r.score.notebook,2),sumValues(r.raw.interview),round(r.score.interview,2),round(r.score.design,2),best(r.raw.auto),round(r.score.auto,2),best(r.raw.driver),round(r.score.driver,2),round(r.score.total,2),i<5?'Yes':'No']));
  download('ket-qua-vex-override.csv','\ufeff'+rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n'),'text/csv;charset=utf-8'); toast('Đã xuất bảng kết quả CSV');
}
function exportJson(){download('vex-override-backup.json',JSON.stringify({exportedAt:new Date().toISOString(),...state},null,2),'application/json');toast('Đã tạo bản sao lưu JSON')}
function download(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function escapeHtml(value=''){return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

function renderAll(){renderOverview();renderJudging();renderSkills();renderGame();renderRubric();renderGuide()}
document.addEventListener('click',e=>{const btn=e.target.closest('[data-view]');if(btn)switchView(btn.dataset.view)});
renderAll();
document.getElementById('syncConfig').onclick = configureSync;
if (syncConfig.url) pullRemoteState(false); else setSyncStatus('Chưa kết nối Google Sheets');
