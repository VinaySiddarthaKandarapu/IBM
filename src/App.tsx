import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_META } from './data/slidesData';
import { Header } from './components/Header';
import { SlideCanvas } from './components/SlideCanvas';
import { SlideControls } from './components/SlideControls';
import { SpeakerNotesDrawer } from './components/SpeakerNotesDrawer';
import { LiveSandbox } from './components/LiveSandbox';
import { ThreatModelView } from './components/ThreatModelView';
import { SlidesOverview } from './components/SlidesOverview';
import { PdfExportModal } from './components/PdfExportModal';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [activeView, setActiveView] = useState<'presentation' | 'overview' | 'sandbox' | 'threat-model'>('presentation');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  const totalSlides = SLIDES_META.length;

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSelectSlide = (id: number) => {
    setCurrentSlide(id);
    setActiveView('presentation');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in textarea or input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && activeView === 'presentation')) {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isPdfModalOpen) {
          setIsPdfModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, activeView, isPdfModalOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Contract Navigation */}
      <Header
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col justify-start">
        {activeView === 'presentation' && (
          <div className="flex flex-col gap-4 max-w-5xl mx-auto w-full">
            {/* The Main 16:9 Slide Canvas */}
            <SlideCanvas
              slideId={currentSlide}
              onNavigateToSlide={handleSelectSlide}
              onOpenSandbox={() => setActiveView('sandbox')}
            />

            {/* Slide Navigation & Controls */}
            <SlideControls
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onNext={handleNextSlide}
              onPrev={handlePrevSlide}
              onSelectSlide={handleSelectSlide}
              showNotes={showNotes}
              onToggleNotes={() => setShowNotes(!showNotes)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              onToggleOverview={() => setActiveView('overview')}
            />

            {/* Presenter Speaker Notes Drawer */}
            <SpeakerNotesDrawer
              currentSlide={currentSlide}
              isOpen={showNotes}
              onClose={() => setShowNotes(false)}
            />
          </div>
        )}

        {activeView === 'overview' && (
          <SlidesOverview onSelectSlide={handleSelectSlide} />
        )}

        {activeView === 'sandbox' && (
          <LiveSandbox />
        )}

        {activeView === 'threat-model' && (
          <ThreatModelView />
        )}
      </main>

      {/* Hidden Render Containers for Crisp 16:9 PDF Export & Native Print */}
      <div className="hidden print:block fixed -left-[9999px] top-0 print:static">
        {SLIDES_META.map((slide) => (
          <div key={slide.id} id={`print-slide-${slide.id}`} className="print-page-break">
            <SlideCanvas slideId={slide.id} isPrintMode={true} />
          </div>
        ))}
      </div>

      {/* PDF Export Modal Dialog */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </div>
  );
}
