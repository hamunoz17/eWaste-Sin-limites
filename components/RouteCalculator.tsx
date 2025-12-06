import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, ArrowRight, Send } from 'lucide-react';
import { getStates, getCitiesByState, calculateRoute, saveRouteQuote } from '../services/geographyService';

interface State {
  id: string;
  code: string;
  name: string;
}

interface City {
  id: string;
  name: string;
  state_id: string;
}

const RouteCalculator: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [originState, setOriginState] = useState('');
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [originCity, setOriginCity] = useState('');
  const [destState, setDestState] = useState('');
  const [destCities, setDestCities] = useState<City[]>([]);
  const [destCity, setDestCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [cargoType, setCargoType] = useState('electronics');
  const [cargoWeight, setCargoWeight] = useState('500');
  const [cargoDetails, setCargoDetails] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      setLoading(true);
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error('Error loading states:', error);
      }
      setLoading(false);
    };

    loadStates();
  }, []);

  const handleOriginStateChange = async (stateId: string) => {
    setOriginState(stateId);
    setOriginCity('');
    setOriginCities([]);

    if (stateId) {
      try {
        const cities = await getCitiesByState(stateId);
        setOriginCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    }
  };

  const handleDestStateChange = async (stateId: string) => {
    setDestState(stateId);
    setDestCity('');
    setDestCities([]);

    if (stateId) {
      try {
        const cities = await getCitiesByState(stateId);
        setDestCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    }
  };

  const handleCalculate = async () => {
    if (!originCity || !destCity) {
      alert('Por favor selecciona origen y destino');
      return;
    }

    setCalculating(true);
    try {
      const result = await calculateRoute(originCity, destCity);
      if (result) {
        setDistance(result.distance);
        setEstimatedCost(result.estimatedCost);
        setShowDetails(true);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      alert('Error al calcular la ruta');
    }
    setCalculating(false);
  };

  const handleSubmit = async () => {
    if (!companyName || !contactEmail) {
      alert('Por favor completa empresa y email');
      return;
    }

    setSubmitting(true);
    try {
      const weight = parseFloat(cargoWeight) || 500;
      const cost = Math.round(150 + (distance! * 1.5) + (weight * 0.05));

      await saveRouteQuote({
        origin_city_id: originCity,
        destination_city_id: destCity,
        distance_miles: distance!,
        cargo_type: cargoType,
        cargo_weight: weight,
        cargo_details: cargoDetails,
        company_name: companyName,
        contact_email: contactEmail,
        estimated_cost: cost
      });

      setSubmitted(true);
      setTimeout(() => {
        setOriginState('');
        setOriginCity('');
        setDestState('');
        setDestCity('');
        setDistance(null);
        setEstimatedCost(null);
        setShowDetails(false);
        setCargoType('electronics');
        setCargoWeight('500');
        setCargoDetails('');
        setCompanyName('');
        setContactEmail('');
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error al enviar la cotización');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-emerald-50 p-2 rounded-lg">
          <MapPin className="text-primary w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-secondary">Calculadora de Rutas</h3>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
          ¡Cotización recibida! Te enviaremos un correo a {contactEmail} con los detalles.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Origin */}
        <div className="space-y-4">
          <h4 className="font-semibold text-secondary">Origen</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={originState}
              onChange={(e) => handleOriginStateChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecciona estado...</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name} ({state.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
            <select
              value={originCity}
              onChange={(e) => setOriginCity(e.target.value)}
              disabled={!originState}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Selecciona ciudad...</option>
              {originCities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-4">
          <h4 className="font-semibold text-secondary">Destino</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              value={destState}
              onChange={(e) => handleDestStateChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecciona estado...</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name} ({state.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
            <select
              value={destCity}
              onChange={(e) => setDestCity(e.target.value)}
              disabled={!destState}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Selecciona ciudad...</option>
              {destCities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!originCity || !destCity || calculating}
        className="mt-8 w-full bg-primary hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {calculating ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Calculando...
          </>
        ) : (
          <>
            <ArrowRight size={20} />
            Calcular Ruta
          </>
        )}
      </button>

      {showDetails && distance !== null && (
        <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Distancia Total</p>
              <p className="text-3xl font-bold text-primary">{distance} millas</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Costo Estimado</p>
              <p className="text-3xl font-bold text-secondary">${estimatedCost}</p>
            </div>
          </div>

          <div className="border-t border-emerald-200 pt-6 space-y-4">
            <h4 className="font-semibold text-secondary">Detalles de la Carga</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Material</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="electronics">Electrónica General</option>
                  <option value="servers">Servidores</option>
                  <option value="computers">Computadoras</option>
                  <option value="mobile">Dispositivos Móviles</option>
                  <option value="mixed">Material Mixto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (lbs)</label>
                <input
                  type="number"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detalles Adicionales</label>
              <textarea
                value={cargoDetails}
                onChange={(e) => setCargoDetails(e.target.value)}
                placeholder="Descripción del material, condiciones especiales, etc..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                rows={3}
              />
            </div>

            <div className="border-t border-emerald-200 pt-4 space-y-4">
              <h4 className="font-semibold text-secondary text-sm">Información de Contacto</h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Nombre de tu empresa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !companyName || !contactEmail}
              className="w-full bg-secondary hover:bg-slate-800 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Solicitar Cotización
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteCalculator;
