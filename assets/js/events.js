// Events page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initEventFilters();
    loadAllEvents();
    initEventRegistration();
});

// ====== Event Filtering ======
function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter events
            const category = button.dataset.category;
            filterEvents(category);
        });
    });
}

function filterEvents(category) {
    const eventsGrid = document.getElementById('events-grid');
    const loading = document.getElementById('loading');
    const noEvents = document.getElementById('no-events');
    
    // Show loading
    loading.style.display = 'block';
    noEvents.style.display = 'none';
    eventsGrid.style.display = 'none';
    
    // Build API URL
    let apiUrl = 'api/events.php';
    if (category !== 'all') {
        apiUrl += `?category=${category}`;
    }
    
    // Fetch filtered events
    fetch(apiUrl)
        .then(response => response.json())
        .then(events => {
            displayEvents(events);
        })
        .catch(error => {
            console.error('Error filtering events:', error);
            showAlert('Error loading events. Please try again.', 'error');
        })
        .finally(() => {
            loading.style.display = 'none';
        });
}

// ====== Load All Events ======
function loadAllEvents() {
    const eventsGrid = document.getElementById('events-grid');
    const loading = document.getElementById('loading');
    const noEvents = document.getElementById('no-events');
    
    fetch('api/events.php')
        .then(response => response.json())
        .then(events => {
            displayEvents(events);
        })
        .catch(error => {
            console.error('Error loading events:', error);
            eventsGrid.innerHTML = '<p class="text-center">Unable to load events at this time.</p>';
            showAlert('Error loading events. Please try again.', 'error');
        })
        .finally(() => {
            loading.style.display = 'none';
        });
}

// ====== Display Events ======
function displayEvents(events) {
    const eventsGrid = document.getElementById('events-grid');
    const noEvents = document.getElementById('no-events');
    
    if (events.length === 0) {
        eventsGrid.style.display = 'none';
        noEvents.style.display = 'block';
        return;
    }
    
    eventsGrid.innerHTML = events.map(event => createEventCard(event)).join('');
    eventsGrid.style.display = 'grid';
    noEvents.style.display = 'none';
    
    // Add hover animations
    eventsGrid.querySelectorAll('.event-card-full').forEach(card => {
        card.classList.add('hover-lift');
    });
}

// ====== Create Event Card ======
function createEventCard(event) {
    const eventDate = new Date(event.date);
    const dayName = eventDate.toLocaleDateString('en', { weekday: 'short' });
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString('en', { month: 'short' });
    
    return `
        <div class="event-card-full" data-category="${event.category}">
            <div class="event-image">
                <img src="${event.image || 'assets/images/default-event.jpg'}" alt="${event.title}">
                ${event.featured ? '<div class="event-badge badge-primary">Featured</div>' : ''}
                <div class="event-category badge badge-secondary">${formatCategory(event.category)}</div>
            </div>
            
            <div class="event-content">
                <div class="event-date-time">
                    <div class="event-date-badge">
                        <span class="day-name">${dayName}</span>
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="event-time">
                        <span class="time">${event.time}</span>
                        <span class="location">📍 ${event.location}</span>
                    </div>
                </div>
                
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                
                <div class="event-actions">
                    <button class="btn btn-primary register-btn" data-event-id="${event.id}" data-event-title="${event.title}">
                        Register Now
                    </button>
                    <button class="btn btn-outline share-btn" data-event-id="${event.id}">
                        Share Event
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ====== Event Registration ======
function initEventRegistration() {
    const modal = document.getElementById('registration-modal');
    const form = document.getElementById('registration-form');
    
    // Handle registration button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('register-btn')) {
            const eventId = e.target.dataset.eventId;
            const eventTitle = e.target.dataset.eventTitle;
            openRegistrationModal(eventId, eventTitle);
        }
        
        if (e.target.classList.contains('share-btn')) {
            const eventId = e.target.dataset.eventId;
            shareEvent(eventId);
        }
    });
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitRegistration(form);
        });
    }
}

function openRegistrationModal(eventId, eventTitle) {
    const modal = document.getElementById('registration-modal');
    const eventIdInput = document.getElementById('event-id');
    const modalTitle = modal.querySelector('h2');
    
    eventIdInput.value = eventId;
    modalTitle.textContent = `Register for: ${eventTitle}`;
    
    // Use the global modal function
    if (window.RegisIC && window.RegisIC.openModal) {
        window.RegisIC.openModal('registration-modal');
    } else {
        modal.style.display = 'block';
    }
}

async function submitRegistration(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Set loading state
    if (window.RegisIC && window.RegisIC.setButtonLoading) {
        window.RegisIC.setButtonLoading(submitBtn, true);
    }
    
    try {
        const response = await fetch('api/register-event.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Registration successful! Check your email for confirmation.', 'success');
            form.reset();
            
            // Close modal
            const modal = document.getElementById('registration-modal');
            if (window.RegisIC && window.RegisIC.closeModal) {
                window.RegisIC.closeModal(modal);
            } else {
                modal.style.display = 'none';
            }
        } else {
            showAlert(result.message || 'Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('An error occurred. Please try again later.', 'error');
    } finally {
        if (window.RegisIC && window.RegisIC.setButtonLoading) {
            window.RegisIC.setButtonLoading(submitBtn, false);
        }
    }
}

// ====== Event Sharing ======
function shareEvent(eventId) {
    const url = `${window.location.origin}${window.location.pathname}?event=${eventId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Regis Innovation Center Event',
            url: url
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showAlert('Event link copied to clipboard!', 'success');
        }).catch(() => {
            showAlert('Unable to copy link. Please share manually.', 'error');
        });
    }
}

