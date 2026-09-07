import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TimezoneProvider } from './contexts/TimezoneContext';
import Layout from './components/Layout';
import CalendarPage from './pages/Calendar';
import NewsPage from './pages/News';
import AnalysisPage from './pages/Analysis';
import GuidePage from './pages/Guide';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TimezoneProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<CalendarPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
                <Route path="/guide" element={<GuidePage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TimezoneProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
