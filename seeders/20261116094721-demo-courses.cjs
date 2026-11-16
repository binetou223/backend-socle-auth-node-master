'use strict'

const { randomUUID } = require('node:crypto')

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const teacher = await queryInterface.rawSelect(
      'users',
      {
        where: { email: 'teacher@cours-alygne.test' },
      },
      ['id'],
    )

    await queryInterface.bulkInsert('courses', [
      {
        id: randomUUID(),
        title: 'Introduction à Node.js et Express',
        description: 'Apprenez à construire des API REST performantes et modulaires.',
        is_published: true,
        teacher_id: teacher || null,
        created_at: now,
        updated_at: now,
      },
      {
        id: randomUUID(),
        title: 'TypeScript Avancé',
        description: 'Maîtrisez les types génériques, le typage strict et le utilitaires.',
        is_published: true,
        teacher_id: teacher || null,
        created_at: now,
        updated_at: now,
      },
      {
        id: randomUUID(),
        title: 'Architecture Logicielle et Clean Code',
        description: 'Découpage en couches, séparation des responsabilités et tests.',
        is_published: true,
        teacher_id: teacher || null,
        created_at: now,
        updated_at: now,
      },
      {
        id: randomUUID(),
        title: 'Sécurité des API et JWT (Brouillon)',
        description: 'Ce cours est en cours de rédaction par le formateur.',
        is_published: false, 
        teacher_id: teacher || null,
        created_at: now,
        updated_at: now,
      },
    ])
  },

  async down(queryInterface) {
    
    await queryInterface.bulkDelete('courses', null, {})
  },
}