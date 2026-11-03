export const DIAL_CODES = [
  { code: 'bd', dial: '+880', label: 'Bangladesh' },
  { code: 'cn', dial: '+86', label: 'China' },
  { code: 'ae', dial: '+971', label: 'UAE' },
  { code: 'sa', dial: '+966', label: 'Saudi Arabia' },
  { code: 'in', dial: '+91', label: 'India' },
  { code: 'my', dial: '+60', label: 'Malaysia' },
  { code: 'sg', dial: '+65', label: 'Singapore' },
  { code: 'th', dial: '+66', label: 'Thailand' },
  { code: 'gb', dial: '+44', label: 'UK' },
  { code: 'us', dial: '+1', label: 'USA' },
]

export function splitPhone(phone = '') {
  const match = DIAL_CODES.find((entry) => phone.startsWith(entry.dial))
  return match
    ? { dialCode: match.dial, phone: phone.slice(match.dial.length).trim() }
    : { dialCode: DIAL_CODES[0].dial, phone: phone.trim() }
}
