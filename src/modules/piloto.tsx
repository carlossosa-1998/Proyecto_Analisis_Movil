import { Activity, AlertOctagon, AlertTriangle, BarChart2, Battery, BatteryCharging, Calendar, Lock, Camera, Check, CheckCheck, CheckCircle, CheckCircle2, Clock, Compass, Cpu, Download, Droplets, Edit2, Eye, EyeOff, FileText, Info, Layers, LogOut, Mail, MapPin, MoreVertical, Navigation, Paperclip, Pause, Phone, Play, RefreshCw, RotateCw, Save, Search, Send, Settings, Signal, User, Video, Wifi, Wind, Wrench, X, XCircle, Award, BarChart3, Bell, Briefcase, ChevronRight, DollarSign, Film, Home, Radio, SearchIcon, ShieldCheck, Sliders, Sparkles, TrendingUp, Zap, FileDown, Upload, Loader2, AlertCircle, ArrowLeft, Building2, CreditCard, QrCode, Tag, UserCheck, Wallet, Edit3, Trash2, Headphones, Plane, ShoppingBag } from 'lucide-react';
import React, { useState, useEffect } from 'react';

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

export type TabType = 
    | "apoyo-tecnico"
    | "cobros-plataforma"
    | "beneficios-operativos"
    | "alianzas-comerciales";

export type MissionCategory = "fumigacion" | "monitoreo" | "fotogrametria";
export type MissionStatus = "Pendiente" | "Aceptada" | "En Curso" | "Completada" | "Rechazada";

export interface Drone {
    id: string;
    nombre: string;
    etiqueta: string;
    categoria: "micro" | "mini" | "pequeno" | "grande";
    imagen: string;
    precio: string;
    descripcion: string;
    destacado: boolean;
    especificaciones: Record<string, string>;
}

export interface UserDrone {
    id: string;
    nombre: string;
    modelo: string;
    categoria: string;
    imagen: string;
    estado: string;
    bateria: number;
    horasVuelo: number;
    ultimaRevision: string;
    numeroSerie: string;
}

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

interface PilotoProfileViewProps {
    onLogout: () => void;
}

interface PilotoDashboardProps {
  onNavigate?: (view: string) => void;
}

export interface Mission {
  id: string;
  category: MissionCategory;
  clientName: string;
  location: string;
  areaSize: string;
  date: string;
  status: MissionStatus;
  droneAssigned: string;
  cropType: string;
  description: string;
}

