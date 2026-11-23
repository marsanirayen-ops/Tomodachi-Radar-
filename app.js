// ==================== STATO APPLICAZIONE ====================
let currency = 'JPY';
const JPY_TO_EUR = 0.0061;

// Utente inizialmente NON registrato (visitatore)
let currentUser = null;
let pendingEventId = null;

let filters = {
  zone: 'ALL',
  type: 'ALL',
  date: 'ALL'
};

// Catalogo eventi Tokyo (tutti con posti disponibili)
let eventsData = [
  {
    id: 1,
    title: "Shibuya Yakitori & Craft Beer Night",
    type: "Izakaya Night",
    zone: "Shibuya",
    dateTag: "Stasera",
    dateText: "Stasera • 19:30 – 22:00",
    venue: "Izakaya Hanabi (3 min da Shibuya Hachiko)",
    host: "Kenji (26, Tokyo) & Sofia (24, Milano)",
    priceJpy: 4000,
    maxPerSide: 4,
    intlBooked: 2,
    jpBooked: 2,
    sponsor: "Asahi Super Dry Welcome Drink",
    program: [
      "19:30 — Ritrovo all'uscita Hachiko e ice-breaker game",
      "20:00 — Cena izakaya con 6 portate condivise + 2 drink inclusi",
      "21:30 — Cambio posti al tavolo e scambio contatti LINE / IG"
    ],
    mates: [
      { name: "Yuna (23)", role: "🇯🇵 Local • Waseda Univ.", line: "yuna_tokyo23", ig: "@yuna.in.tokyo" },
      { name: "Liam (25)", role: "🇨🇦 Working Holiday", line: "liam_jp26", ig: "@liamexplores" },
      { name: "Haruto (27)", role: "🇯🇵 Local • Designer", line: "haruto_shibuya", ig: "@haruto.ui" }
    ]
  },
  {
    id: 2,
    title: "Shinjuku Neon Karaoke Crew",
    type: "Karaoke Crew",
    zone: "Shinjuku",
    dateTag: "Stasera",
    dateText: "Stasera • 20:30 – 23:00",
    venue: "Big Echo Kabukicho VIP Room",
    host: "Mina (25, Osaka/Tokyo)",
    priceJpy: 3000,
    maxPerSide: 4,
    intlBooked: 2,
    jpBooked: 1,
    sponsor: null,
    program: [
      "20:30 — Check-in e drink illimitati analcolici + 2 alcolici",
      "21:00 — Duetti misti J-Pop, Anime openings e hit internazionali",
      "22:45 — Foto di gruppo Polaroid e passaggio al bar vicino"
    ],
    mates: [
      { name: "Aoi (22)", role: "🇯🇵 Local • Studentessa", line: "aoi_sing", ig: "@aoi_jpop" },
      { name: "Chloe (24)", role: "🇫🇷 Expat • Shibuya", line: "chloe_paris_tyo", ig: "@chloetyo" }
    ]
  },
  {
    id: 3,
    title: "Ikebukuro Ramen & Retro Alley Walk",
    type: "Neighborhood Walk",
    zone: "Ikebukuro",
    dateTag: "Domani",
    dateText: "Domani • 18:30 – 20:45",
    venue: "Ikebukuro West Gate Park Fountain",
    host: "Daiki (28, Guida locale)",
    priceJpy: 2500,
    maxPerSide: 4,
    intlBooked: 1,
    jpBooked: 2,
    sponsor: "Sakura Mobile Free eSIM Trial",
    program: [
      "18:30 — Passeggiata nei vicoli storici e sale arcade retro",
      "19:15 — Degustazione taiyaki caldo e street food locale",
      "20:00 — Ciotola di ramen artigianale inclusa nel biglietto"
    ],
    mates: [
      { name: "Riku (24)", role: "🇯🇵 Local • Gamer", line: "riku_ikebukuro", ig: "@riku.retro" },
      { name: "Elena (26)", role: "🇪🇸 Language Student", line: "elena_jp", ig: "@elenatokyo" }
    ]
  },
  {
    id: 4,
    title: "Omoide Yokocho Izakaya Experience",
    type: "Izakaya Night",
    zone: "Shinjuku",
    dateTag: "Domani",
    dateText: "Domani • 19:30 – 22:00",
    venue: "Shinjuku West Memory Lane",
    host: "Taro (27) & Alex (25)",
    priceJpy: 4200,
    maxPerSide: 4,
    intlBooked: 2,
    jpBooked: 2,
    sponsor: null,
    program: [
      "19:30 — Brindisi Kampai! nei vicoli lanternati di Shinjuku",
      "20:00 — Degustazione spiedini kushiyaki e piatti tipici",
      "21:40 — Chiusura serata e suggerimenti locali per il weekend"
    ],
    mates: [
      { name: "Kenta (26)", role: "🇯🇵 Local • Engineer", line: "kenta_dev", ig: "@kenta.tokyo" },
      { name: "Sara (23)", role: "🇮🇹 Studentessa", line: "sara_tyo", ig: "@sara.nihon" }
    ]
  },
  {
    id: 5,
    title: "Shibuya Crossing & Dogenzaka Karaoke",
    type: "Karaoke Crew",
    zone: "Shibuya",
    dateTag: "Weekend",
    dateText: "Sabato • 20:00 – 22:30",
    venue: "Pasela Resorts Shibuya",
    host: "Hana (24, Bilingual Host)",
    priceJpy: 3200,
    maxPerSide: 4,
    intlBooked: 1,
    jpBooked: 1,
    sponsor: "Honey Toast gigante incluso",
    program: [
      "20:00 — Ice-breaker game a squadre Giappone vs Resto del Mondo",
      "20:30 — Karaoke libero + celebre Honey Toast di Shibuya",
      "22:15 — Scambio contatti e after-party facoltativo"
    ],
    mates: [
      { name: "Mei (22)", role: "🇯🇵 Local • Sophia Univ.", line: "mei_sophia", ig: "@mei.shibuya" }
    ]
  },
  {
    id: 6,
    title: "Ikebukuro Sunsets & Gyoza Tour",
    type: "Neighborhood Walk",
    zone: "Ikebukuro",
    dateTag: "Weekend",
    dateText: "Domenica • 17:30 – 20:00",
    venue: "Sunshine 60 Street Entrance",
    host: "Leo (25) & Natsuki (25)",
    priceJpy: 2800,
    maxPerSide: 4,
    intlBooked: 2,
    jpBooked: 1,
    sponsor: null,
    program: [
      "17:30 — Esplorazione Otome Road & Sunshine City",
      "18:30 — Degustazione gyoza artigianali in trattoria storica",
      "19:30 — Quiz culturale a premi sul Giappone"
    ],
    mates: [
      { name: "Sora (25)", role: "🇯🇵 Local • Barista", line: "sora_coffee", ig: "@sora.latte" },
      { name: "Noah (27)", role: "🇩🇪 Working Holiday", line: "noah_de_jp", ig: "@noahintokyo" }
    ]
  }
];

