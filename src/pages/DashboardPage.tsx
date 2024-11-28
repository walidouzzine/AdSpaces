import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Settings,
  Bell
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const performanceData = [
  { month: 'Jan', views: 4000, clicks: 2400, bookings: 1200 },
  { month: 'Feb', views: 3000, clicks: 1398, bookings: 900 },
  { month: 'Mar', views: 2000, clicks: 9800, bookings: 2200 },
  { month: 'Apr', views: 2780, clicks: 3908, bookings: 2000 },
  { month: 'May', views: 1890, clicks: 4800, bookings: 2181 },
  { month: 'Jun', views: 2390, clicks: 3800, bookings: 2500 }
];

const activeListings = [
  {
    id: '1',
    title: 'Premium Billboard - Times Square',
    location: 'Times Square, New York, NY',
    status: 'Active',
    views: 1234,
    bookings: 5
  },
  {
    id: '2',
    title: 'Digital Display - Shopping Mall',
    location: 'Herald Square, New York, NY',
    status: 'Active',
    views: 856,
    bookings: 3
  }
];

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{t('common', 'dashboard')}</h1>
            <p className="text-gray-600">{t('dashboard', 'welcome')}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: t('dashboard', 'stats.views'),
              value: '24.5K',
              change: '+12.5%',
              icon: BarChart3,
              color: 'text-blue-600'
            },
            {
              label: t('dashboard', 'stats.bookings'),
              value: '845',
              change: '+18.2%',
              icon: TrendingUp,
              color: 'text-green-600'
            },
            {
              label: t('dashboard', 'stats.revenue'),
              value: '$12,845',
              change: '+8.9%',
              icon: DollarSign,
              color: 'text-yellow-600'
            },
            {
              label: t('dashboard', 'stats.clients'),
              value: '156',
              change: '+4.6%',
              icon: Users,
              color: 'text-purple-600'
            }
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-green-600 text-sm">{stat.change}</p>
                </div>
                <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">{t('dashboard', 'performance.title')}</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="views"
                  name={t('dashboard', 'metrics.views')}
                  fill="#4F46E5"
                  opacity={0.8}
                />
                <Bar
                  dataKey="clicks"
                  name={t('dashboard', 'metrics.clicks')}
                  fill="#10B981"
                  opacity={0.8}
                />
                <Bar
                  dataKey="bookings"
                  name={t('dashboard', 'metrics.bookings')}
                  fill="#F59E0B"
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{t('dashboard', 'listings.title')}</h2>
            <button className="btn-primary">
              <Calendar className="h-4 w-4 mr-2" />
              {t('dashboard', 'listings.add')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard', 'listings.title')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard', 'listings.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard', 'metrics.views')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard', 'metrics.bookings')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeListings.map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {listing.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {listing.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {t('dashboard', 'listings.active')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {listing.bookings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
