import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface State {
  id: string;
  code: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface City {
  id: string;
  name: string;
  state_id: string;
  latitude: number;
  longitude: number;
}

interface RouteQuote {
  origin_city_id: string;
  destination_city_id: string;
  distance_miles: number;
  cargo_type: string;
  cargo_weight?: number;
  cargo_details?: string;
  company_name?: string;
  contact_email?: string;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

const estimateCost = (miles: number, weight: number): number => {
  const baseCost = 150; // Base cost per shipment
  const costPerMile = 1.5; // Cost per mile
  const costPerPound = 0.05; // Cost per pound
  return Math.round(baseCost + (miles * costPerMile) + (weight * costPerPound));
};

export const getStates = async (): Promise<State[]> => {
  const { data, error } = await supabase
    .from('states')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};

export const getCitiesByState = async (stateId: string): Promise<City[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('state_id', stateId)
    .order('name');

  if (error) throw error;
  return data || [];
};

export const getCity = async (cityId: string): Promise<City | null> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', cityId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const calculateRoute = async (
  originCityId: string,
  destinationCityId: string
): Promise<{ distance: number; estimatedCost: number } | null> => {
  try {
    const originCity = await getCity(originCityId);
    const destCity = await getCity(destinationCityId);

    if (!originCity || !destCity) return null;

    const distance = calculateDistance(
      originCity.latitude,
      originCity.longitude,
      destCity.latitude,
      destCity.longitude
    );

    const estimatedCost = estimateCost(distance, 500); // Default 500 lbs for preview

    return { distance, estimatedCost };
  } catch (error) {
    console.error('Error calculating route:', error);
    return null;
  }
};

export const saveRouteQuote = async (quote: RouteQuote): Promise<{ id: string } | null> => {
  try {
    const { data, error } = await supabase
      .from('route_quotes')
      .insert([quote])
      .select('id')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving route quote:', error);
    return null;
  }
};