let myBookings = [];

// ==================== FORMATTAZIONE VALUTA ====================
function formatPrice(jpy) {
  if (currency === 'JPY') {
    return `¥${jpy.toLocaleString('it-IT')}`;
  }
  const eur = (jpy * JPY_TO_EUR).toFixed(2).replace('.', ',');
  return `€${eur}`;
}

function setCurrency(curr) {
  currency = curr;
  document.getElementById('btn-jpy').classList.toggle('active', curr === 'JPY');
  document.getElementById('btn-eur').classList.toggle('active', curr === 'EUR');
  renderEvents();
}

// ==================== FILTRI & RENDER EVENTI ====================
function setFilter(key, value, btnEl) {
  filters[key] = value;
  if (btnEl) {
    const parent = btnEl.parentElement;
    parent.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderEvents();
}

function resetFilters() {
  filters = { zone: 'ALL', type: 'ALL', date: 'ALL' };
  document.querySelectorAll('.chip-row').forEach(row => {
    row.querySelectorAll('.chip').forEach((c, idx) => c.classList.toggle('active', idx === 0));
  });
  document.getElementById('filter-date').value = 'ALL';
  renderEvents();
}

function renderEvents() {
  const grid = document.getElementById('events-grid');
  const filtered = eventsData.filter(ev => {
    const matchZone = filters.zone === 'ALL' || ev.zone === filters.zone;
    const matchType = filters.type === 'ALL' || ev.type === filters.type;
    const matchDate = filters.date === 'ALL' || ev.dateTag === filters.date;
    return matchZone && matchType && matchDate;
  });

  document.getElementById('events-counter').textContent =
    `${filtered.length} ${filtered.length === 1 ? 'serata disponibile' : 'serate disponibili'}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; background:var(--bg-card); border-radius:18px; border:1px solid var(--border);">
        <p style="margin-bottom:12px;">Nessun tavolo trovato con questi filtri.</p>
        <button class="btn-primary" onclick="resetFilters()">Mostra tutte le serate</button>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(ev => {
    const bannerClass = ev.type === 'Izakaya Night'
      ? 'banner-izakaya'
      : ev.type === 'Karaoke Crew' ? 'banner-karaoke' : 'banner-walk';

    const icon = ev.type === 'Izakaya Night' ? '🍻' : ev.type === 'Karaoke Crew' ? '🎤' : '🚶';
    const intlLeft = ev.maxPerSide - ev.intlBooked;
    const jpLeft = ev.maxPerSide - ev.jpBooked;
    const totalLeft = intlLeft + jpLeft;

    const totalSeats = ev.maxPerSide * 2;
    const intlPct = (ev.intlBooked / totalSeats) * 100;
    const jpPct = (ev.jpBooked / totalSeats) * 100;

    const isVip = currentUser && currentUser.isVip;
    const finalPrice = isVip ? Math.round(ev.priceJpy * 0.9) : ev.priceJpy;

    return `
      <article class="event-card">
        <div class="event-banner ${bannerClass}">
          <div class="banner-top">
            <span class="format-badge">${icon} ${ev.type}</span>
            <span class="zone-badge">📍 ${ev.zone}</span>
          </div>
          ${ev.sponsor ? `<div class="sponsor-pill">🎁 ${ev.sponsor}</div>` : ''}
        </div>
        <div class="event-body">
          <div class="event-date">${ev.dateText}</div>
          <h3 class="event-title">${ev.title}</h3>
          <div class="event-venue">🏠 ${ev.venue}</div>

          <div class="ratio-box">
            <div class="ratio-labels">
              <span style="color:var(--cyan)">🌍 Intl: ${ev.intlBooked}/${ev.maxPerSide}</span>
              <span style="color:var(--pink)">🇯🇵 JP: ${ev.jpBooked}/${ev.maxPerSide}</span>
            </div>
            <div class="ratio-bar">
              <div class="ratio-intl" style="width:${intlPct}%"></div>
              <div class="ratio-jp" style="width:${jpPct}%"></div>
            </div>
            <div class="spots-left">
              ● ${totalLeft} posti liberi (${intlLeft} Intl • ${jpLeft} Giapponesi)
            </div>
          </div>

          <div class="event-footer">
            <div>
              <span class="price-label">${isVip ? 'Prezzo Radar Plus (-10%)' : 'Biglietto serata'}</span>
              <span class="price-val">${formatPrice(finalPrice)}</span>
            </div>
            <button class="btn-primary" onclick="onBookClick(${ev.id})">Prenota il posto</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==================== AUTENTICAZIONE & REGISTRAZIONE ====================
function openAuthModal(tab = 'register') {
  switchAuthTab(tab);
  document.getElementById('modal-auth').classList.remove('hidden');
}

function switchAuthTab(tab) {
  const isReg = tab === 'register';
  document.getElementById('tab-register').classList.toggle('active', isReg);
  document.getElementById('tab-login').classList.toggle('active', !isReg);
  document.getElementById('form-register').classList.toggle('hidden', !isReg);
  document.getElementById('form-login').classList.toggle('hidden', isReg);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const age = document.getElementById('reg-age').value;
  const quota = document.getElementById('reg-quota').value;
  const jlpt = document.getElementById('reg-jlpt').value;
  const langs = document.getElementById('reg-langs').value.trim();
  const contact = document.getElementById('reg-contact').value.trim();

  const interests = Array.from(document.querySelectorAll('#reg-interests input:checked'))
    .map(cb => cb.value);

  currentUser = {
    name,
    age,
    quota,
    jlpt,
    langs: langs || 'Inglese',
    contact,
    interests: interests.length ? interests : ['Izakaya & Cultura'],
    isVip: false
  };

  closeModal('modal-auth');
  syncAuthUI();
  showToast(`Benvenuto su Tomodachi Radar, ${currentUser.name}! 🏮`);

  // Se l'utente aveva cliccato su un evento prima di registrarsi, apriamo subito l'evento
  if (pendingEventId) {
    const idToOpen = pendingEventId;
    pendingEventId = null;
    openEventModal(idToOpen);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const contact = document.getElementById('login-contact').value.trim();
  const derivedName = contact.includes('@') ? contact.split('@')[0] : contact;

  currentUser = {
    name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
    age: 25,
    quota: 'intl',
    jlpt: 'JLPT N4',
    langs: 'Italiano, Inglese',
    contact,
    interests: ['Ramen & Izakaya', 'Scambio Linguistico'],
    isVip: false
  };

  closeModal('modal-auth');
  syncAuthUI();
  showToast(`Bentornato, ${currentUser.name}! 👋`);

  if (pendingEventId) {
    const idToOpen = pendingEventId;
    pendingEventId = null;
    openEventModal(idToOpen);
  }
}

function handleLogout() {
  currentUser = null;
  myBookings = [];
  closeModal('modal-profile');
  syncAuthUI();
  renderEvents();
  showToast('Disconnesso. Ora navighi come visitatore.');
}

function syncAuthUI() {
  const isLogged = Boolean(currentUser);
  document.getElementById('guest-actions').classList.toggle('hidden', isLogged);
  document.getElementById('user-actions').classList.toggle('hidden', !isLogged);
  document.getElementById('guest-hero-banner').classList.toggle('hidden', isLogged);
  document.getElementById('logged-hero-banner').classList.toggle('hidden', !isLogged);
  document.getElementById('badge-bookings').textContent = myBookings.length;

  if (isLogged) {
    document.getElementById('nav-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('nav-username').textContent = currentUser.name;
    document.getElementById('hero-user-name').textContent = currentUser.name;
    document.getElementById('nav-vip-tag').classList.toggle('hidden', !currentUser.isVip);

    if (currentUser.isVip) {
      document.getElementById('hero-vip-status').innerHTML =
        'Sei membro <strong>★ Radar Plus</strong>: -10% e zero fee attivi su ogni tavolo!';
      document.getElementById('btn-hero-vip').textContent = '★ Radar Plus Attivo';
    } else {
      document.getElementById('hero-vip-status').innerHTML =
        'Passa a <strong>Radar Plus (¥980/mese)</strong> per prenotazione prioritaria, zero fee e -10% su tutti i tavoli.';
      document.getElementById('btn-hero-vip').textContent = '★ Attiva Radar Plus';
    }
  }
}

// ==================== PRENOTAZIONE & CHECKOUT ====================
let selectedQuota = 'intl';

function onBookClick(eventId) {
  if (!currentUser) {
    pendingEventId = eventId;
    showToast('Registrati in 30 secondi per bloccare il tuo posto al tavolo!');
    openAuthModal('register');
    return;
  }
  openEventModal(eventId);
}

function openEventModal(eventId) {
  const ev = eventsData.find(e => e.id === eventId);
  if (!ev) return;

  selectedQuota = currentUser ? currentUser.quota : 'intl';
  const intlLeft = ev.maxPerSide - ev.intlBooked;
  const jpLeft = ev.maxPerSide - ev.jpBooked;

  if (selectedQuota === 'intl' && intlLeft <= 0) selectedQuota = 'jp';
  if (selectedQuota === 'jp' && jpLeft <= 0) selectedQuota = 'intl';

  const isVip = currentUser && currentUser.isVip;
  const finalPrice = isVip ? Math.round(ev.priceJpy * 0.9) : ev.priceJpy;

  document.getElementById('event-modal-body').innerHTML = `
    <div class="event-date">${ev.dateText} • 📍 ${ev.zone}</div>
    <h3 class="modal-title">${ev.title}</h3>
    <p class="modal-sub">🏠 ${ev.venue} • Host: <strong>${ev.host}</strong></p>

    <strong>Programma della serata:</strong>
    <ul class="program-list">
      ${ev.program.map(step => `<li>• ${step}</li>`).join('')}
    </ul>

    <strong>Scegli la tua quota al tavolo (equilibrio 50/50):</strong>
    <div class="quota-selector">
      <button type="button" id="q-intl" class="quota-option ${selectedQuota === 'intl' ? 'selected' : ''}"
        onclick="selectQuota('intl')" ${intlLeft <= 0 ? 'disabled' : ''}>
        <strong>🌍 Quota Internazionale</strong><br>
        <span class="muted-text">${intlLeft} posti rimasti</span>
      </button>
      <button type="button" id="q-jp" class="quota-option ${selectedQuota === 'jp' ? 'selected' : ''}"
        onclick="selectQuota('jp')" ${jpLeft <= 0 ? 'disabled' : ''}>
        <strong>🇯🇵 Quota Giapponese</strong><br>
        <span class="muted-text">${jpLeft} posti rimasti</span>
      </button>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-input); padding:14px; border-radius:12px;">
      <div>
        <span class="muted-text" style="font-size:12px;">Totale da pagare (inclusa garanzia anti no-show)</span>
        <div style="font-size:22px; font-weight:800;">${formatPrice(finalPrice)}</div>
      </div>
      <span style="font-size:12px; color:var(--matcha); font-weight:700;">Conferma istantanea LINE + Email</span>
    </div>

    <div class="pay-methods">
      <button class="btn-apple" onclick="completeBooking(${ev.id}, 'Apple Pay')"> Pay (Express)</button>
      <button class="btn-primary" onclick="completeBooking(${ev.id}, 'Carta (Stripe)')">💳 Paga con Carta</button>
    </div>
  `;

  document.getElementById('modal-event').classList.remove('hidden');
}

function selectQuota(q) {
  selectedQuota = q;
  document.getElementById('q-intl').classList.toggle('selected', q === 'intl');
  document.getElementById('q-jp').classList.toggle('selected', q === 'jp');
}

function completeBooking(eventId, method) {
  const ev = eventsData.find(e => e.id === eventId);
  if (!ev) return;

  if (selectedQuota === 'intl' && ev.intlBooked < ev.maxPerSide) {
    ev.intlBooked++;
  } else if (selectedQuota === 'jp' && ev.jpBooked < ev.maxPerSide) {
    ev.jpBooked++;
  }

  const isVip = currentUser && currentUser.isVip;
  const paidJpy = isVip ? Math.round(ev.priceJpy * 0.9) : ev.priceJpy;

  myBookings.push({
    bookingCode: 'TR-' + Math.floor(100000 + Math.random() * 900000),
    eventId: ev.id,
    quota: selectedQuota,
    paidJpy,
    method,
    feedbackLeft: false,
    contactsUnlocked: false
  });

  closeModal('modal-event');
  syncAuthUI();
  renderEvents();
  showToast(`Posto confermato per "${ev.title}"! Promemoria inviato su LINE 📲`);
  openMyEventsModal();
}

// ==================== PROFILO & RADAR PLUS ====================
function openProfileModal() {
  if (!currentUser) {
    openAuthModal('register');
    return;
  }
  document.getElementById('profile-details').innerHTML = `
    <p><strong>Nome:</strong> ${currentUser.name} (${currentUser.age} anni)</p>
    <p><strong>Quota:</strong> ${currentUser.quota === 'jp' ? '🇯🇵 Giapponese (Local)' : '🌍 Internazionale'}</p>
    <p><strong>Livello Giapponese:</strong> ${currentUser.jlpt}</p>
    <p><strong>Lingue:</strong> ${currentUser.langs}</p>
    <p><strong>Contatto LINE / Email:</strong> ${currentUser.contact}</p>
    <p><strong>Interessi:</strong> ${currentUser.interests.join(', ')}</p>
    <p><strong>Piano:</strong> ${currentUser.isVip ? '★ Radar Plus (Attivo)' : 'Standard Pay-per-event'}</p>
  `;
  document.getElementById('modal-profile').classList.remove('hidden');
}

function openVipModal() {
  if (!currentUser) {
    showToast('Registrati prima per attivare Radar Plus!');
    openAuthModal('register');
    return;
  }

  const area = document.getElementById('vip-action-area');
  if (currentUser.isVip) {
    area.innerHTML = `
      <div style="background:rgba(16,185,129,0.12); border:1px solid var(--matcha); padding:14px; border-radius:12px; text-align:center; font-weight:700; color:var(--matcha);">
        ✓ Il tuo abbonamento Radar Plus è già attivo!
      </div>`;
  } else {
    area.innerHTML = `
      <button class="btn-gold btn-block" onclick="activateVip()">
        Attiva Radar Plus ora (${formatPrice(980)}/mese)
      </button>`;
  }
  document.getElementById('modal-vip').classList.remove('hidden');
}

function activateVip() {
  currentUser.isVip = true;
  closeModal('modal-vip');
  syncAuthUI();
  renderEvents();
  showToast('★ Radar Plus attivato! Sconto 10% e zero fee applicati.');
}

// ==================== LE MIE SERATE & POST-EVENTO ====================
function openMyEventsModal() {
  if (!currentUser) {
    showToast('Accedi o registrati per vedere i tuoi biglietti.');
    openAuthModal('register');
    return;
  }

  const list = document.getElementById('my-events-list');
  if (myBookings.length === 0) {
    list.innerHTML = `
      <div style="text-align:center; padding:30px; background:var(--bg-input); border-radius:14px;">
        <p class="muted-text" style="margin-bottom:12px;">Non hai ancora prenotato nessuna serata a Tokyo.</p>
        <button class="btn-primary" onclick="closeModal('modal-my-events')">Esplora i tavoli di stasera</button>
      </div>`;
  } else {
    list.innerHTML = myBookings.map((b, idx) => {
      const ev = eventsData.find(e => e.id === b.eventId);
      return `
        <div class="ticket-card">
          <div class="ticket-top">
            <div>
              <span class="event-date">${ev.dateText} • ${ev.zone}</span>
              <h4 style="font-size:17px; margin:3px 0;">${ev.title}</h4>
              <p class="muted-text" style="font-size:12.5px;">🏠 ${ev.venue}</p>
              <p style="font-size:12px; margin-top:6px;">
                Quota: <strong>${b.quota === 'jp' ? '🇯🇵 Giapponese' : '🌍 Internazionale'}</strong> • Pagato: <strong>${formatPrice(b.paidJpy)}</strong> (${b.method})
              </p>
            </div>
            <div class="qr-box">
              [QR PASS]<br>${b.bookingCode}
            </div>
          </div>

          <div class="tablemates-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="font-size:13px;">Post-Evento: Compagni di tavolo & Feedback</strong>
              ${!b.contactsUnlocked
                ? `<button class="btn-ghost" style="padding:5px 10px; font-size:12px;" onclick="unlockContacts(${idx})">Simula fine serata & Sblocca Contatti</button>`
                : `<span style="color:var(--matcha); font-size:12px; font-weight:700;">✓ Contatti sbloccati</span>`
              }
            </div>
            ${b.contactsUnlocked ? `
              <div>
                ${ev.mates.map(m => `
                  <div class="mate-row">
                    <span><strong>${m.name}</strong> — <span class="muted-text">${m.role}</span></span>
                    <span style="color:var(--cyan); font-weight:700;">LINE: ${m.line} • IG: ${m.ig}</span>
                  </div>
                `).join('')}
                <div style="margin-top:10px; display:flex; gap:8px;">
                  <button class="btn-primary" style="padding:6px 12px; font-size:12px;" onclick="showToast('Grazie per il feedback sull\'Host! ⭐')">⭐ Valuta Host 5/5</button>
                </div>
              </div>
            ` : `<p class="muted-text" style="font-size:12px;">I profili LINE e Instagram del tuo tavolo si sbloccano automaticamente al termine della serata per restare in contatto.</p>`}
          </div>
        </div>
      `;
    }).join('');
  }

  document.getElementById('modal-my-events').classList.remove('hidden');
}

function unlockContacts(bookingIdx) {
  myBookings[bookingIdx].contactsUnlocked = true;
  openMyEventsModal();
  showToast('Contatti LINE e Instagram del tavolo sbloccati! 🎉');
}

// ==================== UTILITIES ====================
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
}

// Avvio iniziale
syncAuthUI();
renderEvents();
