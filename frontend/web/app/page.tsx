"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-primary dark:text-white antialiased">
      {/* Texture Overlay for "Kraft" feel */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-40 mix-blend-multiply dark:mix-blend-overlay"></div>

      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        {/* Navigation */}
        <header className="sticky top-0 z-40 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-primary/10 dark:border-white/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="size-8 bg-primary text-white flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                </div>
                <h2 className="text-primary dark:text-white text-xl font-black tracking-tight uppercase">AmarBox</h2>
              </div>
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <Link className="text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors" href="/">Home</Link>
                <Link className="text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors" href="/calculator">Calculator</Link>
                <Link className="text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors" href="/product/obsidian-box">Services</Link>
                <Link className="text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white text-sm font-semibold uppercase tracking-wide transition-colors" href="/auth">Sign In</Link>
              </nav>
              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link
                  href={isLoggedIn ? "/dashboard" : "/auth"}
                  className="hidden sm:flex text-primary dark:text-white text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
                >
                  {isLoggedIn ? "Dashboard" : "Log In"}
                </Link>
                <Link href="/calculator" className="relative group cursor-pointer overflow-hidden rounded-sm border-2 border-primary dark:border-white bg-transparent px-5 py-2 transition-all hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary">
                  <span className="relative z-10 text-sm font-bold uppercase tracking-wider">Get Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative w-full border-b border-primary/10 dark:border-white/10 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
              {/* Hero Content */}
              <div className="lg:col-span-5 flex flex-col gap-8 text-left z-10">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 dark:border-white/20 w-fit bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                    <span className="size-2 rounded-full bg-green-600 animate-pulse"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-primary/70 dark:text-white/70">Industrial Craft V2.0</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-primary dark:text-white">
                    PACKAGING<br />THAT SPEAKS<br /><span className="text-primary/40 dark:text-white/40">YOUR BRAND.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-primary/70 dark:text-white/70 max-w-md font-medium leading-relaxed">
                    Custom industrial design and sustainable materials for the modern maker. From digital to physical in days.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/calculator" className="relative group overflow-hidden bg-primary text-white dark:bg-white dark:text-primary px-8 py-4 rounded-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 transform">
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:bg-transparent transition-colors"></span>
                    <span className="relative flex items-center gap-2 text-base font-bold uppercase tracking-wider">
                      Start Your Design
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </span>
                  </Link>
                  <button className="px-8 py-4 rounded-sm border-2 border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-white transition-colors text-base font-bold uppercase tracking-wider text-primary dark:text-white">
                    View Samples
                  </button>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t border-primary/10 dark:border-white/10 mt-4">
                  <div className="flex -space-x-3">
                    <img alt="Customer avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmxTz1h1KbTbYp8E9nuLr-Y7-4ZbW8NY8o2YSKdNHCNuoJrYC5gmqjBYh0jegGvH9b1OKTqL_QbM0Zqy7i5svBq5tcyqY-9QT01eaVCevNMWp-PUonnvNiCnUz4kEMMjNtEIxXL1OHAUkrirXMEOfxIf4dFqwHjhYXmSDKMJDaA3HSmTsrS0h-awjTy1BQ4MF1ReSXcF4WxRKalU0w9JX-F8soaN1atLK6OLTuuoQRObbChOcMUTR6Hj1UE9hZiFjAmcPyLPIBbVQ" />
                    <img alt="Customer avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDndAu09lKp0iEomvIiN7kno-XlGTTgHhi8pQduja23JvZ0q6VX65Lp-AtSKMERfhnNOSEyvehB0mJRb1TSnWIL8yluqGQDFe1BWcbxu2C8Ncla6d3ahPqgfqCrowbu75CaeTWGSeILIh6Sbuz0REHLqMIc0UUQx6pizlIpEd5KbOkDfFKkWe9nZJLyx8stRCXPFs1D7zC21SLnzDniY9nsHPG1NImra1FsrpZ8dCOh7LDY_mwnDAy2Nc_TduVjq84l20fZyoDPzw0" />
                    <img alt="Customer avatar" className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXuyMxmmV7ZTWRDfmytzeoRnnb-nIUiTl_CELUc-xXrD3Tovpj-QTLTFGlOjv_dkPeA0N2wwoQeCbC_4H8OrV4igP8L4S2hr1VAD_SSiBB5yIubyVoy-vobqXcL_FpFwVL_8EX93ApU-bN2NQfG64HhJrmJSNpVMwAJTZ2IHaakjBMBt10cH3kKKa6KL2uy6CXwEeQUUzWljFaxqV76GUSuCveFdNjMlR6zjs7jkZG5XaCOHjk8AgPXCqrsDEfqBeppNsrJrkVug4" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-500 text-sm">
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[16px] fill-current">star</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary/60 dark:text-white/60">Trusted by 2,000+ Makers</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="lg:col-span-7 relative h-full min-h-[400px] flex items-center justify-center lg:justify-end">
                <div className="relative w-full aspect-[4/3] max-w-2xl group cursor-pointer">
                  <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary/10 dark:border-white/10 rounded-lg"></div>
                  <div className="absolute -bottom-4 -left-4 w-full h-full bg-primary/5 dark:bg-white/5 rounded-lg -z-10"></div>
                  <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl relative bg-white">
                    <img alt="Stack of minimalist kraft paper boxes on a wooden surface" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeaOKxmjyTOa-xgmbLr3Qi2Wzv-fmHxyvjeW-t9pnzdgOr3UWpISEP2n2S25PD-3u45Q6HnvuGOdYqFL28TbONJU9cNWd9cxfCdR2kfv2JcKONJKNXIuwEYlox6QApqf8KyRxmXm2nUQ6camIl6XxcCRLbTN2AiYKPH1MdcqUs9hNf_oD9cibTLf5LIBo3wRw2j3TbYnb39nGtnJDG1ToEEJaDX7QmjP0S-wURSBcEUz1oq4ZHhZqyjZUmcRCZwnabBJf59Ii4IeU" />
                    <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-sm shadow-lg border border-primary/10 dark:border-white/10 max-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary dark:text-white">recycling</span>
                        <span className="text-xs font-bold uppercase">100% Recycled</span>
                      </div>
                      <p className="text-xs text-primary/70 dark:text-white/70 leading-relaxed">
                        Crafted from post-consumer waste corrugated cardboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features / Process Section */}
          <section className="py-20 bg-white dark:bg-[#1f1f1f] border-b border-primary/10 dark:border-white/10">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-primary dark:text-white mb-4">HOW IT WORKS</h2>
                  <p className="text-lg text-primary/60 dark:text-white/60">We&apos;ve simplified the industrial process. From digital file to physical product in three streamlined steps.</p>
                </div>
                <a className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4" href="#">
                  Read Documentation <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative p-8 rounded-lg border border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-white transition-colors bg-background-light dark:bg-background-dark">
                  <div className="absolute top-6 right-6 text-6xl font-black text-primary/5 dark:text-white/5 font-mono group-hover:text-primary/10 dark:group-hover:text-white/10 transition-colors">01</div>
                  <div className="size-12 bg-primary dark:bg-white text-white dark:text-primary rounded-full flex items-center justify-center mb-6 shadow-md">
                    <span className="material-symbols-outlined text-[24px]">design_services</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Design &amp; Upload</h3>
                  <p className="text-primary/70 dark:text-white/70 leading-relaxed text-sm">Use our 3D editor to visualize your box or upload your existing dieline artwork directly.</p>
                </div>
                <div className="group relative p-8 rounded-lg border border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-white transition-colors bg-background-light dark:bg-background-dark">
                  <div className="absolute top-6 right-6 text-6xl font-black text-primary/5 dark:text-white/5 font-mono group-hover:text-primary/10 dark:group-hover:text-white/10 transition-colors">02</div>
                  <div className="size-12 bg-primary dark:bg-white text-white dark:text-primary rounded-full flex items-center justify-center mb-6 shadow-md">
                    <span className="material-symbols-outlined text-[24px]">request_quote</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Instant Quote</h3>
                  <p className="text-primary/70 dark:text-white/70 leading-relaxed text-sm">Get real-time pricing based on quantity, material, and finish. No hidden fees or delays.</p>
                </div>
                <div className="group relative p-8 rounded-lg border border-primary/10 dark:border-white/10 hover:border-primary dark:hover:border-white transition-colors bg-background-light dark:bg-background-dark">
                  <div className="absolute top-6 right-6 text-6xl font-black text-primary/5 dark:text-white/5 font-mono group-hover:text-primary/10 dark:group-hover:text-white/10 transition-colors">03</div>
                  <div className="size-12 bg-primary dark:bg-white text-white dark:text-primary rounded-full flex items-center justify-center mb-6 shadow-md">
                    <span className="material-symbols-outlined text-[24px]">print_connect</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">Production &amp; Ship</h3>
                  <p className="text-primary/70 dark:text-white/70 leading-relaxed text-sm">Industrial-grade printing and cutting, quality checked, and shipped to your door in 7 days.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section className="py-20 border-b border-primary/10 dark:border-white/10">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center gap-4 mb-16">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/50 dark:text-white/50">Our Catalogue</span>
                <h2 className="text-4xl font-black text-primary dark:text-white tracking-tight">MATERIAL SHOWCASE</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <img alt="Brown corrugated shipping box" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvsMHXQFWaEgIgiOz41EJ0Nj6ayPSTekrCBnK-8fL00RSguURJGNLmXdmfRlEg_M9rj6DnoO1SaDWlbnct8Lq9Z85jqGmMSMMVlbouvLJKaMWf83umszidvVR9l3Cnhr-yIh7SAPEfKggMfWvOaMq-YsFP1nOxbaow1FtJiMfdwl0yne15mg_RtxxnhLwphRyb-Zplh8IcHZ-YztB7TX9i7y8PD7h-vLm1vdApAe9jjjvwjqu6i98CdHvJm1uBWi808cZyH6XYamg" />
                    <div className="absolute bottom-4 left-4 z-20 bg-white dark:bg-black px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider shadow-sm">Top Seller</div>
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1 group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">Corrugated Mailers</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Durable protection for shipping.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <img alt="Elegant rigid gift box packaging" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAFaw9d61S8CJJFfsJGLmRGMXUJv9U5NhN0Da0BKj68APlZEH8F8QYnOR-u6bE7py3FGZX9pDQiVuFHHHH7bVgY10lp39O4_Nj_Q1r7fTzVvV3fJkly65JenXVcKJNmKapBH9IDuANF7VnMVa6fheCaj6Ljkuz6Q5PnzK2ElFVuFe-tXT1_ACSQjZSWLtDiQmu4vwXvXr-bcioLWo5ezKsdD_vrWIvc9l_B-9sizdZk9zca9ALVg7j_dIiE16bIkUYNIVzq1ZXFlg" />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1 group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">Rigid Boxes</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Premium unboxing experience.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <img alt="Folding carton for cosmetics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABWjrdBERHiXWCq2PFli6RtWwUmUeDdy3mOdv0yIrN7G99QL31NCNWs87was-gYXptELSBAszoHRe1ylKdCSRtFpHUZD0g3Ms-t9J0unlB_26BAYkYH1o8f3MPlGiIFvaIyZYvIiZTf8ri96iKWt1WCAX1zvwmKwQlLrE0vA6d2jg261hbg1q2Qy9ruAGbBUVZqi1UhSYOX4oUoGOTlnrBEdJEw2DJ5fHF8SPCjw6Kh2z6BvagRk2gSIEYqCzc4gFiTMuJXYW2A6M" />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1 group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">Folding Cartons</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Versatile retail packaging.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <img alt="Paper sleeves for products" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoYdBp-3zwemrBAKJWB6pMmhp7RHGJL-fs4QkCTAlY2TiI8dfBt-ySdR4XlWpXlhzVkL7kY1qgNiW1XjUBJfGXFvCK6yEEAvvkplhybwok-e74GnlyWuya9kVZ9SofJig7K703twBVCq2NwtLvMNqPS0tFdC_t9jyh6sgldayTBv5NY2TEBgVnbkKwhLIJSzThHdC8CSWWWhHBMSYQll-PAFtdbr8mlFsdMp2gQa8lIO7IrzLtO1TYEC3t0aiCJPLyKpAozkV8I3w" />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1 group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">Product Sleeves</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Cost-effective branding.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <img alt="Cardboard inserts inside a box" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNoLVk-31J-Zbs8Fp362YP1wEb8DHc58Sgwe9as4AOf90BZkg1eEmbhMLZ57_grc8JgstBT6Lgzb_L7aaQv-al6CKsPBPEO8McPTJKcpteCAqPkEZckahZ-iZ4lH8o4CxONI93xiCCf_QwzKS4LffYrvaedgHU3uRpzHwc-etkYhDGwAAW5HLAy0l1AZr8UggGU8VVJv-z9xqVEc93EY0tdqgVAL15RxJ6bAk5qRh6fPTqePVXfSZYxHgxxbCXDP6rqN7Da0wbVMY" />
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1 group-hover:text-primary/70 dark:group-hover:text-white/70 transition-colors">Custom Inserts</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Secure product positioning.</p>
                </div>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg aspect-square mb-4 bg-gray-100 dark:bg-gray-800">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                      <div className="text-center p-6 border-2 border-dashed border-primary/20 dark:border-white/20 rounded-lg">
                        <span className="material-symbols-outlined text-[40px] text-primary/40 dark:text-white/40 mb-2">add</span>
                        <p className="text-sm font-bold uppercase text-primary/60 dark:text-white/60">View Full Gallery</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary dark:text-white mb-1">More Options</h3>
                  <p className="text-sm text-primary/60 dark:text-white/60">Explore 50+ material types.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Trust / Info Grid */}
          <section className="py-20 bg-white dark:bg-[#1f1f1f]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-3 p-6 rounded-lg bg-background-light dark:bg-background-dark border border-primary/5 dark:border-white/5">
                  <span className="material-symbols-outlined text-[32px] text-primary dark:text-white">water_drop</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">Eco-friendly Inks</h4>
                    <p className="text-sm text-primary/60 dark:text-white/60">Soy-based, non-toxic printing.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6 rounded-lg bg-background-light dark:bg-background-dark border border-primary/5 dark:border-white/5">
                  <span className="material-symbols-outlined text-[32px] text-primary dark:text-white">inventory</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">Low MOQs</h4>
                    <p className="text-sm text-primary/60 dark:text-white/60">Start with as few as 10 units.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6 rounded-lg bg-background-light dark:bg-background-dark border border-primary/5 dark:border-white/5">
                  <span className="material-symbols-outlined text-[32px] text-primary dark:text-white">speed</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">Fast Turnaround</h4>
                    <p className="text-sm text-primary/60 dark:text-white/60">Standard 7-10 day production.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6 rounded-lg bg-background-light dark:bg-background-dark border border-primary/5 dark:border-white/5">
                  <span className="material-symbols-outlined text-[32px] text-primary dark:text-white">support_agent</span>
                  <div>
                    <h4 className="font-bold text-base mb-1">Expert Support</h4>
                    <p className="text-sm text-primary/60 dark:text-white/60">Real humans checking your files.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">READY TO MAKE IT REAL?</h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">Join thousands of brands packaging their products with AmarBox. Quality you can feel, at prices that scale.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/calculator" className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                  Get Instant Quote
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                  Request Sample Kit
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-background-dark text-white pt-20 pb-10 border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-white text-primary flex items-center justify-center rounded-sm">
                    <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight">AmarBox</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  AmarBox provides custom packaging solutions for modern brands. We combine industrial precision with craft aesthetics to make your product stand out.
                </p>
                <div className="flex gap-4">
                  <a className="text-white/60 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                  <a className="text-white/60 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Products</h4>
                <ul className="space-y-4 text-sm text-white/80">
                  <li><a className="hover:text-white transition-colors" href="#">Mailer Boxes</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Shipping Boxes</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Product Boxes</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Rigid Boxes</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Stickers &amp; Labels</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Company</h4>
                <ul className="space-y-4 text-sm text-white/80">
                  <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Sustainability</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Customers</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Careers</a></li>
                  <li><a className="hover:text-white transition-colors" href="#">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Stay Updated</h4>
                <p className="text-sm text-white/60 mb-4">Get the latest design trends and packaging tips.</p>
                <div className="flex gap-2">
                  <input className="bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 w-full placeholder:text-white/20" placeholder="Email address" type="email" />
                  <button className="bg-white text-primary px-4 py-2 rounded-sm text-sm font-bold hover:bg-gray-200 transition-colors">GO</button>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/40">&copy; 2024 AmarBox Inc. All rights reserved.</p>
              <div className="flex gap-6 text-xs text-white/40">
                <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
