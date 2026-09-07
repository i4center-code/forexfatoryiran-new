import { useMemo, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTimezone } from '../contexts/TimezoneContext';
import { getNext7Days, toJalali, getDayName, convertTime, getImpactColor, getImpactLabel } from '../utils/dateUtils';
import eventsData from '../data/events.json';
import { Filter, Clock, MapPin } from 'lucide-react';

// Assign events to next 7 days dynamically
function getDynamicEvents() {
  const days = getNext7Days();
  const events = eventsData.events;
  const result = [...events];
  
  // Redistribute events across next 7 days
  const eventsPerDay = Math.ceil(events.length / 7);
  result.forEach((event, index) => {
    const dayIndex = Math.floor(index / eventsPerDay);
    if (dayIndex < 7) {
      result[index] = { ...event, date: days[dayIndex] };
    }
  });
  
  return result;
}

export default function CalendarPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const { selectedTimezone } = useTimezone();
  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');

  const days = useMemo(() => getNext7Days(), []);
  const dynamicEvents = useMemo(() => getDynamicEvents(), []);
  
  const currencies = useMemo(() => {
    const set = new Set(dynamicEvents.map(e => e.currency));
    return Array.from(set).sort();
  }, [dynamicEvents]);

  const filteredEvents = useMemo(() => {
    return dynamicEvents.filter(event => {
      if (impactFilter !== 'all' && event.impact !== impactFilter) return false;
      if (currencyFilter !== 'all' && event.currency !== currencyFilter) return false;
      return true;
    });
  }, [dynamicEvents, impactFilter, currencyFilter]);

  const getEventsForDay = (date: string) => {
    return filteredEvents
      .filter(e => e.date === date)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t('Economic Calendar', 'تقویم اقتصادی')}
        </h1>
        <p className={`text-sm ${mutedText}`}>
          {t('Next 7 days economic events', 'رویدادهای اقتصادی ۷ روز آینده')}
        </p>
      </div>

      {/* Filters */}
      <div className={`flex flex-wrap gap-3 mb-6 p-4 rounded-xl border ${cardClass}`}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">{t('Filters:', 'فیلترها:')}</span>
        </div>
        <select
          value={impactFilter}
          onChange={e => setImpactFilter(e.target.value)}
          className={`text-sm rounded-lg px-3 py-1.5 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-700'}`}
        >
          <option value="all">{t('All Impacts', 'همه تأثیرها')}</option>
          <option value="high">{t('High', 'بالا')}</option>
          <option value="medium">{t('Medium', 'متوسط')}</option>
          <option value="low">{t('Low', 'پایین')}</option>
        </select>
        <select
          value={currencyFilter}
          onChange={e => setCurrencyFilter(e.target.value)}
          className={`text-sm rounded-lg px-3 py-1.5 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-700'}`}
        >
          <option value="all">{t('All Currencies', 'همه ارزها')}</option>
          {currencies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Calendar Days */}
      <div className="space-y-6">
        {days.map(day => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div key={day} className={`rounded-xl border overflow-hidden ${cardClass}`}>
              {/* Day Header */}
              <div className={`px-4 sm:px-6 py-3 border-b ${theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-base">
                      {getDayName(day, language)}
                    </h2>
                    <p className={`text-xs ${mutedText}`}>
                      {language === 'fa' ? toJalali(day) : new Date(day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      {dayEvents.length} {t('events', 'رویداد')}
                    </span>
                  </div>
                </div>
              </div>

              {dayEvents.length > 0 && (
                <>
                  {/* Desktop Table */}
                  <div className="overflow-x-auto hidden sm:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`text-xs ${mutedText} ${theme === 'dark' ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
                          <th className="px-4 py-2 text-start font-medium">{t('Time', 'زمان')}</th>
                          <th className="px-4 py-2 text-start font-medium">{t('Currency', 'ارز')}</th>
                          <th className="px-4 py-2 text-start font-medium">{t('Event', 'رویداد')}</th>
                          <th className="px-4 py-2 text-center font-medium">{t('Impact', 'تأثیر')}</th>
                          <th className="px-4 py-2 text-center font-medium hidden md:table-cell">{t('Forecast', 'پیش‌بینی')}</th>
                          <th className="px-4 py-2 text-center font-medium hidden md:table-cell">{t('Previous', 'قبلی')}</th>
                          <th className="px-4 py-2 text-center font-medium hidden lg:table-cell">{t('Actual', 'واقعی')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dayEvents.map(event => (
                          <tr key={event.id} className={`border-b last:border-b-0 ${theme === 'dark' ? 'border-gray-800/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-400" />
                                <span className="font-mono text-xs">
                                  {convertTime(event.time, event.timezone, selectedTimezone)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{event.flag}</span>
                                <span className="font-medium">{event.currency}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-sm">
                                  {language === 'fa' ? event.eventFa : event.event}
                                </p>
                                <p className={`text-xs ${mutedText} flex items-center gap-1 mt-0.5`}>
                                  <MapPin className="w-3 h-3" />
                                  {language === 'fa' ? event.countryFa : event.country}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <span className={`w-2.5 h-2.5 rounded-full ${getImpactColor(event.impact)}`} />
                                <span className={`text-xs ${mutedText} hidden lg:inline`}>
                                  {getImpactLabel(event.impact, language)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">
                              <span className="font-mono text-xs">{event.forecast}</span>
                            </td>
                            <td className="px-4 py-3 text-center hidden md:table-cell">
                              <span className={`font-mono text-xs ${mutedText}`}>{event.previous}</span>
                            </td>
                            <td className="px-4 py-3 text-center hidden lg:table-cell">
                              {event.actual ? (
                                <span className="font-mono text-xs font-bold text-green-500">{event.actual}</span>
                              ) : (
                                <span className={`text-xs ${mutedText}`}>—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className={`sm:hidden divide-y ${theme === 'dark' ? 'divide-gray-800/50' : 'divide-gray-100'}`}>
                    {dayEvents.map(event => (
                      <div key={event.id} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{event.flag}</span>
                            <span className="font-bold">{event.currency}</span>
                            <span className={`w-2 h-2 rounded-full ${getImpactColor(event.impact)}`} />
                          </div>
                          <span className="font-mono text-xs text-blue-400">
                            {convertTime(event.time, event.timezone, selectedTimezone)}
                          </span>
                        </div>
                        <p className="font-medium text-sm">{language === 'fa' ? event.eventFa : event.event}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className={mutedText}>{language === 'fa' ? event.countryFa : event.country}</span>
                          <div className="flex gap-3">
                            <span>{t('F:', 'پ:')} <span className="font-mono">{event.forecast}</span></span>
                            <span>{t('P:', 'ق:')} <span className={`font-mono ${mutedText}`}>{event.previous}</span></span>
                            {event.actual && <span className="text-green-500 font-bold">{event.actual}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {dayEvents.length === 0 && (
                <div className={`px-4 py-8 text-center text-sm ${mutedText}`}>
                  {t('No events scheduled for this day', 'رویدادی برای این روز برنامه‌ریزی نشده')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className={`mt-6 p-4 rounded-xl border ${cardClass}`}>
        <div className="flex flex-wrap items-center gap-4">
          <span className={`text-xs font-medium ${mutedText}`}>{t('Impact Legend:', 'راهنمای تأثیر:')}</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs">{t('High', 'بالا')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs">{t('Medium', 'متوسط')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs">{t('Low', 'پایین')}</span>
          </div>
          <div className="flex items-center gap-1.5 ms-auto">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-xs">{t('Times shown in:', 'زمان‌ها به وقت:')} {eventsData.timezones.find(tz => tz.id === selectedTimezone)?.[language === 'fa' ? 'nameFa' : 'name']}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
