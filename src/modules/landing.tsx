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

    // Referencias y estado para el scroll con el mouse
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
            icono: <Droplets size={22} />,
            titulo: "Fumigación y Riego",
            descripcion:
                "Despliegues autónomos calibrados milimétricamente para la aspersión uniforme de insumos.",
        },
        {
            icono: <Eye size={22} />,
            titulo: "Mapeo Multiespectral",
            descripcion:
                "Diagnóstico exhaustivo de estrés hídrico y vigor vegetal mediante procesamiento de imágenes NIR.",
        },
        {
            icono: <Truck size={22} />,
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
                "With an impressive lifting capacity of 35 lbs (15 kg), Freefly Alta X redefines what's possible in cinematography. Whether you're aiming to capture breathtaking landscapes, dynamic action sequences, or intricate aerial shots, the Alta X empowers your creative vision like never before.",
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
                "The CW-80E can stay afloat for more than 840 minutes at a maximum speed of 135 km/h. With a payload capacity of up to 25 kg, the long range drone allows the flexibility to carry large high-end sensors, such as hyperspectral and bathymetric LiDARs.",
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
            {/* ─── NAVBAR ─── */}
            <nav className="sticky top-0 z-40 bg-white/95 border-b-2 border-gray-200 px-8 flex items-center gap-6 h-14 w-full shrink-0 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3 shrink-0">
                    <img
                        src="src/img/logo_bio_dron.png"
                        alt="BioDron Logo"
                        className="w-15 h-15 object-contain"
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                        }}
                    />
                    <Title className="text-2xl font-bold text-[#0E5E6F] tracking-tight uppercase">
                        BioDron
                    </Title>
                </div>
                <div
                    className="flex items-center gap-6 ml-6"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                    <a
                        href="#inicio"
                        className="text-sm text-gray-500 hover:text-[#0E5E6F] transition-colors tracking-wider"
                    >
                        Características
                    </a>
                    <a
                        href="#servicios"
                        className="text-sm text-gray-500 hover:text-[#0E5E6F] transition-colors tracking-wider"
                    >
                        Servicios
                    </a>
                    <a
                        href="#precios"
                        onClick={() => fijarPestanaPrecios("subs")}
                        className="text-sm text-gray-500 hover:text-[#0E5E6F] transition-colors tracking-wider"
                    >
                        Suscripciones
                    </a>
                    <a
                        href="#precios"
                        onClick={() => fijarPestanaPrecios("equipos")}
                        className="text-sm text-gray-500 hover:text-[#0E5E6F] transition-colors tracking-wider"
                    >
                        Equipos
                    </a>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <WireframeButton
                        onClick={alIniciarSesion}
                        className="py-2 px-5 text-sm rounded-[4px] border-gray-300 bg-white text-gray-700"
                    >
                        Ingresar
                    </WireframeButton>
                    <WireframeButton
                        primary
                        onClick={alRegistrar}
                        className="py-2 px-5 text-sm rounded-[4px]"
                    >
                        Registrarse
                    </WireframeButton>
                </div>
            </nav>

            {/* ─── CONTENEDOR PRINCIPAL CON SCROLL ─── */}
            <div className="flex-1 w-full overflow-y-auto scroll-smooth">
                {/* SECCIÓN 1: HERO */}
                <section
                    id="inicio"
                    className="w-full px-16 flex flex-col lg:flex-row items-center justify-center gap-12 bg-white border-b-2 border-gray-100 box-border py-20"
                >
                    <div className="flex-1 max-w-xl">
                        <div className="inline-flex items-center gap-2 bg-[#0E5E6F]/10 text-[#0E5E6F] px-3.5 py-1.5 rounded-[4px] mb-4 border border-[#0E5E6F]/20">
                            <Zap size={14} />
                            <Text className="text-xs font-black tracking-widest">
                                Plataforma líder en Honduras
                            </Text>
                        </div>
                        <Title className="text-4xl lg:text-[2.5rem] leading-[1.15] font-extrabold text-gray-900 mb-4 normal-case tracking-tight">
                            Monitoreo Agrícola Autónomo con Drones
                        </Title>
                        <Text className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
                            Automatiza el riego, fumigación y transporte de carga pesada con
                            tecnología de precisión aeroespacial. Diseñado para optimizar el
                            rendimiento y la eficiencia de tus parcelas productoras.
                        </Text>
                        <div className="flex gap-4">
                            <WireframeButton
                                primary
                                onClick={alRegistrar}
                                className="py-2.5 px-5 rounded-[4px] flex items-center gap-2 text-sm"
                            >
                                <Droplets size={18} /> Soy agricultor
                            </WireframeButton>
                            <WireframeButton
                                onClick={alRegistrar}
                                className="py-2.5 px-5 rounded-[4px] flex items-center gap-2 bg-white border-[#0E5E6F] text-[#0E5E6F] text-sm"
                            >
                                <Navigation size={18} /> Soy piloto
                            </WireframeButton>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-lg relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-[4px] bg-gray-900 shadow-md">
                            <img
                                src={imagenesCarruselPrincipal[indiceImagenPrincipal].src}
                                alt={imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                                className="w-full h-full object-cover opacity-80 transition-all duration-500"
                                onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                }}
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                                <span className="text-[10px] font-bold text-[#0E5E6F] tracking-widest bg-white/90 px-2 py-0.5 rounded-[4px] w-max mb-1">
                                    Vista aérea activa
                                </span>
                                <Title
                                    as="h3"
                                    className="text-lg font-bold text-white normal-case"
                                >
                                    {imagenesCarruselPrincipal[indiceImagenPrincipal].titulo}
                                </Title>
                                <Text className="text-xs text-gray-300 mt-0.5">
                                    {imagenesCarruselPrincipal[indiceImagenPrincipal].descripcion}
                                </Text>
                            </div>
                        </div>
                        <div className="flex justify-center gap-1.5 mt-4">
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
                    className="w-full px-8 lg:px-16 bg-gray-50 border-b-2 border-gray-200 flex flex-col justify-center box-border py-10"
                >
                    <div className="max-w-6xl mx-auto w-full">
                        {/* Título centrado sobre ambos elementos */}
                        <div className="w-full text-center mb-10">
                            <Title className="text-2xl font-bold text-gray-900 mb-1 normal-case tracking-tight">
                                Servicios de la Plataforma
                            </Title>
                            <Text className="text-gray-500 text-xs max-w-md mx-auto">
                                Pilares de infraestructura tecnológica dedicados a la
                                agricultura de precisión.
                            </Text>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
                            {/* Carrusel Izquierdo (App Móvil) - Altura fija de 280px */}
                            <div className="w-full lg:w-1/3 max-w-sm relative shrink-0 h-[280px]">
                                <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-gray-900 shadow-md">
                                    <img
                                        src={imagenesAppMovil[indiceImagenApp].src}
                                        alt={imagenesAppMovil[indiceImagenApp].titulo}
                                        className="w-full h-full object-cover opacity-80 transition-all duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = "none";
                                        }}
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent">
                                        <span className="text-[10px] font-bold text-[#0E5E6F] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded-[4px] w-max mb-1">
                                            App Móvil
                                        </span>
                                        <Title
                                            as="h3"
                                            className="text-lg font-bold text-white normal-case"
                                        >
                                            {imagenesAppMovil[indiceImagenApp].titulo}
                                        </Title>
                                        <Text className="text-xs text-gray-300 mt-0.5">
                                            {imagenesAppMovil[indiceImagenApp].descripcion}
                                        </Text>
                                    </div>
                                </div>
                                {/* Indicadores del carrusel ubicados debajo (fuera del h-[280px] o absolutos) */}
                                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1.5">
                                    {imagenesAppMovil.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => fijarIndiceImagenApp(idx)}
                                            className={`h-1.5 rounded-[4px] transition-all border-0 cursor-pointer ${idx === indiceImagenApp ? "w-6 bg-[#0E5E6F]" : "w-1.5 bg-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Galería de Servicios (Derecha) - Misma altura de 280px */}
                            <div className="w-full lg:w-2/3 relative h-[280px]">
                                {/* Degradados laterales para indicar scroll oculto en gris-50 */}
                                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                                <div
                                    ref={refServicios}
                                    onMouseDown={(e) => manejarInicioArrastre(e, refServicios)}
                                    onMouseLeave={manejarFinArrastre}
                                    onMouseUp={manejarFinArrastre}
                                    onMouseMove={(e) => manejarArrastre(e, refServicios)}
                                    className="flex gap-4 w-full h-full overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6"
                                >
                                    {datosServicios.map((servicio) => (
                                        <div
                                            key={servicio.titulo}
                                            className="min-w-[260px] w-[260px] h-full shrink-0 snap-center bg-white border-2 border-gray-200 rounded-[4px] p-6 group hover:border-[#0E5E6F] transition-all shadow-sm flex flex-col items-start justify-center"
                                        >
                                            <div className="w-12 h-12 bg-gray-100 rounded-[4px] flex items-center justify-center mb-4 text-[#0E5E6F] group-hover:bg-[#0E5E6F] group-hover:text-white transition-colors border-2 border-transparent group-hover:border-[#0E5E6F]">
                                                {servicio.icono}
                                            </div>
                                            <Title
                                                as="h3"
                                                className="text-sm font-bold mb-2 text-gray-900 normal-case"
                                            >
                                                {servicio.titulo}
                                            </Title>
                                            <Text className="text-xs text-gray-600 leading-relaxed">
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
                    className="w-full bg-white box-border pt-6 pb-12 border-b-2 border-gray-100"
                >
                    <div className="max-w-5xl mx-auto w-full px-6">
                        <div className="mb-5 text-center">
                            <Title className="text-2xl font-bold text-center text-gray-900 mb-1 normal-case tracking-tight">
                                Modelos de Inversión Tecnológica
                            </Title>
                            <Text className="text-center text-gray-500 text-xs">
                                Elige el plan operativo mensual o adquiere drones comerciales de
                                alto tonelaje.
                            </Text>
                        </div>

                        <div className="flex justify-center mb-5">
                            <div
                                className="flex bg-gray-100 p-1.5 rounded-[4px] border-2 border-gray-200 gap-1"
                                style={{ fontFamily: "'Roboto', sans-serif" }}
                            >
                                <button
                                    onClick={() => {
                                        fijarPestanaPrecios("subs");
                                        fijarIdTarjetaSeleccionada(null);
                                    }}
                                    className={`px-4 py-1.5 rounded-[4px] text-xs font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "subs" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Suscripciones Mensuales
                                </button>
                                <button
                                    onClick={() => {
                                        fijarPestanaPrecios("equipos");
                                        fijarIdTarjetaSeleccionada(null);
                                    }}
                                    className={`px-4 py-1.5 rounded-[4px] text-xs font-bold transition-all border-0 cursor-pointer ${pestanaPrecios === "equipos" ? "bg-[#0E5E6F] text-white shadow-sm" : "text-gray-500"}`}
                                >
                                    Equipos Avanzados
                                </button>
                            </div>
                        </div>

                        <div className="w-full relative">
                            {pestanaPrecios === "subs" ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch">
                                    {datosPlanes.map((plan) => {
                                        const estaSeleccionado =
                                            idTarjetaSeleccionada === plan.id ||
                                            (plan.destacado && !idTarjetaSeleccionada);

                                        return (
                                            <div
                                                key={plan.id}
                                                onClick={() => fijarIdTarjetaSeleccionada(plan.id)}
                                                className={`border-2 rounded-[4px] p-3.5 flex flex-col justify-between bg-white h-[260px] cursor-pointer transition-all duration-200 relative ${estaSeleccionado
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
                                                    <div className="flex justify-between items-start gap-2 mb-0.5">
                                                        <Title
                                                            as="h3"
                                                            className={`text-xs font-bold normal-case truncate ${estaSeleccionado ? "text-[#0E5E6F]" : "text-gray-900"}`}
                                                        >
                                                            {plan.nombre}
                                                        </Title>
                                                        <span className="bg-gray-100 text-gray-700 text-[7px] font-bold uppercase tracking-wider px-1 py-0.5 rounded-[4px] border border-gray-200 shrink-0">
                                                            {plan.etiqueta}
                                                        </span>
                                                    </div>

                                                    <div className="mb-1">
                                                        <span
                                                            className="font-black text-lg text-gray-900"
                                                            style={{
                                                                fontFamily: "'Roboto', sans-serif",
                                                            }}
                                                        >
                                                            {plan.precio}
                                                        </span>
                                                        <span className="text-gray-400 text-[9px] ml-0.5">
                                                            {plan.periodo}
                                                        </span>
                                                    </div>

                                                    <Text className="text-[10px] text-gray-500 leading-snug mb-2 pb-1 border-b border-gray-100 line-clamp-2">
                                                        {plan.descripcion}
                                                    </Text>

                                                    <ul className="space-y-1">
                                                        {plan.caracteristicas.map((caracteristica) => (
                                                            <li
                                                                key={caracteristica}
                                                                className="flex items-center gap-1.5"
                                                            >
                                                                <CheckCircle
                                                                    size={10}
                                                                    className={
                                                                        estaSeleccionado
                                                                            ? "text-gray-800"
                                                                            : "text-gray-400"
                                                                    }
                                                                />
                                                                <Text className="text-[10px] text-gray-600 truncate">
                                                                    {caracteristica}
                                                                </Text>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-2 border-t border-gray-100">
                                                    <WireframeButton
                                                        primary={estaSeleccionado}
                                                        onClick={(e: any) => {
                                                            e.stopPropagation();
                                                            alRegistrar();
                                                        }}
                                                        className="w-full fond-bold rounded-[4px] text-[10px] py-1.5"
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
                                    {/* Degradados laterales para indicar scroll oculto en blanco */}
                                    <div className="absolute top-0 left-0 bottom-4 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                                    <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                                    <div
                                        ref={refDrones}
                                        onMouseDown={(e) => manejarInicioArrastre(e, refDrones)}
                                        onMouseLeave={manejarFinArrastre}
                                        onMouseUp={manejarFinArrastre}
                                        onMouseMove={(e) => manejarArrastre(e, refDrones)}
                                        className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6"
                                    >
                                        {datosDrones.map((dron) => {
                                            const estaSeleccionado =
                                                idTarjetaSeleccionada === dron.id ||
                                                (dron.destacado && !idTarjetaSeleccionada);

                                            return (
                                                <div
                                                    key={dron.id}
                                                    onClick={() => fijarIdTarjetaSeleccionada(dron.id)}
                                                    className={`min-w-[280px] w-[280px] shrink-0 snap-center border-2 rounded-[4px] overflow-hidden bg-white flex flex-col h-[280px] justify-between transition-all duration-200 relative ${estaSeleccionado
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
                                                            className="absolute top-1.5 right-1.5 z-30 flex items-center justify-center w-6 h-6 rounded-[4px] bg-white/90 backdrop-blur-md border border-gray-200 text-gray-600 hover:text-[#0E5E6F] hover:bg-white shadow-sm transition-all border-0 cursor-pointer pointer-events-auto"
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

            {/* ─── MODAL HORIZONTAL AMPLIO ─── */}
            {dronSeleccionado && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white border-2 border-gray-200 w-full max-w-3xl rounded-[4px] p-5 shadow-2xl relative my-auto">
                        <div className="flex justify-between items-start border-b border-gray-200 pb-2 mb-3">
                            <div>
                                <span className="text-[10px] bg-[#0E5E6F]/10 text-[#0E5E6F] font-black uppercase tracking-widest px-2 py-0.5 rounded-[4px] mb-0.5 inline-block">
                                    {dronSeleccionado.etiqueta}
                                </span>
                                <Title
                                    as="h3"
                                    className="text-lg font-bold text-gray-900 normal-case"
                                >
                                    {dronSeleccionado.nombre}
                                </Title>
                            </div>
                            <button
                                onClick={() => fijarDronSeleccionado(null)}
                                className="w-6 h-6 flex items-center justify-center rounded-[4px] bg-gray-100 text-gray-500 hover:text-gray-900 font-bold text-xs bg-transparent border-0 cursor-pointer transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                            <div className="flex flex-col gap-2.5">
                                <div className="w-full h-40 bg-gray-100 rounded-[4px] overflow-hidden border border-gray-200 relative shadow-sm">
                                    <img
                                        src={dronSeleccionado.imagen}
                                        alt={dronSeleccionado.nombre}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLElement).style.display = "none";
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-2.5 right-2.5 bg-gray-900/90 backdrop-blur-md text-white font-black text-sm px-3 py-1 rounded-[4px] shadow-md"
                                        style={{ fontFamily: "'Lexend Deca', sans-serif" }}
                                    >
                                        {dronSeleccionado.precio}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[11px] font-bold text-gray-700 block mb-0.5">
                                        Descripción del Equipo:
                                    </span>
                                    <Text className="text-[11px] text-gray-600 leading-snug bg-gray-50 p-2.5 rounded-[4px] border border-gray-100">
                                        {dronSeleccionado.descripcion}
                                    </Text>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold text-gray-700 block mb-1">
                                        Especificaciones Técnicas Completas:
                                    </span>
                                    <div className="border border-gray-200 rounded-[4px] overflow-hidden text-[11px]">
                                        {Object.entries(dronSeleccionado.especificaciones).map(
                                            ([clave, valor]: any, indice) => (
                                                <div
                                                    key={clave}
                                                    className={`flex justify-between py-1.5 px-3 ${indice % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-100 last:border-b-0`}
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

                                <div className="mt-4 flex gap-3 border-t border-gray-200 pt-3">
                                    <WireframeButton
                                        onClick={() => fijarDronSeleccionado(null)}
                                        className="flex-1 py-2 text-xs rounded-[4px] bg-white text-gray-700 border-gray-300"
                                    >
                                        Cerrar
                                    </WireframeButton>
                                    <WireframeButton
                                        primary
                                        onClick={() => {
                                            fijarDronSeleccionado(null);
                                            alRegistrar();
                                        }}
                                        className="flex-1 py-2 text-xs rounded-[4px]"
                                    >
                                        Cotizar Equipo
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
            className="w-full max-w-4xl mx-auto bg-white antialiased select-none py-3"
        >
            <div className="bg-white border-2 border-gray-200 rounded-[4px] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-md transition-all">
                
                {/* LADO IZQUIERDO: CARRUSEL DE IMÁGENES AUTOMÁTICO */}
                <div className="hidden md:flex md:col-span-5 bg-gray-100 border-r-2 border-gray-200 relative items-center justify-center overflow-hidden h-[480px]">
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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white z-10 pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E5E6F] bg-white px-2 py-0.5 rounded-[4px] w-fit mb-1 shadow-sm">
                            BIODRON
                        </span>
                        <p className="text-xs text-gray-200 font-medium leading-relaxed">
                            Plataforma de gestión e infraestructura de vuelo autónomo.
                        </p>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO */}
                <div className="col-span-1 md:col-span-7 flex flex-col justify-between bg-white h-[480px]">
                    
                    {/* ENCABEZADO */}
                    {step !== "success" && (
                        <div className="bg-gray-50/90 border-b-2 border-gray-200 px-6 py-3 flex items-center justify-between gap-2 h-[56px] shrink-0">
                            <div>
                                <Title className="text-base text-[#0E5E6F] font-black tracking-tight mb-0">
                                    BIODRON
                                </Title>
                                <Text className="text-[10px] text-gray-500 font-bold tracking-wide block">
                                    Acceso al sistema
                                </Text>
                            </div>

                            {(step === "login" || step === "register") && (
                                <div
                                    className="flex bg-gray-200/70 p-0.5 rounded-[4px] border border-gray-300 w-40 gap-0.5 shrink-0 shadow-inner"
                                    style={{ fontFamily: "'Roboto', sans-serif" }}
                                >
                                    <button
                                        onClick={() => {
                                            setStep("login");
                                            setRegSubStep(1);
                                        }}
                                        className={`flex-1 py-1 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${
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
                                        className={`flex-1 py-1 rounded-[4px] text-[11px] font-bold transition-all border-0 cursor-pointer ${
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

                    {/* CUERPO CENTRAL */}
                    <div className="p-5 flex-1 flex flex-col justify-center items-center h-[370px]">
                        
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
                                            <div className="grid grid-cols-4 gap-1 bg-gray-100 p-0.5 rounded-[4px] border border-gray-200">
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
                                                        className={`py-1 text-[10px] font-bold rounded-[4px] transition-all border-0 cursor-pointer ${
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
                                        className={`flex-1 py-1 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer ${
                                            recoverMethod === "email"
                                                ? "bg-[#0E5E6F] text-white"
                                                : "text-gray-500 bg-transparent"
                                        }`}
                                    >
                                        Correo
                                    </button>
                                    <button
                                        onClick={() => setRecoverMethod("phone")}
                                        className={`flex-1 py-1 rounded-[4px] text-[10px] font-bold border-0 cursor-pointer ${
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
                                    className="w-full text-xs font-bold py-2 rounded-[4px] border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white cursor-pointer"
                                >
                                    Ir al inicio de sesión
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PIE DE PÁGINA FIXTURE */}
                    {step !== "success" && (
                        <div className="border-t-2 border-gray-200 px-6 py-3 bg-gray-50/90 flex items-center justify-between gap-2 h-[54px] shrink-0">
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
                                className="text-xs font-bold py-1.5 px-4 rounded-[4px] border-2 border-[#0E5E6F] bg-[#0E5E6F] text-white flex items-center gap-1 cursor-pointer shadow-sm"
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
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════
// 8. PROFILE (Universal)
// ═══════════════════════════════════════════════════════════════════════
export const ProfileView = ({ role, onLogout }: ProfileViewProps) => {
    // Configuración base por rol con rutas absolutas de la carpeta public/
    const initialProfiles = {
        admin: {
            initials: "CS",
            name: "Carlos Sosa",
            email: "carlos.sosa@technodactylus.hn",
            phone: "+504 9845-1200",
            password: "••••••••••••",
            avatar: "src/img/admin_perfil.png",
            avatarBg: "bg-[#0E5E6F] text-white",
            roleLabel: "Administrador · Operaciones",
            location: "Valle del Aguán, Olanchito, Yoro",
            area: "—",
            services: "142 misiones",
            standing: "Activo",
            roleColor: "text-[#0E5E6F] bg-[#0E5E6F]/10 border-[#0E5E6F]/30",
            description:
                "Coordinador regional de flota agrícola y geodatos en Olanchito.",
        },
        piloto: {
            initials: "JR",
            name: "Javier Reyes",
            email: "j.reyes@technodactylus.hn",
            phone: "+504 9712-3489",
            password: "••••••••••••",
            avatar: "src/img/piloto_perfil.png",
            avatarBg: "bg-blue-600 text-white",
            roleLabel: "Piloto Licenciado · DJI Agras T50",
            location: "Base Aérea San Lorenzo, Olanchito",
            area: "—",
            services: "128 vuelos",
            standing: "Activo",
            roleColor: "text-blue-700 bg-blue-50 border-blue-300",
            description:
                "Especialista en mapeo NDVI y fumigación en fincas bananeras.",
        },
        cliente: {
            initials: "CR",
            name: "Carlos Reyes",
            email: "creyes.aguan@gmail.com",
            phone: "+504 9567-8821",
            password: "••••••••••••",
            avatar: "src/img/granjero_perfil.png",
            avatarBg: "bg-emerald-700 text-white",
            roleLabel: "Productor Agrícola · Verificado",
            location: "Sabana de Tepusteca, Olanchito",
            area: "145 ha (Maíz / Banano)",
            services: "12 solicitudes",
            standing: "Activo",
            roleColor: "text-emerald-800 bg-emerald-50 border-emerald-300",
            description: "Productor de maíz híbrido y banano con monitoreo aéreo.",
        },
        tecnico: {
            initials: "CR",
            name: "Carlos Kings",
            email: "ckings.aguan@gmail.com",
            phone: "+504 9567-8821",
            password: "••••••••••••",
            avatar: "src/img/granjero_perfil.png",
            avatarBg: "bg-emerald-700 text-white",
            roleLabel: "Productor Agrícola · Verificado",
            location: "Sabana de Tepusteca, Olanchito",
            area: "145 ha (Maíz / Banano)",
            services: "12 solicitudes",
            standing: "Activo",
            roleColor: "text-emerald-800 bg-emerald-50 border-emerald-300",
            description: "Productor de maíz híbrido y banano con monitoreo aéreo.",
        },
    };

    const currentRole = role || "cliente";
    const [profileData, setProfileData] = useState(initialProfiles[currentRole]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [imgError, setImgError] = useState(false);

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
        setIsModalOpen(true);
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
            <div className="w-full h-full flex-1 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs">
                {/* CABECERA (INTACTA) */}
                <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-gray-300 overflow-hidden shrink-0 shadow-xs relative group flex items-center justify-center">
                            {!imgError ? (
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div
                                    className={`w-full h-full flex items-center justify-center font-black text-xl ${profileData.avatarBg}`}
                                >
                                    {profileData.initials}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ShieldCheck size={20} className="text-white drop-shadow" />
                            </div>
                        </div>

                        <div className="text-left">
                            <Title className="text-xl sm:text-2xl text-gray-900 font-black tracking-tight normal-case leading-tight">
                                {profileData.name}
                            </Title>
                            <Text className="text-gray-500 font-semibold text-xs sm:text-sm mt-1">
                                {profileData.email}
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                        <span
                            className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-lg border-2 ${profileData.roleColor}`}
                            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                        >
                            {profileData.roleLabel}
                        </span>

                        {saveSuccess && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-md flex items-center gap-1 animate-in fade-in duration-150">
                                <Check size={13} /> Actualizado
                            </span>
                        )}
                    </div>
                </div>

                {/* MÉTRICAS PRINCIPALES (SECCIÓN INFERIOR 1 - COMPACTADA) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white border-b-2 border-gray-200 text-left flex-1 items-center">
                    {/* Base Regional */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                                <MapPin size={16} />
                            </div>
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Base Regional
                            </Text>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
                            {profileData.location}
                        </span>
                    </div>

                    {/* Extensión */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                                <Layers size={16} />
                            </div>
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Extensión
                            </Text>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block break-words leading-tight mt-0.5">
                            {profileData.area}
                        </span>
                    </div>

                    {/* Actividad */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                                <BarChart2 size={16} />
                            </div>
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Actividad
                            </Text>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-800 font-bold block truncate leading-tight mt-0.5">
                            {profileData.services}
                        </span>
                    </div>

                    {/* Estado */}
                    <div className="p-3 sm:p-3.5 hover:bg-gray-50/50 transition-colors flex items-start gap-2.5 h-full justify-center flex-col">
                        <div className="flex items-center gap-2">
                            <div className="text-[#0E5E6F] shrink-0 bg-gray-50 p-1.5 border-2 border-gray-200 rounded-lg">
                                <CheckCircle size={16} />
                            </div>
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                                Estado
                            </Text>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-md uppercase inline-block mt-0.5">
                            {profileData.standing}
                        </span>
                    </div>
                </div>

                {/* DATOS DE CONTACTO Y CREDENCIALES (SECCIÓN INFERIOR 2 - COMPACTADA) */}
                <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b-2 border-gray-100">
                        <div className="flex items-center gap-2">
                            <Settings size={16} className="text-[#0E5E6F]" />
                            <Title
                                as="h3"
                                className="text-xs sm:text-sm font-black text-gray-800 normal-case"
                            >
                                Credenciales y Datos de Contacto
                            </Title>
                        </div>

                        <button
                            onClick={handleOpenModal}
                            className="py-1 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors active:scale-95 shadow-xs"
                        >
                            <Edit2 size={13} className="text-[#0E5E6F]" /> Editar Información
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Phone size={12} className="text-[#0E5E6F]" /> Teléfono
                            </Text>
                            <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                                {profileData.phone}
                            </Text>
                        </div>

                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Mail size={12} className="text-[#0E5E6F]" /> Correo
                            </Text>
                            <Text className="font-bold text-xs sm:text-sm text-gray-800 mt-0.5 truncate">
                                {profileData.email}
                            </Text>
                        </div>

                        <div className="p-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl">
                            <Text className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <Lock size={12} className="text-[#0E5E6F]" /> Contraseña
                            </Text>
                            <Text className="font-mono font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
                                ••••••••••••
                            </Text>
                        </div>
                    </div>
                </div>

                {/* PIE DE PÁGINA (SECCIÓN INFERIOR 3 - COMPACTADA) */}
                <div className="border-t-2 border-gray-200 px-6 py-2 bg-gray-50 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-400 font-medium text-left truncate">
                        Base Olanchito, Yoro
                    </span>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1.5 py-1 px-3 rounded-lg border-2 border-rose-200 bg-white hover:bg-rose-50 text-rose-600 transition-all active:scale-95 shadow-xs"
                        style={{ fontFamily: "'Instrument Sans', sans-serif" }}
                    >
                        <LogOut size={13} className="shrink-0" />
                        <span className="text-xs font-black uppercase tracking-wider">
                            SALIR
                        </span>
                    </button>
                </div>
            </div>

            {/* MODAL VERTICAL FLOTANTE DE EDICIÓN */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                    <div className="bg-white border-2 border-gray-300 rounded-2xl p-5 w-full max-w-md shadow-xl space-y-4 text-left">
                        {/* Encabezado del Modal */}
                        <div className="flex items-center justify-between pb-2.5 border-b-2 border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#0E5E6F]/10 rounded-lg text-[#0E5E6F]">
                                    <Edit2 size={15} />
                                </div>
                                <Title
                                    as="h3"
                                    className="text-sm font-black text-gray-800 normal-case"
                                >
                                    Editar Credenciales
                                </Title>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Formulario Vertical */}
                        <form onSubmit={handleSave} className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                                    Teléfono
                                </label>
                                <div className="relative">
                                    <Phone
                                        size={13}
                                        className="absolute left-3 top-3 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        value={editForm.phone}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, phone: e.target.value })
                                        }
                                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={13}
                                        className="absolute left-3 top-3 text-gray-400"
                                    />
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, email: e.target.value })
                                        }
                                        className="w-full pl-8 pr-3 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1">
                                    Nueva Contraseña
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={13}
                                        className="absolute left-3 top-3 text-gray-400"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={editForm.password}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, password: e.target.value })
                                        }
                                        className="w-full pl-8 pr-8 py-2 text-xs font-bold border-2 border-gray-200 rounded-lg focus:border-[#0E5E6F] focus:outline-none bg-white text-gray-800"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-1.5 px-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors active:scale-95"
                                >
                                    <X size={13} /> Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="py-1.5 px-4 bg-[#0E5E6F] border-2 border-[#0E5E6F] text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 shadow-xs"
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