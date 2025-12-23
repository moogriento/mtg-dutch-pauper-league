import { useState } from 'react';
import { SwitchTheme } from '../feat-switch-theme/SwitchTheme';
import { NavLinks } from './NavLinks';
import clsx from 'clsx';

function Version({ className }: { className?: string }) {
  return (
    <span className={clsx('text-xs md:text-sm font-normal', className)}>
      v0.0.1
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-bg-navbar">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="text-2xl text-text-primary flex items-center font-logo">
            <div className="rounded-full shadow-xl size-8 flex items-center justify-center mr-2">
              <div className="rounded-full overflow-hidden size-8 flex items-center justify-center bg-white">
                <img src="/pepe-logo.png" className="w-8" />
              </div>
            </div>
            DPL meta
            <Version className="hidden md:inline ml-2" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <SwitchTheme />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-text-primary"
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>
      </header>

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
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-bold text-text-primary">
            Menu <Version className="ml-1" />
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 py-6">
          <SwitchTheme />
          <NavLinks mobile />
        </div>
      </aside>
    </>
  );
}
