import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Search,
  Calendar,
  CreditCard,
  MapPin,
} from 'lucide-react';
import AdSpaceMap from '../components/map/AdSpaceMap';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[50vh] flex items-center opacity-0 mt-20 mx-4 sm:mx-6 lg:mx-8">
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl font-bold leading-tight">
                {t('home', 'hero.title')}{' '}
                <span className="hero-text-gradient">{t('home', 'hero.highlight')}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('home', 'hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/spaces" className="btn-primary">
                  {t('home', 'hero.cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  {t('home', 'hero.cta.secondary')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-2xl transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&q=80&w=800"
                alt={t('home', 'hero.imageAlt')}
                className="relative rounded-2xl shadow-xl animate-float"
              />
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="h-8 w-8 text-indigo-600 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">{t('home', 'features.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home', 'features.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Search className="h-6 w-6" />,
              title: t('home', 'features.items.0.title'),
              description: t('home', 'features.items.0.description')
            },
            {
              icon: <Calendar className="h-6 w-6" />,
              title: t('home', 'features.items.1.title'),
              description: t('home', 'features.items.1.description')
            },
            {
              icon: <CreditCard className="h-6 w-6" />,
              title: t('home', 'features.items.2.title'),
              description: t('home', 'features.items.2.description')
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Preview Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">{t('home', 'discover.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home', 'discover.subtitle')}
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <AdSpaceMap adSpaces={[]} />
        </div>
      </div>
    </div>
  );
}