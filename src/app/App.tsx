import React, { useState, useEffect } from 'react';
import {
  Map, Camera, Search, Droplet, Wind, Package, Check,
  Battery, AlertTriangle, Play, Pause, ChevronRight, Menu, User,
  List, MessageSquare, Home, CreditCard, ChevronLeft, MapPin, Crosshair, Calendar, Info,
  Database, Edit3, Save, Plus, Trash2, ShieldAlert, Wifi, Signal,
  BarChart2, Settings, DollarSign, Layers, FileText, LogOut, Bell,
  Zap, CheckCircle, XCircle, ToggleLeft, ToggleRight, Navigation,
  ArrowRight, Star, Shield, Truck, Radio, AlertOctagon, RefreshCw, Droplets, Eye, X, UserPlus, AlertCircle, ShoppingBag, ShieldCheck, Sprout, CheckCircle2, Activity, Mail, Phone, Edit2, Lock, EyeOff, BatteryCharging,
  Maximize2,
  PlaneTakeoff,
  Clock,
  Download
} from 'lucide-react';

// --- TYPOGRAPHY ---
const Title = ({ children, className = "", as: C = "h2" }: any) => (
  <C className={`font-black uppercase tracking-tight ${className}`} style={{ fontFamily: "'Lexend Deca', sans-serif" }}>{children}</C>
);
const Text = ({ children, className = "", as: C = "p" }: any) => (
  <C className={`${className}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{children}</C>
);


const DashboardWidget = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <h3 className="text-sm text-gray-400 font-black uppercase tracking-widest mb-4">{title}</h3>
    {children}
  </div>
);

// --- WIREFRAME ATOMS ---
const PlaceholderImage = ({ text = "Imagen", className = "" }: { text?: string; className?: string }) => (
  <div className={`relative flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100 overflow-hidden ${className}`}>
    <svg className="absolute inset-0 w-full h-full text-gray-300" preserveAspectRatio="none">
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="2" />
      <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="2" />
    </svg>
    <span className="relative z-10 bg-white/90 px-3 py-1 text-xs text-gray-700 font-bold uppercase tracking-wider border border-gray-400 shadow-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{text}</span>
  </div>
);

const WireframeInput = ({ label, type = "text", placeholder = "Lorem ipsum", className = "" }: any) => (
  <div className={`flex flex-col mb-4 w-full ${className}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
    <label className="mb-1 text-sm font-bold text-gray-600 uppercase tracking-tight">{label}</label>
    <input type={type} placeholder={placeholder} className="p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0E5E6F] transition-colors" />
  </div>
);

const WireframeButton = ({ children, onClick, primary = false, className = "", disabled = false }: any) => (
  <button onClick={onClick} disabled={disabled} style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    className={`px-4 py-3 font-bold uppercase tracking-wider transition-all border-2 ${primary ? 'border-[#0E5E6F] bg-[#0E5E6F] text-white hover:bg-[#0b4a58]' : 'border-gray-800 bg-gray-100 text-gray-800 hover:bg-gray-200'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}>
    {children}
  </button>
);

const NavButton = ({ 
  icon, 
  label, 
  active = false, 
  onClick, 
  isCollapsed 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; 
  isCollapsed: boolean;
}) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={`relative group/tooltip flex items-center gap-3 p-3 rounded-lg w-full text-left font-bold transition-all cursor-pointer select-none active:scale-[0.98] ${
      isCollapsed ? 'justify-center' : 'justify-start'
    } ${
      active 
        ? 'bg-[#0E5E6F] text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100 bg-transparent'
    }`}
    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
  >
    {/* Contenedor del ícono */}
    <div className="shrink-0 flex items-center justify-center pointer-events-none">
      {icon}
    </div>
    
    {/* Texto lateral */}
    {!isCollapsed && (
      <span className="text-sm truncate pointer-events-none">
        {label}
      </span>
    )}

    {/* Tooltip flotante (solo colapsado) */}
    {isCollapsed && (
      <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-md border border-gray-800 tracking-wider uppercase pointer-events-none">
        {label}
      </div>
    )}
  </button>
);

const StatCard = ({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: React.ReactNode }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-gray-300 transition-all min-h-[160px] w-full box-border">
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="text-left space-y-1.5 min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 block leading-tight" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            {label}
          </p>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight block whitespace-nowrap leading-none pt-0.5" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
            {value}
          </h3>
        </div>
        <div className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-lg text-gray-400 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      <div className="pt-3 mt-3 border-t border-gray-100 text-left w-full">
        <p className="text-xs font-semibold text-gray-500 tracking-normal leading-normal">
          {sub}
        </p>
      </div>
    </div>
  );
};

// --- STATE & TYPES ---
type View = 'landing' | 'auth' | 'home' | 'config_map' | 'config_cargo' | 'checkout' | 'tracking' | 'history' | 'admin_maps' | 'admin_data' | 'admin_prices' | 'pilot_dashboard' | 'farmer_dashboard' | 'profile';
type Role = 'admin' | 'pilot' | 'farmer' | null;
// Tipos de datos para el estado de los drones
interface DroneUnit {
  id: number;
  drone: string;
  pilot: string;
  status: 'Activo' | 'En vuelo' | 'Libre' | 'Mantenimiento';
}
// Interfaces
interface Plan {
  id: number;
  name: string;
  price: number;
  cycle: 'Mensual' | 'Anual' | 'Trimestral';
  flights: string;
  area: string;
  active: boolean;
}

interface DroneSale {
  id: number;
  name: string;
  model: string;
  price: number;
  stock: number;
  image: string;
  tags: string[];
  capacity: string;
}

interface Mission {
  id: number;
  crop: string;
  area: string;
  loc: string;
  type: string;
  priority: 'Alta' | 'Media' | 'Normal';
  status: 'En Progreso' | 'Pendiente' | 'Completado';
}

export type HealthStatus = 'Buena' | 'Atención' | 'Crítica';

export interface Land {
  id: number;
  name: string;
  area: string;
  sector: string;
  crop: string;
  variety: string;
  image: string;
  health: HealthStatus;
  lastInspection: string;
  notes: string;
}

interface ProfileViewProps {
  role: Role;
  onLogout: () => void;
}

interface ServiceRecord {
  id: string;
  type: string;
  category: 'fumigacion' | 'busqueda' | 'transporte' | 'mapeo';
  date: string;
  time: string;
  location: string;
  pilot: string;
  drone: string;
  coverage: string;
  metrics: { label: string; value: string; sub?: string }[];
  summary: string;
}

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [role, setRole] = useState<Role>(null);
  const [serviceType, setServiceType] = useState<string>('');
  const [initialAuthTab, setInitialAuthTab] = useState<'login' | 'register'>('login');

  const navigate = (v: View, type?: string) => { setView(v); if (type) setServiceType(type); };
  
  const openAuth = (tab: 'login' | 'register') => {
    setInitialAuthTab(tab);
    navigate('auth');
  };

  const login = (r: Role) => { setRole(r); navigate(r === 'pilot' ? 'pilot_dashboard' : r === 'farmer' ? 'farmer_dashboard' : 'home'); };
  const register = (r: Role) => { setRole(r); navigate(r === 'pilot' ? 'pilot_dashboard' : r === 'farmer' ? 'farmer_dashboard' : 'home'); };

  const noSidebar: View[] = ['landing', 'auth'];
  const showSidebar = !noSidebar.includes(view);

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        {/* Cabecera con Botón de Colapso */}
        <div className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? 'flex-col' : 'flex-row'}`}>
          {!isCollapsed ? (
            <div className="text-left animate-in fade-in duration-200">
              <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">BioDron</Title>
              <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">Portal Administrador</Text>
            </div>
          ) : (
            <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">BD</div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navegación Principal */}
        <nav className="p-3 flex flex-col gap-1">
          <NavButton icon={<Home size={18} />} label="Dashboard" active={view === 'home'} onClick={() => navigate('home')} isCollapsed={isCollapsed} />
          <NavButton icon={<List size={18} />} label="Servicios y Reservas" active={view === 'history'} onClick={() => navigate('history')} isCollapsed={isCollapsed} />
          
          <div className="my-2 border-t border-gray-100" />
          
          {!isCollapsed ? (
            <Text className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left animate-in fade-in duration-200">Herramientas Admin</Text>
          ) : (
            <div className="border-t border-gray-100 my-1" />
          )}
          
          <NavButton icon={<Map size={18} />} label="Editor de Mapas" active={view === 'admin_maps'} onClick={() => navigate('admin_maps')} isCollapsed={isCollapsed} />
          <NavButton icon={<Database size={18} />} label="Gestión de Datos" active={view === 'admin_data'} onClick={() => navigate('admin_data')} isCollapsed={isCollapsed} />
          <NavButton icon={<DollarSign size={18} />} label="Precios y Planes" active={view === 'admin_prices'} onClick={() => navigate('admin_prices')} isCollapsed={isCollapsed} />
          
          <div className="my-2 border-t border-gray-100" />
          
          <NavButton icon={<MessageSquare size={18} />} label="Soporte" onClick={() => {}} isCollapsed={isCollapsed} />
          <NavButton icon={<User size={18} />} label="Mi Perfil" active={view === 'profile'} onClick={() => navigate('profile')} isCollapsed={isCollapsed} />
        </nav>
      </div>

      {/* Perfil del Usuario al Fondo */}
      <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">CS</div>
          {!isCollapsed && (
            <div className="text-left animate-in fade-in duration-200">
              <Text className="font-bold text-sm text-gray-800">Carlos Sosa</Text>
              <Text className="text-[10px] text-[#0E5E6F] font-bold block">Admin · Juticalpa</Text>
            </div>
          )}
        </div>
        {isCollapsed && (
          <div className="absolute left-full bottom-4 ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-md border border-gray-800">
            Carlos Sosa (Admin · Juticalpa)
          </div>
        )}
      </div>
    </aside>
  );
};

const PilotSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? 'flex-col' : 'flex-row'}`}>
          {!isCollapsed ? (
            <div className="text-left animate-in fade-in duration-200">
              <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">BioDron</Title>
              <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">Panel Piloto</Text>
            </div>
          ) : (
            <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">BD</div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          <NavButton icon={<Navigation size={18} />} label="Mis Misiones" active={view === 'pilot_dashboard'} onClick={() => navigate('pilot_dashboard')} isCollapsed={isCollapsed} />
          <NavButton icon={<Radio size={18} />} label="Estado del Dron" onClick={() => {}} isCollapsed={isCollapsed} />
          <NavButton icon={<BarChart2 size={18} />} label="Historial de Vuelos" onClick={() => {}} isCollapsed={isCollapsed} />
          
          <div className="my-2 border-t border-gray-100" />
          
          <NavButton icon={<User size={18} />} label="Mi Perfil" active={view === 'profile'} onClick={() => navigate('profile')} isCollapsed={isCollapsed} />
        </nav>
      </div>

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">JR</div>
          {!isCollapsed && (
            <div className="text-left animate-in fade-in duration-200">
              <Text className="font-bold text-sm text-gray-800">Javier Reyes</Text>
              <Text className="text-[10px] text-blue-600 font-bold block">Piloto · Catacamas</Text>
            </div>
          )}
        </div>
        {isCollapsed && (
          <div className="absolute left-full bottom-4 ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-md border border-gray-800">
            Javier Reyes (Piloto · Catacamas)
          </div>
        )}
      </div>
    </aside>
  );
};

const FarmerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? 'flex-col' : 'flex-row'}`}>
          {!isCollapsed ? (
            <div className="text-left animate-in fade-in duration-200">
              <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">BioDron</Title>
              <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">Portal Agricultor</Text>
            </div>
          ) : (
            <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">BD</div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          <NavButton icon={<Layers size={18} />} label="Mis Parcelas" active={view === 'farmer_dashboard'} onClick={() => navigate('farmer_dashboard')} isCollapsed={isCollapsed} />
          <NavButton icon={<Plus size={18} />} label="Solicitar Vuelo" onClick={() => {}} isCollapsed={isCollapsed} />
          <NavButton icon={<FileText size={18} />} label="Historial de Reportes" onClick={() => {}} isCollapsed={isCollapsed} />
          
          <div className="my-2 border-t border-gray-100" />
          
          <NavButton icon={<User size={18} />} label="Mi Cuenta" active={view === 'profile'} onClick={() => navigate('profile')} isCollapsed={isCollapsed} />
        </nav>
      </div>

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">CM</div>
          {!isCollapsed && (
            <div className="text-left animate-in fade-in duration-200">
              <Text className="font-bold text-sm text-gray-800">Carlos Reyes</Text>
              <Text className="text-[10px] text-green-600 font-bold block">Agricultor · Olanchito</Text>
            </div>
          )}
        </div>
        {isCollapsed && (
          <div className="absolute left-full bottom-4 ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-md border border-gray-800">
            Carlos Reyes (Agricultor · Olanc)
          </div>
        )}
      </div>
    </aside>
  );
};

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <div className="w-full max-w-[1100px] flex flex-col items-center select-none">

        {/* Monitor */}
        <div className="w-full" style={{ background: '#2a2a2a', borderRadius: '16px 16px 0 0', padding: '12px 12px 0 12px', boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-center mb-2 gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mx-1"></div>
          </div>
          
          {/* Browser screen */}
          <div className="w-full bg-white rounded-t-lg overflow-hidden flex flex-col" style={{ height: '78vh', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3)' }}>

            {/* Browser Chrome */}
            <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-4 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white px-4 py-1 text-xs text-gray-500 rounded-md w-[40%] min-w-[220px] text-center border border-gray-300 flex items-center justify-center gap-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  <span className="opacity-40">https://</span>technodactylus.hn
                  {view !== 'landing' && view !== 'auth' && <span className="opacity-40">/app</span>}
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 flex overflow-hidden bg-gray-100 text-gray-800">
              {showSidebar && role === 'admin' && <AdminSidebar />}
              {showSidebar && role === 'pilot' && <PilotSidebar />}
              {showSidebar && role === 'farmer' && <FarmerSidebar />}

              <main className="flex-1 h-full overflow-y-auto relative bg-gray-50">
                {view === 'landing' && <LandingView onLogin={() => openAuth('login')} onRegister={() => openAuth('register')} />}
                
                {/* AHORA SE PASA EL COMPONENTE UNIFICADO DE AUTH QUE CONTIENE LOGIN Y REGISTRO */}
                {view === 'auth' && (
                  <AuthView 
                    initialTab={initialAuthTab}
                    onLogin={login} 
                    onRegister={register} 
                    onBack={() => navigate('landing')} 
                  />
                )}
                
                {view === 'home' && <HomeView onSelectService={(type) => navigate(type === 'carga' ? 'config_cargo' : 'config_map', type)} />}
                {view === 'config_map' && <ConfigMapView serviceType={serviceType} onNext={() => navigate('checkout')} onBack={() => navigate('home')} />}
                {view === 'config_cargo' && <ConfigCargoView onNext={() => navigate('checkout')} onBack={() => navigate('home')} />}
                {view === 'checkout' && <CheckoutView onConfirm={() => navigate('tracking')} onBack={() => navigate('home')} />}
                {view === 'tracking' && <TrackingView onFinish={() => navigate('history')} />}
                {view === 'history' && <HistoryView />}
                {view === 'admin_maps' && <AdminMapsView />}
                {view === 'admin_data' && <AdminDataView />}
                {view === 'admin_prices' && <AdminPricesView />}
                {view === 'pilot_dashboard' && <PilotDashboardView />}
                {view === 'farmer_dashboard' && <FarmerDashboardView />}
                {view === 'profile' && <ProfileView role={role} onLogout={() => { setRole(null); navigate('landing'); }} />}
              </main>
            </div>

          </div>
        </div>

        {/* Hinge + deck */}
        <div className="w-full h-4 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #3a3a3a, #2a2a2a)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          <div className="w-24 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}></div>
        </div>
        <div className="w-[108%] h-6 flex items-end justify-center pb-1" style={{ background: 'linear-gradient(to bottom, #2e2e2e, #252525)', borderRadius: '0 0 12px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
          <div className="w-32 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.3)' }}></div>
        </div>
        <div className="w-[115%] h-3 rounded-full mt-1" style={{ background: 'rgba(0,0,0,0.4)', filter: 'blur(8px)' }}></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 1. LANDING PAGE: SERVICIOS ELEVADOS + MODALES HORIZONTALES AMPLIOS
// ═══════════════════════════════════════════════════════════════════════
const LandingView = ({ 
  onLogin, 
  onRegister 
}: { 
  onLogin: () => void; 
  onRegister: () => void; 
}) => {
  const [pricingTab, setPricingTab] = useState<'subs' | 'equipos'>('subs');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedDrone, setSelectedDrone] = useState<any | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const carouselImages = [
    { src: 'src/img/busqueda.png', title: 'Búsqueda y Monitoreo', desc: 'Identificación térmica de anomalías en el terreno.' },
    { src: 'src/img/riego.png', title: 'Riego Automatizado', desc: 'Gestión hídrica guiada por mapas multiespectrales.' },
    { src: 'src/img/pesticidas.png', title: 'Aplicación de Insumos', desc: 'Aspersión inteligente y focalizada contra plagas.' },
    { src: 'src/img/transporte.png', title: 'Logística de Carga', desc: 'Movilización autónoma de muestras y herramientas.' }
  ];

  const plansData = [
    {
      id: 'plan-basico',
      name: 'Plan Básico Agrícola',
      price: 'L 1,200',
      period: '/mes',
      tag: 'Inicial',
      desc: 'Optimización y análisis base para parcelas pequeñas y productores independientes.',
      features: [
        '2 vuelos de monitoreo mensuales.',
        'Reportes analíticos de vigor en PDF.',
        'Cobertura de hasta 10 manzanas.'
      ],
      highlight: false
    },
    {
      id: 'plan-profesional',
      name: 'Plan Operativo Profesional',
      price: 'L 2,800',
      period: '/mes',
      tag: 'Medianos',
      desc: 'Diseñado para fincas comerciales que requieren seguimiento constante y aspersión aérea.',
      features: [
        '10 vuelos mensuales incluidos.',
        'Analítica multiespectral (NDVI / SAVI).',
        'Cobertura de hasta 50 manzanas.'
      ],
      highlight: true
    },
    {
      id: 'plan-corporativo',
      name: 'Plan Premium Corporativo',
      price: 'L 5,500',
      period: '/mes',
      tag: 'Corporativo',
      desc: 'Infraestructura total para grandes agroindustrias con despliegues autónomos diarios.',
      features: [
        'Vuelos y fumigación ilimitados.',
        'Telemetría y soporte crítico 24/7.',
        'Procesamiento en tiempo real con IA.'
      ],
      highlight: false
    }
  ];

  const dronesData = [
    {
      id: 'dji-flycart-30',
      name: 'DJI FlyCart 30',
      tag: 'Carga Ligera',
      img: 'src/img/DJI_FlyCart_30.png',
      price: 'L 450,000',
      desc: 'Capacidad de carga útil de 30 kg con rango operativo extendido y resistencia climática.',
      highlight: true,
      specs: {
        'Capacidad de Carga': '30 kg',
        'Tiempo de Vuelo': '18 min',
        'Velocidad Máxima': '72 km/h',
        'Rango Operativo': '28 km',
        'Resistencia al Viento': '12 m/s',
        'Sistema de Navegación': 'RTK Dual / GNSS',
        'Clasificación IP': 'IP55'
      }
    },
    {
      id: 'ehang-184',
      name: 'Ehang 184',
      tag: 'Pasajeros',
      img: 'src/img/Ehang_184.png',
      price: 'L 2,400,000',
      desc: 'Vehículo aéreo autónomo eléctrico diseñado para transporte seguro de un pasajero o carga mayor.',
      highlight: false,
      specs: {
        'Capacidad de Carga': '100 kg',
        'Tiempo de Vuelo': '23 min',
        'Velocidad Máxima': '100 km/h',
        'Rango Operativo': '30 km',
        'Potencia de Batería': '14.2 kWh',
        'Sistema de Seguridad': 'Fail-safe redundante',
        'Control de Vuelo': 'Autónomo 4G/5G'
      }
    },
    {
      id: 'griff-300',
      name: 'GRIFF Aviation 300',
      tag: 'Carga Pesada',
      img: 'src/img/GRIFF_Aviation_300.png',
      price: 'L 1,850,000',
      desc: 'Megadron industrial octocóptero diseñado específicamente para la elevación de insumos pesados.',
      highlight: false,
      specs: {
        'Capacidad de Carga': '227 kg',
        'Tiempo de Vuelo': '31 min',
        'Velocidad Máxima': '60 km/h',
        'Rango Operativo': '15 km',
        'Configuración': 'Octocóptero pesado',
        'Aplicación': 'Industrial / Agrícola',
        'Certificación': 'Comercial Avanzada'
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
      
      {/* ─── NAVBAR MODIFICADO ─── */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b-2 border-gray-200 px-8 flex items-center gap-6 h-14 w-full shrink-0 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3 shrink-0">
          <img 
            src="src/img/logo_bio_dron.png" 
            alt="BioDron Logo" 
            className="w-15 h-15 object-contain"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <Title className="text-2xl font-bold text-[#0E5E6F] tracking-tight">BioDron</Title>
        </div>
        <div className="flex items-center gap-6 ml-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          <a href="#inicio" className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider">Características</a>
          <a href="#servicios" className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider">Servicios</a>
          <a href="#precios" onClick={() => setPricingTab('subs')} className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider">Suscripciones</a>
          <a href="#precios" onClick={() => setPricingTab('equipos')} className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider">Equipos</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <WireframeButton onClick={onLogin} className="py-2 px-5 text-sm rounded-lg border-gray-300 bg-white text-gray-700">
            Ingresar
          </WireframeButton>
          <WireframeButton primary onClick={onRegister} className="py-2 px-5 text-sm rounded-lg">
            Registrarse
          </WireframeButton>
        </div>
      </nav>

      {/* ─── CONTENEDOR PRINCIPAL CON SCROLL ─── */}
      <div className="flex-1 w-full overflow-y-auto scroll-smooth">
        
        {/* SECCIÓN 1: HERO */}
        <section id="inicio" className="w-full px-16 flex flex-col lg:flex-row items-center justify-center gap-12 bg-white border-b-2 border-gray-100 box-border py-10">
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#0E5E6F]/10 text-[#0E5E6F] px-3.5 py-1.5 rounded-full mb-4 border border-[#0E5E6F]/20">
              <Zap size={14} />
              <Text className="text-xs font-black uppercase tracking-widest">Plataforma líder en Honduras</Text>
            </div>
            <Title className="text-4xl lg:text-[2.5rem] leading-[1.15] font-extrabold text-gray-900 mb-4 normal-case tracking-tight">
              Monitoreo Agrícola Autónomo con Drones
            </Title>
            <Text className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
              Automatiza el riego, fumigación y transporte de carga pesada con tecnología de precisión aeroespacial. Diseñado para optimizar el rendimiento y la eficiencia de tus parcelas productoras.
            </Text>
            <div className="flex gap-4">
              <WireframeButton primary onClick={onRegister} className="py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm">
                <Droplets size={18} /> Soy Agricultor
              </WireframeButton>
              <WireframeButton onClick={onRegister} className="py-2.5 px-5 rounded-xl flex items-center gap-2 bg-white border-[#0E5E6F] text-[#0E5E6F] text-sm">
                <Navigation size={18} /> Soy Piloto
              </WireframeButton>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg relative">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md">
              <img 
                src={carouselImages[activeImageIdx].src} 
                alt={carouselImages[activeImageIdx].title}
                className="w-full h-full object-cover opacity-80 transition-all duration-500"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                <span className="text-[10px] font-bold text-[#0E5E6F] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded w-max mb-1">Vista Aérea Activa</span>
                <Title as="h3" className="text-lg font-bold text-white normal-case">{carouselImages[activeImageIdx].title}</Title>
                <Text className="text-xs text-gray-300 mt-0.5">{carouselImages[activeImageIdx].desc}</Text>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {carouselImages.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${idx === activeImageIdx ? 'w-6 bg-[#0E5E6F]' : 'w-1.5 bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: SERVICIOS */}
        <section id="servicios" className="w-full px-16 bg-gray-50 border-b-2 border-gray-200 flex flex-col justify-center box-border py-20">
          <div className="max-w-6xl mx-auto w-full">
            <Title className="text-2xl font-bold text-center text-gray-900 mb-1 normal-case tracking-tight">Servicios de la Plataforma</Title>
            <Text className="text-center text-gray-500 mb-5 text-xs max-w-md mx-auto">Tres pilares de infraestructura tecnológica dedicados a la agricultura de precisión.</Text>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Droplets size={22} />, title: 'Fumigación y Riego de Precisión', desc: 'Despliegues autónomos calibrados milimétricamente para la aspersión uniforme de insumos químicos, agua y fertilizantes líquidos.' },
                { icon: <Eye size={22} />, title: 'Mapeo Multiespectral', desc: 'Diagnóstico exhaustivo de estrés hídrico, salud de cultivos y vigor vegetal mediante procesamiento avanzado de imágenes NIR.' },
                { icon: <Truck size={22} />, title: 'Logística de Alta Carga', desc: 'Transporte pesado totalmente autónomo de herramientas de campo, muestras de suelo e insumos críticos directamente al lote.' },
              ].map(f => (
                <div key={f.title} className="bg-white border-2 border-gray-200 rounded-xl p-5 group hover:border-[#0E5E6F] transition-all shadow-sm cursor-default flex flex-col items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-3 text-[#0E5E6F] group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-[#0E5E6F]">
                    {f.icon}
                  </div>
                  <Title as="h3" className="text-sm font-bold mb-1.5 text-gray-900 normal-case">{f.title}</Title>
                  <Text className="text-xs text-gray-600 leading-relaxed flex-1">{f.desc}</Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: PRECIOS Y EQUIPOS */}
        <section id="precios" className="w-full bg-white box-border pt-6 pb-12 border-b-2 border-gray-100">
          <div className="max-w-5xl mx-auto w-full px-6">
            <div className="mb-5 text-center">
              <Title className="text-2xl font-bold text-center text-gray-900 mb-1 normal-case tracking-tight">Modelos de Inversión Tecnológica</Title>
              <Text className="text-center text-gray-500 text-xs">Elige el plan operativo mensual o adquiere drones comerciales de alto tonelaje.</Text>
            </div>
            
            <div className="flex justify-center mb-5">
              <div className="flex bg-gray-100 p-1.5 rounded-xl border-2 border-gray-200 gap-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <button onClick={() => { setPricingTab('subs'); setSelectedCardId(null); }} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${pricingTab === 'subs' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500'}`}>Suscripciones Mensuales</button>
                <button onClick={() => { setPricingTab('equipos'); setSelectedCardId(null); }} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${pricingTab === 'equipos' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500'}`}>Equipos Avanzados</button>
              </div>
            </div>

            <div className="w-full">
              {pricingTab === 'subs' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">
                  {plansData.map(p => {
                    const isSelected = selectedCardId === p.id || (p.highlight && !selectedCardId);
                    
                    return (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedCardId(p.id)}
                        className={`border-2 rounded-xl p-3.5 flex flex-col justify-between bg-white h-[250px] cursor-pointer transition-all duration-200 relative ${
                          isSelected 
                            ? 'border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {p.highlight && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                            Recomendado
                          </div>
                        )}
                        
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-0.5">
                            <Title as="h3" className={`text-xs font-bold normal-case truncate ${isSelected ? 'text-[#0E5E6F]' : 'text-gray-900'}`}>{p.name}</Title>
                            <span className="bg-gray-100 text-gray-700 text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border border-gray-200 shrink-0">{p.tag}</span>
                          </div>
                          
                          <div className="mb-1">
                            <span className="font-black text-lg text-gray-900" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>{p.price}</span>
                            <span className="text-gray-400 text-[9px] ml-0.5">{p.period}</span>
                          </div>

                          <Text className="text-[10px] text-gray-500 leading-snug mb-2 pb-1 border-b border-gray-100 line-clamp-2">
                            {p.desc}
                          </Text>

                          <ul className="space-y-1">
                            {p.features.map(f => (
                              <li key={f} className="flex items-center gap-1.5">
                                <CheckCircle size={10} className={isSelected ? 'text-gray-800' : 'text-gray-400'} />
                                <Text className="text-[10px] text-gray-600 truncate">{f}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <WireframeButton primary={isSelected} onClick={(e: any) => { e.stopPropagation(); onRegister(); }} className="w-full rounded-lg text-[10px] py-1.5">
                            Adquirir Plan
                          </WireframeButton>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">
                  {dronesData.map(d => {
                    const isSelected = selectedCardId === d.id || (d.highlight && !selectedCardId);
                    
                    return (
                      <div 
                        key={d.id} 
                        onClick={() => setSelectedCardId(d.id)}
                        className={`border-2 rounded-xl overflow-hidden bg-white flex flex-col h-[265px] justify-between cursor-pointer transition-all duration-200 relative ${
                          isSelected 
                            ? 'border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {d.highlight && (
                          <div className="absolute top-1.5 left-1.5 z-10 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                            Recomendado
                          </div>
                        )}

                        {/* Contenedor de Imagen */}
                        <div className="h-20 w-full bg-gray-50 border-b border-gray-100 relative shrink-0">
                          <img 
                            src={d.img} 
                            alt={d.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                          
                          {/* BOTÓN DE INFORMACIÓN */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDrone(d);
                            }}
                            className="absolute top-1.5 right-1.5 z-20 flex items-center justify-center w-6 h-6 rounded-lg bg-white/90 backdrop-blur-md border border-gray-200 text-gray-600 hover:text-[#0E5E6F] hover:bg-white shadow-sm transition-all border-0 cursor-pointer"
                            title="Ver información detallada"
                          >
                            <Info size={13} />
                          </button>
                        </div>

                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <Title as="h3" className={`text-xs font-bold normal-case truncate max-w-[70%] ${isSelected ? 'text-[#0E5E6F]' : 'text-gray-900'}`}>{d.name}</Title>
                              <span className="bg-gray-100 text-gray-600 text-[7px] font-bold tracking-wide px-1 py-0.5 rounded border border-gray-200 shrink-0">{d.tag}</span>
                            </div>

                            <div className="mb-0.5">
                              <span className="font-black text-base text-gray-900" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>{d.price}</span>
                            </div>
                            
                            <Text className="text-[10px] text-gray-500 leading-snug mb-1.5 line-clamp-2">
                              {d.desc}
                            </Text>

                            <div className="flex flex-wrap gap-1 py-1 border-t border-gray-100">
                              <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded font-medium">Cap: {d.specs['Capacidad de Carga']}</span>
                              <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded font-medium">Aut: {d.specs['Tiempo de Vuelo']}</span>
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-gray-100">
                            <WireframeButton 
                              primary={isSelected}
                              onClick={(e: any) => { e.stopPropagation(); onRegister(); }} 
                              className="w-full rounded-lg text-[10px] py-1.5"
                            >
                              Cotizar Equipo
                            </WireframeButton>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* ─── MODAL HORIZONTAL AMPLIO ─── */}
      {selectedDrone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-gray-200 w-full max-w-3xl rounded-2xl p-5 shadow-2xl relative my-auto">
            
            <div className="flex justify-between items-start border-b border-gray-200 pb-2 mb-3">
              <div>
                <span className="text-[10px] bg-[#0E5E6F]/10 text-[#0E5E6F] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-0.5 inline-block">{selectedDrone.tag}</span>
                <Title as="h3" className="text-lg font-bold text-gray-900 normal-case">{selectedDrone.name}</Title>
              </div>
              <button 
                onClick={() => setSelectedDrone(null)} 
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:text-gray-900 font-bold text-xs bg-transparent border-0 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              
              {/* COLUMNA IZQUIERDA: FOTO Y DESCRIPCIÓN */}
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative shadow-sm">
                  <img 
                    src={selectedDrone.img} 
                    alt={selectedDrone.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-gray-900/90 backdrop-blur-md text-white font-black text-sm px-3 py-1 rounded-lg shadow-md" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
                    {selectedDrone.price}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-700 block mb-0.5">Descripción del Equipo:</span>
                  <Text className="text-[11px] text-gray-600 leading-snug bg-gray-50 p-2.5 rounded-xl border border-gray-100">{selectedDrone.desc}</Text>
                </div>
              </div>

              {/* COLUMNA DERECHA: FICHA TÉCNICA Y ACCIONES */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-700 block mb-1">Especificaciones Técnicas Completas:</span>
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-[11px]">
                    {Object.entries(selectedDrone.specs).map(([key, val]: any, index) => (
                      <div key={key} className={`flex justify-between py-1.5 px-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-b-0`}>
                        <span className="text-gray-500 font-medium">{key}</span>
                        <span className="font-bold text-gray-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-3 border-t border-gray-200 pt-3">
                  <WireframeButton onClick={() => setSelectedDrone(null)} className="flex-1 py-2 text-xs rounded-xl bg-white text-gray-700 border-gray-300">Cerrar</WireframeButton>
                  <WireframeButton primary onClick={() => { setSelectedDrone(null); onRegister(); }} className="flex-1 py-2 text-xs rounded-xl">Cotizar Equipo</WireframeButton>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 2. AUTH FLUX COMPLETE — Login, Registro, Recuperación y Verificacion exitosa
// ═══════════════════════════════════════════════════════════════════════
type AuthStep = 'login' | 'register' | 'recover' | 'verify' | 'success';

const AuthView = ({ 
  initialTab = 'login',
  onLogin, 
  onRegisterSuccess, 
  onBack 
}: { 
  initialTab?: 'login' | 'register';
  onLogin: (r: Role) => void; 
  onRegisterSuccess: () => void; 
  onBack: () => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('farmer');
  const [step, setStep] = useState<AuthStep>(initialTab);
  const [recoverMethod, setRecoverMethod] = useState<'email' | 'phone'>('email');
  
  // Array de 6 elementos para los cuadros de código
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);

  React.useEffect(() => {
    setStep(initialTab);
  }, [initialTab]);

  const roles: { key: Role; label: string; sub: string; icon: React.ReactNode }[] = [
    { key: 'farmer', label: 'Agricultor', sub: 'Solicita y monitorea vuelos de precisión', icon: <Layers size={14} /> },
    { key: 'pilot', label: 'Piloto de Drones', sub: 'Gestiona misiones y planes de vuelo', icon: <Navigation size={14} /> },
    { key: 'admin', label: 'Administrador', sub: 'Control operativo integral', icon: <Shield size={14} /> },
  ];

  const handleDigitChange = (value: string, index: number) => {
    const nextDigits = [...codeDigits];
    nextDigits[index] = value.slice(-1);
    setCodeDigits(nextDigits);

    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSuccessFinish = () => {
    setCodeDigits(['', '', '', '', '', '']);
    setStep('login'); 
    if (onRegisterSuccess) onRegisterSuccess();
  };

  return (
    <div key="auth-card-root" className="w-full max-w-4xl mx-auto p-6 bg-white antialiased select-none">
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        
        {/* ENCABEZADO PRINCIPAL */}
        {step !== 'success' && (
          <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
            <div className="text-left">
              <Title className="text-lg text-[#0E5E6F] font-black tracking-tight mb-0.5">Technodactylus</Title>
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Plataforma de Infraestructura Autónoma</Text>
            </div>

            {(step === 'login' || step === 'register') && (
              <div className="flex bg-gray-200/60 p-1 rounded-xl border-2 border-gray-200 w-64 gap-1 shrink-0" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <button 
                  onClick={() => setStep('login')} 
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${step === 'login' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Ingresar
                </button>
                <button 
                  onClick={() => setStep('register')} 
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${step === 'register' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  Registrar
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO DINÁMICO */}
        <div className="min-h-[290px] bg-white flex flex-col justify-stretch">
          
          {/* PASO 1: INICIAR SESIÓN */}
          {step === 'login' && (
            <div className="grid grid-cols-2 divide-x-2 divide-gray-100 items-start flex-1">
              <div className="p-6 flex flex-col justify-between gap-3 bg-gray-50/30 self-stretch">
                <div>
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3 text-left">1. Elige tu Rol Operativo</Text>
                  <div className="flex flex-col gap-2">
                    {roles.map(r => (
                      <button 
                        key={r.key} 
                        onClick={() => setSelectedRole(r.key)}
                        className={`flex items-center gap-3 p-2 rounded-xl border-2 text-left transition-all bg-white active:scale-[0.99] ${
                          selectedRole === r.key ? 'border-[#0E5E6F] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                      >
                        <div className={`p-1.5 rounded-lg border-2 shrink-0 transition-colors ${
                          selectedRole === r.key ? 'bg-[#0E5E6F] text-white border-[#0E5E6F]' : 'bg-gray-50 text-gray-400 border-gray-200'
                        }`}>
                          {r.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text className={`font-bold text-xs ${selectedRole === r.key ? 'text-[#0E5E6F]' : 'text-gray-800'}`}>{r.label}</Text>
                          <Text className="text-[10px] text-gray-400 truncate block mt-0.5">{r.sub}</Text>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between gap-4 self-stretch">
                <div className="space-y-3">
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">2. Credenciales de Acceso</Text>
                  <div className="space-y-1">
                    <WireframeInput label="Correo Electrónico" placeholder="usuario@ejemplo.hn" />
                    <WireframeInput label="Contraseña" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 select-none mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-2 border-gray-300 text-[#0E5E6F] accent-[#0E5E6F] cursor-pointer" />
                    <span className="text-[11px] text-gray-500 font-medium group-hover:text-gray-700 transition-colors">Recordarme en este equipo</span>
                  </label>
                  <button 
                    onClick={() => setStep('recover')}
                    className="text-[#0E5E6F] font-black cursor-pointer hover:underline uppercase tracking-widest text-[9px] bg-transparent border-none outline-none"
                  >
                    Recuperar clave
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: REGISTRO */}
          {step === 'register' && (
            <div className="grid grid-cols-2 divide-x-2 divide-gray-100 items-start flex-1">
              <div className="p-6 flex flex-col justify-start gap-3 bg-gray-50/30 self-stretch">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">1. Perfil e Identidad</Text>
                    
                    <div className="flex bg-gray-200/60 p-0.5 rounded-lg border-2 border-gray-200 w-44 gap-0.5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {(['farmer', 'pilot', 'admin'] as Role[]).map(r => (
                        <button 
                          key={r} 
                          onClick={() => setSelectedRole(r)}
                          className={`flex-1 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-center transition-all ${
                            selectedRole === r ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          {r === 'farmer' ? 'Agri' : r === 'pilot' ? 'Piloto' : 'Admin'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <WireframeInput label="Nombre" placeholder="Nombre" />
                    <WireframeInput label="Apellido" placeholder="Apellido" />
                  </div>
                  
                  <WireframeInput label="Correo Electrónico" placeholder="usuario@ejemplo.hn" />
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between gap-3 self-stretch">
                <div className="space-y-2">
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">2. Credenciales y Operación</Text>
                  
                  {selectedRole === 'pilot' ? (
                    <div className="animate-in fade-in duration-150">
                      <WireframeInput label="Licencia Piloto (ID)" placeholder="HN-PILOT-0001" />
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-150">
                      <WireframeInput label="Ubicación" placeholder="Juticalpa, Olancho" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <WireframeInput label="Teléfono" placeholder="+504 9999-0000" />
                    <WireframeInput label="Contraseña" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="pt-2 mt-auto">
                  <p className="text-[9px] text-gray-400 text-left leading-normal italic border-t border-gray-100 pt-2">
                    * La información ingresada pasará por una revisión de auditoría previa al despliegue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: FORMULARIO DE RECUPERACIÓN DE CLAVE */}
          {step === 'recover' && (
            <div className="p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-full border-2 border-[#0E5E6F]/20">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <Title className="text-base text-gray-800 font-black">Recuperación de Cuenta</Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Selecciona el canal para la entrega del código único de restablecimiento.
                </p>
              </div>

              {/* Selector de método */}
              <div className="flex bg-gray-100 p-1 rounded-xl border-2 border-gray-200 w-full gap-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <button 
                  onClick={() => setRecoverMethod('email')} 
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${recoverMethod === 'email' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500'}`}
                >
                  Correo Electrónico
                </button>
                <button 
                  onClick={() => setRecoverMethod('phone')} 
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${recoverMethod === 'phone' ? 'bg-[#0E5E6F] text-white shadow-sm' : 'text-gray-500'}`}
                >
                  Teléfono Móvil
                </button>
              </div>

              <div className="w-full text-left">
                {recoverMethod === 'email' ? (
                  <WireframeInput label="Dirección de Correo Registrada" placeholder="usuario@ejemplo.hn" />
                ) : (
                  <WireframeInput label="Número de Teléfono Registrado" placeholder="+504 9999-0000" />
                )}
              </div>
            </div>
          )}

          {/* PASO 4: PANTALLA DE INGRESO DE CÓDIGO (6 CUADROS CON NÚMEROS DE EJEMPLO) */}
          {step === 'verify' && (
            <div className="p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-5 animate-in fade-in duration-200">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-full border-2 border-amber-200">
                <Shield size={24} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <Title className="text-base text-gray-800 font-black">Verificación de Seguridad</Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Hemos enviado un código único de verificación. Ingrésalo a continuación para continuar.
                </p>
              </div>
              
              {/* Casillas individuales con placeholders numéricos correlativos */}
              <div className="flex gap-2 justify-center py-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {codeDigits.map((digit, index) => (
                  <input
                    key={index}
                    id={`digit-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder={String(index + 1)}
                    onChange={(e) => handleDigitChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-11 h-12 text-center text-lg font-black border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] focus:outline-none bg-gray-50/50 transition-all uppercase placeholder-gray-300"
                  />
                ))}
              </div>
            </div>
          )}

          {/* PASO 5: PANTALLA DE REGISTRO / OPERACIÓN EXITOSA */}
          {step === 'success' && (
            <div className="p-8 flex flex-col items-center justify-center text-center max-w-sm mx-auto my-auto space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border-2 border-emerald-200 shadow-sm">
                <Check size={32} />
              </div>
              <div className="space-y-1.5">
                <Title className="text-lg text-[#0E5E6F] font-black tracking-tight">¡Operación Completada!</Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  La identidad ha sido confirmada con éxito. Los parámetros de seguridad y acceso han sido restablecidos correctamente.
                </p>
              </div>
              <div className="w-full pt-2">
                <button 
                  onClick={handleSuccessFinish}
                  className="w-full text-[11px] font-black py-2.5 rounded-xl border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white tracking-wider uppercase transition-transform active:scale-[0.98]"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  Ir al Inicio de Sesión
                </button>
              </div>
            </div>
          )}

        </div>

        {/* PIE DE PÁGINA */}
        {step !== 'success' && (
          <div className="border-t-2 border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between gap-4">
            <button 
              onClick={() => {
                if (step === 'verify') setStep('register');
                else if (step === 'recover') setStep('login');
                else onBack();
              }} 
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-[10px] font-black uppercase tracking-wider transition-colors"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <ChevronLeft size={13} /> {step === 'verify' || step === 'recover' ? 'Regresar' : 'Cancelar'}
            </button>

            <div className="flex items-center gap-4">
              {(step === 'login' || step === 'register') && (
                <Text className="text-xs text-gray-400 hidden sm:block" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {step === 'login' ? '¿No tienes cuenta?' : '¿Ya eres miembro?'}
                  {' '}
                  <a onClick={() => setStep(step === 'login' ? 'register' : 'login')} className="text-[#0E5E6F] font-black cursor-pointer hover:underline">
                    {step === 'login' ? 'Crear una' : 'Ingresar'}
                  </a>
                </Text>
              )}

              <WireframeButton 
                primary 
                onClick={() => {
                  if (step === 'login') onLogin(selectedRole);
                  else if (step === 'register') setStep('verify'); 
                  else if (step === 'recover') setStep('verify');
                  else if (step === 'verify') setStep('success'); 
                }} 
                className="text-[10px] font-black py-2 px-5 rounded-lg tracking-wider uppercase border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white transition-transform active:scale-[0.98]"
              >
                {step === 'login' ? 'INGRESAR AL SISTEMA' : step === 'register' ? 'CONFIRMAR REGISTRO' : step === 'recover' ? 'ENVIAR CÓDIGO' : 'VERIFICAR CÓDIGO'}
              </WireframeButton>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. ADMIN DASHBOARD (HOME) — Panel Operativo con Gráficos Integrados
// ═══════════════════════════════════════════════════════════════════════
export const HomeView = ({ onSelectService }: { onSelectService: (type: string) => void }) => {
  // Estado para el simulador de rendimiento interactivo
  const [bateria, setBateria] = useState<number>(100);
  const [viento, setViento] = useState<number>(12);
  const [carga, setCarga] = useState<number>(150); // Carga en lbs (máx 500)

  // Lista de Drones requeridos
  const [drones, setDrones] = useState<DroneUnit[]>([
    { id: 1, drone: 'DJI FlyCart 30', pilot: 'Javier Reyes', status: 'Activo' },
    { id: 2, drone: 'Ehang 184', pilot: 'Carlos Sosa', status: 'En vuelo' },
    { id: 3, drone: 'GRIFF Aviation 300', pilot: '— Sin asignar —', status: 'Libre' },
  ]);

  // Estados para Modales
  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [editingDrone, setEditingDrone] = useState<DroneUnit | null>(null);

  // Campos de formulario para asignación
  const [selectedDroneId, setSelectedDroneId] = useState<number>(3);
  const [newPilotName, setNewPilotName] = useState<string>('');

  // -------------------------------------------------------------
  // LÓGICA DEL SIMULADOR DE TELEMETRÍA (Drones de hasta 500 lbs)
  // -------------------------------------------------------------
  const autonomiaBase = 55; // min
  const penalizacionViento = (viento / 50) * 15;
  const penalizacionCarga = (carga / 500) * 25; // Normalizado a 500 lbs
  const factorBateria = bateria / 100;

  const autonomiaEstimada = Math.max(
    0,
    Math.round((autonomiaBase - penalizacionViento - penalizacionCarga) * factorBateria)
  );

  const hectareasEstimadas = Math.max(0, Number((autonomiaEstimada * 1.2).toFixed(1)));
  const porcentajeProgreso = Math.min(100, Math.max(0, (autonomiaEstimada / 55) * 100));

  // -------------------------------------------------------------
  // HANDLERS PARA MODALES Y EDICIÓN
  // -------------------------------------------------------------
  const handleSaveStatus = (id: number, newStatus: DroneUnit['status'], newPilot: string) => {
    setDrones(prev => prev.map(d => d.id === id ? { ...d, status: newStatus, pilot: newPilot } : d));
    setEditingDrone(null);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPilotName.trim()) return;

    setDrones(prev => prev.map(d => d.id === selectedDroneId ? {
      ...d,
      pilot: newPilotName,
      status: 'Activo'
    } : d));

    setNewPilotName('');
    setIsAssignModalOpen(false);
  };

  const getStatusBadge = (status: DroneUnit['status']) => {
    switch (status) {
      case 'Activo':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'En vuelo':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Libre':
        return 'text-gray-500 bg-gray-100 border-gray-200';
      case 'Mantenimiento':
        return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white antialiased">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-200 shrink-0 select-none">
        <div className="text-left space-y-1">
          <Title className="text-2xl text-gray-900">Dashboard Principal</Title>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Panel de Control Operativo — Administración General
          </Text>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors active:scale-95">
            <Bell size={16} className="text-gray-500" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-black" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
              3
            </span>
          </button>
          <div className="bg-[#0E5E6F]/5 border-2 border-[#0E5E6F]/20 text-[#0E5E6F] px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 bg-[#0E5E6F] rounded-full animate-pulse"></span>
            <Text className="text-xs font-black uppercase tracking-widest">3 Drones en vuelo</Text>
          </div>
        </div>
      </div>

      {/* RESUMEN ANALÍTICO (RESTAURADO EXACTO AL ORIGINAL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 text-left">
        <StatCard label="Drones Activos" value="8 / 12" sub="4 en mantenimiento" icon={<Radio size={16} />} />
        <StatCard label="Misiones Hoy" value="5" sub="+2 programadas" icon={<Navigation size={16} />} />
        <StatCard label="Ingresos Mensuales" value="L 48,200" sub="+12% vs mes anterior" icon={<DollarSign size={16} />} />
        <StatCard label="Nuevas Solicitudes" value="3" sub="Pendientes de aprobación" icon={<Bell size={16} />} />
      </div>

      {/* WIDGET INTERACTIVO DE RENDIMIENTO DE TELEMETRÍA */}
      <div className="mb-10 text-left">
        <DashboardWidget title="Autonomía Teórica y Cobertura Óptima">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {/* Controles de Entrada */}
            <div className="space-y-6 border-r-0 md:border-r-2 md:border-gray-100 pr-0 md:pr-8" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              
              {/* BATERÍA */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Capacidad de Batería</label>
                  <span className="text-xs font-mono font-black text-[#0E5E6F]">{bateria}%</span>
                </div>
                <input 
                  type="range" min="10" max="100" value={bateria} 
                  onChange={(e) => setBateria(Number(e.target.value))}
                  className="w-full accent-[#0E5E6F] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* VIENTO (#2994B2) */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Velocidad del Viento</label>
                  <span className="text-xs font-mono font-black text-[#2994B2]">{viento} km/h</span>
                </div>
                <input 
                  type="range" min="0" max="50" value={viento} 
                  onChange={(e) => setViento(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-[#2994B2]"
                />
              </div>

              {/* CARGA ÚTIL (#B165E0 - MÁXIMO 500 LBS) */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Peso de Carga Útil</label>
                  <span className="text-xs font-mono font-black text-[#B165E0]">{carga} lbs</span>
                </div>
                <input 
                  type="range" min="0" max="500" value={carga} 
                  onChange={(e) => setCarga(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg cursor-pointer accent-[#B165E0]"
                />
              </div>
            </div>

            {/* Gráfico y Resultados Visuales */}
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-around gap-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-34 h-34 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-200" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#0E5E6F] transition-all duration-300" strokeDasharray={`${porcentajeProgreso}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center space-y-0.5">
                  <span className="text-3xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>{autonomiaEstimada}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Minutos</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 w-full text-left">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                  <div className="p-2.5 bg-[#0E5E6F]/10 rounded-lg text-[#0E5E6F] shrink-0"><Layers size={16} /></div>
                  <div className="space-y-0.5">
                    <Text className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Límite de Cobertura Estimado</Text>
                    <span className="text-base font-black text-gray-800 block" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>{hectareasEstimadas} Hectáreas (ha)</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4">
                  <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 shrink-0"><Zap size={16} /></div>
                  <div className="space-y-0.5">
                    <Text className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Estado del Sistema</Text>
                    <span className={`text-xs font-bold uppercase block ${viento > 35 || carga > 400 ? 'text-red-500' : 'text-green-600'}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {viento > 35 || carga > 400 ? '⚠️ Estrés Crítico de Motores' : '✓ Operación Estable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* MAPA DE GEOCERCAS EN VIVO (ANCHO COMPLETO) */}
      <div className="mb-10 text-left">
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
            <Title as="h3" className="text-sm text-gray-800 normal-case tracking-tight">Mapa de Geocercas en Vivo</Title>
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-green-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> En tiempo real
            </span>
          </div>
          <div className="relative w-full h-[380px] bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src="src/img/mapa_geocercas.png" 
              alt="Mapa Vectorial — Geocercas" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/1200x500?text=src/img/mapa_geocercas.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* ASIGNACIÓN DE UNIDADES (UBICADO ABAJO DEL MAPA) */}
      <div className="mb-10 text-left">
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
            <div>
              <Title as="h3" className="text-sm text-gray-800 normal-case tracking-tight">Asignación de Unidades</Title>
              <Text className="text-[11px] text-gray-400">Flota de Carga Pesada (Capacidad hasta 500 lbs)</Text>
            </div>
            <button 
              onClick={() => setIsAssignModalOpen(true)}
              className="text-[9px] border-2 border-[#0E5E6F] bg-[#0E5E6F] hover:bg-[#094350] text-white font-black uppercase tracking-wider py-2 px-4 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <UserPlus size={14} /> + Asignar
            </button>
          </div>

          <div className="divide-y-2 divide-gray-100">
            {drones.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0 text-[#0E5E6F]">
                    <Radio size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <Text className="font-bold text-xs text-gray-800">{item.drone}</Text>
                    <Text className="text-[11px] text-gray-400">Piloto: <span className="font-semibold text-gray-700">{item.pilot}</span></Text>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <span className={`text-[9px] font-black uppercase px-3 py-1 border rounded-lg ${getStatusBadge(item.status)}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {item.status}
                  </span>
                  <button 
                    onClick={() => setEditingDrone(item)}
                    className="p-2 border border-gray-200 hover:border-[#0E5E6F] hover:text-[#0E5E6F] rounded-lg transition-all text-gray-400 active:scale-95 flex items-center gap-1 text-xs font-bold"
                  >
                    <Edit3 size={14} /> Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MÓDULOS DE SERVICIO (ESTILO BOTONES) */}
      <div className="shrink-0 select-none text-left">
        <Title as="h3" className="text-sm text-gray-400 mb-4">Nuevo Servicio Operativo</Title>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Search size={18} />, title: 'Búsqueda y Rescate', type: 'busqueda' },
            { icon: <Droplet size={18} />, title: 'Riego de Precisión', type: 'riego' },
            { icon: <Wind size={18} />, title: 'Fumigación Controlada', type: 'fumigacion' },
            { icon: <Package size={18} />, title: 'Transporte de Carga', type: 'carga' },
          ].map((s) => (
            <button
              key={s.type}
              onClick={() => onSelectService(s.type)}
              className="w-full bg-white border-2 border-gray-200 hover:border-[#0E5E6F] hover:bg-[#0E5E6F]/5 px-5 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-start gap-3.5 group active:scale-[0.98] shadow-sm"
            >
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 group-hover:bg-[#0E5E6F] group-hover:text-white group-hover:border-[#0E5E6F] transition-colors shrink-0">
                {s.icon}
              </div>
              <Title as="h4" className="text-xs text-gray-800 font-bold group-hover:text-[#0E5E6F] normal-case transition-colors tracking-tight text-left">
                {s.title}
              </Title>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL HORIZONTAL 1: ASIGNAR NUEVA UNIDAD */}
      {/* ========================================================================= */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            
            <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <UserPlus className="text-[#0E5E6F]" size={20} />
                <Title as="h3" className="text-base text-gray-900 normal-case tracking-tight">
                  Asignar Unidad de Transporte Pesado
                </Title>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                <div className="space-y-3">
                  <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    1. Seleccionar Dron Disponible
                  </Text>
                  <div className="space-y-2">
                    {drones.map((d) => (
                      <div 
                        key={d.id}
                        onClick={() => setSelectedDroneId(d.id)}
                        className={`p-3.5 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                          selectedDroneId === d.id 
                            ? 'border-[#0E5E6F] bg-[#0E5E6F]/5' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <Text className="text-xs font-bold text-gray-800">{d.drone}</Text>
                          <Text className="text-[10px] text-gray-400">Estado actual: {d.status}</Text>
                        </div>
                        {selectedDroneId === d.id && <Check size={16} className="text-[#0E5E6F]" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      2. Nombre del Piloto a Cargo
                    </Text>
                    <input 
                      type="text" 
                      required
                      placeholder="Ing. Javir Reyes"
                      value={newPilotName}
                      onChange={(e) => setNewPilotName(e.target.value)}
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                    />
                    <Text className="text-[11px] text-gray-400">
                      Al confirmar, el estado cambiará automáticamente a <span className="text-green-600 font-bold">Activo</span>.
                    </Text>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button 
                      type="button" 
                      onClick={() => setIsAssignModalOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      Confirmar Asignación
                    </button>
                  </div>
                </div>

              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL HORIZONTAL 2: EDITAR ESTADO DE DRON */}
      {/* ========================================================================= */}
      {editingDrone && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            
            <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Edit3 className="text-[#0E5E6F]" size={18} />
                <Title as="h3" className="text-base text-gray-900 normal-case tracking-tight">
                  Editar Estado: {editingDrone.drone}
                </Title>
              </div>
              <button onClick={() => setEditingDrone(null)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Piloto Asignado
                  </Text>
                  <input 
                    type="text" 
                    value={editingDrone.pilot} 
                    onChange={(e) => setEditingDrone({ ...editingDrone, pilot: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Estado Operativo
                  </Text>
                  <select 
                    value={editingDrone.status}
                    onChange={(e) => setEditingDrone({ ...editingDrone, status: e.target.value as DroneUnit['status'] })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-bold bg-white"
                  >
                    <option value="Activo">Activo</option>
                    <option value="En vuelo">En vuelo</option>
                    <option value="Libre">Libre</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setEditingDrone(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleSaveStatus(editingDrone.id, editingDrone.status, editingDrone.pilot)}
                  className="px-5 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 5. ADMIN — PRICES & SUBSCRIPTIONS (Catálogo de Precios e Ingresos Recurrentes)
// ═══════════════════════════════════════════════════════════════════════
export const AdminPricesView = () => {
  const [tab, setTab] = useState<'subs' | 'ventas'>('subs');

  // -------------------------------------------------------------
  // ESTADOS DE PLANES DE SUSCRIPCIÓN
  // -------------------------------------------------------------
  const [planes, setPlanes] = useState<Plan[]>([
    { id: 1, name: 'Básico', price: 1200, cycle: 'Mensual', flights: '2', area: '10 ha', active: true },
    { id: 2, name: 'Operativo', price: 2800, cycle: 'Mensual', flights: '10', area: '50 ha', active: true },
    { id: 3, name: 'Premium', price: 5500, cycle: 'Mensual', flights: 'Ilimitado', area: 'Ilimitada', active: true },
    { id: 4, name: 'Básico Anual', price: 12000, cycle: 'Anual', flights: '2', area: '10 ha', active: false },
  ]);

  // -------------------------------------------------------------
  // ESTADOS DE VENTA DE DRONES (Imágenes locales)
  // -------------------------------------------------------------
  const [dronesVenta, setDronesVenta] = useState<DroneSale[]>([
    {
      id: 1,
      name: 'DJI FlyCart 30',
      model: 'Transporte de Carga Pesada',
      price: 280000,
      stock: 3,
      image: 'src/img/DJI_FlyCart_30.png',
      tags: ['30kg / 500lbs', 'IP55', 'Doble Batería'],
      capacity: '500 lbs'
    },
    {
      id: 2,
      name: 'Ehang 184',
      model: 'Pasajeros & Carga Crítica',
      price: 450000,
      stock: 1,
      image: 'src/img/Ehang_184.png',
      tags: ['AAV Autónomo', '400 lbs', 'Telemetría 5G'],
      capacity: '400 lbs'
    },
    {
      id: 3,
      name: 'GRIFF Aviation 300',
      model: 'Elevación Industrial & Agrícola',
      price: 520000,
      stock: 2,
      image: 'src/img/GRIFF_Aviation_300.png',
      tags: ['Lift Heavy', '500 lbs', 'Octocóptero'],
      capacity: '500 lbs'
    }
  ]);

  // -------------------------------------------------------------
  // CALCULADORA ANALÍTICA DE MRR
  // -------------------------------------------------------------
  const [clientesBasico, setClientesBasico] = useState<number>(15);
  const [clientesOperativo, setClientesOperativo] = useState<number>(8);
  const [clientesPremium, setClientesPremium] = useState<number>(4);

  const mrrBasico = clientesBasico * (planes.find(p => p.name === 'Básico')?.price || 1200);
  const mrrOperativo = clientesOperativo * (planes.find(p => p.name === 'Operativo')?.price || 2800);
  const mrrPremium = clientesPremium * (planes.find(p => p.name === 'Premium')?.price || 5500);
  const mrrTotal = mrrBasico + mrrOperativo + mrrPremium;

  // -------------------------------------------------------------
  // ESTADOS PARA MODALES
  // -------------------------------------------------------------
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const [isDroneModalOpen, setIsDroneModalOpen] = useState<boolean>(false);
  const [editingDrone, setEditingDrone] = useState<DroneSale | null>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Handlers para Planes
  const handleTogglePlan = (id: number) => {
    setPlanes(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    setHasUnsavedChanges(true);
  };

  const handleSavePlan = (plan: Plan) => {
    if (planes.some(p => p.id === plan.id)) {
      setPlanes(prev => prev.map(p => p.id === plan.id ? plan : p));
    } else {
      setPlanes(prev => [...prev, { ...plan, id: Date.now() }]);
    }
    setEditingPlan(null);
    setIsPlanModalOpen(false);
    setHasUnsavedChanges(true);
  };

  const handleDeletePlan = (id: number) => {
    setPlanes(prev => prev.filter(p => p.id !== id));
    setHasUnsavedChanges(true);
  };

  // Handlers para Drones
  const handleSaveDrone = (drone: DroneSale) => {
    if (dronesVenta.some(d => d.id === drone.id)) {
      setDronesVenta(prev => prev.map(d => d.id === drone.id ? drone : d));
    } else {
      setDronesVenta(prev => [...prev, { ...drone, id: Date.now() }]);
    }
    setEditingDrone(null);
    setIsDroneModalOpen(false);
    setHasUnsavedChanges(true);
  };

  const handleAddTag = (droneId: number) => {
    const tag = prompt("Ingrese la nueva etiqueta para la unidad:");
    if (!tag) return;
    setDronesVenta(prev => prev.map(d => d.id === droneId ? { ...d, tags: [...d.tags, tag] } : d));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white antialiased">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200 text-left">
        <div className="space-y-1">
          <Title className="text-xl sm:text-2xl text-gray-900">Precios y Suscripciones</Title>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">
            Configura planes, tarifas y drones de alta capacidad en Lempiras (L.)
          </Text>
        </div>
      </div>

      {/* TABS SELECTORAS */}
      <div className="flex border-b-2 border-gray-200 mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        <button
          onClick={() => setTab('subs')}
          className={`px-4 sm:px-6 py-2.5 font-black text-xs uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
            tab === 'subs' ? 'border-[#0E5E6F] text-[#0E5E6F]' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Layers size={15} /> Planes de Suscripción
        </button>
        <button
          onClick={() => setTab('ventas')}
          className={`px-4 sm:px-6 py-2.5 font-black text-xs uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
            tab === 'ventas' ? 'border-[#0E5E6F] text-[#0E5E6F]' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <ShoppingBag size={15} /> Venta de Drones
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PLANES DE SUSCRIPCIÓN */}
      {/* ========================================================================= */}
      {tab === 'subs' && (
        <div className="space-y-8">
          
          {/* TABLA DE PLANES COMPACTA */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col text-left">
            
            {/* VISTA DE TABLA CON CAMPOS REDUCIDOS Y MÁS COMPACTOS */}
            <div className="hidden md:block w-full">
              <table className="w-full text-left border-collapse" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <thead className="bg-gray-50/80 border-b-2 border-gray-200 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="py-3 px-3">Plan</th>
                    <th className="py-3 px-3">Precio (L.)</th>
                    <th className="py-3 px-3">Ciclo</th>
                    <th className="py-3 px-3 text-center">Vuelos/Mes</th>
                    <th className="py-3 px-3 text-center">Cobertura</th>
                    <th className="py-3 px-3 text-center">Estado</th>
                    <th className="py-3 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {planes.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-2.5 px-3">
                        <Text className="font-bold text-xs text-gray-900">{plan.name}</Text>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-black">L.</span>
                          <input
                            type="number"
                            value={plan.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPlanes(prev => prev.map(p => p.id === plan.id ? { ...p, price: val } : p));
                              setHasUnsavedChanges(true);
                            }}
                            className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-20 focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-gray-800"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={plan.cycle}
                          onChange={(e) => {
                            const val = e.target.value as Plan['cycle'];
                            setPlanes(prev => prev.map(p => p.id === plan.id ? { ...p, cycle: val } : p));
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-[11px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-700 font-semibold"
                        >
                          <option value="Mensual">Mensual</option>
                          <option value="Anual">Anual</option>
                          <option value="Trimestral">Trimestral</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <Text className="text-xs text-gray-700 font-mono font-bold">{plan.flights}</Text>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <Text className="text-xs text-gray-700 font-medium">{plan.area}</Text>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => handleTogglePlan(plan.id)}
                          className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border transition-all ${
                            plan.active
                              ? 'border-green-200 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-gray-50 text-gray-400'
                          }`}
                        >
                          {plan.active ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                          {plan.active ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditingPlan(plan); setIsPlanModalOpen(true); }}
                            className="p-1 hover:bg-gray-100 border border-gray-200 rounded-md text-gray-500 hover:text-[#0E5E6F] transition-colors"
                            title="Editar Plan"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-1 hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-md text-gray-400 hover:text-red-500 transition-colors"
                            title="Eliminar Plan"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VISTA RESPONSIVA MÓVIL */}
            <div className="block md:hidden divide-y divide-gray-200">
              {planes.map((plan) => (
                <div key={plan.id} className="p-3 space-y-2 bg-white">
                  <div className="flex items-center justify-between">
                    <Text className="font-bold text-xs text-gray-900">{plan.name}</Text>
                    <button
                      onClick={() => handleTogglePlan(plan.id)}
                      className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                        plan.active ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      {plan.active ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                      {plan.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[9px] font-black uppercase text-gray-400 block mb-0.5">Precio (L.)</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-black">L.</span>
                        <input
                          type="number"
                          value={plan.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPlanes(prev => prev.map(p => p.id === plan.id ? { ...p, price: val } : p));
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-full focus:border-[#0E5E6F] focus:outline-none font-bold text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase text-gray-400 block mb-0.5">Ciclo</span>
                      <select
                        value={plan.cycle}
                        onChange={(e) => {
                          const val = e.target.value as Plan['cycle'];
                          setPlanes(prev => prev.map(p => p.id === plan.id ? { ...p, cycle: val } : p));
                          setHasUnsavedChanges(true);
                        }}
                        className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-700 font-semibold w-full"
                      >
                        <option value="Mensual">Mensual</option>
                        <option value="Anual">Anual</option>
                        <option value="Trimestral">Trimestral</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                    <span>Vuelos: <strong className="text-gray-800 font-mono">{plan.flights}</strong></span>
                    <span>Cobertura: <strong className="text-gray-800">{plan.area}</strong></span>
                  </div>

                  <div className="flex justify-end gap-2 pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => { setEditingPlan(plan); setIsPlanModalOpen(true); }}
                      className="px-2.5 py-1 hover:bg-gray-100 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 flex items-center gap-1"
                    >
                      <Edit3 size={11} /> Editar
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="px-2.5 py-1 hover:bg-red-50 border border-gray-200 hover:border-red-100 rounded-lg text-[11px] font-bold text-red-500 flex items-center gap-1"
                    >
                      <Trash2 size={11} /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t-2 border-gray-100 bg-gray-50/50 flex justify-start">
              <button
                onClick={() => {
                  setEditingPlan({ id: 0, name: '', price: 1000, cycle: 'Mensual', flights: '5', area: '20 ha', active: true });
                  setIsPlanModalOpen(true);
                }}
                className="py-2 px-3.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <Plus size={13} /> Agregar Nuevo Plan
              </button>
            </div>
          </div>

          {/* CALCULADORA ANALÍTICA DE PROYECCIONES */}
          <div className="text-left">
            <DashboardWidget title="Análisis y Proyección Mensual de Suscripciones Activas">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-4">
                
                {/* Sliders de Distribución de Clientes */}
                <div className="space-y-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">Volumen Plan Básico (L. {planes.find(p => p.name === 'Básico')?.price.toLocaleString()})</label>
                      <span className="text-xs font-black font-mono text-[#0E5E6F]">{clientesBasico} clientes</span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={clientesBasico}
                      onChange={(e) => setClientesBasico(Number(e.target.value))}
                      className="w-full accent-[#0E5E6F] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">Volumen Plan Operativo (L. {planes.find(p => p.name === 'Operativo')?.price.toLocaleString()})</label>
                      <span className="text-xs font-black font-mono text-[#2994B2]">{clientesOperativo} clientes</span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={clientesOperativo}
                      onChange={(e) => setClientesOperativo(Number(e.target.value))}
                      className="w-full accent-[#2994B2] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">Volumen Plan Premium (L. {planes.find(p => p.name === 'Premium')?.price.toLocaleString()})</label>
                      <span className="text-xs font-black font-mono text-[#B165E0]">{clientesPremium} clientes</span>
                    </div>
                    <input
                      type="range" min="0" max="50" value={clientesPremium}
                      onChange={(e) => setClientesPremium(Number(e.target.value))}
                      className="w-full accent-[#B165E0] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Panel de Visualización del MRR Proyectado */}
                <div className="bg-gray-50/70 border-2 border-gray-100 rounded-2xl p-5 text-center flex flex-col justify-between h-full min-h-[200px]">
                  <div className="space-y-1">
                    <Text className="text-[10px] font-black uppercase tracking-wider text-gray-400">Ingreso Mensual Recurrente Proyectado (MRR)</Text>
                    <span className="text-3xl font-black text-gray-900 tracking-tight block" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
                      L. {mrrTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Barra Analítica Proporcional */}
                  <div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                      <div className="bg-[#0E5E6F] transition-all duration-300" style={{ width: `${mrrTotal > 0 ? (mrrBasico / mrrTotal) * 100 : 0}%` }}></div>
                      <div className="bg-[#2994B2] transition-all duration-300" style={{ width: `${mrrTotal > 0 ? (mrrOperativo / mrrTotal) * 100 : 0}%` }}></div>
                      <div className="bg-[#B165E0] transition-all duration-300" style={{ width: `${mrrTotal > 0 ? (mrrPremium / mrrTotal) * 100 : 0}%` }}></div>
                    </div>
                    <div className="flex justify-center gap-5 mt-3 text-[10px] font-bold uppercase tracking-wider text-gray-500" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0E5E6F]"></span> Básico</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2994B2]"></span> Operativo</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B165E0]"></span> Premium</span>
                    </div>
                  </div>
                </div>

              </div>
            </DashboardWidget>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: VENTA DE DRONES (IMÁGENES A COBERTURA COMPLETA) */}
      {/* ========================================================================= */}
      {tab === 'ventas' && (
        <div className="space-y-5 text-left">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-1">
            <div>
              <Title as="h3" className="text-base text-gray-900 normal-case tracking-tight">Catálogo de Flota Comercial</Title>
              <Text className="text-xs text-gray-400">Drones pesados para logística y tareas agrícolas de alto impacto</Text>
            </div>
            <button
              onClick={() => {
                setEditingDrone({ id: 0, name: '', model: '', price: 200000, stock: 1, image: 'src/img/DJI_FlyCart_30.png', tags: ['Carga'], capacity: '500 lbs' });
                setIsDroneModalOpen(true);
              }}
              className="py-2 px-3.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <Plus size={13} /> Agregar Dron Comercial
            </button>
          </div>

          {/* LISTADO DE CARDS HORIZONTALES CON IMAGEN FULL COVER */}
          <div className="space-y-4">
            {dronesVenta.map((drone) => (
              <div 
                key={drone.id} 
                className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:border-[#0E5E6F]/40 transition-all duration-200"
              >
                
                {/* CONTENEDOR DE LA IMAGEN: COBERTURA COMPLETA SIN BORDES BLANCOS */}
                <div className="relative w-full md:w-56 h-44 md:h-auto bg-gray-100 overflow-hidden shrink-0">
                  <img
                    src={drone.image}
                    alt={drone.name}
                    className="w-full h-full object-cover filter drop-shadow-sm hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(drone.name);
                    }}
                  />
                  <span className="absolute top-2.5 left-2.5 bg-gray-900/80 backdrop-blur-md text-white font-mono text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm">
                    Cap: {drone.capacity}
                  </span>
                </div>

                {/* CONTENIDO PRINCIPAL DE LA CARD HORIZONTAL */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  
                  {/* Encabezado e Info General */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Text className="font-black text-sm sm:text-base text-gray-900 leading-tight">{drone.name}</Text>
                        <ShieldCheck size={15} className="text-[#0E5E6F]" />
                      </div>
                      <Text className="text-xs text-gray-400 font-medium">{drone.model}</Text>
                    </div>

                    {/* Tags Badge */}
                    <div className="flex flex-wrap items-center gap-1 pt-1 sm:pt-0">
                      {drone.tags.map((t, idx) => (
                        <span key={idx} className="bg-gray-100 border border-gray-200 text-gray-600 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                      <button
                        onClick={() => handleAddTag(drone.id)}
                        className="bg-[#0E5E6F]/10 border border-[#0E5E6F]/20 text-[#0E5E6F] text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md hover:bg-[#0E5E6F]/20 transition-colors"
                      >
                        + Tag
                      </button>
                    </div>
                  </div>

                  {/* Controles Interactivos de Precio y Stock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Precio Lempiras:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 font-black">L.</span>
                        <input
                          type="number"
                          value={drone.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDronesVenta(prev => prev.map(d => d.id === drone.id ? { ...d, price: val } : d));
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-28 focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-[#0E5E6F]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Stock Disponible:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={drone.stock}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDronesVenta(prev => prev.map(d => d.id === drone.id ? { ...d, stock: val } : d));
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-14 text-center focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-gray-800"
                        />
                        <span className="text-[11px] text-gray-400 font-medium">uds</span>
                      </div>
                    </div>
                  </div>

                  {/* Barra Inferior de Acciones */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => { setEditingDrone(drone); setIsDroneModalOpen(true); }}
                      className="text-xs text-[#0E5E6F] font-bold hover:underline flex items-center gap-1"
                    >
                      <Edit3 size={12} /> Editar especificaciones
                    </button>
                    <button
                      onClick={() => {
                        setDronesVenta(prev => prev.filter(d => d.id !== drone.id));
                        setHasUnsavedChanges(true);
                      }}
                      className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Eliminar
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* BARRA FLOTANTE DE CAMBIOS PENDIENTES */}
      {hasUnsavedChanges && (
        <div className="sticky bottom-6 z-20 flex justify-end mt-6 animate-in slide-in-from-bottom-4">
          <div className="bg-gray-900 border-2 border-gray-800 text-white rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 select-none">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle size={15} />
              <Text className="text-xs text-gray-200 font-medium">Modificaciones sin guardar</Text>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHasUnsavedChanges(false)}
                className="py-1 px-3 text-[10px] font-black uppercase tracking-wider rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                Descartar
              </button>
              <button
                onClick={() => {
                  setHasUnsavedChanges(false);
                  alert('¡Cambios guardados exitosamente!');
                }}
                className="py-1 px-3.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-[10px] font-black uppercase tracking-wider rounded-xl flex items-center gap-1 shadow-sm transition-all active:scale-95"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <Save size={12} /> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: EDITAR PLAN */}
      {isPlanModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Layers className="text-[#0E5E6F]" size={20} />
                <Title as="h3" className="text-base text-gray-900 normal-case tracking-tight">
                  {editingPlan.id ? 'Editar Plan de Suscripción' : 'Crear Nuevo Plan'}
                </Title>
              </div>
              <button onClick={() => setIsPlanModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSavePlan(editingPlan); }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Nombre del Plan</label>
                  <input
                    type="text" required
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Precio (L.)</label>
                  <input
                    type="number" required
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Ciclo de Facturación</label>
                  <select
                    value={editingPlan.cycle}
                    onChange={(e) => setEditingPlan({ ...editingPlan, cycle: e.target.value as Plan['cycle'] })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-bold bg-white"
                  >
                    <option value="Mensual">Mensual</option>
                    <option value="Anual">Anual</option>
                    <option value="Trimestral">Trimestral</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Vuelos Incluidos</label>
                  <input
                    type="text" required
                    value={editingPlan.flights}
                    onChange={(e) => setEditingPlan({ ...editingPlan, flights: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Cobertura Máxima (Hectáreas / Área)</label>
                  <input
                    type="text" required
                    value={editingPlan.area}
                    onChange={(e) => setEditingPlan({ ...editingPlan, area: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsPlanModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  Guardar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDITAR DRON */}
      {isDroneModalOpen && editingDrone && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Package className="text-[#0E5E6F]" size={20} />
                <Title as="h3" className="text-base text-gray-900 normal-case tracking-tight">
                  {editingDrone.id ? 'Editar Dron Comercial' : 'Agregar Nuevo Dron'}
                </Title>
              </div>
              <button onClick={() => setIsDroneModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveDrone(editingDrone); }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Nombre / Modelo</label>
                  <input
                    type="text" required
                    value={editingDrone.name}
                    onChange={(e) => setEditingDrone({ ...editingDrone, name: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Imagen (src/img/)</label>
                  <select
                    value={editingDrone.image}
                    onChange={(e) => setEditingDrone({ ...editingDrone, image: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium bg-white"
                  >
                    <option value="src/img/DJI_FlyCart_30.png">DJI_FlyCart_30.png</option>
                    <option value="src/img/Ehang_184.png">Ehang_184.png</option>
                    <option value="src/img/GRIFF_Aviation_300.png">GRIFF_Aviation_300.png</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Precio (L.)</label>
                  <input
                    type="number" required
                    value={editingDrone.price}
                    onChange={(e) => setEditingDrone({ ...editingDrone, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Stock Inicial</label>
                  <input
                    type="number" required
                    value={editingDrone.stock}
                    onChange={(e) => setEditingDrone({ ...editingDrone, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Capacidad Máxima de Carga</label>
                  <input
                    type="text" required
                    value={editingDrone.capacity}
                    onChange={(e) => setEditingDrone({ ...editingDrone, capacity: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsDroneModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  Guardar Dron
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 6. PILOT DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
export const PilotDashboardView = () => {
  // -------------------------------------------------------------
  // ESTADOS INTERACTIVOS DE MISIONES
  // -------------------------------------------------------------
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      crop: 'Parcela de Limones (Lote Norte)',
      area: '14 ha',
      loc: '14.0723°N, 86.2344°W',
      type: 'Monitoreo NDVI & Defoliación',
      priority: 'Alta',
      status: 'En Progreso'
    },
    {
      id: 2,
      crop: 'Maíz Amarillo (Lote Sur)',
      area: '22 ha',
      loc: '14.0890°N, 86.2100°W',
      type: 'Conteo de Planta & Estrés',
      priority: 'Media',
      status: 'Pendiente'
    },
    {
      id: 3,
      crop: 'Frijol Rojo (Parcela Este)',
      area: '5 ha',
      loc: '14.0601°N, 86.2480°W',
      type: 'Mapeo de Humedad',
      priority: 'Normal',
      status: 'Pendiente'
    },
  ]);

  const [activeMissionId, setActiveMissionId] = useState<number>(1);
  const activeMission = missions.find(m => m.id === activeMissionId) || missions[0];

  // -------------------------------------------------------------
  // ESTADOS DEL STREAMING Y TELEMETRÍA DINÁMICA
  // -------------------------------------------------------------
  const [isPlayingFeed, setIsPlayingFeed] = useState<boolean>(true);
  const [isRthActive, setIsRthActive] = useState<boolean>(false);
  const [rthArmed, setRthArmed] = useState<boolean>(false);

  // Valores simulados de vuelo
  const [telemetry, setTelemetry] = useState({
    alt: 45,
    speed: 8.2,
    dist: 340,
    heading: 245,
    satellites: 18,
    battery: 88,
    wind: 11
  });

  // Log de Telemetría
  const [logs, setLogs] = useState<Array<{ id: number; time: string; text: string; type: 'green' | 'blue' | 'yellow' | 'red' }>>([
    { id: 1, time: '10:42:35', text: 'Telemetría sincronizada · Agras T50 (5.8 GHz)', type: 'green' },
    { id: 2, time: '10:42:31', text: 'GPS Lock confirmado · 18 Satélites RTK', type: 'green' },
    { id: 3, time: '10:42:28', text: 'Escaneando Parcela de Limones (Lote Norte)', type: 'blue' },
    { id: 4, time: '10:42:15', text: 'Sensor Multispectral: Análisis foliar en curso', type: 'yellow' },
  ]);

  // Oscilación simulada de telemetría cada 3 segundos
  useEffect(() => {
    if (!isPlayingFeed || isRthActive) return;

    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        alt: Math.floor(40 + Math.random() * 8),
        speed: parseFloat((7.5 + Math.random() * 1.8).toFixed(1)),
        dist: prev.dist + Math.floor(Math.random() * 3),
        heading: (prev.heading + Math.floor(Math.random() * 3 - 1)) % 360,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlayingFeed, isRthActive]);

  const addLog = (text: string, type: 'green' | 'blue' | 'yellow' | 'red' = 'blue') => {
    const time = new Date().toLocaleTimeString('es-HN', { hour12: false });
    setLogs(prev => [{ id: Date.now(), time, text, type }, ...prev]);
  };

  const handleSelectMission = (id: number) => {
    setActiveMissionId(id);
    const selected = missions.find(m => m.id === id);
    if (selected) {
      addLog(`Misión seleccionada: ${selected.crop}`, 'blue');
    }
  };

  const handleCaptureSnapshot = () => {
    addLog(`Fotogrametría guardada: ${activeMission.loc}`, 'green');
  };

  const handleExecuteRTH = () => {
    if (!rthArmed) {
      setRthArmed(true);
      return;
    }
    setIsRthActive(true);
    setRthArmed(false);
    setMissions(prev => prev.map(m => m.id === activeMissionId ? { ...m, status: 'Completado' } : m));
    addLog('🚨 PROTOCOLO RTH: El Agras T50 retorna a la base', 'red');
  };

  const handleCancelRTH = () => {
    setRthArmed(false);
    addLog('Cancelada alerta RTH', 'yellow');
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 antialiased text-left font-sans">
      
      {/* BARRA SUPERIOR DE TELEMETRÍA EN VIVO */}
      <div className="bg-gray-900 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1">
            <Battery size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Bat:</span>
            <span className="font-bold text-green-400">{telemetry.battery}%</span>
          </div>

          <div className="flex items-center gap-1">
            <Signal size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">GPS:</span>
            <span className="font-bold text-green-400">{telemetry.satellites}sats</span>
          </div>

          <div className="flex items-center gap-1">
            <Wifi size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Link:</span>
            <span className="font-bold text-green-400">99%</span>
          </div>

          <div className="flex items-center gap-1">
            <Wind size={13} className="text-yellow-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Viento:</span>
            <span className="font-bold text-yellow-400">{telemetry.wind}km/h</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 aspect-square ${isRthActive ? 'bg-red-500 animate-ping' : 'bg-green-400 animate-pulse'}`}></span>
          <span className="text-green-400 text-xs font-bold uppercase tracking-wider font-mono">
            {isRthActive ? 'RTH ACTIVO · Agras T50' : 'Agras T50 Conectado'}
          </span>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LISTA LATERAL DE MISIONES */}
        <div className="w-full md:w-[320px] border-r border-gray-200 bg-white flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <Title as="h3" className="text-xs font-black text-gray-800 normal-case">Misiones Asignadas</Title>
            <span className="bg-[#0E5E6F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              {missions.filter(m => m.status !== 'Completado').length} activas
            </span>
          </div>

          <div className="overflow-y-auto flex-1 p-2.5 flex flex-col gap-2">
            {missions.map((m) => {
              const isCurrent = m.id === activeMissionId;
              return (
                <div
                  key={m.id}
                  onClick={() => handleSelectMission(m.id)}
                  className={`border rounded-xl p-3 cursor-pointer transition-all ${
                    isCurrent
                      ? 'border-[#0E5E6F] bg-[#0E5E6F]/5'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Text className={`font-bold text-xs ${isCurrent ? 'text-[#0E5E6F]' : 'text-gray-800'}`}>
                      {m.crop}
                    </Text>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      m.priority === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {m.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-2">
                    <MapPin size={10} className="shrink-0" /> {m.loc}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">{m.type}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMission(m.id);
                      }}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-[#0E5E6F] text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isCurrent ? 'Activa' : 'Cargar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ÁREA CENTRAL: CÁMARA COMPLETA + TELEMETRÍA MINIMALISTA + LOG */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 overflow-y-auto bg-gray-50">
          
          {/* VISTA DE CÁMARA CON HUD COMPACTO Y DESPEJADO */}
          <div className="flex-1 min-h-[380px] bg-gray-950 rounded-xl overflow-hidden relative border border-gray-800 shadow-md">
            
            {/* Imagen del Dron */}
            <img
              src="src/img/vista_aerea.png"
              alt="Vista Aérea Parcela Limones"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlayingFeed ? 'opacity-100' : 'opacity-40 grayscale'
              }`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/1200x800?text=Vista+Aerea+Parcela+Limones+(src/img/vista_aerea.png)';
              }}
            />

            {/* ELEMENTOS SOBREPUESTOS REDUCIDOS PARA VER LA IMAGEN */}
            <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between z-10">
              
              {/* Esquina Superior: Estado de Transmisión + Botón RTH Delgado */}
              <div className="flex justify-between items-start gap-2">
                <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 aspect-square ${isPlayingFeed ? 'bg-red-500 animate-ping' : 'bg-yellow-500'}`}></span>
                  <span className="text-white text-[10px] font-mono font-bold tracking-wide">
                    {activeMission.crop}
                  </span>
                </div>

                {/* Controles de Emergencia compactos */}
                <div className="pointer-events-auto flex items-center gap-1.5 bg-black/60 backdrop-blur-sm p-1 rounded-lg border border-white/10">
                  {rthArmed && (
                    <button
                      onClick={handleCancelRTH}
                      className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[9px] font-bold rounded transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    onClick={handleExecuteRTH}
                    className={`px-3 py-1 rounded flex items-center gap-1.5 text-white font-bold text-[10px] uppercase transition-all shadow ${
                      isRthActive
                        ? 'bg-orange-600 animate-pulse'
                        : rthArmed
                        ? 'bg-red-600 animate-bounce'
                        : 'bg-red-600/80 hover:bg-red-600'
                    }`}
                  >
                    <AlertOctagon size={13} className="shrink-0" />
                    <span>{isRthActive ? 'RTH Activo' : rthArmed ? 'Confirmar' : 'RTH'}</span>
                  </button>
                </div>
              </div>

              {/* RETÍCULA CENTRAL SÚPER DISCRETA */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-16 h-16 border border-white rounded-full shrink-0 aspect-square flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full shrink-0 aspect-square"></div>
                </div>
              </div>

              {/* Esquina Inferior: Telemetría de Instrumentos y Controles en una Sola Tira Compacta */}
              <div className="flex flex-wrap justify-between items-end gap-2">
                {/* Tira compacta de telemetría */}
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 flex items-center gap-3 font-mono text-[10px] text-white">
                  <div>ALT: <strong className="text-amber-300">{telemetry.alt}m</strong></div>
                  <div className="border-l border-white/20 pl-3">VEL: <strong className="text-amber-300">{telemetry.speed}m/s</strong></div>
                  <div className="border-l border-white/20 pl-3">DIST: <strong className="text-amber-300">{telemetry.dist}m</strong></div>
                  <div className="border-l border-white/20 pl-3">HDG: <strong className="text-amber-300">{telemetry.heading}°</strong></div>
                </div>

                {/* Botones de acción del video */}
                <div className="pointer-events-auto flex items-center gap-1.5">
                  <button
                    onClick={handleCaptureSnapshot}
                    className="bg-black/60 hover:bg-black text-white px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-sm text-[10px] font-bold flex items-center gap-1"
                  >
                    <Camera size={12} className="shrink-0" /> Captura
                  </button>
                  <button
                    onClick={() => {
                      setIsPlayingFeed(!isPlayingFeed);
                      addLog(isPlayingFeed ? 'Transmisión pausada' : 'Transmisión reanudada', 'yellow');
                    }}
                    className="bg-black/60 hover:bg-black text-white px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-sm text-[10px] font-bold flex items-center gap-1"
                  >
                    {isPlayingFeed ? <Pause size={12} className="shrink-0" /> : <Play size={12} className="shrink-0" />}
                    {isPlayingFeed ? 'Pausar' : 'Reanudar'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* LOG DE TELEMETRÍA DEL DELTA EN LA PARTE INFERIOR */}
          <div className="h-32 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow shrink-0">
            <div className="px-3 py-1.5 bg-gray-900 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <RefreshCw size={11} className="text-green-400 animate-spin shrink-0" />
                <span className="text-[11px] font-mono font-bold text-gray-300 uppercase">
                  Log de Telemetría
                </span>
              </div>
              <button
                onClick={() => addLog('Calibración Agras T50 verificada OK', 'green')}
                className="text-[9px] bg-gray-800 hover:bg-gray-700 text-green-400 font-mono px-2 py-0.5 rounded border border-gray-700"
              >
                + Check
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-2 font-mono text-[10px] space-y-1 text-left">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 border-b border-gray-900/50 pb-0.5">
                  <span className="text-gray-500 shrink-0">[{log.time}]</span>
                  <span
                    className={
                      log.type === 'green'
                        ? 'text-emerald-400'
                        : log.type === 'yellow'
                        ? 'text-amber-300'
                        : log.type === 'red'
                        ? 'text-red-400 font-bold'
                        : 'text-sky-300'
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 7. FARMER DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
export const FarmerDashboardView = () => {
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDrone, setSelectedDrone] = useState<string>('DJI Agras T50');
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  const [lands, setLands] = useState<Land[]>([
    {
      id: 1,
      name: 'Finca El Aguán',
      area: '42 ha',
      sector: 'Sabana de Tepusteca, Olanchito, Yoro',
      crop: 'Maíz Híbrido Amarillo',
      variety: 'Dekalb DK-7508',
      image: 'src/img/maiz.png',
      health: 'Buena',
      lastInspection: '18 Jul 2026',
      notes: 'Desarrollo foliar óptimo. Se requiere monitoreo preventivo de mancha de asfalto.'
    },
    {
      id: 2,
      name: 'Plantación San Lorenzo',
      area: '28 ha',
      sector: 'Sector San Lorenzo, Olanchito, Yoro',
      crop: 'Banano de Exportación',
      variety: 'Gran Enano / Cavendish',
      image: 'src/img/banano.png',
      health: 'Atención',
      lastInspection: '12 Jul 2026',
      notes: 'Detectada presencia de Sigatoka Negra en el bloque sur. Fumigación aérea urgente recomendada.'
    },
    {
      id: 3,
      name: 'Lote El Mamón',
      area: '15 ha',
      sector: 'Comunidad El Mamón, Olanchito, Yoro',
      crop: 'Yuca Industrial',
      variety: 'M-Col 2215',
      image: 'src/img/yuca.png',
      health: 'Crítica',
      lastInspection: '05 Jul 2026',
      notes: 'Deficiencia nutricional severa por nitrógeno y humedad heterogénea.'
    },
    {
      id: 4,
      name: 'Finca Agalteca',
      area: '60 ha',
      sector: 'Aldea Agalteca, Olanchito, Yoro',
      crop: 'Palma Africana',
      variety: 'Tenera Guineensis',
      image: 'src/img/palma.png',
      health: 'Buena',
      lastInspection: '19 Jul 2026',
      notes: 'Etapa de maduración de racimos. Sin avistamiento de gusano cabrito ni amarillamiento.'
    },
  ]);

  const [formData, setFormData] = useState({
    landName: 'Finca El Aguán (Sabana de Tepusteca)',
    area: '42',
    crop: 'Maíz Híbrido Amarillo (Dekalb DK-7508)',
    service: 'Fumigación de Precisión y Mapeo NDVI',
    date: '2026-07-28',
  });

  const getHealthBadge = (health: HealthStatus) => {
    switch (health) {
      case 'Buena':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Atención':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'Crítica':
        return 'text-rose-800 bg-rose-50 border-rose-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleHealthChange = (id: number, newHealth: HealthStatus) => {
    setLands(prevLands =>
      prevLands.map(land =>
        land.id === id ? { ...land, health: newHealth } : land
      )
    );
  };

  const handleSelectLandForService = (land: Land) => {
    setFormData(prev => ({
      ...prev,
      landName: `${land.name} (${land.sector.split(',')[0]})`,
      area: land.area.replace(' ha', ''),
      crop: `${land.crop} (${land.variety})`,
    }));
    setStep(1);
    setRequestSuccess(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto min-h-full flex flex-col gap-6 text-left font-sans bg-gray-50/50">
      
      {/* CABECERA ESTÁTICA */}
      <div className="pb-5 border-b border-gray-200 bg-white p-5 rounded-2xl shadow-sm">
        <Title className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Mis Parcelas
        </Title>
        <Text className="text-gray-500 mt-1 text-xs sm:text-sm">
          Monitoreo agronómico y contratación de drones agrícolas.
        </Text>
      </div>

      {/* CONTENEDOR FLEX PRINCIPAL */}
      <div className="flex flex-col xl:flex-row gap-6 items-start relative">
        
        {/* SECCIÓN DE TARJETAS (IZQUIERDA) */}
        <div className="w-full flex-1">
          <div className="grid grid-cols-1 gap-6">
            {lands.map((land) => (
              <div
                key={land.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col"
              >
                {/* Imagen Vertical Superior */}
                <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                  <img
                    src={land.image}
                    alt={land.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://via.placeholder.com/800x400?text=${encodeURIComponent(land.crop)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <div>
                      <span className="text-white text-xs font-semibold uppercase tracking-wider block opacity-90">
                        {land.variety}
                      </span>
                      <span className="text-white text-lg font-black drop-shadow">
                        {land.crop}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm p-1 rounded-xl shadow-md border border-white/50">
                      <Activity size={13} className="text-gray-600 ml-1" />
                      <select
                        value={land.health}
                        onChange={(e) => handleHealthChange(land.id, e.target.value as HealthStatus)}
                        className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border cursor-pointer focus:outline-none transition-colors ${getHealthBadge(land.health)}`}
                      >
                        <option value="Buena">Buena</option>
                        <option value="Atención">Atención</option>
                        <option value="Crítica">Crítica</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-5 flex flex-col justify-between gap-4">
                  <div>
                    <Title as="h3" className="text-xl font-black text-gray-800 mb-1">
                      {land.name}
                    </Title>

                    <div className="flex items-center gap-1.5 mb-3 text-xs text-gray-500">
                      <MapPin size={14} className="text-[#0E5E6F] shrink-0" />
                      <span>{land.sector}</span>
                    </div>

                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 font-medium leading-relaxed">
                      "{land.notes}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 items-center">
                    <div>
                      <Text className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Extensión Terreno</Text>
                      <Text className="font-black text-[#0E5E6F] text-base">{land.area}</Text>
                    </div>
                    <div>
                      <Text className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Último Análisis</Text>
                      <Text className="font-bold text-xs text-gray-700 flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-gray-400" /> {land.lastInspection}
                      </Text>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => handleSelectLandForService(land)}
                        className="w-full sm:w-auto py-2 px-4 bg-[#0E5E6F]/10 hover:bg-[#0E5E6F] text-[#0E5E6F] hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        Solicitar Vuelo Dron <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA PEGAJOSA: BOTÓN + FORMULARIO */}
        <div className="w-full xl:w-[320px] xl:sticky xl:top-6 flex flex-col gap-3 shrink-0">
          
          {/* BOTÓN ARRIBA DEL FORMULARIO */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-all active:scale-98"
          >
            <Plus size={18} /> Agregar Parcela
          </button>

          {/* FORMULARIO COMPACTO */}
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all">
            
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <Title as="h3" className="text-sm font-black text-gray-800 normal-case">
                Solicitar Unidad Aérea
              </Title>

              <div className="flex items-center justify-between gap-1 mt-2.5">
                {[
                  { n: 1, label: 'Finca' },
                  { n: 2, label: 'Servicio' },
                  { n: 3, label: 'Equipo' }
                ].map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div
                      onClick={() => { setStep(s.n); setRequestSuccess(false); }}
                      className="flex flex-col items-center gap-0.5 cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                        step >= s.n ? 'bg-[#0E5E6F] text-white shadow-sm' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {s.n}
                      </div>
                      <Text className={`text-[8px] font-bold uppercase tracking-wider ${
                        step >= s.n ? 'text-[#0E5E6F]' : 'text-gray-400'
                      }`}>
                        {s.label}
                      </Text>
                    </div>
                    {i < 2 && (
                      <div className={`flex-1 h-0.5 mb-2.5 mx-0.5 transition-all ${
                        step > s.n ? 'bg-[#0E5E6F]' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              {requestSuccess ? (
                <div className="py-4 text-center flex flex-col items-center justify-center gap-2">
                  <CheckCircle2 size={36} className="text-emerald-500 animate-bounce" />
                  <Title as="h4" className="text-sm font-bold text-gray-800">¡Orden Registrada!</Title>
                  <Text className="text-[11px] text-gray-500 px-1 leading-snug">
                    Unidad programada para <strong>{formData.landName}</strong>. Un operador se comunicará para verificar el clima.
                  </Text>
                  <button
                    onClick={() => { setStep(1); setRequestSuccess(false); }}
                    className="mt-1 text-xs font-bold text-[#0E5E6F] underline"
                  >
                    Realizar otra solicitud
                  </button>
                </div>
              ) : (
                <>
                  {/* PASO 1 */}
                  {step === 1 && (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Finca Destino</label>
                        <select
                          value={formData.landName}
                          onChange={(e) => setFormData({ ...formData, landName: e.target.value })}
                          className="w-full text-xs font-medium border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-[#0E5E6F] focus:outline-none bg-white"
                        >
                          {lands.map(l => (
                            <option key={l.id} value={`${l.name} (${l.sector.split(',')[0]})`}>
                              {l.name} - {l.crop} ({l.area})
                            </option>
                          ))}
                        </select>
                      </div>

                      <WireframeInput
                        label="Área a Aplicar (ha)"
                        value={formData.area}
                        onChange={(e: any) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="Ej: 25"
                      />

                      <div className="p-2.5 bg-teal-50 border border-teal-100 rounded-lg text-left">
                        <Text className="text-[10px] text-teal-800 font-bold flex items-center gap-1">
                          <Sprout size={12} className="shrink-0" /> Cobertura Olanchito
                        </Text>
                        <Text className="text-[9px] text-teal-600 mt-0.5 leading-tight">
                          Despliegue activo en Tepusteca, San Lorenzo, Agalteca y zonas aledañas.
                        </Text>
                      </div>

                      <button
                        onClick={() => setStep(2)}
                        className="w-full py-2 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-lg flex items-center justify-center gap-1.5 text-xs shadow transition-all mt-2"
                      >
                        Siguiente <ArrowRight size={13} />
                      </button>
                    </div>
                  )}

                  {/* PASO 2 */}
                  {step === 2 && (
                    <div className="space-y-2">
                      <WireframeInput
                        label="Cultivo / Variedad"
                        value={formData.crop}
                        onChange={(e: any) => setFormData({ ...formData, crop: e.target.value })}
                        placeholder="Ej: Banano (Gran Enano)"
                      />
                      <WireframeInput
                        label="Servicio Solicitado"
                        value={formData.service}
                        onChange={(e: any) => setFormData({ ...formData, service: e.target.value })}
                        placeholder="Ej: Fumigación con Funguicida o NDVI"
                      />
                      <WireframeInput
                        label="Fecha de Aplicación"
                        type="date"
                        value={formData.date}
                        onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                      />

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg text-xs hover:bg-gray-100"
                        >
                          Atrás
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          className="flex-1 py-2 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-lg flex items-center justify-center gap-1 text-xs shadow"
                        >
                          Siguiente <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* PASO 3 */}
                  {step === 3 && (
                    <div>
                      <Text className="text-[9px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                        Unidades Disponibles
                      </Text>

                      <div className="space-y-1.5 mb-3">
                        {[
                          { name: 'DJI Agras T50', pilot: 'Ing. Carlos Sosa', rate: 'L 380/ha', desc: '50kg cap. / Alta precisión' },
                          { name: 'DJI Agras T40', pilot: 'Javier Reyes', rate: 'L 320/ha', desc: '40kg cap. / Atomización' },
                        ].map((d, i) => {
                          const isSelected = selectedDrone === d.name;
                          return (
                            <div
                              key={i}
                              onClick={() => setSelectedDrone(d.name)}
                              className={`border rounded-lg p-2 cursor-pointer transition-all ${
                                isSelected ? 'border-[#0E5E6F] bg-[#0E5E6F]/5' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <Text className={`font-bold text-xs ${isSelected ? 'text-[#0E5E6F]' : 'text-gray-800'}`}>
                                  {d.name}
                                </Text>
                                <span className="text-[10px] font-black text-[#0E5E6F]">{d.rate}</span>
                              </div>
                              <Text className="text-[9px] text-gray-500">Piloto: {d.pilot}</Text>
                              <Text className="text-[8px] text-gray-400">{d.desc}</Text>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setStep(2)}
                          className="flex-1 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg text-xs hover:bg-gray-100"
                        >
                          Atrás
                        </button>
                        <button
                          onClick={() => setRequestSuccess(true)}
                          className="flex-1 py-2 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-lg flex items-center justify-center gap-1 text-xs shadow"
                        >
                          <Check size={13} /> Confirmar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL REGISTRO PARCELA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <Title as="h3" className="text-base font-black text-gray-800">Registrar Parcela en Olanchito</Title>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const newName = (form.elements.namedItem('landName') as HTMLInputElement).value;
                const newSector = (form.elements.namedItem('landSector') as HTMLInputElement).value;
                const newArea = (form.elements.namedItem('landArea') as HTMLInputElement).value;
                const newCrop = (form.elements.namedItem('landCrop') as HTMLInputElement).value;

                if (newName) {
                  setLands(prev => [
                    ...prev,
                    {
                      id: Date.now(),
                      name: newName,
                      area: `${newArea || '10'} ha`,
                      sector: `${newSector || 'Sector Centro'}, Olanchito, Yoro`,
                      crop: newCrop || 'Maíz Amarillo',
                      variety: 'Variedad Local',
                      image: 'src/img/maiz.png',
                      health: 'Buena',
                      lastInspection: 'Hoy',
                      notes: 'Parcela incorporada recientemente al sistema de monitoreo.'
                    }
                  ]);
                  setIsModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <WireframeInput name="landName" label="Nombre de la Finca" placeholder="Ej: Finca Las Camelias" required />
              <WireframeInput name="landSector" label="Aldea o Sector (Olanchito)" placeholder="Ej: San Lorenzo, Agalteca..." required />
              <div className="grid grid-cols-2 gap-3">
                <WireframeInput name="landArea" label="Extensión (ha)" placeholder="Ej: 20" type="number" required />
                <WireframeInput name="landCrop" label="Tipo de Cultivo" placeholder="Ej: Banano, Maíz..." required />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#0E5E6F] hover:bg-[#0A4754] text-white rounded-xl shadow"
                >
                  Guardar Parcela
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 8. PROFILE (Universal)
// ═══════════════════════════════════════════════════════════════════════
export const ProfileView = ({ role, onLogout }: ProfileViewProps) => {
  // Configuración base por rol con rutas absolutas de la carpeta public/
  const initialProfiles = {
    admin: {
      initials: 'CS',
      name: 'Carlos Sosa',
      email: 'carlos.sosa@technodactylus.hn',
      phone: '+504 9845-1200',
      password: '••••••••••••',
      avatar: 'src/img/admin_perfil.png',
      avatarBg: 'bg-[#0E5E6F] text-white',
      roleLabel: 'Administrador · Operaciones',
      location: 'Valle del Aguán, Olanchito, Yoro',
      area: '—',
      services: '142 misiones',
      standing: 'Activo',
      roleColor: 'text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30',
      description: 'Coordinador regional de flota agrícola y geodatos en Olanchito.'
    },
    pilot: {
      initials: 'JR',
      name: 'Javier Reyes',
      email: 'j.reyes@technodactylus.hn',
      phone: '+504 9712-3489',
      password: '••••••••••••',
      avatar: 'src/img/piloto_perfil.png',
      avatarBg: 'bg-blue-600 text-white',
      roleLabel: 'Piloto Licenciado · DJI Agras T50',
      location: 'Base Aérea San Lorenzo, Olanchito',
      area: '—',
      services: '128 vuelos',
      standing: 'Activo',
      roleColor: 'text-blue-700 bg-blue-50 border-blue-300',
      description: 'Especialista en mapeo NDVI y fumigación en fincas bananeras.'
    },
    farmer: {
      initials: 'CR',
      name: 'Carlos Reyes',
      email: 'creyes.aguan@gmail.com',
      phone: '+504 9567-8821',
      password: '••••••••••••',
      avatar: 'src/img/granjero_perfil.png',
      avatarBg: 'bg-emerald-700 text-white',
      roleLabel: 'Productor Agrícola · Verificado',
      location: 'Sabana de Tepusteca, Olanchito',
      area: '145 ha (Maíz / Banano)',
      services: '12 solicitudes',
      standing: 'Activo',
      roleColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
      description: 'Productor de maíz híbrido y banano con monitoreo aéreo.'
    },
  };

  const currentRole = role || 'admin';
  const [profileData, setProfileData] = useState(initialProfiles[currentRole]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [editForm, setEditForm] = useState({
    phone: profileData.phone,
    email: profileData.email,
    password: profileData.password,
  });

  const handleOpenModal = () => {
    setEditForm({
      phone: profileData.phone,
      email: profileData.email,
      password: profileData.password,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData(prev => ({
      ...prev,
      phone: editForm.phone,
      email: editForm.email,
      password: editForm.password,
    }));
    setIsModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="w-full h-full max-w-6xl mx-auto p-2 sm:p-3 bg-white antialiased select-none font-sans flex flex-col justify-center items-center relative">
      <div className="w-full h-full flex-1 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
        
        {/* CABECERA (INTACTA) */}
        <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            
            {/* AVATAR */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-gray-300 overflow-hidden shrink-0 shadow-xs relative group flex items-center justify-center">
              {!imgError ? (
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-black text-xl ${profileData.avatarBg}`}>
                  {profileData.initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ShieldCheck size={20} className="text-white drop-shadow" />
              </div>
            </div>

            <div className="text-left">
              <Title className="text-xl sm:text-2xl text-gray-900 font-black tracking-tight normal-case leading-tight">
                {profileData.name}
              </Title>
              <Text className="text-gray-500 font-semibold text-xs sm:text-sm mt-1">
                {profileData.email}
              </Text>
            </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <span
              className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-lg border-2 ${profileData.roleColor}`}
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              {profileData.roleLabel}
            </span>

            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-md flex items-center gap-1 animate-in fade-in duration-150">
                <Check size={13} /> Actualizado
              </span>
            )}
          </div>
        </div>

        {/* MÉTRICAS PRINCIPALES (SECCIÓN INFERIOR 1 - COMPACTADA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white border-b-2 border-gray-200 text-left flex-1 items-center">
          
          {/* Base Regional */}
          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                <MapPin size={16} />
              </div>
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Base Regional</Text>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
              {profileData.location}
            </span>
          </div>

          {/* Extensión */}
          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                <Layers size={16} />
              </div>
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Extensión</Text>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
              {profileData.area}
            </span>
          </div>

          {/* Actividad */}
          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                <BarChart2 size={16} />
              </div>
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Actividad</Text>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block truncate leading-tight mt-0.5">
              {profileData.services}
            </span>
          </div>

          {/* Estado */}
          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                <CheckCircle size={16} />
              </div>
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Estado</Text>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-md uppercase inline-block mt-0.5">
              {profileData.standing}
            </span>
          </div>

        </div>

        {/* DATOS DE CONTACTO Y CREDENCIALES (SECCIÓN INFERIOR 2 - COMPACTADA) */}
        <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b-2 border-gray-100">
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-[#0E5E6F]" />
              <Title as="h3" className="text-xs sm:text-sm font-black text-gray-800 normal-case">
                Credenciales y Datos de Contacto
              </Title>
            </div>

            <button
              onClick={handleOpenModal}
              className="py-1 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors active:scale-95 shadow-xs"
            >
              <Edit2 size={13} className="text-[#0E5E6F]" /> Editar Información
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
            <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Phone size={12} className="text-[#0E5E6F]" /> Teléfono
              </Text>
              <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5">{profileData.phone}</Text>
            </div>

            <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Mail size={12} className="text-[#0E5E6F]" /> Correo
              </Text>
              <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5 truncate">{profileData.email}</Text>
            </div>

            <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Lock size={12} className="text-[#0E5E6F]" /> Contraseña
              </Text>
              <Text className="font-mono font-bold text-xs sm:text-sm text-gray-800 mt-0.5">••••••••••••</Text>
            </div>
          </div>
        </div>

        {/* PIE DE PÁGINA (SECCIÓN INFERIOR 3 - COMPACTADA) */}
        <div className="border-t-2 border-gray-200 px-6 py-2 bg-gray-50 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400 font-medium text-left truncate">
            Base Olanchito, Yoro
          </span>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 py-1 px-3 rounded-lg border-2 border-rose-200 bg-white hover:bg-rose-50 text-rose-600 transition-all active:scale-95 shadow-xs"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <LogOut size={13} className="shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider">SALIR</span>
          </button>
        </div>

      </div>

      {/* MODAL VERTICAL FLOTANTE DE EDICIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-5 w-full max-w-md shadow-xl space-y-4 text-left">
            
            {/* Encabezado del Modal */}
            <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#0E5E6F]/10 rounded-lg text-[#0E5E6F]">
                  <Edit2 size={15} />
                </div>
                <Title as="h3" className="text-sm font-black text-gray-800 normal-case">
                  Editar Credenciales
                </Title>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Formulario Vertical */}
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <Lock size={13} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={editForm.password}
                    onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    className="w-full pl-8 pr-8 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-1.5 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors active:scale-95"
                >
                  <X size={13} /> Cancelar
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 shadow-xs"
                >
                  <Save size={13} /> Guardar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// EXISTING SCREENS (preserved)
// ═══════════════════════════════════════════════════════════════════════
const ServiceCard = ({ icon, title, desc, onClick }: any) => (
  <div onClick={onClick} className="bg-white border-2 border-gray-200 hover:border-[#0E5E6F] rounded-2xl p-8 cursor-pointer transition-all group flex flex-col items-start shadow-sm hover:shadow-md">
    <div className="p-4 bg-gray-100 rounded-xl mb-6 group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors duration-300">{icon}</div>
    <Title className="text-2xl mb-3 text-gray-800 group-hover:text-[#0E5E6F] transition-colors" as="h3">{title}</Title>
    <Text className="text-gray-500 text-base leading-relaxed">{desc}</Text>
  </div>
);

const ConfigMapView = ({ serviceType, onNext, onBack }: any) => (
  <div className="p-10 max-w-6xl mx-auto">
    <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 font-bold uppercase text-sm tracking-wider transition-colors" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <ChevronLeft size={16} /> Volver
    </button>
    <Title className="text-3xl mb-8 pb-4 border-b-2 border-gray-200">Configuración: {serviceType}</Title>
    <div className="flex gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title as="h3" className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"><MapPin size={20} /> 1. Delimitación de Terreno</Title>
          <PlaceholderImage text="Mapa Interactivo - Dibujar Área (Ej: 12 Hectáreas)" className="h-72 w-full mb-4 rounded-lg" />
          <Text className="text-sm text-gray-500">Seleccionar el polígono en el mapa. Las zonas restringidas se evitarán automáticamente.</Text>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title as="h3" className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"><Info size={20} /> 2. Detalles del Servicio</Title>
          {serviceType === 'busqueda' ? (
            <div className="grid grid-cols-2 gap-6">
              <WireframeInput label="Tipo de Animal" placeholder="Ej: Ganado, Perro..." />
              <div className="flex flex-col mb-4 w-full" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                <label className="mb-1 text-sm font-bold text-gray-600 uppercase tracking-tight">Cámara Térmica</label>
                <select className="p-3 border-2 border-gray-300 bg-white text-gray-800 focus:border-[#0E5E6F] outline-none"><option>Sí, requerida</option><option>No necesaria</option></select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <WireframeInput label="Tipo de Cultivo" placeholder="Ej: Maíz, Frijol..." />
              <WireframeInput label="Líquido (Agua/Pesticida)" placeholder="Especificar..." />
              <WireframeInput label="Densidad Requerida" placeholder="L/Hectárea" />
            </div>
          )}
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex-1">
          <Title as="h3" className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"><Crosshair size={20} /> 3. Selección de Dron y Piloto</Title>
          <div className="border-2 border-[#0E5E6F] rounded-xl p-5 mb-4 relative overflow-hidden bg-gray-50">
            <div className="absolute top-0 right-0 bg-[#0E5E6F] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Recomendado</div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-200 border-2 border-[#0E5E6F] rounded-full flex justify-center items-center"><User size={24} className="text-[#0E5E6F]" /></div>
              <div>
                <Text className="font-bold text-lg leading-tight">Javier Reyes</Text>
                <Text className="text-sm text-gray-500">Piloto de Drones</Text>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm space-y-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              <div className="flex justify-between"><span className="text-gray-500 font-bold">Dron:</span><span>Agras T40</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-bold">Capacidad:</span><span>40L / 50kg</span></div>
              <div className="flex justify-between"><span className="text-gray-500 font-bold">Batería:</span><span className="text-green-600 font-bold">100%</span></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 opacity-60 grayscale cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center"><User size={24} className="text-gray-400" /></div>
              <div>
                <Text className="font-bold text-lg leading-tight text-gray-600">Piloto Genérico</Text>
                <Text className="text-sm text-gray-500">Ocupado en otro vuelo</Text>
              </div>
            </div>
          </div>
        </div>
        <WireframeButton primary onClick={onNext} className="w-full text-lg rounded-xl shadow-md py-4">Revisar Cotización</WireframeButton>
      </div>
    </div>
  </div>
);

const ConfigCargoView = ({ onNext, onBack }: any) => (
  <div className="p-10 max-w-6xl mx-auto">
    <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 font-bold uppercase text-sm tracking-wider transition-colors" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      <ChevronLeft size={16} /> Volver
    </button>
    <Title className="text-3xl mb-8 pb-4 border-b-2 border-gray-200">Configuración: Transporte de Carga</Title>
    <div className="flex gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title as="h3" className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"><Map size={20} /> 1. Puntos de Origen y Destino</Title>
          <PlaceholderImage text="Mapa - Seleccionar Punto A y Punto B" className="h-72 w-full mb-6 rounded-lg" />
          <div className="flex gap-6">
            <WireframeInput label="Punto A (Recolección)" placeholder="Coordenadas o ubicación" />
            <WireframeInput label="Punto B (Descarga)" placeholder="Coordenadas o ubicación" />
          </div>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title as="h3" className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"><Package size={20} /> 2. Especificación de Carga</Title>
          <WireframeInput label="Peso Estimado (KG)" placeholder="Ej: 30" />
          <WireframeInput label="Cantidad de Cajas" placeholder="Ej: 5" />
          <div className="mt-6 p-4 bg-[#f0f7f9] border border-[#0E5E6F] rounded-lg text-sm text-[#0E5E6F]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <strong className="block mb-1 uppercase tracking-wider text-xs">Nota del Sistema:</strong>
            Se asignará automáticamente un dron con la fuerza de empuje adecuada (Ej: Dron de Carga Pesada a cargo del Piloto Javier Reyes).
          </div>
        </div>
        <WireframeButton primary onClick={onNext} className="w-full text-lg rounded-xl shadow-md py-4">Revisar Cotización</WireframeButton>
      </div>
    </div>
  </div>
);

const CheckoutView = ({ onConfirm, onBack }: any) => (
  <div className="h-full flex items-center justify-center p-10">
    <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-xl p-10 relative">
      <button onClick={onBack} className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold uppercase text-xs tracking-wider transition-colors" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        <ChevronLeft size={16} /> Volver
      </button>
      <Title className="text-3xl mb-8 text-center border-b-2 border-gray-100 pb-6">Resumen y Cotización</Title>
      <div className="space-y-4 mb-10">
        {[
          { label: 'Servicio Seleccionado', value: 'Fumigación / Riego' },
          { label: 'Área a Cubrir', value: '12 Hectáreas' },
          { label: 'Piloto Asignado', value: 'Javier Reyes (Agras T40)', valueClass: 'text-[#0E5E6F]' },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-100">
            <Text className="font-bold uppercase text-gray-500 tracking-wider text-sm">{row.label}</Text>
            <Text className={`font-bold text-lg text-gray-800 ${row.valueClass || ''}`}>{row.value}</Text>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-dashed border-gray-300 pt-8 mb-10">
        <div className="flex justify-between items-center mb-3"><Text className="text-gray-500">Tarifa por Hectárea</Text><Text className="font-mono text-lg">L 150.00</Text></div>
        <div className="flex justify-between items-center mb-6"><Text className="text-gray-500">Tarifa Base (Logística de Vuelo)</Text><Text className="font-mono text-lg">L 500.00</Text></div>
        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-800">
          <Title as="h3" className="text-2xl text-gray-800">Total Estimado</Title>
          <span className="font-black text-4xl text-[#0E5E6F]" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>L 2,300.00</span>
        </div>
      </div>
      <div className="mb-10">
        <Text className="font-bold uppercase text-gray-500 text-sm mb-4 tracking-wider">Método de Pago / Aprobación</Text>
        <div className="flex gap-4">
          <button className="flex-1 py-4 border-2 border-[#0E5E6F] bg-[#f0f7f9] text-[#0E5E6F] font-bold uppercase text-sm rounded-xl flex items-center justify-center gap-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <CreditCard size={18} /> Saldo en Cuenta
          </button>
          <button className="flex-1 py-4 border border-gray-300 text-gray-500 font-bold uppercase text-sm rounded-xl hover:bg-gray-50" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Transferencia</button>
        </div>
      </div>
      <WireframeButton primary onClick={onConfirm} className="w-full text-xl py-5 flex justify-center items-center gap-3 rounded-xl shadow-lg">
        <Check size={24} /> Confirmar y Programar Vuelo
      </WireframeButton>
    </div>
  </div>
);

const TrackingView = ({ onFinish }: any) => (
  <div className="h-full flex flex-col p-10 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <Title className="text-3xl flex items-center gap-4 text-gray-800">
        <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]"></span>
        Monitoreo en Vivo
      </Title>
      <div className="bg-white border-2 border-[#0E5E6F] text-[#0E5E6F] px-5 py-2.5 rounded-full font-bold uppercase text-sm tracking-wider shadow-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        Estado: En Vuelo (Activo)
      </div>
    </div>
    <div className="flex-1 flex gap-8">
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm relative p-2 flex flex-col overflow-hidden">
        <PlaceholderImage text="Vista de Mapa Satelital - Ruta en zigzag del dron sobre polígono" className="flex-1 w-full h-full rounded-xl" />
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border border-gray-200 p-5 rounded-xl shadow-xl min-w-[250px]">
          <Text className="font-bold uppercase text-xs mb-3 text-gray-500 tracking-wider">Progreso del Área</Text>
          <div className="w-full h-3 bg-gray-200 rounded-full mb-2 overflow-hidden">
            <div className="w-[65%] h-full bg-[#0E5E6F]"></div>
          </div>
          <Text className="text-right font-black text-[#0E5E6F] text-xl">65%</Text>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex-1">
          <Title as="h3" className="text-xl border-b border-gray-100 pb-4 mb-6">Telemetría del Dron</Title>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <Text className="text-sm font-bold uppercase text-gray-600 flex items-center gap-2 tracking-wider"><Battery size={18} /> Batería Dron</Text>
                <Text className="font-bold text-lg">42%</Text>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[42%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Text className="text-sm font-bold uppercase text-gray-600 flex items-center gap-2 tracking-wider"><Droplet size={18} /> Nivel de Tanque</Text>
                <Text className="font-bold text-lg">30%</Text>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[30%]"></div></div>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <Text className="text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">Piloto al mando</Text>
              <Text className="font-bold text-lg text-gray-800">Javier Reyes (Agras T40)</Text>
              <Text className="text-sm text-gray-500 mt-1">Contacto: javier_reyes@ejemplo.hn</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <WireframeButton className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-sm"><Pause size={18} /> Pausar Servicio</WireframeButton>
          <WireframeButton className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-sm"><MessageSquare size={18} /> Comunicar con Piloto</WireframeButton>
          <WireframeButton primary onClick={onFinish} className="mt-4 rounded-xl shadow-md">Simular Fin de Servicio</WireframeButton>
        </div>
      </div>
    </div>
  </div>
);

// ----- Historial y Reportes (Admin) -----
const HistoryView = () => {
  const [services] = useState<ServiceRecord[]>([
    {
      id: 'TECH-9938',
      type: 'Fumigación de Precisión',
      category: 'fumigacion',
      date: 'Hoy, 20 Jul 2026',
      time: '10:30 AM',
      location: 'Juticalpa, Olancho (Finca El Agualote)',
      pilot: 'Carlos Sosa',
      drone: 'DJI Agras T40',
      coverage: '98.4%',
      metrics: [
        { label: 'Área Cubierta', value: '12.5 Mz', sub: '8.7 Hectáreas' },
        { label: 'Tiempo de Vuelo', value: '1h 45m', sub: '2 Baterías usadas' },
        { label: 'Líquido Aplicado', value: '150 L', sub: 'Mezcla NutriCrop' },
      ],
      summary: 'Aspersión uniforme completada en sector Norte. El mapa de calor muestra excelente penetración en dosel foliar sin derrames detectados.'
    },
    {
      id: 'TECH-9821',
      type: 'Búsqueda y Rescate / Monitoreo',
      category: 'busqueda',
      date: '12 Feb, 2026',
      time: '04:15 PM',
      location: 'Catacamas, Olancho',
      pilot: 'Javier Reyes',
      drone: 'Mavic 3 Multispectral',
      coverage: '100%',
      metrics: [
        { label: 'Área Escaneada', value: '5.0 Ha', sub: 'Cámara Térmica' },
        { label: 'Tiempo de Vuelo', value: '42 min', sub: '1 Batería' },
        { label: 'Puntos de Interés', value: '3 Objetivos', sub: 'Ubicaciones GPS' },
      ],
      summary: 'Inspección térmica perimetral exitosa. Se detectaron 3 anomalías térmicas en el sector Este y se enviaron coordenadas en tiempo real.'
    },
    {
      id: 'TECH-9705',
      type: 'Transporte de Carga Pesada',
      category: 'transporte',
      date: '08 Feb, 2026',
      time: '08:00 AM',
      location: 'San Esteban, Olancho',
      pilot: 'María Gómez',
      drone: 'DJI FlyCart 30',
      coverage: '100%',
      metrics: [
        { label: 'Carga Total', value: '450 kg', sub: '15 Cajas (30kg c/u)' },
        { label: 'Trayectos', value: '5 Vuelos', sub: 'Ruta A -> Punto B' },
        { label: 'Distancia Recorrida', value: '18.2 km', sub: 'Consumo óptimo' },
      ],
      summary: 'Logística de insumos agrícolas sin contratiempos. Entregas coordinadas en terreno de difícil acceso mediante cable de liberación rápida.'
    },
    {
      id: 'TECH-9612',
      type: 'Mapeo Multiespectral (NDVI)',
      category: 'mapeo',
      date: '28 Ene, 2026',
      time: '11:20 AM',
      location: 'Danlí, El Paraíso',
      pilot: 'Héctor Ramírez',
      drone: 'Mavic 3 Multispectral',
      coverage: '96.2%',
      metrics: [
        { label: 'Superficie Analizada', value: '24.0 Ha', sub: 'Índice Vigor Vegetal' },
        { label: 'Tiempo de Vuelo', value: '2h 10m', sub: '3 Pasadas' },
        { label: 'Resolución Ortomosaico', value: '1.2 cm/px', sub: 'Alta Precisión' },
      ],
      summary: 'Identificación de estrés hídrico temprano en parcela 4B. Se generaron prescripciones para fertilización variable.'
    },
  ]);

  const [selectedService, setSelectedService] = useState<ServiceRecord>(services[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredServices = services.filter(s => {
    const matchesSearch = s.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.pilot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || s.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      
      {/* CABECERA PRINCIPAL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <Title className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3 flex-wrap">
            <span>Historial y Reportes</span>
            <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#0E5E6F]/20 shrink-0">
              {services.length} Operaciones
            </span>
          </Title>
          <Text className="text-xs text-gray-500 mt-1">
            Revisa las telemetrías, mapas de calor y reportes descargables de cada vuelo ejecutado.
          </Text>
        </div>

        {/* Buscador Rápido y Filtro */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar servicio, piloto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-[#0E5E6F] w-48 md:w-60"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="py-2 px-3 text-xs border border-gray-300 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-[#0E5E6F] font-medium"
          >
            <option value="all">Todos los tipos</option>
            <option value="fumigacion">Fumigación</option>
            <option value="busqueda">Búsqueda / Rescate</option>
            <option value="transporte">Transporte Carga</option>
            <option value="mapeo">Mapeo NDVI</option>
          </select>
        </div>
      </div>

      {/* SECCIÓN 1: LISTA DE SERVICIOS (CARDS LARGAS Y AMPLIAS) */}
      <div className="flex flex-col gap-3">
        <Text className="font-bold uppercase text-gray-400 text-xs tracking-wider px-1">
          Servicios Registrados ({filteredServices.length})
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Text className="text-xs text-gray-400 font-medium">No se encontraron servicios registrados.</Text>
            </div>
          ) : (
            filteredServices.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0E5E6F] text-white border-transparent shadow-md ring-2 ring-[#0E5E6F]/30'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-[#0E5E6F]/50 shadow-sm hover:shadow'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-400" />
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {service.category}
                      </span>
                      <span className={`text-xs flex items-center gap-1 font-medium ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                        <Clock size={12} />
                        {service.date}
                      </span>
                    </div>

                    <Title as="h4" className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {service.type}
                    </Title>

                    <div className={`flex items-center gap-1.5 text-xs font-medium ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                      <MapPin size={14} className="shrink-0" />
                      <span>{service.location}</span>
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                    isSelected ? 'border-white/15 text-white/80' : 'border-gray-100 text-gray-500'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      Piloto: <strong>{service.pilot}</strong>
                    </span>
                    <span className="font-mono font-bold text-xs">#{service.id}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* SECCIÓN 2: VISTA DETALLADA DEL REPORTE Y MAPA DE CALOR COMPLETO (ABAJO) */}
      <div className="w-full bg-white border-2 border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6 mt-2">
        
        {/* Cabecera del Reporte con botón Descargar PDF */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} />
                Completado
              </span>
              <span className="text-xs font-mono text-gray-400">ID: #{selectedService.id}</span>
            </div>
            <Title className="text-2xl font-black text-gray-900">{selectedService.type}</Title>
            <Text className="text-xs text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={13} className="text-[#0E5E6F]" /> {selectedService.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><User size={13} className="text-[#0E5E6F]" /> Piloto: <strong>{selectedService.pilot}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1"><PlaneTakeoff size={13} className="text-[#0E5E6F]" /> Dron: {selectedService.drone}</span>
            </Text>
          </div>

          <WireframeButton 
            primary 
            onClick={() => alert(`Generando PDF para el reporte ${selectedService.id}...`)}
            className="py-2.5 px-4 text-xs rounded-xl shadow-sm font-bold shrink-0 flex items-center gap-2"
          >
            <Download size={15} />
            Descargar PDF
          </WireframeButton>
        </div>

        {/* Métricas Principales */}
        <div>
          <Text className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3">
            Métricas Principales de Telemetría
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {selectedService.metrics.map((metric, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-[#0E5E6F]/30 transition-all shadow-sm">
                <Text className="text-[11px] font-bold uppercase text-gray-400 mb-1 tracking-wider">{metric.label}</Text>
                <Text className="text-2xl font-black text-[#0E5E6F]">{metric.value}</Text>
                {metric.sub && (
                  <Text className="text-[11px] font-medium text-gray-500 mt-0.5">{metric.sub}</Text>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del Vuelo */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <Text className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1 flex items-center gap-2">
            <FileText size={15} className="text-[#0E5E6F]" />
            Resumen Ejecutivo del Vuelo
          </Text>
          <Text className="text-xs text-gray-600 leading-relaxed font-medium">
            {selectedService.summary}
          </Text>
        </div>

        {/* Mapa de Calor Interactivo a Ancho Completo */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex justify-between items-center">
            <div>
              <Title className="text-lg font-bold text-gray-900">Mapa de Calor y Cobertura Terrestre</Title>
              <Text className="text-xs text-gray-500">Visualización de espectro NDVI / Telemetría GPS para {selectedService.id}</Text>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Cobertura: {selectedService.coverage}
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-900 group shadow-md">
            <img 
              src="src/img/mapa_calor.png" 
              alt="Mapa de calor de la zona tratada por el dron"
              className="w-full h-[400px] md:h-[480px] object-cover object-center opacity-90 group-hover:scale-102 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            
            {/* Fallback si no se localiza el archivo local */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 hidden group-has-[img[style*='display: none']]:flex flex-col items-center justify-center p-6 text-center text-white">
              <Layers size={48} className="text-[#0E5E6F] mb-3 animate-pulse" />
              <Text className="font-bold text-base">Vista de Mapa de Calor Activa</Text>
              <Text className="text-xs text-gray-400 max-w-sm mt-1">Cargando ortomosaico e índice espectral desde <code>src/img/mapa_calor.png</code></Text>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                onClick={() => alert('Abriendo vista HD interactiva de capa NDVI')}
                className="bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-xl border border-white/10 transition cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Maximize2 size={16} />
                Pantalla Completa
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/10">
              Capas: <span className="text-emerald-400 font-bold">NDVI</span> | <span className="text-cyan-400 font-bold">Telemetría GPS</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

 // ----- Editor de Mapas (Admin) ----- Corregido
const AdminMapsView = () => {
  // Estados para herramientas y capas
  const [selectedTool, setSelectedTool] = useState<'polygon' | 'octagon' | 'delete' | 'move' | 'measure'>('polygon');
  const [mapLayer, setMapLayer] = useState<'satellite' | 'hybrid' | 'terrain'>('satellite');
  const [showZones, setShowZones] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);

  // Paneles colapsados por defecto
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  // Parámetros de la Misión
  const [altitude, setAltitude] = useState(45);
  const [speed, setSpeed] = useState(20);
  const [rate, setRate] = useState(2.5);

  return (
    <div className="w-full h-full min-h-0 bg-white font-sans antialiased select-none flex flex-col text-gray-800 overflow-hidden relative">
      
      {/* Estilos para ocultar scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* BARRA SUPERIOR DE COMANDO */}
      <header className="bg-gray-50 border-b-2 border-gray-200 px-4 flex items-center justify-between shrink-0 h-12 z-30 w-full">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-[#0E5E6F] text-white rounded-lg shadow-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2" />
            </svg>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs sm:text-sm font-black text-gray-900 tracking-tight uppercase" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Comando Agrícola de Drones
              </h1>
              <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded border border-[#0E5E6F]/30 bg-[#0E5E6F]/10 text-[#0E5E6F]">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-semibold leading-none">
              Edición de Zonas y Parámetros de Vuelo · Valle del Aguán
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="py-1 px-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-md text-[11px] flex items-center gap-1 transition-colors active:scale-95 shadow-xs cursor-pointer">
            <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Borrar Selección</span>
          </button>
          <button className="py-1 px-3 bg-[#0E5E6F] border-2 border-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold rounded-md text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Guardar Mapa</span>
          </button>
        </div>
      </header>

      {/* ÁREA PRINCIPAL DEL EDITOR */}
      <main className="flex-1 flex overflow-hidden relative min-h-0 w-full">
        
        {/* PANEL IZQUIERDO */}
        <aside 
          className={`bg-white border-r-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${
            isLeftCollapsed ? 'w-12' : 'w-56'
          }`}
        >
          {/* Botón Flotante para Abrir/Cerrar */}
          <button 
            onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            className="absolute -right-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
            title={isLeftCollapsed ? "Expandir Menú" : "Colapsar Menú"}
          >
            <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isLeftCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {!isLeftCollapsed ? (
            <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar text-left h-full max-h-full">
              
              <div className="p-1.5 bg-gray-50 border-2 border-gray-200 rounded-lg shrink-0">
                <span className="text-[8px] font-black uppercase tracking-wider text-gray-400 block">Edición Activa</span>
                <span className="text-[11px] font-black text-gray-800 block mt-0.5">ID Parcela: #AGUAN-2026</span>
              </div>

              <div className="shrink-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  Herramientas
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedTool('polygon')}
                    className={`w-full flex items-center justify-between p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === 'polygon'
                        ? 'border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-current rounded-xs" />
                      <span>Pentágono</span>
                    </div>
                    {selectedTool === 'polygon' && (
                      <span className="text-[8px] font-black uppercase bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded">
                        ACTIVO
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedTool('octagon')}
                    className={`w-full flex items-center justify-between p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === 'octagon'
                        ? 'border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-current rounded-full" />
                      <span>Octágono</span>
                    </div>
                    {selectedTool === 'octagon' && (
                      <span className="text-[8px] font-black uppercase bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded">
                        ACTIVO
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedTool('delete')}
                    className={`w-full flex items-center gap-1.5 p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === 'delete'
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Eliminar</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('move')}
                    className={`w-full flex items-center gap-1.5 p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === 'move'
                        ? 'border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                    </svg>
                    <span>Mover Nodos</span>
                  </button>
                </div>
              </div>

              <hr className="border-gray-200 shrink-0" />

              <div className="shrink-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  Capas del Mapa
                </span>
                <div className="space-y-0.5 mb-1.5">
                  {[
                    { id: 'satellite', label: 'Satélite' },
                    { id: 'hybrid', label: 'Híbrido' },
                    { id: 'terrain', label: 'Terreno' }
                  ].map((layer) => (
                    <label key={layer.id} className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 cursor-pointer p-0.5 hover:bg-gray-50 rounded">
                      <input
                        type="radio"
                        name="mapLayer"
                        checked={mapLayer === layer.id}
                        onChange={() => setMapLayer(layer.id as any)}
                        className="accent-[#0E5E6F]"
                      />
                      <span>{layer.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-1 pt-1.5 border-t border-gray-100">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Zonas</span>
                    <input type="checkbox" checked={showZones} onChange={(e) => setShowZones(e.target.checked)} className="accent-[#0E5E6F] cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Mapa NDVI</span>
                    <input type="checkbox" checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} className="accent-[#0E5E6F] cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Límites</span>
                    <input type="checkbox" checked={showBoundaries} onChange={(e) => setShowBoundaries(e.target.checked)} className="accent-[#0E5E6F] cursor-pointer" />
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* ACCESOS RÁPIDOS PANEL IZQUIERDO COLAPSADO */
            <div className="py-4 flex flex-col items-center gap-3">
              <button
                onClick={() => setIsLeftCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Herramientas de Dibujo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => setIsLeftCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Capas del Mapa"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
            </div>
          )}
        </aside>

        {/* MAPA INTERACTIVO (ÁREA CENTRAL) */}
        <div className="flex-1 bg-slate-900 relative overflow-hidden h-full min-w-0">
          
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full object-cover pointer-events-none"
            style={{
              backgroundImage: `url(src/img/editor_mapas.png)`
            }}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <polygon
              points="350,150 480,150 540,280 480,420 350,420 290,280"
              fill="rgba(14, 94, 111, 0.45)"
              stroke="#0E5E6F"
              strokeWidth="3"
              strokeDasharray="6 3"
              className="pointer-events-auto cursor-pointer"
            />
            {[[350,150], [480,150], [540,280], [480,420], [350,420], [290,280]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" stroke="#0E5E6F" strokeWidth="2" />
            ))}
            <text x="415" y="280" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ZONA A: FERTILIZANTE</text>

            <polygon
              points="620,230 710,280 680,410 570,410 550,290"
              fill="rgba(217, 119, 6, 0.45)"
              stroke="#d97706"
              strokeWidth="3"
              className="pointer-events-auto cursor-pointer"
            />
            {[[620,230], [710,280], [680,410], [570,410], [550,290]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
            ))}
            <text x="625" y="320" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">ZONA B: FUMIGACIÓN</text>
          </svg>

          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-md shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">+</button>
            <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-md shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">-</button>
          </div>

        </div>

        {/* PANEL DERECHO */}
        <aside 
          className={`bg-white border-l-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${
            isRightCollapsed ? 'w-12' : 'w-64'
          }`}
        >
          {/* Botón Flotante para Abrir/Cerrar */}
          <button 
            onClick={() => setIsRightCollapsed(!isRightCollapsed)}
            className="absolute -left-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
            title={isRightCollapsed ? "Expandir Menú" : "Colapsar Menú"}
          >
            <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isRightCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {!isRightCollapsed ? (
            <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar text-left h-full max-h-full">
              
              <div className="flex items-center justify-between pb-1 border-b-2 border-gray-100 shrink-0">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-800">
                  Control Dron
                </span>
              </div>

              {/* CARD ESTADO DRON */}
              <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-lg space-y-1.5 shrink-0">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-gray-700">Dron Agras T50</span>
                  <span className="text-[8px] font-black uppercase text-emerald-700 bg-emerald-50 border border-emerald-300 px-1 py-0.2 rounded">
                    En Línea
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-1 text-[10px] font-semibold text-gray-600">
                  <div>Bat: 88%</div>
                  <div>GPS: 19 Sats</div>
                  <div>Vel: {speed} km/h</div>
                  <div>Alt: {altitude} m</div>
                </div>

                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#0E5E6F] h-full w-[88%] transition-all duration-300" />
                </div>
              </div>

              <div className="shrink-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">
                  Parámetros
                </span>

                <div className="space-y-3">
                  {/* ALTITUD (#CA5116) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                      <span>Altitud</span>
                      <span className="font-black" style={{ color: '#CA5116' }}>{altitude} m</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: `${((altitude - 10) / 90) * 100}%`, backgroundColor: '#CA5116' }}
                      />
                      <div 
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{ left: `${((altitude - 10) / 90) * 100}%`, backgroundColor: '#CA5116' }}
                      />
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={altitude}
                        onChange={(e) => setAltitude(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* VELOCIDAD (#2994B2) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                      <span>Velocidad</span>
                      <span className="font-black" style={{ color: '#2994B2' }}>{speed} km/h</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: `${((speed - 5) / 35) * 100}%`, backgroundColor: '#2994B2' }}
                      />
                      <div 
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{ left: `${((speed - 5) / 35) * 100}%`, backgroundColor: '#2994B2' }}
                      />
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* DOSIS QUÍMICA (#B165E0) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                      <span>Dosis Química</span>
                      <span className="font-black" style={{ color: '#B165E0' }}>{rate} L/ha</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ width: `${((rate - 0.5) / 9.5) * 100}%`, backgroundColor: '#B165E0' }}
                      />
                      <div 
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{ left: `${((rate - 0.5) / 9.5) * 100}%`, backgroundColor: '#B165E0' }}
                      />
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200 mt-auto shrink-0" />

              {/* BOTONES INFERIORES COMPLETOS */}
              <div className="space-y-1.5 pt-0.5 shrink-0">
                <button className="w-full py-2 bg-[#0E5E6F] hover:bg-[#0a4754] border-2 border-[#0E5E6F] text-white font-black text-[11px] uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Iniciar Misión</span>
                </button>

                <button className="w-full py-1.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-[11px] rounded-md flex items-center justify-center transition-colors cursor-pointer">
                  Auto-Dibujar Zona
                </button>

                <button className="w-full py-1.5 bg-white border-2 border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-[11px] rounded-md flex items-center justify-center transition-colors cursor-pointer">
                  Cancelar Operación
                </button>
              </div>

            </div>
          ) : (
            /* ACCESOS RÁPIDOS PANEL DERECHO COLAPSADO */
            <div className="py-4 flex flex-col items-center gap-3">
              <button
                onClick={() => setIsRightCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Control de Misión Dron"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              <button
                onClick={() => setIsRightCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Parámetros de Vuelo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </button>
            </div>
          )}
        </aside>

      </main>
    </div>
  );
};

// ----- Gestion de datos (Admin) ----- Corregido
const AdminDataView = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'drones' | 'rates'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados de Datos
  const [users, setUsers] = useState([
    { id: '1', init: 'CS', name: 'Carlos Sosa', role: 'Admin', roleClass: 'bg-[#0E5E6F]/10 text-[#0E5E6F]', loc: 'Juticalpa, Olancho', email: 'carlos_sosa@biodron.hn', status: 'Activo' },
    { id: '2', init: 'JR', name: 'Javier Reyes', role: 'Piloto', roleClass: 'bg-blue-100 text-blue-700', loc: 'Catacamas, Olancho', email: 'javier_reyes@biodron.hn', status: 'En Operación' },
    { id: '3', init: 'CM', name: 'Comercializadora El Valle', role: 'Agricultor', roleClass: 'bg-emerald-100 text-emerald-700', loc: 'Danlí, El Paraíso', email: 'contacto@elvalle.hn', status: 'Activo' },
    { id: '4', init: 'MG', name: 'María Gómez', role: 'Piloto', roleClass: 'bg-blue-100 text-blue-700', loc: 'Comayagua, Comayagua', email: 'maria.gomez@biodron.hn', status: 'Disponible' },
    { id: '5', init: 'AG', name: 'Agropecuaria Yoro', role: 'Agricultor', roleClass: 'bg-emerald-100 text-emerald-700', loc: 'El Progreso, Yoro', email: 'operaciones@agroyoro.hn', status: 'Inactivo' },
    { id: '6', init: 'HR', name: 'Héctor Ramírez', role: 'Piloto', roleClass: 'bg-blue-100 text-blue-700', loc: 'Choluteca, Choluteca', email: 'hector_ramirez@biodron.hn', status: 'Disponible' },
    { id: '7', init: 'FA', name: 'Finca El Agualote', role: 'Agricultor', roleClass: 'bg-emerald-100 text-emerald-700', loc: 'San Esteban, Olancho', email: 'finca_agualote@gmail.com', status: 'Activo' },
  ]);

  const [drones, setDrones] = useState([
    { id: 'D-01', model: 'DJI Agras T40', serial: 'T40-HN-0091', cap: '40L / 50kg', status: 'Operativo', battery: '92%' },
    { id: 'D-02', model: 'DJI FlyCart 30', serial: 'FC30-HN-0012', cap: '30kg Carga', status: 'En Vuelo', battery: '68%' },
    { id: 'D-03', model: 'Mavic 3 Multispectral', serial: 'M3M-HN-0104', cap: 'Escáner NDVI', status: 'Operativo', battery: '100%' },
    { id: 'D-04', model: 'GRIFF Aviation 300', serial: 'G300-HN-0002', cap: '227kg Carga', status: 'Mantenimiento', battery: '15%' },
    { id: 'D-05', model: 'DJI Agras T50', serial: 'T50-HN-0115', cap: '50L Fumigación', status: 'Operativo', battery: '85%' },
  ]);

  const [rates, setRates] = useState([
    { id: 'R-1', service: 'Fumigación de Precisión', unit: 'Manzana (Mz)', cost: 'L 280', min: '5 Mz' },
    { id: 'R-2', service: 'Mapeo Multiespectral (NDVI)', unit: 'Hectárea (Ha)', cost: 'L 180', min: '10 Ha' },
    { id: 'R-3', service: 'Transporte Carga Ligera', unit: 'Vuelo Operativo', cost: 'L 1,500', min: '1 Vuelo' },
    { id: 'R-4', service: 'Logística Gran Tonelaje', unit: 'Jornada Operativa', cost: 'L 8,500', min: '1 Día' },
    { id: 'R-5', service: 'Inspección Térmica', unit: 'Hora de Vuelo', cost: 'L 950', min: '2 Horas' },
  ]);

  const [formData, setFormData] = useState({ name: '', role: 'Piloto', loc: '', email: '', model: '', cap: '', service: '', cost: '' });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'users') {
      const newU = {
        id: String(Date.now()),
        init: formData.name.substring(0, 2).toUpperCase() || 'U',
        name: formData.name,
        role: formData.role,
        roleClass: formData.role === 'Admin' ? 'bg-[#0E5E6F]/10 text-[#0E5E6F]' : formData.role === 'Piloto' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700',
        loc: formData.loc || 'Honduras',
        email: formData.email || 'usuario@biodron.hn',
        status: 'Activo'
      };
      setUsers([...users, newU]);
    } else if (activeTab === 'drones') {
      const newD = {
        id: `D-0${drones.length + 1}`,
        model: formData.model || 'Dron Agrícola Generico',
        serial: `HN-${Math.floor(1000 + Math.random() * 9000)}`,
        cap: formData.cap || '20 Litros',
        status: 'Operativo',
        battery: '100%'
      };
      setDrones([...drones, newD]);
    } else {
      const newR = {
        id: `R-${rates.length + 1}`,
        service: formData.service || 'Servicio Personalizado',
        unit: 'Manzana (Mz)',
        cost: `L ${formData.cost || '200'}`,
        min: '1 Mz'
      };
      setRates([...rates, newR]);
    }
    setIsModalOpen(false);
    setFormData({ name: '', role: 'Piloto', loc: '', email: '', model: '', cap: '', service: '', cost: '' });
  };

  const handleDeleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));
  const handleDeleteDrone = (id: string) => setDrones(drones.filter(d => d.id !== id));
  const handleDeleteRate = (id: string) => setRates(rates.filter(r => r.id !== id));

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.loc.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredDrones = drones.filter(d => d.model.toLowerCase().includes(searchTerm.toLowerCase()) || d.serial.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredRates = rates.filter(r => r.service.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title className="text-2xl font-extrabold text-gray-900 tracking-tight">Gestión de Datos y Operaciones</Title>
          <Text className="text-xs text-gray-500 mt-1">Administra la infraestructura de pilotos, flota de drones y cuadro tarifario en Lempiras (HND).</Text>
        </div>
        <WireframeButton primary onClick={() => setIsModalOpen(true)} className="py-2.5 px-4 rounded-xl shadow-sm flex items-center gap-2 text-xs font-bold shrink-0">
          <Plus size={16} />
          {activeTab === 'users' ? 'Nuevo Usuario' : activeTab === 'drones' ? 'Registrar Dron' : 'Añadir Tarifa'}
        </WireframeButton>
      </div>

      {/* TARJETAS MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pilotos Registrados</Text>
            <Title as="h3" className="text-3xl font-black text-gray-900">{users.filter(u => u.role === 'Piloto').length}</Title>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Drones Operativos</Text>
            <Title as="h3" className="text-3xl font-black text-gray-900">{drones.filter(d => d.status !== 'Mantenimiento').length} / {drones.length}</Title>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
            <BatteryCharging size={24} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tarifa Promedio Riego</Text>
            <Title as="h3" className="text-3xl font-black text-[#0E5E6F]">L 280 <span className="text-xs text-gray-400 font-normal">/ Mz</span></Title>
          </div>
          <div className="w-12 h-12 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-xl flex items-center justify-center border border-[#0E5E6F]/20">
            <DollarSign size={24} />
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE TABLAS */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        {/* PESTAÑAS Y BUSCADOR */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center border-b border-gray-200 bg-gray-50/80 px-4 gap-3">
          <div className="flex gap-2">
            {[
              { id: 'users', label: 'Usuarios y Pilotos' },
              { id: 'drones', label: 'Flota de Drones' },
              { id: 'rates', label: 'Tarifas y Precios' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#0E5E6F] border-[#0E5E6F] bg-white'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative my-2 md:my-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#0E5E6F] w-full md:w-56"
            />
          </div>
        </div>

        {/* TABLA: USUARIOS Y PILOTOS */}
        {activeTab === 'users' && (
          <div className="w-full">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="bg-gray-50/50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-3 py-3.5">Usuario</th>
                  <th className="px-2 py-3.5 w-24">Rol</th>
                  <th className="px-3 py-3.5">Ubicación / Finca</th>
                  <th className="px-3 py-3.5">Contacto</th>
                  <th className="px-2 py-3.5 w-28">Estado</th>
                  <th className="px-2 py-3.5 w-20 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-full bg-[#0E5E6F]/10 text-[#0E5E6F] flex items-center justify-center font-black text-[11px] shrink-0">
                          {u.init}
                        </div>
                        <span className="truncate">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${u.roleClass}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-600 font-medium truncate">{u.loc}</td>
                    <td className="px-3 py-3 text-gray-500 font-mono text-[11px] truncate">{u.email}</td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${u.status === 'Inactivo' ? 'text-gray-400' : 'text-emerald-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Inactivo' ? 'bg-gray-400' : 'bg-emerald-500'}`} />
                        {u.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => handleDeleteUser(u.id)} className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLA: FLOTA DE DRONES */}
        {activeTab === 'drones' && (
          <div className="w-full">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="bg-gray-50/50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-3 py-3.5">Modelo</th>
                  <th className="px-3 py-3.5">Nº Serie</th>
                  <th className="px-3 py-3.5">Capacidad Útil</th>
                  <th className="px-2 py-3.5 w-20">Batería</th>
                  <th className="px-2 py-3.5 w-28">Estado</th>
                  <th className="px-2 py-3.5 w-20 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredDrones.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">{d.model}</td>
                    <td className="px-3 py-3 text-gray-500 font-mono text-[11px] truncate">{d.serial}</td>
                    <td className="px-3 py-3 text-gray-700 font-medium truncate">{d.cap}</td>
                    <td className="px-2 py-3 font-bold text-gray-700 whitespace-nowrap">{d.battery}</td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        d.status === 'Operativo' ? 'bg-emerald-100 text-emerald-800' : d.status === 'En Vuelo' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => handleDeleteDrone(d.id)} className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLA: CONFIGURACIÓN DE TARIFAS */}
        {activeTab === 'rates' && (
          <div className="w-full">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="bg-gray-50/50 border-b border-gray-200 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <tr>
                  <th className="px-3 py-3.5">Servicio</th>
                  <th className="px-3 py-3.5">Unidad</th>
                  <th className="px-3 py-3.5">Costo Base (HND)</th>
                  <th className="px-3 py-3.5">Mínimo</th>
                  <th className="px-2 py-3.5 w-20 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredRates.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">{r.service}</td>
                    <td className="px-3 py-3 text-gray-600 truncate">{r.unit}</td>
                    <td className="px-3 py-3 font-black text-[#0E5E6F] text-xs whitespace-nowrap">{r.cost}</td>
                    <td className="px-3 py-3 text-gray-500 truncate">{r.min}</td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors"><Edit3 size={14} /></button>
                        <button onClick={() => handleDeleteRate(r.id)} className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <Title as="h3" className="text-lg font-bold text-gray-900 mb-1">
              {activeTab === 'users' ? 'Agregar Nuevo Usuario' : activeTab === 'drones' ? 'Registrar Dron en Flota' : 'Añadir Nueva Tarifa Base'}
            </Title>
            <Text className="text-xs text-gray-500 mb-4">Ingresa la información requerida para actualizar el sistema.</Text>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              {activeTab === 'users' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nombre Completo / Empresa</label>
                    <input type="text" required placeholder="Ej. Juan Pérez" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Rol Operativo</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]">
                      <option value="Piloto">Piloto</option>
                      <option value="Agricultor">Agricultor</option>
                      <option value="Admin">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Ubicación</label>
                    <input type="text" placeholder="Ej. Catacamas, Olancho" value={formData.loc} onChange={e => setFormData({...formData, loc: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Correo Electrónico</label>
                    <input type="email" placeholder="correo@ejemplo.hn" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                </>
              )}

              {activeTab === 'drones' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Modelo de Dron</label>
                    <input type="text" required placeholder="Ej. DJI Agras T50" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Capacidad / Propósito</label>
                    <input type="text" placeholder="Ej. 50 Litros Fumigación" value={formData.cap} onChange={e => setFormData({...formData, cap: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                </>
              )}

              {activeTab === 'rates' && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Nombre del Servicio</label>
                    <input type="text" required placeholder="Ej. Monitoreo Térmico Nocturno" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Precio en Lempiras (L)</label>
                    <input type="number" placeholder="Ej. 350" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]" />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <WireframeButton onClick={() => setIsModalOpen(false)} className="flex-1 py-2 rounded-lg text-xs">Cancelar</WireframeButton>
                <WireframeButton primary type="submit" className="flex-1 py-2 rounded-lg text-xs">Guardar</WireframeButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
