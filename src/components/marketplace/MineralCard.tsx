import { MineralListing } from '../../services/dataService';
import { MapPin, Package, DollarSign, User, MessageCircle, Star, Shield, TrendingUp } from 'lucide-react';

interface MineralCardProps {
  listing: MineralListing;
}

export default function MineralCard({ listing }: MineralCardProps) {
  const getMineralColor = (mineralName: string) => {
    const colors: { [key: string]: string } = {
      'Gold': 'from-yellow-400 to-yellow-600',
      'Diamond': 'from-blue-400 to-blue-600',
      'Iron Ore': 'from-gray-400 to-gray-600',
      'Copper': 'from-orange-400 to-orange-600',
      'Silver': 'from-gray-300 to-gray-500',
      'Platinum': 'from-gray-200 to-gray-400',
      'Bauxite': 'from-red-400 to-red-600',
      'Rutile': 'from-purple-400 to-purple-600',
      'Coltan': 'from-indigo-400 to-indigo-600',
      'Zinc': 'from-green-400 to-green-600',
      'Selenite': 'from-pink-400 to-pink-600',
      'Pyrite': 'from-yellow-300 to-yellow-500',
      'Galena': 'from-gray-400 to-gray-600',
      'Tantalite': 'from-purple-300 to-purple-500',
      'Cobalt': 'from-blue-300 to-blue-500',
      'Lithium': 'from-green-300 to-green-500',
      'Graphite': 'from-gray-500 to-gray-700',
      'Nickel': 'from-green-400 to-green-600',
      'Tin': 'from-gray-300 to-gray-500',
      'Quartz': 'from-white to-gray-200',
      'Uranium': 'from-green-400 to-green-600',
      'Chromite': 'from-red-300 to-red-500',
      'Manganese': 'from-purple-400 to-purple-600',
      'Gypsum': 'from-white to-gray-100',
      'Palladium': 'from-gray-200 to-gray-400',
      'Fluorite': 'from-blue-200 to-blue-400',
      'Antimony': 'from-gray-400 to-gray-600',
      'Sulfur': 'from-yellow-200 to-yellow-400',
      'Lead': 'from-gray-300 to-gray-500',
    };
    return colors[mineralName] || 'from-indigo-400 to-indigo-600';
  };

  const getMineralIcon = () => {
    // Return appropriate icon based on mineral type
    return <Package className="h-6 w-6" />;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r ${getMineralColor(listing.mineral_type)}`}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getMineralColor(listing.mineral_type)} text-white`}>
              {getMineralIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {listing.mineral_type}
              </h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Available
            </span>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium ml-1">4.8</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center text-gray-600">
              <Package className="h-4 w-4 mr-2" />
              <span className="text-sm">Quantity</span>
            </div>
            <span className="font-semibold text-gray-900">
              {listing.quantity.toLocaleString()} kg
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="text-sm">Price per kg</span>
            </div>
            <span className="font-bold text-indigo-600 text-lg">
              ${listing.price_per_unit.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm">Status</span>
            </div>
            <span className="font-medium text-gray-900 capitalize">{listing.status}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              <span className="capitalize">{listing.verification_status}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="group/btn w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="flex items-center justify-center">
            <MessageCircle className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
            Contact Seller
          </span>
        </button>
      </div>
    </div>
  );
}