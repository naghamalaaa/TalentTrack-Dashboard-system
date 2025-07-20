import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { RootState } from './store';
import WelcomeScreen from './components/Auth/WelcomeScreen';
import LoginScreen from './components/Auth/LoginScreen';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import FilterPanel from './components/Layout/FilterPanel';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Pipeline from './pages/Pipeline';
import Interviews from './pages/Interviews';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

const AppContent = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [showWelcome, setShowWelcome] = useState(!isAuthenticated);
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    setShowWelcome(false);
    setShowLogin(true);
  };

  const handleLogin = () => {
    setShowLogin(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (showLogin || !isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
      <FilterPanel />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;