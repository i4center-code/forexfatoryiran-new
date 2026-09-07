import * as jalaali from 'jalaali-js';

export function toJalali(dateStr: string): string {
  const date = new Date(dateStr);
  const result = jalaali.toJalaali(date);
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return `${result.jd} ${months[result.jm - 1]} ${result.jy}`;
}

export function toJalaliShort(dateStr: string): string {
  const date = new Date(dateStr);
  const result = jalaali.toJalaali(date);
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  return `${result.jd} ${months[result.jm - 1]}`;
}

export function getNext7Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function getDayName(dateStr: string, lang: 'fa' | 'en'): string {
  const date = new Date(dateStr);
  const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysFa = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
  return lang === 'en' ? daysEn[date.getDay()] : daysFa[date.getDay()];
}

export function convertTime(time: string, fromTimezone: string, toTimezone: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
  
  const fromOffset = getTimezoneOffset(fromTimezone);
  const toOffset = getTimezoneOffset(toTimezone);
  
  const diff = toOffset - fromOffset;
  date.setMinutes(date.getMinutes() + diff);
  
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function getTimezoneOffset(tz: string): number {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset'
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(p => p.type === 'timeZoneName');
    if (offsetPart) {
      const match = offsetPart.value.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
      if (match) {
        const hours = parseInt(match[1]);
        const mins = match[2] ? parseInt(match[2]) : 0;
        return hours * 60 + (hours >= 0 ? mins : -mins);
      }
    }
  } catch {
    // fallback
  }
  return 0;
}

export function getImpactColor(impact: string): string {
  switch (impact) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
}

export function getImpactLabel(impact: string, lang: 'fa' | 'en'): string {
  if (lang === 'fa') {
    switch (impact) {
      case 'high': return 'تأثیر بالا';
      case 'medium': return 'تأثیر متوسط';
      case 'low': return 'تأثیر پایین';
      default: return impact;
    }
  }
  switch (impact) {
    case 'high': return 'High Impact';
    case 'medium': return 'Medium Impact';
    case 'low': return 'Low Impact';
    default: return impact;
  }
}
