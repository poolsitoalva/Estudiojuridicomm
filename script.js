/* Interacciones pequeñas y sin dependencias. Nada se envía ni almacena en esta web. */
(() => {
  'use strict';
  const menuBoton = document.getElementById('menuBoton');
  const navegacion = document.getElementById('navegacion');
  if (menuBoton && navegacion) {
    const cerrarMenu = () => {
      navegacion.classList.remove('abierta');
      menuBoton.setAttribute('aria-expanded', 'false');
      menuBoton.setAttribute('aria-label', 'Abrir menú');
    };
    menuBoton.addEventListener('click', () => {
      const abierto = navegacion.classList.toggle('abierta');
      menuBoton.setAttribute('aria-expanded', String(abierto));
      menuBoton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    navegacion.querySelectorAll('a').forEach(enlace => enlace.addEventListener('click', cerrarMenu));
    document.addEventListener('keydown', evento => {
      if (evento.key === 'Escape') cerrarMenu();
    });
    document.addEventListener('click', evento => {
      if (!navegacion.contains(evento.target) && !menuBoton.contains(evento.target)) cerrarMenu();
    });
  }

  const telefono = '51998016091';
  const opciones = [...document.querySelectorAll('[data-caso]')];
  const descripcion = document.getElementById('descripcionCaso');
  const enlaceWhatsapp = document.getElementById('enviarWhatsapp');
  let casoElegido = 'Derecho Penal';
  const actualizarWhatsapp = () => {
    if (!enlaceWhatsapp) return;
    const resumen = (descripcion?.value || '').trim().slice(0, 350);
    const mensaje = `Buenos días, doctor Alexi David Muñoz Mitma. Quisiera realizar una consulta de ${casoElegido}.` +
      (resumen ? `\n\nMi consulta, en términos generales, es: ${resumen}` : '') +
      '\n\nAgradecería información para coordinar una atención. Gracias.';
    enlaceWhatsapp.href = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  };
  opciones.forEach(boton => boton.addEventListener('click', () => {
    casoElegido = boton.dataset.caso || 'Otra consulta jurídica';
    opciones.forEach(op => {
      const elegido = op === boton;
      op.classList.toggle('seleccionada', elegido);
      op.setAttribute('aria-pressed', String(elegido));
    });
    actualizarWhatsapp();
  }));
  descripcion?.addEventListener('input', actualizarWhatsapp);
  actualizarWhatsapp();
})();
