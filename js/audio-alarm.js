/**
 * Audio Alarm & Voice Synthesizer Engine for IT Del Smart Alarm
 * Suara Nada Pengingat Super Bersemangat, Fanfare Del, Chime Asrama & Pengumuman Suara (TTS)
 */

class DelAudioAlarm {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentTone = "fanfare-semangat"; // 'fanfare-semangat', 'electronic-energizer', 'reveille-pagi', 'bell-del', 'chime-asrama', 'digital-modern', 'gong-devotion'
    this.volume = 0.9;
    this.isVoiceEnabled = true;
    this.indonesianVoice = null;

    this.initAudioContext();
    this.initVoices();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureAudioContext() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  initVoices() {
    if ("speechSynthesis" in window) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        // Prioritaskan suara bahasa Indonesia (id-ID / id_ID / Indonesian)
        this.indonesianVoice = voices.find(v => v.lang === "id-ID" || v.lang === "id_ID" || v.lang.startsWith("id")) || null;
      };
      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  setTone(tone) {
    this.currentTone = tone;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  toggleVoice() {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    return this.isVoiceEnabled;
  }

  /* ==========================================================
     HELPER: SINTESIS SUARA INSTRUMEN (BRASS, PERCUSSION, SYNTH)
  ========================================================== */

  // Sintesis Suara Terompet Brass yang Gagah dan Bersemangat
  playBrassNote(freq, startTime, duration, volScale = 1.0) {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // Sedikit detune agar tebal

    // Filter brass dinamis
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(3200, startTime + 0.05);
    filter.frequency.exponentialRampToValueAtTime(1400, startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(this.volume * 0.35 * volScale, startTime + 0.03);
    gain.gain.setValueAtTime(this.volume * 0.3 * volScale, startTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Sintesis Drum Kick Menghentak
  playKickBeat(startTime) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(160, startTime);
    osc.frequency.exponentialRampToValueAtTime(35, startTime + 0.14);

    gain.gain.setValueAtTime(this.volume * 0.5, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.16);
  }

  // Sintesis Snare Percussion
  playSnareBeat(startTime) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, startTime);
    osc.frequency.exponentialRampToValueAtTime(90, startTime + 0.1);

    gain.gain.setValueAtTime(this.volume * 0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.12);
  }

  /* ==========================================================
     NADA PENGINGAT SUPER BERSEMANGAT (NEW PRESETS)
  ========================================================== */

  /**
   * 1. FANFARE SEMANGAT DEL (DEFAULT BARU)
   * Trompet Fanfare megah berderap dengan ketukan drum yang membakar semangat mahasiswa
   */
  playFanfareSemangat() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;

    // Drum beat ritmis berderap (Bangkit & Siap!)
    this.playKickBeat(now);
    this.playSnareBeat(now + 0.2);
    this.playKickBeat(now + 0.4);
    this.playKickBeat(now + 0.6);
    this.playSnareBeat(now + 0.8);
    this.playKickBeat(now + 1.1);

    // Melodi Fanfare Brass Megah: C5 -> E5 -> G5 -> C6 -> G5 -> C6!
    const notes = [
      { f: 523.25, t: 0.0, d: 0.16 },  // C5
      { f: 659.25, t: 0.18, d: 0.16 }, // E5
      { f: 783.99, t: 0.36, d: 0.22 }, // G5
      { f: 1046.50, t: 0.60, d: 0.18 }, // C6
      { f: 783.99, t: 0.80, d: 0.18 },  // G5
      { f: 1046.50, t: 1.02, d: 0.65 }  // C6 Triumphant Finish
    ];

    notes.forEach(n => {
      this.playBrassNote(n.f, now + n.t, n.d, 1.1);
      // Tambahkan oktaf harmoni agar terdengar gagah dan megah
      this.playBrassNote(n.f * 0.5, now + n.t, n.d, 0.7);
    });
  }

  /**
   * 2. REVEILLE TEROMPET PAGI (MILITARY WAKE-UP BUGLE)
   * Nada terompet sangkakala bangun pagi yang tegas, cepat, dan membuat langsung terjaga
   */
  playReveillePagi() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;
    const bugle = [
      { f: 392.00, t: 0.00, d: 0.12 }, // G4
      { f: 523.25, t: 0.13, d: 0.12 }, // C5
      { f: 659.25, t: 0.26, d: 0.12 }, // E5
      { f: 523.25, t: 0.39, d: 0.12 }, // C5
      { f: 392.00, t: 0.52, d: 0.18 }, // G4
      { f: 523.25, t: 0.72, d: 0.12 }, // C5
      { f: 659.25, t: 0.85, d: 0.12 }, // E5
      { f: 783.99, t: 0.98, d: 0.35 }  // G5
    ];

