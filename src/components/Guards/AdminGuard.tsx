import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminGuard() {
    const [verificando, setVerificando] = useState(true);
    const [esAdministrador, setEsAdministrador] = useState(false);

    useEffect(() => {
        const verificarAdministrador = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: usuario } = await supabase
                    .from('usuarios')
                    .select('roles(nombre)')
                    .eq('auth_user_id', user.id)
                    .single();

                const rolNombre = Array.isArray(usuario?.roles) 
                 ? usuario.roles[0]?.nombre 
                 : (usuario?.roles as any)?.nombre;

                setEsAdministrador(
                  rolNombre === 'Administrador' || rolNombre === 'Super Admin'
                );
            }

            setVerificando(false);
        };

        verificarAdministrador();
    }, []);

    if (verificando) {
        return (
            <div className="flex h-screen items-center justify-center gap-2 text-gray-600">
                <Loader2 className="h-7 w-7 animate-spin text-green-600" />
                Verificando permisos...
            </div>
        );
    }

    return esAdministrador ? <Outlet /> : <Navigate to="/dashboard" replace />;
}