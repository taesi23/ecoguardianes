import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, Edit, Eye, EyeOff, Image, Loader2, Plus, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';

type Convocatoria = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_url: string | null;
  activo: boolean;
  created_at: string;
};

const BUCKET = 'imagenes_convocatorias';

function obtenerRutaImagen(imagenUrl: string | null) {
  if (!imagenUrl) return null;

  const marcador = `/storage/v1/object/public/${BUCKET}/`;
  const indice = imagenUrl.indexOf(marcador);
  return indice === -1 ? null : decodeURIComponent(imagenUrl.slice(indice + marcador.length));
}

export default function AdminConvocatorias() {
  const navigate = useNavigate();
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [imagenAnterior, setImagenAnterior] = useState<string | null>(null);
  const [formulario, setFormulario] = useState({ titulo: '', descripcion: '' });
  const [imagen, setImagen] = useState<File | null>(null);

  useEffect(() => {
    const cargarConvocatorias = async () => {
      setCargando(true);
      setError(null);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No autorizado');

        const { data: usuario, error: usuarioError } = await supabase
          .from('usuarios')
          .select('roles(nombre)')
          .eq('auth_user_id', user.id)
          .single();

        if (usuarioError) throw usuarioError;
        const roles = usuario?.roles as { nombre?: string } | { nombre?: string }[] | null;
        const rol = Array.isArray(roles) ? roles[0]?.nombre : roles?.nombre;
        if (rol !== 'Super Admin') {
          navigate('/admin');
          return;
        }

        const { data, error: convocatoriasError } = await supabase
          .from('convocatorias')
          .select('*')
          .order('created_at', { ascending: false });

        if (convocatoriasError) throw convocatoriasError;
        setConvocatorias((data || []) as Convocatoria[]);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las convocatorias.');
      } finally {
        setCargando(false);
      }
    };

    cargarConvocatorias();
  }, [navigate]);

  const abrirNuevo = () => {
    setEditandoId(null);
    setImagenAnterior(null);
    setFormulario({ titulo: '', descripcion: '' });
    setImagen(null);
    setModalAbierto(true);
  };

  const abrirEdicion = (convocatoria: Convocatoria) => {
    setEditandoId(convocatoria.id);
    setImagenAnterior(convocatoria.imagen_url);
    setFormulario({ titulo: convocatoria.titulo, descripcion: convocatoria.descripcion });
    setImagen(null);
    setModalAbierto(true);
  };

  const manejarImagen = (event: ChangeEvent<HTMLInputElement>) => {
    setImagen(event.target.files?.[0] || null);
  };

  const guardarConvocatoria = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGuardando(true);
    let nuevaRuta: string | null = null;

    try {
      let imagenUrl = imagenAnterior;

      if (imagen) {
        nuevaRuta = `${crypto.randomUUID()}-${imagen.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(nuevaRuta, imagen, {
          cacheControl: '3600',
          contentType: imagen.type,
          upsert: false,
        });
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(nuevaRuta);
        imagenUrl = publicUrlData.publicUrl;
      }

      const registro = { titulo: formulario.titulo.trim(), descripcion: formulario.descripcion.trim(), imagen_url: imagenUrl };
      const resultado = editandoId
        ? await supabase.from('convocatorias').update(registro).eq('id', editandoId)
        : await supabase.from('convocatorias').insert(registro);

      if (resultado.error) throw resultado.error;

      if (imagen && imagenAnterior) {
        const rutaAnterior = obtenerRutaImagen(imagenAnterior);
        if (rutaAnterior) await supabase.storage.from(BUCKET).remove([rutaAnterior]);
      }

      setModalAbierto(false);
      const { data } = await supabase.from('convocatorias').select('*').order('created_at', { ascending: false });
      setConvocatorias((data || []) as Convocatoria[]);
    } catch (err) {
      console.error(err);
      if (nuevaRuta) await supabase.storage.from(BUCKET).remove([nuevaRuta]);
      alert('No se pudo guardar la convocatoria. Verifica los permisos de la tabla y del bucket.');
    } finally {
      setGuardando(false);
    }
  };

  const alternarEstado = async (convocatoria: Convocatoria) => {
    const { error: updateError } = await supabase
      .from('convocatorias')
      .update({ activo: !convocatoria.activo })
      .eq('id', convocatoria.id);

    if (updateError) {
      alert('No se pudo cambiar el estado.');
      return;
    }
    setConvocatorias((actuales) => actuales.map((item) => item.id === convocatoria.id ? { ...item, activo: !item.activo } : item));
  };

  const eliminarConvocatoria = async (convocatoria: Convocatoria) => {
    if (!window.confirm(`¿Eliminar "${convocatoria.titulo}" permanentemente?`)) return;

    const { error: deleteError } = await supabase.from('convocatorias').delete().eq('id', convocatoria.id);
    if (deleteError) {
      alert('No se pudo eliminar la convocatoria.');
      return;
    }

    const ruta = obtenerRutaImagen(convocatoria.imagen_url);
    if (ruta) await supabase.storage.from(BUCKET).remove([ruta]);
    setConvocatorias((actuales) => actuales.filter((item) => item.id !== convocatoria.id));
  };

  if (cargando) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-green-600" /></div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-4 border-b border-[#4A2E18]/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Convocatorias</h1>
          <p className="mt-1 font-medium text-green-700">Publicaciones visibles en la landing page</p>
        </div>
        <button onClick={abrirNuevo} className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
          <Plus className="h-5 w-5" /> Nueva convocatoria
        </button>
      </div>

      {error && <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700"><AlertCircle className="h-5 w-5" />{error}</div>}

      <Card className="overflow-hidden border-transparent bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500"><tr><th className="px-6 py-4">Imagen</th><th className="px-6 py-4">Título</th><th className="px-6 py-4">Registro</th><th className="px-6 py-4">Estado</th><th className="px-6 py-4 text-right">Acciones</th></tr></thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {convocatorias.map((convocatoria) => (
                  <tr key={convocatoria.id} className={`hover:bg-green-50/30 ${!convocatoria.activo ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">{convocatoria.imagen_url ? <img src={convocatoria.imagen_url} alt="" className="h-12 w-20 rounded-lg object-cover" /> : <Image className="h-8 w-8 text-gray-300" />}</td>
                    <td className="max-w-xs px-6 py-4 font-semibold text-gray-900">{convocatoria.titulo}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(convocatoria.created_at).toLocaleDateString('es-MX')}</td>
                    <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${convocatoria.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{convocatoria.activo ? 'Activa' : 'Inactiva'}</span></td>
                    <td className="px-6 py-4"><div className="flex justify-end gap-2"><button onClick={() => abrirEdicion(convocatoria)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-green-600" title="Editar"><Edit className="h-4 w-4" /></button><button onClick={() => alternarEstado(convocatoria)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-green-600" title={convocatoria.activo ? 'Desactivar' : 'Activar'}>{convocatoria.activo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button><button onClick={() => eliminarConvocatoria(convocatoria)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600" title="Eliminar"><Trash2 className="h-4 w-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {convocatorias.length === 0 && <div className="p-12 text-center text-gray-500">Aún no hay convocatorias registradas.</div>}
          </div>
        </CardContent>
      </Card>

      {modalAbierto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-2xl bg-white shadow-xl"><div className="flex items-center justify-between border-b px-6 py-4"><h2 className="text-xl font-bold text-gray-800">{editandoId ? 'Editar convocatoria' : 'Nueva convocatoria'}</h2><button onClick={() => setModalAbierto(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100" title="Cerrar"><X className="h-5 w-5" /></button></div><form onSubmit={guardarConvocatoria} className="space-y-5 p-6"><label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Título *</span><input required value={formulario.titulo} onChange={(event) => setFormulario({ ...formulario, titulo: event.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" /></label><label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Descripción *</span><textarea required rows={5} value={formulario.descripcion} onChange={(event) => setFormulario({ ...formulario, descripcion: event.target.value })} className="w-full resize-y rounded-lg border border-gray-300 px-4 py-2.5 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" /></label><label className="block"><span className="mb-1 block text-sm font-medium text-gray-700">Imagen {editandoId ? '(opcional para reemplazar)' : '*'}</span><input type="file" accept="image/*" required={!editandoId} onChange={manejarImagen} className="w-full rounded-lg border border-gray-300 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1.5 file:font-medium file:text-green-700" /></label><button type="submit" disabled={guardando} className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">{guardando && <Loader2 className="h-5 w-5 animate-spin" />}{guardando ? 'Guardando...' : 'Guardar convocatoria'}</button></form></div></div>}
    </div>
  );
}