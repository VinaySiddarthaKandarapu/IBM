import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Sliders,
  Layers,
} from 'lucide-react';
import { SLIDES_META } from '../data/slidesData';

interface SlideControlsProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectSlide: (id: number) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onToggleOverview: () => void;
}

export const SlideControls: React.FC<SlideControlsProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onSelectSlide,
  showNotes,
  onToggleNotes,
  isFullscreen,
  onToggleFullscreen,
  onToggleOverview,
}) => {
  return (
    <div className="no-print flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-slate-950/80 rounded-xl border border-slate-800">
      {/* Slide Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentSlide === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Previous Slide (Left arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <span className="text-xs font-mono text-slate-300 px-2 tabular-nums">
          <strong className="text-white">{currentSlide}</strong> / {totalSlides}
        </span>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Next Slide (Right arrow)"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Quick-Selector Strip */}
      <div className="hidden lg:flex items-center gap-1.5">
        {SLIDES_META.map((slide) => {
          const isActive = slide.id === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => onSelectSlide(slide.id)}
              title={`${slide.number}. ${slide.title}`}
              className={`w-7 h-7 rounded text-xs font-mono font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {slide.number}
            </button>
          );
        })}
      </div>

      {/* Utility Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleNotes}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            showNotes
              ? 'bg-blue-950 text-blue-200 border-blue-800'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
          title="Toggle Presenter Speaker Notes"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Speaker Notes</span>
        </button>

        <button
          onClick={onToggleOverview}
          className="p-1.5 text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
          title="View All Slides Grid"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
          title="Toggle Fullscreen Presentation"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
