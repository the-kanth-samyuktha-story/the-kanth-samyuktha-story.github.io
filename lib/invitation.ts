/** Confirmed event details. Update this file to personalize the invitation. */
export const invitation = {
  title: 'The Story of Kanth ♥ Samyuktha',
  names: ['Chandra Kanth', 'Samyuktha'],
  event: 'Engagement Invitation',
  date: 'Thursday, 12 November 2026',
  startsAt: '2026-11-12T10:30:00+05:30',
  time: '10:30 AM',
  venue: 'Gopalraopet',
  address: 'Medak, Telangana, India',
  mapsUrl: 'https://googlemaps.com',
  hosts: ['Thodupunuri Prabhakar', 'Thodupunuri Amrutha'],
  message: 'With the blessings of our families and hearts filled with joy, we invite you to celebrate our engagement. Join us as two hearts come together and a beautiful new chapter begins.',
  credit: 'Designed and developed with ♥ by Surya Teja Gupta',
  rsvpUrl: '', // Optional HTTPS RSVP form or WhatsApp link, when available.
  film: '/media/indian/invitation-film.mp4',
};
export const artwork = {
  portrait: '/media/indian/temple-portrait.webp',
  landscape: '/media/indian/temple-landscape.webp',
  ritual: '/media/indian/engagement-ritual.webp',
};

const start = new Date(invitation.startsAt);
const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', ...options }).format(start);
export const eventDate = { day: part({ day: '2-digit' }), month: part({ month: 'long' }), year: part({ year: 'numeric' }), weekday: part({ weekday: 'long' }) };
