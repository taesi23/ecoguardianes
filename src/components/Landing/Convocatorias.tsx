import { useEffect, useState } from 'react';
import { Image, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Convocatoria = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
};

export function Convocatorias() {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarConvocatorias = async () => {
      const { data, error } = await supabase
        .from('convocatorias')
        .select('id, titulo, descripcion, imagen_url')
        .eq('activo', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (!error) setConvocatorias((data || []) as Convocatoria[]);
      setCargando(false);
    };

    cargarConvocatorias();
  }, []);

  if (cargando) {
    return <section className="section-block flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-green-600" /></section>;
  }

  if (convocatorias.length === 0) return null;

  return (
    <section id="convocatorias" className="section-block">
      <div className="section-header">
        <h2 className="section-title">Convocatorias</h2>
        <span className="section-kicker">Participa con tu comunidad</span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {convocatorias.map((convocatoria) => (
          <article key={convocatoria.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#4A2E18]/10 transition-transform hover:-translate-y-1">
            {convocatoria.imagen_url ? (
              <img src={convocatoria.imagen_url} alt="" className="h-52 w-full object-cover" />
            ) : (
              <div className="flex h-52 items-center justify-center bg-[#EBF3E8]"><Image className="h-12 w-12 text-green-600/50" /></div>
            )}
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#4A2E18]">{convocatoria.titulo}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4A2E18]/70">{convocatoria.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}