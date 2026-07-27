import React, { useState } from 'react';

// Layouts con Sidebars por Rol
import { AdminLayout } from './components/layouts/AdminLayout';
import { PilotoLayout } from './components/layouts/PilotoLayout';
import { ClienteLayout } from './components/layouts/ClienteLayout';
import { TecnicoLayout } from './components/layouts/TecnicoLayout';

// Módulo Menú / Kit UI
import { KitUiView } from '../modules/menu';
import { MenuView } from '../modules/menu';

// Módulo Landing & Auth (sin Sidebar)
import { LandingView, AuthView } from '../modules/landing';

// Módulo Admin
import {
  AdminDashboardView, AdminPricesView, AdminHelpView,
  AdminConfigCargoView, AdminCheckoutView, AdminTrackingView, AdminHistoryView,
  AdminMapsView, AdminDataView, AdminProfileView
} from '../modules/admin';

// Módulo Piloto
import {
  PilotoDashboardView, PilotoDronView, PilotoHistoryView, PilotoHelpView, PilotoProfileView, PilotoMisionesView, PilotoSuscripcionesView, PilotoMapsView
} from '../modules/piloto';

// Módulo Cliente / Farmer
import {
  ClienteDashboardView, ClienteSuscripcionesView, ClienteHistoryView, ClienteHelpView, ClienteDronView, ClienteProfileView, ClienteServiciosView
} from '../modules/cliente';

// Módulo Técnico
import {
  TecnicoDashboardView, TecnicoRequestView, TecnicoSuscripcionesView,
  TecnicoHistoryView, TecnicoHelpView, TecnicoProfileView
} from '../modules/tecnico';

// Estructura de datos para las 6 secciones requeridas
interface NavSection {
  id: string;
  title: string;
  views: { id: string; label: string }[];
}

