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

  await prisma.banner.createMany({
    data: [
      {
        tag: "Trasnochón",
        title: "El ahorro sale de noche",
        body: "Gran Trasnochón. Miércoles 30 de septiembre, desde las 4:00 p.m. hasta el cierre del supermercado.",
        imageUrl: "/images/banners/trasnochon-30-septiembre.png",
        ctaText: "Ver sucursales",
        ctaLink: "/donde-estamos",
        ctaType: "STORES",
        sortOrder: 0,
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
    data: [
      { title: "Aseo y cuidado", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-01.jpg", sortOrder: 1 },
      { title: "Huevos, lácteos y bebidas", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-02.jpg", sortOrder: 2 },
      { title: "Arequipe, quesos y yogurt", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-03.jpg", sortOrder: 3 },
      { title: "Lácteos y despensa", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-04.jpg", sortOrder: 4 },
      { title: "Arroces", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-05.jpg", sortOrder: 5 },
      { title: "Carnes de cerdo", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-06.jpg", sortOrder: 6 },
      { title: "Cereales, café y pan", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-07.jpg", sortOrder: 7 },
      { title: "Papel, galletas y snacks", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-08.jpg", sortOrder: 8 },
      { title: "Despensa", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-09.jpg", sortOrder: 9 },
      { title: "Aseo del hogar", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-10.jpg", sortOrder: 10 },
      { title: "Cuidado personal", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-11.jpg", sortOrder: 11 },
      { title: "Licorera de Caldas", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-12.jpg", sortOrder: 12 },
      { title: "Fruver", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-13.jpg", sortOrder: 13 },
      { title: "Salsas y arepas", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-14.jpg", sortOrder: 14 },
      { title: "Pollo", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-15.jpg", sortOrder: 15 },
      { title: "Embutidos y congelados", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-16.jpg", sortOrder: 16 },
      { title: "Yogures y cárnicos", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-17.jpg", sortOrder: 17 },
      { title: "Aceites y margarinas", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-18.jpg", sortOrder: 18 },
      { title: "Higiene y aseo", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-19.jpg", sortOrder: 19 },
      { title: "Pastas y despensa", link: "/donde-estamos", imageUrl: "/images/separata/ofertas-20.jpg", sortOrder: 20 },
    ],
  });

  await prisma.store.createMany({
    data: [
      {
        brand: "EL_AHORRO",
        name: "Supermercado El Ahorro",
        slug: "el-ahorro-principal",
        address: "Supermercado El Ahorro, Villamaría, Caldas",
        phone: "+57 604 321 4501",
        whatsapp: "573213214501",
        mapsUrl: "https://maps.app.goo.gl/9UG5of2C3eAUpmNF6",
        imageUrl: "/images/stores/el-ahorro-centro.svg",
        latitude: 5.0532691,
        longitude: -75.4889531,
        sortOrder: 1,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede La Florida",
        slug: "el-ahorro-la-florida",
        address: "El Ahorro Supermercados, La Florida, Villamaría, Caldas",
        phone: "+57 604 321 4502",
        whatsapp: "573213214502",
        mapsUrl: "https://maps.app.goo.gl/N2PABYtQvBemLgTB8",
        imageUrl: "/images/stores/el-ahorro-norte.svg",
        latitude: 5.0310802,
        longitude: -75.4822034,
        sortOrder: 2,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede La Pradera",
        slug: "el-ahorro-la-pradera",
        address: "Cl. 6 #10-59, La Pradera, Villamaría, Caldas",
        phone: "+57 604 321 4503",
        whatsapp: "573213214503",
        mapsUrl:
          "https://www.google.com/maps/place/Supermercado+El+Ahorro+Villa+Mar%C3%ADa+La+Pradera/@5.043573,-75.5169,17z",
        imageUrl: "/images/stores/el-ahorro-sur.svg",
        latitude: 5.043573,
        longitude: -75.5169,
        sortOrder: 3,
      },
      {
        brand: "EL_AHORRO",
        name: "Sede Parque Central",
        slug: "el-ahorro-parque-central",
        address: "El Ahorro Supermercados, Parque Central Villamaría, Caldas",
        phone: "+57 604 321 4504",
        whatsapp: "573213214504",
        mapsUrl: "https://maps.app.goo.gl/zXNws4WdLPFCa8Xt5",
        imageUrl: "/images/stores/el-ahorro-oriente.svg",
        latitude: 5.0458846,
        longitude: -75.5129519,
        sortOrder: 4,
      },
      {
        brand: "DEL_CENTRO",
        name: "Supermercado del Centro",
        slug: "del-centro-principal",
        address: "Supermercado del Centro, Villamaría, Caldas",
        phone: "+57 604 321 4600",
        whatsapp: "573213216600",
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
        text: "5 sedes en Villamaría para estar cerca de ti",
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
