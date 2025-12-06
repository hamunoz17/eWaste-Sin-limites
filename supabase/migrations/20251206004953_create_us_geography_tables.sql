/*
  # Create US Geography and Route Quotes Tables

  1. New Tables
    - `states` - USA states with coordinates
      - `id` (uuid, primary key)
      - `code` (text, unique state abbreviation)
      - `name` (text, full state name)
      - `latitude` (numeric, state center latitude)
      - `longitude` (numeric, state center longitude)
      - `created_at` (timestamp)
    
    - `cities` - Major US cities
      - `id` (uuid, primary key)
      - `name` (text, city name)
      - `state_id` (uuid, foreign key to states)
      - `latitude` (numeric, city latitude)
      - `longitude` (numeric, city longitude)
      - `created_at` (timestamp)
    
    - `route_quotes` - Customer route quotation requests
      - `id` (uuid, primary key)
      - `origin_city_id` (uuid, foreign key to cities)
      - `destination_city_id` (uuid, foreign key to cities)
      - `distance_miles` (numeric, calculated distance)
      - `cargo_type` (text, type of e-waste)
      - `cargo_weight` (numeric, weight in pounds)
      - `cargo_details` (text, additional cargo information)
      - `company_name` (text, requesting company)
      - `contact_email` (text, contact email)
      - `estimated_cost` (numeric, estimated shipping cost)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on all tables
    - Route quotes are publicly readable (for demo purposes)
    - States and cities are publicly readable

  3. Indexes
    - Index on states(code) for quick lookups
    - Index on cities(state_id) for city queries
*/

CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  state_id uuid NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS route_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_city_id uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  destination_city_id uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  distance_miles numeric NOT NULL,
  cargo_type text NOT NULL,
  cargo_weight numeric,
  cargo_details text,
  company_name text,
  contact_email text,
  estimated_cost numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "States are publicly readable"
  ON states FOR SELECT
  USING (true);

CREATE POLICY "Cities are publicly readable"
  ON cities FOR SELECT
  USING (true);

CREATE POLICY "Route quotes are publicly readable"
  ON route_quotes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create route quotes"
  ON route_quotes FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_states_code ON states(code);
CREATE INDEX idx_cities_state ON cities(state_id);
CREATE INDEX idx_route_quotes_origin ON route_quotes(origin_city_id);
CREATE INDEX idx_route_quotes_destination ON route_quotes(destination_city_id);
