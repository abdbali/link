import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export const revalidate = 120;

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const user = await db.user.findUnique({
    where: { username: params.username },
    include: { profile: true }
  });

  if (!user) notFound();

  const theme = user.profile?.themeJson as
    | { background: string; primaryColor: string; buttonStyle: 'rounded' | 'square'; layout: 'compact' | 'wide' }
    | undefined;

  return (
    <main style={{ background: theme?.background ?? '#fff', padding: 24 }}>
      <h1 style={{ color: theme?.primaryColor ?? '#111' }}>{user.name}</h1>
      <p>@{user.username}</p>
      <p>Bu sayfa ISR ile üretilir. (revalidate=120)</p>
    </main>
  );
}
