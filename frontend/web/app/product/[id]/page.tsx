"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedMaterial, setSelectedMaterial] = useState("matte-black");
  const [dimensions, setDimensions] = useState({ length: '10"', width: '8"', depth: '2"' });

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-[#f7f7f7] dark:bg-[#191919] text-[#2b2b2b] dark:text-white font-display antialiased selection:bg-[#2b2b2b] selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#191919]/90 backdrop-blur-sm border-b border-[#e5e5e5] dark:border-[#333]">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-[#2b2b2b] dark:text-white">
            <div className="size-6 text-[#2b2b2b] dark:text-white">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tight uppercase">AmarBox</h2>
          </Link>
          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium hover:text-[#2b2b2b]/70 dark:hover:text-white/70 transition-colors" href="#">Products</a>
            <a className="text-sm font-medium hover:text-[#2b2b2b]/70 dark:hover:text-white/70 transition-colors" href="#">Materials</a>
            <a className="text-sm font-medium hover:text-[#2b2b2b]/70 dark:hover:text-white/70 transition-colors" href="#">Portfolio</a>
            <a className="text-sm font-medium hover:text-[#2b2b2b]/70 dark:hover:text-white/70 transition-colors" href="#">Contact</a>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className="relative p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              <span className="absolute top-1.5 right-1 size-2 bg-[#2b2b2b] dark:bg-white rounded-full"></span>
            </button>
            <button className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1440px] mx-auto w-full px-6 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#757575] font-mono tracking-wide">
            <Link className="hover:text-[#2b2b2b] dark:hover:text-white transition-colors" href="/">HOME</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <a className="hover:text-[#2b2b2b] dark:hover:text-white transition-colors" href="#">RIGID BOXES</a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <a className="hover:text-[#2b2b2b] dark:hover:text-white transition-colors" href="#">MAGNETIC CLOSURE</a>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[#2b2b2b] dark:text-white font-medium border-b border-[#2b2b2b] dark:border-white">THE OBSIDIAN BOX</span>
          </div>
        </div>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Image */}
            <div className="w-full aspect-[4/3] bg-white dark:bg-[#222] rounded-lg shadow-sm border border-[#e5e5e5] dark:border-[#333] overflow-hidden group cursor-zoom-in relative">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-gXlW11-49lnuLMD4kLrjNCaSESLLnHddqaBDYHvsMuf8SMtUpd2V6_ekphYCe-UrhbnNnraOlOAAnWl6YAXGUCB20pCWRsIHMVL3AURcYYXLj-_FUi9fk-L-WWW3TP2LwmDtPURrN5v4iDHSYpgYoWk6JBV4zr88NXkS6OfW0l_7XNv3Y42pzuBA_8bFr0zS3Nwa5qBqTUgY5vvjhw_UHqX5YwH2-4zoBayZ_SVMR7l3veo0nhuHqyuE9hE_eXYfiZWOJiUUn3w')",
                }}
              ></div>
              <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono tracking-wider uppercase border border-[#2b2b2b]/10">
                Front View
              </div>
            </div>
            {/* Secondary Images Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full aspect-square bg-white dark:bg-[#222] rounded-lg shadow-sm border border-[#e5e5e5] dark:border-[#333] overflow-hidden group relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDu56JkeXxHGQRlB1t5oc2h24C35WROIXpDvM6RCt-rK9oXcp9EEA6TLOJX9gIuJaX_o2oFijtGiep-iB7ROOv-8iglom5cDjMAkZU_rkJrmHXkB4H1o1Z5V1pis_XL0MVsKrnpt38KMKUfS-uGVrQzZSB6vnuqY8FrHc3p6yf4O2QDnitbOIjFkxrRwUyGoJDnto9x4WdNop44ygLhxaqV42y0PaihZwj7m6dXLjmso4B161a9-ELgA8BtvRseecadOprcXJ4AAvk')",
                  }}
                ></div>
                <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono tracking-wider uppercase border border-[#2b2b2b]/10">
                  Texture Detail
                </div>
              </div>
              <div className="w-full aspect-square bg-white dark:bg-[#222] rounded-lg shadow-sm border border-[#e5e5e5] dark:border-[#333] overflow-hidden group relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_KLdoTSpRcxzfX8EZ5Z2uqetutvgWIRSyD_fhAT2G06XJ9N-pRrsQypst9eq82NRqWmq3vekpzK3Bf3-CFhzZ42ZH19YfF05h8OBT7XAPP69wec50mRloG36Tz5g8Lr2NPcb0gjCKzhWdtcn-bu8mZt5Nuwv9NdNCqVfAY0NTWxlyF3Gnifxw9lyKQTaH__TdX6dqin-zQ729ylw8abriMEVoHzKsim4ejO7GmTN60WdjZZrw4FlQOK3USqq3Z8Wnfw__mfXVnv4')",
                  }}
                ></div>
                <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono tracking-wider uppercase border border-[#2b2b2b]/10">
                  In Context
                </div>
              </div>
            </div>
            {/* Feature Diagram (Industrial Feel) */}
            <div className="w-full p-8 bg-white dark:bg-[#222] rounded-lg border border-[#e5e5e5] dark:border-[#333] flex flex-col gap-4">
              <h3 className="font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined">architecture</span>
                Technical Schematic
              </h3>
              <div className="relative w-full h-48 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMS0xaDM4VjFIMXYzOHoiIGZpbGw9IiNlNWU1ZTUiIG9wYWNpdHk9IjAuNSIvPjwvZz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMS0xaDM4VjFIMXYzOHoiIGZpbGw9IiMzMzMzMzMiIG9wYWNpdHk9IjAuNSIvPjwvZz48L3N2Zz4=')] flex items-center justify-center">
                {/* Abstract Box Line Drawing */}
                <svg className="stroke-[#2b2b2b] dark:stroke-white stroke-2" fill="none" height="120" viewBox="0 0 200 120" width="200" xmlns="http://www.w3.org/2000/svg">
                  <rect height="60" rx="2" width="120" x="40" y="40"></rect>
                  <path d="M40 40 L60 10 L140 10 L160 40" strokeDasharray="4 4"></path>
                </svg>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#757575]">SCALE 1:20</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs font-mono text-[#757575]">
                <div>
                  <div className="font-bold text-[#2b2b2b] dark:text-white">LID DEPTH</div>
                  <div>35mm</div>
                </div>
                <div>
                  <div className="font-bold text-[#2b2b2b] dark:text-white">WALL THICKNESS</div>
                  <div>2.5mm</div>
                </div>
                <div>
                  <div className="font-bold text-[#2b2b2b] dark:text-white">CLOSURE</div>
                  <div>2x Neodymium</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Configurator (Sticky Wrapper) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 flex flex-col gap-8">
              {/* Header Section */}
              <div className="border-b border-[#2b2b2b]/10 dark:border-white/10 pb-6">
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-[#2b2b2b] dark:text-white mb-2 leading-[1.1]">
                  Obsidian Magnetic<br />Rigid Box
                </h1>
                <p className="text-lg text-[#757575] leading-relaxed">
                  Premium heavyweight board with soft-touch lamination designed for luxury unboxing experiences.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#2b2b2b]/5 dark:bg-white/10 rounded text-xs font-bold uppercase tracking-wider text-[#2b2b2b] dark:text-white">
                    Best Seller
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-yellow-500 text-[18px]">star</span>
                    <span>4.9</span>
                    <span className="text-[#757575] font-normal">(128 Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Configuration: Material & Color */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2b2b2b] dark:text-white">Select Material</h3>
                  <a className="text-xs text-[#757575] underline hover:text-[#2b2b2b] dark:hover:text-white" href="#">Order Swatch Kit</a>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {/* Material Option 1 */}
                  <label className="cursor-pointer group relative">
                    <input
                      checked={selectedMaterial === "matte-black"}
                      onChange={() => setSelectedMaterial("matte-black")}
                      className="peer sr-only"
                      name="material"
                      type="radio"
                    />
                    <div className="p-3 rounded-lg border border-[#e0e0e0] dark:border-[#333] peer-checked:border-[#2b2b2b] peer-checked:border-[2px] peer-checked:bg-[#2b2b2b]/5 dark:peer-checked:bg-white/5 dark:peer-checked:border-white flex items-center gap-4 transition-all hover:bg-[#f2f2f2] dark:hover:bg-[#222]">
                      <div aria-hidden="true" className="size-12 rounded bg-[#2b2b2b] shadow-inner"></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-[#2b2b2b] dark:text-white">Matte Black (Soft Touch)</div>
                        <div className="text-xs text-[#757575]">1200 GSM • Smooth finish</div>
                      </div>
                      <span className="material-symbols-outlined text-[#2b2b2b] dark:text-white opacity-0 peer-checked:opacity-100">check_circle</span>
                    </div>
                  </label>
                  {/* Material Option 2 */}
                  <label className="cursor-pointer group relative">
                    <input
                      checked={selectedMaterial === "kraft-brown"}
                      onChange={() => setSelectedMaterial("kraft-brown")}
                      className="peer sr-only"
                      name="material"
                      type="radio"
                    />
                    <div className="p-3 rounded-lg border border-[#e0e0e0] dark:border-[#333] peer-checked:border-[#2b2b2b] peer-checked:border-[2px] peer-checked:bg-[#2b2b2b]/5 dark:peer-checked:bg-white/5 dark:peer-checked:border-white flex items-center gap-4 transition-all hover:bg-[#f2f2f2] dark:hover:bg-[#222]">
                      <div aria-hidden="true" className="size-12 rounded bg-[#8d6e63] shadow-inner"></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-[#2b2b2b] dark:text-white">Kraft Brown (Recycled)</div>
                        <div className="text-xs text-[#757575]">1000 GSM • Textured finish</div>
                      </div>
                      <span className="material-symbols-outlined text-[#2b2b2b] dark:text-white opacity-0 peer-checked:opacity-100">check_circle</span>
                    </div>
                  </label>
                  {/* Material Option 3 */}
                  <label className="cursor-pointer group relative">
                    <input
                      checked={selectedMaterial === "gloss-white"}
                      onChange={() => setSelectedMaterial("gloss-white")}
                      className="peer sr-only"
                      name="material"
                      type="radio"
                    />
                    <div className="p-3 rounded-lg border border-[#e0e0e0] dark:border-[#333] peer-checked:border-[#2b2b2b] peer-checked:border-[2px] peer-checked:bg-[#2b2b2b]/5 dark:peer-checked:bg-white/5 dark:peer-checked:border-white flex items-center gap-4 transition-all hover:bg-[#f2f2f2] dark:hover:bg-[#222]">
                      <div aria-hidden="true" className="size-12 rounded bg-[#f5f5f5] border border-gray-200 shadow-inner"></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-[#2b2b2b] dark:text-white">Gloss White (Coated)</div>
                        <div className="text-xs text-[#757575]">1200 GSM • High shine</div>
                      </div>
                      <span className="material-symbols-outlined text-[#2b2b2b] dark:text-white opacity-0 peer-checked:opacity-100">check_circle</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2b2b2b] dark:text-white">Dimensions (Interior)</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-[#757575] uppercase">Length</label>
                    <select
                      className="w-full bg-transparent border border-[#e0e0e0] dark:border-[#333] rounded px-3 py-2 text-sm font-bold focus:ring-[#2b2b2b] dark:focus:ring-white"
                      value={dimensions.length}
                      onChange={(e) => setDimensions((d) => ({ ...d, length: e.target.value }))}
                    >
                      <option>10&quot;</option>
                      <option>12&quot;</option>
                      <option>15&quot;</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-[#757575] uppercase">Width</label>
                    <select
                      className="w-full bg-transparent border border-[#e0e0e0] dark:border-[#333] rounded px-3 py-2 text-sm font-bold focus:ring-[#2b2b2b] dark:focus:ring-white"
                      value={dimensions.width}
                      onChange={(e) => setDimensions((d) => ({ ...d, width: e.target.value }))}
                    >
                      <option>8&quot;</option>
                      <option>10&quot;</option>
                      <option>12&quot;</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-[#757575] uppercase">Depth</label>
                    <select
                      className="w-full bg-transparent border border-[#e0e0e0] dark:border-[#333] rounded px-3 py-2 text-sm font-bold focus:ring-[#2b2b2b] dark:focus:ring-white"
                      value={dimensions.depth}
                      onChange={(e) => setDimensions((d) => ({ ...d, depth: e.target.value }))}
                    >
                      <option>2&quot;</option>
                      <option>3&quot;</option>
                      <option>4&quot;</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantity Tier & Price Estimate */}
              <div className="bg-[#f0f0f0] dark:bg-[#222] p-6 rounded-lg border border-[#e5e5e5] dark:border-[#333]">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-[#757575] tracking-wider mb-1">Estimated Unit Cost</div>
                    <div className="text-3xl font-black text-[#2b2b2b] dark:text-white">$4.85</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase text-[#757575] tracking-wider mb-1">MOQ</div>
                    <div className="text-xl font-bold text-[#2b2b2b] dark:text-white">500 Units</div>
                  </div>
                </div>
                {/* Progress Bar for Price Breaks */}
                <div className="w-full h-2 bg-[#d4d4d4] dark:bg-[#444] rounded-full mb-2 overflow-hidden">
                  <div className="w-1/3 h-full bg-[#2b2b2b] dark:bg-white"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono uppercase text-[#757575]">
                  <span>500</span>
                  <span>1000</span>
                  <span>2500+</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="w-full bg-[#2b2b2b] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-[#2b2b2b] h-14 rounded-lg font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#2b2b2b]/20">
                  <span>Request Sample</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <button className="w-full bg-transparent border-2 border-[#2b2b2b] dark:border-white hover:bg-[#2b2b2b]/5 dark:hover:bg-white/5 text-[#2b2b2b] dark:text-white h-12 rounded-lg font-bold text-sm uppercase tracking-wide transition-colors">
                  Start Custom Design
                </button>
              </div>
              <p className="text-center text-xs text-[#757575] mt-2">
                Need help? <a className="underline hover:text-[#2b2b2b] dark:hover:text-white" href="#">Chat with a packaging specialist</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Specifications Section (Accordion Style) */}
        <div className="mt-24 max-w-4xl mx-auto border-t border-[#e5e5e5] dark:border-[#333]">
          <div className="py-8">
            <h2 className="text-2xl font-bold text-[#2b2b2b] dark:text-white mb-8">Technical Specifications</h2>
            <div className="flex flex-col divide-y divide-[#e5e5e5] dark:divide-[#333]">
              {/* Spec Item 1 */}
              <details className="group py-4 cursor-pointer" open>
                <summary className="flex items-center justify-between font-bold text-lg list-none select-none [&::-webkit-details-marker]:hidden">
                  <span>Material Composition</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-[#757575] leading-relaxed">
                  <p className="mb-4">
                    Constructed from high-density 1200GSM greyboard, wrapped in 157GSM art paper. The interior is lined with matching uncoated paper for a seamless aesthetic. All adhesives used are non-toxic and water-based.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="bg-white dark:bg-[#222] p-3 rounded border border-[#e5e5e5] dark:border-[#333]">
                      <div className="text-xs font-mono uppercase text-[#757575] mb-1">Board Grade</div>
                      <div className="font-bold text-sm">A-Grade Rigid</div>
                    </div>
                    <div className="bg-white dark:bg-[#222] p-3 rounded border border-[#e5e5e5] dark:border-[#333]">
                      <div className="text-xs font-mono uppercase text-[#757575] mb-1">Recyclable</div>
                      <div className="font-bold text-sm">100%</div>
                    </div>
                    <div className="bg-white dark:bg-[#222] p-3 rounded border border-[#e5e5e5] dark:border-[#333]">
                      <div className="text-xs font-mono uppercase text-[#757575] mb-1">FSC Certified</div>
                      <div className="font-bold text-sm">Available</div>
                    </div>
                  </div>
                </div>
              </details>
              {/* Spec Item 2 */}
              <details className="group py-4 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none select-none [&::-webkit-details-marker]:hidden">
                  <span>Print &amp; Finish Options</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-[#757575] leading-relaxed">
                  <p>
                    Standard options include CMYK offset printing, Pantone matching, and digital printing for smaller runs. Finishes include matte or gloss lamination, spot UV, hot foil stamping (Gold, Silver, Rose Gold), and embossing/debossing.
                  </p>
                </div>
              </details>
              {/* Spec Item 3 */}
              <details className="group py-4 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none select-none [&::-webkit-details-marker]:hidden">
                  <span>Shipping &amp; Lead Times</span>
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="pt-4 text-[#757575] leading-relaxed">
                  <p>
                    Sample production takes 5-7 business days. Bulk production typically requires 15-20 business days after artwork approval. Express shipping options available globally via DHL, FedEx, or sea freight for larger orders.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pb-16">
          <h2 className="text-2xl font-bold text-[#2b2b2b] dark:text-white mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card 1 */}
            <a className="group" href="#">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBy4X3cnPr6xyTecs6Ial79N_yxtR1HO4EDIb8lBcjXkrN12oxceObBEmhOc6OUP6JKPfoHYpr1U-CUrhkuuNp_AkVSgeMWhFxeGPtwpLQ7HhHTPyBgEs-WUP9Ka9FjIk9_gDV1cim7kqVJIX-zX0jPkpwUfi_vdPXJsd_Bvbjs0aTs2NjbDWaRDVOpi-BqDx_gt9jOP88KCdCtDefvWFwn47JqgQ3H9PSAAu3uC7JYYSBe-YihqU-ni4mrCoQj-RoAdxwcwLFjVqE')",
                  }}
                ></div>
              </div>
              <h3 className="font-bold text-[#2b2b2b] dark:text-white group-hover:underline">Kraft Folding Carton</h3>
              <p className="text-sm text-[#757575]">From $0.85 / unit</p>
            </a>
            {/* Card 2 */}
            <a className="group" href="#">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_vTHoBCMhlYw8EIjcSHu4ghwaTBN7vwzv3iicF36j-UE93K9SkcRgBIZtlJ3crNGJJs7RD8WhM-dzvfcMuKwCYr-I6L5i1Q2H4_fczGIT3ts21Wd-xkG2kFl1S-cwkDIZ2K_wnNa42jgqQZQ2QyEhJcKznSVT5QY710zxLw-tl8a1RJ6Hefy0f9zDroBPggiSpUjjvHWGFggS41ogBDbHLP86jLIaJMCcfcpXqZeexcHIvA7Fw44hke_3VFo9ymLArfBMpNm3WB0')",
                  }}
                ></div>
              </div>
              <h3 className="font-bold text-[#2b2b2b] dark:text-white group-hover:underline">White Magnetic + Ribbon</h3>
              <p className="text-sm text-[#757575]">From $5.20 / unit</p>
            </a>
            {/* Card 3 */}
            <a className="group" href="#">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKTayVNCegrUhj5wuhvr4cLNnHElwtJGAlheUOoiuAyvhEw43TAQq5uTUogG_ZoReKYA0T0M-eIDCUYPbzFLBYMC7ZiRmOZzZ2QGoKCFnr7JRqWO7PTz_98kezZt6cXjwQchXj1GLCFgBj78xU5f1YSszhRt9FDG0qkQ5P1pWgp1Bk2S7r4LY7GKZV3Z7M9AYtTZfUcrhTu49gtuQ4PJjfRckbVPrvxaWJUlxtNYlyrnVPcewL6QgzL4Ce98Jukd0doav_aA5_B8M')",
                  }}
                ></div>
              </div>
              <h3 className="font-bold text-[#2b2b2b] dark:text-white group-hover:underline">Paper Tube Packaging</h3>
              <p className="text-sm text-[#757575]">From $1.50 / unit</p>
            </a>
            {/* Card 4 */}
            <a className="group" href="#">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClAvIReGIPbcuQ2NMSvnOqNHnmSDzGT1QtVnr8FOqJb0y_4hJnBAhAZze7H5atpfrZSReB7hmucEPXwI3EvoGP5gjMkMeDDRD5Ecc0DBTgF-fuOHWJIJ8ye0zR3jd5RoPxJ-3DutDEgV34HkVDhZPPvv5_YmTnZx-Y4PARgIeJGnk6Yw9fEN8Db04mmxuZ6WUJCOMqdI3cgNfWIjZy6TaOz1b_ciBGiEQMIrjyiW4TqHhpyMeY8PaTTc3lPXeYSKccF9q7iJd3C1U')",
                  }}
                ></div>
              </div>
              <h3 className="font-bold text-[#2b2b2b] dark:text-white group-hover:underline">E-commerce Mailer</h3>
              <p className="text-sm text-[#757575]">From $1.10 / unit</p>
            </a>
          </div>
        </div>
      </main>

      {/* Footer Simple */}
      <footer className="border-t border-[#e5e5e5] dark:border-[#333] py-12 bg-white dark:bg-[#191919]">
        <div className="max-w-[1440px] mx-auto px-6 text-center text-sm text-[#757575]">
          <p>© 2024 AmarBox Packaging Solutions. Crafted with precision.</p>
        </div>
      </footer>
    </div>
  );
}
