/** Confirmed event details. Update this file to personalize the invitation. */
export const invitation = {
  title: 'The Kanth Samyuktha Story ♥',
  names: ['Chandra Kanth', 'Samyuktha'],
  event: 'Engagement Invitation',
  date: 'Thursday, November 12th, 2026',
  startsAt: '2026-11-12T10:00:00+05:30',
  time: '10:00 AM',
  venue: 'Arya Vysya Function Hall',
  address: 'Gopalpet, Medak, Telangana',
  mapsUrl: 'https://maps.app.goo.gl/gNgGVQ9RK7J2vLjh9',
  hosts: ['Thodupunuri Prabhakar', 'Thodupunuri Amrutha'],
  message: 'With the blessings of our families and hearts filled with joy, we invite you to celebrate our engagement. Join us as two hearts come together and a beautiful new chapter begins.',
  credit: 'Designed and developed with ♥ by',
  creditName: 'Surya Teja Gupta',
  creditUrl: 'https://www.linkedin.com/in/suryatejathodupunuri',
  rsvpUrl: '', // Optional HTTPS RSVP form or WhatsApp link, when available.
};
export const artwork = {
  portrait: '/media/indian/temple-portrait.webp',
  landscape: '/media/indian/temple-landscape.webp',
  ritual: '/media/indian/engagement-ritual-v2.webp',
  closingPortrait: '/media/indian/closing-garden-portrait.webp',
  closingLandscape: '/media/indian/closing-garden-landscape.webp',
};

const start = new Date(invitation.startsAt);
const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', ...options }).format(start);
const day = part({ day: '2-digit' });
const dayNumber = Number(day);
const ordinalSuffix = dayNumber % 100 >= 11 && dayNumber % 100 <= 13 ? 'th' : dayNumber % 10 === 1 ? 'st' : dayNumber % 10 === 2 ? 'nd' : dayNumber % 10 === 3 ? 'rd' : 'th';
export const eventDate = { day, dayOrdinal: `${dayNumber}${ordinalSuffix}`, ordinalSuffix, month: part({ month: 'long' }), year: part({ year: 'numeric' }), weekday: part({ weekday: 'long' }) };
