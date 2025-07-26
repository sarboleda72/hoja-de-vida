# Hoja de Vida - Santiago Arboleda Agudelo

CV profesional desarrollado con arquitectura moderna y tecnologías web estándar.

## 🚀 Características

- **Diseño responsivo**: Funciona en móviles, tablets y desktop
- **Arquitectura offline**: Todos los recursos son locales (sin dependencias de CDN)
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO optimizado**: Meta tags y datos estructurados
- **Interactividad**: Animaciones suaves y efectos visuales
- **Impresión optimizada**: Estilos específicos para impresión

## 📁 Estructura del Proyecto

```
hoja-de-vida/
├── index.html              # Página principal
├── index-nuevo.html         # Versión anterior (respaldo)
├── README.md               # Este archivo
├── assets/
│   ├── css/
│   │   ├── tailwind.css    # Framework CSS personalizado
│   │   ├── fontawesome.css # Iconos Font Awesome
│   │   └── main.css        # Estilos personalizados
│   ├── js/
│   │   └── main.js         # JavaScript interactivo
│   ├── fonts/
│   │   └── README.md       # Instrucciones para fuentes
│   └── images/
│       └── (iconos y recursos gráficos)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Tailwind CSS personalizado + estilos avanzados
- **JavaScript ES6+**: Interactividad y animaciones
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía Inter

## 🎨 Personalización Fácil

### Cambiar Colores
Edita las variables CSS en `assets/css/main.css`:
```css
:root {
  --primary-color: #2563eb;    /* Color principal */
  --primary-dark: #1d4ed8;     /* Color principal oscuro */
  --accent-color: #0ea5e9;     /* Color de acento */
}
```

### Modificar Contenido
El contenido está estructurado semánticamente en `index.html`:
- **Header**: Información personal y resumen
- **Sidebar**: Contacto, habilidades y herramientas
- **Main**: Experiencia laboral, educación y formación

### Agregar Nuevas Secciones
```html
<section class="mb-8">
    <h3 class="text-2xl font-bold mb-6 text-gray-800 section-title">Nueva Sección</h3>
    <!-- Contenido aquí -->
</section>
```

## 📱 Características Responsive

- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Layout flexible**: Se adapta automáticamente al tamaño de pantalla

## ⚡ Características Interactivas

### Animaciones de Habilidades
Las barras de progreso se animan automáticamente cuando entran en vista.

### Funciones de Contacto
- Click en email/teléfono para copiar al portapapeles
- Enlaces directos para llamar o enviar email

### Impresión Optimizada
- Botón de impresión integrado
- Estilos específicos para impresión
- Eliminación automática de elementos innecesarios

### Accesibilidad
- Navegación por teclado
- Lectores de pantalla compatibles
- Contraste adecuado
- Elementos semánticos

## 🚀 Cómo Usar

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en cualquier navegador moderno
3. **Personalizar** el contenido según tus necesidades
4. **Publicar** en GitHub Pages, Netlify, o cualquier hosting web

## 📄 Para Imprimir

1. Hacer click en el botón "Imprimir CV" o presionar `Ctrl+P`
2. El sistema automáticamente optimiza el layout para impresión
3. Recomendado: Papel A4, márgenes mínimos

## 🔧 Desarrollo

### Requisitos
- Navegador web moderno
- Editor de código (VS Code recomendado)

### Para desarrollo local
1. Abrir el proyecto en tu editor
2. Usar Live Server o similar para desarrollo
3. Los cambios se reflejan automáticamente

### Optimizaciones futuras
- [ ] Service Worker para funcionalidad offline
- [ ] Lazy loading de imágenes
- [ ] Optimización de fuentes web
- [ ] Modo oscuro

## 📝 Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

## 👨‍💻 Autor

**Santiago Arboleda Agudelo**
- Email: arboledaagudelosantiago@gmail.com
- Teléfono: 3137407700
- Ubicación: Manizales, Caldas, Colombia

---

*Última actualización: Enero 2025*