// ====== Utility Functions ======
function formatCategory(category) {
    const categoryMap = {
        'workshop': 'Workshop',
        'showcase': 'Showcase',
        'competition': 'Competition',
        'networking': 'Networking',
        'tech-talk': 'Tech Talk',
        'bootcamp': 'Bootcamp'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function showAlert(message, type = 'info') {
    // Use global alert function if available, otherwise create basic alert
    if (window.RegisIC && window.RegisIC.showAlert) {
        window.RegisIC.showAlert(message, type);
    } else {
        alert(message);
    }
}

// ====== Additional CSS for Events Page ======
const additionalStyles = `
<style>
.page-header {
    padding: 160px 0 80px;
    color: white;
    text-align: center;
    margin-top: 122px;
}

.page-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.event-filters {
    margin-bottom: 40px;
}

.filter-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}

.filter-btn.active {
    background: #2c5aa0;
    color: white;
    border-color: #2c5aa0;
}

.events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
}

.event-card-full {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.event-badge {
    position: absolute;
    top: 15px;
    right: 15px;
}

.event-category {
    position: absolute;
    top: 15px;
    left: 15px;
}

.event-content {
    padding: 25px;
}

.event-date-time {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.event-date-badge {
    background: #2c5aa0;
    color: white;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    min-width: 70px;
}

.event-date-badge .day-name {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
}

.event-date-badge .day {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
}

.event-date-badge .month {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
}

.event-time {
    flex: 1;
}

.event-time .time {
    display: block;
    font-weight: 600;
    color: #2c5aa0;
}

.event-time .location {
    display: block;
    font-size: 0.9rem;
    color: #666;
    margin-top: 5px;
}

.event-title {
    font-size: 1.3rem;
    color: #2c5aa0;
    margin-bottom: 15px;
}

.event-description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 25px;
}

.event-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.event-actions .btn {
    flex: 1;
    min-width: 120px;
}

@media (max-width: 768px) {
    .events-grid {
        grid-template-columns: 1fr;
    }
    
    .filter-buttons {
        justify-content: flex-start;
    }
    
    .event-date-time {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .event-actions {
        flex-direction: column;
    }
}
</style>
`;

// Don't add additional styles - use existing CSS
// document.head.insertAdjacentHTML('beforeend', additionalStyles);

// ====== Calendar Functions ======
function showCalendarOptions(eventCard) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background: white; padding: 30px; border-radius: 10px; max-width: 400px; width: 90%;';
    
    modalContent.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 20px; color: #1a365d;">Add to Calendar</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button onclick="window.addToGoogleCalendarFromCard(this)" style="padding: 12px 20px; background: #4285f4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Google Calendar</button>
            <button onclick="window.addToOutlookCalendarFromCard(this)" style="padding: 12px 20px; background: #0078d4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Outlook Calendar</button>
            <button onclick="window.downloadICSFromCard(this)" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Download ICS File</button>
            <button onclick="window.closeCalendarModal()" style="padding: 12px 20px; background: white; color: #333; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 10px;">Cancel</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    modal.id = 'calendarModal';
    modal.dataset.eventCard = eventCard;
    modal.onclick = function(e) {
        if (e.target === modal) window.closeCalendarModal();
    };
    document.body.appendChild(modal);
}

window.closeCalendarModal = function() {
    const modal = document.getElementById('calendarModal');
    if (modal) modal.remove();
};

function getEventDetailsFromCard(cardElement) {
    const title = cardElement.querySelector('.event-title')?.textContent || 'Event';
    const monthText = cardElement.querySelector('.event-month')?.textContent || '';
    const dayText = cardElement.querySelector('.event-day')?.textContent || '';
    const timeText = cardElement.querySelector('.event-time')?.textContent || '';
    const location = cardElement.querySelector('.event-location')?.textContent || 'Regis Innovation Center';
    const description = cardElement.querySelector('.event-description')?.textContent || '';
    
    return { title, monthText, dayText, timeText, location, description };
}

function parseEventDateTimeFromCard(monthText, dayText, timeText) {
    const months = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 };
    const month = months[monthText] || 0;
    const day = parseInt(dayText) || 1;
    const year = month < 10 ? 2025 : 2026;
    
    const timeParts = timeText.split(' - ');
    const startTimeStr = timeParts[0]?.trim() || '9:00 AM';
    const endTimeStr = timeParts[1]?.trim() || '10:00 AM';
    
    const parseTime = (timeStr) => {
        const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return { hours: 9, minutes: 0 };
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return { hours, minutes };
    };
    
    const startTime = parseTime(startTimeStr);
    const endTime = parseTime(endTimeStr);
    
    const startDate = new Date(year, month, day, startTime.hours, startTime.minutes);
    const endDate = new Date(year, month, day, endTime.hours, endTime.minutes);
    
    return { startDate, endDate };
}

