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

  const onSubmitForm = (data: AdSpaceFormData) => {
    // Ensure all required fields are present
    const formattedData = {
      ...data,
      type: data.type || 'billboard',
      features: data.features || [],
      availability: data.availability || [],
      price: {
        amount: Number(data.price.amount) || 0,
        currency: data.price.currency || 'USD',
        period: data.price.period || 'week',
      },
      dimensions: {
        width: Number(data.dimensions.width) || 0,
        height: Number(data.dimensions.height) || 0,
        unit: data.dimensions.unit || 'ft',
      },
      location: {
        address: data.location.address || '',
        lat: Number(data.location.lat) || 0,
        lng: Number(data.location.lng) || 0,
      },
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8 animate-in slide-up duration-500">
      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="col-span-full">
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.title.label')}
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="title"
              {...register('title', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.description.label')}
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={3}
              {...register('description')}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out [resize:vertical]"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.type.label')}
          </label>
          <div className="mt-2">
            <select
              id="type"
              {...register('type', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            >
              <option value="digital">{t('adspace', 'types.digital')}</option>
              <option value="transit">{t('adspace', 'types.transit')}</option>
              <option value="billboard">{t('adspace', 'types.billboard')}</option>
              <option value="street">{t('adspace', 'types.street')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="col-span-full">
          <label htmlFor="location.address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.address.label')}
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="location.address"
              {...register('location.address', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location.lat" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              {t('adspace', 'form.latitude.label')}
            </label>
            <div className="mt-2">
              <input
                type="number"
                step="any"
                id="location.lat"
                {...register('location.lat', { required: true })}
                className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
              />
            </div>
          </div>
          <div>
            <label htmlFor="location.lng" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              {t('adspace', 'form.longitude.label')}
            </label>
            <div className="mt-2">
              <input
                type="number"
                step="any"
                id="location.lng"
                {...register('location.lng', { required: true })}
                className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="price.amount" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.amount.label')}
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="price.amount"
              {...register('price.amount', { required: true, min: 0 })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="price.currency" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.currency.label')}
          </label>
          <div className="mt-2">
            <select
              id="price.currency"
              {...register('price.currency', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="price.period" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.period.label')}
          </label>
          <div className="mt-2">
            <select
              id="price.period"
              {...register('price.period', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            >
              <option value="day">{t('adspace', 'periods.day')}</option>
              <option value="week">{t('adspace', 'periods.week')}</option>
              <option value="month">{t('adspace', 'periods.month')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="dimensions.width" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.width.label')}
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="dimensions.width"
              {...register('dimensions.width', { required: true, min: 0 })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="dimensions.height" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.height.label')}
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="dimensions.height"
              {...register('dimensions.height', { required: true, min: 0 })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="dimensions.unit" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            {t('adspace', 'form.unit.label')}
          </label>
          <div className="mt-2">
            <select
              id="dimensions.unit"
              {...register('dimensions.unit', { required: true })}
              className="block w-full rounded-lg border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 transition duration-200 ease-out"
            >
              <option value="ft">{t('adspace', 'units.ft')}</option>
              <option value="m">{t('adspace', 'units.m')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-100 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700 dark:active:bg-gray-600 transition duration-200 ease-out"
        >
          {t('common', 'actions.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-200 ease-out"
        >
          {isSubmitting ? t('common', 'actions.submitting') : t('common', 'actions.submit')}
        </button>
      </div>
    </form>
  );
}
