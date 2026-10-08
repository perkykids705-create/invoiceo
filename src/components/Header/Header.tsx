import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../ui/BrandLogo';
import {
  FolderOpen,
  Download,
  Upload,
  PlusCircle,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  onNewInvoice: () => void;
  onOpenSavedModal: () => void;
  onExportJson: () => void;
  onImportClick: () => void;
  savedCount: number;
  isAutosaved?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewInvoice,
  onOpenSavedModal,
  onExportJson,
  onImportClick,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo in Primary Color */}
          <div className="flex items-center gap-6">
            <Link to="/invoice-generator" className="flex items-center group">
              <BrandLogo variant="light" size="md" showBadge={false} />
            </Link>

            {/* Navigation links - Dark Black Text */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-bold text-black">
              <Link
                to="/invoice-generator"
                className={`px-3.5 py-2 rounded-[4px] transition-colors ${
                  location.pathname === '/invoice-generator' || location.pathname === '/'
                    ? 'bg-slate-100 text-black font-extrabold'
                    : 'text-black hover:bg-slate-100'
                }`}
              >
                Invoice Generator
              </Link>
            </nav>
          </div>

          {/* Right Header Controls - Dark Black Text */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Invoices Library Button */}
            <button
              onClick={onOpenSavedModal}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50 text-black text-sm font-bold transition-colors shadow-2xs cursor-pointer"
              title="View locally saved invoices"
            >
              <FolderOpen className="w-4 h-4 text-black" />
              <span>My Invoices</span>
              {savedCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-[3px] bg-slate-200 text-black text-xs font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Import / Export JSON buttons */}
            <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
              <button
                onClick={onImportClick}
                type="button"
                className="p-2 rounded-[4px] text-black hover:bg-slate-100 transition-colors cursor-pointer"
                title="Import Invoice JSON"
              >
                <Upload className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={onExportJson}
                type="button"
                className="p-2 rounded-[4px] text-black hover:bg-slate-100 transition-colors cursor-pointer"
                title="Export Invoice as JSON"
              >
                <Download className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* New Invoice Button */}
            <button
              onClick={onNewInvoice}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#30364F] hover:bg-[#252a3d] text-white text-sm font-bold transition-colors shadow-2xs ml-1 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>New Invoice</span>
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenSavedModal}
              type="button"
              className="p-2 rounded-[4px] border border-slate-200 text-black"
              title="My Invoices"
            >
              <FolderOpen className="w-4 h-4 text-black" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-[4px] text-black hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 py-3.5 space-y-2">
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onNewInvoice();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-[4px] bg-[#30364F] text-white text-sm font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                New Invoice
              </button>
              <button
                onClick={() => {
                  onOpenSavedModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-[4px] border border-slate-300 bg-white text-black text-sm font-bold"
              >
                <FolderOpen className="w-4 h-4 text-black" />
                Invoices ({savedCount})
              </button>
              <button
                onClick={() => {
                  onExportJson();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-[4px] border border-slate-300 bg-white text-black text-sm font-bold"
              >
                <Download className="w-4 h-4 text-black" />
                Export JSON
              </button>
              <button
                onClick={() => {
                  onImportClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-[4px] border border-slate-300 bg-white text-black text-sm font-bold"
              >
                <Upload className="w-4 h-4 text-black" />
                Import JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