// 1. Dashboard del Piloto
export const PilotoDashboardView: React.FC<PilotoDashboardProps> = ({ onNavigate }) => {
  // Pestaña principal: "personal" (Recreativo, hogar, proyectos personales) vs "trabajo" (Contratos y Terceros)
  const [mainMode, setMainMode] = useState<"personal" | "trabajo">("personal");

  // Pestañas secundarias adaptables al modo
  const [activeTab, setActiveTab] = useState<string>("fotografia");
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

  // Notificaciones exclusivas del piloto
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "aprobacion",
      titulo: "Contrato aprobado",
      detalle: "Constructora Horizon confirmó la inspección de obra #CTR-902.",
      tiempo: "Hace 15 min",
      colorBg: HEX_COLORS.emerald100,
      textColor: "#065F46",
      icono: <CheckCircle2 size={13} />,
      unread: true,
    },
    {
      id: 2,
      tipo: "alerta",
      titulo: "Firmware disponible",
      detalle: "Nueva actualización v2.0.4 para el dron DJI Mavic 3 Pro.",
      tiempo: "Hace 1 hora",
      colorBg: HEX_COLORS.blue100,
      textColor: "#1E40AF",
      icono: <Sparkles size={13} />,
      unread: true,
    },
    {
      id: 3,
      tipo: "mantenimiento",
      titulo: "Baterías en almacenamiento",
      detalle: "Las baterías 3 y 4 entraron en modo de autodescarga preventiva.",
      tiempo: "Hace 4 horas",
      colorBg: HEX_COLORS.amber100,
      textColor: "#92400E",
      icono: <BatteryCharging size={13} />,
      unread: false,
    },
    {
      id: 4,
      tipo: "licencia",
      titulo: "Renovación anual",
      detalle: "Tu seguro de responsabilidad civil para uso comercial vence en 30 días.",
      tiempo: "Ayer, 05:10 PM",
      colorBg: HEX_COLORS.purple100,
      textColor: "#6B21A8",
      icono: <ShieldCheck size={13} />,
      unread: false,
    },
  ]);

  const handleNavigate = (view: string) => {
    if (typeof onNavigate === "function") {
      onNavigate(view);
    }
  };

  // Cambiar pestaña secundaria cuando se cambia de modo principal
  const handleMainModeChange = (mode: "personal" | "trabajo") => {
    setMainMode(mode);
    setActiveTab(mode === "personal" ? "fotografia" : "comercial_agri");
  };

  // ==========================================
  // DATOS MOCK - USO PERSONAL (General: Hobbies, Hogar, FPV, etc.)
  // ==========================================
  const chartDataPersonal: Record<
    string,
    Record<string, { label: string; valor: number; detalle: string; unidad: string }[]>
  > = {
    fotografia: {
      semana: [
        { label: "Lun", valor: 2, detalle: "12 fotos HD tomadas", unidad: "Vuelos" },
        { label: "Mar", valor: 0, detalle: "Sin actividad", unidad: "Vuelos" },
        { label: "Mié", valor: 4, detalle: "Atardecer en la playa", unidad: "Vuelos" },
        { label: "Jue", valor: 1, detalle: "Prueba de filtro ND", unidad: "Vuelos" },
        { label: "Vie", valor: 5, detalle: "Sesión fotográfica montaña", unidad: "Vuelos" },
        { label: "Sáb", valor: 8, detalle: "Evento familiar", unidad: "Vuelos" },
        { label: "Dom", valor: 6, detalle: "PAISAJES 4K", unidad: "Vuelos" },
      ],
      mes: [
        { label: "Ene", valor: 18, detalle: "240 fotos procesadas", unidad: "Horas Vuelo" },
        { label: "Feb", valor: 25, detalle: "310 fotos procesadas", unidad: "Horas Vuelo" },
        { label: "Mar", valor: 14, detalle: "180 fotos procesadas", unidad: "Horas Vuelo" },
        { label: "Abr", valor: 32, detalle: "420 fotos procesadas", unidad: "Horas Vuelo" },
        { label: "May", valor: 40, detalle: "500 fotos procesadas", unidad: "Horas Vuelo" },
        { label: "Jun", valor: 28, detalle: "350 fotos procesadas", unidad: "Horas Vuelo" },
      ],
      anio: [
        { label: "2023", valor: 120, detalle: "Proyectos de viaje", unidad: "Horas Vuelo" },
        { label: "2024", valor: 210, detalle: "Colección personal", unidad: "Horas Vuelo" },
        { label: "2025", valor: 340, detalle: "Portafolio fotográfico", unidad: "Horas Vuelo" },
        { label: "2026", valor: 410, detalle: "Galería UHD personal", unidad: "Horas Vuelo" },
      ],
    },
    inspeccion_hogar: {
      semana: [
        { label: "Lun", valor: 1, detalle: "Techo residencia", unidad: "Inspecciones" },
        { label: "Mar", valor: 0, detalle: "Sin novedades", unidad: "Inspecciones" },
        { label: "Mié", valor: 2, detalle: "Paneles solares", unidad: "Inspecciones" },
        { label: "Jue", valor: 0, detalle: "Sin novedades", unidad: "Inspecciones" },
        { label: "Vie", valor: 1, detalle: "Canaletas de lluvia", unidad: "Inspecciones" },
        { label: "Sáb", valor: 3, detalle: "Cercado perimetral", unidad: "Inspecciones" },
        { label: "Dom", valor: 0, detalle: "Sin actividades", unidad: "Inspecciones" },
      ],
      mes: [
        { label: "Ene", valor: 4, detalle: "Mantenimiento preventivo", unidad: "Chequeos" },
        { label: "Feb", valor: 6, detalle: "Revisiones térmicas", unidad: "Chequeos" },
        { label: "Mar", valor: 3, detalle: "Verificación de grietas", unidad: "Chequeos" },
        { label: "Abr", valor: 8, detalle: "Limpieza paneles", unidad: "Chequeos" },
        { label: "May", valor: 5, detalle: "Estructura de madera", unidad: "Chequeos" },
        { label: "Jun", valor: 9, detalle: "Post-tormenta chequeo", unidad: "Chequeos" },
      ],
      anio: [
        { label: "2023", valor: 20, detalle: "Mantenimiento propiedad", unidad: "Revisiones" },
        { label: "2024", valor: 35, detalle: "Mejoras del hogar", unidad: "Revisiones" },
        { label: "2025", valor: 48, detalle: "Inspecciones generales", unidad: "Revisiones" },
        { label: "2026", valor: 62, detalle: "Seguridad y techos", unidad: "Revisiones" },
      ],
    },
    carreras_fpv: {
      semana: [
        { label: "Lun", valor: 10, detalle: "Práctica de acrobacias", unidad: "Minutos Vuelo" },
        { label: "Mar", valor: 25, detalle: "Circuito de obstáculos", unidad: "Minutos Vuelo" },
        { label: "Mié", valor: 15, detalle: "Ajuste PIDs", unidad: "Minutos Vuelo" },
        { label: "Jue", valor: 30, detalle: "Pista abierta", unidad: "Minutos Vuelo" },
        { label: "Vie", valor: 45, detalle: "Práctica nocturna LED", unidad: "Minutos Vuelo" },
        { label: "Sáb", valor: 60, detalle: "Competencia amistosa", unidad: "Minutos Vuelo" },
        { label: "Dom", valor: 50, detalle: "Prácticas de velocidad", unidad: "Minutos Vuelo" },
      ],
      mes: [
        { label: "Ene", valor: 120, detalle: "15 baterías quemadas", unidad: "Vuelos FPV" },
        { label: "Feb", valor: 180, detalle: "22 baterías quemadas", unidad: "Vuelos FPV" },
        { label: "Mar", valor: 140, detalle: "Entrenamiento Freestyle", unidad: "Vuelos FPV" },
        { label: "Abr", valor: 220, detalle: "Pistas técnicas", unidad: "Vuelos FPV" },
        { label: "May", valor: 310, detalle: "Tiempos récord", unidad: "Vuelos FPV" },
        { label: "Jun", valor: 290, detalle: "Prácticas intensivas", unidad: "Vuelos FPV" },
      ],
      anio: [
        { label: "2023", valor: 500, detalle: "Categoría Principiante", unidad: "Carreras" },
        { label: "2024", valor: 1200, detalle: "Categoría Amateur", unidad: "Carreras" },
        { label: "2025", valor: 1800, detalle: "Liga Regional FPV", unidad: "Carreras" },
        { label: "2026", valor: 2400, detalle: "Liga Nacional Pro", unidad: "Carreras" },
      ],
    },
    videografia: {
      semana: [
        { label: "Lun", valor: 1, detalle: "B-Roll para YouTube", unidad: "Proyectos" },
        { label: "Mar", valor: 2, detalle: "Tomas cinemáticas corto", unidad: "Proyectos" },
        { label: "Mié", valor: 0, detalle: "Edición en PC", unidad: "Proyectos" },
        { label: "Jue", valor: 1, detalle: "Video de viajes", unidad: "Proyectos" },
        { label: "Vie", valor: 3, detalle: "Timelapse urbano", unidad: "Proyectos" },
        { label: "Sáb", valor: 4, detalle: "Documental personal", unidad: "Proyectos" },
        { label: "Dom", valor: 2, detalle: "Tomas de atardecer 6K", unidad: "Proyectos" },
      ],
      mes: [
        { label: "Ene", valor: 8, detalle: "12 GB de metraje", unidad: "Videos HD" },
        { label: "Feb", valor: 12, detalle: "25 GB de metraje", unidad: "Videos HD" },
        { label: "Mar", valor: 15, detalle: "30 GB de metraje", unidad: "Videos HD" },
        { label: "Abr", valor: 22, detalle: "50 GB de metraje", unidad: "Videos HD" },
        { label: "May", valor: 19, detalle: "42 GB de metraje", unidad: "Videos HD" },
        { label: "Jun", valor: 28, detalle: "65 GB de metraje", unidad: "Videos HD" },
      ],
      anio: [
        { label: "2023", valor: 45, detalle: "Vlogs y recuerdos", unidad: "Videos" },
        { label: "2024", valor: 90, detalle: "Cortometrajes", unidad: "Videos" },
        { label: "2025", valor: 160, detalle: "Canal personal", unidad: "Videos" },
        { label: "2026", valor: 230, detalle: "Reel profesional", unidad: "Videos" },
      ],
    },
    exploracion: {
      semana: [
        { label: "Lun", valor: 3, detalle: "Mapeo de sendero", unidad: "Rutas" },
        { label: "Mar", valor: 5, detalle: "Exploración de cañón", unidad: "Rutas" },
        { label: "Mié", valor: 2, detalle: "Reconocimiento de río", unidad: "Rutas" },
        { label: "Jue", valor: 4, detalle: "Vuelo de altura", unidad: "Rutas" },
        { label: "Vie", valor: 6, detalle: "Llegada a cumbre", unidad: "Rutas" },
        { label: "Sáb", valor: 8, detalle: "Exploración de bosque", unidad: "Rutas" },
        { label: "Dom", valor: 3, detalle: "Ruta de campamento", unidad: "Rutas" },
      ],
      mes: [
        { label: "Ene", valor: 15, detalle: "120 km recorridos", unidad: "Km Vuelados" },
        { label: "Feb", valor: 22, detalle: "180 km recorridos", unidad: "Km Vuelados" },
        { label: "Mar", valor: 30, detalle: "240 km recorridos", unidad: "Km Vuelados" },
        { label: "Abr", valor: 45, detalle: "320 km recorridos", unidad: "Km Vuelados" },
        { label: "May", valor: 50, detalle: "390 km recorridos", unidad: "Km Vuelados" },
        { label: "Jun", valor: 65, detalle: "480 km recorridos", unidad: "Km Vuelados" },
      ],
      anio: [
        { label: "2023", valor: 200, detalle: "1,500 km mapeados", unidad: "Rutas" },
        { label: "2024", valor: 450, detalle: "3,200 km mapeados", unidad: "Rutas" },
        { label: "2025", valor: 780, detalle: "5,800 km mapeados", unidad: "Rutas" },
        { label: "2026", valor: 1100, detalle: "8,400 km mapeados", unidad: "Rutas" },
      ],
    },
  };

  // ==========================================
  // DATOS MOCK - USO COMERCIAL / TRABAJO PARA TERCEROS
  // ==========================================
  const chartDataTrabajo: Record<
    string,
    Record<string, { label: string; valor: number; detalle: string; unidad: string }[]>
  > = {
    comercial_agri: {
      semana: [
        { label: "Lun", valor: 45, detalle: "L33,000 cobrados", unidad: "Hectáreas" },
        { label: "Mar", valor: 70, detalle: "L51,500 cobrados", unidad: "Hectáreas" },
        { label: "Mié", valor: 60, detalle: "L44,100 cobrados", unidad: "Hectáreas" },
        { label: "Jue", valor: 90, detalle: "L66,150 cobrados", unidad: "Hectáreas" },
        { label: "Vie", valor: 110, detalle: "L80,850 cobrados", unidad: "Hectáreas" },
        { label: "Sáb", valor: 40, detalle: "L29,400 cobrados", unidad: "Hectáreas" },
        { label: "Dom", valor: 0, detalle: "Mantenimiento de flota", unidad: "Hectáreas" },
      ],
      mes: [
        { label: "Ene", valor: 310, detalle: "L227,850 facturados", unidad: "Hectáreas" },
        { label: "Feb", valor: 450, detalle: "L330,750 facturados", unidad: "Hectáreas" },
        { label: "Mar", valor: 380, detalle: "L279,300 facturados", unidad: "Hectáreas" },
        { label: "Abr", valor: 520, detalle: "L382,200 facturados", unidad: "Hectáreas" },
        { label: "May", valor: 680, detalle: "L499,800 facturados", unidad: "Hectáreas" },
        { label: "Jun", valor: 750, detalle: "L551,250 facturados", unidad: "Hectáreas" },
      ],
      anio: [
        { label: "2023", valor: 2100, detalle: "L1,543,500 acumulados", unidad: "Hectáreas" },
        { label: "2024", valor: 3800, detalle: "L2,793,000 acumulados", unidad: "Hectáreas" },
        { label: "2025", valor: 5900, detalle: "L4,336,500 acumulados", unidad: "Hectáreas" },
        { label: "2026", valor: 8200, detalle: "L6,027,000 acumulados", unidad: "Hectáreas" },
      ],
    },
    inspeccion_industrial: {
      semana: [
        { label: "Lun", valor: 2, detalle: "Torres de alta tensión", unidad: "Estructuras" },
        { label: "Mar", valor: 4, detalle: "Paneles solares parque A", unidad: "Estructuras" },
        { label: "Mié", valor: 3, detalle: "Turbina eólica #4", unidad: "Estructuras" },
        { label: "Jue", valor: 5, detalle: "Puente peatonal norte", unidad: "Estructuras" },
        { label: "Vie", valor: 6, detalle: "Chimeneas industriales", unidad: "Estructuras" },
        { label: "Sáb", valor: 1, detalle: "Techo nave almacén", unidad: "Estructuras" },
        { label: "Dom", valor: 0, detalle: "Sin servicio", unidad: "Estructuras" },
      ],
      mes: [
        { label: "Ene", valor: 15, detalle: "L294,000 contrato", unidad: "Informes 3D" },
        { label: "Feb", valor: 22, detalle: "L431,200 contrato", unidad: "Informes 3D" },
        { label: "Mar", valor: 18, detalle: "L352,800 contrato", unidad: "Informes 3D" },
        { label: "Abr", valor: 30, detalle: "L588,000 contrato", unidad: "Informes 3D" },
        { label: "May", valor: 35, detalle: "L686,000 contrato", unidad: "Informes 3D" },
        { label: "Jun", valor: 42, detalle: "L823,200 contrato", unidad: "Informes 3D" },
      ],
      anio: [
        { label: "2023", valor: 110, detalle: "Sector Minero e Ind.", unidad: "Proyectos" },
        { label: "2024", valor: 230, detalle: "Sector Energético", unidad: "Proyectos" },
        { label: "2025", valor: 390, detalle: "Infraestructura Vial", unidad: "Proyectos" },
        { label: "2026", valor: 510, detalle: "Auditorías Térmicas", unidad: "Proyectos" },
      ],
    },
    audiovisual_pro: {
      semana: [
        { label: "Lun", valor: 1, detalle: "Comercial de TV marcas", unidad: "Rodajes" },
        { label: "Mar", valor: 0, detalle: "Pre-producción", unidad: "Rodajes" },
        { label: "Mié", valor: 2, detalle: "Grabación hotel resort", unidad: "Rodajes" },
        { label: "Jue", valor: 1, detalle: "Video musical urbano", unidad: "Rodajes" },
        { label: "Vie", valor: 3, detalle: "Transmisión deportiva", unidad: "Rodajes" },
        { label: "Sáb", valor: 4, detalle: "Boda VIP de lujo", unidad: "Rodajes" },
        { label: "Dom", valor: 2, detalle: "Tomas aéreas automotriz", unidad: "Rodajes" },
      ],
      mes: [
        { label: "Ene", valor: 8, detalle: "120 hrs grabadas en 8K", unidad: "Contratos" },
        { label: "Feb", valor: 14, detalle: "200 hrs grabadas en 8K", unidad: "Contratos" },
        { label: "Mar", valor: 11, detalle: "160 hrs grabadas en 8K", unidad: "Contratos" },
        { label: "Abr", valor: 20, detalle: "280 hrs grabadas en 8K", unidad: "Contratos" },
        { label: "May", valor: 25, detalle: "350 hrs grabadas en 8K", unidad: "Contratos" },
        { label: "Jun", valor: 30, detalle: "410 hrs grabadas en 8K", unidad: "Contratos" },
      ],
      anio: [
        { label: "2023", valor: 60, detalle: "Productoras locales", unidad: "Eventos" },
        { label: "2024", valor: 140, detalle: "Cine y Televisión", unidad: "Eventos" },
        { label: "2025", valor: 220, detalle: "Festivales y Marcas", unidad: "Eventos" },
        { label: "2026", valor: 310, detalle: "Streaming en directo", unidad: "Eventos" },
      ],
    },
    topografia_3d: {
      semana: [
        { label: "Lun", valor: 120, detalle: "Nube de puntos Lidar", unidad: "Hectáreas" },
        { label: "Mar", valor: 200, detalle: "Modelo digital terreno", unidad: "Hectáreas" },
        { label: "Mié", valor: 150, detalle: "Curvas de nivel urbanismo", unidad: "Hectáreas" },
        { label: "Jue", valor: 310, detalle: "Levantamiento cantera", unidad: "Hectáreas" },
        { label: "Vie", valor: 280, detalle: "Cálculo volumétrico", unidad: "Hectáreas" },
        { label: "Sáb", valor: 90, detalle: "Loteo residencial", unidad: "Hectáreas" },
        { label: "Dom", valor: 0, detalle: "Procesamiento Pix4D", unidad: "Hectáreas" },
      ],
      mes: [
        { label: "Ene", valor: 850, detalle: "12 informes CAD", unidad: "Ha Mapeadas" },
        { label: "Feb", valor: 1200, detalle: "18 informes CAD", unidad: "Ha Mapeadas" },
        { label: "Mar", valor: 1100, detalle: "15 informes CAD", unidad: "Ha Mapeadas" },
        { label: "Abr", valor: 1750, detalle: "25 informes CAD", unidad: "Ha Mapeadas" },
        { label: "May", valor: 2100, detalle: "30 informes CAD", unidad: "Ha Mapeadas" },
        { label: "Jun", valor: 2600, detalle: "38 informes CAD", unidad: "Ha Mapeadas" },
      ],
      anio: [
        { label: "2023", valor: 5400, detalle: "Desarrollos urbanos", unidad: "Ha Totales" },
        { label: "2024", valor: 11200, detalle: "Proyectos viales", unidad: "Ha Totales" },
        { label: "2025", valor: 18500, detalle: "Catastro municipal", unidad: "Ha Totales" },
        { label: "2026", valor: 24000, detalle: "Infraestructura nacional", unidad: "Ha Totales" },
      ],
    },
    seguridad_vigilancia: {
      semana: [
        { label: "Lun", valor: 4, detalle: "Rondín nocturno fábrica", unidad: "Patrullajes" },
        { label: "Mar", valor: 6, detalle: "Monitoreo perimetral B", unidad: "Patrullajes" },
        { label: "Mié", valor: 3, detalle: "Detección térmica fugas", unidad: "Patrullajes" },
        { label: "Jue", valor: 8, detalle: "Coordinación con personal", unidad: "Patrullajes" },
        { label: "Vie", valor: 10, detalle: "Vigilancia de evento", unidad: "Patrullajes" },
        { label: "Sáb", valor: 12, detalle: "Control de acceso puerto", unidad: "Patrullajes" },
        { label: "Dom", valor: 5, detalle: "Supervisión de obras", unidad: "Patrullajes" },
      ],
      mes: [
        { label: "Ene", valor: 45, detalle: "Cero brechas de seguridad", unidad: "Horas Vigiladas" },
        { label: "Feb", valor: 70, detalle: "3 alertas térmicas", unidad: "Horas Vigiladas" },
        { label: "Mar", valor: 60, detalle: "Verificación de cercos", unidad: "Horas Vigiladas" },
        { label: "Abr", valor: 95, detalle: "Servicios 24/7 en puerto", unidad: "Horas Vigiladas" },
        { label: "May", valor: 120, detalle: "Monitoreo de convoys", unidad: "Horas Vigiladas" },
        { label: "Jun", valor: 140, detalle: "12 intervenciones exitosas", unidad: "Horas Vigiladas" },
      ],
      anio: [
        { label: "2023", valor: 350, detalle: "Empresas privadas", unidad: "Patrullajes" },
        { label: "2024", valor: 780, detalle: "Parques industriales", unidad: "Patrullajes" },
        { label: "2025", valor: 1300, detalle: "Zonas logísticas", unidad: "Patrullajes" },
        { label: "2026", valor: 1850, detalle: "Contratos gubernamentales", unidad: "Patrullajes" },
      ],
    },
  };

  // ==========================================
  // REGISTROS DE TABLAS DETALLADAS
  // ==========================================
  const datosRegistrosPersonal: Record<string, any[]> = {
    fotografia: [
      {
        id: "REC-401",
        fecha: "2026-07-25",
        ubicacion: "Mirador del Valle - Sector Norte",
        objetivo: "Captura de atardecer en RAW de alta resolución (48MP)",
        dron: "DJI Mavic 3 Pro",
        duracion: "35 min",
        cobertura: "4.2 km dist.",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "REC-398",
        fecha: "2026-07-21",
        ubicacion: "Lago Azul",
        objetivo: "Fotografía aérea con filtros CPL y larga exposición",
        dron: "Autel EVO Lite+",
        duracion: "50 min",
        cobertura: "8.1 km dist.",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "REC-382",
        fecha: "2026-07-15",
        ubicacion: "Bosque Los Pinos",
        objetivo: "Prueba de seguimiento de sujeto y composición 360",
        dron: "DJI Mini 4 Pro",
        duracion: "22 min",
        cobertura: "2.0 km dist.",
        estado: "En alerta",
        tagColorBg: HEX_COLORS.amber100,
        tagTextColor: "#92400E",
      },
    ],
    inspeccion_hogar: [
      {
        id: "HOG-102",
        fecha: "2026-07-24",
        ubicacion: "Residencia Principal - Techo y Chimenea",
        objetivo: "Revisión de tejas sueltas e infiltraciones de agua pre-invierno",
        dron: "DJI Mini 3 Pro",
        duracion: "18 min",
        cobertura: "450 m²",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "HOG-095",
        fecha: "2026-07-10",
        ubicacion: "Casa de Campo - Paneles Solares",
        objetivo: "Escaneo térmico para detectar celdas solares defectuosas",
        dron: "Thermal Vision Pro",
        duracion: "30 min",
        cobertura: "1,200 m²",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    carreras_fpv: [
      {
        id: "FPV-880",
        fecha: "2026-07-23",
        ubicacion: "Pista Abandonada - Circuit Park",
        objetivo: "Práctica de Freestyle y trucos de precisión (Rubik Cube, Power Loop)",
        dron: "Custom 5'' FPV Quad",
        duracion: "45 min",
        cobertura: "12 Baterías",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "FPV-865",
        fecha: "2026-07-18",
        ubicacion: "Cancha Municipal",
        objetivo: "Ajuste de tasas de giro y calibración de motores Betaflight",
        dron: "Nazgul EV5 6S",
        duracion: "1h 10min",
        cobertura: "8 Baterías",
        estado: "En proceso",
        tagColorBg: HEX_COLORS.blue100,
        tagTextColor: "#1E40AF",
      },
    ],
    videografia: [
      {
        id: "VID-204",
        fecha: "2026-07-22",
        ubicacion: "Costa Pacífica - Cañón del Río",
        objetivo: "Grabación cinematográfica en D-Log M para reel de canal personal",
        dron: "DJI Inspire 3",
        duracion: "1h 05min",
        cobertura: "15.4 km",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    exploracion: [
      {
        id: "EXP-050",
        fecha: "2026-07-19",
        ubicacion: "Reserva Natural El Cumbre",
        objetivo: "Reconocimiento de senderos de montaña y mapa de elevación para trekking",
        dron: "Autel EVO II Dual",
        duracion: "55 min",
        cobertura: "45 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
  };

  const datosRegistrosTrabajo: Record<string, any[]> = {
    comercial_agri: [
      {
        id: "CTR-9041",
        fecha: "2026-07-25",
        ubicacion: "AgroFinca San José (Cliente: Ing. Ramírez)",
        objetivo: "Servicio de aspersión foliar de precisión y mapeo de vigor NDVI",
        dron: "DJI Agras T40",
        duracion: "2h 45min",
        cobertura: "120 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "CTR-9020",
        fecha: "2026-07-23",
        ubicacion: "Plantación Los Naranjos S.A.",
        objetivo: "Control fitosanitario contra plagas focalizadas en sector 3",
        dron: "Agras T30",
        duracion: "3h 10min",
        cobertura: "95 Ha",
        estado: "En proceso",
        tagColorBg: HEX_COLORS.blue100,
        tagTextColor: "#1E40AF",
      },
      {
        id: "CTR-8980",
        fecha: "2026-07-18",
        ubicacion: "Valle Central - Lote 12",
        objetivo: "Evaluación de estrés hídrico y micro-riego urgente",
        dron: "Agras T40",
        duracion: "1h 30min",
        cobertura: "45 Ha",
        estado: "En alerta",
        tagColorBg: HEX_COLORS.amber100,
        tagTextColor: "#92400E",
      },
    ],
    inspeccion_industrial: [
      {
        id: "IND-5501",
        fecha: "2026-07-24",
        ubicacion: "Parque Eólico La Breña (Cliente: EnergyCorp)",
        objetivo: "Inspección termográfica de palas de turbina eólica en búsqueda de microfisuras",
        dron: "Matrice 350 RTK",
        duracion: "4h 00min",
        cobertura: "12 Turbinas",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
      {
        id: "IND-5482",
        fecha: "2026-07-20",
        ubicacion: "Refinería de Gas del Este",
        objetivo: "Escaneo LiDAR de estructuras altas e inspección de antorchas de combustión",
        dron: "Matrice 300 RTK",
        duracion: "2h 20min",
        cobertura: "8 Chimeneas",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    audiovisual_pro: [
      {
        id: "AV-1209",
        fecha: "2026-07-22",
        ubicacion: "Estadio Metropolitano (Cliente: Fox Sports)",
        objetivo: "Transmisión en vivo HD con dron FPV de carreras para evento deportivo",
        dron: "Cinewhoop Custom Pro",
        duracion: "3h 30min",
        cobertura: "Evento Live",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    topografia_3d: [
      {
        id: "TOP-3302",
        fecha: "2026-07-21",
        ubicacion: "Proyecto Autopista Norte - Tramo 4",
        objetivo: "Levantamiento fotogramétrico 3D para cálculo de volumen de corte y relleno",
        dron: "eBee X Fixed Wing",
        duracion: "1h 50min",
        cobertura: "310 Ha",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
    seguridad_vigilancia: [
      {
        id: "SEG-7701",
        fecha: "2026-07-24",
        ubicacion: "Puerto Marítimo - Terminal C",
        objetivo: "Patrullaje nocturno automatizado con cámara térmica y sensor IR",
        dron: "DJI Dock 2 + M3D",
        duracion: "5h 15min",
        cobertura: "Perímetro 12 km",
        estado: "Completado",
        tagColorBg: HEX_COLORS.emerald100,
        tagTextColor: "#065F46",
      },
    ],
  };

  // Determinar datos actuales
  const currentChartSource = mainMode === "personal" ? chartDataPersonal : chartDataTrabajo;
  const currentTableSource = mainMode === "personal" ? datosRegistrosPersonal : datosRegistrosTrabajo;

  const currentChartSet = currentChartSource[activeTab]?.[chartPeriod] || [];
  const maxChartValue = Math.max(...currentChartSet.map((d) => d.valor), 1);
  const chartUnit = currentChartSet[0]?.unidad || "Cantidad";

  // Filtrado de la tabla actual
  const registrosActuales = (currentTableSource[activeTab] || []).filter((item) => {
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
            Dashboard del piloto
          </h1>
          <p className="text-gray-500 text-xs font-medium tracking-wide">
            Centro de control de vuelo • Telemetría, hobby y operaciones comerciales
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Badge Piloto Verificado */}
          <div
            style={{
              backgroundColor: HEX_COLORS.emerald100,
              color: "#065F46",
              borderRadius: "4px",
            }}
            className="px-2.5 py-1 border border-emerald-300 flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-1.5 h-1.5 bg-[#065F46] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider">Piloto verificado</span>
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
                      Centro de notificaciones
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

      {/* DIVISIÓN PRINCIPAL EN PESTAÑAS: USO PERSONAL VS SERVICIOS A TERCEROS */}
      <div className="mb-6 bg-gray-100 p-1.5 rounded flex items-center gap-2 border border-gray-200">
        <button
          onClick={() => handleMainModeChange("personal")}
          style={{
            backgroundColor: mainMode === "personal" ? HEX_COLORS.brandGreen : "transparent",
            color: mainMode === "personal" ? "#FFFFFF" : "#4B5563",
          }}
          className="flex-1 py-2.5 px-4 rounded text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer min-w-0"
        >
          <User size={16} className="shrink-0" />
          <span className="truncate">Uso personal</span>
        </button>

        <button
          onClick={() => handleMainModeChange("trabajo")}
          style={{
            backgroundColor: mainMode === "trabajo" ? HEX_COLORS.brandGreen : "transparent",
            color: mainMode === "trabajo" ? "#FFFFFF" : "#4B5563",
          }}
          className="flex-1 py-2.5 px-4 rounded text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer min-w-0"
        >
          <Briefcase size={16} className="shrink-0" />
          <span className="truncate">Servicios de terceros</span>
        </button>
      </div>

      {/* MÉTRICAS SUMMARY ADAPTADAS AL MODO SELECCIONADO */}
      {mainMode === "personal" ? (
        /* Métricas Uso Personal (Hobbies, FPV, Fotos, Hogar) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Horas de vuelo hobby</span>
              <div style={{ backgroundColor: HEX_COLORS.emerald100, color: "#065F46", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <Clock size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">84.5 hrs</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Tiempo de vuelo personal acumulado</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Metraje y fotos HD</span>
              <div style={{ backgroundColor: HEX_COLORS.blue100, color: "#1E40AF", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <Camera size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">1,240 items</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Capturas personales en la nube</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Distancia explorada</span>
              <div style={{ backgroundColor: HEX_COLORS.purple100, color: "#6B21A8", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <Compass size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">480 km</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Recorridos en rutas de ocio</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Drones en hangar</span>
              <div style={{ backgroundColor: HEX_COLORS.amber100, color: "#92400E", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <Radio size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">4 unidades</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Mavic 3, FPV Quad, Mini 4, Inspire</p>
          </div>
        </div>
      ) : (
        /* Métricas Trabajo Comercial / Terceros */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Facturación mensual</span>
              <div style={{ backgroundColor: HEX_COLORS.emerald100, color: "#065F46", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <DollarSign size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">L551,250</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Ingresos generados este mes</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Contratos activos</span>
              <div style={{ backgroundColor: HEX_COLORS.blue100, color: "#1E40AF", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <FileText size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">14 clientes</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Empresas y proyectos vigentes</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Horas comerciales</span>
              <div style={{ backgroundColor: HEX_COLORS.purple100, color: "#6B21A8", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <TrendingUp size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">195 hrs</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Vuelo facturado este mes</p>
          </div>

          <div style={{ borderRadius: "4px" }} className="bg-white border-2 border-gray-200 p-3.5 shadow-xs flex flex-col justify-between min-w-0">
            <div className="flex justify-between items-center gap-1 mb-2">
              <span className="text-[11px] font-bold text-gray-500 tracking-wider truncate">Reputación del piloto</span>
              <div style={{ backgroundColor: HEX_COLORS.amber100, color: "#92400E", borderRadius: "4px" }} className="p-1.5 flex items-center justify-center shrink-0">
                <Award size={15} />
              </div>
            </div>
            <p className="text-xl font-black text-gray-900 mb-0.5 truncate whitespace-nowrap">4.9 / 5.0</p>
            <p className="text-[10px] text-gray-400 font-semibold truncate">Calificación de clientes</p>
          </div>
        </div>
      )}

      {/* PESTAÑAS SECUNDARIAS ADAPTADAS SEGÚN EL MODO */}
      <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 select-none">
        {mainMode === "personal"
          ? [
              { id: "fotografia", label: "Fotografía", icon: <Camera size={13} /> },
              { id: "inspeccion_hogar", label: "Inspección hogar", icon: <Home size={13} /> },
              { id: "carreras_fpv", label: "Carreras FPV", icon: <Sliders size={13} /> },
              { id: "videografia", label: "Videografía", icon: <Film size={13} /> },
              { id: "exploracion", label: "Exploración", icon: <Compass size={13} /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ borderRadius: "4px 4px 0 0" }}
                  className={`px-1.5 py-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 border-t-2 border-x-2 -mb-[2px] transition-all text-center cursor-pointer min-w-0 ${
                    isActive
                      ? "border-t-[#0E5E6F] border-x-gray-200 border-b-white bg-white text-[#0E5E6F] shadow-xs"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-[#0E5E6F]" : "text-gray-400"}`}>{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })
          : [
              { id: "comercial_agri", label: "Agronomía", icon: <Radio size={13} /> },
              { id: "inspeccion_industrial", label: "Inspección industrial", icon: <ShieldCheck size={13} /> },
              { id: "audiovisual_pro", label: "Audiovisual pro", icon: <Video size={13} /> },
              { id: "topografia_3d", label: "Topografía 3D", icon: <Compass size={13} /> },
              { id: "seguridad_vigilancia", label: "Vigilancia", icon: <Zap size={13} /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ borderRadius: "4px 4px 0 0" }}
                  className={`px-1.5 py-3 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 border-t-2 border-x-2 -mb-[2px] transition-all text-center cursor-pointer min-w-0 ${
                    isActive
                      ? "border-t-[#0E5E6F] border-x-gray-200 border-b-white bg-white text-[#0E5E6F] shadow-xs"
                      : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-[#0E5E6F]" : "text-gray-400"}`}>{tab.icon}</span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
      </div>

      {/* GRÁFICO MEJORADO DE RENDIMIENTO */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 p-5 shadow-xs mb-8 text-left"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[#0E5E6F]" />
            <div>
              <h3 className="text-xs font-black text-gray-900 tracking-wider capitalize">
                {mainMode === "personal" ? "Actividad personal" : "Telemetría comercial"} — {activeTab.replace("_", " ")}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Métrica eje Y: <strong className="text-gray-700">{chartUnit}</strong>
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
                className={`px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
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

              {currentChartSet.length > 0 ? (
                currentChartSet.map((item, idx) => {
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
                })
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-medium">
                  Sin registros de vuelo para este periodo.
                </div>
              )}
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

      {/* TABLA DE REGISTROS DE VUELO */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 shadow-xs text-left overflow-hidden mb-8"
      >
        <div className="p-4 border-b-2 border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div>
            <h3 className="text-xs font-black text-gray-900 tracking-wider capitalize">
              {mainMode === "personal" ? "Bitácora personal de vuelos" : "Registro de operaciones comerciales"} — {activeTab.replace("_", " ")}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Telemetría y detalle de misiones ejecutadas
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
                placeholder="Buscar por ID, lugar, dron..."
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
                  className="px-2.5 py-1 text-[11px] font-bold border transition-all hover:opacity-90 active:scale-95 whitespace-nowrap cursor-pointer"
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
                <th className="px-4 py-2.5 whitespace-nowrap">Código / Fecha</th>
                <th className="px-4 py-2.5 whitespace-nowrap">Ubicación / Proyecto</th>
                <th className="px-4 py-2.5">Objetivo / Detalle técnico</th>
                <th className="px-4 py-2.5 whitespace-nowrap">Dron y métricas</th>
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
                    No hay vuelos registrados para la categoría seleccionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-gray-100 bg-gray-50/40 flex justify-between items-center">
          <span className="text-[11px] font-bold text-gray-400">
            {registrosActuales.length} vuelos registrados
          </span>
          <button
            style={{
              borderRadius: "4px",
              backgroundColor: HEX_COLORS.brandGreen,
            }}
            className="px-3 py-1.5 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#094350] transition-colors shadow-xs cursor-pointer"
          >
            <Download size={13} />
            Exportar bitácora PDF
          </button>
        </div>
      </div>

      {/* BANNER INFERIOR ACCIONABLE */}
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
              {mainMode === "personal"
                ? "¿Quieres registrar un nuevo dron personal o comprar insumos?"
                : "¿Deseas registrar un nuevo servicio comercial en la plataforma BIODRON?"}
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              {mainMode === "personal"
                ? "Explora el catálogo de accesorios, baterías y repuestos para tus equipos."
                : "Publica tus tarifas y disponibilidad para recibir contrataciones de clientes."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleNavigate("ClienteServiciosView")}
          style={{
            borderRadius: "4px",
            backgroundColor: HEX_COLORS.brandGreen,
          }}
          className="px-6 py-2.5 text-white text-xs font-bold tracking-wider hover:bg-[#094350] transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span>{mainMode === "personal" ? "Explorar catálogo o tienda" : "Publicar oferta comercial"}</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

// 2. Misiones
export const PilotoMisionesView = () => {
  // -------------------------------------------------------------
  // ESTADOS PRINCIPALES Y NAVEGACIÓN
  // -------------------------------------------------------------
  const [mainSection, setMainSection] = useState<"lista" | "en_curso">("lista");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [deletingMission, setDeletingMission] = useState<Mission | null>(null);

  // DATA STORE (5 registros por categoría)
  const [missions, setMissions] = useState<Mission[]>([
    // FUMIGACIÓN (5)
    {
      id: "MIS-FUM-001",
      category: "fumigacion",
      clientName: "Agropecuaria El Norte",
      location: "San Manuel, Cortés",
      areaSize: "55 Hectáreas",
      date: "26/07/2026",
      status: "Pendiente",
      droneAssigned: "DJI Agras T40",
      cropType: "Cultivo de Maíz",
      description: "Aplicación de fertilizante foliar en lote sector sur. Mantener altura constante de 3.5m sobre dosel."
    },
    {
      id: "MIS-FUM-002",
      category: "fumigacion",
      clientName: "Hacienda San José",
      location: "14.0723°N, 86.2344°W",
      areaSize: "80 Hectáreas",
      date: "26/07/2026",
      status: "En Curso",
      droneAssigned: "DJI Agras T50",
      cropType: "Parcela de Limones",
      description: "Aspersión de plaguicida preventivo pre-cosecha. Trabajo coordinado con estación meteorológica local."
    },
    {
      id: "MIS-FUM-003",
      category: "fumigacion",
      clientName: "Finca Santa Elena",
      location: "Comayagua, Comayagua",
      areaSize: "40 Hectáreas",
      date: "25/07/2026",
      status: "Aceptada",
      droneAssigned: "DJI Agras T30",
      cropType: "Vegetales Variados",
      description: "Fumigación de precisión contra plagas nocturnas en lotes de exportación."
    },
    {
      id: "MIS-FUM-004",
      category: "fumigacion",
      clientName: "Cultivos del Valle",
      location: "El Progreso, Yoro",
      areaSize: "110 Hectáreas",
      date: "24/07/2026",
      status: "Completada",
      droneAssigned: "DJI Agras T40",
      cropType: "Caña de Azúcar",
      description: "Madurante foliar aplicado según plan semanal de floración."
    },
    {
      id: "MIS-FUM-005",
      category: "fumigacion",
      clientName: "Agrícola Yojoa",
      location: "Peña Blanca, Cortés",
      areaSize: "30 Hectáreas",
      date: "23/07/2026",
      status: "Pendiente",
      droneAssigned: "DJI Agras T30",
      cropType: "Plátano",
      description: "Control de sigatoka negra con gotas de tamaño controlado a baja altitud."
    },

    // MONITOREO (5)
    {
      id: "MIS-MON-101",
      category: "monitoreo",
      clientName: "Corporación Bananera",
      location: "La Lima, Cortés",
      areaSize: "120 Hectáreas",
      date: "26/07/2026",
      status: "En Curso",
      droneAssigned: "Mavic 3 Enterprise",
      cropType: "Bananera",
      description: "Conteo foliar e inspección visual de canales de drenaje tras lluvias en el sector este."
    },
    {
      id: "MIS-MON-102",
      category: "monitoreo",
      clientName: "Cafetalera Los Altos",
      location: "Marcala, La Paz",
      areaSize: "65 Hectáreas",
      date: "25/07/2026",
      status: "Aceptada",
      droneAssigned: "Mavic 3 Multispectral",
      cropType: "Café de Altura",
      description: "Análisis de vigor vegetal (NDVI) para detectar zonas con propagación de roya."
    },
    {
      id: "MIS-MON-103",
      category: "monitoreo",
      clientName: "Agro Sula",
      location: "Choloma, Cortés",
      areaSize: "95 Hectáreas",
      date: "24/07/2026",
      status: "Completada",
      droneAssigned: "Phantom 4 RTK",
      cropType: "Palma Africana",
      description: "Conteo automático de copas de palma mediante sensor térmico e hiperespectral."
    },
    {
      id: "MIS-MON-104",
      category: "monitoreo",
      clientName: "Hacienda El Líbano",
      location: "Danlí, El Paraíso",
      areaSize: "50 Hectáreas",
      date: "22/07/2026",
      status: "Pendiente",
      droneAssigned: "Mavic 3 Multispectral",
      cropType: "Tabaco",
      description: "Escaneo de estrés hídrico y gradiente de humedad en hileras de siembra."
    },
    {
      id: "MIS-MON-105",
      category: "monitoreo",
      clientName: "Granja Arrocera Sur",
      location: "Choluteca, Choluteca",
      areaSize: "150 Hectáreas",
      date: "21/07/2026",
      status: "Aceptada",
      droneAssigned: "Mavic 3 Enterprise",
      cropType: "Arrozal",
      description: "Monitoreo de inundación y niveles de lámina de agua en parcelas bajas."
    },

    // FOTOGRAMETRÍA (5)
    {
      id: "MIS-FOT-201",
      category: "fotogrametria",
      clientName: "Ingenio Azucarero",
      location: "Marcovia, Choluteca",
      areaSize: "310 Hectáreas",
      date: "05/07/2026",
      status: "Aceptada",
      droneAssigned: "DJI Matrice 300 RTK",
      cropType: "Cañaveral",
      description: "Ortomosaico de precisión centimétrica con estación RTK fija D-RTK 2 para deslinde de parcelas."
    },
    {
      id: "MIS-FOT-202",
      category: "fotogrametria",
      clientName: "Desarrollos Agrícolas",
      location: "Tocoa, Colón",
      areaSize: "200 Hectáreas",
      date: "18/07/2026",
      status: "Pendiente",
      droneAssigned: "DJI Matrice 350 RTK",
      cropType: "Cítricos",
      description: "Generación de modelo digital de elevación (DEM) para diseño de canales de riego."
    },
    {
      id: "MIS-FOT-203",
      category: "fotogrametria",
      clientName: "Inversiones del Golfo",
      location: "San Lorenzo, Valle",
      areaSize: "85 Hectáreas",
      date: "15/07/2026",
      status: "Completada",
      droneAssigned: "Phantom 4 RTK",
      cropType: "Camaronera",
      description: "Mapeo 3D de bordos y medición de volumen en lagunas de maduración."
    },
    {
      id: "MIS-FOT-204",
      category: "fotogrametria",
      clientName: "Proyectos Olancho",
      location: "Juticalpa, Olancho",
      areaSize: "400 Hectáreas",
      date: "12/07/2026",
      status: "En Curso",
      droneAssigned: "DJI Matrice 300 RTK",
      cropType: "Pastizal",
      description: "Mapeo de alta resolución para planificación de cerca eléctrica divisional de potreros."
    },
    {
      id: "MIS-FOT-205",
      category: "fotogrametria",
      clientName: "Terras de Honduras",
      location: "Siguatepeque, Comayagua",
      areaSize: "75 Hectáreas",
      date: "10/07/2026",
      status: "Aceptada",
      droneAssigned: "Phantom 4 RTK",
      cropType: "Bosque Agroforestal",
      description: "Levantamiento de linderos y topografía inicial para siembra de pino y café."
    }
  ]);

  // -------------------------------------------------------------
  // ESTADOS DEL STREAMING Y TELEMETRÍA
  // -------------------------------------------------------------
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [isPlayingFeed, setIsPlayingFeed] = useState<boolean>(true);
  const [isRthActive, setIsRthActive] = useState<boolean>(false);
  const [rthArmed, setRthArmed] = useState<boolean>(false);

  const activeMissions = missions.filter(m => m.status === "En Curso");
  const currentActiveMission = activeMissions.find(m => m.id === activeMissionId) || activeMissions[0];

  const [telemetry, setTelemetry] = useState({
    alt: 45,
    speed: 8.2,
    dist: 340,
    heading: 245,
    satellites: 18,
    battery: 88,
    wind: 11,
  });

  const [logs, setLogs] = useState<Array<{ id: number; time: string; text: string; type: "green" | "blue" | "yellow" | "red" }>>([
    { id: 1, time: "10:42:35", text: "Telemetría sincronizada · Conexión 5.8 GHz", type: "green" },
    { id: 2, time: "10:42:31", text: "GPS Lock confirmado · 18 Satélites RTK", type: "green" },
    { id: 3, time: "10:42:28", text: "Escaneando área de misión", type: "blue" },
  ]);

  useEffect(() => {
    if (mainSection !== "en_curso" || !isPlayingFeed || isRthActive) return;

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
  }, [mainSection, isPlayingFeed, isRthActive]);

  const addLog = (text: string, type: "green" | "blue" | "yellow" | "red" = "blue") => {
    const time = new Date().toLocaleTimeString("es-HN", { hour12: false });
    setLogs((prev) => [{ id: Date.now(), time, text, type }, ...prev]);
  };

  const handleSelectMissionForCamera = (id: string) => {
    setActiveMissionId(id);
    const selected = missions.find((m) => m.id === id);
    if (selected) {
      addLog(`Misión seleccionada: ${selected.cropType}`, "blue");
    }
  };

  const handleExecuteRTH = () => {
    if (!rthArmed) {
      setRthArmed(true);
      return;
    }
    setIsRthActive(true);
    setRthArmed(false);
    if (currentActiveMission) {
      setMissions((prev) =>
        prev.map((m) => m.id === currentActiveMission.id ? { ...m, status: "Completada" } : m)
      );
    }
    addLog("🚨 PROTOCOLO RTH: El dron retorna a la base", "red");
  };

  // -------------------------------------------------------------
  // HANDLERS DE MISIONES
  // -------------------------------------------------------------
  const handleDeleteMission = (id: string) => {
    setMissions(prev => prev.filter(m => m.id !== id));
    setDeletingMission(null);
  };

  const handleSaveEditedMission = () => {
    if (!editingMission) return;
    setMissions(prev => prev.map(m => (m.id === editingMission.id ? editingMission : m)));
    setEditingMission(null);
  };

  const filteredMissions = missions.filter(m => {
    const matchesCategory = selectedCategory === "ALL" || m.category === selectedCategory;
    const matchesStatus = statusFilter === "ALL" || m.status === statusFilter;
    const matchesSearch =
      m.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const countByCategory = (cat: MissionCategory) => missions.filter(m => m.category === cat).length;

  return (
    <div className="h-full flex flex-col bg-gray-100 antialiased text-left font-sans" style={{ fontFamily: "'Roboto', sans-serif" }}>
      
      {/* HEADER Y SELECTOR DE SECCIONES DE COLOR #0E5E6F SIN ÍCONOS */}
      <div className="bg-white border-b-2 border-gray-200 px-4 py-3 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Panel de Control del Piloto</h1>
          <p className="text-gray-500 text-xs">Administra asignaciones o visualiza la telemetría en tiempo real.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-[4px] border border-gray-200 shadow-inner">
          <button
            onClick={() => setMainSection("lista")}
            className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all cursor-pointer ${
              mainSection === "lista" ? "bg-[#0E5E6F] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lista de misiones
          </button>
          <button
            onClick={() => setMainSection("en_curso")}
            className={`px-4 py-1.5 text-xs font-bold rounded-[4px] transition-all cursor-pointer flex items-center gap-1.5 ${
              mainSection === "en_curso" ? "bg-[#0E5E6F] text-white shadow-xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mision en curso
            {activeMissions.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          SECCIÓN 1: LISTA DE MISIONES
          ========================================================= */}
      {mainSection === "lista" && (
        <div className="p-4 overflow-y-auto flex-1 max-w-7xl mx-auto w-full">
          {/* Tarjetas de Resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Fumigación</span>
                <span className="text-xl font-black text-gray-900">{countByCategory("fumigacion")}</span>
              </div>
              <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]"><Compass size={18} /></div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Monitoreo</span>
                <span className="text-xl font-black text-gray-900">{countByCategory("monitoreo")}</span>
              </div>
              <div className="p-2 bg-blue-50 text-blue-700 rounded-[4px]"><Video size={18} /></div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider block">Fotogrametría</span>
                <span className="text-xl font-black text-purple-900">{countByCategory("fotogrametria")}</span>
              </div>
              <div className="p-2 bg-purple-50 text-purple-700 rounded-[4px]"><FileText size={18} /></div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider block">En Curso</span>
                <span className="text-xl font-black text-emerald-700">{activeMissions.length}</span>
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-[4px]"><Play size={18} /></div>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 mb-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar misión..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 border-2 border-gray-200 rounded-[4px] text-xs focus:border-[#0E5E6F] outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-2 border-gray-200 rounded-[4px] px-2.5 py-1.5 text-xs bg-white text-gray-800 font-bold focus:border-[#0E5E6F] outline-none cursor-pointer"
              >
                <option value="ALL">Todas las Categorías</option>
                <option value="fumigacion">Fumigación</option>
                <option value="monitoreo">Monitoreo</option>
                <option value="fotogrametria">Fotogrametría</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-[4px] px-2.5 py-1.5 text-xs bg-white text-gray-800 font-bold focus:border-[#0E5E6F] outline-none cursor-pointer"
              >
                <option value="ALL">Todos los Estados</option>
                <option value="Pendiente">Pendientes</option>
                <option value="Aceptada">Aceptadas</option>
                <option value="En Curso">En Curso</option>
                <option value="Completada">Completadas</option>
              </select>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
                <thead className="bg-gray-50 border-b-2 border-gray-200 text-[11px] font-semibold text-gray-600">
                  <tr>
                    <th className="py-2 px-3 w-[15%]">Código / Fecha</th>
                    <th className="py-2 px-3 w-[20%]">Cliente / Cultivo</th>
                    <th className="py-2 px-3 w-[20%]">Dron / Ubicación</th>
                    <th className="py-2 px-3 w-[20%]">Detalles</th>
                    <th className="py-2 px-3 text-center w-[10%]">Estado</th>
                    <th className="py-2 px-3 text-center w-[15%]">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {filteredMissions.map((mision) => (
                    <tr key={mision.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-2 px-3 align-top">
                        <span className="block font-mono text-[10px] font-bold text-gray-700">{mision.id}</span>
                        <span className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5"><Calendar size={9} /> {mision.date}</span>
                      </td>
                      <td className="py-2 px-3 align-top">
                        <span className="block font-bold text-gray-900 text-[11px]">{mision.clientName}</span>
                        <span className="text-[10px] text-[#0E5E6F] font-semibold">{mision.cropType}</span>
                      </td>
                      <td className="py-2 px-3 align-top">
                        <span className="text-[11px] font-semibold text-gray-800 block">{mision.droneAssigned}</span>
                        <span className="text-[9px] text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={9} /> {mision.location}</span>
                      </td>
                      <td className="py-2 px-3 align-top">
                        <span className="font-bold text-[10px] text-gray-800 block">Área: {mision.areaSize}</span>
                        <p className="line-clamp-2 text-[9px] text-gray-500 leading-tight mt-0.5" title={mision.description}>{mision.description}</p>
                      </td>
                      <td className="py-2 px-2 text-center align-top">
                        <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] border ${
                          mision.status === "Aceptada" || mision.status === "Completada" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                          mision.status === "Rechazada" ? "border-red-200 bg-red-50 text-red-700" :
                          mision.status === "Pendiente" ? "border-amber-300 bg-amber-100 text-amber-800" :
                          "border-blue-200 bg-blue-50 text-blue-700 animate-pulse"
                        }`}>
                          {mision.status}
                        </span>
                      </td>
                      <td className="py-2 px-2 align-top">
                        <div className="flex flex-col gap-1 items-center justify-center">
                          {mision.status === "En Curso" && (
                            <button
                              onClick={() => {
                                setActiveMissionId(mision.id);
                                setMainSection("en_curso");
                              }}
                              className="px-2 py-1 text-[10px] font-bold rounded-[4px] bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer shadow-xs flex items-center justify-center gap-1 w-full transition-colors"
                            >
                              <Video size={11} /> Ver Cámara
                            </button>
                          )}
                          
                          <div className="flex items-center gap-1 w-full">
                            <button
                              onClick={() => setEditingMission({ ...mision })}
                              className="flex-1 py-1 bg-[#0E5E6F] text-white text-[10px] font-bold rounded-[4px] hover:bg-[#0a4754] transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Edit3 size={11} /> Editar
                            </button>
                            <button
                              onClick={() => setDeletingMission(mision)}
                              className="p-1 border border-transparent text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[4px] transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMissions.length === 0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-gray-500">No hay misiones registradas con estos filtros.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SECCIÓN 2: MISIÓN EN CURSO (CÁMARA Y TELEMETRÍA)
          ========================================================= */}
      {mainSection === "en_curso" && (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
          {activeMissions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
              <Video size={48} className="opacity-20" />
              <p className="text-sm font-medium">No hay misiones "En Curso" actualmente para transmitir.</p>
            </div>
          ) : (
            <>
              {/* BARRA SUPERIOR DE TELEMETRÍA */}
              <div className="bg-gray-900 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow z-10">
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
                  <span className={`w-2 h-2 rounded-[4px] shrink-0 aspect-square ${isRthActive ? "bg-red-500 animate-ping" : "bg-green-400 animate-pulse"}`}></span>
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider font-mono">
                    {isRthActive ? "RTH ACTIVO" : `${currentActiveMission?.droneAssigned || "Dron"} Conectado`}
                  </span>
                </div>
              </div>

              {/* CONTENIDO PRINCIPAL */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-[320px] border-r border-gray-200 bg-white flex flex-col overflow-hidden shrink-0">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h3 className="text-xs font-black text-gray-800">Misiones Activas</h3>
                    <span className="bg-[#0E5E6F] text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px]">
                      {activeMissions.length} en vuelo
                    </span>
                  </div>

                  <div className="overflow-y-auto flex-1 p-2.5 flex flex-col gap-2">
                    {activeMissions.map((m) => {
                      const isCurrent = currentActiveMission?.id === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => handleSelectMissionForCamera(m.id)}
                          className={`border rounded-[4px] p-3 cursor-pointer transition-all ${
                            isCurrent ? "border-[#0E5E6F] bg-[#0E5E6F]/5" : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={`font-bold text-xs ${isCurrent ? "text-[#0E5E6F]" : "text-gray-800"}`}>
                              {m.cropType}
                            </span>
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-[4px] bg-emerald-100 text-emerald-700 animate-pulse">
                              LIVE
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mb-2">
                            <MapPin size={10} className="shrink-0" /> {m.location}
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                            <span className="text-[10px] text-gray-500 font-medium truncate w-[70%]">{m.clientName}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleSelectMissionForCamera(m.id); }}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-[4px] ${isCurrent ? "bg-[#0E5E6F] text-white" : "bg-gray-100 text-gray-600"}`}
                            >
                              {isCurrent ? "Activa" : "Cargar"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 overflow-y-auto bg-gray-50">
                  {currentActiveMission && (
                    <div className="flex-1 min-h-[380px] bg-gray-950 rounded-[4px] overflow-hidden relative border border-gray-800 shadow-md">
                      <img
                        src="src/img/vista_aerea.png"
                        alt="Vista Aérea"
                        className={`absolute inset-0 w-full h-full object-cover rounded-[4px] transition-opacity duration-300 ${isPlayingFeed ? "opacity-100" : "opacity-40 grayscale"}`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80";
                        }}
                      />

                      <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start gap-2">
                          <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-[4px] border border-white/10 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-[4px] shrink-0 aspect-square ${isPlayingFeed ? "bg-red-500 animate-ping" : "bg-yellow-500"}`}></span>
                            <span className="text-white text-[10px] font-mono font-bold tracking-wide">{currentActiveMission.id}</span>
                          </div>

                          <div className="pointer-events-auto flex items-center gap-1.5 bg-black/60 backdrop-blur-sm p-1 rounded-[4px] border border-white/10">
                            {rthArmed && (
                              <button
                                onClick={() => { setRthArmed(false); addLog("Cancelada alerta RTH", "yellow"); }}
                                className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[9px] font-bold rounded-[4px] transition-all cursor-pointer"
                              >
                                Cancelar
                              </button>
                            )}
                            <button
                              onClick={handleExecuteRTH}
                              className={`px-3 py-1 rounded-[4px] flex items-center gap-1.5 text-white font-bold text-[10px] uppercase transition-all shadow cursor-pointer ${
                                isRthActive ? "bg-orange-600 animate-pulse" : rthArmed ? "bg-red-600 animate-bounce" : "bg-red-600/80 hover:bg-red-600"
                              }`}
                            >
                              <AlertOctagon size={13} className="shrink-0" />
                              <span>{isRthActive ? "RTH Activo" : rthArmed ? "Confirmar" : "RTH"}</span>
                            </button>
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                          <div className="w-16 h-16 border border-white rounded-[4px] shrink-0 aspect-square flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-[4px] shrink-0 aspect-square"></div>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-end gap-2">
                          <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-[4px] border border-white/10 flex items-center gap-3 font-mono text-[10px] text-white">
                            <div>ALT: <strong className="text-amber-300">{telemetry.alt}m</strong></div>
                            <div className="border-l border-white/20 pl-3">VEL: <strong className="text-amber-300">{telemetry.speed}m/s</strong></div>
                            <div className="border-l border-white/20 pl-3">DIST: <strong className="text-amber-300">{telemetry.dist}m</strong></div>
                            <div className="border-l border-white/20 pl-3">HDG: <strong className="text-amber-300">{telemetry.heading}°</strong></div>
                          </div>

                          <div className="pointer-events-auto flex items-center gap-1.5">
                            <button
                              onClick={() => addLog(`Captura guardada en ${currentActiveMission.location}`, "green")}
                              className="bg-black/60 hover:bg-black text-white px-2.5 py-1 rounded-[4px] border border-white/20 backdrop-blur-sm text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Camera size={12} className="shrink-0" /> Captura
                            </button>
                            <button
                              onClick={() => {
                                setIsPlayingFeed(!isPlayingFeed);
                                addLog(isPlayingFeed ? "Transmisión pausada" : "Transmisión reanudada", "yellow");
                              }}
                              className="bg-black/60 hover:bg-black text-white px-2.5 py-1 rounded-[4px] border border-white/20 backdrop-blur-sm text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              {isPlayingFeed ? <Pause size={12} className="shrink-0" /> : <Play size={12} className="shrink-0" />}
                              {isPlayingFeed ? "Pausar" : "Reanudar"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="h-32 bg-gray-950 border border-gray-800 rounded-[4px] overflow-hidden flex flex-col shadow shrink-0">
                    <div className="px-3 py-1.5 bg-gray-900 border-b border-gray-800 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <RefreshCw size={11} className="text-green-400 animate-spin shrink-0" />
                        <span className="text-[11px] font-mono font-bold text-gray-300 uppercase">Log de Telemetría</span>
                      </div>
                      <button
                        onClick={() => addLog("Sistemas verificados OK", "green")}
                        className="text-[9px] bg-gray-800 hover:bg-gray-700 text-green-400 font-mono px-2 py-0.5 rounded-[4px] border border-gray-700 cursor-pointer"
                      >
                        + Check
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto p-2 font-mono text-[10px] space-y-1 text-left">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-2 border-b border-gray-900/50 pb-0.5">
                          <span className="text-gray-500 shrink-0">[{log.time}]</span>
                          <span className={
                            log.type === "green" ? "text-emerald-400" : log.type === "yellow" ? "text-amber-300" : log.type === "red" ? "text-red-400 font-bold" : "text-sky-300"
                          }>
                            {log.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================
          MODALES CON INFORMACIÓN DETALLADA DE LA MISIÓN
          ========================================================= */}
      
      {/* MODAL DETALLES Y EDICIÓN DE ESTADO */}
      {editingMission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-md overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
            {/* Header del Modal */}
            <div className="flex justify-between items-center px-4 py-3 border-b-2 border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-[#0E5E6F]" />
                <h3 className="text-xs font-black text-gray-900 tracking-wide uppercase">Detalles de la Misión</h3>
              </div>
              <button onClick={() => setEditingMission(null)} className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {/* Cuerpo con Información Completa */}
            <div className="p-4 space-y-3.5 text-xs">
              
              {/* Código y Categoría */}
              <div className="flex items-center justify-between bg-gray-50 p-2.5 border border-gray-200 rounded-[4px]">
                <div>
                  <span className="text-[9px] font-bold text-gray-400 block uppercase">Código</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">{editingMission.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-gray-400 block uppercase">Categoría</span>
                  <span className="font-bold text-[#0E5E6F] text-xs uppercase tracking-wider">{editingMission.category}</span>
                </div>
              </div>

              {/* Fila: Cliente y Cultivo */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <User size={10} /> Cliente
                  </span>
                  <p className="font-bold text-gray-900 mt-0.5">{editingMission.clientName}</p>
                </div>
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <Layers size={10} /> Cultivo
                  </span>
                  <p className="font-bold text-[#0E5E6F] mt-0.5">{editingMission.cropType}</p>
                </div>
              </div>

              {/* Fila: Dron y Ubicación */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <Cpu size={10} /> Dron
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5">{editingMission.droneAssigned}</p>
                </div>
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <MapPin size={10} /> Ubicación
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5 truncate">{editingMission.location}</p>
                </div>
              </div>

              {/* Fila: Área y Fecha */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">Área Cobertura</span>
                  <p className="font-bold text-gray-800 mt-0.5">{editingMission.areaSize}</p>
                </div>
                <div className="p-2 border border-gray-100 rounded-[4px] bg-gray-50/50">
                  <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                    <Calendar size={10} /> Fecha Programada
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5">{editingMission.date}</p>
                </div>
              </div>

              {/* Descripción */}
              <div className="p-2.5 border border-gray-100 rounded-[4px] bg-gray-50/50">
                <span className="text-[9px] font-bold text-gray-400 block uppercase mb-1">Descripción / Instrucciones</span>
                <p className="text-[11px] text-gray-600 leading-normal">{editingMission.description}</p>
              </div>

              {/* Selector de Estado */}
              <div className="pt-2 border-t border-gray-200">
                <label className="block font-bold text-gray-800 text-[11px] mb-1">Cambiar Estado de Misión:</label>
                <select
                  value={editingMission.status}
                  onChange={(e) => setEditingMission({ ...editingMission, status: e.target.value as MissionStatus })}
                  className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-bold bg-white text-gray-800 focus:border-[#0E5E6F] outline-none cursor-pointer"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aceptada">Aceptada</option>
                  <option value="En Curso">En Curso (Habilita Transmisión)</option>
                  <option value="Completada">Completada</option>
                  <option value="Rechazada">Rechazada</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => setEditingMission(null)} className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer">
                  Cancelar
                </button>
                <button onClick={handleSaveEditedMission} className="px-4 py-1.5 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR CON INFORMACIÓN RESUMIDA DE LA MISIÓN */}
      {deletingMission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-2xl w-full max-w-sm overflow-hidden text-left p-4 space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
              <AlertTriangle size={16} /> <span>¿Confirmar eliminación?</span>
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-[4px] p-2.5 space-y-1 text-[11px]">
              <p className="font-bold text-gray-900">{deletingMission.clientName} - <span className="text-[#0E5E6F]">{deletingMission.cropType}</span></p>
              <p className="font-mono text-[10px] text-gray-500">ID: {deletingMission.id} · {deletingMission.areaSize}</p>
              <p className="text-gray-500 text-[10px]"><MapPin size={9} className="inline mr-1" />{deletingMission.location}</p>
            </div>

            <p className="text-[11px] text-gray-600">Esta acción no se puede deshacer y borrará la misión del sistema.</p>
            
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => setDeletingMission(null)} className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer">
                Cancelar
              </button>
              <button onClick={() => handleDeleteMission(deletingMission.id)} className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-[4px] hover:bg-red-700 cursor-pointer shadow-xs">
                Eliminar Misión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Estado de Drones
export const PilotoDronView = () => {
    // ---------------- ESTADOS DEL DRON ----------------
    const [activeMainTab, setActiveMainTab] = useState<"mis-drones" | "comprar">("mis-drones");
    const [selectedCategory, setSelectedCategory] = useState<"micro" | "mini" | "pequeno" | "grande">("micro");
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

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
                            Supervisa tu flota actual de aeronaves o explora el catálogo completo para adquirir nuevas unidades operativas.
                        </Text>
                    </div>
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
                                    Explora el catálogo para adquirir unidades autorizadas según las necesidades de tus operaciones.
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
                                        Micro drones ultraligeros y compactos habilitados para mapeo y tareas de inspección rápida.
                                    </Text>
                                )}
                                {selectedCategory === "mini" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Mini drones avanzados de alta estabilidad para monitoreo de cultivos extensivos.
                                    </Text>
                                )}
                                {selectedCategory === "pequeno" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Drones pequeños de carga y aspersión agrícola de precisión.
                                    </Text>
                                )}
                                {selectedCategory === "grande" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Megadrones industriales y de ala fija de largo alcance para operaciones pesadas.
                                    </Text>
                                )}
                            </div>
                        </div>

                        <div 
                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                            className="bg-emerald-50 border border-emerald-200 p-3.5 text-emerald-900 flex items-center gap-2.5"
                        >
                            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                            <Text className="text-xs font-medium text-emerald-800">
                                <strong>Perfil de Piloto Verificado:</strong> Tienes la autorización requerida para adquirir cualquier dron del catálogo comercial.
                            </Text>
                        </div>

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

                                            <button
                                                onClick={() => iniciarCompra(drone)}
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="flex-1 py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <ShoppingBag size={14} />
                                                Comprar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* MODAL SOLICITUD DE AYUDA TÉCNICA */}
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
                            </div>
                        </div>

                        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 shrink-0">
                            <button
                                onClick={() => iniciarCompra(selectedDrone)}
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="px-4 py-2 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                                <ShoppingBag size={14} />
                                Comprar
                            </button>

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
        </div>
    );
};

// 4. Editor de mapas
export const PilotoMapsView = () => {
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
                                    <span>Enviar edición</span>
                                </button>

                                <button className="w-full py-1.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">
                                    Auto-dibujar zona
                                </button>

                                <button className="w-full py-1.5 bg-white border-2 border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-[11px] rounded-[4px] flex items-center justify-center transition-colors cursor-pointer">
                                    Cancelar edición
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
                            <div className="p-1 bg-amber-100 text-amber-700 rounded-[4px]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-gray-900 tracking-wide">
                                Mapeo enviado a revisión
                            </h3>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600 font-medium">
                            <p>
                                La edición del mapa para la misión <span className="font-bold text-gray-800">#{mappingId}</span> ha sido enviada exitosamente a uno de los administradores.
                            </p>
                            <div className="p-2 bg-amber-50 border border-amber-200 rounded-[4px] text-[11px] text-amber-800 font-semibold">
                                Estado: En espera de ser aprobada por el administrador.
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

// 5. Suscripciones
export const PilotoSuscripcionesView = () => {
    const [activeTab, setActiveTab] = useState<TabType>("apoyo-tecnico");
    const [activePlanId, setActivePlanId] = useState<string>("plan-piloto-operativo");
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

    const userWalletBalance = 4500;

    // BASE DE DATOS DE PLANES POR CATEGORÍA PARA PILOTOS
    const catalogos = {
        "apoyo-tecnico": [
            {
                id: "apoyo-tecnico-basico",
                nombre: "Soporte Técnico en Vuelo Básico",
                precio: "L 950",
                precioNum: 950,
                periodo: "/mes",
                etiqueta: "Preventivo",
                descripcion: "Asistencia técnica remota y diagnósticos rápidos para mantener tus equipos operativos.",
                caracteristicas: [
                    "Soporte técnico vía chat y videollamada prioritario.",
                    "Diagnóstico de bitácoras y registros de vuelo.",
                    "10% de descuento en talleres de reparación."
                ],
                destacado: false,
            },
            {
                id: "apoyo-tecnico-avanzado",
                nombre: "Asistencia Avanzada en Campo",
                precio: "L 2,400",
                precioNum: 2400,
                periodo: "/mes",
                etiqueta: "Recomendado",
                descripcion: "Soporte técnico especializado con asistencia directa y revisión de componentes críticos.",
                caracteristicas: [
                    "Atención de incidencias técnicas en menos de 12 horas.",
                    "Calibración de sensores, radares y sistemas de aspersión.",
                    "Revisiones preventivas trimestrales de hardware."
                ],
                destacado: true,
            },
            {
                id: "apoyo-tecnico-premium",
                nombre: "Taller y Resguardo Total Piloto",
                precio: "L 4,800",
                precioNum: 4800,
                periodo: "/mes",
                etiqueta: "Empresarial",
                descripcion: "Cobertura completa de soporte técnico y mantenimiento correctivo prioritario para pilotos activos.",
                caracteristicas: [
                    "Mantenimiento correctivo ilimitado en taller.",
                    "Piezas de desgaste con prioridad de stock.",
                    "Asesor técnico dedicado para emergencias."
                ],
                destacado: false,
            }
        ],
        "cobros-plataforma": [
            {
                id: "plan-piloto-freelance",
                nombre: "Comisión Operativa Estándar",
                precio: "L 1,100",
                precioNum: 1100,
                periodo: "/mes",
                etiqueta: "Piloto Independiente",
                descripcion: "Tarifa por uso de plataforma para gestión de rutas, contratos y cobros automatizados.",
                caracteristicas: [
                    "Acceso a la red de asignación de misiones y parcelas.",
                    "Cobros y desembolsos automatizados semanales.",
                    "Comisión preferencial por servicio gestionado."
                ],
                destacado: false,
            },
            {
                id: "plan-piloto-operativo",
                nombre: "Membresía Operativa Profesional",
                precio: "L 2,600",
                precioNum: 2600,
                periodo: "/mes",
                etiqueta: "Más Popular",
                descripcion: "Beneficios ampliados por uso de plataforma, mayor visibilidad ante productores y menor retención.",
                caracteristicas: [
                    "Prioridad en la asignación de misiones de alta rentabilidad.",
                    "Herramientas avanzadas de telemetría y mapas en vivo.",
                    "Seguro de responsabilidad civil operativo incluido."
                ],
                destacado: true,
            },
            {
                id: "plan-piloto-flota",
                nombre: "Plataforma para Líder de Escuadrón",
                precio: "L 5,200",
                precioNum: 5200,
                periodo: "/mes",
                etiqueta: "Flotas y Grupos",
                descripcion: "Infraestructura de software para coordinar múltiples pilotos y aeronaves bajo una misma cuenta.",
                caracteristicas: [
                    "Gestión centralizada de hasta 5 pilotos asociados.",
                    "Reportes consolidados de ingresos y métricas de vuelo.",
                    "Soporte administrativo y comercial dedicado."
                ],
                destacado: false,
            }
        ],
        "beneficios-operativos": [
            {
                id: "beneficio-conectividad",
                nombre: "Pack Conectividad y RTK",
                precio: "L 800",
                precioNum: 800,
                periodo: "/mes",
                etiqueta: "Señal y Precisión",
                descripcion: "Acceso a estaciones base RTK de alta precisión y datos móviles preferenciales para operación.",
                caracteristicas: [
                    "Corrección RTK en tiempo real sin interrupciones.",
                    "Acceso ilimitado a red de bases terrestres BIODRON.",
                    "Baja latencia en transmisión de telemetría."
                ],
                destacado: false,
            },
            {
                id: "beneficio-seguridad",
                nombre: "Protección y Resguardo de Vuelo",
                precio: "L 1,900",
                precioNum: 1900,
                periodo: "/mes",
                etiqueta: "Cobertura",
                descripcion: "Beneficios de respaldo ante imprevistos operacionales y asistencia legal aeronáutica.",
                caracteristicas: [
                    "Asesoría legal ante normativas de aviación civil.",
                    "Resguardo ante daños accidentales menores en campo.",
                    "Gestión rápida de permisos de espacio aéreo."
                ],
                destacado: true,
            },
            {
                id: "beneficio-logistica",
                nombre: "Logística y Movilidad de Campo",
                precio: "L 3,500",
                precioNum: 3500,
                periodo: "/mes",
                etiqueta: "Logística Total",
                descripcion: "Apoyo logístico integral para traslado de equipos, generadores y baterías a las fincas asignadas.",
                caracteristicas: [
                    "Coordinación de insumos y estaciones de carga móviles.",
                    "Descuentos en alianzas de combustible y transporte.",
                    "Logística prioritaria en campañas masivas."
                ],
                destacado: false,
            }
        ],
        "alianzas-comerciales": [
            {
                id: "alianza-repuestos",
                nombre: "Convenio de Repuestos y Baterías",
                precio: "L 1,500",
                precioNum: 1500,
                periodo: "/mes",
                etiqueta: "Descuentos",
                descripcion: "Accede a precios mayoristas y créditos directos en la compra de repuestos originales DJI Agras.",
                caracteristicas: [
                    "20% de descuento directo en hélices, bombas y filtros.",
                    "Financiación sin intereses en baterías de vuelo inteligente.",
                    "Garantía extendida en componentes reemplazados."
                ],
                destacado: false,
            },
            {
                id: "alianza-hardware",
                nombre: "Programa de Renovación de Flota",
                precio: "L 3,800",
                precioNum: 3800,
                periodo: "/mes",
                etiqueta: "Renovación Anual",
                descripcion: "Beneficios exclusivos para actualizar tus drones agrícolas con planes de recompra y bonos.",
                caracteristicas: [
                    "Bono anual preferencial para cambio a modelos recientes.",
                    "Tasvaluación y toma de dron anterior como parte de pago.",
                    "Capacitación gratuita en nuevos modelos de aeronaves."
                ],
                destacado: true,
            },
            {
                id: "alianza-certificacion",
                nombre: "Academia y Licenciamiento",
                precio: "L 2,200",
                precioNum: 2200,
                periodo: "/mes",
                etiqueta: "Capacitación",
                descripcion: "Actualización constante, horas de simulador y renovación de licencias para pilotos profesionales.",
                caracteristicas: [
                    "Cursos avanzados de vuelo autónomo y multiespectral.",
                    "Gestión y renovación de permisos ante autoridades.",
                    "Acceso libre a simuladores de vuelo virtuales."
                ],
                destacado: false,
            }
        ]
    };

    const todosLosPlanes = [
        ...catalogos["apoyo-tecnico"],
        ...catalogos["cobros-plataforma"],
        ...catalogos["beneficios-operativos"],
        ...catalogos["alianzas-comerciales"]
    ];

    const planActual = todosLosPlanes.find((p) => p.id === activePlanId) || catalogos["cobros-plataforma"][1];

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
                        <span>Gestión de Suscripciones y Beneficios para Pilotos</span>
                        <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 rounded-[4px] tracking-wider border border-[#0E5E6F]/20">
                            Pilotos BIODRON
                        </span>
                    </Title>
                    <Text className="text-[11px] text-gray-500 block mt-0.5">
                        Administra tu apoyo técnico, tarifas por uso de plataforma, beneficios operativos y alianzas comerciales para pilotos.
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
                                    <span>Garantía de servicio y soporte técnico para pilotos BIODRON.</span>
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
                                                                BIODRON PILOTO
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

                                    {/* PAGO CON QR */}
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

                                    {/* BOTÓN CANCELAR SUSCRIPCIÓN */}
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
                                            Piloto activo BIODRON
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NAVEGACIÓN POR PESTAÑAS */}
                    <div>
                        <div className="border-b-2 border-gray-200 mb-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 select-none">
                            {[
                                { id: "apoyo-tecnico", label: "Apoyo técnico y taller", icon: <Wrench size={13} /> },
                                { id: "cobros-plataforma", label: "Cobros por plataforma", icon: <Zap size={13} /> },
                                { id: "beneficios-operativos", label: "Beneficios operativos", icon: <Tag size={13} /> },
                                { id: "alianzas-comerciales", label: "Alianzas y repuestos", icon: <UserCheck size={13} /> },
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
                            {activeTab === "apoyo-tecnico" && (
                                <Text className="text-xs text-gray-500 block">
                                    Planes de asistencia técnica, diagnóstico y mantenimiento correctivo especializados para los equipos y drones del piloto.
                                </Text>
                            )}
                            {activeTab === "cobros-plataforma" && (
                                <Text className="text-xs text-gray-500 block">
                                    Tarifas y comisiones preferenciales por el uso de la plataforma BIODRON, gestión de misiones y cobros automatizados.
                                </Text>
                            )}
                            {activeTab === "beneficios-operativos" && (
                                <Text className="text-xs text-gray-500 block">
                                    Ventajas de conectividad RTK, cobertura de protección y herramientas logísticas orientadas a facilitar tu trabajo en campo.
                                </Text>
                            )}
                            {activeTab === "alianzas-comerciales" && (
                                <Text className="text-xs text-gray-500 block">
                                    Convenios exclusivos con descuentos en repuestos originales DJI, programas de renovación de flota y capacitación continua.
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
                            Al cancelar tu suscripción como piloto, perderás el soporte técnico prioritario, las ventajas operativas y las comisiones preferenciales en la plataforma BIODRON a partir de la próxima fecha de corte.
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

// 6. Historial y reporte de vuelos
export const PilotoHistoryView = () => {
  // Datos simulados de historial de vuelos
  const [flights] = useState<FlightLog[]>([
    {
      id: 'FL-2026-089',
      droneId: 'DRON-01',
      droneName: 'Agras Alpha (T40)',
      type: 'fumigation',
      typeName: 'Fumigación agrícola',
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
      typeName: 'Mapeo NDVI multi',
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
      typeName: 'Fertilización foliar',
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
      typeName: 'Análisis térmico de estrés',
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
      typeName: 'Inspección de canopia',
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
      typeName: 'Control de maleza',
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

  // Badge de Estado (Sin icono / Sentence Case)
  const getStatusBadge = (status: FlightLog['status']) => {
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

  // Badge de Tipo de Misión (Sin icono / Sentence Case)
  const getTypeBadge = (type: FlightLog['type']) => {
    switch (type) {
      case 'fumigation':
        return (
          <span className="inline-block text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-[4px] border border-cyan-100">
            Fumigación
          </span>
        );
      case 'mapping':
        return (
          <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
            Mapeo / NDVI
          </span>
        );
      case 'inspection':
        return (
          <span className="inline-block text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-[4px] border border-purple-100">
            Inspección
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full bg-[#f8fafc] overflow-y-auto p-3 sm:p-5 space-y-4 font-['Roboto',sans-serif]">

      {/* ================= ENCABEZADO Y RESUMEN ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-[4px] border border-gray-200 shadow-xs">
        <div>
          {/* Title Case */}
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            Historial de Bitácora y Vuelos
            <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-[4px] border border-gray-200">
              {flights.length} registros
            </span>
          </h1>
          {/* Sentence Case */}
          <p className="text-xs text-gray-500 mt-0.5">
            Registro detallado de misiones de aspersión, fotogrametría y vuelos de prospección.
          </p>
        </div>

        {/* Botón: Sentence Case */}
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
            {/* Subtítulo: Title Case */}
            <p className="text-[11px] text-gray-500 font-medium">Área Cubierta Total</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalArea} <span className="text-xs font-normal text-gray-500">ha</span></h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <Compass size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            {/* Subtítulo: Title Case */}
            <p className="text-[11px] text-gray-500 font-medium">Tiempo Acumulado</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">{totalHours} <span className="text-xs font-normal text-gray-500">hrs</span></h3>
          </div>
          <div className="p-2.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            {/* Subtítulo: Title Case */}
            <p className="text-[11px] text-gray-500 font-medium">Tasa de Éxito</p>
            <h3 className="text-xl font-bold text-emerald-700 mt-0.5">{successRate}%</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <Clock size={18} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            {/* Subtítulo: Title Case */}
            <p className="text-[11px] text-gray-500 font-medium">Volumen Aplicado</p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">1,400 <span className="text-xs font-normal text-gray-500">L</span></h3>
          </div>
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-[4px] shrink-0">
            <Droplets size={18} />
          </div>
        </div>
      </div>

      {/* ================= FILTROS Y BÚSQUEDA ================= */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Buscar por ID, dron, ubicación o piloto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-[4px] text-xs focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Selects: Sentence Case */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-[4px] text-xs text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todas las misiones</option>
            <option value="fumigation">Fumigación</option>
            <option value="mapping">Mapeo / NDVI</option>
            <option value="inspection">Inspección térmica</option>
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
            {/* Encabezados de Tabla: Sentence Case */}
            <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-500 tracking-wider">
              <th className="py-2.5 px-3 w-[20%] sm:w-[16%]">ID / fecha</th>
              <th className="py-2.5 px-2 w-[26%] sm:w-[22%]">Dron / misión</th>
              <th className="py-2.5 px-2 hidden sm:table-cell w-[18%]">Ubicación / piloto</th>
              <th className="py-2.5 px-2 w-[16%] sm:w-[12%] text-center">Duración / área</th>
              <th className="py-2.5 px-2 w-[16%] sm:w-[12%] text-center">Estado</th>
              <th className="py-2.5 px-2 w-[22%] sm:w-[20%] text-center">Acciones</th>
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

                  {/* Acciones: Botón Ver + Botón Descarga PDF fijo en #0E5E6F */}
                  <td className="py-2.5 px-2 text-center">
                    <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedFlight(flight)}
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
                {/* Sentence Case */}
                <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                  No se encontraron registros de vuelo con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer estático: Sentence Case */}
        <div className="p-3 px-4 bg-gray-50/80 border-t border-gray-200 text-[11px] text-gray-500 flex justify-between items-center">
          <span>Mostrando {filteredFlights.length} de {flights.length} registros</span>
        </div>
      </div>

      {/* ================= MODAL DETALLADO DE MISIÓN ================= */}
      {selectedFlight && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-[4px] shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[90vh]">

            {/* Modal Header: Title Case */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0E5E6F] text-white rounded-[4px] font-bold text-xs">
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
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-[4px] transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-[4px] border border-gray-200">
                <div>
                  {/* Etiqueta: Sentence Case */}
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Ubicación</span>
                  <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#0E5E6F]" />
                    {selectedFlight.location}
                  </span>
                </div>
                <div>
                  {/* Etiqueta: Sentence Case */}
                  <span className="text-gray-400 text-[10px] font-semibold uppercase block">Piloto a cargo</span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                    <User size={12} className="text-[#0E5E6F]" />
                    {selectedFlight.pilot}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Duración</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedFlight.duration}</span>
                  <span className="text-[9px] text-gray-400 block">{selectedFlight.startTime} - {selectedFlight.endTime}</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Área cubierta</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedFlight.areaCovered}</span>
                  <span className="text-[9px] text-gray-400 block">Vel. Media: {selectedFlight.avgSpeed}</span>
                </div>

                <div className="p-2.5 bg-gray-50 rounded-[4px] border border-gray-200 text-center">
                  <span className="text-gray-400 text-[10px] uppercase font-semibold block">Batería usada</span>
                  <span className="font-bold text-gray-900 text-sm">{selectedFlight.batteryUsed}%</span>
                  <span className="text-[9px] text-gray-400 block">Alt. Máx: {selectedFlight.maxAltitude}</span>
                </div>
              </div>

              {selectedFlight.productApplied && (
                <div className="p-3 bg-cyan-50/60 border border-cyan-100 rounded-[4px]">
                  {/* Subtítulo Modal: Title Case */}
                  <h4 className="font-bold text-cyan-950 text-xs mb-1 flex items-center gap-1.5">
                    Detalles de Aplicación Líquida
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-cyan-900 mt-2">
                    <div>
                      {/* Sentence Case */}
                      <span className="text-gray-500 text-[10px] block">Producto / insumo:</span>
                      <span className="font-semibold">{selectedFlight.productApplied}</span>
                    </div>
                    <div>
                      {/* Sentence Case */}
                      <span className="text-gray-500 text-[10px] block">Volumen despachado:</span>
                      <span className="font-semibold">{selectedFlight.volumeApplied}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-[4px] border border-gray-200">
                {/* Sentence Case */}
                <span className="text-gray-400 text-[10px] font-semibold uppercase block mb-1">
                  Observaciones de la misión
                </span>
                <p className="text-gray-700 leading-relaxed italic">
                  "{selectedFlight.notes || 'Sin observaciones registradas.'}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 px-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              {/* Botón Acción: Sentence Case */}
              <button
                onClick={() => { }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#0E5E6F] hover:underline cursor-pointer"
              >
                <FileText size={13} />
                <span>Descargar telemetría KML</span>
              </button>

              {/* Botón Cierre: Sentence Case */}
              <button
                onClick={() => setSelectedFlight(null)}
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

// 7. Ayuda a Pilotos
export const PilotoHelpView = () => {
  // Avatar del Piloto actual (Tú)
  const pilotAvatar = 'src/img/piloto_perfil.png';

  // Lista de canales de soporte y administradores disponibles para el Piloto
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'soporte_hardware',
      name: 'Ing. Carlos Mendoza',
      role: 'Soporte técnico & hardware',
      roleType: 'admin',
      avatar: 'src/img/admin_perfil.png',
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: '¡Hola Javier! Vimos que reportaste una fluctuación en el GPS del Dron #2.',
          time: '08:15 AM',
        },
        {
          id: 2,
          sender: 'other',
          text: 'Hola Carlos. Sí, al sobrevolar la Parcela B en Catacamas perdí señal RTK por 10 segundos.',
          time: '08:18 AM',
        },
        {
          id: 3,
          sender: 'granjero',
          text: 'Ya actualizamos la tabla de satélites en tu estación base. Realiza una recalibración de brújula antes del próximo despegue.',
          time: '08:22 AM',
        },
      ],
    },
    {
      id: 'coordinacion_operaciones',
      name: 'Dra. Elena Ramos',
      role: 'Super Admin - Operaciones de campo',
      roleType: 'admin',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Dra. Elena, la misión en Finca El Naranjal quedó completada al 100%.',
          time: 'Ayer',
        },
        {
          id: 2,
          sender: 'granjero',
          text: 'Excelente trabajo Javier. Los datos multiespectrales ya fueron validados por el cliente.',
          time: 'Ayer',
        },
      ],
    },
    {
      id: 'mantenimiento_drones',
      name: 'Técnico Roberto Paz',
      role: 'Mantenimiento & baterías',
      roleType: 'admin',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: 'hoy a las 09:30 AM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'granjero',
          text: 'Javier, recuerda traer las baterías Pack #4 a revisión preventiva este viernes.',
          time: 'Lunes',
        },
        {
          id: 2,
          sender: 'other',
          text: 'Enterado Roberto. Las entrego en el taller al finalizar el vuelo de Catacamas.',
          time: 'Lunes',
        },
      ],
    },
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
    descripcion: '',
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Enviar mensaje como Piloto (sender: 'other')
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'other',
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMsg],
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
      descripcion: '',
    });
  };

  const filteredChats = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative font-sans">
      <div className="flex flex-col md:flex-row flex-1 h-full min-h-0 overflow-hidden">
        {/* ================= BARRA LATERAL (CANALES DE SOPORTE ADMIN) ================= */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-gray-50/60 h-full min-h-0 shrink-0">
          {/* TÍTULO Y BOTÓN DE ASISTENCIA */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">
                Soporte Piloto
              </h2>
              <p className="text-xs text-gray-500">
                Asistencia técnica & administradores
              </p>
            </div>

            {/* BOTÓN NUEVO TICKET / ASISTENCIA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-medium text-xs rounded transition cursor-pointer"
            >
              <Wrench size={15} />
              <span>Pedir ayuda</span>
            </button>
          </div>

          {/* BARRA DE BÚSQUEDA */}
          <div className="p-3 border-b border-gray-200 bg-gray-50/80 shrink-0">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar administrador o área..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded text-sm focus:outline-none focus:border-[#0E5E6F] transition"
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
                      prev.map((c) =>
                        c.id === chat.id ? { ...c, unreadCount: 0 } : c
                      )
                    );
                  }}
                  className={`w-full p-4 flex items-center gap-3 transition text-left cursor-pointer ${
                    isSelected
                      ? 'bg-white border-l-4 border-[#0E5E6F]'
                      : 'hover:bg-gray-100/80'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded object-cover shadow-xs"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                        chat.online ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-gray-900 text-sm truncate">
                        {chat.name}
                      </h3>
                      {lastMsg && (
                        <span className="text-[11px] text-gray-400 font-medium shrink-0 ml-1">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0E5E6F] font-semibold mb-1 truncate">
                      {chat.role}
                    </p>
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
                  className="w-12 h-12 rounded object-cover"
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
                        Desconectado{' '}
                        {activeChat.lastSeen ? `(${activeChat.lastSeen})` : ''}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center gap-1 text-gray-500 shrink-0">
              <button
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded transition"
                aria-label="Llamada directa"
              >
                <Phone size={18} />
              </button>

              <button
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded transition"
                aria-label="Videollamada de asistencia"
              >
                <Video size={18} />
              </button>

              <button
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded transition"
                aria-label="Opciones"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* HISTORIAL DE MENSAJES */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
            {activeChat.messages.map((msg) => {
              const isPilotMsg = msg.sender === 'other';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isPilotMsg ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isPilotMsg && (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-7 h-7 rounded object-cover mb-1 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded text-sm ${
                      isPilotMsg
                        ? 'bg-[#0E5E6F] text-white'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>

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
                      className="w-7 h-7 rounded object-cover mb-1 shrink-0 border border-gray-200"
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
              className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded transition shrink-0"
              title="Adjuntar log de vuelo o captura"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Escribe tu consulta o reporte al administrador..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition min-w-0"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0E5E6F] text-white rounded hover:bg-[#0A4754] disabled:opacity-40 disabled:hover:bg-[#0E5E6F] transition cursor-pointer shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* ================= MODAL DE SOLICITUD DE ASISTENCIA TÉCNICA ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
            {/* Header del Modal */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded">
                  <Wrench size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    Solicitar Asistencia Técnica
                  </h3>
                  <p className="text-xs text-gray-500">
                    Reporte directo al administrador / soporte
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition cursor-pointer"
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
                      Dron asignado / equipo
                    </label>
                    <select
                      value={supportForm.dron}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, dron: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Dron #1 - DJI Mavic 3 Multispectral">
                        Dron #1 - DJI Mavic 3 Multispectral
                      </option>
                      <option value="Dron #2 - DJI Agras T40">
                        Dron #2 - DJI Agras T40
                      </option>
                      <option value="Dron #3 - Sentera 65">
                        Dron #3 - Sentera 65
                      </option>
                      <option value="Estación Base RTK / Control">
                        Estación base RTK / control
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tipo de incidencia
                    </label>
                    <select
                      value={supportForm.categoria}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          categoria: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Falla de Telemetría / GPS">
                        Falla de telemetría / pérdida RTK
                      </option>
                      <option value="Calibración de Sensores">
                        Calibración de cámara / sensores
                      </option>
                      <option value="Desgaste / Falla Batería">
                        Batería / alarma de voltaje
                      </option>
                      <option value="Autorización de Ruta / Clima">
                        Autorización de vuelo / alerta climática
                      </option>
                      <option value="Otro">Otro problema técnico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      value={supportForm.prioridad}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          prioridad: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
                    >
                      <option value="Baja">Baja (consulta general)</option>
                      <option value="Media">Media (pre-vuelo)</option>
                      <option value="Alta (En Campo)">
                        Alta (operación detenida en campo)
                      </option>
                      <option value="Urgente">
                        Urgente (falla crítica o falla de equipo)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Detalle de la falla o solicitud
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe los síntomas, mensajes de error en el control o condiciones en campo..."
                      value={supportForm.descripcion}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          descripcion: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded transition cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-medium text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded shadow-xs transition cursor-pointer"
                    >
                      Enviar reporte
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
                    <h4 className="text-lg font-bold text-gray-900">
                      ¡Solicitud enviada!
                    </h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      El equipo de administradores y soporte técnico ha recibido
                      tu reporte de campo. Te contactarán por este chat.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={closeModal}
                      className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-medium rounded transition cursor-pointer"
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

// 8. Perfil de piloto
export const PilotoProfileView = ({ onLogout }: PilotoProfileViewProps) => {
    // Configuración exclusiva para el Piloto
    const initialProfile = {
        initials: "CP",
        name: "Carlos Sosa",
        email: "carlos_sosa@agroaguante.hn",
        phone: "+504 9544-1234",
        password: "••••••••••••",
        avatar: "src/img/piloto_perfil.png",
        avatarBg: "bg-[#0E5E6F] text-white",
        roleLabel: "Piloto · Operador de Drones",
        location: "Base Operativa San Pedro Sula, Cortés",
        area: "3,400 ha pulverizadas",
        services: "142 misiones completadas",
        standing: "Activo",
        roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30",
        description: "Piloto certificado de sistemas aéreos no tripulados para agricultura de precisión.",
    };

    const [profileData, setProfileData] = useState(initialProfile);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Estados cosméticos para simular la subida sin abrir nada
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

    // Simula que procesa una foto sin abrir la ventana de archivos de la PC
    const handleFakeUpload = () => {
        if (isUploading) return;
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setSimulatedFile("foto_perfil_actualizada.jpg");
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
                    {/* Base Regional */}
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

                    {/* Cobertura */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <Layers size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Cobertura Total
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
                            {profileData.area}
                        </span>
                    </div>

                    {/* Historial */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-[4px]">
                                <BarChart2 size={16} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Historial
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block truncate leading-tight mt-0.5">
                            {profileData.services}
                        </span>
                    </div>

                    {/* Estado */}
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
                        Base Operativa SPS, Cortés
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