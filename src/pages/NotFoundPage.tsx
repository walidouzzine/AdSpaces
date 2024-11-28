import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4">
          {t('errors', 'notFound.title')}
        </h2>
        <p className="text-gray-600 mt-2">
          {t('errors', 'notFound.message')}
        </p>
        <Link
          to="/"
          className="btn-primary mt-6 inline-block"
        >
          {t('errors', 'notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}