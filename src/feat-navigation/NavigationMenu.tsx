import { useState } from 'react';
import { NavLinks } from './NavLinks';

import { Link } from 'react-router';

import pepeLogo from '../assets/pepe-logo.png';
import { AppVersion } from './AppVersion';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="text-2xl text-text-primary flex items-center font-logo">
              <div className="rounded-full shadow-xl size-8 flex items-center justify-center mr-2">
                <div className="rounded-full overflow-hidden size-8 flex items-center justify-center bg-white">
                  <img src={pepeLogo} className="w-8" />
                </div>
              </div>
              <Link to="/">DPL meta</Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-gray-700 dark:text-gray-300 p-1"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Side drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-bg-primary shadow-lg
          transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="font-bold text-text-primary">DPL meta</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-6">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
        <div className="absolute bottom-0 px-4 py-6">
          <AppVersion className="ml-1" />
        </div>
      </aside>
    </>
  );
}
