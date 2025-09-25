import { useState, useEffect } from 'react';
import SearchBar from '../components/marketplace/SearchBar';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import MineralCard from '../components/marketplace/MineralCard';
import { mineralListings } from '../data/mineralListings';
import { DataService, MineralListing } from '../services/dataService';
import { SortOption } from '../types/marketplace';

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    weightQuantity: '',
    region: '',
    priceRange: '',
    qualityGrade: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('price-low-high');
  const [listings, setListings] = useState<MineralListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const dynamicListings = await DataService.getAllListings();
        setListings(dynamicListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
        // Fallback to static data
        setListings(mineralListings.map(listing => ({
          id: listing.id,
          mineral_type: listing.mineralName,
          quantity: listing.quantity,
          price_per_unit: listing.pricePerUnit,
          location: listing.country,
          description: `High-quality ${listing.mineralName} from ${listing.country}`,
          member_id: '1',
          created_at: new Date().toISOString(),
          status: 'active' as const,
          verification_status: 'verified' as const,
          image_url: undefined
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings
    .filter(listing => {
      if (search && !listing.mineral_type.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (filters.region && listing.location !== filters.region) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price_per_unit - b.price_per_unit;
        case 'price-high-low':
          return b.price_per_unit - a.price_per_unit;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png"
                alt="Miner Exchange Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp";
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Mining Resources Marketplace
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Discover and purchase high-quality minerals from verified sellers worldwide. 
              Connect with trusted mining cooperatives and expand your operations.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">{filteredListings.length}</div>
                <div className="text-indigo-100">Available Listings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-indigo-100">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-indigo-100">Verified Sellers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <MarketplaceFilters
            filters={filters}
            onFilterChange={setFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Minerals
            </h2>
            <p className="text-gray-600">
              Showing {filteredListings.length} results
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Sort by: <span className="font-medium text-gray-900">
                {sortBy === 'price-low-high' ? 'Price: Low to High' : 'Price: High to Low'}
              </span>
            </div>
          </div>
        </div>

        {/* Mineral Cards Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading minerals...</h3>
              <p className="text-gray-600">Please wait while we fetch the latest listings.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <MineralCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No minerals found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSearch('');
                  setFilters({
                    weightQuantity: '',
                    region: '',
                    priceRange: '',
                    qualityGrade: '',
                  });
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}