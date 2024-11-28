import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AdSpace } from '../../types';
import 'leaflet/dist/leaflet.css';

interface AdSpaceMapProps {
  adSpaces: AdSpace[];
  onMarkerClick?: (adSpace: AdSpace) => void;
}

export default function AdSpaceMap({ adSpaces, onMarkerClick }: AdSpaceMapProps) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-[60vh] w-full rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {adSpaces.map((space) => (
        <Marker
          key={space.id}
          position={[space.location.lat, space.location.lng]}
          eventHandlers={{
            click: () => onMarkerClick?.(space),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{space.title}</h3>
              <p className="text-sm text-gray-600">{space.location.address}</p>
              <p className="text-sm font-medium mt-1">
                ${space.price.amount}/{space.price.period}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}