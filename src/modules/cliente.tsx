import { Activity, AlertCircle, ArrowLeft, ArrowRight, ArrowUpRight, Award, BarChart2, Briefcase, Map, Lock, Building2, Calendar, Check, CheckCheck, CheckCircle, CheckCircle2, CreditCard, Download, Edit2, Eye, EyeOff, FileText, HelpCircle, Info, Layers, LogOut, MapPin, MoreVertical, Paperclip, Phone, Plane, Plus, Save, Search, Send, Settings, ShieldAlert, ShieldCheck, ShoppingBag, Sparkles, Sprout, Upload, Video, Wallet, X, XCircle, Zap, Droplet, Wind, Package, Bell, TrendingUp, Filter, BarChart3, Clock, Droplets, Mail, Radio, SearchIcon, Truck, ChevronRight, Camera, Loader2, Tag, UserCheck, Wrench, QrCode, Battery, Headphones, ClipboardCopy, Share2, Trash2, Pencil } from 'lucide-react';
import React, { useState } from 'react';

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
            className={`bg-white border-2 border-gray-200 rounded-[4px] p-5 flex flex-col justify-between shadow-sm hover:border-gray-300 transition-all min-h-[160px] w-full box-border ${className}`}
        >
            <div className="flex items-start justify-between gap-3 w-full">
                <div className="text-left space-y-1.5 min-w-0 flex-1">
                    <p
                        className="text-[11px] font-black tracking-wider text-gray-400 block leading-tight"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                        {label}
                    </p>
                    <h3
                        className="text-2xl font-black text-gray-900 tracking-tight block whitespace-nowrap leading-none pt-0.5"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                        {value}
                    </h3>
                </div>
                <div className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-[4px] text-gray-400 flex items-center justify-center shrink-0">
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

type HealthStatus = "Buena" | "Atención" | "Crítica";

type ServiceStatus = "En revisión" | "Aprobado" | "En marcha" | "Completado";

interface ServicioFicha {
    id: number;
    title: string;
    type: string;
    location: string;
    image: string;
    status: ServiceStatus;
    date: string;
    notes: string;
    missionId?: string;
}

