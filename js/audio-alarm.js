/**
 * Audio Alarm & iPhone Ringtone + Haptic Vibration Engine for IT Del Smart Alarm
 * Suara Asli iPhone (Radar, Marimba, Opening) + Efek Getaran Haptik Nyata & Visual Layar
 */

class DelAudioAlarm {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentTone = "iphone-radar"; // 'iphone-radar', 'iphone-marimba', 'iphone-opening', 'bell-del', 'chime-asrama'
    this.volume = 0.85;
    this.isVoiceEnabled = true;
    this.isVibrationEnabled = true;
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

  toggleVibration() {
    this.isVibrationEnabled = !this.isVibrationEnabled;
    return this.isVibrationEnabled;
  }

  /* ==========================================================
     SISTEM GETARAN IPHONE (HARDWARE HAPTIC + SCREEN SHAKE)
  ========================================================== */
  triggerVibration(duration = 2000) {
    if (!this.isVibrationEnabled) return;

    // 1. Getaran Fisik Hardware (Untuk HP Android/iPhone/Perangkat Layar Sentuh)
    if ("vibrate" in navigator) {
      try {
        // Pola getar berdenyut khas alarm iPhone: Getar-Jeda-Getar-Jeda-Getar Panjang
        navigator.vibrate([120, 60, 120, 160, 120, 60, 120, 160, 120, 60, 120, 350]);
      } catch (e) {
        console.warn("Hardware vibration not permitted/supported", e);
      }
    }

    // 2. Efek Getaran Layar Haptik Visual (Screen Shake) di Laptop / Browser
    const shakeElements = [
      document.querySelector(".hero-clock-card"),
      document.querySelector(".now-happening-card"),
      document.getElementById("alarmModalBox")
    ];

    shakeElements.forEach(el => {
      if (el) el.classList.add("iphone-vibrating");
    });

    setTimeout(() => {
      shakeElements.forEach(el => {
        if (el) el.classList.remove("iphone-vibrating");
      });
    }, duration);
  }

  /* ==========================================================
     NADA SUARA IPHONE ASLI (SINTESIS WEB AUDIO API BERKUALITAS)
  ========================================================== */

  /**
   * 1. IPHONE RADAR ALARM (NADA ALARM PALING TERKENAL IPHONE)
   * Dentuman staccato berulang khas nada alarm bangun tidur Apple iPhone
   */
  playIphoneRadar() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;
    const baseFreq = 1250; // Frekuensi dentang khas iPhone Radar (E6)

    // Pola bip ganda berulang (Double Beep Radar Cadence)
    const pulses = [
      { t: 0.00, f: baseFreq, d: 0.045 },
      { t: 0.08, f: baseFreq, d: 0.045 },

      { t: 0.28, f: baseFreq, d: 0.045 },
      { t: 0.36, f: baseFreq, d: 0.045 },

      { t: 0.56, f: baseFreq, d: 0.045 },
      { t: 0.64, f: baseFreq, d: 0.045 },

      { t: 0.84, f: baseFreq, d: 0.045 },
      { t: 0.92, f: baseFreq, d: 0.045 },

      // High octave chime penutup
      { t: 1.12, f: 1875, d: 0.06 },
      { t: 1.24, f: 2500, d: 0.12 }
    ];

    pulses.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + p.t;

      osc.type = "sine";
      osc.frequency.setValueAtTime(p.f, startTime);

      // Kurva envelope khas klik radar iOS yang renyah dan jernih
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.45, startTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + p.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + p.d);
    });
  }

  /**
   * 2. IPHONE MARIMBA (RINGTONE LEGENDARIS APPLE IPHONE)
   * Suara bilah kayu marimba asli dengan ketukan staccato ceria khas iPhone
   */
  playIphoneMarimba() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;

    // Melodi Marimba iPhone: G4 -> C5 -> D5 -> G5 -> E5 -> C5 -> D5 -> G4
    const notes = [
      { f: 392.00, t: 0.00, d: 0.18 }, // G4
      { f: 523.25, t: 0.13, d: 0.18 }, // C5
      { f: 587.33, t: 0.26, d: 0.18 }, // D5
      { f: 783.99, t: 0.39, d: 0.24 }, // G5
      { f: 659.25, t: 0.55, d: 0.18 }, // E5
      { f: 523.25, t: 0.68, d: 0.18 }, // C5
      { f: 587.33, t: 0.81, d: 0.18 }, // D5
      { f: 392.00, t: 0.94, d: 0.40 }  // G4
    ];

    notes.forEach(n => {
      const startTime = now + n.t;

      // 1. Nada Dasar Kayu Marimba
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(n.f, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + n.d);

      // 2. Harmonic Mallet Click (Ketukan pemukul kayu)
      const mallet = this.ctx.createOscillator();
      const malletGain = this.ctx.createGain();
      mallet.type = "triangle";
      mallet.frequency.setValueAtTime(n.f * 3.8, startTime);

      malletGain.gain.setValueAtTime(this.volume * 0.18, startTime);
      malletGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);

      osc.connect(gain);
      mallet.connect(malletGain);
      gain.connect(this.ctx.destination);
      malletGain.connect(this.ctx.destination);

      osc.start(startTime);
      mallet.start(startTime);
      osc.stop(startTime + n.d);
      mallet.stop(startTime + 0.04);
    });
  }

  /**
   * 3. IPHONE OPENING / REFLECTIONS (RINGTONE MODERN IOS)
   */
  playIphoneOpening() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const now = this.ctx.currentTime + 0.05;
    const chords = [
      { f: 739.99, t: 0.00, d: 0.28 }, // F#5
      { f: 932.33, t: 0.15, d: 0.28 }, // A#5
      { f: 1108.73, t: 0.30, d: 0.35 }, // C#6
      { f: 1479.98, t: 0.48, d: 0.50 }  // F#6
    ];

    chords.forEach(c => {
      const startTime = now + c.t;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(c.f, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.35, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + c.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + c.d);
    });
  }

  /**
   * 4. WESTMINSTER BELL KAMPUS DEL (KLASIK IT DEL)
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

  playCurrentAlarmTone() {
    switch (this.currentTone) {
      case "iphone-radar":
        this.playIphoneRadar();
        break;
      case "iphone-marimba":
        this.playIphoneMarimba();
        break;
      case "iphone-opening":
        this.playIphoneOpening();
        break;
      case "bell-del":
        this.playBellDel();
        break;
      default:
        this.playIphoneRadar();
    }
  }

  /**
   * Mengumumkan jadwal dengan suara jernih dan ramah
   * @param {string} text - Pesan pengingat
   */
  announceVoice(text) {
    if (this.isMuted || !this.isVoiceEnabled) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 1.05;
    utterance.pitch = 1.05;
    utterance.volume = this.volume;

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    }

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 1100);
  }

  /**
   * Memanggil alarm lengkap: Nada iPhone + Getaran Haptik & Visual Layar + Pengumuman Suara
   * @param {object} activity - Objek kegiatan IT Del
   */
  triggerActivityAlarm(activity) {
    this.playCurrentAlarmTone();
    this.triggerVibration(2000); // Picu getaran fisik & getaran layar
    if (activity && activity.voiceMsg) {
      this.announceVoice(activity.voiceMsg);
    }
  }
}

// Instance global
const delAlarmAudio = new DelAudioAlarm();
