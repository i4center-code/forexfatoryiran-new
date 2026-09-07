import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import eventsData from '../data/events.json';
import { Newspaper, Clock, ExternalLink, Tag } from 'lucide-react';

export default function NewsPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', en: 'All', fa: 'همه' },
    { id: 'central-banks', en: 'Central Banks', fa: 'بانک‌های مرکزی' },
    { id: 'market-analysis', en: 'Market Analysis', fa: 'تحلیل بازار' },
    { id: 'commodities', en: 'Commodities', fa: 'کالاها' },
    { id: 'economics', en: 'Economics', fa: 'اقتصاد' },
  ];

  const filteredNews = categoryFilter === 'all'
    ? eventsData.news
    : eventsData.news.filter(n => n.category === categoryFilter);

  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300';
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t('Forex News', 'اخبار فارکس')}
        </h1>
        <p className={`text-sm ${mutedText}`}>
          {t('Latest market news and updates', 'آخرین اخبار و به‌روزرسانی‌های بازار')}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              categoryFilter === cat.id
                ? 'bg-blue-500 text-white'
                : theme === 'dark' ? 'bg-gray-900 text-gray-400 hover:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {language === 'fa' ? cat.fa : cat.en}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map(news => (
          <article key={news.id} className={`rounded-xl border p-5 transition-all cursor-pointer ${cardClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Tag className="w-3 h-3" />
                {language === 'fa' ? news.categoryFa : news.category}
              </span>
              <span className={`text-xs ${mutedText} flex items-center gap-1`}>
                <Clock className="w-3 h-3" />
                {news.date}
              </span>
            </div>
            <h3 className="font-bold text-base mb-2 leading-relaxed">
              {language === 'fa' ? news.titleFa : news.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-4 ${mutedText}`}>
              {language === 'fa' ? news.summaryFa : news.summary}
            </p>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${mutedText}`}>{news.source}</span>
              <ExternalLink className="w-4 h-4 text-blue-500" />
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className={`text-center py-16 ${mutedText}`}>
          <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{t('No news found', 'خبری یافت نشد')}</p>
        </div>
      )}
    </div>
  );
}
