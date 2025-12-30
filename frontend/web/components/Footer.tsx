'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thanks for subscribing!' });
        setEmail('');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: 'Subscription failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-background-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="size-6 bg-white text-primary flex items-center justify-center rounded-sm">
                <img src="/public/ABCCO.png" alt="AmarBox Logo" className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight">
                AmarBox
              </h3>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              AmarBox provides custom packaging solutions for modern brands.
              We combine industrial precision with craft aesthetics to make
              your product stand out.
            </p>

            <div className="flex gap-4 text-white/60">
              <span className="material-symbols-outlined">public</span>
              <span className="material-symbols-outlined">alternate_email</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
              Products
            </h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li>Mailer Boxes</li>
              <li>Shipping Boxes</li>
              <li>Product Boxes</li>
              <li>Rigid Boxes</li>
              <li>Stickers & Labels</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li>About Us</li>
              <li>Sustainability</li>
              <li>Customers</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
              Stay Updated
            </h4>
            <p className="text-sm text-white/60 mb-4">
              Get the latest design trends and packaging tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-sm px-4 py-2 text-sm text-white w-full placeholder:text-white/20 focus:outline-none"
              />
              <button className="bg-white text-primary px-4 py-2 rounded-sm text-sm font-bold">
                GO
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © 2024 AmarBox Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
