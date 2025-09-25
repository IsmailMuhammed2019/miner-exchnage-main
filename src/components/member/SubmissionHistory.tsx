import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/date';

interface Submission {
  id: string;
  quantity: number;
  submission_date: string;
  verification_status: string;
  notes: string;
  mineral_listing: {
    mineral_type: string;
    unit: string;
  };
}

export default function SubmissionHistory() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?.id) return;

      const { data: member } = await supabase
        .from('members')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!member) return;

      const { data, error } = await supabase
        .from('mineral_submissions')
        .select(`
          id,
          quantity,
          submission_date,
          verification_status,
          notes,
          mineral_listing (
            mineral_type,
            unit
          )
        `)
        .eq('member_id', member.id)
        .order('submission_date', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching submissions:', error);
        return;
      }

      setSubmissions(data);
      setLoading(false);
    };

    fetchSubmissions();

    // Set up real-time subscription
    const subscription = supabase
      .channel('submission_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'mineral_submissions',
        },
        fetchSubmissions
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-8 text-center">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions Yet</h3>
          <p className="text-gray-500 mb-4">
            Your mineral submission history will appear here once you start submitting minerals for verification.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Submit Your First Mineral
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {submissions.map((submission) => (
          <li key={submission.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {submission.mineral_listing.mineral_type}
                </h3>
                <p className="text-sm text-gray-500">
                  {submission.quantity} {submission.mineral_listing.unit}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  submission.verification_status === 'verified'
                    ? 'bg-green-100 text-green-800'
                    : submission.verification_status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {submission.verification_status}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Submitted on {formatDate(submission.submission_date)}
            </div>
            {submission.notes && (
              <div className="mt-2 text-sm text-gray-600">{submission.notes}</div>
            )}
          </li>
        ))}
        {submissions.length === 0 && (
          <li className="p-4 text-center text-gray-500">No submissions yet</li>
        )}
      </ul>
    </div>
  );
}