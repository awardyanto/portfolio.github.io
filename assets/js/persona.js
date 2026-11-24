document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('portfolio_lang') || 'id';
  let activeSection = null;

  // =========================================
  // 1. SYNTHESIZED SFX ALA PERSONA 5 (Web Audio API)
  // =========================================
  let audioCtx = null;
  const getAudioCtx = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  };

  const playSfx = (type) => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(720, now);
        osc.frequency.exponentialRampToValueAtTime(1280, now + 0.035);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'select') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.14);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'cancel') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(95, now + 0.09);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.11);
      }
    } catch (_) {}
  };

  // =========================================
  // 2. GENERATOR TEKS RANSOM-NOTE
  // =========================================
  const buildRansomText = (el, text) => {
    const wordBox = el.querySelector('.rn-word');
    if (!wordBox) return;
    wordBox.innerHTML = '';
    const chars = text.split('');
    chars.forEach((ch, idx) => {
      const span = document.createElement('span');
      span.className = 'rn-char';
      if (ch === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = ch;
        if (idx === 0 || idx === chars.length - 2) span.classList.add('inv');
        else if (idx === Math.floor(chars.length / 2)) span.classList.add('red');
      }
      wordBox.appendChild(span);
    });
  };

  // =========================================
  // 3. PARALLAX MENU (DESKTOP)
  // =========================================
  const stage = document.querySelector('.p5-stage');
  const leftMenu = document.querySelector('.left-menu');

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 820 || !leftMenu) return;
    const xRatio = e.clientX / window.innerWidth - 0.5;
    const yRatio = e.clientY / window.innerHeight - 0.5;
    leftMenu.style.transform = `translate3d(${xRatio * 10}px, calc(-50% + ${yRatio * 8}px), 0)`;
  });

  // =========================================
  // 4. DATA KONTEN BILINGUAL (ID & EN)
  // =========================================
  const data = {
    id: {
      yen: 'TAHUN',
      menu: {
        overview: 'RINGKASAN',
        experience: 'PENGALAMAN',
        skills: 'KEAHLIAN',
        projects: 'PROYEK',
        contact: 'KONTAK',
        resume: 'RESUME',
        certificates: 'SERTIFIKAT'
      },
      overview: {
        code: '00 // CAREER_BRIEF',
        title: 'OVERVIEW & RINGKASAN KARIR',
        html: `
          <div class="kpi-grid">
            <div class="p5-card">
              <div class="tag">00 // TENURE</div>
              <div class="big">3+ TAHUN</div>
              <div class="sub">Fraud Detection System<br>PT. Asta Protek Jiarsi (2022 – Sekarang)</div>
            </div>
            <div class="p5-card">
              <div class="tag">01 // CORE STACK</div>
              <div class="big">LARAVEL • SPRING • GO</div>
              <div class="sub">PostgreSQL • Docker • REST API</div>
            </div>
            <div class="p5-card">
              <div class="tag">02 // EDUCATION</div>
              <div class="big">S1 INFORMATIKA</div>
              <div class="sub">Universitas Pamulang (2017 – 2021)</div>
            </div>
          </div>
          <div class="p5-card">
            <div class="tag">// AGENT PROFILE — PARUNG PANJANG, KAB. BOGOR</div>
            <p style="margin-top:0.5rem; color:#ece8e1;">
              Memiliki pengalaman lebih dari 3 tahun dalam pengembangan dan pemeliharaan
              <strong>Fraud Detection System (FDS)</strong>. Berpengalaman dalam pengembangan aplikasi
              menggunakan <strong>PHP Laravel</strong> dan <strong>PostgreSQL</strong>, pengembangan fraud detection
              engine menggunakan <strong>Java Spring Boot</strong>, serta pengolahan data transaksi
              menggunakan <strong>Golang</strong>. Memiliki pengalaman dalam implementasi rules/scenario
              deteksi fraud, integrasi API, bug fixing, dan troubleshooting sistem.
            </p>
          </div>
        `
      },
      experience: {
        code: '01 // DEPLOYMENT_LOG',
        title: 'PENGALAMAN KERJA — PT. ASTA PROTEK JIARSI',
        html: `
          <div class="exp-block">
            <div class="exp-head">
              <h3>FRAUD DETECTION SUPPORT</h3>
              <span class="period-pill">2023 – SEKARANG</span>
            </div>
            <ul class="exp-list">
              <li>Mengembangkan dan menyesuaikan rules/scenario deteksi fraud menggunakan Java Spring Boot berdasarkan kebutuhan bank.</li>
              <li>Mengembangkan dan memelihara proses pengambilan data transaksi dari datasource ke database FDS menggunakan Golang.</li>
              <li>Mengembangkan dan memelihara aplikasi FDS (frontend & backend) menggunakan PHP Laravel dan PostgreSQL.</li>
              <li>Mengembangkan dan mengintegrasikan API untuk mendukung kebutuhan sistem FDS, termasuk proses account block/unblock.</li>
              <li>Menangani bug fixing, troubleshooting, serta penelusuran kendala pada proses transaksi dan suspect alerts.</li>
            </ul>
          </div>
          <div class="exp-block">
            <div class="exp-head">
              <h3>FRAUD MONITORING</h3>
              <span class="period-pill">2022 – 2023</span>
            </div>
            <ul class="exp-list">
              <li>Melakukan monitoring fraud alert selama 24 jam dengan sistem shifting.</li>
              <li>Melakukan pengecekan dan analisis terhadap suspect alerts berdasarkan hasil deteksi sistem.</li>
              <li>Melakukan penelusuran terhadap transaksi yang terindikasi fraud serta melakukan eskalasi sesuai prosedur operasional.</li>
              <li>Memantau error pada fraud detection engine dan mengidentifikasi kendala untuk ditindaklanjuti.</li>
            </ul>
          </div>
        `
      },
      skills: {
        code: '02 // LOADOUT_MATRIX',
        title: 'KETERAMPILAN & KOMPETENSI TEKNIS',
        html: `
          <div class="skill-group">
            <h4>[Q] BACKEND</h4>
            <div class="chip-wrap">
              <span class="p5-chip">PHP</span>
              <span class="p5-chip">Laravel</span>
              <span class="p5-chip">Java</span>
              <span class="p5-chip">Spring Boot</span>
              <span class="p5-chip">Golang</span>
              <span class="p5-chip">Python</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[E] FRONTEND</h4>
            <div class="chip-wrap">
              <span class="p5-chip">JavaScript</span>
              <span class="p5-chip">jQuery</span>
              <span class="p5-chip">HTML</span>
              <span class="p5-chip">CSS</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[C] DATABASE & TOOLS</h4>
            <div class="chip-wrap">
              <span class="p5-chip">PostgreSQL</span>
              <span class="p5-chip">Git</span>
              <span class="p5-chip">Docker</span>
              <span class="p5-chip">REST API</span>
              <span class="p5-chip">Nginx</span>
              <span class="p5-chip">VS Code</span>
              <span class="p5-chip">Postman</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[X] COMPETENCIES</h4>
            <div class="chip-wrap">
              <span class="p5-chip">API Integration</span>
              <span class="p5-chip">Application Development</span>
              <span class="p5-chip">FDS Rules/Scenario Development</span>
              <span class="p5-chip">Bug Fixing</span>
              <span class="p5-chip">Troubleshooting</span>
            </div>
          </div>
        `
      },
      projects: {
        code: '03 // ARCHIVE_BUILDS',
        title: 'PROYEK UNGGULAN',
        html: `
          <div class="filter-row">
            <button type="button" class="f-btn active" data-cat="all">ALL [3]</button>
            <button type="button" class="f-btn" data-cat="web">WEB</button>
            <button type="button" class="f-btn" data-cat="mobile">ANDROID</button>
            <button type="button" class="f-btn" data-cat="desktop">JAVA</button>
          </div>
          <div class="proj-grid">
            <div class="p5-card proj-item" data-cat="web">
              <div class="tag">01 // WEB (PHP & MYSQL)</div>
              <div class="big">WEB LAUNDRY MANAGEMENT</div>
              <div class="sub">Sistem informasi manajemen transaksi, pelanggan, dan laporan operasional laundry berbasis web.</div>
              <a href="https://github.com/awardyanto/weblaundry/releases/tag/weblaundry" target="_blank" rel="noopener" class="proj-link">LIHAT RELEASE ↗</a>
            </div>
            <div class="p5-card proj-item" data-cat="mobile">
              <div class="tag">02 // ANDROID (AR)</div>
              <div class="big">HIJAIYAH AR ANDROID</div>
              <div class="sub">Aplikasi edukasi interaktif pengenalan huruf Hijaiyah menggunakan teknologi Augmented Reality.</div>
              <a href="https://github.com/awardyanto/hijaiyahAR-android/releases/tag/hijaiyahAR" target="_blank" rel="noopener" class="proj-link">LIHAT RELEASE ↗</a>
            </div>
            <div class="p5-card proj-item" data-cat="desktop">
              <div class="tag">03 // DESKTOP (JAVA)</div>
              <div class="big">APLIKASI UANG KAS</div>
              <div class="sub">Aplikasi desktop berbasis Java untuk pencatatan pemasukan, pengeluaran, dan rekapitulasi saldo kas.</div>
              <a href="https://github.com/awardyanto/uangkas-java/releases/tag/uangkas" target="_blank" rel="noopener" class="proj-link">LIHAT RELEASE ↗</a>
            </div>
          </div>
        `
      },
      contact: {
        code: '04 // DIRECT_CHANNELS',
        title: 'KONTAK & JARINGAN',
        html: `
          <div class="contact-grid">
            <a href="https://wa.me/6289654915569" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-whatsapp"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">WHATSAPP / TELP</div><strong>089654915569</strong></div>
            </a>
            <a href="mailto:alfianwardyanto@gmail.com" target="_blank" rel="noopener" class="contact-item">
              <i class="fas fa-envelope"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">EMAIL</div><strong>alfianwardyanto@gmail.com</strong></div>
            </a>
            <a href="https://linkedin.com/in/alfian-wardyanto-6a5315246/" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-linkedin"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">LINKEDIN</div><strong>Alfian Wardyanto</strong></div>
            </a>
            <a href="https://github.com/awardyanto" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-github"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">GITHUB</div><strong>awardyanto</strong></div>
            </a>
            <a href="https://instagram.com/awardyanto" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-instagram"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">INSTAGRAM</div><strong>@awardyanto</strong></div>
            </a>
          </div>
        `
      }
    },
    en: {
      yen: 'YEARS',
      menu: {
        overview: 'OVERVIEW',
        experience: 'EXPERIENCE',
        skills: 'TECH STACK',
        projects: 'PROJECTS',
        contact: 'CONTACT',
        resume: 'RESUME',
        certificates: 'CERTIFICATES'
      },
      overview: {
        code: '00 // CAREER_BRIEF',
        title: 'OVERVIEW & CAREER SUMMARY',
        html: `
          <div class="kpi-grid">
            <div class="p5-card">
              <div class="tag">00 // TENURE</div>
              <div class="big">3+ YEARS</div>
              <div class="sub">Fraud Detection System<br>PT. Asta Protek Jiarsi (2022 – Present)</div>
            </div>
            <div class="p5-card">
              <div class="tag">01 // CORE STACK</div>
              <div class="big">LARAVEL • SPRING • GO</div>
              <div class="sub">PostgreSQL • Docker • REST API</div>
            </div>
            <div class="p5-card">
              <div class="tag">02 // EDUCATION</div>
              <div class="big">B.SC. INFORMATICS</div>
              <div class="sub">Universitas Pamulang (2017 – 2021)</div>
            </div>
          </div>
          <div class="p5-card">
            <div class="tag">// AGENT PROFILE — PARUNG PANJANG, KAB. BOGOR</div>
            <p style="margin-top:0.5rem; color:#ece8e1;">
              Over 3 years of experience in developing and maintaining
              <strong>Fraud Detection Systems (FDS)</strong>. Experienced in full-stack web development
              using <strong>PHP Laravel</strong> and <strong>PostgreSQL</strong>, fraud detection engine rules
              using <strong>Java Spring Boot</strong>, and transaction data processing using <strong>Golang</strong>.
              Skilled in fraud rule/scenario implementation, REST API integration, bug fixing, and system troubleshooting.
            </p>
          </div>
        `
      },
      experience: {
        code: '01 // DEPLOYMENT_LOG',
        title: 'WORK EXPERIENCE — PT. ASTA PROTEK JIARSI',
        html: `
          <div class="exp-block">
            <div class="exp-head">
              <h3>FRAUD DETECTION SUPPORT</h3>
              <span class="period-pill">2023 – PRESENT</span>
            </div>
            <ul class="exp-list">
              <li>Developed and customized fraud detection rules/scenarios using Java Spring Boot tailored to banking requirements.</li>
              <li>Developed and maintained transaction data ingestion pipelines from datasources to the FDS database using Golang.</li>
              <li>Developed and maintained the FDS web application (frontend & backend) using PHP Laravel and PostgreSQL.</li>
              <li>Developed and integrated REST APIs to support FDS operations, including automated account block/unblock workflows.</li>
              <li>Handled bug fixing, troubleshooting, and root-cause investigation for transaction flows and suspect alerts.</li>
            </ul>
          </div>
          <div class="exp-block">
            <div class="exp-head">
              <h3>FRAUD MONITORING</h3>
              <span class="period-pill">2022 – 2023</span>
            </div>
            <ul class="exp-list">
              <li>Performed 24/7 fraud alert monitoring under a rotating shift schedule.</li>
              <li>Reviewed and analyzed suspect alerts generated by the detection engine.</li>
              <li>Investigated potentially fraudulent transactions and escalated incidents following standard operating procedures.</li>
              <li>Monitored fraud detection engine errors and identified system anomalies for engineering follow-up.</li>
            </ul>
          </div>
        `
      },
      skills: {
        code: '02 // LOADOUT_MATRIX',
        title: 'TECHNICAL SKILLS & COMPETENCIES',
        html: `
          <div class="skill-group">
            <h4>[Q] BACKEND</h4>
            <div class="chip-wrap">
              <span class="p5-chip">PHP</span>
              <span class="p5-chip">Laravel</span>
              <span class="p5-chip">Java</span>
              <span class="p5-chip">Spring Boot</span>
              <span class="p5-chip">Golang</span>
              <span class="p5-chip">Python</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[E] FRONTEND</h4>
            <div class="chip-wrap">
              <span class="p5-chip">JavaScript</span>
              <span class="p5-chip">jQuery</span>
              <span class="p5-chip">HTML</span>
              <span class="p5-chip">CSS</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[C] DATABASE & TOOLS</h4>
            <div class="chip-wrap">
              <span class="p5-chip">PostgreSQL</span>
              <span class="p5-chip">Git</span>
              <span class="p5-chip">Docker</span>
              <span class="p5-chip">REST API</span>
              <span class="p5-chip">Nginx</span>
              <span class="p5-chip">VS Code</span>
              <span class="p5-chip">Postman</span>
            </div>
          </div>
          <div class="skill-group">
            <h4>[X] COMPETENCIES</h4>
            <div class="chip-wrap">
              <span class="p5-chip">API Integration</span>
              <span class="p5-chip">Application Development</span>
              <span class="p5-chip">FDS Rules/Scenario Development</span>
              <span class="p5-chip">Bug Fixing</span>
              <span class="p5-chip">Troubleshooting</span>
            </div>
          </div>
        `
      },
      projects: {
        code: '03 // ARCHIVE_BUILDS',
        title: 'FEATURED PROJECTS',
        html: `
          <div class="filter-row">
            <button type="button" class="f-btn active" data-cat="all">ALL [3]</button>
            <button type="button" class="f-btn" data-cat="web">WEB</button>
            <button type="button" class="f-btn" data-cat="mobile">ANDROID</button>
            <button type="button" class="f-btn" data-cat="desktop">JAVA</button>
          </div>
          <div class="proj-grid">
            <div class="p5-card proj-item" data-cat="web">
              <div class="tag">01 // WEB (PHP & MYSQL)</div>
              <div class="big">WEB LAUNDRY MANAGEMENT</div>
              <div class="sub">Web-based management information system for laundry transactions, customer records, and operational reporting.</div>
              <a href="https://github.com/awardyanto/weblaundry/releases/tag/weblaundry" target="_blank" rel="noopener" class="proj-link">VIEW RELEASE ↗</a>
            </div>
            <div class="p5-card proj-item" data-cat="mobile">
              <div class="tag">02 // ANDROID (AR)</div>
              <div class="big">HIJAIYAH AR ANDROID</div>
              <div class="sub">Interactive educational Android application for learning Hijaiyah letters using Augmented Reality.</div>
              <a href="https://github.com/awardyanto/hijaiyahAR-android/releases/tag/hijaiyahAR" target="_blank" rel="noopener" class="proj-link">VIEW RELEASE ↗</a>
            </div>
            <div class="p5-card proj-item" data-cat="desktop">
              <div class="tag">03 // DESKTOP (JAVA)</div>
              <div class="big">APLIKASI UANG KAS</div>
              <div class="sub">Java-based desktop application for tracking cash inflows, expenses, and financial balance summaries.</div>
              <a href="https://github.com/awardyanto/uangkas-java/releases/tag/uangkas" target="_blank" rel="noopener" class="proj-link">VIEW RELEASE ↗</a>
            </div>
          </div>
        `
      },
      contact: {
        code: '04 // DIRECT_CHANNELS',
        title: 'CONTACT & NETWORK',
        html: `
          <div class="contact-grid">
            <a href="https://wa.me/6289654915569" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-whatsapp"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">WHATSAPP / TELP</div><strong>089654915569</strong></div>
            </a>
            <a href="mailto:alfianwardyanto@gmail.com" target="_blank" rel="noopener" class="contact-item">
              <i class="fas fa-envelope"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">EMAIL</div><strong>alfianwardyanto@gmail.com</strong></div>
            </a>
            <a href="https://linkedin.com/in/alfian-wardyanto-6a5315246/" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-linkedin"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">LINKEDIN</div><strong>Alfian Wardyanto</strong></div>
            </a>
            <a href="https://github.com/awardyanto" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-github"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">GITHUB</div><strong>awardyanto</strong></div>
            </a>
            <a href="https://instagram.com/awardyanto" target="_blank" rel="noopener" class="contact-item">
              <i class="fab fa-instagram"></i>
              <div><div style="font-size:0.75rem;color:#aaa;">INSTAGRAM</div><strong>@awardyanto</strong></div>
            </a>
          </div>
        `
      }
    }
  };

  // =========================================
  // 5. PANEL DOSSIER & SLASH TRANSITION
  // =========================================
  const modal = document.getElementById('dossierModal');
  const dossierPanel = modal.querySelector('.p5-dossier');
  const dossierCode = document.getElementById('dossierCode');
  const dossierTitle = document.getElementById('dossierTitle');
  const dossierBody = document.getElementById('dossierBody');
  const closeBtn = document.getElementById('closeDossier');
  const langSwitch = document.getElementById('langSwitch');
  const slashFx = document.getElementById('p5SlashFx');

  const menuItems = Array.from(document.querySelectorAll('.left-menu .p5-menu-item'));
  const menuKeys = ['overview', 'experience', 'skills', 'projects', 'contact', 'resume', 'certificates'];

  const setActiveMenu = (secKey) => {
    menuItems.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.section === secKey);
    });
  };

  const triggerSlash = (callback, reverse = false) => {
    if (stage) {
      stage.classList.remove('p5-shake');
      void stage.offsetWidth;
      stage.classList.add('p5-shake');
    }

    if (!slashFx) {
      if (callback) callback();
      return;
    }

    slashFx.classList.remove('active', 'reverse');
    if (reverse) slashFx.classList.add('reverse');
    void slashFx.offsetWidth;
    slashFx.classList.add('active');

    setTimeout(() => {
      if (callback) callback();
    }, 150);

    setTimeout(() => {
      slashFx.classList.remove('active', 'reverse');
    }, 480);
  };

  const renderSection = (secKey) => {
    const entry = data[currentLang][secKey];
    if (!entry) return;
    activeSection = secKey;
    dossierCode.textContent = entry.code;
    dossierTitle.textContent = entry.title;
    dossierBody.innerHTML = entry.html;

    if (dossierPanel) {
      dossierPanel.style.animation = 'none';
      void dossierPanel.offsetWidth;
      dossierPanel.style.animation = '';
    }

    modal.classList.add('open');
    if (stage) stage.classList.add('panel-open');
    setActiveMenu(secKey);

    if (secKey === 'projects') {
      const fBtns = dossierBody.querySelectorAll('.f-btn');
      const pItems = dossierBody.querySelectorAll('.proj-item');
      fBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          playSfx('hover');
          fBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset.cat;
          pItems.forEach(item => {
            item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
          });
        });
      });
    }
  };

  const openSection = (secKey, withSlash = true) => {
    if (activeSection === secKey && modal.classList.contains('open')) {
      closeModal();
      return;
    }
    playSfx('select');
    if (withSlash) {
      triggerSlash(() => renderSection(secKey));
    } else {
      renderSection(secKey);
    }
  };

  const closeModal = () => {
    if (!modal.classList.contains('open')) return;
    playSfx('cancel');
    triggerSlash(() => {
      modal.classList.remove('open');
      if (stage) stage.classList.remove('panel-open');
      setActiveMenu(null);
      activeSection = null;
    }, true);
  };

  document.querySelectorAll('[data-section]').forEach(el => {
    el.addEventListener('mouseenter', () => playSfx('hover'));
    el.addEventListener('click', () => openSection(el.dataset.section, true));
  });

  menuItems.forEach(item => {
    if (!item.dataset.section) {
      item.addEventListener('mouseenter', () => playSfx('hover'));
      item.addEventListener('click', () => playSfx('select'));
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // =========================================
  // 6. SWITCH BAHASA
  // =========================================
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  const updateLangUI = () => {
    const dict = data[currentLang];
    langSwitch.textContent = currentLang === 'id' ? 'LANG: ID' : 'LANG: EN';
    setText('yenLabel', dict.yen);

    menuItems.forEach((item, index) => {
      const key = menuKeys[index];
      if (key && dict.menu[key]) {
        buildRansomText(item, dict.menu[key]);
      }
    });
  };
  updateLangUI();

  langSwitch.addEventListener('click', () => {
    playSfx('select');
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('portfolio_lang', currentLang);
    updateLangUI();
    if (activeSection) renderSection(activeSection);
  });

  // =========================================
  // 7. NAVIGASI KEYBOARD (PANAH, ENTER, ESC)
  // =========================================
  let focusIdx = -1;
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      playSfx('hover');
      menuItems.forEach(item => item.classList.remove('active-key'));
      focusIdx = e.key === 'ArrowDown'
        ? (focusIdx + 1) % menuItems.length
        : (focusIdx - 1 + menuItems.length) % menuItems.length;
      menuItems[focusIdx].classList.add('active-key');
    } else if (e.key === 'Enter' && focusIdx >= 0) {
      menuItems[focusIdx].click();
    }
  });

  // =========================================
  // 8. KONTROL THEME SONG (BGM)
  // =========================================
  const themeSong = document.getElementById('themeSong');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmIcon = document.getElementById('bgmIcon');
  const bgmText = document.getElementById('bgmText');

  if (themeSong && bgmToggle) {
    themeSong.volume = 0.45;
    let isPlaying = false;
    let userMuted = false;

    const updateBgmUI = (playing) => {
      isPlaying = playing;
      bgmToggle.classList.toggle('playing', playing);
      bgmIcon.className = playing ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      bgmText.textContent = playing ? 'BGM: ON' : 'BGM: OFF';
    };

    const startAudio = () => {
      if (userMuted || isPlaying) return;
      themeSong.play()
        .then(() => {
          updateBgmUI(true);
          removeUnlockListeners();
        })
        .catch(() => updateBgmUI(false));
    };

    const onFirstInteraction = () => {
      if (!userMuted && !isPlaying) startAudio();
    };

    const removeUnlockListeners = () => {
      ['click', 'touchstart', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, onFirstInteraction);
      });
    };

    startAudio();
    ['click', 'touchstart', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, onFirstInteraction, { passive: true });
    });

    bgmToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        userMuted = true;
        themeSong.pause();
        updateBgmUI(false);
      } else {
        userMuted = false;
        themeSong.play()
          .then(() => {
            updateBgmUI(true);
            removeUnlockListeners();
          })
          .catch((err) => console.warn('Gagal memutar audio:', err));
      }
    });
  }
});