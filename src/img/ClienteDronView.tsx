export const ClienteDronView = ({
    onRegisterPilot,
}: {
    onRegisterPilot?: () => void;
}) => {
    // ---------------- ESTADOS DEL DRON ----------------
    const [activeMainTab, setActiveMainTab] = useState<"mis-drones" | "comprar">("mis-drones");
    const [selectedCategory, setSelectedCategory] = useState<"micro" | "mini" | "pequeno" | "grande">("micro");
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);

    const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [pilotFormData, setPilotFormData] = useState({
        email: "carlos.mendoza@agrodrone.hn",
        password: "password123",
        ahacCode: "AHAC-PIL-2026-88",
    });

    // ---------------- ESTADOS AYUDA TÉCNICA ----------------
    const [supportDrone, setSupportDrone] = useState<UserDrone | null>(null);
    const [supportReason, setSupportReason] = useState<string>(
        "Fallo menor en la calibración del sensor de altitud durante el último vuelo."
    );
    const [supportSubmitted, setSupportSubmitted] = useState<boolean>(false);

    // ---------------- ESTADOS CHECKOUT ----------------
    const [selectedDroneForCheckout, setSelectedDroneForCheckout] = useState<Drone | null>(null);
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

    const userWalletBalance = 3200;

    const getPrecioNum = (precioStr: string) => parseInt(precioStr.replace(/[^0-9]/g, ""), 10);

    // ---------------- DATOS ----------------
    const misDronesComprados: UserDrone[] = [
        {
            id: "usr-dron-01",
            nombre: "BioScout Micro I",
            modelo: "Micro-Agro 2026",
            categoria: "Micro dron",
            imagen: "src/img/DJI_FlyCart_30.png",
            estado: "Operativo",
            bateria: 92,
            horasVuelo: 14.5,
            ultimaRevision: "2026-07-10",
            numeroSerie: "SN-BIO-8821-X",
        },
        {
            id: "usr-dron-02",
            nombre: "AgroNano Pro V1",
            modelo: "Invernadero-Scan",
            categoria: "Micro dron",
            imagen: "src/img/Freefly_Alta_X.png",
            estado: "En mantenimiento",
            bateria: 45,
            horasVuelo: 32.0,
            ultimaRevision: "2026-06-28",
            numeroSerie: "SN-BIO-9942-Y",
        }
    ];

    const catalogoDrones: Drone[] = [
        {
            id: "micro-1",
            nombre: "BioScout Micro II",
            etiqueta: "Inspección Rápida",
            categoria: "micro",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 45,000",
            descripcion: "Micro dron ultraligero para mapeo sensorizado rápido y evaluación fotométrica básica de parcelas.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "250 g",
                "Tiempo de vuelo": "28 min",
                "Velocidad máxima": "45 km/h",
                "Alcance": "6 km",
                "Resistencia al viento": "8 m/s",
                "Sensor": "Multiespectral Ligero",
            },
        },
        {
            id: "micro-2",
            nombre: "AgroNano Pro",
            etiqueta: "Mapeo Micro",
            categoria: "micro",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 62,000",
            descripcion: "Diseñado para inspección foliar cercana en invernaderos y cultivos protegidos de alta precisión.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "450 g",
                "Tiempo de vuelo": "22 min",
                "Velocidad máxima": "50 km/h",
                "Alcance": "4 km",
                "Resistencia al viento": "9 m/s",
                "Sensor": "Térmico Dual / RGB",
            },
        },
        {
            id: "mini-1",
            nombre: "BioHawk Mini",
            etiqueta: "Monitoreo Agrícola",
            categoria: "mini",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 115,000",
            descripcion: "Dron compacto para supervisión de parcelas medianas y análisis de índice de vegetación NDVI.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "1.2 kg",
                "Tiempo de vuelo": "35 min",
                "Velocidad máxima": "60 km/h",
                "Alcance": "10 km",
                "Resistencia al viento": "12 m/s",
                "Sensor": "RGB + NDVI HD",
            },
        },
        {
            id: "mini-2",
            nombre: "FieldCam Mini X",
            etiqueta: "Mapeo Térmico",
            categoria: "mini",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 135,000",
            descripcion: "Especializado en detección de humedad y detección temprana de plagas en terrenos agrícolas.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "1.5 kg",
                "Tiempo de vuelo": "32 min",
                "Velocidad máxima": "58 km/h",
                "Alcance": "8 km",
                "Resistencia al viento": "10 m/s",
                "Sensor": "Térmico Alta Resolución",
            },
        },
        {
            id: "pequeno-1",
            nombre: "AgroSpray Small-V",
            etiqueta: "Aspersión Focalizada",
            categoria: "pequeno",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 240,000",
            descripcion: "Unidad de aspersión agrícola de tamaño reducido para fumigación precisa en zonas difíciles.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "10 Litros",
                "Tiempo de vuelo": "20 min",
                "Velocidad máxima": "40 km/h",
                "Alcance": "5 km",
                "Resistencia al viento": "10 m/s",
                "Sensor": "Radar Obstáculos 360",
            },
        },
        {
            id: "pequeno-2",
            nombre: "GeoMapper S-200",
            etiqueta: "Fotogrametría",
            categoria: "pequeno",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 210,000",
            descripcion: "Aeronave de precisión topográfica para levantamientos 3D de alta exactitud centimétrica.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "3 kg",
                "Tiempo de vuelo": "45 min",
                "Velocidad máxima": "65 km/h",
                "Alcance": "12 km",
                "Resistencia al viento": "14 m/s",
                "Sensor": "RTK / PPK L1/L2",
            },
        },
        {
            id: "grande-1",
            nombre: "MegaTitan Agro-40",
            etiqueta: "Aspersión Pesada",
            categoria: "grande",
            imagen: "src/img/Freefly_Alta_X.png",
            precio: "L 580,000",
            descripcion: "Dron industrial de alto rendimiento para aspersión masiva y fertilización de gran escala.",
            destacado: true,
            especificaciones: {
                "Capacidad de carga": "40 Litros",
                "Tiempo de vuelo": "18 min (Carga máx)",
                "Velocidad máxima": "50 km/h",
                "Alcance": "7 km",
                "Resistencia al viento": "15 m/s",
                "Sensor": "Lidar + Radar Matriz",
            },
        },
        {
            id: "grande-2",
            nombre: "AeroWing Heavy Cargo",
            etiqueta: "Ala Fija / Carga",
            categoria: "grande",
            imagen: "src/img/DJI_FlyCart_30.png",
            precio: "L 720,000",
            descripcion: "Aeronave de ala fija híbrida para transporte pesado de muestras y cobertura de miles de hectáreas.",
            destacado: false,
            especificaciones: {
                "Capacidad de carga": "25 kg",
                "Tiempo de vuelo": "90 min",
                "Velocidad máxima": "90 km/h",
                "Alcance": "50 km",
                "Resistencia al viento": "18 m/s",
                "Sensor": "Telemetría Industrial",
            },
        },
    ];

    const dronesFiltrados = catalogoDrones.filter(d => d.categoria === selectedCategory);

    // ---------------- HANDLERS ----------------
    const handlePilotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const resetPilotForm = () => {
        setIsPilotModalOpen(false);
        setIsSubmitted(false);
        setPilotFormData({
            email: "carlos.mendoza@agrodrone.hn",
            password: "password123",
            ahacCode: "AHAC-PIL-2026-88",
        });
    };

    const handleConfirmPurchase = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            setTimeout(() => {
                setPaymentSuccess(false);
                setSelectedDroneForCheckout(null);
                setActiveMainTab("mis-drones");
            }, 1800);
        }, 1200);
    };

    const iniciarCompra = (drone: Drone) => {
        setSelectedDroneForCheckout(drone);
        setSelectedDrone(null);
    };

    const handleSendSupportRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!supportDrone) return;
        setSupportSubmitted(true);
    };

    const closeSupportModal = () => {
        setSupportDrone(null);
        setSupportSubmitted(false);
    };

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif" }} className="p-3 max-w-md mx-auto flex flex-col gap-4 text-left min-h-screen">
            {/* CABECERA PRINCIPAL Y PESTAÑAS */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex flex-col gap-3 mb-4">
                    <div>
                        <Title className="text-lg font-extrabold text-gray-900 tracking-tight flex flex-col items-start gap-1.5">
                            <span>Adquisición y Estado de Drones</span>
                            <span 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="whitespace-nowrap bg-[#0E5E6F]/10 text-[#0E5E6F] text-[10px] font-bold px-2 py-0.5 tracking-wider border border-[#0E5E6F]/20"
                            >
                                Catálogo oficial
                            </span>
                        </Title>
                        <Text className="text-[11px] text-gray-500 mt-1 block">
                            Supervisa tu flota actual de aeronaves o explora el catálogo homologado para operar dentro de la plataforma.
                        </Text>
                    </div>

                    <button
                        onClick={() => setIsPilotModalOpen(true)}
                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-4 shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Award size={16} />
                        <span>Cambiar a cuenta Piloto</span>
                    </button>
                </div>

                {!selectedDroneForCheckout && (
                    <div className="flex items-center gap-2 border-b border-gray-200">
                        <button
                            onClick={() => setActiveMainTab("mis-drones")}
                            style={{ borderRadius: "4px 4px 0 0", fontFamily: "'Roboto', sans-serif" }}
                            className={`flex-1 pb-3 px-2 font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeMainTab === "mis-drones"
                                    ? "text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                    : "text-gray-500 hover:text-gray-800"
                            }`}
                        >
                            <Plane size={16} />
                            <span>Estado de dron ({misDronesComprados.length})</span>
                        </button>

                        <button
                            onClick={() => setActiveMainTab("comprar")}
                            style={{ borderRadius: "4px 4px 0 0", fontFamily: "'Roboto', sans-serif" }}
                            className={`flex-1 pb-3 px-2 font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                activeMainTab === "comprar"
                                    ? "text-[#0E5E6F] border-b-2 border-[#0E5E6F]"
                                    : "text-gray-500 hover:text-gray-800"
                            }`}
                        >
                            <ShoppingBag size={16} />
                            <span>Comprar drones</span>
                        </button>
                    </div>
                )}
            </div>

            {/* ZONA DE COMPRA: CHECKOUT */}
            {selectedDroneForCheckout ? (
                <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedDroneForCheckout(null)}
                        className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 w-fit cursor-pointer bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-[4px] border border-gray-200 transition"
                    >
                        <ArrowLeft size={14} /> Volver a selección de catálogo
                    </button>

                    {paymentSuccess ? (
                        <div className="bg-emerald-50 border border-emerald-300 rounded-[4px] p-5 text-center flex flex-col items-center justify-center gap-2 my-2">
                            <div className="p-2.5 bg-emerald-500 text-white rounded-[4px]">
                                <Check size={24} />
                            </div>
                            <Title as="h2" className="text-lg font-black text-emerald-950">
                                ¡Compra Procesada con Éxito!
                            </Title>
                            <Text className="text-xs text-emerald-800 font-medium max-w-md block">
                                Tu solicitud ha sido registrada correctamente para el equipo <strong>{selectedDroneForCheckout.nombre}</strong>.
                            </Text>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3 items-stretch">
                            {/* RESUMEN DEL DRON */}
                            <div className="bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    <Title
                                        as="h3"
                                        className="text-xs font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2"
                                    >
                                        Resumen de la Orden
                                    </Title>

                                    <div className="bg-gray-50 p-2.5 rounded-[4px] border border-gray-200 flex flex-col gap-1 mb-2">
                                        <div className="flex gap-3 mb-2">
                                            <div className="w-20 h-20 bg-gray-200 rounded shrink-0 border border-gray-300 overflow-hidden">
                                                <img src={selectedDroneForCheckout.imagen} alt="drone" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-[#0E5E6F] bg-[#0E5E6F]/10 px-2 py-0.5 rounded-[4px] border border-[#0E5E6F]/20 w-fit block mb-1">
                                                    {selectedDroneForCheckout.etiqueta}
                                                </span>
                                                <Title
                                                    as="h2"
                                                    className="text-base font-black text-gray-900 leading-tight"
                                                >
                                                    {selectedDroneForCheckout.nombre}
                                                </Title>
                                            </div>
                                        </div>
                                        
                                        <Text className="text-[11px] text-gray-600 block leading-tight mb-2">
                                            {selectedDroneForCheckout.descripcion}
                                        </Text>
                                        
                                        <div className="mt-1.5 pt-1.5 border-t border-gray-200 flex justify-between items-baseline">
                                            <span className="text-[11px] text-gray-500">
                                                Total a pagar:
                                            </span>
                                            <span className="text-lg font-black text-[#0E5E6F]">
                                                {selectedDroneForCheckout.precio}
                                            </span>
                                        </div>
                                    </div>

                                    <Text className="text-[10px] text-gray-700 block mb-1 font-bold">
                                        Especificaciones del equipo:
                                    </Text>
                                    <ul className="flex flex-col gap-1 text-[11px] text-gray-600">
                                        {Object.entries(selectedDroneForCheckout.especificaciones).map(
                                            ([key, val]: any, idx: number) => (
                                                <li key={idx} className="flex items-center gap-1.5">
                                                    <CheckCircle2
                                                        size={12}
                                                        className="text-[#0E5E6F] shrink-0"
                                                    />
                                                    <span><strong>{key}:</strong> {val}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                <div className="p-2 bg-amber-50 border border-amber-200 rounded-[4px] flex items-center gap-1.5 text-amber-900 text-[10px]">
                                    <ShieldCheck size={14} className="text-amber-600 shrink-0" />
                                    <span>Garantía de hardware y soporte comercial de la red BIODRON.</span>
                                </div>
                            </div>

                            {/* FORMULARIO DE PAGO */}
                            <div className="bg-white border border-gray-200 rounded-[4px] p-3.5 shadow-xs flex flex-col justify-between gap-2">
                                <div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-gray-100 rounded-[4px] border border-gray-200 mb-2.5">
                                        <button
                                            onClick={() => setPaymentMethod("card")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "card"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <CreditCard size={13} />
                                            <span>Tarjeta</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("transfer")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "transfer"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Building2 size={13} />
                                            <span>Bancos</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("qr")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "qr"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <QrCode size={13} />
                                            <span>Código QR</span>
                                        </button>

                                        <button
                                            onClick={() => setPaymentMethod("wallet")}
                                            className={`py-1 px-2 rounded-[4px] text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${paymentMethod === "wallet"
                                                    ? "bg-[#0E5E6F] text-white shadow-xs font-bold"
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                                                }`}
                                        >
                                            <Wallet size={13} />
                                            <span>Saldo BIODRON</span>
                                        </button>
                                    </div>

                                    {/* TARJETA */}
                                    {paymentMethod === "card" && (
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Pasarela de pago:</span>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                                    {["PixelPay", "ClinPays", "Recurrente", "Pagadito"].map((gateway) => (
                                                        <button
                                                            key={gateway}
                                                            onClick={() => setSelectedGateway(gateway)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedGateway === gateway
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {gateway}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                                <div className="sm:col-span-5 flex justify-center">
                                                    <div className="w-full max-w-[190px] aspect-[1.58/1] bg-gradient-to-tr from-slate-900 via-slate-800 to-[#0E5E6F] text-white p-2.5 rounded-[4px] shadow-sm border border-slate-700 flex flex-col justify-between">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-300">
                                                                BIODRON
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

                                                <div className="sm:col-span-7 grid grid-cols-2 gap-1.5 text-[11px]">
                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Número de tarjeta</label>
                                                        <input
                                                            type="text"
                                                            maxLength={16}
                                                            placeholder="4000 0000 0000 0000"
                                                            value={cardData.number}
                                                            onChange={(e) => setCardData({ ...cardData, number: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Titular de la tarjeta</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre impreso"
                                                            value={cardData.name}
                                                            onChange={(e) => setCardData({ ...cardData, name: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">Vencimiento</label>
                                                        <input
                                                            type="text"
                                                            maxLength={5}
                                                            placeholder="MM/AA"
                                                            value={cardData.expiry}
                                                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value }) }
                                                            className="p-1 bg-gray-50 border border-gray-200 rounded-[4px] text-[11px] focus:outline-none focus:border-[#0E5E6F]"
                                                        />
                                                    </div>

                                                    <div className="flex flex-col gap-0.5">
                                                        <label className="text-gray-700 text-[10px]">CVV</label>
                                                        <input
                                                            type="password"
                                                            maxLength={4}
                                                            placeholder="123"
                                                            value={cardData.cvv}
                                                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value }) }
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
                                                <span className="text-gray-800 text-[11px] block mb-1">Cuentas oficiales BIODRON</span>
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
                                            <div className="border border-dashed border-gray-300 rounded-[4px] p-2.5 text-center flex items-center justify-center gap-2 hover:border-[#0E5E6F] transition cursor-pointer bg-gray-50/50">
                                                <Upload size={16} className="text-[#0E5E6F]" />
                                                <span className="text-gray-700 text-[11px]">Subir comprobante de pago</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* QR */}
                                    {paymentMethod === "qr" && (
                                        <div className="flex flex-col items-center gap-3 bg-gray-50 border border-gray-200 rounded-[4px] p-3">
                                            <div className="flex-1 w-full">
                                                <span className="text-gray-700 text-[10px] block mb-1.5">Generar código mediante:</span>
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {["PixelPay", "Banrural", "Atlántida"].map((wallet) => (
                                                        <button
                                                            key={wallet}
                                                            onClick={() => setSelectedQrWallet(wallet)}
                                                            className={`py-1 px-2 rounded-[4px] text-[10px] font-bold border transition cursor-pointer ${selectedQrWallet === wallet
                                                                    ? "bg-[#0E5E6F] text-white border-[#0E5E6F]"
                                                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                                                                }`}
                                                        >
                                                            {wallet}
                                                        </button>
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-gray-500 leading-tight block">
                                                    Escanea este código desde la app de <strong>{selectedQrWallet}</strong> para pagar el total de {selectedDroneForCheckout.precio}.
                                                </span>
                                            </div>
                                            <div className="shrink-0 p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                                                <QrCode size={64} className="text-gray-800" />
                                            </div>
                                        </div>
                                    )}

                                    {/* WALLET */}
                                    {paymentMethod === "wallet" && (
                                        <div className="flex flex-col gap-2 text-xs">
                                            <div className="bg-gray-50 border border-gray-200 rounded-[4px] p-2.5 flex justify-between items-center">
                                                <div>
                                                    <span className="text-gray-500 font-medium block text-[10px]">
                                                        Saldo disponible BIODRON
                                                    </span>
                                                    <span className="text-lg font-black text-gray-900">
                                                        L {userWalletBalance.toLocaleString("es-HN", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <div className="p-2 bg-[#0E5E6F]/10 text-[#0E5E6F] rounded-[4px]">
                                                    <Wallet size={18} />
                                                </div>
                                            </div>

                                            {userWalletBalance < getPrecioNum(selectedDroneForCheckout.precio) ? (
                                                <div className="p-1.5 bg-red-50 border border-red-200 rounded-[4px] flex items-center gap-1.5 text-red-800 text-[11px]">
                                                    <AlertCircle size={14} className="shrink-0 text-red-600" />
                                                    <span>
                                                        Saldo insuficiente. Faltan L {(getPrecioNum(selectedDroneForCheckout.precio) - userWalletBalance).toLocaleString("es-HN")}.
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="p-1.5 bg-emerald-50 border border-emerald-200 rounded-[4px] flex items-center gap-1.5 text-emerald-800 text-[11px]">
                                                    <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                                                    <span>Saldo suficiente para procesar la transacción.</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={
                                        isProcessing ||
                                        (paymentMethod === "wallet" && userWalletBalance < getPrecioNum(selectedDroneForCheckout.precio))
                                    }
                                    onClick={handleConfirmPurchase}
                                    className="w-full py-2 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] disabled:bg-gray-300 text-white text-xs rounded-[4px] shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                >
                                    {isProcessing ? (
                                        <span>Procesando...</span>
                                    ) : (
                                        <>
                                            <ShieldCheck size={15} />
                                            <span>
                                                Confirmar compra por {selectedDroneForCheckout.precio}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* ESTADO DE DRON */
                activeMainTab === "mis-drones" ? (
                    <div className="space-y-6">
                        {misDronesComprados.length === 0 ? (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-gray-50 border-2 border-dashed border-gray-200 p-10 text-center flex flex-col items-center justify-center"
                            >
                                <Plane className="w-12 h-12 text-gray-300 mb-2" />
                                <h3 className="font-bold text-gray-700 text-sm">No tienes drones vinculados a tu cuenta</h3>
                                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                                    Puedes adquirir unidades micro autorizadas o solicitar la conversión a Piloto para adquirir aeronaves de mayor escala.
                                </p>
                                <button
                                    onClick={() => setActiveMainTab("comprar")}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-4 px-4 py-2 bg-[#0E5E6F] text-white font-bold text-xs shadow-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Explorar Catálogo
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5">
                                {misDronesComprados.map((drone) => (
                                    <div 
                                        key={drone.id} 
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="bg-white border border-gray-200 shadow-xs overflow-hidden flex flex-col"
                                    >
                                        {/* IMAGEN CON INSIGNIAS SUPERPUESTAS */}
                                        <div className="relative h-40 bg-gray-100 overflow-hidden border-b border-gray-100">
                                            <span 
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="absolute top-2 left-2 z-10 text-[10px] font-bold text-[#0E5E6F] bg-white/95 backdrop-blur-xs border border-[#0E5E6F]/20 px-2.5 py-0.5 tracking-wider shadow-xs"
                                            >
                                                {drone.categoria}
                                            </span>
                                            <span 
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className={`absolute top-2 right-2 z-10 text-[10px] font-bold px-2.5 py-1 border shadow-xs ${
                                                    drone.estado === "Operativo"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                                }`}
                                            >
                                                {drone.estado}
                                            </span>
                                            <img 
                                                src={drone.imagen} 
                                                alt={drone.nombre} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>

                                        <div className="p-4 flex flex-col gap-3">
                                            <div>
                                                <h3 className="font-extrabold text-gray-900 text-base leading-tight">{drone.nombre}</h3>
                                                <p className="text-[11px] text-gray-400 font-mono mt-0.5">N/S: {drone.numeroSerie}</p>
                                            </div>

                                            {/* BATERÍA COMO BARRA DE PROGRESO */}
                                            <div 
                                                style={{ borderRadius: "4px" }}
                                                className="bg-gray-50 border border-gray-200 p-2.5"
                                            >
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                                                        <Battery size={13} className="text-emerald-600" />
                                                        <span>Batería restante</span>
                                                    </div>
                                                    <span className="text-xs font-black text-gray-800">{drone.bateria}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${drone.bateria > 60 ? "bg-emerald-500" : drone.bateria > 30 ? "bg-amber-500" : "bg-red-500"}`}
                                                        style={{ width: `${drone.bateria}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* DETALLES EN LISTA VERTICAL */}
                                            <div className="flex flex-col divide-y divide-gray-100 bg-gray-50/80 rounded-[4px] border border-gray-200/80 overflow-hidden">
                                                <div className="flex items-center gap-2.5 px-3 py-2.5">
                                                    <div className="p-1.5 bg-white rounded-[4px] border border-gray-200 shrink-0">
                                                        <Radio size={14} className="text-[#0E5E6F]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase text-gray-400 leading-none">Horas de vuelo</span>
                                                        <span className="text-xs font-bold text-gray-800 mt-1">{drone.horasVuelo} hrs</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2.5 px-3 py-2.5">
                                                    <div className="p-1.5 bg-white rounded-[4px] border border-gray-200 shrink-0">
                                                        <Calendar size={14} className="text-[#0E5E6F]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] uppercase text-gray-400 leading-none">Última revisión técnica</span>
                                                        <span className="text-xs font-bold text-gray-800 mt-1">{drone.ultimaRevision}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BOTÓN SOLICITAR AYUDA TÉCNICA */}
                                            <button
                                                onClick={() => {
                                                    setSupportDrone(drone);
                                                    setSupportSubmitted(false);
                                                }}
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="w-full py-2.5 px-3 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                                            >
                                                <Headphones size={14} />
                                                <span>Solicitar ayuda técnica</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* COMPRAR DRONES */
                    <div className="space-y-6">
                        <div>
                            <div className="mb-6">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                    Categoría de dron
                                </label>
                                <div className="relative flex items-center gap-2">
                                    <div
                                        style={{ borderRadius: "4px" }}
                                        className="shrink-0 w-10 h-10 flex items-center justify-center bg-[#0E5E6F]/10 border border-[#0E5E6F]/20 text-[#0E5E6F]"
                                    >
                                        {selectedCategory === "micro" && <Zap size={16} />}
                                        {selectedCategory === "mini" && <Tag size={16} />}
                                        {selectedCategory === "pequeno" && <Wrench size={16} />}
                                        {selectedCategory === "grande" && <UserCheck size={16} />}
                                    </div>
                                    <div className="relative flex-1">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value as any)}
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="w-full appearance-none bg-white border-2 border-gray-200 text-gray-900 font-bold text-[12px] py-2.5 pl-3 pr-9 cursor-pointer outline-none focus:border-[#0E5E6F] transition-all"
                                        >
                                            <option value="micro">Micro drones</option>
                                            <option value="mini">Mini drones</option>
                                            <option value="pequeno">Drones pequeños</option>
                                            <option value="grande">Drones grandes</option>
                                        </select>
                                        <ChevronDown
                                            size={15}
                                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                {selectedCategory === "micro" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Micro drones ultraligeros y compactos habilitados para compra directa de clientes y tareas de inspección rápida.
                                    </Text>
                                )}
                                {selectedCategory === "mini" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Mini drones avanzados de alta estabilidad para monitoreo de cultivos extensivos. Requiere cuenta de piloto registrada.
                                    </Text>
                                )}
                                {selectedCategory === "pequeno" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Drones pequeños de carga y aspersión agrícola de precisión. Requiere cuenta de piloto verificada.
                                    </Text>
                                )}
                                {selectedCategory === "grande" && (
                                    <Text className="text-xs text-gray-500 block font-normal">
                                        Megadrones industriales y de ala fija de largo alcance para operaciones pesadas. Requiere validación AHAC.
                                    </Text>
                                )}
                            </div>
                        </div>

                        {selectedCategory !== "micro" ? (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-amber-50 border border-amber-300 p-4 text-amber-900 shadow-sm flex flex-col gap-4"
                            >
                                <div className="flex gap-3 items-start">
                                    <div 
                                        style={{ borderRadius: "4px" }}
                                        className="p-2.5 bg-amber-500 text-white shrink-0 shadow-sm"
                                    >
                                        <ShieldAlert size={20} />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                            <Title as="h3" className="font-bold text-sm text-amber-950">
                                                Restricción de Compra: Requiere Cuenta de Piloto
                                            </Title>
                                            <span 
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="bg-amber-200 text-amber-900 text-[10px] font-black px-2 py-0.5"
                                            >
                                                Licencia AHAC
                                            </span>
                                        </div>
                                        <Text className="text-xs text-amber-800 font-medium leading-relaxed">
                                            Como cliente solo puedes adquirir <strong>Micro Drones</strong>. Para comprar aeronaves en la categoría <strong>{selectedCategory.toUpperCase()}</strong> debes solicitar la conversión a una <strong>Cuenta de Piloto Registrado</strong>.
                                        </Text>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsPilotModalOpen(true)}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-4 shadow-sm transition flex items-center justify-center gap-2 border border-amber-700 cursor-pointer"
                                >
                                    <Award size={15} />
                                    <span>Cambiar a cuenta Piloto</span>
                                </button>
                            </div>
                        ) : (
                            <div 
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="bg-emerald-50 border border-emerald-200 p-3.5 text-emerald-900 flex items-center gap-2.5"
                            >
                                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                                <Text className="text-xs font-medium text-emerald-800">
                                    <strong>Categoría Habilitada:</strong> Puedes adquirir Micro Drones libremente para tareas de inspección técnica ligera.
                                </Text>
                            </div>
                        )}

                        {/* LISTA DE DRONES */}
                        <div className="grid grid-cols-1 gap-5">
                            {dronesFiltrados.map((drone) => (
                                <div
                                    key={drone.id}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className={`relative bg-white border transition-all flex flex-col overflow-hidden shadow-sm ${
                                        drone.destacado
                                            ? "border-[#0E5E6F] ring-2 ring-[#0E5E6F]/15"
                                            : "border-gray-200"
                                    }`}
                                >
                                    {/* CINTA DE DESTACADO INTEGRADA */}
                                    {drone.destacado && (
                                        <div className="bg-[#0E5E6F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
                                            <Zap size={12} /> Destacado
                                        </div>
                                    )}

                                    <div className="relative bg-gray-100 border-b border-gray-200 w-full h-44 shrink-0 overflow-hidden">
                                        <span 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-xs text-gray-800 border border-gray-200 text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-xs"
                                        >
                                            {drone.etiqueta}
                                        </span>

                                        <img
                                            src={drone.imagen}
                                            alt={drone.nombre}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLElement).style.display = "none";
                                            }}
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col gap-3">
                                        <div>
                                            <Title as="h3" className="text-base font-extrabold text-gray-900 leading-tight">
                                                {drone.nombre}
                                            </Title>
                                            <Text className="text-xs text-gray-600 line-clamp-2 font-medium leading-relaxed block mt-1">
                                                {drone.descripcion}
                                            </Text>
                                        </div>

                                        {/* BLOQUE DE PRECIO DESTACADO */}
                                        <div
                                            className={`rounded-[4px] px-3.5 py-3 flex items-baseline justify-between border ${drone.destacado
                                                    ? "bg-[#0E5E6F]/5 border-[#0E5E6F]/20"
                                                    : "bg-gray-50 border-gray-200"
                                                }`}
                                        >
                                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                                                Precio comercial
                                            </span>
                                            <span className="text-xl font-black text-[#0E5E6F]">
                                                {drone.precio}
                                            </span>
                                        </div>

                                        {/* SPECS EN TRÍO COMPACTO */}
                                        <div 
                                            style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                            className="bg-gray-50 p-2.5 border border-gray-200 grid grid-cols-3 gap-1.5 text-xs"
                                        >
                                            <div className="flex flex-col items-center text-center gap-0.5">
                                                <span className="font-medium text-gray-400 text-[9px] leading-tight">Carga</span>
                                                <span className="font-bold text-gray-800 text-[11px] leading-tight">{drone.especificaciones["Capacidad de carga"]}</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center gap-0.5 border-x border-gray-200">
                                                <span className="font-medium text-gray-400 text-[9px] leading-tight">T. vuelo</span>
                                                <span className="font-bold text-gray-800 text-[11px] leading-tight">{drone.especificaciones["Tiempo de vuelo"]}</span>
                                            </div>
                                            <div className="flex flex-col items-center text-center gap-0.5">
                                                <span className="font-medium text-gray-400 text-[9px] leading-tight">Vel. máx</span>
                                                <span className="font-bold text-gray-800 text-[11px] leading-tight">{drone.especificaciones["Velocidad máxima"]}</span>
                                            </div>
                                        </div>

                                        {/* CTA APILADOS A ANCHO COMPLETO */}
                                        <div className="flex flex-col gap-2 pt-1 border-t border-gray-100 mt-1">
                                            {selectedCategory === "micro" ? (
                                                <button
                                                    onClick={() => iniciarCompra(drone)}
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className="w-full py-2.5 px-4 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <ShoppingBag size={14} />
                                                    Comprar
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setIsPilotModalOpen(true)}
                                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                    className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <Lock size={14} />
                                                    Requiere cuenta Piloto
                                                </button>
                                            )}

                                            <button
                                                onClick={() => setSelectedDrone(drone)}
                                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition border border-gray-200 flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <Info size={14} />
                                                Ficha técnica
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* BOTTOM SHEET DE SOLICITUD DE AYUDA TÉCNICA (CON CONFIRMACIÓN INTERNA) */}
            {supportDrone && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center text-left overscroll-none">
                    <div 
                        style={{ borderRadius: "16px 16px 0 0" }}
                        className="bg-white w-full max-h-[85dvh] overflow-y-auto overscroll-contain border-t border-gray-200 shadow-2xl p-5 pb-6 space-y-4 animate-in fade-in slide-in-from-bottom duration-200 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Headphones className="text-[#0E5E6F]" size={20} />
                                <h3 className="font-extrabold text-base text-gray-900">Solicitud de Ayuda Técnica</h3>
                            </div>
                            <button 
                                onClick={closeSupportModal} 
                                style={{ borderRadius: "4px" }}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!supportSubmitted ? (
                            <form onSubmit={handleSendSupportRequest} className="space-y-4">
                                {/* INFORMACIÓN RESUMIDA DEL DRON */}
                                <div className="bg-gray-50 p-3 rounded-[4px] border border-gray-200 flex items-center gap-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded shrink-0 border border-gray-300 overflow-hidden">
                                        <img src={supportDrone.imagen} alt={supportDrone.nombre} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-xs space-y-0.5">
                                        <p className="font-extrabold text-gray-900">{supportDrone.nombre}</p>
                                        <p className="text-gray-500">Modelo: <span className="font-medium text-gray-700">{supportDrone.modelo}</span></p>
                                        <p className="text-gray-500 font-mono text-[11px]">N/S: {supportDrone.numeroSerie}</p>
                                        <p className="text-gray-500">
                                            Estado: <span className="font-bold text-gray-700">{supportDrone.estado}</span> | Batería: <span className="font-bold text-gray-700">{supportDrone.bateria}%</span>
                                        </p>
                                    </div>
                                </div>

                                {/* CAMPO DE LA RAZÓN DE LA PETICIÓN */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">
                                        Razón de la petición
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={supportReason}
                                        onChange={(e) => setSupportReason(e.target.value)}
                                        placeholder="Describe brevemente el problema o requerimiento técnico..."
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full px-4 py-2.5 bg-[#0E5E6F] hover:bg-[#0A4552] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Send size={14} /> Enviar Solicitud
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeSupportModal}
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full px-4 py-2.5 border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* VISTA DE CONFIRMACIÓN DENTRO DEL MISMO MODAL */
                            <div className="py-4 text-center space-y-3 animate-in fade-in duration-200">
                                <div 
                                    style={{ borderRadius: "9999px" }}
                                    className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 size={28} />
                                </div>
                                <h4 className="font-extrabold text-base text-gray-900">¡Solicitud Enviada Exitosamente!</h4>
                                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                                    Hemos recibido la solicitud para el equipo <strong>{supportDrone.nombre}</strong>. Pronto un técnico se pondrá en contacto contigo.
                                </p>
                                <button
                                    onClick={closeSupportModal}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-3 w-full px-5 py-2.5 bg-[#0E5E6F] text-white font-bold text-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Entendido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* BOTTOM SHEET DE FICHA TÉCNICA */}
            {selectedDrone && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center animate-in fade-in duration-200 text-left overscroll-none">
                    <div 
                        style={{ borderRadius: "16px 16px 0 0" }}
                        className="bg-white w-full max-h-[85dvh] border-t border-gray-200 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-200 overscroll-contain"
                    >
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1 shrink-0" />

                        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
                            <div className="flex items-center gap-2 min-w-0">
                                <Title as="h2" className="text-base font-black text-gray-900 truncate">
                                    {selectedDrone.nombre}
                                </Title>
                                <span 
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="text-[10px] font-black tracking-wider bg-[#0E5E6F]/10 text-[#0E5E6F] px-2 py-0.5 border border-[#0E5E6F]/20 shrink-0"
                                >
                                    {selectedDrone.etiqueta}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedDrone(null)}
                                style={{ borderRadius: "4px" }}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer shrink-0"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <div className="p-4 flex flex-col gap-4">
                                <div 
                                    style={{ borderRadius: "4px" }}
                                    className="flex flex-col bg-gray-50 border border-gray-200 overflow-hidden"
                                >
                                    <div className="relative w-full h-48 bg-gray-100">
                                        <img
                                            src={selectedDrone.imagen}
                                            alt={selectedDrone.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-3.5 bg-white border-t border-gray-200">
                                        <Text className="text-[10px] text-gray-400 font-extrabold block">
                                            Precio Comercial
                                        </Text>
                                        <Text className="text-xl font-black text-[#0E5E6F] block mb-1">
                                            {selectedDrone.precio}
                                        </Text>
                                        <Text className="text-xs text-gray-600 font-medium leading-relaxed block">
                                            {selectedDrone.descripcion}
                                        </Text>
                                    </div>
                                </div>

                                <div>
                                    <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 block">
                                        Especificaciones Técnicas
                                    </Text>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(selectedDrone.especificaciones).map(
                                            ([clave, valor]: any) => (
                                                <div
                                                    key={clave}
                                                    style={{ borderRadius: "4px" }}
                                                    className="p-2.5 bg-gray-50 border border-gray-200 flex flex-col justify-center"
                                                >
                                                    <span className="text-[9px] text-gray-400 font-bold truncate">
                                                        {clave}
                                                    </span>
                                                    <span className="text-xs font-bold text-gray-800 truncate">
                                                        {valor}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {selectedCategory !== "micro" && (
                                    <div 
                                        style={{ borderRadius: "4px" }}
                                        className="p-2.5 bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-amber-900 text-[11px] font-medium"
                                    >
                                        <ShieldAlert size={16} className="shrink-0 text-amber-600" />
                                        <span>Requiere Cuenta de Piloto verificada para la compra.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col gap-2 shrink-0">
                            {selectedCategory === "micro" ? (
                                <button
                                    onClick={() => iniciarCompra(selectedDrone)}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="w-full px-4 py-2.5 bg-[#0E5E6F] hover:bg-[#0A4552] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <ShoppingBag size={14} />
                                    Comprar
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSelectedDrone(null);
                                        setIsPilotModalOpen(true);
                                    }}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Lock size={14} />
                                    Requiere cuenta Piloto
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedDrone(null)}
                                style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                className="w-full px-4 py-2.5 border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* BOTTOM SHEET DE CAMBIO A CUENTA PILOTO */}
            {isPilotModalOpen && (
                <div style={{ fontFamily: "'Roboto', sans-serif" }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center overscroll-none">
                    <div 
                        style={{ borderRadius: "16px 16px 0 0" }}
                        className="bg-white w-full max-h-[85dvh] overflow-y-auto overscroll-contain border-t border-gray-200 shadow-2xl p-5 pb-6 space-y-4 animate-in fade-in slide-in-from-bottom duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Award className="text-amber-600" size={20} />
                                <h3 className="font-extrabold text-base text-gray-900">Solicitud de cuenta de Piloto</h3>
                            </div>
                            <button 
                                onClick={resetPilotForm} 
                                style={{ borderRadius: "4px" }}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!isSubmitted ? (
                            <form onSubmit={handlePilotSubmit} className="space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Para adquirir aeronaves de mayor categoría, ingresa tus credenciales y tu <strong>Código de la AHAC</strong> (Agencia Hondureña de Aeronáutica Civil).
                                </p>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        required
                                        value={pilotFormData.email}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, email: e.target.value })}
                                        placeholder="correo@ejemplo.com"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Contraseña</label>
                                    <input
                                        type="password"
                                        required
                                        value={pilotFormData.password}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, password: e.target.value })}
                                        placeholder="••••••••"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Código o Licencia AHAC</label>
                                    <input
                                        type="text"
                                        required
                                        value={pilotFormData.ahacCode}
                                        onChange={(e) => setPilotFormData({ ...pilotFormData, ahacCode: e.target.value.toUpperCase() })}
                                        placeholder="AHAC-PIL-2026-X"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full border border-gray-300 p-2.5 text-xs font-mono font-bold uppercase outline-none focus:border-[#0E5E6F] focus:ring-1 focus:ring-[#0E5E6F]"
                                    />
                                </div>

                                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Send size={14} /> Enviar Solicitud
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetPilotForm}
                                        style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                        className="w-full px-4 py-2.5 border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="py-4 text-center space-y-3">
                                <div 
                                    style={{ borderRadius: "9999px" }}
                                    className="w-12 h-12 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 size={28} />
                                </div>
                                <h4 className="font-extrabold text-base text-gray-900">¡Solicitud Enviada Exitosamente!</h4>
                                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                                    Tu solicitud ha sido enviada. Un <strong>administrador</strong> revisará tu código de la AHAC y se pondrá en contacto contigo en breve para completar la validación de tu cuenta.
                                </p>
                                <button
                                    onClick={resetPilotForm}
                                    style={{ borderRadius: "4px", fontFamily: "'Roboto', sans-serif" }}
                                    className="mt-3 w-full px-5 py-2.5 bg-[#0E5E6F] text-white font-bold text-xs hover:bg-[#0A4552] transition cursor-pointer"
                                >
                                    Entendido
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};