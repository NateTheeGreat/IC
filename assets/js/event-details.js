/* =========================================================
   EVENT DETAILS PAGE - DYNAMIC CONTENT HANDLER
   ========================================================= */

// Event data object - this would typically come from a database or API
const eventData = {
    'open-house-night-2': {
        title: 'Open House - Night 2',
        month: 'Oct',
        day: '16',
        time: '6:00 PM - 8:00 PM',
        location: 'Regis University',
        fullDate: 'October 16, 2025',
        fullLocation: '3rd Floor, Clarke Hall, Room 358<br>Regis University Northwest Denver Campus',
        image: 'assets/image1.jpg',
        description: 'Join us for an exciting evening of innovation and entrepreneurship at our Open House. This is your opportunity to explore the Innovation Center, meet our team, and discover how we can help turn your ideas into reality. Whether you\'re a student, faculty member, or community entrepreneur, this event is designed to inspire and connect you with like-minded innovators.'
    },
    'kick-off-event': {
        title: 'Kick-Off Event',
        month: 'Oct',
        day: '22',
        time: '6:00 PM - 8:00 PM',
        location: 'Regis University',
        fullDate: 'October 22, 2025',
        fullLocation: '3rd Floor, Clarke Hall, Room 358<br>Regis University Northwest Denver Campus',
        image: 'assets/image2.jpg',
        description: 'Celebrate the new year\'s Innovation Challenge with participants and past winners. This kick-off event marks the beginning of an exciting journey for all teams participating in this year\'s challenge.'
    },
    'registration-deadline': {
        title: 'Deadline to Sign Up for Qualifying Pitches',
        month: 'Nov',
        day: '13',
        time: 'All Day',
        location: 'Online',
        fullDate: 'November 13, 2025',
        fullLocation: 'Online Registration<br>Visit our website to complete your registration',
        image: 'assets/image3.jpg',
        description: 'Final registration deadline for qualifying pitch rounds. Don\'t miss your opportunity to be part of this year\'s Innovation Challenge and compete for amazing prizes.'
    }
};

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to update page content based on event ID
function loadEventDetails() {
    const eventId = getUrlParameter('event') || 'open-house-night-2';
    const event = eventData[eventId] || eventData['open-house-night-2'];

    // Update all the dynamic content
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-month').textContent = event.month;
    document.getElementById('event-day').textContent = event.day;
    document.getElementById('event-time').textContent = event.time;
    document.getElementById('event-location').textContent = event.location;
    document.getElementById('event-description').textContent = event.description;
    document.getElementById('event-main-image').src = event.image;
    document.getElementById('event-main-image').alt = event.title;
    
    // Update sidebar information
    document.getElementById('sidebar-date').textContent = event.fullDate;
    document.getElementById('sidebar-time').textContent = event.time;
    document.getElementById('sidebar-location').innerHTML = event.fullLocation;

    // Update page title
    document.title = `${event.title} - Regis Innovation Center`;
}

// Function to show calendar options modal
function showCalendarOptions() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background: white; padding: 30px; border-radius: 10px; max-width: 400px; width: 90%;';
    
    modalContent.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 20px; color: #1a365d;">Add to Calendar</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button onclick="addToGoogleCalendar()" style="padding: 12px 20px; background: #4285f4; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Google Calendar</button>
            <button onclick="downloadICS()" style="padding: 12px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Download ICS File</button>
            <button onclick="closeCalendarModal()" style="padding: 12px 20px; background: white; color: #333; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 10px;">Cancel</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    modal.id = 'calendarModal';
    modal.onclick = function(e) {
        if (e.target === modal) closeCalendarModal();
    };
    document.body.appendChild(modal);
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) modal.remove();
}

// Get event details from the page
function getCurrentEventDetails() {
    const title = document.querySelector('.event-title')?.textContent || 'Event';
    const monthText = document.querySelector('.event-badge .event-month')?.textContent || '';
    const dayText = document.querySelector('.event-badge .event-day')?.textContent || '';
    const timeText = document.querySelector('.event-meta-header .meta-text')?.textContent || '';
    const location = document.querySelectorAll('.event-meta-header .meta-text')[1]?.textContent || 'Regis Innovation Center';
    const description = document.querySelector('.event-description')?.textContent || '';
    
    return { title, monthText, dayText, timeText, location, description };
}

// Convert event details to date objects
function parseEventDateTime(monthText, dayText, timeText) {
    const months = { 
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 
    };
    const month = months[monthText] || 0;
    const day = parseInt(dayText) || 1;
    
    // Determine year: events in Oct-Dec are 2025, Jan onwards are 2026
    const year = (month >= 9) ? 2025 : 2026;
    
    // Parse time (e.g., "6:00 PM - 8:00 PM")
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

// Format date for calendar URLs
function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00`;month
}

function addToGoogleCalendar() {
    const event = getCurrentEventDetails();
    const { startDate, endDate } = parseEventDateTime(event.dateText, event.dayText, event.timeText);
    
    const startFormatted = formatDateForCalendar(startDate);
    const endFormatted = formatDateForCalendar(endDate);
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startFormatted}/${endFormatted}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleUrl, '_blank');
    closeCalendarModal();
}



function downloadICS() {
    const event = getCurrentEventDetails();
    const { startDate, endDate } = parseEventDateTime(event.monthText, event.dayText, event.timeText);
    
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
    closeCalendarModal();
}

// Function to share event
function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('event-title').textContent,
            text: 'Check out this event at Regis Innovation Center!',
            url: window.location.href
        });
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Event URL copied to clipboard!');
        });
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadEventDetails();
    
    // Add event listeners to action buttons
    const registerBtn = document.querySelector('.action-btn.primary');
    const calendarBtn = document.querySelector('.action-btn.secondary');
    const shareBtn = document.querySelector('.action-btn.tertiary');
    const prominentRegisterBtn = document.querySelector('.register-btn-prominent');
    
    // Handle prominent register button
    if (prominentRegisterBtn) {
        prominentRegisterBtn.addEventListener('click', function() {
            // This would typically redirect to a registration form
            alert('Registration functionality would be implemented here!');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // This would typically redirect to a registration form
            alert('Registration functionality would be implemented here!');
        });
    }
    
    if (calendarBtn) {
        calendarBtn.addEventListener('click', showCalendarOptions);
    }
    
    // Add event listeners to all "Add to Calendar" buttons
    document.querySelectorAll('.event-btn.secondary').forEach(btn => {
        if (btn.textContent.includes('Add to Calendar')) {
            btn.addEventListener('click', showCalendarOptions);
        }
    });
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareEvent);
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Any responsive JavaScript adjustments can go here
});