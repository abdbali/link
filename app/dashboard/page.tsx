export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  return (
    <section>
      <h1>Dashboard (SSR)</h1>
      <p>Bu sayfa kullanıcı paneli için tamamen SSR olarak sunulur.</p>
      <p>Server render timestamp: {new Date().toISOString()}</p>
    </section>
  );
}
