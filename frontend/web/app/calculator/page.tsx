"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function CalculatorPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(2);
  const router = useRouter();

  const [inputMethod, setInputMethod] = useState<"box_dimensions" | "sheet_size">("box_dimensions");
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    units: "mm",
    box_type: "RSC",
    top_quality: "Kraft",
    top_weight: 180,
    flute_quality: "Kraft",
    flute_weight: 120,
    bottom_quality: "Kraft",
    bottom_weight: 140,
    ply_num: 3,
    boxes_per_sheet: 1,
    total_quantity: 1000,
    attachment: "pinning",
    pins_per_box: 2,
    flute_type: "NF",
    scoring: true,
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
      input_type: inputMethod,
      box_dimensions: {
        length: Number(formData.length),
        width: Number(formData.width),
        height: Number(formData.height),
        units: formData.units,
      },
      box_type: formData.box_type === "RSC" ? "Universal" : formData.box_type,
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

  const getStepProgress = () => {
    if (currentStep <= 1) return "20%";
    if (currentStep <= 2) return "40%";
    if (currentStep <= 3) return "60%";
    if (currentStep <= 4) return "80%";
    return "100%";
  };

  if (!user) return null;

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#111418] dark:text-white min-h-screen flex flex-col font-display">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2634] border-b border-[#f0f2f4] dark:border-[#2a3644] px-4 lg:px-10 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="size-8 text-[#137fec] flex items-center justify-center rounded-lg bg-[#137fec]/10">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">AmarBox</h2>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 bg-white dark:bg-[#2a3644] border border-[#dbe0e6] dark:border-[#3a4654] text-[#111418] dark:text-white text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#3a4654] transition-colors">
              <span className="material-symbols-outlined mr-2 text-[18px]">save</span>
              Save Quote
            </button>
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-gray-100 dark:ring-gray-700 bg-[#137fec] flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Progress Stepper */}
            <div className="bg-white dark:bg-[#1a2634] p-4 rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644]">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-[#e5e7eb] dark:bg-[#374151] -z-10 rounded-full"></div>
                <div className="absolute left-0 top-1/2 h-1 bg-[#137fec] -z-10 rounded-full transition-all duration-500" style={{ width: getStepProgress() }}></div>
                {[
                  { num: 1, label: "Input" },
                  { num: 2, label: "Dims" },
                  { num: 3, label: "Props" },
                  { num: 4, label: "Prod" },
                  { num: 5, label: "Mfg" },
                ].map((step) => (
                  <div key={step.num} className="flex flex-col items-center gap-1">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
                        step.num < currentStep
                          ? "bg-[#137fec] text-white shadow-[#137fec]/20"
                          : step.num === currentStep
                          ? "bg-white dark:bg-[#2a3644] border-2 border-[#137fec] text-[#137fec]"
                          : "bg-white dark:bg-[#2a3644] border-2 border-[#e5e7eb] dark:border-[#374151] text-[#617589]"
                      }`}
                    >
                      {step.num}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${step.num <= currentStep ? "text-[#137fec] font-semibold" : "text-[#617589]"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Input Type */}
            <section className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3644] flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">looks_one</span>
                  Input Method
                </h3>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed</span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Box Dims */}
                <div
                  onClick={() => setInputMethod("box_dimensions")}
                  className={`relative group cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${
                    inputMethod === "box_dimensions"
                      ? "border-[#137fec] bg-[#137fec]/5 dark:bg-[#137fec]/10"
                      : "border-[#e5e7eb] dark:border-[#374151] bg-gray-50 dark:bg-[#131b24]"
                  }`}
                >
                  {inputMethod === "box_dimensions" && (
                    <div className="absolute top-3 right-3 text-[#137fec]">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <div className="w-full h-32 bg-[#e0e7ff] dark:bg-[#1e293b] rounded-md mb-2 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-[#137fec]/40">deployed_code</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111418] dark:text-white text-lg">Box Dimensions</h4>
                      <p className="text-sm text-[#617589] dark:text-gray-400 mt-1">Calculate cost based on the finished box size (Length × Width × Height).</p>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-bold text-[#137fec] bg-white dark:bg-[#2a3644] px-2 py-1 rounded border border-[#137fec]/20">Default</span>
                    </div>
                  </div>
                </div>
                {/* Option 2: Sheet Size */}
                <Link
                  href="/calculator/sheet-size"
                  className="relative border border-[#e5e7eb] dark:border-[#374151] bg-gray-50 dark:bg-[#131b24] rounded-lg p-4 hover:opacity-80 transition-opacity"
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-full h-32 bg-gray-200 dark:bg-[#2a3644] rounded-md mb-2 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-gray-400">branding_watermark</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#617589] dark:text-gray-400 text-lg">Sheet Size</h4>
                      <p className="text-sm text-[#617589] dark:text-gray-500 mt-1">Calculate cost based on raw corrugated sheet dimensions.</p>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-bold text-[#137fec] bg-white dark:bg-[#2a3644] px-2 py-1 rounded">Go →</span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* Step 2: Dimensions */}
            <section className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3644]">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">looks_two</span>
                  Box Dimensions
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Length</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      placeholder="0"
                      type="number"
                      value={formData.length}
                      onChange={(e) => handleChange("length", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Width</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      placeholder="0"
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleChange("width", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Height</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      placeholder="0"
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-3 lg:col-span-1">
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Units</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.units}
                      onChange={(e) => handleChange("units", e.target.value)}
                    >
                      <option value="mm">mm</option>
                      <option value="inch">inch</option>
                      <option value="cm">cm</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3 lg:col-span-1">
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Type</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.box_type}
                      onChange={(e) => handleChange("box_type", e.target.value)}
                    >
                      <option value="RSC">RSC</option>
                      <option value="Die Cut">Die Cut</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-[#617589] dark:text-gray-400 bg-gray-50 dark:bg-[#131b24] p-3 rounded-lg border border-[#f0f2f4] dark:border-[#374151]">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span>Standard Regular Slotted Container (RSC) dimensions are internal.</span>
                </div>
              </div>
            </section>

            {/* Step 3: Box Properties */}
            <section className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3644]">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">looks_3</span>
                  Box Properties
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-6">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-[#617589] dark:text-gray-400 pb-2 border-b border-[#f0f2f4] dark:border-[#374151]">
                  <div className="col-span-3">Layer</div>
                  <div className="col-span-5">Paper Quality</div>
                  <div className="col-span-4">Paper Weight (GSM)</div>
                </div>

                {/* Row 1: Top */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                    <div className="size-8 rounded bg-blue-100 dark:bg-blue-900/30 text-[#137fec] flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">vertical_align_top</span>
                    </div>
                    <span className="font-medium text-[#111418] dark:text-white">Top Layer</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Paper Quality</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.top_quality}
                      onChange={(e) => handleChange("top_quality", e.target.value)}
                    >
                      <option value="Kraft">Kraft (Virgin)</option>
                      <option value="Semi-Kraft">Semi-Kraft</option>
                      <option value="Recycled">Recycled</option>
                    </select>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Weight</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.top_weight}
                      onChange={(e) => handleChange("top_weight", Number(e.target.value))}
                    >
                      <option value={180}>180 GSM</option>
                      <option value={200}>200 GSM</option>
                      <option value={230}>230 GSM</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Flute */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                    <div className="size-8 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">waves</span>
                    </div>
                    <span className="font-medium text-[#111418] dark:text-white">Flute Layer</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Paper Quality</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.flute_quality}
                      onChange={(e) => handleChange("flute_quality", e.target.value)}
                    >
                      <option value="Semi-Kraft">Semi-Kraft</option>
                      <option value="Kraft">Kraft (Virgin)</option>
                      <option value="Recycled">Recycled</option>
                    </select>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Weight</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.flute_weight}
                      onChange={(e) => handleChange("flute_weight", Number(e.target.value))}
                    >
                      <option value={120}>120 GSM</option>
                      <option value={140}>140 GSM</option>
                      <option value={160}>160 GSM</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Bottom */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                    <div className="size-8 rounded bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">vertical_align_bottom</span>
                    </div>
                    <span className="font-medium text-[#111418] dark:text-white">Bottom Layer</span>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Paper Quality</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.bottom_quality}
                      onChange={(e) => handleChange("bottom_quality", e.target.value)}
                    >
                      <option value="Recycled">Recycled</option>
                      <option value="Semi-Kraft">Semi-Kraft</option>
                      <option value="Kraft">Kraft (Virgin)</option>
                    </select>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <label className="md:hidden text-sm text-gray-500 mb-1 block">Weight</label>
                    <select
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      value={formData.bottom_weight}
                      onChange={(e) => handleChange("bottom_weight", Number(e.target.value))}
                    >
                      <option value={140}>140 GSM</option>
                      <option value={160}>160 GSM</option>
                      <option value={180}>180 GSM</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 4: Production Details */}
            <section className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3644]">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">looks_4</span>
                  Production Details
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Ply Number</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      min="3"
                      step="2"
                      placeholder="3"
                      type="number"
                      value={formData.ply_num}
                      onChange={(e) => handleChange("ply_num", Number(e.target.value))}
                    />
                    <span className="text-xs text-[#617589] dark:text-gray-400 mt-1 block">Odd numbers only (3, 5, 7...)</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Boxes per Sheet</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      placeholder="1"
                      type="number"
                      value={formData.boxes_per_sheet}
                      onChange={(e) => handleChange("boxes_per_sheet", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Total Quantity</label>
                    <input
                      className="w-full rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#131b24] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                      placeholder="1000"
                      type="number"
                      value={formData.total_quantity}
                      onChange={(e) => handleChange("total_quantity", Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Box Attachment Method */}
                <div>
                  <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-3">Box Attachment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-colors ${formData.attachment === "none" ? "border-[#137fec] bg-[#137fec]/5" : "border-[#dbe0e6] dark:border-[#374151] hover:bg-gray-50 dark:hover:bg-[#2a3644]"}`}>
                      <input
                        className="text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "none"}
                        onChange={() => handleChange("attachment", "none")}
                      />
                      <span className="text-sm font-medium dark:text-gray-200">None / Tape</span>
                    </label>
                    <label className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-colors ${formData.attachment === "pinning" ? "border-[#137fec] bg-[#137fec]/5" : "border-[#dbe0e6] dark:border-[#374151] hover:bg-gray-50 dark:hover:bg-[#2a3644]"}`}>
                      <input
                        className="text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "pinning"}
                        onChange={() => handleChange("attachment", "pinning")}
                      />
                      <span className="text-sm font-medium dark:text-gray-200">Pinning</span>
                    </label>
                    <label className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-colors ${formData.attachment === "pasting" ? "border-[#137fec] bg-[#137fec]/5" : "border-[#dbe0e6] dark:border-[#374151] hover:bg-gray-50 dark:hover:bg-[#2a3644]"}`}>
                      <input
                        className="text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        name="attachment"
                        type="radio"
                        checked={formData.attachment === "pasting"}
                        onChange={() => handleChange("attachment", "pasting")}
                      />
                      <span className="text-sm font-medium dark:text-gray-200">Hand Pasting</span>
                    </label>
                  </div>
                  {/* Conditional Input for Pinning */}
                  {formData.attachment === "pinning" && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-[#131b24] rounded-lg border border-[#f0f2f4] dark:border-[#2a3644] flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-1.5">Number of Pins per Box</label>
                        <input
                          className="w-full max-w-[200px] rounded-lg border-[#dbe0e6] dark:border-[#374151] bg-white dark:bg-[#1a2634] text-[#111418] dark:text-white h-10 px-3 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]"
                          type="number"
                          value={formData.pins_per_box}
                          onChange={(e) => handleChange("pins_per_box", Number(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Step 5: Manufacturing Options */}
            <section className="bg-white dark:bg-[#1a2634] rounded-xl shadow-sm border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3644]">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">looks_5</span>
                  Manufacturing Options
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <span className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-3">Flute Type</span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        className="text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        name="fluteType"
                        type="radio"
                        checked={formData.flute_type === "NF"}
                        onChange={() => handleChange("flute_type", "NF")}
                      />
                      <span className="text-sm dark:text-gray-200 group-hover:text-[#137fec] transition-colors">Narrow Flute (NF)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        className="text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        name="fluteType"
                        type="radio"
                        checked={formData.flute_type === "EF"}
                        onChange={() => handleChange("flute_type", "EF")}
                      />
                      <span className="text-sm dark:text-gray-200 group-hover:text-[#137fec] transition-colors">Broad Flute (EF)</span>
                    </label>
                  </div>
                  {formData.flute_type === "NF" && (
                    <div className="mt-3 ml-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="rounded text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                          type="checkbox"
                          checked={formData.scoring}
                          onChange={(e) => handleChange("scoring", e.target.checked)}
                        />
                        <span className="text-sm text-[#617589] dark:text-gray-400">Include Scoring (Rotary)</span>
                      </label>
                    </div>
                  )}
                </div>
                <hr className="border-[#f0f2f4] dark:border-[#2a3644]" />
                <div>
                  <span className="block text-sm font-medium text-[#111418] dark:text-gray-200 mb-3">Add-ons</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.lamination ? "border-[#137fec] bg-[#137fec]/5" : "border-[#dbe0e6] dark:border-[#374151] hover:bg-gray-50 dark:hover:bg-[#2a3644]"}`}>
                      <input
                        className="mt-1 rounded text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        type="checkbox"
                        checked={formData.lamination}
                        onChange={(e) => handleChange("lamination", e.target.checked)}
                      />
                      <div>
                        <span className="block text-sm font-medium dark:text-white">Lamination</span>
                        <span className="text-xs text-[#617589] dark:text-gray-400">Protective plastic coating</span>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${formData.printing ? "border-[#137fec] bg-[#137fec]/5" : "border-[#dbe0e6] dark:border-[#374151] hover:bg-gray-50 dark:hover:bg-[#2a3644]"}`}>
                      <input
                        className="mt-1 rounded text-[#137fec] focus:ring-[#137fec] bg-white dark:bg-[#1a2634] border-gray-300 dark:border-gray-600"
                        type="checkbox"
                        checked={formData.printing}
                        onChange={(e) => handleChange("printing", e.target.checked)}
                      />
                      <div>
                        <span className="block text-sm font-medium dark:text-white">Flexo Printing</span>
                        <span className="text-xs text-[#617589] dark:text-gray-400">Basic 1-2 color printing</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Estimate Panel (Sticky) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-[#1a2634] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#f0f2f4] dark:border-[#2a3644] overflow-hidden">
              <div className="bg-[#111418] dark:bg-[#0f161e] p-5 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#137fec]">calculate</span>
                  Estimate Summary
                </h3>
                <p className="text-xs text-gray-400 mt-1">Real-time cost estimation based on inputs.</p>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {/* Error */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-dashed border-[#dbe0e6] dark:border-[#374151]">
                    <span className="text-sm text-[#617589] dark:text-gray-400">Material Cost</span>
                    <span className="text-sm font-medium font-mono text-[#111418] dark:text-white">
                      {result ? `₹${(result.material_cost || 0).toFixed(2)}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-dashed border-[#dbe0e6] dark:border-[#374151]">
                    <span className="text-sm text-[#617589] dark:text-gray-400">Manufacturing</span>
                    <span className="text-sm font-medium font-mono text-[#111418] dark:text-white">
                      {result ? `₹${(result.manufacturing_cost || 0).toFixed(2)}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-dashed border-[#dbe0e6] dark:border-[#374151]">
                    <span className="text-sm text-[#617589] dark:text-gray-400">Add-ons (Pins)</span>
                    <span className="text-sm font-medium font-mono text-[#111418] dark:text-white">
                      {result ? `₹${(result.pin_cost || 0).toFixed(2)}` : "—"}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-[#137fec]/5 dark:bg-[#137fec]/10 rounded-lg p-4 mt-2 border border-[#137fec]/10">
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#617589] dark:text-gray-400 mb-1">Total Estimated Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#137fec] tracking-tight font-display">
                      {result ? `₹${result.total_order_cost.toFixed(2)}` : "₹0.00"}
                    </span>
                    <span className="text-sm text-[#617589] dark:text-gray-400">INR</span>
                  </div>
                  {result && (
                    <div className="mt-2 text-xs text-[#617589] dark:text-gray-500">
                      Approx. <span className="font-semibold text-[#137fec]">₹{result.cost_per_box.toFixed(2)}</span> per box
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white inline-block"></span>
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate My Estimate
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </button>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setResult(null);
                      setError(null);
                      setFormData({
                        length: "", width: "", height: "", units: "mm", box_type: "RSC",
                        top_quality: "Kraft", top_weight: 180, flute_quality: "Kraft", flute_weight: 120,
                        bottom_quality: "Kraft", bottom_weight: 140, ply_num: 3, boxes_per_sheet: 1,
                        total_quantity: 1000, attachment: "pinning", pins_per_box: 2, flute_type: "NF",
                        scoring: true, lamination: false, printing: false,
                      });
                    }}
                    className="text-xs text-[#617589] dark:text-gray-500 hover:text-[#137fec] underline"
                  >
                    Reset all fields
                  </button>
                </div>
              </div>
            </div>

            {/* Helper Card */}
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 flex gap-3">
              <span className="material-symbols-outlined text-[#137fec] mt-0.5">help</span>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">Need custom die-lines?</p>
                <p className="opacity-80">Contact our design team for custom structural engineering support.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
