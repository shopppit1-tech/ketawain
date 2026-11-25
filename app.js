const $ = (selector) => document.querySelector(selector);
const grid = $('#ideasGrid');
const emptyState = $('#emptyState');
const searchInput = $('#searchInput');
const styleFilter = $('#styleFilter');
const durationFilter = $('#durationFilter');
const favoriteFilter = $('#favoriteFilter');
const sortSelect = $('#sortSelect');
const modalBackdrop = $('#modalBackdrop');
const toast = $('#toast');
let activeCategory = 'all';
let activeIdea = null;
let favorites = new Set(JSON.parse(localStorage.getItem('ketawain-favorites') || '[]'));

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const colorMap = {coral:'#ff6b5f',mint:'#b8ead7',yellow:'#f7d26d',violet:'#c4b4f5',blue:'#afc8ee',pink:'#f2b3d0',orange:'#ffc09b'};

styles.forEach((style) => styleFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(style)}">${escapeHtml(style)}</option>`));
durations.sort().forEach((duration) => durationFilter.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(duration)}">${escapeHtml(duration)}</option>`));
const categoryCounts = ideas.reduce((counts, idea) => ({...counts, [idea.category]: (counts[idea.category] || 0) + 1}), {});
document.querySelectorAll('.collection-pill').forEach((pill) => {
  const count = pill.querySelector('span');
  if (pill.dataset.category !== 'all' && count) count.textContent = categoryCounts[pill.dataset.category] || 0;
});
$('#totalCount').textContent = ideas.length;
$('#styleCount').textContent = styles.length;
$('#categoryCount').textContent = categories.length;

function saveFavorites(){ localStorage.setItem('ketawain-favorites', JSON.stringify([...favorites])); }
function updateFavoriteCounts(){ $('#favoriteCount').textContent = favorites.size; $('#navFavCount').textContent = favorites.size; }
function showToast(message){ toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200); }
function getFilteredIdeas(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = ideas.filter((idea) => {
    const haystack = [idea.title,idea.category,idea.style,idea.subject,idea.summary,idea.setup,idea.trigger,idea.punchline].join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (activeCategory === 'all' || idea.category === activeCategory) && (styleFilter.value === 'all' || idea.style === styleFilter.value) && (durationFilter.value === 'all' || idea.duration === durationFilter.value) && (!favoriteFilter.matches('[aria-pressed="true"]') || favorites.has(idea.id));
  });
  return filtered.sort((a,b) => sortSelect.value === 'absurdity' ? b.absurdity - a.absurdity : sortSelect.value === 'title' ? a.title.localeCompare(b.title) : a.id - b.id);
}
function render(){
  const filtered = getFilteredIdeas();
  $('#resultCount').textContent = filtered.length;
  $('#resultHint').textContent = searchInput.value.trim() ? ` untuk “${searchInput.value.trim()}”` : '';
  grid.innerHTML = filtered.map((idea,index) => `
    <article class="idea-card" data-id="${idea.id}" style="animation-delay:${Math.min(index * 35, 300)}ms">
      <div class="idea-thumb" style="background:${colorMap[idea.tone] || colorMap.mint}">
        <span class="thumb-label">${escapeHtml(idea.style)}</span><span class="thumb-number">KW—${String(idea.id).padStart(2,'0')}</span>
        <span class="thumb-emoji">${idea.emoji}</span><span class="thumb-stamp">ABSURD ×${idea.absurdity}</span>
      </div>
      <div class="card-body"><div class="card-top"><span class="card-category">${escapeHtml(idea.category)} / ${escapeHtml(idea.subject)}</span><button class="favorite-button ${favorites.has(idea.id) ? 'active':''}" data-favorite="${idea.id}" type="button" aria-label="${favorites.has(idea.id) ? 'Hapus dari favorit':'Simpan ke favorit'}">${favorites.has(idea.id) ? '♥':'♡'}</button></div><h3>${escapeHtml(idea.title)}</h3><p class="card-summary">${escapeHtml(idea.summary)}</p><div class="card-foot"><span>${escapeHtml(idea.duration)} · buka resep</span><span>↗</span></div></div>
    </article>`).join('');
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
  updateFavoriteCounts();
}
function toggleFavorite(id){ if(favorites.has(id)){favorites.delete(id);showToast('Dihapus dari Lemari Favorit');}else{favorites.add(id);showToast('Disimpan ke Lemari Favorit');} saveFavorites(); render(); if(activeIdea?.id === id) updateModalFavorite(); }
function updateModalFavorite(){ const button = $('#modalFavorite'); if(!activeIdea) return; const saved = favorites.has(activeIdea.id); button.innerHTML = saved ? '♥ Tersimpan di favorit' : '♡ Simpan ke favorit'; button.classList.toggle('button-primary',!saved); button.classList.toggle('button-ghost',saved); }
function openModal(id){
  activeIdea = ideas.find((idea) => idea.id === Number(id)); if(!activeIdea) return;
  const i = activeIdea;
  $('#modalVisual').style.background = colorMap[i.tone] || colorMap.mint;
  $('#modalVisual').innerHTML = `<span class="thumb-emoji">${i.emoji}</span><span class="modal-stamp">SETUP → ABSURD → REAKSI → PUNCHLINE</span>`;
  $('#modalMeta').innerHTML = `<b>${escapeHtml(i.category)}</b><b>${escapeHtml(i.style)}</b><b>${escapeHtml(i.duration)}</b><b>ABSURD ×${i.absurdity}</b>`;
  $('#modalTitle').textContent = i.title; $('#modalSummary').textContent = i.summary;
  $('#recipeGrid').innerHTML = [['SETUP',i.setup],['PEMICU',i.trigger],['TRANSFORMASI',i.transformation],['REAKSI',i.reaction],['PUNCHLINE',i.punchline]].map(([label,text]) => `<div class="recipe-item"><span class="detail-label">${label}</span><p>${escapeHtml(text)}</p></div>`).join('');
  $('#modalCamera').textContent = i.camera; $('#modalAudio').textContent = i.audio; $('#modalPrompt').textContent = i.prompt; updateModalFavorite();
  modalBackdrop.hidden = false; document.body.style.overflow = 'hidden'; $('#modalClose').focus();
}
function closeModal(){ modalBackdrop.hidden = true; document.body.style.overflow = ''; activeIdea = null; }

