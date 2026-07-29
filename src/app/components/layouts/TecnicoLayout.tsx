import React, { useState, useRef } from 'react';
import {
    LayoutDashboard,
    ClipboardList,
    History,
    HelpCircle,
    User,
    CreditCard,
    Menu,
    X,
    LucideIcon,
    Bell,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import tecnicoPerfilImg from '../../../img/tecnico_perfil.png';

interface LayoutProps {
    children: React.ReactNode;
    currentView: string;
    onNavigate: (view: string) => void;
}

interface MenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    hasDividerAfter?: boolean;
}

export const TecnicoLayout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [dragY, setDragY] = useState<number>(0);
    const touchStartY = useRef<number>(0);
    const isDraggingModal = useRef<boolean>(false);

    // Paleta de colores Hexadecimales
    const HEX_COLORS = {
        brandGreen: "#0E5E6F",
        emerald100: "#D1FAE5",
        red: "#B8001F",
        amber100: "#FEF3C7",
        blue100: "#DBEAFE",
        orange100: "#FFEDD5",
        purple100: "#F3E8FF",
    };

    // Notificaciones
    const [notificaciones, setNotificaciones] = useState([
        {
            id: 1,
            tipo: "aprobacion",
            titulo: "Nueva solicitud técnica",
            detalle: "Solicitud #SOL-904 (Fumigación Sector Norte) requiere revisión técnica.",
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
            detalle: "Tu plan de técnico especializado se renueva automáticamente el 01 de agosto.",
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
            detalle: "Ticket #TK-302: 'Calibración de cámara NDVI' requiere tu intervención.",
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
            detalle: "Mantenimiento programado del sistema para el 01 de agosto a las 02:00 AM.",
            tiempo: "Ayer, 03:20 PM",
            colorBg: HEX_COLORS.amber100,
            textColor: "#92400E",
            icono: <ShieldCheck size={13} />,
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

    const unreadCount = notificaciones.filter((n) => n.unread).length;

    // Menú completo del Sidebar Lateral
    const sidebarMenuItems: MenuItem[] = [
        { id: 'tecnico-dashboard', label: 'Dashboard técnico', icon: LayoutDashboard },
        { id: 'tecnico-requests', label: 'Solicitudes', icon: ClipboardList },
        { id: 'tecnico-suscripciones', label: 'Suscripciones', icon: CreditCard },
        { id: 'tecnico-history', label: 'Historial', icon: History, hasDividerAfter: true },
        { id: 'tecnico-help', label: 'Ayuda Técnico', icon: HelpCircle },
        { id: 'tecnico-profile', label: 'Mi Cuenta', icon: User },
    ];

    // Secciones de la Barra Navegación Inferior
    const bottomNavLeft: MenuItem[] = [
        { id: 'tecnico-requests', label: 'Solicitudes', icon: ClipboardList },
        { id: 'tecnico-suscripciones', label: 'Suscrip.', icon: CreditCard },
    ];

    const bottomNavRight: MenuItem[] = [
        { id: 'tecnico-history', label: 'Historial', icon: History },
        { id: 'tecnico-help', label: 'Ayuda', icon: HelpCircle },
    ];

    const handleNavigation = (viewId: string) => {
        onNavigate(viewId);
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#F8FAFC] font-['Roboto'] overflow-hidden relative">
            {/* Header Superior Móvil */}
            <header className="h-14 bg-white border-b border-slate-200 px-3 flex items-center justify-between shrink-0 z-20">
                {/* Lado Izquierdo: Menú Hamburguesa */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-1.5 rounded-[4px] text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                    aria-label="Abrir menú"
                >
                    {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* Centro: Nombre de la Empresa */}
                <div className="text-center">
                    <h1 className="text-sm text-[#0E5E6F] font-black uppercase tracking-tight leading-none">
                        TECNODACTYLUS
                    </h1>
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest block mt-0.5">
                        Portal Técnico
                    </span>
                </div>

                {/* Lado Derecho: Botón de Notificaciones + Foto de Perfil */}
                <div className="flex items-center gap-2">
                    {/* BOTÓN DE NOTIFICACIONES */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowNotifications(!showNotifications)}
                            style={{ borderRadius: "4px" }}
                            className="relative p-1.5 bg-white border border-gray-200 hover:border-gray-300 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer touch-manipulation"
                        >
                            <Bell size={18} className="text-gray-700" />
                            {unreadCount > 0 && (
                                <span
                                    style={{ backgroundColor: HEX_COLORS.red, borderRadius: "4px" }}
                                    className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] text-white font-black shadow-xs"
                                >
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* POPUP MODAL QUE NACE DIRECTAMENTE DEL BOTÓN DE NOTIFICACIONES */}
                        {showNotifications && (
                            <>
                                {/* BACKDROP TRANSPARENTE QUE CIERRA AL TOCAR AFUERA */}
                                <div
                                    className="fixed inset-0 z-40 bg-black/20"
                                    onClick={() => setShowNotifications(false)}
                                />

                                {/* CARD COMPACTO: w-65 Y max-w-[calc(100vw-2rem)] EVITA SALIRSE POR LA IZQUIERDA */}
                                <div
                                    onTouchStart={handleTouchStartModal}
                                    onTouchMove={handleTouchMoveModal}
                                    onTouchEnd={handleTouchEndModal}
                                    style={{
                                        transform: `translateY(${dragY}px)`,
                                        transition: isDraggingModal.current ? "none" : "transform 0.2s cubic-bezier(0,0,0.2,1)",
                                    }}
                                    className="absolute top-12 right-0 z-50 bg-white border-2 border-gray-300 rounded-[4px] w-66 max-w-[calc(100vw-2rem)] shadow-2xl flex flex-col text-left origin-top-right animate-in zoom-in-95 duration-150"
                                >
                                    {/* Píldora táctil indicadora */}
                                    <div className="flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing">
                                        <div className="w-8 h-1 bg-gray-300 rounded-full" />
                                    </div>

                                    <div className="p-2.5 space-y-2">
                                        {/* Encabezado */}
                                        <div className="flex items-center justify-between pb-1.5 border-b-2 border-gray-100">
                                            <div className="flex items-center gap-1.5">
                                                <div className="p-1 bg-[#0E5E6F]/10 rounded-[4px] text-[#0E5E6F]">
                                                    <Bell size={12} />
                                                </div>
                                                <h3 className="text-xs font-black text-gray-800 normal-case">
                                                    Notificaciones
                                                </h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShowNotifications(false)}
                                                className="p-1 text-gray-400 hover:text-gray-600 rounded-[4px] cursor-pointer touch-manipulation"
                                            >
                                                <X size={13} />
                                            </button>
                                        </div>

                                        {/* Lista de Notificaciones compacta sin barras de scroll */}
                                        <div className="space-y-1.5 max-h-60 overflow-hidden">
                                            {notificaciones.map((n) => (
                                                <div
                                                    key={n.id}
                                                    className={`p-2 border rounded-[4px] text-xs transition-colors ${
                                                        n.unread ? "bg-gray-50/90 border-gray-200" : "bg-white border-gray-100"
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start gap-1 mb-1">
                                                        <span
                                                            style={{
                                                                backgroundColor: n.colorBg,
                                                                color: n.textColor,
                                                            }}
                                                            className="px-1.5 py-0.5 text-[8px] font-extrabold flex items-center gap-1 tracking-wider rounded-[4px] truncate"
                                                        >
                                                            {n.icono}
                                                            <span className="truncate">{n.titulo}</span>
                                                        </span>
                                                        <span className="text-[8px] font-mono font-medium text-gray-400 shrink-0">
                                                            {n.tiempo}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 font-medium text-[10px] leading-snug">
                                                        {n.detalle}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pie del modal */}
                                        <div className="pt-1.5 border-t border-gray-100 text-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNotificaciones(notificaciones.map((n) => ({ ...n, unread: false })));
                                                }}
                                                className="w-full py-1 px-2 bg-white border border-gray-200 hover:border-gray-300 text-[#0E5E6F] font-bold rounded-[4px] text-[10px] transition-colors active:scale-95 shadow-xs cursor-pointer touch-manipulation"
                                            >
                                                Marcar todas como leídas
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Sidebar Desplegable desde el Lado Izquierdo */}
            {isSidebarOpen && (
                <div className="absolute inset-0 top-14 z-40 flex">
                    {/* Contenido del Sidebar */}
                    <aside className="w-45 bg-white h-full border-r border-slate-200 shadow-2xl flex flex-col justify-between p-3 z-50 animate-in slide-in-from-left duration-200">
                        <div>
                            {/* Información del Perfil en el Sidebar */}
                            <div className="flex items-center gap-3 p-2 mb-3 bg-slate-50 rounded-[4px] border border-slate-200">
                                <div className="w-9 h-9 rounded-[4px] overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                                    <img
                                        src={tecnicoPerfilImg}
                                        alt="Mario Alvarado"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left leading-tight">
                                    <p className="font-bold text-xs text-slate-900">
                                        Mario Alvarado
                                    </p>
                                    <span className="text-[10px] text-[#0E5E6F] font-semibold block truncate">
                                        Técnico
                                    </span>
                                </div>
                            </div>

                            {/* Opciones del Menú */}
                            <nav className="flex flex-col gap-1">
                                {sidebarMenuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = currentView === item.id;
                                    return (
                                        <React.Fragment key={item.id}>
                                            <button
                                                onClick={() => handleNavigation(item.id)}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-[4px] text-xs font-medium transition-colors ${
                                                    isActive
                                                        ? 'bg-[#0E5E6F] text-white shadow-sm'
                                                        : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                                                }`}
                                            >
                                                <Icon size={16} />
                                                <span>{item.label}</span>
                                            </button>
                                            {item.hasDividerAfter && (
                                                <div className="my-1 border-t border-slate-100" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Pie del Sidebar */}
                        <div className="text-center pt-2 border-t border-slate-100">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                TECNODACTYLUS System v1.0
                            </span>
                        </div>
                    </aside>

                    {/* Overlay para cerrar al hacer clic afuera */}
                    <div
                        className="flex-1 bg-slate-900/40 backdrop-blur-xs"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Contenido Principal (Sin paddings) */}
            <main className="flex-1 overflow-y-auto pb-16 bg-[#F8FAFC]">
                {children}
            </main>

            {/* Barra de Navegación Inferior (Bottom Navigation) */}
            <nav className="absolute bottom-1 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                {/* Lado Izquierdo (Solicitudes y Suscripciones) */}
                {bottomNavLeft.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
                        >
                            <div
                                className={`w-8 h-8 rounded-[4px] flex items-center justify-center transition-colors ${
                                    isActive
                                        ? 'bg-[#0E5E6F] text-white shadow-sm'
                                        : 'bg-transparent text-slate-400 group-hover:text-slate-600'
                                }`}
                            >
                                <Icon size={18} />
                            </div>
                            <span
                                className={`text-[9px] font-semibold truncate max-w-[55px] ${
                                    isActive ? 'text-[#0E5E6F]' : 'text-slate-400'
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* Centro: Dashboard Técnico (Principal) */}
                <button
                    onClick={() => onNavigate('tecnico-dashboard')}
                    className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
                >
                    <div
                        className={`w-9 h-9 rounded-[4px] flex items-center justify-center transition-all ${
                            currentView === 'tecnico-dashboard'
                                ? 'bg-[#0E5E6F] text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                    </div>
                    <span
                        className={`text-[9px] font-bold ${
                            currentView === 'tecnico-dashboard' ? 'text-[#0E5E6F]' : 'text-slate-500'
                        }`}
                    >
                        Dashboard
                    </span>
                </button>

                {/* Lado Derecho (Historial y Ayuda) */}
                {bottomNavRight.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
                        >
                            <div
                                className={`w-8 h-8 rounded-[4px] flex items-center justify-center transition-colors ${
                                    isActive
                                        ? 'bg-[#0E5E6F] text-white shadow-sm'
                                        : 'bg-transparent text-slate-400 group-hover:text-slate-600'
                                }`}
                            >
                                <Icon size={18} />
                            </div>
                            <span
                                className={`text-[9px] font-semibold truncate max-w-[55px] ${
                                    isActive ? 'text-[#0E5E6F]' : 'text-slate-400'
                                }`}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};