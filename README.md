# Supermercados El Ahorro & Del Centro

Sitio web corporativo para **Supermercados El Ahorro** (4 sedes) y **Supermercados del Centro** (1 sede), con contenido administrable desde base de datos y base preparada para un dashboard interno.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **Prisma 7** + **SQLite**
- **Leaflet** (mapa interactivo)

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con slider de banners, domicilios y tiendas |
| `/donde-estamos` | Mapa interactivo y listado de sedes |
| `/quienes-somos` | Visión, misión e imagen actual |
| `/rrhh` | Formulario de postulación laboral |

## Base de datos

Modelos preparados para el dashboard futuro:

- `Banner` — sliders y campañas (Quincenazo, Trasnochón, Separata, Mundial, Aniversario, etc.)
- `Store` — sedes con dirección, teléfono, WhatsApp y coordenadas
- `AboutContent` — texto de Quiénes somos
- `SiteSettings` — email y redes sociales
- `HrArea` / `HrApplication` — áreas y postulaciones RRHH
- `AdminUser` — usuarios administradores (para el dashboard)

## Comandos

```bash
# Instalar dependencias
npm install

# Configurar base de datos (migración + datos iniciales)
npm run db:setup

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## API (base para dashboard)

- `GET /api/banners`
- `GET /api/stores`
- `GET /api/about`
- `GET /api/settings`
- `POST /api/hr` — envío de formulario RRHH

## Personalización

Los datos de sedes, banners, textos y redes sociales se editan en la base de datos. Por ahora usa `prisma/seed.ts` o Prisma Studio:

```bash
npx prisma studio
```

Reemplaza las imágenes en `public/images/` con fotos reales de tiendas y campañas.

## Próximo paso: Dashboard

Panel de administración disponible en `/admin`:

| Sección | Ruta | Qué hace |
|---------|------|----------|
| Login | `/admin/login` | Acceso con usuario admin |
| Banners | `/admin/banners` | CRUD del slider + subida de imágenes |
| Franja promos | `/admin/ticker` | Textos del banner que se mueve |
| RRHH | `/admin/rrhh` | Ver postulaciones y descargar hojas de vida |

Credenciales iniciales (tras `npm run db:seed`):

- Email: `admin@supermercados.com`
- Contraseña: `admin123` (cambiar en producción)

Variables en `.env`:

```bash
SESSION_SECRET=un-secreto-largo-y-aleatorio
ADMIN_EMAIL=admin@supermercados.com
ADMIN_PASSWORD=admin123
```

Pendiente para el dashboard: sedes, Quiénes somos, configuración y historias de redes.
