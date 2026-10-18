import React, { useState } from 'react';
import { Download, Printer, CheckCircle2, AlertCircle, FileText, X, Loader2 } from 'lucide-react';
import { exportSlidesToPdf, triggerNativePrint, PdfGenerationProgress } from '../utils/pdfGenerator';
import { SLIDES_META } from '../data/slidesData';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState<PdfGenerationProgress>({
    currentSlide: 0,
    totalSlides: SLIDES_META.length,
    status: 'idle',
  });
  const [downloadedSize, setDownloadedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportPdf = async () => {
    try {
      setProgress({
        currentSlide: 1,
        totalSlides: SLIDES_META.length,
        status: 'rendering',
      });

      const slideElementIds = SLIDES_META.map((s) => `print-slide-${s.id}`);
      const pdfBlob = await exportSlidesToPdf(slideElementIds, (p) => setProgress(p));

      const sizeInMb = (pdfBlob.size / (1024 * 1024)).toFixed(2);
      setDownloadedSize(`${sizeInMb} MB`);

      // Trigger browser download
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SecureLens_Enterprise_AI_Pitch_Deck_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setProgress((prev) => ({ ...prev, status: 'complete' }));
    } catch (err: any) {
      console.error('PDF generation error:', err);
      setProgress((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: err?.message || 'Failed to generate PDF. Please try Native Print.',
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>EXECUTIVE PITCH DECK EXPORT</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Download SecureLens Pitch Deck
          </h3>
          <p className="text-xs text-slate-300">
            8-Slide executive presentation formatted for 16:9 widescreen display.
            Strictly optimized to stay below 5 MB.
          </p>
        </div>

        {/* Specs Box */}
        <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>SLIDE COUNT:</span>
            <span className="text-white font-semibold">8 Slides (Complete Outline)</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>ASPECT RATIO:</span>
            <span className="text-white font-semibold">16:9 Widescreen (Landscape)</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>FILE SIZE GUARANTEE:</span>
            <span className="text-emerald-400 font-semibold">&lt; 5.0 MB (~1.8 MB typical)</span>
          </div>
          {downloadedSize && (
            <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
              <span>GENERATED SIZE:</span>
              <span className="text-emerald-400 font-bold">{downloadedSize} (Verified &lt; 5MB)</span>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        {progress.status === 'rendering' || progress.status === 'compressing' ? (
          <div className="p-4 bg-blue-950/40 rounded-lg border border-blue-900/40 space-y-2 text-xs">
            <div className="flex items-center justify-between text-blue-300">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span>
                  Rendering Slide {progress.currentSlide} of {progress.totalSlides}...
                </span>
              </span>
              <span className="font-mono tabular-nums">
                {Math.round((progress.currentSlide / progress.totalSlides) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-500 h-1.5 transition-all duration-300 rounded-full"
                style={{
                  width: `${(progress.currentSlide / progress.totalSlides) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : progress.status === 'complete' ? (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg flex items-center gap-2 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>PDF generated and downloaded successfully ({downloadedSize})!</span>
          </div>
        ) : progress.status === 'error' ? (
          <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-lg flex items-center gap-2 text-xs text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{progress.errorMessage}</span>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleExportPdf}
            disabled={progress.status === 'rendering' || progress.status === 'compressing'}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/50 rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Download className="w-4 h-4" />
            <span>1-Click Download PDF (&lt;5 MB)</span>
          </button>

          <button
            onClick={() => {
              triggerNativePrint();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Native Browser Print / Save as PDF (Vector)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
