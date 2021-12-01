import { PrismaClient } from '@prisma/client';
import faker from 'faker';

const prisma = new PrismaClient();

const run = async () => {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      given_name: faker.name.firstName(),
      family_name: faker.name.lastName(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      role_id: 2,
      phone_number: faker.phone.phoneNumberFormat(),
      document_id: `${faker.datatype.number()}`,
      birthdate: faker.date.between('1983-01-01', '2007-01-01'),
      gender: 'M',
      company_id: 'be0a5f72-8917-4b7a-a478-05110c29da18',
      document_type: 1,
      flg_active: true,
      sub: faker.datatype.uuid(),
    });
  }

  await prisma.users.createMany({
    data: users,
  });
};

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
