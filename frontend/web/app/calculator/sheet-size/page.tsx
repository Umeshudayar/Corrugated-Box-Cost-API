"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function SheetSizeCalculatorPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    sheet_length: "",
    sheet_width: "",
    units: "mm",
    top_quality: "Virgin Kraft",
    top_weight: 120,
    flute_quality: "Semi Chemical",
    flute_weight: 120,
    bottom_quality: "Test Liner",
    bottom_weight: 120,
    ply_num: 3,
    boxes_per_sheet: 1,
    total_quantity: 1000,
    attachment: "none",
    pins_per_box: 0,
    flute_type: "EF",
    punching: false,
    lamination: false,
    printing: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/auth");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      user_id: user.user_id,
      input_type: "sheet_size",
      sheet_size: {
        length: Number(formData.sheet_length),
        width: Number(formData.sheet_width),
        units: formData.units,
      },
      box_type: "Universal",
      paper_properties: {
        paper_weight: [formData.top_weight, formData.flute_weight, formData.bottom_weight],
        paper_quality: [formData.top_quality, formData.flute_quality, formData.bottom_quality],
        ply_num: Number(formData.ply_num),
      },
      order_details: {
        number_of_boxes: Number(formData.total_quantity),
        box_per_sheet: Number(formData.boxes_per_sheet),
      },
      manufacturing_processes: {
        is_printed: formData.printing,
        pins_per_box: formData.attachment === "pinning" ? Number(formData.pins_per_box) : 0,
      },
    };

    try {
      const data = await api.calculateBoxCost(payload);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="size-8 text-[#1173d4] flex items-center justify-center bg-[#1173d4]/10 rounded-lg">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">AmarBox</h2>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="bg-[#1173d4] rounded-full size-9 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-800 h-1">
          <div className="bg-[#1173d4] h-1 w-[35%] transition-all duration-500 ease-out"></div>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-[#111418] dark:text-white tracking-tight">Sheet Size Estimate</h1>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                ID: #EST-{new Date().getFullYear()}-{Math.floor(Math.random() * 999)}
              </span>
            </div>

            {/* Step 1: Method Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Step 1: Calculation Method</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Option A (Box Dimensions - link) */}
                <Link
                  href="/calculator"
                  className="relative group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div
                    className="bg-cover bg-center h-40 flex flex-col justify-end p-5"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCN2IKRXGwJN5KYdFgP43TQCArhpYp61DBRb8VN8L41G_vchKgndsEGyjbQzp79Krq4Fdl83DO2A2qrEfVAHwi206oGiZfjIm9hi313tWVVa3yTg6oTeZxIUjib9749UaX_mNDtY0C8UYHeyMtMhXZpOuUbLV77Kg9RwbOG0CBNXJHZZgzNI_BcVdxH-94xXdmCP5sqna1r3kG6B170LQrWVCD4C7FL9yxLk1o6dEm-yEXiRikDEjYc5QCDpPcGTNBW9T3p5u9sNR0')",
                    }}
                  >
                    <div className="text-white">
                      <p className="text-xs font-medium uppercase opacity-80 mb-1">Method A</p>
                      <h4 className="text-xl font-bold">Box Dimensions</h4>
                      <p className="text-sm opacity-90 mt-1">Switch to box dimensions mode</p>
                    </div>
                  </div>
                </Link>
                {/* Option B (Selected - Sheet Size) */}
                <div className="relative group overflow-hidden rounded-xl ring-4 ring-[#1173d4]/20 border-2 border-[#1173d4] shadow-lg cursor-default">
                  <div className="absolute top-4 right-4 bg-[#1173d4] text-white p-1 rounded-full shadow-sm z-10">
                    <span className="material-symbols-outlined text-xl">check</span>
                  </div>
                  <div
                    className="bg-cover bg-center h-40 flex flex-col justify-end p-5"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, rgba(17, 115, 212, 0.8) 0%, rgba(17, 115, 212, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAH72MwLfmdAc71PMqcxnMWar8GKlfj4BE7m6qmrucv0s3VM06LEjXa1KW6tFNEFd33pMe0WuYELSBOLuGvqThG-Zr10cJ0Q_ugVlXe9QpoSmQeBr2MfzidbQ-XHHfyvb1tKaumy4t0lmCPLjFZOq9Zj-mrwLxNmjDY5AvUyoLNbVxNr8ymn-VZt8I9ZKup5ZiIe6kTHibHv1RptXcCbDN-trQp0YqIoE0L-UDkJvdy1obip56DvdadODcaom_pbgC4CnesYBJkMsU')",
                    }}
                  >
                    <div className="text-white">
                      <p className="text-xs font-medium uppercase opacity-80 mb-1">Method B (Active)</p>
                      <h4 className="text-xl font-bold">Sheet Size</h4>
                      <p className="text-sm opacity-90 mt-1">Input raw sheet dimensions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Sheet Dimensions */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 text-[#1173d4] p-2 rounded-lg">
                  <span className="material-symbols-outlined">square_foot</span>
                </div>
                <h3 className="text-lg font-bold">Sheet Dimensions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
                  <input
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-[#1173d4] focus:border-[#1173d4] p-2.5 transition-colors"
                    placeholder="0"
                    type="number"
                    value={formData.sheet_length}
                    onChange={(e) => handleChange("sheet_length", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width</label>
                  <input
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-[#1173d4] focus:border-[#1173d4] p-2.5 transition-colors"
                    placeholder="0"
                    type="number"
                    value={formData.sheet_width}
                    onChange={(e) => handleChange("sheet_width", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                  <select
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-[#1173d4] focus:border-[#1173d4] p-2.5 transition-colors"
                    value={formData.units}
                    onChange={(e) => handleChange("units", e.target.value)}
                  >
                    <option value="mm">Millimeters (mm)</option>
                    <option value="inch">Inches (in)</option>
                    <option value="cm">Centimeters (cm)</option>
                  </select>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">info</span>
                Enter raw sheet dimensions before box cutting.
              </p>
            </div>

            {/* Step 3: Paper Specifications */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 p-2 rounded-lg">
                  <span className="material-symbols-outlined">layers</span>
                </div>
                <h3 className="text-lg font-bold">Paper Specifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                {/* Top Layer */}
                <div className="pt-4 md:pt-0">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Top Layer
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Paper Quality</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.top_quality}
                        onChange={(e) => handleChange("top_quality", e.target.value)}
                      >
                        <option>Virgin Kraft</option>
                        <option>Recycled Kraft</option>
                        <option>White Top</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Weight (GSM)</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.top_weight}
                        onChange={(e) => handleChange("top_weight", Number(e.target.value))}
                      >
                        <option value={120}>120 GSM</option>
                        <option value={140}>140 GSM</option>
                        <option value={180}>180 GSM</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Flute Layer */}
                <div className="pt-4 md:pt-0 md:pl-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Flute Layer
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Paper Quality</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.flute_quality}
                        onChange={(e) => handleChange("flute_quality", e.target.value)}
                      >
                        <option>Semi Chemical</option>
                        <option>Medium HP</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Weight (GSM)</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.flute_weight}
                        onChange={(e) => handleChange("flute_weight", Number(e.target.value))}
                      >
                        <option value={120}>120 GSM</option>
                        <option value={150}>150 GSM</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Bottom Layer */}
                <div className="pt-4 md:pt-0 md:pl-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Bottom Layer
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Paper Quality</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.bottom_quality}
                        onChange={(e) => handleChange("bottom_quality", e.target.value)}
                      >
                        <option>Test Liner</option>
                        <option>Kraft Liner</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Weight (GSM)</label>
                      <select
                        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2"
                        value={formData.bottom_weight}
                        onChange={(e) => handleChange("bottom_weight", Number(e.target.value))}
                      >
                        <option value={120}>120 GSM</option>
                        <option value={140}>140 GSM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Config & Quantity */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 p-2 rounded-lg">
                  <span className="material-symbols-outlined">settings_suggest</span>
                </div>
                <h3 className="text-lg font-bold">Configuration &amp; Quantity</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ply Number</label>
                    <input
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-2.5 focus:ring-[#1173d4] focus:border-[#1173d4]"
                      min="3"
                      step="2"
                      placeholder="3"
                      type="number"
                      value={formData.ply_num}
                      onChange={(e) => handleChange("ply_num", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Boxes per Sheet</label>
                    <input
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-2.5 focus:ring-[#1173d4] focus:border-[#1173d4]"
                      placeholder="1"
                      type="number"
                      value={formData.boxes_per_sheet}
                      onChange={(e) => handleChange("boxes_per_sheet", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Boxes Required</label>
                    <input
                      className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-2.5 focus:ring-[#1173d4] focus:border-[#1173d4]"
                      placeholder="1000"
                      type="number"
                      value={formData.total_quantity}
                      onChange={(e) => handleChange("total_quantity", Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4">Box Attachment</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "none"}
                        onChange={() => handleChange("attachment", "none")}
                      />
                      <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">None</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "pinning"}
                        onChange={() => handleChange("attachment", "pinning")}
                      />
                      <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Pinning</label>
                    </div>
                    {formData.attachment === "pinning" && (
                      <div className="ml-7 mb-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Pins per Box</label>
                        <input
                          className="w-24 text-sm rounded border-gray-300 dark:border-gray-600 py-1 px-2 focus:ring-[#1173d4] focus:border-[#1173d4]"
                          type="number"
                          value={formData.pins_per_box}
                          onChange={(e) => handleChange("pins_per_box", Number(e.target.value))}
                        />
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "pasting"}
                        onChange={() => handleChange("attachment", "pasting")}
                      />
                      <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Hand Pasting</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Processing & Add-ons */}
            <div className="bg-white dark:bg-[#1a2632] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 p-2 rounded-lg">
                  <span className="material-symbols-outlined">print</span>
                </div>
                <h3 className="text-lg font-bold">Processing &amp; Add-ons</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Flute Type</label>
                  <div className="flex gap-4 mb-4">
                    <label className={`cursor-pointer relative flex items-center justify-center p-3 w-full border rounded-lg transition-all ${formData.flute_type === "EF" ? "border-[#1173d4] bg-[#1173d4]/5" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                      <input
                        className="mr-2 h-4 w-4 text-[#1173d4] focus:ring-[#1173d4]"
                        name="flute-type"
                        type="radio"
                        checked={formData.flute_type === "EF"}
                        onChange={() => handleChange("flute_type", "EF")}
                      />
                      <span className="text-sm font-medium">EF (Exposed)</span>
                    </label>
                    <label className={`cursor-pointer relative flex items-center justify-center p-3 w-full border rounded-lg transition-all ${formData.flute_type === "NF" ? "border-[#1173d4] bg-[#1173d4]/5" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                      <input
                        className="mr-2 h-4 w-4 text-[#1173d4] focus:ring-[#1173d4]"
                        name="flute-type"
                        type="radio"
                        checked={formData.flute_type === "NF"}
                        onChange={() => handleChange("flute_type", "NF")}
                      />
                      <span className="text-sm font-medium">NF (Narrow)</span>
                    </label>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 rounded border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                        type="checkbox"
                        checked={formData.punching}
                        onChange={(e) => handleChange("punching", e.target.checked)}
                      />
                      <label className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        {formData.flute_type === "NF" ? "Enable Scoring" : "Enable Punching"}
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Finishing</label>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#1173d4]/50 transition-colors cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                          type="checkbox"
                          checked={formData.lamination}
                          onChange={(e) => handleChange("lamination", e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-900 dark:text-gray-100">Lamination</label>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Protective plastic coating</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#1173d4]/50 transition-colors cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-[#1173d4] focus:ring-[#1173d4]"
                          type="checkbox"
                          checked={formData.printing}
                          onChange={(e) => handleChange("printing", e.target.checked)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-900 dark:text-gray-100">Printing</label>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Custom branding &amp; logos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Estimate Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Estimate Summary</h3>
                  <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                </div>
                <div className="p-6 space-y-6">
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 font-medium">
                      {error}
                    </div>
                  )}
                  {/* Cost Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Material Cost</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {result ? `₹${(result.material_cost || 0).toFixed(2)}` : "₹0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Manufacturing</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {result ? `₹${(result.manufacturing_cost || 0).toFixed(2)}` : "₹0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Add-ons &amp; Extras</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {result ? `₹${(result.pin_cost || 0).toFixed(2)}` : "₹0.00"}
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-gray-700"></div>
                  {/* Total */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Total Estimated Price</p>
                      <p className="text-xs text-gray-400">Per {formData.total_quantity} units</p>
                    </div>
                    <span className="text-3xl font-bold text-[#1173d4] tracking-tight">
                      {result ? `₹${result.total_order_cost.toFixed(2)}` : "₹0.00"}
                    </span>
                  </div>
                  {/* CTA */}
                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full bg-[#1173d4] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white inline-block"></span>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">calculate</span>
                        Calculate My Estimate
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    * This is an approximate estimation based on current material rates.
                  </p>
                </div>
              </div>
              {/* Quick Help Card */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/20 flex gap-3">
                <span className="material-symbols-outlined text-[#1173d4]">help</span>
                <div>
                  <h5 className="text-sm font-bold text-gray-900 dark:text-gray-200">Need Help?</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Contact our support team for custom die-cut pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
