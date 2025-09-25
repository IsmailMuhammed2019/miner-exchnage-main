import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/date';
import ListingFilters from './ListingFilters';
import SubmitMineralModal from './SubmitMineralModal';

interface MineralListing {
  id: string;
  mineral_type: string;
  quantity: number;
  unit: string;
  quality_grade: string;
  status: string;
  price_per_unit: number;
  created_at: string;
}

export default function MineralListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState<MineralListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    mineralType: '',
    status: '',
  });

  useEffect(() => {
    const fetchListings = async () => {
      if (!user?.id) return;

      const { data: member } = await supabase
        .from('members')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!member) return;

      let query = supabase
        .from('mineral_listings')
        .select('*')
        .eq('member_id', member.id)
        .order('created_at', { ascending: false });

      if (filters.mineralType) {
        query = query.eq('mineral_type', filters.mineralType);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.search) {
        query = query.ilike('mineral_type', `%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching listings:', error);
        return;
      }

      setListings(data);
      setLoading(false);
    };

    fetchListings();

    const subscription = supabase
      .channel('mineral_listings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'mineral_listings',
        },
        fetchListings
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, filters]);

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Listings Yet</h3>
          <p className="text-gray-500 mb-4">
            Start by creating your first mineral listing to begin trading.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Your First Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ListingFilters filters={filters} onChange={setFilters} />
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {listings.map((listing) => (
            <li key={listing.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{listing.mineral_type}</h3>
                  <p className="text-sm text-gray-500">
                    {listing.quantity} {listing.unit} • Grade: {listing.quality_grade}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${listing.price_per_unit}/{listing.unit}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        listing.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : listing.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {listing.status}
                    </span>
                    {listing.status === 'available' && (
                      <button
                        onClick={() => setSelectedListing(listing.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Listed on {formatDate(listing.created_at)}
              </div>
            </li>
          ))}
          {listings.length === 0 && (
            <li className="p-4 text-center text-gray-500">No listings found</li>
          )}
        </ul>
      </div>

      {selectedListing && (
        <SubmitMineralModal
          listingId={selectedListing}
          mineralType={listings.find(l => l.id === selectedListing)?.mineral_type || ''}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}