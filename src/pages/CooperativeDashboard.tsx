import React, { useEffect, useState } from 'react';
import { Users, PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import MemberList from '../components/cooperative/MemberList';
import AddMemberModal from '../components/cooperative/AddMemberModal';
import DashboardStats from '../components/dashboard/DashboardStats';

export default function CooperativeDashboard() {
  const { user } = useAuth();
  const [showAddMember, setShowAddMember] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalSubmissions: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;

      const { data: cooperative } = await supabase
        .from('cooperatives')
        .select('id')
        .eq('contact_email', user.email)
        .single();

      if (!cooperative) return;

      // Fetch member count
      const { count: memberCount } = await supabase
        .from('members')
        .select('*', { count: 'exact' })
        .eq('cooperative_id', cooperative.id);

      // Fetch submission stats using the new function
      const { data: statsData, error } = await supabase
        .rpc('get_cooperative_stats', { cooperative_id: cooperative.id });

      if (error) {
        console.error('Error fetching cooperative stats:', error);
        return;
      }

      setStats({
        totalMembers: memberCount || 0,
        totalSubmissions: statsData?.[0]?.total_submissions || 0,
        totalQuantity: statsData?.[0]?.total_quantity || 0,
      });
    };

    fetchStats();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img 
            src="/logo.png"
            alt="Miner Exchange Logo"
            className="h-12 w-auto mr-4 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://res.cloudinary.com/dyas8qe3h/image/upload/v1734950125/Miner_LOGO_tfptqo.webp";
            }}
          />
          <h1 className="text-3xl font-bold text-gray-900">Cooperative Dashboard</h1>
        </div>
        <button
          onClick={() => setShowAddMember(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      <DashboardStats stats={stats} />

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-gray-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Members</h2>
        </div>
        <MemberList />
      </div>

      {showAddMember && (
        <AddMemberModal onClose={() => setShowAddMember(false)} />
      )}
    </div>
  );
}