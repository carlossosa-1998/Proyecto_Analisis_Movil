import React, { useState, useEffect, useRef } from "react";
import {
  Map,
  Camera,
  Search,
  Droplet,
  Wind,
  Package,
  Check,
  Battery,
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  Menu,
  User,
  List,
  MessageSquare,
  Home,
  CreditCard,
  ChevronLeft,
  MapPin,
  Crosshair,
  Calendar,
  Info,
  Database,
  Edit3,
  Save,
  Plus,
  Trash2,
  ShieldAlert,
  Wifi,
  Signal,
  BarChart2,
  Settings,
  DollarSign,
  Layers,
  FileText,
  LogOut,
  Bell,
  Zap,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Navigation,
  ArrowRight,
  Star,
  Shield,
  Truck,
  Radio,
  AlertOctagon,
  RefreshCw,
  Droplets,
  Eye,
  X,
  UserPlus,
  AlertCircle,
  ShoppingBag,
  ShieldCheck,
  Sprout,
  CheckCircle2,
  Activity,
  Mail,
  Phone,
  Edit2,
  Lock,
  EyeOff,
  BatteryCharging,
  Maximize2,
  PlaneTakeoff,
  Clock,
  Download,
  UserCheck,
  Award,
  Wallet,
  Upload,
  Building2,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Plane,
  Send,
  Paperclip,
  CheckCheck,
  MoreVertical, HelpCircle, Video,
  TrendingUp,
  ArrowUp,
  Thermometer,
  Wrench,
  Cpu,
  Compass,
  RotateCw
} from "lucide-react";
import Button from "@mui/material/Button";

// --- TYPOGRAPHY ---
const Title = ({ children, className = "", as: C = "h2" }: any) => (
  <C
    className={`font-black uppercase tracking-tight ${className}`}
    style={{ fontFamily: "'Lexend Deca', sans-serif" }}
  >
    {children}
  </C>
);
const Text = ({ children, className = "", as: C = "p" }: any) => (
  <C
    className={`${className}`}
    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
  >
    {children}
  </C>
);

const DashboardWidget = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
    <h3 className="text-sm text-gray-400 font-black uppercase tracking-widest mb-4">
      {title}
    </h3>
    {children}
  </div>
);

// --- WIREFRAME ATOMS ---
const PlaceholderImage = ({
  text = "Imagen",
  className = "",
}: {
  text?: string;
  className?: string;
}) => (
  <div
    className={`relative flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-100 overflow-hidden ${className}`}
  >
    <svg
      className="absolute inset-0 w-full h-full text-gray-300"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="100%"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="100%"
        y1="0"
        x2="0"
        y2="100%"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
    <span
      className="relative z-10 bg-white/90 px-3 py-1 text-xs text-gray-700 font-bold uppercase tracking-wider border border-gray-400 shadow-sm"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {text}
    </span>
  </div>
);

const WireframeInput = ({
  label,
  type = "text",
  placeholder = "Lorem ipsum",
  className = "",
}: any) => (
  <div
    className={`flex flex-col mb-4 w-full ${className}`}
    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
  >
    <label className="mb-1 text-sm font-bold text-gray-600 uppercase tracking-tight">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0E5E6F] transition-colors"
    />
  </div>
);

