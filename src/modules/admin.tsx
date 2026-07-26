import { AlertCircle, ArrowUp, BarChart2, Battery, BatteryCharging, Bell, Check, CheckCheck, CheckCircle, Lock, CheckCircle2, ChevronLeft, Clock, CreditCard, Crosshair, DollarSign, Download, Droplet, Edit2, Edit3, Eye, EyeOff, FileText, Info, Layers, LogOut, Mail, MapPin, Maximize2, MessageSquare, MoreVertical, Package, Paperclip, Pause, Phone, PlaneTakeoff, Plus, Radio, Save, Search, Send, Settings, ShieldCheck, ShoppingBag, Star, Thermometer, ToggleLeft, ToggleRight, Trash2, TrendingUp, User, UserPlus, Video, Wind, X, Zap, Activity, AlertTriangle, BarChart3, Compass, Sparkles, ChevronRight, RotateCcw, SearchIcon, ShieldAlert, Sliders, UserCheck, Users, Wrench, PieChart, Calendar, Briefcase, Camera, Loader2, Upload, TagIcon, UploadCloud, Filter } from 'lucide-react';
import React, { useState} from 'react';

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
        style={{ fontFamily: "'Roboto', sans-serif" }}
        className={`px-4 py-2 tracking-wider transition-all border-2 rounded-[4px] ${
            primary
                ? "border-[#0E5E6F] bg-[#0E5E6F] text-white hover:bg-[#0b4a58]"
                : "border-gray-800 bg-gray-100 text-gray-800 hover:bg-gray-200"
        } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
    >
        {children}
    </button>
);

const WireframeInput = ({
    label,
    type = "text",
    placeholder = "Lorem ipsum",
    className = "",
}: any) => (
    <div
        className={`flex flex-col mb-4 w-full ${className}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
    >
        <label className="mb-1 text-sm text-gray-600 tracking-tight">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="p-3 border-2 border-gray-200 rounded-[4px] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0E5E6F] transition-colors"
        />
    </div>
);

