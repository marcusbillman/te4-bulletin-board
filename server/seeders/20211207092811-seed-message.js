'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Messages',
      [
        {
          body: 'Hello, I am a message',
          type: 'text',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
        {
          body: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'link',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