$('#ideasGrid').addEventListener('click',(event) => { const fav = event.target.closest('[data-favorite]'); if(fav){event.stopPropagation();toggleFavorite(Number(fav.dataset.favorite));return;} const card = event.target.closest('[data-id]'); if(card) openModal(card.dataset.id); });
[searchInput,styleFilter,durationFilter,sortSelect].forEach((input) => input.addEventListener('input',render));
$('.collection-rail').addEventListener('click',(event) => { const button = event.target.closest('[data-category]'); if(!button) return; activeCategory = button.dataset.category; document.querySelectorAll('.collection-pill').forEach((pill) => pill.classList.toggle('active',pill === button)); render(); });
favoriteFilter.addEventListener('click',() => { const active = favoriteFilter.getAttribute('aria-pressed') === 'true'; favoriteFilter.setAttribute('aria-pressed',String(!active)); render(); });
$('#resetButton').addEventListener('click',() => { searchInput.value='';styleFilter.value='all';durationFilter.value='all';sortSelect.value='index';favoriteFilter.setAttribute('aria-pressed','false');activeCategory='all';document.querySelectorAll('.collection-pill').forEach((pill,index) => pill.classList.toggle('active',index===0));render(); });
$('#shuffleButton').addEventListener('click',() => { const pool = getFilteredIdeas().length ? getFilteredIdeas() : ideas; const idea = pool[Math.floor(Math.random()*pool.length)]; openModal(idea.id); });
$('#favoritesNav').addEventListener('click',() => { document.querySelector('#koleksi').scrollIntoView({behavior:'smooth'}); favoriteFilter.setAttribute('aria-pressed','true'); render(); });
$('#modalClose').addEventListener('click',closeModal); modalBackdrop.addEventListener('click',(event) => {if(event.target === modalBackdrop) closeModal();});
document.addEventListener('keydown',(event) => { if(event.key === 'Escape' && !modalBackdrop.hidden) closeModal(); if((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'){event.preventDefault();searchInput.focus();} });
$('#copyPrompt').addEventListener('click',async() => { if(!activeIdea) return; try{await navigator.clipboard.writeText(activeIdea.prompt);showToast('Prompt berhasil disalin');}catch{showToast('Blok prompt lalu salin manual');} });
$('#modalFavorite').addEventListener('click',() => {if(activeIdea) toggleFavorite(activeIdea.id);});
$('#modalNext').addEventListener('click',() => {if(!activeIdea)return; const pool=getFilteredIdeas();const index=pool.findIndex((idea)=>idea.id===activeIdea.id);openModal((pool[index+1] || pool[0] || ideas[0]).id);});
render();