const NAVIGATION_SECTIONS: NavSection[] = [
  {
    id: "menu",
    title: "Menú",
    views: [
      { id: "kit-ui", label: "Kit UI" },
      { id: "menu", label: "Inicio" },
    ],
  },
  {
    id: "landing",
    title: "Landing",
    views: [
      { id: "landing", label: "Landing page" },
      { id: "auth", label: "Login / registro" },
    ],
  },
  {
    id: "cliente",
    title: "Cliente",
    views: [
      { id: "cliente-dashboard", label: "Dashboard" },
      { id: "cliente-servicios", label: "Servicios" },
      { id: "cliente-suscripciones", label: "Suscripciones" },
      { id: "cliente-dron", label: "Drones" },
      { id: "cliente-history", label: "Historial" },
      { id: "cliente-help", label: "Ayuda" },
      { id: "cliente-profile", label: "Perfil" },
    ],
  },
  {
    id: "piloto",
    title: "Piloto",
    views: [
      { id: "piloto-dashboard", label: "Dashboard" },
      { id: "piloto-misiones", label: "Misiones" },
      { id: "piloto-dron", label: "Dron" },
      { id: "piloto-maps", label: "Mapas" },
      { id: "piloto-suscripciones", label: "Suscripciones" },
      { id: "piloto-history", label: "Historial" },
      { id: "piloto-help", label: "Ayuda" },
      { id: "piloto-profile", label: "Perfil" },
    ],
  },
  {
    id: "tecnico",
    title: "Técnico",
    views: [
      { id: "tecnico-dashboard", label: "Dashboard" },
      { id: "tecnico-requests", label: "Solicitudes" },
      { id: "tecnico-suscripciones", label: "Suscripciones" },
      { id: "tecnico-history", label: "Historial" },
      { id: "tecnico-help", label: "Ayuda" },
      { id: "tecnico-profile", label: "Perfil" },
    ],
  },
  {
    id: "admin",
    title: "Admin",
    views: [
      { id: "admin-dashboard", label: "Dashboard" },
      { id: "admin-prices", label: "Precios" },
      { id: "admin-maps", label: "Mapas" },
      { id: "admin-data", label: "Datos" },
      { id: "admin-history", label: "Historial" },
      { id: "admin-help", label: "Ayuda" },
      { id: "admin-profile", label: "Perfil" },
    ],
  },
];

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [authTab, setAuthTab] = useState<"login" | "register">("login");

  // Estado para controlar qué secciones desplegables están abiertas
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    landing: true,
    cliente: true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderView = () => {
    switch (currentView) {
      // 1. Vistas Públicas / Landing / Kit UI
      case 'kit-ui':
        return <KitUiView />;

        case 'menu':
        return <MenuView />;

      case 'landing':
        return (
          <LandingView
            onLogin={() => {
              setAuthTab("login");
              setCurrentView("auth");
            }}
            onRegister={() => {
              setAuthTab("register");
              setCurrentView("auth");
            }}
          />
        );

      case 'auth':
        return (
          <AuthView
            initialTab={authTab}
            onLogin={(role) => {
              switch (role) {
                case 'admin':
                  setCurrentView('admin-dashboard');
                  break;
                case 'piloto':
                  setCurrentView('piloto-dashboard');
                  break;
                case 'cliente':
                  setCurrentView('cliente-dashboard');
                  break;
                case 'tecnico':
                  setCurrentView('tecnico-dashboard');
                  break;
                default:
                  setCurrentView('cliente-dashboard');
              }
            }}
            onRegister={() => setCurrentView('auth')}
            onBack={() => setCurrentView('landing')}
          />
        );

      // 2. Módulo Admin
      case 'admin-dashboard':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminDashboardView />
          </AdminLayout>
        );

      case 'admin-prices':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminPricesView />
          </AdminLayout>
        );

      case 'admin-help':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminHelpView />
          </AdminLayout>
        );

      case 'admin-history':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminHistoryView />
          </AdminLayout>
        );

      case 'admin-maps':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminMapsView />
          </AdminLayout>
        );

      case 'admin-data':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminDataView />
          </AdminLayout>
        );

      case 'admin-profile':
        return (
          <AdminLayout currentView={currentView} onNavigate={setCurrentView}>
            <AdminProfileView onLogout={() => setCurrentView('landing')} />
          </AdminLayout>
        );

      // 3. Módulo Piloto
      case 'piloto-dashboard':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoDashboardView />
          </PilotoLayout>
        );

      case 'piloto-misiones':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoMisionesView />
          </PilotoLayout>
        );

      case 'piloto-dron':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoDronView />
          </PilotoLayout>
        );

      case 'piloto-maps':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoMapsView />
          </PilotoLayout>
        );

      case 'piloto-suscripciones':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoSuscripcionesView />
          </PilotoLayout>
        );

      case 'piloto-history':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoHistoryView />
          </PilotoLayout>
        );

      case 'piloto-help':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoHelpView />
          </PilotoLayout>
        );

      case 'piloto-profile':
        return (
          <PilotoLayout currentView={currentView} onNavigate={setCurrentView}>
            <PilotoProfileView onLogout={() => setCurrentView('landing')} />
          </PilotoLayout>
        );

      // 4. Módulo Cliente / Farmer
      case 'cliente-dashboard':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteDashboardView onNavigate={setCurrentView} />
          </ClienteLayout>
        );

      case 'cliente-servicios':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteServiciosView />
          </ClienteLayout>
        );

      case 'cliente-suscripciones':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteSuscripcionesView />
          </ClienteLayout>
        );

      case 'cliente-dron':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteDronView />
          </ClienteLayout>
        );

      case 'cliente-history':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteHistoryView />
          </ClienteLayout>
        );

      case 'cliente-help':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteHelpView />
          </ClienteLayout>
        );

      case 'cliente-profile':
        return (
          <ClienteLayout currentView={currentView} onNavigate={setCurrentView}>
            <ClienteProfileView onLogout={() => setCurrentView('landing')} />
          </ClienteLayout>
        );

      // 5. Módulo Técnico
      case 'tecnico-dashboard':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoDashboardView />
          </TecnicoLayout>
        );

      case 'tecnico-requests':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoRequestView />
          </TecnicoLayout>
        );

      case 'tecnico-suscripciones':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoSuscripcionesView />
          </TecnicoLayout>
        );

      case 'tecnico-history':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoHistoryView />
          </TecnicoLayout>
        );

      case 'tecnico-help':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoHelpView />
          </TecnicoLayout>
        );

      case 'tecnico-profile':
        return (
          <TecnicoLayout currentView={currentView} onNavigate={setCurrentView}>
            <TecnicoProfileView onLogout={() => setCurrentView('landing')} />
          </TecnicoLayout>
        );

      default:
        return (
          <LandingView
            onLogin={() => setCurrentView('auth')}
            onRegister={() => setCurrentView('auth')}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 gap-6"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        fontFamily: "'Roboto', sans-serif"
      }}
    >
      {/* MENÚ DESPLEGABLE EXTERIOR */}
      <div className="hidden lg:flex flex-col gap-3 w-64 pt-2 flex-shrink-0 max-h-[92vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="bg-[#111827]/90 backdrop-blur border border-slate-700/60 rounded-[4px] p-3.5 text-white shadow-xl">
          {/* Title Case */}
          <p className="text-[11px] tracking-wider text-[#cbd5e1] mb-3 font-bold border-b border-slate-700/50 pb-1">
            Navegador Por Secciones
          </p>

          <div className="flex flex-col gap-2">
            {NAVIGATION_SECTIONS.map((section) => {
              const isOpen = !!openSections[section.id];
              const hasActiveChild = section.views.some((v) => v.id === currentView);

              return (
                <div
                  key={section.id}
                  className="border border-slate-700/50 rounded-[4px] overflow-hidden bg-slate-900/40"
                >
                  {/* Encabezado de la Sección - Title Case */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-bold rounded-[4px] transition-colors duration-150"
                    style={{
                      backgroundColor: isOpen || hasActiveChild ? "#0E5E6F" : "transparent",
                      color: isOpen || hasActiveChild ? "#ffffff" : "#cbd5e1",
                    }}
                  >
                    <span>{section.title}</span>
                    <span className="text-[10px] opacity-80">
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Vistas Internas - Tipo Oración */}
                  {isOpen && (
                    <div className="flex flex-col p-1.5 gap-1 bg-slate-950/60">
                      {section.views.map((v) => {
                        const isActive = currentView === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setCurrentView(v.id)}
                            className={`text-left text-[11px] px-2.5 py-1.5 rounded-[4px] transition-all duration-150 ${
                              isActive
                                ? "bg-white text-[#0E5E6F] font-bold shadow-sm"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            • {v.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tarjeta Informativa - Title Case */}
          <div className="mt-4 border border-dashed border-slate-700 p-2.5 rounded-[4px] bg-slate-900/50">
            <p className="text-[9px] tracking-wider text-slate-300 font-bold mb-0.5">
              Prototipo BioDron
            </p>
            <p className="text-[9px] text-slate-400 leading-relaxed">
              Mapeo De vistas.
            </p>
          </div>
        </div>
      </div>

      {/* DISPOSITIVO MÓVIL ESTILO IPHONE (RECTANGULAR CON BORDES PLANOS) */}
      <div
        className="relative flex-shrink-0 select-none"
        style={{
          height: "92vh",
          aspectRatio: "9 / 19.5",
          maxHeight: "960px",
          border: "4px solid #1f1f24",
          borderRadius: 18, // Bordes menos curvos, más rectos
          overflow: "hidden",
          boxShadow: "0 0 0 5px #3a3a40, 0 30px 80px rgba(0,0,0,0.65)",
          background: "#ffffff",
        }}
      >
        {/* Dynamic Island (Isla Dinámica de iPhone) */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-[#000000] shadow-md flex items-center justify-between px-2.5"
          style={{ width: 100, height: 25, borderRadius: 18 }}
        >
          {/* Lente cámara */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#11111a] border border-[#222]" />
          {/* Sensor */}
          <div className="w-2 h-2 rounded-full bg-[#0a0a10]" />
        </div>

        {/* Viewport contenedor de la App */}
        <div className="absolute inset-0 flex flex-col overflow-hidden pt-10">
          <div className="flex-1 overflow-y-auto flex flex-col">
            {renderView()}
          </div>
        </div>

        {/* Indicador Home Bar (Línea Inferior de iOS) */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#111111]/60 rounded-full z-20 pointer-events-none" />
      </div>
    </div>
  );
}