import React from 'react';
import { SLIDES_META } from '../data/slidesData';
import { SlideCanvas } from './SlideCanvas';

interface SlidesOverviewProps {
  onSelectSlide: (id: number) => void;
}

export const SlidesOverview: React.FC<SlidesOverviewProps> = ({ onSelectSlide }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Complete 8-Slide Pitch Deck Overview
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Click any slide to open in presentation mode, or export all slides to PDF (&lt;5 MB).
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          8 Slides · 16:9 Widescreen
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SLIDES_META.map((slide) => (
          <div
            key={slide.id}
            onClick={() => onSelectSlide(slide.id)}
            className="group cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all p-3 space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="font-semibold text-blue-400">
                SLIDE {slide.number} · {slide.category}
              </span>
              <span className="group-hover:text-white transition-colors">
                Click to Present →
              </span>
            </div>

            <div className="pointer-events-none transform origin-top-left">
              <SlideCanvas slideId={slide.id} />
            </div>

            <div className="px-1 text-xs text-slate-400 line-clamp-1">
              <strong className="text-slate-200">{slide.title}:</strong> {slide.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
