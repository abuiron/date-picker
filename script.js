document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const calendarDates = document.getElementById('calendar-dates');

    let selectedDate = new Date();
    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();

    const renderCalendar = (month, year) => {
        calendarDates.innerHTML = '';
        monthYear.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) {
            calendarDates.innerHTML += '<span></span>';
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('span');
            day.textContent = i;
            day.addEventListener('click', () => {
                selectedDate = new Date(year, month, i);
                dateInput.value = selectedDate.toDateString();
                calendar.classList.add('hidden');
                document.querySelector('.calendar-dates .selected')?.classList.remove('selected');
                day.classList.add('selected');
            });
            calendarDates.appendChild(day);
        }
    };

    dateInput.addEventListener('click', () => {
        calendar.classList.toggle('hidden');
    });

    prevMonth.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});
