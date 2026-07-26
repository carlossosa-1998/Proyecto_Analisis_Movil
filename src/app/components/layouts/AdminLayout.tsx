import React, { useState } from 'react';
import {
    LayoutDashboard,
    DollarSign,
    HelpCircle,
    History,
    Pencil,
    Database,
    ChevronLeft,
    ChevronRight,
    User,
    LucideIcon
} from 'lucide-react';
import adminPerfilImg from '../../../img/admin_perfil.png';

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

export const AdminLayout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems: MenuItem[] = [
        { id: 'admin-dashboard', label: 'Dashboard admin', icon: LayoutDashboard },
        { id: 'admin-history', label: 'Historial', icon: History, hasDividerAfter: true },

        { id: 'admin-maps', label: 'Editor de mapas', icon: Pencil },
        { id: 'admin-data', label: 'Gestión de datos', icon: Database },
        { id: 'admin-prices', label: 'Precios y planes', icon: DollarSign, hasDividerAfter: true },

        { id: 'admin-help', label: 'Soporte', icon: HelpCircle },
        { id: 'admin-profile', label: 'Mi perfil', icon: User },
    ];

    return (
        <div className="flex h-full w-full min-h-0 bg-[#F8FAFC] font-['Roboto'] overflow-hidden">
            {/* Sidebar Admin */}
            <aside
                className={`border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-16' : 'w-48'
                    }`}
            >
                <div>
                    {/* Header */}
                    <div
                        className={`p-2 border-b-2 border-slate-200 bg-slate-50 flex items-center justify-between gap-2 shrink-0 ${isCollapsed ? 'flex-col' : 'flex-row'
                            }`}
                    >
                        {!isCollapsed ? (
                            <div className="text-left">
                                <h1 className="text-base text-[#0E5E6F] font-black uppercase tracking-tight leading-none">
                                    BIODRON
                                </h1>
                                <span className="text-[9px] text-slate-400 mt-0.5 font-bold tracking-widest block">
                                    Panel Administrativo
                                </span>
                            </div>
                        ) : (
                            <div className="w-10 h-10 mx-auto bg-[#0E5E6F] text-white rounded-[4px] flex items-center justify-center font-black text-xs shadow-sm">
                                BD
                            </div>
                        )}

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`p-1 rounded-[4px] border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors bg-white active:scale-95 ${isCollapsed ? 'mx-auto mt-1' : ''
                                }`}
                            title={isCollapsed ? 'Expandir' : 'Colapsar'}
                        >
                            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                        </button>
                    </div>

                    {/* Navegación Principal */}
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
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`
                                                    : `w-full gap-3 px-2.5 py-2 rounded-[4px] justify-start text-sm font-medium ${isActive
                                                        ? 'bg-[#0E5E6F] text-white shadow'
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                    }`
                                                }`}
                                        >
                                            <Icon size={18} className="shrink-0" />
                                            {!isCollapsed && <span className="truncate leading-tight">{item.label}</span>}
                                        </button>

                                        {/* Tooltip visible solo al colapsar */}
                                        {isCollapsed && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-lg border border-slate-800">
                                                {item.label}
                                            </div>
                                        )}
                                    </div>

                                    {/* Separador entre bloques */}
                                    {item.hasDividerAfter && (
                                        <div className="my-1.5 border-t border-slate-200" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer / Perfil de Usuario */}
                <div className="p-2.5 border-t border-slate-200 bg-slate-50 relative group/tooltip shrink-0">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}>
                        <div className="w-9 h-9 rounded-[4px] overflow-hidden border-2 border-slate-400 shrink-0 bg-slate-200 flex items-center justify-center">
                            <img
                                src={adminPerfilImg}
                                alt="Carlos Sosa"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="text-left leading-tight truncate">
                                <p className="font-bold text-sm text-slate-900 truncate">
                                    Carlos Rodríguez
                                </p>
                                <span className="text-xs text-[#0E5E6F] font-semibold block truncate">
                                    Administrador
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Tooltip flotante del usuario al colapsar */}
                    {isCollapsed && (
                        <div className="absolute left-full bottom-2.5 ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-150 z-50 shadow-lg border border-slate-800">
                            Carlos Rodríguez (Administrador)
                        </div>
                    )}
                </div>
            </aside>

            {/* Contenido Principal con scroll vertical controlado */}
            <main className="flex-1 overflow-y-auto h-full p-0 bg-[#F8FAFC]">
                {children}
            </main>
        </div>
    );
};