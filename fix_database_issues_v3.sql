-- Comprehensive database fix - Simple version without ON CONFLICT clauses

-- 1. Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS get_current_member();
DROP FUNCTION IF EXISTS get_current_cooperative();
DROP FUNCTION IF EXISTS get_member_stats(uuid);
DROP FUNCTION IF EXISTS get_cooperative_stats(uuid);
DROP FUNCTION IF EXISTS get_cooperative_totals(uuid);

-- 2. Create get_current_member function
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

-- 3. Create get_current_cooperative function
CREATE OR REPLACE FUNCTION get_current_cooperative()
RETURNS TABLE (
  id uuid,
  name text,
  registration_number text,
  contact_email text,
  contact_phone text,
  address text
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.name, c.registration_number, c.contact_email, c.contact_phone, c.address
  FROM cooperatives c
  WHERE c.contact_email = auth.jwt() ->> 'email';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create get_member_stats function
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

-- 5. Create get_cooperative_stats function
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

-- 6. Create get_cooperative_totals function (for backward compatibility)
CREATE OR REPLACE FUNCTION get_cooperative_totals(cooperative_id uuid)
RETURNS TABLE (
  total_submissions bigint,
  total_quantity numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(ms.id)::bigint as total_submissions,
    COALESCE(SUM(ms.quantity), 0) as total_quantity
  FROM members m
  LEFT JOIN mineral_submissions ms ON ms.member_id = m.id
  WHERE m.cooperative_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Update RLS policies to be more permissive for development
DROP POLICY IF EXISTS "Allow all operations on cooperatives" ON cooperatives;
DROP POLICY IF EXISTS "Allow all operations on members" ON members;
DROP POLICY IF EXISTS "Allow all operations on mineral_listings" ON mineral_listings;
DROP POLICY IF EXISTS "Allow all operations on mineral_submissions" ON mineral_submissions;
DROP POLICY IF EXISTS "Cooperatives are viewable by everyone" ON cooperatives;
DROP POLICY IF EXISTS "Authenticated users can create cooperatives" ON cooperatives;
DROP POLICY IF EXISTS "Members can view their own data" ON members;
DROP POLICY IF EXISTS "Authenticated users can create members" ON members;
DROP POLICY IF EXISTS "Listings are viewable by everyone" ON mineral_listings;
DROP POLICY IF EXISTS "Authenticated users can create listings" ON mineral_listings;
DROP POLICY IF EXISTS "Submissions are viewable by related members" ON mineral_submissions;
DROP POLICY IF EXISTS "Authenticated users can create submissions" ON mineral_submissions;

-- Create more permissive policies for development
CREATE POLICY "Allow all operations on cooperatives" ON cooperatives
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on members" ON members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on mineral_listings" ON mineral_listings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on mineral_submissions" ON mineral_submissions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- 9. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_members_cooperative_id ON members(cooperative_id);
CREATE INDEX IF NOT EXISTS idx_mineral_listings_member_id ON mineral_listings(member_id);
CREATE INDEX IF NOT EXISTS idx_mineral_submissions_member_id ON mineral_submissions(member_id);
CREATE INDEX IF NOT EXISTS idx_cooperatives_contact_email ON cooperatives(contact_email);

-- 10. Insert sample data only if tables are empty
DO $$
BEGIN
  -- Insert sample cooperative if no cooperatives exist
  IF NOT EXISTS (SELECT 1 FROM cooperatives LIMIT 1) THEN
    INSERT INTO cooperatives (id, name, registration_number, contact_email, contact_phone, address)
    VALUES (
      gen_random_uuid(),
      'Sample Mining Cooperative',
      'REG-001',
      'admin@example.com',
      '+1234567890',
      '123 Mining Street, City, Country'
    );
  END IF;
END $$;
