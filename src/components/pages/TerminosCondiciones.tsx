import React from 'react';

export const TerminosCondiciones = () => {
  return (
    <div className="landing-page py-12 px-4 max-w-4xl mx-auto text-[#4A2E18]">
      <h1 className="text-3xl font-black mb-6">Términos y Condiciones</h1>
      <p className="text-sm opacity-80 mb-4">Última actualización: Agosto 2026</p>
      
      <div className="space-y-4 text-sm leading-relaxed bg-white/75 p-6 rounded-2xl border border-[#4A2E18]/10">
        <h2 className="text-lg font-bold">1. Aceptación de los términos</h2>
        <p>Al registrarse y utilizar la plataforma web de Eco Guardianes, el usuario acepta cumplir con las normas de uso comunitarias orientadas al cuidado ambiental y la correcta gestión de los composteros.</p>

        <h2 className="text-lg font-bold">2. Uso de la cuenta y seguridad</h2>
        <p>El usuario es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta asignada mediante su código de acceso por colonia.</p>

        <h2 className="text-lg font-bold">3. Política de imágenes y evidencias</h2>
        <p>Las fotografías subidas como evidencia en las bitácoras deben limitarse estrictamente al estado físico de los residuos, temperatura, humedad y fauna del compostero. Queda estrictamente prohibido subir contenido ajeno al proyecto, ofensivo o que contenga rostros de menores o personas sin su consentimiento.</p>
      </div>
    </div>
  );
};
export default TerminosCondiciones;