interface Land {
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

interface BuyDronFarmerViewProps {
    onRegisterPilot?: () => void;
}

interface DroneSpec {
    [key: string]: string;
}

interface Drone {
    id: string;
    nombre: string;
    etiqueta: string;
    categoria: "micro" | "mini" | "pequeno" | "grande";
    imagen: string;
    precio: string;
    descripcion: string;
    destacado?: boolean;
    especificaciones: DroneSpec;
}

interface UserDrone {
    id: string;
    nombre: string;
    modelo: string;
    categoria: string;
    imagen: string;
    estado: "Operativo" | "En mantenimiento" | "En vuelo";
    bateria: number;
    horasVuelo: number;
    ultimaRevision: string;
    numeroSerie: string;
}

interface VueloItem {
  id: string;
  fecha: string;
  ubicacion: string;
  cobertura: string;
  servicio: string;
  dron: string;
  piloto: string;
  estado: string;
  reporteDisponible: boolean;
  detallesTecnicos?: {
    alturaPromedio: string;
    duracionVuelo: string;
    resolucionGSD: string;
    condicionClimatica: string;
  };
}

interface FacturaItem {
  id: string;
  fecha: string;
  concepto: string;
  tipo: string;
  monto: string;
  metodoPago: string;
  estado: string;
  detallesPago?: {
    subtotal: string;
    impuesto: string;
    numTransaccion: string;
  };
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
    fecha: string;
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

interface ClienteProfileViewProps {
    onLogout: () => void;
}

interface ClienteDashboardProps {
  onNavigate: (view: string) => void;
}

type TabType = "generales" | "descuentos-drones" | "asistencia-tecnica" | "contratacion-piloto";

// 1. Dashboard del Cliente
export const ClienteDashboardView: React.FC<ClienteDashboardProps> = ({ onNavigate }) => {
  // Estados de control de la UI
  const [activeTab, setActiveTab] = useState<string>("riego");
  const [chartPeriod, setChartPeriod] = useState<"semana" | "mes" | "anio">("mes");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Paleta de colores Hexadecimales requerida
  const HEX_COLORS = {
    brandGreen: "#0E5E6F",
    emerald100: "#D1FAE5",
    red: "#B8001F",
    amber100: "#FEF3C7",
    blue100: "#DBEAFE",
    orange100: "#FFEDD5",
    purple100: "#F3E8FF",
  };

  // Notificaciones ampliadas
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "aprobacion",
      titulo: "Servicio aprobado",
      detalle: "Solicitud #SOL-904 (Fumigación Sector Norte) fue validada y programada.",
      tiempo: "Hace 10 min",
      colorBg: HEX_COLORS.emerald100,
      textColor: "#065F46",
      icono: <CheckCircle2 size={13} />,
      unread: true,
    },
    {
      id: 2,
      tipo: "suscripcion",
      titulo: "Estado de suscripción",
      detalle: "Tu plan VIP de cobertura aérea se renueva automáticamente el 01 de Agosto.",
      tiempo: "Hace 2 horas",
      colorBg: HEX_COLORS.blue100,
      textColor: "#1E40AF",
      icono: <CreditCard size={13} />,
      unread: true,
    },
    {
      id: 3,
      tipo: "soporte",
      titulo: "Mensaje de asistencia",
      detalle: "Soporte Técnico respondió a tu ticket #TK-302: 'Calibración de cámara NDVI'.",
      tiempo: "Hace 5 horas",
      colorBg: HEX_COLORS.purple100,
      textColor: "#6B21A8",
      icono: <HelpCircle size={13} />,
      unread: true,
    },
    {
      id: 4,
      tipo: "alerta",
      titulo: "Mantenimiento técnico",
      detalle: "El dron Agras T40 asignado a tu zona completó su chequeo de rutina.",
      tiempo: "Ayer, 03:20 PM",
      colorBg: HEX_COLORS.amber100,
      textColor: "#92400E",
      icono: <ShieldCheck size={13} />,
      unread: false,
    },
  ]);

  // Manejo de navegación sin alert
  const handleRequestNewService = () => {
    if (typeof onNavigate === "function") {
      onNavigate("ClienteServiciosView");
    }
  };

  // Datos para los gráficos
  const chartData: Record<
    string,
    Record<string, { label: string; valor: number; detalle: string; unidad: string }[]>
  > = {
    riego: {
      semana: [
        { label: "Lun", valor: 12, detalle: "2.800 L ahorrados", unidad: "Misiones" },
        { label: "Mar", valor: 18, detalle: "4.100 L ahorrados", unidad: "Misiones" },
        { label: "Mié", valor: 15, detalle: "3.500 L ahorrados", unidad: "Misiones" },
        { label: "Jue", valor: 22, detalle: "5.200 L ahorrados", unidad: "Misiones" },
        { label: "Vie", valor: 28, detalle: "6.400 L ahorrados", unidad: "Misiones" },
        { label: "Sáb", valor: 20, detalle: "4.800 L ahorrados", unidad: "Misiones" },
        { label: "Dom", valor: 10, detalle: "2.100 L ahorrados", unidad: "Misiones" },
      ],
      mes: [
        { label: "Ene", valor: 45, detalle: "12.000 L ahorrados", unidad: "Hectáreas" },
        { label: "Feb", valor: 60, detalle: "15.500 L ahorrados", unidad: "Hectáreas" },
        { label: "Mar", valor: 50, detalle: "13.200 L ahorrados", unidad: "Hectáreas" },
        { label: "Abr", valor: 85, detalle: "21.000 L ahorrados", unidad: "Hectáreas" },
        { label: "May", valor: 90, detalle: "23.500 L ahorrados", unidad: "Hectáreas" },
        { label: "Jun", valor: 110, detalle: "28.000 L ahorrados", unidad: "Hectáreas" },
      ],
      anio: [
        { label: "2023", valor: 420, detalle: "95.000 L ahorrados", unidad: "Hectáreas" },
        { label: "2024", valor: 680, detalle: "150.000 L ahorrados", unidad: "Hectáreas" },
        { label: "2025", valor: 920, detalle: "210.000 L ahorrados", unidad: "Hectáreas" },
        { label: "2026", valor: 1150, detalle: "265.000 L ahorrados", unidad: "Hectáreas" },
      ],
    },
    busqueda: {
      semana: [
        { label: "Lun", valor: 4, detalle: "2 patrullajes realizados", unidad: "Vuelos" },
        { label: "Mar", valor: 8, detalle: "1 rescate nocturno", unidad: "Vuelos" },
        { label: "Mié", valor: 2, detalle: "Inspección cerco", unidad: "Vuelos" },
        { label: "Jue", valor: 10, detalle: "Perímetro completo", unidad: "Vuelos" },
        { label: "Vie", valor: 6, detalle: "Verificación activos", unidad: "Vuelos" },
        { label: "Sáb", valor: 12, detalle: "Búsqueda de ganado", unidad: "Vuelos" },
        { label: "Dom", valor: 5, detalle: "Monitoreo térmico", unidad: "Vuelos" },
      ],
      mes: [
        { label: "Ene", valor: 20, detalle: "Sin incidentes", unidad: "Horas Vuelo" },
        { label: "Feb", valor: 35, detalle: "2 hallazgos", unidad: "Horas Vuelo" },
        { label: "Mar", valor: 15, detalle: "4 inspecciones", unidad: "Horas Vuelo" },
        { label: "Abr", valor: 50, detalle: "12 barridos térmicos", unidad: "Horas Vuelo" },
        { label: "May", valor: 65, detalle: "15 barridos térmicos", unidad: "Horas Vuelo" },
        { label: "Jun", valor: 80, detalle: "20 hallazgos", unidad: "Horas Vuelo" },
      ],
      anio: [
        { label: "2023", valor: 180, detalle: "80% cobertura", unidad: "Misiones" },
        { label: "2024", valor: 310, detalle: "92% cobertura", unidad: "Misiones" },
        { label: "2025", valor: 490, detalle: "98% cobertura", unidad: "Misiones" },
        { label: "2026", valor: 610, detalle: "100% efectividad", unidad: "Misiones" },
      ],
    },
    fumigacion: {
      semana: [
        { label: "Lun", valor: 15, detalle: "Control fitosanitario", unidad: "Ha Tratadas" },
        { label: "Mar", valor: 20, detalle: "Aspersión orilla", unidad: "Ha Tratadas" },
        { label: "Mié", valor: 18, detalle: "Aplicación fungicida", unidad: "Ha Tratadas" },
        { label: "Jue", valor: 30, detalle: "Parcelas 1 y 2", unidad: "Ha Tratadas" },
        { label: "Vie", valor: 25, detalle: "Prevención oruga", unidad: "Ha Tratadas" },
        { label: "Sáb", valor: 10, detalle: "Parches focalizados", unidad: "Ha Tratadas" },
        { label: "Dom", valor: 0, detalle: "Mantenimiento", unidad: "Ha Tratadas" },
      ],
      mes: [
        { label: "Ene", valor: 30, detalle: "8.000 L ahorrado", unidad: "Ha Tratadas" },
        { label: "Feb", valor: 40, detalle: "9.500 L ahorrado", unidad: "Ha Tratadas" },
        { label: "Mar", valor: 65, detalle: "14.000 L ahorrado", unidad: "Ha Tratadas" },
        { label: "Abr", valor: 70, detalle: "15.000 L ahorrado", unidad: "Ha Tratadas" },
        { label: "May", valor: 85, detalle: "18.000 L ahorrado", unidad: "Ha Tratadas" },
        { label: "Jun", valor: 95, detalle: "20.000 L ahorrado", unidad: "Ha Tratadas" },
      ],
      anio: [
        { label: "2023", valor: 310, detalle: "25% menos químico", unidad: "Ha Tratadas" },
        { label: "2024", valor: 540, detalle: "35% menos químico", unidad: "Ha Tratadas" },
        { label: "2025", valor: 780, detalle: "42% menos químico", unidad: "Ha Tratadas" },
        { label: "2026", valor: 910, detalle: "50% menos químico", unidad: "Ha Tratadas" },
      ],
    },
    transporte: {
      semana: [
        { label: "Lun", valor: 3, detalle: "Muestra suelo", unidad: "Envíos" },
        { label: "Mar", valor: 5, detalle: "Kit herramientas", unidad: "Envíos" },
        { label: "Mié", valor: 2, detalle: "Insumo biológico", unidad: "Envíos" },
        { label: "Jue", valor: 6, detalle: "Entrega fármacos", unidad: "Envíos" },
        { label: "Vie", valor: 8, detalle: "3 entregas exprés", unidad: "Envíos" },
        { label: "Sáb", valor: 4, detalle: "Repuesto mecánico", unidad: "Envíos" },
        { label: "Dom", valor: 1, detalle: "Suministro básico", unidad: "Envíos" },
      ],
      mes: [
        { label: "Ene", valor: 12, detalle: "Prom: 14 min", unidad: "Envíos Exitosos" },
        { label: "Feb", valor: 18, detalle: "Prom: 12 min", unidad: "Envíos Exitosos" },
        { label: "Mar", valor: 25, detalle: "Prom: 11 min", unidad: "Envíos Exitosos" },
        { label: "Abr", valor: 32, detalle: "Prom: 10 min", unidad: "Envíos Exitosos" },
        { label: "May", valor: 40, detalle: "Prom: 9 min", unidad: "Envíos Exitosos" },
        { label: "Jun", valor: 48, detalle: "Prom: 8 min", unidad: "Envíos Exitosos" },
      ],
      anio: [
        { label: "2023", valor: 120, detalle: "1.200 km recorridos", unidad: "Envíos Totales" },
        { label: "2024", valor: 240, detalle: "2.800 km recorridos", unidad: "Envíos Totales" },
        { label: "2025", valor: 390, detalle: "4.500 km recorridos", unidad: "Envíos Totales" },
        { label: "2026", valor: 510, detalle: "6.100 km recorridos", unidad: "Envíos Totales" },
      ],
    },
    otros: {
      semana: [
        { label: "Lun", valor: 10, detalle: "Mapeo fotogramétrico", unidad: "Misiones" },
        { label: "Mar", valor: 15, detalle: "Inspección solar", unidad: "Misiones" },
        { label: "Mié", valor: 8, detalle: "Siembra aérea", unidad: "Misiones" },
        { label: "Jue", valor: 25, detalle: "Topografía 3D", unidad: "Misiones" },
        { label: "Vie", valor: 18, detalle: "Monitoreo NDVI", unidad: "Misiones" },
        { label: "Sáb", valor: 12, detalle: "Cálculo volumen", unidad: "Misiones" },
        { label: "Dom", valor: 0, detalle: "Descanso técnico", unidad: "Misiones" },
      ],
      mes: [
        { label: "Ene", valor: 15, detalle: "3 mapas generados", unidad: "Proyectos" },
        { label: "Feb", valor: 22, detalle: "5 análisis biomasa", unidad: "Proyectos" },
        { label: "Mar", valor: 35, detalle: "8 levantamientos 3D", unidad: "Proyectos" },
        { label: "Abr", valor: 40, detalle: "10 vuelos fotogramétricos", unidad: "Proyectos" },
        { label: "May", valor: 55, detalle: "14 resiembras", unidad: "Proyectos" },
        { label: "Jun", valor: 70, detalle: "18 análisis termográficos", unidad: "Proyectos" },
      ],
      anio: [
        { label: "2023", valor: 150, detalle: "3.000 Ha mapeadas", unidad: "Proyectos" },
        { label: "2024", valor: 320, detalle: "7.500 Ha mapeadas", unidad: "Proyectos" },
        { label: "2025", valor: 510, detalle: "12.000 Ha mapeadas", unidad: "Proyectos" },
        { label: "2026", valor: 680, detalle: "18.000 Ha mapeadas", unidad: "Proyectos" },
      ],
    },
  };

  // Registros de la tabla
  const datosRegistros: Record<string, any[]> = {
    riego: [
      {
        id: "MIS-801",
        fecha: "2026-07-24",
        ubicacion: "Sector Norte - Lote A1",
        objetivo: "Aplicación de micro-riego focalizado por estrés hídrico",
        dron: "Agras T40",
        duracion: "45 min",
        cobertura: "18 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "MIS-789",
        fecha: "2026-07-20",
        ubicacion: "Valle de Amarateca",
        objetivo: "Riego foliar de micronutrientes pre-cosecha",
        dron: "DJI Agras T30",
        duracion: "1h 10min",
        cobertura: "25 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "MIS-752",
        fecha: "2026-07-15",
        ubicacion: "Sector Sur - Parcela 4",
        objetivo: "Evaluación de drenaje e irrigación focalizada",
        dron: "DJI Agras T30",
        duracion: "30 min",
        cobertura: "12 Ha",
        estado: "En alerta",
        tagColorBg: HEX_COLORS.amber100,
        tagTextColor: "#92400E",
      },
    ],
    busqueda: [
      {
        id: "MIS-812",
        fecha: "2026-07-22",
        ubicacion: "Reserva El Hatillo",
        objetivo: "Búsqueda térmica de ganado extraviado tras tormenta",
        dron: "Ehang Thermal 184",
        duracion: "1h 20min",
        cobertura: "40 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "MIS-760",
        fecha: "2026-07-18",
        ubicacion: "Perímetro Industrial",
        objetivo: "Inspección nocturna de cerco perimetral",
        dron: "DJI FlyCart 30",
        duracion: "40 min",
        cobertura: "15 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    fumigacion: [
      {
        id: "MIS-805",
        fecha: "2026-07-23",
        ubicacion: "Lote Este - Maíz",
        objetivo: "Fumigación de precisión contra oruga cogollera",
        dron: "Agras T40",
        duracion: "55 min",
        cobertura: "22 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    transporte: [
      {
        id: "MIS-820",
        fecha: "2026-07-25",
        ubicacion: "Base Central -> Punto B",
        objetivo: "Transporte urgente de kit médico e instrumental",
        dron: "GRIFF Aviation 300",
        duracion: "18 min",
        cobertura: "12 km dist.",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    otros: [
      {
        id: "MIS-825",
        fecha: "2026-07-25",
        ubicacion: "Finca Completa",
        objetivo: "Mapeo fotogramétrico NDVI para vigor vegetativo",
        dron: "Matrice 300 RTK",
        duracion: "2h 10min",
        cobertura: "150 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
  };

  // Filtrado de la tabla
  const registrosActuales = (datosRegistros[activeTab] || []).filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.ubicacion.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.objetivo.toLowerCase().includes(tableSearch.toLowerCase()) ||
      item.dron.toLowerCase().includes(tableSearch.toLowerCase());

    if (statusFilter === "todos") return matchesSearch;
    if (statusFilter === "completado") return matchesSearch && item.estado.toLowerCase() === "completado";
    if (statusFilter === "proceso") return matchesSearch && item.estado.toLowerCase() === "en proceso";
    if (statusFilter === "alerta") return matchesSearch && item.estado.toLowerCase() === "en alerta";

    return matchesSearch;
  });

  const currentChartSet = chartData[activeTab]?.[chartPeriod] || [];
  const maxChartValue = Math.max(...currentChartSet.map((d) => d.valor), 1);
  const chartUnit = currentChartSet[0]?.unidad || "Cantidad";

  // Eje Y en 5 niveles de división
  const yAxisTicks = [
    Math.round(maxChartValue),
    Math.round(maxChartValue * 0.75),
    Math.round(maxChartValue * 0.5),
    Math.round(maxChartValue * 0.25),
    0,
  ];

  const unreadCount = notificaciones.filter((n) => n.unread).length;

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }} className="p-6 md:p-8 max-w-[1400px] mx-auto bg-white antialiased text-gray-800">
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100 select-none">
        <div className="text-left space-y-0.5">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Dashboard de Servicios y Beneficios
          </h1>
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            Consola del Cliente • Monitoreo Operacional y Análisis de Rendimiento
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Badge Suscripción */}
          <div
            style={{
              backgroundColor: HEX_COLORS.emerald100,
              color: "#065F46",
              borderRadius: "4px",
            }}
            className="px-2.5 py-1 border border-emerald-300 flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 bg-[#065F46] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider">Suscripción vip</span>
          </div>

          {/* CAMPANA Y DROPDOWN DE NOTIFICACIONES */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ borderRadius: "4px" }}
              className="relative p-2 bg-white border-2 border-gray-200 hover:border-gray-300 transition-colors shadow-xs active:scale-95 flex items-center justify-center"
            >
              <Bell size={18} className="text-gray-600" />
              {unreadCount > 0 && (
                <span
                  style={{
                    backgroundColor: HEX_COLORS.red,
                    borderRadius: "4px",
                  }}
                  className="absolute -top-1 -right-1 px-1 py-0.2 text-[9px] text-white font-black shadow-xs"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* PANEL DROPDOWN DE NOTIFICACIONES */}
            {showNotifications && (
              <div
                style={{ borderRadius: "4px" }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-2 border-gray-200 shadow-2xl z-50 p-4 text-left animate-in fade-in duration-150"
              >
                <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Bell size={15} className="text-gray-700" />
                    <h3 className="text-xs font-black text-gray-900 tracking-wider">
                      Centro de Notificaciones
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
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
                          className="px-2 py-0.5 text-[9px] font-bold flex items-center gap-1"
                        >
                          {n.icono}
                          {n.titulo}
                        </span>
                        <span className="text-[9px] font-mono text-gray-400">{n.tiempo}</span>
                      </div>
                      <p className="text-gray-700 font-medium text-[11px] leading-snug">
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
                    className="text-[11px] font-bold text-[#0E5E6F] hover:underline"
                  >
                    Marcar todas como leídas
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MÉTRICAS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Ahorro Insumos
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Droplets size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5">35%</p>
          <p className="text-[10px] text-gray-400 font-semibold">Reducción de recursos aplicados</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Horas Ahorradas
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.blue100,
                color: "#1E40AF",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Clock size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5">148 hrs</p>
          <p className="text-[10px] text-gray-400 font-semibold">Tiempo hombre optimizado</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Área Atendida
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.purple100,
                color: "#6B21A8",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Radio size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5">320 Ha</p>
          <p className="text-[10px] text-gray-400 font-semibold">Cobertura total escaneada</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Casos Resueltos
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <CheckCircle2 size={15} />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900 mb-0.5">12 Casos</p>
          <p className="text-[10px] text-gray-400 font-semibold">Alertas solucionadas a tiempo</p>
        </div>
      </div>

      {/* PESTAÑAS */}
      <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 select-none">
        {[
          { id: "riego", label: "Riego de precisión", icon: <Droplet size={13} /> },
          { id: "busqueda", label: "Búsqueda y rescate", icon: <Search size={13} /> },
          { id: "fumigacion", label: "Fumigación y control", icon: <Wind size={13} /> },
          { id: "transporte", label: "Transporte y entrega", icon: <Truck size={13} /> },
          { id: "otros", label: "Otros servicios", icon: <Layers size={13} /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ borderRadius: "4px 4px 0 0" }}
              className={`px-1.5 py-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 border-t-2 border-x-2 -mb-[2px] transition-all text-center ${
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

      {/* GRÁFICO SUPERIOR */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 p-5 shadow-xs mb-8 text-left"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#0E5E6F]" />
            <div>
              <h3 className="text-xs font-black text-gray-900 tracking-wider">
                Rendimiento y Estadística — {activeTab}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Escala Eje Y: <strong className="text-gray-700">{chartUnit}</strong>
              </p>
            </div>
          </div>

          {/* Selector de escala temporal */}
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
                className={`px-2.5 py-1 text-[11px] font-bold transition-all ${
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

        {/* CONTENEDOR DEL GRÁFICO */}
        <div className="relative pt-4 pb-2 pr-2">
          <div className="flex h-56">
            {/* EJE Y */}
            <div className="w-12 flex flex-col justify-between items-end pr-3 border-r-2 border-gray-300 text-[10px] font-mono font-bold text-gray-400 py-1 select-none">
              {yAxisTicks.map((tick, i) => (
                <span key={i}>{tick}</span>
              ))}
            </div>

            {/* BARRAS Y LÍNEAS DE FONDO */}
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
                  HEX_COLORS.blue100,
                  HEX_COLORS.purple100,
                  HEX_COLORS.amber100,
                  HEX_COLORS.orange100,
                  HEX_COLORS.emerald100,
                  HEX_COLORS.brandGreen,
                ];
                const currentColor = barColors[idx % barColors.length];

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer z-10 px-1"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip Hover */}
                    {hoveredBar === idx && (
                      <div
                        style={{ borderRadius: "4px" }}
                        className="absolute -top-11 z-30 bg-gray-900 text-white px-2.5 py-1 text-[10px] font-mono shadow-xl whitespace-nowrap text-center animate-in fade-in duration-100"
                      >
                        <p className="font-bold">
                          {item.valor} {chartUnit}
                        </p>
                        <p className="text-gray-300 text-[9px]">{item.detalle}</p>
                      </div>
                    )}

                    <span className="text-[10px] font-black text-gray-700 mb-1 opacity-80 group-hover:opacity-100">
                      {item.valor}
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

          {/* EJE X */}
          <div className="flex pl-12 pt-2 border-t-2 border-gray-300">
            <div className="flex-1 flex justify-between px-4">
              {currentChartSet.map((item, idx) => (
                <span
                  key={idx}
                  className="flex-1 text-center text-[10px] font-bold text-gray-500 tracking-wider"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE MISIONES */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 shadow-xs text-left overflow-hidden mb-8"
      >
        <div className="p-4 border-b-2 border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <h3 className="text-xs font-black text-gray-900 tracking-wider">
              Historial Operacional — {activeTab}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Listado Detallado de Ejecuciones de Vuelos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            {/* Buscador */}
            <div className="relative flex-1 sm:w-60">
              <SearchIcon
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Buscar por id, sector, dron..."
                style={{ borderRadius: "4px" }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 focus:outline-none focus:border-[#0E5E6F] font-medium"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Chips Filtros Verde #0E5E6F */}
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
                  className="px-2.5 py-1 text-[11px] font-bold border transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-white text-gray-400 font-bold border-b border-gray-200 text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-2.5 whitespace-nowrap">Código / fecha</th>
                <th className="px-4 py-2.5 whitespace-nowrap">Ubicación</th>
                <th className="px-4 py-2.5">Objetivo / detalle</th>
                <th className="px-4 py-2.5 whitespace-nowrap">Dron y cobertura</th>
                <th className="px-4 py-2.5 text-center whitespace-nowrap">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrosActuales.length > 0 ? (
                registrosActuales.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-extrabold text-gray-900">{row.id}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{row.fecha}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400 shrink-0" />
                        {row.ubicacion}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-xs leading-snug">
                      {row.objetivo}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-bold text-[#0E5E6F]">{row.dron}</p>
                      <p className="text-[10px] text-gray-400">
                        {row.duracion} | {row.cobertura}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      <span
                        style={{
                          backgroundColor: row.tagColorBg,
                          color: row.tagTextColor,
                          borderRadius: "4px",
                        }}
                        className="px-2 py-0.5 font-bold text-[10px] inline-block border border-black/5"
                      >
                        {row.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-400 font-medium">
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-gray-100 bg-gray-50/40 flex justify-between items-center">
          <span className="text-[11px] font-bold text-gray-400">
            {registrosActuales.length} misiones encontradas
          </span>
          <button
            style={{
              borderRadius: "4px",
              backgroundColor: HEX_COLORS.brandGreen,
            }}
            className="px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#094350] transition-colors shadow-xs"
          >
            <Download size={13} />
            Exportar informe PDF
          </button>
        </div>
      </div>

      {/* BANNER INFERIOR */}
      <div
        style={{ borderRadius: "4px" }}
        className="border-2 border-gray-200 p-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-left shadow-xs"
      >
        <div className="flex items-center gap-3.5">
          <div
            style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.orange100 }}
            className="p-3 text-orange-800 shrink-0 border border-orange-200"
          >
            <Zap size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900">
              ¿Deseas Contratar una Nueva Operación con Drones BIODRON?
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              Accede al Catálogo de Servicios para Configurar y Solicitar tu Próxima Misión
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRequestNewService}
          style={{
            borderRadius: "4px",
            backgroundColor: HEX_COLORS.brandGreen,
          }}
          className="px-6 py-2.5 text-white text-xs font-bold tracking-wider hover:bg-[#094350] transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>Solicitar servicio nuevo</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// 2. Servicios
export const ClienteServiciosView = () => {
    // -----------------------------------------------------------
    // ESTADOS GENERALES Y NAVEGACIÓN
    // -----------------------------------------------------------
    const [activeTab, setActiveTab] = useState<"servicios" | "mapas">("servicios");

    // -----------------------------------------------------------
    // ESTADOS: PESTAÑA SERVICIOS
    // -----------------------------------------------------------
    const [step, setStep] = useState<number>(1);
    const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

    const [servicios] = useState<ServicioFicha[]>([
        {
            id: 1,
            title: "Mapeo Topográfico Sector Sur",
            type: "Dron con mapeo",
            location: "Finca El Aguán, Sabana de Tepusteca",
            image: "src/img/maiz.png",
            status: "Completado",
            date: "18 Jul 2026",
            notes: "Ficha técnica: Vuelo exitoso. Se entregó ortomosaico al administrador. Desnivel del 5% detectado.",
            missionId: "MIS-MAP-001"
        },
        {
            id: 2,
            title: "Fumigación de Precisión",
            type: "Dron agrícola",
            location: "Plantación San Lorenzo",
            image: "src/img/banano.png",
            status: "En marcha",
            date: "12 Jul 2026",
            notes: "Ficha técnica: El piloto está en campo ejecutando la ruta de fumigación. Condiciones climáticas óptimas.",
            missionId: "MIS-FUM-012"
        },
        {
            id: 3,
            title: "Inspección de Infraestructura",
            type: "Inspección visual",
            location: "Bodega Central, Olanchito",
            image: "src/img/yuca.png",
            status: "Aprobado",
            date: "05 Jul 2026",
            notes: "Ficha técnica: Solicitud validada por admin. A la espera de asignación de dron de inspección.",
        },
        {
            id: 4,
            title: "Análisis Multiespectral NDVI",
            type: "Dron con mapeo",
            location: "Finca Agalteca",
            image: "src/img/palma.png",
            status: "En revisión",
            date: "19 Jul 2026",
            notes: "Ficha técnica: El administrador está revisando la disponibilidad de la unidad multiespectral.",
            missionId: "MIS-MAP-005"
        },
    ]);

    const [formData, setFormData] = useState({
        serviceTitle: "Fumigación de precisión",
        serviceType: "General",
        location: "Finca El Aguán (Sabana de Tepusteca)",
        date: "2026-07-28",
        missionId: "",
    });

    const getStatusBadge = (status: ServiceStatus) => {
        switch (status) {
            case "Completado":
                return "text-emerald-800 bg-emerald-50 border-emerald-200";
            case "En marcha":
                return "text-purple-800 bg-purple-50 border-purple-200";
            case "Aprobado":
                return "text-blue-800 bg-blue-200 border-blue-200";
            case "En revisión":
                return "text-amber-800 bg-amber-50 border-amber-200";
            default:
                return "text-gray-700 bg-gray-50 border-gray-200";
        }
    };

    const handleCopyExistingMission = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopySuccessModalOpen(true);
    };

    // -----------------------------------------------------------
    // ESTADOS: PESTAÑA EDITOR DE MAPAS
    // -----------------------------------------------------------
    const [selectedTool, setSelectedTool] = useState<"polygon" | "octagon" | "delete" | "move" | "measure">("polygon");
    const [mapLayer, setMapLayer] = useState<"satellite" | "hybrid" | "terrain">("satellite");
    const [showZones, setShowZones] = useState(true);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [showBoundaries, setShowBoundaries] = useState(true);
    const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
    const [isRightCollapsed, setIsRightCollapsed] = useState(false);
    const [altitude, setAltitude] = useState(45);
    const [speed, setSpeed] = useState(20);
    const [rate, setRate] = useState(2.5);

    const [mappingId, setMappingId] = useState("MIS-FUM-001");
    const [tempMappingId, setTempMappingId] = useState("MIS-FUM-001");
    const [isIdModalOpen, setIsIdModalOpen] = useState(false);
    const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
    const [isCopySuccessModalOpen, setIsCopySuccessModalOpen] = useState(false);

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

    const handleCopyMapId = () => {
        navigator.clipboard.writeText(mappingId);
        setIsCopySuccessModalOpen(true);
    };

    const InputField = ({ label, type = "text", value, onChange, placeholder, required = false }: any) => (
        <div>
            <label className="block text-[11px] font-bold text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full text-xs font-medium border border-gray-300 rounded-[4px] p-2 focus:ring-1 focus:ring-[#0E5E6F] focus:outline-none bg-white font-sans"
            />
        </div>
    );

    return (
        <div className="w-full h-screen bg-gray-50 flex flex-col font-sans overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
            {/* ------------------------------------------------------- */}
            {/* HEADER CON PESTAÑAS (Title Case) */}
            {/* ------------------------------------------------------- */}
            <div className="bg-white border-b border-gray-200 shrink-0 px-4 sm:px-6 md:px-8 pt-4 flex gap-6 z-10">
                <button
                    onClick={() => setActiveTab("servicios")}
                    className={`pb-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        activeTab === "servicios"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                >
                    <Activity size={18} /> Mis servicios
                </button>
                <button
                    onClick={() => setActiveTab("mapas")}
                    className={`pb-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        activeTab === "mapas"
                            ? "border-[#0E5E6F] text-[#0E5E6F]"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                >
                    <Pencil size={18} /> Editor de mapas
                </button>
            </div>

            {/* ------------------------------------------------------- */}
            {/* ÁREA DE CONTENIDO DINÁMICO */}
            {/* ------------------------------------------------------- */}
            <div className="flex-1 overflow-hidden relative">
                
                {/*========================================================
                    VISTA 1: MIS SERVICIOS
                =========================================================*/}
                {activeTab === "servicios" && (
                    <div className="h-full p-4 max-w-7xl mx-auto flex flex-col gap-3 overflow-hidden">
                        <div className="pb-2.5 border-b border-gray-200 bg-white p-3.5 rounded-[4px] shadow-xs shrink-0">
                            <h1 className="text-lg font-black text-gray-900 tracking-tight">
                                Mis Servicios
                            </h1>
                            <p className="text-gray-500 mt-0.5 text-xs">
                                Gestiona tus solicitudes, monitorea las fichas técnicas y el estado de cada servicio.
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col xl:flex-row gap-4 min-h-0 overflow-hidden items-start">
                            {/* LISTA DE FICHAS CON VISIBILIDAD DE DESCRIPCIÓN */}
                            <div className="flex-1 h-full min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden">
                                {servicios.map((srv) => (
                                    <div
                                        key={srv.id}
                                        className="bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col h-full min-h-0"
                                    >
                                        <div className="h-20 w-full relative overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={srv.image}
                                                alt={srv.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-[4px]"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = `https://via.placeholder.com/800x400?text=${encodeURIComponent(srv.title)}`;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                            <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                                                <div>
                                                    <span className="text-white text-[10px] font-medium block opacity-90">
                                                        {srv.type}
                                                    </span>
                                                    <h3 className="text-white text-xs font-bold drop-shadow">
                                                        {srv.title}
                                                    </h3>
                                                </div>
                                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] border text-[9px] font-bold shadow-xs bg-white/95 backdrop-blur-xs ${getStatusBadge(srv.status)}`}>
                                                    {srv.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3 flex flex-col justify-between flex-1 gap-2 min-h-0 overflow-hidden">
                                            <div className="flex flex-col gap-1.5 overflow-y-auto">
                                                <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                                                    <MapPin size={12} className="text-[#0E5E6F] shrink-0" />
                                                    <span className="font-medium text-[11px] truncate">{srv.location}</span>
                                                </div>
                                                {/* DESCRIPCIÓN VISIBLE COMPLETA */}
                                                <p className="text-[11px] text-gray-600 bg-gray-50 p-2 rounded-[4px] border border-gray-100 font-normal leading-relaxed">
                                                    {srv.notes}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 items-center mt-auto shrink-0">
                                                <div>
                                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">
                                                        Fecha de operación
                                                    </p>
                                                    <p className="font-bold text-[10px] text-gray-700 flex items-center gap-1 mt-0.5">
                                                        <Calendar size={10} className="text-gray-400" />{" "}
                                                        {srv.date}
                                                    </p>
                                                </div>
                                                {srv.missionId && (
                                                    <div className="flex flex-col items-end">
                                                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">
                                                            ID de misión
                                                        </p>
                                                        <button 
                                                            onClick={() => handleCopyExistingMission(srv.missionId!)}
                                                            className="font-bold text-[#0E5E6F] text-[10px] hover:underline flex items-center gap-1 mt-0.5 cursor-pointer"
                                                            title="Copiar ID"
                                                        >
                                                            {srv.missionId} <ClipboardCopy size={10} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* FORMULARIO DE SOLICITUD DE ALTURA FIJA (380px) */}
                            <div className="w-full xl:w-[320px] flex flex-col shrink-0">
                                <div className="w-full h-[340px] bg-white border border-gray-200 rounded-[4px] shadow-xs overflow-hidden flex flex-col">
                                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
                                        <h2 className="text-xs font-bold text-gray-800">
                                            Solicitar Servicio
                                        </h2>
                                        <div className="flex items-center justify-between gap-1 mt-2">
                                            {[
                                                { n: 1, label: "Detalles" },
                                                { n: 2, label: "Mapeo" },
                                                { n: 3, label: "Revisión" },
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
                                                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                                                                step >= s.n
                                                                    ? "bg-[#0E5E6F] text-white shadow-xs"
                                                                    : "bg-gray-200 text-gray-500"
                                                            }`}
                                                        >
                                                            {s.n}
                                                        </div>
                                                        <p
                                                            className={`text-[8px] font-bold ${
                                                                step >= s.n ? "text-[#0E5E6F]" : "text-gray-400"
                                                            }`}
                                                        >
                                                            {s.label}
                                                        </p>
                                                    </div>
                                                    {i < 2 && (
                                                        <div
                                                            className={`flex-1 h-0.5 mb-2.5 mx-0.5 transition-all ${
                                                                step > s.n ? "bg-[#0E5E6F]" : "bg-gray-200"
                                                            }`}
                                                        />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-3.5 flex-1 flex flex-col justify-between overflow-y-auto min-h-0">
                                        {requestSuccess ? (
                                            <div className="py-2 text-center flex flex-col items-center justify-center gap-2.5 h-full">
                                                <CheckCircle2 size={32} className="text-emerald-500" />
                                                <h3 className="text-xs font-bold text-gray-800">
                                                    Solicitud Enviada
                                                </h3>
                                                <p className="text-[11px] text-gray-500 px-1 leading-relaxed">
                                                    El servicio para <strong>{formData.location}</strong> ha sido enviado al administrador para su revisión.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setStep(1);
                                                        setRequestSuccess(false);
                                                        setFormData({ ...formData, missionId: "" });
                                                    }}
                                                    className="mt-1 text-xs font-bold bg-gray-100 px-4 py-1.5 rounded-[4px] text-[#0E5E6F] hover:bg-gray-200 transition-colors cursor-pointer"
                                                >
                                                    Nueva solicitud
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {/* PASO 1: DETALLES */}
                                                {step === 1 && (
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="space-y-2">
                                                            <InputField
                                                                label="Título del servicio"
                                                                value={formData.serviceTitle}
                                                                onChange={(e: any) => setFormData({ ...formData, serviceTitle: e.target.value })}
                                                                placeholder="Ej. Análisis multiespectral norte"
                                                            />
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-gray-700 mb-1">Tipo de servicio</label>
                                                                <select
                                                                    value={formData.serviceType}
                                                                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                                                                    className="w-full text-xs font-medium border border-gray-300 rounded-[4px] p-1.5 focus:ring-1 focus:ring-[#0E5E6F] focus:outline-none bg-white font-sans"
                                                                >
                                                                    <option value="General">Servicio general / mantenimiento</option>
                                                                    <option value="Dron Agrícola">Fumigación / dron agrícola</option>
                                                                    <option value="Dron con Mapeo">Dron con mapeo requerido</option>
                                                                    <option value="Inspección Visual">Inspección visual</option>
                                                                </select>
                                                            </div>
                                                            <InputField
                                                                label="Ubicación / finca"
                                                                value={formData.location}
                                                                onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={() => setStep(2)}
                                                            className="w-full py-2 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-[4px] flex items-center justify-center gap-1.5 text-xs shadow-xs mt-2 cursor-pointer"
                                                        >
                                                            Siguiente <ArrowRight size={13} />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* PASO 2: MAPEO E ID */}
                                                {step === 2 && (
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="space-y-2">
                                                            <InputField
                                                                label="Fecha de operación"
                                                                type="date"
                                                                value={formData.date}
                                                                onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                                                            />

                                                            {formData.serviceType === "Dron con Mapeo" ? (
                                                                <div className="space-y-1.5">
                                                                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-[4px] text-left">
                                                                        <p className="text-[10px] text-blue-800 font-bold flex items-center gap-1">
                                                                            <MapPin size={11} /> Mapeo obligatorio
                                                                        </p>
                                                                        <p className="text-[9px] text-blue-600 mt-0.5 mb-1.5 leading-tight">
                                                                            Abre el editor de mapas, prepara tu zona y copia el ID de la misión.
                                                                        </p>
                                                                        <button 
                                                                            type="button" 
                                                                            onClick={() => setActiveTab("mapas")} 
                                                                            className="w-full text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-[4px] shadow-xs flex justify-center items-center gap-1 transition-colors cursor-pointer"
                                                                        >
                                                                            Ir al editor de mapas <ArrowRight size={11} />
                                                                        </button>
                                                                    </div>
                                                                    <InputField
                                                                        label="ID de misión (Pegar aquí)"
                                                                        value={formData.missionId}
                                                                        onChange={(e: any) => setFormData({ ...formData, missionId: e.target.value })}
                                                                        placeholder="Ej. MIS-FUM-XXX"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-[4px] text-center h-16 flex items-center justify-center">
                                                                    <p className="text-[10px] text-gray-500 font-medium">
                                                                        No se requiere ID de mapeo para este servicio.
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex gap-2 pt-1">
                                                            <button
                                                                onClick={() => setStep(1)}
                                                                className="flex-1 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-[4px] text-xs hover:bg-gray-100 cursor-pointer"
                                                            >
                                                                Atrás
                                                            </button>
                                                            <button
                                                                onClick={() => setStep(3)}
                                                                className="flex-1 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-[4px] flex items-center justify-center gap-1 text-xs shadow-xs cursor-pointer"
                                                            >
                                                                Revisar <ArrowRight size={13} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* PASO 3: REVISIÓN */}
                                                {step === 3 && (
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div>
                                                            <h3 className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">
                                                                Resumen de Solicitud
                                                            </h3>
                                                            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-[4px] space-y-1.5">
                                                                <div>
                                                                    <p className="text-[8px] text-gray-500 font-bold">Servicio</p>
                                                                    <p className="text-xs font-bold text-gray-800">{formData.serviceTitle}</p>
                                                                    <p className="text-[10px] text-[#0E5E6F] font-bold">{formData.serviceType}</p>
                                                                </div>
                                                                <div className="h-px bg-gray-200 w-full" />
                                                                <div>
                                                                    <p className="text-[8px] text-gray-500 font-bold">Fecha y Lugar</p>
                                                                    <p className="text-[11px] text-gray-700 font-medium">{formData.date} - {formData.location}</p>
                                                                </div>
                                                                {formData.serviceType === "Dron con Mapeo" && (
                                                                    <>
                                                                        <div className="h-px bg-gray-200 w-full" />
                                                                        <div>
                                                                            <p className="text-[8px] text-gray-500 font-bold">ID Vinculado</p>
                                                                            <p className="text-[11px] text-gray-700 font-mono font-bold bg-white inline-block px-1 rounded-[4px] border border-gray-200">
                                                                                {formData.missionId || "No proporcionado"}
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setStep(2)}
                                                                className="flex-1 py-1.5 border border-gray-300 text-gray-700 font-bold rounded-[4px] text-xs hover:bg-gray-100 cursor-pointer"
                                                            >
                                                                Atrás
                                                            </button>
                                                            <button
                                                                onClick={() => setRequestSuccess(true)}
                                                                className="flex-1 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-bold rounded-[4px] flex items-center justify-center gap-1 text-xs shadow-xs cursor-pointer"
                                                            >
                                                                <Check size={13} /> Enviar
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
                    </div>
                )}


                {/*========================================================
                    VISTA 2: EDITOR DE MAPAS
                =========================================================*/}
                {activeTab === "mapas" && (
                    <div className="w-full h-full min-h-0 bg-white antialiased select-none flex flex-col text-gray-800 overflow-hidden relative font-sans">
                        <style>{`
                            .no-scrollbar::-webkit-scrollbar { display: none; }
                            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        `}</style>

                        {/* BARRA SUPERIOR DE COMANDO (SIN BOTÓN FILTROS) */}
                        <header className="bg-gray-50 border-b-2 border-gray-200 px-4 flex items-center justify-between shrink-0 h-12 z-30 w-full">
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-[#0E5E6F] text-white rounded-[4px] shadow-xs">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <h1 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                                            Edición y Aprobación de Mapas
                                        </h1>
                                        <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-[4px] border border-[#0E5E6F]/30 bg-[#0E5E6F]/10 text-[#0E5E6F]">
                                            Admin
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-medium leading-none">
                                        Zonas y parámetros de vuelo.
                                    </p>
                                </div>
                            </div>

                            {/* BOTONES DEL HEADER TIPO ORACIÓN */}
                            <div className="flex items-center gap-1.5">
                                <button className="py-1 px-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-colors active:scale-95 shadow-xs cursor-pointer">
                                    <Download size={13} className="text-gray-500" />
                                    <span>Exportar</span>
                                </button>
                                <button className="py-1 px-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-colors active:scale-95 shadow-xs cursor-pointer">
                                    <Share2 size={13} className="text-gray-500" />
                                    <span>Compartir</span>
                                </button>
                                <div className="h-4 w-px bg-gray-300 mx-0.5" />
                                <button className="py-1 px-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-colors active:scale-95 shadow-xs cursor-pointer">
                                    <Trash2 size={13} className="text-rose-600" />
                                    <span>Borrar selección</span>
                                </button>
                                <button className="py-1 px-3 bg-[#0E5E6F] border-2 border-[#0E5E6F] hover:bg-[#0a4754] text-white font-bold rounded-[4px] text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer">
                                    <Save size={13} />
                                    <span>Guardar mapa</span>
                                </button>
                            </div>
                        </header>

                        {/* ÁREA PRINCIPAL DEL EDITOR */}
                        <main className="flex-1 flex overflow-hidden relative min-h-0 w-full">
                            {/* PANEL IZQUIERDO */}
                            <aside className={`bg-white border-r-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${isLeftCollapsed ? "w-12" : "w-56"}`}>
                                <button
                                    onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
                                    className="absolute -right-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
                                    title={isLeftCollapsed ? "Expandir menú" : "Colapsar menú"}
                                >
                                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isLeftCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {!isLeftCollapsed ? (
                                    <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar text-left h-full max-h-full">
                                        <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px] shrink-0 transition-all flex items-center justify-between group">
                                            <div 
                                                onClick={handleOpenIdModal}
                                                className="cursor-pointer flex-1"
                                                title="Hacer clic para cambiar ID de misión"
                                            >
                                                <h2 className="text-[9px] font-bold text-gray-400 block">
                                                    Edición Activa
                                                </h2>
                                                <span className="text-[11px] font-bold text-gray-800 block mt-0.5 group-hover:text-[#0E5E6F]">
                                                    ID: #{mappingId}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={handleCopyMapId}
                                                className="p-1.5 bg-gray-200 hover:bg-[#0E5E6F] text-gray-600 hover:text-white rounded-[4px] transition-colors shadow-xs ml-2 cursor-pointer"
                                                title="Copiar ID para usar en formularios"
                                            >
                                                <ClipboardCopy size={14} />
                                            </button>
                                        </div>

                                        <div className="shrink-0">
                                            <h2 className="text-[9px] font-bold text-gray-400 block mb-1">
                                                Herramientas de Dibujo
                                            </h2>
                                            <div className="space-y-1">
                                                <button onClick={() => setSelectedTool("polygon")} className={`w-full flex items-center justify-between p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "polygon" ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3 h-3 border-2 border-current rounded-[2px]" />
                                                        <span>Pentágono</span>
                                                    </div>
                                                    {selectedTool === "polygon" && <span className="text-[8px] font-bold bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded-[4px]">Activo</span>}
                                                </button>

                                                <button onClick={() => setSelectedTool("octagon")} className={`w-full flex items-center justify-between p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "octagon" ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-3 h-3 border-2 border-current rounded-full" />
                                                        <span>Octágono</span>
                                                    </div>
                                                    {selectedTool === "octagon" && <span className="text-[8px] font-bold bg-[#0E5E6F] text-white px-1.5 py-0.2 rounded-[4px]">Activo</span>}
                                                </button>

                                                <button onClick={() => setSelectedTool("delete")} className={`w-full flex items-center gap-1.5 p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "delete" ? "border-rose-500 bg-rose-50 text-rose-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                                                    <Trash2 size={13} />
                                                    <span>Eliminar</span>
                                                </button>

                                                <button onClick={() => setSelectedTool("move")} className={`w-full flex items-center gap-1.5 p-1.5 rounded-[4px] border-2 text-[11px] font-bold transition-all cursor-pointer ${selectedTool === "move" ? "border-[#0E5E6F] bg-[#0E5E6F]/10 text-[#0E5E6F]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
                                                    <span>Mover nodos</span>
                                                </button>
                                            </div>
                                        </div>

                                        <hr className="border-gray-200 shrink-0" />

                                        <div className="shrink-0">
                                            <h2 className="text-[9px] font-bold text-gray-400 block mb-1">Capas del Mapa</h2>
                                            <div className="space-y-0.5 mb-1.5">
                                                {[{ id: "satellite", label: "Satélite" }, { id: "hybrid", label: "Híbrido" }, { id: "terrain", label: "Terreno" }].map((layer) => (
                                                    <label key={layer.id} className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 cursor-pointer p-0.5 hover:bg-gray-50 rounded-[4px]">
                                                        <input type="radio" name="mapLayer" checked={mapLayer === layer.id} onChange={() => setMapLayer(layer.id as any)} className="accent-[#0E5E6F]" />
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
                                    <div className="py-4 flex flex-col items-center gap-3">
                                        <button onClick={handleOpenIdModal} className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer" title={`Cambiar ID de misión (${mappingId})`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                                        </button>
                                        <button onClick={handleCopyMapId} className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer" title="Copiar ID">
                                            <ClipboardCopy size={16} />
                                        </button>
                                    </div>
                                )}
                            </aside>

                            {/* MAPA INTERACTIVO */}
                            <div className="flex-1 bg-slate-900 relative overflow-hidden h-full min-w-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center w-full h-full object-cover pointer-events-none rounded-[4px]"
                                    style={{ backgroundImage: `url(src/img/editor_mapas.png)` }}
                                />
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
                                    <polygon points="350,150 480,150 540,280 480,420 350,420 290,280" fill="rgba(14, 94, 111, 0.45)" stroke="#0E5E6F" strokeWidth="3" strokeDasharray="6 3" className="pointer-events-auto cursor-pointer" />
                                    {[[350, 150], [480, 150], [540, 280], [480, 420], [350, 420], [290, 280]].map(([x, y], i) => (
                                        <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" stroke="#0E5E6F" strokeWidth="2" />
                                    ))}
                                    <text x="415" y="280" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Roboto, sans-serif">Zona A: Fertilizante</text>

                                    <polygon points="620,230 710,280 680,410 570,410 550,290" fill="rgba(217, 119, 6, 0.45)" stroke="#d97706" strokeWidth="3" className="pointer-events-auto cursor-pointer" />
                                    {[[620, 230], [710, 280], [680, 410], [570, 410], [550, 290]].map(([x, y], i) => (
                                        <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                                    ))}
                                    <text x="625" y="320" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Roboto, sans-serif">Zona B: Fumigación</text>
                                </svg>

                                <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
                                    <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-[4px] shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">+</button>
                                    <button className="w-7 h-7 bg-white border-2 border-gray-200 rounded-[4px] shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center text-xs cursor-pointer">-</button>
                                </div>
                            </div>

                            {/* PANEL DERECHO */}
                            <aside className={`bg-white border-l-2 border-gray-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 h-full overflow-visible ${isRightCollapsed ? "w-12" : "w-64"}`}>
                                <button
                                    onClick={() => setIsRightCollapsed(!isRightCollapsed)}
                                    className="absolute -left-3.5 top-3 bg-white border-2 border-gray-300 hover:border-[#0E5E6F] text-gray-700 hover:text-[#0E5E6F] rounded-full p-1 z-40 shadow-lg active:scale-95 cursor-pointer transition-all"
                                    title={isRightCollapsed ? "Expandir menú" : "Colapsar menú"}
                                >
                                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isRightCollapsed ? "" : "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {!isRightCollapsed ? (
                                    <div className="p-2.5 flex flex-col gap-2.5 overflow-y-auto no-scrollbar text-left max-h-full">
                                        <div className="flex items-center justify-between pb-1 border-b-2 border-gray-100 shrink-0">
                                            <h2 className="text-[11px] font-bold text-gray-800">Control del Dron</h2>
                                        </div>

                                        <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px] space-y-1.5 shrink-0">
                                            <div className="flex justify-between items-center text-[11px]">
                                                <span className="font-bold text-gray-700">Dron Agras T50</span>
                                                <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-1 py-0.2 rounded-[4px]">En línea</span>
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
                                            <h2 className="text-[9px] font-bold text-gray-400 block mb-1.5">Parámetros de Vuelo</h2>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                                                        <span>Altitud</span>
                                                        <span className="font-bold" style={{ color: "#CA5116" }}>{altitude} m</span>
                                                    </div>
                                                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                                                        <div className="h-full rounded-full transition-all" style={{ width: `${((altitude - 10) / 90) * 100}%`, backgroundColor: "#CA5116" }} />
                                                        <div className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer" style={{ left: `${((altitude - 10) / 90) * 100}%`, backgroundColor: "#CA5116" }} />
                                                        <input type="range" min="10" max="100" value={altitude} onChange={(e) => setAltitude(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                                                        <span>Velocidad</span>
                                                        <span className="font-bold" style={{ color: "#2994B2" }}>{speed} km/h</span>
                                                    </div>
                                                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                                                        <div className="h-full rounded-full transition-all" style={{ width: `${((speed - 5) / 35) * 100}%`, backgroundColor: "#2994B2" }} />
                                                        <div className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer" style={{ left: `${((speed - 5) / 35) * 100}%`, backgroundColor: "#2994B2" }} />
                                                        <input type="range" min="5" max="40" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                                                        <span>Dosis química</span>
                                                        <span className="font-bold" style={{ color: "#B165E0" }}>{rate} L/ha</span>
                                                    </div>
                                                    <div className="relative w-full h-2 bg-gray-200 rounded-full flex items-center">
                                                        <div className="h-full rounded-full transition-all" style={{ width: `${((rate - 0.5) / 9.5) * 100}%`, backgroundColor: "#B165E0" }} />
                                                        <div className="absolute w-3.5 h-3.5 rounded-full shadow-md -translate-x-1/2 transition-all cursor-pointer" style={{ left: `${((rate - 0.5) / 9.5) * 100}%`, backgroundColor: "#B165E0" }} />
                                                        <input type="range" min="0.5" max="10" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-gray-200 mt-auto shrink-0" />

                                        <div className="space-y-1.5 pt-0.5 shrink-0">
                                            <button onClick={() => setIsApprovalModalOpen(true)} className="w-full py-2 bg-[#0E5E6F] hover:bg-[#0a4754] border-2 border-[#0E5E6F] text-white font-bold text-[11px] rounded-[4px] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer">
                                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                                <span>Enviar edición</span>
                                            </button>
                                            <button className="w-full py-1.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">Auto-dibujar zona</button>
                                            <button className="w-full py-1.5 bg-white border-2 border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">Cancelar edición</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4 flex flex-col items-center gap-3">
                                        <button onClick={() => setIsRightCollapsed(false)} className="p-2 bg-gray-100 hover:bg-[#0E5E6F]/10 hover:text-[#0E5E6F] rounded-[4px] text-gray-600 transition-colors cursor-pointer" title="Control de misión dron">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                        </button>
                                    </div>
                                )}
                            </aside>
                        </main>
                    </div>
                )}
            </div>

            {/*========================================================
                MODALES DEL SISTEMA (TITLE CASE EN ENCABEZADOS)
            =========================================================*/}
            
            {/* Modal Éxito de Copia */}
            {isCopySuccessModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-[4px] p-5 shadow-2xl max-w-sm w-full text-center flex flex-col items-center border border-gray-100">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                            <Check size={20} strokeWidth={3} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">¡ID Copiado!</h3>
                        <p className="text-xs text-gray-500 mb-4 px-2 leading-relaxed">
                            El ID se ha guardado en el portapapeles. Puedes pegarlo en el formulario de la pestaña <strong>Mis Servicios</strong>.
                        </p>
                        <button 
                            onClick={() => setIsCopySuccessModalOpen(false)} 
                            className="px-5 py-2 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-bold rounded-[4px] w-full transition-colors cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL CAMBIO DE ID */}
            {isIdModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden text-left p-4 space-y-3 font-sans">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <h3 className="text-xs font-bold text-gray-900">Cambiar ID de Misión para Mapeo</h3>
                            <button onClick={() => setIsIdModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer"><X size={16} /></button>
                        </div>
                        <form onSubmit={handleSaveId} className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-1">Código / ID de la misión</label>
                                <input type="text" value={tempMappingId} onChange={(e) => setTempMappingId(e.target.value)} placeholder="Ej. MIS-FUM-001" className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-mono font-bold text-gray-800 focus:border-[#0E5E6F] outline-none" autoFocus />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button type="button" onClick={() => setIsIdModalOpen(false)} className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer">Cancelar</button>
                                <button type="submit" className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs">Guardar ID</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL APROBACIÓN */}
            {isApprovalModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden text-left p-4 space-y-3 font-sans">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                            <div className="p-1 bg-amber-100 text-amber-700 rounded-[4px]"><Check size={16} /></div>
                            <h3 className="text-xs font-bold text-gray-900">Mapeo Enviado a Revisión</h3>
                        </div>
                        <div className="space-y-2 text-xs text-gray-600 font-normal">
                            <p>La edición del mapa para la misión <span className="font-bold text-gray-800">#{mappingId}</span> ha sido enviada exitosamente a uno de los administradores.</p>
                            <div className="p-2 bg-amber-50 border border-amber-200 rounded-[4px] text-[11px] text-amber-800 font-medium">
                                Estado: En espera de ser aprobada por el administrador.
                            </div>
                        </div>
                        <div className="flex justify-end pt-2 border-t border-gray-100">
                            <button type="button" onClick={() => setIsApprovalModalOpen(false)} className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs">Entendido</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 3. Mis Suscripciones (subscriptions)
export const ClienteSuscripcionesView = () => {
    const [activeTab, setActiveTab] = useState<TabType>("generales");
    const [activePlanId, setActivePlanId] = useState<string>("plan-profesional");
    const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any | null>(null);

    // Estado del modal de cancelación
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

    const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "wallet" | "qr">("card");
    const [selectedGateway, setSelectedGateway] = useState<string>("PixelPay");
    const [selectedQrWallet, setSelectedQrWallet] = useState<string>("PixelPay");

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    const userWalletBalance = 3200;

    // BASE DE DATOS DE PLANES POR CATEGORÍA
    const catalogos = {
        generales: [
            {
                id: "plan-basico",
                nombre: "Plan Básico Agrícola",
                precio: "L 1,200",
                precioNum: 1200,
                periodo: "/mes",
                etiqueta: "Inicial",
                descripcion: "Optimización y análisis base para parcelas pequeñas y productores independientes.",
                caracteristicas: [
                    "2 vuelos de monitoreo mensuales.",
                    "Reportes analíticos de vigor en PDF.",
                    "Cobertura de hasta 10 manzanas."
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
                descripcion: "Diseñado para fincas comerciales que requieren seguimiento constante y aspersión aérea.",
                caracteristicas: [
                    "10 vuelos mensuales incluidos.",
                    "Analítica multiespectral (NDVI / SAVI).",
                    "Cobertura de hasta 50 manzanas."
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
                descripcion: "Infraestructura total para grandes agroindustrias con despliegues autónomos diarios.",
                caracteristicas: [
                    "Vuelos y fumigación ilimitados.",
                    "Telemetría y soporte crítico 24/7.",
                    "Procesamiento en tiempo real con IA."
                ],
                destacado: false,
            }
        ],
        "descuentos-drones": [
            {
                id: "pack-descuento-t20p",
                nombre: "Plan Semestral con Descuento Agras T20P",
                precio: "L 18,000",
                precioNum: 18000,
                periodo: "/semestre",
                etiqueta: "Ahorra 15% en dron",
                descripcion: "Obtén un 15% de descuento directo en la compra del DJI Agras T20P contratando este plan.",
                caracteristicas: [
                    "Bono de descuento para la adquisición del equipo.",
                    "Inspección previa al primer vuelo.",
                    "Soporte prioritario en campo."
                ],
                destacado: false,
            },
            {
                id: "pack-descuento-t40",
                nombre: "Plan Anual con Descuento Agras T40",
                precio: "L 32,000",
                precioNum: 32000,
                periodo: "/año",
                etiqueta: "Ahorra 25% en dron",
                descripcion: "Obtén la mayor bonificación comercial en el hardware DJI Agras T40 al contratar cobertura anual.",
                caracteristicas: [
                    "Descuento especial de 25% aplicado al dron.",
                    "Mantenimiento técnico sin costo por 12 meses.",
                    "Capacitación completa de uso para operadores."
                ],
                destacado: true,
            },
            {
                id: "pack-descuento-m3m",
                nombre: "Plan Trimestral con Descuento Mavic 3M",
                precio: "L 9,500",
                precioNum: 9500,
                periodo: "/trimestre",
                etiqueta: "Ahorra 10% en dron",
                descripcion: "Ahorra en tu dron multiespectral para mapeo y monitoreo al suscribir tu paquete de servicios.",
                caracteristicas: [
                    "Cupón de descuento directo para la compra del dron.",
                    "Procesamiento ortomosaico inicial gratis.",
                    "Asesoría en interpretación de mapas NDVI."
                ],
                destacado: false,
            }
        ],
        "asistencia-tecnica": [
            {
                id: "plan-tecnico-basico",
                nombre: "Asistencia Técnica Bálance",
                precio: "L 850",
                precioNum: 850,
                periodo: "/mes",
                etiqueta: "Preventivo",
                descripcion: "Revisión e inspección constante de componentes para prolongar la vida útil de tus equipos.",
                caracteristicas: [
                    "2 revisiones preventivas en taller al mes.",
                    "Limpieza ultrasónica de boquillas y bombas.",
                    "10% de descuento en repuestos originales."
                ],
                destacado: false,
            },
            {
                id: "plan-tecnico-integral",
                nombre: "Soporte Crítico y Taller Móvil",
                precio: "L 2,100",
                precioNum: 2100,
                periodo: "/mes",
                etiqueta: "Taller avanzado",
                descripcion: "Atención directa en tu finca con mecánicos especializados y unidades de respuesta rápida.",
                caracteristicas: [
                    "Atención de emergencias en menos de 24 horas.",
                    "Actualización de firmware y calibración de radares.",
                    "Dron de sustitución durante reparaciones."
                ],
                destacado: true,
            },
            {
                id: "plan-tecnico-flotas",
                nombre: "Mantenimiento Integral de Flotas",
                precio: "L 4,500",
                precioNum: 4500,
                periodo: "/mes",
                etiqueta: "Empresarial",
                descripcion: "Servicio completo de taller y repuestos para empresas con 3 o más aeronaves agrícolas.",
                caracteristicas: [
                    "Mantenimiento ilimitado de flota.",
                    "Stock dedicado de piezas de repuesto.",
                    "Mecánico dedicado exclusivo durante campaña."
                ],
                destacado: false,
            }
        ],
        "contratacion-piloto": [
            {
                id: "piloto-por-jornada",
                nombre: "Piloto Certificado por Jornada",
                precio: "L 1,500",
                precioNum: 1500,
                periodo: "/día",
                etiqueta: "Por demanda",
                descripcion: "Contrata un piloto capacitado y certificado para tareas puntuales de aplicación o mapeo.",
                caracteristicas: [
                    "Piloto con más de 200 horas de vuelo.",
                    "Manejo de drones de aspersión o monitoreo.",
                    "Cumplimiento de protocolos de bioseguridad."
                ],
                destacado: false,
            },
            {
                id: "piloto-campana-mensual",
                nombre: "Piloto Dedicado por Campaña",
                precio: "L 14,000",
                precioNum: 14000,
                periodo: "/mes",
                etiqueta: "Campaña agrícola",
                descripcion: "Disponibilidad completa de un profesional asignado a tu finca durante toda la temporada.",
                caracteristicas: [
                    "Piloto a tiempo completo en tu campo.",
                    "Gestión de recargas, mezcla y registros de vuelo.",
                    "Informes analíticos diarios de trabajo."
                ],
                destacado: true,
            },
            {
                id: "piloto-cuadrilla-equipo",
                nombre: "Cuadrilla Completa de Vuelo",
                precio: "L 22,000",
                precioNum: 22000,
                periodo: "/mes",
                etiqueta: "Operación masiva",
                descripcion: "Equipo conformado por piloto principal y auxiliar de campo para jornadas intensivas.",
                caracteristicas: [
                    "1 piloto certificado + 1 asistente operativo.",
                    "Rendimiento optimizado en cambio de baterías.",
                    "Mayor superficie cubierta por jornada."
                ],
                destacado: false,
            }
        ]
    };

    const todosLosPlanes = [
        ...catalogos.generales,
        ...catalogos["descuentos-drones"],
        ...catalogos["asistencia-tecnica"],
        ...catalogos["contratacion-piloto"]
    ];

    const planActual = todosLosPlanes.find((p) => p.id === activePlanId) || catalogos.generales[1];

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

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        // Lógica adicional de cancelación
    };

    return (
        <div
            className="p-3 md:p-5 max-w-7xl mx-auto flex flex-col gap-4 text-left antialiased text-gray-800"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            {/* CABECERA PRINCIPAL */}
            <div className="border-b border-gray-200 pb-2.5 flex justify-between items-center">
                <div>
                    <Title className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <span>Gestión de Suscripciones y Servicios</span>
                        <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 rounded-[4px] tracking-wider border border-[#0E5E6F]/20">
                            Planes BIODRON
                        </span>
                    </Title>
                    <Text className="text-[11px] text-gray-500 block mt-0.5">
                        Administra tu plan de monitoreo aéreo, descuentos en equipos, asistencia técnica y contratación de pilotos.
                    </Text>
                </div>
            </div>

            {/* PROCESO DE PAGO */}
            {selectedPlanForCheckout ? (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedPlanForCheckout(null)}
                        className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-[4px] border border-gray-200 transition"
                    >
                        <ArrowLeft size={14} /> Volver a selección de opciones
                    </button>

                    {paymentSuccess ? (
                        <div className="bg-emerald-50 border border-emerald-300 rounded-[4px] p-5 text-center flex flex-col items-center justify-center gap-2 my-2">
                            <div className="p-2.5 bg-emerald-500 text-white rounded-[4px]">
                                <Check size={24} />
                            </div>
                            <Title as="h2" className="text-lg font-black text-emerald-950">
                                ¡Solicitud Procesada con Éxito!
                            </Title>
                            <Text className="text-xs text-emerald-800 font-medium max-w-md block">
                                Tu solicitud ha sido registrada correctamente para <strong>{selectedPlanForCheckout.nombre}</strong>.
                            </Text>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                            {/* RESUMEN DEL PLAN */}
                            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    <Title
                                        as="h3"
                                        className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2"
                                    >
                                        Resumen de la Orden
                                    </Title>

                                    <div className="bg-gray-50 p-2.5 rounded-[4px] border border-gray-200 flex flex-col gap-1 mb-2">
                                        <span className="text-[9px] text-[#0E5E6F] bg-[#0E5E6F]/10 px-2 py-0.5 rounded-[4px] border border-[#0E5E6F]/20 w-fit">
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
                                            <span className="text-[11px] text-gray-500">
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

                                    <Text className="text-[10px] text-gray-700 block mb-1">
                                        Detalles incluidos:
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

                                <div className="p-2 bg-amber-50 border border-amber-200 rounded-[4px] flex items-center gap-1.5 text-amber-900 text-[10px]">
                                    <ShieldCheck size={14} className="text-amber-600 shrink-0" />
                                    <span>Garantía de servicio y soporte de la red BIODRON.</span>
                                </div>
                            </div>

                            {/* FORMULARIO DE PAGO */}
                            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    {/* Selector de Método de Pago */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-gray-100 rounded-[4px] border border-gray-200 mb-2.5">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "card"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <CreditCard size={13} />
                                            <span>Tarjeta</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("transfer")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "transfer"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Building2 size={13} />
                                            <span>Bancos</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("qr")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "qr"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <QrCode size={13} />
                                            <span>Código QR</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("wallet")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "wallet"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Wallet size={13} />
                                            <span>Saldo BIODRON</span>
                                        </button>
                                    </div>

                                    {/* TARJETA DE CRÉDITO Y PASARELAS */}
                                    {paymentMethod === "card" && (
                                        <div className="flex flex-col gap-3">
                                            {/* Selector de pasarelas */}
                                            <div>
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Pasarela de pago:</span>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                                    {["PixelPay", "ClinPays", "Recurrente", "Pagadito"].map((gateway) => (
                                                        <button
                                                            key={gateway}
                                                            onClick={() => setSelectedGateway(gateway)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedGateway === gateway
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {gateway}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                                <div className="sm:col-span-5 flex justify-center">
                                                    <div className="w-full max-w-[190px] aspect-[1.58/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0E5E6F] text-white p-2.5 rounded-[4px] shadow-sm border border-slate-700 flex flex-col justify-between">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300">
                                                                BIODRON
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
                                                                    {cardData.name || "Nombre titular"}
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

                                                <div className="sm:col-span-7 grid grid-cols-2 gap-1.5 text-[11px]">
                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">
                                                            Número de tarjeta
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
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">
                                                            Titular de la tarjeta
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre impreso"
                                                            value={cardData.name}
                                                            onChange={(e) =>
                                                                setCardData({ ...cardData, name: e.target.value })
                                                            }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">
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
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">
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
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TRANSFERENCIA */}
                                    {paymentMethod === "transfer" && (
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="bg-gray-50 border border-gray-200 rounded-[4px] p-2.5">
                                                <span className="text-gray-800 text-[11px] block mb-1">
                                                    Cuentas oficiales BIODRON
                                                </span>
                                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">BAC Credomatic</span>
                                                        <span className="text-gray-600 block">Cuenta: 11-401-009823-1</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Banco Atlántida</span>
                                                        <span className="text-gray-600 block">Cuenta: 20000-847291</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Ficohsa</span>
                                                        <span className="text-gray-600 block">Cuenta: 21-102-393284</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Banpaís</span>
                                                        <span className="text-gray-600 block">Cuenta: 01-293-10293</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-dashed border-gray-300 rounded-[4px] p-2.5 text-center flex items-center justify-center gap-2 hover:border-[#0E5E6F] transition cursor-pointer bg-gray-50/50">
                                                <Upload size={16} className="text-[#0E5E6F]" />
                                                <span className="text-gray-700 text-[11px]">
                                                    Subir comprobante de pago
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* PAGO CON QR REDISEÑADO PARA EVITAR SCROLL */}
                                    {paymentMethod === "qr" && (
                                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-[4px] p-3">
                                            <div className="flex-1">
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Generar código mediante:</span>
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {["PixelPay", "Banrural", "Atlántida"].map((wallet) => (
                                                        <button
                                                            key={wallet}
                                                            onClick={() => setSelectedQrWallet(wallet)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedQrWallet === wallet
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {wallet}
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-gray-500 leading-tight block">
                                                    Escanea este código desde la app de <strong>{selectedQrWallet}</strong> para pagar el total de {selectedPlanForCheckout.precio}.
                                                </span>
                                            </div>
                                            <div className="shrink-0 p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                                                <QrCode size={64} className="text-gray-800" />
                                            </div>
                                        </div>
                                    )}

                                    {/* SALDO WALLET */}
                                    {paymentMethod === "wallet" && (
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="bg-gray-50 border border-gray-200 rounded-[4px] p-2.5 flex justify-between items-center">
                                                <div>
                                                    <span className="text-gray-500 font-medium block text-[10px]">
                                                        Saldo disponible BIODRON
                                                    </span>
                                                    <span className="text-lg font-black text-gray-900">
                                                        L{" "}
                                                        {userWalletBalance.toLocaleString("es-HN", {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]">
                                                    <Wallet size={18} />
                                                </div>
                                            </div>

                                            {userWalletBalance < selectedPlanForCheckout.precioNum ? (
                                                <div className="p-1.5 bg-red-50 border border-red-200 rounded-[4px] flex items-center gap-1.5 text-red-800 text-[11px]">
                                                    <AlertCircle
                                                        size={14}
                                                        className="shrink-0 text-red-600"
                                                    />
                                                    <span>
                                                        Saldo insuficiente. Faltan L{" "}
                                                        {(
                                                            selectedPlanForCheckout.precioNum -
                                                            userWalletBalance
                                                        ).toLocaleString("es-HN")}
                                                        .
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="p-1.5 bg-emerald-50 border border-emerald-200 rounded-[4px] flex items-center gap-1.5 text-emerald-800 text-[11px]">
                                                    <CheckCircle2
                                                        size={14}
                                                        className="shrink-0 text-emerald-600"
                                                    />
                                                    <span>
                                                        Saldo suficiente para procesar la transacción.
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
                                    className="w-full py-2 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] disabled:bg-gray-300 text-white text-xs rounded-[4px] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                >
                                    {isProcessing ? (
                                        <span>Procesando...</span>
                                    ) : (
                                        <>
                                            <ShieldCheck size={15} />
                                            <span>
                                                Confirmar y adquirir por {selectedPlanForCheckout.precio}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* VISTA PRINCIPAL CON PESTAÑAS Y PLAN ACTIVO */
                <div className="flex flex-col gap-5">
                    {/* PLAN ACTIVO ACTUAL */}
                    {planActual && (
                        <div className="bg-white border border-[#0E5E6F] rounded-[4px] p-4 shadow-xs flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-gray-100 pb-3">
                                <div className="flex gap-3 items-start">
                                    <div className="p-2 bg-[#0E5E6F] text-white rounded-[4px] shadow-xs shrink-0 mt-0.5">
                                        <CheckCircle2 size={22} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="bg-[#0E5E6F]/10 text-[#0E5E6F] border border-[#0E5E6F]/20 text-[10px] px-2 py-0.5 rounded-[4px] tracking-wider">
                                                Plan Activo
                                            </span>
                                            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-200">
                                                Renovación automática
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

                                <div className="flex flex-col items-start md:items-end gap-2">
                                    <span className="text-xl font-black text-[#0E5E6F]">
                                        {planActual.precio}{" "}
                                        <span className="text-xs font-normal text-gray-500">
                                            {planActual.periodo}
                                        </span>
                                    </span>

                                    {/* BOTÓN CANCELAR SUSCRIPCIÓN (DISPARA EL MODAL) */}
                                    <button
                                        type="button"
                                        onClick={() => setShowCancelModal(true)}
                                        style={{
                                            borderColor: "#B8001F",
                                            color: "#B8001F",
                                            borderRadius: "4px",
                                        }}
                                        className="px-3 py-1.5 border-2 text-xs font-bold bg-white hover:bg-red-50 transition-colors active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs"
                                    >
                                        <XCircle size={14} />
                                        <span>Cancelar suscripción</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-gray-50/80 p-3 rounded-[4px] border border-gray-200/80">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[#0E5E6F] shrink-0" />
                                    <div>
                                        <span className="text-[9px] uppercase text-gray-400 block">
                                            Próximo vencimiento
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            15 de agosto, 2026
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-1.5 sm:pt-0 sm:pl-3">
                                    <CreditCard size={16} className="text-[#0E5E6F] shrink-0" />
                                    <div>
                                        <span className="text-[9px] uppercase text-gray-400 block">
                                            Método registrado
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            Visa terminada en •••• 4021
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-1.5 sm:pt-0 sm:pl-3">
                                    <Zap size={16} className="text-[#0E5E6F] shrink-0" />
                                    <div>
                                        <span className="text-[9px] uppercase text-gray-400 block">
                                            Estado operativo
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            Servicio activo BIODRON
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NAVEGACIÓN POR PESTAÑAS (ESTILO SOLICITADO: GRID TIPO FOLDER/TAB) */}
                    <div>
                        <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 select-none">
                            {[
                                { id: "generales", label: "Planes generales", icon: <Zap size={13} /> },
                                { id: "descuentos-drones", label: "Descuentos en drones por plan", icon: <Tag size={13} /> },
                                { id: "asistencia-tecnica", label: "Asistencia técnica y taller", icon: <Wrench size={13} /> },
                                { id: "contratacion-piloto", label: "Contratación de piloto", icon: <UserCheck size={13} /> },
                            ].map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as TabType)}
                                        style={{ borderRadius: "4px 4px 0 0" }}
                                        className={`px-1.5 py-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 border-t-2 border-x-2 -mb-[2px] transition-all text-center cursor-pointer ${
                                            isActive
                                                ? "border-t-[#0E5E6F] border-x-gray-200 border-b-white bg-white text-[#0E5E6F] shadow-xs"
                                                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                    >
                                        <span className={isActive ? "text-[#0E5E6F]" : "text-gray-400"}>
                                            {tab.icon}
                                        </span>
                                        <span className="truncate">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* DESCRIPCIÓN DE LA CATEGORÍA */}
                        <div className="mb-4">
                            {activeTab === "generales" && (
                                <Text className="text-xs text-gray-500 block">
                                    Suscripciones periódicas para servicios integrales de monitoreo aéreo, aspersión y análisis con la platforma BIODRON.
                                </Text>
                            )}
                            {activeTab === "descuentos-drones" && (
                                <Text className="text-xs text-gray-500 block">
                                    Obtén un porcentaje de descuento especial en la adquisición de tu dron al suscribir cualquiera de estos planes BIODRON.
                                </Text>
                            )}
                            {activeTab === "asistencia-tecnica" && (
                                <Text className="text-xs text-gray-500 block">
                                    Planes dedicados de mantenimiento preventivo, reparaciones en campo y respaldo técnico integral BIODRON.
                                </Text>
                            )}
                            {activeTab === "contratacion-piloto" && (
                                <Text className="text-xs text-gray-500 block">
                                    Servicio de personal de vuelo certificado para la ejecución de operaciones agrícolas según las necesidades de tu finca.
                                </Text>
                            )}
                        </div>

                        {/* REJILLA CON TRES PLANES POR PESTAÑA */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                            {catalogos[activeTab].map((plan) => {
                                const esPlanActual = plan.id === activePlanId;

                                return (
                                    <div
                                        key={plan.id}
                                        className={`relative bg-white rounded-[4px] border transition-all flex flex-col justify-between p-4 shadow-xs hover:shadow-md ${plan.destacado
                                                ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/20"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        {/* INSIGNIA DESTACADO */}
                                        {plan.destacado && (
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#0E5E6F] text-white text-[10px] px-3 py-0.5 rounded-[4px] uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white">
                                                <Zap size={11} /> Destacado
                                            </span>
                                        )}

                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-gray-100 text-gray-800 border border-gray-200 text-[10px] px-2 py-0.5 rounded-[4px] tracking-wider">
                                                    {plan.etiqueta}
                                                </span>
                                                {esPlanActual && (
                                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-[4px] font-bold">
                                                        Contratado
                                                    </span>
                                                )}
                                            </div>

                                            {/* TÍTULO DEL PLAN */}
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
                                                <Text className="text-[10px] uppercase text-gray-400 tracking-wider block mb-1.5">
                                                    Incluye:
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
                                            className={`w-full py-2 px-3 rounded-[4px] text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${esPlanActual
                                                    ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                                    : plan.destacado
                                                        ? "bg-[#0E5E6F] hover:bg-[#0A4552] text-white shadow-xs font-bold"
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                                                }`}
                                        >
                                            {esPlanActual ? "Opción actual" : "Seleccionar plan"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE CONFIRMACIÓN DE CANCELACIÓN DE SUSCRIPCIÓN */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div
                        style={{ borderRadius: "4px" }}
                        className="bg-white border-2 border-gray-200 max-w-md w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 relative"
                    >
                        <button
                            onClick={() => setShowCancelModal(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 cursor-pointer p-1"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex items-center gap-2.5 text-[#B8001F] mb-3">
                            <AlertCircle size={22} />
                            <Title as="h3" className="text-base font-extrabold text-gray-900">
                                ¿Cancelar Suscripción Actual?
                            </Title>
                        </div>

                        <Text className="text-xs text-gray-600 leading-relaxed mb-5">
                            Al cancelar tu suscripción, perderás la prioridad en el despacho de drones, asistencia técnica acelerada y los beneficios de análisis de datos a partir de la próxima fecha de corte.
                        </Text>

                        <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-3.5 py-1.5 border border-gray-300 text-xs font-bold text-gray-700 rounded-[4px] hover:bg-gray-100 transition cursor-pointer"
                            >
                                Conservar suscripción
                            </button>

                            <button
                                onClick={handleConfirmCancel}
                                style={{ backgroundColor: "#B8001F" }}
                                className="px-3.5 py-1.5 text-xs font-bold text-white rounded-[4px] hover:opacity-90 transition cursor-pointer shadow-xs"
                            >
                                Confirmar cancelación
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 4. Comprar Dron, ver el estado del dron
export const ClienteDronView = ({
    onRegisterPilot,
}: {
    onRegisterPilot?: () => void;
}) => {
    // ---------------- ESTADOS DEL DRON ----------------
    const [activeMainTab, setActiveMainTab] = useState<"mis-drones" | "comprar">("mis-drones");
    const [selectedCategory, setSelectedCategory] = useState<"micro" | "mini" | "pequeno" | "grande">("micro");
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

    const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [pilotFormData, setPilotFormData] = useState({
        email: "carlos.mendoza@agrodrone.hn",
        password: "password123",
        ahacCode: "AHAC-PIL-2026-88",
    });

    // ---------------- ESTADOS AYUDA TÉCNICA ----------------
    const [supportDrone, setSupportDrone] = useState<UserDrone | null>(null);
    const [supportReason, setSupportReason] = useState<string>(
        "Fallo menor en la calibración del sensor de altitud durante el último vuelo."
    );
    const [supportSubmitted, setSupportSubmitted] = useState<boolean>(false);

    // ---------------- ESTADOS CHECKOUT ----------------
    const [selectedDroneForCheckout, setSelectedDroneForCheckout] = useState<Drone | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "wallet" | "qr">("card");
    const [selectedGateway, setSelectedGateway] = useState<string>("PixelPay");
    const [selectedQrWallet, setSelectedQrWallet] = useState<string>("PixelPay");

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    const userWalletBalance = 3200;

    const getPrecioNum = (precioStr: string) => parseInt(precioStr.replace(/[^0-9]/g, ""), 10);

    // ---------------- DATOS ----------------
    const misDronesComprados: UserDrone[] = [
        {
            id: "usr-dron-01",
            nombre: "BioScout Micro I",
            modelo: "Micro-Agro 2026",
            categoria: "Micro dron",
            imagen: "src/img/DJI_FlyCart_30.png",
            estado: "Operativo",
            bateria: 92,
            horasVuelo: 14.5,
            ultimaRevision: "2026-07-10",
            numeroSerie: "SN-BIO-8821-X",
        },
        {
            id: "usr-dron-02",
            nombre: "AgroNano Pro V1",
            modelo: "Invernadero-Scan",
            categoria: "Micro dron",
            imagen: "src/img/Freefly_Alta_X.png",
            estado: "En mantenimiento",
            bateria: 45,
            horasVuelo: 32.0,
            ultimaRevision: "2026-06-28",
            numeroSerie: "SN-BIO-9942-Y",
        }
    ];

    const catalogoDrones: Drone[] = [
        {
            id: "micro-1",
            nombre: "BioScout Micro II",
            etiqueta: "Inspección Rápida",
            categoria: "micro",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 45,000",
            descripcion: "Micro dron ultraligero para mapeo sensorizado rápido y evaluación fotométrica básica de parcelas.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "250 g",
                "Tiempo de vuelo": "28 min",
                "Velocidad máxima": "45 km/h",
                "Alcance": "6 km",
                "Resistencia al viento": "8 m/s",
                "Sensor": "Multiespectral Ligero",
            },
        },
        {
            id: "micro-2",
            nombre: "AgroNano Pro",
            etiqueta: "Mapeo Micro",
            categoria: "micro",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 62,000",
            descripcion: "Diseñado para inspección foliar cercana en invernaderos y cultivos protegidos de alta precisión.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "450 g",
                "Tiempo de vuelo": "22 min",
                "Velocidad máxima": "50 km/h",
                "Alcance": "4 km",
                "Resistencia al viento": "9 m/s",
                "Sensor": "Térmico Dual / RGB",
            },
        },
        {
            id: "mini-1",
            nombre: "BioHawk Mini",
            etiqueta: "Monitoreo Agrícola",
            categoria: "mini",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 115,000",
            descripcion: "Dron compacto para supervisión de parcelas medianas y análisis de índice de vegetación NDVI.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "1.2 kg",
                "Tiempo de vuelo": "35 min",
                "Velocidad máxima": "60 km/h",
                "Alcance": "10 km",
                "Resistencia al viento": "12 m/s",
                "Sensor": "RGB + NDVI HD",
            },
        },
        {
            id: "mini-2",
            nombre: "FieldCam Mini X",
            etiqueta: "Mapeo Térmico",
            categoria: "mini",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 135,000",
            descripcion: "Especializado en detección de humedad y detección temprana de plagas en terrenos agrícolas.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "1.5 kg",
                "Tiempo de vuelo": "32 min",
                "Velocidad máxima": "58 km/h",
                "Alcance": "8 km",
                "Resistencia al viento": "10 m/s",
                "Sensor": "Térmico Alta Resolución",
            },
        },
        {
            id: "pequeno-1",
            nombre: "AgroSpray Small-V",
            etiqueta: "Aspersión Focalizada",
            categoria: "pequeno",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 240,000",
            descripcion: "Unidad de aspersión agrícola de tamaño reducido para fumigación precisa en zonas difíciles.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "10 Litros",
                "Tiempo de vuelo": "20 min",
                "Velocidad máxima": "40 km/h",
                "Alcance": "5 km",
                "Resistencia al viento": "10 m/s",
                "Sensor": "Radar Obstáculos 360",
            },
        },
        {
            id: "pequeno-2",
            nombre: "GeoMapper S-200",
            etiqueta: "Fotogrametría",
            categoria: "pequeno",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 210,000",
            descripcion: "Aeronave de precisión topográfica para levantamientos 3D de alta exactitud centimétrica.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "3 kg",
                "Tiempo de vuelo": "45 min",
                "Velocidad máxima": "65 km/h",
                "Alcance": "12 km",
                "Resistencia al viento": "14 m/s",
                "Sensor": "RTK / PPK L1/L2",
            },
        },
        {
            id: "grande-1",
            nombre: "MegaTitan Agro-40",
            etiqueta: "Aspersión Pesada",
            categoria: "grande",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 580,000",
            descripcion: "Dron industrial de alto rendimiento para aspersión masiva y fertilización de gran escala.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "40 Litros",
                "Tiempo de vuelo": "18 min (Carga máx)",
                "Velocidad máxima": "50 km/h",
                "Alcance": "7 km",
                "Resistencia al viento": "15 m/s",
                "Sensor": "Lidar + Radar Matriz",
            },
        },
        {
            id: "grande-2",
            nombre: "AeroWing Heavy Cargo",
            etiqueta: "Ala Fija / Carga",
            categoria: "grande",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 720,000",
            descripcion: "Aeronave de ala fija híbrida para transporte pesado de muestras y cobertura de miles de hectáreas.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "25 kg",
                "Tiempo de vuelo": "90 min",
                "Velocidad máxima": "90 km/h",
                "Alcance": "50 km",
                "Resistencia al viento": "18 m/s",
                "Sensor": "Telemetría Industrial",
            },
        },
    ];

    const dronesFiltrados = catalogoDrones.filter(d => d.categoria === selectedCategory);

    // ---------------- HANDLERS ----------------
    const handlePilotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const resetPilotForm = () => {
        setIsPilotModalOpen(false);
        setIsSubmitted(false);
        setPilotFormData({
            email: "carlos.mendoza@agrodrone.hn",
            password: "password123",
            ahacCode: "AHAC-PIL-2026-88",
        });
    };

    const handleConfirmPurchase = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            setTimeout(() => {
                setPaymentSuccess(false);
                setSelectedDroneForCheckout(null);
                setActiveMainTab("mis-drones");
            }, 1800);
        }, 1200);
    };

    const iniciarCompra = (drone: Drone) => {
        setSelectedDroneForCheckout(drone);
        setSelectedDrone(null);
    };

    const handleSendSupportRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!supportDrone) return;
        setSupportSubmitted(true);
    };

    const closeSupportModal = () => {
        setSupportDrone(null);
        setSupportSubmitted(false);
    };

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif" }} className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 text-left min-h-screen">
            {/* CABECERA PRINCIPAL Y PESTAÑAS */}
            <div className="border-b border-gray-200 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div>
                        <Title className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <span>Adquisición y Estado de Drones</span>
                            <span 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-xs font-bold px-2.5 py-1 tracking-wider border border-[#0E5E6F]/20"
                            >
                                Catálogo oficial
                            </span>
                        </Title>
                        <Text className="text-xs text-gray-500 mt-1 block">
                            Supervisa tu flota actual de aeronaves o explora el catálogo homologado para operar dentro de la plataforma.
                        </Text>
                    </div>

                    <button
                        onClick={() => setIsPilotModalOpen(true)}
                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-4 shadow-xs transition flex items-center gap-2 shrink-0 border border-amber-700 cursor-pointer self-start sm:self-auto"
                    >
                        <Award size={16} />
                        <span>Cambiar a cuenta Piloto</span>
                    </button>
                </div>

                {!selectedDroneForCheckout && (
                    <div className="flex items-center gap-2 border-b border-gray-200">
                        <button
                            onClick={() => setActiveMainTab("mis-drones")}
                            style={{ borderRadius: "4px 4px 0 0", fontFamily: "'Roboto', sans-serif" }}
                            className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                                activeMainTab === "mis-drones"
                                    ? "text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                    : "text-gray-500 hover:text-gray-800"
                            }`}
                        >
                            <Plane size={18} />
                            <span>Estado de dron ({misDronesComprados.length})</span>
                        </button>

                        <button
                            onClick={() => setActiveMainTab("comprar")}
                            style={{ borderRadius: "4px 4px 0 0", fontFamily: "'Roboto', sans-serif" }}
                            className={`pb-3 px-4 font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                                activeMainTab === "comprar"
                                    ? "text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                    : "text-gray-500 hover:text-gray-800"
                            }`}
                        >
                            <ShoppingBag size={18} />
                            <span>Comprar drones</span>
                        </button>
                    </div>
                )}
            </div>

            {/* ZONA DE COMPRA: CHECKOUT */}
            {selectedDroneForCheckout ? (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedDroneForCheckout(null)}
                        className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-[4px] border border-gray-200 transition"
                    >
                        <ArrowLeft size={14} /> Volver a selección de catálogo
                    </button>

                    {paymentSuccess ? (
                        <div className="bg-emerald-50 border border-emerald-300 rounded-[4px] p-5 text-center flex flex-col items-center justify-center gap-2 my-2">
                            <div className="p-2.5 bg-emerald-500 text-white rounded-[4px]">
                                <Check size={24} />
                            </div>
                            <Title as="h2" className="text-lg font-black text-emerald-950">
                                ¡Compra Procesada con Éxito!
                            </Title>
                            <Text className="text-xs text-emerald-800 font-medium max-w-md block">
                                Tu solicitud ha sido registrada correctamente para el equipo <strong>{selectedDroneForCheckout.nombre}</strong>.
                            </Text>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                            {/* RESUMEN DEL DRON */}
                            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    <Title
                                        as="h3"
                                        className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2"
                                    >
                                        Resumen de la Orden
                                    </Title>

                                    <div className="bg-gray-50 p-2.5 rounded-[4px] border border-gray-200 flex flex-col gap-1 mb-2">
                                        <div className="flex gap-3 mb-2">
                                            <div className="w-20 h-20 bg-gray-200 rounded shrink-0 border border-gray-300 overflow-hidden">
                                                <img src={selectedDroneForCheckout.imagen} alt="drone" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-[#0E5E6F] bg-[#0E5E6F]/10 px-2 py-0.5 rounded-[4px] border border-[#0E5E6F]/20 w-fit block mb-1">
                                                    {selectedDroneForCheckout.etiqueta}
                                                </span>
                                                <Title
                                                    as="h2"
                                                    className="text-base font-black text-gray-900 leading-tight"
                                                >
                                                    {selectedDroneForCheckout.nombre}
                                                </Title>
                                            </div>
                                        </div>
                                        
                                        <Text className="text-[11px] text-gray-600 block leading-tight mb-2">
                                            {selectedDroneForCheckout.descripcion}
                                        </Text>
                                        
                                        <div className="mt-1.5 pt-1.5 border-t border-gray-200 flex justify-between items-baseline">
                                            <span className="text-[11px] text-gray-500">
                                                Total a pagar:
                                            </span>
                                            <span className="text-lg font-black text-[#0E5E6F]">
                                                {selectedDroneForCheckout.precio}
                                            </span>
                                        </div>
                                    </div>

                                    <Text className="text-[10px] text-gray-700 block mb-1 font-bold">
                                        Especificaciones del equipo:
                                    </Text>
                                    <ul className="flex flex-col gap-1 text-[11px] text-gray-600">
                                        {Object.entries(selectedDroneForCheckout.especificaciones).map(
                                            ([key, val]: any, idx: number) => (
                                                <li key={idx} className="flex items-center gap-1.5">
                                                    <CheckCircle2
                                                        size={12}
                                                        className="text-[#0E5E6F] shrink-0"
                                                    />
                                                    <span><strong>{key}:</strong> {val}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                <div className="p-2 bg-amber-50 border border-amber-200 rounded-[4px] flex items-center gap-1.5 text-amber-900 text-[10px]">
                                    <ShieldCheck size={14} className="text-amber-600 shrink-0" />
                                    <span>Garantía de hardware y soporte comercial de la red BIODRON.</span>
                                </div>
                            </div>

                            {/* FORMULARIO DE PAGO */}
                            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-gray-100 rounded-[4px] border border-gray-200 mb-2.5">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "card"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <CreditCard size={13} />
                                            <span>Tarjeta</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("transfer")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "transfer"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Building2 size={13} />
                                            <span>Bancos</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("qr")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "qr"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <QrCode size={13} />
                                            <span>Código QR</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("wallet")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "wallet"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Wallet size={13} />
                                            <span>Saldo BIODRON</span>
                                        </button>
                                    </div>

                                    {/* TARJETA */}
                                    {paymentMethod === "card" && (
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Pasarela de pago:</span>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                                    {["PixelPay", "ClinPays", "Recurrente", "Pagadito"].map((gateway) => (
                                                        <button
                                                            key={gateway}
                                                            onClick={() => setSelectedGateway(gateway)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedGateway === gateway
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {gateway}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                                <div className="sm:col-span-5 flex justify-center">
                                                    <div className="w-full max-w-[190px] aspect-[1.58/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0E5E6F] text-white p-2.5 rounded-[4px] shadow-sm border border-slate-700 flex flex-col justify-between">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300">
                                                                BIODRON
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
                                                                    {cardData.name || "Nombre titular"}
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

                                                <div className="sm:col-span-7 grid grid-cols-2 gap-1.5 text-[11px]">
                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Número de tarjeta</label>
                                                        <input
                                                            type="text"
                                                            maxLength={16}
                                                            placeholder="4000 0000 0000 0000"
                                                            value={cardData.number}
                                                            onChange={(e) => setCardData({ ...cardData, number: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Titular de la tarjeta</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre impreso"
                                                            value={cardData.name}
                                                            onChange={(e) => setCardData({ ...cardData, name: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Vencimiento</label>
                                                        <input
                                                            type="text"
                                                            maxLength={5}
                                                            placeholder="MM/AA"
                                                            value={cardData.expiry}
                                                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">CVV</label>
                                                        <input
                                                            type="password"
                                                            maxLength={4}
                                                            placeholder="123"
                                                            value={cardData.cvv}
                                                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TRANSFERENCIA */}
                                    {paymentMethod === "transfer" && (
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="bg-gray-50 border border-gray-200 rounded-[4px] p-2.5">
                                                <span className="text-gray-800 text-[11px] block mb-1">Cuentas oficiales BIODRON</span>
                                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">BAC Credomatic</span>
                                                        <span className="text-gray-600 block">Cuenta: 11-401-009823-1</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Banco Atlántida</span>
                                                        <span className="text-gray-600 block">Cuenta: 20000-847291</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Ficohsa</span>
                                                        <span className="text-gray-600 block">Cuenta: 21-102-393284</span>
                                                    </div>
                                                    <div className="p-1.5 bg-white border border-gray-200 rounded-[4px]">
                                                        <span className="font-bold text-[#0E5E6F] block">Banpaís</span>
                                                        <span className="text-gray-600 block">Cuenta: 01-293-10293</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-dashed border-gray-300 rounded-[4px] p-2.5 text-center flex items-center justify-center gap-2 hover:border-[#0E5E6F] transition cursor-pointer bg-gray-50/50">
                                                <Upload size={16} className="text-[#0E5E6F]" />
                                                <span className="text-gray-700 text-[11px]">Subir comprobante de pago</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* QR */}
                                    {paymentMethod === "qr" && (
                                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-[4px] p-3">
                                            <div className="flex-1">
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Generar código mediante:</span>
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {["PixelPay", "Banrural", "Atlántida"].map((wallet) => (
                                                        <button
                                                            key={wallet}
                                                            onClick={() => setSelectedQrWallet(wallet)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedQrWallet === wallet
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {wallet}
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-gray-500 leading-tight block">
                                                    Escanea este código desde la app de <strong>{selectedQrWallet}</strong> para pagar el total de {selectedDroneForCheckout.precio}.
                                                </span>
                                            </div>
                                            <div className="shrink-0 p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                                                <QrCode size={64} className="text-gray-800" />
                                            </div>
                                        </div>
                                    )}

                                    {/* WALLET */}
                                    {paymentMethod === "wallet" && (
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="bg-gray-50 border border-gray-200 rounded-[4px] p-2.5 flex justify-between items-center">
                                                <div>
                                                    <span className="text-gray-500 font-medium block text-[10px]">
                                                        Saldo disponible BIODRON
                                                    </span>
                                                    <span className="text-lg font-black text-gray-900">
                                                        L {userWalletBalance.toLocaleString("es-HN", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]">
                                                    <Wallet size={18} />
                                                </div>
                                            </div>

                                            {userWalletBalance < getPrecioNum(selectedDroneForCheckout.precio) ? (
                                                <div className="p-1.5 bg-red-50 border border-red-200 rounded-[4px] flex items-center gap-1.5 text-red-800 text-[11px]">
                                                    <AlertCircle size={14} className="shrink-0 text-red-600" />
                                                    <span>
                                                        Saldo insuficiente. Faltan L {(getPrecioNum(selectedDroneForCheckout.precio) - userWalletBalance).toLocaleString("es-HN")}.
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="p-1.5 bg-emerald-50 border border-emerald-200 rounded-[4px] flex items-center gap-1.5 text-emerald-800 text-[11px]">
                                                    <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                                                    <span>Saldo suficiente para procesar la transacción.</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={
                                        isProcessing ||
                                        (paymentMethod === "wallet" && userWalletBalance < getPrecioNum(selectedDroneForCheckout.precio))
                                    }
                                    onClick={handleConfirmPurchase}
                                    className="w-full py-2 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] disabled:bg-gray-300 text-white text-xs rounded-[4px] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                >
                                    {isProcessing ? (
                                        <span>Procesando...</span>
                                    ) : (
                                        <>
                                            <ShieldCheck size={15} />
                                            <span>
                                                Confirmar compra por {selectedDroneForCheckout.precio}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* ESTADO DE DRON */
                activeMainTab === "mis-drones" ? (
                    <div className="space-y-6">
                        {misDronesComprados.length === 0 ? (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-gray-50 border-2 border-dashed border-gray-200 p-10 text-center flex flex-col items-center justify-center"
                            >
                                <Plane className="w-12 h-12 text-gray-300 mb-2" />
                                <h3 className="font-bold text-gray-700 text-sm">No tienes drones vinculados a tu cuenta</h3>
                                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                                    Puedes adquirir unidades micro autorizadas o solicitar la conversión a Piloto para adquirir aeronaves de mayor escala.
                                </p>
                                <button
                                    onClick={() => setActiveMainTab("comprar")}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-4 px-4 py-2 bg-[#0E5E6F] text-white font-bold text-xs shadow-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Explorar Catálogo
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {misDronesComprados.map((drone) => (
                                    <div 
                                        key={drone.id} 
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="bg-white border border-gray-200 p-5 shadow-xs space-y-4 hover:shadow-md transition flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span 
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className="text-[10px] font-bold text-[#0E5E6F] bg-[#0E5E6F]/10 border border-[#0E5E6F]/20 px-2.5 py-0.5 tracking-wider"
                                                >
                                                    {drone.categoria}
                                                </span>
                                                <span 
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className={`text-[10px] font-bold px-2.5 py-1 border ${
                                                        drone.estado === "Operativo"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    }`}
                                                >
                                                    {drone.estado}
                                                </span>
                                            </div>
                                            <h3 className="font-extrabold text-gray-900 text-lg mt-1">{drone.nombre}</h3>
                                            <p className="text-xs text-gray-400 font-mono">N/S: {drone.numeroSerie}</p>
                                        </div>

                                        <div 
                                            style={{ borderRadius: "4px" }}
                                            className="h-40 bg-gray-100 overflow-hidden border border-gray-100"
                                        >
                                            <img 
                                                src={drone.imagen} 
                                                alt={drone.nombre} 
                                                style={{ borderRadius: "4px" }}
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>

                                        <div 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3 border border-gray-200"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <Battery size={18} className="text-emerald-600" />
                                                <div>
                                                    <p className="text-[9px] text-gray-400 font-bold">Batería restante</p>
                                                    <p className="font-bold text-gray-800">{drone.bateria}%</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2.5">
                                                <Radio size={18} className="text-[#0E5E6F]" />
                                                <div>
                                                    <p className="text-[9px] text-gray-400 font-bold">Horas de vuelo</p>
                                                    <p className="font-bold text-gray-800">{drone.horasVuelo} hrs</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>Última revisión técnica:</span>
                                                <span className="font-bold text-gray-700">{drone.ultimaRevision}</span>
                                            </div>

                                            {/* BOTÓN SOLICITAR AYUDA TÉCNICA */}
                                            <button
                                                onClick={() => {
                                                    setSupportDrone(drone);
                                                    setSupportSubmitted(false);
                                                }}
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="w-full py-2 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                                            >
                                                <Headphones size={14} />
                                                <span>Solicitar ayuda técnica</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* COMPRAR DRONES */
                    <div className="space-y-6">
                        <div>
                            <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 select-none">
                                {[
                                    { id: "micro", label: "Micro drones", icon: <Zap size={13} /> },
                                    { id: "mini", label: "Mini drones", icon: <Tag size={13} /> },
                                    { id: "pequeno", label: "Drones pequeños", icon: <Wrench size={13} /> },
                                    { id: "grande", label: "Drones grandes", icon: <UserCheck size={13} /> },
                                ].map((tab) => {
                                    const isActive = selectedCategory === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setSelectedCategory(tab.id as any)}
                                            style={{ borderRadius: "4px 4px 0 0", fontFamily: "'Roboto', sans-serif" }}
                                            className={`px-1.5 py-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 border-t-2 border-x-2 -mb-[2px] transition-all text-center cursor-pointer ${
                                                isActive
                                                    ? "border-t-[#0E5E6F] border-x-gray-200 border-b-white bg-white text-[#0E5E6F] shadow-xs"
                                                    : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span className={isActive ? "text-[#0E5E6F]" : "text-gray-400"}>
                                                {tab.icon}
                                            </span>
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mb-4">
                                {selectedCategory === "micro" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Micro drones ultraligeros y compactos habilitados para compra directa de clientes y tareas de inspección rápida.
                                    </Text>
                                )}
                                {selectedCategory === "mini" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Mini drones avanzados de alta estabilidad para monitoreo de cultivos extensivos. Requiere cuenta de piloto registrada.
                                    </Text>
                                )}
                                {selectedCategory === "pequeno" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Drones pequeños de carga y aspersión agrícola de precisión. Requiere cuenta de piloto verificada.
                                    </Text>
                                )}
                                {selectedCategory === "grande" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Megadrones industriales y de ala fija de largo alcance para operaciones pesadas. Requiere validación AHAC.
                                    </Text>
                                )}
                            </div>
                        </div>

                        {selectedCategory !== "micro" ? (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-amber-50 border border-amber-300 p-5 text-amber-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                            >
                                <div className="flex gap-4 items-start">
                                    <div 
                                        style={{ borderRadius: "4px" }}
                                        className="p-3 bg-amber-500 text-white shrink-0 shadow-sm"
                                    >
                                        <ShieldAlert size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Title as="h3" className="font-bold text-sm sm:text-base text-amber-950">
                                                Restricción de Compra: Requiere Cuenta de Piloto
                                            </Title>
                                            <span 
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5"
                                            >
                                                Licencia AHAC
                                            </span>
                                        </div>
                                        <Text className="text-xs text-amber-800 font-medium leading-relaxed">
                                            Como cliente solo puedes adquirir <strong>Micro Drones</strong>. Para comprar aeronaves en la categoría <strong>{selectedCategory.toUpperCase()}</strong> debes solicitar la conversión a una <strong>Cuenta de Piloto Registrado</strong>.
                                        </Text>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsPilotModalOpen(true)}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-4 shadow-sm transition flex items-center gap-2 shrink-0 border border-amber-700 cursor-pointer"
                                >
                                    <Award size={15} />
                                    <span>Cambiar a cuenta Piloto</span>
                                </button>
                            </div>
                        ) : (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-emerald-50 border border-emerald-200 p-3.5 text-emerald-900 flex items-center gap-2.5"
                            >
                                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                                <Text className="text-xs font-medium text-emerald-800">
                                    <strong>Categoría Habilitada:</strong> Puedes adquirir Micro Drones libremente para tareas de inspección técnica ligera.
                                </Text>
                            </div>
                        )}

                        {/* LISTA DE DRONES */}
                        <div className="grid grid-cols-1 gap-6">
                            {dronesFiltrados.map((drone) => (
                                <div
                                    key={drone.id}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className={`relative bg-white border transition-all flex flex-col md:flex-row overflow-visible shadow-sm hover:shadow-md ${
                                        drone.destacado
                                            ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/20"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    {drone.destacado && (
                                        <span 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#0E5E6F] text-white text-[10px] font-black px-3.5 py-1 uppercase tracking-wider shadow-md flex items-center gap-1 border border-white"
                                        >
                                            <Zap size={12} /> Destacado
                                        </span>
                                    )}

                                    <div 
                                        style={{ borderRadius: "4px 0 0 4px" }}
                                        className="relative bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200 w-full md:w-2/5 shrink-0 min-h-[200px] md:min-h-full overflow-hidden group"
                                    >
                                        <span 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-xs text-gray-800 border border-gray-200 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-xs"
                                        >
                                            {drone.etiqueta}
                                        </span>

                                        <img
                                            src={drone.imagen}
                                            alt={drone.nombre}
                                            style={{ borderRadius: "4px" }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLElement).style.display = "none";
                                            }}
                                        />
                                    </div>

                                    <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
                                        <div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <Title as="h3" className="text-xl font-extrabold text-gray-900">
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

                                        <div 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="bg-gray-50 p-3 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-400 text-[10px]">Carga / Capacidad</span>
                                                <span className="font-bold text-gray-800">{drone.especificaciones["Capacidad de carga"]}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-400 text-[10px]">Tiempo vuelo</span>
                                                <span className="font-bold text-gray-800">{drone.especificaciones["Tiempo de vuelo"]}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-400 text-[10px]">Velocidad máx</span>
                                                <span className="font-bold text-gray-800">{drone.especificaciones["Velocidad máxima"]}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                                            <button
                                                onClick={() => setSelectedDrone(drone)}
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <Info size={14} />
                                                Ficha técnica
                                            </button>

                                            {selectedCategory === "micro" ? (
                                                <button
                                                    onClick={() => iniciarCompra(drone)}
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className="flex-1 py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <ShoppingBag size={14} />
                                                    Comprar
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setIsPilotModalOpen(true)}
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <Lock size={14} />
                                                    Requiere cuenta Piloto
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* MODAL SOLICITUD DE AYUDA TÉCNICA (CON CONFIRMACIÓN INTERNA) */}
            {supportDrone && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
                    <div 
                        style={{ borderRadius: "4px" }}
                        className="bg-white max-w-lg w-full border border-gray-200 shadow-2xl overflow-hidden p-6 space-y-4"
                    >
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Headphones className="text-[#0E5E6F]" size={20} />
                                <h3 className="font-extrabold text-base text-gray-900">Solicitud de Ayuda Técnica</h3>
                            </div>
                            <button 
                                onClick={closeSupportModal} 
                                style={{ borderRadius: "4px" }}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!supportSubmitted ? (
                            <form onSubmit={handleSendSupportRequest} className="space-y-4">
                                {/* INFORMACIÓN RESUMIDA DEL DRON */}
                                <div className="bg-gray-50 p-3 rounded-[4px] border border-gray-200 flex items-center gap-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded shrink-0 border border-gray-300 overflow-hidden">
                                        <img src={supportDrone.imagen} alt={supportDrone.nombre} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-xs space-y-0.5">
                                        <p className="font-extrabold text-gray-900">{supportDrone.nombre}</p>
                                        <p className="text-gray-500">Modelo: <span className="font-medium text-gray-700">{supportDrone.modelo}</span></p>
                                        <p className="text-gray-500 font-mono text-[11px]">N/S: {supportDrone.numeroSerie}</p>
                                        <p className="text-gray-500">
                                            Estado: <span className="font-bold text-gray-700">{supportDrone.estado}</span> | Batería: <span className="font-bold text-gray-700">{supportDrone.bateria}%</span>
                                        </p>
                                    </div>
                                </div>

                                {/* CAMPO DE LA RAZÓN DE LA PETICIÓN */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">
                                        Razón de la petición
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={supportReason}
                                        onChange={(e) => setSupportReason(e.target.value)}
                                        placeholder="Describe brevemente el problema o requerimiento técnico..."
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeSupportModal}
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="px-4 py-2 border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="px-4 py-2 bg-[#0E5E6F] hover:bg-[#0A4552] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Send size={14} /> Enviar Solicitud
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* VISTA DE CONFIRMACIÓN DENTRO DEL MISMO MODAL */
                            <div className="py-4 text-center space-y-3 animate-in fade-in duration-200">
                                <div 
                                    style={{ borderRadius: "9999px" }}
                                    className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 size={28} />
                                </div>
                                <h4 className="font-extrabold text-base text-gray-900">¡Solicitud Enviada Exitosamente!</h4>
                                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                                    Hemos recibido la solicitud para el equipo <strong>{supportDrone.nombre}</strong>. Pronto un técnico se pondrá en contacto contigo.
                                </p>
                                <button
                                    onClick={closeSupportModal}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-3 px-5 py-2 bg-[#0E5E6F] text-white font-bold text-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Entendido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL FICHA TÉCNICA */}
            {selectedDrone && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200 text-left">
                    <div 
                        style={{ borderRadius: "4px" }}
                        className="bg-white max-w-4xl w-full border border-gray-200 shadow-2xl overflow-hidden flex flex-col my-auto"
                    >
                        <div className="px-5 py-3.5 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
                            <div className="flex items-center gap-3">
                                <Title as="h2" className="text-lg font-black text-gray-900">
                                    {selectedDrone.nombre}
                                </Title>
                                <span 
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="text-[10px] font-black tracking-wider bg-[#0E5E6F]/10 text-[#0E5E6F] px-2.5 py-0.5 border border-[#0E5E6F]/20"
                                >
                                    {selectedDrone.etiqueta}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedDrone(null)}
                                style={{ borderRadius: "4px" }}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                            <div 
                                style={{ borderRadius: "4px" }}
                                className="md:col-span-6 flex flex-col justify-between bg-gray-50 border border-gray-200 overflow-hidden min-h-[240px]"
                            >
                                <div className="relative w-full h-full min-h-[180px] bg-gray-100">
                                    <img
                                        src={selectedDrone.imagen}
                                        alt={selectedDrone.nombre}
                                        style={{ borderRadius: "4px" }}
                                        className="w-full h-full object-cover min-h-[200px]"
                                    />
                                </div>
                                <div className="p-3.5 bg-white border-t border-gray-200">
                                    <Text className="text-[10px] text-gray-400 font-extrabold block">
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

                            <div className="md:col-span-6 flex flex-col justify-between gap-3">
                                <div>
                                    <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 block">
                                        Especificaciones Técnicas
                                    </Text>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(selectedDrone.especificaciones).map(
                                            ([clave, valor]: any) => (
                                                <div
                                                    key={clave}
                                                    style={{ borderRadius: "4px" }}
                                                    className="p-2.5 bg-gray-50 border border-gray-200 flex flex-col justify-center"
                                                >
                                                    <span className="text-[9px] text-gray-400 font-bold truncate">
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

                                {selectedCategory !== "micro" && (
                                    <div 
                                        style={{ borderRadius: "4px" }}
                                        className="p-2.5 bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-amber-900 text-[11px] font-medium"
                                    >
                                        <ShieldAlert size={16} className="shrink-0 text-amber-600" />
                                        <span>Requiere Cuenta de Piloto verificada para la compra.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
                            {selectedCategory === "micro" ? (
                                <button
                                    onClick={() => iniciarCompra(selectedDrone)}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="px-4 py-2 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                                >
                                    <ShoppingBag size={14} />
                                    Comprar
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedDrone(null);
                                        setIsPilotModalOpen(true);
                                    }}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Lock size={14} />
                                    Requiere cuenta Piloto
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedDrone(null)}
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="px-4 py-2 border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL CAMBIO A CUENTA PILOTO */}
            {isPilotModalOpen && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div 
                        style={{ borderRadius: "4px" }}
                        className="bg-white max-w-md w-full border border-gray-200 shadow-2xl overflow-hidden p-6 space-y-4"
                    >
                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Award className="text-amber-600" size={20} />
                                <h3 className="font-extrabold text-base text-gray-900">Solicitud de cuenta de Piloto</h3>
                            </div>
                            <button 
                                onClick={resetPilotForm} 
                                style={{ borderRadius: "4px" }}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handlePilotSubmit} className="space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Para adquirir aeronaves de mayor categoría, ingresa tus credenciales y tu <strong>Código de la AHAC</strong> (Agencia Hondureña de Aeronáutica Civil).
                                </p>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        required
                                        value={pilotFormData.email}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, email: e.target.value })}
                                        placeholder="correo@ejemplo.com"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={pilotFormData.password}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, password: e.target.value })}
                                        placeholder="••••••••"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Código o Licencia AHAC</label>
                                    <input
                                        type="text"
                                        required
                                        value={pilotFormData.ahacCode}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, ahacCode: e.target.value.toUpperCase() })}
                                        placeholder="AHAC-PIL-2026-X"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs font-mono font-bold uppercase outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={resetPilotForm}
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="px-4 py-2 border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <Send size={14} /> Enviar Solicitud
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="py-4 text-center space-y-3">
                                <div 
                                    style={{ borderRadius: "9999px" }}
                                    className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 size={28} />
                                </div>
                                <h4 className="font-extrabold text-base text-gray-900">¡Solicitud Enviada Exitosamente!</h4>
                                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                                    Tu solicitud ha sido enviada. Un <strong>administrador</strong> revisará tu código de la AHAC y se pondrá en contacto contigo en breve para completar la validación de tu cuenta.
                                </p>
                                <button
                                    onClick={resetPilotForm}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-3 px-5 py-2 bg-[#0E5E6F] text-white font-bold text-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Entendido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// 4. Historial de Reportes (reports)
export const ClienteHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "vuelos" | "facturacion">("all");

  // Modales
  const [selectedVuelo, setSelectedVuelo] = useState<VueloItem | null>(null);
  const [selectedFactura, setSelectedFactura] = useState<FacturaItem | null>(null);

  // Paleta de colores Hexadecimales corporativos
  const HEX_COLORS = {
    brandGreen: "#0E5E6F",
    emerald100: "#D1FAE5",
    amber100: "#FEF3C7",
    blue100: "#DBEAFE",
    purple100: "#F3E8FF",
  };

  // Datos mockeados de Vuelos
  const historialVuelos: VueloItem[] = [
    {
      id: "V-2026-089",
      fecha: "18 Jul, 2026",
      ubicacion: "Zona Industrial Norte - Sector A",
      cobertura: "18.5 Ha",
      servicio: "Inspección Térmica de Estructuras",
      dron: "Matrice 300 RTK",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "80 metros",
        duracionVuelo: "42 minutos",
        resolucionGSD: "1.2 cm/px",
        condicionClimatica: "Despejado (Viento 8 km/h)",
      },
    },
    {
      id: "V-2026-082",
      fecha: "12 Jul, 2026",
      ubicacion: "Lote Las Camelias - Proyecto III",
      cobertura: "32.0 Ha",
      servicio: "Levantamiento Topográfico y Modelo 3D",
      dron: "Phantom 4 RTK",
      piloto: "Lic. Sofia Ramos",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "120 metros",
        duracionVuelo: "55 minutos",
        resolucionGSD: "2.1 cm/px",
        condicionClimatica: "Parcialmente nublado",
      },
    },
    {
      id: "V-2026-075",
      fecha: "02 Jul, 2026",
      ubicacion: "Perímetro Logístico Central",
      cobertura: "12.0 Ha",
      servicio: "Monitoreo Perimetral y Vigilancia Nocturna",
      dron: "Mavic 3 Enterprise Thermal",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "60 metros",
        duracionVuelo: "30 minutos",
        resolucionGSD: "1.8 cm/px",
        condicionClimatica: "Noche despejada",
      },
    },
    {
      id: "V-2026-068",
      fecha: "25 Jun, 2026",
      ubicacion: "Instalaciones Portuarias - Muelle B",
      cobertura: "25.0 Ha",
      servicio: "Mapeo Fotogramétrico de Activos",
      dron: "Matrice 300 RTK",
      piloto: "Tec. Jorge Salgado",
      estado: "Completado",
      reporteDisponible: false,
    },
  ];

  // Datos mockeados de Facturación
  const historialFacturacion: FacturaItem[] = [
    {
      id: "FAC-2026-041",
      fecha: "15 Jul, 2026",
      concepto: "Plan Corporativo Operativo (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Tarjeta Visa (•••• 4021)",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 2,434.78",
        impuesto: "L 365.22",
        numTransaccion: "TXN-9840219482",
      },
    },
    {
      id: "FAC-2026-033",
      fecha: "05 Jul, 2026",
      concepto: "Paquete Adicional de Horas de Vuelo Extra",
      tipo: "Servicio Extra",
      monto: "L 1,500.00",
      metodoPago: "Saldo Crédito",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 1,304.35",
        impuesto: "L 195.65",
        numTransaccion: "TXN-8812049102",
      },
    },
    {
      id: "FAC-2026-021",
      fecha: "15 Jun, 2026",
      concepto: "Plan Corporativo Operativo (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Transferencia Banco de Occidente",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 2,434.78",
        impuesto: "L 365.22",
        numTransaccion: "TXN-7730192841",
      },
    },
  ];

  // Filtrado simple
  const vuelosFiltrados = historialVuelos.filter(
    (v) =>
      v.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.dron.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const comprasFiltradas = historialFacturacion.filter(
    (f) =>
      f.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.metodoPago.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }} className="p-6 md:p-8 max-w-[1400px] mx-auto bg-white antialiased text-gray-800 space-y-6">
      {/* CABECERA PRINCIPAL */}
      <div className="pb-4 border-b-2 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="text-left space-y-0.5">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Historial de Reportes y Actividad
          </h1>
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            Registro consolidado de misiones de vuelo, equipos desplegados, áreas intervenidas y compras.
          </p>
        </div>

        <button
          style={{
            backgroundColor: HEX_COLORS.brandGreen,
            borderRadius: "4px",
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 text-white text-xs font-bold transition-all shadow-xs hover:opacity-90 cursor-pointer self-start md:self-auto"
        >
          <Download size={15} />
          <span>Exportar historial completo (PDF)</span>
        </button>
      </div>

      {/* MÉTRICAS CLAVE / RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Misiones Totales
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.blue100,
                color: "#1E40AF",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <Plane size={15} />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900 mb-0.5 whitespace-nowrap">24 Operaciones</p>
          <p className="text-[10px] text-gray-400 font-semibold">Registros consolidados</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Área Cubierta
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <MapPin size={15} />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900 mb-0.5 whitespace-nowrap">187.5 Ha</p>
          <p className="text-[10px] text-gray-400 font-semibold">Superficie analizada</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Reportes Generados
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.purple100,
                color: "#6B21A8",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <FileText size={15} />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900 mb-0.5 whitespace-nowrap">19 Archivos</p>
          <p className="text-[10px] text-gray-400 font-semibold">Documentos PDF listos</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-black text-gray-500 tracking-wider">
              Suscripción Activa
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center"
            >
              <CreditCard size={15} />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900 mb-0.5 whitespace-nowrap">Corporativo</p>
          <p className="text-[10px] text-gray-400 font-semibold">Plan de cobertura total</p>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por zona, dron, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "4px" }}
            className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-300 text-xs focus:outline-none focus:border-[#0E5E6F] font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto">
          {[
            { id: "all", label: "Todo" },
            { id: "vuelos", label: "Vuelos y misiones" },
            { id: "facturacion", label: "Facturas y pagos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              style={{
                borderRadius: "4px",
                backgroundColor: filterType === tab.id ? HEX_COLORS.brandGreen : "#FFFFFF",
                color: filterType === tab.id ? "#FFFFFF" : "#0E5E6F",
                borderColor: HEX_COLORS.brandGreen,
              }}
              className="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold border transition-all hover:opacity-90 cursor-pointer whitespace-nowrap"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECCIÓN 1: HISTORIAL DE VUELOS Y MISIONES */}
      {(filterType === "all" || filterType === "vuelos") && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs space-y-3 text-left"
        >
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div
                style={{
                  backgroundColor: HEX_COLORS.blue100,
                  color: "#1E40AF",
                  borderRadius: "4px",
                }}
                className="p-1.5"
              >
                <Plane size={16} />
              </div>
              <div>
                <h2 className="text-xs font-black text-gray-900 tracking-wider">
                  Historial de Misiones Operacionales
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Superficies monitoreadas, equipos utilizados y reportes técnicos.
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="text-[10px] font-bold px-2.5 py-1 border border-emerald-300"
            >
              {vuelosFiltrados.length} registros
            </span>
          </div>

          <div className="space-y-2">
            {vuelosFiltrados.map((vuelo) => (
              <div
                key={vuelo.id}
                style={{ borderRadius: "4px" }}
                className="border-2 border-gray-200 hover:border-gray-300 p-3.5 bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    style={{ borderRadius: "4px" }}
                    className="p-2 bg-white border border-gray-300 text-[#0E5E6F] shrink-0 mt-0.5 shadow-2xs"
                  >
                    <MapPin size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {vuelo.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <Calendar size={11} /> {vuelo.fecha}
                      </span>
                      <span
                        style={{
                          backgroundColor: HEX_COLORS.emerald100,
                          color: "#065F46",
                        }}
                        className="text-[10px] font-bold px-2 py-0.2 rounded-full"
                      >
                        {vuelo.cobertura}
                      </span>
                    </div>

                    <h3 className="text-xs font-black text-gray-900 truncate mt-1">
                      {vuelo.ubicacion}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-gray-600">
                      <span className="font-bold text-[#0E5E6F]">
                        {vuelo.servicio}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>
                        <strong className="text-gray-700">Equipo:</strong> {vuelo.dron}
                      </span>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <span className="hidden sm:inline">
                        <strong className="text-gray-700">Piloto:</strong> {vuelo.piloto}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-2 border-t md:border-t-0 pt-2 md:pt-0 border-gray-200 shrink-0">
                  <span
                    style={{
                      backgroundColor: HEX_COLORS.emerald100,
                      color: "#065F46",
                      borderRadius: "4px",
                    }}
                    className="inline-flex items-center px-2 py-0.5 border border-emerald-300 text-[10px] font-bold"
                  >
                    {vuelo.estado}
                  </span>

                  {vuelo.reporteDisponible ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedVuelo(vuelo)}
                        style={{ borderRadius: "4px" }}
                        className="p-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Eye size={13} />
                        <span className="hidden sm:inline">Ver</span>
                      </button>
                      <button
                        style={{
                          backgroundColor: HEX_COLORS.brandGreen,
                          borderRadius: "4px",
                        }}
                        className="p-1.5 text-white transition-opacity hover:opacity-90 cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400 italic font-medium">
                      Procesando informe...
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
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-4 shadow-xs space-y-3 text-left"
        >
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div
                style={{
                  backgroundColor: HEX_COLORS.amber100,
                  color: "#92400E",
                  borderRadius: "4px",
                }}
                className="p-1.5"
              >
                <CreditCard size={16} />
              </div>
              <div>
                <h2 className="text-xs font-black text-gray-900 tracking-wider">
                  Historial de Compras, Planes y Pagos
                </h2>
                <p className="text-[11px] text-gray-500 font-medium">
                  Comprobantes de suscripciones y contratación de servicios adicionales.
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="text-[10px] font-bold px-2.5 py-1 border border-amber-300"
            >
              {comprasFiltradas.length} facturas
            </span>
          </div>

          <div className="space-y-2">
            {comprasFiltradas.map((compra) => (
              <div
                key={compra.id}
                style={{ borderRadius: "4px" }}
                className="border-2 border-gray-200 hover:border-gray-300 p-3 bg-white transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    style={{ borderRadius: "4px" }}
                    className="p-2 bg-gray-100 text-gray-700 shrink-0 mt-0.5 border border-gray-200"
                  >
                    <FileText size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500">
                        {compra.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        • {compra.fecha}
                      </span>
                      <span
                        style={{
                          backgroundColor: `${HEX_COLORS.brandGreen}15`,
                          color: HEX_COLORS.brandGreen,
                          borderRadius: "4px",
                        }}
                        className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 border border-[#0E5E6F]/20"
                      >
                        {compra.tipo}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                      {compra.concepto}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      <strong>Método:</strong> {compra.metodoPago}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-black text-gray-900 block leading-tight">
                      {compra.monto}
                    </span>
                    <span
                      style={{
                        backgroundColor: HEX_COLORS.emerald100,
                        color: "#065F46",
                        borderRadius: "4px",
                      }}
                      className="text-[9px] font-bold px-1.5 py-0.2 border border-emerald-300 inline-block"
                    >
                      {compra.estado}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedFactura(compra)}
                    style={{ borderRadius: "4px" }}
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1 border border-gray-300"
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

      {/* SECCIÓN INFORMATIVA / SOPORTE GENERAL */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-gray-900 border-2 border-gray-800 p-4 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            style={{ borderRadius: "4px" }}
            className="p-2.5 bg-white/10 border border-white/10 shrink-0"
          >
            <ShieldCheck size={20} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white tracking-wider">
              ¿Requieres un Informe Técnico Oficial o Auditoría Especializada?
            </h3>
            <p className="text-[11px] text-gray-300 mt-0.5 font-medium">
              Generamos reportes detallados y firmados para certificaciones, cumplimiento normativo y seguros.
            </p>
          </div>
        </div>

        <button
          style={{
            borderRadius: "4px",
            backgroundColor: HEX_COLORS.brandGreen,
          }}
          className="px-3.5 py-2 text-white text-xs font-bold transition-all shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5 hover:opacity-90"
        >
          <span>Solicitar asistencia técnica</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* MODAL DETALLES DEL VUELO */}
      {selectedVuelo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            style={{ borderRadius: "4px" }}
            className="bg-white border-2 border-gray-300 max-w-lg w-full p-5 text-left space-y-4 shadow-xl"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-gray-900">
                Detalles del Vuelo {selectedVuelo.id}
              </h3>
              <button
                onClick={() => setSelectedVuelo(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>Ubicación:</strong> {selectedVuelo.ubicacion}</p>
              <p><strong>Servicio:</strong> {selectedVuelo.servicio}</p>
              <p><strong>Fecha de operación:</strong> {selectedVuelo.fecha}</p>
              <p><strong>Cobertura:</strong> {selectedVuelo.cobertura}</p>
              <p><strong>Dron asignado:</strong> {selectedVuelo.dron}</p>
              <p><strong>Piloto responsable:</strong> {selectedVuelo.piloto}</p>

              {selectedVuelo.detallesTecnicos && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded space-y-1">
                  <p className="font-bold text-gray-900 border-b pb-1 mb-1">
                    Parámetros de Telemetría y Misión
                  </p>
                  <p><strong>Altura promedio:</strong> {selectedVuelo.detallesTecnicos.alturaPromedio}</p>
                  <p><strong>Duración del vuelo:</strong> {selectedVuelo.detallesTecnicos.duracionVuelo}</p>
                  <p><strong>Resolución GSD:</strong> {selectedVuelo.detallesTecnicos.resolucionGSD}</p>
                  <p><strong>Condiciones climáticas:</strong> {selectedVuelo.detallesTecnicos.condicionClimatica}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVuelo(null)}
                style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.brandGreen }}
                className="px-4 py-1.5 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RECIBO DE FACTURA */}
      {selectedFactura && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            style={{ borderRadius: "4px" }}
            className="bg-white border-2 border-gray-300 max-w-md w-full p-5 text-left space-y-4 shadow-xl"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-gray-900">
                Comprobante de Pago {selectedFactura.id}
              </h3>
              <button
                onClick={() => setSelectedFactura(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>Concepto:</strong> {selectedFactura.concepto}</p>
              <p><strong>Fecha de pago:</strong> {selectedFactura.fecha}</p>
              <p><strong>Método utilizado:</strong> {selectedFactura.metodoPago}</p>
              <p><strong>Estado:</strong> {selectedFactura.estado}</p>

              {selectedFactura.detallesPago && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded space-y-1">
                  <p><strong>Subtotal:</strong> {selectedFactura.detallesPago.subtotal}</p>
                  <p><strong>Impuesto (15%):</strong> {selectedFactura.detallesPago.impuesto}</p>
                  <p className="font-bold text-gray-900 text-sm pt-1 border-t">
                    Total pagado: {selectedFactura.monto}
                  </p>
                  <p className="text-[10px] text-gray-400 pt-1">
                    Transacción ID: {selectedFactura.detallesPago.numTransaccion}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFactura(null)}
                style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.brandGreen }}
                className="px-4 py-1.5 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 5. Ayuda y Asistencia Granjeros (help)
export const ClienteHelpView = () => {
    const userAvatar = "src/img/granjero_perfil.png";

    const [chats, setChats] = useState<Chat[]>([
        {
            id: 'admin_central',
            name: 'Soporte Central',
            role: 'Administrador del sistema',
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
                    text: 'Hola, sí. Quería confirmar si la batería del dron #2 alcanza para cubrir las 187 manzanas en un solo vuelo.',
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
            role: 'Piloto de dron de campo',
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
                    text: 'Ya están procesados y subidos en la sección de reportes.',
                    time: 'Ayer'
                }
            ]
        },
        {
            id: 'admin_sofia',
            name: 'Lic. Sofía Mendoza',
            role: 'Admin - facturación y licencias',
            roleType: 'admin',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
            online: true,
            unreadCount: 2,
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: 'Hola Carlos, te confirmamos que la renovación del plan profesional fue procesada correctamente.',
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
            role: 'Piloto dron - sector sur',
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
            role: 'Admin - soporte técnico IoT',
            roleType: 'admin',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
            online: true,
            unreadCount: 0,
            messages: [
                {
                    id: 1,
                    sender: 'other',
                    text: 'Detectamos una breve desconexión en el sensor de humedad de la parcela 3, ya restablecimos el enlace.',
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
            role: 'Piloto - fitozoosanitario',
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

    // Estados para el modal de solicitud de ayuda
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [helpForm, setHelpForm] = useState({
        nombre: 'Carlos Sosa',
        correo: 'carlos.sosa@ejemplo.com',
        asunto: 'Incidencia técnica',
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
            asunto: 'Incidencia técnica',
            mensaje: ''
        });
    };

    const filteredChats = chats.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative font-roboto">
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
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-[4px] shadow-xs transition cursor-pointer"
                        >
                            <HelpCircle size={15} />
                            <span>Pedir ayuda</span>
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
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-[#0E5E6F] transition"
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
                                    className={`w-full p-4 flex items-center gap-3 transition text-left cursor-pointer ${isSelected ? 'bg-white border-l-4 border-[#0E5E6F]' : 'hover:bg-gray-100/80'
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="w-12 h-12 rounded-[4px] object-cover shadow-xs"
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${chat.online ? 'bg-emerald-500' : 'bg-gray-400'
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
                                            <span className="bg-[#0E5E6F] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] block">
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
                                    className="w-12 h-12 rounded-[4px] object-cover"
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
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-[4px] transition"
                                aria-label="Llamada de voz"
                            >
                                <Phone size={18} />
                            </button>

                            <button
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-[4px] transition"
                                aria-label="Videollamada"
                            >
                                <Video size={18} />
                            </button>

                            <button
                                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-[4px] transition"
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
                                            className="w-7 h-7 rounded-[4px] object-cover mb-1 shrink-0"
                                        />
                                    )}

                                    <div
                                        className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-[4px] text-sm ${isGranjero
                                                ? 'bg-[#0E5E6F] text-white'
                                                : 'bg-white text-gray-800 border border-gray-100 shadow-xs'
                                            }`}
                                    >
                                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                                        <div
                                            className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isGranjero ? 'text-cyan-100' : 'text-gray-400'
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
                                            className="w-7 h-7 rounded-[4px] object-cover mb-1 shrink-0 border border-gray-200"
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
                            className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-[4px] transition shrink-0"
                        >
                            <Paperclip size={20} />
                        </button>

                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-[4px] px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
                        />

                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="p-2.5 bg-[#0E5E6F] text-white rounded-[4px] hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
                        >
                            <Send size={18} />
                        </button>
                    </form>

                </div>
            </div>

            {/* ================= MODAL SOLICITAR AYUDA / SOPORTE ================= */}
            {isHelpModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-[4px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">

                        {/* Header del Modal */}
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]">
                                    <HelpCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-base">Solicitar Asistencia</h3>
                                    <p className="text-xs text-gray-500">Envía un ticket directo al equipo técnico</p>
                                </div>
                            </div>
                            <button
                                onClick={closeHelpModal}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-[4px] transition cursor-pointer"
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
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
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
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                            Categoría de la consulta
                                        </label>
                                        <select
                                            value={helpForm.asunto}
                                            onChange={(e) => setHelpForm({ ...helpForm, asunto: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                                        >
                                            <option value="Incidencia técnica">Incidencia técnica / falla en dron</option>
                                            <option value="Error en telemetría">Error en telemetría o sensores</option>
                                            <option value="Facturación">Facturación y planes</option>
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
                                            placeholder="Ej. El dron #2 presenta problemas de conexión GPS durante el vuelo..."
                                            value={helpForm.mensaje}
                                            onChange={(e) => setHelpForm({ ...helpForm, mensaje: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={closeHelpModal}
                                            className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-[4px] transition cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-[4px] shadow-xs transition cursor-pointer"
                                        >
                                            Enviar solicitud
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
                                        <h4 className="text-lg font-bold text-gray-900">¡Solicitud Recibida!</h4>
                                        <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                                            Hemos registrado tu reporte correctamente. Un especialista técnico revisará tu caso y se comunicará contigo a la brevedad.
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={closeHelpModal}
                                            className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer"
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

// Perfil de cliente
export const ClienteProfileView = ({ onLogout }: ClienteProfileViewProps) => {
  // Datos de prueba iniciales
  const [profileData] = useState({
    initials: "MA",
    name: "Mario Alberto Ica",
    email: "mario.ica@agroaguante.hn",
    phone: "+504 9788-4411",
    avatar: "src/img/granjero_perfil.png",
    avatarBg: "bg-[#0E5E6F] text-white",
    roleLabel: "Cliente · Productor agrícola",
    location: "Valle del Aguán, Olanchito, Yoro",
    area: "1,150 ha",
    services: "24 misiones contratadas",
    standing: "Activo",
    roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30 hover:bg-[#0E5E6F]/20",
  });

  // Modales y Estados UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [isPilotSubmitted, setIsPilotSubmitted] = useState(false); // <--- Controla el mensaje de éxito
  const [showPassword, setShowPassword] = useState(false);
  const [showPilotPassword, setShowPilotPassword] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Datos dummy para el modal de edición normal
  const [editForm, setEditForm] = useState({
    phone: "+504 9788-4411",
    email: "mario.ica@agroaguante.hn",
    password: "password123",
  });

  // Datos dummy para el modal de Piloto AHAC
  const [pilotForm, setPilotForm] = useState({
    email: "piloto.mario@agroaguante.hn",
    password: "password123",
    ahacCode: "AHAC-2026-8891",
  });

  const handleOpenPilotModal = () => {
    setIsPilotSubmitted(false); // Resetear estado de envío al abrir
    setIsPilotModalOpen(true);
  };

  const handleSendPilotData = () => {
    setIsPilotSubmitted(true); // Cambia la vista interna del modal al mensaje
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
            {/* BOTÓN CLIENTE / CAMBIO A PILOTO */}
            <button
              type="button"
              onClick={handleOpenPilotModal}
              className={`text-xs font-black tracking-wider px-3.5 py-1.5 rounded-[4px] border-2 flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-xs ${profileData.roleColor}`}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              <span>{profileData.roleLabel}</span>
              <span className="text-[10px] bg-[#0E5E6F] text-white px-1.5 py-0.5 rounded-[2px] font-bold">
                Cambiar
              </span>
            </button>
          </div>
        </div>

        {/* MÉTRICAS PRINCIPALES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white border-b-2 border-gray-200 text-left flex-1 items-center">
          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                <MapPin size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Base Regional
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
              {profileData.location}
            </span>
          </div>

          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                <Layers size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Extensión
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
              {profileData.area}
            </span>
          </div>

          <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
            <div className="flex items-center gap-2">
              <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                <BarChart2 size={16} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Actividad
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-800 font-bold block truncate leading-tight mt-0.5">
              {profileData.services}
            </span>
          </div>

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
              onClick={() => setIsModalOpen(true)}
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
            Base Olanchito, Yoro
          </span>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 py-1 px-3 rounded-[4px] border-2 border-[#B8001F] bg-white hover:bg-[#B8001F]/10 text-[#B8001F] transition-all active:scale-95 shadow-xs cursor-pointer"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <LogOut size={13} className="shrink-0 text-[#B8001F]" />
            <span className="text-xs font-black uppercase tracking-wider">
              SALIR
            </span>
          </button>
        </div>
      </div>

      {/* MODAL 1: EDICIÓN GENERAL (MOCKUP VISUAL) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border-2 border-gray-300 rounded-[4px] p-5 w-full max-w-md shadow-xl space-y-4 text-left">
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

            <div className="space-y-3">
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
                        className="px-2.5 py-1 text-[11px] font-bold bg-white border-2 border-gray-200 rounded-[4px] text-gray-700 flex items-center gap-1 shadow-xs"
                      >
                        <Upload size={12} className="text-[#0E5E6F]" /> Seleccionar
                      </button>
                      <span className="text-[10px] text-gray-500 font-semibold truncate">
                        foto_perfil.jpg
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
                  className="py-1.5 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-[4px] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <X size={13} /> Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-1.5 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-[4px] text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                >
                  <Save size={13} /> Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: PILOTO AHAC (MOCKUP CON CONFIRMACIÓN) */}
      {isPilotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border-2 border-gray-300 rounded-[4px] p-5 w-full max-w-md shadow-xl space-y-4 text-left">
            
            {/* Si aún NO se ha enviado el formulario */}
            {!isPilotSubmitted ? (
              <>
                <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#0E5E6F]/10 rounded-[4px] text-[#0E5E6F]">
                      <Plane size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-800 normal-case leading-tight">
                        Cambiar a una cuenta de  Piloto
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Agencia Hondureña de Aeronáutica Civil
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPilotModalOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-[4px] transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail size={13} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={pilotForm.email}
                        onChange={(e) => setPilotForm({ ...pilotForm, email: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock size={13} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type={showPilotPassword ? "text" : "password"}
                        value={pilotForm.password}
                        onChange={(e) => setPilotForm({ ...pilotForm, password: e.target.value })}
                        className="w-full pl-8 pr-8 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPilotPassword(!showPilotPassword)}
                        className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPilotPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                      Código de la AHAC
                    </label>
                    <div className="relative">
                      <ShieldCheck size={13} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={pilotForm.ahacCode}
                        onChange={(e) => setPilotForm({ ...pilotForm, ahacCode: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800 uppercase"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsPilotModalOpen(false)}
                      className="py-1.5 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-[4px] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <X size={13} /> Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSendPilotData}
                      className="py-1.5 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-[4px] text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Plane size={13} /> Validar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* VISTA DE CONFIRMACIÓN AL ENVIAR */
              <div className="py-4 text-center space-y-4 animate-in zoom-in-95 duration-150">
                <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-black text-gray-900">
                    ¡Solicitud Enviada Exitosamente!
                  </h4>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed px-2">
                    Tus datos y credenciales AHAC han sido registrados. Un administrador revisará la información y se pondrá en contacto contigo a la brevedad.
                  </p>
                </div>

                <div className="p-2.5 bg-amber-50 border-2 border-amber-200 rounded-[4px] flex items-center gap-2 text-left">
                  <Clock size={16} className="text-amber-600 shrink-0" />
                  <span className="text-[11px] font-bold text-amber-800">
                    Tiempo estimado de verificación: 24 a 48 horas hábiles.
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsPilotModalOpen(false)}
                    className="w-full py-2 bg-[#0E5E6F] text-white font-bold rounded-[4px] text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};