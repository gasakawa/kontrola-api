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

  await prisma.business_plan_settings.createMany({
    data: [
      {
        business_plan_type_id: 1,
        admin_limit: 2,
        users_limit: 100,
        devices_limit: 4,
        headquarters_limit: 2,
        user_progress_track: true,
        access_control: true,
        schedule: true,
        send_alerts: true,
        send_notifications: true,
        sms_plan: false,
        tech_support: true,
        updates: true,
        permanence_clause: 12,
      },
      {
        business_plan_type_id: 2,
        admin_limit: 1,
        users_limit: 50,
        devices_limit: 2,
        headquarters_limit: 1,
        user_progress_track: true,
        access_control: true,
        schedule: false,
        send_alerts: true,
        send_notifications: false,
        sms_plan: false,
        tech_support: true,
        updates: true,
        permanence_clause: 12,
      },
      {
        business_plan_type_id: 3,
        admin_limit: 2,
        users_limit: 0,
        devices_limit: 4,
        headquarters_limit: 3,
        user_progress_track: true,
        access_control: true,
        schedule: true,
        send_alerts: true,
        send_notifications: false,
        sms_plan: false,
        tech_support: true,
        updates: true,
        permanence_clause: 0,
      },
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
