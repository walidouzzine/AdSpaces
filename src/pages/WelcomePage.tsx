import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
            {t('welcome.title', 'Welcome to AdSpace')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            {t('welcome.subtitle', 'Choose your path to get started')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Find AdSpace Card */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105"
            onClick={() => navigate('/home')}
          >
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('welcome.findAdSpace', 'Find an AdSpace')}
              </h2>
              <p className="text-gray-600">
                {t('welcome.findAdSpaceDesc', 'Browse available advertising spaces and find the perfect spot for your campaign')}
              </p>
            </div>
          </div>

          {/* Propose AdSpace Card */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105"
            onClick={() => navigate('/login')}
          >
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('welcome.proposeAdSpace', 'Propose an AdSpace')}
              </h2>
              <p className="text-gray-600">
                {t('welcome.proposeAdSpaceDesc', 'List your advertising space and connect with potential advertisers')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
