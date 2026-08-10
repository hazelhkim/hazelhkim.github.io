(function () {
  var root = document.querySelector("[data-meet-app]");
  if (!root) return;

  var configEl = root.querySelector("[data-meet-config]");
  var grid = root.querySelector("[data-meet-grid]");
  var weekLabel = root.querySelector("[data-meet-week-label]");
  var emptyEl = root.querySelector("[data-meet-empty]");
  var form = root.querySelector("[data-meet-form]");
  var selectedEl = root.querySelector("[data-meet-selected]");
  var slotInput = root.querySelector("[data-meet-slot-input]");
  var submitBtn = root.querySelector("[data-meet-submit]");
  var prevBtn = root.querySelector("[data-meet-prev]");
  var nextBtn = root.querySelector("[data-meet-next]");
  var syncEl = root.querySelector("[data-meet-sync]");

  if (!configEl || !grid || !form) return;

  var config;
  try {
    config = JSON.parse(configEl.textContent);
  } catch (err) {
    return;
  }

  var emailTo = root.getAttribute("data-email") || "";
  var subject = root.getAttribute("data-subject") || "Meeting request";
  var tzLabel = root.getAttribute("data-timezone-label") || "";
  var slotMinutes = parseInt(root.getAttribute("data-slot-minutes"), 10) || 30;
  var horizonDays = parseInt(root.getAttribute("data-horizon-days"), 10) || 28;
  var bufferHours = parseInt(root.getAttribute("data-buffer-hours"), 10) || 12;
  var googleBusyUrl = (root.getAttribute("data-google-busy-url") || "").trim();
  var weeklyHours = config.weeklyHours || [];
  var blockedDates = {};
  (config.blockedDates || []).forEach(function (d) {
    blockedDates[d] = true;
  });

  var weekStart = startOfWeek(new Date());
  var selectedIso = null;
  var busyRanges = [];

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function startOfWeek(date) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var day = d.getDay();
    var diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function ymd(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function parseHm(hm) {
    var parts = String(hm).split(":");
    return { h: parseInt(parts[0], 10) || 0, m: parseInt(parts[1], 10) || 0 };
  }

  function formatDay(date) {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  function formatTime(date) {
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatSlotLabel(date) {
    return (
      date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }) +
      " · " +
      formatTime(date) +
      (tzLabel ? " (" + tzLabel + ")" : "")
    );
  }

  function hoursForDay(dayIndex) {
    return weeklyHours.filter(function (w) {
      return Number(w.day) === dayIndex;
    });
  }

  function overlapsBusy(slotStart, slotEnd) {
    for (var i = 0; i < busyRanges.length; i++) {
      var b = busyRanges[i];
      if (slotStart < b.end && slotEnd > b.start) return true;
    }
    return false;
  }

  function slotsForDate(date) {
    var key = ymd(date);
    if (blockedDates[key]) return [];

    var now = new Date();
    var minStart = new Date(now.getTime() + bufferHours * 60 * 60 * 1000);
    var horizon = new Date(now.getTime() + horizonDays * 24 * 60 * 60 * 1000);
    if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return [];
    if (date > horizon) return [];

    var windows = hoursForDay(date.getDay());
    var slots = [];

    windows.forEach(function (win) {
      var startParts = parseHm(win.start);
      var endParts = parseHm(win.end);
      var cursor = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        startParts.h,
        startParts.m,
        0,
        0
      );
      var end = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        endParts.h,
        endParts.m,
        0,
        0
      );

      while (cursor.getTime() + slotMinutes * 60 * 1000 <= end.getTime()) {
        var slotEnd = new Date(cursor.getTime() + slotMinutes * 60 * 1000);
        if (cursor >= minStart && cursor <= horizon && !overlapsBusy(cursor, slotEnd)) {
          slots.push(new Date(cursor.getTime()));
        }
        cursor = slotEnd;
      }
    });

    return slots;
  }

  function setSync(message, state) {
    if (!syncEl) return;
    syncEl.textContent = message;
    syncEl.hidden = !message;
    syncEl.classList.remove("is-ok", "is-warn", "is-error");
    if (state) syncEl.classList.add(state);
  }

  function render() {
    grid.innerHTML = "";
    var totalSlots = 0;
    var end = new Date(weekStart);
    end.setDate(end.getDate() + 6);

    weekLabel.textContent =
      formatDay(weekStart) + " – " + formatDay(end) + (tzLabel ? " · " + tzLabel : "");

    for (var i = 0; i < 7; i++) {
      var day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      var slots = slotsForDate(day);
      totalSlots += slots.length;

      var col = document.createElement("div");
      col.className = "meet-day";

      var heading = document.createElement("h3");
      heading.className = "meet-day-label";
      heading.textContent = formatDay(day);
      col.appendChild(heading);

      if (!slots.length) {
        var closed = document.createElement("p");
        closed.className = "meet-day-closed";
        closed.textContent = "Busy / closed";
        col.appendChild(closed);
      } else {
        slots.forEach(function (slot) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "meet-slot";
          btn.textContent = formatTime(slot);
          btn.dataset.iso = slot.toISOString();
          if (selectedIso === slot.toISOString()) {
            btn.classList.add("is-selected");
          }
          btn.addEventListener("click", function () {
            selectedIso = slot.toISOString();
            slotInput.value = selectedIso;
            selectedEl.textContent = "Selected: " + formatSlotLabel(slot);
            submitBtn.disabled = false;
            render();
          });
          col.appendChild(btn);
        });
      }

      grid.appendChild(col);
    }

    emptyEl.hidden = totalSlots > 0;
  }

  function applyBusyPayload(data) {
    var list = (data && data.busy) || [];
    busyRanges = list
      .map(function (b) {
        return { start: new Date(b.start), end: new Date(b.end) };
      })
      .filter(function (b) {
        return !isNaN(b.start.getTime()) && !isNaN(b.end.getTime());
      });
    setSync(
      "Synced with Google Calendar · " + busyRanges.length + " busy block" + (busyRanges.length === 1 ? "" : "s"),
      "is-ok"
    );
    render();
  }

  function loadGoogleBusy() {
    if (!googleBusyUrl) {
      setSync(
        "Google Calendar not connected yet — showing weekly open hours only. Add google_busy_url in _data/meet.yaml.",
        "is-warn"
      );
      render();
      return;
    }

    setSync("Checking Google Calendar…", null);

    var callbackName = "__meetBusyCb_" + String(Date.now());
    var timeout = setTimeout(function () {
      cleanup();
      setSync("Could not reach Google Calendar sync. Showing weekly hours only.", "is-error");
      render();
    }, 10000);

    function cleanup() {
      clearTimeout(timeout);
      if (window[callbackName]) delete window[callbackName];
      if (script && script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = function (data) {
      cleanup();
      applyBusyPayload(data || {});
    };

    var script = document.createElement("script");
    var joiner = googleBusyUrl.indexOf("?") >= 0 ? "&" : "?";
    script.src = googleBusyUrl + joiner + "callback=" + encodeURIComponent(callbackName);
    script.onerror = function () {
      cleanup();
      setSync("Could not reach Google Calendar sync. Showing weekly hours only.", "is-error");
      render();
    };
    document.head.appendChild(script);
  }

  prevBtn.addEventListener("click", function () {
    var next = new Date(weekStart);
    next.setDate(next.getDate() - 7);
    var earliest = startOfWeek(new Date());
    if (next < earliest) next = earliest;
    weekStart = next;
    render();
  });

  nextBtn.addEventListener("click", function () {
    var next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    var max = startOfWeek(new Date(Date.now() + horizonDays * 24 * 60 * 60 * 1000));
    if (next > max) next = max;
    weekStart = next;
    render();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!selectedIso || !emailTo) return;

    var name = (form.elements.name.value || "").trim();
    var fromEmail = (form.elements.email.value || "").trim();
    var note = (form.elements.note.value || "").trim();
    var when = new Date(selectedIso);

    var body = [
      "Hi Hazel,",
      "",
      "I'd like to request a meeting.",
      "",
      "When: " + formatSlotLabel(when),
      "Name: " + name,
      "Email: " + fromEmail,
      "",
      "What this is for:",
      note,
      "",
      "(Sent from your website Meet page)",
    ].join("\n");

    var href =
      "mailto:" +
      emailTo +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = href;
  });

  loadGoogleBusy();
})();
