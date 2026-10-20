import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.banner.deleteMany();
  await prisma.promoTickerItem.deleteMany();
  await prisma.separataItem.deleteMany();
  await prisma.store.deleteMany();
  await prisma.hrArea.deleteMany();
  await prisma.aboutContent.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.adminUser.deleteMany();

  const ofertas = [
    ["Despensa y aseo", "/images/separata/quincena-01.jpg"],
    ["Aseo Sannox", "/images/separata/quincena-02.jpg"],
    ["Quesitos Colanta", "/images/separata/quincena-03.jpg"],
    ["Quesos Colanta", "/images/separata/quincena-04.jpg"],
    ["Atún Van Camps", "/images/separata/quincena-05.jpg"],
    ["Suavitel y Axion", "/images/separata/quincena-06.jpg"],
    ["Cárnicos y lácteos", "/images/separata/quincena-07.jpg"],
    ["Cuidado personal", "/images/separata/quincena-08.jpg"],
    ["Tequila Don Julio", "/images/separata/quincena-09.jpg"],
    ["Whisky Buchanan's", "/images/separata/quincena-10.jpg"],
    ["Whisky Old Parr", "/images/separata/quincena-11.jpg"],
    ["Licorera de Caldas", "/images/separata/quincena-12.jpg"],
    ["Pollo", "/images/separata/quincena-13.jpg"],
    ["Cerdo", "/images/separata/quincena-14.jpg"],
    ["Fruver", "/images/separata/quincena-15.jpg"],
  ] as const;

  await prisma.banner.createMany({
    data: [
      ...ofertas.map(([title, imageUrl], index) => ({
        tag: "Quincenazo de locura",
        title,
        body: "Del 15 al 20 de octubre.",
        imageUrl,
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS" as const,
        sortOrder: index + 1,
        active: false,
      })),
      {
        tag: "Quincenazo de locura",
        title: "Quincenazo de locura",
        body: "Del 15 al 20 de octubre.",
        imageUrl: "/images/banners/quincenazo-locura.jpg",
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS",
        sortOrder: 0,
      },
      {
        tag: "Déjate encantar",
        title: "En octubre, déjate encantar",
        body: "Del 9 al 12 de octubre.",
        imageUrl: "/images/banners/home-cerdo-octubre.jpg",
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS",
        sortOrder: 1,
        active: false,
      },
      {
        tag: "Ofertas q'encantan",
        title: "Ofertas q'encantan",
        body: "Del 1 al 5 de octubre.",
        imageUrl: "/images/banners/ofertas-q-encantan-hd.jpg",
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS",
        sortOrder: 1,
        active: false,
      },
      {
        tag: "Trasnochón",
        title: "El ahorro sale de noche",
        body: "Gran Trasnochón. Miércoles 30 de septiembre, desde las 4:00 p.m. hasta el cierre del supermercado.",
        imageUrl: "/images/banners/trasnochon-30-septiembre.png",
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "STORES",
        sortOrder: 1,
        active: false,
      },
      {
        tag: "Quincenazo",
        title: "¡Llegó el Quincenazo! Los mejores precios para tu hogar.",
        body: "Aprovechá ofertas imperdibles del 15 al 18 de este mes.",
        imageUrl: "/images/banners/quincenazo.svg",
        ctaText: "Ver Ofertas",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS",
        sortOrder: 1,
        active: false,
      },
      {
        tag: "Trasnochón",
        title: "¡Prepárate para el Trasnochón!",
        body: "Descuentos exclusivos para cerrar el mes con ahorro.",
        imageUrl: "/images/banners/trasnochon.svg",
        ctaText: "Ir a la Tienda más cercana",
        ctaLink: "/donde-estamos",
        ctaType: "STORES",
        sortOrder: 2,
        active: false,
      },
      {
        tag: "Separata",
        title: "Tu ahorro continúa: Separata de Fin de Mes.",
        body: "Calidad y frescura del 30 al 5 de cada mes.",
        imageUrl: "/images/banners/separata.svg",
        ctaText: "Consultar Catálogo",
        ctaLink: "https://wa.me/573001234567",
        ctaType: "CATALOG",
        sortOrder: 3,
        active: false,
      },
    ],
  });

  await prisma.separataItem.createMany({
    data: ofertas.map(([title, imageUrl], index) => ({
      title,
      link: "/donde-estamos",
      imageUrl,
      sortOrder: index + 1,
    })),
  });

  await prisma.store.createMany({
    data: [
      {
        brand: "EL_AHORRO",
        name: "Sede Palermo",
        slug: "el-ahorro-principal",
        address: "Cl. 66A #66A-51, Palermo, Manizales, Caldas",
        phone: "+57 312 730 6688",
        whatsapp: "573127306688",
        mapsUrl: "https://maps.app.goo.gl/9UG5of2C3eAUpmNF6",
        imageUrl: "/images/stores/el-ahorro-palermo.jpg",
        latitude: 5.0532691,
        longitude: -75.4889531,
        sortOrder: 1,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede La Florida",
        slug: "el-ahorro-la-florida",
        address: "La Florida, Villamaría, Caldas",
        phone: "+57 323 985 4555",
        whatsapp: "573239854555",
        mapsUrl: "https://maps.app.goo.gl/N2PABYtQvBemLgTB8",
        imageUrl: "/images/stores/el-ahorro-florida.jpg",
        latitude: 5.0310802,
        longitude: -75.4822034,
        sortOrder: 2,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede La Pradera",
        slug: "el-ahorro-la-pradera",
        address: "Cl. 6 #10-59, La Pradera, Villamaría, Caldas",
        phone: "+57 310 652 6124",
        whatsapp: "573106526124",
        mapsUrl:
          "https://www.google.com/maps/place/Supermercado+El+Ahorro+Villa+Mar%C3%ADa+La+Pradera/@5.043573,-75.5169,17z",
        imageUrl: "/images/stores/el-ahorro-pradera.jpg",
        latitude: 5.043573,
        longitude: -75.5169,
        sortOrder: 3,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede Parque Central",
        slug: "el-ahorro-parque-central",
        address: "Cl. 8, Parque Principal, Villamaría, Caldas",
        phone: "+57 312 624 2121",
        whatsapp: "573126242121",
        mapsUrl: "https://maps.app.goo.gl/zXNws4WdLPFCa8Xt5",
        imageUrl: "/images/stores/el-ahorro-parque-central.jpg",
        latitude: 5.0458846,
        longitude: -75.5129519,
        sortOrder: 4,
      },
      {
        brand: "DEL_CENTRO",
        name: "Supermercado del Centro",
        slug: "del-centro-principal",
        address: "Cra. 22 #28-30, diagonal al Parque Caldas, Centro, Manizales, Caldas",
        phone: "+57 304 471 0995",
        whatsapp: "573044710995",
        mapsUrl: "https://maps.app.goo.gl/J3VqBm8CoBC8sQDC9",
        imageUrl: "/images/stores/del-centro-principal.svg",
        latitude: 5.0678274,
        longitude: -75.5133976,
        sortOrder: 1,
      },
    ],
  });

  await prisma.aboutContent.create({
    data: {
      id: "default",
      vision:
        "En el 2027 posicionarnos como una empresa sólida, logrando la satisfacción de las necesidades de nuestros clientes externos e internos apoyados en las nuevas tecnologías.",
      mission:
        "Somos una empresa de tradición manizaleña líder en servicio, calidad, variedad y precios justos donde el centro de nuestro trabajo está en la satisfacción y bienestar de nuestro cliente interno y externo.",
      description:
        "Supermercados El Ahorro y Supermercados del Centro comparten una misma visión de servicio: estar cerca de la comunidad con campañas pensadas para el bolsillo del hogar, surtido actualizado y atención personalizada. Hoy proyectamos una marca renovada, dinámica y orientada al cliente, lista para acompañarte en cada compra.",
      imageUrl: "/images/about/empresa.svg",
    },
  });

  await prisma.siteSettings.create({
    data: {
      id: "default",
      contactEmail: "contacto@supermercadosgrupo.com",
      instagramUrl: "https://instagram.com/supermercadosgrupo",
      facebookUrl: "https://facebook.com/supermercadosgrupo",
    },
  });

  await prisma.hrArea.createMany({
    data: [
      { name: "Cajas y atención al cliente", sortOrder: 1 },
      { name: "Bodega y logística", sortOrder: 2 },
      { name: "Administración", sortOrder: 3 },
      { name: "Mercadeo", sortOrder: 4 },
      { name: "Recursos humanos", sortOrder: 5 },
      { name: "Otra área", sortOrder: 6 },
    ],
  });

  await prisma.promoTickerItem.createMany({
    data: [
      {
        emoji: "🛒",
        text: "¡Llegó el Quincenazo! Los mejores precios para tu hogar",
        href: "/donde-estamos",
        sortOrder: 1,
      },
      {
        emoji: "🌙",
        text: "Trasnochón: descuentos exclusivos para cerrar el mes",
        href: "/donde-estamos",
        sortOrder: 2,
      },
      {
        emoji: "📋",
        text: "Separata de fin de mes — calidad y frescura garantizada",
        href: "/donde-estamos",
        sortOrder: 3,
      },
      {
        emoji: "🚚",
        text: "Pedí por WhatsApp y recibí en tu casa. Aplican TyC.",
        href: "/donde-estamos",
        sortOrder: 4,
      },
      {
        emoji: "🍎",
        text: "Frutas y verduras frescas todos los días",
        sortOrder: 5,
      },
      {
        emoji: "🏪",
        text: "5 sedes en Manizales y Villamaría para estar cerca de ti",
        href: "/donde-estamos",
        sortOrder: 6,
      },
    ],
  });

  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL ?? "admin@supermercados.com",
      name: "Administrador",
      passwordHash: await hashPassword(adminPassword),
    },
  });

  console.log("Base de datos inicializada correctamente.");
  console.log(`Admin: ${process.env.ADMIN_EMAIL ?? "admin@supermercados.com"} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