const WireframeButton = ({
  children,
  onClick,
  primary = false,
  className = "",
  disabled = false,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    className={`px-4 py-3 font-bold uppercase tracking-wider transition-all border-2 ${primary ? "border-[#0E5E6F] bg-[#0E5E6F] text-white hover:bg-[#0b4a58]" : "border-gray-800 bg-gray-100 text-gray-800 hover:bg-gray-200"} ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
  >
    {children}
  </button>
);

const NavButton = ({
  icon,
  label,
  active = false,
  onClick,
  isCollapsed,
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
      isCollapsed ? "justify-center" : "justify-start"
    } ${
      active
        ? "bg-[#0E5E6F] text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 bg-transparent"
    }`}
    style={{ fontFamily: "'Instrument Sans', sans-serif" }}
  >
    {/* Contenedor del ícono */}
    <div className="shrink-0 flex items-center justify-center pointer-events-none">
      {icon}
    </div>

    {/* Texto lateral */}
    {!isCollapsed && (
      <span className="text-sm truncate pointer-events-none">{label}</span>
    )}

    {/* Tooltip flotante (solo colapsado) */}
    {isCollapsed && (
      <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-md border border-gray-800 tracking-wider uppercase pointer-events-none">
        {label}
      </div>
    )}
  </button>
);

const StatCard = ({
  label,
  value,
  sub,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-white border-2 border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-gray-300 transition-all min-h-[160px] w-full box-border ${className}`}
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="text-left space-y-1.5 min-w-0 flex-1">
          <p
            className="text-[11px] font-black uppercase tracking-wider text-gray-400 block leading-tight"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {label}
          </p>
          <h3
            className="text-2xl font-black text-gray-900 tracking-tight block whitespace-nowrap leading-none pt-0.5"
            style={{ fontFamily: "'Lexend Deca', sans-serif" }}
          >
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

// Función auxiliar para obtener las iniciales del nombre
const getInitials = (fullName: string) => {
  // Remueve títulos profesionales comunes para extraer las iniciales reales
  const cleanName = fullName.replace(/^(Ing\.|Lic\.|Cap\.|Dra\.|Dr\.)\s+/, '');
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'US';
};

// Componente para renderizar la foto de perfil basada en iniciales
const AvatarInitials = ({ name, className = "w-11 h-11 text-sm" }: { name: string; className?: string }) => {
  const initials = getInitials(name);
  return (
    <div className={`bg-[#0E5E6F] text-white font-bold flex items-center justify-center rounded-xl shrink-0 shadow-xs ${className}`}>
      {initials}
    </div>
  );
};

// --- STATE & TYPES ---
type View =
  | "landing"
  | "auth"
  | "home"
  | "config_map"
  | "config_cargo"
  | "checkout"
  | "tracking"
  | "history"
  | "admin_maps"
  | "admin_data"
  | "admin_prices"
  | "pilot_dashboard"
  | "farmer_dashboard"
  | "profile"
  | "buy_dron_farmer"
  | "subscriptions"
  | "reports"
  | "help"
  | "help_admin"
  | "drone_status"
  | "flight_history"
  | "help_pilot";
type Role = "admin" | "pilot" | "farmer" | null;
// Tipos de datos para el estado de los drones
interface DroneUnit {
  id: number;
  drone: string;
  pilot: string;
  status: "Activo" | "En vuelo" | "Libre" | "Mantenimiento";
}
// Interfaces
interface Plan {
  id: number;
  name: string;
  price: number;
  cycle: "Mensual" | "Anual" | "Trimestral";
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
  priority: "Alta" | "Media" | "Normal";
  status: "En Progreso" | "Pendiente" | "Completado";
}

export type HealthStatus = "Buena" | "Atención" | "Crítica";

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
  category: "fumigacion" | "busqueda" | "transporte" | "mapeo";
  date: string;
  time: string;
  location: string;
  pilot: string;
  drone: string;
  coverage: string;
  metrics: { label: string; value: string; sub?: string }[];
  summary: string;
}

interface BuyDronFarmerViewProps {
  onRegisterPilot?: () => void;
}

interface PurchaseLog {
  id: string;
  fecha: string;
  concepto: string;
  tipo: "Plan Mensual" | "Servicio Extra" | "Recarga Saldo";
  monto: string;
  metodoPago: string;
  estado: "Pagado" | "Pendiente";
}

interface Message {
  id: number;
  sender: 'granjero' | 'admin' | 'other';
  text: string;
  time: string;
}

interface Chat {
  id: string;
  name: string;
  role: string;
  roleType: 'admin' | 'piloto';
  avatar: string;
  online: boolean;
  lastSeen?: string;
  unreadCount: number;
  messages: Message[];
}

// Interfaz para la información detallada de cada Dron
export interface Drone {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  status: 'in_flight' | 'ready' | 'charging' | 'maintenance';
  battery: number;
  batteryVoltage: string;
  signalStrength: number;
  satellites: number;
  rtkStatus: 'FIX' | 'FLOAT' | 'OFFLINE';
  payloadType: string;
  payloadCapacity: string; // Ej: "32L / 40L" o "Sensor Multispectral"
  location: string;
  flightHours: number;
  healthScore: number;
  lastMaintenance: string;
  nextMaintenanceIn: string;
  currentMission?: {
    name: string;
    progress: number;
    altitude: string;
    speed: string;
    areaCovered: string;
  };
  motorStatus: ('OK' | 'WARNING')[];
}

// Interfaz del Registro de Vuelo
interface FlightLog {
  id: string;
  droneId: string;
  droneName: string;
  type: 'fumigation' | 'mapping' | 'inspection';
  typeName: string;
  location: string;
  pilot: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  areaCovered: string;
  productApplied?: string;
  volumeApplied?: string;
  status: 'completed' | 'interrupted' | 'failed';
  batteryUsed: number;
  maxAltitude: string;
  avgSpeed: string;
  notes?: string;
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [role, setRole] = useState<Role>(null);
  const [serviceType, setServiceType] = useState<string>("");
  const [initialAuthTab, setInitialAuthTab] = useState<"login" | "register">(
    "login",
  );

  const navigate = (v: View, type?: string) => {
    setView(v);
    if (type) setServiceType(type);
  };

  const openAuth = (tab: "login" | "register") => {
    setInitialAuthTab(tab);
    navigate("auth");
  };

  const login = (r: Role) => {
    setRole(r);
    navigate(
      r === "pilot"
        ? "pilot_dashboard"
        : r === "farmer"
          ? "farmer_dashboard"
          : "home",
    );
  };
  const register = (r: Role) => {
    setRole(r);
    navigate(
      r === "pilot"
        ? "pilot_dashboard"
        : r === "farmer"
          ? "farmer_dashboard"
          : "home",
    );
  };

  const noSidebar: View[] = ["landing", "auth"];
  const showSidebar = !noSidebar.includes(view);

  const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <aside
        className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div>
          {/* Cabecera con Botón de Colapso */}
          <div
            className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}
          >
            {!isCollapsed ? (
              <div className="text-left animate-in fade-in duration-200">
                <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">
                  BioDron
                </Title>
                <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">
                  Portal Administrador
                </Text>
              </div>
            ) : (
              <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">
                BD
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
            >
              {isCollapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </button>
          </div>

          {/* Navegación Principal */}
          <nav className="p-3 flex flex-col gap-1">
            <NavButton
              icon={<Home size={18} />}
              label="Dashboard"
              active={view === "home"}
              onClick={() => navigate("home")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<List size={18} />}
              label="Servicios y Reservas"
              active={view === "history"}
              onClick={() => navigate("history")}
              isCollapsed={isCollapsed}
            />

            <div className="my-2 border-t border-gray-100" />

            {!isCollapsed ? (
              <Text className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left animate-in fade-in duration-200">
                Herramientas Admin
              </Text>
            ) : (
              <div className="border-t border-gray-100 my-1" />
            )}

            <NavButton
              icon={<Map size={18} />}
              label="Editor de Mapas"
              active={view === "admin_maps"}
              onClick={() => navigate("admin_maps")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<Database size={18} />}
              label="Gestión de Datos"
              active={view === "admin_data"}
              onClick={() => navigate("admin_data")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<DollarSign size={18} />}
              label="Precios y Planes"
              active={view === "admin_prices"}
              onClick={() => navigate("admin_prices")}
              isCollapsed={isCollapsed}
            />

            <div className="my-2 border-t border-gray-100" />

            <NavButton
              icon={<MessageSquare size={18} />}
              label="Soporte"
              active={view === "help_admin"}
              onClick={() => navigate("help_admin")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<User size={18} />}
              label="Mi Perfil"
              active={view === "profile"}
              onClick={() => navigate("profile")}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* Perfil del Usuario al Fondo */}
        <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-start"}`}
          >
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">
              CS
            </div>
            {!isCollapsed && (
              <div className="text-left animate-in fade-in duration-200">
                <Text className="font-bold text-sm text-gray-800">
                  Carlos Sosa
                </Text>
                <Text className="text-[10px] text-[#0E5E6F] font-bold block">
                  Admin · Juticalpa
                </Text>
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
    <aside
      className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div>
        <div
          className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}
        >
          {!isCollapsed ? (
            <div className="text-left animate-in fade-in duration-200">
              <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">
                BioDron
              </Title>
              <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">
                Panel Piloto
              </Text>
            </div>
          ) : (
            <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">
              BD
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
          >
            {isCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          <NavButton
            icon={<Navigation size={18} />}
            label="Mis Misiones"
            active={view === "pilot_dashboard"}
            onClick={() => navigate("pilot_dashboard")}
            isCollapsed={isCollapsed}
          />
          <NavButton
            icon={<Radio size={18} />}
            label="Estado del Dron"
            active={view === "drone_status"}
            onClick={() => navigate("drone_status")}
            isCollapsed={isCollapsed}
          />
          <NavButton
            icon={<BarChart2 size={18} />}
            label="Historial de Vuelos"
            active={view === "flight_history"}
            onClick={() => navigate("flight_history")}
            isCollapsed={isCollapsed}
          />
          <NavButton
            icon={<MessageSquare size={18} />}
            label="Ayuda y Asistencia"
            active={view === "help_pilot"}
            onClick={() => navigate("help_pilot")}
            isCollapsed={isCollapsed}
          />

          <div className="my-2 border-t border-gray-100" />

          <NavButton
            icon={<User size={18} />}
            label="Mi Perfil"
            active={view === "profile"}
            onClick={() => navigate("profile")}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">
            JR
          </div>
          {!isCollapsed && (
            <div className="text-left animate-in fade-in duration-200">
              <Text className="font-bold text-sm text-gray-800">
                Javier Reyes
              </Text>
              <Text className="text-[10px] text-blue-600 font-bold block">
                Piloto · Catacamas
              </Text>
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
      <aside
        className={`border-r-2 border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div>
          <div
            className={`p-5 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}
          >
            {!isCollapsed ? (
              <div className="text-left animate-in fade-in duration-200">
                <Title className="text-xl text-[#0E5E6F] font-black tracking-tight">
                  BioDron
                </Title>
                <Text className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">
                  Portal Agricultor
                </Text>
              </div>
            ) : (
              <div className="p-1 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg border border-[#0E5E6F]/20 font-black text-xs">
                BD
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg border-2 border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95"
            >
              {isCollapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </button>
          </div>

          <nav className="p-3 flex flex-col gap-1">
            <NavButton
              icon={<Layers size={18} />}
              label="Mis Parcelas"
              active={view === "farmer_dashboard"}
              onClick={() => navigate("farmer_dashboard")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<ShoppingBag size={18} />}
              label="Comprar Dron"
              active={view === "buy_dron_farmer"}
              onClick={() => navigate("buy_dron_farmer")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<CreditCard size={18} />}
              label="Mis Suscripciones"
              active={view === "subscriptions"}
              onClick={() => navigate("subscriptions")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<FileText size={18} />}
              label="Historial de Reportes"
              active={view === "reports"}
              onClick={() => navigate("reports")}
              isCollapsed={isCollapsed}
            />
            <NavButton
              icon={<MessageSquare size={18} />}
              label="Ayuda y Asistencia"
              active={view === "help"}
              onClick={() => navigate("help")}
              isCollapsed={isCollapsed}
            />

            <div className="my-2 border-t border-gray-100" />

            <NavButton
              icon={<User size={18} />}
              label="Mi Cuenta"
              active={view === "profile"}
              onClick={() => navigate("profile")}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        <div className="p-4 border-t-2 border-gray-200 bg-gray-50 relative group/tooltip">
          <div
            className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "justify-start"}`}
          >
            <div className="w-10 h-10 bg-gray-200 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs font-black text-gray-600 shrink-0">
              CM
            </div>
            {!isCollapsed && (
              <div className="text-left animate-in fade-in duration-200">
                <Text className="font-bold text-sm text-gray-800">
                  Carlos Reyes
                </Text>
                <Text className="text-[10px] text-green-600 font-bold block">
                  Agricultor · Olanchito
                </Text>
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
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="w-full max-w-[1100px] flex flex-col items-center select-none">
        {/* Monitor */}
        <div
          className="w-full"
          style={{
            background: "#2a2a2a",
            borderRadius: "16px 16px 0 0",
            padding: "12px 12px 0 12px",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center justify-center mb-2 gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mx-1"></div>
          </div>

          {/* Browser screen */}
          <div
            className="w-full bg-white rounded-t-lg overflow-hidden flex flex-col"
            style={{
              height: "78vh",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
            }}
          >
            {/* Browser Chrome */}
            <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-4 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="bg-white px-4 py-1 text-xs text-gray-500 rounded-md w-[40%] min-w-[220px] text-center border border-gray-300 flex items-center justify-center gap-1"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  <span className="opacity-40">https://</span>biodron.hn
                  {view !== "landing" && view !== "auth" && (
                    <span className="opacity-40">/web</span>
                  )}
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 flex overflow-hidden bg-gray-100 text-gray-800">
              {showSidebar && role === "admin" && <AdminSidebar />}
              {showSidebar && role === "pilot" && <PilotSidebar />}
              {showSidebar && role === "farmer" && <FarmerSidebar />}

              <main className="flex-1 h-full overflow-y-auto relative bg-gray-50">
                {view === "landing" && (
                  <LandingView
                    onLogin={() => openAuth("login")}
                    onRegister={() => openAuth("register")}
                  />
                )}

                {/* AHORA SE PASA EL COMPONENTE UNIFICADO DE AUTH QUE CONTIENE LOGIN Y REGISTRO */}
                {view === "auth" && (
                  <AuthView
                    initialTab={initialAuthTab}
                    onLogin={login}
                    onRegister={register}
                    onBack={() => navigate("landing")}
                  />
                )}

                {view === "home" && (
                  <HomeView
                    onSelectService={(type) =>
                      navigate(
                        type === "carga" ? "config_cargo" : "config_map",
                        type,
                      )
                    }
                  />
                )}
                {view === "config_map" && (
                  <ConfigMapView
                    serviceType={serviceType}
                    onNext={() => navigate("checkout")}
                    onBack={() => navigate("home")}
                  />
                )}
                {view === "config_cargo" && (
                  <ConfigCargoView
                    onNext={() => navigate("checkout")}
                    onBack={() => navigate("home")}
                  />
                )}
                {view === "checkout" && (
                  <CheckoutView
                    onConfirm={() => navigate("tracking")}
                    onBack={() => navigate("home")}
                  />
                )}
                {view === "tracking" && (
                  <TrackingView onFinish={() => navigate("history")} />
                )}
                {view === "history" && <HistoryView />}

                {/* Vistas del Portal Agricultor */}
                {view === "farmer_dashboard" && <FarmerDashboardView />}
                {view === "buy_dron_farmer" && <BuyDronFarmerView />}
                {view === "subscriptions" && <SubscriptionsView />}
                {view === "reports" && <ReportsView />}
                {view === "help" && <HelpView />}

                {/* Vistas de Administración y Piloto */}
                {view === "admin_maps" && <AdminMapsView />}
                {view === "admin_data" && <AdminDataView />}
                {view === "admin_prices" && <AdminPricesView />}
                {view === "pilot_dashboard" && <PilotDashboardView />}
                {view === "help_admin" && <HelpAdminView />}
                {view === "drone_status" && <DroneStatusView />}
                {view === "flight_history" && <FlightHistoryView />}
                {view === "help_pilot" && <HelpPilotView />}

                {/* Mi Cuenta / Perfil */}
                {view === "profile" && (
                  <ProfileView
                    role={role}
                    onLogout={() => {
                      setRole(null);
                      navigate("landing");
                    }}
                  />
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Hinge + deck */}
        <div
          className="w-full h-4 flex items-center justify-center"
          style={{
            background: "linear-gradient(to bottom, #3a3a3a, #2a2a2a)",
            borderRadius: "0 0 4px 4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="w-24 h-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          ></div>
        </div>
        <div
          className="w-[108%] h-6 flex items-end justify-center pb-1"
          style={{
            background: "linear-gradient(to bottom, #2e2e2e, #252525)",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="w-32 h-1.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.3)" }}
          ></div>
        </div>
        <div
          className="w-[115%] h-3 rounded-full mt-1"
          style={{ background: "rgba(0,0,0,0.4)", filter: "blur(8px)" }}
        ></div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 1. LANDING PAGE: SERVICIOS + MODALES
// ═══════════════════════════════════════════════════════════════════════
const LandingView = ({
  onLogin: alIniciarSesion,
  onRegister: alRegistrar,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) => {
  const [pestanaPrecios, fijarPestanaPrecios] = useState<"subs" | "equipos">(
    "subs",
  );
  const [indiceImagenPrincipal, fijarIndiceImagenPrincipal] = useState(0);
  const [dronSeleccionado, fijarDronSeleccionado] = useState<any | null>(null);
  const [idTarjetaSeleccionada, fijarIdTarjetaSeleccionada] = useState<
    string | null
  >(null);
  const [indiceImagenApp, fijarIndiceImagenApp] = useState(0);

  // Referencias y estado para el scroll con el mouse
  const refServicios = useRef<HTMLDivElement>(null);
  const refDrones = useRef<HTMLDivElement>(null);
  const estadoArrastre = useRef({
    activado: false,
    xInicial: 0,
    scrollInicial: 0,
  });

  const manejarInicioArrastre = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (!ref.current) return;
    estadoArrastre.current.activado = true;
    estadoArrastre.current.xInicial = e.pageX - ref.current.offsetLeft;
    estadoArrastre.current.scrollInicial = ref.current.scrollLeft;
  };

  const manejarFinArrastre = () => {
    estadoArrastre.current.activado = false;
  };

  const manejarArrastre = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (!estadoArrastre.current.activado || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const desplazamiento = (x - estadoArrastre.current.xInicial) * 2; // Factor de velocidad
    ref.current.scrollLeft =
      estadoArrastre.current.scrollInicial - desplazamiento;
  };

  const imagenesCarruselPrincipal = [
    {
      src: "src/img/busqueda.png",
      titulo: "Búsqueda y Monitoreo",
      descripcion: "Identificación térmica de anomalías en el terreno.",
    },
    {
      src: "src/img/riego.png",
      titulo: "Riego Automatizado",
      descripcion: "Gestión hídrica guiada por mapas multiespectrales.",
    },
    {
      src: "src/img/pesticidas.png",
      titulo: "Aplicación de Insumos",
      descripcion: "Aspersión inteligente y focalizada contra plagas.",
    },
    {
      src: "src/img/transporte.png",
      titulo: "Logística de Carga",
      descripcion: "Movilización autónoma de muestras y herramientas.",
    },
  ];

  const imagenesAppMovil = [
    {
      src: "src/img/celular_1.png",
      titulo: "Descarga la App",
      descripcion: "Control operativo integral desde tu teléfono móvil.",
    },
    {
      src: "src/img/celular_2.png",
      titulo: "Trazado de Rutas",
      descripcion: "Planifica mapas de vuelo de forma rápida e intuitiva.",
    },
    {
      src: "src/img/celular_3.png",
      titulo: "Monitoreo en Directo",
      descripcion: "Visualiza la telemetría y sensores en tiempo real.",
    },
  ];

  const datosServicios = [
    {
      icono: <Droplets size={22} />,
      titulo: "Fumigación y Riego",
      descripcion:
        "Despliegues autónomos calibrados milimétricamente para la aspersión uniforme de insumos.",
    },
    {
      icono: <Eye size={22} />,
      titulo: "Mapeo Multiespectral",
      descripcion:
        "Diagnóstico exhaustivo de estrés hídrico y vigor vegetal mediante procesamiento de imágenes NIR.",
    },
    {
      icono: <Truck size={22} />,
      titulo: "Logística de Carga",
      descripcion:
        "Transporte pesado totalmente autónomo de herramientas, muestras e insumos al lote.",
    },
  ];

  const datosPlanes = [
    {
      id: "plan-basico",
      nombre: "Plan Básico Agrícola",
      precio: "L 1,200",
      periodo: "/mes",
      etiqueta: "Inicial",
      descripcion:
        "Optimización y análisis base para parcelas pequeñas y productores independientes.",
      caracteristicas: [
        "2 vuelos de monitoreo mensuales.",
        "Reportes analíticos de vigor en PDF.",
        "Cobertura de hasta 10 manzanas.",
      ],
      destacado: false,
    },
    {
      id: "plan-profesional",
      nombre: "Plan Operativo Profesional",
      precio: "L 2,800",
      periodo: "/mes",
      etiqueta: "Mediano",
      descripcion:
        "Diseñado para fincas comerciales que requieren seguimiento constante y aspersión aérea.",
      caracteristicas: [
        "10 vuelos mensuales incluidos.",
        "Analítica multiespectral (NDVI / SAVI).",
        "Cobertura de hasta 50 manzanas.",
      ],
      destacado: true,
    },
    {
      id: "plan-corporativo",
      nombre: "Plan Premium Corporativo",
      precio: "L 5,500",
      periodo: "/mes",
      etiqueta: "Corporativo",
      descripcion:
        "Infraestructura total para grandes agroindustrias con despliegues autónomos diarios.",
      caracteristicas: [
        "Vuelos y fumigación ilimitados.",
        "Telemetría y soporte crítico 24/7.",
        "Procesamiento en tiempo real con IA.",
      ],
      destacado: false,
    },
  ];

  const datosDrones = [
    {
      id: "dji-flycart-30",
      nombre: "DJI FlyCart 30",
      etiqueta: "Carga Ligera",
      imagen: "src/img/DJI_FlyCart_30.png",
      precio: "L 450,000",
      descripcion:
        "Capacidad de carga útil de 30 kg con rango operativo extendido y resistencia climática.",
      destacado: true,
      especificaciones: {
        "Capacidad de Carga": "30 kg",
        "Tiempo de Vuelo": "18 min",
        "Velocidad Máxima": "72 km/h",
        "Rango Operativo": "28 km",
        "Resistencia al Viento": "12 m/s",
        "Sistema de Navegación": "RTK Dual / GNSS",
        "Clasificación IP": "IP55",
      },
    },
    {
      id: "ehang-184",
      nombre: "Ehang 184",
      etiqueta: "Pasajeros",
      imagen: "src/img/Ehang_184.png",
      precio: "L 2,400,000",
      descripcion:
        "Vehículo aéreo autónomo eléctrico diseñado para transporte seguro de un pasajero o carga mayor.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "100 kg",
        "Tiempo de Vuelo": "23 min",
        "Velocidad Máxima": "100 km/h",
        "Rango Operativo": "30 km",
        "Potencia de Batería": "14.2 kWh",
        "Sistema de Seguridad": "Fail-safe redundante",
        "Control de Vuelo": "Autónomo 4G/5G",
      },
    },
    {
      id: "griff-300",
      nombre: "GRIFF Aviation 300",
      etiqueta: "Carga Pesada",
      imagen: "src/img/GRIFF_Aviation_300.png",
      precio: "L 1,850,000",
      descripcion:
        "Megadron industrial octocóptero diseñado específicamente para la elevación de insumos pesados.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "227 kg",
        "Tiempo de Vuelo": "31 min",
        "Velocidad Máxima": "60 km/h",
        "Rango Operativo": "15 km",
        Configuración: "Octocóptero pesado",
        Aplicación: "Industrial / Agrícola",
        Certificación: "Comercial Avanzada",
      },
    },
    {
      id: "freefly-alta-x",
      nombre: "Freefly Alta X",
      etiqueta: "Cinematografía / Carga",
      imagen: "src/img/Freefly_Alta_X.png",
      precio: "L 620,000",
      descripcion:
        "With an impressive lifting capacity of 35 lbs (15 kg), Freefly Alta X redefines what's possible in cinematography. Whether you're aiming to capture breathtaking landscapes, dynamic action sequences, or intricate aerial shots, the Alta X empowers your creative vision like never before.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "15 kg",
        "Tiempo de Vuelo": "20 min",
        "Velocidad Máxima": "95 km/h",
        "Distancia Transmisión": "5 km",
        "Diámetro Desplegado": "2273 x 877 x 387 mm",
        "Peso Vacío": "10.86 kg",
        "Temperatura Operativa": "-10° a 40°C",
      },
    },
    {
      id: "jouav-cw-80e",
      nombre: "JOUAV CW-80E",
      etiqueta: "Largo Alcance",
      imagen: "src/img/JOUAV_CW-80E.png",
      precio: "L 1,150,000",
      descripcion:
        "The CW-80E can stay afloat for more than 840 minutes at a maximum speed of 135 km/h. With a payload capacity of up to 25 kg, the long range drone allows the flexibility to carry large high-end sensors, such as hyperspectral and bathymetric LiDARs.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "25 kg",
        "Tiempo de Vuelo": "840 min",
        "Velocidad Máxima": "135 km/h",
        "Distancia Transmisión": "100/200 km",
        Dimensiones: "Fuselaje: 3000mm, Envergadura: 5200mm",
        "Peso Máximo Despegue": "110 kg",
        "Temperatura Operativa": "-20° a 55°C",
      },
    },
  ];

  useEffect(() => {
    const temporizadorPrincipal = setInterval(() => {
      fijarIndiceImagenPrincipal(
        (prev) => (prev + 1) % imagenesCarruselPrincipal.length,
      );
    }, 5000);
    return () => clearInterval(temporizadorPrincipal);
  }, [imagenesCarruselPrincipal.length]);

  useEffect(() => {
    const temporizadorApp = setInterval(() => {
      fijarIndiceImagenApp((prev) => (prev + 1) % imagenesAppMovil.length);
    }, 5000);
    return () => clearInterval(temporizadorApp);
  }, [imagenesAppMovil.length]);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b-2 border-gray-200 px-8 flex items-center gap-6 h-14 w-full shrink-0 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="src/img/logo_bio_dron.png"
            alt="BioDron Logo"
            className="w-15 h-15 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <Title className="text-2xl font-bold text-[#0E5E6F] tracking-tight">
            BioDron
          </Title>
        </div>
        <div
          className="flex items-center gap-6 ml-6"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          <a
            href="#inicio"
            className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider"
          >
            Características
          </a>
          <a
            href="#servicios"
            className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider"
          >
            Servicios
          </a>
          <a
            href="#precios"
            onClick={() => fijarPestanaPrecios("subs")}
            className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider"
          >
            Suscripciones
          </a>
          <a
            href="#precios"
            onClick={() => fijarPestanaPrecios("equipos")}
            className="text-xs font-bold text-gray-500 hover:text-[#0E5E6F] transition-colors uppercase tracking-wider"
          >
            Equipos
          </a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <WireframeButton
            onClick={alIniciarSesion}
            className="py-2 px-5 text-sm rounded-lg border-gray-300 bg-white text-gray-700"
          >
            Ingresar
          </WireframeButton>
          <WireframeButton
            primary
            onClick={alRegistrar}
            className="py-2 px-5 text-sm rounded-lg"
          >
            Registrarse
          </WireframeButton>
        </div>
      </nav>

      {/* ─── CONTENEDOR PRINCIPAL CON SCROLL ─── */}
      <div className="flex-1 w-full overflow-y-auto scroll-smooth">
        {/* SECCIÓN 1: HERO */}
        <section
          id="inicio"
          className="w-full px-16 flex flex-col lg:flex-row items-center justify-center gap-12 bg-white border-b-2 border-gray-100 box-border py-10"
        >
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#0E5E6F]/10 text-[#0E5E6F] px-3.5 py-1.5 rounded-full mb-4 border border-[#0E5E6F]/20">
              <Zap size={14} />
              <Text className="text-xs font-black uppercase tracking-widest">
                Plataforma líder en Honduras
              </Text>
            </div>
            <Title className="text-4xl lg:text-[2.5rem] leading-[1.15] font-extrabold text-gray-900 mb-4 normal-case tracking-tight">
              Monitoreo Agrícola Autónomo con Drones
            </Title>
            <Text className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
              Automatiza el riego, fumigación y transporte de carga pesada con
              tecnología de precisión aeroespacial. Diseñado para optimizar el
              rendimiento y la eficiencia de tus parcelas productoras.
            </Text>
            <div className="flex gap-4">
              <WireframeButton
                primary
                onClick={alRegistrar}
                className="py-2.5 px-5 rounded-xl flex items-center gap-2 text-sm"
              >
                <Droplets size={18} /> Soy Agricultor
              </WireframeButton>
              <WireframeButton
                onClick={alRegistrar}
                className="py-2.5 px-5 rounded-xl flex items-center gap-2 bg-white border-[#0E5E6F] text-[#0E5E6F] text-sm"
              >
                <Navigation size={18} /> Soy Piloto
              </WireframeButton>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg relative">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md">
              <img
                src={imagenesCarruselPrincipal[indiceImagenPrincipal].src}
                alt={imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                className="w-full h-full object-cover opacity-80 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                <span className="text-[10px] font-bold text-[#0E5E6F] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded w-max mb-1">
                  Vista Aérea Activa
                </span>
                <Title
                  as="h3"
                  className="text-lg font-bold text-white normal-case"
                >
                  {imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                </Title>
                <Text className="text-xs text-gray-300 mt-0.5">
                  {imagenesCarruselPrincipal[indiceImagenPrincipal].descripcion}
                </Text>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-4">
              {imagenesCarruselPrincipal.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => fijarIndiceImagenPrincipal(idx)}
                  className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${idx === indiceImagenPrincipal ? "w-6 bg-[#0E5E6F]" : "w-1.5 bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: SERVICIOS CON GALERÍA Y CARRUSEL */}
        <section
          id="servicios"
          className="w-full px-8 lg:px-16 bg-gray-50 border-b-2 border-gray-200 flex flex-col justify-center box-border py-10"
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Título centrado sobre ambos elementos */}
            <div className="w-full text-center mb-10">
              <Title className="text-2xl font-bold text-gray-900 mb-1 normal-case tracking-tight">
                Servicios de la Plataforma
              </Title>
              <Text className="text-gray-500 text-xs max-w-md mx-auto">
                Pilares de infraestructura tecnológica dedicados a la
                agricultura de precisión.
              </Text>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
              {/* Carrusel Izquierdo (App Móvil) - Altura fija de 280px */}
              <div className="w-full lg:w-1/3 max-w-sm relative shrink-0 h-[280px]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md">
                  <img
                    src={imagenesAppMovil[indiceImagenApp].src}
                    alt={imagenesAppMovil[indiceImagenApp].titulo}
                    className="w-full h-full object-cover opacity-80 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                    <span className="text-[10px] font-bold text-[#0E5E6F] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded w-max mb-1">
                      App Móvil
                    </span>
                    <Title
                      as="h3"
                      className="text-lg font-bold text-white normal-case"
                    >
                      {imagenesAppMovil[indiceImagenApp].titulo}
                    </Title>
                    <Text className="text-xs text-gray-300 mt-0.5">
                      {imagenesAppMovil[indiceImagenApp].descripcion}
                    </Text>
                  </div>
                </div>
                {/* Indicadores del carrusel ubicados debajo (fuera del h-[280px] o absolutos) */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1.5">
                  {imagenesAppMovil.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => fijarIndiceImagenApp(idx)}
                      className={`h-1.5 rounded-full transition-all border-0 cursor-pointer ${idx === indiceImagenApp ? "w-6 bg-[#0E5E6F]" : "w-1.5 bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Galería de Servicios (Derecha) - Misma altura de 280px */}
              <div className="w-full lg:w-2/3 relative h-[280px]">
                {/* Degradados laterales para indicar scroll oculto en gris-50 */}
                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                <div
                  ref={refServicios}
                  onMouseDown={(e) => manejarInicioArrastre(e, refServicios)}
                  onMouseLeave={manejarFinArrastre}
                  onMouseUp={manejarFinArrastre}
                  onMouseMove={(e) => manejarArrastre(e, refServicios)}
                  className="flex gap-4 w-full h-full overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6"
                >
                  {datosServicios.map((servicio) => (
                    <div
                      key={servicio.titulo}
                      className="min-w-[260px] w-[260px] h-full shrink-0 snap-center bg-white border-2 border-gray-200 rounded-xl p-6 group hover:border-[#0E5E6F] transition-all shadow-sm flex flex-col items-start justify-center"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 text-[#0E5E6F] group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-[#0E5E6F]">
                        {servicio.icono}
                      </div>
                      <Title
                        as="h3"
                        className="text-sm font-bold mb-2 text-gray-900 normal-case"
                      >
                        {servicio.titulo}
                      </Title>
                      <Text className="text-xs text-gray-600 leading-relaxed">
                        {servicio.descripcion}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: PRECIOS Y EQUIPOS */}
        <section
          id="precios"
          className="w-full bg-white box-border pt-6 pb-12 border-b-2 border-gray-100"
        >
          <div className="max-w-5xl mx-auto w-full px-6">
            <div className="mb-5 text-center">
              <Title className="text-2xl font-bold text-center text-gray-900 mb-1 normal-case tracking-tight">
                Modelos de Inversión Tecnológica
              </Title>
              <Text className="text-center text-gray-500 text-xs">
                Elige el plan operativo mensual o adquiere drones comerciales de
                alto tonelaje.
              </Text>
            </div>

            <div className="flex justify-center mb-5">
              <div
                className="flex bg-gray-100 p-1.5 rounded-xl border-2 border-gray-200 gap-1"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <button
                  onClick={() => {
                    fijarPestanaPrecios("subs");
                    fijarIdTarjetaSeleccionada(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "subs" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                >
                  Suscripciones Mensuales
                </button>
                <button
                  onClick={() => {
                    fijarPestanaPrecios("equipos");
                    fijarIdTarjetaSeleccionada(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "equipos" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                >
                  Equipos Avanzados
                </button>
              </div>
            </div>

            <div className="w-full relative">
              {pestanaPrecios === "subs" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">
                  {datosPlanes.map((plan) => {
                    const estaSeleccionado =
                      idTarjetaSeleccionada === plan.id ||
                      (plan.destacado && !idTarjetaSeleccionada);

                    return (
                      <div
                        key={plan.id}
                        onClick={() => fijarIdTarjetaSeleccionada(plan.id)}
                        className={`border-2 rounded-xl p-3.5 flex flex-col justify-between bg-white h-[260px] cursor-pointer transition-all duration-200 relative ${
                          estaSeleccionado
                            ? "border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {plan.destacado && (
                          <div
                            className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                            style={{
                              fontFamily: "'Instrument Sans', sans-serif",
                            }}
                          >
                            Destacado
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start gap-2 mb-0.5">
                            <Title
                              as="h3"
                              className={`text-xs font-bold normal-case truncate ${estaSeleccionado ? "text-[#0E5E6F]" : "text-gray-900"}`}
                            >
                              {plan.nombre}
                            </Title>
                            <span className="bg-gray-100 text-gray-700 text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border border-gray-200 shrink-0">
                              {plan.etiqueta}
                            </span>
                          </div>

                          <div className="mb-1">
                            <span
                              className="font-black text-lg text-gray-900"
                              style={{
                                fontFamily: "'Lexend Deca', sans-serif",
                              }}
                            >
                              {plan.precio}
                            </span>
                            <span className="text-gray-400 text-[9px] ml-0.5">
                              {plan.periodo}
                            </span>
                          </div>

                          <Text className="text-[10px] text-gray-500 leading-snug mb-2 pb-1 border-b border-gray-100 line-clamp-2">
                            {plan.descripcion}
                          </Text>

                          <ul className="space-y-1">
                            {plan.caracteristicas.map((caracteristica) => (
                              <li
                                key={caracteristica}
                                className="flex items-center gap-1.5"
                              >
                                <CheckCircle
                                  size={10}
                                  className={
                                    estaSeleccionado
                                      ? "text-gray-800"
                                      : "text-gray-400"
                                  }
                                />
                                <Text className="text-[10px] text-gray-600 truncate">
                                  {caracteristica}
                                </Text>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <WireframeButton
                            primary={estaSeleccionado}
                            onClick={(e: any) => {
                              e.stopPropagation();
                              alRegistrar();
                            }}
                            className="w-full rounded-lg text-[10px] py-1.5"
                          >
                            Adquirir Plan
                          </WireframeButton>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* CONTENEDOR HORIZONTAL DE EQUIPOS */
                <div className="relative">
                  {/* Degradados laterales para indicar scroll oculto en blanco */}
                  <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                  <div
                    ref={refDrones}
                    onMouseDown={(e) => manejarInicioArrastre(e, refDrones)}
                    onMouseLeave={manejarFinArrastre}
                    onMouseUp={manejarFinArrastre}
                    onMouseMove={(e) => manejarArrastre(e, refDrones)}
                    className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6"
                  >
                    {datosDrones.map((dron) => {
                      const estaSeleccionado =
                        idTarjetaSeleccionada === dron.id ||
                        (dron.destacado && !idTarjetaSeleccionada);

                      return (
                        <div
                          key={dron.id}
                          onClick={() => fijarIdTarjetaSeleccionada(dron.id)}
                          className={`min-w-[280px] w-[280px] shrink-0 snap-center border-2 rounded-xl overflow-hidden bg-white flex flex-col h-[280px] justify-between transition-all duration-200 relative ${
                            estaSeleccionado
                              ? "border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {dron.destacado && (
                            <div
                              className="absolute top-1.5 left-1.5 z-20 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm"
                              style={{
                                fontFamily: "'Instrument Sans', sans-serif",
                              }}
                            >
                              Destacado
                            </div>
                          )}

                          <div className="h-24 w-full bg-gray-50 border-b border-gray-100 relative shrink-0 pointer-events-none">
                            <img
                              src={dron.imagen}
                              alt={dron.nombre}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display =
                                  "none";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                fijarDronSeleccionado(dron);
                              }}
                              className="absolute top-1.5 right-1.5 z-30 flex items-center justify-center w-6 h-6 rounded-lg bg-white/90 backdrop-blur-md border border-gray-200 text-gray-600 hover:text-[#0E5E6F] hover:bg-white shadow-sm transition-all border-0 cursor-pointer pointer-events-auto"
                              title="Ver información detallada"
                            >
                              <Info size={13} />
                            </button>
                          </div>

                          <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-0.5">
                                <Title
                                  as="h3"
                                  className={`text-xs font-bold normal-case truncate max-w-[70%] ${estaSeleccionado ? "text-[#0E5E6F]" : "text-gray-900"}`}
                                >
                                  {dron.nombre}
                                </Title>
                                <span className="bg-gray-100 text-gray-600 text-[7px] font-bold tracking-wide px-1 py-0.5 rounded border border-gray-200 shrink-0">
                                  {dron.etiqueta}
                                </span>
                              </div>

                              <div className="mb-1">
                                <span
                                  className="font-black text-base text-gray-900"
                                  style={{
                                    fontFamily: "'Lexend Deca', sans-serif",
                                  }}
                                >
                                  {dron.precio}
                                </span>
                              </div>

                              <Text className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2">
                                {dron.descripcion}
                              </Text>

                              <div className="flex flex-wrap gap-1 py-1 border-t border-gray-100">
                                <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded font-medium">
                                  Cap:{" "}
                                  {dron.especificaciones["Capacidad de Carga"]}
                                </span>
                                <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded font-medium">
                                  Aut:{" "}
                                  {dron.especificaciones["Tiempo de Vuelo"]}
                                </span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                              <WireframeButton
                                primary={estaSeleccionado}
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  alRegistrar();
                                }}
                                className="w-full rounded-lg text-[10px] py-1.5 pointer-events-auto"
                              >
                                Cotizar Equipo
                              </WireframeButton>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ─── MODAL HORIZONTAL AMPLIO ─── */}
      {dronSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border-2 border-gray-200 w-full max-w-3xl rounded-2xl p-5 shadow-2xl relative my-auto">
            <div className="flex justify-between items-start border-b border-gray-200 pb-2 mb-3">
              <div>
                <span className="text-[10px] bg-[#0E5E6F]/10 text-[#0E5E6F] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-0.5 inline-block">
                  {dronSeleccionado.etiqueta}
                </span>
                <Title
                  as="h3"
                  className="text-lg font-bold text-gray-900 normal-case"
                >
                  {dronSeleccionado.nombre}
                </Title>
              </div>
              <button
                onClick={() => fijarDronSeleccionado(null)}
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:text-gray-900 font-bold text-xs bg-transparent border-0 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative shadow-sm">
                  <img
                    src={dronSeleccionado.imagen}
                    alt={dronSeleccionado.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div
                    className="absolute bottom-2.5 right-2.5 bg-gray-900/90 backdrop-blur-md text-white font-black text-sm px-3 py-1 rounded-lg shadow-md"
                    style={{ fontFamily: "'Lexend Deca', sans-serif" }}
                  >
                    {dronSeleccionado.precio}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-gray-700 block mb-0.5">
                    Descripción del Equipo:
                  </span>
                  <Text className="text-[11px] text-gray-600 leading-snug bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    {dronSeleccionado.descripcion}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-gray-700 block mb-1">
                    Especificaciones Técnicas Completas:
                  </span>
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-[11px]">
                    {Object.entries(dronSeleccionado.especificaciones).map(
                      ([clave, valor]: any, indice) => (
                        <div
                          key={clave}
                          className={`flex justify-between py-1.5 px-3 ${indice % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-100 last:border-b-0`}
                        >
                          <span className="text-gray-500 font-medium">
                            {clave}
                          </span>
                          <span className="font-bold text-gray-900">
                            {valor}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-3 border-t border-gray-200 pt-3">
                  <WireframeButton
                    onClick={() => fijarDronSeleccionado(null)}
                    className="flex-1 py-2 text-xs rounded-xl bg-white text-gray-700 border-gray-300"
                  >
                    Cerrar
                  </WireframeButton>
                  <WireframeButton
                    primary
                    onClick={() => {
                      fijarDronSeleccionado(null);
                      alRegistrar();
                    }}
                    className="flex-1 py-2 text-xs rounded-xl"
                  >
                    Cotizar Equipo
                  </WireframeButton>
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
type AuthStep = "login" | "register" | "recover" | "verify" | "success";

const AuthView = ({
  initialTab = "login",
  onLogin,
  onRegisterSuccess,
  onBack,
}: {
  initialTab?: "login" | "register";
  onLogin: (r: Role) => void;
  onRegisterSuccess: () => void;
  onBack: () => void;
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>("farmer");
  const [step, setStep] = useState<AuthStep>(initialTab);
  const [recoverMethod, setRecoverMethod] = useState<"email" | "phone">(
    "email",
  );

  // Array de 6 elementos para los cuadros de código
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);

  React.useEffect(() => {
    setStep(initialTab);
  }, [initialTab]);

  const roles: {
    key: Role;
    label: string;
    sub: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "farmer",
      label: "Agricultor",
      sub: "Solicita y monitorea vuelos de precisión",
      icon: <Layers size={14} />,
    },
    {
      key: "pilot",
      label: "Piloto de Drones",
      sub: "Gestiona misiones y planes de vuelo",
      icon: <Navigation size={14} />,
    },
    {
      key: "admin",
      label: "Administrador",
      sub: "Control operativo integral",
      icon: <Shield size={14} />,
    },
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSuccessFinish = () => {
    setCodeDigits(["", "", "", "", "", ""]);
    setStep("login");
    if (onRegisterSuccess) onRegisterSuccess();
  };

  return (
    <div
      key="auth-card-root"
      className="w-full max-w-4xl mx-auto p-6 bg-white antialiased select-none"
    >
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {/* ENCABEZADO PRINCIPAL */}
        {step !== "success" && (
          <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
            <div className="text-left">
              <Title className="text-lg text-[#0E5E6F] font-black tracking-tight mb-0.5">
                BioDron
              </Title>
              <Text className="text-[10px] text-gray-400 font-bold tracking-widest">
                Plataforma de Infraestructura Autónoma
              </Text>
            </div>

            {(step === "login" || step === "register") && (
              <div
                className="flex bg-gray-200/60 p-1 rounded-xl border-2 border-gray-200 w-64 gap-1 shrink-0"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <button
                  onClick={() => setStep("login")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${step === "login" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                >
                  Ingresar
                </button>
                <button
                  onClick={() => setStep("register")}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${step === "register" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
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
          {step === "login" && (
            <div className="grid grid-cols-2 divide-x-2 divide-gray-100 items-start flex-1">
              <div className="p-6 flex flex-col justify-between gap-3 bg-gray-50/30 self-stretch">
                <div>
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3 text-left">
                    1. Elige tu Rol Operativo
                  </Text>
                  <div className="flex flex-col gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => setSelectedRole(r.key)}
                        className={`flex items-center gap-3 p-2 rounded-xl border-2 text-left transition-all bg-white active:scale-[0.99] ${
                          selectedRole === r.key
                            ? "border-[#0E5E6F] shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                      >
                        <div
                          className={`p-1.5 rounded-lg border-2 shrink-0 transition-colors ${
                            selectedRole === r.key
                              ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                              : "bg-gray-50 text-gray-400 border-gray-200"
                          }`}
                        >
                          {r.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text
                            className={`font-bold text-xs ${selectedRole === r.key ? "text-[#0E5E6F]" : "text-gray-800"}`}
                          >
                            {r.label}
                          </Text>
                          <Text className="text-[10px] text-gray-400 truncate block mt-0.5">
                            {r.sub}
                          </Text>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between gap-4 self-stretch">
                <div className="space-y-3">
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">
                    2. Credenciales de Acceso
                  </Text>
                  <div className="space-y-1">
                    <WireframeInput
                      label="Correo Electrónico"
                      placeholder="usuario@ejemplo.hn"
                    />
                    <WireframeInput
                      label="Contraseña"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div
                  className="flex items-center justify-between gap-2 select-none mb-2"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-3.5 h-3.5 rounded border-2 border-gray-300 text-[#0E5E6F] accent-[#0E5E6F] cursor-pointer"
                    />
                    <span className="text-[11px] text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                      Recordarme en este equipo
                    </span>
                  </label>
                  <button
                    onClick={() => setStep("recover")}
                    className="text-[#0E5E6F] font-black cursor-pointer hover:underline uppercase tracking-widest text-[9px] bg-transparent border-none outline-none"
                  >
                    Recuperar clave
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: REGISTRO */}
          {step === "register" && (
            <div className="grid grid-cols-2 divide-x-2 divide-gray-100 items-start flex-1">
              <div className="p-6 flex flex-col justify-start gap-3 bg-gray-50/30 self-stretch">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">
                      1. Perfil e Identidad
                    </Text>

                    <div
                      className="flex bg-gray-200/60 p-0.5 rounded-lg border-2 border-gray-200 w-44 gap-0.5"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      {(["farmer", "pilot", "admin"] as Role[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => setSelectedRole(r)}
                          className={`flex-1 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-center transition-all ${
                            selectedRole === r
                              ? "bg-[#0E5E6F] text-white shadow-sm"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {r === "farmer"
                            ? "Agri"
                            : r === "pilot"
                              ? "Piloto"
                              : "Admin"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <WireframeInput label="Nombre" placeholder="Nombre" />
                    <WireframeInput label="Apellido" placeholder="Apellido" />
                  </div>

                  <WireframeInput
                    label="Correo Electrónico"
                    placeholder="usuario@ejemplo.hn"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between gap-3 self-stretch">
                <div className="space-y-2">
                  <Text className="text-[9px] font-black text-gray-400 uppercase tracking-widest block text-left">
                    2. Credenciales y Operación
                  </Text>

                  {selectedRole === "pilot" ? (
                    <div className="animate-in fade-in duration-150">
                      <WireframeInput
                        label="Licencia Piloto (ID)"
                        placeholder="HN-PILOT-0001"
                      />
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-150">
                      <WireframeInput
                        label="Ubicación"
                        placeholder="Juticalpa, Olancho"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <WireframeInput
                      label="Teléfono"
                      placeholder="+504 9999-0000"
                    />
                    <WireframeInput
                      label="Contraseña"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-2 mt-auto">
                  <p className="text-[9px] text-gray-400 text-left leading-normal italic border-t border-gray-100 pt-2">
                    * La información ingresada pasará por una revisión de
                    auditoría previa al despliegue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: FORMULARIO DE RECUPERACIÓN DE CLAVE */}
          {step === "recover" && (
            <div className="p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-4 animate-in fade-in duration-200">
              <div className="p-3 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-full border-2 border-[#0E5E6F]/20">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <Title className="text-base text-gray-800 font-black">
                  Recuperación de Cuenta
                </Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Selecciona el canal para la entrega del código único de
                  restablecimiento.
                </p>
              </div>

              {/* Selector de método */}
              <div
                className="flex bg-gray-100 p-1 rounded-xl border-2 border-gray-200 w-full gap-1"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <button
                  onClick={() => setRecoverMethod("email")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${recoverMethod === "email" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                >
                  Correo Electrónico
                </button>
                <button
                  onClick={() => setRecoverMethod("phone")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${recoverMethod === "phone" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                >
                  Teléfono Móvil
                </button>
              </div>

              <div className="w-full text-left">
                {recoverMethod === "email" ? (
                  <WireframeInput
                    label="Dirección de Correo Registrada"
                    placeholder="usuario@ejemplo.hn"
                  />
                ) : (
                  <WireframeInput
                    label="Número de Teléfono Registrado"
                    placeholder="+504 9999-0000"
                  />
                )}
              </div>
            </div>
          )}

          {/* PASO 4: PANTALLA DE INGRESO DE CÓDIGO (6 CUADROS CON NÚMEROS DE EJEMPLO) */}
          {step === "verify" && (
            <div className="p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-5 animate-in fade-in duration-200">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-full border-2 border-amber-200">
                <Shield size={24} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <Title className="text-base text-gray-800 font-black">
                  Verificación de Seguridad
                </Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Hemos enviado un código único de verificación. Ingrésalo a
                  continuación para continuar.
                </p>
              </div>

              {/* Casillas individuales con placeholders numéricos correlativos */}
              <div
                className="flex gap-2 justify-center py-2"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
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
          {step === "success" && (
            <div className="p-8 flex flex-col items-center justify-center text-center max-w-sm mx-auto my-auto space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full border-2 border-emerald-200 shadow-sm">
                <Check size={32} />
              </div>
              <div className="space-y-1.5">
                <Title className="text-lg text-[#0E5E6F] font-black tracking-tight">
                  ¡Operación Completada!
                </Title>
                <p className="text-xs text-gray-500 leading-relaxed">
                  La identidad ha sido confirmada con éxito. Los parámetros de
                  seguridad y acceso han sido restablecidos correctamente.
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
        {step !== "success" && (
          <div className="border-t-2 border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                if (step === "verify") setStep("register");
                else if (step === "recover") setStep("login");
                else onBack();
              }}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-[10px] font-black uppercase tracking-wider transition-colors"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <ChevronLeft size={13} />{" "}
              {step === "verify" || step === "recover"
                ? "Regresar"
                : "Cancelar"}
            </button>

            <div className="flex items-center gap-4">
              {(step === "login" || step === "register") && (
                <Text
                  className="text-xs text-gray-400 hidden sm:block"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {step === "login"
                    ? "¿No tienes cuenta?"
                    : "¿Ya eres miembro?"}{" "}
                  <a
                    onClick={() =>
                      setStep(step === "login" ? "register" : "login")
                    }
                    className="text-[#0E5E6F] font-black cursor-pointer hover:underline"
                  >
                    {step === "login" ? "Crear una" : "Ingresar"}
                  </a>
                </Text>
              )}

              <WireframeButton
                primary
                onClick={() => {
                  if (step === "login") onLogin(selectedRole);
                  else if (step === "register") setStep("verify");
                  else if (step === "recover") setStep("verify");
                  else if (step === "verify") setStep("success");
                }}
                className="text-[10px] font-black py-2 px-5 rounded-lg tracking-wider uppercase border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white transition-transform active:scale-[0.98]"
              >
                {step === "login"
                  ? "INGRESAR AL SISTEMA"
                  : step === "register"
                    ? "CONFIRMAR REGISTRO"
                    : step === "recover"
                      ? "ENVIAR CÓDIGO"
                      : "VERIFICAR CÓDIGO"}
              </WireframeButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 3. ADMIN DASHBOARD (HOME) — Panel Operativo con Gráficos Integrados
// ═══════════════════════════════════════════════════════════════════════
export const HomeView = ({
  onSelectService,
}: {
  onSelectService: (type: string) => void;
}) => {
  // Pestaña inicial
  const [activeTab, setActiveTab] = useState<string>("analitica");

  // Estado para el simulador de rendimiento interactivo
  const [bateria, setBateria] = useState<number>(100);
  const [viento, setViento] = useState<number>(12);
  const [carga, setCarga] = useState<number>(150);
  const [temperatura, setTemperatura] = useState<number>(28);
  const [altitudObjetivo, setAltitudObjetivo] = useState<number>(120);

  // Estados para Tooltips
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Datos Falsos: Flota y Unidades
  const [drones, setDrones] = useState([
    { id: 1, drone: "DJI FlyCart 30", pilot: "Javier Reyes", status: "Activo", bateria: "92%", altitud: "120m", ubicacion: "Sector Norte", conexion: "Excelente" },
    { id: 2, drone: "Ehang 184", pilot: "Carlos Sosa", status: "En vuelo", bateria: "78%", altitud: "250m", ubicacion: "Amarateca", conexion: "Buena" },
    { id: 3, drone: "GRIFF Aviation 300", pilot: "— Sin asignar —", status: "Libre", bateria: "100%", altitud: "0m", ubicacion: "Base Central", conexion: "Standby" },
    { id: 4, drone: "Agras T40", pilot: "María Fernanda", status: "Mantenimiento", bateria: "45%", altitud: "0m", ubicacion: "Taller A", conexion: "Desconectado" },
    { id: 5, drone: "DJI Agras T30", pilot: "Andrea Valladares", status: "Activo", bateria: "88%", altitud: "90m", ubicacion: "El Hatillo", conexion: "Excelente" },
  ]);

  // Datos Falsos: Mapa y Geocercas Activas
  const geocercasActivas = [
    { id: 1, zona: "Sector Norte - Tegucigalpa", dron: "Ehang 184", estado: "Monitoreo Activo", riesgo: "Bajo", latLng: "14.1050° N, 87.2050° W", clima: "Despejado, 24°C" },
    { id: 2, zona: "Valle de Amarateca (Agro)", dron: "DJI FlyCart 30", estado: "Riego en Progreso", riesgo: "Medio", latLng: "14.2100° N, 87.3100° W", clima: "Ventoso, 27°C" },
    { id: 3, zona: "Reserva El Hatillo", dron: "DJI Agras T30", estado: "Vuelo de Inspección", riesgo: "Bajo", latLng: "14.1420° N, 87.1650° W", clima: "Húmedo, 20°C" },
    { id: 4, zona: "Zona Industrial Sur", dron: "GRIFF Aviation 300", estado: "Standby / Base", riesgo: "Nulo", latLng: "14.0500° N, 87.2100° W", clima: "Despejado, 26°C" },
  ];

  // Datos Falsos: Analítica
  const misionesSemana = [
    { day: "Lun", completadas: 45, meta: 50, canceladas: 2 },
    { day: "Mar", completadas: 65, meta: 60, canceladas: 0 },
    { day: "Mié", completadas: 35, meta: 50, canceladas: 5 },
    { day: "Jue", completadas: 80, meta: 75, canceladas: 1 },
    { day: "Vie", completadas: 55, meta: 60, canceladas: 3 },
    { day: "Sáb", completadas: 90, meta: 85, canceladas: 0 },
    { day: "Dom", completadas: 40, meta: 45, canceladas: 1 },
  ];

  const financieroMensual = [
    { mes: "Feb", ingresos: 125000, costos: 45000, operativos: 20000 },
    { mes: "Mar", ingresos: 142000, costos: 48000, operativos: 21000 },
    { mes: "Abr", ingresos: 135000, costos: 52000, operativos: 25000 },
    { mes: "May", ingresos: 180000, costos: 55000, operativos: 28000 },
    { mes: "Jun", ingresos: 195000, costos: 60000, operativos: 30000 },
    { mes: "Jul", ingresos: 210000, costos: 65000, operativos: 32000 },
  ];

  const topPilotos = [
    { id: 1, nombre: "Javier Reyes", misiones: 142, horas: 320, eficiencia: 98, rating: 4.9, especialidad: "Transporte Pesado" },
    { id: 2, nombre: "Andrea Valladares", misiones: 115, horas: 285, eficiencia: 95, rating: 4.8, especialidad: "Riego Agrícola" },
    { id: 3, nombre: "Luis Fernando", misiones: 98, horas: 210, eficiencia: 92, rating: 4.6, especialidad: "Fumigación" },
    { id: 4, nombre: "Carlos Sosa", misiones: 88, horas: 195, eficiencia: 94, rating: 4.7, especialidad: "Rescate Táctico" },
  ];

  const serviciosStats = [
    { label: "Riego de Precisión", percent: 45, color: "bg-[#2994B2]", ingresos: "L 94,500", horas: "120h" },
    { label: "Fumigación Controlada", percent: 30, color: "bg-[#0E5E6F]", ingresos: "L 63,000", horas: "85h" },
    { label: "Transporte de Carga", percent: 15, color: "bg-[#B165E0]", ingresos: "L 31,500", horas: "40h" },
    { label: "Búsqueda y Rescate", percent: 10, color: "bg-amber-500", ingresos: "L 21,000", horas: "25h" }
  ];

  const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
  const [editingDrone, setEditingDrone] = useState<any | null>(null);
  const [selectedDroneId, setSelectedDroneId] = useState<number>(3);
  const [newPilotName, setNewPilotName] = useState<string>("");

  // Lógica del simulador
  const autonomiaBase = 55;
  const penalizacionViento = (viento / 50) * 15;
  const penalizacionCarga = (carga / 500) * 25;
  const penalizacionTemperatura = temperatura > 35 ? (temperatura - 35) * 1.5 : temperatura < 10 ? (10 - temperatura) * 1.2 : 0;
  const penalizacionAltitud = (altitudObjetivo / 500) * 5;
  
  const factorBateria = bateria / 100;
  const autonomiaEstimada = Math.max(0, Math.round((autonomiaBase - penalizacionViento - penalizacionCarga - penalizacionTemperatura - penalizacionAltitud) * factorBateria));
  const hectareasEstimadas = Math.max(0, Number((autonomiaEstimada * 1.2).toFixed(1)));
  const porcentajeProgreso = Math.min(100, Math.max(0, (autonomiaEstimada / 55) * 100));

  const handleSaveStatus = (id: number, newStatus: string, newPilot: string) => {
    setDrones((prev) => prev.map((d) => d.id === id ? { ...d, status: newStatus, pilot: newPilot } : d));
    setEditingDrone(null);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPilotName.trim()) return;
    setDrones((prev) => prev.map((d) => d.id === selectedDroneId ? { ...d, pilot: newPilotName, status: "Activo" } : d));
    setNewPilotName("");
    setIsAssignModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo": return "text-green-700 bg-green-50 border-green-200";
      case "En vuelo": return "text-blue-700 bg-blue-50 border-blue-200";
      case "Libre": return "text-gray-500 bg-gray-100 border-gray-200";
      case "Mantenimiento": return "text-amber-700 bg-amber-50 border-amber-200";
      default: return "text-gray-500 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-white antialiased">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-200 shrink-0 select-none">
        <div className="text-left space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Principal</h1>
          <p className="text-gray-400 text-xs font-bold tracking-wider">
            Panel de control operativo — Administración general y telemetría
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-gray-300 transition-colors active:scale-95">
            <Bell size={16} className="text-gray-500" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-black shadow-sm">
              3
            </span>
          </button>
          <div className="bg-[#0E5E6F]/5 border-2 border-[#0E5E6F]/20 text-[#0E5E6F] px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm">
            <span className="w-2 h-2 bg-[#0E5E6F] rounded-full animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest">
              3 Drones en vuelo
            </span>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN POR PESTAÑAS (TABS) */}
      <div className="flex overflow-x-auto gap-2 mb-8 border-b-2 border-gray-100 pb-2 custom-scrollbar">
        {[
          { id: "analitica", label: "Analítica del Negocio", icon: <TrendingUp size={14} /> },
          { id: "mapa", label: "Mapa en Vivo", icon: <MapPin size={14} /> },
          { id: "telemetria", label: "Simulador de Vuelo", icon: <Zap size={14} /> },
          { id: "flota", label: "Flota y Pilotos", icon: <Layers size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-[#0E5E6F] text-white shadow-md scale-100"
                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-800 scale-95"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CONTENIDO DE LAS PESTAÑAS */}
      {/* ========================================================================= */}
      <div className="min-h-[500px] mb-10">

        {/* PESTAÑA 1: ANALÍTICA DEL NEGOCIO */}
        {activeTab === "analitica" && (
          <div className="space-y-6 text-left animate-in fade-in duration-500">
            {/* FILA 1: Misiones y Distribución */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="mb-8 flex justify-between items-start relative z-10">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Rendimiento Semanal</h3>
                    <p className="text-[11px] text-gray-400 mt-1">Misiones completadas vs Meta operativa (Productividad)</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#0E5E6F]"></span> Completadas</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-gray-200"></span> Meta</span>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between h-56 gap-3 pt-4 pb-2 relative z-10">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    {[100, 75, 50, 25, 0].map((val) => (
                      <div key={val} className="w-full flex items-center gap-2 opacity-30">
                        <span className="text-[9px] font-mono text-gray-400 w-4">{val}</span>
                        <div className="flex-1 border-t border-dashed border-gray-300"></div>
                      </div>
                    ))}
                  </div>
                  
                  {misionesSemana.map((d, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center gap-3 flex-1 h-full relative group cursor-pointer z-20"
                      onMouseEnter={() => setHoveredDay(i)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {hoveredDay === i && (
                        <div className="absolute -top-20 z-30 bg-gray-900 text-white p-3 rounded-xl text-xs shadow-2xl w-40 animate-in fade-in zoom-in-95 pointer-events-none">
                          <p className="font-bold border-b border-gray-700 pb-1.5 mb-1.5 flex justify-between items-center">
                            Día {d.day} <span className="text-[9px] text-gray-400 font-mono">Semana 12</span>
                          </p>
                          <p className="flex justify-between items-center"><span className="text-gray-400">Completadas:</span> <span className="font-bold text-green-400">{d.completadas}</span></p>
                          <p className="flex justify-between items-center"><span className="text-gray-400">Meta Base:</span> <span>{d.meta}</span></p>
                          <p className="flex justify-between items-center mt-1 pt-1 border-t border-gray-800"><span className="text-gray-400">Canceladas:</span> <span className="text-red-400 font-bold">{d.canceladas}</span></p>
                        </div>
                      )}
                      <div className="w-full relative flex items-end justify-center h-[calc(100%-24px)] group-hover:scale-x-110 transition-transform">
                        <div className="absolute w-3/4 bg-gray-100 rounded-t-lg transition-all" style={{ height: `${d.meta}%` }}></div>
                        <div className={`absolute w-3/4 rounded-t-lg transition-all duration-700 shadow-sm ${d.completadas >= d.meta ? 'bg-[#0E5E6F]' : 'bg-[#2994B2]'}`} style={{ height: `${d.completadas}%` }}></div>
                      </div>
                      <span className={`text-[11px] font-black transition-colors ${hoveredDay === i ? 'text-[#0E5E6F]' : 'text-gray-400'}`}>{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Desglose Operativo</h3>
                    <p className="text-[11px] text-gray-400 mt-1">Facturación y uso por tipo de servicio (Mes actual)</p>
                  </div>
                  <div className="p-2 bg-[#0E5E6F]/5 border border-[#0E5E6F]/20 rounded-lg text-[#0E5E6F]"><Layers size={18} /></div>
                </div>
                <div className="space-y-6 flex-1 flex flex-col justify-center">
                  {serviciosStats.map((s, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-gray-700 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${s.color} shadow-sm group-hover:scale-150 transition-transform`}></span>
                          {s.label}
                        </span>
                        <div className="flex gap-4 font-black">
                          <span className="text-gray-400 flex items-center gap-1"><Clock size={12}/> {s.horas}</span>
                          <span className="text-gray-900 w-16 text-right">{s.ingresos}</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden relative">
                        <div className={`absolute top-0 left-0 h-full ${s.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${s.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FILA 2: Financiero */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm relative">
              <div className="mb-8 flex justify-between items-center relative z-10">
                <div>
                  <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={18} className="text-[#0E5E6F]" />
                    Balance Financiero Semestral
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">Comparativa de ingresos brutos vs costos totales (HNL)</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#0E5E6F]"></span> Ingresos</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400"></span> Costos Totales</span>
                </div>
              </div>
              <div className="h-72 flex items-end gap-4 sm:gap-6 pt-4 pb-2 relative z-10">
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    {['L 250k', 'L 185k', 'L 125k', 'L 60k', 'L 0'].map((val) => (
                      <div key={val} className="w-full flex items-center gap-2 opacity-30">
                        <span className="text-[9px] font-mono text-gray-400 w-10 text-right">{val}</span>
                        <div className="flex-1 border-t border-dashed border-gray-300"></div>
                      </div>
                    ))}
                  </div>

                {financieroMensual.map((data, i) => {
                  const maxVal = 250000;
                  const hIngreso = (data.ingresos / maxVal) * 100;
                  const hCosto = ((data.costos + data.operativos) / maxVal) * 100;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 flex flex-col items-center gap-3 h-[calc(100%-24px)] relative group z-20"
                      onMouseEnter={() => setHoveredMonth(i)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {hoveredMonth === i && (
                        <div className="absolute -top-24 z-30 bg-white border-2 border-gray-200 p-4 rounded-xl text-xs shadow-2xl w-48 animate-in fade-in zoom-in-95 pointer-events-none">
                          <p className="font-black text-gray-800 border-b border-gray-100 pb-2 mb-2 flex items-center justify-between">
                            {data.mes} 2026
                            <span className="text-[9px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-bold">+12%</span>
                          </p>
                          <p className="flex justify-between text-gray-500 mb-1">Ingresos: <span className="text-[#0E5E6F] font-bold">L {data.ingresos.toLocaleString()}</span></p>
                          <p className="flex justify-between text-gray-500 mb-1">Costos: <span className="text-red-400 font-bold">L {(data.costos + data.operativos).toLocaleString()}</span></p>
                          <p className="flex justify-between text-gray-900 mt-2 pt-2 border-t border-gray-50 font-black">Utilidad Neta: <span className="text-green-600">L {(data.ingresos - (data.costos + data.operativos)).toLocaleString()}</span></p>
                        </div>
                      )}
                      <div className="w-full flex justify-center items-end gap-1 sm:gap-2 h-full">
                        <div className="w-2/5 bg-[#0E5E6F] rounded-t-md transition-all duration-700 group-hover:bg-[#094350]" style={{ height: `${hIngreso}%` }}></div>
                        <div className="w-2/5 bg-red-400 rounded-t-md transition-all duration-700 group-hover:bg-red-500" style={{ height: `${hCosto}%` }}></div>
                      </div>
                      <span className={`text-[11px] font-black uppercase transition-colors ${hoveredMonth === i ? 'text-[#0E5E6F]' : 'text-gray-500'}`}>{data.mes}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: MAPA EN VIVO */}
        {activeTab === "mapa" && (
          <div className="space-y-6 text-left animate-in fade-in duration-300">
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#0E5E6F]" size={18} />
                  <h3 className="text-sm font-bold text-gray-800 normal-case tracking-tight">Geocercas y Posicionamiento Global</h3>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Sistema Satelital Activo
                </span>
              </div>
              
              {/* Contenedor del Mapa Principal */}
              <div className="relative w-full h-[450px] bg-gray-200 flex items-center justify-center overflow-hidden border-b-2 border-gray-100">
                <img
                  src="src/img/drones_activos.png"
                  alt="Radar Drones Activos"
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://via.placeholder.com/1200x500?text=Mapa+Satélital+Activo+-+Radar";
                  }}
                />
              </div>

              {/* Tabla de Zonas Activas Optimizada */}
              <div className="p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Zonas de Vigilancia Activa en el Territorio</h4>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-400 uppercase font-black border-b border-gray-200 text-[10px] tracking-wider">
                      <tr>
                        <th className="px-3 py-2 whitespace-nowrap">Zona / Sector</th>
                        <th className="px-3 py-2 whitespace-nowrap">Clima</th>
                        <th className="px-3 py-2 whitespace-nowrap">Unidad Asignada</th>
                        <th className="px-3 py-2 whitespace-nowrap">Estado Operativo</th>
                        <th className="px-3 py-2 whitespace-nowrap text-center">Riesgo</th>
                        <th className="px-3 py-2 whitespace-nowrap text-right">Coordenadas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {geocercasActivas.map((g) => (
                        <tr key={g.id} className="hover:bg-[#0E5E6F]/5 transition-colors">
                          <td className="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">{g.zona}</td>
                          <td className="px-3 py-2.5 text-gray-500 text-[11px] whitespace-nowrap flex items-center gap-1.5"><Wind size={12}/> {g.clima}</td>
                          <td className="px-3 py-2.5 text-[#0E5E6F] font-bold whitespace-nowrap">{g.dron}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-bold text-[10px] uppercase">{g.estado}</span></td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-center">
                            <span className={`px-2 py-0.5 rounded font-black text-[10px] uppercase ${g.riesgo === 'Medio' ? 'bg-amber-100 text-amber-700' : g.riesgo === 'Bajo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                              {g.riesgo}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right font-mono text-gray-500 whitespace-nowrap">{g.latLng}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 3: SIMULADOR DE VUELO (REORDENADO Y SIMPLIFICADO) */}
        {activeTab === "telemetria" && (
          <div className="space-y-6 text-left animate-in fade-in duration-300">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Zap className="text-[#0E5E6F]" size={20} /> Simulador Avanzado de Rendimiento y Autonomía
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Panel de Controles */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4 border-b border-gray-200 pb-2">Variables Ambientales y de Carga</h4>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5"><Radio size={14}/> Batería de la Unidad</label>
                      <span className="text-xs font-mono font-black text-[#0E5E6F]">{bateria}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={bateria} onChange={(e) => setBateria(Number(e.target.value))} className="w-full accent-[#0E5E6F] h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5"><Wind size={14}/> Velocidad del Viento</label>
                      <span className="text-xs font-mono font-black text-[#2994B2]">{viento} km/h</span>
                    </div>
                    <input type="range" min="0" max="50" value={viento} onChange={(e) => setViento(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-[#2994B2]" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5"><Package size={14}/> Carga Útil</label>
                      <span className="text-xs font-mono font-black text-[#B165E0]">{carga} lbs</span>
                    </div>
                    <input type="range" min="0" max="500" value={carga} onChange={(e) => setCarga(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-[#B165E0]" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1"><Thermometer size={12}/> Temperatura</label>
                      </div>
                      <input type="range" min="0" max="45" value={temperatura} onChange={(e) => setTemperatura(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-amber-500" />
                      <p className="text-right text-[10px] font-mono font-black text-amber-600 mt-1">{temperatura}°C</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1"><ArrowUp size={12}/> Altitud Obj.</label>
                      </div>
                      <input type="range" min="0" max="500" value={altitudObjetivo} onChange={(e) => setAltitudObjetivo(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-blue-500" />
                      <p className="text-right text-[10px] font-mono font-black text-blue-600 mt-1">{altitudObjetivo} m</p>
                    </div>
                  </div>
                </div>

                {/* Panel de Resultados (Gráfico arriba, tarjetas abajo) */}
                <div className="flex flex-col items-center justify-start gap-8 bg-white border-2 border-gray-100 p-8 rounded-2xl shadow-inner">
                  
                  {/* Gauge Principal (Liso) */}
                  <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                    <svg className="w-36 h-36 transform -rotate-90 drop-shadow-sm" viewBox="0 0 36 36">
                      <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className={`${autonomiaEstimada < 15 ? 'text-red-500' : 'text-[#0E5E6F]'} transition-all duration-500 ease-out`} strokeDasharray={`${porcentajeProgreso}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center space-y-1">
                      <span className={`text-5xl font-black tracking-tighter ${autonomiaEstimada < 15 ? 'text-red-500' : 'text-gray-900'}`}>{autonomiaEstimada}</span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Minutos</span>
                    </div>
                  </div>

                  {/* Resultados Detallados (Abajo del Gauge) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 hover:border-[#0E5E6F]/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Layers size={16} className="text-[#0E5E6F]" />
                        <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Cobertura Máx.</p>
                      </div>
                      <span className="text-lg font-black text-gray-900">{hectareasEstimadas} <span className="text-xs font-bold text-gray-400 font-mono">Hectáreas</span></span>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 hover:border-[#0E5E6F]/30 transition-colors">
                      <div className="flex items-center gap-2">
                         <AlertCircle size={16} className={viento > 35 || carga > 400 || temperatura > 38 ? 'text-red-500' : 'text-green-500'} />
                         <p className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Diagnóstico</p>
                      </div>
                      <span className={`text-sm font-black uppercase ${viento > 35 || carga > 400 || temperatura > 38 ? "text-red-600" : "text-green-600"}`}>
                        {viento > 35 || carga > 400 || temperatura > 38 ? "⚠️ Estrés Crítico" : "✓ Estable"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 4: FLOTA Y PILOTOS (TABLAS COMPACTAS) */}
        {activeTab === "flota" && (
          <div className="space-y-6 text-left animate-in fade-in duration-300">
            
            {/* Tabla 1: Asignación de Flota */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 normal-case tracking-tight">Gestión de Flota y Carga Pesada</h3>
                  <p className="text-[11px] text-gray-400">Unidades de transporte y estado operativo actual en tiempo real</p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-[10px] border-2 border-[#0E5E6F] bg-[#0E5E6F] hover:bg-[#094350] text-white font-black uppercase tracking-wider py-2.5 px-5 rounded-xl active:scale-95 transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                >
                  <UserPlus size={14} /> Asignar Unidad
                </button>
              </div>

              {/* Contenedor optimizado para evitar scroll horizontal con padding reducido */}
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white text-gray-400 uppercase font-black border-b border-gray-100 text-[10px] tracking-wider">
                    <tr>
                      <th className="px-3 py-2 whitespace-nowrap">Modelo de Dron</th>
                      <th className="px-3 py-2 whitespace-nowrap">Piloto a Cargo</th>
                      <th className="px-3 py-2 whitespace-nowrap">Ubicación</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Telemetría</th>
                      <th className="px-3 py-2 text-center whitespace-nowrap">Estado</th>
                      <th className="px-3 py-2 text-right whitespace-nowrap">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {drones.map((item) => (
                      <tr key={item.id} className="hover:bg-[#0E5E6F]/5 transition-colors group">
                        <td className="px-3 py-2.5 font-bold text-gray-800 flex items-center gap-2 whitespace-nowrap">
                          <div className="w-7 h-7 bg-gray-50 border border-gray-200 rounded flex items-center justify-center text-[#0E5E6F] group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors">
                            <Radio size={12} />
                          </div>
                          {item.drone}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700 font-semibold whitespace-nowrap">{item.pilot}</td>
                        <td className="px-3 py-2.5 text-gray-500 text-[11px] font-medium whitespace-nowrap">
                          <span className="flex items-center gap-1"><MapPin size={10}/> {item.ubicacion}</span>
                        </td>
                        <td className="px-3 py-2.5 text-center whitespace-nowrap">
                           <div className="flex flex-col items-center gap-0.5">
                             <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1"><Zap size={10} className="text-amber-500"/> {item.bateria}</span>
                             <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1"><ArrowUp size={10} className="text-blue-500"/> {item.altitud}</span>
                           </div>
                        </td>
                        <td className="px-3 py-2.5 text-center whitespace-nowrap">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 border rounded ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">
                          <button onClick={() => setEditingDrone(item)} className="px-3 py-1.5 border border-gray-200 hover:border-[#0E5E6F] hover:text-[#0E5E6F] bg-white hover:bg-[#0E5E6F]/5 rounded transition-all text-gray-500 font-bold inline-flex items-center gap-1.5 shadow-sm text-[11px]">
                            <Edit3 size={12} /> Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabla 2: Ranking de Pilotos y Alertas de Mantenimiento */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b-2 border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Ranking de Pilotos Activos</h3>
                    <p className="text-[11px] text-gray-400">Rendimiento, horas acumuladas y especialidades</p>
                  </div>
                  <Star size={18} className="text-amber-400 fill-amber-400/20" />
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white text-[10px] uppercase text-gray-400 border-b border-gray-100 font-black tracking-wider">
                      <tr>
                        <th className="px-3 py-2 whitespace-nowrap">Piloto Registrado</th>
                        <th className="px-3 py-2 whitespace-nowrap">Especialidad</th>
                        <th className="px-3 py-2 text-center whitespace-nowrap">Misiones</th>
                        <th className="px-3 py-2 text-center whitespace-nowrap">Horas</th>
                        <th className="px-3 py-2 text-center whitespace-nowrap">Eficiencia</th>
                        <th className="px-3 py-2 text-center whitespace-nowrap">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {topPilotos.map((piloto) => (
                        <tr key={piloto.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-3 py-2.5 font-bold text-gray-800 flex items-center gap-2 whitespace-nowrap text-xs">
                            <div className="w-6 h-6 rounded-full bg-[#0E5E6F]/10 text-[#0E5E6F] flex items-center justify-center text-[10px] font-black">
                              {piloto.nombre.charAt(0)}
                            </div>
                            {piloto.nombre}
                          </td>
                          <td className="px-3 py-2.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">{piloto.especialidad}</td>
                          <td className="px-3 py-2.5 text-center text-gray-600 font-bold whitespace-nowrap text-xs">{piloto.misiones}</td>
                          <td className="px-3 py-2.5 text-center text-gray-500 font-mono text-[11px] whitespace-nowrap">{piloto.horas}h</td>
                          <td className="px-3 py-2.5 text-center whitespace-nowrap">
                            <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-black border border-green-100">
                              {piloto.eficiencia}%
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-center text-amber-500 font-black flex items-center justify-center gap-1 whitespace-nowrap text-xs">
                            {piloto.rating} <Star size={12} className="fill-amber-500" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tarjeta de Mantenimiento */}
              <div className="bg-gradient-to-br from-[#0E5E6F] to-[#094350] rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -top-8 opacity-10 pointer-events-none transform rotate-12">
                  <Radio size={180} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={18} className="text-red-400 animate-pulse" />
                      <h3 className="text-sm font-bold text-white tracking-wide">Centro de Mantenimiento</h3>
                    </div>
                    <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">2 ALERTAS</span>
                  </div>
                  <p className="text-[11px] text-[#2994B2] mb-6 font-medium">Diagnósticos programados en taller A</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer">
                      <p className="text-xs font-black mb-1.5 flex justify-between">Agras T40 (U-04) <span className="text-[9px] text-red-300 bg-red-900/40 px-1.5 rounded">URGENTE</span></p>
                      <p className="text-[10px] text-gray-300 flex items-center gap-1.5 font-medium"><Clock size={12}/> Revisión obligatoria de rotores en 12 hrs</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer">
                      <p className="text-xs font-black mb-1.5 flex justify-between">Ehang 184 (U-02) <span className="text-[9px] text-amber-300 bg-amber-900/40 px-1.5 rounded">PREVENTIVO</span></p>
                      <p className="text-[10px] text-gray-300 flex items-center gap-1.5 font-medium"><Zap size={12}/> Calibración de celdas de batería sugerida</p>
                    </div>
                  </div>
                </div>
                <button className="relative z-10 mt-6 w-full py-3 bg-white text-[#0E5E6F] text-[11px] font-black uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-2">
                  <Edit3 size={14}/> Programar Mantenimiento
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* MÓDULOS DE SERVICIO */}
      <div className="shrink-0 select-none text-left border-t-2 border-gray-100 pt-8 mt-4">
        <h3 className="text-sm font-bold text-gray-400 mb-5 uppercase tracking-wider">
          Acciones Rápidas: Desplegar Nuevo Servicio
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Search size={20} />, title: "Búsqueda y Rescate", type: "busqueda" },
            { icon: <Droplet size={20} />, title: "Riego de Precisión", type: "riego" },
            { icon: <Wind size={20} />, title: "Fumigación Controlada", type: "fumigacion" },
            { icon: <Package size={20} />, title: "Transporte de Carga", type: "carga" },
          ].map((s) => (
            <button
              key={s.type}
              onClick={() => onSelectService(s.type)}
              className="w-full bg-white border-2 border-gray-200 hover:border-[#0E5E6F] hover:bg-[#0E5E6F]/5 px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-start gap-4 group active:scale-[0.98] shadow-sm"
            >
              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 group-hover:bg-[#0E5E6F] group-hover:text-white group-hover:border-[#0E5E6F] transition-colors shrink-0 shadow-sm group-hover:shadow-md">
                {s.icon}
              </div>
              <h4 className="text-[13px] text-gray-800 font-black group-hover:text-[#0E5E6F] normal-case transition-colors tracking-tight text-left">
                {s.title}
              </h4>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL 1: ASIGNAR UNIDAD */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 text-left">
            <div className="flex justify-between items-center px-6 py-5 border-b-2 border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0E5E6F]/10 rounded-lg"><UserPlus className="text-[#0E5E6F]" size={18} /></div>
                <h3 className="text-base font-bold text-gray-900 normal-case tracking-tight">Asignar Unidad de Transporte Pesado</h3>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAssignSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">1. Seleccionar Dron Disponible</span>
                  <div className="space-y-3">
                    {drones.map((d) => (
                      <div key={d.id} onClick={() => setSelectedDroneId(d.id)} className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${selectedDroneId === d.id ? "border-[#0E5E6F] bg-[#0E5E6F]/5 shadow-sm" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                        <div>
                          <p className="text-xs font-black text-gray-800">{d.drone}</p>
                          <p className="text-[10px] text-gray-500 font-medium mt-0.5 flex items-center gap-1">Estado actual: <span className={d.status === 'Libre' ? 'text-green-600' : ''}>{d.status}</span></p>
                        </div>
                        {selectedDroneId === d.id && <div className="bg-[#0E5E6F] p-1 rounded-full"><Check size={14} className="text-white" /></div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block">2. Nombre del Piloto a Cargo</span>
                    <input type="text" required placeholder="Ej. Ing. Javier Reyes" value={newPilotName} onChange={(e) => setNewPilotName(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] focus:ring-4 focus:ring-[#0E5E6F]/10 outline-none text-sm text-gray-800 font-bold transition-all" />
                    <p className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-2">
                       <AlertCircle size={14} className="text-blue-500 shrink-0"/>
                       Al confirmar, el estado de la unidad cambiará automáticamente a <strong className="text-green-600">Activo</strong> en el sistema global.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => setIsAssignModalOpen(false)} className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">Cancelar</button>
                    <button type="submit" className="px-6 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95">Confirmar Asignación</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDITAR ESTADO */}
      {editingDrone && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 text-left">
            <div className="flex justify-between items-center px-6 py-5 border-b-2 border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0E5E6F]/10 rounded-lg"><Edit3 className="text-[#0E5E6F]" size={18} /></div>
                <h3 className="text-base font-bold text-gray-900 normal-case tracking-tight">Editar Estado: {editingDrone.drone}</h3>
              </div>
              <button onClick={() => setEditingDrone(null)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-2">Piloto Asignado</label>
                  <input type="text" value={editingDrone.pilot} onChange={(e) => setEditingDrone({ ...editingDrone, pilot: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] focus:ring-4 focus:ring-[#0E5E6F]/10 outline-none text-sm text-gray-800 font-bold transition-all" />
                </div>
                <div>
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-2">Estado Operativo</label>
                  <select value={editingDrone.status} onChange={(e) => setEditingDrone({ ...editingDrone, status: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] focus:ring-4 focus:ring-[#0E5E6F]/10 outline-none text-sm text-gray-800 font-bold bg-white transition-all appearance-none cursor-pointer">
                    <option value="Activo">🟢 Activo</option>
                    <option value="En vuelo">🔵 En vuelo</option>
                    <option value="Libre">⚪ Libre</option>
                    <option value="Mantenimiento">🟠 Mantenimiento</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <button onClick={() => setEditingDrone(null)} className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">Cancelar</button>
                <button onClick={() => handleSaveStatus(editingDrone.id, editingDrone.status, editingDrone.pilot)} className="px-6 py-2.5 bg-[#0E5E6F] hover:bg-[#094350] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 4. ADMIN — PRICES & SUBSCRIPTIONS (Catálogo de Precios e Ingresos Recurrentes)
// ═══════════════════════════════════════════════════════════════════════
export const AdminPricesView = () => {
  const [tab, setTab] = useState<"subs" | "ventas">("subs");

  // -------------------------------------------------------------
  // ESTADOS DE PLANES DE SUSCRIPCIÓN
  // -------------------------------------------------------------
  const [planes, setPlanes] = useState<Plan[]>([
    {
      id: 1,
      name: "Básico",
      price: 1200,
      cycle: "Mensual",
      flights: "2",
      area: "10 ha",
      active: true,
    },
    {
      id: 2,
      name: "Operativo",
      price: 2800,
      cycle: "Mensual",
      flights: "10",
      area: "50 ha",
      active: true,
    },
    {
      id: 3,
      name: "Premium",
      price: 5500,
      cycle: "Mensual",
      flights: "Ilimitado",
      area: "Ilimitada",
      active: true,
    },
    {
      id: 4,
      name: "Básico Anual",
      price: 12000,
      cycle: "Anual",
      flights: "2",
      area: "10 ha",
      active: false,
    },
  ]);

  // -------------------------------------------------------------
  // ESTADOS DE VENTA DE DRONES (Imágenes locales)
  // -------------------------------------------------------------
  const [dronesVenta, setDronesVenta] = useState<DroneSale[]>([
    {
      id: 1,
      name: "DJI FlyCart 30",
      model: "Transporte de Carga Pesada",
      price: 280000,
      stock: 3,
      image: "src/img/DJI_FlyCart_30.png",
      tags: ["30kg / 500lbs", "IP55", "Doble Batería"],
      capacity: "500 lbs",
    },
    {
      id: 2,
      name: "Ehang 184",
      model: "Pasajeros & Carga Crítica",
      price: 450000,
      stock: 1,
      image: "src/img/Ehang_184.png",
      tags: ["AAV Autónomo", "400 lbs", "Telemetría 5G"],
      capacity: "400 lbs",
    },
    {
      id: 3,
      name: "GRIFF Aviation 300",
      model: "Elevación Industrial & Agrícola",
      price: 520000,
      stock: 2,
      image: "src/img/GRIFF_Aviation_300.png",
      tags: ["Lift Heavy", "500 lbs", "Octocóptero"],
      capacity: "500 lbs",
    },
  ]);

  // -------------------------------------------------------------
  // CALCULADORA ANALÍTICA DE MRR
  // -------------------------------------------------------------
  const [clientesBasico, setClientesBasico] = useState<number>(15);
  const [clientesOperativo, setClientesOperativo] = useState<number>(8);
  const [clientesPremium, setClientesPremium] = useState<number>(4);

  const mrrBasico =
    clientesBasico * (planes.find((p) => p.name === "Básico")?.price || 1200);
  const mrrOperativo =
    clientesOperativo *
    (planes.find((p) => p.name === "Operativo")?.price || 2800);
  const mrrPremium =
    clientesPremium * (planes.find((p) => p.name === "Premium")?.price || 5500);
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
    setPlanes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
    setHasUnsavedChanges(true);
  };

  const handleSavePlan = (plan: Plan) => {
    if (planes.some((p) => p.id === plan.id)) {
      setPlanes((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      setPlanes((prev) => [...prev, { ...plan, id: Date.now() }]);
    }
    setEditingPlan(null);
    setIsPlanModalOpen(false);
    setHasUnsavedChanges(true);
  };

  const handleDeletePlan = (id: number) => {
    setPlanes((prev) => prev.filter((p) => p.id !== id));
    setHasUnsavedChanges(true);
  };

  // Handlers para Drones
  const handleSaveDrone = (drone: DroneSale) => {
    if (dronesVenta.some((d) => d.id === drone.id)) {
      setDronesVenta((prev) =>
        prev.map((d) => (d.id === drone.id ? drone : d)),
      );
    } else {
      setDronesVenta((prev) => [...prev, { ...drone, id: Date.now() }]);
    }
    setEditingDrone(null);
    setIsDroneModalOpen(false);
    setHasUnsavedChanges(true);
  };

  const handleAddTag = (droneId: number) => {
    const tag = prompt("Ingrese la nueva etiqueta para la unidad:");
    if (!tag) return;
    setDronesVenta((prev) =>
      prev.map((d) =>
        d.id === droneId ? { ...d, tags: [...d.tags, tag] } : d,
      ),
    );
    setHasUnsavedChanges(true);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white antialiased">
      {/* HEADER PRINCIPAL */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200 text-left">
        <div className="space-y-1">
          <Title className="text-xl sm:text-2xl text-gray-900">
            Precios y Suscripciones
          </Title>
          <Text className="text-gray-400 text-xs font-bold tracking-wider">
            Configura planes, tarifas y drones de alta capacidad.
          </Text>
        </div>
      </div>

      {/* TABS SELECTORAS */}
      <div
        className="flex border-b-2 border-gray-200 mb-6"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        <button
          onClick={() => setTab("subs")}
          className={`px-4 sm:px-6 py-2.5 font-black text-xs uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
            tab === "subs"
              ? "border-[#0E5E6F] text-[#0E5E6F]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Layers size={15} /> Planes de Suscripción
        </button>
        <button
          onClick={() => setTab("ventas")}
          className={`px-4 sm:px-6 py-2.5 font-black text-xs uppercase tracking-wider transition-all border-b-2 -mb-px flex items-center gap-2 ${
            tab === "ventas"
              ? "border-[#0E5E6F] text-[#0E5E6F]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <ShoppingBag size={15} /> Venta de Drones
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PLANES DE SUSCRIPCIÓN */}
      {/* ========================================================================= */}
      {tab === "subs" && (
        <div className="space-y-8">
          {/* TABLA DE PLANES COMPACTA */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col text-left">
            {/* VISTA DE TABLA CON CAMPOS REDUCIDOS Y MÁS COMPACTOS */}
            <div className="hidden md:block w-full">
              <table
                className="w-full text-left border-collapse"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
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
                    <tr
                      key={plan.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-2.5 px-3">
                        <Text className="font-bold text-xs text-gray-900">
                          {plan.name}
                        </Text>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-black">
                            L.
                          </span>
                          <input
                            type="number"
                            value={plan.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setPlanes((prev) =>
                                prev.map((p) =>
                                  p.id === plan.id ? { ...p, price: val } : p,
                                ),
                              );
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
                            const val = e.target.value as Plan["cycle"];
                            setPlanes((prev) =>
                              prev.map((p) =>
                                p.id === plan.id ? { ...p, cycle: val } : p,
                              ),
                            );
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
                        <Text className="text-xs text-gray-700 font-mono font-bold">
                          {plan.flights}
                        </Text>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <Text className="text-xs text-gray-700 font-medium">
                          {plan.area}
                        </Text>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => handleTogglePlan(plan.id)}
                          className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border transition-all ${
                            plan.active
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-gray-200 bg-gray-50 text-gray-400"
                          }`}
                        >
                          {plan.active ? (
                            <ToggleRight size={13} />
                          ) : (
                            <ToggleLeft size={13} />
                          )}
                          {plan.active ? "Activo" : "Inactivo"}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingPlan(plan);
                              setIsPlanModalOpen(true);
                            }}
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
                    <Text className="font-bold text-xs text-gray-900">
                      {plan.name}
                    </Text>
                    <button
                      onClick={() => handleTogglePlan(plan.id)}
                      className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                        plan.active
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-50 text-gray-400"
                      }`}
                    >
                      {plan.active ? (
                        <ToggleRight size={13} />
                      ) : (
                        <ToggleLeft size={13} />
                      )}
                      {plan.active ? "Activo" : "Inactivo"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-[9px] font-black uppercase text-gray-400 block mb-0.5">
                        Precio (L.)
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400 font-black">
                          L.
                        </span>
                        <input
                          type="number"
                          value={plan.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPlanes((prev) =>
                              prev.map((p) =>
                                p.id === plan.id ? { ...p, price: val } : p,
                              ),
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-full focus:border-[#0E5E6F] focus:outline-none font-bold text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase text-gray-400 block mb-0.5">
                        Ciclo
                      </span>
                      <select
                        value={plan.cycle}
                        onChange={(e) => {
                          const val = e.target.value as Plan["cycle"];
                          setPlanes((prev) =>
                            prev.map((p) =>
                              p.id === plan.id ? { ...p, cycle: val } : p,
                            ),
                          );
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
                    <span>
                      Vuelos:{" "}
                      <strong className="text-gray-800 font-mono">
                        {plan.flights}
                      </strong>
                    </span>
                    <span>
                      Cobertura:{" "}
                      <strong className="text-gray-800">{plan.area}</strong>
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setEditingPlan(plan);
                        setIsPlanModalOpen(true);
                      }}
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
                  setEditingPlan({
                    id: 0,
                    name: "",
                    price: 1000,
                    cycle: "Mensual",
                    flights: "5",
                    area: "20 ha",
                    active: true,
                  });
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
                <div
                  className="space-y-4"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">
                        Volumen Plan Básico (L.{" "}
                        {planes
                          .find((p) => p.name === "Básico")
                          ?.price.toLocaleString()}
                        )
                      </label>
                      <span className="text-xs font-black font-mono text-[#0E5E6F]">
                        {clientesBasico} clientes
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={clientesBasico}
                      onChange={(e) =>
                        setClientesBasico(Number(e.target.value))
                      }
                      className="w-full accent-[#0E5E6F] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">
                        Volumen Plan Operativo (L.{" "}
                        {planes
                          .find((p) => p.name === "Operativo")
                          ?.price.toLocaleString()}
                        )
                      </label>
                      <span className="text-xs font-black font-mono text-[#2994B2]">
                        {clientesOperativo} clientes
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={clientesOperativo}
                      onChange={(e) =>
                        setClientesOperativo(Number(e.target.value))
                      }
                      className="w-full accent-[#2994B2] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-600">
                        Volumen Plan Premium (L.{" "}
                        {planes
                          .find((p) => p.name === "Premium")
                          ?.price.toLocaleString()}
                        )
                      </label>
                      <span className="text-xs font-black font-mono text-[#B165E0]">
                        {clientesPremium} clientes
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={clientesPremium}
                      onChange={(e) =>
                        setClientesPremium(Number(e.target.value))
                      }
                      className="w-full accent-[#B165E0] h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Panel de Visualización del MRR Proyectado */}
                <div className="bg-gray-50/70 border-2 border-gray-100 rounded-2xl p-5 text-center flex flex-col justify-between h-full min-h-[200px]">
                  <div className="space-y-1">
                    <Text className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Ingreso Mensual Recurrente Proyectado (MRR)
                    </Text>
                    <span
                      className="text-3xl font-black text-gray-900 tracking-tight block"
                      style={{ fontFamily: "'Lexend Deca', sans-serif" }}
                    >
                      L.{" "}
                      {mrrTotal.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {/* Barra Analítica Proporcional */}
                  <div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                      <div
                        className="bg-[#0E5E6F] transition-all duration-300"
                        style={{
                          width: `${mrrTotal > 0 ? (mrrBasico / mrrTotal) * 100 : 0}%`,
                        }}
                      ></div>
                      <div
                        className="bg-[#2994B2] transition-all duration-300"
                        style={{
                          width: `${mrrTotal > 0 ? (mrrOperativo / mrrTotal) * 100 : 0}%`,
                        }}
                      ></div>
                      <div
                        className="bg-[#B165E0] transition-all duration-300"
                        style={{
                          width: `${mrrTotal > 0 ? (mrrPremium / mrrTotal) * 100 : 0}%`,
                        }}
                      ></div>
                    </div>
                    <div
                      className="flex justify-center gap-5 mt-3 text-[10px] font-bold uppercase tracking-wider text-gray-500"
                      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0E5E6F]"></span>{" "}
                        Básico
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2994B2]"></span>{" "}
                        Operativo
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#B165E0]"></span>{" "}
                        Premium
                      </span>
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
      {tab === "ventas" && (
        <div className="space-y-5 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-1">
            <div>
              <Title
                as="h3"
                className="text-base text-gray-900 normal-case tracking-tight"
              >
                Catálogo de Flota Comercial
              </Title>
              <Text className="text-xs text-gray-400">
                Drones pesados para logística y tareas agrícolas de alto impacto
              </Text>
            </div>
            <button
              onClick={() => {
                setEditingDrone({
                  id: 0,
                  name: "",
                  model: "",
                  price: 200000,
                  stock: 1,
                  image: "src/img/DJI_FlyCart_30.png",
                  tags: ["Carga"],
                  capacity: "500 lbs",
                });
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
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=" +
                        encodeURIComponent(drone.name);
                    }}
                  />
                  <span className="absolute top-2.5 left-2.5 bg-gray-900/80 backdrop-blur-md text-white font-mono text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm">
                    Cap: {drone.capacity}
                  </span>
                </div>

                {/* CONTENIDO PRINCIPAL DE LA CARD HORIZONTAL */}
                <div
                  className="p-4 flex-1 flex flex-col justify-between space-y-3"
                  style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {/* Encabezado e Info General */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Text className="font-black text-sm sm:text-base text-gray-900 leading-tight">
                          {drone.name}
                        </Text>
                        <ShieldCheck size={15} className="text-[#0E5E6F]" />
                      </div>
                      <Text className="text-xs text-gray-400 font-medium">
                        {drone.model}
                      </Text>
                    </div>

                    {/* Tags Badge */}
                    <div className="flex flex-wrap items-center gap-1 pt-1 sm:pt-0">
                      {drone.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 border border-gray-200 text-gray-600 text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                        >
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
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">
                        Precio Lempiras:
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 font-black">
                          L.
                        </span>
                        <input
                          type="number"
                          value={drone.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDronesVenta((prev) =>
                              prev.map((d) =>
                                d.id === drone.id ? { ...d, price: val } : d,
                              ),
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-28 focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-[#0E5E6F]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">
                        Stock Disponible:
                      </span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={drone.stock}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setDronesVenta((prev) =>
                              prev.map((d) =>
                                d.id === drone.id ? { ...d, stock: val } : d,
                              ),
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-0.5 text-xs font-mono w-14 text-center focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-gray-800"
                        />
                        <span className="text-[11px] text-gray-400 font-medium">
                          uds
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Barra Inferior de Acciones */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setEditingDrone(drone);
                        setIsDroneModalOpen(true);
                      }}
                      className="text-xs text-[#0E5E6F] font-bold hover:underline flex items-center gap-1"
                    >
                      <Edit3 size={12} /> Editar especificaciones
                    </button>
                    <button
                      onClick={() => {
                        setDronesVenta((prev) =>
                          prev.filter((d) => d.id !== drone.id),
                        );
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
              <Text className="text-xs text-gray-200 font-medium">
                Modificaciones sin guardar
              </Text>
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
                  alert("¡Cambios guardados exitosamente!");
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
                <Title
                  as="h3"
                  className="text-base text-gray-900 normal-case tracking-tight"
                >
                  {editingPlan.id
                    ? "Editar Plan de Suscripción"
                    : "Crear Nuevo Plan"}
                </Title>
              </div>
              <button
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSavePlan(editingPlan);
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Nombre del Plan
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Precio (L.)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingPlan.price}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Ciclo de Facturación
                  </label>
                  <select
                    value={editingPlan.cycle}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        cycle: e.target.value as Plan["cycle"],
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-bold bg-white"
                  >
                    <option value="Mensual">Mensual</option>
                    <option value="Anual">Anual</option>
                    <option value="Trimestral">Trimestral</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Vuelos Incluidos
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlan.flights}
                    onChange={(e) =>
                      setEditingPlan({
                        ...editingPlan,
                        flights: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Cobertura Máxima (Hectáreas / Área)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlan.area}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, area: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700"
                >
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
                <Title
                  as="h3"
                  className="text-base text-gray-900 normal-case tracking-tight"
                >
                  {editingDrone.id
                    ? "Editar Dron Comercial"
                    : "Agregar Nuevo Dron"}
                </Title>
              </div>
              <button
                onClick={() => setIsDroneModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveDrone(editingDrone);
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Nombre / Modelo
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDrone.name}
                    onChange={(e) =>
                      setEditingDrone({ ...editingDrone, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Imagen (src/img/)
                  </label>
                  <select
                    value={editingDrone.image}
                    onChange={(e) =>
                      setEditingDrone({
                        ...editingDrone,
                        image: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium bg-white"
                  >
                    <option value="src/img/DJI_FlyCart_30.png">
                      DJI_FlyCart_30.png
                    </option>
                    <option value="src/img/Ehang_184.png">Ehang_184.png</option>
                    <option value="src/img/GRIFF_Aviation_300.png">
                      GRIFF_Aviation_300.png
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Precio (L.)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingDrone.price}
                    onChange={(e) =>
                      setEditingDrone({
                        ...editingDrone,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Stock Inicial
                  </label>
                  <input
                    type="number"
                    required
                    value={editingDrone.stock}
                    onChange={(e) =>
                      setEditingDrone({
                        ...editingDrone,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Capacidad Máxima de Carga
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDrone.capacity}
                    onChange={(e) =>
                      setEditingDrone({
                        ...editingDrone,
                        capacity: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 border-2 border-gray-200 rounded-xl focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsDroneModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700"
                >
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

// 5. Ayuda y Asistencia de Admin (help)
export const HelpAdminView = () => {
  // Avatar del Administrador actual (Tú)
  const adminAvatar = "src/img/admin_perfil.png";

  // Lista de chats desde la perspectiva del Administrador (Atendiendo a Granjeros)
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'granjero_carlos',
      name: 'Carlos Sosa',
      role: 'Granjero - Finca El Naranjal (187 Has)',
      roleType: 'piloto',
      avatar: 'src/img/granjero_perfil.png',
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: '¡Hola Carlos! Bienvenido al centro de asistencia. ¿Tienes alguna duda con los parámetros de escaneo de tus manzanas?',
          time: '08:30 AM'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Hola, sí. Quería confirmar si la batería del Dron #2 alcanza para cubrir las 187 manzanas en un solo vuelo.',
          time: '08:32 AM'
        },
        {
          id: 3,
          sender: 'other',
          text: 'Para esa extensión recomendamos dividir la misión en 2 fases de vuelo para no forzar el retorno de emergencia.',
          time: '08:35 AM'
        }
      ]
    },
    {
      id: 'granjera_maria',
      name: 'María Rodríguez',
      role: 'Granjera - Finca Los Pinos (95 Has)',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: 'Estimados, recibí la notificación sobre la renovación del Plan Profesional.',
          time: '09:10 AM'
        },
        {
          id: 2,
          sender: 'granjero',
          text: '¿Podrían enviarme el comprobante fiscal a mi correo corporativo?',
          time: '09:12 AM'
        }
      ]
    },
    {
      id: 'granjero_roberto',
      name: 'Roberto Gómez',
      role: 'Granjero - Valle Verde',
      roleType: 'piloto',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'hoy a las 10:15 AM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: 'Hola, detectamos una inconsistencia en las lecturas del sensor de humedad de la Parcela 3.',
          time: 'Ayer'
        },
        {
          id: 2,
          sender: 'other',
          text: 'Hola Roberto, ya reiniciamos el nodo de enlace IoT. Por favor confirma si recibes datos.',
          time: 'Ayer'
        },
        {
          id: 3,
          sender: 'granjero',
          text: '¡Confirmado! Ya veo la telemetría normalizada. Muchas gracias.',
          time: 'Ayer'
        }
      ]
    },
    {
      id: 'granjera_lucia',
      name: 'Dra. Lucía Fernández',
      role: 'Granjera - Agrotech del Sur',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'hace 3 horas',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Lucía, los mapas multispectrales de NDVI ya están listos en su plataforma.',
          time: '11:00 AM'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Perfecto, los reviso con el agrónomo de la finca. Gracias por la rapidez.',
          time: '11:15 AM'
        }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState<string>('granjero_carlos');
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estados para el Modal de Ticket / Nota del Administrador
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketForm, setTicketForm] = useState({
    granjero: 'Carlos Sosa',
    categoria: 'Soporte Técnico Drones',
    prioridad: 'Alta',
    nota: ''
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Enviar mensaje como Administrador (sender: 'other')
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'other', // El admin envía el mensaje
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      })
    );

    setInputText('');
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.nota.trim()) return;
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setTicketForm({
      granjero: 'Carlos Sosa',
      categoria: 'Soporte Técnico Drones',
      prioridad: 'Alta',
      nota: ''
    });
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative">
      <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden">
        
        {/* ================= BARRA LATERAL (LISTA DE CLIENTES / GRANJEROS) ================= */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-gray-50/60 h-full min-h-0 shrink-0">
          
          {/* TÍTULO Y BOTÓN DE REGISTRAR TICKET */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">Panel de Soporte</h2>
              <p className="text-xs text-gray-500">Atención a Granjeros y Pilotos</p>
            </div>

            {/* BOTÓN NUEVA NOTA / TICKET */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <FileText size={15} />
              <span>Crear Ticket</span>
            </button>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="p-3 border-b border-gray-200 bg-gray-50/80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar granjero o finca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0E5E6F] transition"
              />
            </div>
          </div>

          {/* LISTA DE CHATS */}
          <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
            {filteredChats.map((chat) => {
              const lastMsg = chat.messages[chat.messages.length - 1];
              const isSelected = chat.id === activeChatId;

              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats((prev) =>
                      prev.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`w-full p-4 flex items-center gap-3 transition text-left cursor-pointer ${
                    isSelected ? 'bg-white border-l-4 border-[#0E5E6F]' : 'hover:bg-gray-100/80'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-xs"
                    />
                    <span 
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        chat.online ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h3>
                      {lastMsg && (
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 ml-1">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0E5E6F] font-semibold mb-1 truncate">{chat.role}</p>
                    {lastMsg && (
                      <p className="text-xs text-gray-500 truncate">
                        {lastMsg.sender === 'other' ? 'Tú: ' : ''}
                        {lastMsg.text}
                      </p>
                    )}
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="shrink-0">
                      <span className="bg-[#0E5E6F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full block">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ÁREA DE CONVERSACIÓN ================= */}
        <div className="flex-1 flex flex-col h-full min-h-0 bg-[#f8fafc] overflow-hidden">
          
          {/* HEADER DEL CHAT */}
          <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between gap-2 shrink-0 min-w-0">
            
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h2 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
                  {activeChat.name}
                </h2>
                
                <span className="text-xs text-[#0E5E6F] font-medium truncate mt-0.5">
                  {activeChat.role}
                </span>

                <div className="text-xs text-gray-500 mt-0.5">
                  {activeChat.online ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      En línea
                    </span>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block shrink-0"></span>
                      <span className="truncate">
                        Desconectado {activeChat.lastSeen ? `(${activeChat.lastSeen})` : ''}
                      </span>
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center gap-1 text-gray-500 shrink-0">
              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Llamada de voz"
              >
                <Phone size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Videollamada"
              >
                <Video size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Opciones adicionales"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* HISTORIAL DE MENSAJES */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
            {activeChat.messages.map((msg) => {
              // Desde la vista del Admin: 'other' representa mis mensajes (Admin)
              const isAdminMsg = msg.sender === 'other';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isAdminMsg ? 'justify-end' : 'justify-start'}`}
                >
                  {!isAdminMsg && (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm ${
                      isAdminMsg
                        ? 'bg-[#0E5E6F] text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isAdminMsg ? 'text-cyan-100' : 'text-gray-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      
                      {isAdminMsg && (
                        <CheckCheck size={14} className="text-cyan-200" />
                      )}
                    </div>
                  </div>

                  {isAdminMsg && (
                    <img
                      src={adminAvatar}
                      alt="Administrador Soporte"
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0 border border-gray-200"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* FORMULARIO DE ENTRADA DE MENSAJES */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-xl transition shrink-0"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Responder como Administrador..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0E5E6F] text-white rounded-xl hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      </div>

      {/* ================= MODAL DE REGISTRO DE TICKET ADMIN ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Header del Modal */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Registrar Ticket Interno</h3>
                  <p className="text-xs text-gray-500">Documentar caso de asistencia</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-5">
              {!isSubmitted ? (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Granjero / Cliente
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.granjero}
                      onChange={(e) => setTicketForm({ ...ticketForm, granjero: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={ticketForm.categoria}
                      onChange={(e) => setTicketForm({ ...ticketForm, categoria: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Soporte Técnico Drones">Soporte Técnico Drones</option>
                      <option value="Falla en Telemetría">Falla en Telemetría IoT</option>
                      <option value="Facturación y Licencias">Facturación y Licencias</option>
                      <option value="Análisis NDVI">Revisión Fitozoosanitaria (NDVI)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      value={ticketForm.prioridad}
                      onChange={(e) => setTicketForm({ ...ticketForm, prioridad: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Notas internas / Diagnóstico
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Escribe un resumen técnico del problema o solución acordada..."
                      value={ticketForm.nota}
                      onChange={(e) => setTicketForm({ ...ticketForm, nota: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Guardar Ticket
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmación */
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-gray-900">¡Ticket registrado!</h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      El ticket ha sido guardado exitosamente en el historial del cliente y asignado a seguimiento.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={closeModal}
                      className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

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
      crop: "Parcela de Limones (Lote Norte)",
      area: "14 ha",
      loc: "14.0723°N, 86.2344°W",
      type: "Monitoreo NDVI & Defoliación",
      priority: "Alta",
      status: "En Progreso",
    },
    {
      id: 2,
      crop: "Maíz Amarillo (Lote Sur)",
      area: "22 ha",
      loc: "14.0890°N, 86.2100°W",
      type: "Conteo de Planta & Estrés",
      priority: "Media",
      status: "Pendiente",
    },
    {
      id: 3,
      crop: "Frijol Rojo (Parcela Este)",
      area: "5 ha",
      loc: "14.0601°N, 86.2480°W",
      type: "Mapeo de Humedad",
      priority: "Normal",
      status: "Pendiente",
    },
  ]);

  const [activeMissionId, setActiveMissionId] = useState<number>(1);
  const activeMission =
    missions.find((m) => m.id === activeMissionId) || missions[0];

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
    wind: 11,
  });

  // Log de Telemetría
  const [logs, setLogs] = useState<
    Array<{
      id: number;
      time: string;
      text: string;
      type: "green" | "blue" | "yellow" | "red";
    }>
  >([
    {
      id: 1,
      time: "10:42:35",
      text: "Telemetría sincronizada · Agras T50 (5.8 GHz)",
      type: "green",
    },
    {
      id: 2,
      time: "10:42:31",
      text: "GPS Lock confirmado · 18 Satélites RTK",
      type: "green",
    },
    {
      id: 3,
      time: "10:42:28",
      text: "Escaneando Parcela de Limones (Lote Norte)",
      type: "blue",
    },
    {
      id: 4,
      time: "10:42:15",
      text: "Sensor Multispectral: Análisis foliar en curso",
      type: "yellow",
    },
  ]);

  // Oscilación simulada de telemetría cada 3 segundos
  useEffect(() => {
    if (!isPlayingFeed || isRthActive) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        alt: Math.floor(40 + Math.random() * 8),
        speed: parseFloat((7.5 + Math.random() * 1.8).toFixed(1)),
        dist: prev.dist + Math.floor(Math.random() * 3),
        heading: (prev.heading + Math.floor(Math.random() * 3 - 1)) % 360,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlayingFeed, isRthActive]);

  const addLog = (
    text: string,
    type: "green" | "blue" | "yellow" | "red" = "blue",
  ) => {
    const time = new Date().toLocaleTimeString("es-HN", { hour12: false });
    setLogs((prev) => [{ id: Date.now(), time, text, type }, ...prev]);
  };

  const handleSelectMission = (id: number) => {
    setActiveMissionId(id);
    const selected = missions.find((m) => m.id === id);
    if (selected) {
      addLog(`Misión seleccionada: ${selected.crop}`, "blue");
    }
  };

  const handleCaptureSnapshot = () => {
    addLog(`Fotogrametría guardada: ${activeMission.loc}`, "green");
  };

  const handleExecuteRTH = () => {
    if (!rthArmed) {
      setRthArmed(true);
      return;
    }
    setIsRthActive(true);
    setRthArmed(false);
    setMissions((prev) =>
      prev.map((m) =>
        m.id === activeMissionId ? { ...m, status: "Completado" } : m,
      ),
    );
    addLog("🚨 PROTOCOLO RTH: El Agras T50 retorna a la base", "red");
  };

  const handleCancelRTH = () => {
    setRthArmed(false);
    addLog("Cancelada alerta RTH", "yellow");
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 antialiased text-left font-sans">
      {/* BARRA SUPERIOR DE TELEMETRÍA EN VIVO */}
      <div className="bg-gray-900 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1">
            <Battery size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Bat:</span>
            <span className="font-bold text-green-400">
              {telemetry.battery}%
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Signal size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">GPS:</span>
            <span className="font-bold text-green-400">
              {telemetry.satellites}sats
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Wifi size={13} className="text-green-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Link:</span>
            <span className="font-bold text-green-400">99%</span>
          </div>

          <div className="flex items-center gap-1">
            <Wind size={13} className="text-yellow-400 shrink-0" />
            <span className="text-gray-400 text-[10px] uppercase">Viento:</span>
            <span className="font-bold text-yellow-400">
              {telemetry.wind}km/h
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 aspect-square ${isRthActive ? "bg-red-500 animate-ping" : "bg-green-400 animate-pulse"}`}
          ></span>
          <span className="text-green-400 text-xs font-bold uppercase tracking-wider font-mono">
            {isRthActive ? "RTH ACTIVO · Agras T50" : "Agras T50 Conectado"}
          </span>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LISTA LATERAL DE MISIONES */}
        <div className="w-full md:w-[320px] border-r border-gray-200 bg-white flex flex-col overflow-hidden shrink-0">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <Title
              as="h3"
              className="text-xs font-black text-gray-800 normal-case"
            >
              Misiones Asignadas
            </Title>
            <span className="bg-[#0E5E6F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              {missions.filter((m) => m.status !== "Completado").length} activas
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
                      ? "border-[#0E5E6F] bg-[#0E5E6F]/5"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Text
                      className={`font-bold text-xs ${isCurrent ? "text-[#0E5E6F]" : "text-gray-800"}`}
                    >
                      {m.crop}
                    </Text>
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                        m.priority === "Alta"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {m.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-2">
                    <MapPin size={10} className="shrink-0" /> {m.loc}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <span className="text-[10px] text-gray-500 font-medium">
                      {m.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMission(m.id);
                      }}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? "bg-[#0E5E6F] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isCurrent ? "Activa" : "Cargar"}
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
                isPlayingFeed ? "opacity-100" : "opacity-40 grayscale"
              }`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://via.placeholder.com/1200x800?text=Vista+Aerea+Parcela+Limones+(src/img/vista_aerea.png)";
              }}
            />

            {/* ELEMENTOS SOBREPUESTOS REDUCIDOS PARA VER LA IMAGEN */}
            <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between z-10">
              {/* Esquina Superior: Estado de Transmisión + Botón RTH Delgado */}
              <div className="flex justify-between items-start gap-2">
                <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 aspect-square ${isPlayingFeed ? "bg-red-500 animate-ping" : "bg-yellow-500"}`}
                  ></span>
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
                        ? "bg-orange-600 animate-pulse"
                        : rthArmed
                          ? "bg-red-600 animate-bounce"
                          : "bg-red-600/80 hover:bg-red-600"
                    }`}
                  >
                    <AlertOctagon size={13} className="shrink-0" />
                    <span>
                      {isRthActive
                        ? "RTH Activo"
                        : rthArmed
                          ? "Confirmar"
                          : "RTH"}
                    </span>
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
                  <div>
                    ALT:{" "}
                    <strong className="text-amber-300">{telemetry.alt}m</strong>
                  </div>
                  <div className="border-l border-white/20 pl-3">
                    VEL:{" "}
                    <strong className="text-amber-300">
                      {telemetry.speed}m/s
                    </strong>
                  </div>
                  <div className="border-l border-white/20 pl-3">
                    DIST:{" "}
                    <strong className="text-amber-300">
                      {telemetry.dist}m
                    </strong>
                  </div>
                  <div className="border-l border-white/20 pl-3">
                    HDG:{" "}
                    <strong className="text-amber-300">
                      {telemetry.heading}°
                    </strong>
                  </div>
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
                      addLog(
                        isPlayingFeed
                          ? "Transmisión pausada"
                          : "Transmisión reanudada",
                        "yellow",
                      );
                    }}
                    className="bg-black/60 hover:bg-black text-white px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-sm text-[10px] font-bold flex items-center gap-1"
                  >
                    {isPlayingFeed ? (
                      <Pause size={12} className="shrink-0" />
                    ) : (
                      <Play size={12} className="shrink-0" />
                    )}
                    {isPlayingFeed ? "Pausar" : "Reanudar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LOG DE TELEMETRÍA DEL DELTA EN LA PARTE INFERIOR */}
          <div className="h-32 bg-gray-950 border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow shrink-0">
            <div className="px-3 py-1.5 bg-gray-900 border-b border-gray-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <RefreshCw
                  size={11}
                  className="text-green-400 animate-spin shrink-0"
                />
                <span className="text-[11px] font-mono font-bold text-gray-300 uppercase">
                  Log de Telemetría
                </span>
              </div>
              <button
                onClick={() =>
                  addLog("Calibración Agras T50 verificada OK", "green")
                }
                className="text-[9px] bg-gray-800 hover:bg-gray-700 text-green-400 font-mono px-2 py-0.5 rounded border border-gray-700"
              >
                + Check
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-2 font-mono text-[10px] space-y-1 text-left">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 border-b border-gray-900/50 pb-0.5"
                >
                  <span className="text-gray-500 shrink-0">[{log.time}]</span>
                  <span
                    className={
                      log.type === "green"
                        ? "text-emerald-400"
                        : log.type === "yellow"
                          ? "text-amber-300"
                          : log.type === "red"
                            ? "text-red-400 font-bold"
                            : "text-sky-300"
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

//Estado de Drones
export const DroneStatusView = () => {
  // Datos detallados de la flota de drones
  const [drones, setDrones] = useState<Drone[]>([
    {
      id: 'DRON-01',
      name: 'Agras Alpha',
      model: 'DJI Agras T40',
      serialNumber: 'T40-2025-8891',
      status: 'in_flight',
      battery: 78,
      batteryVoltage: '52.4 V',
      signalStrength: 95,
      satellites: 24,
      rtkStatus: 'FIX',
      payloadType: 'Tanque Aspersión',
      payloadCapacity: '28.5L / 40L (71%)',
      location: 'Parcela B - Catacamas',
      flightHours: 142.5,
      healthScore: 96,
      lastMaintenance: '12 Ene 2026',
      nextMaintenanceIn: '18 hrs de vuelo',
      currentMission: {
        name: 'Fumigación Maíz - Sector Norte',
        progress: 64,
        altitude: '3.5 m',
        speed: '18.2 km/h',
        areaCovered: '12.4 ha'
      },
      motorStatus: ['OK', 'OK', 'OK', 'OK']
    },
    {
      id: 'DRON-02',
      name: 'Mavic Scout',
      model: 'DJI Mavic 3 Multispectral',
      serialNumber: 'M3M-2024-4102',
      status: 'ready',
      battery: 100,
      batteryVoltage: '17.4 V',
      signalStrength: 98,
      satellites: 28,
      rtkStatus: 'FIX',
      payloadType: 'Cámara RGB + NDVI',
      payloadCapacity: 'Sensor Listo',
      location: 'Hangar Principal / Base',
      flightHours: 89.0,
      healthScore: 98,
      lastMaintenance: '02 Feb 2026',
      nextMaintenanceIn: '41 hrs de vuelo',
      motorStatus: ['OK', 'OK', 'OK', 'OK']
    },
    {
      id: 'DRON-03',
      name: 'Agras Beta',
      model: 'DJI Agras T30',
      serialNumber: 'T30-2023-1092',
      status: 'charging',
      battery: 42,
      batteryVoltage: '48.1 V',
      signalStrength: 85,
      satellites: 18,
      rtkStatus: 'FLOAT',
      payloadType: 'Tanque Aspersión',
      payloadCapacity: '0L / 30L (Vacío)',
      location: 'Estación de Carga - Zona A',
      flightHours: 310.2,
      healthScore: 84,
      lastMaintenance: '15 Dec 2025',
      nextMaintenanceIn: '5 hrs de vuelo',
      motorStatus: ['OK', 'OK', 'OK', 'OK']
    },
    {
      id: 'DRON-04',
      name: 'Sentera Fixed-Wing',
      model: 'eBee X High-Precision',
      serialNumber: 'EBX-2023-0054',
      status: 'maintenance',
      battery: 15,
      batteryVoltage: '14.2 V',
      signalStrength: 0,
      satellites: 0,
      rtkStatus: 'OFFLINE',
      payloadType: 'Sensor Térmico REDEdge',
      payloadCapacity: 'En Revisión',
      location: 'Taller de Mantenimiento',
      flightHours: 420.8,
      healthScore: 68,
      lastMaintenance: 'En Proceso',
      nextMaintenanceIn: 'En Taller (Calibración ESC)',
      motorStatus: ['OK', 'WARNING']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

  // Filtros
  const filteredDrones = drones.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && d.status === filterStatus;
  });

  // Métricas rápidas de la flota
  const totalDrones = drones.length;
  const inFlightCount = drones.filter((d) => d.status === 'in_flight').length;
  const readyCount = drones.filter((d) => d.status === 'ready').length;
  const maintenanceCount = drones.filter((d) => d.status === 'maintenance').length;

  // Helper de colores según estado
  const getStatusBadge = (status: Drone['status']) => {
    switch (status) {
      case 'in_flight':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            En Vuelo
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-[#0E5E6F]">
            <CheckCircle2 size={13} />
            Disponible
          </span>
        );
      case 'charging':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <BatteryCharging size={13} />
            En Carga
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
            <Wrench size={13} />
            Mantenimiento
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#f8fafc] overflow-y-auto p-4 sm:p-6 space-y-6">
      
      {/* ================= ENCABEZADO Y RESUMEN DE FLOTA ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Estado y Telemetría de Flota
            <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-0.5 rounded-full border border-gray-200">
              {totalDrones} Unidades
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitoreo en tiempo real de batería, señal RTK, sensores y salud de hardware.
          </p>
        </div>

        {/* Botón de Sincronización Manual */}
        <button 
          onClick={() => {}}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition cursor-pointer"
        >
          <RotateCw size={14} className="text-[#0E5E6F]" />
          <span>Sincronizar Telemetría</span>
        </button>
      </div>

      {/* ================= TARJETAS DE KPIs RÁPIDOS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">En Operación / Vuelo</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{inFlightCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Navigation size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Listos para Despegue</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{readyCount}</h3>
          </div>
          <div className="p-3 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-xl">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">En Estación de Carga</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
              {drones.filter((d) => d.status === 'charging').length}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <BatteryCharging size={22} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">En Taller / Alerta</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{maintenanceCount}</h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <Wrench size={22} />
          </div>
        </div>

      </div>

      {/* ================= BARRA DE BÚSQUEDA Y FILTROS ================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
        
        {/* Input Búsqueda (Reducido a sm:w-56) */}
        <div className="relative w-full sm:w-56 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            type="text"
            placeholder="Buscar dron, modelo o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
          />
        </div>

        {/* Píldoras de Filtro (Con flex-1 para expandirse) */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto flex-1 justify-start sm:justify-end overflow-x-auto pb-1 sm:pb-0">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'in_flight', label: 'En Vuelo' },
            { key: 'ready', label: 'Disponibles' },
            { key: 'charging', label: 'En Carga' },
            { key: 'maintenance', label: 'Mantenimiento' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilterStatus(item.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterStatus === item.key
                  ? 'bg-[#0E5E6F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* ================= TARJETAS / GRILLA DE DRONES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredDrones.map((drone) => (
          <div
            key={drone.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition flex flex-col overflow-hidden"
          >
            {/* Header del Dron */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-2 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-xl font-bold text-xs shrink-0">
                  {drone.id}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{drone.name}</h3>
                  <p className="text-xs text-gray-500">{drone.model}</p>
                </div>
              </div>
              <div>{getStatusBadge(drone.status)}</div>
            </div>

            {/* Misión Activa (Si está en vuelo) */}
            {drone.status === 'in_flight' && drone.currentMission && (
              <div className="bg-emerald-50/60 p-3.5 border-b border-emerald-100">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Navigation size={14} className="text-emerald-600 animate-spin" />
                    {drone.currentMission.name}
                  </span>
                  <span>{drone.currentMission.progress}%</span>
                </div>
                
                {/* Barra de Progreso */}
                <div className="w-full h-2 bg-emerald-200/80 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${drone.currentMission.progress}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-emerald-800 font-medium">
                  <div>Alt: <span className="font-bold">{drone.currentMission.altitude}</span></div>
                  <div>Vel: <span className="font-bold">{drone.currentMission.speed}</span></div>
                  <div>Área: <span className="font-bold">{drone.currentMission.areaCovered}</span></div>
                </div>
              </div>
            )}

            {/* Métricas Principales */}
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-b border-gray-100 flex-1">
              
              {/* Batería */}
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-medium block text-[10px] uppercase mb-1">
                  Batería / Voltaje
                </span>
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Battery size={16} className={drone.battery < 20 ? 'text-red-500' : 'text-emerald-600'} />
                  <span>{drone.battery}%</span>
                  <span className="text-[10px] text-gray-500 font-normal">({drone.batteryVoltage})</span>
                </div>
              </div>

              {/* Señal RTK / GPS */}
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-medium block text-[10px] uppercase mb-1">
                  Señal / RTK
                </span>
                <div className="flex items-center gap-1.5 font-bold text-gray-900">
                  <Wifi size={16} className="text-[#0E5E6F]" />
                  <span>{drone.satellites} Sats</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    drone.rtkStatus === 'FIX' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {drone.rtkStatus}
                  </span>
                </div>
              </div>

              {/* Carga útil / Tanque */}
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                <span className="text-gray-400 font-medium block text-[10px] uppercase mb-1">
                  Carga Útil
                </span>
                <div className="flex items-center gap-1.5 font-semibold text-gray-800 truncate">
                  <Droplets size={15} className="text-cyan-600 shrink-0" />
                  <span className="truncate">{drone.payloadCapacity}</span>
                </div>
              </div>

            </div>

            {/* Footer de Tarjeta / Info Adicional */}
            <div className="p-3 px-4 bg-white flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5 truncate max-w-[60%]">
                <Compass size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">{drone.location}</span>
              </div>

              <button
                onClick={() => setSelectedDrone(drone)}
                className="flex items-center gap-1 font-semibold text-[#0E5E6F] hover:text-[#0A4754] transition cursor-pointer"
              >
                <span>Ver Telemetría</span>
                <Info size={14} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL DETALLE DE TELEMETRÍA Y DIAGNÓSTICO ================= */}
      {selectedDrone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#0E5E6F] text-white rounded-xl font-bold text-sm">
                  {selectedDrone.id}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{selectedDrone.name}</h3>
                  <p className="text-xs text-gray-500">{selectedDrone.model} • S/N: {selectedDrone.serialNumber}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDrone(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs">
              
              {/* Estado e Indice de Salud */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-semibold block mb-1">Estado General</span>
                  <div className="mt-1">{getStatusBadge(selectedDrone.status)}</div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 font-semibold">Índice de Salud (Health Index)</span>
                    <span className="font-bold text-gray-900">{selectedDrone.healthScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        selectedDrone.healthScore > 90
                          ? 'bg-emerald-500'
                          : selectedDrone.healthScore > 75
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${selectedDrone.healthScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Diagnóstico de Hardware & Motores */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <Cpu size={16} className="text-[#0E5E6F]" />
                  Diagnóstico de Motores ESC
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedDrone.motorStatus.map((status, index) => (
                    <div
                      key={index}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        status === 'OK'
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-red-50 border-red-200 text-red-900'
                      }`}
                    >
                      <span className="font-medium">M{index + 1} ESC</span>
                      <span className="font-bold text-[10px]">
                        {status === 'OK' ? 'NORMAL' : 'ALERTA'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mantenimiento y Horas de Vuelo */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                <h4 className="font-bold text-gray-900 flex items-center gap-1.5 mb-2">
                  <Clock size={16} className="text-[#0E5E6F]" />
                  Historial de Horas y Mantenimiento
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Horas Totales:</span>
                    <span className="font-bold text-gray-900">{selectedDrone.flightHours} hrs</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Última Revisión:</span>
                    <span className="font-semibold text-gray-800">{selectedDrone.lastMaintenance}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-gray-400 block text-[10px]">Próximo Servicio:</span>
                    <span className="font-semibold text-[#0E5E6F]">{selectedDrone.nextMaintenanceIn}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedDrone(null)}
                className="px-4 py-2 bg-[#0E5E6F] text-white font-semibold text-xs rounded-xl hover:bg-[#0A4754] transition cursor-pointer"
              >
                Ok
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// Historial y reporte de vuelos
export const FlightHistoryView = () => {
  // Datos simulados de historial de vuelos
  const [flights] = useState<FlightLog[]>([
    {
      id: 'FL-2026-089',
      droneId: 'DRON-01',
      droneName: 'Agras Alpha (T40)',
      type: 'fumigation',
      typeName: 'Fumigación Agrícola',
      location: 'Parcela B - Catacamas',
      pilot: 'Ing. Carlos Mendoza',
      date: '21 Jul 2026',
      startTime: '08:15 AM',
      endTime: '08:43 AM',
      duration: '28 min',
      areaCovered: '14.2 ha',
      productApplied: 'Fungicida Orgánico Max',
      volumeApplied: '320 L',
      status: 'completed',
      batteryUsed: 68,
      maxAltitude: '3.8 m',
      avgSpeed: '18.5 km/h',
      notes: 'Cobertura óptima sin viento. Aplicación completada al 100%.'
    },
    {
      id: 'FL-2026-088',
      droneId: 'DRON-02',
      droneName: 'Mavic Scout (M3M)',
      type: 'mapping',
      typeName: 'Mapeo NDVI Multi',
      location: 'Finca El Valle - Comayagua',
      pilot: 'Dra. Elena Rostrán',
      date: '21 Jul 2026',
      startTime: '07:00 AM',
      endTime: '07:42 AM',
      duration: '42 min',
      areaCovered: '38.0 ha',
      status: 'completed',
      batteryUsed: 82,
      maxAltitude: '80 m',
      avgSpeed: '22.0 km/h',
      notes: 'Generación de ortomosaico con precisión centimétrica RTK.'
    },
    {
      id: 'FL-2026-087',
      droneId: 'DRON-03',
      droneName: 'Agras Beta (T30)',
      type: 'fumigation',
      typeName: 'Fumigación Lote 4',
      location: 'Sector Sur - Danlí',
      pilot: 'Tec. Mario Aguilar',
      date: '20 Jul 2026',
      startTime: '03:30 PM',
      endTime: '03:48 PM',
      duration: '18 min',
      areaCovered: '8.5 ha',
      productApplied: 'Bio-Fertilizante NPK',
      volumeApplied: '180 L',
      status: 'interrupted',
      batteryUsed: 45,
      maxAltitude: '3.2 m',
      avgSpeed: '16.8 km/h',
      notes: 'Misión pausada manualmente por ráfagas de viento mayores a 28 km/h.'
    },
    {
      id: 'FL-2026-086',
      droneId: 'DRON-01',
      droneName: 'Agras Alpha (T40)',
      type: 'fumigation',
      typeName: 'Fertilización Foliar',
      location: 'Parcela A - Catacamas',
      pilot: 'Ing. Carlos Mendoza',
      date: '20 Jul 2026',
      startTime: '09:10 AM',
      endTime: '09:45 AM',
      duration: '35 min',
      areaCovered: '18.0 ha',
      productApplied: 'Bio-Estimulante Raíz',
      volumeApplied: '400 L',
      status: 'completed',
      batteryUsed: 75,
      maxAltitude: '4.0 m',
      avgSpeed: '19.0 km/h',
      notes: 'Aplicación realizada en condiciones climáticas ideales.'
    },
    {
      id: 'FL-2026-085',
      droneId: 'DRON-04',
      droneName: 'Sentera Fixed-Wing',
      type: 'inspection',
      typeName: 'Análisis Térmico de Estrés',
      location: 'Valle de Jalapa',
      pilot: 'Dra. Elena Rostrán',
      date: '19 Jul 2026',
      startTime: '11:00 AM',
      endTime: '11:15 AM',
      duration: '15 min',
      areaCovered: '12.0 ha',
      status: 'failed',
      batteryUsed: 25,
      maxAltitude: '100 m',
      avgSpeed: '35.0 km/h',
      notes: 'Fallo de calibración en sensor IMU. Retorno automático a casa (RTH).'
    },
    {
      id: 'FL-2026-084',
      droneId: 'DRON-02',
      droneName: 'Mavic Scout (M3M)',
      type: 'mapping',
      typeName: 'Inspección de Conopia',
      location: 'Finca La Lira - El Paraíso',
      pilot: 'Ing. Carlos Mendoza',
      date: '18 Jul 2026',
      startTime: '08:00 AM',
      endTime: '08:30 AM',
      duration: '30 min',
      areaCovered: '22.5 ha',
      status: 'completed',
      batteryUsed: 60,
      maxAltitude: '70 m',
      avgSpeed: '20.0 km/h',
      notes: 'Mapeo multiespectral completado sin novedades.'
    },
    {
      id: 'FL-2026-083',
      droneId: 'DRON-01',
      droneName: 'Agras Alpha (T40)',
      type: 'fumigation',
      typeName: 'Control de Maleza',
      location: 'Lote Norte - San Pedro Sula',
      pilot: 'Tec. Mario Aguilar',
      date: '17 Jul 2026',
      startTime: '06:30 AM',
      endTime: '07:10 AM',
      duration: '40 min',
      areaCovered: '25.0 ha',
      productApplied: 'Herbicida Selectivo',
      volumeApplied: '500 L',
      status: 'completed',
      batteryUsed: 88,
      maxAltitude: '3.5 m',
      avgSpeed: '18.0 km/h',
      notes: 'Aplicación matutina con viento menor a 5 km/h.'
    }
  ]);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedFlight, setSelectedFlight] = useState<FlightLog | null>(null);

  // Filtrado dinámico
  const filteredFlights = flights.filter((f) => {
    const matchesSearch =
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.droneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.pilot.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesType = typeFilter === 'all' || f.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Métricas
  const totalArea = flights
    .filter((f) => f.status === 'completed')
    .reduce((acc, f) => acc + parseFloat(f.areaCovered), 0)
    .toFixed(1);

  const totalHours = (
    flights.reduce((acc, f) => acc + parseInt(f.duration), 0) / 60
  ).toFixed(1);

  const successRate = Math.round(
    (flights.filter((f) => f.status === 'completed').length / flights.length) * 100
  );

  // Badge de Estado
  const getStatusBadge = (status: FlightLog['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
            <CheckCircle2 size={11} />
            Completado
          </span>
        );
      case 'interrupted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 shrink-0">
            <AlertTriangle size={11} />
            Pausado
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 shrink-0">
            <XCircle size={11} />
            Abortado
          </span>
        );
    }
  };

  // Badge de Tipo de Misión
  const getTypeBadge = (type: FlightLog['type']) => {
    switch (type) {
      case 'fumigation':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
            <Droplets size={11} className="text-cyan-600 shrink-0" />
            Fumigación
          </span>
        );
      case 'mapping':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            <Layers size={11} className="text-emerald-600 shrink-0" />
            Mapeo / NDVI
          </span>
        );
      case 'inspection':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
            <Activity size={11} className="text-purple-600 shrink-0" />
            Inspección
          </span>
        );
    }
  };

  return (
    /* EL CONTENEDOR PRINCIPAL ES QUIEN TIENE EL SCROLL VERTICAL DE PANTALLA COMPLETA */
    <div className="w-full h-full bg-[#f8fafc] overflow-y-auto p-3 sm:p-5 space-y-4">
      
      {/* ================= ENCABEZADO Y RESUMEN ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            Historial de Bitácora y Vuelos
            <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full border border-gray-200">
              {flights.length} Registros
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Registro detallado de misiones de aspersión, fotogrametría y vuelos de prospección.
          </p>
        </div>

        <button
          onClick={() => {}}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow-xs"
        >
          <Download size={14} />
          <span>Exportar Bitácora (CSV)</span>
        </button>
      </div>

      {/* ================= TARJETAS DE KPIs RÁPIDOS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Área Cubierta Total</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalArea} <span className="text-xs font-normal text-gray-500">ha</span></h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <Navigation size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Tiempo Acumulado</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalHours} <span className="text-xs font-normal text-gray-500">hrs</span></h3>
          </div>
          <div className="p-2.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-xl shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Tasa de Éxito</p>
            <h3 className="text-xl font-bold text-emerald-700 mt-0.5">{successRate}%</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Volumen Aplicado</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">1,400 <span className="text-xs font-normal text-gray-500">L</span></h3>
          </div>
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl shrink-0">
            <Droplets size={18} />
          </div>
        </div>
      </div>

      {/* ================= FILTROS Y BÚSQUEDA ================= */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Buscar por ID, Dron, Ubicación o Piloto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todas las Misiones</option>
            <option value="fumigation">Fumigación</option>
            <option value="mapping">Mapeo / NDVI</option>
            <option value="inspection">Inspección Térmica</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todos los Estados</option>
            <option value="completed">Completados</option>
            <option value="interrupted">Pausados / Incompletos</option>
            <option value="failed">Abortados</option>
          </select>
        </div>
      </div>

      {/* ================= TABLA NATURAL (SIN SCROLL INTERNO) ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden w-full">
        <table className="w-full table-fixed text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-[22%] sm:w-[18%]">ID / Fecha</th>
              <th className="py-2.5 px-2 w-[30%] sm:w-[24%]">Dron / Misión</th>
              <th className="py-2.5 px-2 hidden sm:table-cell w-[20%]">Ubicación / Piloto</th>
              <th className="py-2.5 px-2 w-[18%] sm:w-[14%] text-center">Duración / Área</th>
              <th className="py-2.5 px-2 w-[18%] sm:w-[14%] text-center">Estado</th>
              <th className="py-2.5 px-2 w-[12%] sm:w-[10%] text-center">Ver</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <tr
                  key={flight.id}
                  className="hover:bg-gray-50/70 transition cursor-pointer"
                  onClick={() => setSelectedFlight(flight)}
                >
                  {/* ID y Fecha */}
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-gray-900 text-xs">{flight.id}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar size={10} />
                      {flight.date}
                    </div>
                  </td>

                  {/* Dron y Tipo */}
                  <td className="py-2.5 px-2 truncate">
                    <div className="font-semibold text-gray-800 truncate text-xs">
                      {flight.droneName}
                    </div>
                    <div className="mt-0.5">{getTypeBadge(flight.type)}</div>
                  </td>

                  {/* Ubicación y Piloto */}
                  <td className="py-2.5 px-2 hidden sm:table-cell truncate">
                    <div className="text-gray-700 font-medium truncate flex items-center gap-1">
                      <MapPin size={11} className="text-gray-400 shrink-0" />
                      <span className="truncate">{flight.location}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 truncate flex items-center gap-1 mt-0.5">
                      <User size={10} />
                      <span className="truncate">{flight.pilot}</span>
                    </div>
                  </td>

                  {/* Área y Duración */}
                  <td className="py-2.5 px-2 text-center">
                    <div className="font-bold text-gray-900 text-xs">{flight.areaCovered}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-0.5 mt-0.5">
                      <Clock size={10} />
                      {flight.duration}
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="py-2.5 px-2 text-center">
                    {getStatusBadge(flight.status)}
                  </td>

                  {/* Acción */}
                  <td className="py-2.5 px-2 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFlight(flight);
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-lg transition inline-flex items-center justify-center"
                      title="Ver Telemetría Completa"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                  No se encontraron registros de vuelo con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer estático al final de la tabla */}
        <div className="p-3 px-4 bg-gray-50/80 border-t border-gray-100 text-[11px] text-gray-500 flex justify-between items-center">
          <span>Mostrando {filteredFlights.length} de {flights.length} registros</span>
        </div>
      </div>

      {/* ================= MODAL DETALLADO DE MISIÓN ================= */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0E5E6F] text-white rounded-xl font-bold text-xs">
                  {selectedFlight.id}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {selectedFlight.typeName}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {selectedFlight.droneName} • {selectedFlight.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFlight(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-xl transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Ubicación</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#0E5E6F]" />
                    {selectedFlight.location}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Piloto a Cargo</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                    <User size={12} className="text-[#0E5E6F]" />
                    {selectedFlight.pilot}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Duración</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedFlight.duration}</span>
                  <span className="text-[9px] text-gray-400 block">{selectedFlight.startTime} - {selectedFlight.endTime}</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Área Cubierta</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedFlight.areaCovered}</span>
                  <span className="text-[9px] text-gray-400 block">Vel. Media: {selectedFlight.avgSpeed}</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Batería Usada</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedFlight.batteryUsed}%</span>
                  <span className="text-[9px] text-gray-400 block">Alt. Máx: {selectedFlight.maxAltitude}</span>
                </div>
              </div>

              {selectedFlight.productApplied && (
                <div className="p-3 bg-cyan-50/60 border border-cyan-100 rounded-xl">
                  <h4 className="font-bold text-cyan-950 text-xs mb-1 flex items-center gap-1.5">
                    <Droplets size={14} className="text-cyan-600" />
                    Detalles de Aplicación Líquida
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-cyan-900 mt-2">
                    <div>
                      <span className="text-gray-500 text-[10px] block">Producto / Insumo:</span>
                      <span className="font-semibold">{selectedFlight.productApplied}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Volumen Despachado:</span>
                      <span className="font-semibold">{selectedFlight.volumeApplied}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">
                  Observaciones de la Misión
                </span>
                <p className="text-gray-700 leading-relaxed italic">
                  "{selectedFlight.notes || 'Sin observaciones registradas.'}"
                </p>
              </div>
            </div>

            <div className="p-3 px-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {}}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0E5E6F] hover:underline"
              >
                <FileText size={13} />
                <span>Descargar Telemetría KML</span>
              </button>

              <button
                onClick={() => setSelectedFlight(null)}
                className="px-3.5 py-1.5 bg-[#0E5E6F] text-white font-semibold text-xs rounded-xl hover:bg-[#0A4754] transition cursor-pointer"
              >
                Cerrar Bitácora
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
// Ayuda a Pilotos
export const HelpPilotView = () => {
  // Avatar del Piloto actual (Tú)
  const pilotAvatar = "src/img/piloto_perfil.png";

  // Lista de canales de soporte y administradores disponibles para el Piloto
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'soporte_hardware',
      name: 'Ing. Carlos Mendoza',
      role: 'Soporte Técnico & Hardware',
      roleType: 'admin',
      avatar: 'src/img/admin_perfil.png',
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'granjero', // Corregido según interface Message ('granjero' | 'other')
          text: '¡Hola Javier! Vimos que reportaste una fluctuación en el GPS del Dron #2.',
          time: '08:15 AM'
        },
        {
          id: 2,
          sender: 'other', // Mensaje enviado por el Piloto
          text: 'Hola Carlos. Sí, al sobrevolar la Parcela B en Catacamas perdí señal RTK por 10 segundos.',
          time: '08:18 AM'
        },
        {
          id: 3,
          sender: 'granjero',
          text: 'Ya actualizamos la tabla de satélites en tu estación base. Realiza una recalibración de brújula antes del próximo despegue.',
          time: '08:22 AM'
        }
      ]
    },
    {
      id: 'coordinacion_operaciones',
      name: 'Dra. Elena Ramos',
      role: 'Super Admin - Operaciones de Campo',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Dra. Elena, la misión en Finca El Naranjal quedó completada al 100%.',
          time: 'Ayer'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Excelente trabajo Javier. Los datos multiespectrales ya fueron validados por el cliente.',
          time: 'Ayer'
        }
      ]
    },
    {
      id: 'mantenimiento_drones',
      name: 'Técnico Roberto Paz',
      role: 'Mantenimiento & Baterías',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'hoy a las 09:30 AM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: 'Javier, recuerda traer las baterías Pack #4 a revisión preventiva este viernes.',
          time: 'Lunes'
        },
        {
          id: 2,
          sender: 'other',
          text: 'Enterado Roberto. Las entrego en el taller al finalizar el vuelo de Catacamas.',
          time: 'Lunes'
        }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState<string>('soporte_hardware');
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estados para Modal de Solicitud de Asistencia de Piloto
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [supportForm, setSupportForm] = useState({
    dron: 'Dron #2 - DJi Agras T40',
    categoria: 'Falla de Telemetría / GPS',
    prioridad: 'Alta (En Campo)',
    descripcion: ''
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Enviar mensaje como Piloto (sender: 'other')
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'other', // El piloto envía el mensaje
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      })
    );

    setInputText('');
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.descripcion.trim()) return;
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setSupportForm({
      dron: 'Dron #2 - DJi Agras T40',
      categoria: 'Falla de Telemetría / GPS',
      prioridad: 'Alta (En Campo)',
      descripcion: ''
    });
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative">
      <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden">
        
        {/* ================= BARRA LATERAL (CANALES DE SOPORTE ADMIN) ================= */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-gray-50/60 h-full min-h-0 shrink-0">
          
          {/* TÍTULO Y BOTÓN DE ASISTENCIA */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">Soporte Piloto</h2>
              <p className="text-xs text-gray-500">Asistencia Técnica & Admins</p>
            </div>

            {/* BOTÓN NUEVO TICKET / ASISTENCIA */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <Wrench size={15} />
              <span>Pedir Ayuda</span>
            </button>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="p-3 border-b border-gray-200 bg-gray-50/80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar administrador o área..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0E5E6F] transition"
              />
            </div>
          </div>

          {/* LISTA DE CHATS CON ADMINS */}
          <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
            {filteredChats.map((chat) => {
              const lastMsg = chat.messages[chat.messages.length - 1];
              const isSelected = chat.id === activeChatId;

              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats((prev) =>
                      prev.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`w-full p-4 flex items-center gap-3 transition text-left cursor-pointer ${
                    isSelected ? 'bg-white border-l-4 border-[#0E5E6F]' : 'hover:bg-gray-100/80'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-xs"
                    />
                    <span 
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        chat.online ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h3>
                      {lastMsg && (
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 ml-1">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0E5E6F] font-semibold mb-1 truncate">{chat.role}</p>
                    {lastMsg && (
                      <p className="text-xs text-gray-500 truncate">
                        {lastMsg.sender === 'other' ? 'Tú: ' : ''}
                        {lastMsg.text}
                      </p>
                    )}
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="shrink-0">
                      <span className="bg-[#0E5E6F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full block">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ÁREA DE CONVERSACIÓN ================= */}
        <div className="flex-1 flex flex-col h-full min-h-0 bg-[#f8fafc] overflow-hidden">
          
          {/* HEADER DEL CHAT */}
          <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between gap-2 shrink-0 min-w-0">
            
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h2 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
                  {activeChat.name}
                </h2>
                
                <span className="text-xs text-[#0E5E6F] font-medium truncate mt-0.5">
                  {activeChat.role}
                </span>

                <div className="text-xs text-gray-500 mt-0.5">
                  {activeChat.online ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      En línea para soporte
                    </span>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block shrink-0"></span>
                      <span className="truncate">
                        Desconectado {activeChat.lastSeen ? `(${activeChat.lastSeen})` : ''}
                      </span>
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center gap-1 text-gray-500 shrink-0">
              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Llamada directa"
              >
                <Phone size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Videollamada de asistencia"
              >
                <Video size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Opciones"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* HISTORIAL DE MENSAJES */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
            {activeChat.messages.map((msg) => {
              // Desde la vista del Piloto: 'other' representa mis mensajes (Piloto)
              const isPilotMsg = msg.sender === 'other';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isPilotMsg ? 'justify-end' : 'justify-start'}`}
                >
                  {!isPilotMsg && (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm ${
                      isPilotMsg
                        ? 'bg-[#0E5E6F] text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isPilotMsg ? 'text-cyan-100' : 'text-gray-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      
                      {isPilotMsg && (
                        <CheckCheck size={14} className="text-cyan-200" />
                      )}
                    </div>
                  </div>

                  {isPilotMsg && (
                    <img
                      src={pilotAvatar}
                      alt="Piloto Javier Reyes"
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0 border border-gray-200"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* FORMULARIO DE ENTRADA DE MENSAJES */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-xl transition shrink-0"
              title="Adjuntar log de vuelo o captura"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Escribe tu consulta o reporte al administrador..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0E5E6F] text-white rounded-xl hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      </div>

      {/* ================= MODAL DE SOLICITUD DE ASISTENCIA TÉCNICA ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Header del Modal */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                  <Wrench size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Solicitar Asistencia Técnica</h3>
                  <p className="text-xs text-gray-500">Reporte directo al Administrador / Soporte</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-5">
              {!isSubmitted ? (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Dron Asignado / Equipo
                    </label>
                    <select
                      value={supportForm.dron}
                      onChange={(e) => setSupportForm({ ...supportForm, dron: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Dron #1 - DJI Mavic 3 Multispectral">Dron #1 - DJI Mavic 3 Multispectral</option>
                      <option value="Dron #2 - DJI Agras T40">Dron #2 - DJI Agras T40</option>
                      <option value="Dron #3 - Sentera 65">Dron #3 - Sentera 65</option>
                      <option value="Estación Base RTK / Control">Estación Base RTK / Control</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tipo de Incidencia
                    </label>
                    <select
                      value={supportForm.categoria}
                      onChange={(e) => setSupportForm({ ...supportForm, categoria: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Falla de Telemetría / GPS">Falla de Telemetría / Pérdida RTK</option>
                      <option value="Calibración de Sensores">Calibración de Cámara / Sensores</option>
                      <option value="Desgaste / Falla Batería">Batería / Alarma de Voltaje</option>
                      <option value="Autorización de Ruta / Clima">Autorización de Vuelo / Alerta Climática</option>
                      <option value="Otro">Otro Problema Técnico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      value={supportForm.prioridad}
                      onChange={(e) => setSupportForm({ ...supportForm, prioridad: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Baja">Baja (Consulta general)</option>
                      <option value="Media">Media (Pre-vuelo)</option>
                      <option value="Alta (En Campo)">Alta (Operación detenida en campo)</option>
                      <option value="Urgente">Urgente (Falla crítica o falla de equipo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Detalle de la Falla o Solicitud
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe los síntomas, mensajes de error en el control o condiciones en campo..."
                      value={supportForm.descripcion}
                      onChange={(e) => setSupportForm({ ...supportForm, descripcion: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Enviar Reporte
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmación */
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-gray-900">¡Solicitud enviada!</h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      El equipo de administradores y soporte técnico ha recibido tu reporte de campo. Te contactarán por este chat.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={closeModal}
                      className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// 7. FARMER DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
export const FarmerDashboardView = () => {
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDrone, setSelectedDrone] = useState<string>("DJI Agras T50");
  const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

  const [lands, setLands] = useState<Land[]>([
    {
      id: 1,
      name: "Finca El Aguán",
      area: "42 ha",
      sector: "Sabana de Tepusteca, Olanchito, Yoro",
      crop: "Maíz Híbrido Amarillo",
      variety: "Dekalb DK-7508",
      image: "src/img/maiz.png",
      health: "Buena",
      lastInspection: "18 Jul 2026",
      notes:
        "Desarrollo foliar óptimo. Se requiere monitoreo preventivo de mancha de asfalto.",
    },
    {
      id: 2,
      name: "Plantación San Lorenzo",
      area: "28 ha",
      sector: "Sector San Lorenzo, Olanchito, Yoro",
      crop: "Banano de Exportación",
      variety: "Gran Enano / Cavendish",
      image: "src/img/banano.png",
      health: "Atención",
      lastInspection: "12 Jul 2026",
      notes:
        "Detectada presencia de Sigatoka Negra en el bloque sur. Fumigación aérea urgente recomendada.",
    },
    {
      id: 3,
      name: "Lote El Mamón",
      area: "15 ha",
      sector: "Comunidad El Mamón, Olanchito, Yoro",
      crop: "Yuca Industrial",
      variety: "M-Col 2215",
      image: "src/img/yuca.png",
      health: "Crítica",
      lastInspection: "05 Jul 2026",
      notes:
        "Deficiencia nutricional severa por nitrógeno y humedad heterogénea.",
    },
    {
      id: 4,
      name: "Finca Agalteca",
      area: "60 ha",
      sector: "Aldea Agalteca, Olanchito, Yoro",
      crop: "Palma Africana",
      variety: "Tenera Guineensis",
      image: "src/img/palma.png",
      health: "Buena",
      lastInspection: "19 Jul 2026",
      notes:
        "Etapa de maduración de racimos. Sin avistamiento de gusano cabrito ni amarillamiento.",
    },
  ]);

  const [formData, setFormData] = useState({
    landName: "Finca El Aguán (Sabana de Tepusteca)",
    area: "42",
    crop: "Maíz Híbrido Amarillo (Dekalb DK-7508)",
    service: "Fumigación de Precisión y Mapeo NDVI",
    date: "2026-07-28",
  });

  const getHealthBadge = (health: HealthStatus) => {
    switch (health) {
      case "Buena":
        return "text-emerald-800 bg-emerald-50 border-emerald-200";
      case "Atención":
        return "text-amber-800 bg-amber-50 border-amber-200";
      case "Crítica":
        return "text-rose-800 bg-rose-50 border-rose-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const handleHealthChange = (id: number, newHealth: HealthStatus) => {
    setLands((prevLands) =>
      prevLands.map((land) =>
        land.id === id ? { ...land, health: newHealth } : land,
      ),
    );
  };

  const handleSelectLandForService = (land: Land) => {
    setFormData((prev) => ({
      ...prev,
      landName: `${land.name} (${land.sector.split(",")[0]})`,
      area: land.area.replace(" ha", ""),
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
                        onChange={(e) =>
                          handleHealthChange(
                            land.id,
                            e.target.value as HealthStatus,
                          )
                        }
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
                    <Title
                      as="h3"
                      className="text-xl font-black text-gray-800 mb-1"
                    >
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
                      <Text className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                        Extensión Terreno
                      </Text>
                      <Text className="font-black text-[#0E5E6F] text-base">
                        {land.area}
                      </Text>
                    </div>
                    <div>
                      <Text className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                        Último Análisis
                      </Text>
                      <Text className="font-bold text-xs text-gray-700 flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-gray-400" />{" "}
                        {land.lastInspection}
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
              <Title
                as="h3"
                className="text-sm font-black text-gray-800 normal-case"
              >
                Solicitar Unidad Aérea
              </Title>

              <div className="flex items-center justify-between gap-1 mt-2.5">
                {[
                  { n: 1, label: "Finca" },
                  { n: 2, label: "Servicio" },
                  { n: 3, label: "Equipo" },
                ].map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div
                      onClick={() => {
                        setStep(s.n);
                        setRequestSuccess(false);
                      }}
                      className="flex flex-col items-center gap-0.5 cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                          step >= s.n
                            ? "bg-[#0E5E6F] text-white shadow-sm"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {s.n}
                      </div>
                      <Text
                        className={`text-[8px] font-bold uppercase tracking-wider ${
                          step >= s.n ? "text-[#0E5E6F]" : "text-gray-400"
                        }`}
                      >
                        {s.label}
                      </Text>
                    </div>
                    {i < 2 && (
                      <div
                        className={`flex-1 h-0.5 mb-2.5 mx-0.5 transition-all ${
                          step > s.n ? "bg-[#0E5E6F]" : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              {requestSuccess ? (
                <div className="py-4 text-center flex flex-col items-center justify-center gap-2">
                  <CheckCircle2
                    size={36}
                    className="text-emerald-500 animate-bounce"
                  />
                  <Title as="h4" className="text-sm font-bold text-gray-800">
                    ¡Orden Registrada!
                  </Title>
                  <Text className="text-[11px] text-gray-500 px-1 leading-snug">
                    Unidad programada para <strong>{formData.landName}</strong>.
                    Un operador se comunicará para verificar el clima.
                  </Text>
                  <button
                    onClick={() => {
                      setStep(1);
                      setRequestSuccess(false);
                    }}
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
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">
                          Finca Destino
                        </label>
                        <select
                          value={formData.landName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              landName: e.target.value,
                            })
                          }
                          className="w-full text-xs font-medium border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-[#0E5E6F] focus:outline-none bg-white"
                        >
                          {lands.map((l) => (
                            <option
                              key={l.id}
                              value={`${l.name} (${l.sector.split(",")[0]})`}
                            >
                              {l.name} - {l.crop} ({l.area})
                            </option>
                          ))}
                        </select>
                      </div>

                      <WireframeInput
                        label="Área a Aplicar (ha)"
                        value={formData.area}
                        onChange={(e: any) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                        placeholder="Ej: 25"
                      />

                      <div className="p-2.5 bg-teal-50 border border-teal-100 rounded-lg text-left">
                        <Text className="text-[10px] text-teal-800 font-bold flex items-center gap-1">
                          <Sprout size={12} className="shrink-0" /> Cobertura
                          Olanchito
                        </Text>
                        <Text className="text-[9px] text-teal-600 mt-0.5 leading-tight">
                          Despliegue activo en Tepusteca, San Lorenzo, Agalteca
                          y zonas aledañas.
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
                        onChange={(e: any) =>
                          setFormData({ ...formData, crop: e.target.value })
                        }
                        placeholder="Ej: Banano (Gran Enano)"
                      />
                      <WireframeInput
                        label="Servicio Solicitado"
                        value={formData.service}
                        onChange={(e: any) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        placeholder="Ej: Fumigación con Funguicida o NDVI"
                      />
                      <WireframeInput
                        label="Fecha de Aplicación"
                        type="date"
                        value={formData.date}
                        onChange={(e: any) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
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
                          {
                            name: "DJI Agras T50",
                            pilot: "Ing. Carlos Sosa",
                            rate: "L 380/ha",
                            desc: "50kg cap. / Alta precisión",
                          },
                          {
                            name: "DJI Agras T40",
                            pilot: "Javier Reyes",
                            rate: "L 320/ha",
                            desc: "40kg cap. / Atomización",
                          },
                        ].map((d, i) => {
                          const isSelected = selectedDrone === d.name;
                          return (
                            <div
                              key={i}
                              onClick={() => setSelectedDrone(d.name)}
                              className={`border rounded-lg p-2 cursor-pointer transition-all ${
                                isSelected
                                  ? "border-[#0E5E6F] bg-[#0E5E6F]/5"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <Text
                                  className={`font-bold text-xs ${isSelected ? "text-[#0E5E6F]" : "text-gray-800"}`}
                                >
                                  {d.name}
                                </Text>
                                <span className="text-[10px] font-black text-[#0E5E6F]">
                                  {d.rate}
                                </span>
                              </div>
                              <Text className="text-[9px] text-gray-500">
                                Piloto: {d.pilot}
                              </Text>
                              <Text className="text-[8px] text-gray-400">
                                {d.desc}
                              </Text>
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
              <Title as="h3" className="text-base font-black text-gray-800">
                Registrar Parcela en Olanchito
              </Title>
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
                const newName = (
                  form.elements.namedItem("landName") as HTMLInputElement
                ).value;
                const newSector = (
                  form.elements.namedItem("landSector") as HTMLInputElement
                ).value;
                const newArea = (
                  form.elements.namedItem("landArea") as HTMLInputElement
                ).value;
                const newCrop = (
                  form.elements.namedItem("landCrop") as HTMLInputElement
                ).value;

                if (newName) {
                  setLands((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      name: newName,
                      area: `${newArea || "10"} ha`,
                      sector: `${newSector || "Sector Centro"}, Olanchito, Yoro`,
                      crop: newCrop || "Maíz Amarillo",
                      variety: "Variedad Local",
                      image: "src/img/maiz.png",
                      health: "Buena",
                      lastInspection: "Hoy",
                      notes:
                        "Parcela incorporada recientemente al sistema de monitoreo.",
                    },
                  ]);
                  setIsModalOpen(false);
                }
              }}
              className="space-y-3"
            >
              <WireframeInput
                name="landName"
                label="Nombre de la Finca"
                placeholder="Ej: Finca Las Camelias"
                required
              />
              <WireframeInput
                name="landSector"
                label="Aldea o Sector (Olanchito)"
                placeholder="Ej: San Lorenzo, Agalteca..."
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <WireframeInput
                  name="landArea"
                  label="Extensión (ha)"
                  placeholder="Ej: 20"
                  type="number"
                  required
                />
                <WireframeInput
                  name="landCrop"
                  label="Tipo de Cultivo"
                  placeholder="Ej: Banano, Maíz..."
                  required
                />
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

// 2. Comprar Dron (buy_dron_farmer)
export const BuyDronFarmerView = ({
  onRegisterPilot,
}: BuyDronFarmerViewProps) => {
  const [selectedDrone, setSelectedDrone] = useState<any | null>(null);

  const datosDrones = [
    {
      id: "dji-flycart-30",
      nombre: "DJI FlyCart 30",
      etiqueta: "Carga Ligera",
      imagen: "src/img/DJI_FlyCart_30.png",
      precio: "L 450,000",
      descripcion:
        "Capacidad de carga útil de 30 kg con rango operativo extendido y resistencia climática.",
      destacado: true,
      especificaciones: {
        "Capacidad de Carga": "30 kg",
        "Tiempo de Vuelo": "18 min",
        "Velocidad Máxima": "72 km/h",
        "Rango Operativo": "28 km",
        "Resistencia al Viento": "12 m/s",
        "Sistema de Navegación": "RTK Dual / GNSS",
        "Clasificación IP": "IP55",
      },
    },
    {
      id: "ehang-184",
      nombre: "Ehang 184",
      etiqueta: "Pasajeros",
      imagen: "src/img/Ehang_184.png",
      precio: "L 2,400,000",
      descripcion:
        "Vehículo aéreo autónomo eléctrico diseñado para transporte seguro de un pasajero o carga mayor.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "100 kg",
        "Tiempo de Vuelo": "23 min",
        "Velocidad Máxima": "100 km/h",
        "Rango Operativo": "30 km",
        "Potencia de Batería": "14.2 kWh",
        "Sistema de Seguridad": "Fail-safe redundante",
        "Control de Vuelo": "Autónomo 4G/5G",
      },
    },
    {
      id: "griff-300",
      nombre: "GRIFF Aviation 300",
      etiqueta: "Carga Pesada",
      imagen: "src/img/GRIFF_Aviation_300.png",
      precio: "L 1,850,000",
      descripcion:
        "Megadron industrial octocóptero diseñado específicamente para la elevación de insumos pesados.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "227 kg",
        "Tiempo de Vuelo": "31 min",
        "Velocidad Máxima": "60 km/h",
        "Rango Operativo": "15 km",
        Configuración: "Octocóptero pesado",
        Aplicación: "Industrial / Agrícola",
        Certificación: "Comercial Avanzada",
      },
    },
    {
      id: "freefly-alta-x",
      nombre: "Freefly Alta X",
      etiqueta: "Cinematografía / Carga",
      imagen: "src/img/Freefly_Alta_X.png",
      precio: "L 620,000",
      descripcion:
        "Diseñado para cinematografía y transporte de carga con capacidad de elevación de hasta 15 kg, redefiniendo las capacidades de toma aérea e inspección detallada.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "15 kg",
        "Tiempo de Vuelo": "20 min",
        "Velocidad Máxima": "95 km/h",
        "Distancia Transmisión": "5 km",
        "Diámetro Desplegado": "2273 x 877 x 387 mm",
        "Peso Vacío": "10.86 kg",
        "Temperatura Operativa": "-10° a 40°C",
      },
    },
    {
      id: "jouav-cw-80e",
      nombre: "JOUAV CW-80E",
      etiqueta: "Largo Alcance",
      imagen: "src/img/JOUAV_CW-80E.png",
      precio: "L 1,150,000",
      descripcion:
        "Drone de ala fija con autonomía de hasta 840 minutos a 135 km/h. Diseñado para mapeo masivo e integración de sensores LiDAR de alta precisión.",
      destacado: false,
      especificaciones: {
        "Capacidad de Carga": "25 kg",
        "Tiempo de Vuelo": "840 min",
        "Velocidad Máxima": "135 km/h",
        "Distancia Transmisión": "100/200 km",
        Dimensiones: "Fuselaje: 3000mm, Envergadura: 5200mm",
        "Peso Máximo Despegue": "110 kg",
        "Temperatura Operativa": "-20° a 55°C",
      },
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      {/* CABECERA PRINCIPAL */}
      <div className="border-b border-gray-200 pb-5 text-left">
        <Title className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <span>Adquisición de Drones Industriales</span>
          <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#0E5E6F]/20">
            Catálogo Oficial
          </span>
        </Title>
        <Text className="text-xs text-gray-500 mt-1 block">
          Explora la flota de drones agrícolas e industriales homologados para
          operar dentro de la plataforma BioDron.
        </Text>
      </div>

      {/* BANNER / ADVERTENCIA DE REQUISITO DE CUENTA DE PILOTO */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 md:p-6 text-amber-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden text-left">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-amber-500 text-white rounded-xl shrink-0 shadow-sm">
            <ShieldAlert size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Title as="h3" className="font-bold text-base text-amber-950">
                Requisito Obligatorio: Licencia y Cuenta de Piloto
              </Title>
              <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide">
                Seguridad Aérea
              </span>
            </div>
            <Text className="text-xs text-amber-800 leading-relaxed max-w-3xl font-medium block">
              Por regulaciones de aviación civil y seguridad operativa, la
              compra directa de aeronaves no tripuladas está restringida a
              cuentas verificadas de{" "}
              <strong>Piloto con Licencia Vigente</strong>. Como cuenta de
              Agricultor, puedes explorar el catálogo y solicitar asistencia
              para la transición de tu perfil.
            </Text>
          </div>
        </div>

        <button
          onClick={() => {
            if (onRegisterPilot) {
              onRegisterPilot();
            } else {
              alert(
                "Serás redirigido al formulario de actualización de cuenta para verificar tu Licencia de Piloto.",
              );
            }
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0 border border-amber-700 cursor-pointer"
        >
          <Award size={15} />
          <span>Registrar Licencia de Piloto</span>
        </button>
      </div>

      {/* LISTA DE CARDS HORIZONTALES DE DRONES */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        {datosDrones.map((drone) => (
          <div
            key={drone.id}
            className={`relative bg-white rounded-2xl border transition-all flex flex-col md:flex-row overflow-visible shadow-sm hover:shadow-md ${
              drone.destacado
                ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Insignia "Destacado" centrada sobre la card */}
            {drone.destacado && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#0E5E6F] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1 border border-white">
                <Zap size={12} /> Destacado
              </span>
            )}

            {/* Imagen en lateral izquierdo */}
            <div className="relative bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-2/5 shrink-0 min-h-[220px] md:min-h-full overflow-hidden rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl group">
              {/* Etiqueta arriba a la esquina izquierda */}
              <span className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs text-gray-800 border border-gray-200/80 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-xs">
                {drone.etiqueta}
              </span>

              <img
                src={drone.imagen}
                alt={drone.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            {/* Detalles del Dron en lateral derecho */}
            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4 text-left">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <Title
                    as="h3"
                    className="text-xl font-extrabold text-gray-900"
                  >
                    {drone.nombre}
                  </Title>
                  <Text className="text-xl font-black text-[#0E5E6F]">
                    {drone.precio}
                  </Text>
                </div>
                <Text className="text-xs text-gray-600 line-clamp-2 font-medium leading-relaxed block mt-1">
                  {drone.descripcion}
                </Text>
              </div>

              {/* Especificaciones clave rápidas */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-400 text-[10px] uppercase">
                    Carga Útil
                  </span>
                  <span className="font-bold text-gray-800">
                    {drone.especificaciones["Capacidad de Carga"]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-400 text-[10px] uppercase">
                    Tiempo de Vuelo
                  </span>
                  <span className="font-bold text-gray-800">
                    {drone.especificaciones["Tiempo de Vuelo"]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-400 text-[10px] uppercase">
                    Velocidad Máx
                  </span>
                  <span className="font-bold text-gray-800">
                    {drone.especificaciones["Velocidad Máxima"]}
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedDrone(drone)}
                  className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info size={14} />
                  Ficha Técnica
                </button>

                <button
                  onClick={() =>
                    alert(
                      `Para comprar el ${drone.nombre} necesitas validar tu Cuenta de Piloto.`,
                    )
                  }
                  className="flex-1 py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag size={14} />
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL HORIZONTAL CON IMAGEN AMPLIADA QUE CUBRE MÁS ÁREA */}
      {selectedDrone && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200 text-left">
          <div className="bg-white rounded-2xl max-w-4xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col my-auto">
            {/* Header Modal */}
            <div className="px-5 py-3.5 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
              <div className="flex items-center gap-3">
                <Title as="h2" className="text-lg font-black text-gray-900">
                  {selectedDrone.nombre}
                </Title>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#0E5E6F]/10 text-[#0E5E6F] px-2.5 py-0.5 rounded-full border border-[#0E5E6F]/20">
                  {selectedDrone.etiqueta}
                </span>
              </div>
              <button
                onClick={() => setSelectedDrone(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenido Modal Horizontalizado */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Columna Izquierda: Imagen Ampliada (md:col-span-6) igual a las cards */}
              <div className="md:col-span-6 flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-xl overflow-hidden min-h-[240px]">
                <div className="relative w-full h-full min-h-[180px] bg-gray-100">
                  <img
                    src={selectedDrone.imagen}
                    alt={selectedDrone.nombre}
                    className="w-full h-full object-cover min-h-[200px]"
                  />
                </div>
                <div className="p-3.5 bg-white border-t border-gray-200">
                  <Text className="text-[10px] text-gray-400 uppercase font-extrabold block">
                    Precio Comercial
                  </Text>
                  <Text className="text-xl font-black text-[#0E5E6F] block mb-1">
                    {selectedDrone.precio}
                  </Text>
                  <Text className="text-xs text-gray-600 font-medium leading-relaxed block line-clamp-2">
                    {selectedDrone.descripcion}
                  </Text>
                </div>
              </div>

              {/* Columna Derecha: Especificaciones Técnicas */}
              <div className="md:col-span-6 flex flex-col justify-between gap-3">
                <div>
                  <Text className="text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-2 block">
                    Especificaciones Técnicas
                  </Text>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedDrone.especificaciones).map(
                      ([clave, valor]: any) => (
                        <div
                          key={clave}
                          className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-center"
                        >
                          <span className="text-[9px] text-gray-400 uppercase font-bold truncate">
                            {clave}
                          </span>
                          <span className="text-xs font-bold text-gray-800 truncate">
                            {valor}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Recordatorio de Licencia */}
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2.5 text-amber-900 text-[11px] font-medium">
                  <ShieldAlert size={16} className="shrink-0 text-amber-600" />
                  <span>
                    Requiere Licencia de Piloto certificada para la compra.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setSelectedDrone(null)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert(
                    `Iniciando solicitud para adquirir ${selectedDrone.nombre}`,
                  );
                  setSelectedDrone(null);
                }}
                className="px-4 py-2 bg-[#0E5E6F] text-white rounded-xl text-xs font-bold hover:bg-[#0A4552] transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <ShoppingBag size={14} />
                Solicitar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Mis Suscripciones (subscriptions)
export const SubscriptionsView = () => {
  const [activePlanId, setActivePlanId] = useState<string>("plan-profesional");
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<
    any | null
  >(null);

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "transfer" | "wallet"
  >("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const userWalletBalance = 3200;

  const datosPlanes = [
    {
      id: "plan-basico",
      nombre: "Plan Básico Agrícola",
      precio: "L 1,200",
      precioNum: 1200,
      periodo: "/mes",
      etiqueta: "Inicial",
      descripcion:
        "Optimización y análisis base para parcelas pequeñas y productores independientes.",
      caracteristicas: [
        "2 vuelos de monitoreo mensuales.",
        "Reportes analíticos de vigor en PDF.",
        "Cobertura de hasta 10 manzanas.",
      ],
      destacado: false,
    },
    {
      id: "plan-profesional",
      nombre: "Plan Operativo Profesional",
      precio: "L 2,800",
      precioNum: 2800,
      periodo: "/mes",
      etiqueta: "Mediano",
      descripcion:
        "Diseñado para fincas comerciales que requieren seguimiento constante y aspersión aérea.",
      caracteristicas: [
        "10 vuelos mensuales incluidos.",
        "Analítica multiespectral (NDVI / SAVI).",
        "Cobertura de hasta 50 manzanas.",
      ],
      destacado: true,
    },
    {
      id: "plan-corporativo",
      nombre: "Plan Premium Corporativo",
      precio: "L 5,500",
      precioNum: 5500,
      periodo: "/mes",
      etiqueta: "Corporativo",
      descripcion:
        "Infraestructura total para grandes agroindustrias con despliegues autónomos diarios.",
      caracteristicas: [
        "Vuelos y fumigación ilimitados.",
        "Telemetría y soporte crítico 24/7.",
        "Procesamiento en tiempo real con IA.",
      ],
      destacado: false,
    },
  ];

  const planActual = datosPlanes.find((p) => p.id === activePlanId);

  const handleConfirmSubscription = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setActivePlanId(selectedPlanForCheckout.id);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedPlanForCheckout(null);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="p-3 md:p-5 max-w-7xl mx-auto flex flex-col gap-4 font-sans text-left">
      {/* CABECERA PRINCIPAL */}
      <div className="border-b border-gray-200 pb-2.5 flex justify-between items-center">
        <div>
          <Title className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Gestión de Suscripciones</span>
            <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#0E5E6F]/20">
              Planes BioDron
            </span>
          </Title>
          <Text className="text-[11px] text-gray-500 block mt-0.5">
            Administra tu plan de monitoreo aéreo, facturación y métodos de
            pago.
          </Text>
        </div>
      </div>

      {/* ÁREA DE PROCESO DE PAGO ULTRA COMPACTA (SIN SCROLL) */}
      {selectedPlanForCheckout ? (
        <div className="flex flex-col gap-3 animate-in fade-in duration-200">
          <button
            onClick={() => setSelectedPlanForCheckout(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-gray-900 w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg border border-gray-200 transition"
          >
            <ArrowLeft size={14} /> Volver a selección de planes
          </button>

          {paymentSuccess ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2 my-2">
              <div className="p-2.5 bg-emerald-500 text-white rounded-full">
                <Check size={24} />
              </div>
              <Title as="h2" className="text-lg font-black text-emerald-950">
                ¡Suscripción Actualizada con Éxito!
              </Title>
              <Text className="text-xs text-emerald-800 font-medium max-w-md block">
                Tu cuenta ha sido actualizada al{" "}
                <strong>{selectedPlanForCheckout.nombre}</strong>.
              </Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              {/* RESUMEN DEL PLAN */}
              <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between gap-2">
                <div>
                  <Title
                    as="h3"
                    className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2"
                  >
                    Resumen de la Suscripción
                  </Title>

                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200 flex flex-col gap-1 mb-2">
                    <span className="text-[9px] font-extrabold uppercase text-[#0E5E6F] bg-[#0E5E6F]/10 px-2 py-0.5 rounded border border-[#0E5E6F]/20 w-fit">
                      {selectedPlanForCheckout.etiqueta}
                    </span>
                    <Title
                      as="h2"
                      className="text-base font-black text-gray-900"
                    >
                      {selectedPlanForCheckout.nombre}
                    </Title>
                    <Text className="text-[11px] text-gray-600 block leading-tight">
                      {selectedPlanForCheckout.descripcion}
                    </Text>
                    <div className="mt-1.5 pt-1.5 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="text-[11px] font-bold text-gray-500">
                        Total a pagar:
                      </span>
                      <span className="text-lg font-black text-[#0E5E6F]">
                        {selectedPlanForCheckout.precio}{" "}
                        <span className="text-[9px] text-gray-500 font-normal">
                          {selectedPlanForCheckout.periodo}
                        </span>
                      </span>
                    </div>
                  </div>

                  <Text className="text-[10px] font-bold text-gray-700 block mb-1">
                    Servicios incluidos:
                  </Text>
                  <ul className="flex flex-col gap-1 text-[11px] text-gray-600">
                    {selectedPlanForCheckout.caracteristicas.map(
                      (item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2
                            size={12}
                            className="text-[#0E5E6F] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-1.5 text-amber-900 text-[10px]">
                  <ShieldCheck size={14} className="text-amber-600 shrink-0" />
                  <span>Cobro recurrente mensual. Cancela cuando quieras.</span>
                </div>
              </div>

              {/* FORMULARIO DE PAGO ULTRA COMPACTO */}
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between gap-2">
                <div>
                  {/* Selector Verde de Métodos de Pago */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200 mb-2.5">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                        paymentMethod === "card"
                          ? "bg-[#0E5E6F] text-white shadow-xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      <CreditCard size={13} />
                      <span>Tarjeta</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("transfer")}
                      className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                        paymentMethod === "transfer"
                          ? "bg-[#0E5E6F] text-white shadow-xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      <Building2 size={13} />
                      <span>Transferencia</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("wallet")}
                      className={`py-1 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                        paymentMethod === "wallet"
                          ? "bg-[#0E5E6F] text-white shadow-xs"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                      }`}
                    >
                      <Wallet size={13} />
                      <span>Saldo BioDron</span>
                    </button>
                  </div>

                  {/* TARJETA DE CRÉDITO Y FORMULARIO */}
                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      {/* Tarjeta Visual de Proporción Real Compacta */}
                      <div className="sm:col-span-5 flex justify-center">
                        <div className="w-full max-w-[190px] aspect-[1.58/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0E5E6F] text-white p-2.5 rounded-lg shadow-sm border border-slate-700 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300">
                              BioDron
                            </span>
                            <CreditCard size={15} className="text-amber-400" />
                          </div>
                          <div>
                            <span className="text-[11px] font-mono tracking-wider block font-bold text-slate-100">
                              {cardData.number
                                ? cardData.number
                                    .replace(/(.{4})/g, "$1 ")
                                    .trim()
                                : "•••• •••• •••• ••••"}
                            </span>
                          </div>
                          <div className="flex justify-between items-end text-[9px]">
                            <div className="truncate max-w-[90px]">
                              <span className="text-[7px] text-slate-400 uppercase block leading-none">
                                Titular
                              </span>
                              <span className="font-bold tracking-wide uppercase truncate block mt-0.5">
                                {cardData.name || "NOMBRE TITULAR"}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] text-slate-400 uppercase block leading-none">
                                Vence
                              </span>
                              <span className="font-bold tracking-wider block mt-0.5">
                                {cardData.expiry || "MM/AA"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Campos Formulario Ultra Compacto */}
                      <div className="sm:col-span-7 grid grid-cols-2 gap-1.5 text-[11px]">
                        <div className="col-span-2 flex flex-col gap-0.5">
                          <label className="font-bold text-gray-700 text-[10px]">
                            Número de Tarjeta
                          </label>
                          <input
                            type="text"
                            maxLength={16}
                            placeholder="4000 0000 0000 0000"
                            value={cardData.number}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                number: e.target.value,
                              })
                            }
                            className="p-1 bg-gray-50 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                          />
                        </div>

                        <div className="col-span-2 flex flex-col gap-0.5">
                          <label className="font-bold text-gray-700 text-[10px]">
                            Titular
                          </label>
                          <input
                            type="text"
                            placeholder="Nombre impreso"
                            value={cardData.name}
                            onChange={(e) =>
                              setCardData({ ...cardData, name: e.target.value })
                            }
                            className="p-1 bg-gray-50 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                          />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <label className="font-bold text-gray-700 text-[10px]">
                            Vencimiento
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                expiry: e.target.value,
                              })
                            }
                            className="p-1 bg-gray-50 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                          />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <label className="font-bold text-gray-700 text-[10px]">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({ ...cardData, cvv: e.target.value })
                            }
                            className="p-1 bg-gray-50 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TRANSFERENCIA */}
                  {paymentMethod === "transfer" && (
                    <div className="flex flex-col gap-2 text-xs">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5">
                        <span className="font-bold text-gray-800 text-[11px] block mb-1">
                          Cuentas BioDron S.A.
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-1.5 bg-white border border-gray-200 rounded">
                            <span className="font-bold text-[#0E5E6F] block">
                              Banco de Occidente
                            </span>
                            <span className="text-gray-600 block">
                              Cuenta: 11-401-009823-1
                            </span>
                          </div>
                          <div className="p-1.5 bg-white border border-gray-200 rounded">
                            <span className="font-bold text-[#0E5E6F] block">
                              Ficohsa
                            </span>
                            <span className="text-gray-600 block">
                              Cuenta: 20000-847291
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-dashed border-gray-300 rounded-lg p-2.5 text-center flex items-center justify-center gap-2 hover:border-[#0E5E6F] transition cursor-pointer bg-gray-50/50">
                        <Upload size={16} className="text-[#0E5E6F]" />
                        <span className="font-bold text-gray-700 text-[11px]">
                          Subir Comprobante de Pago
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SALDO CUENTA BIODRON */}
                  {paymentMethod === "wallet" && (
                    <div className="flex flex-col gap-2 text-xs">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex justify-between items-center">
                        <div>
                          <span className="text-gray-500 font-medium block text-[10px]">
                            Saldo Disponible
                          </span>
                          <span className="text-lg font-black text-gray-900">
                            L{" "}
                            {userWalletBalance.toLocaleString("es-HN", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                          <Wallet size={18} />
                        </div>
                      </div>

                      {userWalletBalance < selectedPlanForCheckout.precioNum ? (
                        <div className="p-1.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-1.5 text-red-800 text-[11px]">
                          <AlertCircle
                            size={14}
                            className="shrink-0 text-red-600"
                          />
                          <span>
                            Saldo insuficiente. Falta L{" "}
                            {(
                              selectedPlanForCheckout.precioNum -
                              userWalletBalance
                            ).toLocaleString("es-HN")}
                            .
                          </span>
                        </div>
                      ) : (
                        <div className="p-1.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-1.5 text-emerald-800 text-[11px]">
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-emerald-600"
                          />
                          <span>
                            Saldo suficiente para cubrir el costo del plan.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  disabled={
                    isProcessing ||
                    (paymentMethod === "wallet" &&
                      userWalletBalance < selectedPlanForCheckout.precioNum)
                  }
                  onClick={handleConfirmSubscription}
                  className="w-full py-2 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] disabled:bg-gray-300 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <ShieldCheck size={15} />
                      <span>
                        Confirmar y Pagar {selectedPlanForCheckout.precio}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* VISTA PRINCIPAL CON PLAN ACTIVO Y INSIGNIA "DESTACADO" */
        <div className="flex flex-col gap-5">
          {planActual && (
            <div className="bg-white border border-[#0E5E6F] rounded-2xl p-4 shadow-xs flex flex-col gap-3">
              {/* Encabezado Plan Activo */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-gray-100 pb-3">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-[#0E5E6F] text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="bg-[#0E5E6F]/10 text-[#0E5E6F] border border-[#0E5E6F]/20 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Suscripción Activa
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Renovación Automática
                      </span>
                    </div>
                    <Title as="h2" className="text-lg font-black text-gray-900">
                      {planActual.nombre}
                    </Title>
                    <Text className="text-xs text-gray-600 block">
                      {planActual.descripcion}
                    </Text>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-1">
                  <span className="text-xl font-black text-[#0E5E6F]">
                    {planActual.precio}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      {planActual.periodo}
                    </span>
                  </span>

                  {/* Botón Visible de Cancelar Suscripción */}
                  <button
                    onClick={() =>
                      alert(
                        "Solicitud de cancelación recibida. Un representante se comunicará para confirmar la baja.",
                      )
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <XCircle size={14} />
                    <span>Cancelar Suscripción</span>
                  </button>
                </div>
              </div>

              {/* Detalles Extendidos de Facturación */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-gray-50/80 p-3 rounded-xl border border-gray-200/80">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#0E5E6F] shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-gray-400 block">
                      Fecha de Vencimiento
                    </span>
                    <span className="font-bold text-gray-800">
                      15 de Agosto, 2026
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-1.5 sm:pt-0 sm:pl-3">
                  <CreditCard size={16} className="text-[#0E5E6F] shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-gray-400 block">
                      Método Registrado
                    </span>
                    <span className="font-bold text-gray-800">
                      Visa terminada en •••• 4021
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-1.5 sm:pt-0 sm:pl-3">
                  <Zap size={16} className="text-[#0E5E6F] shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase font-extrabold text-gray-400 block">
                      Ciclo Actual
                    </span>
                    <span className="font-bold text-gray-800">
                      Día 12 de 30 (Vuelos activos)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CATÁLOGO DE PLANES */}
          <div>
            <div className="mb-2.5">
              <Title as="h3" className="text-base font-extrabold text-gray-900">
                Cambiar o Actualizar Plan
              </Title>
              <Text className="text-xs text-gray-500 block">
                Selecciona la opción que mejor se adapte al volumen de hectáreas
                y vuelos requeridos.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {datosPlanes.map((plan) => {
                const esPlanActual = plan.id === activePlanId;

                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white rounded-2xl border transition-all flex flex-col justify-between p-4 shadow-xs hover:shadow-md ${
                      plan.destacado
                        ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* INSIGNIA "DESTACADO" */}
                    {plan.destacado && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#0E5E6F] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white">
                        <Zap size={11} /> Destacado
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gray-100 text-gray-800 border border-gray-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {plan.etiqueta}
                        </span>
                        {esPlanActual && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            Actual
                          </span>
                        )}
                      </div>

                      <Title
                        as="h3"
                        className="text-base font-extrabold text-gray-900 mb-1"
                      >
                        {plan.nombre}
                      </Title>

                      <div className="mb-2">
                        <span className="text-2xl font-black text-[#0E5E6F]">
                          {plan.precio}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {plan.periodo}
                        </span>
                      </div>

                      <Text className="text-xs text-gray-600 font-medium leading-relaxed block mb-4">
                        {plan.descripcion}
                      </Text>

                      <div className="border-t border-gray-100 pt-2.5 mb-4">
                        <Text className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1.5">
                          Capacidades Incluidas:
                        </Text>
                        <ul className="flex flex-col gap-1.5">
                          {plan.caracteristicas.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1.5 text-xs text-gray-700"
                            >
                              <CheckCircle2
                                size={13}
                                className="text-[#0E5E6F] shrink-0 mt-0.5"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      disabled={esPlanActual}
                      onClick={() => setSelectedPlanForCheckout(plan)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        esPlanActual
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                          : plan.destacado
                            ? "bg-[#0E5E6F] hover:bg-[#0A4552] text-white shadow-xs"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                      }`}
                    >
                      {esPlanActual ? "Plan Actual" : "Cambiar a este plan"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. Historial de Reportes (reports)
export const ReportsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "vuelos" | "facturacion"
  >("all");

  // Datos mockeados de Vuelos y Misiones Aéreas
  const historialVuelos: FlightLog[] = [
    {
      id: "V-2026-089",
      fecha: "18 Jul, 2026",
      parcela: "Finca El Naranjal - Sector A",
      manzanas: 18.5,
      servicio: "Aspersión Aérea de Fitosanitarios",
      dron: "BioDron Agras T40",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
    },
    {
      id: "V-2026-082",
      fecha: "12 Jul, 2026",
      parcela: "Lote Las Camelias - Parcela 3",
      manzanas: 32.0,
      servicio: "Análisis Multiespectral (NDVI)",
      dron: "Phantom 4 Multispectral",
      piloto: "Lic. Sofia Ramos",
      estado: "Completado",
      reporteDisponible: true,
    },
    {
      id: "V-2026-075",
      fecha: "02 Jul, 2026",
      parcela: "Valle Central - Seccion Norte",
      manzanas: 12.0,
      servicio: "Conteo de Plantas y Detección de Calvas",
      dron: "Mavic 3 Enterprise Thermal",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
    },
    {
      id: "V-2026-068",
      fecha: "25 Jun, 2026",
      parcela: "Finca El Naranjal - Sector B",
      manzanas: 25.0,
      servicio: "Monitoreo Hídrico y Estrés Térmico",
      dron: "Matrice 300 RTK",
      piloto: "Tec. Jorge Salgado",
      estado: "Completado",
      reporteDisponible: false,
    },
  ];

  // Datos mockeados de Facturación y Compras de Planes
  const historialFacturacion: PurchaseLog[] = [
    {
      id: "FAC-2026-041",
      fecha: "15 Jul, 2026",
      concepto: "Plan Operativo Profesional (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Tarjeta Visa (•••• 4021)",
      estado: "Pagado",
    },
    {
      id: "FAC-2026-033",
      fecha: "05 Jul, 2026",
      concepto: "Paquete Adicional 10 Manzanas Aspersión Extra",
      tipo: "Servicio Extra",
      monto: "L 1,500.00",
      metodoPago: "Saldo BioDron",
      estado: "Pagado",
    },
    {
      id: "FAC-2026-021",
      fecha: "15 Jun, 2026",
      concepto: "Plan Operativo Profesional (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Transferencia Banco de Occidente",
      estado: "Pagado",
    },
    {
      id: "FAC-2026-010",
      fecha: "01 Jun, 2026",
      concepto: "Recarga de Saldo Promocional",
      tipo: "Recarga Saldo",
      monto: "L 5,000.00",
      metodoPago: "Transferencia Ficohsa",
      estado: "Pagado",
    },
  ];

  // Filtrado simple para búsqueda
  const vuelosFiltrados = historialVuelos.filter(
    (v) =>
      v.parcela.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.dron.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const comprasFiltradas = historialFacturacion.filter(
    (f) =>
      f.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.metodoPago.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full font-sans text-left space-y-6">
      {/* CABECERA PRINCIPAL */}
      <div className="border-b border-gray-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <span>Historial de Reportes y Actividad</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Registro consolidado de misiones de vuelo, drones desplegados,
            parcelas intervenidas y compras de planes.
          </p>
        </div>

        <button
          onClick={() =>
            alert(
              "Generando reporte consolidado en PDF de todas las actividades...",
            )
          }
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0E5E6F] hover:bg-[#0A4552] text-white rounded-xl text-xs font-bold transition shadow-xs self-start md:self-auto cursor-pointer"
        >
          <Download size={15} />
          <span>Exportar Historial Completo (PDF)</span>
        </button>
      </div>

      {/* METRICAS CLAVE / RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Vuelos Totales"
          value="24 Misiones"
          sub="Operaciones registradas"
          icon={<Plane size={16} className="text-[#0E5E6F]" />}
          className="border-[#0E5E6F]/30 bg-[#0E5E6F]/5 hover:border-[#0E5E6F] [&_.text-base]:block [&_.text-base]:mt-2 [&_.text-xl]:block [&_.text-xl]:mt-2 [&_.font-bold]:block [&_.font-bold]:mt-2"
        />

        <StatCard
          label="Área Cubierta"
          value="187.5 Mz"
          sub="Manzanas monitoreadas"
          icon={<MapPin size={16} className="text-[#2994B2]" />}
          className="border-[#2994B2]/30 bg-[#2994B2]/5 hover:border-[#2994B2] [&_.text-base]:block [&_.text-base]:mt-2 [&_.text-xl]:block [&_.text-xl]:mt-2 [&_.font-bold]:block [&_.font-bold]:mt-2"
        />

        <StatCard
          label="Reportes Listos"
          value="19 Archivos"
          sub="Documentos PDF generados"
          icon={<FileText size={16} className="text-[#B165E0]" />}
          className="border-[#B165E0]/30 bg-[#B165E0]/5 hover:border-[#B165E0] [&_.text-base]:block [&_.text-base]:mt-2 [&_.text-xl]:block [&_.text-xl]:mt-2 [&_.font-bold]:block [&_.font-bold]:mt-2"
        />

        <StatCard
          label="Plan Adquirido"
          value="Profesional"
          sub="Suscripción activa"
          icon={<CreditCard size={16} className="text-[#0E5E6F]" />}
          className="border-[#0E5E6F]/30 bg-[#0E5E6F]/5 hover:border-[#0E5E6F] [&_.text-base]:block [&_.text-base]:mt-2 [&_.text-xl]:block [&_.text-xl]:mt-2 [&_.font-bold]:block [&_.font-bold]:mt-2"
        />
      </div>
      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por parcela, dron, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#0E5E6F]"
          />
        </div>

        {/* Tabs de Filtro */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto text-xs font-bold">
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition cursor-pointer ${
              filterType === "all"
                ? "bg-[#0E5E6F] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Todo
          </button>
          <button
            onClick={() => setFilterType("vuelos")}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition cursor-pointer ${
              filterType === "vuelos"
                ? "bg-[#0E5E6F] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Vuelos y Drones
          </button>
          <button
            onClick={() => setFilterType("facturacion")}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition cursor-pointer ${
              filterType === "facturacion"
                ? "bg-[#0E5E6F] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Planes y Pagos
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: HISTORIAL DE VUELOS Y PARCELAS */}
      {(filterType === "all" || filterType === "vuelos") && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                <Plane size={18} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900">
                  Historial de Misiones de Vuelo
                </h2>
                <p className="text-[11px] text-gray-500">
                  Parcelas monitoreadas, equipos utilizados y reportes de campo.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0E5E6F] bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
              {vuelosFiltrados.length} Registros
            </span>
          </div>

          {/* LISTADO DE VUELOS COMPACTO SIN SCROLL HORIZONTAL */}
          <div className="space-y-2.5">
            {vuelosFiltrados.map((vuelo) => (
              <div
                key={vuelo.id}
                className="border border-gray-200 hover:border-gray-300 rounded-xl p-3.5 bg-gray-50/50 transition flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Bloque Izquierdo: Info Parcela y Servicio */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-2xs text-[#0E5E6F] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {vuelo.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <Calendar size={11} /> {vuelo.fecha}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                        {vuelo.manzanas} Manzanas
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-gray-900 truncate mt-1">
                      {vuelo.parcela}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-600">
                      <span className="font-semibold text-[#0E5E6F] flex items-center gap-1">
                        <Sparkles size={12} /> {vuelo.servicio}
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="font-medium text-gray-700">
                        <strong>Dron:</strong> {vuelo.dron}
                      </span>
                      <span className="text-gray-400 hidden sm:inline">|</span>
                      <span className="text-gray-500 hidden sm:inline">
                        <strong>Piloto:</strong> {vuelo.piloto}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bloque Derecho: Acciones y Descarga */}
                <div className="flex items-center justify-between md:justify-end gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-gray-200/60 shrink-0">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full">
                    <CheckCircle2 size={11} /> {vuelo.estado}
                  </span>

                  {vuelo.reporteDisponible ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          alert(`Previsualizando reporte del vuelo ${vuelo.id}`)
                        }
                        className="p-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg transition cursor-pointer text-xs font-bold flex items-center gap-1"
                        title="Ver Online"
                      >
                        <Eye size={14} />
                        <span className="hidden sm:inline">Ver</span>
                      </button>
                      <button
                        onClick={() =>
                          alert(`Descargando PDF del vuelo ${vuelo.id}`)
                        }
                        className="p-1.5 bg-[#0E5E6F] hover:bg-[#0A4552] text-white rounded-lg transition cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400 italic">
                      Procesando IA...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: HISTORIAL DE FACTURACIÓN Y PLANES */}
      {(filterType === "all" || filterType === "facturacion") && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                <CreditCard size={18} />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900">
                  Historial de Compras, Planes y Recargas
                </h2>
                <p className="text-[11px] text-gray-500">
                  Facturación de suscripciones BioDron y servicios contratados.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0E5E6F] bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
              {comprasFiltradas.length} Facturas
            </span>
          </div>

          {/* LISTADO DE FACTURAS ADAPTATIVO */}
          <div className="space-y-2">
            {comprasFiltradas.map((compra) => (
              <div
                key={compra.id}
                className="border border-gray-200 hover:border-gray-300 rounded-xl p-3 bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-2 bg-gray-100 text-gray-700 rounded-lg shrink-0 mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500">
                        {compra.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        • {compra.fecha}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-[#0E5E6F]/10 text-[#0E5E6F] px-1.5 py-0.2 rounded border border-[#0E5E6F]/20">
                        {compra.tipo}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                      {compra.concepto}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      <strong>Método:</strong> {compra.metodoPago}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-black text-gray-900 block leading-tight">
                      {compra.monto}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block">
                      {compra.estado}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      alert(`Descargando recibo oficial ${compra.id}`)
                    }
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition cursor-pointer text-xs font-bold flex items-center gap-1 border border-gray-200"
                    title="Descargar Comprobante"
                  >
                    <Download size={13} />
                    <span className="hidden md:inline">Recibo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN INFORMATIVA / DE APOYO */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0E5E6F] rounded-2xl p-4 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 shrink-0">
            <Layers size={22} className="text-cyan-300" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">
              ¿Necesitas un reporte consolidado para certificación agrícola?
            </h3>
            <p className="text-xs text-slate-200 mt-0.5">
              Generamos informes multiespectrales formateados para auditorías de
              sostenibilidad y bancos.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            alert("Contactando con el equipo de soporte agrónomo...")
          }
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
        >
          <span>Solicitar Asistencia Agrónoma</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

// 5. Ayuda y Asistencia Granjeros (help)
export const HelpView = () => {
  const userAvatar = "src/img/granjero_perfil.png";

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'admin_central',
      name: 'Soporte Central',
      role: 'Administrador del Sistema',
      roleType: 'admin',
      avatar: 'src/img/admin_perfil.png',
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: '¡Hola Carlos! Bienvenido al centro de asistencia. ¿Tienes alguna duda con los parámetros de escaneo de tus manzanas?',
          time: '08:30 AM'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Hola, sí. Quería confirmar si la batería del Dron #2 alcanza para cubrir las 187 manzanas en un solo vuelo.',
          time: '08:32 AM'
        },
        {
          id: 3,
          sender: 'other',
          text: 'Para esa extensión recomendamos dividir la misión en 2 fases de vuelo para no forzar el retorno de emergencia.',
          time: '08:35 AM'
        }
      ]
    },
    {
      id: 'piloto_mateo',
      name: 'Ing. Mateo Rivas',
      role: 'Piloto de Dron de Campo',
      roleType: 'piloto',
      avatar: 'src/img/piloto_perfil.png',
      online: false,
      lastSeen: 'hoy a las 11:20 AM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Buenas tardes Carlos. Ya completamos el análisis multiespectral del sector norte.',
          time: 'Ayer'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Excelente Mateo, ¿cuándo estarán cargados los archivos PDF en mi panel?',
          time: 'Ayer'
        },
        {
          id: 3,
          sender: 'other',
          text: 'Ya están procesados y subidos en la sección de Reportes.',
          time: 'Ayer'
        }
      ]
    },
    {
      id: 'admin_sofia',
      name: 'Lic. Sofía Mendoza',
      role: 'Admin - Facturación y Licencias',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Hola Carlos, te confirmamos que la renovación del Plan Profesional fue procesada correctamente.',
          time: '09:15 AM'
        },
        {
          id: 2,
          sender: 'other',
          text: 'Te adjuntamos la factura en PDF por correo electrónico.',
          time: '09:16 AM'
        }
      ]
    },
    {
      id: 'piloto_diego',
      name: 'Cap. Diego Torres',
      role: 'Piloto Dron - Sector Sur',
      roleType: 'piloto',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'ayer a las 05:40 PM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: 'Hola Diego, ¿cómo estuvo la velocidad del viento durante el mapeo de la tarde?',
          time: 'Ayer'
        },
        {
          id: 2,
          sender: 'other',
          text: 'Todo en orden Carlos. Vientos estables de 12 km/h. La ortofoto quedó sin distorsiones.',
          time: 'Ayer'
        }
      ]
    },
    {
      id: 'admin_alejandro',
      name: 'Ing. Alejandro Silva',
      role: 'Admin - Soporte Técnico IoT',
      roleType: 'admin',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Detectamos una breve desconexión en el sensor de humedad de la Parcela 3, ya restablecimos el enlace.',
          time: '10:05 AM'
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Gracias Alejandro, ya veo la telemetría en tiempo real de nuevo.',
          time: '10:10 AM'
        }
      ]
    },
    {
      id: 'piloto_valeria',
      name: 'Dra. Valeria Gómez',
      role: 'Piloto - Fitozoosanitario',
      roleType: 'piloto',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'hace 2 horas',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Carlos, revisamos el índice NDVI del lote 5 y detectamos estrés hídrico temprano.',
          time: '11:00 AM'
        },
        {
          id: 2,
          sender: 'other',
          text: 'Te sugerimos ajustar el riego por goteo en esa zona durante 48 horas.',
          time: '11:02 AM'
        }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState<string>('admin_central');
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estados para el Modal de Solicitud de Ayuda
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [helpForm, setHelpForm] = useState({
    nombre: 'Carlos Sosa',
    correo: 'carlos.sosa@ejemplo.com',
    asunto: 'Incidencia Técnica',
    mensaje: ''
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'granjero',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      })
    );

    setInputText('');
  };

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpForm.mensaje.trim()) return;
    setIsSubmitted(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
    setIsSubmitted(false);
    setHelpForm({
      nombre: 'Carlos Sosa',
      correo: 'carlos.sosa@ejemplo.com',
      asunto: 'Incidencia Técnica',
      mensaje: ''
    });
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative">
      <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden">
        
        {/* ================= BARRA LATERAL (LISTA DE CHATS) ================= */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-gray-50/60 h-full min-h-0 shrink-0">
          
          {/* TÍTULO Y BOTÓN DE PEDIR AYUDA (ARRIBA DEL BUSCADOR) */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">Soporte y Ayuda</h2>
              <p className="text-xs text-gray-500">Canal directo de asistencia</p>
            </div>

            {/* BOTÓN PEDIR AYUDA */}
            <button 
              onClick={() => setIsHelpModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <HelpCircle size={15} />
              <span>Pedir Ayuda</span>
            </button>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="p-3 border-b border-gray-200 bg-gray-50/80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar conversación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0E5E6F] transition"
              />
            </div>
          </div>

          {/* LISTA DE CHATS */}
          <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100">
            {filteredChats.map((chat) => {
              const lastMsg = chat.messages[chat.messages.length - 1];
              const isSelected = chat.id === activeChatId;

              return (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats((prev) =>
                      prev.map((c) => (c.id === chat.id ? { ...c, unreadCount: 0 } : c))
                    );
                  }}
                  className={`w-full p-4 flex items-center gap-3 transition text-left cursor-pointer ${
                    isSelected ? 'bg-white border-l-4 border-[#0E5E6F]' : 'hover:bg-gray-100/80'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-xs"
                    />
                    <span 
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        chat.online ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h3>
                      {lastMsg && (
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 ml-1">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0E5E6F] font-semibold mb-1 truncate">{chat.role}</p>
                    {lastMsg && (
                      <p className="text-xs text-gray-500 truncate">
                        {lastMsg.sender === 'granjero' && 'Tú: '}
                        {lastMsg.text}
                      </p>
                    )}
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="shrink-0">
                      <span className="bg-[#0E5E6F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full block">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= ÁREA DE CONVERSACIÓN ================= */}
        <div className="flex-1 flex flex-col h-full min-h-0 bg-[#f8fafc] overflow-hidden">
          
          {/* HEADER DEL CHAT (DATOS DEL USUARIO EN VERTICAL) */}
          <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between gap-2 shrink-0 min-w-0">
            
            {/* Info del contacto activo */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
              </div>

              {/* DATOS EN FORMATO VERTICAL */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                
                {/* 1. Nombre */}
                <h2 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
                  {activeChat.name}
                </h2>
                
                {/* 2. Tipo de Usuario / Rol */}
                <span className="text-xs text-[#0E5E6F] font-medium truncate mt-0.5">
                  {activeChat.role}
                </span>

                {/* 3. Estado de Conexión */}
                <div className="text-xs text-gray-500 mt-0.5">
                  {activeChat.online ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      En línea
                    </span>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block shrink-0"></span>
                      <span className="truncate">
                        Desconectado {activeChat.lastSeen ? `(${activeChat.lastSeen})` : ''}
                      </span>
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center gap-1 text-gray-500 shrink-0">
              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Llamada de voz"
              >
                <Phone size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Videollamada"
              >
                <Video size={18} />
              </button>

              <button 
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-lg transition"
                aria-label="Opciones adicionales"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
            {activeChat.messages.map((msg) => {
              const isGranjero = msg.sender === 'granjero';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isGranjero ? 'justify-end' : 'justify-start'}`}
                >
                  {!isGranjero && (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm ${
                      isGranjero
                        ? 'bg-[#0E5E6F] text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isGranjero ? 'text-cyan-100' : 'text-gray-400'
                      }`}
                    >
                      <span>{msg.time}</span>
                      
                      {isGranjero && (
                        <CheckCheck size={14} className="text-cyan-200" />
                      )}
                    </div>
                  </div>

                  {isGranjero && (
                    <img
                      src={userAvatar}
                      alt="Carlos Sosa"
                      className="w-7 h-7 rounded-lg object-cover mb-1 shrink-0 border border-gray-200"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Formulario de Entrada del Chat */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-xl transition shrink-0"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0E5E6F] text-white rounded-xl hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      </div>

      {/* ================= MODAL SOLICITAR AYUDA / SOPORTE ================= */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            
            {/* Header del Modal */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-lg">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Solicitar Asistencia</h3>
                  <p className="text-xs text-gray-500">Envía un ticket directo al equipo técnico</p>
                </div>
              </div>
              <button
                onClick={closeHelpModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del Modal (Formulario o Mensaje de Éxito) */}
            <div className="p-5">
              {!isSubmitted ? (
                <form onSubmit={handleHelpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={helpForm.nombre}
                      onChange={(e) => setHelpForm({ ...helpForm, nombre: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Correo electrónico de contacto
                    </label>
                    <input
                      type="email"
                      required
                      value={helpForm.correo}
                      onChange={(e) => setHelpForm({ ...helpForm, correo: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Categoría de la consulta
                    </label>
                    <select
                      value={helpForm.asunto}
                      onChange={(e) => setHelpForm({ ...helpForm, asunto: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Incidencia Técnica">Incidencia Técnica / Falla en Dron</option>
                      <option value="Error en Telemetría">Error en Telemetría o Sensores</option>
                      <option value="Facturación">Facturación y Planes</option>
                      <option value="Otro">Otro asunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Describe tu problema o requerimiento
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ej. El Dron #2 presenta problemas de conexión GPS durante el vuelo..."
                      value={helpForm.mensaje}
                      onChange={(e) => setHelpForm({ ...helpForm, mensaje: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeHelpModal}
                      className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-xl shadow-xs transition cursor-pointer"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                </form>
              ) : (
                /* Pantalla de Confirmación */
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-gray-900">¡Solicitud recibida!</h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      Hemos registrado tu reporte correctamente. Un especialista técnico revisará tu caso y se comunicará contigo a la brevedad.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={closeHelpModal}
                      className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              )}
            </div>

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
      initials: "CS",
      name: "Carlos Sosa",
      email: "carlos.sosa@technodactylus.hn",
      phone: "+504 9845-1200",
      password: "••••••••••••",
      avatar: "src/img/admin_perfil.png",
      avatarBg: "bg-[#0E5E6F] text-white",
      roleLabel: "Administrador · Operaciones",
      location: "Valle del Aguán, Olanchito, Yoro",
      area: "—",
      services: "142 misiones",
      standing: "Activo",
      roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30",
      description:
        "Coordinador regional de flota agrícola y geodatos en Olanchito.",
    },
    pilot: {
      initials: "JR",
      name: "Javier Reyes",
      email: "j.reyes@technodactylus.hn",
      phone: "+504 9712-3489",
      password: "••••••••••••",
      avatar: "src/img/piloto_perfil.png",
      avatarBg: "bg-blue-600 text-white",
      roleLabel: "Piloto Licenciado · DJI Agras T50",
      location: "Base Aérea San Lorenzo, Olanchito",
      area: "—",
      services: "128 vuelos",
      standing: "Activo",
      roleColor: "text-blue-700 bg-blue-50 border-blue-300",
      description:
        "Especialista en mapeo NDVI y fumigación en fincas bananeras.",
    },
    farmer: {
      initials: "CR",
      name: "Carlos Reyes",
      email: "creyes.aguan@gmail.com",
      phone: "+504 9567-8821",
      password: "••••••••••••",
      avatar: "src/img/granjero_perfil.png",
      avatarBg: "bg-emerald-700 text-white",
      roleLabel: "Productor Agrícola · Verificado",
      location: "Sabana de Tepusteca, Olanchito",
      area: "145 ha (Maíz / Banano)",
      services: "12 solicitudes",
      standing: "Activo",
      roleColor: "text-emerald-800 bg-emerald-50 border-emerald-300",
      description: "Productor de maíz híbrido y banano con monitoreo aéreo.",
    },
  };

  const currentRole = role || "admin";
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
    setProfileData((prev) => ({
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
                <div
                  className={`w-full h-full flex items-center justify-center font-black text-xl ${profileData.avatarBg}`}
                >
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
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Base Regional
              </Text>
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
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Extensión
              </Text>
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
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Actividad
              </Text>
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
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Estado
              </Text>
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
              <Title
                as="h3"
                className="text-xs sm:text-sm font-black text-gray-800 normal-case"
              >
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
              <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                {profileData.phone}
              </Text>
            </div>

            <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Mail size={12} className="text-[#0E5E6F]" /> Correo
              </Text>
              <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5 truncate">
                {profileData.email}
              </Text>
            </div>

            <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
              <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <Lock size={12} className="text-[#0E5E6F]" /> Contraseña
              </Text>
              <Text className="font-mono font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                ••••••••••••
              </Text>
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
            <span className="text-xs font-black uppercase tracking-wider">
              SALIR
            </span>
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
                <Title
                  as="h3"
                  className="text-sm font-black text-gray-800 normal-case"
                >
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
                  <Phone
                    size={13}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
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
                  <Mail
                    size={13}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
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
                  <Lock
                    size={13}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editForm.password}
                    onChange={(e) =>
                      setEditForm({ ...editForm, password: e.target.value })
                    }
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
  <div
    onClick={onClick}
    className="bg-white border-2 border-gray-200 hover:border-[#0E5E6F] rounded-2xl p-8 cursor-pointer transition-all group flex flex-col items-start shadow-sm hover:shadow-md"
  >
    <div className="p-4 bg-gray-100 rounded-xl mb-6 group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <Title
      className="text-2xl mb-3 text-gray-800 group-hover:text-[#0E5E6F] transition-colors"
      as="h3"
    >
      {title}
    </Title>
    <Text className="text-gray-500 text-base leading-relaxed">{desc}</Text>
  </div>
);

const ConfigMapView = ({ serviceType, onNext, onBack }: any) => (
  <div className="p-10 max-w-6xl mx-auto">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 font-bold uppercase text-sm tracking-wider transition-colors"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <ChevronLeft size={16} /> Volver
    </button>
    <Title className="text-3xl mb-8 pb-4 border-b-2 border-gray-200">
      Configuración: {serviceType}
    </Title>
    <div className="flex gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title
            as="h3"
            className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"
          >
            <MapPin size={20} /> 1. Delimitación de Terreno
          </Title>
          <PlaceholderImage
            text="Mapa Interactivo - Dibujar Área (Ej: 12 Hectáreas)"
            className="h-72 w-full mb-4 rounded-lg"
          />
          <Text className="text-sm text-gray-500">
            Seleccionar el polígono en el mapa. Las zonas restringidas se
            evitarán automáticamente.
          </Text>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title
            as="h3"
            className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"
          >
            <Info size={20} /> 2. Detalles del Servicio
          </Title>
          {serviceType === "busqueda" ? (
            <div className="grid grid-cols-2 gap-6">
              <WireframeInput
                label="Tipo de Animal"
                placeholder="Ej: Ganado, Perro..."
              />
              <div
                className="flex flex-col mb-4 w-full"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
                <label className="mb-1 text-sm font-bold text-gray-600 uppercase tracking-tight">
                  Cámara Térmica
                </label>
                <select className="p-3 border-2 border-gray-300 bg-white text-gray-800 focus:border-[#0E5E6F] outline-none">
                  <option>Sí, requerida</option>
                  <option>No necesaria</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <WireframeInput
                label="Tipo de Cultivo"
                placeholder="Ej: Maíz, Frijol..."
              />
              <WireframeInput
                label="Líquido (Agua/Pesticida)"
                placeholder="Especificar..."
              />
              <WireframeInput
                label="Densidad Requerida"
                placeholder="L/Hectárea"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex-1">
          <Title
            as="h3"
            className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"
          >
            <Crosshair size={20} /> 3. Selección de Dron y Piloto
          </Title>
          <div className="border-2 border-[#0E5E6F] rounded-xl p-5 mb-4 relative overflow-hidden bg-gray-50">
            <div
              className="absolute top-0 right-0 bg-[#0E5E6F] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Recomendado
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gray-200 border-2 border-[#0E5E6F] rounded-full flex justify-center items-center">
                <User size={24} className="text-[#0E5E6F]" />
              </div>
              <div>
                <Text className="font-bold text-lg leading-tight">
                  Javier Reyes
                </Text>
                <Text className="text-sm text-gray-500">Piloto de Drones</Text>
              </div>
            </div>
            <div
              className="bg-white border border-gray-200 rounded-lg p-3 text-sm space-y-2"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Dron:</span>
                <span>Agras T40</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Capacidad:</span>
                <span>40L / 50kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Batería:</span>
                <span className="text-green-600 font-bold">100%</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-5 opacity-60 grayscale cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <div>
                <Text className="font-bold text-lg leading-tight text-gray-600">
                  Piloto Genérico
                </Text>
                <Text className="text-sm text-gray-500">
                  Ocupado en otro vuelo
                </Text>
              </div>
            </div>
          </div>
        </div>
        <WireframeButton
          primary
          onClick={onNext}
          className="w-full text-lg rounded-xl shadow-md py-4"
        >
          Revisar Cotización
        </WireframeButton>
      </div>
    </div>
  </div>
);

const ConfigCargoView = ({ onNext, onBack }: any) => (
  <div className="p-10 max-w-6xl mx-auto">
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 font-bold uppercase text-sm tracking-wider transition-colors"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <ChevronLeft size={16} /> Volver
    </button>
    <Title className="text-3xl mb-8 pb-4 border-b-2 border-gray-200">
      Configuración: Transporte de Carga
    </Title>
    <div className="flex gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title
            as="h3"
            className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"
          >
            <Map size={20} /> 1. Puntos de Origen y Destino
          </Title>
          <PlaceholderImage
            text="Mapa - Seleccionar Punto A y Punto B"
            className="h-72 w-full mb-6 rounded-lg"
          />
          <div className="flex gap-6">
            <WireframeInput
              label="Punto A (Recolección)"
              placeholder="Coordenadas o ubicación"
            />
            <WireframeInput
              label="Punto B (Descarga)"
              placeholder="Coordenadas o ubicación"
            />
          </div>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <Title
            as="h3"
            className="text-lg mb-6 flex items-center gap-3 text-[#0E5E6F]"
          >
            <Package size={20} /> 2. Especificación de Carga
          </Title>
          <WireframeInput label="Peso Estimado (KG)" placeholder="Ej: 30" />
          <WireframeInput label="Cantidad de Cajas" placeholder="Ej: 5" />
          <div
            className="mt-6 p-4 bg-[#f0f7f9] border border-[#0E5E6F] rounded-lg text-sm text-[#0E5E6F]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <strong className="block mb-1 uppercase tracking-wider text-xs">
              Nota del Sistema:
            </strong>
            Se asignará automáticamente un dron con la fuerza de empuje adecuada
            (Ej: Dron de Carga Pesada a cargo del Piloto Javier Reyes).
          </div>
        </div>
        <WireframeButton
          primary
          onClick={onNext}
          className="w-full text-lg rounded-xl shadow-md py-4"
        >
          Revisar Cotización
        </WireframeButton>
      </div>
    </div>
  </div>
);

const CheckoutView = ({ onConfirm, onBack }: any) => (
  <div className="h-full flex items-center justify-center p-10">
    <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-xl p-10 relative">
      <button
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold uppercase text-xs tracking-wider transition-colors"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        <ChevronLeft size={16} /> Volver
      </button>
      <Title className="text-3xl mb-8 text-center border-b-2 border-gray-100 pb-6">
        Resumen y Cotización
      </Title>
      <div className="space-y-4 mb-10">
        {[
          { label: "Servicio Seleccionado", value: "Fumigación / Riego" },
          { label: "Área a Cubrir", value: "12 Hectáreas" },
          {
            label: "Piloto Asignado",
            value: "Javier Reyes (Agras T40)",
            valueClass: "text-[#0E5E6F]",
          },
        ].map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-5 bg-gray-50 rounded-xl border border-gray-100"
          >
            <Text className="font-bold uppercase text-gray-500 tracking-wider text-sm">
              {row.label}
            </Text>
            <Text
              className={`font-bold text-lg text-gray-800 ${row.valueClass || ""}`}
            >
              {row.value}
            </Text>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-dashed border-gray-300 pt-8 mb-10">
        <div className="flex justify-between items-center mb-3">
          <Text className="text-gray-500">Tarifa por Hectárea</Text>
          <Text className="font-mono text-lg">L 150.00</Text>
        </div>
        <div className="flex justify-between items-center mb-6">
          <Text className="text-gray-500">
            Tarifa Base (Logística de Vuelo)
          </Text>
          <Text className="font-mono text-lg">L 500.00</Text>
        </div>
        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-800">
          <Title as="h3" className="text-2xl text-gray-800">
            Total Estimado
          </Title>
          <span
            className="font-black text-4xl text-[#0E5E6F]"
            style={{ fontFamily: "'Lexend Deca', sans-serif" }}
          >
            L 2,300.00
          </span>
        </div>
      </div>
      <div className="mb-10">
        <Text className="font-bold uppercase text-gray-500 text-sm mb-4 tracking-wider">
          Método de Pago / Aprobación
        </Text>
        <div className="flex gap-4">
          <button
            className="flex-1 py-4 border-2 border-[#0E5E6F] bg-[#f0f7f9] text-[#0E5E6F] font-bold uppercase text-sm rounded-xl flex items-center justify-center gap-2"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            <CreditCard size={18} /> Saldo en Cuenta
          </button>
          <button
            className="flex-1 py-4 border border-gray-300 text-gray-500 font-bold uppercase text-sm rounded-xl hover:bg-gray-50"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            Transferencia
          </button>
        </div>
      </div>
      <WireframeButton
        primary
        onClick={onConfirm}
        className="w-full text-xl py-5 flex justify-center items-center gap-3 rounded-xl shadow-lg"
      >
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
      <div
        className="bg-white border-2 border-[#0E5E6F] text-[#0E5E6F] px-5 py-2.5 rounded-full font-bold uppercase text-sm tracking-wider shadow-sm"
        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
      >
        Estado: En Vuelo (Activo)
      </div>
    </div>
    <div className="flex-1 flex gap-8">
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm relative p-2 flex flex-col overflow-hidden">
        <PlaceholderImage
          text="Vista de Mapa Satelital - Ruta en zigzag del dron sobre polígono"
          className="flex-1 w-full h-full rounded-xl"
        />
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur border border-gray-200 p-5 rounded-xl shadow-xl min-w-[250px]">
          <Text className="font-bold uppercase text-xs mb-3 text-gray-500 tracking-wider">
            Progreso del Área
          </Text>
          <div className="w-full h-3 bg-gray-200 rounded-full mb-2 overflow-hidden">
            <div className="w-[65%] h-full bg-[#0E5E6F]"></div>
          </div>
          <Text className="text-right font-black text-[#0E5E6F] text-xl">
            65%
          </Text>
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 flex-1">
          <Title as="h3" className="text-xl border-b border-gray-100 pb-4 mb-6">
            Telemetría del Dron
          </Title>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <Text className="text-sm font-bold uppercase text-gray-600 flex items-center gap-2 tracking-wider">
                  <Battery size={18} /> Batería Dron
                </Text>
                <Text className="font-bold text-lg">42%</Text>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[42%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Text className="text-sm font-bold uppercase text-gray-600 flex items-center gap-2 tracking-wider">
                  <Droplet size={18} /> Nivel de Tanque
                </Text>
                <Text className="font-bold text-lg">30%</Text>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[30%]"></div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100">
              <Text className="text-xs font-bold uppercase text-gray-400 mb-1 tracking-wider">
                Piloto al mando
              </Text>
              <Text className="font-bold text-lg text-gray-800">
                Javier Reyes (Agras T40)
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Contacto: javier_reyes@ejemplo.hn
              </Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <WireframeButton className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-sm">
            <Pause size={18} /> Pausar Servicio
          </WireframeButton>
          <WireframeButton className="flex justify-center items-center gap-2 bg-white rounded-xl shadow-sm">
            <MessageSquare size={18} /> Comunicar con Piloto
          </WireframeButton>
          <WireframeButton
            primary
            onClick={onFinish}
            className="mt-4 rounded-xl shadow-md"
          >
            Simular Fin de Servicio
          </WireframeButton>
        </div>
      </div>
    </div>
  </div>
);

// ----- Historial y Reportes (Admin) -----
const HistoryView = () => {
  const [services] = useState<ServiceRecord[]>([
    {
      id: "TECH-9938",
      type: "Fumigación de Precisión",
      category: "fumigacion",
      date: "Hoy, 20 Jul 2026",
      time: "10:30 AM",
      location: "Juticalpa, Olancho (Finca El Agualote)",
      pilot: "Carlos Sosa",
      drone: "DJI Agras T40",
      coverage: "98.4%",
      metrics: [
        { label: "Área Cubierta", value: "12.5 Mz", sub: "8.7 Hectáreas" },
        { label: "Tiempo de Vuelo", value: "1h 45m", sub: "2 Baterías usadas" },
        { label: "Líquido Aplicado", value: "150 L", sub: "Mezcla NutriCrop" },
      ],
      summary:
        "Aspersión uniforme completada en sector Norte. El mapa de calor muestra excelente penetración en dosel foliar sin derrames detectados.",
    },
    {
      id: "TECH-9821",
      type: "Búsqueda y Rescate / Monitoreo",
      category: "busqueda",
      date: "12 Feb, 2026",
      time: "04:15 PM",
      location: "Catacamas, Olancho",
      pilot: "Javier Reyes",
      drone: "Mavic 3 Multispectral",
      coverage: "100%",
      metrics: [
        { label: "Área Escaneada", value: "5.0 Ha", sub: "Cámara Térmica" },
        { label: "Tiempo de Vuelo", value: "42 min", sub: "1 Batería" },
        {
          label: "Puntos de Interés",
          value: "3 Objetivos",
          sub: "Ubicaciones GPS",
        },
      ],
      summary:
        "Inspección térmica perimetral exitosa. Se detectaron 3 anomalías térmicas en el sector Este y se enviaron coordenadas en tiempo real.",
    },
    {
      id: "TECH-9705",
      type: "Transporte de Carga Pesada",
      category: "transporte",
      date: "08 Feb, 2026",
      time: "08:00 AM",
      location: "San Esteban, Olancho",
      pilot: "María Gómez",
      drone: "DJI FlyCart 30",
      coverage: "100%",
      metrics: [
        { label: "Carga Total", value: "450 kg", sub: "15 Cajas (30kg c/u)" },
        { label: "Trayectos", value: "5 Vuelos", sub: "Ruta A -> Punto B" },
        {
          label: "Distancia Recorrida",
          value: "18.2 km",
          sub: "Consumo óptimo",
        },
      ],
      summary:
        "Logística de insumos agrícolas sin contratiempos. Entregas coordinadas en terreno de difícil acceso mediante cable de liberación rápida.",
    },
    {
      id: "TECH-9612",
      type: "Mapeo Multiespectral (NDVI)",
      category: "mapeo",
      date: "28 Ene, 2026",
      time: "11:20 AM",
      location: "Danlí, El Paraíso",
      pilot: "Héctor Ramírez",
      drone: "Mavic 3 Multispectral",
      coverage: "96.2%",
      metrics: [
        {
          label: "Superficie Analizada",
          value: "24.0 Ha",
          sub: "Índice Vigor Vegetal",
        },
        { label: "Tiempo de Vuelo", value: "2h 10m", sub: "3 Pasadas" },
        {
          label: "Resolución Ortomosaico",
          value: "1.2 cm/px",
          sub: "Alta Precisión",
        },
      ],
      summary:
        "Identificación de estrés hídrico temprano en parcela 4B. Se generaron prescripciones para fertilización variable.",
    },
  ]);

  const [selectedService, setSelectedService] = useState<ServiceRecord>(
    services[0],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.pilot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterCategory === "all" || s.category === filterCategory;
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
            Revisa las telemetrías, mapas de calor y reportes descargables de
            cada vuelo ejecutado.
          </Text>
        </div>

        {/* Buscador Rápido y Filtro */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
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
              <Text className="text-xs text-gray-400 font-medium">
                No se encontraron servicios registrados.
              </Text>
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
                      ? "bg-[#0E5E6F] text-white border-transparent shadow-md ring-2 ring-[#0E5E6F]/30"
                      : "bg-white text-gray-800 border-gray-200 hover:border-[#0E5E6F]/50 shadow-sm hover:shadow"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-400" />
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {service.category}
                      </span>
                      <span
                        className={`text-xs flex items-center gap-1 font-medium ${isSelected ? "text-white/80" : "text-gray-400"}`}
                      >
                        <Clock size={12} />
                        {service.date}
                      </span>
                    </div>

                    <Title
                      as="h4"
                      className={`text-lg font-bold mb-1 ${isSelected ? "text-white" : "text-gray-900"}`}
                    >
                      {service.type}
                    </Title>

                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium ${isSelected ? "text-white/90" : "text-gray-600"}`}
                    >
                      <MapPin size={14} className="shrink-0" />
                      <span>{service.location}</span>
                    </div>
                  </div>

                  <div
                    className={`pt-3 border-t flex items-center justify-between text-xs ${
                      isSelected
                        ? "border-white/15 text-white/80"
                        : "border-gray-100 text-gray-500"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      Piloto: <strong>{service.pilot}</strong>
                    </span>
                    <span className="font-mono font-bold text-xs">
                      #{service.id}
                    </span>
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
              <span className="text-xs font-mono text-gray-400">
                ID: #{selectedService.id}
              </span>
            </div>
            <Title className="text-2xl font-black text-gray-900">
              {selectedService.type}
            </Title>
            <Text className="text-xs text-gray-500 mt-1 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#0E5E6F]" />{" "}
                {selectedService.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User size={13} className="text-[#0E5E6F]" /> Piloto:{" "}
                <strong>{selectedService.pilot}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <PlaneTakeoff size={13} className="text-[#0E5E6F]" /> Dron:{" "}
                {selectedService.drone}
              </span>
            </Text>
          </div>

          <WireframeButton
            primary
            onClick={() =>
              alert(`Generando PDF para el reporte ${selectedService.id}...`)
            }
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
              <div
                key={i}
                className="border-2 border-gray-100 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-[#0E5E6F]/30 transition-all shadow-sm"
              >
                <Text className="text-[11px] font-bold uppercase text-gray-400 mb-1 tracking-wider">
                  {metric.label}
                </Text>
                <Text className="text-2xl font-black text-[#0E5E6F]">
                  {metric.value}
                </Text>
                {metric.sub && (
                  <Text className="text-[11px] font-medium text-gray-500 mt-0.5">
                    {metric.sub}
                  </Text>
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
              <Title className="text-lg font-bold text-gray-900">
                Mapa de Calor y Cobertura Terrestre
              </Title>
              <Text className="text-xs text-gray-500">
                Visualización de espectro NDVI / Telemetría GPS para{" "}
                {selectedService.id}
              </Text>
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
                (e.target as HTMLElement).style.display = "none";
              }}
            />

            {/* Fallback si no se localiza el archivo local */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 hidden group-has-[img[style*='display: none']]:flex flex-col items-center justify-center p-6 text-center text-white">
              <Layers size={48} className="text-[#0E5E6F] mb-3 animate-pulse" />
              <Text className="font-bold text-base">
                Vista de Mapa de Calor Activa
              </Text>
              <Text className="text-xs text-gray-400 max-w-sm mt-1">
                Cargando ortomosaico e índice espectral desde{" "}
                <code>src/img/mapa_calor.png</code>
              </Text>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() =>
                  alert("Abriendo vista HD interactiva de capa NDVI")
                }
                className="bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-xl border border-white/10 transition cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Maximize2 size={16} />
                Pantalla Completa
              </button>
            </div>

            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-white/10">
              Capas: <span className="text-emerald-400 font-bold">NDVI</span> |{" "}
              <span className="text-cyan-400 font-bold">Telemetría GPS</span>
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
  const [selectedTool, setSelectedTool] = useState<
    "polygon" | "octagon" | "delete" | "move" | "measure"
  >("polygon");
  const [mapLayer, setMapLayer] = useState<"satellite" | "hybrid" | "terrain">(
    "satellite",
  );
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polygon
                points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <h1
                className="text-xs sm:text-sm font-black text-gray-900 tracking-tight uppercase"
                style={{ fontFamily: "'Instrument Sans', sans-serif" }}
              >
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
            <svg
              className="w-3.5 h-3.5 text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Borrar Selección</span>
          </button>
          <button className="py-1 px-3 bg-[#0E5E6F] border-2 border-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold rounded-md text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
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
            isLeftCollapsed ? "w-12" : "w-56"
          }`}
        >
          {/* Botón Flotante para Abrir/Cerrar */}
          <button
            onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            className="absolute -right-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
            title={isLeftCollapsed ? "Expandir Menú" : "Colapsar Menú"}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isLeftCollapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {!isLeftCollapsed ? (
            <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar text-left h-full max-h-full">
              <div className="p-1.5 bg-gray-50 border-2 border-gray-200 rounded-lg shrink-0">
                <span className="text-[8px] font-black uppercase tracking-wider text-gray-400 block">
                  Edición Activa
                </span>
                <span className="text-[11px] font-black text-gray-800 block mt-0.5">
                  ID Parcela: #AGUAN-2026
                </span>
              </div>

              <div className="shrink-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  Herramientas
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedTool("polygon")}
                    className={`w-full flex items-center justify-between p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === "polygon"
                        ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-current rounded-xs" />
                      <span>Pentágono</span>
                    </div>
                    {selectedTool === "polygon" && (
                      <span className="text-[8px] font-black uppercase bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded">
                        ACTIVO
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedTool("octagon")}
                    className={`w-full flex items-center justify-between p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === "octagon"
                        ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-current rounded-full" />
                      <span>Octágono</span>
                    </div>
                    {selectedTool === "octagon" && (
                      <span className="text-[8px] font-black uppercase bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded">
                        ACTIVO
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedTool("delete")}
                    className={`w-full flex items-center gap-1.5 p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === "delete"
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Eliminar</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool("move")}
                    className={`w-full flex items-center gap-1.5 p-1.5 rounded-md border-2 text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTool === "move"
                        ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h16M4 16h16"
                      />
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
                    { id: "satellite", label: "Satélite" },
                    { id: "hybrid", label: "Híbrido" },
                    { id: "terrain", label: "Terreno" },
                  ].map((layer) => (
                    <label
                      key={layer.id}
                      className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 cursor-pointer p-0.5 hover:bg-gray-50 rounded"
                    >
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
                    <input
                      type="checkbox"
                      checked={showZones}
                      onChange={(e) => setShowZones(e.target.checked)}
                      className="accent-[#0E5E6F] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Mapa NDVI</span>
                    <input
                      type="checkbox"
                      checked={showHeatmap}
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                      className="accent-[#0E5E6F] cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Límites</span>
                    <input
                      type="checkbox"
                      checked={showBoundaries}
                      onChange={(e) => setShowBoundaries(e.target.checked)}
                      className="accent-[#0E5E6F] cursor-pointer"
                    />
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsLeftCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Capas del Mapa"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
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
              backgroundImage: `url(src/img/editor_mapas.png)`,
            }}
          />

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <polygon
              points="350,150 480,150 540,280 480,420 350,420 290,280"
              fill="rgba(14, 94, 111, 0.45)"
              stroke="#0E5E6F"
              strokeWidth="3"
              strokeDasharray="6 3"
              className="pointer-events-auto cursor-pointer"
            />
            {[
              [350, 150],
              [480, 150],
              [540, 280],
              [480, 420],
              [350, 420],
              [290, 280],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                stroke="#0E5E6F"
                strokeWidth="2"
              />
            ))}
            <text
              x="415"
              y="280"
              fill="#ffffff"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              ZONA A: FERTILIZANTE
            </text>

            <polygon
              points="620,230 710,280 680,410 570,410 550,290"
              fill="rgba(217, 119, 6, 0.45)"
              stroke="#d97706"
              strokeWidth="3"
              className="pointer-events-auto cursor-pointer"
            />
            {[
              [620, 230],
              [710, 280],
              [680, 410],
              [570, 410],
              [550, 290],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                stroke="#d97706"
                strokeWidth="2"
              />
            ))}
            <text
              x="625"
              y="320"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              ZONA B: FUMIGACIÓN
            </text>
          </svg>

          <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
            <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-md shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">
              +
            </button>
            <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-md shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">
              -
            </button>
          </div>
        </div>

        {/* PANEL DERECHO */}
        <aside
          className={`bg-white border-l-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${
            isRightCollapsed ? "w-12" : "w-64"
          }`}
        >
          {/* Botón Flotante para Abrir/Cerrar */}
          <button
            onClick={() => setIsRightCollapsed(!isRightCollapsed)}
            className="absolute -left-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
            title={isRightCollapsed ? "Expandir Menú" : "Colapsar Menú"}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isRightCollapsed ? "" : "rotate-180"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M15 19l-7-7 7-7"
              />
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
                  <span className="font-bold text-gray-700">
                    Dron Agras T50
                  </span>
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
                      <span className="font-black" style={{ color: "#CA5116" }}>
                        {altitude} m
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${((altitude - 10) / 90) * 100}%`,
                          backgroundColor: "#CA5116",
                        }}
                      />
                      <div
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{
                          left: `${((altitude - 10) / 90) * 100}%`,
                          backgroundColor: "#CA5116",
                        }}
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
                      <span className="font-black" style={{ color: "#2994B2" }}>
                        {speed} km/h
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${((speed - 5) / 35) * 100}%`,
                          backgroundColor: "#2994B2",
                        }}
                      />
                      <div
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{
                          left: `${((speed - 5) / 35) * 100}%`,
                          backgroundColor: "#2994B2",
                        }}
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
                      <span className="font-black" style={{ color: "#B165E0" }}>
                        {rate} L/ha
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${((rate - 0.5) / 9.5) * 100}%`,
                          backgroundColor: "#B165E0",
                        }}
                      />
                      <div
                        className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer"
                        style={{
                          left: `${((rate - 0.5) / 9.5) * 100}%`,
                          backgroundColor: "#B165E0",
                        }}
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsRightCollapsed(false)}
                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-lg text-gray-600 transition-colors cursor-pointer"
                title="Parámetros de Vuelo"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
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
  const [activeTab, setActiveTab] = useState<"users" | "drones" | "rates">(
    "users",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estados de Datos
  const [users, setUsers] = useState([
    {
      id: "1",
      init: "CS",
      name: "Carlos Sosa",
      role: "Admin",
      roleClass: "bg-[#0E5E6F]/10 text-[#0E5E6F]",
      loc: "Juticalpa, Olancho",
      email: "carlos_sosa@biodron.hn",
      status: "Activo",
    },
    {
      id: "2",
      init: "JR",
      name: "Javier Reyes",
      role: "Piloto",
      roleClass: "bg-blue-100 text-blue-700",
      loc: "Catacamas, Olancho",
      email: "javier_reyes@biodron.hn",
      status: "En Operación",
    },
    {
      id: "3",
      init: "CM",
      name: "Comercializadora El Valle",
      role: "Agricultor",
      roleClass: "bg-emerald-100 text-emerald-700",
      loc: "Danlí, El Paraíso",
      email: "contacto@elvalle.hn",
      status: "Activo",
    },
    {
      id: "4",
      init: "MG",
      name: "María Gómez",
      role: "Piloto",
      roleClass: "bg-blue-100 text-blue-700",
      loc: "Comayagua, Comayagua",
      email: "maria.gomez@biodron.hn",
      status: "Disponible",
    },
    {
      id: "5",
      init: "AG",
      name: "Agropecuaria Yoro",
      role: "Agricultor",
      roleClass: "bg-emerald-100 text-emerald-700",
      loc: "El Progreso, Yoro",
      email: "operaciones@agroyoro.hn",
      status: "Inactivo",
    },
    {
      id: "6",
      init: "HR",
      name: "Héctor Ramírez",
      role: "Piloto",
      roleClass: "bg-blue-100 text-blue-700",
      loc: "Choluteca, Choluteca",
      email: "hector_ramirez@biodron.hn",
      status: "Disponible",
    },
    {
      id: "7",
      init: "FA",
      name: "Finca El Agualote",
      role: "Agricultor",
      roleClass: "bg-emerald-100 text-emerald-700",
      loc: "San Esteban, Olancho",
      email: "finca_agualote@gmail.com",
      status: "Activo",
    },
  ]);

  const [drones, setDrones] = useState([
    {
      id: "D-01",
      model: "DJI Agras T40",
      serial: "T40-HN-0091",
      cap: "40L / 50kg",
      status: "Operativo",
      battery: "92%",
    },
    {
      id: "D-02",
      model: "DJI FlyCart 30",
      serial: "FC30-HN-0012",
      cap: "30kg Carga",
      status: "En Vuelo",
      battery: "68%",
    },
    {
      id: "D-03",
      model: "Mavic 3 Multispectral",
      serial: "M3M-HN-0104",
      cap: "Escáner NDVI",
      status: "Operativo",
      battery: "100%",
    },
    {
      id: "D-04",
      model: "GRIFF Aviation 300",
      serial: "G300-HN-0002",
      cap: "227kg Carga",
      status: "Mantenimiento",
      battery: "15%",
    },
    {
      id: "D-05",
      model: "DJI Agras T50",
      serial: "T50-HN-0115",
      cap: "50L Fumigación",
      status: "Operativo",
      battery: "85%",
    },
  ]);

  const [rates, setRates] = useState([
    {
      id: "R-1",
      service: "Fumigación de Precisión",
      unit: "Manzana (Mz)",
      cost: "L 280",
      min: "5 Mz",
    },
    {
      id: "R-2",
      service: "Mapeo Multiespectral (NDVI)",
      unit: "Hectárea (Ha)",
      cost: "L 180",
      min: "10 Ha",
    },
    {
      id: "R-3",
      service: "Transporte Carga Ligera",
      unit: "Vuelo Operativo",
      cost: "L 1,500",
      min: "1 Vuelo",
    },
    {
      id: "R-4",
      service: "Logística Gran Tonelaje",
      unit: "Jornada Operativa",
      cost: "L 8,500",
      min: "1 Día",
    },
    {
      id: "R-5",
      service: "Inspección Térmica",
      unit: "Hora de Vuelo",
      cost: "L 950",
      min: "2 Horas",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    role: "Piloto",
    loc: "",
    email: "",
    status: "Activo",
    model: "",
    serial: "",
    cap: "",
    droneStatus: "Operativo",
    battery: "100%",
    service: "",
    unit: "Manzana (Mz)",
    cost: "",
    min: "1 Mz",
  });

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "Piloto",
      loc: "",
      email: "",
      status: "Activo",
      model: "",
      serial: "",
      cap: "",
      droneStatus: "Operativo",
      battery: "100%",
      service: "",
      unit: "Manzana (Mz)",
      cost: "",
      min: "1 Mz",
    });
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Cargar datos en el modal para editar
  const handleEditUser = (u: typeof users[0]) => {
    setEditingId(u.id);
    setFormData({
      ...formData,
      name: u.name,
      role: u.role,
      loc: u.loc,
      email: u.email,
      status: u.status,
    });
    setIsModalOpen(true);
  };

  const handleEditDrone = (d: typeof drones[0]) => {
    setEditingId(d.id);
    setFormData({
      ...formData,
      model: d.model,
      serial: d.serial,
      cap: d.cap,
      droneStatus: d.status,
      battery: d.battery,
    });
    setIsModalOpen(true);
  };

  const handleEditRate = (r: typeof rates[0]) => {
    setEditingId(r.id);
    setFormData({
      ...formData,
      service: r.service,
      unit: r.unit,
      cost: r.cost.replace("L ", ""),
      min: r.min,
    });
    setIsModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "users") {
      const roleClass =
        formData.role === "Admin"
          ? "bg-[#0E5E6F]/10 text-[#0E5E6F]"
          : formData.role === "Piloto"
            ? "bg-blue-100 text-blue-700"
            : "bg-emerald-100 text-emerald-700";

      if (editingId) {
        setUsers(
          users.map((u) =>
            u.id === editingId
              ? {
                  ...u,
                  name: formData.name,
                  role: formData.role,
                  roleClass,
                  loc: formData.loc || u.loc,
                  email: formData.email || u.email,
                  init: formData.name.substring(0, 2).toUpperCase() || u.init,
                }
              : u,
          ),
        );
      } else {
        const newU = {
          id: String(Date.now()),
          init: formData.name.substring(0, 2).toUpperCase() || "U",
          name: formData.name,
          role: formData.role,
          roleClass,
          loc: formData.loc || "Honduras",
          email: formData.email || "usuario@biodron.hn",
          status: "Activo",
        };
        setUsers([...users, newU]);
      }
    } else if (activeTab === "drones") {
      if (editingId) {
        setDrones(
          drones.map((d) =>
            d.id === editingId
              ? {
                  ...d,
                  model: formData.model || d.model,
                  cap: formData.cap || d.cap,
                }
              : d,
          ),
        );
      } else {
        const newD = {
          id: `D-0${drones.length + 1}`,
          model: formData.model || "Dron Agrícola Genérico",
          serial: `HN-${Math.floor(1000 + Math.random() * 9000)}`,
          cap: formData.cap || "20 Litros",
          status: "Operativo",
          battery: "100%",
        };
        setDrones([...drones, newD]);
      }
    } else {
      const formattedCost = formData.cost.startsWith("L ")
        ? formData.cost
        : `L ${formData.cost || "200"}`;

      if (editingId) {
        setRates(
          rates.map((r) =>
            r.id === editingId
              ? {
                  ...r,
                  service: formData.service || r.service,
                  cost: formattedCost,
                }
              : r,
          ),
        );
      } else {
        const newR = {
          id: `R-${rates.length + 1}`,
          service: formData.service || "Servicio Personalizado",
          unit: "Manzana (Mz)",
          cost: formattedCost,
          min: "1 Mz",
        };
        setRates([...rates, newR]);
      }
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteUser = (id: string) =>
    setUsers(users.filter((u) => u.id !== id));
  const handleDeleteDrone = (id: string) =>
    setDrones(drones.filter((d) => d.id !== id));
  const handleDeleteRate = (id: string) =>
    setRates(rates.filter((r) => r.id !== id));

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.loc.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredDrones = drones.filter(
    (d) =>
      d.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.serial.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredRates = rates.filter((r) =>
    r.service.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Title className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Gestión de Datos y Operaciones
          </Title>
          <Text className="text-xs text-gray-500 mt-1">
            Administra la infraestructura de pilotos, flota de drones y cuadro
            tarifario en Lempiras (HND).
          </Text>
        </div>
        <WireframeButton
          primary
          onClick={handleOpenAddModal}
          className="py-2.5 px-4 rounded-xl shadow-sm flex items-center gap-2 text-xs font-bold shrink-0"
        >
          <Plus size={16} />
          {activeTab === "users"
            ? "Nuevo Usuario"
            : activeTab === "drones"
              ? "Registrar Dron"
              : "Añadir Tarifa"}
        </WireframeButton>
      </div>

      {/* TARJETAS MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Pilotos Registrados
            </Text>
            <Title as="h3" className="text-3xl font-black text-gray-900">
              {users.filter((u) => u.role === "Piloto").length}
            </Title>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Drones Operativos
            </Text>
            <Title as="h3" className="text-3xl font-black text-gray-900">
              {drones.filter((d) => d.status !== "Mantenimiento").length} /{" "}
              {drones.length}
            </Title>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
            <BatteryCharging size={24} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Tarifa Promedio Riego
            </Text>
            <Title as="h3" className="text-3xl font-black text-[#0E5E6F]">
              L 280{" "}
              <span className="text-xs text-gray-400 font-normal">/ Mz</span>
            </Title>
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
              { id: "users", label: "Usuarios y Pilotos" },
              { id: "drones", label: "Flota de Drones" },
              { id: "rates", label: "Tarifas y Precios" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  resetForm();
                }}
                className={`px-4 py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-[#0E5E6F] border-[#0E5E6F] bg-white"
                    : "text-gray-500 border-transparent hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative my-2 md:my-0">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-[#0E5E6F] w-full md:w-56"
            />
          </div>
        </div>

        {/* TABLA: USUARIOS Y PILOTOS */}
        {activeTab === "users" && (
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
                {filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-7 h-7 rounded-full bg-[#0E5E6F]/10 text-[#0E5E6F] flex items-center justify-center font-black text-[11px] shrink-0">
                          {u.init}
                        </div>
                        <span className="truncate">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${u.roleClass}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-600 font-medium truncate">
                      {u.loc}
                    </td>
                    <td className="px-3 py-3 text-gray-500 font-mono text-[11px] truncate">
                      {u.email}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          u.status === "Activo" || u.status === "Disponible"
                            ? "bg-emerald-100 text-emerald-800"
                            : u.status === "En Operación"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditUser(u)}
                          className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLA: FLOTA DE DRONES */}
        {activeTab === "drones" && (
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
                {filteredDrones.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">
                      {d.model}
                    </td>
                    <td className="px-3 py-3 text-gray-500 font-mono text-[11px] truncate">
                      {d.serial}
                    </td>
                    <td className="px-3 py-3 text-gray-700 font-medium truncate">
                      {d.cap}
                    </td>
                    <td className="px-2 py-3 font-bold text-gray-700 whitespace-nowrap">
                      {d.battery}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          d.status === "Operativo"
                            ? "bg-emerald-100 text-emerald-800"
                            : d.status === "En Vuelo"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditDrone(d)}
                          className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteDrone(d.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TABLA: CONFIGURACIÓN DE TARIFAS */}
        {activeTab === "rates" && (
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
                {filteredRates.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-3 py-3 font-bold text-gray-900 truncate">
                      {r.service}
                    </td>
                    <td className="px-3 py-3 text-gray-600 truncate">
                      {r.unit}
                    </td>
                    <td className="px-3 py-3 font-black text-[#0E5E6F] text-xs whitespace-nowrap">
                      {r.cost}
                    </td>
                    <td className="px-3 py-3 text-gray-500 truncate">
                      {r.min}
                    </td>
                    <td className="px-2 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditRate(r)}
                          className="text-gray-400 hover:text-[#0E5E6F] p-1 rounded transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteRate(r.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL AGREGAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <Title as="h3" className="text-lg font-bold text-gray-900 mb-1">
              {editingId
                ? activeTab === "users"
                  ? "Editar Usuario"
                  : activeTab === "drones"
                    ? "Editar Dron"
                    : "Editar Tarifa"
                : activeTab === "users"
                  ? "Agregar Nuevo Usuario"
                  : activeTab === "drones"
                    ? "Registrar Dron en Flota"
                    : "Añadir Nueva Tarifa Base"}
            </Title>
            <Text className="text-xs text-gray-500 mb-4">
              Ingresa la información requerida para actualizar el sistema.
            </Text>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              {activeTab === "users" && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Nombre Completo / Empresa
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Rol Operativo
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    >
                      <option value="Piloto">Piloto</option>
                      <option value="Agricultor">Agricultor</option>
                      <option value="Admin">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Catacamas, Olancho"
                      value={formData.loc}
                      onChange={(e) =>
                        setFormData({ ...formData, loc: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.hn"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                </>
              )}

              {activeTab === "drones" && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Modelo de Dron
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. DJI Agras T50"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Capacidad / Propósito
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 50 Litros Fumigación"
                      value={formData.cap}
                      onChange={(e) =>
                        setFormData({ ...formData, cap: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                </>
              )}

              {activeTab === "rates" && (
                <>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Nombre del Servicio
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Monitoreo Térmico Nocturno"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">
                      Precio en Lempiras (L)
                    </label>
                    <input
                      type="number"
                      placeholder="Ej. 350"
                      value={formData.cost}
                      onChange={(e) =>
                        setFormData({ ...formData, cost: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0E5E6F]"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <WireframeButton
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1 py-2 rounded-lg text-xs"
                >
                  Cancelar
                </WireframeButton>
                <WireframeButton
                  primary
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-xs"
                >
                  {editingId ? "Actualizar" : "Guardar"}
                </WireframeButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};