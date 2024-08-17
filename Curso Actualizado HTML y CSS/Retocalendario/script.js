// script.js

// Obtener referencias a los elementos DOM
const calendar = document.getElementById('calendar');
const startDateDisplay = document.getElementById('start-date');
const endDateDisplay = document.getElementById('end-date');

let startDate = null;
let endDate = null;

// Función para generar los días del calendario
function generateCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Obtener el primer día del mes
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Obtener el último día del mes
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Limpiar el calendario antes de generarlo
    calendar.innerHTML = '';

    // Añadir días del mes al calendario
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendar.appendChild(emptyDay);
    }

    for (let date = 1; date <= lastDateOfMonth; date++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = date;

        day.addEventListener('click', () => selectDate(day, date));

        calendar.appendChild(day);
    }
}

// Función para seleccionar fechas
function selectDate(dayElement, date) {
    if (!startDate || (startDate && endDate)) {
        // Si no hay una fecha de inicio o ambas fechas están seleccionadas, reiniciar la selección
        resetSelection();
        startDate = date;
        endDate = null;
        dayElement.classList.add('selected-start');
    } else {
        // Si solo hay una fecha de inicio seleccionada
        if (date < startDate) {
            // Si la fecha seleccionada es anterior a la fecha de inicio, actualizar la fecha de inicio
            resetSelection();
            startDate = date;
            dayElement.classList.add('selected-start');
        } else {
            // Seleccionar la fecha de fin
            endDate = date;
            dayElement.classList.add('selected-end');
            highlightRange();
        }
    }

    updateDateRangeDisplay();
}

// Función para destacar el rango de fechas seleccionado
function highlightRange() {
    const days = calendar.querySelectorAll('.day');

    days.forEach(day => {
        const date = parseInt(day.textContent);

        if (date > startDate && date < endDate) {
            day.classList.add('in-range');
        }
    });
}

// Función para actualizar la visualización del rango de fechas seleccionado
function updateDateRangeDisplay() {
    startDateDisplay.textContent = `Fecha de inicio: ${startDate ? startDate : 'No seleccionada'}`;
    endDateDisplay.textContent = `Fecha de fin: ${endDate ? endDate : 'No seleccionada'}`;
}

// Función para reiniciar la selección de fechas
function resetSelection() {
    const days = calendar.querySelectorAll('.day');

    days.forEach(day => {
        day.classList.remove('selected-start', 'selected-end', 'in-range');
    });

    startDate = null;
    endDate = null;
}

// Generar el calendario al cargar la página
generateCalendar();
