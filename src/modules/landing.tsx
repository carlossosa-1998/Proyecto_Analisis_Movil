import { Eye, EyeOff, Mail, Phone, Save, X, Lock, Edit2, LogOut, Settings, BarChart2, Check, CheckCircle, Layers, MapPin, ShieldCheck, ChevronLeft, Shield, Info, Truck, Navigation, Droplets, Zap, Wrench, ArrowRight } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

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

const carouselImages = [
    "src/img/piloto_perfil.png",
    "src/img/granjero_perfil.png",
    "src/img/admin_perfil.png",
];

type Role = "admin" | "piloto" | "cliente" | "tecnico" | null;

interface ProfileViewProps {
    role: Role;
    onLogout: () => void;
}


// 1. Landing page
export const LandingView = ({
    onLogin: alIniciarSesion,
    onRegister: alRegistrar,
}: {
    onLogin: () => void;
    onRegister: () => void;
}) => {
    const [pestanaPrecios, fijarPestanaPrecios] = useState<"subs" | "equipos">(
        "subs",
    );
    const [indiceImagenPrincipal, fijarIndiceImagenPrincipal] = useState(0);
    const [dronSeleccionado, fijarDronSeleccionado] = useState<any | null>(null);
    const [idTarjetaSeleccionada, fijarIdTarjetaSeleccionada] = useState<
        string | null
    >(null);
    const [indiceImagenApp, fijarIndiceImagenApp] = useState(0);
    const [menuAbierto, fijarMenuAbierto] = useState(false);

    // Referencias y estado para el scroll de los carruseles (funciona con touch de forma nativa
    // y también permite arrastrar con mouse cuando se previsualiza en escritorio)
    const refServicios = useRef<HTMLDivElement | null>(null);
    const refDrones = useRef<HTMLDivElement | null>(null);
    const estadoArrastre = useRef({
        activado: false,
        xInicial: 0,
        scrollInicial: 0,
    });

    const manejarInicioArrastre = (
        e: React.MouseEvent,
        ref: React.RefObject<HTMLDivElement | null>,
    ) => {
        if (!ref.current) return;
        estadoArrastre.current.activado = true;
        estadoArrastre.current.xInicial = e.pageX - ref.current.offsetLeft;
        estadoArrastre.current.scrollInicial = ref.current.scrollLeft;
    };

    const manejarFinArrastre = () => {
        estadoArrastre.current.activado = false;
    };

    const manejarArrastre = (
        e: React.MouseEvent,
        ref: React.RefObject<HTMLDivElement | null>,
    ) => {
        if (!estadoArrastre.current.activado || !ref.current) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const desplazamiento = (x - estadoArrastre.current.xInicial) * 2; // Factor de velocidad
        ref.current.scrollLeft =
            estadoArrastre.current.scrollInicial - desplazamiento;
    };

    const imagenesCarruselPrincipal = [
        {
            src: "src/img/busqueda.png",
            titulo: "Búsqueda y Monitoreo",
            descripcion: "Identificación térmica de anomalías en el terreno.",
        },
        {
            src: "src/img/riego.png",
            titulo: "Riego Automatizado",
            descripcion: "Gestión hídrica guiada por mapas multiespectrales.",
        },
        {
            src: "src/img/pesticidas.png",
            titulo: "Aplicación de Insumos",
            descripcion: "Aspersión inteligente y focalizada contra plagas.",
        },
        {
            src: "src/img/transporte.png",
            titulo: "Logística de Carga",
            descripcion: "Movilización autónoma de muestras y herramientas.",
        },
    ];

    const imagenesAppMovil = [
        {
            src: "src/img/celular_1.png",
            titulo: "Descarga la App",
            descripcion: "Control operativo integral desde tu teléfono móvil.",
        },
        {
            src: "src/img/celular_2.png",
            titulo: "Trazado de Rutas",
            descripcion: "Planifica mapas de vuelo de forma rápida e intuitiva.",
        },
        {
            src: "src/img/celular_3.png",
            titulo: "Monitoreo en Directo",
            descripcion: "Visualiza la telemetría y sensores en tiempo real.",
        },
    ];

    const datosServicios = [
        {
            icono: <Droplets size={20} />,
            titulo: "Fumigación y Riego",
            descripcion:
                "Despliegues autónomos calibrados milimétricamente para la aspersión uniforme de insumos.",
        },
        {
            icono: <Eye size={20} />,
            titulo: "Mapeo Multiespectral",
            descripcion:
                "Diagnóstico exhaustivo de estrés hídrico y vigor vegetal mediante procesamiento de imágenes NIR.",
        },
        {
            icono: <Truck size={20} />,
            titulo: "Logística de Carga",
            descripcion:
                "Transporte pesado totalmente autónomo de herramientas, muestras e insumos al lote.",
        },
    ];

    const datosPlanes = [
        {
            id: "plan-basico",
            nombre: "Plan Básico Agrícola",
            precio: "L 1,200",
            periodo: "/mes",
            etiqueta: "Inicial",
            descripcion:
                "Optimización y análisis base para parcelas pequeñas y productores independientes.",
            caracteristicas: [
                "2 vuelos de monitoreo mensuales.",
                "Reportes analíticos de vigor en PDF.",
                "Cobertura de hasta 10 manzanas.",
            ],
            destacado: false,
        },
        {
            id: "plan-profesional",
            nombre: "Plan Operativo Profesional",
            precio: "L 2,800",
            periodo: "/mes",
            etiqueta: "Mediano",
            descripcion:
                "Diseñado para fincas comerciales que requieren seguimiento constante y aspersión aérea.",
            caracteristicas: [
                "10 vuelos mensuales incluidos.",
                "Analítica multiespectral (NDVI / SAVI).",
                "Cobertura de hasta 50 manzanas.",
            ],
            destacado: true,
        },
        {
            id: "plan-corporativo",
            nombre: "Plan Premium Corporativo",
            precio: "L 5,500",
            periodo: "/mes",
            etiqueta: "Corporativo",
            descripcion:
                "Infraestructura total para grandes agroindustrias con despliegues autónomos diarios.",
            caracteristicas: [
                "Vuelos y fumigación ilimitados.",
                "Telemetría y soporte crítico 24/7.",
                "Procesamiento en tiempo real con IA.",
            ],
            destacado: false,
        },
    ];

    const datosDrones = [
        {
            id: "dji-flycart-30",
            nombre: "DJI FlyCart 30",
            etiqueta: "Carga Ligera",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 450,000",
            descripcion:
                "Capacidad de carga útil de 30 kg con rango operativo extendido y resistencia climática.",
            destacado: true,
            especificaciones: {
                "Capacidad de Carga": "30 kg",
                "Tiempo de Vuelo": "18 min",
                "Velocidad Máxima": "72 km/h",
                "Rango Operativo": "28 km",
                "Resistencia al Viento": "12 m/s",
                "Sistema de Navegación": "RTK Dual / GNSS",
                "Clasificación IP": "IP55",
            },
        },
        {
            id: "ehang-184",
            nombre: "Ehang 184",
            etiqueta: "Pasajeros",
            imagen: "src/img/Ehang_184.png",
            precio: "L 2,400,000",
            descripcion:
                "Vehículo aéreo autónomo eléctrico diseñado para transporte seguro de un pasajero o carga mayor.",
            destacado: false,
            especificaciones: {
                "Capacidad de Carga": "100 kg",
                "Tiempo de Vuelo": "23 min",
                "Velocidad Máxima": "100 km/h",
                "Rango Operativo": "30 km",
                "Potencia de Batería": "14.2 kWh",
                "Sistema de Seguridad": "Fail-safe redundante",
                "Control de Vuelo": "Autónomo 4G/5G",
            },
        },
        {
            id: "griff-300",
            nombre: "GRIFF Aviation 300",
            etiqueta: "Carga Pesada",
            imagen: "src/img/GRIFF_Aviation_300.png",
            precio: "L 1,850,000",
            descripcion:
                "Megadron industrial octocóptero diseñado específicamente para la elevación de insumos pesados.",
            destacado: false,
            especificaciones: {
                "Capacidad de Carga": "227 kg",
                "Tiempo de Vuelo": "31 min",
                "Velocidad Máxima": "60 km/h",
                "Rango Operativo": "15 km",
                Configuración: "Octocóptero pesado",
                Aplicación: "Industrial / Agrícola",
                Certificación: "Comercial Avanzada",
            },
        },
        {
            id: "freefly-alta-x",
            nombre: "Freefly Alta X",
            etiqueta: "Cinematografía / Carga",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 620,000",
            descripcion:
                "Con una capacidad de elevación de 15 kg, el Freefly Alta X redefine lo posible en cinematografía y captura de imágenes aéreas para inspección de cultivos.",
            destacado: false,
            especificaciones: {
                "Capacidad de Carga": "15 kg",
                "Tiempo de Vuelo": "20 min",
                "Velocidad Máxima": "95 km/h",
                "Distancia Transmisión": "5 km",
                "Diámetro Desplegado": "2273 x 877 x 387 mm",
                "Peso Vacío": "10.86 kg",
                "Temperatura Operativa": "-10° a 40°C",
            },
        },
        {
            id: "jouav-cw-80e",
            nombre: "JOUAV CW-80E",
            etiqueta: "Largo Alcance",
            imagen: "src/img/JOUAV_CW-80E.png",
            precio: "L 1,150,000",
            descripcion:
                "El CW-80E puede permanecer en vuelo más de 840 minutos a una velocidad máxima de 135 km/h, con capacidad de carga de hasta 25 kg para sensores hiperespectrales y LiDAR batimétrico.",
            destacado: false,
            especificaciones: {
                "Capacidad de Carga": "25 kg",
                "Tiempo de Vuelo": "840 min",
                "Velocidad Máxima": "135 km/h",
                "Distancia Transmisión": "100/200 km",
                Dimensiones: "Fuselaje: 3000mm, Envergadura: 5200mm",
                "Peso Máximo Despegue": "110 kg",
                "Temperatura Operativa": "-20° a 55°C",
            },
        },
    ];

    useEffect(() => {
        const temporizadorPrincipal = setInterval(() => {
            fijarIndiceImagenPrincipal(
                (prev) => (prev + 1) % imagenesCarruselPrincipal.length,
            );
        }, 5000);
        return () => clearInterval(temporizadorPrincipal);
    }, [imagenesCarruselPrincipal.length]);

    useEffect(() => {
        const temporizadorApp = setInterval(() => {
            fijarIndiceImagenApp((prev) => (prev + 1) % imagenesAppMovil.length);
        }, 5000);
        return () => clearInterval(temporizadorApp);
    }, [imagenesAppMovil.length]);

    return (
        <div className="w-full h-full bg-white flex flex-col overflow-hidden relative">
            {/* ─── NAVBAR MÓVIL ─── */}
            <nav className="sticky top-0 z-40 bg-white/95 border-b-2 border-gray-200 px-4 flex items-center justify-between h-14 w-full shrink-0 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 min-w-0">
                    <img
                        src="src/img/logo_bio_dron.png"
                        alt="BioDron Logo"
                        className="w-8 h-8 object-contain shrink-0"
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                        }}
                    />
                    <Title className="text-base font-bold text-[#0E5E6F] tracking-tight uppercase truncate">
                        BioDron
                    </Title>
                </div>

                <button
                    onClick={() => fijarMenuAbierto((prev) => !prev)}
                    aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                    className="w-9 h-9 shrink-0 flex flex-col items-center justify-center gap-[5px] rounded-[4px] border-2 border-gray-200 bg-white cursor-pointer"
                >
                    <span
                        className={`block w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200 ${menuAbierto ? "rotate-45 translate-y-[6px]" : ""}`}
                    />
                    <span
                        className={`block w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200 ${menuAbierto ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                        className={`block w-4 h-0.5 bg-gray-700 rounded-full transition-all duration-200 ${menuAbierto ? "-rotate-45 -translate-y-[6px]" : ""}`}
                    />
                </button>
            </nav>

            {/* ─── MENÚ DESPLEGABLE MÓVIL ─── */}
            {menuAbierto && (
                <div
                    className="sticky top-14 z-30 w-full bg-white border-b-2 border-gray-200 shadow-sm px-4 py-3 flex flex-col gap-1 shrink-0"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                    <a
                        href="#inicio"
                        onClick={() => fijarMenuAbierto(false)}
                        className="text-sm text-gray-600 py-2.5 border-b border-gray-100 tracking-wide"
                    >
                        Características
                    </a>
                    <a
                        href="#servicios"
                        onClick={() => fijarMenuAbierto(false)}
                        className="text-sm text-gray-600 py-2.5 border-b border-gray-100 tracking-wide"
                    >
                        Servicios
                    </a>
                    <a
                        href="#precios"
                        onClick={() => {
                            fijarPestanaPrecios("subs");
                            fijarMenuAbierto(false);
                        }}
                        className="text-sm text-gray-600 py-2.5 border-b border-gray-100 tracking-wide"
                    >
                        Suscripciones
                    </a>
                    <a
                        href="#precios"
                        onClick={() => {
                            fijarPestanaPrecios("equipos");
                            fijarMenuAbierto(false);
                        }}
                        className="text-sm text-gray-600 py-2.5 tracking-wide"
                    >
                        Equipos
                    </a>

                    <div className="flex flex-col gap-2 mt-3">
                        <WireframeButton
                            onClick={() => {
                                fijarMenuAbierto(false);
                                alIniciarSesion();
                            }}
                            className="w-full py-2.5 text-sm rounded-[4px] border-gray-300 bg-white text-gray-700"
                        >
                            Ingresar
                        </WireframeButton>
                        <WireframeButton
                            primary
                            onClick={() => {
                                fijarMenuAbierto(false);
                                alRegistrar();
                            }}
                            className="w-full py-2.5 text-sm rounded-[4px]"
                        >
                            Registrarse
                        </WireframeButton>
                    </div>
                </div>
            )}

            {/* ─── CONTENEDOR PRINCIPAL CON SCROLL ─── */}
            <div className="flex-1 w-full overflow-y-auto scroll-smooth">
                {/* SECCIÓN 1: HERO */}
                <section
                    id="inicio"
                    className="w-full px-4 flex flex-col items-center justify-center gap-6 bg-white border-b-2 border-gray-100 box-border py-8"
                >
                    <div className="w-full">
                        <div className="inline-flex items-center gap-2 bg-[#0E5E6F]/10 text-[#0E5E6F] px-3 py-1.5 rounded-[4px] mb-3 border border-[#0E5E6F]/20">
                            <Zap size={12} />
                            <Text className="text-[10px] font-black tracking-widest">
                                Plataforma líder en Honduras
                            </Text>
                        </div>
                        <Title className="text-2xl leading-[1.2] font-extrabold text-gray-900 mb-3 normal-case tracking-tight">
                            Monitoreo Agrícola Autónomo con Drones
                        </Title>
                        <Text className="text-xs text-gray-500 leading-relaxed mb-4">
                            Automatiza el riego, fumigación y transporte de carga pesada con
                            tecnología de precisión aeroespacial. Diseñado para optimizar el
                            rendimiento y la eficiencia de tus parcelas productoras.
                        </Text>
                        <div className="flex flex-col gap-2.5">
                            <WireframeButton
                                primary
                                onClick={alRegistrar}
                                className="w-full py-2.5 px-4 rounded-[4px] flex items-center justify-center gap-2 text-sm"
                            >
                                <Droplets size={16} /> Soy agricultor
                            </WireframeButton>
                            <WireframeButton
                                onClick={alRegistrar}
                                className="w-full py-2.5 px-4 rounded-[4px] flex items-center justify-center gap-2 bg-white border-[#0E5E6F] text-[#0E5E6F] text-sm"
                            >
                                <Navigation size={16} /> Soy piloto
                            </WireframeButton>
                        </div>
                    </div>

                    <div className="w-full relative">
                        <div className="relative h-48 w-full overflow-hidden rounded-[4px] bg-gray-900 shadow-md">
                            <img
                                src={imagenesCarruselPrincipal[indiceImagenPrincipal].src}
                                alt={imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                                className="w-full h-full object-cover opacity-80 transition-all duration-500"
                                onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                }}
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                                <span className="text-[9px] font-bold text-[#0E5E6F] tracking-widest bg-white/90 px-2 py-0.5 rounded-[4px] w-max mb-1">
                                    Vista aérea activa
                                </span>
                                <Title
                                    as="h3"
                                    className="text-sm font-bold text-white normal-case"
                                >
                                    {imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                                </Title>
                                <Text className="text-[10px] text-gray-300 mt-0.5">
                                    {imagenesCarruselPrincipal[indiceImagenPrincipal].descripcion}
                                </Text>
                            </div>
                        </div>
                        <div className="flex justify-center gap-1.5 mt-3">
                            {imagenesCarruselPrincipal.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => fijarIndiceImagenPrincipal(idx)}
                                    className={`h-1.5 rounded-[4px] transition-all border-0 cursor-pointer ${idx === indiceImagenPrincipal ? "w-6 bg-[#0E5E6F]" : "w-1.5 bg-gray-300"}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: SERVICIOS CON GALERÍA Y CARRUSEL */}
                <section
                    id="servicios"
                    className="w-full px-4 bg-gray-50 border-b-2 border-gray-200 flex flex-col justify-center box-border py-8"
                >
                    <div className="w-full">
                        <div className="w-full text-center mb-6">
                            <Title className="text-lg font-bold text-gray-900 mb-1 normal-case tracking-tight">
                                Servicios de la Plataforma
                            </Title>
                            <Text className="text-gray-500 text-[11px] max-w-xs mx-auto">
                                Pilares de infraestructura tecnológica dedicados a la
                                agricultura de precisión.
                            </Text>
                        </div>

                        <div className="flex flex-col gap-7 items-stretch w-full">
                            {/* Carrusel App Móvil */}
                            <div className="w-full relative h-[200px]">
                                <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-gray-900 shadow-md">
                                    <img
                                        src={imagenesAppMovil[indiceImagenApp].src}
                                        alt={imagenesAppMovil[indiceImagenApp].titulo}
                                        className="w-full h-full object-cover opacity-80 transition-all duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = "none";
                                        }}
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                                        <span className="text-[9px] font-bold text-[#0E5E6F] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded-[4px] w-max mb-1">
                                            App Móvil
                                        </span>
                                        <Title
                                            as="h3"
                                            className="text-sm font-bold text-white normal-case"
                                        >
                                            {imagenesAppMovil[indiceImagenApp].titulo}
                                        </Title>
                                        <Text className="text-[10px] text-gray-300 mt-0.5">
                                            {imagenesAppMovil[indiceImagenApp].descripcion}
                                        </Text>
                                    </div>
                                </div>
                                <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-1.5">
                                    {imagenesAppMovil.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => fijarIndiceImagenApp(idx)}
                                            className={`h-1.5 rounded-[4px] transition-all border-0 cursor-pointer ${idx === indiceImagenApp ? "w-6 bg-[#0E5E6F]" : "w-1.5 bg-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Galería de Servicios (carrusel horizontal, deslizable con el dedo) */}
                            <div className="w-full relative h-[190px] mt-2">
                                <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                                <div
                                    ref={refServicios}
                                    onMouseDown={(e) => manejarInicioArrastre(e, refServicios)}
                                    onMouseLeave={manejarFinArrastre}
                                    onMouseUp={manejarFinArrastre}
                                    onMouseMove={(e) => manejarArrastre(e, refServicios)}
                                    className="flex gap-3 w-full h-full overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1"
                                >
                                    {datosServicios.map((servicio) => (
                                        <div
                                            key={servicio.titulo}
                                            className="min-w-[210px] w-[210px] h-full shrink-0 snap-center bg-white border-2 border-gray-200 rounded-[4px] p-4 group hover:border-[#0E5E6F] transition-all shadow-sm flex flex-col items-start justify-center"
                                        >
                                            <div className="w-10 h-10 bg-gray-100 rounded-[4px] flex items-center justify-center mb-3 text-[#0E5E6F] group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-[#0E5E6F]">
                                                {servicio.icono}
                                            </div>
                                            <Title
                                                as="h3"
                                                className="text-xs font-bold mb-1.5 text-gray-900 normal-case"
                                            >
                                                {servicio.titulo}
                                            </Title>
                                            <Text className="text-[10px] text-gray-600 leading-relaxed">
                                                {servicio.descripcion}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 3: PRECIOS Y EQUIPOS */}
                <section
                    id="precios"
                    className="w-full bg-white box-border pt-6 pb-10 border-b-2 border-gray-100"
                >
                    <div className="w-full px-4">
                        <div className="mb-4 text-center">
                            <Title className="text-lg font-bold text-center text-gray-900 mb-1 normal-case tracking-tight">
                                Modelos de Inversión Tecnológica
                            </Title>
                            <Text className="text-center text-gray-500 text-[11px]">
                                Elige el plan operativo mensual o adquiere drones comerciales de
                                alto tonelaje.
                            </Text>
                        </div>

                        <div className="flex justify-center mb-4">
                            <div
                                className="flex bg-gray-100 p-1 rounded-[4px] border-2 border-gray-200 gap-1 w-full"
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                            >
                                <button
                                    onClick={() => {
                                        fijarPestanaPrecios("subs");
                                        fijarIdTarjetaSeleccionada(null);
                                    }}
                                    className={`flex-1 px-2 py-2 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "subs" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Suscripciones
                                </button>
                                <button
                                    onClick={() => {
                                        fijarPestanaPrecios("equipos");
                                        fijarIdTarjetaSeleccionada(null);
                                    }}
                                    className={`flex-1 px-2 py-2 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "equipos" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Equipos
                                </button>
                            </div>
                        </div>

                        <div className="w-full relative">
                            {pestanaPrecios === "subs" ? (
                                <div className="grid grid-cols-1 gap-4 w-full items-stretch">
                                    {datosPlanes.map((plan) => {
                                        const estaSeleccionado =
                                            idTarjetaSeleccionada === plan.id ||
                                            (plan.destacado && !idTarjetaSeleccionada);

                                        return (
                                            <div
                                                key={plan.id}
                                                onClick={() => fijarIdTarjetaSeleccionada(plan.id)}
                                                className={`border-2 rounded-[4px] p-4 flex flex-col justify-between bg-white cursor-pointer transition-all duration-200 relative ${estaSeleccionado
                                                    ? "border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {plan.destacado && (
                                                    <div
                                                        className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-[4px]"
                                                        style={{
                                                            fontFamily: "'Instrument Sans', sans-serif",
                                                        }}
                                                    >
                                                        Destacado
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="flex justify-between items-start gap-2 mb-1">
                                                        <Title
                                                            as="h3"
                                                            className={`text-sm font-bold normal-case truncate ${estaSeleccionado ? "text-[#0E5E6F]" : "text-gray-900"}`}
                                                        >
                                                            {plan.nombre}
                                                        </Title>
                                                        <span className="bg-gray-100 text-gray-700 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] border border-gray-200 shrink-0">
                                                            {plan.etiqueta}
                                                        </span>
                                                    </div>

                                                    <div className="mb-1.5">
                                                        <span
                                                            className="font-black text-xl text-gray-900"
                                                            style={{
                                                                fontFamily: "'Roboto', sans-serif",
                                                            }}
                                                        >
                                                            {plan.precio}
                                                        </span>
                                                        <span className="text-gray-400 text-[10px] ml-0.5">
                                                            {plan.periodo}
                                                        </span>
                                                    </div>

                                                    <Text className="text-[11px] text-gray-500 leading-snug mb-2.5 pb-2 border-b border-gray-100">
                                                        {plan.descripcion}
                                                    </Text>

                                                    <ul className="space-y-1.5">
                                                        {plan.caracteristicas.map((caracteristica) => (
                                                            <li
                                                                key={caracteristica}
                                                                className="flex items-center gap-1.5"
                                                            >
                                                                <CheckCircle
                                                                    size={11}
                                                                    className={
                                                                        estaSeleccionado
                                                                            ? "text-gray-800"
                                                                            : "text-gray-400"
                                                                    }
                                                                />
                                                                <Text className="text-[11px] text-gray-600">
                                                                    {caracteristica}
                                                                </Text>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-3 mt-3 border-t border-gray-100">
                                                    <WireframeButton
                                                        primary={estaSeleccionado}
                                                        onClick={(e: any) => {
                                                            e.stopPropagation();
                                                            alRegistrar();
                                                        }}
                                                        className="w-full fond-bold rounded-[4px] text-xs py-2"
                                                    >
                                                        Adquirir plan
                                                    </WireframeButton>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* CONTENEDOR HORIZONTAL DE EQUIPOS */
                                <div className="relative">
                                    <div className="absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                                    <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                                    <div
                                        ref={refDrones}
                                        onMouseDown={(e) => manejarInicioArrastre(e, refDrones)}
                                        onMouseLeave={manejarFinArrastre}
                                        onMouseUp={manejarFinArrastre}
                                        onMouseMove={(e) => manejarArrastre(e, refDrones)}
                                        className="flex gap-3 w-full overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1"
                                    >
                                        {datosDrones.map((dron) => {
                                            const estaSeleccionado =
                                                idTarjetaSeleccionada === dron.id ||
                                                (dron.destacado && !idTarjetaSeleccionada);

                                            return (
                                                <div
                                                    key={dron.id}
                                                    onClick={() => fijarIdTarjetaSeleccionada(dron.id)}
                                                    className={`min-w-[235px] w-[235px] shrink-0 snap-center border-2 rounded-[4px] overflow-hidden bg-white flex flex-col h-[280px] justify-between transition-all duration-200 relative ${estaSeleccionado
                                                        ? "border-[#0E5E6F] shadow-sm ring-2 ring-[#0E5E6F]/5"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {dron.destacado && (
                                                        <div
                                                            className="absolute top-1.5 left-1.5 z-20 bg-[#0E5E6F] text-white text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-[4px] shadow-sm"
                                                            style={{
                                                                fontFamily: "'Instrument Sans', sans-serif",
                                                            }}
                                                        >
                                                            Destacado
                                                        </div>
                                                    )}

                                                    <div className="h-24 w-full bg-gray-50 border-b border-gray-100 relative shrink-0 pointer-events-none">
                                                        <img
                                                            src={dron.imagen}
                                                            alt={dron.nombre}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLElement).style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                fijarDronSeleccionado(dron);
                                                            }}
                                                            className="absolute top-1.5 right-1.5 z-30 flex items-center justify-center w-7 h-7 rounded-[4px] bg-white/90 backdrop-blur-md border border-gray-200 text-gray-600 hover:text-[#0E5E6F] hover:bg-white shadow-sm transition-all border-0 cursor-pointer pointer-events-auto"
                                                            title="Ver información detallada"
                                                        >
                                                            <Info size={13} />
                                                        </button>
                                                    </div>

                                                    <div className="p-3 flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-center mb-0.5">
                                                                <Title
                                                                    as="h3"
                                                                    className={`text-xs font-bold normal-case truncate max-w-[70%] ${estaSeleccionado ? "text-[#0E5E6F]" : "text-gray-900"}`}
                                                                >
                                                                    {dron.nombre}
                                                                </Title>
                                                                <span className="bg-gray-100 text-gray-600 text-[7px] font-bold tracking-wide px-1 py-0.5 rounded-[4px] border border-gray-200 shrink-0">
                                                                    {dron.etiqueta}
                                                                </span>
                                                            </div>

                                                            <div className="mb-1">
                                                                <span
                                                                    className="font-black text-base text-gray-900"
                                                                    style={{
                                                                        fontFamily: "'Lexend Deca', sans-serif",
                                                                    }}
                                                                >
                                                                    {dron.precio}
                                                                </span>
                                                            </div>

                                                            <Text className="text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2">
                                                                {dron.descripcion}
                                                            </Text>

                                                            <div className="flex flex-wrap gap-1 py-1 border-t border-gray-100">
                                                                <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded-[4px] font-medium">
                                                                    Cap:{" "}
                                                                    {dron.especificaciones["Capacidad de Carga"]}
                                                                </span>
                                                                <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[8px] px-1 py-0.5 rounded-[4px] font-medium">
                                                                    Aut:{" "}
                                                                    {dron.especificaciones["Tiempo de Vuelo"]}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="pt-2 border-t border-gray-100">
                                                            <WireframeButton
                                                                primary={estaSeleccionado}
                                                                onClick={(e: any) => {
                                                                    e.stopPropagation();
                                                                    alRegistrar();
                                                                }}
                                                                className="w-full fond-bol rounded-[4px] text-[10px] py-1.5 pointer-events-auto"
                                                            >
                                                                Cotizar equipo
                                                            </WireframeButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── MODAL TIPO HOJA INFERIOR (BOTTOM SHEET) ─── */}
            {dronSeleccionado && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white border-t-2 border-gray-200 w-full rounded-t-[14px] p-4 shadow-2xl relative max-h-[88%] overflow-y-auto">
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

                        <div className="flex justify-between items-start border-b border-gray-200 pb-2 mb-3">
                            <div className="min-w-0 pr-2">
                                <span className="text-[9px] bg-[#0E5E6F]/10 text-[#0E5E6F] font-black uppercase tracking-widest px-2 py-0.5 rounded-[4px] mb-0.5 inline-block">
                                    {dronSeleccionado.etiqueta}
                                </span>
                                <Title
                                    as="h3"
                                    className="text-base font-bold text-gray-900 normal-case truncate"
                                >
                                    {dronSeleccionado.nombre}
                                </Title>
                            </div>
                            <button
                                onClick={() => fijarDronSeleccionado(null)}
                                className="w-7 h-7 shrink-0 flex items-center justify-center rounded-[4px] bg-gray-100 text-gray-500 hover:text-gray-900 font-bold text-xs bg-transparent border-0 cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-full h-36 bg-gray-100 rounded-[4px] overflow-hidden border border-gray-200 relative shadow-sm">
                                    <img
                                        src={dronSeleccionado.imagen}
                                        alt={dronSeleccionado.nombre}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = "none";
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-2 right-2 bg-gray-900/90 backdrop-blur-md text-white font-black text-xs px-2.5 py-1 rounded-[4px] shadow-md"
                                        style={{ fontFamily: "'Lexend Deca', sans-serif" }}
                                    >
                                        {dronSeleccionado.precio}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-gray-700 block mb-0.5">
                                        Descripción del Equipo:
                                    </span>
                                    <Text className="text-[10px] text-gray-600 leading-snug bg-gray-50 p-2.5 rounded-[4px] border border-gray-100">
                                        {dronSeleccionado.descripcion}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-700 block mb-1">
                                        Especificaciones Técnicas Completas:
                                    </span>
                                    <div className="border border-gray-200 rounded-[4px] overflow-hidden text-[10px]">
                                        {Object.entries(dronSeleccionado.especificaciones).map(
                                            ([clave, valor]: any, indice) => (
                                                <div
                                                    key={clave}
                                                    className={`flex justify-between py-1.5 px-2.5 ${indice % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-100 last:border-b-0`}
                                                >
                                                    <span className="text-gray-500 font-medium">
                                                        {clave}
                                                    </span>
                                                    <span className="font-bold text-gray-900">
                                                        {valor}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-3">
                                    <WireframeButton
                                        primary
                                        onClick={() => {
                                            fijarDronSeleccionado(null);
                                            alRegistrar();
                                        }}
                                        className="w-full py-2.5 text-xs rounded-[4px]"
                                    >
                                        Cotizar Equipo
                                    </WireframeButton>
                                    <WireframeButton
                                        onClick={() => fijarDronSeleccionado(null)}
                                        className="w-full py-2.5 text-xs rounded-[4px] bg-white text-gray-700 border-gray-300"
                                    >
                                        Cerrar
                                    </WireframeButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 2. Inicio de sesion y registro
type AuthStep = "login" | "register" | "recover" | "verify" | "success";
export const AuthView = ({
    initialTab = "login",
    onLogin,
    onRegister,
    onBack,
}: {
    initialTab?: "login" | "register";
    onLogin: (r: Role) => void;
    onRegister: () => void;
    onBack: () => void;
}) => {
    const [selectedRole, setSelectedRole] = useState<Role>("cliente");
    const [step, setStep] = useState<AuthStep>(initialTab);
    const [regSubStep, setRegSubStep] = useState<1 | 2 | 3>(1);

    const [recoverMethod, setRecoverMethod] = useState<"email" | "phone">(
        "email",
    );

    // Estado para el carrusel de imágenes
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Visibilidad de contraseñas
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false);

    // Cuadros de código
    const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);

    // Efecto para la rotación automática del carrusel (cambio cada 4 segundos)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        setStep(initialTab);
        setRegSubStep(1);
    }, [initialTab]);

    const roles: {
        key: Role;
        label: string;
        icon: React.ReactNode;
    }[] = [
        { key: "cliente", label: "Cliente", icon: <Layers size={13} /> },
        { key: "piloto", label: "Piloto", icon: <Navigation size={13} /> },
        { key: "tecnico", label: "Técnico", icon: <Wrench size={13} /> },
        { key: "admin", label: "Admin", icon: <Shield size={13} /> },
    ];

    const handleDigitChange = (value: string, index: number) => {
        const nextDigits = [...codeDigits];
        nextDigits[index] = value.slice(-1);
        setCodeDigits(nextDigits);

        if (value && index < 5) {
            const nextInput = document.getElementById(`digit-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
            const prevInput = document.getElementById(`digit-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSuccessFinish = () => {
        setCodeDigits(["", "", "", "", "", ""]);
        setStep("login");
        setRegSubStep(1);
        if (onRegister) onRegister();
    };

    return (
        <div
            key="auth-card-root"
            className="w-full h-full bg-white antialiased select-none flex flex-col overflow-hidden relative"
        >
            {/* ENCABEZADO STICKY */}
            {step !== "success" && (
                <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur border-b-2 border-gray-200 px-4 py-3 flex items-center justify-between gap-2 shrink-0">
                    <div className="min-w-0">
                        <Title className="text-sm text-[#0E5E6F] font-black tracking-tight mb-0">
                            BIODRON
                        </Title>
                        <Text className="text-[9px] text-gray-500 font-bold tracking-wide block">
                            Acceso al sistema
                        </Text>
                    </div>

                    {(step === "login" || step === "register") && (
                        <div
                            className="flex bg-gray-200/70 p-0.5 rounded-[4px] border border-gray-300 gap-0.5 shrink-0 shadow-inner"
                            style={{ fontFamily: "'Roboto', sans-serif" }}
                        >
                            <button
                                onClick={() => {
                                    setStep("login");
                                    setRegSubStep(1);
                                }}
                                className={`flex-1 px-3 py-1 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${
                                    step === "login"
                                        ? "bg-[#0E5E6F] text-white shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 bg-transparent"
                                }`}
                            >
                                Ingresar
                            </button>
                            <button
                                onClick={() => {
                                    setStep("register");
                                    setRegSubStep(1);
                                }}
                                className={`flex-1 px-3 py-1 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${
                                    step === "register"
                                        ? "bg-[#0E5E6F] text-white shadow-sm"
                                        : "text-gray-600 hover:text-gray-900 bg-transparent"
                                }`}
                            >
                                Registrar
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* BANNER COMPACTO DE CARRUSEL (solo en login/registro) */}
            {(step === "login" || step === "register") && (
                <div className="relative w-full h-24 shrink-0 overflow-hidden bg-gray-900">
                    {carouselImages.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt={`Imagen BioDron ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex ? "opacity-100 z-0" : "opacity-0 z-0"
                            }`}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white z-10 pointer-events-none">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#0E5E6F] bg-white px-1.5 py-0.5 rounded-[4px] w-fit mb-0.5 shadow-sm">
                            BIODRON
                        </span>
                        <p className="text-[9px] text-gray-200 font-medium leading-snug">
                            Plataforma de gestión e infraestructura de vuelo autónomo.
                        </p>
                    </div>
                </div>
            )}

            {/* CUERPO CENTRAL CON SCROLL */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-center items-center">

                {/* INICIAR SESIÓN */}
                {step === "login" && (
                    <div className="w-full max-w-[320px] mx-auto space-y-3 animate-in fade-in duration-150">
                        <div>
                            <label className="text-[10px] font-bold text-gray-500 tracking-wider block mb-1 text-left">
                                1. Rol operativo
                            </label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {roles.map((r) => (
                                    <button
                                        key={r.key}
                                        type="button"
                                        onClick={() => setSelectedRole(r.key)}
                                        className={`flex items-center gap-1.5 p-1.5 rounded-[4px] border-2 text-left transition-all bg-white cursor-pointer ${
                                            selectedRole === r.key
                                                ? "border-[#0E5E6F] bg-[#0E5E6F]/5"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div
                                            className={`p-1 rounded-[4px] border shrink-0 ${
                                                selectedRole === r.key
                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                    : "bg-gray-100 text-gray-500 border-gray-200"
                                            }`}
                                        >
                                            {r.icon}
                                        </div>
                                        <Text className="font-bold text-[11px] truncate">
                                            {r.label}
                                        </Text>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block text-left">
                                2. Credenciales
                            </label>
                            <WireframeInput
                                label="Correo electrónico"
                                placeholder="usuario@ejemplo.hn"
                            />
                            <div className="relative">
                                <WireframeInput
                                    label="Contraseña"
                                    type={mostrarPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    className="absolute right-2 bottom-1.5 flex items-center justify-center text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-1"
                                >
                                    {mostrarPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 rounded-[4px] border-gray-300 accent-[#0E5E6F]"
                                />
                                <span className="text-gray-600 text-[11px]">Recordarme</span>
                            </label>
                            <button
                                onClick={() => setStep("recover")}
                                className="text-[#0E5E6F] font-bold text-[11px] hover:underline bg-transparent border-0 cursor-pointer"
                            >
                                Recuperar clave
                            </button>
                        </div>
                    </div>
                )}

                {/* REGISTRO PASO 1, PASO 2 Y PASO 3 */}
                {step === "register" && (
                    <div className="w-full max-w-[320px] mx-auto space-y-2.5 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-1.5 h-[28px]">
                            <span className="text-xs font-bold text-gray-700">
                                {regSubStep === 1 && "Paso 1: Credenciales"}
                                {regSubStep === 2 && "Paso 2: Datos de perfil"}
                                {regSubStep === 3 && "Paso 3: Método de verificación"}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold">
                                Paso {regSubStep} de 3
                            </span>
                        </div>

                        {/* PASO 1 */}
                        {regSubStep === 1 && (
                            <div className="space-y-1.5">
                                <WireframeInput
                                    label="Correo electrónico"
                                    placeholder="usuario@ejemplo.hn"
                                />

                                <div className="relative">
                                    <WireframeInput
                                        label="Contraseña"
                                        type={mostrarPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        className="absolute right-2 bottom-1.5 flex items-center justify-center text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-1"
                                    >
                                        {mostrarPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <WireframeInput
                                        label="Confirmar contraseña"
                                        type={mostrarConfirmarPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMostrarConfirmarPassword(!mostrarConfirmarPassword)
                                        }
                                        className="absolute right-2 bottom-1.5 flex items-center justify-center text-gray-400 hover:text-gray-600 border-0 bg-transparent cursor-pointer p-1"
                                    >
                                        {mostrarConfirmarPassword ? (
                                            <EyeOff size={14} />
                                        ) : (
                                            <Eye size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 2 */}
                        {regSubStep === 2 && (
                            <div className="space-y-2">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 tracking-wider block mb-1 text-left">
                                        Selecciona tu rol
                                    </label>
                                    <div className="grid grid-cols-2 gap-1 bg-gray-100 p-0.5 rounded-[4px] border border-gray-200">
                                        {(
                                            [
                                                { key: "cliente", label: "Cliente" },
                                                { key: "piloto", label: "Piloto" },
                                                { key: "tecnico", label: "Técnico" },
                                                { key: "admin", label: "Admin" },
                                            ] as { key: Role; label: string }[]
                                        ).map((r) => (
                                            <button
                                                key={r.key}
                                                type="button"
                                                onClick={() => setSelectedRole(r.key)}
                                                className={`py-1.5 text-[10px] font-bold rounded-[4px] transition-all border-0 cursor-pointer ${
                                                    selectedRole === r.key
                                                        ? "bg-[#0E5E6F] text-white"
                                                        : "text-gray-600 hover:text-gray-900 bg-transparent"
                                                }`}
                                            >
                                                {r.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <WireframeInput label="Nombre" placeholder="Nombre" />
                                    <WireframeInput label="Apellido" placeholder="Apellido" />
                                </div>

                                <WireframeInput
                                    label="Teléfono"
                                    placeholder="+504 9999-0000"
                                />

                                {/* CAMPO SEGÚN ROL */}
                                {selectedRole === "cliente" && (
                                    <WireframeInput
                                        label="Identificación (DNI / RTN)"
                                        placeholder="0801-1990-00000"
                                    />
                                )}

                                {selectedRole === "admin" && (
                                    <WireframeInput
                                        label="Código empresarial"
                                        placeholder="ADM-2026-X9"
                                    />
                                )}

                                {selectedRole === "piloto" && (
                                    <WireframeInput
                                        label="Código de la AHAC"
                                        placeholder="AHAC-RPAS-2026-0415"
                                    />
                                )}

                                {selectedRole === "tecnico" && (
                                    <WireframeInput
                                        label="Identificación (DNI / RTN)"
                                        placeholder="0801-1990-00000"
                                    />
                                )}
                            </div>
                        )}

                        {/* PASO 3 */}
                        {regSubStep === 3 && (
                            <div className="space-y-3 text-center py-2 animate-in fade-in duration-150">
                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] w-fit mx-auto">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <Title className="text-xs text-gray-900 font-bold">
                                        Verificación de cuenta
                                    </Title>
                                    <p className="text-[11px] text-gray-500 leading-tight">
                                        Selecciona cómo deseas recibir tu código único de 6 dígitos.
                                    </p>
                                </div>

                                <div className="flex bg-gray-100 p-0.5 rounded-[4px] border border-gray-200 gap-0.5">
                                    <button
                                        type="button"
                                        onClick={() => setRecoverMethod("email")}
                                        className={`flex-1 py-2 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                            recoverMethod === "email"
                                                ? "bg-[#0E5E6F] text-white shadow-sm"
                                                : "text-gray-600 bg-transparent"
                                        }`}
                                    >
                                        Correo electrónico
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRecoverMethod("phone")}
                                        className={`flex-1 py-2 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer transition-all ${
                                            recoverMethod === "phone"
                                                ? "bg-[#0E5E6F] text-white shadow-sm"
                                                : "text-gray-600 bg-transparent"
                                        }`}
                                    >
                                        Teléfono móvil
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* RECUPERAR CLAVE */}
                {step === "recover" && (
                    <div className="w-full max-w-[320px] mx-auto space-y-3 text-center animate-in fade-in duration-150">
                        <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px] w-fit mx-auto">
                            <Shield size={20} />
                        </div>
                        <div>
                            <Title className="text-sm text-gray-900 font-bold">
                                Recuperación de cuenta
                            </Title>
                            <p className="text-[11px] text-gray-500">
                                Selecciona el canal para la entrega del código.
                            </p>
                        </div>

                        <div className="flex bg-gray-100 p-0.5 rounded-[4px] border border-gray-200 gap-0.5">
                            <button
                                onClick={() => setRecoverMethod("email")}
                                className={`flex-1 py-1.5 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer ${
                                    recoverMethod === "email"
                                        ? "bg-[#0E5E6F] text-white"
                                        : "text-gray-500 bg-transparent"
                                }`}
                            >
                                Correo
                            </button>
                            <button
                                onClick={() => setRecoverMethod("phone")}
                                className={`flex-1 py-1.5 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer ${
                                    recoverMethod === "phone"
                                        ? "bg-[#0E5E6F] text-white"
                                        : "text-gray-500 bg-transparent"
                                }`}
                            >
                                Teléfono
                            </button>
                        </div>

                        <div className="text-left">
                            {recoverMethod === "email" ? (
                                <WireframeInput
                                    label="Correo registrado"
                                    placeholder="usuario@ejemplo.hn"
                                />
                            ) : (
                                <WireframeInput
                                    label="Teléfono registrado"
                                    placeholder="+504 9999-0000"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* VERIFICACIÓN */}
                {step === "verify" && (
                    <div className="w-full max-w-[320px] mx-auto space-y-3 text-center animate-in fade-in duration-150">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-[4px] w-fit mx-auto">
                            <Shield size={20} className="animate-pulse" />
                        </div>
                        <div>
                            <Title className="text-sm text-gray-900 font-bold">
                                Verificación de seguridad
                            </Title>
                            <p className="text-[11px] text-gray-500">
                                Ingresa el código enviado de 6 dígitos.
                            </p>
                        </div>

                        <div className="flex gap-1.5 justify-center py-1">
                            {codeDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`digit-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    placeholder={String(index + 1)}
                                    onChange={(e) => handleDigitChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-8 h-9 text-center text-sm font-bold border-2 border-gray-200 rounded-[4px] focus:border-[#0E5E6F] focus:outline-none bg-gray-50/50 uppercase placeholder-gray-300"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* ÉXITO */}
                {step === "success" && (
                    <div className="w-full max-w-[320px] mx-auto space-y-3 text-center animate-in zoom-in-95 duration-150">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[4px] w-fit mx-auto">
                            <Check size={26} />
                        </div>
                        <div>
                            <Title className="text-base text-[#0E5E6F] font-bold">
                                ¡Operación completada!
                            </Title>
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                                Tu cuenta ha sido confirmada con éxito.
                            </p>
                        </div>
                        <button
                            onClick={handleSuccessFinish}
                            className="w-full text-xs font-bold py-2.5 rounded-[4px] border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white cursor-pointer"
                        >
                            Ir al inicio de sesión
                        </button>
                    </div>
                )}
            </div>

            {/* PIE DE PÁGINA STICKY */}
            {step !== "success" && (
                <div className="border-t-2 border-gray-200 px-4 py-3 bg-gray-50/90 flex items-center justify-between gap-2 shrink-0">
                    <button
                        onClick={() => {
                            if (step === "register" && regSubStep > 1) {
                                setRegSubStep((prev) => (prev - 1) as 1 | 2 | 3);
                            } else if (step === "verify") {
                                setStep("register");
                                setRegSubStep(3);
                            } else if (step === "recover") {
                                setStep("login");
                            } else {
                                onBack();
                            }
                        }}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-xs font-bold transition-colors bg-transparent border-0 cursor-pointer"
                    >
                        <ChevronLeft size={14} />{" "}
                        {step === "register" && regSubStep > 1
                            ? "Anterior"
                            : step === "verify" || step === "recover"
                            ? "Regresar"
                            : "Cancelar"}
                    </button>

                    <WireframeButton
                        primary
                        onClick={() => {
                            if (step === "login") {
                                onLogin(selectedRole);
                            } else if (step === "register") {
                                if (regSubStep === 1) {
                                    setRegSubStep(2);
                                } else if (regSubStep === 2) {
                                    setRegSubStep(3);
                                } else {
                                    setStep("verify");
                                }
                            } else if (step === "recover") {
                                setStep("verify");
                            } else if (step === "verify") {
                                setStep("success");
                            }
                        }}
                        className="text-xs font-bold py-2 px-4 rounded-[4px] border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                        {step === "login" && "Ingresar"}
                        {step === "register" &&
                            (regSubStep < 3 ? (
                                <>
                                    Siguiente <ArrowRight size={13} />
                                </>
                            ) : (
                                "Enviar código"
                            ))}
                        {step === "recover" && "Enviar código"}
                        {step === "verify" && "Verificar"}
                    </WireframeButton>
                </div>
            )}
        </div>
    );
};
