import { authConfig } from '@/app/lib/auth';
import nextAuth from 'next-auth'

const handler = nextAuth(authConfig);

export { handler as GET, handler as POST }