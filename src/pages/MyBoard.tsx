import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { AdSpace } from '../types';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus } from 'lucide-react';
import AdSpaceForm from '../components/adspace/AdSpaceForm';
import { useToast } from '../hooks/useToast';

export default function MyBoard() {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const [adSpaces, setAdSpaces] = useState<AdSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchAdSpaces = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Fetching ad spaces for user:', user.id);
      const q = query(
        collection(db, 'adSpaces'),
        where('ownerId', '==', user.id)
      );
      
      const querySnapshot = await getDocs(q);
      const spaces: AdSpace[] = [];
      querySnapshot.forEach((doc) => {
        console.log('Found ad space:', doc.id, doc.data());
        spaces.push({ id: doc.id, ...doc.data() } as AdSpace);
      });
      
      console.log('Total ad spaces found:', spaces.length);
      setAdSpaces(spaces);
    } catch (error) {
      console.error('Error fetching ad spaces:', error);
      toast.error(t('common', 'errorFetchingAdSpaces'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdSpaces();
  }, [user]);

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      console.log('Creating new ad space with data:', data);
      // Add default image if none provided
      const adSpaceData = {
        ...data,
        ownerId: user.id,
        status: 'available',
        createdAt: serverTimestamp(),
        images: data.images || ["C:\Users\walid\Downloads\walid_ouzzine_ad_space_1672efb8-4aec-4dd9-a06d-67975b6f831a.png"],
         
        type: data.type || 'billboard', // Default type
      };

      console.log('Final ad space data:', adSpaceData);
      const adSpaceRef = collection(db, 'adSpaces');
      const docRef = await addDoc(adSpaceRef, adSpaceData);
      console.log('Ad space created with ID:', docRef.id);
      
      toast.success(t('common', 'adSpaceCreated'));
      setIsFormOpen(false);
      fetchAdSpaces();
    } catch (error) {
      console.error('Error creating ad space:', error);
      toast.error(t('common', 'errorCreatingAdSpace'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('common', 'myAdSpaces')}
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('common', 'addAdSpace')}
        </button>
      </div>

      {adSpaces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {t('common', 'noAdSpacesFound')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adSpaces.map((adSpace) => (
            <div
              key={adSpace.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={adSpace.images[0]}
                  alt={adSpace.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {adSpace.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {adSpace.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-medium">
                    {adSpace.price.amount} {adSpace.price.currency}/{adSpace.price.period}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    adSpace.status === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : adSpace.status === 'booked'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {adSpace.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <AdSpaceForm
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
}
