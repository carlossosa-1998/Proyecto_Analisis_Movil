import React, { useState, useRef } from 'react';
import { BatteryFull, Bell, CalendarDays, Camera, Check, ChevronDown, Clock, Globe, Home, ImageIcon, LayoutGrid, Leaf, Mail, MessageCircle, Music2, Phone, SearchIcon, Settings, SignalHigh, Sliders, StickyNote, Tag, Trash2, Wallet, Wifi, X } from 'lucide-react';
import { LandingView } from './landing.tsx';

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
        className={`px-3 py-1.5 text-xs tracking-wider transition-all border-2 rounded-[4px] ${
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
        className={`flex flex-col mb-3 w-full ${className}`}
        style={{ fontFamily: "'Roboto', sans-serif" }}
    >
        <label className="mb-1 text-xs text-gray-600 tracking-tight">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="p-2 text-xs border-2 border-gray-200 rounded-[4px] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0E5E6F] transition-colors"
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

// Barra de gesto inferior que aparece dentro de cada "app" abierta y regresa al home screen al tocarla
const HomeIndicator = ({ onGoHome }: { onGoHome: () => void }) => (
  <button
    onClick={onGoHome}
    style={{ fontFamily: "'Roboto', sans-serif" }}
    className="shrink-0 w-full py-2.5 flex justify-center bg-white/95 backdrop-blur border-t border-gray-100 active:bg-gray-50 transition-colors cursor-pointer"
    title="Volver al inicio"
  >
    <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
  </button>
);

type AppScreen = "home" | "landing" | "kit-ui";

interface AppDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  bg: string; // color de fondo del ícono
  onOpen?: () => void; // si no tiene onOpen, es un ícono decorativo sin acción real
}

// Menu de apps moviles
export const MenuView = () => {
  const [screen, setScreen] = useState<AppScreen>("home");

  // Hora mostrada en la barra de estado (se calcula una sola vez al montar)
  const [clock] = useState<string>(() =>
    new Date().toLocaleTimeString("es-HN", { hour: "2-digit", minute: "2-digit", hour12: false })
  );

  const goHome = () => setScreen("home");

  // Apps de relleno (decorativas, look real de un home screen Android)
  const fillerApps: AppDef[] = [
    { id: "phone", name: "Teléfono", icon: <Phone size={22} />, bg: "#22C55E" },
    { id: "messages", name: "Mensajes", icon: <MessageCircle size={22} />, bg: "#3B82F6" },
    { id: "browser", name: "Chrome", icon: <Globe size={22} />, bg: "#F59E0B" },
    { id: "mail", name: "Correo", icon: <Mail size={22} />, bg: "#EF4444" },
    { id: "calendar", name: "Calendario", icon: <CalendarDays size={22} />, bg: "#0EA5E9" },
    { id: "clock", name: "Reloj", icon: <Clock size={22} />, bg: "#111827" },
    { id: "music", name: "Música", icon: <Music2 size={22} />, bg: "#F97316" },
    { id: "notes", name: "Notas", icon: <StickyNote size={22} />, bg: "#FACC15" },
    { id: "wallet", name: "Billetera", icon: <Wallet size={22} />, bg: "#6366F1" },
    { id: "settings", name: "Ajustes", icon: <Settings size={22} />, bg: "#64748B" },
  ];

  // Apps reales de la demo: abren LandingView y KitUiView dentro del mismo marco
  const demoApps: AppDef[] = [
    {
      id: "landing",
      name: "BioDron",
      icon: <Leaf size={22} className="text-white" />,
      bg: "#0E5E6F",
      onOpen: () => setScreen("landing"),
    },
    {
      id: "kit-ui",
      name: "Kit UI",
      icon: <LayoutGrid size={22} className="text-white" />,
      bg: "#7C3AED",
      onOpen: () => setScreen("kit-ui"),
    },
  ];

  // Orden del grid: las 2 apps de la demo se insertan entre las decorativas, como si fueran apps instaladas más
  const gridApps: AppDef[] = [
    ...fillerApps.slice(0, 3),
    demoApps[0],
    ...fillerApps.slice(3, 7),
    demoApps[1],
    ...fillerApps.slice(7),
  ];

  // Apps ancladas en el dock inferior
  const dockApps: AppDef[] = [fillerApps[0], fillerApps[1], fillerApps[4], fillerApps[2]];

  const AppIcon = ({ app }: { app: AppDef }) => (
    <button
      onClick={app.onOpen}
      className={`flex flex-col items-center gap-1 w-full group ${app.onOpen ? "cursor-pointer" : "cursor-default"}`}
    >
      <div
        style={{ backgroundColor: app.bg, borderRadius: "4px" }}
        className={`w-12 h-12 flex items-center justify-center shadow-md transition-transform active:scale-90 ${
          app.onOpen ? "ring-2 ring-white/70 ring-offset-1 ring-offset-transparent" : ""
        }`}
      >
        {app.icon}
      </div>
      <span className="text-[10px] font-medium text-white drop-shadow-sm truncate w-full text-center">
        {app.name}
      </span>
    </button>
  );

  return (
    // Cubre por completo el viewport del dispositivo en el que se monte (ver App.tsx),
    // por eso usa w-full h-full en vez de un tamaño o centrado propio.
    <div
      style={{ fontFamily: "'Roboto', sans-serif" }}
      className="relative w-full h-full bg-white overflow-hidden select-none"
    >
        {/* ===== BARRA DE ESTADO ===== */}
        <div
          className={`absolute top-0 inset-x-0 h-10 flex items-center justify-between px-5 z-40 ${
            screen === "home" ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="text-[11px] font-semibold">{clock}</span>
          <div className="flex items-center gap-1.5">
            <SignalHigh size={13} />
            <Wifi size={13} />
            <BatteryFull size={14} />
          </div>
        </div>

        {/* ===== PANTALLA DE INICIO ===== */}
        {screen === "home" && (
          <div
            className="absolute inset-0 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #0E5E6F 0%, #123B47 45%, #0B1B21 100%)",
            }}
          >
            {/* Reloj grande estilo Android */}
            <div className="pt-16 pb-4 text-center">
              <p className="text-white text-5xl font-light tracking-tight">{clock}</p>
              <p className="text-white/70 text-xs font-medium mt-1">
                Domingo, 26 de julio
              </p>
            </div>

            {/* Barra de búsqueda estilo Google */}
            <div className="px-6 mb-6">
              <div
                style={{ borderRadius: "4px" }}
                className="flex items-center gap-2.5 bg-white/95 px-4 py-2.5 shadow-md"
              >
                <SearchIcon size={15} className="text-gray-500" />
                <span className="text-xs text-gray-400 font-medium">Buscar en el dispositivo</span>
              </div>
            </div>

            {/* Grid de apps */}
            <div className="flex-1 overflow-y-auto px-5 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="grid grid-cols-4 gap-y-5 gap-x-2 text-white">
                {gridApps.map((app) => (
                  <AppIcon key={app.id} app={app} />
                ))}
              </div>
            </div>

            {/* Dock inferior */}
            <div className="px-5 pb-2">
              <div
                style={{ borderRadius: "4px" }}
                className="bg-white/15 backdrop-blur-md px-4 py-3 flex items-center justify-between"
              >
                {dockApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={app.onOpen}
                    className="active:scale-90 transition-transform"
                  >
                    <div
                      style={{ backgroundColor: app.bg, borderRadius: "4px" }}
                      className="w-11 h-11 flex items-center justify-center shadow-md text-white"
                    >
                      {app.icon}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Barra de gestos Android */}
            <div className="pb-2 pt-1 flex justify-center">
              <div className="w-32 h-1 bg-white/90 rounded-full"></div>
            </div>
          </div>
        )}

        {/* ===== APP: BIODRON (LandingView) ===== */}
        {screen === "landing" && (
          <div className="absolute inset-0 z-30 bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto pt-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Ajusta las props según la firma real de LandingView */}
              <LandingView onLogin={() => {}} onRegister={() => {}} />
            </div>
            <HomeIndicator onGoHome={goHome} />
          </div>
        )}

        {/* ===== APP: KIT UI (KitUiView) ===== */}
        {screen === "kit-ui" && (
          <div className="absolute inset-0 z-30 bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto pt-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <KitUiView />
            </div>
            <HomeIndicator onGoHome={goHome} />
          </div>
        )}
      </div>
  );
};