    bugle.forEach(b => {
      this.playBrassNote(b.f, now + b.t, b.d, 1.15);
    });
  }

  /**
   * 3. UPBEAT ELECTRONIC ENERGIZER (EDM SYNTH MOTIVATION)
   * Arpeggio synthesizer enerjik dengan tempo cepat (135 BPM) dan bass punchy
   */
  playElectronicEnergizer() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;
    const arps = [
      440.00, 554.37, 659.25, 880.00,
      659.25, 880.00, 1108.73, 1318.51
    ];

    arps.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + (idx * 0.11);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(this.volume * 0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);

      if (idx % 2 === 0) {
        this.playKickBeat(t);
      }
    });
  }

  /**
   * 4. WESTMINSTER / LONCENG KAMPUS DEL (KLASIK)
   */
  playBellDel() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const melody = [
      { f: 329.63, d: 0.6 }, // E4
      { f: 415.30, d: 0.6 }, // G#4
      { f: 369.99, d: 0.6 }, // F#4
      { f: 246.94, d: 1.2 }  // B3
    ];

    let time = this.ctx.currentTime;
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, time);

      const overtone = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      overtone.type = "sine";
      overtone.frequency.setValueAtTime(note.f * 2.76, time);

      gain.gain.setValueAtTime(this.volume * 0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + note.d);

      overGain.gain.setValueAtTime(this.volume * 0.1, time);
      overGain.gain.exponentialRampToValueAtTime(0.001, time + (note.d * 0.5));

      osc.connect(gain);
      overtone.connect(overGain);
      gain.connect(this.ctx.destination);
      overGain.connect(this.ctx.destination);

      osc.start(time);
      overtone.start(time);
      osc.stop(time + note.d);
      overtone.stop(time + note.d);

      time += note.d * 0.85;
    });
  }

  /**
   * 5. CHIME ASRAMA LEMBUT
   */
  playChimeAsrama() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const chord = [523.25, 659.25, 783.99, 987.77, 1046.50];
    let time = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = time + (idx * 0.12);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(this.volume * 0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 1.2);
    });
  }

  /**
   * 6. DIGITAL ALARM MODERN
   */
  playDigitalModern() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const beeps = [880, 880, 1174.66, 1760];
    let time = this.ctx.currentTime;

    beeps.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = time + (idx * 0.1);

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(this.volume * 0.15, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.08);
    });
  }

  /**
   * 7. GONG DEVOTION TEDUH
   */
  playGongDevotion() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(146.83, time);

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(73.42, time);

    gain.gain.setValueAtTime(this.volume * 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.5);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + 2.5);
    subOsc.stop(time + 2.5);
  }

  playCurrentAlarmTone() {
    switch (this.currentTone) {
      case "fanfare-semangat":
        this.playFanfareSemangat();
        break;
      case "reveille-pagi":
        this.playReveillePagi();
        break;
      case "electronic-energizer":
        this.playElectronicEnergizer();
        break;
      case "bell-del":
        this.playBellDel();
        break;
      case "chime-asrama":
        this.playChimeAsrama();
        break;
      case "digital-modern":
        this.playDigitalModern();
        break;
      case "gong-devotion":
        this.playGongDevotion();
        break;
      default:
        this.playFanfareSemangat();
    }
  }

  /**
   * Mengumumkan pesan jadwal dengan Text-To-Speech bahasa Indonesia YANG SUPER BERSEMANGAT!
   * @param {string} text - Pesan pengingat
   */
  announceVoice(text) {
    if (this.isMuted || !this.isVoiceEnabled) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Hentikan ucapan aktif jika ada

    // Kalimat pembuka penyemangat otomatis sesuai waktu
    const hour = new Date().getHours();
    let prefix = "Semangat mahasiswa Del! ";
    if (hour >= 4 && hour < 9) {
      prefix = "Semangat pagi pejuang Del! MarTuhan, Marroha, Marbisuk! Ayo bergegas, ";
    } else if (hour >= 9 && hour < 14) {
      prefix = "Tetap bersemangat dan fokus penuh perkuliahan! ";
    } else if (hour >= 14 && hour < 18) {
      prefix = "Semangat sore mahasiswa Del! Jaga energi dan disiplin, ";
    } else if (hour >= 18 && hour < 22) {
      prefix = "Malam produktif mahasiswa Del! Fokus belajar dan bertumbuh, ";
    } else {
      prefix = "Perhatian seluruh mahasiswa asrama IT Del! ";
    }

    const fullText = prefix + text;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "id-ID";
    // Kecepatan dan intonasi lebih dinamis, tegas, dan bersemangat!
    utterance.rate = 1.15;
    utterance.pitch = 1.18;
    utterance.volume = this.volume;

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    }

    // Jeda 1.1 detik setelah nada fanfare berbunyi
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 1100);
  }

  /**
   * Memanggil alarm lengkap (Nada Semangat + Pengumuman Suara)
   * @param {object} activity - Objek kegiatan IT Del
   */
  triggerActivityAlarm(activity) {
    this.playCurrentAlarmTone();
    if (activity && activity.voiceMsg) {
      this.announceVoice(activity.voiceMsg);
    }
  }
}

// Instance global
const delAlarmAudio = new DelAudioAlarm();
