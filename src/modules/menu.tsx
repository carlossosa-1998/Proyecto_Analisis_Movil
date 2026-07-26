import React, { useState } from 'react';
import { Bell, Check, ChevronDown, Home, Sliders, Tag, Trash2, X } from 'lucide-react';

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
// Kit UI
export const KitUiView = () => {
    // Estados para interacción en la vista
    const [activeTab, setActiveTab] = useState("Pestaña activa");
    const [radioVal, setRadioVal] = useState("opcion2");
    const [checkedItems, setCheckedItems] = useState({ item1: true, item2: false });

    const toggleCheck = (key: keyof typeof checkedItems) => {
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col h-full bg-[#F8FAFC] text-slate-800 font-['Roboto'] p-6 overflow-y-auto select-none gap-6">

            {/* Encabezado del showcase */}
            <div className="pb-4 border-b border-slate-200 flex flex-col gap-1">
                {/* Subtítulo: Size 4 (12px), Sentence Case */}
                <span className="text-[#0E5E6F] text-xs font-bold tracking-wider font-['Roboto']">
                    Sistema de diseño • BIODRONE
                </span>

                {/* Título H1: Sentence Case */}
                <h1 className="text-2xl font-bold text-slate-900 font-['Roboto'] tracking-tight">
                    Kit de componentes UI
                </h1>

                {/* Texto general: Size 5 (16px), Sentence Case */}
                <p className="text-base text-slate-500 mt-1">
                    Guía visual y especificaciones técnicas para componentes, etiquetas y botones de la plataforma BIODRONE.
                </p>
            </div>

            {/* SECCIÓN 1: BOTONES Y BOTONES DE SOLO ICONO */}
            <div className="border border-slate-200 bg-white p-5 rounded-[4px] shadow-2xs space-y-5">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                    Botones y acciones
                </h2>

                {/* Botones Estándar */}
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Primario */}
                    <div className="flex flex-col gap-1">
                        <button className="bg-[#0E5E6F] hover:bg-[#0B4B58] text-white px-4 py-2.5 rounded-[4px] text-base font-normal transition-all shadow-sm">
                            Botón primario
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">#0E5E6F | 16px | 4px radius</span>
                    </div>

                    {/* Secundario */}
                    <div className="flex flex-col gap-1">
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-[4px] text-base font-normal transition-all">
                            Botón secundario
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">#F1F5F9 | 16px</span>
                    </div>

                    {/* Delineado Standard */}
                    <div className="flex flex-col gap-1">
                        <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-[4px] text-base font-normal transition-all">
                            Delineado
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">Border #E2E8F0</span>
                    </div>

                    {/* Eliminar (Cardinal Red #B8001F) */}
                    <div className="flex flex-col gap-1">
                        <button className="border border-[#B8001F] text-[#B8001F] hover:bg-[#B8001F]/10 px-4 py-2.5 rounded-[4px] text-base font-normal flex items-center gap-2 transition-all">
                            <Trash2 size={16} />
                            <span>Eliminar registro</span>
                        </button>
                        <span className="text-[10px] font-mono text-slate-400">Cardinal red #B8001F</span>
                    </div>
                </div>

                {/* Botones de Solo Icono */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Botones de solo icono</span>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Icono Primario */}
                        <div className="flex flex-col items-center gap-1">
                            <button className="w-10 h-10 bg-[#0E5E6F] hover:bg-[#0B4B58] text-white rounded-[4px] flex items-center justify-center transition-all shadow-2xs">
                                <Home size={18} />
                            </button>
                            <span className="text-[10px] font-mono text-slate-400">Primario</span>
                        </div>

                        {/* Icono Secundario */}
                        <div className="flex flex-col items-center gap-1">
                            <button className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-[4px] flex items-center justify-center transition-all">
                                <Bell size={18} />
                            </button>
                            <span className="text-[10px] font-mono text-slate-400">Secundario</span>
                        </div>

                        {/* Icono Delineado */}
                        <div className="flex flex-col items-center gap-1">
                            <button className="w-10 h-10 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-[4px] flex items-center justify-center transition-all">
                                <Sliders size={18} />
                            </button>
                            <span className="text-[10px] font-mono text-slate-400">Delineado</span>
                        </div>

                        {/* Icono Eliminar */}
                        <div className="flex flex-col items-center gap-1">
                            <button className="w-10 h-10 border border-[#B8001F] text-[#B8001F] hover:bg-[#B8001F]/10 rounded-[4px] flex items-center justify-center transition-all">
                                <Trash2 size={18} />
                            </button>
                            <span className="text-[10px] font-mono text-slate-400">Eliminar</span>
                        </div>
                    </div>
                </div>

                {/* Menús desplegables */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500">Menús desplegables</span>
                    <div className="w-full border border-[#0E5E6F] bg-[#0E5E6F] text-white px-4 py-2.5 rounded-[4px] flex items-center justify-between text-base font-normal shadow-sm">
                        <span>Opción activa</span>
                        <ChevronDown size={18} />
                    </div>
                    <div className="w-full border border-slate-200 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-[4px] flex items-center justify-between text-base font-normal">
                        <span>Opción normal</span>
                        <ChevronDown size={18} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* SECCIÓN 2: TAG CARDS Y ETIQUETAS POR ESTADO */}
                <div className="border border-slate-200 bg-white p-5 rounded-[4px] shadow-2xs space-y-4">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Etiquetas y estados
                    </h2>

                    <div className="flex flex-col gap-3">
                        {/* Abortado (#B8001F) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B8001F]/10 border border-[#B8001F]/30 text-[#B8001F] rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-[#B8001F]" />
                                Abortado
                            </span>
                            <span className="text-xs font-mono text-slate-400">#B8001F</span>
                        </div>

                        {/* Inactivo (Amber 100) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                Inactivo
                            </span>
                            <span className="text-xs font-mono text-slate-400">#FEF3C7 (Amber 100)</span>
                        </div>

                        {/* Activo (Emerald 100) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Activo
                            </span>
                            <span className="text-xs font-mono text-slate-400">#D1FAE5 (Emerald 100)</span>
                        </div>

                        {/* En Operación (Blue 100) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 border border-blue-300 text-blue-900 rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                En operación
                            </span>
                            <span className="text-xs font-mono text-slate-400">#DBEAFE (Blue 100)</span>
                        </div>

                        {/* En Mantenimiento (Orange 100) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 border border-orange-300 text-orange-900 rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-orange-500" />
                                En mantenimiento
                            </span>
                            <span className="text-xs font-mono text-slate-400">#FFEDD5 (Orange 100)</span>
                        </div>

                        {/* Disponible (Purple 100) */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 border border-purple-300 text-purple-900 rounded-[4px] text-base font-normal">
                                <span className="w-2 h-2 rounded-full bg-purple-500" />
                                Disponible
                            </span>
                            <span className="text-xs font-mono text-slate-400">#F3E8FF (Purple 100)</span>
                        </div>
                    </div>

                    {/* Tag Cards Removibles */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                        {[
                            { text: 'Unidad Alpha-01', status: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
                            { text: 'Misión sector norte', status: 'bg-blue-100 text-blue-900 border-blue-300' },
                            { text: 'Batería crítica', status: 'bg-[#B8001F]/10 text-[#B8001F] border-[#B8001F]/30' },
                        ].map((tag, i) => (
                            <div
                                key={i}
                                className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded-[4px] text-base font-normal ${tag.status}`}
                            >
                                <Tag size={14} />
                                <span>{tag.text}</span>
                                <button className="hover:opacity-70 ml-1">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECCIÓN 3: FORMULARIOS, CHECKBOXES & RADIOS */}
                <div className="border border-slate-200 bg-white p-5 rounded-[4px] shadow-2xs space-y-4">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Controles de selección e inputs
                    </h2>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1 text-left">
                            <label className="text-base text-slate-700 font-['Roboto']">Campo de texto normal</label>
                            <input
                                type="text"
                                placeholder="Escriba aquí la descripción..."
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-[4px] text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0E5E6F]"
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                            <span className="text-base text-slate-700 font-medium">Casillas de verificación</span>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { id: 'item1', label: 'Notificar por correo' },
                                    { id: 'item2', label: 'Modo automático' },
                                ].map((cb) => (
                                    <label key={cb.id} className="flex items-center gap-2 cursor-pointer">
                                        <div
                                            onClick={() => toggleCheck(cb.id as keyof typeof checkedItems)}
                                            className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all ${checkedItems[cb.id as keyof typeof checkedItems]
                                                    ? 'border-[#0E5E6F] bg-[#0E5E6F] text-white'
                                                    : 'border-slate-300 bg-slate-50'
                                                }`}
                                        >
                                            {checkedItems[cb.id as keyof typeof checkedItems] && <Check size={14} strokeWidth={3} />}
                                        </div>
                                        <span className="text-base text-slate-700">{cb.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Radio Buttons */}
                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                            <span className="text-base text-slate-700 font-medium">Botones de opción (Radio buttons)</span>
                            <div className="flex flex-wrap items-center gap-4">
                                {[
                                    { id: 'opcion1', label: 'Opción 01' },
                                    { id: 'opcion2', label: 'Opción 02' },
                                    { id: 'opcion3', label: 'Opción 03' },
                                ].map((radio) => (
                                    <label key={radio.id} className="flex items-center gap-2 cursor-pointer">
                                        <div
                                            onClick={() => setRadioVal(radio.id)}
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${radioVal === radio.id ? 'border-[#0E5E6F] bg-[#0E5E6F]' : 'border-slate-300 bg-slate-50'
                                                }`}
                                        >
                                            {radioVal === radio.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-base text-slate-700">{radio.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: PESTAÑAS Y MARCA */}
                <div className="border border-slate-200 bg-white p-5 rounded-[4px] shadow-2xs space-y-4 md:col-span-2">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-['Roboto']">
                        Pestañas de navegación e identidad
                    </h2>

                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 pb-2 gap-6 overflow-x-auto">
                        {["Pestaña activa", "Configuración de vuelo", "Historial de registros"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-base font-normal pb-1 transition-all relative shrink-0 ${activeTab === tab ? 'text-[#0E5E6F] font-medium' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#0E5E6F]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tarjeta de Identidad BIODRONE */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-[4px] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-[#0E5E6F]">Identidad de marca</span>
                            <h3 className="text-lg font-bold text-slate-900 tracking-wider mt-0.5">BIODRONE</h3>
                        </div>
                        <span className="text-[11px] font-mono bg-slate-200 px-2.5 py-1 rounded-[4px] text-slate-600">
                            Font: Roboto | Mayúscula
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};