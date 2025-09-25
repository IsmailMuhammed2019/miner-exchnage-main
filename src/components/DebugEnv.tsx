import React from 'react';

export default function DebugEnv() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: 'red', 
      color: 'white', 
      padding: '10px', 
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <div>Supabase URL: {supabaseUrl || 'NOT SET'}</div>
      <div>Supabase Key: {supabaseKey ? 'SET' : 'NOT SET'}</div>
      <div>All Env: {JSON.stringify(import.meta.env, null, 2)}</div>
    </div>
  );
}
