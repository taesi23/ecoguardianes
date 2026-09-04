import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const partners = [
  {
    name: 'eco_marce_shop',
    handle: '@eco_marce_shop',
    url: 'https://instagram.com/eco_marce_shop',
    avatar: '/aliados/eco_marce_shop.jpg', 
  },
  {
    name: 'fdma.mx',
    handle: '@fdma.mx',
    url: 'https://www.instagram.com/fdma.mx',
    avatar: '/logo_fdma.svg',
  },
  {
    name: 'puratastudio',
    handle: '@puratastudio',
    url: 'https://www.instagram.com/puratastudio',
    avatar: '/aliados/puratastudio.jpg',
  },
  {
    name: 'vivero_monos_garden',
    handle: '@vivero_monos_garden',
    url: 'https://www.instagram.com/vivero_monos_garden',
    avatar: '/aliados/vivero_monos_garden.jpg',
  },
  {
    name: 'pomodoro_agroecologico',
    handle: '@pomodoro_agroecologico',
    url: 'https://www.instagram.com/pomodoro_agroecologico',
    avatar: '/aliados/pomodoro.jpg',
  },
  {
    name: '_ware_street',
    handle: '@_ware_street',
    url: 'https://www.instagram.com/_ware_street',
    avatar: '/aliados/ware_street.jpg',
  },
  {
    name: 'edgara.castillo',
    handle: '@edgara.castillo',
    url: 'https://www.instagram.com/edgara.castillo',
    avatar: '/aliados/edgara_castillo.jpg',
  }
]; 

interface Convocatoria {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  enlace_url?: string;
}