const Title = ({ children, className = "", as: C = "h2" }: any) => (
    <C
        className={`font-black tracking-tight ${className}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
    >
        {children}
    </C>
);

const Text = ({ children, className = "", as: C = "p" }: any) => (
    <C
        className={`${className}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
    >
        {children}
    </C>
);

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

interface AdminProfileViewProps {
    onLogout: () => void;
}

interface AdminDashboardProps {
  onNavigate?: (view: string) => void;
}

type UserType = "client" | "pilot" | "tech" | "requests";

interface UserAccount {
    id: string;
    init: string;
    name: string;
    companyOrDept: string;
    loc: string;
    email: string;
    phone: string;
    status: "Activo" | "Inactivo" | "Pendiente";
    joinDate: string;
    stats: {
        totalServices?: number;
        completedFlights?: number;
        inspectionsDone?: number;
        rating?: number;
    };
    detailsList?: string[];
}

interface ServiceRequest {
    id: string;
    clientName: string;
    assignedPilot: string;
    serviceType: "Fumigación agrícola" | "Mapeo multiespectral" | "Mantenimiento preventivo" | "Carga pesada";
    location: string;
    date: string;
    areaOrUnits: string;
    totalPrice: number;
    status: "Pendiente" | "Aprobada" | "Rechazada" | "En proceso" | "Completada";
}

export interface AdminLog {
  id: string;
  adminId: string;
  adminName: string;
  type: 'user_management' | 'system_config' | 'audit_security';
  typeName: string;
  targetModule: string;
  responsible: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  affectedCount: string;
  actionDetails: string;
  authorizationCode: string;
  status: 'completed' | 'interrupted' | 'failed';
  securityLevel: string;
  terminalIp: string;
  notes: string;
}

// 1. Dashboard de Admin
export const AdminDashboardView: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  // Estado de navegación por pestañas
  const [activeTab, setActiveTab] = useState<string>("metricas");

  // Estados de control de interfaz
  const [chartPeriod, setChartPeriod] = useState<"semana" | "mes" | "anio">("mes");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Paleta unificada de colores HEX
  const HEX_COLORS = {
    brandGreen: "#0E5E6F",
    emerald100: "#D1FAE5",
    red: "#B8001F",
    amber100: "#FEF3C7",
    blue100: "#DBEAFE",
    orange100: "#FFEDD5",
    purple100: "#F3E8FF",
  };

  // Notificaciones del rol administrador
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "alerta",
      titulo: "Batería baja crítica",
      detalle: "Dron Agras T40 (#DRN-01) en Misión Tegucigalpa reporta 14% de batería.",
      tiempo: "Hace 2 min",
      colorBg: HEX_COLORS.orange100,
      textColor: "#C2410C",
      icono: <AlertTriangle size={13} />,
      unread: true,
    },
    {
      id: 2,
      tipo: "incidencia",
      titulo: "Ticket de soporte urgente",
      detalle: "Cliente 'AgroComer' reporta fallo en sensor NDVI en Ticket #TK-808.",
      tiempo: "Hace 15 min",
      colorBg: HEX_COLORS.amber100,
      textColor: "#92400E",
      icono: <ShieldAlert size={13} />,
      unread: true,
    },
    {
      id: 3,
      tipo: "piloto",
      titulo: "Piloto asignado",
      detalle: "Piloto Carlos Mendoza inició la Misión #MIS-902 en Valle de Amarateca.",
      tiempo: "Hace 1 hora",
      colorBg: HEX_COLORS.blue100,
      textColor: "#1E40AF",
      icono: <UserCheck size={13} />,
      unread: true,
    },
    {
      id: 4,
      tipo: "mantenimiento",
      titulo: "Chequeo técnico finalizado",
      detalle: "Técnico Luis Gómez completó mantenimiento preventivo del Matrice 300.",
      tiempo: "Ayer, 04:30 PM",
      colorBg: HEX_COLORS.emerald100,
      textColor: "#065F46",
      icono: <ShieldCheck size={13} />,
      unread: false,
    },
  ]);

  // Simulador interactivo (Variables dinámicas)
  const [simBateria, setSimBateria] = useState<number>(85);
  const [simCargaInsumo, setSimCargaInsumo] = useState<number>(60);
  const [simViento, setSimViento] = useState<number>(14);

  // Cálculos dinámicos del simulador
  const tiempoRestanteCalc = Math.round((simBateria / 100) * 35);
  const temperaturaEst = Math.round(25 + (100 - simBateria) * 0.12 + simViento * 0.2);
  const altitudSugerida = simViento > 20 ? "25 m (Baja por viento)" : "45 m (Óptima)";

  const resetSimulador = () => {
    setSimBateria(100);
    setSimCargaInsumo(100);
    setSimViento(8);
  };

  // Datos para gráfico principal (Finanzas)
  const chartData: Record<
    string,
    Record<string, { label: string; valor: number; detalle: string; unidad: string }[]>
  > = {
    metricas: {
      semana: [
        { label: "Lun", valor: 3200, detalle: "14 servicios ejecutados", unidad: "USD ($)" },
        { label: "Mar", valor: 4500, detalle: "18 servicios ejecutados", unidad: "USD ($)" },
        { label: "Mié", valor: 2800, detalle: "11 servicios ejecutados", unidad: "USD ($)" },
        { label: "Jue", valor: 6100, detalle: "22 servicios ejecutados", unidad: "USD ($)" },
        { label: "Vie", valor: 7500, detalle: "28 servicios ejecutados", unidad: "USD ($)" },
        { label: "Sáb", valor: 5200, detalle: "19 servicios ejecutados", unidad: "USD ($)" },
        { label: "Dom", valor: 1800, detalle: "8 servicios ejecutados", unidad: "USD ($)" },
      ],
      mes: [
        { label: "Ene", valor: 18500, detalle: "Riego y fumigación líderes", unidad: "USD ($)" },
        { label: "Feb", valor: 22400, detalle: "Alta demanda agro", unidad: "USD ($)" },
        { label: "Mar", valor: 19800, detalle: "Mantenimientos incluidos", unidad: "USD ($)" },
        { label: "Abr", valor: 28900, detalle: "Nuevas suscripciones VIP", unidad: "USD ($)" },
        { label: "May", valor: 31200, detalle: "Pico de siembra aérea", unidad: "USD ($)" },
        { label: "Jun", valor: 38500, detalle: "Récord de vuelos activos", unidad: "USD ($)" },
      ],
      anio: [
        { label: "2023", valor: 145000, detalle: "Fase inicial BIODRON", unidad: "USD ($)" },
        { label: "2024", valor: 280000, detalle: "Expansión de flota", unidad: "USD ($)" },
        { label: "2025", valor: 410000, detalle: "Consolidación regional", unidad: "USD ($)" },
        { label: "2026", valor: 590000, detalle: "Proyección actual", unidad: "USD ($)" },
      ],
    },
  };

  // Datos para gráficos secundarios por categoría de servicio
  const serviciosData = [
    {
      nombre: "Fumigación de precisión",
      ingreso: "$18,200 USD",
      porcentaje: 45,
      misiones: "62 vuelos",
      color: HEX_COLORS.brandGreen,
    },
    {
      nombre: "Mapeo fotogramétrico",
      ingreso: "$10,400 USD",
      porcentaje: 28,
      misiones: "34 vuelos",
      color: HEX_COLORS.blue100,
      textColor: "#1E40AF",
    },
    {
      nombre: "Riego focalizado",
      ingreso: "$6,100 USD",
      porcentaje: 16,
      misiones: "21 vuelos",
      color: HEX_COLORS.purple100,
      textColor: "#6B21A8",
    },
    {
      nombre: "Búsqueda y rescate térmico",
      ingreso: "$3,800 USD",
      porcentaje: 11,
      misiones: "10 vuelos",
      color: HEX_COLORS.amber100,
      textColor: "#92400E",
    },
  ];

  // Registros de tabla operativa
  const datosRegistrosAdmin = [
    {
      id: "MTR-901",
      cliente: "AgroPecuaria del Sur",
      piloto: "Carlos Mendoza",
      tecnico: "Luis Gómez",
      servicio: "Fumigación de precisión",
      dron: "Agras T40",
      ganancia: "$1,250 USD",
      estado: "En proceso",
      tagColorBg: HEX_COLORS.blue100,
      tagTextColor: "#1E40AF",
    },
    {
      id: "MTR-898",
      cliente: "Corporación Dinant",
      piloto: "Ana Bermúdez",
      tecnico: "Marcos Torres",
      servicio: "Mapeo fotogramétrico",
      dron: "Matrice 300 RTK",
      ganancia: "$2,800 USD",
      estado: "Completado",
      tagColorBg: HEX_COLORS.emerald100,
      tagTextColor: "#065F46",
    },
    {
      id: "MTR-895",
      cliente: "Hacienda El Porvenir",
      piloto: "Roberto Varela",
      tecnico: "Luis Gómez",
      servicio: "Riego focalizado",
      dron: "DJI Agras T30",
      ganancia: "$950 USD",
      estado: "Completado",
      tagColorBg: HEX_COLORS.emerald100,
      tagTextColor: "#065F46",
    },
    {
      id: "MTR-890",
      cliente: "Industrias Amarateca",
      piloto: "Carlos Mendoza",
      tecnico: "Marcos Torres",
      servicio: "Búsqueda y rescate térmico",
      dron: "Ehang Thermal 184",
      ganancia: "$1,600 USD",
      estado: "En alerta",
      tagColorBg: HEX_COLORS.amber100,
      tagTextColor: "#92400E",
    },
    {
      id: "MTR-882",
      cliente: "Finca El Hatillo",
      piloto: "Sofia Reyes",
      tecnico: "Gabriel Silva",
      servicio: "Transporte exprés de insumos",
      dron: "GRIFF Aviation 300",
      ganancia: "$700 USD",
      estado: "Completado",
      tagColorBg: HEX_COLORS.emerald100,
      tagTextColor: "#065F46",
    },
  ];

  // Filtro de tabla
  const registrosActuales = datosRegistrosAdmin.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.cliente.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.piloto.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.tecnico.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.servicio.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.dron.toLowerCase().includes(tableSearch.toLowerCase());

    if (statusFilter === "todos") return matchesSearch;
    if (statusFilter === "completado") return matchesSearch && item.estado.toLowerCase() === "completado";
    if (statusFilter === "proceso") return matchesSearch && item.estado.toLowerCase() === "en proceso";
    if (statusFilter === "alerta") return matchesSearch && item.estado.toLowerCase() === "en alerta";

    return matchesSearch;
  });

  const currentChartSet = chartData["metricas"]?.[chartPeriod] || [];
  const maxChartValue = Math.max(...currentChartSet.map((d) => d.valor), 1);
  const chartUnit = currentChartSet[0]?.unidad || "Monto";

  const yAxisTicks = [
    Math.round(maxChartValue),
    Math.round(maxChartValue * 0.75),
    Math.round(maxChartValue * 0.5),
    Math.round(maxChartValue * 0.25),
    0,
  ];

  const unreadCount = notificaciones.filter((n) => n.unread).length;

  return (
    <div
      style={{ fontFamily: "'Roboto', sans-serif" }}
      className="p-6 md:p-8 max-w-[1400px] mx-auto bg-white antialiased text-gray-800 font-sans"
    >
      {/* BARRA SUPERIOR DE ADMINISTRACIÓN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100 select-none">
        <div className="text-left space-y-0.5">
          {/* Title Case en Título Principal */}
          <h1 className="text-2xl font-black text-gray-900 tracking-tight font-sans">
            Panel de Control Administrativo
          </h1>
          <p className="text-gray-500 text-xs font-medium tracking-wide font-sans">
            Consola central BIODRON • Telemetría, personal, finanzas y monitoreo global
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Badge Rol Administrador (Tipo oración) */}
          <div
            style={{
              backgroundColor: HEX_COLORS.purple100,
              color: "#6B21A8",
              borderRadius: "4px",
            }}
            className="px-2.5 py-1 border border-purple-200 flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 bg-[#6B21A8] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider font-sans">Super admin root</span>
          </div>

          {/* CAMPANA Y DROPDOWN DE NOTIFICACIONES */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ borderRadius: "4px" }}
              className="relative p-2 bg-white border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-xs active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <Bell size={18} className="text-gray-600" />
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: HEX_COLORS.red,
                    borderRadius: "4px",
                  }}
                  className="absolute -top-1 -right-1 px-1 py-0.2 text-[9px] text-white font-black shadow-xs font-sans"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* PANEL DROPDOWN DE NOTIFICACIONES */}
            {showNotifications && (
              <div
                style={{ borderRadius: "4px" }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-2 border-gray-200 shadow-2xl z-50 p-4 text-left animate-in fade-in duration-150 font-sans"
              >
                <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Bell size={15} className="text-gray-700" />
                    {/* Title Case en Título del Dropdown */}
                    <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                      Centro de Control de Alertas
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {notificaciones.map((n) => (
                    <div
                      key={n.id}
                      style={{ borderRadius: "4px" }}
                      className={`p-2.5 border text-xs transition-colors ${
                        n.unread ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span
                          style={{
                            backgroundColor: n.colorBg,
                            color: n.textColor,
                            borderRadius: "4px",
                          }}
                          className="px-2 py-0.5 text-[9px] font-bold flex items-center gap-1 font-sans"
                        >
                          {n.icono}
                          {n.titulo}
                        </span>
                        <span className="text-[9px] font-mono text-gray-400">{n.tiempo}</span>
                      </div>
                      <p className="text-gray-700 font-medium text-[11px] leading-snug font-sans">
                        {n.detalle}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-gray-100 text-center">
                  <button
                    onClick={() => {
                      setNotificaciones(notificaciones.map((n) => ({ ...n, unread: false })));
                    }}
                    className="text-[11px] font-bold text-[#0E5E6F] hover:underline cursor-pointer font-sans"
                  >
                    Marcar alertas como atendidas
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MÉTRICAS GLOBALES DE LA EMPRESA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left font-sans">
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-gray-500 tracking-wider font-sans">
              Clientes activos
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Users size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5 font-sans">48 clientes</p>
          <p className="text-[10px] text-gray-400 font-semibold font-sans">+12% respecto al mes anterior</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-gray-500 tracking-wider font-sans">
              Drones activos en flota
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.blue100,
                color: "#1E40AF",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <UserCheck size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5 font-sans">16 drones activos</p>
          <p className="text-[10px] text-gray-400 font-semibold font-sans">12 operativos en misión hoy</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-gray-500 tracking-wider font-sans">
              Técnicos y soporte
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.purple100,
                color: "#6B21A8",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Wrench size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5 font-sans">8 técnicos</p>
          <p className="text-[10px] text-gray-400 font-semibold font-sans">3 en taller técnico</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-gray-500 tracking-wider font-sans">
              Ingresos totales (Mes)
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <TrendingUp size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5 font-sans">$38,500 USD</p>
          <p className="text-[10px] text-gray-400 font-semibold font-sans">Margen operacional: 42%</p>
        </div>
      </div>

      {/* PESTAÑAS PRINCIPALES (Title Case en pestañas) */}
      <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-1 select-none font-sans">
        {[
          { id: "metricas", label: "Métricas y finanzas", icon: <BarChart3 size={14} /> },
          { id: "mapa", label: "Mapa en vivo", icon: <MapPin size={14} /> },
          { id: "simulador", label: "Simulador de vuelo", icon: <Sliders size={14} /> },
          { id: "flota", label: "Flota y personal", icon: <Users size={14} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ borderRadius: "4px 4px 0 0" }}
              className={`px-3 py-3 text-xs font-bold flex items-center justify-center gap-2 border-t-2 border-x-2 -mb-[2px] transition-all text-center cursor-pointer font-sans ${
                isActive
                  ? "border-t-[#0E5E6F] border-x-gray-200 border-b-white bg-white text-[#0E5E6F] shadow-xs"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span className={isActive ? "text-[#0E5E6F]" : "text-gray-400"}>{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO PESTAÑA 1: MÉTRICAS, FINANZAS Y DESGLOSE POR SERVICIOS */}
      {activeTab === "metricas" && (
        <div className="space-y-6 animate-in fade-in duration-200 font-sans">
          {/* GRÁFICO 1: ANALÍTICA FINANCIERA GENERAL */}
          <div
            style={{ borderRadius: "4px" }}
            className="bg-white border-2 border-gray-200 p-5 shadow-xs text-left"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-[#0E5E6F]" />
                <div>
                  {/* Title Case en Título de Sección */}
                  <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                    Analítica Financiera — Ganancias Totales por Período
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium font-sans">
                    Escala eje Y: <strong className="text-gray-700">{chartUnit}</strong>
                  </p>
                </div>
              </div>

              {/* Selector de escala temporal (Tipo oración) */}
              <div
                style={{ borderRadius: "4px" }}
                className="bg-gray-100 p-1 flex items-center gap-1 border border-gray-200"
              >
                {[
                  { id: "semana", label: "Semana" },
                  { id: "mes", label: "Mes" },
                  { id: "anio", label: "Año" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setChartPeriod(p.id as any)}
                    style={{ borderRadius: "4px" }}
                    className={`px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer font-sans ${
                      chartPeriod === p.id
                        ? "bg-[#0E5E6F] text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative pt-4 pb-2 pr-2">
              <div className="flex h-64">
                {/* Eje Y */}
                <div className="w-14 flex flex-col justify-between items-end pr-3 border-r-2 border-gray-300 text-[10px] font-mono font-bold text-gray-400 py-1 select-none">
                  {yAxisTicks.map((tick, i) => (
                    <span key={i}>${tick}</span>
                  ))}
                </div>

                {/* Barras Financieras */}
                <div className="flex-1 relative flex items-end justify-between pl-4 pr-2 h-full">
                  <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0 px-2">
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b-2 border-gray-300 w-full h-0"></div>
                  </div>

                  {currentChartSet.map((item, idx) => {
                    const heightPercent = Math.max(8, Math.min(100, (item.valor / maxChartValue) * 100));
                    const barColors = [
                      HEX_COLORS.brandGreen,
                      HEX_COLORS.blue100,
                      HEX_COLORS.purple100,
                      HEX_COLORS.emerald100,
                      HEX_COLORS.amber100,
                      HEX_COLORS.orange100,
                    ];
                    const currentColor = barColors[idx % barColors.length];

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer z-10 px-1"
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {hoveredBar === idx && (
                          <div
                            style={{ borderRadius: "4px" }}
                            className="absolute -top-11 z-30 bg-gray-900 text-white px-2.5 py-1 text-[10px] font-mono shadow-xl whitespace-nowrap text-center animate-in fade-in duration-100 font-sans"
                          >
                            <p className="font-bold">${item.valor} USD</p>
                            <p className="text-gray-300 text-[9px]">{item.detalle}</p>
                          </div>
                        )}

                        <span className="text-[10px] font-black text-gray-700 mb-1 opacity-80 group-hover:opacity-100 font-sans">
                          ${item.valor}
                        </span>

                        <div
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: currentColor,
                            borderRadius: "4px 4px 0 0",
                          }}
                          className="w-full transition-all duration-300 hover:brightness-90 border-t border-x border-black/10"
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Eje X */}
              <div className="flex pl-14 pt-2 border-t-2 border-gray-300">
                <div className="flex-1 flex justify-between px-4">
                  {currentChartSet.map((item, idx) => (
                    <span
                      key={idx}
                      className="flex-1 text-center text-[10px] font-bold text-gray-500 tracking-wider font-sans"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GRÁFICO 2: DESGLOSE POR TIPOS DE SERVICIO */}
          <div
            style={{ borderRadius: "4px" }}
            className="bg-white border-2 border-gray-200 p-5 shadow-xs text-left"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <PieChart size={18} className="text-[#0E5E6F]" />
              <div>
                {/* Title Case en Título de Sección */}
                <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                  Distribución de Ingresos y Operaciones por Servicio
                </h3>
                <p className="text-[11px] text-gray-500 font-medium font-sans">
                  Desglose de facturación e intensidad de vuelos por tipo de misión
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contenedor de Progress Bars por Servicio */}
              <div className="space-y-4">
                {serviciosData.map((serv, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-800 font-sans">{serv.nombre}</span>
                      <span className="font-mono font-black text-gray-900">{serv.ingreso} ({serv.porcentaje}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-200">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${serv.porcentaje}%`,
                          backgroundColor: serv.color,
                        }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium text-right font-sans">
                      {serv.misiones} completados
                    </p>
                  </div>
                ))}
              </div>

              {/* Tarjetas resumen de servicios */}
              <div className="grid grid-cols-2 gap-3">
                {serviciosData.map((serv, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "4px",
                      backgroundColor: serv.color,
                      color: serv.textColor || "#FFFFFF",
                    }}
                    className="p-3 border border-black/10 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <span className="text-[9px] font-bold block opacity-80 font-sans">
                        Servicio {index + 1}
                      </span>
                      <p className="text-xs font-black leading-tight mt-1 font-sans">{serv.nombre}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-base font-black font-sans">{serv.ingreso}</p>
                      <p className="text-[10px] font-bold opacity-90 font-sans">{serv.misiones}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 2: MAPA EN VIVO */}
      {activeTab === "mapa" && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-5 shadow-xs mb-8 text-left font-sans animate-in fade-in duration-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#0E5E6F]" />
              <div>
                {/* Title Case */}
                <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                  Mapa en Vivo — Flota de Drones Activos
                </h3>
                <p className="text-[11px] text-gray-500 font-medium font-sans">
                  Ubicación satelital y cobertura operacional en tiempo real
                </p>
              </div>
            </div>

            {/* Tipo oración en etiqueta */}
            <span
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="px-2.5 py-1 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-200 font-sans"
            >
              <span className="w-2 h-2 bg-[#065F46] rounded-full animate-ping"></span>
              16 drones activos en sistema
            </span>
          </div>

          <div className="relative w-full h-96 rounded bg-gray-100 overflow-hidden border border-gray-200 group">
            <img
              src="src/img/drones_activos.png"
              alt="Mapa en vivo de drones activos"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

            {/* Pin 1 */}
            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-900/90 text-white p-2 rounded border border-emerald-400 shadow-lg backdrop-blur-xs font-sans">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <div>
                <p className="text-[10px] font-black leading-none font-sans">Agras T40 (#DRN-101)</p>
                <p className="text-[8px] text-gray-300 font-mono">Piloto: C. Mendoza</p>
              </div>
            </div>

            {/* Pin 2 */}
            <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-gray-900/90 text-white p-2 rounded border border-blue-400 shadow-lg backdrop-blur-xs font-sans">
              <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></span>
              <div>
                <p className="text-[10px] font-black leading-none font-sans">Matrice 300 (#DRN-204)</p>
                <p className="text-[8px] text-gray-300 font-mono">Piloto: A. Bermúdez</p>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded border border-gray-200 text-gray-800 text-[10px] font-mono shadow-md font-sans">
              <p className="font-bold text-gray-900">Coordenadas centro: 14.0723° N, 87.1921° W</p>
              <p className="text-gray-500">Señal GPS: Excelente (18 satélites)</p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 3: SIMULADOR INTERACTIVO */}
      {activeTab === "simulador" && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-5 shadow-xs mb-8 text-left font-sans animate-in fade-in duration-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-[#0E5E6F]" />
              <div>
                {/* Title Case */}
                <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                  Simulador Interactivo de Rendimiento del Dron
                </h3>
                <p className="text-[11px] text-gray-500 font-medium font-sans">
                  Ajusta los controles para simular el comportamiento de telemetría y consumo
                </p>
              </div>
            </div>

            {/* Tipo oración en botón */}
            <button
              onClick={resetSimulador}
              style={{ borderRadius: "4px" }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold border border-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <RotateCcw size={13} />
              Restablecer valores
            </button>
          </div>

          {/* CONTROLES DESLIZANTES */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Battery size={13} className="text-[#0E5E6F]" /> Batería ajustada:
                </label>
                <span className="text-xs font-mono font-black text-[#0E5E6F]">{simBateria}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={simBateria}
                onChange={(e) => setSimBateria(Number(e.target.value))}
                className="w-full accent-[#0E5E6F] cursor-pointer"
              />
              <p className="text-[9px] text-gray-400 font-medium mt-1 font-sans">
                Desliza para simular descarga
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Droplet size={13} className="text-[#0E5E6F]" /> Tanque de insumos:
                </label>
                <span className="text-xs font-mono font-black text-[#0E5E6F]">{simCargaInsumo}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simCargaInsumo}
                onChange={(e) => setSimCargaInsumo(Number(e.target.value))}
                className="w-full accent-[#0E5E6F] cursor-pointer"
              />
              <p className="text-[9px] text-gray-400 font-medium mt-1 font-sans">
                Desliza para simular aspersión
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Wind size={13} className="text-[#0E5E6F]" /> Viento ambiental:
                </label>
                <span className="text-xs font-mono font-black text-[#0E5E6F]">{simViento} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={simViento}
                onChange={(e) => setSimViento(Number(e.target.value))}
                className="w-full accent-[#0E5E6F] cursor-pointer"
              />
              <p className="text-[9px] text-gray-400 font-medium mt-1 font-sans">
                Desliza para simular ráfagas
              </p>
            </div>
          </div>

          {/* BARRAS DE PROGRESO */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Battery size={13} className="text-[#0E5E6F]" /> Autonomía batería
                </span>
                <span className="text-xs font-mono font-black text-gray-900">{simBateria}%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2 border border-gray-200">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${simBateria}%`,
                    backgroundColor:
                      simBateria > 50
                        ? HEX_COLORS.brandGreen
                        : simBateria > 20
                        ? "#D97706"
                        : HEX_COLORS.red,
                  }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium font-sans">
                Tiempo restante: <strong className="text-gray-900">{tiempoRestanteCalc} min</strong>
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Zap size={13} className="text-[#1E40AF]" /> Capacidad tanque
                </span>
                <span className="text-xs font-mono font-black text-gray-900">{simCargaInsumo}%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2 border border-gray-200">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${simCargaInsumo}%`,
                    backgroundColor: "#1E40AF",
                  }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium font-sans">
                Volumen disponible: <strong className="text-gray-900">{Math.round(40 * (simCargaInsumo / 100))} litros</strong>
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Activity size={13} className="text-[#6B21A8]" /> Carga térmica
                </span>
                <span className="text-xs font-mono font-black text-gray-900">{temperaturaEst}°C</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2 border border-gray-200">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (temperaturaEst / 50) * 100)}%`,
                    backgroundColor: "#6B21A8",
                  }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium font-sans">
                Estado: <strong className="text-gray-900">{temperaturaEst > 35 ? "Caliente" : "Normal"}</strong>
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded text-left shadow-2xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 font-sans">
                  <Radio size={13} className="text-[#92400E]" /> Resistencia viento
                </span>
                <span className="text-xs font-mono font-black text-gray-900">{simViento} km/h</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2 border border-gray-200">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (simViento / 40) * 100)}%`,
                    backgroundColor: "#92400E",
                  }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium font-sans">
                Altitud: <strong className="text-gray-900">{altitudSugerida}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 4: TABLA DE PERSONAL Y FLOTA */}
      {(activeTab === "flota" || activeTab === "metricas") && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 shadow-xs text-left overflow-hidden mb-8 font-sans animate-in fade-in duration-200"
        >
          <div className="p-4 border-b-2 border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
            <div>
              {/* Title Case */}
              <h3 className="text-xs font-black text-gray-900 tracking-wider font-sans">
                Control General de Asignaciones y Misiones
              </h3>
              <p className="text-[11px] text-gray-500 font-medium font-sans">
                Supervisión de clientes, pilotos, técnicos y rentabilidad por servicio
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
              {/* Buscador */}
              <div className="relative flex-1 sm:w-64">
                <SearchIcon
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Buscar cliente, piloto, técnico, dron..."
                  style={{ borderRadius: "4px" }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 focus:outline-none focus:border-[#0E5E6F] font-medium font-sans"
                />
                {tableSearch && (
                  <button
                    onClick={() => setTableSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Chips Filtros (Tipo oración) */}
              <div className="flex items-center gap-1">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "completado", label: "Completados" },
                  { id: "proceso", label: "En proceso" },
                  { id: "alerta", label: "Alertas" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    style={{
                      borderRadius: "4px",
                      backgroundColor: statusFilter === f.id ? HEX_COLORS.brandGreen : "#FFFFFF",
                      color: statusFilter === f.id ? "#FFFFFF" : "#0E5E6F",
                      borderColor: HEX_COLORS.brandGreen,
                    }}
                    className="px-2.5 py-1 text-[11px] font-bold border transition-all hover:opacity-90 active:scale-95 whitespace-nowrap cursor-pointer font-sans"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tabla de Registros (Encabezados en Tipo Oración) */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-white text-gray-500 font-bold border-b border-gray-200 text-[10px] tracking-wider font-sans">
                <tr>
                  <th className="px-4 py-2.5 whitespace-nowrap">Código de misión</th>
                  <th className="px-4 py-2.5">Cliente y servicio</th>
                  <th className="px-4 py-2.5 whitespace-nowrap">Piloto asignado</th>
                  <th className="px-4 py-2.5 whitespace-nowrap">Técnico a cargo</th>
                  <th className="px-4 py-2.5 whitespace-nowrap">Dron e ingreso</th>
                  <th className="px-4 py-2.5 text-center whitespace-nowrap">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {registrosActuales.length > 0 ? (
                  registrosActuales.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-extrabold text-gray-900 font-sans">{row.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-gray-800 font-sans">{row.cliente}</p>
                        <p className="text-[10px] text-gray-400 font-medium font-sans">{row.servicio}</p>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                        <span className="flex items-center gap-1 font-sans">
                          <UserCheck size={12} className="text-gray-400 shrink-0" />
                          {row.piloto}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                        <span className="flex items-center gap-1 font-sans">
                          <Wrench size={12} className="text-gray-400 shrink-0" />
                          {row.tecnico}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-bold text-[#0E5E6F] font-sans">{row.dron}</p>
                        <p className="text-[10px] text-emerald-700 font-mono font-bold">
                          {row.ganancia}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span
                          style={{
                            backgroundColor: row.tagColorBg,
                            color: row.tagTextColor,
                            borderRadius: "4px",
                          }}
                          className="px-2 py-0.5 font-bold text-[10px] inline-block border border-black/5 font-sans"
                        >
                          {row.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-400 font-medium font-sans">
                      No se encontraron registros coincidentes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50/40 flex justify-between items-center font-sans">
            <span className="text-[11px] font-bold text-gray-400 font-sans">
              {registrosActuales.length} registros gestionados
            </span>
            {/* Botón Tipo Oración */}
            <button
              style={{
                borderRadius: "4px",
                backgroundColor: HEX_COLORS.brandGreen,
              }}
              className="px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#094350] transition-colors shadow-xs cursor-pointer font-sans"
            >
              <Download size={13} />
              Exportar reporte administrativo
            </button>
          </div>
        </div>
      )}

      {/* BANNER INFERIOR DE ACCIÓN GLOBAL */}
      <div
        style={{ borderRadius: "4px" }}
        className="border-2 border-gray-200 p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-left shadow-xs font-sans"
      >
        <div className="flex items-center gap-3.5">
          <div
            style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.purple100 }}
            className="p-3 text-purple-800 shrink-0 border border-purple-200"
          >
            <Users size={20} />
          </div>
          <div>
            {/* Title Case en Título de Pregunta */}
            <h4 className="text-sm font-black text-gray-900 font-sans">
              ¿Necesitas Dar de Alta un Nuevo Piloto o Dron en BIODRON?
            </h4>
            <p className="text-xs text-gray-500 font-medium font-sans">
              Gestiona los permisos de acceso y asignaciones técnicas desde la consola central
            </p>
          </div>
        </div>

        {/* Botón Tipo Oración */}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate("AdminFlotaView")}
          style={{
            borderRadius: "4px",
            backgroundColor: HEX_COLORS.brandGreen,
          }}
          className="px-6 py-2.5 text-white text-xs font-bold tracking-wider hover:bg-[#094350] transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer font-sans"
        >
          <span>Gestionar flota y personal</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// 2. Panel de precios
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
    // ESTADOS DE VENTA DE DRONES
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

    // Estado para Modal de Etiquetas
    const [isTagModalOpen, setIsTagModalOpen] = useState<boolean>(false);
    const [selectedDroneIdForTag, setSelectedDroneIdForTag] = useState<number | null>(null);
    const [newTagInput, setNewTagInput] = useState<string>("");

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

    // Handlers para Planes
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

    // Handler para abrir modal de Tag
    const handleOpenTagModal = (droneId: number) => {
        setSelectedDroneIdForTag(droneId);
        setNewTagInput("");
        setIsTagModalOpen(true);
    };

    // Handler para guardar Tag desde Modal
    const handleSaveTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagInput.trim() || selectedDroneIdForTag === null) return;

        setDronesVenta((prev) =>
            prev.map((d) =>
                d.id === selectedDroneIdForTag
                    ? { ...d, tags: [...d.tags, newTagInput.trim()] }
                    : d,
            ),
        );
        setIsTagModalOpen(false);
        setNewTagInput("");
        setSelectedDroneIdForTag(null);
        setHasUnsavedChanges(true);
    };

    return (
        <div
            className="p-4 sm:p-6 max-w-5xl mx-auto bg-white antialiased text-gray-800 select-none"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            {/* HEADER PRINCIPAL */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200 text-left">
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Precios y Suscripciones
                    </h1>
                    <p className="text-gray-500 text-xs font-normal">
                        Configura planes, tarifas y drones de alta capacidad.
                    </p>
                </div>
            </div>

            {/* TABS SELECTORAS */}
            <div className="flex border-b-2 border-gray-200 mb-6">
                <button
                    onClick={() => setTab("subs")}
                    className={`px-4 sm:px-6 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer ${tab === "subs"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <Layers size={15} /> Planes de suscripción
                </button>
                <button
                    onClick={() => setTab("ventas")}
                    className={`px-4 sm:px-6 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer ${tab === "ventas"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <ShoppingBag size={15} /> Venta de drones
                </button>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: PLANES DE SUSCRIPCIÓN */}
            {/* ========================================================================= */}
            {tab === "subs" && (
                <div className="space-y-8">
                    {/* TABLA DE PLANES COMPACTA */}
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xs overflow-hidden flex flex-col text-left">
                        {/* VISTA DE TABLA */}
                        <div className="hidden md:block w-full">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b-2 border-gray-200 text-xs font-semibold text-gray-600">
                                    <tr>
                                        <th className="py-3 px-3">Plan</th>
                                        <th className="py-3 px-3">Precio (L.)</th>
                                        <th className="py-3 px-3">Ciclo</th>
                                        <th className="py-3 px-3 text-center">Vuelos/mes</th>
                                        <th className="py-3 px-3 text-center">Cobertura</th>
                                        <th className="py-3 px-3 text-center">Estado</th>
                                        <th className="py-3 px-3 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {planes.map((plan) => (
                                        <tr
                                            key={plan.id}
                                            className="hover:bg-gray-50/50 transition-colors text-xs"
                                        >
                                            <td className="py-2.5 px-3 font-bold text-gray-900">
                                                {plan.name}
                                            </td>
                                            <td className="py-2.5 px-3">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] text-gray-400 font-bold">
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
                                                        className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs font-mono w-20 focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-gray-800"
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
                                                    className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-700 font-normal"
                                                >
                                                    <option value="Mensual">Mensual</option>
                                                    <option value="Anual">Anual</option>
                                                    <option value="Trimestral">Trimestral</option>
                                                </select>
                                            </td>
                                            <td className="py-2.5 px-3 text-center font-mono font-bold text-gray-700">
                                                {plan.flights}
                                            </td>
                                            <td className="py-2.5 px-3 text-center text-gray-700">
                                                {plan.area}
                                            </td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span
                                                    className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-[4px] border ${plan.active
                                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                            : "border-amber-300 bg-amber-100 text-amber-800"
                                                        }`}
                                                >
                                                    {plan.active ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-3 text-center">
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setEditingPlan(plan);
                                                            setIsPlanModalOpen(true);
                                                        }}
                                                        className="px-2.5 py-1 hover:bg-gray-100 border border-gray-200 rounded-[4px] text-gray-700 hover:text-[#0E5E6F] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                                        title="Editar plan"
                                                    >
                                                        <Edit3 size={13} />
                                                        Editar
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
                                        <span className="font-bold text-xs text-gray-900">
                                            {plan.name}
                                        </span>
                                        <span
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] border ${plan.active
                                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                    : "border-amber-300 bg-amber-100 text-amber-800"
                                                }`}
                                        >
                                            {plan.active ? "Activo" : "Inactivo"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 block mb-0.5">
                                                Precio (L.)
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-gray-400 font-bold">
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
                                                    className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs font-mono w-full focus:border-[#0E5E6F] focus:outline-none font-bold text-gray-800"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-[10px] font-bold text-gray-500 block mb-0.5">
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
                                                className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-700 font-normal w-full"
                                            >
                                                <option value="Mensual">Mensual</option>
                                                <option value="Anual">Anual</option>
                                                <option value="Trimestral">Trimestral</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
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

                                    <div className="flex justify-center pt-1.5 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                setEditingPlan(plan);
                                                setIsPlanModalOpen(true);
                                            }}
                                            className="px-2.5 py-1 hover:bg-gray-100 border border-gray-200 rounded-[4px] text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Edit3 size={13} /> Editar
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
                                className="py-1.5 px-3 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                <Plus size={14} /> Agregar nuevo plan
                            </button>
                        </div>
                    </div>

                    {/* CALCULADORA ANALÍTICA DE PROYECCIONES */}
                    <div className="text-left bg-white border-2 border-gray-200 rounded-[4px] p-4 shadow-xs">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">
                            Análisis y Proyección Mensual de Suscripciones Activas
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Sliders de Distribución de Clientes */}
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1 text-xs">
                                        <label className="font-bold text-gray-700">
                                            Volumen Plan Básico (L.{" "}
                                            {planes
                                                .find((p) => p.name === "Básico")
                                                ?.price.toLocaleString()}
                                            )
                                        </label>
                                        <span className="font-mono font-bold text-[#0E5E6F]">
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
                                        className="w-full accent-[#0E5E6F] h-1.5 bg-gray-100 rounded-full cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1 text-xs">
                                        <label className="font-bold text-gray-700">
                                            Volumen Plan Operativo (L.{" "}
                                            {planes
                                                .find((p) => p.name === "Operativo")
                                                ?.price.toLocaleString()}
                                            )
                                        </label>
                                        <span className="font-mono font-bold text-[#2994B2]">
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
                                        className="w-full accent-[#2994B2] h-1.5 bg-gray-100 rounded-full cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1 text-xs">
                                        <label className="font-bold text-gray-700">
                                            Volumen Plan Premium (L.{" "}
                                            {planes
                                                .find((p) => p.name === "Premium")
                                                ?.price.toLocaleString()}
                                            )
                                        </label>
                                        <span className="font-mono font-bold text-[#B165E0]">
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
                                        className="w-full accent-[#B165E0] h-1.5 bg-gray-100 rounded-full cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Panel de Visualización del MRR Proyectado */}
                            <div className="bg-gray-50 border-2 border-gray-100 rounded-[4px] p-5 text-center flex flex-col justify-between h-full min-h-[180px]">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-bold text-gray-500 block">
                                        Ingreso mensual recurrente proyectado (MRR)
                                    </span>
                                    <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight block">
                                        L.{" "}
                                        {mrrTotal.toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>

                                {/* Barra Analítica Proporcional */}
                                <div>
                                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden flex">
                                        <div
                                            className="bg-[#0E5E6F] transition-all duration-300"
                                            style={{
                                                width: `${mrrTotal > 0 ? (mrrBasico / mrrTotal) * 100 : 0}%`,
                                            }}
                                        />
                                        <div
                                            className="bg-[#2994B2] transition-all duration-300"
                                            style={{
                                                width: `${mrrTotal > 0 ? (mrrOperativo / mrrTotal) * 100 : 0}%`,
                                            }}
                                        />
                                        <div
                                            className="bg-[#B165E0] transition-all duration-300"
                                            style={{
                                                width: `${mrrTotal > 0 ? (mrrPremium / mrrTotal) * 100 : 0}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 mt-2.5 text-[10px] font-bold text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-[#0E5E6F]" />{" "}
                                            Básico
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-[#2994B2]" />{" "}
                                            Operativo
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-[#B165E0]" />{" "}
                                            Premium
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: VENTA DE DRONES */}
            {/* ========================================================================= */}
            {tab === "ventas" && (
                <div className="space-y-5 text-left">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-1">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Catálogo de Flota Comercial
                            </h2>
                            <p className="text-xs text-gray-500 font-normal">
                                Drones pesados para logística y tareas agrícolas de alto impacto.
                            </p>
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
                            className="py-1.5 px-3 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                        >
                            <Plus size={14} /> Agregar dron comercial
                        </button>
                    </div>

                    {/* LISTADO DE CARDS HORIZONTALES */}
                    <div className="space-y-4">
                        {dronesVenta.map((drone) => (
                            <div
                                key={drone.id}
                                className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xs overflow-hidden flex flex-col md:flex-row hover:border-[#0E5E6F]/40 transition-all duration-200"
                            >
                                <div className="relative w-full md:w-56 h-44 md:h-auto bg-gray-100 overflow-hidden shrink-0">
                                    <img
                                        src={drone.image}
                                        alt={drone.name}
                                        className="w-full h-full object-cover rounded-[4px] hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src =
                                                "https://via.placeholder.com/400x300?text=" +
                                                encodeURIComponent(drone.name);
                                        }}
                                    />
                                    <span className="absolute top-2 left-2 bg-gray-900/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px]">
                                        Capacidad: {drone.capacity}
                                    </span>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-bold text-sm sm:text-base text-gray-900">
                                                    {drone.name}
                                                </h3>
                                                <ShieldCheck size={16} className="text-[#0E5E6F]" />
                                            </div>
                                            <p className="text-xs text-gray-500 font-normal">
                                                {drone.model}
                                            </p>
                                        </div>

                                        {/* Tags Badges */}
                                        <div className="flex flex-wrap items-center gap-1 pt-1 sm:pt-0">
                                            {drone.tags.map((t, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gray-100 border border-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-[4px]"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                            <button
                                                onClick={() => handleOpenTagModal(drone.id)}
                                                className="bg-[#0E5E6F]/10 border border-[#0E5E6F]/30 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 rounded-[4px] hover:bg-[#0E5E6F]/20 transition-colors cursor-pointer"
                                            >
                                                + Tag
                                            </button>
                                        </div>
                                    </div>

                                    {/* Controles Interactivos de Precio y Stock */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-2.5 rounded-[4px] border border-gray-200">
                                        <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                                            <span className="text-xs font-bold text-gray-600">
                                                Precio lempiras:
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-400 font-bold">
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
                                                    className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs font-mono w-28 focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-[#0E5E6F]"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                                            <span className="text-xs font-bold text-gray-600">
                                                Stock disponible:
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
                                                    className="border border-gray-200 rounded-[4px] px-2 py-0.5 text-xs font-mono w-14 text-center focus:border-[#0E5E6F] focus:outline-none bg-white font-bold text-gray-800"
                                                />
                                                <span className="text-xs text-gray-500 font-normal">
                                                    uds
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-start pt-1.5 border-t border-gray-100">
                                        <button
                                            onClick={() => {
                                                setEditingDrone(drone);
                                                setIsDroneModalOpen(true);
                                            }}
                                            className="text-xs text-[#0E5E6F] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                            <Edit3 size={13} /> Editar especificaciones
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
                <div className="sticky bottom-6 z-20 flex justify-end mt-6">
                    <div className="bg-gray-900 border-2 border-gray-800 text-white rounded-[4px] shadow-lg px-4 py-2.5 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-amber-400">
                            <AlertCircle size={16} />
                            <span className="text-xs text-gray-200 font-bold">
                                Modificaciones sin guardar
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setHasUnsavedChanges(false)}
                                className="py-1 px-3 text-xs font-bold rounded-[4px] border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                Descartar
                            </button>
                            <button
                                onClick={() => {
                                    setHasUnsavedChanges(false);
                                    alert("¡Cambios guardados exitosamente!");
                                }}
                                className="py-1 px-3 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                            >
                                <Save size={13} /> Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 1: EDITAR / CREAR PLAN */}
            {isPlanModalOpen && editingPlan && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-xl overflow-hidden text-left">
                        <div className="flex justify-between items-center px-6 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <Layers className="text-[#0E5E6F]" size={18} />
                                <h3 className="text-sm font-bold text-gray-900">
                                    {editingPlan.id
                                        ? "Editar Plan de Suscripción"
                                        : "Crear Nuevo Plan"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsPlanModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
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
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Nombre del plan
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingPlan.name}
                                        onChange={(e) =>
                                            setEditingPlan({ ...editingPlan, name: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
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
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Ciclo de facturación
                                    </label>
                                    <select
                                        value={editingPlan.cycle}
                                        onChange={(e) =>
                                            setEditingPlan({
                                                ...editingPlan,
                                                cycle: e.target.value as Plan["cycle"],
                                            })
                                        }
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal bg-white"
                                    >
                                        <option value="Mensual">Mensual</option>
                                        <option value="Anual">Anual</option>
                                        <option value="Trimestral">Trimestral</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Vuelos incluidos
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
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Cobertura máxima (área)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingPlan.area}
                                        onChange={(e) =>
                                            setEditingPlan({ ...editingPlan, area: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                {/* SWITCH DE ESTADO DENTRO DEL MODAL */}
                                <div className="sm:col-span-2 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={editingPlan.active}
                                            onChange={(e) =>
                                                setEditingPlan({
                                                    ...editingPlan,
                                                    active: e.target.checked,
                                                })
                                            }
                                            className="accent-[#0E5E6F] w-4 h-4 cursor-pointer"
                                        />
                                        <span className="text-xs font-bold text-gray-800">
                                            Plan activo
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsPlanModalOpen(false)}
                                    className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-[4px] cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                                >
                                    Guardar plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: EDITAR / CREAR DRON */}
            {isDroneModalOpen && editingDrone && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-xl overflow-hidden text-left">
                        <div className="flex justify-between items-center px-6 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <Package className="text-[#0E5E6F]" size={18} />
                                <h3 className="text-sm font-bold text-gray-900">
                                    {editingDrone.id
                                        ? "Editar Dron Comercial"
                                        : "Agregar Nuevo Dron"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsDroneModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
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
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Nombre / Modelo
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingDrone.name}
                                        onChange={(e) =>
                                            setEditingDrone({ ...editingDrone, name: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Submodelo o descripción
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editingDrone.model}
                                        onChange={(e) =>
                                            setEditingDrone({ ...editingDrone, model: e.target.value })
                                        }
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
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
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs font-mono text-gray-800 font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Stock inicial
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
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Capacidad máxima de carga
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
                                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    />
                                </div>

                                {/* SECCIÓN SIMULADA PARA SUBIR IMAGEN */}
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold text-gray-700 block mb-1">
                                        Imagen del dron
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 hover:border-[#0E5E6F] rounded-[4px] p-4 text-center cursor-pointer transition-colors bg-gray-50 flex flex-col items-center gap-1.5">
                                        <UploadCloud size={24} className="text-gray-400" />
                                        <span className="text-xs font-bold text-[#0E5E6F]">
                                            Cargar imagen del dron
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-normal">
                                            Formatos permitidos: PNG, JPG o WEBP (Máx. 5MB)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsDroneModalOpen(false)}
                                    className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-[4px] cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                                >
                                    Guardar dron
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 3: AGREGAR NUEVA ETIQUETA / TAG */}
            {isTagModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-sm overflow-hidden text-left">
                        <div className="flex justify-between items-center px-4 py-3 border-b-2 border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <TagIcon className="text-[#0E5E6F]" size={16} />
                                <h3 className="text-xs font-bold text-gray-900">
                                    Agregar Nueva Etiqueta
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsTagModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveTag} className="p-4 space-y-3">
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-1">
                                    Etiqueta o característica
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej. Batería inteligente, IP67..."
                                    value={newTagInput}
                                    onChange={(e) => setNewTagInput(e.target.value)}
                                    className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] outline-none text-xs text-gray-800 font-normal"
                                    autoFocus
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsTagModalOpen(false)}
                                    className="px-3 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-[4px] cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-3.5 py-1 bg-[#0E5E6F] hover:bg-[#0a4754] text-white text-xs font-bold rounded-[4px] shadow-xs cursor-pointer"
                                >
                                    Agregar etiqueta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// 3. Ayuda y Asistencia de Admin (help)
export const AdminHelpView = () => {
    // Avatar del Administrador actual
    const adminAvatar = "src/img/admin_perfil.png";

    // Lista de chats desde la perspectiva del Administrador
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
            sender: 'other',
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
        <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative font-sans">
            <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden">

                {/* ================= BARRA LATERAL (LISTA DE CLIENTES / GRANJEROS) ================= */}
                <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-gray-50/60 h-full min-h-0 shrink-0">

                    {/* TÍTULO Y BOTÓN DE REGISTRAR TICKET */}
                    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
                        <div>
                            <h2 className="font-bold text-gray-900 text-lg leading-tight capitalize">Panel de Soporte</h2>
                            <p className="text-xs text-gray-500">Atención a granjeros y pilotos</p>
                        </div>

                        {/* BOTÓN NUEVA NOTA / TICKET */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-md shadow-xs transition cursor-pointer"
                        >
                            <FileText size={15} />
                            <span>Crear ticket</span>
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
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#0E5E6F] transition"
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
                                            className="w-12 h-12 rounded-md object-cover shadow-xs"
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
                                    className="w-12 h-12 rounded-md object-cover"
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
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-md transition"
                                aria-label="Llamada de voz"
                            >
                                <Phone size={18} />
                            </button>

                            <button
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-md transition"
                                aria-label="Videollamada"
                            >
                                <Video size={18} />
                            </button>

                            <button
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-md transition"
                                aria-label="Opciones adicionales"
                            >
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>

                    {/* HISTORIAL DE MENSAJES */}
                    <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
                        {activeChat.messages.map((msg) => {
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
                                            className="w-7 h-7 rounded-md object-cover mb-1 shrink-0"
                                        />
                                    )}

                                    <div
                                        className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-md text-sm ${
                                            isAdminMsg
                                                ? 'bg-[#0E5E6F] text-white'
                                                : 'bg-white text-gray-800 border border-gray-100 shadow-xs'
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
                                            className="w-7 h-7 rounded-md object-cover mb-1 shrink-0 border border-gray-200"
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
                            className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-md transition shrink-0"
                        >
                            <Paperclip size={20} />
                        </button>

                        <input
                            type="text"
                            placeholder="Responder como administrador..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
                        />

                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="p-2.5 bg-[#0E5E6F] text-white rounded-md hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
                        >
                            <Send size={18} />
                        </button>
                    </form>

                </div>
            </div>

            {/* ================= MODAL DE REGISTRO DE TICKET ADMIN ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-md shadow-2xl overflow-hidden border border-gray-100 flex flex-col">

                        {/* Header del Modal */}
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-md">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">Registrar Ticket Interno</h3>
                                    <p className="text-xs text-gray-500">Documentar caso de asistencia</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition cursor-pointer"
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
                                            Granjero / cliente
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={ticketForm.granjero}
                                            onChange={(e) => setTicketForm({ ...ticketForm, granjero: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Categoría
                                        </label>
                                        <select
                                            value={ticketForm.categoria}
                                            onChange={(e) => setTicketForm({ ...ticketForm, categoria: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                                        >
                                            <option value="Soporte Técnico Drones">Soporte técnico drones</option>
                                            <option value="Falla en Telemetría">Falla en telemetría IoT</option>
                                            <option value="Facturación y Licencias">Facturación y licencias</option>
                                            <option value="Análisis NDVI">Revisión fitozoosanitaria (NDVI)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Prioridad
                                        </label>
                                        <select
                                            value={ticketForm.prioridad}
                                            onChange={(e) => setTicketForm({ ...ticketForm, prioridad: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                                        >
                                            <option value="Baja">Baja</option>
                                            <option value="Media">Media</option>
                                            <option value="Alta">Alta</option>
                                            <option value="Urgente">Urgente</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Notas internas / diagnóstico
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Escribe un resumen técnico del problema o solución acordada..."
                                            value={ticketForm.nota}
                                            onChange={(e) => setTicketForm({ ...ticketForm, nota: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-md shadow-xs transition cursor-pointer"
                                        >
                                            Guardar ticket
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
                                            className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-md transition cursor-pointer"
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

// 4. Editor de mapas del Admin
export const AdminConfigMapView = ({ serviceType, onNext, onBack }: any) => (
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

export const AdminConfigCargoView = ({ onNext, onBack }: any) => (
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
                        <MapPin size={20} /> 1. Puntos de Origen y Destino
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

export const AdminCheckoutView = ({ onConfirm, onBack }: any) => (
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

export const AdminTrackingView = ({ onFinish }: any) => (
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
export const AdminHistoryView = () => {
  const [logs] = useState<AdminLog[]>([
    {
      id: 'ADM-2026-301',
      adminId: 'USR-001',
      adminName: 'Lic. Claudia Benítez',
      type: 'user_management',
      typeName: 'Actualización de Permisos y Roles',
      targetModule: 'Módulo de Gestión de Usuarios',
      responsible: 'Lic. Claudia Benítez',
      date: '21 Jul 2026',
      startTime: '08:30 AM',
      endTime: '08:45 AM',
      duration: '15 min',
      affectedCount: '12 usuarios',
      actionDetails: 'Asignación de privilegios avanzados a nuevos operadores de campo.',
      authorizationCode: 'AUTH-9920',
      status: 'completed',
      securityLevel: 'Alto',
      terminalIp: '192.168.1.45',
      notes: 'Cambios aplicados de forma exitosa según solicitud de jefatura de operaciones.'
    },
    {
      id: 'ADM-2026-300',
      adminId: 'USR-002',
      adminName: 'Ing. Fernando Rivas',
      type: 'system_config',
      typeName: 'Calibración de Parámetros Globales',
      targetModule: 'Servidor Central de Telemetría',
      responsible: 'Ing. Fernando Rivas',
      date: '21 Jul 2026',
      startTime: '07:15 AM',
      endTime: '08:00 AM',
      duration: '45 min',
      affectedCount: '4 servidores',
      actionDetails: 'Modificación de umbrales de alerta por ráfagas de viento y protocolos RTH.',
      authorizationCode: 'AUTH-9918',
      status: 'completed',
      securityLevel: 'Crítico',
      terminalIp: '192.168.1.12',
      notes: 'Actualización de firmware del núcleo completada sin interrupciones en la red.'
    },
    {
      id: 'ADM-2026-299',
      adminId: 'USR-001',
      adminName: 'Lic. Claudia Benítez',
      type: 'audit_security',
      typeName: 'Auditoría de Respaldos de Base de Datos',
      targetModule: 'Subsistema de Respaldo Nube',
      responsible: 'Lic. Claudia Benítez',
      date: '20 Jul 2026',
      startTime: '04:00 PM',
      endTime: '04:30 PM',
      duration: '30 min',
      affectedCount: '1 base de datos',
      actionDetails: 'Verificación de integridad y cifrado de los respaldos semanales.',
      authorizationCode: 'AUTH-9905',
      status: 'interrupted',
      securityLevel: 'Medio',
      terminalIp: '192.168.1.45',
      notes: 'Pausado por latencia alta en el proveedor de nube secundario; reanudado más tarde.'
    },
    {
      id: 'ADM-2026-298',
      adminId: 'USR-003',
      adminName: 'Lic. Patricia Solís',
      type: 'user_management',
      typeName: 'Revocación de Credenciales de Acceso',
      targetModule: 'Control de Acceso Periférico',
      responsible: 'Lic. Patricia Solís',
      date: '20 Jul 2026',
      startTime: '11:00 AM',
      endTime: '11:10 AM',
      duration: '10 min',
      affectedCount: '3 usuarios',
      actionDetails: 'Baja administrativa por término de contrato temporal de pilotaje.',
      authorizationCode: 'AUTH-9899',
      status: 'completed',
      securityLevel: 'Alto',
      terminalIp: '192.168.1.88',
      notes: 'Tokens de autenticación de doble factor deshabilitados permanentemente.'
    },
    {
      id: 'ADM-2026-297',
      adminId: 'USR-002',
      adminName: 'Ing. Fernando Rivas',
      type: 'system_config',
      typeName: 'Migración de Enlaces de Red Satelital',
      targetModule: 'Pasarela de Comunicaciones RTK',
      responsible: 'Ing. Fernando Rivas',
      date: '19 Jul 2026',
      startTime: '02:00 PM',
      endTime: '03:15 PM',
      duration: '75 min',
      affectedCount: '8 dispositivos',
      actionDetails: 'Cambio de proveedor de enlaces móviles principales por redundancia.',
      authorizationCode: 'AUTH-9872',
      status: 'failed',
      securityLevel: 'Crítico',
      terminalIp: '192.168.1.12',
      notes: 'Fallo en la resolución de DNS del nuevo proveedor. Se aplicó rollback automático.'
    },
    {
      id: 'ADM-2026-296',
      adminId: 'USR-001',
      adminName: 'Lic. Claudia Benítez',
      type: 'audit_security',
      typeName: 'Revisión de Bitácoras de Seguridad',
      targetModule: 'Firewall y Control Perimetral',
      responsible: 'Lic. Claudia Benítez',
      date: '18 Jul 2026',
      startTime: '09:00 AM',
      endTime: '09:50 AM',
      duration: '50 min',
      affectedCount: 'Todos los nodos',
      actionDetails: 'Inspección de intentos de acceso fallidos desde redes externas.',
      authorizationCode: 'AUTH-9850',
      status: 'completed',
      securityLevel: 'Medio',
      terminalIp: '192.168.1.45',
      notes: 'Sin anomalías detectadas. Tráfico dentro de los parámetros normales esperados.'
    },
    {
      id: 'ADM-2026-295',
      adminId: 'USR-003',
      adminName: 'Lic. Patricia Solís',
      type: 'user_management',
      typeName: 'Asignación de Políticas de Privacidad',
      targetModule: 'Directorio Activo Corporativo',
      responsible: 'Lic. Patricia Solís',
      date: '17 Jul 2026',
      startTime: '10:30 AM',
      endTime: '11:00 AM',
      duration: '30 min',
      affectedCount: '25 cuentas',
      actionDetails: 'Actualización masiva de políticas de expiración de contraseñas.',
      authorizationCode: 'AUTH-9831',
      status: 'completed',
      securityLevel: 'Alto',
      terminalIp: '192.168.1.88',
      notes: 'Notificaciones enviadas de forma automática a los buzones corporativos.'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AdminLog | null>(null);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetModule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.responsible.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesType = typeFilter === 'all' || l.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAffected = logs
    .filter((l) => l.status === 'completed')
    .length;

  const totalHours = (
    logs.reduce((acc, l) => acc + parseInt(l.duration), 0) / 60
  ).toFixed(1);

  const successRate = Math.round(
    (logs.filter((l) => l.status === 'completed').length / logs.length) * 100
  );

  const getStatusBadge = (status: AdminLog['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
            Completado
          </span>
        );
      case 'interrupted':
        return (
          <span className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-amber-100 text-amber-800 shrink-0">
            Pausado
          </span>
        );
      case 'failed':
        return (
          <span className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-red-100 text-red-800 shrink-0">
            Abortado
          </span>
        );
    }
  };

  const getTypeBadge = (type: AdminLog['type']) => {
    switch (type) {
      case 'user_management':
        return (
          <span className="inline-block text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-[4px] border border-cyan-100">
            Gestión de usuarios
          </span>
        );
      case 'system_config':
        return (
          <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
            Configuración del sistema
          </span>
        );
      case 'audit_security':
        return (
          <span className="inline-block text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-[4px] border border-purple-100">
            Auditoría de seguridad
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full bg-[#f8fafc] overflow-y-auto p-3 sm:p-5 space-y-4 font-['Roboto',sans-serif]">

      {/* ================= ENCABEZADO Y RESUMEN ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-[4px] border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            Panel de Control y Auditoría Administrativa
            <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-[4px] border border-gray-200">
              {logs.length} registros
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Registro detallado de cambios de configuración, gestión de accesos y auditorías de seguridad del sistema.
          </p>
        </div>

        <button
          onClick={() => { }}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-xs"
        >
          <Download size={14} />
          <span>Exportar bitácora (CSV)</span>
        </button>
      </div>

      {/* ================= TARJETAS DE KPIS RÁPIDOS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Acciones Exitosas</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalAffected} <span className="text-xs font-normal text-gray-500">acciones</span></h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Tiempo de Operación</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalHours} <span className="text-xs font-normal text-gray-500">hrs</span></h3>
          </div>
          <div className="p-2.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Tasa de Efectividad</p>
            <h3 className="text-xl font-bold text-emerald-700 mt-0.5">{successRate}%</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <Compass size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Nivel de Alerta Global</p>
            <h3 className="text-xl font-bold text-amber-700 mt-0.5">Controlado</h3>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-[4px] shrink-0">
            <ShieldAlert size={18} />
          </div>
        </div>
      </div>

      {/* ================= FILTROS Y BÚSQUEDA ================= */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Buscar por ID, acción, módulo o responsable..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-[4px] text-xs focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-[4px] text-xs text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            <option value="user_management">Gestión de usuarios</option>
            <option value="system_config">Configuración del sistema</option>
            <option value="audit_security">Auditoría de seguridad</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-[4px] text-xs text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="interrupted">Pausados / incompletos</option>
            <option value="failed">Abortados</option>
          </select>
        </div>
      </div>

      {/* ================= TABLA DE DATOS ================= */}
      <div className="bg-white rounded-[4px] border border-gray-200 shadow-xs overflow-hidden w-full">
        <table className="w-full table-fixed text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-[20%] sm:w-[16%]">id / fecha</th>
              <th className="py-2.5 px-2 w-[26%] sm:w-[22%]">módulo / tipo</th>
              <th className="py-2.5 px-2 hidden sm:table-cell w-[18%]">ubicación / responsable</th>
              <th className="py-2.5 px-2 w-[16%] sm:w-[12%] text-center">duración / impacto</th>
              <th className="py-2.5 px-2 w-[16%] sm:w-[12%] text-center">estado</th>
              <th className="py-2.5 px-2 w-[22%] sm:w-[20%] text-center">ver</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50/70 transition cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-gray-900 text-xs">{log.id}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar size={10} />
                      {log.date}
                    </div>
                  </td>

                  <td className="py-2.5 px-2 truncate">
                    <div className="font-semibold text-gray-800 truncate text-xs">
                      {log.targetModule}
                    </div>
                    <div className="mt-0.5">{getTypeBadge(log.type)}</div>
                  </td>

                  <td className="py-2.5 px-2 hidden sm:table-cell truncate">
                    <div className="text-gray-700 font-medium truncate flex items-center gap-1">
                      <MapPin size={11} className="text-gray-400 shrink-0" />
                      <span className="truncate">{log.terminalIp}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 truncate flex items-center gap-1 mt-0.5">
                      <User size={10} />
                      <span className="truncate">{log.responsible}</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <div className="font-bold text-gray-900 text-xs">{log.duration}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-0.5 mt-0.5">
                      <Clock size={10} />
                      {log.affectedCount}
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    {getStatusBadge(log.status)}
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium rounded-[4px] transition cursor-pointer"
                        title="Ver detalles"
                      >
                        <Eye size={13} className="text-[#0E5E6F]" />
                        <span>Ver</span>
                      </button>

                      <button
                        onClick={() => { }}
                        className="flex items-center gap-1 px-2 py-1 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-[11px] font-medium rounded-[4px] transition cursor-pointer shadow-xs"
                        title="Descargar reporte PDF"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                  No se encontraron registros administrativos con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="p-3 px-4 bg-gray-50/80 border-t border-gray-200 text-[11px] text-gray-500 flex justify-between items-center">
          <span>Mostrando {filteredLogs.length} de {logs.length} registros</span>
        </div>
      </div>

      {/* ================= MODAL DETALLADO DE ACCIÓN ================= */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-[4px] shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">

            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0E5E6F] text-white rounded-[4px] font-bold text-xs">
                  {selectedLog.id}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {selectedLog.typeName}
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    {selectedLog.targetModule} • {selectedLog.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-[4px] transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-[4px] border border-gray-200">
                <div>
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Terminal IP</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#0E5E6F]" />
                    {selectedLog.terminalIp}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Responsable a cargo</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                    <User size={12} className="text-[#0E5E6F]" />
                    {selectedLog.responsible}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Duración</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedLog.duration}</span>
                  <span className="text-[9px] text-gray-400 block">{selectedLog.startTime} - {selectedLog.endTime}</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Alcance</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedLog.affectedCount}</span>
                  <span className="text-[9px] text-gray-400 block">Elementos afectados</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Seguridad</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedLog.securityLevel}</span>
                  <span className="text-[9px] text-gray-400 block">Nivel de autorización</span>
                </div>
              </div>

              {selectedLog.authorizationCode && (
                <div className="p-3 bg-cyan-50/60 border border-cyan-100 rounded-[4px]">
                  <h4 className="font-bold text-cyan-950 text-xs mb-1 flex items-center gap-1.5">
                    Detalles de Autorización y Protocolo
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-cyan-900 mt-2">
                    <div>
                      <span className="text-gray-500 text-[10px] block">Código de autorización:</span>
                      <span className="font-semibold">{selectedLog.authorizationCode}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Acción ejecutada:</span>
                      <span className="font-semibold">{selectedLog.actionDetails}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-[4px] border border-gray-200">
                <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">
                  Observaciones de la bitácora
                </span>
                <p className="text-gray-700 leading-relaxed italic">
                  "{selectedLog.notes || 'Sin observaciones registradas.'}"
                </p>
              </div>
            </div>

            <div className="p-3 px-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => { }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0E5E6F] hover:underline cursor-pointer"
              >
                <FileText size={13} />
                <span>Descargar reporte de auditoría JSON</span>
              </button>

              <button
                onClick={() => setSelectedLog(null)}
                className="px-3.5 py-1.5 bg-[#0E5E6F] text-white font-semibold text-xs rounded-[4px] hover:bg-[#0A4754] transition cursor-pointer"
              >
                Cerrar bitácora
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// ----- Editor de Mapas (Admin) ----- Corregido
export const AdminMapsView = () => {
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

    // Estado del ID de mapeo y modal de edición de ID
    const [mappingId, setMappingId] = useState("MIS-FUM-001");
    const [tempMappingId, setTempMappingId] = useState("MIS-FUM-001");
    const [isIdModalOpen, setIsIdModalOpen] = useState(false);

    // Estado del modal de confirmación de aprobación de mapeo
    const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

    const handleOpenIdModal = () => {
        setTempMappingId(mappingId);
        setIsIdModalOpen(true);
    };

    const handleSaveId = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempMappingId.trim()) {
            setMappingId(tempMappingId.trim().toUpperCase());
        }
        setIsIdModalOpen(false);
    };

    const handleApproveMapping = () => {
        setIsApprovalModalOpen(true);
    };

    return (
        <div 
            className="w-full h-full min-h-0 bg-white antialiased select-none flex flex-col text-gray-800 overflow-hidden relative font-sans"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            {/* Estilos para ocultar scrollbars */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* BARRA SUPERIOR DE COMANDO */}
            <header className="bg-gray-50 border-b-2 border-gray-200 px-4 flex items-center justify-between shrink-0 h-12 z-30 w-full">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-[#0E5E6F] text-white rounded-[4px] shadow-xs">
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
                            <h1 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                                Edición y Aprobación de Mapas
                            </h1>
                            <span className="text-[8px] font-bold tracking-wider px-1.5 py-0.2 rounded-[4px] border border-[#0E5E6F]/30 bg-[#0E5E6F]/10 text-[#0E5E6F]">
                                Admin
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium leading-none">
                            Zonas y parámetros de vuelo.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <button className="py-1 px-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-colors active:scale-95 shadow-xs cursor-pointer">
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
                        <span>Borrar selección</span>
                    </button>
                    <button className="py-1 px-3 bg-[#0E5E6F] border-2 border-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer">
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
                        <span>Guardar mapa</span>
                    </button>
                </div>
            </header>

            {/* ÁREA PRINCIPAL DEL EDITOR */}
            <main className="flex-1 flex overflow-hidden relative min-h-0 w-full">
                {/* PANEL IZQUIERDO */}
                <aside
                    className={`bg-white border-r-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${isLeftCollapsed ? "w-12" : "w-56"
                        }`}
                >
                    {/* Botón Flotante para Abrir/Cerrar */}
                    <button
                        onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
                        className="absolute -right-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
                        title={isLeftCollapsed ? "Expandir menú" : "Colapsar menú"}
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
                            {/* SECCIÓN EDICIÓN ACTIVA */}
                            <div 
                                onClick={handleOpenIdModal}
                                className="p-2 bg-gray-50 hover:bg-[#0E5E6F]/5 border-2 border-gray-200 hover:border-[#0E5E6F] rounded-[4px] shrink-0 cursor-pointer transition-all flex items-center justify-between group"
                                title="Hacer clic para cambiar ID de misión"
                            >
                                <div>
                                    <span className="text-[9px] font-bold tracking-wider text-gray-400 block">
                                        Edición activa
                                    </span>
                                    <span className="text-[11px] font-bold text-gray-800 block mt-0.5 group-hover:text-[#0E5E6F]">
                                        ID: #{mappingId}
                                    </span>
                                </div>
                                <svg
                                    className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E5E6F] transition-colors shrink-0"
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
                            </div>

                            <div className="shrink-0">
                                <h2 className="text-[9px] font-bold tracking-widest text-gray-400 block mb-1 uppercase">
                                    Herramientas De Dibujo
                                </h2>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => setSelectedTool("polygon")}
                                        className={`w-full flex items-center justify-between p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "polygon"
                                                ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]"
                                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 border-2 border-current rounded-xs" />
                                            <span>Pentágono</span>
                                        </div>
                                        {selectedTool === "polygon" && (
                                            <span className="text-[8px] font-bold tracking-wider bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded-[4px]">
                                                Activo
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setSelectedTool("octagon")}
                                        className={`w-full flex items-center justify-between p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "octagon"
                                                ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]"
                                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-3 h-3 border-2 border-current rounded-full" />
                                            <span>Octágono</span>
                                        </div>
                                        {selectedTool === "octagon" && (
                                            <span className="text-[8px] font-bold tracking-wider bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded-[4px]">
                                                Activo
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setSelectedTool("delete")}
                                        className={`w-full flex items-center gap-1.5 p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "delete"
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
                                        className={`w-full flex items-center gap-1.5 p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "move"
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
                                        <span>Mover nodos</span>
                                    </button>
                                </div>
                            </div>

                            <hr className="border-gray-200 shrink-0" />

                            <div className="shrink-0">
                                <h2 className="text-[9px] font-bold tracking-widest text-gray-400 block mb-1 uppercase">
                                    Capas Del Mapa
                                </h2>
                                <div className="space-y-0.5 mb-1.5">
                                    {[
                                        { id: "satellite", label: "Satélite" },
                                        { id: "hybrid", label: "Híbrido" },
                                        { id: "terrain", label: "Terreno" },
                                    ].map((layer) => (
                                        <label
                                            key={layer.id}
                                            className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 cursor-pointer p-0.5 hover:bg-gray-50 rounded-[4px]"
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
                                onClick={handleOpenIdModal}
                                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer"
                                title={`Cambiar ID de misión (${mappingId})`}
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
                                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setIsLeftCollapsed(false)}
                                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer"
                                title="Herramientas de dibujo"
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
                                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer"
                                title="Capas del mapa"
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
                        className="absolute inset-0 bg-cover bg-center w-full h-full object-cover pointer-events-none rounded-[4px]"
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
                            fontFamily="sans-serif"
                        >
                            Zona A: Fertilizante
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
                            fontFamily="sans-serif"
                        >
                            Zona B: Fumigación
                        </text>
                    </svg>

                    <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
                        <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-[4px] shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">
                            +
                        </button>
                        <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-[4px] shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">
                            -
                        </button>
                    </div>
                </div>

                {/* PANEL DERECHO */}
                <aside
                    className={`bg-white border-l-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${isRightCollapsed ? "w-12" : "w-64"
                        }`}
                >
                    {/* Botón Flotante para Abrir/Cerrar */}
                    <button
                        onClick={() => setIsRightCollapsed(!isRightCollapsed)}
                        className="absolute -left-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
                        title={isRightCollapsed ? "Expandir menú" : "Colapsar menú"}
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
                                <h2 className="text-[11px] font-bold tracking-wider text-gray-800">
                                    Control Del Dron
                                </h2>
                            </div>

                            {/* CARD ESTADO DRON */}
                            <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px] space-y-1.5 shrink-0">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="font-bold text-gray-700">
                                        Dron Agras T50
                                    </span>
                                    <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-1 py-0.2 rounded-[4px]">
                                        En línea
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-1 text-[10px] font-semibold text-gray-600">
                                    <div>Batería: 88%</div>
                                    <div>GPS: 19 satélites</div>
                                    <div>Velocidad: {speed} km/h</div>
                                    <div>Altitud: {altitude} m</div>
                                </div>

                                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1">
                                    <div className="bg-[#0E5E6F] h-full w-[88%] transition-all duration-300" />
                                </div>
                            </div>

                            <div className="shrink-0">
                                <h2 className="text-[9px] font-bold tracking-widest text-gray-400 block mb-1.5 uppercase">
                                    Parámetros De Vuelo
                                </h2>

                                <div className="space-y-3">
                                    {/* ALTITUD (#CA5116) */}
                                    <div>
                                        <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                                            <span>Altitud</span>
                                            <span className="font-bold" style={{ color: "#CA5116" }}>
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
                                            <span className="font-bold" style={{ color: "#2994B2" }}>
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
                                            <span>Dosis química</span>
                                            <span className="font-bold" style={{ color: "#B165E0" }}>
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
                                <button 
                                    onClick={handleApproveMapping}
                                    className="w-full py-2 bg-[#0E5E6F] hover:bg-[#0a4754] border-2 border-[#0E5E6F] text-white font-bold text-[11px] rounded-[4px] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
                                >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    <span>Aprobar mapeo</span>
                                </button>

                                <button className="w-full py-1.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">
                                    Auto-dibujar zona
                                </button>

                                <button className="w-full py-1.5 bg-white border-2 border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">
                                    Cancelar operación
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* ACCESOS RÁPIDOS PANEL DERECHO COLAPSADO */
                        <div className="py-4 flex flex-col items-center gap-3">
                            <button
                                onClick={() => setIsRightCollapsed(false)}
                                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer"
                                title="Control de misión dron"
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
                                className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer"
                                title="Parámetros de vuelo"
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

            {/* MODAL CAMBIO DE ID DE MAPEO */}
            {isIdModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden text-left p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150 font-sans">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                                Cambiar ID de misión para mapeo
                            </h3>
                            <button
                                onClick={() => setIsIdModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSaveId} className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">
                                    Código / ID de la Misión
                                </label>
                                <input
                                    type="text"
                                    value={tempMappingId}
                                    onChange={(e) => setTempMappingId(e.target.value)}
                                    placeholder="Ej. MIS-FUM-001"
                                    className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-mono font-bold text-gray-800 focus:border-[#0E5E6F] outline-none"
                                    autoFocus
                                />
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Ingresa el código único de la misión para cargar y editar su mapa correspondiente.
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsIdModalOpen(false)}
                                    className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs"
                                >
                                    Guardar ID
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CONFIRMACIÓN DE APROBACIÓN DE MAPEO */}
            {isApprovalModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden text-left p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150 font-sans">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                            <div className="p-1 bg-green-100 text-green-700 rounded-[4px]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                                Mapeo aprobado
                            </h3>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600 font-medium">
                            <p>
                                La edición del mapa para la misión <span className="font-bold text-gray-800">#{mappingId}</span> ha sido aprobada.
                            </p>
                            <div className="p-2 bg-green-50 border border-green-200 rounded-[4px] text-[11px] text-green-800 font-semibold">
                                Estado: Aprobada por el administrador.
                            </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setIsApprovalModalOpen(false)}
                                className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ----- Gestion de datos (Admin) ----- Corregido
export const AdminDataView = () => {
    const [activeTab, setActiveTab] = useState<UserType>("client");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Modal States
    const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
    const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

    // Edit Modals
    const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
    const [editingRequest, setEditingRequest] = useState<ServiceRequest | null>(null);

    // DATA STORES
    const [clients, setClients] = useState<UserAccount[]>([
        {
            id: "CL-101",
            init: "CV",
            name: "Comercializadora El Valle",
            companyOrDept: "Sector agrícola (Maíz & Caña)",
            loc: "Danlí, El Paraíso",
            email: "contacto@elvalle.hn",
            phone: "+504 9876-5432",
            status: "Activo",
            joinDate: "12/01/2024",
            stats: { totalServices: 24 },
            detailsList: ["Contrato anual vigente", "250 Manzanas cubiertas", "Pagos al día"]
        },
        {
            id: "CL-102",
            init: "FA",
            name: "Finca El Agualote",
            companyOrDept: "Producción cafetalera",
            loc: "San Esteban, Olancho",
            email: "finca_agualote@gmail.com",
            phone: "+504 8811-2233",
            status: "Activo",
            joinDate: "05/03/2024",
            stats: { totalServices: 12 },
            detailsList: ["Servicios NDVI mensuales", "Lote en ladera de alto riesgo"]
        },
        {
            id: "CL-103",
            init: "AG",
            name: "Agropecuaria Yoro",
            companyOrDept: "Cultivos de palma",
            loc: "El Progreso, Yoro",
            email: "operaciones@agroyoro.hn",
            phone: "+504 3344-5566",
            status: "Inactivo",
            joinDate: "18/08/2023",
            stats: { totalServices: 5 },
            detailsList: ["Cuenta pausada por el cliente", "Pendiente renovación de póliza"]
        },
        {
            id: "CL-104",
            init: "HN",
            name: "Hacienda Nueva Esperanza",
            companyOrDept: "Ganadería y forraje",
            loc: "Juticalpa, Olancho",
            email: "admin@nesperanza.hn",
            phone: "+504 9900-1122",
            status: "Pendiente",
            joinDate: "20/07/2026",
            stats: { totalServices: 0 },
            detailsList: ["Solicitud de alta pendiente de validación RTN"]
        }
    ]);

    const [pilots, setPilots] = useState<UserAccount[]>([
        {
            id: "PL-201",
            init: "JR",
            name: "Javier Reyes",
            companyOrDept: "Licencia AHAC A-492",
            loc: "Catacamas, Olancho",
            email: "javier.reyes@biodron.hn",
            phone: "+504 9788-4411",
            status: "Activo",
            joinDate: "10/02/2023",
            stats: { completedFlights: 340, rating: 4.9 },
            detailsList: ["Certificado DJI Agras T40/T50", "340 hrs de vuelo registradas", "Seguro médico activo"]
        },
        {
            id: "PL-202",
            init: "MG",
            name: "María Gómez",
            companyOrDept: "Licencia AHAC A-501",
            loc: "Comayagua, Comayagua",
            email: "maria.gomez@biodron.hn",
            phone: "+504 8765-4321",
            status: "Activo",
            joinDate: "15/11/2023",
            stats: { completedFlights: 185, rating: 4.8 },
            detailsList: ["Especialista en mapeo multiespectral", "Certificación de vuelo nocturno"]
        },
        {
            id: "PL-203",
            init: "HR",
            name: "Héctor Ramírez",
            companyOrDept: "Licencia AHAC A-388",
            loc: "Choluteca, Choluteca",
            email: "hector.ramirez@biodron.hn",
            phone: "+504 9123-8899",
            status: "Inactivo",
            joinDate: "01/06/2022",
            stats: { completedFlights: 520, rating: 4.7 },
            detailsList: ["Incapacitado temporalmente", "Licencia médica en proceso de renovación"]
        },
        {
            id: "PL-204",
            init: "CA",
            name: "Carlos Alvarado",
            companyOrDept: "Solicitante Licencia AHAC",
            loc: "Tegucigalpa, FM",
            email: "carlos.alvarado@gmail.com",
            phone: "+504 3100-9988",
            status: "Pendiente",
            joinDate: "22/07/2026",
            stats: { completedFlights: 0, rating: 0 },
            detailsList: ["Documentación enviada para revisión", "Examen práctico agendado"]
        }
    ]);

    const [techs, setTechs] = useState<UserAccount[]>([
        {
            id: "TC-301",
            init: "LN",
            name: "Luis Navarro",
            companyOrDept: "Sistemas eléctricos & baterías",
            loc: "Tegucigalpa, FM",
            email: "luis.navarro@biodron.hn",
            phone: "+504 9455-6677",
            status: "Activo",
            joinDate: "14/01/2022",
            stats: { inspectionsDone: 142 },
            detailsList: ["Certificado por DJI Enterprise", "Encargado de taller central"]
        },
        {
            id: "TC-302",
            init: "RE",
            name: "Roberto Escalante",
            companyOrDept: "Mecánica estructural & motores",
            loc: "San Pedro Sula, Cortés",
            email: "roberto.e@biodron.hn",
            phone: "+504 8899-0011",
            status: "Activo",
            joinDate: "09/05/2023",
            stats: { inspectionsDone: 98 },
            detailsList: ["Mantenimiento preventivo Agras T-Series", "Sede San Pedro Sula"]
        },
        {
            id: "TC-303",
            init: "DA",
            name: "Daniel Aguilar",
            companyOrDept: "Software & telemetría GCS",
            loc: "Comayagua",
            email: "daniel.a@biodron.hn",
            phone: "+504 3311-2244",
            status: "Inactivo",
            joinDate: "11/11/2024",
            stats: { inspectionsDone: 23 },
            detailsList: ["Licencia de taller suspendida por revisión interna"]
        }
    ]);

    const [requests, setRequests] = useState<ServiceRequest[]>([
        {
            id: "REQ-801",
            clientName: "Comercializadora El Valle",
            assignedPilot: "Javier Reyes",
            serviceType: "Fumigación agrícola",
            location: "Danlí, El Paraíso",
            date: "28/07/2026",
            areaOrUnits: "45 Manzanas",
            totalPrice: 12600,
            status: "Pendiente"
        },
        {
            id: "REQ-802",
            clientName: "Finca El Agualote",
            assignedPilot: "María Gómez",
            serviceType: "Mapeo multiespectral",
            location: "San Esteban, Olancho",
            date: "30/07/2026",
            areaOrUnits: "20 Hectáreas",
            totalPrice: 3600,
            status: "Aprobada"
        },
        {
            id: "REQ-803",
            clientName: "Hacienda Nueva Esperanza",
            assignedPilot: "Sin asignar",
            serviceType: "Carga pesada",
            location: "Juticalpa, Olancho",
            date: "02/08/2026",
            areaOrUnits: "3 Vuelos operativos",
            totalPrice: 4500,
            status: "Pendiente"
        },
        {
            id: "REQ-804",
            clientName: "Agropecuaria Yoro",
            assignedPilot: "Héctor Ramírez",
            serviceType: "Fumigación agrícola",
            location: "El Progreso, Yoro",
            date: "15/07/2026",
            areaOrUnits: "100 Manzanas",
            totalPrice: 28000,
            status: "Rechazada"
        },
        {
            id: "REQ-805",
            clientName: "Comercializadora El Valle",
            assignedPilot: "Javier Reyes",
            serviceType: "Mantenimiento preventivo",
            location: "Taller Juticalpa",
            date: "10/07/2026",
            areaOrUnits: "Dron T40-HN-0091",
            totalPrice: 2500,
            status: "Completada"
        }
    ]);

    // SAVE EDITS FROM MODALS
    const handleSaveUserStatus = () => {
        if (!editingUser) return;
        if (activeTab === "client") {
            setClients(prev => prev.map(c => c.id === editingUser.id ? editingUser : c));
        } else if (activeTab === "pilot") {
            setPilots(prev => prev.map(p => p.id === editingUser.id ? editingUser : p));
        } else if (activeTab === "tech") {
            setTechs(prev => prev.map(t => t.id === editingUser.id ? editingUser : t));
        }
        setEditingUser(null);
    };

    const handleSaveRequestStatus = () => {
        if (!editingRequest) return;
        setRequests(prev => prev.map(r => r.id === editingRequest.id ? editingRequest : r));
        setEditingRequest(null);
    };

    // FILTER LOGIC
    const getFilteredData = <T extends { name?: string; clientName?: string; loc?: string; location?: string; status: string }>(
        dataset: T[]
    ) => {
        return dataset.filter(item => {
            const matchesText =
                (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.clientName && item.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.loc && item.loc.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

            return matchesText && matchesStatus;
        });
    };

    return (
        <div
            className="p-4 sm:p-6 max-w-7xl mx-auto bg-white antialiased text-gray-800 select-none"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            {/* HEADER (Title Case) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b-2 border-gray-200 text-left gap-3">
                <div className="space-y-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                        Panel de Control e Inspección Operativa
                    </h1>
                    <p className="text-gray-500 text-xs font-normal">
                        Valida cuentas de clientes, certificaciones de pilotos, técnicos de taller y aprueba reservas de servicio.
                    </p>
                </div>
            </div>

            {/* METRIC CARDS SUMMARY (Titles Title Case / labels Sentence Case) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
                <div className="bg-white border-2 border-gray-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Clientes activos</span>
                        <span className="text-2xl font-black text-gray-900">{clients.filter(c => c.status === "Activo").length}</span>
                    </div>
                    <div className="p-2.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]">
                        <Users size={22} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Pilotos certificados</span>
                        <span className="text-2xl font-black text-gray-900">{pilots.filter(p => p.status === "Activo").length}</span>
                    </div>
                    <div className="p-2.5 bg-blue-50 text-blue-700 rounded-[4px]">
                        <ShieldCheck size={22} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Técnicos de taller</span>
                        <span className="text-2xl font-black text-gray-900">{techs.filter(t => t.status === "Activo").length}</span>
                    </div>
                    <div className="p-2.5 bg-purple-50 text-purple-700 rounded-[4px]">
                        <Wrench size={22} />
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-[4px] p-4 shadow-xs flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Solicitudes pendientes</span>
                        <span className="text-2xl font-black text-amber-600">
                            {requests.filter(r => r.status === "Pendiente").length + clients.filter(c => c.status === "Pendiente").length}
                        </span>
                    </div>
                    <div className="p-2.5 bg-amber-50 text-amber-700 rounded-[4px]">
                        <FileText size={22} />
                    </div>
                </div>
            </div>

            {/* TAB SELECTORS (Sentence case) */}
            <div className="flex border-b-2 border-gray-200 mb-6 overflow-x-auto">
                <button
                    onClick={() => { setActiveTab("client"); setStatusFilter("ALL"); }}
                    className={`px-4 sm:px-5 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer whitespace-nowrap ${activeTab === "client"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <Users size={15} /> Clientes ({clients.length})
                </button>

                <button
                    onClick={() => { setActiveTab("pilot"); setStatusFilter("ALL"); }}
                    className={`px-4 sm:px-5 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer whitespace-nowrap ${activeTab === "pilot"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <ShieldCheck size={15} /> Pilotos ({pilots.length})
                </button>

                <button
                    onClick={() => { setActiveTab("tech"); setStatusFilter("ALL"); }}
                    className={`px-4 sm:px-5 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer whitespace-nowrap ${activeTab === "tech"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <Wrench size={15} /> Técnicos de taller ({techs.length})
                </button>

                <button
                    onClick={() => { setActiveTab("requests"); setStatusFilter("ALL"); }}
                    className={`px-4 sm:px-5 py-2.5 font-bold text-xs transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer whitespace-nowrap ${activeTab === "requests"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <FileText size={15} /> Solicitudes y reservas ({requests.length})
                </button>
            </div>

            {/* CONTROLES DE BÚSQUEDA Y FILTRADO */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, ubicación o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border-2 border-gray-200 rounded-[4px] text-xs focus:border-[#0E5E6F] outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Filter size={14} className="text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border-2 border-gray-200 rounded-[4px] px-2.5 py-1.5 text-xs bg-white text-gray-700 font-bold focus:border-[#0E5E6F] outline-none"
                    >
                        <option value="ALL">Todos los estados</option>
                        <option value="Activo">Activos</option>
                        <option value="Inactivo">Inactivos</option>
                        <option value="Pendiente">Pendientes de aprobación</option>
                        {activeTab === "requests" && (
                            <>
                                <option value="Aprobada">Aprobadas</option>
                                <option value="Rechazada">Rechazadas</option>
                            </>
                        )}
                    </select>
                </div>
            </div>

            {/* TABLA PRINCIPAL */}
            <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xs overflow-hidden flex flex-col text-left">
                <div className="overflow-x-auto w-full">
                    {/* TABLA: CLIENTES, PILOTOS Y TÉCNICOS (Encabezados en Sentence case) */}
                    {activeTab !== "requests" && (
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead className="bg-gray-50 border-b-2 border-gray-200 text-xs font-semibold text-gray-600">
                                <tr>
                                    <th className="py-3 px-3">Usuario o empresa</th>
                                    <th className="py-3 px-3">Especialidad o sector</th>
                                    <th className="py-3 px-3">Ubicación</th>
                                    <th className="py-3 px-3">Contacto</th>
                                    <th className="py-3 px-3 text-center">Estado</th>
                                    <th className="py-3 px-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {getFilteredData(
                                    activeTab === "client" ? clients : activeTab === "pilot" ? pilots : techs
                                ).map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3 px-3 font-bold text-gray-900">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-[4px] bg-[#0E5E6F]/10 text-[#0E5E6F] flex items-center justify-center font-black text-[10px] shrink-0 border border-[#0E5E6F]/20">
                                                    {item.init}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-gray-900">{item.name}</span>
                                                    <span className="text-[10px] font-mono text-gray-400 font-normal">{item.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-gray-700 font-medium">
                                            {item.companyOrDept}
                                        </td>
                                        <td className="py-3 px-3 text-gray-600">
                                            {item.loc}
                                        </td>
                                        <td className="py-3 px-3 font-mono text-[11px] text-gray-600">
                                            <div>{item.email}</div>
                                            <div className="text-[10px] text-gray-400">{item.phone}</div>
                                        </td>
                                        <td className="py-3 px-3 text-center">
                                            {/* Badges sin íconos */}
                                            <span
                                                className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-[4px] border ${item.status === "Activo"
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : item.status === "Inactivo"
                                                            ? "border-amber-300 bg-amber-100 text-amber-800"
                                                            : "border-blue-200 bg-blue-50 text-blue-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Detalle */}
                                                <button
                                                    onClick={() => setSelectedUser(item)}
                                                    className="px-2.5 py-1 hover:bg-gray-100 border border-gray-200 rounded-[4px] text-gray-600 hover:text-[#0E5E6F] flex items-center gap-1.5 transition-colors cursor-pointer"
                                                    title="Ver detalle"
                                                >
                                                    <Eye size={14} /> Ver
                                                </button>

                                                {/* Botón Editar Unificado */}
                                                <button
                                                    onClick={() => setEditingUser({ ...item })}
                                                    className="px-2.5 py-1 bg-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold text-[11px] rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
                                                >
                                                    <Edit3 size={13} /> Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* TABLA: SOLICITUDES Y RESERVAS DE SERVICIOS */}
                    {activeTab === "requests" && (
                        <table className="w-full text-left border-collapse table-auto">
                            <thead className="bg-gray-50 border-b-2 border-gray-200 text-xs font-semibold text-gray-600">
                                <tr>
                                    <th className="py-3 px-3 w-44">Código o cliente</th>
                                    <th className="py-3 px-3 w-40">Servicio solicitado</th>
                                    <th className="py-3 px-3 w-36">Ubicación y cobertura</th>
                                    <th className="py-3 px-3 w-36 whitespace-nowrap">Piloto asignado</th>
                                    <th className="py-3 px-3 w-32">Fecha y tarifa</th>
                                    <th className="py-3 px-3 text-center w-28">Estado</th>
                                    <th className="py-3 px-3 text-center w-32">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {getFilteredData(requests).map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3 px-3 font-bold text-gray-900">
                                            <span className="block font-mono text-[10px] text-gray-400">{req.id}</span>
                                            <span className="truncate block max-w-[150px]">{req.clientName}</span>
                                        </td>
                                        <td className="py-3 px-3 font-medium text-gray-800">
                                            {req.serviceType}
                                        </td>
                                        <td className="py-3 px-2 text-gray-600">
                                            <div>{req.location}</div>
                                            <div className="text-[10px] font-bold text-[#0E5E6F]">{req.areaOrUnits}</div>
                                        </td>
                                        <td className="py-3 px-3 text-gray-700 whitespace-nowrap">
                                            <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold inline-block ${req.assignedPilot === "Sin asignar" ? "bg-red-50 text-red-700 border border-red-200" : "bg-gray-100 text-gray-800"}`}>
                                                {req.assignedPilot}
                                            </span>
                                        </td>
                                        <td className="py-3 px-2 whitespace-nowrap">
                                            <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                                                <Calendar size={11} /> {req.date}
                                            </div>
                                            <div className="font-mono font-bold text-gray-900 text-xs">
                                                L. {req.totalPrice.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 text-center whitespace-nowrap">
                                            {/* Badges sin íconos */}
                                            <span
                                                className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-[4px] border ${req.status === "Aprobada" || req.status === "Completada"
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : req.status === "Rechazada"
                                                            ? "border-red-200 bg-red-50 text-red-700"
                                                            : req.status === "Pendiente"
                                                                ? "border-amber-300 bg-amber-100 text-amber-800"
                                                                : "border-blue-200 bg-blue-50 text-blue-700"
                                                    }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* Detalle Reserva */}
                                                <button
                                                    onClick={() => setSelectedRequest(req)}
                                                    className="px-2.5 py-1 hover:bg-gray-100 border border-gray-200 rounded-[4px] text-gray-600 hover:text-[#0E5E6F] flex items-center gap-1.5 transition-colors cursor-pointer"
                                                    title="Ver detalle del servicio"
                                                >
                                                    <Eye size={14} /> Ver
                                                </button>

                                                {/* Botón Editar Unificado */}
                                                <button
                                                    onClick={() => setEditingRequest({ ...req })}
                                                    className="px-2.5 py-1 bg-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold text-[11px] rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
                                                >
                                                    <Edit3 size={13} /> Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* MODAL 1: FICHA DE DETALLE DE USUARIO (Title Case en títulos / Sentence Case en cuerpo) */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-lg overflow-hidden text-left">
                        <div className="flex justify-between items-center px-5 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <Users className="text-[#0E5E6F]" size={18} />
                                <h3 className="text-sm font-bold text-gray-900">
                                    Ficha de Registro Operativo
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4 text-xs">
                            <div className="flex items-start justify-between border-b pb-3 border-gray-100">
                                <div>
                                    <h4 className="text-base font-bold text-gray-900">{selectedUser.name}</h4>
                                    <p className="text-gray-500 font-medium">{selectedUser.companyOrDept}</p>
                                    <span className="font-mono text-[10px] text-gray-400">{selectedUser.id}</span>
                                </div>
                                <span
                                    className={`inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-[4px] border ${selectedUser.status === "Activo"
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                            : selectedUser.status === "Inactivo"
                                                ? "border-amber-300 bg-amber-100 text-amber-800"
                                                : "border-blue-200 bg-blue-50 text-blue-700"
                                        }`}
                                >
                                    {selectedUser.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span>{selectedUser.loc}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>Registro: {selectedUser.joinDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="font-mono">{selectedUser.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="font-mono">{selectedUser.phone}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-[4px] border border-gray-200">
                                <span className="font-bold text-gray-700 block mb-1">Métricas en plataforma:</span>
                                <div className="flex gap-4 text-gray-800 font-mono font-bold">
                                    {selectedUser.stats.totalServices !== undefined && (
                                        <div>Servicios contratados: <span className="text-[#0E5E6F]">{selectedUser.stats.totalServices}</span></div>
                                    )}
                                    {selectedUser.stats.completedFlights !== undefined && (
                                        <div>Horas o vuelos: <span className="text-blue-700">{selectedUser.stats.completedFlights}</span></div>
                                    )}
                                    {selectedUser.stats.inspectionsDone !== undefined && (
                                        <div>Mantenimientos: <span className="text-purple-700">{selectedUser.stats.inspectionsDone}</span></div>
                                    )}
                                </div>
                            </div>

                            {selectedUser.detailsList && (
                                <div className="space-y-1">
                                    <span className="font-bold text-gray-700 block">Observaciones y licencias:</span>
                                    <ul className="list-disc list-inside text-gray-600 space-y-0.5 pl-1">
                                        {selectedUser.detailsList.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer"
                                >
                                    Cerrar ficha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: DETALLE DE SOLICITUD DE SERVICIO */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-md overflow-hidden text-left">
                        <div className="flex justify-between items-center px-5 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-2">
                                <FileText className="text-[#0E5E6F]" size={18} />
                                <h3 className="text-sm font-bold text-gray-900">
                                    Detalle de la Reserva #{selectedRequest.id}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-3 text-xs">
                            <div className="bg-gray-50 p-3 rounded-[4px] border border-gray-200 space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold">Cliente:</span>
                                    <span className="font-bold text-gray-900">{selectedRequest.clientName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold">Servicio:</span>
                                    <span className="text-gray-800">{selectedRequest.serviceType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold">Cobertura:</span>
                                    <span className="text-gray-800">{selectedRequest.areaOrUnits}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-bold">Ubicación:</span>
                                    <span className="text-gray-800">{selectedRequest.location}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-2.5 bg-[#0E5E6F]/5 border border-[#0E5E6F]/20 rounded-[4px]">
                                <span className="font-bold text-gray-700">Monto total estimado:</span>
                                <span className="font-mono font-black text-[#0E5E6F] text-sm">
                                    L. {selectedRequest.totalPrice.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-end pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="px-4 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: EDITAR ESTADO DE USUARIO (CLIENTE / PILOTO / TÉCNICO) */}
            {editingUser && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-sm overflow-hidden text-left">
                        <div className="flex justify-between items-center px-5 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-900">
                                Gestor de Estado de Usuario
                            </h3>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4 text-xs">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{editingUser.name}</p>
                                <p className="text-gray-500 text-[11px] font-mono">{editingUser.id}</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block font-bold text-gray-700">
                                    Seleccionar el nuevo estado del registro:
                                </label>
                                <select
                                    value={editingUser.status}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            status: e.target.value as "Activo" | "Inactivo" | "Pendiente"
                                        })
                                    }
                                    className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-bold bg-white text-gray-800 focus:border-[#0E5E6F] outline-none"
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => setEditingUser(null)}
                                    className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSaveUserStatus}
                                    className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 4: EDITAR ESTADO DE SOLICITUD DE SERVICIO */}
            {editingRequest && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xl w-full max-w-sm overflow-hidden text-left">
                        <div className="flex justify-between items-center px-5 py-3.5 border-b-2 border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-900">
                                Gestor de Estado de Solicitud
                            </h3>
                            <button
                                onClick={() => setEditingRequest(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 space-y-4 text-xs">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{editingRequest.serviceType}</p>
                                <p className="text-gray-500 text-[11px] font-mono">{editingRequest.id} - {editingRequest.clientName}</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block font-bold text-gray-700">
                                    Cambiar estado de la solicitud:
                                </label>
                                <select
                                    value={editingRequest.status}
                                    onChange={(e) =>
                                        setEditingRequest({
                                            ...editingRequest,
                                            status: e.target.value as "Pendiente" | "Aprobada" | "Rechazada" | "En proceso" | "Completada"
                                        })
                                    }
                                    className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-bold bg-white text-gray-800 focus:border-[#0E5E6F] outline-none"
                                >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Aprobada">Aprobada</option>
                                    <option value="Rechazada">Rechazada</option>
                                    <option value="En proceso">En proceso</option>
                                    <option value="Completada">Completada</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => setEditingRequest(null)}
                                    className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSaveRequestStatus}
                                    className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer"
                                >
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Perfil de admin
export const AdminProfileView = ({ onLogout }: AdminProfileViewProps) => {
    // Configuración exclusiva para el Administrador
    const initialProfile = {
        initials: "AR",
        name: "Lic. Carlos Rodríguez",
        email: "carlos.rodriguez@agroaguante.hn",
        phone: "+504 9988-7766",
        password: "••••••••••••",
        avatar: "src/img/admin_perfil.png",
        avatarBg: "bg-[#0E5E6F] text-white",
        roleLabel: "Administrador General · Sistema",
        location: "Oficina Central Tegucigalpa, FM",
        area: "12,800 ha administradas",
        services: "1,240 operaciones activas",
        standing: "Activo",
        roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30",
        description: "Gestión global de plataforma, control de usuarios, asignación de recursos y supervisión operativa general.",
    };

    const [profileData, setProfileData] = useState(initialProfile);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Estados cosméticos para simular la subida de foto
    const [isUploading, setIsUploading] = useState(false);
    const [simulatedFile, setSimulatedFile] = useState<string>("");

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
        setSimulatedFile("");
        setIsUploading(false);
        setIsModalOpen(true);
    };

    // Simula que procesa una foto sin abrir la ventana de archivos
    const handleFakeUpload = () => {
        if (isUploading) return;
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setSimulatedFile("foto_admin_actualizada.jpg");
        }, 600);
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
            <div className="w-full h-full flex-1 bg-white border-2 border-gray-200 rounded-[4px] overflow-hidden flex flex-col justify-between shadow-xs">
                
                {/* CABECERA */}
                <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[4px] bg-white border-2 border-gray-300 overflow-hidden shrink-0 shadow-xs relative group flex items-center justify-center">
                            {!imgError ? (
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-full h-full object-cover rounded-[4px]"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center font-black text-xl rounded-[4px] ${profileData.avatarBg}`}>
                                    {profileData.initials}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[4px]">
                                <Briefcase size={20} className="text-white drop-shadow" />
                            </div>
                        </div>

                        <div className="text-left">
                            <h2 className="text-xl sm:text-2xl text-gray-900 font-black tracking-tight normal-case leading-tight">
                                {profileData.name}
                            </h2>
                            <p className="text-gray-500 font-semibold text-xs sm:text-sm mt-1">
                                {profileData.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                        <span
                            className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-[4px] border-2 ${profileData.roleColor}`}
                            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                        >
                            {profileData.roleLabel}
                        </span>

                        {saveSuccess && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-[4px] flex items-center gap-1 animate-in fade-in duration-150">
                                <Check size={13} /> Actualizado
                            </span>
                        )}
                    </div>
                </div>

                {/* MÉTRICAS PRINCIPALES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white border-b-2 border-gray-200 text-left flex-1 items-center">
                    {/* Sede Principal */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <MapPin size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Sede Principal
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
                            {profileData.location}
                        </span>
                    </div>

                    {/* Cobertura Global */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <Layers size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Cobertura Global
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
                            {profileData.area}
                        </span>
                    </div>

                    {/* Gestión Activa */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <BarChart2 size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Gestión Activa
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block truncate leading-tight mt-0.5">
                            {profileData.services}
                        </span>
                    </div>

                    {/* Estado del Sistema */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <CheckCircle size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Estado
                            </span>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-[4px] uppercase inline-block mt-0.5">
                            {profileData.standing}
                        </span>
                    </div>
                </div>

                {/* DATOS DE CONTACTO Y CREDENCIALES */}
                <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b-2 border-gray-100">
                        <div className="flex items-center gap-2">
                            <Settings size={16} className="text-[#0E5E6F]" />
                            <h3 className="text-xs sm:text-sm font-black text-gray-800 normal-case">
                                Credenciales y Datos de Contacto
                            </h3>
                        </div>

                        <button
                            onClick={handleOpenModal}
                            className="py-1 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-xs flex items-center gap-1.5 transition-colors active:scale-95 shadow-xs cursor-pointer"
                        >
                            <Edit2 size={13} className="text-[#0E5E6F]" /> Editar Información
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-[4px]">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Phone size={12} className="text-[#0E5E6F]" /> Teléfono
                            </span>
                            <p className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                                {profileData.phone}
                            </p>
                        </div>

                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-[4px]">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Mail size={12} className="text-[#0E5E6F]" /> Correo
                            </span>
                            <p className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5 truncate">
                                {profileData.email}
                            </p>
                        </div>

                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-[4px]">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Lock size={12} className="text-[#0E5E6F]" /> Contraseña
                            </span>
                            <p className="font-mono font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                                ••••••••••••
                            </p>
                        </div>
                    </div>
                </div>

                {/* PIE DE PÁGINA */}
                <div className="border-t-2 border-gray-200 px-6 py-2 bg-gray-50 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-400 font-medium text-left truncate">
                        Sede Central Tegucigalpa, Francisco Morazán, HN
                    </span>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1.5 py-1 px-3 rounded-[4px] border-2 border-[#B8001F] bg-white hover:bg-[#B8001F]/10 text-[#B8001F] transition-all active:scale-95 shadow-xs cursor-pointer"
                        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                        <LogOut size={13} className="shrink-0 text-[#B8001F]" />
                        <span className="text-xs font-black uppercase tracking-wider">
                            SALIR
                        </span>
                    </button>
                </div>
            </div>

            {/* MODAL VERTICAL FLOTANTE DE EDICIÓN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                    <div className="bg-white border-2 border-gray-300 rounded-[4px] p-5 w-full max-w-md shadow-xl space-y-4 text-left">
                        {/* Encabezado del Modal */}
                        <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#0E5E6F]/10 rounded-[4px] text-[#0E5E6F]">
                                    <Edit2 size={15} />
                                </div>
                                <h3 className="text-sm font-black text-gray-800 normal-case">
                                    Editar Credenciales
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-[4px] transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Formulario Vertical */}
                        <form onSubmit={handleSave} className="space-y-3">
                            {/* SELECTOR TOTALMENTE FALSO DE FOTO DE PERFIL */}
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1 flex items-center gap-1">
                                    <Camera size={12} className="text-[#0E5E6F]" /> Foto de Perfil
                                </label>

                                <div className="flex items-center gap-3 p-2 border-2 border-gray-200 rounded-[4px] bg-gray-50">
                                    <div className="w-12 h-12 rounded-[4px] bg-white border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center relative">
                                        <img
                                            src={profileData.avatar}
                                            alt="Previsualización"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleFakeUpload}
                                                disabled={isUploading}
                                                className="px-2.5 py-1 text-[11px] font-bold bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-100 rounded-[4px] text-gray-700 flex items-center gap-1 cursor-pointer transition-colors active:scale-95 shadow-xs disabled:opacity-50"
                                            >
                                                {isUploading ? (
                                                    <Loader2 size={12} className="animate-spin text-[#0E5E6F]" />
                                                ) : (
                                                    <Upload size={12} className="text-[#0E5E6F]" />
                                                )}
                                                {isUploading ? "Cargando..." : "Seleccionar"}
                                            </button>
                                            <span className="text-[10px] text-gray-500 font-semibold truncate">
                                                {simulatedFile || "JPG o PNG (Máx. 2MB)"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
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
                                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
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
                                        type={showPassword ? "text" : "password"}
                                        value={editForm.password}
                                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                        className="w-full pl-8 pr-8 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-1.5 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-[4px] text-xs flex items-center gap-1 transition-colors active:scale-95 cursor-pointer"
                                >
                                    <X size={13} /> Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="py-1.5 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-[4px] text-xs flex items-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer"
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