import React, { useState } from 'react';
import {
    LayoutDashboard,
    Radio,
    History,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    User,
    LucideIcon, FileText, Pencil,
    Plane, CreditCard
} from 'lucide-react';
import pilotoPerfilImg from '../../../img/piloto_perfil.png';

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

export const PilotoLayout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems: MenuItem[] = [
        { id: 'piloto-dashboard', label: 'Dashboard piloto', icon: LayoutDashboard },
        { id: 'piloto-misiones', label: 'Mis misiones', icon: FileText },
        { id: 'piloto-dron', label: 'Drones', icon: Plane },
        { id: 'piloto-maps', label: 'Editor de mapas', icon: Pencil },
        { id: 'piloto-suscripciones', label: 'Suscripciones', icon: CreditCard },
        { id: 'piloto-history', label: 'Historial', icon: History, hasDividerAfter: true },
        { id: 'piloto-help', label: 'Ayuda y asistencia', icon: HelpCircle },
        { id: 'piloto-profile', label: 'Mi perfil', icon: User },
    ];

    return (
        <div className="flex h-full w-full min-h-0 bg-[#F8FAFC] font-['Roboto'] overflow-hidden">
            {/* Sidebar Piloto */}
            <aside
                className={`border-r border-gray-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-48'
                    }`}
            >
                <div>
                    {/* Header del Sidebar */}
                    <div
                        className={`p-2 border-b-2 border-gray-200 bg-gray-50 flex items-center justify-between gap-2 ${isCollapsed ? 'flex-col' : 'flex-row'
                            }`}
                    >
                        {!isCollapsed ? (
                            <div className="text-left animate-in fade-in duration-200">
                                <h1 className="text-base text-[#0E5E6F] uppercase font-black tracking-tight">
                                    BioDron
                                </h1>
                                <p className="text-[9px] text-gray-400 font-bold tracking-widest -mt-0.5">
                                    Portal Piloto
                                </p>
                            </div>
                        ) : (
                            <div className="w-10 h-10 mx-auto bg-[#0E5E6F] text-white rounded-[4px] flex items-center justify-center font-black text-xs shadow-sm">
                                BD
                            </div>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`p-1 rounded-[4px] border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors bg-white active:scale-95 ${isCollapsed ? 'mx-auto mt-1' : ''
                                }`}
                        >
                            {isCollapsed ? (
                                <ChevronRight size={14} />
                            ) : (
                                <ChevronLeft size={14} />
                            )}
                        </button>
                    </div>

                    {/* Menú de Navegación */}
                    <nav className="p-2 flex flex-col gap-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;

                            return (
                                <React.Fragment key={item.id}>
                                    <div className="relative group/tooltip">
                                        <button
                                            onClick={() => onNavigate(item.id)}
                                            className={`flex items-center transition-colors ${isCollapsed
                                                    ? `w-10 h-10 mx-auto justify-center rounded-[4px] ${isActive
                                                        ? 'bg-[#0E5E6F] text-white shadow'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }`
                                                    : `w-full gap-3 px-2.5 py-2 rounded-[4px] justify-start text-sm font-medium ${isActive
                                                        ? 'bg-[#0E5E6F] text-white shadow'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }`
                                                }`}
                                        >
                                            <Icon size={18} className="shrink-0" />
                                            {!isCollapsed && <span className="truncate leading-tight">{item.label}</span>}
                                        </button>

                                        {/* Tooltip al colapsar */}
                                        {isCollapsed && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-lg border border-gray-800">
                                                {item.label}
                                            </div>
                                        )}
                                    </div>

                                    {/* Separador entre bloques */}
                                    {item.hasDividerAfter && (
                                        <div className="my-1.5 border-t border-gray-200" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>

                {/* Pie de página con Usuario */}
                <div className="p-2.5 border-t border-gray-200 bg-gray-50 relative group/tooltip">
                    <div
                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}
                    >
                        <div className="w-9 h-9 bg-gray-200 border-2 border-gray-400 rounded-[4px] flex items-center justify-center text-xs font-black text-gray-700 shrink-0">
                            <img
                                src={pilotoPerfilImg}
                                alt="Carlos Sosa"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="text-left animate-in fade-in duration-200 leading-tight">
                                <p className="font-bold text-sm text-gray-900">
                                    Carlos Sosa
                                </p>
                                <p className="text-xs text-green-600 font-semibold">
                                    Piloto
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tooltip del usuario al colapsar */}
                    {isCollapsed && (
                        <div className="absolute left-full bottom-2.5 ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-lg border border-gray-800">
                            Carlos Sosa (Piloto)
                        </div>
                    )}
                </div>
            </aside>

            {/* Contenido Principal - Padding totalmente eliminado (p-0) */}
            <main className="flex-1 overflow-y-auto h-full p-0 bg-[#F8FAFC]">
                {children}
            </main>
        </div>
    );
};