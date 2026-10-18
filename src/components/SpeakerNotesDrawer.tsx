import React from 'react';
import { SLIDES_META } from '../data/slidesData';
import { MessageSquareText, Sparkles, X } from 'lucide-react';

interface SpeakerNotesDrawerProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  currentSlide,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const currentMeta = SLIDES_META.find((s) => s.id === currentSlide) || SLIDES_META[0];

  return (
    <div className="no-print p-4 bg-slate-900/95 rounded-xl border border-slate-800 text-xs space-y-2 shadow-xl animate-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-blue-400 font-semibold font-mono">
          <MessageSquareText className="w-4 h-4" />
          <span>PRESENTER SPEAKER NOTES · SLIDE {currentMeta.number} ({currentMeta.title})</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          aria-label="Close speaker notes"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-200 leading-relaxed text-sm font-sans pt-1">
        "{currentMeta.speakerNotes}"
      </p>

      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Delivery Pace: 60–90 seconds per slide</span>
        <span>Key Cue: Emphasize hardware isolation vs software regex</span>
      </div>
    </div>
  );
};
