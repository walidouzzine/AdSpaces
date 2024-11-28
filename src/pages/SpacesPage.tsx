import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Map, AlertCircleIcon, RedoIcon } from 'lucide-react';
import AdSpaceMap from '../components/map/AdSpaceMap';
import AdSpaceModal from '../components/adspace/AdSpaceModal';
import { AdSpace } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { getAdSpaces } from '../services/adspaceService';
import { useAuthStore } from '../store/authStore';
import { useRoleAccess } from '../hooks/useRoleAccess';
import { useToast } from '../hooks/useToast';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<AdSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<AdSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<AdSpace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const { hasPermission } = useRoleAccess();
  const { toast } = useToast();

  useEffect(() => {
    fetchAdSpaces();
  }, [filterType]);

  useEffect(() => {
    // Filter spaces based on search query and type
    const filtered = spaces.filter(space => {
      const matchesSearch = !searchQuery || 
        space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.location.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = !filterType || space.type === filterType;
      
      return matchesSearch && matchesType;
    });
    
    setFilteredSpaces(filtered);
  }, [spaces, searchQuery, filterType]);

  const fetchAdSpaces = async () => {
    try {
      setIsLoading(true);
      const filters = filterType ? { type: filterType } : undefined;
      const fetchedSpaces = await getAdSpaces(filters);
      setSpaces(fetchedSpaces);
    } catch (error) {
      toast.error('Failed to fetch ad spaces');
      console.error('Error fetching adspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={t('spaces', 'searchPlaceholder')}
                    className="input-primary pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <div className="flex-shrink-0">
                  <select
                    className="input-primary min-w-[120px] md:min-w-[150px]"
                    value={filterType || ''}
                    onChange={(e) => setFilterType(e.target.value || null)}
                  >
                    <option value="">{t('spaces', 'filters.all')}</option>
                    <option value="billboard">{t('spaces', 'filters.billboard')}</option>
                    <option value="digital">{t('spaces', 'filters.digital')}</option>
                    <option value="transit">{t('spaces', 'filters.transit')}</option>
                    <option value="street">{t('spaces', 'filters.street')}</option>
                  </select>
                </div>
                <button 
                  className="btn-primary p-2"
                  onClick={() => setIsMapModalOpen(true)}
                  title={t('spaces', 'mapView')}
                >
                  <Map className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : filteredSpaces.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircleIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <p className="text-gray-500 text-lg">
                {filterType 
                  ? `No ${filterType} AdSpaces available at the moment.`
                  : 'There are no available AdSpaces at the moment.'}
                <br />
              </p>
            </div>
          ) : (
            // Ad spaces grid
            filteredSpaces.map((space) => (
              <div
                key={space.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedSpace(space);
                  setIsViewModalOpen(true);
                }}
              >
                {/* Image */}
                <div className="aspect-video relative bg-gray-100">
                  {space.images && space.images[0] ? (
                    <img
                      src={space.images[0]}
                      alt={space.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{space.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{space.location.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-600">
                      ${space.price.amount}/{space.price.period}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {space.type}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Map Modal */}
        <AdSpaceModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          title={t('spaces', 'mapView')}
          size="lg"
        >
          <div className="h-[70vh]">
            <AdSpaceMap
              adSpaces={spaces}
              onMarkerClick={(space) => {
                setSelectedSpace(space);
                setIsViewModalOpen(true);
                setIsMapModalOpen(false);
              }}
            />
          </div>
        </AdSpaceModal>

        {/* View Modal */}
        <AdSpaceModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedSpace(null);
          }}
          title={selectedSpace?.title || ''}
        >
          {selectedSpace && (
            <div className="space-y-4">
              {/* Images */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {selectedSpace.images && selectedSpace.images[0] ? (
                  <img
                    src={selectedSpace.images[0]}
                    alt={selectedSpace.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <p className="text-gray-600">{selectedSpace.description}</p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('spaces', 'location')}</h4>
                  <p className="text-gray-600">{selectedSpace.location.address}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('spaces', 'dimensions')}</h4>
                  <p className="text-gray-600">
                    {selectedSpace.dimensions.width} x {selectedSpace.dimensions.height} {selectedSpace.dimensions.unit}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('spaces', 'pricing')}</h4>
                  <p className="text-gray-600">
                    ${selectedSpace.price.amount}/{selectedSpace.price.period}
                  </p>
                </div>

                {selectedSpace.features && selectedSpace.features.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t('spaces', 'features')}</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedSpace.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </AdSpaceModal>
      </div>
    </div>
  );
}