// Kit UI Móvil Optimizado
export const KitUiView = () => {
    // Estados para interacción en la vista
    const [activeTab, setActiveTab] = useState("Pestaña activa");
    const [radioVal, setRadioVal] = useState("opcion2");
    const [checkedItems, setCheckedItems] = useState({ item1: true, item2: false });

    // Referencia y lógica de desplazamiento táctil y arrastre con ratón
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsMouseDown(true);
        setStartY(e.pageY - scrollRef.current.offsetTop);
        setScrollTop(scrollRef.current.scrollTop);
    };

    const handleMouseLeaveOrUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !scrollRef.current) return;
        e.preventDefault();
        const y = e.pageY - scrollRef.current.offsetTop;
        const walk = (y - startY) * 1.5;
        scrollRef.current.scrollTop = scrollTop - walk;
    };

    const toggleCheck = (key: keyof typeof checkedItems) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex flex-col w-full h-full bg-[#F8FAFC] text-slate-800 font-['Roboto'] p-3.5 sm:p-5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none gap-4 touch-pan-y ${
                isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
        >

            {/* Encabezado del showcase */}
            <div className="pb-3 border-b border-slate-200 flex flex-col gap-0.5">
                <span className="text-[#0E5E6F] text-[10px] font-bold tracking-wider font-['Roboto'] uppercase">
                    Sistema de diseño • BIODRONE
                </span>
                <h1 className="text-lg font-bold text-slate-900 font-['Roboto'] tracking-tight">
                    Kit de componentes UI
                </h1>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Guía visual y especificaciones técnicas para componentes, etiquetas y botones adaptados a pantallas móviles.
                </p>
            </div>

            {/* SECCIÓN 1: BOTONES Y BOTONES DE SOLO ICONO */}
            <div className="border border-slate-200 bg-white p-3.5 rounded-[4px] shadow-2xs space-y-3.5">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                    Botones y acciones
                </h2>

                {/* Botones Estándar */}
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Primario */}
                    <div className="flex flex-col gap-0.5">
                        <button className="bg-[#0E5E6F] active:bg-[#0B4B58] text-white px-3 py-1.5 rounded-[4px] text-xs font-normal transition-all shadow-sm">
                            Botón primario
                        </button>
                        <span className="text-[9px] font-mono text-slate-400">#0E5E6F</span>
                    </div>

                    {/* Secundario */}
                    <div className="flex flex-col gap-0.5">
                        <button className="bg-slate-100 active:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-[4px] text-xs font-normal transition-all">
                            Botón secundario
                        </button>
                        <span className="text-[9px] font-mono text-slate-400">#F1F5F9</span>
                    </div>

                    {/* Delineado Standard */}
                    <div className="flex flex-col gap-0.5">
                        <button className="border border-slate-200 active:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-[4px] text-xs font-normal transition-all">
                            Delineado
                        </button>
                        <span className="text-[9px] font-mono text-slate-400">Border #E2E8F0</span>
                    </div>

                    {/* Eliminar (Cardinal Red #B8001F) */}
                    <div className="flex flex-col gap-0.5">
                        <button className="border border-[#B8001F] text-[#B8001F] active:bg-[#B8001F]/10 px-3 py-1.5 rounded-[4px] text-xs font-normal flex items-center gap-1.5 transition-all">
                            <Trash2 size={13} />
                            <span>Eliminar</span>
                        </button>
                        <span className="text-[9px] font-mono text-slate-400">Red #B8001F</span>
                    </div>
                </div>

                {/* Botones de Solo Icono */}
                <div className="space-y-2 pt-2.5 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Botones de solo icono</span>
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Icono Primario */}
                        <div className="flex flex-col items-center gap-0.5">
                            <button className="w-8 h-8 bg-[#0E5E6F] active:bg-[#0B4B58] text-white rounded-[4px] flex items-center justify-center transition-all shadow-2xs">
                                <Home size={15} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400">Primario</span>
                        </div>

                        {/* Icono Secundario */}
                        <div className="flex flex-col items-center gap-0.5">
                            <button className="w-8 h-8 bg-slate-100 active:bg-slate-200 text-slate-700 rounded-[4px] flex items-center justify-center transition-all">
                                <Bell size={15} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400">Secundario</span>
                        </div>

                        {/* Icono Delineado */}
                        <div className="flex flex-col items-center gap-0.5">
                            <button className="w-8 h-8 border border-slate-200 bg-white active:bg-slate-50 text-slate-700 rounded-[4px] flex items-center justify-center transition-all">
                                <Sliders size={15} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400">Delineado</span>
                        </div>

                        {/* Icono Eliminar */}
                        <div className="flex flex-col items-center gap-0.5">
                            <button className="w-8 h-8 border border-[#B8001F] text-[#B8001F] active:bg-[#B8001F]/10 rounded-[4px] flex items-center justify-center transition-all">
                                <Trash2 size={15} />
                            </button>
                            <span className="text-[9px] font-mono text-slate-400">Eliminar</span>
                        </div>
                    </div>
                </div>

                {/* Menús desplegables */}
                <div className="space-y-2 pt-2.5 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Menús desplegables</span>
                    <div className="flex flex-col gap-2">
                        <div className="w-full border border-[#0E5E6F] bg-[#0E5E6F] text-white px-3 py-2 rounded-[4px] flex items-center justify-between text-xs font-normal shadow-sm">
                            <span>Opción activa</span>
                            <ChevronDown size={15} />
                        </div>
                        <div className="w-full border border-slate-200 bg-slate-50 text-slate-700 px-3 py-2 rounded-[4px] flex items-center justify-between text-xs font-normal">
                            <span>Opción normal</span>
                            <ChevronDown size={15} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">

                {/* SECCIÓN 2: TAG CARDS Y ETIQUETAS POR ESTADO */}
                <div className="border border-slate-200 bg-white p-3.5 rounded-[4px] shadow-2xs space-y-3">
                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Etiquetas y estados
                    </h2>

                    <div className="flex flex-col gap-2">
                        {[
                            { label: 'Abortado', bg: 'bg-[#B8001F]/10', border: 'border-[#B8001F]/30', text: 'text-[#B8001F]', dot: 'bg-[#B8001F]', code: '#B8001F' },
                            { label: 'Inactivo', bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-900', dot: 'bg-amber-500', code: '#FEF3C7' },
                            { label: 'Activo', bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-900', dot: 'bg-emerald-500', code: '#D1FAE5' },
                            { label: 'En operación', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900', dot: 'bg-blue-500', code: '#DBEAFE' },
                            { label: 'En mantenimiento', bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-900', dot: 'bg-orange-500', code: '#FFEDD5' },
                            { label: 'Disponible', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900', dot: 'bg-purple-500', code: '#F3E8FF' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-2">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${item.bg} border ${item.border} ${item.text} rounded-[4px] text-xs font-normal`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                                    {item.label}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400">{item.code}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tag Cards Removibles */}
                    <div className="pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {[
                            { text: 'Alpha-01', status: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
                            { text: 'Misión norte', status: 'bg-blue-100 text-blue-900 border-blue-300' },
                            { text: 'Batería crítica', status: 'bg-[#B8001F]/10 text-[#B8001F] border-[#B8001F]/30' },
                        ].map((tag, i) => (
                            <div
                                key={i}
                                className={`inline-flex items-center gap-1 border px-2 py-0.5 rounded-[4px] text-xs font-normal ${tag.status}`}
                            >
                                <Tag size={11} />
                                <span>{tag.text}</span>
                                <button className="hover:opacity-70 ml-0.5">
                                    <X size={11} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECCIÓN 3: FORMULARIOS, CHECKBOXES & RADIOS */}
                <div className="border border-slate-200 bg-white p-3.5 rounded-[4px] shadow-2xs space-y-3">
                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Controles de selección e inputs
                    </h2>

                    <div className="space-y-3">
                        <div className="flex flex-col gap-1 text-left">
                            <label className="text-xs text-slate-700 font-['Roboto']">Campo de texto normal</label>
                            <input
                                type="text"
                                placeholder="Escriba aquí la descripción..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-[4px] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0E5E6F]"
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                            <span className="text-xs text-slate-700 font-medium">Casillas de verificación</span>
                            <div className="flex flex-col gap-2">
                                {[
                                    { id: 'item1', label: 'Notificar por correo' },
                                    { id: 'item2', label: 'Modo automático' },
                                ].map((cb) => (
                                    <label key={cb.id} className="flex items-center gap-2 cursor-pointer">
                                        <div
                                            onClick={() => toggleCheck(cb.id as keyof typeof checkedItems)}
                                            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${checkedItems[cb.id as keyof typeof checkedItems]
                                                    ? 'border-[#0E5E6F] bg-[#0E5E6F] text-white'
                                                    : 'border-slate-300 bg-slate-50'
                                                }`}
                                        >
                                            {checkedItems[cb.id as keyof typeof checkedItems] && <Check size={12} strokeWidth={3} />}
                                        </div>
                                        <span className="text-xs text-slate-700">{cb.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Radio Buttons */}
                        <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                            <span className="text-xs text-slate-700 font-medium">Botones de opción</span>
                            <div className="flex flex-wrap items-center gap-3">
                                {[
                                    { id: 'opcion1', label: 'Opción 01' },
                                    { id: 'opcion2', label: 'Opción 02' },
                                    { id: 'opcion3', label: 'Opción 03' },
                                ].map((radio) => (
                                    <label key={radio.id} className="flex items-center gap-1.5 cursor-pointer">
                                        <div
                                            onClick={() => setRadioVal(radio.id)}
                                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${radioVal === radio.id ? 'border-[#0E5E6F] bg-[#0E5E6F]' : 'border-slate-300 bg-slate-50'
                                                }`}
                                        >
                                            {radioVal === radio.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-xs text-slate-700">{radio.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: PESTAÑAS Y MARCA */}
                <div className="border border-slate-200 bg-white p-3.5 rounded-[4px] shadow-2xs space-y-3">
                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Pestañas de navegación e identidad
                    </h2>

                    {/* Tabs con scroll horizontal limpio */}
                    <div className="flex border-b border-slate-200 pb-1 gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {["Pestaña activa", "Configuración", "Historial"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-xs font-normal pb-1 transition-all relative shrink-0 ${activeTab === tab ? 'text-[#0E5E6F] font-medium' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-[#0E5E6F]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tarjeta de Identidad BIODRONE */}
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-[4px] flex items-center justify-between">
                        <div>
                            <span className="text-[9px] font-bold text-[#0E5E6F] uppercase">Identidad de marca</span>
                            <h3 className="text-sm font-bold text-slate-900 tracking-wider">BIODRONE</h3>
                        </div>
                        <span className="text-[9px] font-mono bg-slate-200 px-2 py-0.5 rounded-[4px] text-slate-600">
                            Font: Roboto
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};