function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00`;
}

window.addToGoogleCalendarFromCard = function(btn) {
    const modal = document.getElementById('calendarModal');
    const cardSelector = modal.dataset.eventCard;
    const card = document.querySelector(cardSelector);
    if (!card) return;
    
    const event = getEventDetailsFromCard(card);
    const { startDate, endDate } = parseEventDateTimeFromCard(event.monthText, event.dayText, event.timeText);
    
    const startFormatted = formatDateForCalendar(startDate);
    const endFormatted = formatDateForCalendar(endDate);
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
    window.closeCalendarModal();
};

window.addToOutlookCalendarFromCard = function(btn) {
    const modal = document.getElementById('calendarModal');
    const cardSelector = modal.dataset.eventCard;
    const card = document.querySelector(cardSelector);
    if (!card) return;
    
    const event = getEventDetailsFromCard(card);
    const { startDate, endDate } = parseEventDateTimeFromCard(event.monthText, event.dayText, event.timeText);
    
    const startFormatted = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endFormatted = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${startFormatted}&enddt=${endFormatted}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(outlookUrl, '_blank');
    window.closeCalendarModal();
};

window.downloadICSFromCard = function(btn) {
    const modal = document.getElementById('calendarModal');
    const cardSelector = modal.dataset.eventCard;
    const card = document.querySelector(cardSelector);
    if (!card) return;
    
    const event = getEventDetailsFromCard(card);
    const { startDate, endDate } = parseEventDateTimeFromCard(event.monthText, event.dayText, event.timeText);
    
    const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Regis Innovation Center//Event//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@regis.edu`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.closeCalendarModal();
};

// Add event listener for Add to Calendar buttons on events page
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('event-btn') && e.target.classList.contains('secondary') && e.target.textContent.includes('Add to Calendar')) {
        e.preventDefault();
        const eventCard = e.target.closest('.event-card');
        if (eventCard) {
            // Create a unique selector for this card
            const index = Array.from(document.querySelectorAll('.event-card')).indexOf(eventCard);
            showCalendarOptions(`.event-card:nth-of-type(${index + 1})`);
        }
    }
});