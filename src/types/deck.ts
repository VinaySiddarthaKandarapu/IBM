export interface SlideData {
  id: number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  speakerNotes: string;
}

export interface LeakPath {
  id: string;
  title: string;
  vector: string;
  impact: string;
  severity: 'HIGH' | 'CRITICAL';
  description: string;
}

export interface ArchitectureComponent {
  component: string;
  technology: string;
  threatStopped: string;
  hardwareLevel: string;
  spec: string;
  details: string;
}

export interface MetricData {
  label: string;
  value: string;
  baseline: string;
  unit?: string;
  detail: string;
}

export interface ThreatZoneEntry {
  zone: 'Input Surfaces' | 'Planning & Reasoning' | 'Tool Execution' | 'Memory & State' | 'Inter-System Communication';
  threatScenario: string;
  owaspMapping: string;
  secureLensCountermeasure: string;
  hardwareAnchor: string;
  residualRisk: 'Minimal' | 'Negligible' | 'Eliminated';
}
