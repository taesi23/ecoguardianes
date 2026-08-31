import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../components/Landing/Landing.css';

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlView = new URLSearchParams(location.search).get('view');
  const initialIsLogin = urlView === 'register' ? false : true;

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    telefono: '',
    correo: '',
    password: '',
  });

  useEffect(() => {
    setIsLogin(urlView === 'register' ? false : true);
  }, [urlView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: formData.correo,
          password: formData.password,
        });

        if (authError) throw authError;
        if (data.user) navigate('/dashboard');
      } else {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(formData.password)) {
          setError('La contraseña debe tener al menos 6 caracteres, incluir una mayúscula y un número.');
          setLoading(false);
          return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.correo,
          password: formData.password,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('No se pudo crear el usuario.');

        const { data: rolData, error: rolError } = await supabase
          .from('roles')
          .select('id')
          .eq('nombre', 'Eco Guardiana')
          .single();

        if (rolError || !rolData) throw new Error('Error al asignar el rol.');

        const { error: insertError } = await supabase.from('usuarios').insert([
          {
            id: authData.user.id,
            auth_user_id: authData.user.id,
            rol_id: rolData.id,
            nombre: formData.nombre,
            apellido_paterno: formData.apellido_paterno,
            apellido_materno: formData.apellido_materno,
            correo: formData.correo,
            telefono: formData.telefono,
          },
        ]);

        if (insertError) throw insertError;

        setIsLogin(true);
        setError('¡Registro exitoso! Ya puedes iniciar sesión.');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Verifica tus datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4">
      <div className="bg-[#FFF8DF] border border-[#4A2E18]/10 shadow-sm rounded-xl p-3 mb-6">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
      </div>

      <div className="text-center mb-6">
        <h2 className="section-title text-4xl mb-2 text-[#4A2E18]">
          {isLogin ? 'Bienvenida de nuevo' : 'Únete a Eco Guardianes'}
        </h2>
        <p className="text-[#4A2E18]/70 font-medium text-lg">
          {isLogin ? 'Ingresa a tu cuenta de Eco Guardiana' : 'Crea tu cuenta y forma parte del movimiento'}
        </p>
      </div>

      <div className="w-full max-w-md bg-[#EBF3E8] border-[2px] border-dashed border-[#2D7A3E]/30 rounded-3xl p-6 sm:p-8 relative shadow-lg">
        <div className="testimonial-tape washi-tape-green" />

        <div className="flex bg-[#F6EFCF] p-1 rounded-full mb-8">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${
              isLogin ? 'bg-[#2D7A3E] text-white shadow-md' : 'text-[#4A2E18]/60 hover:text-[#4A2E18]'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${
              !isLogin ? 'bg-[#E07A5F] text-white shadow-md' : 'text-[#4A2E18]/60 hover:text-[#4A2E18]'
            }`}
          >
            Registrarse
          </button>
        </div>

        {error && (
          <div
            className={`p-3 rounded-xl text-sm font-bold border mb-6 text-center ${
              error.includes('exitoso')
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-600 border-red-200'
            }`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <label className="contact-field block">
                <span className="contact-label text-[#2D7A3E] text-lg font-bold">Nombre(s):*</span>
                <input
                  className="contact-input w-full mt-1 border-white bg-[#E7F0EB]"
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="contact-field block">
                  <span className="contact-label text-[#2D7A3E] text-lg font-bold">Ap. Paterno:*</span>
                  <input
                    className="contact-input w-full mt-1 border-white bg-[#E7F0EB]"
                    type="text"
                    name="apellido_paterno"
                    required
                    value={formData.apellido_paterno}
                    onChange={handleChange}
                  />
                </label>
                <label className="contact-field block">
                  <span className="contact-label text-[#2D7A3E] text-lg font-bold">Ap. Materno:*</span>
                  <input
                    className="contact-input w-full mt-1 border-white bg-[#E7F0EB]"
                    type="text"
                    name="apellido_materno"
                    required
                    value={formData.apellido_materno}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label className="contact-field block">
                <span className="contact-label text-[#2D7A3E] text-lg font-bold">Teléfono:*</span>
                <input
                  className="contact-input w-full mt-1 border-white bg-[#E7F0EB]"
                  type="tel"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </label>

              <hr className="border-[#2D7A3E]/10 my-4" />
            </>
          )}

          <label className="contact-field block">
            <span className="contact-label text-[#2D7A3E] text-lg font-bold">Correo electrónico:*</span>
            <input
              className="contact-input w-full mt-1 border-white bg-[#E7F0EB] focus:ring-2 focus:ring-[#2D7A3E]"
              type="email"
              name="correo"
              required
              value={formData.correo}
              onChange={handleChange}
              placeholder="tu@correo.com"
            />
          </label>

          <label className="contact-field block">
            <span className="contact-label text-[#2D7A3E] text-lg font-bold">Contraseña:*</span>
            <input
              className="contact-input w-full mt-1 border-white bg-[#E7F0EB] focus:ring-2 focus:ring-[#2D7A3E]"
              type="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D7A3E] text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-[#235E30] transition-colors disabled:opacity-70 flex items-center justify-center gap-2 text-xl"
            >
              {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión →' : 'Completar Registro'}
            </button>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <button type="button" className="text-sm font-bold text-[#2D7A3E] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 text-center space-y-3">
        <p className="text-sm font-medium text-[#4A2E18]/70">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes una cuenta? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-[#2D7A3E] font-bold hover:underline"
          >
            {isLogin ? 'Únete aquí' : 'Inicia sesión aquí'}
          </button>
        </p>
        <Link to="/" className="block text-sm font-medium text-[#4A2E18]/70 hover:text-[#4A2E18]">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
