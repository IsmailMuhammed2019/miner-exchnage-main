-- Fix missing database functions and improve RLS policies

-- Create get_current_member function
CREATE OR REPLACE FUNCTION get_current_member()
RETURNS TABLE (
  id uuid,
  full_name text,
  member_id text,
  phone_number text,
  status text,
  cooperative_id uuid
) AS $$
BEGIN
  RETURN QUERY
  SELECT m.id, m.full_name, m.member_id, m.phone_number, m.status, m.cooperative_id
  FROM members m
  WHERE m.user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create get_member_stats function
CREATE OR REPLACE FUNCTION get_member_stats(member_id uuid)
RETURNS TABLE (
  total_listings bigint,
  total_submissions bigint,
  total_quantity numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(l.id)::bigint as total_listings,
    COUNT(s.id)::bigint as total_submissions,
    COALESCE(SUM(s.quantity), 0) as total_quantity
  FROM members m
  LEFT JOIN mineral_listings l ON l.member_id = m.id
  LEFT JOIN mineral_submissions s ON s.member_id = m.id
  WHERE m.id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix ambiguous column reference in cooperative queries
CREATE OR REPLACE FUNCTION get_cooperative_stats(cooperative_id uuid)
RETURNS TABLE (
  total_members bigint,
  total_submissions bigint,
  total_quantity numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(m.id)::bigint as total_members,
    COUNT(ms.id)::bigint as total_submissions,
    COALESCE(SUM(ms.quantity), 0) as total_quantity
  FROM members m
  LEFT JOIN mineral_submissions ms ON ms.member_id = m.id
  WHERE m.cooperative_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to be more permissive for development
DROP POLICY IF EXISTS "Allow all operations on cooperatives" ON cooperatives;
DROP POLICY IF EXISTS "Allow all operations on members" ON members;
DROP POLICY IF EXISTS "Allow all operations on mineral_listings" ON mineral_listings;
DROP POLICY IF EXISTS "Allow all operations on mineral_submissions" ON mineral_submissions;

-- Create more specific policies
CREATE POLICY "Cooperatives are viewable by everyone" ON cooperatives
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create cooperatives" ON cooperatives
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Members can view their own data" ON members
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Authenticated users can create members" ON members
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Listings are viewable by everyone" ON mineral_listings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create listings" ON mineral_listings
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Submissions are viewable by related members" ON mineral_submissions
  FOR SELECT TO authenticated USING (
    member_id IN (SELECT id FROM members WHERE user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create submissions" ON mineral_submissions
  FOR INSERT TO authenticated WITH CHECK (true);
