const { v4: uuidv4 } = require('uuid');
const prisma = require('../src/prismaClient');

(async () => {
  try {
    await Promise.all(
      [
        { id: uuidv4(), name: 'Ore' },
        { id: uuidv4(), name: 'Enmatter' },
        { id: uuidv4(), name: 'Treasure' },
        { id: uuidv4(), name: 'Refined Ore' },
        { id: uuidv4(), name: 'Refined Enmatter' },
        { id: uuidv4(), name: 'Refined Treasure' },
      ].map(({ id, name }) => prisma.type_item.create({ data: { id, name } }))
    );
  } catch (error) {
    throw new Error(error);
  }
})()
  .then(() => {
    console.log('ALL SEEDS FOR PROD DONE !');
  })
  .catch((e) => console.error(e))
  .finally(() => process.exit());
