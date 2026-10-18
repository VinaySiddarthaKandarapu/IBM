import React from 'react';
import { Download, ShieldCheck, Presentation, Sliders, Layers } from 'lucide-react';

interface HeaderProps {
  currentSlide: number;
  totalSlides: number;
  activeView: 'presentation' | 'overview' | 'sandbox' | 'threat-model';
  onSelectView: (view: 'presentation' | 'overview' | 'sandbox' | 'threat-model') => void;
  onOpenPdfModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  totalSlides,
  activeView,
  onSelectView,
  onOpenPdfModal,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand wordmark (single clean element, no subtitle clutter) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectView('presentation')}
          className="text-left group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            SL
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-blue-400 transition-colors">
            SecureLens
          </span>
        </button>
      </div>

      {/* Zone 2: Navigation Links (single-line, clean text links with hover styling) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectView('presentation')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'presentation'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Deck Slides</span>
          <span className="text-xs text-slate-500 tabular-nums">({currentSlide}/{totalSlides})</span>
        </button>

        <button
          onClick={() => onSelectView('overview')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'overview'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Slide Grid</span>
        </button>

        <button
          onClick={() => onSelectView('sandbox')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'sandbox'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Live Sandbox</span>
        </button>

        <button
          onClick={() => onSelectView('threat-model')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
            activeView === 'threat-model'
              ? 'text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Threat Model</span>
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action Button */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenPdfModal}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Deck PDF</span>
          <span className="text-blue-200 font-mono text-[11px]">&lt;5 MB</span>
        </button>
      </div>
    </header>
  );
};
