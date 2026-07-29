import { Home, Tag } from '@mui/icons-material';
import { BarChart2, Check, CheckCircle, Edit2, Eye, EyeOff, Layers, LogOut, Mail, MapPin, Lock, Phone, Save, Settings, Wrench, X, ChevronDown, Bell, Sliders, Trash2, Activity, AlertTriangle, BarChart3, ChevronRight, Clock, Cpu, DollarSign, Download, Package, SearchIcon, ShieldCheck, Zap, CheckCheck, CheckCircle2, MoreVertical, Paperclip, Search, Send, Video, User, Briefcase, ClipboardCheck, Calendar, Compass, Camera, Loader2, Upload, AlertCircle, ArrowLeft, Building2, CreditCard, Network, QrCode, UserCheck, Wallet, XCircle, Edit3, Filter, Users, ChevronLeft } from 'lucide-react';
import React, { useState, useRef} from 'react';

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
        className={`px-4 py-2 tracking-wider transition-all border-2 rounded-[4px] ${primary
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

export type OriginType = "client" | "admin" | "pilot";
export type RequestStatus = "Pendiente" | "Aceptada" | "En diagnóstico" | "Rechazada" | "Completada";
export type PriorityLevel = "Alta" | "Media" | "Baja" | "Crítica";

export type TabType = 
    | "gestion-solicitudes"
    | "comisiones-intermediacion"
    | "soporte-herramientas"
    | "alianzas-tecnicas";


interface TecnicoProfileViewProps {
    onLogout: () => void;
}

interface TecnicoDashboardProps {
    onNavigate?: (route: string) => void;
}

// Interfaces de tipos
interface Message {
  id: number;
  sender: 'tecnico' | 'other';
  text: string;
  time: string;
}

interface Chat {
  id: string;
  name: string;
  role: string;
  roleType: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
  lastSeen?: string;
  messages: Message[];
}

interface TecnicoProfileViewProps {
  onLogout: () => void;
}

interface TechnicianLog {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'maintenance' | 'calibration' | 'repair';
  typeName: string;
  location: string;
  technician: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  componentsChecked: string;
  sparePartUsed?: string;
  partCost?: string;
  status: 'completed' | 'interrupted' | 'failed';
  diagnosticScore: number;
  workOrder: string;
  notes?: string;
}

export interface TechRequest {
  id: string;
  origin: OriginType;
  requesterName: string;
  requesterContact: string;
  equipment: string;
  issueSummary: string;
  location: string;
  date: string;
  priority: PriorityLevel;
  status: RequestStatus;
  description: string;
  estimatedHours?: number;
}

// 1. Dashboard del Técnico
export const TecnicoDashboardView: React.FC<TecnicoDashboardProps> = ({ onNavigate }) => {
    // Estados de control UI
    const [activeTab, setActiveTab] = useState<string>("mantenimiento");
    const [chartPeriod, setChartPeriod] = useState<"semana" | "mes" | "anio">("mes");
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [tableSearch, setTableSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("todos");
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    // Estados para simular el gesto táctil de deslizar (swipe down) en el modal
    const [dragY, setDragY] = useState<number>(0);
    const touchStartY = useRef<number>(0);
    const isDraggingModal = useRef<boolean>(false);

    // Paleta de colores
    const HEX_COLORS = {
        brandGreen: "#0E5E6F",
        emerald100: "#D1FAE5",
        red: "#B8001F",
        amber100: "#FEF3C7",
        blue100: "#DBEAFE",
        orange100: "#FFEDD5",
        purple100: "#F3E8FF",
    };

    // Notificaciones del técnico
    const [notificaciones, setNotificaciones] = useState([
        {
            id: 1,
            tipo: "asignacion",
            titulo: "Nueva orden asignada",
            detalle: "Reemplazo de variadores ESC y motor 3 en dron Agras T40 (#ORD-902).",
            tiempo: "Hace 15 min",
            colorBg: HEX_COLORS.blue100,
            textColor: "#1E40AF",
            icono: <Wrench size={13} />,
            unread: true,
        },
        {
            id: 2,
            tipo: "pago",
            titulo: "Liquidación de ganancias",
            detalle: "Se depositó L.31,000.00 correspondiente a los trabajos de la semana pasada.",
            tiempo: "Hace 3 horas",
            colorBg: HEX_COLORS.emerald100,
            textColor: "#065F46",
            icono: <DollarSign size={13} />,
            unread: true,
        },
        {
            id: 3,
            tipo: "repuesto",
            titulo: "Stock de repuestos",
            detalle: "Arribaron 10 juegos de hélices de carbono y 4 módulos IMU a taller.",
            tiempo: "Hace 6 horas",
            colorBg: HEX_COLORS.purple100,
            textColor: "#6B21A8",
            icono: <Package size={13} />,
            unread: false,
        },
        {
            id: 4,
            tipo: "alerta",
            titulo: "Dron en ruta con falla",
            detalle: "Matrice 300 RTK reporta error de brújula en campo. Preparar consola de calibración.",
            tiempo: "Ayer, 04:15 PM",
            colorBg: HEX_COLORS.amber100,
            textColor: "#92400E",
            icono: <AlertTriangle size={13} />,
            unread: false,
        },
    ]);

    // Manejadores para el gesto táctil de cierre rápido del modal
    const handleTouchStartModal = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        isDraggingModal.current = true;
    };

    const handleTouchMoveModal = (e: React.TouchEvent) => {
        if (!isDraggingModal.current) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY.current;
        if (deltaY > 0) {
            setDragY(deltaY);
        }
    };

    const handleTouchEndModal = () => {
        isDraggingModal.current = false;
        if (dragY > 50) {
            setShowNotifications(false);
        }
        setDragY(0);
    };

    const handleGoToSupportLogs = () => {
        if (typeof onNavigate === "function") {
            onNavigate("TecnicoSoporteView");
        }
    };

    // Datos para los gráficos de GANANCIAS (Lempiras)
    const chartData: Record<
        string,
        Record<string, { label: string; valor: number; detalle: string; unidad: string }[]>
    > = {
        mantenimiento: {
            semana: [
                { label: "Lun", valor: 4500, detalle: "2 motores cambiados", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 6250, detalle: "1 overhaul de Agras T30", unidad: "Lempiras (L)" },
                { label: "Mié", valor: 3000, detalle: "Mantenimiento preventivo", unidad: "Lempiras (L)" },
                { label: "Jue", valor: 7750, detalle: "Reemplazo de tren de aterrizaje", unidad: "Lempiras (L)" },
                { label: "Vie", valor: 10500, detalle: "Reparación de placa madre", unidad: "Lempiras (L)" },
                { label: "Sáb", valor: 7250, detalle: "3 mantenimientos rápidos", unidad: "Lempiras (L)" },
                { label: "Dom", valor: 0, detalle: "Sin servicios programados", unidad: "Lempiras (L)" },
            ],
            mes: [
                { label: "Ene", valor: 36250, detalle: "18 intervenciones", unidad: "Lempiras (L)" },
                { label: "Feb", valor: 45000, detalle: "22 intervenciones", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 41250, detalle: "19 intervenciones", unidad: "Lempiras (L)" },
                { label: "Abr", valor: 52500, detalle: "25 intervenciones", unidad: "Lempiras (L)" },
                { label: "May", valor: 60000, detalle: "28 intervenciones", unidad: "Lempiras (L)" },
                { label: "Jun", valor: 71250, detalle: "32 intervenciones", unidad: "Lempiras (L)" },
            ],
            anio: [
                { label: "2023", valor: 362500, detalle: "180 servicios completados", unidad: "Lempiras (L)" },
                { label: "2024", valor: 550000, detalle: "260 servicios completados", unidad: "Lempiras (L)" },
                { label: "2025", valor: 787500, detalle: "340 servicios completados", unidad: "Lempiras (L)" },
                { label: "2026", valor: 950000, detalle: "Proyección actual", unidad: "Lempiras (L)" },
            ],
        },
        configuracion: {
            semana: [
                { label: "Lun", valor: 2250, detalle: "Calibración sensores NDVI", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 3750, detalle: "Actualización firmware v4.2", unidad: "Lempiras (L)" },
                { label: "Mié", valor: 2000, detalle: "Configuración PID de vuelo", unidad: "Lempiras (L)" },
                { label: "Jue", valor: 5000, detalle: "Mapeo de RTK base station", unidad: "Lempiras (L)" },
                { label: "Vie", valor: 4500, detalle: "Flashing de controladores", unidad: "Lempiras (L)" },
                { label: "Sáb", valor: 3000, detalle: "Ajuste de radar ultrasónico", unidad: "Lempiras (L)" },
                { label: "Dom", valor: 0, detalle: "Descanso", unidad: "Lempiras (L)" },
            ],
            mes: [
                { label: "Ene", valor: 20000, detalle: "12 configuraciones", unidad: "Lempiras (L)" },
                { label: "Feb", valor: 23750, detalle: "15 configuraciones", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 27500, detalle: "18 configuraciones", unidad: "Lempiras (L)" },
                { label: "Abr", valor: 32500, detalle: "20 configuraciones", unidad: "Lempiras (L)" },
                { label: "May", valor: 38750, detalle: "24 configuraciones", unidad: "Lempiras (L)" },
                { label: "Jun", valor: 43750, detalle: "27 configuraciones", unidad: "Lempiras (L)" },
            ],
            anio: [
                { label: "2023", valor: 212500, detalle: "110 flotas ajustadas", unidad: "Lempiras (L)" },
                { label: "2024", valor: 310000, detalle: "160 flotas ajustadas", unidad: "Lempiras (L)" },
                { label: "2025", valor: 420000, detalle: "210 flotas ajustadas", unidad: "Lempiras (L)" },
                { label: "2026", valor: 525000, detalle: "Ritmo de crecimiento +25%", unidad: "Lempiras (L)" },
            ],
        },
        diagnostico: {
            semana: [
                { label: "Lun", valor: 1250, detalle: "Escaneo de telemetría post-vuelo", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 2500, detalle: "Diagnóstico estructural tras caída", unidad: "Lempiras (L)" },
                { label: "Mié", valor: 1250, detalle: "Test de celdas LiPo / baterías", unidad: "Lempiras (L)" },
                { label: "Jue", valor: 3750, detalle: "Inspección térmica de electrónica", unidad: "Lempiras (L)" },
                { label: "Vie", valor: 2000, detalle: "Revisión de transmisión de video", unidad: "Lempiras (L)" },
                { label: "Sáb", valor: 3000, detalle: "Diagnóstico general de flota", unidad: "Lempiras (L)" },
                { label: "Dom", valor: 0, detalle: "Sin servicio", unidad: "Lempiras (L)" },
            ],
            mes: [
                { label: "Ene", valor: 11250, detalle: "9 diagnósticos", unidad: "Lempiras (L)" },
                { label: "Feb", valor: 15000, detalle: "12 diagnósticos", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 13750, detalle: "11 diagnósticos", unidad: "Lempiras (L)" },
                { label: "Abr", valor: 20000, detalle: "16 diagnósticos", unidad: "Lempiras (L)" },
                { label: "May", valor: 23750, detalle: "19 diagnósticos", unidad: "Lempiras (L)" },
                { label: "Jun", valor: 27500, detalle: "22 diagnósticos", unidad: "Lempiras (L)" },
            ],
            anio: [
                { label: "2023", valor: 105000, detalle: "85 reportes técnicos", unidad: "Lempiras (L)" },
                { label: "2024", valor: 170000, detalle: "130 reportes técnicos", unidad: "Lempiras (L)" },
                { label: "2025", valor: 237500, detalle: "180 reportes técnicos", unidad: "Lempiras (L)" },
                { label: "2026", valor: 300000, detalle: "Estimación anual", unidad: "Lempiras (L)" },
            ],
        },
        guardias: {
            semana: [
                { label: "Lun", valor: 0, detalle: "Sin llamadas de emergencia", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 5500, detalle: "Rescate técnico en campo - noche", unidad: "Lempiras (L)" },
                { label: "Mié", valor: 0, detalle: "Sin incidencias", unidad: "Lempiras (L)" },
                { label: "Jue", valor: 4500, detalle: "Sustitución exprés de gimbal", unidad: "Lempiras (L)" },
                { label: "Vie", valor: 7500, detalle: "Asistencia remota en fumigación", unidad: "Lempiras (L)" },
                { label: "Sáb", valor: 6250, detalle: "Soporte presencial en Finca B", unidad: "Lempiras (L)" },
                { label: "Dom", valor: 3750, detalle: "Atención de contingencia", unidad: "Lempiras (L)" },
            ],
            mes: [
                { label: "Ene", valor: 22500, detalle: "4 guardias activas", unidad: "Lempiras (L)" },
                { label: "Feb", valor: 30000, detalle: "6 guardias activas", unidad: "Lempiras (L)" },
                { label: "Mar", valor: 21250, detalle: "4 guardias activas", unidad: "Lempiras (L)" },
                { label: "Abr", valor: 35000, detalle: "7 guardias activas", unidad: "Lempiras (L)" },
                { label: "May", valor: 40000, detalle: "8 guardias activas", unidad: "Lempiras (L)" },
                { label: "Jun", valor: 47500, detalle: "10 guardias activas", unidad: "Lempiras (L)" },
            ],
            anio: [
                { label: "2023", valor: 195000, detalle: "35 emergencias atendidas", unidad: "Lempiras (L)" },
                { label: "2024", valor: 280000, detalle: "52 emergencias atendidas", unidad: "Lempiras (L)" },
                { label: "2025", valor: 385000, detalle: "70 emergencias atendidas", unidad: "Lempiras (L)" },
                { label: "2026", valor: 472500, detalle: "Nivel de disponibilidad alto", unidad: "Lempiras (L)" },
            ],
        },
    };

    // Registros de trabajos técnicos
    const datosRegistros: Record<string, any[]> = {
        mantenimiento: [
            {
                id: "ORD-901",
                fecha: "2026-07-24",
                ubicacion: "Taller Central - Mesa 2",
                objetivo: "Cambio de motores Brushless M1 y calibración de ESC",
                dron: "DJI Agras T40",
                duracion: "2h 30min",
                repuestos: "2x motor KV100, 1x ESC 80A",
                ganancia: "L. 4,500.00",
                estado: "Completado",
                tagColorBg: HEX_COLORS.emerald100,
                tagTextColor: "#065F46",
            },
            {
                id: "ORD-895",
                fecha: "2026-07-22",
                ubicacion: "Campo Valle Amarateca",
                objetivo: "Reemplazo preventivo de bombas de asperjado y mangueras",
                dron: "Agras T30",
                duracion: "1h 45min",
                repuestos: "Kit de diafragmas, boquillas pulverizadoras",
                ganancia: "L. 3,250.00",
                estado: "Completado",
                tagColorBg: HEX_COLORS.emerald100,
                tagTextColor: "#065F46",
            },
            {
                id: "ORD-880",
                fecha: "2026-07-19",
                ubicacion: "Taller Central - Mesa 1",
                objetivo: "Reparación de rajadura en chasis de fibra de carbono",
                dron: "Matrice 300 RTK",
                duracion: "4h 00min",
                repuestos: "Brazo izq. superior, resina epóxica alta resistencia",
                ganancia: "L. 6,000.00",
                estado: "En alerta",
                tagColorBg: HEX_COLORS.amber100,
                tagTextColor: "#92400E",
            },
        ],
        configuracion: [
            {
                id: "CFG-302",
                fecha: "2026-07-25",
                ubicacion: "Remoto / Consola BIODRON",
                objetivo: "Actualización de firmware v4.2.10 y mapa de exclusión GPS",
                dron: "Ehang Thermal 184",
                duracion: "45 min",
                repuestos: "Ninguno (software/licencia)",
                ganancia: "L. 2,000.00",
                estado: "Completado",
                tagColorBg: HEX_COLORS.emerald100,
                tagTextColor: "#065F46",
            },
            {
                id: "CFG-298",
                fecha: "2026-07-21",
                ubicacion: "Finca El Hatillo",
                objetivo: "Calibración de cámara multiespectral y sensor de luz radiométrica",
                dron: "Mavic 3 Multispectral",
                duracion: "1h 15min",
                repuestos: "Target de reflectancia",
                ganancia: "L. 2,750.00",
                estado: "Completado",
                tagColorBg: HEX_COLORS.emerald100,
                tagTextColor: "#065F46",
            },
        ],
        diagnostico: [
            {
                id: "DX-104",
                fecha: "2026-07-23",
                ubicacion: "Taller Central",
                objetivo: "Análisis de falla de telemetría pérdida intermitente de señal RF",
                dron: "FlyCart 30",
                duracion: "1h 30min",
                repuestos: "Cable coaxial antena internal",
                ganancia: "L. 2,375.00",
                estado: "Completado",
                tagColorBg: HEX_COLORS.emerald100,
                tagTextColor: "#065F46",
            },
            {
                id: "DX-099",
                fecha: "2026-07-17",
                ubicacion: "Taller Central",
                objetivo: "Testeo de degradación de ciclo de carga en 8 baterías LiPo 12S",
                dron: "Baterías Smart B12",
                duracion: "3h 00min",
                repuestos: "Analizador de carga de banco",
                ganancia: "L. 3,000.00",
                estado: "En proceso",
                tagColorBg: HEX_COLORS.blue100,
                tagTextColor: "#1E40AF",
            },
        ],
        guardias: [
            {
                id: "GRD-055",
                fecha: "2026-07-24",
                ubicacion: "Sector Norte - Parcela A",
                objetivo: "Atención de emergencia: Dron atascado en árboles y recalentamiento",
                dron: "Agras T40",
                duracion: "2h 10min",
                repuestos: "4x juegos de hélice 54 pulgadas",
                ganancia: "L. 5,500.00",
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
            item.dron.toLowerCase().includes(tableSearch.toLowerCase()) ||
            item.repuestos.toLowerCase().includes(tableSearch.toLowerCase());

        if (statusFilter === "todos") return matchesSearch;
        if (statusFilter === "completado") return matchesSearch && item.estado.toLowerCase() === "completado";
        if (statusFilter === "proceso") return matchesSearch && item.estado.toLowerCase() === "en proceso";
        if (statusFilter === "alerta") return matchesSearch && item.estado.toLowerCase() === "en alerta";

        return matchesSearch;
    });

    const currentChartSet = chartData[activeTab]?.[chartPeriod] || [];
    const maxChartValue = Math.max(...currentChartSet.map((d) => d.valor), 100);
    const chartUnit = currentChartSet[0]?.unidad || "Lempiras (L)";

    // Eje Y en 5 niveles
    const yAxisTicks = [
        Math.round(maxChartValue),
        Math.round(maxChartValue * 0.75),
        Math.round(maxChartValue * 0.5),
        Math.round(maxChartValue * 0.25),
        0,
    ];

    const unreadCount = notificaciones.filter((n) => n.unread).length;

    // Formatea números grandes de forma compacta para el eje Y
    const formatCompactHNL = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);

    return (
        <div
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="p-4 w-full mx-auto bg-white antialiased text-gray-800 font-sans"
        >
            {/* BARRA SUPERIOR */}
            <div className="flex flex-col gap-3 mb-5 pb-4 border-b-2 border-gray-100 select-none relative">
                <div className="flex items-start justify-between gap-2">
                    <div className="text-left space-y-0.5 min-w-0">
                        <h1 className="text-base font-black text-gray-900 tracking-tight leading-tight">
                            Ganancias y Soporte Técnico
                        </h1>
                        <p className="text-gray-500 text-[10px] font-medium tracking-wide leading-tight">
                            Consola del Especialista • Configuración, Diagnóstico y Reparación
                        </p>
                    </div>
                </div>

                {/* Badge Nivel Técnico */}
                <div
                    style={{
                        backgroundColor: HEX_COLORS.emerald100,
                        color: "#065F46",
                        borderRadius: "4px",
                    }}
                    className="px-2.5 py-1 border border-emerald-300 flex items-center gap-1.5 shadow-xs w-fit"
                >
                    <span className="w-1.5 h-1.5 bg-[#065F46] rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold">Técnico certificado master</span>
                </div>
            </div>

            {/* MÉTRICAS SUMMARY */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                <div
                    style={{ borderRadius: "4px" }}
                    className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-gray-500">
                            Ganancias del mes
                        </span>
                        <div
                            style={{
                                backgroundColor: HEX_COLORS.emerald100,
                                color: "#065F46",
                                borderRadius: "4px",
                            }}
                            className="p-1 flex items-center justify-center shrink-0"
                        >
                            <DollarSign size={13} />
                        </div>
                    </div>
                    <p className="text-sm font-black text-gray-900 mb-0.5">
                        L. 71,250.00
                    </p>
                    <p className="text-[9px] text-emerald-600 font-bold">
                        ↑ +14.5% vs anterior
                    </p>
                </div>

                <div
                    style={{ borderRadius: "4px" }}
                    className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-gray-500">
                            Drones reparados
                        </span>
                        <div
                            style={{
                                backgroundColor: HEX_COLORS.blue100,
                                color: "#1E40AF",
                                borderRadius: "4px",
                            }}
                            className="p-1 flex items-center justify-center shrink-0"
                        >
                            <Wrench size={13} />
                        </div>
                    </div>
                    <p className="text-sm font-black text-gray-900 mb-0.5 truncate">
                        32 Unidades
                    </p>
                    <p className="text-[9px] text-gray-400 font-semibold truncate">
                        100% pruebas superadas
                    </p>
                </div>

                <div
                    style={{ borderRadius: "4px" }}
                    className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-gray-500 truncate">
                            Tiempo promedio
                        </span>
                        <div
                            style={{
                                backgroundColor: HEX_COLORS.purple100,
                                color: "#6B21A8",
                                borderRadius: "4px",
                            }}
                            className="p-1 flex items-center justify-center shrink-0"
                        >
                            <Clock size={13} />
                        </div>
                    </div>
                    <p className="text-sm font-black text-gray-900 mb-0.5 truncate">
                        1.8 Hrs / Serv.
                    </p>
                    <p className="text-[9px] text-gray-400 font-semibold truncate">
                        Eficiencia optimizada
                    </p>
                </div>

                <div
                    style={{ borderRadius: "4px" }}
                    className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-gray-500 truncate">
                            Valor promedio
                        </span>
                        <div
                            style={{
                                backgroundColor: HEX_COLORS.amber100,
                                color: "#92400E",
                                borderRadius: "4px",
                            }}
                            className="p-1 flex items-center justify-center shrink-0"
                        >
                            <Activity size={13} />
                        </div>
                    </div>
                    <p className="text-sm font-black text-gray-900 mb-0.5 truncate">
                        L. 1,625 / hr
                    </p>
                    <p className="text-[9px] text-gray-400 font-semibold truncate">
                        Tarifa certificada
                    </p>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE EN LUGAR DE PESTAÑAS HORIZONTALES */}
            <div className="mb-6 w-full">
                <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    style={{ borderRadius: "4px" }}
                    className="w-full border-2 border-gray-200 px-3 py-2 text-xs font-bold bg-white text-[#0E5E6F] focus:border-[#0E5E6F] outline-none cursor-pointer"
                >
                    <option value="mantenimiento">Reparación</option>
                    <option value="configuracion">Firmware</option>
                    <option value="diagnostico">Diagnósticos</option>
                    <option value="guardias">Guardias</option>
                </select>
            </div>

            {/* GRÁFICO CON BARRAS DELGADAS Y AJUSTADO AL ANCHO DE PANTALLA */}
            <div
                style={{ borderRadius: "4px" }}
                className="bg-white border-2 border-gray-200 p-3.5 shadow-xs mb-8 text-left"
            >
                <div className="flex flex-col gap-3 mb-4 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <BarChart3 size={17} className="text-[#0E5E6F] shrink-0" />
                        <div className="min-w-0">
                            <h3 className="text-[11px] font-black text-gray-900 leading-tight">
                                Desglose de Ingresos por Categoría
                            </h3>
                            <p className="text-[10px] text-gray-500 font-medium leading-tight truncate">
                                Escala eje Y: <strong className="text-gray-700">{chartUnit}</strong>
                            </p>
                        </div>
                    </div>

                    <div
                        style={{ borderRadius: "4px" }}
                        className="bg-gray-100 p-1 grid grid-cols-3 gap-1 border border-gray-200"
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
                                className={`px-2 py-1.5 text-[11px] font-bold transition-all ${chartPeriod === p.id
                                        ? "bg-[#0E5E6F] text-white shadow-xs"
                                        : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative pt-4 pb-2 w-full">
                    <div className="flex h-44 w-full">
                        {/* EJE Y */}
                        <div className="w-9 flex flex-col justify-between items-end pr-1.5 border-r-2 border-gray-300 text-[8px] font-mono font-bold text-gray-400 py-1 select-none shrink-0">
                            {yAxisTicks.map((tick, i) => (
                                <span key={i}>L.{formatCompactHNL(tick)}</span>
                            ))}
                        </div>

                        {/* CONTENEDOR DE BARRAS DELGADAS SIN SCROLL */}
                        <div className="flex-1 flex flex-col w-full min-w-0">
                            <div className="relative flex items-end h-full px-1 w-full">
                                <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0 px-1">
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
                                            className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer z-10 px-0.5"
                                            onClick={() => setHoveredBar(hoveredBar === idx ? null : idx)}
                                        >
                                            {/* Tooltip */}
                                            {hoveredBar === idx && (
                                                <div
                                                    style={{ borderRadius: "4px" }}
                                                    className="absolute -top-11 z-30 bg-gray-900 text-white px-2 py-1 text-[9px] font-mono shadow-xl whitespace-nowrap text-center animate-in fade-in duration-100"
                                                >
                                                    <p className="font-bold">
                                                        L. {item.valor.toLocaleString()}
                                                    </p>
                                                    <p className="text-gray-300 text-[8px]">{item.detalle}</p>
                                                </div>
                                            )}

                                            <span className="text-[8px] font-black text-gray-700 mb-0.5 opacity-80 truncate max-w-full">
                                                {formatCompactHNL(item.valor)}
                                            </span>

                                            {/* BARRA DELGADA (max-w-[18px]) */}
                                            <div
                                                style={{
                                                    height: `${heightPercent}%`,
                                                    backgroundColor: currentColor,
                                                    borderRadius: "3px 3px 0 0",
                                                }}
                                                className="w-full max-w-[18px] transition-all duration-300 border-t border-x border-black/10"
                                            ></div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* EJE X */}
                            <div className="flex pt-1.5 px-1 border-t-2 border-gray-300 w-full">
                                {currentChartSet.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="flex-1 text-center text-[8px] font-bold text-gray-500 truncate"
                                    >
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HISTORIAL DE INTERVENCIONES */}
            <div
                style={{ borderRadius: "4px" }}
                className="bg-white border-2 border-gray-200 shadow-xs text-left overflow-hidden mb-8"
            >
                <div className="p-3.5 border-b-2 border-gray-100 bg-gray-50/50 flex flex-col gap-3">
                    <div>
                        <h3 className="text-xs font-black text-gray-900">
                            Historial de Intervenciones Técnicas
                        </h3>
                        <p className="text-[11px] text-gray-500 font-medium">
                            Detalle de mantenimiento, piezas y honorarios (HNL)
                        </p>
                    </div>

                    <div className="relative w-full">
                        <SearchIcon
                            size={13}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={tableSearch}
                            onChange={(e) => setTableSearch(e.target.value)}
                            placeholder="Buscar id, dron, repuesto..."
                            style={{ borderRadius: "4px" }}
                            className="w-full pl-8 pr-8 py-2 text-xs bg-white border border-gray-300 focus:outline-none focus:border-[#0E5E6F] font-medium"
                        />
                        {tableSearch && (
                            <button
                                onClick={() => setTableSearch("")}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    {/* MENÚ DESPLEGABLE DE FILTROS DE ESTADO */}
                    <div className="w-full">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ borderRadius: "4px" }}
                            className="w-full border border-gray-300 px-3 py-2 text-xs font-bold bg-white text-[#0E5E6F] focus:border-[#0E5E6F] outline-none cursor-pointer"
                        >
                            <option value="todos">Todos los estados</option>
                            <option value="completado">Completados</option>
                            <option value="proceso">En proceso</option>
                            <option value="alerta">En revisión</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {registrosActuales.length > 0 ? (
                        registrosActuales.map((row) => (
                            <div key={row.id} className="p-3.5 active:bg-gray-50/80 transition-colors">
                                <div className="flex justify-between items-start gap-2 mb-1.5">
                                    <div>
                                        <p className="font-extrabold text-gray-900 text-xs leading-tight">{row.id}</p>
                                        <p className="text-[9px] text-gray-400 font-mono leading-none mt-0.5">{row.fecha}</p>
                                    </div>
                                    <span
                                        style={{
                                            backgroundColor: row.tagColorBg,
                                            color: row.tagTextColor,
                                            borderRadius: "4px",
                                        }}
                                        className="px-1.5 py-0.5 font-bold text-[9px] inline-block border border-black/5 shrink-0"
                                    >
                                        {row.estado}
                                    </span>
                                </div>

                                <p className="font-medium text-gray-800 text-[11px] leading-snug mb-1.5">
                                    {row.objetivo}
                                </p>

                                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold mb-1">
                                    <MapPin size={11} className="text-gray-400 shrink-0" />
                                    <span className="truncate">{row.ubicacion}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="shrink-0">{row.duracion}</span>
                                </div>

                                <p className="text-[9px] text-gray-500 font-mono bg-gray-100 px-1.5 py-1 rounded inline-block mb-2">
                                    📦 {row.repuestos}
                                </p>

                                <div className="flex justify-between items-center pt-1.5 border-t border-gray-100">
                                    <span className="font-bold text-[#0E5E6F] text-[11px] truncate">{row.dron}</span>
                                    <span className="font-black text-emerald-700 text-xs shrink-0">{row.ganancia}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-6 text-center text-gray-400 font-medium text-xs">
                            No se encontraron servicios o trabajos registrados.
                        </div>
                    )}
                </div>

                <div className="p-3 border-t border-gray-100 bg-gray-50/40 flex flex-col gap-2.5">
                    <span className="text-[10px] font-bold text-gray-400 text-center">
                        {registrosActuales.length} registros técnicos encontrados
                    </span>
                    <button
                        style={{
                            borderRadius: "4px",
                            backgroundColor: HEX_COLORS.brandGreen,
                        }}
                        className="w-full py-2.5 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-xs"
                    >
                        <Download size={12} />
                        Exportar reporte financiero PDF
                    </button>
                </div>
            </div>

            {/* BANNER INFERIOR */}
            <div
                style={{ borderRadius: "4px" }}
                className="border-2 border-gray-200 p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex flex-col justify-between items-stretch gap-4 text-left shadow-xs"
            >
                <div className="flex items-center gap-3.5">
                    <div
                        style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.emerald100 }}
                        className="p-2.5 text-emerald-800 shrink-0 border border-emerald-200"
                    >
                        <ShieldCheck size={18} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-gray-900 leading-tight">
                            ¿Un Dron BIODRON Requiere Asistencia Prioritaria en Campo?
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-snug">
                            Abre la bitácora de soporte técnico para atender tickets urgentes.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoToSupportLogs}
                    style={{
                        borderRadius: "4px",
                        backgroundColor: HEX_COLORS.brandGreen,
                    }}
                    className="w-full px-5 py-2.5 text-white text-xs font-bold hover:bg-[#094350] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <span>Atender tickets de soporte</span>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

