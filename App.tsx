import React from 'react';
import { Truck, MapPin, Clock, ArrowRight, ShieldCheck, Recycle } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import VoiceAgent from './components/VoiceAgent';
import RouteCalculator from './components/RouteCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1.5 rounded-lg">
                <Recycle className="text-primary w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-secondary">
                eWaste <span className="text-primary">sin limites</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
              <a href="#cobertura" className="hover:text-primary transition-colors">Cobertura</a>
              <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
              <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                Portal Cliente
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Logística Especializada USA
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-secondary tracking-tight leading-tight">
                  Reciclaje Electrónico <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                    En Movimiento 24/7
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Conectamos generadores de residuos electrónicos con procesadores certificados en los 50 estados. 
                  Flota dedicada, seguimiento en tiempo real y cumplimiento normativo garantizado.
                </p>
                
                <div className="pt-4">
                  <VoiceAgent />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/100/100?random=1" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/100/100?random=2" alt=""/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://picsum.photos/100/100?random=3" alt=""/>
                  </div>
                  <p>Más de 500 empresas confían en nosotros</p>
                </div>
              </div>

              <div className="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 hidden lg:block">
                <img 
                  src="https://picsum.photos/800/1000?grayscale" 
                  alt="Logística Tech" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="text-emerald-400" />
                      <span className="font-bold">Certificación R2v3 Ready</span>
                    </div>
                    <p className="text-sm text-gray-200">
                      Garantizamos la cadena de custodia completa para todos sus activos ITAD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        </section>

        {/* Features Grid */}
        <section id="servicios" className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary">¿Por qué elegir eWaste sin limites?</h2>
              <p className="mt-4 text-gray-600">Eficiencia operativa diseñada para la industria del reciclaje.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8 text-primary" />,
                  title: "Cobertura 24/7",
                  desc: "Nuestros despachadores y sistemas AI nunca duermen. Gestionamos cargas urgentes en cualquier momento."
                },
                {
                  icon: <MapPin className="w-8 h-8 text-primary" />,
                  title: "Nacional (50 Estados)",
                  desc: "Desde California hasta Nueva York, tenemos partners logísticos listos para recolectar su material."
                },
                {
                  icon: <Truck className="w-8 h-8 text-primary" />,
                  title: "Flota Especializada",
                  desc: "Camiones con rampa, cajas secas y seguridad reforzada para transporte de activos de alto valor."
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section id="cobertura" className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary">Cobertura Nacional</h2>
              <p className="mt-4 text-gray-600">Calcula tu ruta y obtén una cotización instantánea para cualquier traslado de e-waste en los 50 estados.</p>
            </div>
            <RouteCalculator />
          </div>
        </section>

        {/* Call to Action Bar */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">¿Listo para optimizar su logística?</h2>
              <p className="text-slate-400">Hable con nuestra IA especialista o llámenos ahora mismo.</p>
            </div>
            <button className="bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
              Solicitar Cotización <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} eWaste sin limites. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;