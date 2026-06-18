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

La estructura ya está lista para construir un panel en `/admin` con autenticación sobre el modelo `AdminUser`, CRUD de banners, sedes y contenido.
