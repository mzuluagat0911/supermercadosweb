import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.banner.deleteMany();
  await prisma.store.deleteMany();
  await prisma.hrArea.deleteMany();
  await prisma.aboutContent.deleteMany();
  await prisma.siteSettings.deleteMany();

  await prisma.banner.createMany({
    data: [
      {
        tag: "Quincenazo",
        title: "¡Llegó el Quincenazo! Los mejores precios para tu hogar.",
        body: "Aprovechá ofertas imperdibles del 15 al 18 de este mes.",
        imageUrl: "/images/banners/quincenazo.svg",
        ctaText: "Ver Ofertas",
        ctaLink: "/donde-estamos",
        ctaType: "OFFERS",
        sortOrder: 1,
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
      },
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
        "Ser la cadena de supermercados de referencia en la región, reconocida por ofrecer productos frescos, precios justos y una experiencia de compra cercana y confiable para cada familia.",
      mission:
        "Acercar a nuestros clientes una propuesta de valor basada en calidad, variedad y ahorro real, con un equipo comprometido y sedes pensadas para facilitar el día a día del hogar.",
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

  console.log("Base de datos inicializada correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
