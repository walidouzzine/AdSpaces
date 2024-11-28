import React from 'react';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../../contexts/LanguageContext';
import { AdSpace } from '../../types';

interface AdSpaceFormData {
  title: string;
  description: string;
  type: AdSpace['type'];
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: {
    amount: number;
    currency: string;
    period: AdSpace['price']['period'];
  };
  dimensions: {
    width: number;
    height: number;
    unit: AdSpace['dimensions']['unit'];
  };
  features: string[];
  availability: {
    start: Date;
    end: Date;
  }[];
}

interface AdSpaceFormProps {
  onSubmit: (data: AdSpaceFormData) => void;
  onClose?: () => void;
  initialData?: Partial<AdSpaceFormData>;
  isLoading?: boolean;
}

export default function AdSpaceForm({ onSubmit, onClose, initialData, isLoading }: AdSpaceFormProps) {
  const { t } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdSpaceFormData>({
    defaultValues: {
      ...initialData,
      type: initialData?.type || 'billboard',
      features: initialData?.features || [],
      availability: initialData?.availability || [{ start: new Date(), end: new Date() }],
      price: {
        amount: 0,
        currency: 'USD',
        period: 'week',
        ...initialData?.price,
      },
      dimensions: {
        width: 0,
        height: 0,
        unit: 'ft',
        ...initialData?.dimensions,
      },
      location: {
        address: '',
        lat: 0,
        lng: 0,
        ...initialData?.location,
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{t('adSpaceForm', 'basicInformation')}</h3>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            {t('adSpaceForm', 'titleField')}
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{t('common', 'fieldRequired')}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            {t('adSpaceForm', 'description')}
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{t('common', 'fieldRequired')}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            {t('adSpaceForm', 'type')}
          </label>
          <select
            id="type"
            {...register('type', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="billboard">{t('adSpaceForm', 'types.billboard')}</option>
            <option value="digital">{t('adSpaceForm', 'types.digital')}</option>
            <option value="transit">{t('adSpaceForm', 'types.transit')}</option>
            <option value="street">{t('adSpaceForm', 'types.street')}</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{t('adSpaceForm', 'location')}</h3>
        <div>
          <label htmlFor="location.address" className="block text-sm font-medium text-gray-700">
            {t('adSpaceForm', 'address')}
          </label>
          <input
            type="text"
            id="location.address"
            {...register('location.address', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location.lat" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'latitude')}
            </label>
            <input
              type="number"
              step="any"
              id="location.lat"
              {...register('location.lat', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location.lng" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'longitude')}
            </label>
            <input
              type="number"
              step="any"
              id="location.lng"
              {...register('location.lng', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{t('adSpaceForm', 'dimensions')}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="dimensions.width" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'width')}
            </label>
            <input
              type="number"
              id="dimensions.width"
              {...register('dimensions.width', { required: true, min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="dimensions.height" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'height')}
            </label>
            <input
              type="number"
              id="dimensions.height"
              {...register('dimensions.height', { required: true, min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="dimensions.unit" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'unit')}
            </label>
            <select
              id="dimensions.unit"
              {...register('dimensions.unit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="ft">ft</option>
              <option value="m">m</option>
            </select>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{t('adSpaceForm', 'price')}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="price.amount" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'amount')}
            </label>
            <input
              type="number"
              id="price.amount"
              {...register('price.amount', { required: true, min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="price.currency" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'currency')}
            </label>
            <select
              id="price.currency"
              {...register('price.currency')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label htmlFor="price.period" className="block text-sm font-medium text-gray-700">
              {t('adSpaceForm', 'period')}
            </label>
            <select
              id="price.period"
              {...register('price.period')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="day">{t('adSpaceForm', 'periods.day')}</option>
              <option value="week">{t('adSpaceForm', 'periods.week')}</option>
              <option value="month">{t('adSpaceForm', 'periods.month')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t('adSpaceForm', 'close')}
        </button>
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isSubmitting ? t('common', 'saving') : t('adSpaceForm', 'submit')}
        </button>
      </div>
    </form>
  );
}
