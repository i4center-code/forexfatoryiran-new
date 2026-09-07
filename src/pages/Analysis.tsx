import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import eventsData from '../data/events.json';
import { TrendingUp, TrendingDown, Minus, User, Calendar } from 'lucide-react';

export default function AnalysisPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'bullish': return theme === 'dark' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-600 border-green-200';
      case 'bearish': return theme === 'dark' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200';
      default: return theme === 'dark' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-50 text-yellow-600 border-yellow-200';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t('Market Analysis', 'تحلیل بازار')}
        </h1>
        <p className={`text-sm ${mutedText}`}>
          {t('Expert analysis for major currency pairs', 'تحلیل تخصصی جفت‌ارزهای اصلی')}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {eventsData.analysis.map(item => (
          <div key={item.id} className={`rounded-xl border p-4 text-center ${cardClass}`}>
            <div className="text-lg font-bold mb-1">{item.pair}</div>
            <div className="flex items-center justify-center gap-1">
              {getDirectionIcon(item.direction)}
              <span className="text-sm font-medium">
                {language === 'fa' ? item.directionFa : item.direction}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Cards */}
      <div className="space-y-4">
        {eventsData.analysis.map(item => (
          <div key={item.id} className={`rounded-xl border p-5 sm:p-6 ${cardClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold">{language === 'fa' ? item.titleFa : item.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getDirectionColor(item.direction)}`}>
                    {language === 'fa' ? item.directionFa : item.direction}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${mutedText}`}>
                  {language === 'fa' ? item.summaryFa : item.summary}
                </p>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-1 text-xs ${mutedText}`}>
                    <User className="w-3.5 h-3.5" />
                    <span>{language === 'fa' ? item.authorFa : item.author}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${mutedText}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${
                item.direction === 'bullish' ? 'bg-green-500/10' : item.direction === 'bearish' ? 'bg-red-500/10' : 'bg-yellow-500/10'
              }`}>
                {getDirectionIcon(item.direction)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className={`mt-8 p-4 rounded-xl border text-center ${theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <p className={`text-xs ${mutedText}`}>
          {t(
            '⚠️ This analysis is for educational purposes only and does not constitute financial advice.',
            '⚠️ این تحلیل فقط برای اهداف آموزشی است و توصیه مالی محسوب نمی‌شود.'
          )}
        </p>
      </div>
    </div>
  );
}
