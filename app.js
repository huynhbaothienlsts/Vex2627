let publicData = null;
let selectedTeamId = '';

const SCORE_LABELS = [
  ['notebook', 'Engineering Notebook', 'Hồ sơ kỹ thuật và quy trình thiết kế'],
  ['interview', 'Phỏng vấn đội', 'Khả năng giải thích và làm chủ công việc'],
  ['design', 'Thiết kế robot', 'Chiến thuật, cơ cấu, độ tin cậy và cải tiến'],
  ['autonomous', 'Autonomous Skills', 'Lượt tự hành tốt nhất đã quy đổi'],
  ['driver', 'Driver Skills', 'Lượt điều khiển tốt nhất đã quy đổi']
];

function formatScore(value, digits = 2) {
  return Number(value).toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

function switchView(id) {
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === id));
  document.querySelectorAll('.nav-btn').forEach(button => button.classList.toggle('active', button.dataset.view === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resultBadge(team) {
  return team.selected
    ? '<span class="status selected">Được chọn</span>'
    : '<span class="status reserve">Dự bị</span>';
}

function renderResults() {
  const selected = publicData.teams.filter(team => team.selected);
  const rows = publicData.teams.map(team => `
    <tr data-team-row="${team.id}" tabindex="0" aria-label="Xem kết quả ${team.name}">
      <td><span class="rank ${team.rank <= 3 ? 'top' : ''}">${team.rank}</span></td>
      <td><div class="team-name">${team.name}</div><div class="team-sub">${team.division}</div></td>
      <td class="total-cell">${formatScore(team.total)}</td>
      <td>${resultBadge(team)}</td>
      <td><button class="detail-link" data-team="${team.id}">Xem điểm</button></td>
    </tr>`).join('');

  document.getElementById('results').innerHTML = `
    <section class="result-hero">
      <div class="hero-copy"><div class="eyebrow">Kết quả chính thức</div><h1>Vòng tuyển chọn<br>VEX Override</h1><p>Kết quả tổng hợp từ 5 nội dung có trọng số bằng nhau. Năm đội có tổng điểm cao nhất được lựa chọn.</p><div class="publish-meta"><span>Công bố ${publicData.publishedAt}</span><span>8 đội tham dự</span><span>5 đội được chọn</span></div></div>
      <div class="winner-card"><span class="winner-label">Dẫn đầu</span><div class="winner-rank">01</div><h2>${selected[0].name}</h2><p>${selected[0].division}</p><div class="winner-score"><b>${formatScore(selected[0].total, 1)}</b><span>/100 điểm</span></div><button class="hero-button" data-team="${selected[0].id}">Xem bảng điểm đội</button></div>
    </section>
    <section class="selected-section"><div class="section-head"><div><div class="eyebrow">Danh sách được lựa chọn</div><h2>Top 5 vòng trường</h2></div></div><div class="selected-grid">${selected.map(team => `<button class="selected-card" data-team="${team.id}"><span class="selected-rank">${String(team.rank).padStart(2, '0')}</span><span><b>${team.name}</b><small>${team.division}</small></span><strong>${formatScore(team.total, 1)}</strong></button>`).join('')}</div></section>
    <section><div class="section-head"><div><div class="eyebrow">Bảng xếp hạng</div><h2>Kết quả tổng hợp</h2><p>Chọn một đội để xem điểm chi tiết của 5 nội dung.</p></div></div><div class="panel table-wrap"><table><thead><tr><th>Hạng</th><th>Đội</th><th>Tổng /100</th><th>Kết quả</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></section>
    <p class="privacy-note">Trang công khai chỉ hiển thị điểm tổng hợp. Phiếu chấm chi tiết, nhận xét và thông tin Ban giám khảo được lưu nội bộ.</p>`;
  bindTeamLinks();
}

function renderTeam() {
  const team = publicData.teams.find(item => item.id === selectedTeamId) || publicData.teams[0];
  selectedTeamId = team.id;
  const scoreRows = SCORE_LABELS.map(([key, label, note]) => `
    <div class="score-row"><div class="score-copy"><b>${label}</b><span>${note}</span></div><div class="score-track"><span style="width:${Math.min(100, team[key] / 20 * 100)}%"></span></div><strong>${formatScore(team[key])}<small>/20</small></strong></div>`).join('');
  document.getElementById('team').innerHTML = `
    <section class="team-page">
      <div class="team-toolbar"><div><div class="eyebrow">Kết quả theo đội</div><h1>Chọn đội để xem</h1></div><label for="team-select">Đội thi<select id="team-select">${publicData.teams.map(item => `<option value="${item.id}" ${item.id === team.id ? 'selected' : ''}>Hạng ${item.rank} · ${item.name}</option>`).join('')}</select></label></div>
      <div class="team-result-card"><div class="team-result-head"><div><span class="rank large ${team.rank <= 3 ? 'top' : ''}">${team.rank}</span><div><div class="eyebrow">${team.division}</div><h2>${team.name}</h2></div></div>${resultBadge(team)}</div><div class="total-display"><span>Tổng điểm</span><b>${formatScore(team.total)}</b><small>/100</small></div><div class="score-breakdown">${scoreRows}</div><div class="sum-note">Mỗi nội dung tối đa 20 điểm. Tổng điểm là tổng của 5 nội dung.</div></div>
      <div class="team-nav"><button id="previous-team" ${team.rank === 1 ? 'disabled' : ''}>← Đội xếp trên</button><button data-view="results">Về bảng tổng hợp</button><button id="next-team" ${team.rank === publicData.teams.length ? 'disabled' : ''}>Đội xếp dưới →</button></div>
    </section>`;
  document.getElementById('team-select').addEventListener('change', event => { selectedTeamId = event.target.value; renderTeam(); });
  document.getElementById('previous-team').addEventListener('click', () => { selectedTeamId = publicData.teams[team.rank - 2].id; renderTeam(); });
  document.getElementById('next-team').addEventListener('click', () => { selectedTeamId = publicData.teams[team.rank].id; renderTeam(); });
  document.querySelector('#team [data-view="results"]').addEventListener('click', () => switchView('results'));
}

function renderMethod() {
  document.getElementById('method').innerHTML = `
    <section class="method-hero"><div class="eyebrow">Thang điểm chung</div><h1>5 nội dung × 20 điểm</h1><p>Mỗi nội dung chiếm 20% tổng kết quả. Tổng điểm tối đa của một đội là 100.</p></section>
    <div class="method-grid">
      <article><span>01</span><h2>Engineering Notebook</h2><b>Điểm gốc ÷ 64 × 20</b><p>Đánh giá hồ sơ kỹ thuật và quy trình thiết kế của đội.</p></article>
      <article><span>02</span><h2>Phỏng vấn đội</h2><b>Điểm gốc ÷ 12 × 20</b><p>Đánh giá khả năng giải thích, hợp tác và làm chủ công việc.</p></article>
      <article><span>03</span><h2>Thiết kế robot</h2><b>Giữ nguyên điểm /20</b><p>Năm tiêu chí thiết kế, mỗi tiêu chí tối đa 4 điểm.</p></article>
      <article><span>04</span><h2>Autonomous Skills</h2><b>Điểm tốt nhất ÷ điểm dẫn đầu × 20</b><p>Lấy lượt Autonomous cao nhất trong tối đa 3 lượt.</p></article>
      <article><span>05</span><h2>Driver Skills</h2><b>Điểm tốt nhất ÷ điểm dẫn đầu × 20</b><p>Lấy lượt Driver cao nhất trong tối đa 3 lượt.</p></article>
    </div>
    <div class="formula"><b>Tổng điểm /100</b><span>Notebook + Phỏng vấn + Thiết kế robot + Autonomous + Driver</span></div>
    <div class="method-note"><b>Xử lý đồng hạng:</b> lần lượt so sánh điểm Autonomous, Driver và Phỏng vấn đã quy đổi.</div>`;
}

function bindTeamLinks() {
  document.querySelectorAll('[data-team]').forEach(button => button.addEventListener('click', () => { selectedTeamId = button.dataset.team; renderTeam(); switchView('team'); }));
  document.querySelectorAll('[data-team-row]').forEach(row => {
    row.addEventListener('click', event => { if (!event.target.closest('[data-team]')) { selectedTeamId = row.dataset.teamRow; renderTeam(); switchView('team'); } });
    row.addEventListener('keydown', event => { if (event.key === 'Enter') { selectedTeamId = row.dataset.teamRow; renderTeam(); switchView('team'); } });
  });
}

function renderError() {
  document.getElementById('results').innerHTML = '<div class="load-error"><h1>Chưa tải được kết quả</h1><p>Vui lòng tải lại trang hoặc liên hệ người phụ trách.</p></div>';
}

async function init() {
  try {
    const response = await fetch('public-results.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    publicData = await response.json();
    selectedTeamId = publicData.teams[0].id;
    renderResults();
    renderTeam();
    renderMethod();
    document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
  } catch (_) {
    renderError();
  }
}

init();
