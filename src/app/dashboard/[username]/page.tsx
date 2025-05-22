export default function Page({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-row min-h-screen items-center justify-center font-geist-mono text-4xl">
      Welcome, {params.username}
    </div>
  );
}