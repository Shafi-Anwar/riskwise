const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.plan.createMany({
    data: [
      {
        name: 'Basic',
        description: 'For those who are just beginning — or barely holding on.',
        price: 0,
        features: [
          'Risk score (monthly)',
          'Role-based insights',
          'Basic pattern analysis',
          'Email-only support'
        ]
      },
      {
        name: 'Pro',
        description: 'For solo workers quietly growing.',
        price: 1200,
        features: [
          'Weekly risk tracking',
          'Burnout & fatigue alerts',
          'Deep behavior audits',
          'Downloadable reports',
          'Priority support'
        ]
      },
      {
        name: 'Premium',
        description: 'For those building something bigger.',
        price: 2900,
        features: [
          'Daily risk analysis',
          'Personalized recovery paths',
          'Offline mode (local analysis)',
          'Private journaling',
          'Early access tools',
          '1-on-1 monthly review'
        ]
      }
    ]
  })
}

main().finally(() => prisma.$disconnect())