// 2. Solicitudes del Técnico
export const TecnicoRequestView = () => {
  const [activeTab, setActiveTab] = useState<OriginType>("client");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modals
  const [editingRequest, setEditingRequest] = useState<TechRequest | null>(null);
  const [deletingRequestId, setDeletingRequestId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'info' | 'detalles' | 'gestion'>('info');

  // DATA STORE
  const [requests, setRequests] = useState<TechRequest[]>([
    // --- 5 SOLICITUDES DE CLIENTES ---
    {
      id: "TR-CLIENT-01",
      origin: "client",
      requesterName: "Comercializadora El Valle",
      requesterContact: "contacto@elvalle.hn",
      equipment: "DJI Agras T40 (HN-0091)",
      issueSummary: "Calibración de boquillas atomizadoras y fuga en bomba",
      location: "Danlí, El Paraíso",
      date: "25/07/2026",
      priority: "Alta",
      status: "Pendiente",
      description: "El cliente reporta presión irregular durante el rociado en cultivo de maíz. Requiere revisión técnica e inspección de sellos antes de la siguiente jornada.",
      estimatedHours: 4
    },
    {
      id: "TR-CLIENT-02",
      origin: "client",
      requesterName: "Finca El Agualote",
      requesterContact: "finca_agualote@gmail.com",
      equipment: "Batería DJI DB1500",
      issueSummary: "Sobrecalentamiento en ciclos de carga rápida",
      location: "San Esteban, Olancho",
      date: "22/07/2026",
      priority: "Media",
      status: "En diagnóstico",
      description: "La batería corta la carga al llegar al 80% e indica advertencia de temperatura en el cargador inteligente.",
      estimatedHours: 2
    },
    {
      id: "TR-CLIENT-03",
      origin: "client",
      requesterName: "Agropecuaria Yoro",
      requesterContact: "operaciones@agroyoro.hn",
      equipment: "DJI Agras T30",
      issueSummary: "Mantenimiento preventivo de 100 horas de vuelo",
      location: "Taller San Pedro Sula",
      date: "18/07/2026",
      priority: "Baja",
      status: "Completada",
      description: "Limpieza profunda de motores, actualización de firmware y ajuste del tren de aterrizaje.",
      estimatedHours: 6
    },
    {
      id: "TR-CLIENT-04",
      origin: "client",
      requesterName: "Hacienda Nueva Esperanza",
      requesterContact: "admin@nesperanza.hn",
      equipment: "DJI Agras T40 (HN-0088)",
      issueSummary: "Falla en sensor de radar de obstáculos trasero",
      location: "Juticalpa, Olancho",
      date: "15/07/2026",
      priority: "Alta",
      status: "Aceptada",
      description: "El radar emite falsa alarma de proximidad al volar en terreno plano. Requiere recalibración o cambio de módulo.",
      estimatedHours: 3
    },
    {
      id: "TR-CLIENT-05",
      origin: "client",
      requesterName: "Inversiones Agrícolas del Sur",
      requesterContact: "soporte@iasur.hn",
      equipment: "Generador diésel D12000i",
      issueSummary: "Dificultad en arranque eléctrico e inestabilidad de voltaje",
      location: "Choluteca, Choluteca",
      date: "10/07/2026",
      priority: "Crítica",
      status: "Rechazada",
      description: "Solicitud rechazada en taller móvil por falta de repuestos mecánicos del motor térmico. Se derivó al distribuidor de planta.",
      estimatedHours: 0
    },

    // --- 5 SOLICITUDES DE ADMINISTRADORES ---
    {
      id: "TR-ADMIN-101",
      origin: "admin",
      requesterName: "Gerencia de operaciones",
      requesterContact: "admin@biodron.hn",
      equipment: "Estación de carga central #2",
      issueSummary: "Inspección y certificación para temporada alta",
      location: "Taller Central Tegucigalpa",
      date: "26/07/2026",
      priority: "Media",
      status: "Pendiente",
      description: "Auditoría preventiva de bancos de baterías, generadores a diésel y herramientas de taller para homologación anual.",
      estimatedHours: 8
    },
    {
      id: "TR-ADMIN-102",
      origin: "admin",
      requesterName: "Coordinación logística",
      requesterContact: "logistica@biodron.hn",
      equipment: "DJI Matrice 300 RTK",
      issueSummary: "Instalación y prueba de sensor multiespectral MicaSense",
      location: "Comayagua, Comayagua",
      date: "20/07/2026",
      priority: "Alta",
      status: "Aceptada",
      description: "Montaje de kit de integración y calibración de cámara para proyecto de fotogrametría en zona central.",
      estimatedHours: 5
    },
    {
      id: "TR-ADMIN-103",
      origin: "admin",
      requesterName: "Supervisión de flota",
      requesterContact: "flota@biodron.hn",
      equipment: "Flota DJI Agras T50 (3 unidades)",
      issueSummary: "Actualización de firmware de seguridad obligatorio",
      location: "Todas las sedes",
      date: "17/07/2026",
      priority: "Alta",
      status: "Completada",
      description: "Parche del fabricante DJI para resolver pérdida fortuita de enlace de telemetría en zonas de alta interferencia.",
      estimatedHours: 4
    },
    {
      id: "TR-ADMIN-104",
      origin: "admin",
      requesterName: "Dirección técnica",
      requesterContact: "direccion.tecnica@biodron.hn",
      equipment: "Laboratorio de pruebas de baterías",
      issueSummary: "Reemplazo de conectores de carga rápida por desgaste",
      location: "Taller San Pedro Sula",
      date: "12/07/2026",
      priority: "Media",
      status: "En diagnóstico",
      description: "Evaluación de resistencia de terminales en cargadores trifásicos para evitar puntos calientes durante la operación.",
      estimatedHours: 3
    },
    {
      id: "TR-ADMIN-105",
      origin: "admin",
      requesterName: "Jefatura de inventario",
      requesterContact: "bodega@biodron.hn",
      equipment: "Módulos RTK D-RTK 2",
      issueSummary: "Diagnóstico de 2 antenas base con error de sincronización GPS",
      location: "Tegucigalpa, FM",
      date: "08/07/2026",
      priority: "Baja",
      status: "Rechazada",
      description: "Las antenas presentan daños permanentes en placa principal por sobrevoltaje de tormenta eléctrica. Se requiere reemplazo total.",
      estimatedHours: 1
    },

    // --- 5 SOLICITUDES DE PILOTOS ---
    {
      id: "TR-PILOT-201",
      origin: "pilot",
      requesterName: "Javier Reyes (Piloto A-492)",
      requesterContact: "javier.reyes@biodron.hn",
      equipment: "DJI Agras T50 (HN-0104)",
      issueSummary: "Falla de sensor de obstáculos por impacto menor",
      location: "Catacamas, Olancho",
      date: "26/07/2026",
      priority: "Crítica",
      status: "Pendiente",
      description: "Durante aterrizaje de emergencia ocurrió colisión leve con matorral. El radar Phased Array presenta código de error E-402.",
      estimatedHours: 6
    },
    {
      id: "TR-PILOT-202",
      origin: "pilot",
      requesterName: "María Gómez (Piloto A-501)",
      requesterContact: "maria.gomez@biodron.hn",
      equipment: "Control remoto RM700",
      issueSummary: "Pérdida intermitente de señal de video O3 Enterprise",
      location: "Choluteca, Choluteca",
      date: "24/07/2026",
      priority: "Alta",
      status: "Aceptada",
      description: "Se detectó parpadeo en la pantalla durante vuelos a más de 800m. Posible problema en antenas omnidireccionales.",
      estimatedHours: 3
    },
    {
      id: "TR-PILOT-203",
      origin: "pilot",
      requesterName: "Héctor Ramírez (Piloto A-388)",
      requesterContact: "hector.ramirez@biodron.hn",
      equipment: "Dron de reconocimiento Mavic 3E",
      issueSummary: "Reemplazo de hélices y calibración de IMU",
      location: "El Progreso, Yoro",
      date: "15/07/2026",
      priority: "Baja",
      status: "Rechazada",
      description: "Solicitud rechazada debida a falta de repuestos originales en stock local; transferida a sede Tegucigalpa.",
      estimatedHours: 1
    },
    {
      id: "TR-PILOT-204",
      origin: "pilot",
      requesterName: "Carlos Alvarado (Piloto sol.)",
      requesterContact: "carlos.alvarado@gmail.com",
      equipment: "DJI Agras T40 (HN-0077)",
      issueSummary: "Obstrucción en sistema de aspersión centrífuga",
      location: "Comayagua, Comayagua",
      date: "11/07/2026",
      priority: "Media",
      status: "Completada",
      description: "Sedimento acumulado en mangueras principales de distribución. Se realizó purgado y sustitución de filtros de malla.",
      estimatedHours: 2
    },
    {
      id: "TR-PILOT-205",
      origin: "pilot",
      requesterName: "María Gómez (Piloto A-501)",
      requesterContact: "maria.gomez@biodron.hn",
      equipment: "Batería DB1500 (Serie #0892)",
      issueSummary: "Celda #3 presenta desbalance de voltaje en reposo",
      location: "Choluteca, Choluteca",
      date: "05/07/2026",
      priority: "Alta",
      status: "En diagnóstico",
      description: "Notificación de alerta en la app DJIGo durante el test pre-vuelo. Batería puesta en cuarentena para análisis de descarga.",
      estimatedHours: 4
    }
  ]);

  // Quick Action Handlers
  const handleDeleteRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    setDeletingRequestId(null);
  };

  const handleSaveEditedRequest = () => {
    if (!editingRequest) return;
    setRequests(prev => prev.map(r => (r.id === editingRequest.id ? editingRequest : r)));
    setEditingRequest(null);
  };

  // Filtering Logic
  const filteredRequests = requests.filter(req => {
    const matchesTab = req.origin === activeTab;
    const matchesStatus = statusFilter === "ALL" || req.status === statusFilter;
    const matchesSearch =
      req.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.issueSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesStatus && matchesSearch;
  });

  // Metric Helpers
  const countByOrigin = (origin: OriginType) => requests.filter(r => r.origin === origin).length;
  const countPending = requests.filter(r => r.status === "Pendiente").length;
  const countInProcess = requests.filter(r => r.status === "Aceptada" || r.status === "En diagnóstico").length;

  // Colores de estado reutilizados en la vista de tarjetas
  const statusClasses = (status: string) =>
    status === "Aceptada" || status === "Completada"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "Rechazada"
      ? "border-red-200 bg-red-50 text-red-700"
      : status === "Pendiente"
      ? "border-amber-300 bg-amber-100 text-amber-800"
      : "border-purple-200 bg-purple-50 text-purple-700";

  return (
    <div
      className="p-4 w-full mx-auto bg-white antialiased text-gray-800 select-none"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* HEADER (APILADO) */}
      <div className="flex flex-col mb-5 pb-3 border-b-2 border-gray-200 text-left gap-1">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          Gestión de Solicitudes Técnicas y Mantenimiento
        </h1>
        <p className="text-gray-500 text-[11px] font-normal leading-snug">
          Atiende, diagnostica y resuelve incidentes reportados por clientes, administración y pilotos.
        </p>
      </div>

      {/* MÉTRICAS (2 COLUMNAS) */}
      <div className="grid grid-cols-2 gap-3 mb-5 text-left">
        <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-gray-400 tracking-wider block truncate">Clientes</span>
            <span className="text-lg font-black text-gray-900">{countByOrigin("client")}</span>
          </div>
          <div className="p-1.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] shrink-0">
            <Users size={16} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-gray-400 tracking-wider block truncate">Pilotos</span>
            <span className="text-lg font-black text-gray-900">{countByOrigin("pilot")}</span>
          </div>
          <div className="p-1.5 bg-blue-50 text-blue-700 rounded-[4px] shrink-0">
            <ShieldCheck size={16} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-gray-400 tracking-wider block truncate">Pendientes</span>
            <span className="text-lg font-black text-amber-600">{countPending}</span>
          </div>
          <div className="p-1.5 bg-amber-50 text-amber-700 rounded-[4px] shrink-0">
            <Clock size={16} />
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-[4px] p-3 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[9px] font-bold text-gray-400 tracking-wider block truncate">En taller</span>
            <span className="text-lg font-black text-purple-700">{countInProcess}</span>
          </div>
          <div className="p-1.5 bg-purple-50 text-purple-700 rounded-[4px] shrink-0">
            <Wrench size={16} />
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE DE ORIGEN (REEMPLAZA LAS PESTAÑAS) */}
      <div className="mb-4 w-full">
        <select
          value={activeTab}
          onChange={(e) => {
            setActiveTab(e.target.value as OriginType);
            setStatusFilter("ALL");
          }}
          className="w-full border-2 border-gray-200 rounded-[4px] px-3 py-2 text-xs bg-white text-[#0E5E6F] font-bold focus:border-[#0E5E6F] outline-none"
        >
          <option value="client">Clientes ({countByOrigin("client")})</option>
          <option value="admin">Administradores ({countByOrigin("admin")})</option>
          <option value="pilot">Pilotos ({countByOrigin("pilot")})</option>
        </select>
      </div>

      {/* BUSCADOR Y FILTRO (ANCHO COMPLETO, APILADOS) */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative w-full">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por código, cliente o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-2 border-2 border-gray-200 rounded-[4px] text-xs focus:border-[#0E5E6F] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-[4px] px-2 py-2 text-xs bg-white text-gray-700 font-bold focus:border-[#0E5E6F] outline-none"
          >
            <option value="ALL">Todos los estados</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aceptada">Aceptadas</option>
            <option value="En diagnóstico">En diagnóstico</option>
            <option value="Rechazada">Rechazadas</option>
            <option value="Completada">Completadas</option>
          </select>
        </div>
      </div>

      {/* LISTA DE SOLICITUDES — TARJETAS EN VEZ DE TABLA */}
      <div className="bg-white border-2 border-gray-200 rounded-[4px] shadow-xs overflow-hidden text-left mb-4">
        {filteredRequests.length === 0 ? (
          <div className="py-8 text-center text-gray-400 font-medium text-xs">
            No hay registros.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredRequests.map((req) => (
              <div key={req.id} className="p-3.5">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] text-gray-600 truncate">{req.id}</span>
                    <span className="text-[9px] text-gray-400 font-normal flex items-center gap-0.5 mt-0.5">
                      <Calendar size={9} /> {req.date}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] border ${statusClasses(req.status)}`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="mb-1.5">
                  <p className="font-bold text-gray-900 text-[12px] truncate">{req.requesterName}</p>
                  <p className="text-[9px] text-gray-400 font-mono truncate">{req.requesterContact}</p>
                </div>

                <div className="mb-1.5">
                  <p className="text-[11px] font-semibold text-gray-800 truncate">{req.equipment}</p>
                  <p className="text-[9px] text-gray-400 flex items-center gap-0.5 truncate">
                    <MapPin size={9} className="shrink-0" /> <span className="truncate">{req.location}</span>
                  </p>
                </div>

                <p className="text-[11px] text-gray-700 leading-snug mb-2.5">
                  {req.issueSummary}
                </p>

                <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditingRequest({ ...req });
                      setModalTab('info');
                    }}
                    className="flex-1 px-2 py-1.5 bg-[#0E5E6F] text-white text-[11px] font-semibold rounded-[4px] hover:bg-[#0a4754] transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Edit3 size={11} />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => setDeletingRequestId(req.id)}
                    className="px-2.5 py-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded-[4px] transition-colors cursor-pointer flex items-center justify-center"
                    title="Eliminar solicitud"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================
          MODAL DE EDICIÓN CON PESTAÑAS
          ========================================================= */}
      {editingRequest && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-[4px] shadow-2xl max-w-xs w-full overflow-hidden text-left font-sans flex flex-col max-h-[90vh]">
            
            {/* Header del Modal */}
            <div className="flex justify-between items-center border-b border-gray-100 p-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 bg-[#0E5E6F] text-white rounded-[4px] text-[9px] font-bold shrink-0">
                  {editingRequest.id}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 truncate">
                    {editingRequest.equipment}
                  </h3>
                  <p className="text-[9px] text-gray-400 truncate">
                    {editingRequest.requesterName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingRequest(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Pestañas */}
            <div className="flex border-b border-gray-200 shrink-0">
              <button
                onClick={() => setModalTab('info')}
                className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                  modalTab === 'info'
                    ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Información
              </button>
              <button
                onClick={() => setModalTab('detalles')}
                className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                  modalTab === 'detalles'
                    ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Detalles
              </button>
              <button
                onClick={() => setModalTab('gestion')}
                className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                  modalTab === 'gestion'
                    ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Gestión
              </button>
            </div>

            {/* Contenido del Modal según pestaña */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Pestaña 1: Información General */}
              {modalTab === 'info' && (
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Prioridad</span>
                      <span className={`font-bold text-xs ${
                        editingRequest.priority === "Crítica" ? "text-red-600" :
                        editingRequest.priority === "Alta" ? "text-orange-600" :
                        editingRequest.priority === "Media" ? "text-amber-600" :
                        "text-gray-600"
                      }`}>
                        {editingRequest.priority}
                      </span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Estado</span>
                      <span className="font-bold text-gray-800">{editingRequest.status}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Solicitante</span>
                    <span className="font-bold text-gray-800">{editingRequest.requesterName}</span>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Contacto</span>
                    <span className="font-bold text-[#0E5E6F] text-[10px]">{editingRequest.requesterContact}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Fecha</span>
                      <span className="font-bold text-gray-800">{editingRequest.date}</span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Horas estimadas</span>
                      <span className="font-bold text-gray-800">{editingRequest.estimatedHours}h</span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Equipo</span>
                    <span className="font-bold text-gray-800 text-[10px]">{editingRequest.equipment}</span>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Ubicación</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <MapPin size={11} className="text-[#0E5E6F]" />
                      {editingRequest.location}
                    </span>
                  </div>
                </div>
              )}

              {/* Pestaña 2: Detalles */}
              {modalTab === 'detalles' && (
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Resumen del problema</span>
                    <p className="font-semibold text-gray-800">{editingRequest.issueSummary}</p>
                  </div>
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Descripción completa</span>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{editingRequest.description}</p>
                  </div>
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Origen</span>
                    <span className={`font-bold text-xs px-2 py-0.5 rounded-[4px] ${
                      editingRequest.origin === 'client' ? 'bg-[#0E5E6F]/10 text-[#0E5E6F]' :
                      editingRequest.origin === 'admin' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {editingRequest.origin === 'client' ? 'Cliente' :
                       editingRequest.origin === 'admin' ? 'Administrador' : 'Piloto'}
                    </span>
                  </div>
                </div>
              )}

              {/* Pestaña 3: Gestión */}
              {modalTab === 'gestion' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-gray-800 text-[11px] mb-1">Cambiar Estado:</label>
                    <select
                      value={editingRequest.status}
                      onChange={(e) =>
                        setEditingRequest({
                          ...editingRequest,
                          status: e.target.value as RequestStatus
                        })
                      }
                      className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-bold bg-white text-gray-800 focus:border-[#0E5E6F] outline-none cursor-pointer"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aceptada">Aceptada</option>
                      <option value="En diagnóstico">En diagnóstico</option>
                      <option value="Rechazada">Rechazada</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-800 text-[11px] mb-1">Cambiar Prioridad:</label>
                    <select
                      value={editingRequest.priority}
                      onChange={(e) =>
                        setEditingRequest({
                          ...editingRequest,
                          priority: e.target.value as PriorityLevel
                        })
                      }
                      className="w-full border-2 border-gray-200 rounded-[4px] p-2 text-xs font-bold bg-white text-gray-800 focus:border-[#0E5E6F] outline-none cursor-pointer"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="Crítica">Crítica</option>
                    </select>
                  </div>

                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Horas estimadas actuales</span>
                    <span className="font-bold text-gray-800">{editingRequest.estimatedHours}h</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="flex gap-2 p-3 pt-2 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setEditingRequest(null)}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEditedRequest}
                className="flex-1 px-3 py-2 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs"
              >
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          MODAL ELIMINAR (ESTILOS APLICADOS DESDE 1.TXT)
          ========================================================= */}
      {deletingRequestId && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-[4px] shadow-2xl max-w-xs w-full overflow-hidden text-left p-4 space-y-3 font-sans">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2 text-red-600 font-bold text-xs">
              <AlertTriangle size={16} /> <span>¿Confirmar eliminación?</span>
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-[4px] p-2.5 space-y-1 text-[11px]">
              <p className="font-bold text-gray-900">Solicitud: <span className="text-[#0E5E6F]">{deletingRequestId}</span></p>
              <p className="text-gray-500 text-[10px]">Esta acción eliminará permanentemente la solicitud.</p>
            </div>

            <p className="text-[11px] text-gray-600">Esta acción no se puede deshacer y borrará la solicitud del sistema.</p>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => setDeletingRequestId(null)} className="px-3 py-1.5 border border-gray-300 text-gray-700 font-bold text-xs rounded-[4px] hover:bg-gray-100 cursor-pointer">
                Cancelar
              </button>
              <button onClick={() => handleDeleteRequest(deletingRequestId)} className="px-4 py-1.5 bg-red-600 text-white font-bold text-xs rounded-[4px] hover:bg-red-700 cursor-pointer shadow-xs">
                Eliminar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Suscripciones del Técnico
export const TecnicoSuscripcionesView = () => {
    const [activeTab, setActiveTab] = useState<TabType>("gestion-solicitudes");
    const [activePlanId, setActivePlanId] = useState<string>("plan-tecnico-operativo");
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

    // BASE DE DATOS DE PLANES ADAPTADA PARA TÉCNICOS INTERMEDIARIOS
    const catalogos = {
        "gestion-solicitudes": [
            {
                id: "tecnico-solicitudes-basico",
                nombre: "Enrutamiento Básico de Órdenes",
                precio: "L 850",
                precioNum: 850,
                periodo: "/mes",
                etiqueta: "Gestión Estándar",
                descripcion: "Canaliza y procesa solicitudes enviadas por administradores provenientes de clientes y pilotos.",
                caracteristicas: [
                    "Recepción de solicitudes de servicio primarias.",
                    "Panel de asignación y estatus de órdenes de campo.",
                    "Soporte de comunicación directa con administradores."
                ],
                destacado: false,
            },
            {
                id: "plan-tecnico-operativo",
                nombre: "Coordinación Avanzada Admin-Piloto",
                precio: "L 2,100",
                precioNum: 2100,
                periodo: "/mes",
                etiqueta: "Más Popular",
                descripcion: "Infraestructura completa de intermediación para gestionar flujos de trabajo complejos entre admins, clientes y pilotos.",
                caracteristicas: [
                    "Prioridad en el procesamiento y despacho de solicitudes.",
                    "Herramientas de mediación y resolución de incidencias.",
                    "Reportes detallados de rendimiento de intermediación."
                ],
                destacado: true,
            },
            {
                id: "tecnico-solicitudes-premium",
                nombre: "Central de Operaciones Técnicas Full",
                precio: "L 4,500",
                precioNum: 4500,
                periodo: "/mes",
                etiqueta: "Corporativo",
                descripcion: "Capacidad ilimitada de gestión de solicitudes de alta prioridad con soporte multi-administrador.",
                caracteristicas: [
                    "Canal dedicado para emergencias operativas de campo.",
                    "Automatización de reenvío de reportes a clientes y pilotos.",
                    "Asesor técnico administrativo asignado."
                ],
                destacado: false,
            }
        ],
        "comisiones-intermediacion": [
            {
                id: "tecnico-comision-estandar",
                nombre: "Comisión Estándar de Enlace",
                precio: "L 1,000",
                precioNum: 1000,
                periodo: "/mes",
                etiqueta: "Independiente",
                descripcion: "Estructura de cobros y retornos por la mediación técnica entre los requerimientos de la administración y la ejecución.",
                caracteristicas: [
                    "Liquidación automatizada semanal por gestión de enlace.",
                    "Acceso a la pasarela de pagos segura BIODRON.",
                    "Comisión preferencial por ticket validado."
                ],
                destacado: false,
            },
            {
                id: "tecnico-comision-pro",
                nombre: "Membresía de Intermediación Pro",
                precio: "L 2,400",
                precioNum: 2400,
                periodo: "/mes",
                etiqueta: "Recomendado",
                descripcion: "Optimiza tus márgenes de intermediación con tarifas preferenciales y desembolsos rápidos.",
                caracteristicas: [
                    "Retención reducida en servicios de enlace coordinados.",
                    "Desembolsos prioritarios en menos de 24 horas.",
                    "Historial financiero consolidado para auditorías."
                ],
                destacado: true,
            },
            {
                id: "tecnico-comision-flota",
                nombre: "Red Global de Soporte Técnico",
                precio: "L 4,900",
                precioNum: 4900,
                periodo: "/mes",
                etiqueta: "Multitaller",
                descripcion: "Modelo corporativo para equipos técnicos grandes que operan como red central de intermediación.",
                caracteristicas: [
                    "Subcuentas para operadores técnicos asociados.",
                    "Consolidación de ingresos por múltiples canales.",
                    "Soporte financiero y fiscal especializado."
                ],
                destacado: false,
            }
        ],
        "soporte-herramientas": [
            {
                id: "tecnico-herramienta-remota",
                nombre: "Kit de Diagnóstico Remoto",
                precio: "L 750",
                precioNum: 750,
                periodo: "/mes",
                etiqueta: "Diagnóstico",
                descripcion: "Herramientas de software para revisar bitácoras de vuelo y reportes enviados por pilotos antes de escalar al admin.",
                caracteristicas: [
                    "Analizador rápido de bitácoras y registros de error.",
                    "Acceso a base de datos de fallas comunes en drones.",
                    "Canal directo de consulta con soporte de plataforma."
                ],
                destacado: false,
            },
            {
                id: "tecnico-herramienta-telemetria",
                nombre: "Licencia de Telemetría y Bitácoras",
                precio: "L 1,800",
                precioNum: 1800,
                periodo: "/mes",
                etiqueta: "Esencial",
                descripcion: "Monitoreo en tiempo real de los equipos para validar las solicitudes que emiten los pilotos en campo.",
                caracteristicas: [
                    "Visualización de telemetría en vivo de aeronaves.",
                    "Validación técnica automatizada de reportes de vuelo.",
                    "Historial de mantenimiento sincronizado por equipo."
                ],
                destacado: true,
            },
            {
                id: "tecnico-herramienta-estacion",
                nombre: "Estación de Ingeniería y Mantenimiento",
                precio: "L 3,200",
                precioNum: 3200,
                periodo: "/mes",
                etiqueta: "Avanzado",
                descripcion: "Suite completa para talleres técnicos autorizados que reciben componentes críticos para revisión.",
                caracteristicas: [
                    "Gestión de inventario de piezas y repuestos en taller.",
                    "Generación de certificados de operatividad técnica.",
                    "Acceso a manuales de servicio de fábrica actualizados."
                ],
                destacado: false,
            }
        ],
        "alianzas-tecnicas": [
            {
                id: "tecnico-alianza-componentes",
                nombre: "Convenio de Componentes y Herramientas",
                precio: "L 1,400",
                precioNum: 1400,
                periodo: "/mes",
                etiqueta: "Descuentos",
                descripcion: "Beneficios comerciales en la adquisición de herramientas de banco y refacciones para reparaciones.",
                caracteristicas: [
                    "15% de descuento en instrumentación de taller.",
                    "Acceso prioritario a stock de componentes críticos.",
                    "Garantía extendida en refacciones adquiridas."
                ],
                destacado: false,
            },
            {
                id: "tecnico-alianza-banco",
                nombre: "Programa de Actualización de Banco de Pruebas",
                precio: "L 3,500",
                precioNum: 3500,
                periodo: "/mes",
                etiqueta: "Actualización",
                descripcion: "Alianzas estratégicas para mantener tu taller equipado con tecnología de punta para diagnóstico.",
                caracteristicas: [
                    "Financiación preferencial para equipos de medición.",
                    "Bonos de renovación para simuladores y bancos de carga.",
                    "Asesoría técnica especializada en nuevas tecnologías."
                ],
                destacado: true,
            },
            {
                id: "tecnico-alianza-certificacion",
                nombre: "Certificación y Soporte de Fábrica",
                precio: "L 2,000",
                precioNum: 2000,
                periodo: "/mes",
                etiqueta: "Capacitación",
                descripcion: "Programas de certificación oficial para técnicos intermediarios en sistemas agrícolas avanzados.",
                caracteristicas: [
                    "Cursos oficiales de calibración y reparación de drones.",
                    "Credencial oficial de Técnico Autorizado BIODRON.",
                    "Talleres de actualización semestrales con expertos."
                ],
                destacado: false,
            }
        ]
    };

    const todosLosPlanes = [
        ...catalogos["gestion-solicitudes"],
        ...catalogos["comisiones-intermediacion"],
        ...catalogos["soporte-herramientas"],
        ...catalogos["alianzas-tecnicas"]
    ];

    const planActual = todosLosPlanes.find((p) => p.id === activePlanId) || catalogos["gestion-solicitudes"][1];

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
    };

    return (
        /* El contenedor principal actúa como Marco Relativo para el Modal Sticky */
        <div 
            className="relative w-full h-full max-w-md mx-auto text-left antialiased text-gray-800 select-none touch-manipulation overflow-hidden"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            <style>{`
                html, body, div, select, textarea {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
                ::-webkit-scrollbar {
                    display: none !important;
                    width: 0px !important;
                    height: 0px !important;
                    background: transparent !important;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none !important;
                    width: 0px !important;
                }
                .no-scrollbar {
                    -ms-overflow-style: none !important;
                    scrollbar-width: none !important;
                }
            `}</style>

            {/* CONTENIDO SCROLLEABLE SEPARADO DEL MODAL */}
            <div className="w-full h-full p-3 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                {/* CABECERA PRINCIPAL */}
                <div className="border-b border-gray-200 pb-2.5 flex flex-col gap-1 shrink-0">
                    <Title className="text-lg font-extrabold text-gray-900 tracking-tight flex flex-col items-start gap-1.5">
                        <span>Gestión de Suscripciones y Enlace para Técnicos</span>
                        <span className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 rounded-[4px] tracking-wider border border-[#0E5E6F]/20">
                            Técnicos Intermediarios
                        </span>
                    </Title>
                    <Text className="text-[11px] text-gray-500 block mt-0.5">
                        Administra tu capacidad de intermediación entre administradores, clientes y pilotos, además de herramientas de diagnóstico y alianzas técnicas.
                    </Text>
                </div>

                {/* PROCESO DE PAGO */}
                {selectedPlanForCheckout ? (
                    <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                        <button
                            onClick={() => setSelectedPlanForCheckout(null)}
                            className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-[4px] border border-gray-200 transition active:scale-95"
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
                                    Tu suscripción técnica ha sido registrada correctamente para <strong>{selectedPlanForCheckout.nombre}</strong>.
                                </Text>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 items-stretch">
                                {/* FORMULARIO DE PAGO */}
                                <div className="bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                    <div>
                                        {/* Selector de Método de Pago */}
                                        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-[4px] border border-gray-200 mb-2.5">
                                            <button
                                                onClick={() => setPaymentMethod("card")}
                                                className={`py-1.5 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${paymentMethod === "card"
                                                        ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                    }`}
                                            >
                                                <CreditCard size={13} />
                                                <span>Tarjeta</span>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod("transfer")}
                                                className={`py-1.5 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${paymentMethod === "transfer"
                                                        ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                    }`}
                                            >
                                                <Building2 size={13} />
                                                <span>Bancos</span>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod("qr")}
                                                className={`py-1.5 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${paymentMethod === "qr"
                                                        ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                    }`}
                                            >
                                                <QrCode size={13} />
                                                <span>Código QR</span>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod("wallet")}
                                                className={`py-1.5 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${paymentMethod === "wallet"
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
                                                    <div className="grid grid-cols-2 gap-1.5">
                                                        {["PixelPay", "ClinPays", "Recurrente", "Pagadito"].map((gateway) => (
                                                            <button
                                                                key={gateway}
                                                                onClick={() => setSelectedGateway(gateway)}
                                                                className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer active:scale-95 ${selectedGateway === gateway
                                                                        ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                {gateway}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3 items-center">
                                                    <div className="flex justify-center">
                                                        <div className="w-full max-w-[190px] aspect-[1.58/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0E5E6F] text-white p-2.5 rounded-[4px] shadow-sm border border-slate-700 flex flex-col justify-between">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300">
                                                                    BIODRON TÉCNICO
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

                                                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
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
                                                    <div className="grid grid-cols-1 gap-2 text-[10px]">
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

                                                <div className="border border-dashed border-gray-300 rounded-[4px] p-2.5 text-center flex items-center justify-center gap-2 hover:border-[#0E5E6F] transition cursor-pointer active:scale-95 bg-gray-50/50">
                                                    <Upload size={16} className="text-[#0E5E6F]" />
                                                    <span className="text-gray-700 text-[11px]">
                                                        Subir comprobante de pago
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* PAGO CON QR */}
                                        {paymentMethod === "qr" && (
                                            <div className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-200 rounded-[4px] p-3">
                                                <div className="flex-1 w-full">
                                                    <span className="text-gray-700 text-[10px] block mb-1.5">Generar código mediante:</span>
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {["PixelPay", "Banrural", "Atlántida"].map((wallet) => (
                                                            <button
                                                                key={wallet}
                                                                onClick={() => setSelectedQrWallet(wallet)}
                                                                className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer active:scale-95 ${selectedQrWallet === wallet
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
                                                <div className="shrink-0 p-2 bg-white border border-gray-200 rounded-[4px] shadow-sm flex items-center justify-center">
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
                                        className="w-full py-2.5 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] disabled:bg-gray-300 text-white text-xs rounded-[4px] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-2 active:scale-95"
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

                                {/* RESUMEN DEL PLAN */}
                                <div className="bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
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
                                        <span>Garantía de conectividad y soporte de intermediación técnica BIODRON.</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* VISTA PRINCIPAL CON SELECCIÓN Y PLAN ACTIVO */
                    <div className="flex flex-col gap-5">
                        {/* PLAN ACTIVO ACTUAL */}
                        {planActual && (
                            <div className="bg-white border-2 border-[#0E5E6F] rounded-[4px] shadow-sm overflow-hidden">
                                <div className="bg-[#0E5E6F] px-4 py-2 flex items-center gap-2">
                                    <CheckCircle2 size={15} className="text-white shrink-0" />
                                    <span className="text-white text-[11px] font-bold tracking-wide">
                                        Plan Activo
                                    </span>
                                    <span className="ml-auto text-[10px] text-white/90 bg-white/15 px-2 py-0.5 rounded-[4px] border border-white/20">
                                        Renovación automática
                                    </span>
                                </div>

                                <div className="p-4 flex flex-col gap-3.5">
                                    <div>
                                        <Title as="h2" className="text-lg font-black text-gray-900 leading-tight">
                                            {planActual.nombre}
                                        </Title>
                                        <Text className="text-xs text-[#555555] block mt-1">
                                            {planActual.descripcion}
                                        </Text>
                                    </div>

                                    <div className="bg-[#0E5E6F]/5 border border-[#0E5E6F]/20 rounded-[4px] px-3.5 py-3 flex items-baseline justify-between">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                                            Costo actual
                                        </span>
                                        <span className="text-2xl font-black text-[#0E5E6F]">
                                            {planActual.precio}{" "}
                                            <span className="text-xs font-normal text-gray-500">
                                                {planActual.periodo}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex flex-col divide-y divide-gray-100 bg-gray-50/80 rounded-[4px] border border-gray-200/80 overflow-hidden">
                                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                                            <div className="p-1.5 bg-white rounded-[4px] border border-gray-200 shrink-0">
                                                <Calendar size={14} className="text-[#0E5E6F]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase text-gray-400 leading-none">
                                                    Próximo vencimiento
                                                </span>
                                                <span className="text-xs font-bold text-gray-800 mt-1">
                                                    15 de agosto, 2026
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                                            <div className="p-1.5 bg-white rounded-[4px] border border-gray-200 shrink-0">
                                                <CreditCard size={14} className="text-[#0E5E6F]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase text-gray-400 leading-none">
                                                    Método registrado
                                                </span>
                                                <span className="text-xs font-bold text-gray-800 mt-1">
                                                    Visa terminada en •••• 4021
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                                            <div className="p-1.5 bg-white rounded-[4px] border border-gray-200 shrink-0">
                                                <Network size={14} className="text-[#0E5E6F]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase text-gray-400 leading-none">
                                                    Rol de enlace
                                                </span>
                                                <span className="text-xs font-bold text-gray-800 mt-1">
                                                    Técnico Intermediario Activo
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowCancelModal(true)}
                                        style={{
                                            borderColor: "#B8001F",
                                            color: "#B8001F",
                                            borderRadius: "4px",
                                        }}
                                        className="w-full px-3 py-2.5 border-2 text-xs font-bold bg-white hover:bg-red-50 transition-colors active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <XCircle size={14} />
                                        <span>Cancelar suscripción</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="mb-4">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                                    Categoría de servicios
                                </label>
                                <select
                                    value={activeTab}
                                    onChange={(e) => setActiveTab(e.target.value as TabType)}
                                    className="w-full text-xs font-bold bg-white border-2 border-gray-200 text-gray-800 rounded-[4px] p-2.5 focus:border-[#0E5E6F] focus:outline-none shadow-xs cursor-pointer"
                                >
                                    <option value="gestion-solicitudes">Gestión de solicitudes</option>
                                    <option value="comisiones-intermediacion">Comisiones e intermediación</option>
                                    <option value="soporte-herramientas">Herramientas y diagnóstico</option>
                                    <option value="alianzas-tecnicas">Alianzas y repuestos</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                {activeTab === "gestion-solicitudes" && (
                                    <Text className="text-xs text-gray-500 block">
                                        Planes para recibir, canalizar y procesar las solicitudes enviadas por los administradores en nombre de clientes y pilotos.
                                    </Text>
                                )}
                                {activeTab === "comisiones-intermediacion" && (
                                    <Text className="text-xs text-gray-500 block">
                                        Estructuras de comisiones, pagos automatizados y retornos financieros por tu labor de enlace técnico.
                                    </Text>
                                )}
                                {activeTab === "soporte-herramientas" && (
                                    <Text className="text-xs text-gray-500 block">
                                        Software de diagnóstico remoto, telemetría en vivo y validación de bitácoras de operación para técnicos certificados.
                                    </Text>
                                )}
                                {activeTab === "alianzas-tecnicas" && (
                                    <Text className="text-xs text-gray-500 block">
                                        Convenios exclusivos con descuentos en herramientas de banco, refacciones y programas de actualización continua.
                                    </Text>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {catalogos[activeTab].map((plan) => {
                                    const esPlanActual = plan.id === activePlanId;

                                    return (
                                        <div
                                            key={plan.id}
                                            className={`relative bg-white rounded-[4px] border transition-all flex flex-col overflow-hidden shadow-xs ${plan.destacado
                                                    ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/15"
                                                    : "border-gray-200"
                                                }`}
                                        >
                                            {plan.destacado && (
                                                <div className="bg-[#0E5E6F] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
                                                    <Zap size={12} /> Plan Destacado
                                                </div>
                                            )}

                                            <div className="p-4 flex flex-col gap-3">
                                                <div className="flex justify-between items-start gap-2">
                                                    <span className="bg-gray-100 text-gray-800 border border-gray-200 text-[10px] px-2 py-0.5 rounded-[4px] tracking-wider">
                                                        {plan.etiqueta}
                                                    </span>
                                                    {esPlanActual && (
                                                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-[4px] font-bold flex items-center gap-1 shrink-0">
                                                            <CheckCircle2 size={11} /> Contratado
                                                        </span>
                                                    )}
                                                </div>

                                                <div>
                                                    <Title
                                                        as="h3"
                                                        className="text-base font-extrabold text-gray-900 leading-tight"
                                                    >
                                                        {plan.nombre}
                                                    </Title>
                                                    <Text className="text-xs text-gray-600 font-medium leading-relaxed block mt-1">
                                                        {plan.descripcion}
                                                    </Text>
                                                </div>

                                                <div
                                                    className={`rounded-[4px] px-3.5 py-3 flex items-baseline justify-between border ${plan.destacado
                                                            ? "bg-[#0E5E6F]/5 border-[#0E5E6F]/20"
                                                            : "bg-gray-50 border-gray-200"
                                                        }`}
                                                >
                                                    <span className="text-2xl font-black text-[#0E5E6F]">
                                                        {plan.precio}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        {plan.periodo}
                                                    </span>
                                                </div>

                                                <div>
                                                    <Text className="text-[10px] uppercase text-gray-400 tracking-wider block mb-1.5">
                                                        Incluye:
                                                    </Text>
                                                    <ul className="flex flex-col gap-1.5">
                                                        {plan.caracteristicas.map((item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50/70 rounded-[4px] px-2 py-1.5"
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

                                                <button
                                                    disabled={esPlanActual}
                                                    onClick={() => setSelectedPlanForCheckout(plan)}
                                                    className={`w-full py-2.5 px-3 rounded-[4px] text-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-1 active:scale-95 ${esPlanActual
                                                            ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                                            : plan.destacado
                                                                ? "bg-[#0E5E6F] hover:bg-[#0A4552] text-white shadow-xs font-bold"
                                                                : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                                                        }`}
                                                >
                                                    {esPlanActual ? "Opción actual" : "Seleccionar plan"}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL CON POSICIÓN ABSOLUTA DENTRO DEL CONTENEDOR RAIZ FUERA DEL DIV SCROLLEABLE */}
            {showCancelModal && (
                <div 
                    style={{ borderRadius: "4px" }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs overflow-hidden"
                    onClick={() => setShowCancelModal(false)}
                >
                    <div
                        style={{
                            borderRadius: "4px",
                            border: "1px solid #E5E7EB",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none"
                        }}
                        className="bg-white w-[92%] max-h-[85%] p-4 shadow-2xl relative flex flex-col justify-between overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                style={{ borderRadius: "4px" }}
                                className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-700 cursor-pointer p-1 active:scale-95"
                            >
                                <X size={16} />
                            </button>

                            <div className="flex items-center gap-2 text-[#B8001F] mb-2 pr-6">
                                <AlertCircle size={18} className="shrink-0" />
                                <Title as="h3" className="text-xs font-extrabold text-gray-900 leading-tight">
                                    ¿Cancelar Suscripción Actual?
                                </Title>
                            </div>

                            <Text className="text-[11px] text-[#555555] leading-normal mb-3 block">
                                Al cancelar tu suscripción como técnico intermediario, perderás el acceso al enrutamiento prioritario de órdenes enviadas por administradores, las comisiones preferenciales y las herramientas de diagnóstico en la plataforma BIODRON.
                            </Text>
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 shrink-0">
                            <button
                                onClick={handleConfirmCancel}
                                style={{ backgroundColor: "#B8001F", borderRadius: "4px" }}
                                className="w-full px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition cursor-pointer shadow-xs active:scale-95"
                            >
                                Confirmar cancelación
                            </button>

                            <button
                                onClick={() => setShowCancelModal(false)}
                                style={{ borderRadius: "4px" }}
                                className="w-full px-3 py-2 border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer active:scale-95"
                            >
                                Conservar suscripción
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 4. Historial del Técnico
export const TecnicoHistoryView = () => {
  // Datos simulados orientados a la labor de técnicos
  const [flights] = useState<TechnicianLog[]>([
    {
      id: 'TEC-2026-104',
      equipmentId: 'DRON-01',
      equipmentName: 'Agras Alpha (T40)',
      type: 'maintenance',
      typeName: 'Mantenimiento preventivo 100h',
      location: 'Taller Central - Tegucigalpa',
      technician: 'Tec. Roberto Salgado',
      date: '21 Jul 2026',
      startTime: '08:00 AM',
      endTime: '11:30 AM',
      duration: '210 min',
      componentsChecked: 'Boquillas, rotores y ESCs',
      sparePartUsed: 'Kit de sellos y filtros anti-goteo',
      partCost: '$45.00',
      status: 'completed',
      diagnosticScore: 98,
      workOrder: 'OT-98421',
      notes: 'Limpieza profunda de flujómetros y actualización de firmware de controladora de vuelo.'
    },
    {
      id: 'TEC-2026-103',
      equipmentId: 'EST-02',
      equipmentName: 'Estación RTK D-RTK 2',
      type: 'calibration',
      typeName: 'Calibración de antenas GNSS',
      location: 'Finca El Valle - Comayagua',
      technician: 'Ing. Sofía Pineda',
      date: '20 Jul 2026',
      startTime: '02:00 PM',
      endTime: '03:45 PM',
      duration: '105 min',
      componentsChecked: 'Módulo satelital y enlaces UHF',
      status: 'completed',
      diagnosticScore: 100,
      workOrder: 'OT-98419',
      notes: 'Alineación de base con redes NTRIP locales. Precisión centimétrica restablecida.'
    },
    {
      id: 'TEC-2026-102',
      equipmentId: 'DRON-03',
      equipmentName: 'Agras Beta (T30)',
      type: 'repair',
      typeName: 'Sustitución de tren de aterrizaje',
      location: 'Base Operativa - San Pedro Sula',
      technician: 'Tec. Roberto Salgado',
      date: '19 Jul 2026',
      startTime: '09:30 AM',
      endTime: '12:00 PM',
      duration: '150 min',
      componentsChecked: 'Chasis principal y amortiguadores',
      sparePartUsed: 'Conjunto de fibra de carbono inferior',
      partCost: '$120.00',
      status: 'completed',
      diagnosticScore: 92,
      workOrder: 'OT-98410',
      notes: 'Reparación tras aterrizaje brusco por pérdida temporal de señal GPS en valle cerrado.'
    },
    {
      id: 'TEC-2026-101',
      equipmentId: 'DRON-02',
      equipmentName: 'Mavic Scout (M3M)',
      type: 'calibration',
      typeName: 'Calibración de sensor multiespectral',
      location: 'Taller Central - Tegucigalpa',
      technician: 'Ing. Sofía Pineda',
      date: '18 Jul 2026',
      startTime: '10:00 AM',
      endTime: '11:15 AM',
      duration: '75 min',
      componentsChecked: 'Gimbal, lentes RGB y sensores NIR',
      status: 'completed',
      diagnosticScore: 95,
      workOrder: 'OT-98395',
      notes: 'Calibración radiométrica utilizando panel reflectivo certificado.'
    },
    {
      id: 'TEC-2026-100',
      equipmentId: 'GEN-01',
      equipmentName: 'Generador Honda EU70is',
      type: 'maintenance',
      typeName: 'Revisión de motor e inversores',
      location: 'Campamento Norte - Catacamas',
      technician: 'Tec. Marco Tulio',
      date: '17 Jul 2026',
      startTime: '07:30 AM',
      endTime: '09:00 AM',
      duration: '90 min',
      componentsChecked: 'Bujías, aceite de motor y filtros de aire',
      sparePartUsed: 'Aceite sintético 10W-30 y bujía NGK',
      partCost: '$35.00',
      status: 'interrupted',
      diagnosticScore: 80,
      workOrder: 'OT-98382',
      notes: 'Mantenimiento pausado por falta de repuesto de junta de escape; se concluye turno posterior.'
    },
    {
      id: 'TEC-2026-099',
      equipmentId: 'DRON-04',
      equipmentName: 'Sentera Fixed-Wing',
      type: 'repair',
      typeName: 'Diagnóstico de circuitería interna',
      location: 'Taller Central - Tegucigalpa',
      technician: 'Ing. Sofía Pineda',
      date: '16 Jul 2026',
      startTime: '01:00 PM',
      endTime: '04:30 PM',
      duration: '210 min',
      componentsChecked: 'Placa PDB y conectores de aviónica',
      status: 'failed',
      diagnosticScore: 45,
      workOrder: 'OT-98370',
      notes: 'Cortocircuito severo en tarjeta principal por ingreso de humedad. Requiere reemplazo total de placa.'
    },
    {
      id: 'TEC-2026-098',
      equipmentId: 'DRON-01',
      equipmentName: 'Agras Alpha (T40)',
      type: 'maintenance',
      typeName: 'Inspección de bombas de diafragma',
      location: 'Base Operativa - Danlí',
      technician: 'Tec. Roberto Salgado',
      date: '15 Jul 2026',
      startTime: '03:00 PM',
      endTime: '04:00 PM',
      duration: '60 min',
      componentsChecked: 'Bombas dosificadoras y mangueras',
      sparePartUsed: 'Juego de válvulas check',
      partCost: '$25.00',
      status: 'completed',
      diagnosticScore: 96,
      workOrder: 'OT-98361',
      notes: 'Sustitución preventiva de válvulas debido a trazas de sedimentos químicos.'
    }
  ]);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedFlight, setSelectedFlight] = useState<TechnicianLog | null>(null);
  const [modalTab, setModalTab] = useState<'info' | 'detalles' | 'repuestos'>('info');

  // Filtrado dinámico
  const filteredFlights = flights.filter((f) => {
    const matchesSearch =
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.technician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.workOrder.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesType = typeFilter === 'all' || f.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Métricas
  const totalArea = flights
    .filter((f) => f.status === 'completed')
    .reduce((acc, f) => acc + parseFloat(f.componentsChecked.length.toString()), 0)
    .toFixed(1);

  const totalHours = (
    flights.reduce((acc, f) => acc + parseInt(f.duration), 0) / 60
  ).toFixed(1);

  const successRate = Math.round(
    (flights.filter((f) => f.status === 'completed').length / flights.length) * 100
  );

  // Badge de Estado (Sin icono / Sentence Case)
  const getStatusBadge = (status: TechnicianLog['status']) => {
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
  const getTypeBadge = (type: TechnicianLog['type']) => {
    switch (type) {
      case 'maintenance':
        return (
          <span className="inline-block text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-[4px] border border-cyan-100">
            Mantenimiento
          </span>
        );
      case 'calibration':
        return (
          <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
            Calibración
          </span>
        );
      case 'repair':
        return (
          <span className="inline-block text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-[4px] border border-purple-100">
            Reparación
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full bg-[#f8fafc] overflow-y-auto p-4 space-y-4 font-['Roboto',sans-serif]">

      {/* ================= ENCABEZADO Y RESUMEN (APILADO) ================= */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-[4px] border border-gray-200 shadow-xs">
        <div>
          {/* Title Case */}
          <h1 className="text-base font-bold text-gray-900 leading-tight">
            Historial de Mantenimiento y Servicios Tácticos
          </h1>
          <span className="inline-block mt-1.5 text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-[4px] border border-gray-200 w-fit">
            {flights.length} registros
          </span>
          {/* Sentence Case */}
          <p className="text-[11px] text-gray-500 mt-1.5 leading-snug">
            Registro detallado de intervenciones mecánicas, calibraciones de sensores y órdenes de taller.
          </p>
        </div>

        {/* Botón: ancho completo en móvil */}
        <button
          onClick={() => { }}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-xs"
        >
          <Download size={14} />
          <span>Exportar bitácora (CSV)</span>
        </button>
      </div>

      {/* ================= TARJETAS DE KPIS RÁPIDOS (2 COLUMNAS) ================= */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            {/* Subtítulo: Title Case */}
            <p className="text-[10px] text-gray-500 font-medium">Equipos Intervenidos</p>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">{flights.length} <span className="text-[10px] font-normal text-gray-500">und</span></h3>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <Wrench size={16} />
          </div>
        </div>

        <div className="bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            {/* Subtítulo: Title Case */}
            <p className="text-[10px] text-gray-500 font-medium">Horas de Taller</p>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">{totalHours} <span className="text-[10px] font-normal text-gray-500">hrs</span></h3>
          </div>
          <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] shrink-0">
            <Clock size={16} />
          </div>
        </div>

        <div className="bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            {/* Subtítulo: Title Case */}
            <p className="text-[10px] text-gray-500 font-medium">Efectividad Técnica</p>
            <h3 className="text-base font-bold text-emerald-700 mt-0.5">{successRate}%</h3>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-[4px] shrink-0">
            <ShieldCheck size={16} />
          </div>
        </div>

        <div className="bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            {/* Subtítulo: Title Case */}
            <p className="text-[10px] text-gray-500 font-medium">Repuestos Registrados</p>
            <h3 className="text-base font-bold text-gray-900 mt-0.5">5 <span className="text-[10px] font-normal text-gray-500">kits</span></h3>
          </div>
          <div className="p-2 bg-cyan-50 text-cyan-600 rounded-[4px] shrink-0">
            <Compass size={16} />
          </div>
        </div>
      </div>

      {/* ================= FILTROS Y BÚSQUEDA (APILADOS) ================= */}
      <div className="flex flex-col gap-2.5 bg-white p-3 rounded-[4px] border border-gray-200 shadow-xs">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Buscar por OT, equipo, taller o técnico..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-xs focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition"
          />
        </div>

        {/* Selects en líneas separadas (uno debajo del otro) */}
        <div className="flex flex-col gap-2 text-xs">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todas las intervenciones</option>
            <option value="maintenance">Mantenimiento</option>
            <option value="calibration">Calibración</option>
            <option value="repair">Reparación</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] text-gray-700 font-medium focus:outline-none focus:border-[#0E5E6F] transition cursor-pointer"
          >
            <option value="all">Todos los estados</option>
            <option value="completed">Completados</option>
            <option value="interrupted">Pausados / incompletos</option>
            <option value="failed">Abortados</option>
          </select>
        </div>
      </div>

      {/* ================= LISTA DE INTERVENCIONES — TARJETAS EN VEZ DE TABLA ================= */}
      <div className="bg-white rounded-[4px] border border-gray-200 shadow-xs overflow-hidden w-full">
        {filteredFlights.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="p-3.5 active:bg-gray-50/80 transition cursor-pointer"
                onClick={() => {
                  setSelectedFlight(flight);
                  setModalTab('info');
                }}
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-xs">{flight.workOrder}</div>
                    <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar size={10} />
                      {flight.date}
                    </div>
                  </div>
                  {getStatusBadge(flight.status)}
                </div>

                <div className="mb-1.5">
                  <div className="font-semibold text-gray-800 text-xs truncate">
                    {flight.equipmentName}
                  </div>
                  <div className="mt-1">{getTypeBadge(flight.type)}</div>
                </div>

                <div className="text-gray-700 font-medium text-[11px] flex items-center gap-1 mb-0.5 truncate">
                  <MapPin size={11} className="text-gray-400 shrink-0" />
                  <span className="truncate">{flight.location}</span>
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-2 truncate">
                  <User size={10} className="shrink-0" />
                  <span className="truncate">{flight.technician}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900 text-xs">{flight.duration}</div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                      Score: {flight.diagnosticScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedFlight(flight);
                        setModalTab('info');
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium rounded-[4px] transition cursor-pointer"
                      title="Ver detalles"
                    >
                      <Eye size={13} className="text-[#0E5E6F]" />
                      <span>Ver</span>
                    </button>

                    <button
                      onClick={() => { }}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-[11px] font-medium rounded-[4px] transition cursor-pointer shadow-xs"
                      title="Descargar reporte PDF"
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400 text-xs px-4">
            No se encontraron registros técnicos con los filtros seleccionados.
          </div>
        )}

        {/* Footer estático */}
        <div className="p-3 px-4 bg-gray-50/80 border-t border-gray-200 text-[11px] text-gray-500 text-center">
          <span>Mostrando {filteredFlights.length} de {flights.length} registros</span>
        </div>
      </div>

      {/* ================= MODAL CENTRADO CON PESTAÑAS ================= */}
      {selectedFlight && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white border border-gray-200 rounded-[4px] shadow-2xl max-w-xs w-full overflow-hidden text-left font-sans flex flex-col max-h-[90vh]">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-gray-100 p-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 bg-[#0E5E6F] text-white rounded-[4px] text-[9px] font-bold shrink-0">
                  {selectedFlight.workOrder}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-gray-900 truncate">
                    {selectedFlight.typeName}
                  </h3>
                  <p className="text-[9px] text-gray-400 truncate">
                    {selectedFlight.equipmentName} • {selectedFlight.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFlight(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Pestañas */}
            <div className="flex border-b border-gray-200 shrink-0">
              <button
                onClick={() => setModalTab('info')}
                className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                  modalTab === 'info'
                    ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Información
              </button>
              <button
                onClick={() => setModalTab('detalles')}
                className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                  modalTab === 'detalles'
                    ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Detalles Técnicos
              </button>
              {selectedFlight.sparePartUsed && (
                <button
                  onClick={() => setModalTab('repuestos')}
                  className={`flex-1 py-2 text-[10px] font-bold transition-colors ${
                    modalTab === 'repuestos'
                      ? 'text-[#0E5E6F] border-b-2 border-[#0E5E6F]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Repuestos
                </button>
              )}
            </div>

            {/* Contenido del Modal según pestaña */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* Pestaña 1: Información General */}
              {modalTab === 'info' && (
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Tipo</span>
                      <span className="font-bold text-gray-800">{selectedFlight.typeName}</span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                      <span className="text-[9px] text-gray-400 block">Estado</span>
                      <span className="font-bold text-gray-800">{selectedFlight.status}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Ubicación</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <MapPin size={11} className="text-[#0E5E6F]" />
                      {selectedFlight.location}
                    </span>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block">Técnico</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <User size={11} className="text-[#0E5E6F]" />
                      {selectedFlight.technician}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px] text-center">
                      <span className="text-[9px] text-gray-400 block">Duración</span>
                      <span className="font-bold text-gray-800 text-xs">{selectedFlight.duration}</span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px] text-center">
                      <span className="text-[9px] text-gray-400 block">Horario</span>
                      <span className="font-bold text-gray-800 text-[9px]">{selectedFlight.startTime} - {selectedFlight.endTime}</span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-[4px] text-center">
                      <span className="text-[9px] text-gray-400 block">Score</span>
                      <span className="font-bold text-emerald-600">{selectedFlight.diagnosticScore}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Pestaña 2: Detalles Técnicos */}
              {modalTab === 'detalles' && (
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Componentes revisados</span>
                    <p className="font-semibold text-gray-800">{selectedFlight.componentsChecked}</p>
                  </div>
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Observaciones</span>
                    <p className="text-[10px] italic text-gray-600 leading-relaxed">
                      "{selectedFlight.notes || 'Sin observaciones registradas.'}"
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 border-2 border-gray-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-400 block mb-1">Score diagnóstico</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedFlight.diagnosticScore >= 80 ? 'bg-emerald-500' :
                          selectedFlight.diagnosticScore >= 60 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedFlight.diagnosticScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold mt-1 block">{selectedFlight.diagnosticScore}%</span>
                  </div>
                </div>
              )}

              {/* Pestaña 3: Repuestos */}
              {modalTab === 'repuestos' && selectedFlight.sparePartUsed && (
                <div className="space-y-2 text-xs text-gray-700">
                  <div className="p-2 bg-cyan-50 border-2 border-cyan-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-500 block mb-1">Repuesto utilizado</span>
                    <p className="font-semibold text-cyan-950">{selectedFlight.sparePartUsed}</p>
                  </div>
                  <div className="p-2 bg-cyan-50 border-2 border-cyan-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-500 block mb-1">Costo estimado</span>
                    <p className="font-bold text-cyan-950">{selectedFlight.partCost}</p>
                  </div>
                  <div className="p-2 bg-cyan-50 border-2 border-cyan-200 rounded-[4px]">
                    <span className="text-[9px] text-gray-500 block mb-1">Orden de trabajo</span>
                    <p className="font-mono font-bold text-cyan-950">{selectedFlight.workOrder}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="flex flex-col gap-2 p-3 pt-2 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setSelectedFlight(null)}
                className="w-full py-2 bg-[#0E5E6F] text-white font-bold text-xs rounded-[4px] hover:bg-[#0a4754] cursor-pointer shadow-xs"
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

// 5. Ayuda
export const TecnicoHelpView = () => {
  // Avatar del Técnico actual (Tú)
  const tecnicoAvatar = 'src/img/tecnico_perfil.png';

  // Lista de canales de soporte, laboratorio e ingenieros para el Técnico
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'soporte_laboratorio',
      name: 'Ing. Fernando Castro',
      role: 'Soporte de fábrica & diagnóstico',
      roleType: 'admin',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: 'tecnico',
          text: 'Ingeniero, el ESC del motor 3 del Agras T40 arroja un código de error E-42 tras el reemplazo.',
          time: '09:10 AM',
        },
        {
          id: 2,
          sender: 'other',
          text: 'Hola Roberto. Ese código requiere reescribir el firmware del controlador de velocidad mediante la herramienta de taller v2.4.',
          time: '09:15 AM',
        },
        {
          id: 3,
          sender: 'tecnico',
          text: 'Entendido. ¿Me puede autorizar la descarga del paquete de calibración?',
          time: '09:18 AM',
        },
      ],
    },
    {
      id: 'coordinacion_mantenimiento',
      name: 'Dra. Elena Ramos',
      role: 'Super Admin - Gestión de flota',
      roleType: 'admin',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      online: true,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'tecnico',
          text: 'Dra. Elena, se completó el mantenimiento preventivo de las 100 horas para la flota Mavic 3.',
          time: 'Ayer',
        },
        {
          id: 2,
          sender: 'other',
          text: 'Excelente Roberto. Ya firmé las actas de liberación para que los pilotos puedan disponer de los equipos.',
          time: 'Ayer',
        },
      ],
    },
    {
      id: 'inventario_repuestos',
      name: 'Lic. Sofía Morales',
      role: 'Coordinación de repuestos & piezas',
      roleType: 'admin',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      online: false,
      lastSeen: '10:00 AM',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: 'other',
          text: 'Roberto, llegaron los kits de hélices de repuesto y los sensores multiespectrales que pediste.',
          time: 'Lunes',
        },
        {
          id: 2,
          sender: 'tecnico',
          text: 'Perfecto Sofía, paso por bodega en la tarde para el ingreso al inventario técnico.',
          time: 'Lunes',
        },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState<string>('soporte_laboratorio');
  const [inputText, setInputText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Navegación móvil
  const [vistaMovil, setVistaMovil] = useState<'lista' | 'chat'>('lista');

  // Menú desplegable del Header (3 puntos)
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);

  // Estados para Modal de Solicitud de Soporte Técnico / Taller
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [supportForm, setSupportForm] = useState({
    equipo: 'DJI Agras T40',
    categoria: 'Falla mecánica / motores',
    prioridad: 'Alta',
    descripcion: 'Hola, este es un mensaje para solicitar asistencia.',
  });

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Enviar mensaje como Técnico (sender: 'tecnico')
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'tecnico',
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

  const handleSupportNext = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep(2);
  };

  const handleSupportBack = () => {
    setModalStep(1);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.descripcion.trim()) return;
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setModalStep(1);
    setSupportForm({
      equipo: 'DJI Agras T40',
      categoria: 'Falla mecánica / motores',
      prioridad: 'Alta',
      descripcion: 'Descripción...',
    });
  };

  const filteredChats = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulación de arrastre táctil (drag-to-scroll)
  const DRAG_THRESHOLD = 6;
  const dragState = useRef({
    tracking: false,
    dragging: false,
    startY: 0,
    scrollTop: 0,
    pointerId: 0,
  });

  const isInteractiveTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    return !!el?.closest('input, textarea, select, button, a, option, label');
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(e.target)) return;
    const el = e.currentTarget;
    dragState.current = {
      tracking: true,
      dragging: false,
      startY: e.clientY,
      scrollTop: el.scrollTop,
      pointerId: e.pointerId,
    };
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.tracking) return;
    const el = e.currentTarget;
    const deltaY = e.clientY - state.startY;

    if (!state.dragging) {
      if (Math.abs(deltaY) < DRAG_THRESHOLD) return;
      state.dragging = true;
      el.setPointerCapture(state.pointerId);
    }

    el.scrollTop = state.scrollTop - deltaY;
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (state.dragging) {
      try {
        e.currentTarget.releasePointerCapture(state.pointerId);
      } catch {
        // El puntero ya pudo haber sido liberado
      }
    }
    dragState.current = {
      tracking: false,
      dragging: false,
      startY: 0,
      scrollTop: 0,
      pointerId: 0,
    };
  };

  const dragScrollProps = {
    onPointerDown: handleDragStart,
    onPointerMove: handleDragMove,
    onPointerUp: handleDragEnd,
    onPointerLeave: handleDragEnd,
    onPointerCancel: handleDragEnd,
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-white overflow-hidden relative font-sans">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
      `}</style>
      <div className="flex flex-1 h-full min-h-0 overflow-hidden">
        {/* ================= BARRA LATERAL (LISTA DE CANALES DE SOPORTE) ================= */}
        <div
          className={`w-full flex-col bg-gray-50/60 h-full min-h-0 shrink-0 ${
            vistaMovil === 'lista' ? 'flex' : 'hidden'
          }`}
        >
          {/* TÍTULO Y BOTÓN DE PEDIR SOPORTE */}
          <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
                Soporte de Taller
              </h2>
              <p className="text-[11px] text-gray-500 truncate">
                Consultas técnicas & laboratorio
              </p>
            </div>

            {/* BOTÓN NUEVO TICKET / REPORTE */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0E5E6F] hover:bg-[#0A4754] text-white font-semibold text-xs rounded-[4px] shadow-xs transition cursor-pointer shrink-0"
            >
              <Wrench size={14} />
              <span>Pedir soporte</span>
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
                placeholder="Buscar especialista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:border-[#0E5E6F] transition"
              />
            </div>
          </div>

          {/* LISTA DE CHATS */}
          <div
            className="flex-1 overflow-y-auto min-h-0 divide-y divide-gray-100 scrollbar-hide touch-pan-y select-none cursor-grab active:cursor-grabbing"
            {...dragScrollProps}
          >
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
                    setVistaMovil('chat');
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
                      className="w-12 h-12 rounded-[4px] object-cover shadow-xs"
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
                        {lastMsg.sender === 'tecnico' ? 'Tú: ' : ''}
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
        <div
          className={`w-full flex-col h-full min-h-0 bg-[#f8fafc] overflow-hidden ${
            vistaMovil === 'chat' ? 'flex' : 'hidden'
          }`}
        >
          {/* HEADER DEL CHAT */}
          <div className="p-2.5 bg-white border-b border-gray-200 flex items-center justify-between gap-1.5 shrink-0 min-w-0 relative">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* BOTÓN VOLVER A LA LISTA */}
              <button
                onClick={() => setVistaMovil('lista')}
                className="p-1 -ml-1 text-gray-500 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-[4px] transition shrink-0 cursor-pointer"
                aria-label="Volver a la lista"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="relative shrink-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-9 h-9 rounded-[4px] object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <h2 className="font-bold text-gray-900 text-sm leading-tight truncate">
                  {activeChat.name}
                </h2>

                <span className="text-[11px] text-[#0E5E6F] font-medium truncate">
                  {activeChat.role}
                </span>

                <div className="text-[11px] text-gray-500 leading-none">
                  {activeChat.online ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      En línea
                    </span>
                  ) : (
                    <span className="text-gray-400 font-medium flex items-center gap-1 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block shrink-0"></span>
                      <span className="truncate">
                        Desconectado {activeChat.lastSeen ? `(${activeChat.lastSeen})` : ''}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* MENÚ DE TRES PUNTOS CON ACCIONES DESPLEGABLES */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                className="p-2 hover:bg-gray-100 text-gray-600 hover:text-[#0E5E6F] rounded-[4px] transition cursor-pointer"
                aria-label="Opciones de soporte"
              >
                <MoreVertical size={20} />
              </button>

              {/* Menú Desplegable */}
              {isHeaderMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsHeaderMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-[4px] shadow-lg py-1 z-20 animate-fade-in">
                    <button
                      onClick={() => {
                        setIsHeaderMenuOpen(false);
                        // Acción de llamada
                      }}
                      className="w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition cursor-pointer"
                    >
                      <Phone size={15} className="text-[#0E5E6F]" />
                      <span>Llamada de soporte</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsHeaderMenuOpen(false);
                        // Acción de videollamada
                      }}
                      className="w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition cursor-pointer"
                    >
                      <Video size={15} className="text-[#0E5E6F]" />
                      <span>Videollamada taller</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* HISTORIAL DE MENSAJES */}
          <div
            className="flex-1 overflow-y-auto min-h-0 p-3 space-y-3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] scrollbar-hide touch-pan-y select-none cursor-grab active:cursor-grabbing"
            {...dragScrollProps}
          >
            {activeChat.messages.map((msg) => {
              const isTecnicoMsg = msg.sender === 'tecnico';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isTecnicoMsg ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isTecnicoMsg && (
                    <img
                      src={activeChat.avatar}
                      alt={activeChat.name}
                      className="w-7 h-7 rounded-[4px] object-cover mb-1 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-[4px] text-sm ${
                      isTecnicoMsg
                        ? 'bg-[#0E5E6F] text-white'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>

                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isTecnicoMsg ? 'text-cyan-100' : 'text-gray-400'
                      }`}
                    >
                      <span>{msg.time}</span>

                      {isTecnicoMsg && (
                        <CheckCheck size={14} className="text-cyan-200" />
                      )}
                    </div>
                  </div>

                  {isTecnicoMsg && (
                    <img
                      src={tecnicoAvatar}
                      alt="Técnico Roberto Paz"
                      className="w-7 h-7 rounded-[4px] object-cover mb-1 shrink-0 border border-gray-200"
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
              className="p-2 text-gray-400 hover:text-[#0E5E6F] hover:bg-gray-100 rounded-[4px] transition shrink-0"
              title="Adjuntar archivo o imagen"
            >
              <Paperclip size={20} />
            </button>

            <input
              type="text"
              placeholder="Escribe tu mensaje..."
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

      {/* ================= MODAL DE SOLICITUD DE ASISTENCIA ================= */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white w-[92%] max-w-[360px] rounded-[4px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92%]">
            {/* Header del Modal */}
            <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] shrink-0">
                  <Wrench size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate leading-tight">
                    Solicitar Asistencia
                  </h3>
                  {!isSubmitted && (
                    <p className="text-[10px] text-gray-500 truncate">
                      Paso {modalStep} de 2
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-[4px] transition cursor-pointer shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Indicador de progreso por pasos */}
            {!isSubmitted && (
              <div className="flex gap-1.5 px-3.5 pt-2.5 shrink-0">
                <span
                  className={`h-1 flex-1 rounded-full ${
                    modalStep >= 1 ? 'bg-[#0E5E6F]' : 'bg-gray-200'
                  }`}
                />
                <span
                  className={`h-1 flex-1 rounded-full ${
                    modalStep >= 2 ? 'bg-[#0E5E6F]' : 'bg-gray-200'
                  }`}
                />
              </div>
            )}

            {/* Contenido del Modal */}
            <div
              className="p-3.5 overflow-y-auto scrollbar-hide touch-pan-y"
              {...dragScrollProps}
            >
              {!isSubmitted ? (
                modalStep === 1 ? (
                  <form onSubmit={handleSupportNext} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Equipo de vuelo
                      </label>
                      <select
                        value={supportForm.equipo}
                        onChange={(e) =>
                          setSupportForm({
                            ...supportForm,
                            equipo: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition truncate"
                      >
                        <option value="DJI Mavic 3 Multispectral">
                          DJI Mavic 3
                        </option>
                        <option value="DJI Agras T40">DJI Agras T40</option>
                        <option value="Sentera 65">Sentera 65</option>
                        <option value="Baterías inteligentes">
                          Baterías inteligentes
                        </option>
                        <option value="Sistema de fumigación">
                          Sistema de fumigación
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tipo de falla
                      </label>
                      <select
                        value={supportForm.categoria}
                        onChange={(e) =>
                          setSupportForm({
                            ...supportForm,
                            categoria: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition truncate"
                      >
                        <option value="Falla mecánica / motores">
                          Falla mecánica
                        </option>
                        <option value="Error de firmware / software">
                          Error de firmware
                        </option>
                        <option value="Calibración de gimbal / cámara">
                          Calibración gimbal
                        </option>
                        <option value="Solicitud / faltante de repuestos">
                          Repuestos
                        </option>
                        <option value="Garantía de fábrica">Garantía</option>
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
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition truncate"
                      >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                        <option value="Urgente">Urgente</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-[4px] transition cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-[4px] shadow-xs transition cursor-pointer"
                      >
                        Siguiente
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Descripción técnica
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Detalla lecturas, códigos de error o pruebas realizadas..."
                        value={supportForm.descripcion}
                        onChange={(e) =>
                          setSupportForm({
                            ...supportForm,
                            descripcion: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:bg-white focus:border-[#0E5E6F] transition resize-none"
                      ></textarea>
                    </div>

                    <div className="p-2 bg-gray-50 border border-gray-100 rounded-[4px] text-[11px] text-gray-500 space-y-0.5">
                      <p className="truncate">
                        <span className="font-semibold text-gray-600">
                          Equipo:
                        </span>{' '}
                        {supportForm.equipo}
                      </p>
                      <p className="truncate">
                        <span className="font-semibold text-gray-600">
                          Prioridad:
                        </span>{' '}
                        {supportForm.prioridad}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSupportBack}
                        className="px-3.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-[4px] transition cursor-pointer"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E5E6F] hover:bg-[#0A4754] rounded-[4px] shadow-xs transition cursor-pointer"
                      >
                        Enviar ticket
                      </button>
                    </div>
                  </form>
                )
              ) : (
                /* Confirmación */
                <div className="py-3 text-center space-y-2.5">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={22} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-gray-900">
                      ¡Ticket enviado!
                    </h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      El equipo técnico ha sido notificado correctamente.
                    </p>
                  </div>
                  <div className="pt-1">
                    <button
                      onClick={closeModal}
                      className="w-full py-1.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4754] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer"
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

// Perfil de tecnico
export const TecnicoProfileView = ({ onLogout }: TecnicoProfileViewProps) => {
    // Estado para las pestañas de métricas y credenciales
    const [activeProfileTab, setActiveProfileTab] = useState<"metricas" | "credenciales">("metricas");

    // Configuración exclusiva para el Técnico Agrónomo
    const initialProfile = {
        initials: "MA",
        name: "Ing. Mario Alberto Alvarado",
        email: "mario.alvarado@agroaguante.hn",
        phone: "+504 9876-5432",
        password: "password123",
        avatar: "src/img/tecnico_perfil.png",
        avatarBg: "bg-[#0E5E6F] text-white",
        roleLabel: "Técnico Agrónomo · Analista de Campo",
        location: "Laboratorio / Estación Choluteca",
        area: "1,250 ha bajo monitoreo",
        services: "88 diagnósticos fitosanitarios",
        standing: "Activo",
        roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30",
        description: "Especialista en análisis fitosanitario, monitoreo de suelos y evaluación de índices de vegetación (NDVI).",
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
            setSimulatedFile("foto_tecnico_actualizada.jpg");
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
        <div
            className="w-full h-full mx-auto p-2 bg-white antialiased select-none flex flex-col justify-center items-center relative"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            <div className="w-full h-full flex-1 bg-white border-2 border-gray-200 rounded-[4px] overflow-hidden flex flex-col justify-between shadow-xs">
                
                {/* CABECERA */}
                <div className="bg-gray-50 border-b-2 border-gray-200 px-4 py-4 flex flex-col items-start gap-3">
                    <div className="flex items-center gap-3 w-full">
                        {/* AVATAR */}
                        <div className="w-14 h-14 rounded-[4px] bg-white border-2 border-gray-300 overflow-hidden shrink-0 shadow-xs relative group flex items-center justify-center">
                            {!imgError ? (
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-full h-full object-cover rounded-[4px]"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center font-black text-lg rounded-[4px] ${profileData.avatarBg}`}>
                                    {profileData.initials}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[4px]">
                                <Briefcase size={18} className="text-white drop-shadow" />
                            </div>
                        </div>

                        <div className="text-left min-w-0 flex-1">
                            <h2 className="text-base text-gray-900 font-black tracking-tight normal-case leading-tight truncate">
                                {profileData.name}
                            </h2>
                            <p className="text-gray-500 font-semibold text-[11px] mt-0.5 truncate">
                                {profileData.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full">
                        <span
                            className={`w-full text-center text-[10px] font-black tracking-wider px-3 py-1 rounded-[4px] border-2 break-words whitespace-normal ${profileData.roleColor}`}
                        >
                            {profileData.roleLabel}
                        </span>

                        {saveSuccess && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-[4px] flex items-center gap-1 animate-in fade-in duration-150">
                                <Check size={12} /> Actualizado
                            </span>
                        )}
                    </div>
                </div>

                {/* SELECTOR DE PESTAÑAS PARA MÉTRICAS Y CREDENCIALES */}
                <div className="flex border-b-2 border-gray-200 bg-gray-100">
                    <button
                        type="button"
                        onClick={() => setActiveProfileTab("metricas")}
                        className={`flex-1 py-2 text-xs font-black transition-colors cursor-pointer ${
                            activeProfileTab === "metricas"
                                ? "bg-white text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Métricas
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveProfileTab("credenciales")}
                        className={`flex-1 py-2 text-xs font-black transition-colors cursor-pointer ${
                            activeProfileTab === "credenciales"
                                ? "bg-white text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Credenciales
                    </button>
                </div>

                {/* CONTENIDO DE PESTAÑA: MÉTRICAS */}
                {activeProfileTab === "metricas" && (
                    <div className="grid grid-cols-2 bg-white border-b-2 border-gray-200 text-left flex-1 content-center">
                        {/* Estación Asignada */}
                        <div className="p-3 hover:bg-gray-50/50 transition-colors flex items-start gap-2 flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1 border-2 border-gray-200 rounded-[4px]">
                                    <MapPin size={14} />
                                </div>
                                <span className="text-[9px] font-black text-gray-400 tracking-widest block">
                                    Estación Asignada
                                </span>
                            </div>
                            <span className="text-[11px] text-gray-800 font-bold block break-words leading-tight mt-0.5">
                                {profileData.location}
                            </span>
                        </div>

                        {/* Área Monitoreada */}
                        <div className="p-3 hover:bg-gray-50/50 transition-colors flex items-start gap-2 flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1 border-2 border-gray-200 rounded-[4px]">
                                    <Layers size={14} />
                                </div>
                                <span className="text-[9px] font-black text-gray-400 tracking-widest block">
                                    Área Monitoreada
                                </span>
                            </div>
                            <span className="text-[11px] text-gray-800 font-bold block break-words leading-tight mt-0.5">
                                {profileData.area}
                            </span>
                        </div>

                        {/* Diagnósticos */}
                        <div className="p-3 hover:bg-gray-50/50 transition-colors flex items-start gap-2 flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1 border-2 border-gray-200 rounded-[4px]">
                                    <BarChart2 size={14} />
                                </div>
                                <span className="text-[9px] font-black text-gray-400 tracking-widest block">
                                    Diagnósticos
                                </span>
                            </div>
                            <span className="text-[11px] text-gray-800 font-bold block break-words leading-tight mt-0.5 w-full">
                                {profileData.services}
                            </span>
                        </div>

                        {/* Estado */}
                        <div className="p-3 hover:bg-gray-50/50 transition-colors flex items-start gap-2 flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1 border-2 border-gray-200 rounded-[4px]">
                                    <CheckCircle size={14} />
                                </div>
                                <span className="text-[9px] font-black text-gray-400 tracking-widest block">
                                    Estado
                                </span>
                            </div>
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-[4px] inline-block mt-0.5">
                                {profileData.standing}
                            </span>
                        </div>
                    </div>
                )}

                {/* CONTENIDO DE PESTAÑA: CREDENCIALES */}
                {activeProfileTab === "credenciales" && (
                    <div className="p-2 bg-white flex-1 flex flex-col justify-center">
                        <div className="flex flex-col gap-2 mb-2.5 pb-2 border-b-2 border-gray-100">
                            <div className="flex items-center gap-2">
                                <Settings size={15} className="text-[#0E5E6F]" />
                                <h3 className="text-xs font-black text-gray-800 normal-case">
                                    Credenciales y Datos de Contacto
                                </h3>
                            </div>

                            <button
                                onClick={handleOpenModal}
                                className="w-full py-2 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-[4px] text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 shadow-xs cursor-pointer"
                            >
                                <Edit2 size={13} className="text-[#0E5E6F]" /> Editar información
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-1 text-left">
                            <div className="p-2 bg-gray-50 border-2 border-gray-100 rounded-[4px]">
                                <span className="text-[10px] font-black text-gray-400 tracking-wider flex items-center gap-1">
                                    <Phone size={12} className="text-[#0E5E6F]" /> Teléfono
                                </span>
                                <p className="font-bold text-xs text-gray-800 mt-0.5">
                                    {profileData.phone}
                                </p>
                            </div>

                            <div className="p-2 bg-gray-50 border-2 border-gray-100 rounded-[4px]">
                                <span className="text-[10px] font-black text-gray-400 tracking-wider flex items-center gap-1">
                                    <Mail size={12} className="text-[#0E5E6F]" /> Correo
                                </span>
                                <p className="font-bold text-xs text-gray-800 mt-0.5 truncate">
                                    {profileData.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* PIE DE PÁGINA */}
                <div className="border-t-2 border-gray-200 px-4 py-2.5 bg-gray-50 flex flex-col items-stretch gap-2">
                    <span className="text-[10px] text-gray-400 font-medium text-left truncate">
                        Estación Operativa Choluteca, HN
                    </span>

                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-[4px] border-2 border-[#B8001F] bg-white hover:bg-[#B8001F]/10 text-[#B8001F] transition-all active:scale-95 shadow-xs cursor-pointer w-full"
                    >
                        <LogOut size={13} className="shrink-0 text-[#B8001F]" />
                        <span className="text-xs font-black tracking-wider">
                            Salir
                        </span>
                    </button>
                </div>
            </div>

            {/* BOTTOM SHEET DE EDICIÓN */}
            {isModalOpen && (
                <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                    <div className="bg-white border-2 border-gray-300 rounded-[4px] w-[92%] max-w-[320px] max-h-[92%] shadow-xl flex flex-col text-left overflow-hidden">
                        <div className="px-3.5 pt-3 pb-2.5 space-y-2.5 overflow-y-auto">
                            {/* Encabezado del Modal */}
                            <div className="flex items-center justify-between pb-2 border-b-2 border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-[#0E5E6F]/10 rounded-[4px] text-[#0E5E6F]">
                                        <Edit2 size={14} />
                                    </div>
                                    <h3 className="text-xs font-black text-gray-800 normal-case">
                                        Editar Credenciales
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-[4px] transition-colors cursor-pointer"
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            {/* Formulario Vertical */}
                            <form onSubmit={handleSave} className="space-y-2">
                                {/* SELECTOR TOTALMENTE FALSO DE FOTO DE PERFIL */}
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1 flex items-center gap-1">
                                        <Camera size={11} className="text-[#0E5E6F]" /> Foto de perfil
                                    </label>

                                    <div className="flex items-center gap-2 p-1.5 border-2 border-gray-200 rounded-[4px] bg-gray-50">
                                        <div className="w-9 h-9 rounded-[4px] bg-white border border-gray-300 overflow-hidden shrink-0 flex items-center justify-center relative">
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
                                                    {simulatedFile || "img"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                                        Teléfono
                                    </label>
                                    <div className="relative">
                                        <Phone size={13} className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full pl-8 pr-3 py-1.5 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                                        Nueva contraseña
                                    </label>
                                    <div className="relative">
                                        <Lock size={13} className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={editForm.password}
                                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                            className="w-full pl-8 pr-8 py-1.5 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 tracking-wider mb-1">
                                        Repetir contraseña
                                    </label>
                                    <div className="relative">
                                        <Lock size={13} className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={editForm.password}
                                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                            className="w-full pl-8 pr-8 py-1.5 text-xs font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-1.5 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-2 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-[4px] text-xs flex items-center justify-center gap-1 transition-colors active:scale-95 cursor-pointer"
                                    >
                                        <X size={13} /> Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-[4px] text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs cursor-pointer"
                                    >
                                        <Save size={13} /> Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};