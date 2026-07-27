export const ClienteHistoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "vuelos" | "facturacion">("all");

  // Modales
  const [selectedVuelo, setSelectedVuelo] = useState<VueloItem | null>(null);
  const [selectedFactura, setSelectedFactura] = useState<FacturaItem | null>(null);

  // Paleta de colores Hexadecimales corporativos
  const HEX_COLORS = {
    brandGreen: "#0E5E6F",
    emerald100: "#D1FAE5",
    amber100: "#FEF3C7",
    blue100: "#DBEAFE",
    purple100: "#F3E8FF",
  };

  // Datos mockeados de Vuelos
  const historialVuelos: VueloItem[] = [
    {
      id: "V-2026-089",
      fecha: "18 Jul, 2026",
      ubicacion: "Zona Industrial Norte - Sector A",
      cobertura: "18.5 Ha",
      servicio: "Inspección Térmica de Estructuras",
      dron: "Matrice 300 RTK",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "80 metros",
        duracionVuelo: "42 minutos",
        resolucionGSD: "1.2 cm/px",
        condicionClimatica: "Despejado (Viento 8 km/h)",
      },
    },
    {
      id: "V-2026-082",
      fecha: "12 Jul, 2026",
      ubicacion: "Lote Las Camelias - Proyecto III",
      cobertura: "32.0 Ha",
      servicio: "Levantamiento Topográfico y Modelo 3D",
      dron: "Phantom 4 RTK",
      piloto: "Lic. Sofia Ramos",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "120 metros",
        duracionVuelo: "55 minutos",
        resolucionGSD: "2.1 cm/px",
        condicionClimatica: "Parcialmente nublado",
      },
    },
    {
      id: "V-2026-075",
      fecha: "02 Jul, 2026",
      ubicacion: "Perímetro Logístico Central",
      cobertura: "12.0 Ha",
      servicio: "Monitoreo Perimetral y Vigilancia Nocturna",
      dron: "Mavic 3 Enterprise Thermal",
      piloto: "Ing. Carlos Mendoza",
      estado: "Completado",
      reporteDisponible: true,
      detallesTecnicos: {
        alturaPromedio: "60 metros",
        duracionVuelo: "30 minutos",
        resolucionGSD: "1.8 cm/px",
        condicionClimatica: "Noche despejada",
      },
    },
    {
      id: "V-2026-068",
      fecha: "25 Jun, 2026",
      ubicacion: "Instalaciones Portuarias - Muelle B",
      cobertura: "25.0 Ha",
      servicio: "Mapeo Fotogramétrico de Activos",
      dron: "Matrice 300 RTK",
      piloto: "Tec. Jorge Salgado",
      estado: "Completado",
      reporteDisponible: false,
    },
  ];

  // Datos mockeados de Facturación
  const historialFacturacion: FacturaItem[] = [
    {
      id: "FAC-2026-041",
      fecha: "15 Jul, 2026",
      concepto: "Plan Corporativo Operativo (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Tarjeta Visa (•••• 4021)",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 2,434.78",
        impuesto: "L 365.22",
        numTransaccion: "TXN-9840219482",
      },
    },
    {
      id: "FAC-2026-033",
      fecha: "05 Jul, 2026",
      concepto: "Paquete Adicional de Horas de Vuelo Extra",
      tipo: "Servicio Extra",
      monto: "L 1,500.00",
      metodoPago: "Saldo Crédito",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 1,304.35",
        impuesto: "L 195.65",
        numTransaccion: "TXN-8812049102",
      },
    },
    {
      id: "FAC-2026-021",
      fecha: "15 Jun, 2026",
      concepto: "Plan Corporativo Operativo (Suscripción Mensual)",
      tipo: "Plan Mensual",
      monto: "L 2,800.00",
      metodoPago: "Transferencia Banco de Occidente",
      estado: "Pagado",
      detallesPago: {
        subtotal: "L 2,434.78",
        impuesto: "L 365.22",
        numTransaccion: "TXN-7730192841",
      },
    },
  ];

  // Filtrado simple
  const vuelosFiltrados = historialVuelos.filter(
    (v) =>
      v.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.dron.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const comprasFiltradas = historialFacturacion.filter(
    (f) =>
      f.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.metodoPago.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }} className="p-4 max-w-full mx-auto bg-white antialiased text-gray-800 space-y-4">
      {/* CABECERA PRINCIPAL */}
      <div className="pb-4 border-b-2 border-gray-100 flex flex-col gap-3 select-none">
        <div className="text-left space-y-0.5">
          <h1 className="text-lg font-black text-gray-900 tracking-tight">
            Historial de Reportes y Actividad
          </h1>
          <p className="text-gray-500 text-[11px] font-medium tracking-wide">
            Registro consolidado de misiones de vuelo, equipos desplegados, áreas intervenidas y compras.
          </p>
        </div>

        <button
          style={{
            backgroundColor: HEX_COLORS.brandGreen,
            borderRadius: "4px",
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-white text-xs font-bold transition-all shadow-xs hover:opacity-90 cursor-pointer w-full"
        >
          <Download size={15} />
          <span>Exportar historial (PDF)</span>
        </button>
      </div>

      {/* MÉTRICAS CLAVE / RESUMEN */}
      <div className="grid grid-cols-2 gap-3 text-left">
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 tracking-wider">
              Misiones Totales
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.blue100,
                color: "#1E40AF",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center shrink-0"
            >
              <Plane size={14} />
            </div>
          </div>
          <p className="text-lg font-black text-gray-900 mb-0.5 whitespace-nowrap">24 Operaciones</p>
          <p className="text-[9px] text-gray-400 font-semibold">Registros consolidados</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 tracking-wider">
              Área Cubierta
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center shrink-0"
            >
              <MapPin size={14} />
            </div>
          </div>
          <p className="text-lg font-black text-gray-900 mb-0.5 whitespace-nowrap">187.5 Ha</p>
          <p className="text-[9px] text-gray-400 font-semibold">Superficie analizada</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 tracking-wider">
              Reportes
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.purple100,
                color: "#6B21A8",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center shrink-0"
            >
              <FileText size={14} />
            </div>
          </div>
          <p className="text-lg font-black text-gray-900 mb-0.5 whitespace-nowrap">19 Archivos</p>
          <p className="text-[9px] text-gray-400 font-semibold">Documentos PDF listos</p>
        </div>

        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-500 tracking-wider">
              Suscripción
            </span>
            <div
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="p-1.5 flex items-center justify-center shrink-0"
            >
              <CreditCard size={14} />
            </div>
          </div>
          <p className="text-lg font-black text-gray-900 mb-0.5 whitespace-nowrap">Corporativo</p>
          <p className="text-[9px] text-gray-400 font-semibold">Plan de cobertura total</p>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-white border-2 border-gray-200 p-3 shadow-xs flex flex-col gap-3"
      >
        <div className="relative w-full">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar por zona, dron, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "4px" }}
            className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 text-xs focus:outline-none focus:border-[#0E5E6F] font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 w-full">
          {[
            { id: "all", label: "Todo" },
            { id: "vuelos", label: "Vuelos" },
            { id: "facturacion", label: "Facturas" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              style={{
                borderRadius: "4px",
                backgroundColor: filterType === tab.id ? HEX_COLORS.brandGreen : "#FFFFFF",
                color: filterType === tab.id ? "#FFFFFF" : "#0E5E6F",
                borderColor: HEX_COLORS.brandGreen,
              }}
              className="flex-1 px-3 py-2 text-xs font-bold border transition-all hover:opacity-90 cursor-pointer whitespace-nowrap"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECCIÓN 1: HISTORIAL DE VUELOS Y MISIONES */}
      {(filterType === "all" || filterType === "vuelos") && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs space-y-3 text-left"
        >
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div
                style={{
                  backgroundColor: HEX_COLORS.blue100,
                  color: "#1E40AF",
                  borderRadius: "4px",
                }}
                className="p-1.5 shrink-0"
              >
                <Plane size={16} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-black text-gray-900 tracking-wider">
                  Misiones Operacionales
                </h2>
                <p className="text-[10px] text-gray-500 font-medium">
                  Superficies, equipos y reportes técnicos.
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: HEX_COLORS.emerald100,
                color: "#065F46",
                borderRadius: "4px",
              }}
              className="text-[10px] font-bold px-2 py-1 border border-emerald-300 shrink-0 whitespace-nowrap"
            >
              {vuelosFiltrados.length}
            </span>
          </div>

          <div className="space-y-2">
            {vuelosFiltrados.map((vuelo) => (
              <div
                key={vuelo.id}
                style={{ borderRadius: "4px" }}
                className="border-2 border-gray-200 hover:border-gray-300 p-3 bg-gray-50/50 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    style={{ borderRadius: "4px" }}
                    className="p-2 bg-white border border-gray-300 text-[#0E5E6F] shrink-0 mt-0.5 shadow-2xs"
                  >
                    <MapPin size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-bold bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {vuelo.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <Calendar size={11} /> {vuelo.fecha}
                      </span>
                    </div>

                    <span
                      style={{
                        backgroundColor: HEX_COLORS.emerald100,
                        color: "#065F46",
                      }}
                      className="text-[10px] font-bold px-2 py-0.2 rounded-full inline-block mt-1"
                    >
                      {vuelo.cobertura}
                    </span>

                    <h3 className="text-xs font-black text-gray-900 truncate mt-1">
                      {vuelo.ubicacion}
                    </h3>

                    <div className="flex flex-col gap-0.5 mt-1 text-[11px] text-gray-600">
                      <span className="font-bold text-[#0E5E6F]">
                        {vuelo.servicio}
                      </span>
                      <span>
                        <strong className="text-gray-700">Equipo:</strong> {vuelo.dron}
                      </span>
                      <span>
                        <strong className="text-gray-700">Piloto:</strong> {vuelo.piloto}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-2 border-gray-200 shrink-0">
                  <span
                    style={{
                      backgroundColor: HEX_COLORS.emerald100,
                      color: "#065F46",
                      borderRadius: "4px",
                    }}
                    className="inline-flex items-center px-2 py-0.5 border border-emerald-300 text-[10px] font-bold"
                  >
                    {vuelo.estado}
                  </span>

                  {vuelo.reporteDisponible ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedVuelo(vuelo)}
                        style={{ borderRadius: "4px" }}
                        className="p-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Eye size={13} />
                        <span>Ver</span>
                      </button>
                      <button
                        style={{
                          backgroundColor: HEX_COLORS.brandGreen,
                          borderRadius: "4px",
                        }}
                        className="p-2 text-white transition-opacity hover:opacity-90 cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400 italic font-medium">
                      Procesando informe...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: HISTORIAL DE FACTURACIÓN Y PLANES */}
      {(filterType === "all" || filterType === "facturacion") && (
        <div
          style={{ borderRadius: "4px" }}
          className="bg-white border-2 border-gray-200 p-3 shadow-xs space-y-3 text-left"
        >
          <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div
                style={{
                  backgroundColor: HEX_COLORS.amber100,
                  color: "#92400E",
                  borderRadius: "4px",
                }}
                className="p-1.5 shrink-0"
              >
                <CreditCard size={16} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs font-black text-gray-900 tracking-wider">
                  Compras, Planes y Pagos
                </h2>
                <p className="text-[10px] text-gray-500 font-medium">
                  Comprobantes de suscripciones y servicios.
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: HEX_COLORS.amber100,
                color: "#92400E",
                borderRadius: "4px",
              }}
              className="text-[10px] font-bold px-2 py-1 border border-amber-300 shrink-0 whitespace-nowrap"
            >
              {comprasFiltradas.length}
            </span>
          </div>

          <div className="space-y-2">
            {comprasFiltradas.map((compra) => (
              <div
                key={compra.id}
                style={{ borderRadius: "4px" }}
                className="border-2 border-gray-200 hover:border-gray-300 p-3 bg-white transition-colors flex flex-col gap-2.5"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    style={{ borderRadius: "4px" }}
                    className="p-2 bg-gray-100 text-gray-700 shrink-0 mt-0.5 border border-gray-200"
                  >
                    <FileText size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-gray-500">
                        {compra.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">
                        • {compra.fecha}
                      </span>
                    </div>
                    <span
                      style={{
                        backgroundColor: `${HEX_COLORS.brandGreen}15`,
                        color: HEX_COLORS.brandGreen,
                        borderRadius: "4px",
                      }}
                      className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 border border-[#0E5E6F]/20 inline-block mt-1"
                    >
                      {compra.tipo}
                    </span>

                    <h3 className="text-xs font-bold text-gray-900 mt-1">
                      {compra.concepto}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-medium">
                      <strong>Método:</strong> {compra.metodoPago}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t pt-2 border-gray-100 shrink-0">
                  <div className="text-left">
                    <span className="text-sm font-black text-gray-900 block leading-tight">
                      {compra.monto}
                    </span>
                    <span
                      style={{
                        backgroundColor: HEX_COLORS.emerald100,
                        color: "#065F46",
                        borderRadius: "4px",
                      }}
                      className="text-[9px] font-bold px-1.5 py-0.2 border border-emerald-300 inline-block"
                    >
                      {compra.estado}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedFactura(compra)}
                    style={{ borderRadius: "4px" }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1 border border-gray-300"
                  >
                    <Download size={13} />
                    <span>Recibo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN INFORMATIVA / SOPORTE GENERAL */}
      <div
        style={{ borderRadius: "4px" }}
        className="bg-gray-900 border-2 border-gray-800 p-4 text-white shadow-md flex flex-col gap-3 text-left"
      >
        <div className="flex items-start gap-3">
          <div
            style={{ borderRadius: "4px" }}
            className="p-2.5 bg-white/10 border border-white/10 shrink-0"
          >
            <ShieldCheck size={20} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white tracking-wider">
              ¿Requieres un Informe Técnico Oficial o Auditoría?
            </h3>
            <p className="text-[11px] text-gray-300 mt-0.5 font-medium">
              Generamos reportes detallados y firmados para certificaciones, cumplimiento normativo y seguros.
            </p>
          </div>
        </div>

        <button
          style={{
            borderRadius: "4px",
            backgroundColor: HEX_COLORS.brandGreen,
          }}
          className="px-3.5 py-2.5 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-90 w-full"
        >
          <span>Solicitar asistencia técnica</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* BOTTOM SHEET: DETALLES DEL VUELO */}
      {selectedVuelo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div
            style={{ borderRadius: "16px 16px 0 0", scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="bg-white border-t-2 border-gray-300 w-full max-h-[85vh] p-5 text-left space-y-4 shadow-xl overflow-y-auto [&::-webkit-scrollbar]:hidden"
          >
            <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-gray-900">
                Detalles del Vuelo {selectedVuelo.id}
              </h3>
              <button
                onClick={() => setSelectedVuelo(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>Ubicación:</strong> {selectedVuelo.ubicacion}</p>
              <p><strong>Servicio:</strong> {selectedVuelo.servicio}</p>
              <p><strong>Fecha de operación:</strong> {selectedVuelo.fecha}</p>
              <p><strong>Cobertura:</strong> {selectedVuelo.cobertura}</p>
              <p><strong>Dron asignado:</strong> {selectedVuelo.dron}</p>
              <p><strong>Piloto responsable:</strong> {selectedVuelo.piloto}</p>

              {selectedVuelo.detallesTecnicos && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded space-y-1">
                  <p className="font-bold text-gray-900 border-b pb-1 mb-1">
                    Parámetros de Telemetría y Misión
                  </p>
                  <p><strong>Altura promedio:</strong> {selectedVuelo.detallesTecnicos.alturaPromedio}</p>
                  <p><strong>Duración del vuelo:</strong> {selectedVuelo.detallesTecnicos.duracionVuelo}</p>
                  <p><strong>Resolución GSD:</strong> {selectedVuelo.detallesTecnicos.resolucionGSD}</p>
                  <p><strong>Condiciones climáticas:</strong> {selectedVuelo.detallesTecnicos.condicionClimatica}</p>
                </div>
              )}
            </div>

            <div className="pt-2 pb-1">
              <button
                onClick={() => setSelectedVuelo(null)}
                style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.brandGreen }}
                className="px-4 py-2.5 text-white text-xs font-bold cursor-pointer w-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM SHEET: RECIBO DE FACTURA */}
      {selectedFactura && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div
            style={{ borderRadius: "16px 16px 0 0", scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="bg-white border-t-2 border-gray-300 w-full max-h-[85vh] p-5 text-left space-y-4 shadow-xl overflow-y-auto [&::-webkit-scrollbar]:hidden"
          >
            <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto -mt-1 mb-1" />

            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-black text-gray-900">
                Comprobante de Pago {selectedFactura.id}
              </h3>
              <button
                onClick={() => setSelectedFactura(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>Concepto:</strong> {selectedFactura.concepto}</p>
              <p><strong>Fecha de pago:</strong> {selectedFactura.fecha}</p>
              <p><strong>Método utilizado:</strong> {selectedFactura.metodoPago}</p>
              <p><strong>Estado:</strong> {selectedFactura.estado}</p>

              {selectedFactura.detallesPago && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded space-y-1">
                  <p><strong>Subtotal:</strong> {selectedFactura.detallesPago.subtotal}</p>
                  <p><strong>Impuesto (15%):</strong> {selectedFactura.detallesPago.impuesto}</p>
                  <p className="font-bold text-gray-900 text-sm pt-1 border-t">
                    Total pagado: {selectedFactura.monto}
                  </p>
                  <p className="text-[10px] text-gray-400 pt-1">
                    Transacción ID: {selectedFactura.detallesPago.numTransaccion}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 pb-1">
              <button
                onClick={() => setSelectedFactura(null)}
                style={{ borderRadius: "4px", backgroundColor: HEX_COLORS.brandGreen }}
                className="px-4 py-2.5 text-white text-xs font-bold cursor-pointer w-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};