import React, { useState } from 'react';
import {
    LayoutDashboard,
    CreditCard,
    FileText,
    History,
    HelpCircle,
    User,
    Plane,
    Menu,
    X,
    LucideIcon
} from 'lucide-react';
import clientePerfilImg from '../../../img/granjero_perfil.png';

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

export const ClienteLayout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Menú completo del Sidebar Lateral
    const sidebarMenuItems: MenuItem[] = [
        { id: 'cliente-dashboard', label: 'Dashboard cliente', icon: LayoutDashboard },
        { id: 'cliente-servicios', label: 'Servicios', icon: FileText },
        { id: 'cliente-suscripciones', label: 'Suscripciones', icon: CreditCard },
        { id: 'cliente-dron', label: 'Drones', icon: Plane },
        { id: 'cliente-history', label: 'Historial', icon: History, hasDividerAfter: true },
        { id: 'cliente-help', label: 'Ayuda y asistencia', icon: HelpCircle },
        { id: 'cliente-profile', label: 'Mi perfil', icon: User },
    ];

    // Secciones de la Barra Navegación Inferior
    const bottomNavLeft: MenuItem[] = [
        { id: 'cliente-servicios', label: 'Servicios', icon: FileText },
        { id: 'cliente-suscripciones', label: 'Planes', icon: CreditCard },
    ];

    const bottomNavRight: MenuItem[] = [
        { id: 'cliente-dron', label: 'Drones', icon: Plane },
        { id: 'cliente-history', label: 'Historial', icon: History },
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
                        BIODRON
                    </h1>
                    <span className="text-[8px] text-slate-400 font-bold tracking-widest block mt-0.5">
                        Portal Cliente
                    </span>
                </div>

                {/* Lado Derecho: Foto de Perfil */}
                <div 
                    onClick={() => onNavigate('cliente-profile')}
                    className="w-8 h-8 rounded-[4px] overflow-hidden border border-slate-300 shrink-0 bg-slate-200 cursor-pointer active:scale-95 transition-transform"
                >
                    <img
                        src={clientePerfilImg}
                        alt="Foto Perfil"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>

            {/* Sidebar Desplegable desde el Lado Izquierdo */}
            {isSidebarOpen && (
                <div className="absolute inset-0 top-14 z-40 flex">
                    {/* Contenido del Sidebar */}
                    <aside className="w-64 bg-white h-full border-r border-slate-200 shadow-2xl flex flex-col justify-between p-3 z-50 animate-in slide-in-from-left duration-200">
                        <div>
                            {/* Información del Perfil en el Sidebar */}
                            <div className="flex items-center gap-3 p-2 mb-3 bg-slate-50 rounded-[4px] border border-slate-200">
                                <div className="w-9 h-9 rounded-[4px] overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
                                    <img
                                        src={clientePerfilImg}
                                        alt="Carlos Sosa"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-left leading-tight truncate">
                                    <p className="font-bold text-xs text-slate-900 truncate">
                                        Carlos Sosa
                                    </p>
                                    <span className="text-[10px] text-[#0E5E6F] font-semibold block truncate">
                                        Cliente
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
                                BioDron System v1.0
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
                {/* Lado Izquierdo (Servicios y Suscripciones) */}
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

                {/* Centro: Dashboard Cliente (Principal) */}
                <button
                    onClick={() => onNavigate('cliente-dashboard')}
                    className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
                >
                    <div
                        className={`w-9 h-9 rounded-[4px] flex items-center justify-center transition-all ${
                            currentView === 'cliente-dashboard'
                                ? 'bg-[#0E5E6F] text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                    </div>
                    <span
                        className={`text-[9px] font-bold ${
                            currentView === 'cliente-dashboard' ? 'text-[#0E5E6F]' : 'text-slate-500'
                        }`}
                    >
                        Dashboard
                    </span>
                </button>

                {/* Lado Derecho (Drones e Historial) */}
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