import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function HomePage() {
  return (
    <>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-40 mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-primary dark:text-white">

        {/* ================= NAVBAR ================= */}
        <header className="sticky top-0 z-40 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-primary/10 dark:border-white/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">

              {/* Logo */}
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="AmarBox Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <h2 className="text-xl font-black tracking-tight uppercase">
                  AmarBox
                </h2>
              </div>

              {/* Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="nav-link">Materials</Link>
                <Link href="#" className="nav-link">Shapes</Link>
                <Link href="#" className="nav-link">Gallery</Link>
                <Link href="/product/box-1" className="nav-link">Services</Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-sm font-bold uppercase tracking-wider hover:underline">
                  Log In
                </Link>
                <Link
                  href="/calculator"
                  className="border border-primary px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="flex-grow">

          {/* ================= HERO ================= */}
          <section className="border-b border-primary/10 dark:border-white/10">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-12 gap-12 items-center">

              {/* Text */}
              <div className="lg:col-span-5 space-y-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-widest border rounded-full">
                  Industrial Craft v2.0
                </span>

                <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                  PACKAGING THAT SPEAKS <br />
                  <span className="opacity-40">YOUR BRAND.</span>
                </h1>

                <p className="text-lg opacity-70 max-w-md">
                  Custom industrial design and sustainable materials for the modern maker.
                </p>

                <div className="flex gap-4">
                  <Link
                    href="/calculator"
                    className="bg-primary text-white px-8 py-4 font-bold uppercase tracking-wider hover:opacity-90"
                  >
                    Start Your Design →
                  </Link>
                  <button className="border px-8 py-4 font-bold uppercase tracking-wider">
                    View Samples
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-boxes.png"
                    alt="Kraft boxes"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="py-20 bg-white dark:bg-[#1f1f1f]">
            <div className="max-w-[1440px] mx-auto px-4">
              <h2 className="text-4xl font-black mb-12">HOW IT WORKS</h2>
              <h3 className="text-lg opacity-70 mb-8">We've simplified the industrial process. From digital file to physical product in three streamlined steps</h3>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  ["01", "Upload Your Artwork and Get Quotes"],
                  ["02", "Create a Custom Instant Quote"],
                  ["03", "Production & Ship"],
                ].map(([num, title]) => (
                  <div key={num} className="p-8 border rounded-lg">
                    <span className="text-6xl opacity-10 font-black">{num}</span>
                    <h3 className="text-xl font-bold mt-4">{title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= MATERIAL SHOWCASE ================= */}
          <section className="py-20">
            <div className="max-w-[1440px] mx-auto px-4">
              <h2 className="text-4xl font-black text-center mb-12">
                MATERIAL SHOWCASE
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ["mailer.png", "Corrugated Mailers"],
                  ["rigid.png", "Rigid Boxes"],
                  ["folding.png", "Folding Cartons"],
                  ["sleeve.png", "Product Sleeves"],
                  ["insert.png", "Custom Inserts"],
                ].map(([img, title]) => (
                  <div key={title}>
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={`/public/${img}`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-3 font-bold">{title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className="py-24 bg-primary text-white text-center">
            <h2 className="text-4xl font-black mb-6">
              READY TO MAKE IT REAL?
            </h2>
            <p className="opacity-80 mb-10">
              Join thousands of brands packaging with AmarBox.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/calculator" className="bg-white text-primary px-8 py-4 font-bold uppercase">
                Get Instant Quote
              </Link>
              <button className="border px-8 py-4 font-bold uppercase">
                Request Sample Kit
              </button>
            </div>
          </section>

        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-black text-white py-16 text-center text-sm opacity-70">
          © 2024 AmarBox. All rights reserved.
        </footer>
<Footer />


      </div>
    </>
  );
}
