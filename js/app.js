/**
 * Master Application Controller for DelTime: IT Del Smart Campus Alarm
 */

class DelTimeApp {
  constructor() {
    this.currentScheduleList = [];
    this.currentActivity = null;
    this.nextActivity = null;
    this.selectedDayIndex = new Date().getDay(); // 0: Minggu, 1: Senin, ..., 6: Sabtu
    this.activeFilter = "all";
    this.lastTriggeredActivityId = null;
    this.isAlarmDismissedForCurrent = false;

    // Task List State
    this.tasks = JSON.parse(localStorage.getItem("itdel_tasks") || "[]");

    // Initialize Default Tasks if empty
    if (this.tasks.length === 0) {
      this.tasks = [
        { id: "t1", title: "Laporan Praktikum Pemrograman Web", category: "Praktikum", deadline: "Besok, 23:59", done: false, priority: "high" },
        { id: "t2", title: "Review Materi Algoritma & Struktur Data", category: "Kuliah", deadline: "Hari Ini, 20:00", done: false, priority: "medium" },
        { id: "t3", title: "Piket Kebersihan Kamar Asrama (Kurve)", category: "Asrama", deadline: "Sabtu, 07:30", done: true, priority: "low" }
      ];
      this.saveTasks();
    }

    this.init();
  }

  init() {
    this.updateScheduleForSelectedDay();
    this.startLiveClock();
    this.renderTimeline();
    this.renderTasks();
    this.renderUniformAndQuote();
    this.bindEvents();
    this.requestNotificationPermission();
  }

  requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }

  showDesktopNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, {
          body: body,
          icon: "https://www.del.ac.id/wp-content/uploads/2017/04/Logo-IT-Del-1.png"
        });
      } catch (e) {
        console.warn("Notification error", e);
      }
    }
  }

  /* ==========================================================
     TIME CALCULATIONS & LIVE CLOCK
  ========================================================== */
  startLiveClock() {
    this.tick();
    setInterval(() => this.tick(), 1000);
  }

  tick() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Update Digital Clock Elements
    const clockEl = document.getElementById("liveDigitalClock");
    const dateEl = document.getElementById("liveDateText");
    const dayBadgeEl = document.getElementById("liveDayBadge");

    if (clockEl) {
      clockEl.innerHTML = `${hours}<span class="clock-colon">:</span>${minutes}<span class="clock-sec">:${seconds}</span>`;
    }

    if (dateEl) {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      dateEl.textContent = now.toLocaleDateString("id-ID", options);
    }

    if (dayBadgeEl) {
      const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      dayBadgeEl.textContent = dayNames[now.getDay()];
    }

    // Periksa jadwal aktif saat ini
    this.evaluateCurrentActivity(now);
  }

  updateScheduleForSelectedDay() {
    const day = this.selectedDayIndex;
    if (day === 0) {
      this.currentScheduleList = IT_DEL_DATA.sundaySchedule;
    } else if (day === 6) {
      this.currentScheduleList = IT_DEL_DATA.saturdaySchedule;
    } else {
      this.currentScheduleList = IT_DEL_DATA.weekdaySchedule;
    }
  }

  timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  }

  evaluateCurrentActivity(now) {
    const currentMin = now.getHours() * 60 + now.getMinutes();
    const currentDay = now.getDay();

    // Pastikan jadwal yang dicek adalah jadwal hari ini
    let todayList = IT_DEL_DATA.weekdaySchedule;
    if (currentDay === 0) todayList = IT_DEL_DATA.sundaySchedule;
    else if (currentDay === 6) todayList = IT_DEL_DATA.saturdaySchedule;

    let foundCurrent = null;
    let foundNext = null;

    for (let i = 0; i < todayList.length; i++) {
      const act = todayList[i];
      let startMin = this.timeToMinutes(act.start);
      let endMin = this.timeToMinutes(act.end);

      // Tangani rentang malam hari (contoh: 22:00 s.d 05:00)
      if (endMin < startMin) {
        if (currentMin >= startMin || currentMin < endMin) {
          foundCurrent = act;
          foundNext = todayList[(i + 1) % todayList.length];
          break;
        }
      } else {
        if (currentMin >= startMin && currentMin < endMin) {
          foundCurrent = act;
          foundNext = todayList[(i + 1) % todayList.length];
          break;
        }
      }
    }

    this.currentActivity = foundCurrent;
    this.nextActivity = foundNext;

    this.updateLiveHUD(now, foundCurrent, foundNext);

    // TRIGGER ALARM jika kegiatan baru dimulai dan belum di-trigger
    if (foundCurrent && foundCurrent.id !== this.lastTriggeredActivityId) {
      this.lastTriggeredActivityId = foundCurrent.id;
      this.isAlarmDismissedForCurrent = false;

      // Pemicu Alarm
      delAlarmAudio.triggerActivityAlarm(foundCurrent);
      this.showAlarmModal(foundCurrent);
      this.showDesktopNotification(
        `⏰ IT Del: ${foundCurrent.title}`,
        `${foundCurrent.start} - ${foundCurrent.end} di ${foundCurrent.location}. ${foundCurrent.desc}`
      );
    }
  }

  updateLiveHUD(now, currentAct, nextAct) {
    const currentTitleEl = document.getElementById("hudCurrentTitle");
    const currentLocEl = document.getElementById("hudCurrentLocation");
    const currentIconEl = document.getElementById("hudCurrentIcon");
    const currentDescEl = document.getElementById("hudCurrentDesc");
    const currentProgressEl = document.getElementById("hudCurrentProgressBar");
    const currentRemainingEl = document.getElementById("hudCurrentRemaining");

    const nextTitleEl = document.getElementById("hudNextTitle");
    const nextTimeEl = document.getElementById("hudNextTime");
    const nextLocEl = document.getElementById("hudNextLocation");

    if (currentAct) {
      if (currentTitleEl) currentTitleEl.textContent = currentAct.title;
      if (currentLocEl) currentLocEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentAct.location} (${currentAct.start} - ${currentAct.end})`;
      if (currentDescEl) currentDescEl.textContent = currentAct.desc;
      if (currentIconEl) currentIconEl.className = `fa-solid ${currentAct.icon} hud-act-icon`;

      // Hitung persentase progress
      const currentMin = now.getHours() * 60 + now.getMinutes();
      const currentSec = now.getSeconds();
      const currentTotalSec = (currentMin * 60) + currentSec;

      let startSec = this.timeToMinutes(currentAct.start) * 60;
      let endSec = this.timeToMinutes(currentAct.end) * 60;

      let durationSec = endSec - startSec;
      let elapsedSec = currentTotalSec - startSec;

      if (endSec < startSec) { // Lewat tengah malam
        durationSec = (24 * 3600 - startSec) + endSec;
        elapsedSec = (currentTotalSec >= startSec) ? (currentTotalSec - startSec) : ((24 * 3600 - startSec) + currentTotalSec);
      }

      const percent = Math.min(100, Math.max(0, (elapsedSec / durationSec) * 100));
      const remainingSecTotal = Math.max(0, durationSec - elapsedSec);
      const remH = Math.floor(remainingSecTotal / 3600);
      const remM = Math.floor((remainingSecTotal % 3600) / 60);
      const remS = remainingSecTotal % 60;

      let remStr = "";
      if (remH > 0) remStr += `${remH} jam `;
      remStr += `${remM} mnt ${remS} dtk`;

      if (currentProgressEl) currentProgressEl.style.width = `${percent}%`;
      if (currentRemainingEl) currentRemainingEl.textContent = `Tersisa: ${remStr}`;
    }

    if (nextAct) {
      if (nextTitleEl) nextTitleEl.textContent = nextAct.title;
      if (nextTimeEl) nextTimeEl.textContent = `${nextAct.start} WIB`;
      if (nextLocEl) nextLocEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${nextAct.location}`;
    }
  }

  /* ==========================================================
     TIMELINE SCHEDULE RENDERING & FILTER
  ========================================================== */
  renderTimeline() {
    const container = document.getElementById("scheduleTimelineContainer");
    if (!container) return;
    container.innerHTML = "";

    const now = new Date();
    const isViewingToday = (this.selectedDayIndex === now.getDay());

    let filteredList = this.currentScheduleList;
    if (this.activeFilter !== "all") {
      filteredList = this.currentScheduleList.filter(item => item.category === this.activeFilter);
    }

    if (filteredList.length === 0) {
      container.innerHTML = `<div class="timeline-empty"><p>Tidak ada kegiatan untuk filter ini.</p></div>`;
      return;
    }

    filteredList.forEach((item) => {
      const isNow = isViewingToday && this.currentActivity && (this.currentActivity.id === item.id);
      const card = document.createElement("div");
      card.className = `timeline-card ${isNow ? 'active-now' : ''} cat-${item.category}`;

      card.innerHTML = `
        <div class="timeline-time-badge">
          <span class="t-start">${item.start}</span>
          <span class="t-divider">-</span>
          <span class="t-end">${item.end}</span>
          ${isNow ? '<span class="pulse-live-badge"><i class="fa-solid fa-circle"></i> SEDANG BERLANGSUNG</span>' : ''}
        </div>
        <div class="timeline-content">
          <div class="timeline-title-row">
            <div class="timeline-icon-box">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <div>
              <h4 class="timeline-title">${item.title}</h4>
              <span class="timeline-loc"><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
            </div>
            <button class="btn-play-schedule-audio" title="Dengarkan Pengingat">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <p class="timeline-desc">${item.desc}</p>
          <div class="timeline-meta-footer">
            <span class="uniform-tag"><i class="fa-solid fa-shirt"></i> ${item.uniform}</span>
          </div>
        </div>
      `;

      card.querySelector(".btn-play-schedule-audio").onclick = (e) => {
        e.stopPropagation();
        delAlarmAudio.triggerActivityAlarm(item);
      };

      container.appendChild(card);
    });
  }

  /* ==========================================================
     UNIFORM & 3M VALUES
  ========================================================== */
  renderUniformAndQuote() {
    const todayIndex = new Date().getDay();
    // 0: Minggu, 1: Senin, ..., 6: Sabtu
    const uniformIndex = (todayIndex === 0) ? 6 : todayIndex - 1; // Map ke uniformGuide
    const uniformData = IT_DEL_DATA.uniformGuide[uniformIndex] || IT_DEL_DATA.uniformGuide[0];

    const uniformTitleEl = document.getElementById("todayUniformTitle");
    const uniformDescEl = document.getElementById("todayUniformDesc");
    const uniformNotesEl = document.getElementById("todayUniformNotes");

    if (uniformTitleEl) uniformTitleEl.textContent = `Seragam Hari ${uniformData.day}`;
    if (uniformDescEl) uniformDescEl.textContent = uniformData.uniform;
    if (uniformNotesEl) uniformNotesEl.textContent = `💡 ${uniformData.notes}`;

    // Random Quote 3M
    const quoteData = IT_DEL_DATA.quotes3M[Math.floor(Math.random() * IT_DEL_DATA.quotes3M.length)];
    const quoteTextEl = document.getElementById("quote3MText");
    const quoteMottoEl = document.getElementById("quote3MMotto");

    if (quoteTextEl) quoteTextEl.textContent = `"${quoteData.text}"`;
    if (quoteMottoEl) quoteMottoEl.textContent = `— ${quoteData.motto} (Institut Teknologi Del)`;
  }

  /* ==========================================================
     TASK & PRAKTIKUM TRACKER
  ========================================================== */
  saveTasks() {
    localStorage.setItem("itdel_tasks", JSON.stringify(this.tasks));
  }

  addTask(title, category, deadline, priority) {
    if (!title.trim()) return;
    const newTask = {
      id: "t-" + Date.now(),
      title: title.trim(),
      category: category || "Praktikum",
      deadline: deadline || "Segera",
      priority: priority || "medium",
      done: false
    };
    this.tasks.unshift(newTask);
    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskDone(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.saveTasks();
      this.renderTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  renderTasks() {
    const listEl = document.getElementById("tasksListContainer");
    const countEl = document.getElementById("activeTasksCount");
    if (!listEl) return;
    listEl.innerHTML = "";

    const activeCount = this.tasks.filter(t => !t.done).length;
    if (countEl) countEl.textContent = `${activeCount} Aktif`;

    if (this.tasks.length === 0) {
      listEl.innerHTML = `<div class="tasks-empty"><p>Belum ada tugas atau laporan praktikum.</p></div>`;
      return;
    }

    this.tasks.forEach(task => {
      const item = document.createElement("div");
      item.className = `task-item-card ${task.done ? 'task-done' : ''} priority-${task.priority}`;
      item.innerHTML = `
        <label class="task-checkbox-wrap">
          <input type="checkbox" ${task.done ? 'checked' : ''}>
          <span class="custom-checkmark"></span>
        </label>
        <div class="task-info">
          <h5 class="task-title">${task.title}</h5>
          <div class="task-meta">
            <span class="task-cat-badge">${task.category}</span>
            <span class="task-deadline"><i class="fa-solid fa-clock"></i> ${task.deadline}</span>
          </div>
        </div>
        <button class="btn-delete-task" title="Hapus Tugas"><i class="fa-solid fa-trash-can"></i></button>
      `;

      item.querySelector("input").onchange = () => this.toggleTaskDone(task.id);
      item.querySelector(".btn-delete-task").onclick = () => this.deleteTask(task.id);

      listEl.appendChild(item);
    });
  }

  /* ==========================================================
     ALARM MODAL & SNOOZE
  ========================================================== */
  showAlarmModal(activity) {
    const modal = document.getElementById("alarmTriggerModal");
    const titleEl = document.getElementById("modalAlarmTitle");
    const locEl = document.getElementById("modalAlarmLocation");
    const timeEl = document.getElementById("modalAlarmTime");
    const descEl = document.getElementById("modalAlarmDesc");

    if (titleEl) titleEl.textContent = activity.title;
    if (locEl) locEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${activity.location}`;
    if (timeEl) timeEl.textContent = `${activity.start} - ${activity.end} WIB`;
    if (descEl) descEl.textContent = activity.desc;

    if (modal) modal.classList.add("show");
  }

  dismissAlarmModal() {
    const modal = document.getElementById("alarmTriggerModal");
    if (modal) modal.classList.remove("show");
    this.isAlarmDismissedForCurrent = true;
  }

  snoozeAlarm(minutes = 5) {
    this.dismissAlarmModal();
    this.showToast(`⏰ Alarm ditunda selama ${minutes} menit.`);
    setTimeout(() => {
      if (this.currentActivity) {
        delAlarmAudio.triggerActivityAlarm(this.currentActivity);
        this.showAlarmModal(this.currentActivity);
      }
    }, minutes * 60 * 1000);
  }

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "app-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  /* ==========================================================
     GLOBAL EVENTS BINDING
  ========================================================== */
  bindEvents() {
    // Day Selector Buttons
    const dayButtons = document.querySelectorAll(".day-selector-btn");
    dayButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        dayButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedDayIndex = parseInt(btn.getAttribute("data-day"), 10);
        this.updateScheduleForSelectedDay();
        this.renderTimeline();
      });
    });

    // Category Filter Buttons
    const filterButtons = document.querySelectorAll(".filter-tag-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilter = btn.getAttribute("data-filter");
        this.renderTimeline();
      });
    });

    // Tone Selector Dropdown
    const toneSelect = document.getElementById("alarmToneSelect");
    if (toneSelect) {
      toneSelect.addEventListener("change", (e) => {
        delAlarmAudio.setTone(e.target.value);
        delAlarmAudio.playCurrentAlarmTone();
      });
    }

    // Volume Slider
    const volSlider = document.getElementById("alarmVolumeSlider");
    if (volSlider) {
      volSlider.addEventListener("input", (e) => {
        delAlarmAudio.setVolume(parseFloat(e.target.value));
      });
    }

    // Mute Audio Toggle
    const muteBtn = document.getElementById("btnToggleMute");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const isMuted = delAlarmAudio.toggleMute();
        muteBtn.innerHTML = isMuted ? `<i class="fa-solid fa-volume-xmark"></i>` : `<i class="fa-solid fa-volume-high"></i>`;
        muteBtn.classList.toggle("muted", isMuted);
      });
    }

    // Voice Speech Toggle
    const voiceCheckbox = document.getElementById("voiceToggleCheckbox");
    if (voiceCheckbox) {
      voiceCheckbox.addEventListener("change", (e) => {
        delAlarmAudio.isVoiceEnabled = e.target.checked;
      });
    }

    // Test Alarm Button
    const testBtn = document.getElementById("btnTestAlarm");
    if (testBtn) {
      testBtn.addEventListener("click", () => {
        const sampleAct = this.currentActivity || IT_DEL_DATA.weekdaySchedule[0];
        delAlarmAudio.triggerActivityAlarm(sampleAct);
        this.showAlarmModal(sampleAct);
      });
    }

    // Modal Action Buttons
    const btnDismiss = document.getElementById("btnDismissAlarmModal");
    const btnSnooze = document.getElementById("btnSnoozeAlarmModal");
    if (btnDismiss) btnDismiss.addEventListener("click", () => this.dismissAlarmModal());
    if (btnSnooze) btnSnooze.addEventListener("click", () => this.snoozeAlarm(5));

    // Add Task Form Modal / Inputs
    const taskForm = document.getElementById("addTaskForm");
    if (taskForm) {
      taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("taskInputTitle");
        const catSelect = document.getElementById("taskInputCategory");
        const dateInput = document.getElementById("taskInputDeadline");
        const prioritySelect = document.getElementById("taskInputPriority");

        this.addTask(titleInput.value, catSelect.value, dateInput.value, prioritySelect.value);
        titleInput.value = "";
        dateInput.value = "";
        this.showToast("✅ Tugas baru berhasil ditambahkan!");
      });
    }

    // Set Active Day button initially
    const currentDay = new Date().getDay();
    document.querySelectorAll(".day-selector-btn").forEach(btn => {
      if (parseInt(btn.getAttribute("data-day"), 10) === currentDay) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
}

// Inisialisasi saat window dimuat
let delApp = null;
window.addEventListener("DOMContentLoaded", () => {
  delApp = new DelTimeApp();
});
