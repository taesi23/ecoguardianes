import React from 'react';

export const AvisoPrivacidad = () => {
  return (
    <div className="landing-page py-12 px-4 max-w-4xl mx-auto text-[#4A2E18]">
      <h1 className="text-3xl font-black mb-6">Aviso de Privacidad</h1>
      <p className="text-sm opacity-80 mb-4">Última actualización: Agosto 2026</p>
      
      <div className="space-y-4 text-sm leading-relaxed bg-white/75 p-6 rounded-2xl border border-[#4A2E18]/10">
        <h2 className="text-lg font-bold">1. Responsable del tratamiento de datos</h2>
        <p><strong>Eco Guardianes</strong>, proyecto comunitario enfocado en el monitoreo de compostaje en Matamoros, Tamaulipas, es responsable de recabar sus datos personales y proteger su privacidad conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

        <h2 className="text-lg font-bold">2. Datos personales que se recaban</h2>
        <p>Para el funcionamiento de la plataforma, se recopilan: nombre completo, correo electrónico, colonia de adscripción y registros de bitácoras (temperatura, humedad, observaciones y fotografías de evidencia).</p>

        <h2 className="text-lg font-bold">3. Finalidad del uso de datos</h2>
        <p>Los datos recabados se utilizan única y exclusivamente para fines de control operativo, monitoreo ambiental de los composteros comunitarios y gestión interna de los usuarios registrados (Eco Guardianes y Administradores).</p>

        <h2 className="text-lg font-bold">4. Derechos ARCO</h2>
        <p>Usted tiene derecho a conocer qué datos tenemos, para qué los utilizamos y las condiciones de su uso (Acceso), así como solicitar la corrección de su información (Rectificación), su eliminación (Cancelación) u oponerse al uso de los mismos (Oposición).</p>
      </div>
    </div>
  );
};
export default AvisoPrivacidad;