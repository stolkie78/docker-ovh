const calendar = document.getElementById("calendar");
const monthDisplay = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const modal = document.getElementById("booking-modal");
const closeModal = document.getElementById("close-modal");
const bookingForm = document.getElementById("booking-form");
const selectedDateDisplay = document.getElementById("selected-date");

let bookings = JSON.parse(localStorage.getItem("bookings")) || {};
let currentDate = new Date();
let selectedDate = null;

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function displayMonth() {
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  monthDisplay.textContent = `${monthName} ${year}`;
}

function buildCalendar() {
  calendar.innerHTML = "";
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = (new Date(days[0]).getDay() + 6) % 7; // Maandag als eerste dag
  let currentWeekNumber = getWeekNumber(days[0]);

  // Voeg lege cellen toe voor de maand begint
  for (let i = 0; i < firstDay; i++) {
    if (i === 0) {
      const weekNumberCell = document.createElement("div");
      weekNumberCell.classList.add("week-number");
      weekNumberCell.textContent = currentWeekNumber++;
      calendar.appendChild(weekNumberCell);
    }
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("day", "inactive");
    calendar.appendChild(emptyDay);
  }

  // Voeg dagen van de maand toe
  days.forEach((day) => {
    const dayKey = day.toISOString().split("T")[0];
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.dataset.date = dayKey;
    dayElement.innerHTML = `<h3>${day.getDate()}</h3><ul></ul>`;

    // Voeg weeknummer toe als het de eerste dag van een week is
    if ((day.getDay() + 6) % 7 === 0) {
      const weekNumberCell = document.createElement("div");
      weekNumberCell.classList.add("week-number");
      weekNumberCell.textContent = currentWeekNumber++;
      calendar.appendChild(weekNumberCell);
    }

    // Voeg boekingen toe
    if (bookings[dayKey]) {
      bookings[dayKey].forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.client}: ${entry.hours} uur`;
        dayElement.querySelector("ul").appendChild(li);
      });
    }

    dayElement.addEventListener("click", () => {
      selectedDate = dayKey;
      selectedDateDisplay.textContent = `Datum: ${selectedDate}`;
      modal.classList.remove("hidden");
    });

    calendar.appendChild(dayElement);
  });
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  displayMonth();
  buildCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  displayMonth();
  buildCalendar();
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const client = document.getElementById("client").value;
  const hours = document.getElementById("hours").value;
  const description = document.getElementById("description").value;

  if (!bookings[selectedDate]) bookings[selectedDate] = [];
  bookings[selectedDate].push({ client, hours, description });

  localStorage.setItem("bookings", JSON.stringify(bookings));
  modal.classList.add("hidden");
  buildCalendar();
});

document.addEventListener("DOMContentLoaded", () => {
  displayMonth();
  buildCalendar();
});