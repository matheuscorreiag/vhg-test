import { PrismaClient } from '@prisma/client';
import { BcryptEncrypter } from '../src/user/infra/protocols/security/bcrypt/bcrypt.encrypter';

const prisma = new PrismaClient();

const products = [
  {
    name: 'Swag Labs Backpack',
    description: 'Backpack with a built-in webcam and a USB charging port',
    price: 29.99,
    rating: 4,
    colors: ['black', 'gray', 'red'],
  },
  {
    name: 'Swag Labs Bike',
    description: 'Bike with a built-in webcam and a USB charging port',
    price: 9.99,
    rating: 4,
    colors: ['black', 'gray', 'red'],
  },
  {
    name: 'Swag Labs Bolt T-Shirt',
    description: 'T-Shirt with a built-in webcam and a USB charging port',
    price: 15.99,
    rating: 4,
    colors: ['black', 'gray', 'red'],
  },
  {
    name: 'Swag Labs Fleece Jacket',
    description: 'Jacket with a built-in webcam and a USB charging port',
    price: 29.99,
    rating: 4,
    colors: ['black', 'gray', 'red'],
  },
];
async function main() {
  const encrypter = new BcryptEncrypter();

  await prisma.user.upsert({
    where: { email: 'example@example.com' },
    update: {},
    create: {
      email: 'example@example.com',
      password: await encrypter.execute('123456'),
    },
  });

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        imageUrl: `https://picsum.photos/id/${Math.floor(
          Math.random() * 1000,
        )}/200/300`,
      },
    });
  }
}
main()
  .then(async () => {
    console.log('Seeded successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
