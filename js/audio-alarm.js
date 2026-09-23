/**
 * Audio Alarm & Voice Synthesizer Engine for IT Del Smart Alarm
 * Suara Bell Kampus, Chime Asrama, Alarm Digital & Pengumuman Suara (TTS)
 */

class DelAudioAlarm {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.currentTone = "bell-del"; // 'bell-del', 'chime-asrama', 'digital-modern', 'gong-devotion'
    this.volume = 0.8;
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
        // Prioritaskan suara bahasa Indonesia (id-ID / id_ID)
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
     PROCEDURAL SOUND GENERATORS (WEB AUDIO API)
  ========================================================== */

  playBellDel() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    // Westminster / IT Del Campus Bell Chime (E4 -> G#4 -> F#4 -> B3)
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

      // Bell overtone harmonic
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

  playChimeAsrama() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    // Soft Harmonic Asrama Chime (C5, E5, G5, B5, C6)
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

  playGongDevotion() {
    if (this.isMuted || !this.ctx) return;
    this.ensureAudioContext();

    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(146.83, time); // D3 Warm Gong

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(73.42, time); // D2 Sub

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
        this.playBellDel();
    }
  }

  /**
   * Mengumumkan pesan jadwal dengan Text-To-Speech bahasa Indonesia
   * @param {string} text - Pesan pengingat
   */
  announceVoice(text) {
    if (this.isMuted || !this.isVoiceEnabled) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel(); // Hentikan ucapan aktif jika ada

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    utterance.volume = this.volume;

    if (this.indonesianVoice) {
      utterance.voice = this.indonesianVoice;
    }

    // Beri jeda 1.2 detik setelah bunyi alarm agar tidak bentrok
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 1200);
  }

  /**
   * Memanggil alarm lengkap (Nada Bell + Pengumuman Suara)
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
