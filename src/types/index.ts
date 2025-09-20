export interface Document {
  id: string;
  name: string;
  content: string;
  uploadedAt: Date;
  size: number;
  type: string;
}

export interface Contradiction {
  id: string;
  type: 'time_conflict' | 'numerical_conflict' | 'policy_conflict' | 'requirement_conflict';
  severity: 'high' | 'medium' | 'low';
  documents: string[];
  conflictingStatements: {
    document: string;
    statement: string;
    location: string;
  }[];
  explanation: string;
  suggestion: string;
}

export interface Report {
  id: string;
  generatedAt: Date;
  documents: string[];
  contradictions: Contradiction[];
  totalIssues: number;
  severityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface UsageStats {
  documentsAnalyzed: number;
  reportsGenerated: number;
  totalBilled: number;
  lastAnalysis: Date | null;
}

export interface ExternalSource {
  id: string;
  name: string;
  url: string;
  lastChecked: Date;
  hasUpdates: boolean;
  content: string;
}