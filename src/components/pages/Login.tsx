import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../Landing/Landing.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

     if (data.user) {
        const { data: usuario, error: usuarioError } = await supabase
          .from('usuarios')
          .select('roles(nombre)')
          .eq('auth_user_id', data.user.id)
          .maybeSingle(); // <-- Cambiamos .single() por .maybeSingle()

        if (usuarioError) throw usuarioError;

        // Si el usuario se autenticó pero no está en la tabla usuarios:
        if (!usuario) {
          throw new Error("Tu cuenta está incompleta. Contacta al administrador o borra tu cuenta para registrarte de nuevo.");
        }

        // Cada rol recibe su pantalla inicial correspondiente.
        const rol = ((usuario?.roles as any)?.[0] || usuario?.roles as any)?.nombre;
        navigate(rol === 'Administrador' || rol === 'Super Admin' ? '/admin' : '/dashboard');
      }
    } catch (err: any) {
      // Ahora verás si el error es de la contraseña o si falta el registro en tu tabla
      console.error("Error detallado:", err);
      setError(err.message || 'Error al iniciar sesión.');
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
        <h2 className="section-title text-4xl mb-2">Bienvenida de nuevo</h2>
        <p className="text-[#4A2E18]/70 font-medium">Ingresa a tu cuenta de Eco Guardiana</p>
      </div>

      <div className="w-full max-w-md bg-[#EBF3E8] border-[2px] border-dashed border-[#2D7A3E]/30 rounded-3xl p-6 sm:p-8 relative shadow-lg">
        <div className="testimonial-tape washi-tape-green" />

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-200 text-center">
              {error}
            </div>
          )}

          <label className="contact-field block">
            <span className="contact-label text-[#2D7A3E]">Correo electrónico:</span>
            <input
              className="contact-input w-full mt-1 border-white focus:ring-2 focus:ring-[#2D7A3E]"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
          </label>

          <label className="contact-field block">
            <span className="contact-label text-[#2D7A3E]">Contraseña:</span>
            <input
              className="contact-input w-full mt-1 border-white focus:ring-2 focus:ring-[#2D7A3E]"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D7A3E] text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-[#235E30] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</span>
              {!loading && <LogIn className="w-5 h-5 ml-2" />}
            </button>
          </div>

          <div className="text-center mt-4">
            <button type="button" className="text-sm font-bold text-[#2D7A3E] hover:underline">
              ¿Olvidaste tu contraseña? Contacta a tu administrador.
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center space-y-3">
        <p className="text-sm font-medium text-[#4A2E18]/70">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-[#2D7A3E] font-bold hover:underline">
            Únete aquí
          </Link>
        </p>
        <Link to="/" className="block text-sm font-medium text-[#4A2E18]/70 hover:text-[#4A2E18]">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};