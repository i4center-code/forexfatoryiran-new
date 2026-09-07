import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Clock, BarChart3, Globe, AlertTriangle, Lightbulb, Target, TrendingUp } from 'lucide-react';

export default function GuidePage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  const sections = [
    {
      icon: Clock,
      titleEn: 'Understanding the Economic Calendar',
      titleFa: 'درک تقویم اقتصادی',
      contentEn: 'The economic calendar shows scheduled economic events that can affect currency markets. Each event has an impact rating (high, medium, low) indicating its potential market effect. High-impact events like interest rate decisions and employment reports typically cause the most volatility.',
      contentFa: 'تقویم اقتصادی رویدادهای برنامه‌ریزی‌شده اقتصادی را نشان می‌دهد که می‌توانند بر بازار ارز تأثیر بگذارند. هر رویداد دارای رتبه‌بندی تأثیر (بالا، متوسط، پایین) است که نشان‌دهنده اثر احتمالی آن بر بازار است. رویدادهای با تأثیر بالا مانند تصمیمات نرخ بهره و گزارش‌های اشتغال معمولاً بیشترین نوسان را ایجاد می‌کنند.'
    },
    {
      icon: BarChart3,
      titleEn: 'Reading the Data',
      titleFa: 'خواندن داده‌ها',
      contentEn: 'Each event shows three key numbers: Forecast (market expectation), Previous (last reading), and Actual (released data). When the actual number significantly differs from the forecast, it creates trading opportunities. For example, if US Non-Farm Payrolls come in much higher than expected, the USD typically strengthens.',
      contentFa: 'هر رویداد سه عدد کلیدی را نشان می‌دهد: پیش‌بینی (انتظار بازار)، قبلی (آخرین خوانش) و واقعی (داده منتشر شده). وقتی عدد واقعی به طور قابل توجهی با پیش‌بینی تفاوت داشته باشد، فرصت‌های معاملاتی ایجاد می‌شود. به عنوان مثال، اگر اشتغال بخش غیرکشاورزی آمریکا بسیار بالاتر از انتظار باشد، دلار آمریکا معمولاً تقویت می‌شود.'
    },
    {
      icon: Globe,
      titleEn: 'Major Currency Sessions',
      titleFa: 'جلسات اصلی ارزها',
      contentEn: 'Forex markets operate 24/5 across major sessions: Sydney (22:00 GMT), Tokyo (00:00 GMT), London (08:00 GMT), and New York (13:00 GMT). The overlap between London and New York sessions (13:00-17:00 GMT) typically sees the highest volume and volatility.',
      contentFa: 'بازار فارکس ۲۴ ساعته در ۵ روز هفته در جلسات اصلی فعالیت می‌کند: سیدنی (۲۲:۰۰ GMT)، توکیو (۰۰:۰۰ GMT)، لندن (۰۸:۰۰ GMT) و نیویورک (۱۳:۰۰ GMT). همپوشانی بین جلسات لندن و نیویورک (۱۳:۰۰-۱۷:۰۰ GMT) معمولاً بیشترین حجم و نوسان را دارد.'
    },
    {
      icon: Target,
      titleEn: 'Trading Strategies',
      titleFa: 'استراتژی‌های معاملاتی',
      contentEn: 'Common strategies include: News Trading (entering positions right before/after high-impact events), Range Trading (trading between support and resistance levels), and Trend Following (riding established trends). Always use proper risk management with stop-losses.',
      contentFa: 'استراتژی‌های رایج شامل: معامله خبری (ورود به موقعیت درست قبل/بعد از رویدادهای با تأثیر بالا)، معامله محدوده‌ای (معامله بین سطوح حمایت و مقاومت) و دنبال‌کردن روند (سوار شدن بر روندهای تثبیت‌شده). همیشه از مدیریت ریسک مناسب با حد ضرر استفاده کنید.'
    },
    {
      icon: AlertTriangle,
      titleEn: 'Risk Management',
      titleFa: 'مدیریت ریسک',
      contentEn: 'Never risk more than 1-2% of your account on a single trade. Use stop-loss orders to limit potential losses. During high-impact news events, consider reducing position sizes as spreads widen and slippage increases. Keep a trading journal to track your performance.',
      contentFa: 'هرگز بیش از ۱-۲ درصد حساب خود را در یک معامله ریسک نکنید. از سفارشات حد ضرر برای محدود کردن ضررهای احتمالی استفاده کنید. در طول رویدادهای خبری با تأثیر بالا، کاهش اندازه موقعیت‌ها را در نظر بگیرید زیرا اسپرد گسترش می‌یابد و لغزش افزایش می‌یابد.'
    },
    {
      icon: Lightbulb,
      titleEn: 'Tips for Beginners',
      titleFa: 'نکات برای مبتدیان',
      contentEn: 'Start with a demo account to practice without risking real money. Focus on one or two currency pairs initially. Learn technical analysis basics (support/resistance, trendlines, candlestick patterns). Stay updated with economic news and understand how fundamental analysis works.',
      contentFa: 'با یک حساب دمو شروع کنید تا بدون ریسک پول واقعی تمرین کنید. در ابتدا روی یک یا دو جفت ارز تمرکز کنید. مبانی تحلیل تکنیکال (حمایت/مقاومت، خطوط روند، الگوهای کندل‌استیک) را بیاموزید. از اخبار اقتصادی به‌روز باشید و درک کنید که تحلیل بنیادی چگونه کار می‌کند.'
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {t('Trading Guide', 'راهنمای معامله')}
        </h1>
        <p className={`text-sm ${mutedText}`}>
          {t('Learn the basics of forex trading and economic calendar', 'مبانی معامله فارکس و تقویم اقتصادی را بیاموزید')}
        </p>
      </div>

      {/* Hero Section */}
      <div className={`rounded-2xl p-6 sm:p-8 mb-8 bg-gradient-to-br ${theme === 'dark' ? 'from-blue-900/30 to-purple-900/30 border border-blue-800/30' : 'from-blue-50 to-purple-50 border border-blue-200'}`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">
              {t('Getting Started with Forex', 'شروع کار با فارکس')}
            </h2>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              {t(
                'Forex (Foreign Exchange) is the global marketplace for buying and selling currencies. With over $7.5 trillion traded daily, it\'s the largest financial market in the world. Understanding economic indicators and their impact on currency pairs is essential for successful trading.',
                'فارکس (مبادلات ارزی) بازار جهانی خرید و فروش ارزها است. با بیش از ۷.۵ تریلیون دلار معامله روزانه، بزرگترین بازار مالی جهان است. درک شاخص‌های اقتصادی و تأثیر آنها بر جفت‌ارزها برای معامله موفق ضروری است.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className={`rounded-xl border p-5 sm:p-6 ${cardClass}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <section.icon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-2">
                  {language === 'fa' ? section.titleFa : section.titleEn}
                </h3>
                <p className={`text-sm leading-relaxed ${mutedText}`}>
                  {language === 'fa' ? section.contentFa : section.contentEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Terms */}
      <div className={`mt-8 rounded-xl border p-6 ${cardClass}`}>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          {t('Key Terms', 'اصطلاحات کلیدی')}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { en: 'Pip', fa: 'پیپ', descEn: 'Smallest price movement in forex', descFa: 'کوچکترین حرکت قیمت در فارکس' },
            { en: 'Spread', fa: 'اسپرد', descEn: 'Difference between bid and ask price', descFa: 'تفاوت بین قیمت خرید و فروش' },
            { en: 'Leverage', fa: 'اهرم', descEn: 'Borrowed capital to increase position size', descFa: 'سرمایه قرضی برای افزایش اندازه موقعیت' },
            { en: 'Lot Size', fa: 'اندازه لات', descEn: 'Standard unit of trade (1 lot = 100,000 units)', descFa: 'واحد استاندارد معامله (۱ لات = ۱۰۰,۰۰۰ واحد)' },
            { en: 'Stop Loss', fa: 'حد ضرر', descEn: 'Order to limit losses on a trade', descFa: 'سفارش برای محدود کردن ضرر در معامله' },
            { en: 'Take Profit', fa: 'حد سود', descEn: 'Order to lock in profits at a target level', descFa: 'سفارش برای ثبت سود در سطح هدف' },
          ].map((term, i) => (
            <div key={i} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <span className="font-bold text-sm">{language === 'fa' ? term.fa : term.en}</span>
              <p className={`text-xs mt-1 ${mutedText}`}>{language === 'fa' ? term.descFa : term.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
