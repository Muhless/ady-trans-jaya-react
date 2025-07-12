import React from 'react';
import { MapPin, User, Phone, Building } from 'lucide-react';

interface DeliveryDestination {
  recipient_name: string;
  address: string;
  phone: string;
  city: string;
  postal_code?: string;
}

interface DeliveryDestinationCardProps {
  destination: DeliveryDestination;
}

const DeliveryDestinationCard: React.FC<DeliveryDestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm">Tujuan Pengiriman</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-900 font-medium">{destination.recipient_name}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed">{destination.address}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {destination.city}
                  {destination.postal_code && ` - ${destination.postal_code}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{destination.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDestinationCard;