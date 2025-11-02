
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'test@example.com',
			name: 'Test User',
		},
	});
	console.log('Создан пользователь:', user);

	const users = await prisma.user.findMany();
	console.log('Все пользователи:', users);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});