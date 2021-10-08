import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.business_plan.createMany({
    data: [{ bp_description: 'Gold' }, { bp_description: 'Bronze' }, { bp_description: 'Platinum' }],
  });

  await prisma.roles.createMany({
    data: [{ name: 'Administrator' }, { name: 'Client' }],
  });

  await prisma.alerts_type.createMany({
    data: [{ name: 'SMS' }, { name: 'E-mail' }],
  });

  await prisma.document_types.createMany({
    data: [
      { name: 'Cédula de ciudadanía' },
      { name: 'Tarjeta de identidad' },
      { name: 'Cédula de extranjería' },
      { name: 'Pasaporte' },
      { name: 'NIT' },
    ],
  });

  await prisma.measures_type.createMany({
    data: [
      { name: 'Peso' },
      { name: 'Estatura' },
      { name: 'Pectoral' },
      { name: 'Cintura' },
      { name: 'Cadera' },
      { name: 'Cuadriceps' },
      { name: 'Pantorilla' },
    ],
  });

  await prisma.ways_to_pay.createMany({
    data: [
      { name: 'Efectivo' },
      { name: 'Cheque' },
      { name: 'Transferencia bancaria' },
      { name: 'Tarjeta débito' },
      { name: 'Tarjeta crédito' },
    ],
  });

  await prisma.routine_type.createMany({
    data: [
      { name: 'Mis Datos', position: 1, icon: 'icon' },
      { name: 'Configuraciones', position: 2, icon: 'icon' },
      { name: 'Herramientas', position: 3, icon: 'icon' },
      { name: 'Reportes', position: 4, icon: 'icon' },
    ],
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
