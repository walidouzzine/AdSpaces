import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { useAuthStore } from '../../store/authStore';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  MapPin,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  Sun,
  Moon,
  Globe,
  Clipboard
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">{t('common', 'brandName')}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/spaces"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
            >
              {t('nav', 'spaces')}
            </Link>

            {user?.role === 'owner' && (
              <Link
                to="/my-board"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
              >
                <Clipboard className="inline-block w-4 h-4 mr-2" />
                {t('common', 'myBoard')}
              </Link>
            )}

            {/* Language Toggle */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-36 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-1 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-50 dark:bg-gray-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                      onClick={() => setLanguage('fr')}
                    >
                      {t('common', 'french')}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-50 dark:bg-gray-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                      onClick={() => setLanguage('en')}
                    >
                      {t('common', 'english')}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    {user.name[0]}
                  </div>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-1 focus:outline-none">
                  {user?.role === 'admin' && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                          } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
                          {t('common', 'dashboard')}
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  {user?.role === 'owner' && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/my-board"
                          className={`${
                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                          } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <Clipboard className="inline-block w-4 h-4 mr-2" />
                          {t('common', 'myBoard')}
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-gray-50 dark:bg-gray-700' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                      >
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        {t('common', 'logout')}
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="btn-primary py-2"
              >
                {t('common', 'login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}