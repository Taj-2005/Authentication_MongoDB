import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <Link href="/login" className="text-2xl font-geist-sans">Go to Login Page</Link>
      <Link href="/signup" className="text-2xl font-geist-sans">Go to SignUp Page</Link>
    </div>
  );
}
