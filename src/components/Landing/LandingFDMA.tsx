import React from 'react';

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
export const LandingFDMA = () => {
  return (
    <div className="min-h-screen bg-[#fcfaf2] font-sans">
      
  
      {/* Sección Hero con Degradado de Color (Adiós espacio en blanco) */}

      <section className="w-full pt-7 pb-20 px-6 flex flex-col items-center text-center bg-gradient-to-b from-[#d8ece1] to-[#fcfaf2]">
         <img
            src="/logo_fdma.svg"
            alt="Logo Festival del Medio Ambiente"
            className="mb-4 h-28 w-28 object-contain mix-blend-multiply md:h-32 md:w-32"
          />

        <h1 className="text-5xl md:text-7xl font-extrabold text-[#4a3728] tracking-tight leading-tight mb-6">
          Bienvenido al <br />
          <span className="text-[#2d6a4f]">Festival del Medio Ambiente</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium mb-10 max-w-2xl mx-auto">
          Un espacio para conectar, aprender y actuar por nuestro planeta. 
          Descubre nuestras iniciativas, únete a la comunidad y sé parte del cambio.
        </p><br />

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
<br></br>
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
      </section>

      {/* Sección Imageboard (100% visible, sin filtros grises) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h3 className="text-center text-2xl md:text-3xl font-bold text-[#4a3728] mb-8">
          Comunidad en Acción
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