export const LandingFDMA = () => {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [cargandoConvocatorias, setCargandoConvocatorias] = useState(true);

  useEffect(() => {
    const cargarConvocatorias = async () => {
      const { data, error } = await supabase
        .from('convocatorias')
        .select('id, titulo, descripcion, imagen_url, enlace_url')
        .eq('activo', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error) setConvocatorias((data || []) as Convocatoria[]);
      setCargandoConvocatorias(false);
    };

    cargarConvocatorias();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfaf2] font-sans">
      
  
      {/* Sección Hero con Degradado de Color (Adiós espacio en blanco) */}

      <section className="w-full px-6 pb-8 pt-7 text-center bg-gradient-to-b from-[#d8ece1] to-[#fcfaf2] flex flex-col items-center">
         <img
            src="/logo_fdma.svg"
            alt="Logo Festival del Medio Ambiente"
            className="mb-4 h-28 w-28 object-contain mix-blend-multiply md:h-32 md:w-32"
          />

        <h1 className="text-5xl md:text-7xl font-extrabold text-[#4a3728] tracking-tight leading-tight mb-6">
          Bienvenido a FDMA <br />
          <span className="text-[#2d6a4f]">Festival Del Medio Ambiente </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium mb-10 max-w-2xl mx-auto">
          Un espacio dedicado a la educación y la acción ambiental. <br />
          Conoce nuestros proyectos activos, intégrate a nuestra red y sé parte del impacto positivo.
          Entérate de nuestros próximos eventos en redes sociales.
        </p><br />

         <div className="flex items-center gap-2 sm:ml-1">
          <a
            href="https://www.facebook.com/profile.php?id=100091930835447"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook de FDMA"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4a3728]/10 bg-white p-2.5 shadow-sm transition hover:bg-blue-50"
          >
            <img src="/fb-icon.svg" alt="Facebook" className="h-full w-full object-contain" />
          </a>
          <a
            href="https://instagram.com/fdma.mx"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de FDMA"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4a3728]/10 bg-white p-2.5 shadow-sm transition hover:bg-pink-50"
          >
            <img src="/ig-icon.svg" alt="Instagram" className="h-full w-full object-contain" />
          </a>
        </div>
 <br />
        {/* Botones de Acción (Eco Guardianes) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a 
            href="/info" 
            className="px-8 py-3.5 rounded-full bg-white text-[#4a3728] font-bold shadow-sm border border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all text-center"
          >
            Conoce el Compostero
          </a>
          <a 
            href="/registro" 
            className="px-8 py-3.5 rounded-full bg-[#2d6a4f] text-white font-bold shadow-md hover:bg-[#1b4332] hover:scale-105 transition-all text-center"
          >
            Crear Cuenta en Eco Guardianes
          </a>

        </div>  
      </section>
                  <section className="mx-auto mt-0 w-full max-w-7xl px-4 pt-6 sm:px-8">
                  <h3 className="mb-8 text-center text-2xl font-bold text-[#4a3728] md:text-3xl">Convocatorias</h3>
                  
                  {cargandoConvocatorias ? (
                    <p className="text-center text-[#4a3728]/70">Cargando convocatorias...</p>
                  ) : convocatorias.length === 0 ? (
                    <p className="text-center text-[#4a3728]/70">Próximamente habrá nuevas convocatorias.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {convocatorias.map((convocatoria) => (
                        <article 
                          key={convocatoria.id} 
                          className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-[#4a3728]/10"
                        >
                          {/* Contenedor tipo Instagram (1:1) con fondo sutil para evitar espacios blancos vacíos */}
                          <div className="flex w-full items-center justify-center bg-[#f8f5f2] aspect-square">
                            <img 
                              src={convocatoria.imagen_url} 
                              alt={convocatoria.titulo} 
                              className="h-full w-full object-contain" 
                            />
                          </div>
                          
                          <div className="flex flex-grow flex-col p-5">
                            <h3 className="mb-2 text-xl font-bold text-[#4a3728]">{convocatoria.titulo}</h3>
                            <p className="mb-5 text-base leading-relaxed text-[#4a3728]/75">
                              {convocatoria.descripcion}
                            </p>
                            
                            {/* Botón de enlace condicional alineado siempre al fondo de la tarjeta */}
                            {convocatoria.enlace_url && (
                              <a 
                                href={convocatoria.enlace_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-auto block w-full rounded-xl bg-green-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-green-700 shadow-sm"
                              >
                                Más información / Registro
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                  </section>
                   <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-[#4a3728] mb-8">
          Comunidad FDMA en Acción
        </h3>
        
        {/* Contenedor limpio para las fotos */}
        <div className="w-full rounded-2xl overflow-hidden shadow-sm bg-white border border-[#4a3728]/10 h-[400px] md:h-[500px]">
          <iframe 
            src="https://rss.app/embed/v1/imageboard/twCDpSkbQ8gPiFbf" 
            frameBorder="0" 
            className="w-full h-full"
            title="Imageboard FDMA"
            loading="lazy"
          ></iframe>
        </div>
                  </section>

                  {/* SECCIÓN ALIADOS Y COMUNIDAD (Auto-carrusel tipo Marquee idéntico a Eco Guardianes) */}
                <section className="w-full bg-[#2d6a4f] py-12 overflow-hidden">
                  <div className="impact-inner">
                    <div className="impact-header">
                      <p className="impact-kicker">Aliados de la comunidad</p>
                      <h2 className="impact-title"> FMDA</h2>
                    </div>
                    </div>

                  <div className="partner-marquee overflow-hidden w-full relative">
                    <div className="partner-track flex gap-4 w-max animate-[marquee_25s_linear_infinite]">
                      {[...partners, ...partners].map((partner, idx) => (
                        <a
                          key={`${partner.name}-${idx}`}
                          href={partner.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white transition hover:bg-white/20 backdrop-blur-sm"
                        >
                          <img src={partner.avatar} alt={partner.name} className="h-7 w-7 rounded-full object-cover bg-white" />
                          <span className="font-semibold text-sm">{partner.handle}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </section>


      {/* Sección de Novedades (Carrusel de Instagram) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-16 pt-8">
        <div className="flex justify-between items-end mb-8 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4a3728]">
            Últimas Novedades
          </h2>
          <a 
            href="https://instagram.com/fdma.mx" 
            target="_blank" 
            rel="noreferrer" 
            className="text-[#2d6a4f] font-semibold hover:underline flex items-center gap-1"
          >
            Ver en Instagram <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        
        {/* Contenedor del Carrusel RSS */}
        <div 
          className="w-full rounded-2xl overflow-hidden shadow-sm bg-white border border-[#4a3728]/10"
          style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}
        >
          <iframe 
            src="https://rss.app/embed/v1/carousel/QGlAeSkpnDvj0GIu" 
            frameBorder="0" 
            title="Instagram Feed FDMA"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>
      
    </div>
  );
};

export default LandingFDMA;