import { useState, useCallback } from 'react';
import { Document, Contradiction, Report, UsageStats } from '../types';

const DOCUMENT_COST = 2.99;
const REPORT_COST = 4.99;

export const useDocumentAnalyzer = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    documentsAnalyzed: 0,
    reportsGenerated: 0,
    totalBilled: 0,
    lastAnalysis: null,
  });

  const detectContradictions = useCallback((docs: Document[]): Contradiction[] => {
    const contradictions: Contradiction[] = [];

    // Time-based conflict detection
    const timePatterns = docs.flatMap(doc => {
      const timeMatches = doc.content.match(/(\d{1,2}:\d{2}\s?(AM|PM|am|pm)|\d{1,2}\s?(PM|AM|pm|am)|midnight|noon|before\s+\d{1,2}:\d{2})/gi) || [];
      return timeMatches.map(match => ({ doc: doc.name, statement: match, content: doc.content }));
    });

    if (timePatterns.length > 1) {
      const uniqueTimes = [...new Set(timePatterns.map(t => t.statement.toLowerCase()))];
      if (uniqueTimes.length > 1) {
        contradictions.push({
          id: `time-${Date.now()}`,
          type: 'time_conflict',
          severity: 'high',
          documents: timePatterns.map(t => t.doc),
          conflictingStatements: timePatterns.map(t => ({
            document: t.doc,
            statement: t.statement,
            location: 'Section 1'
          })),
          explanation: 'Multiple documents specify different time requirements or deadlines.',
          suggestion: 'Standardize all time requirements across documents to avoid confusion.'
        });
      }
    }

    // Numerical conflict detection (percentages, days, amounts)
    const numberPatterns = docs.flatMap(doc => {
      const numberMatches = doc.content.match(/(\d+%|\d+\s?(days?|weeks?|months?)|\$\d+)/gi) || [];
      return numberMatches.map(match => ({ doc: doc.name, statement: match, content: doc.content }));
    });

    if (numberPatterns.length > 1) {
      const percentages = numberPatterns.filter(n => n.statement.includes('%'));
      if (percentages.length > 1) {
        const uniquePercentages = [...new Set(percentages.map(p => p.statement))];
        if (uniquePercentages.length > 1) {
          contradictions.push({
            id: `numerical-${Date.now()}`,
            type: 'numerical_conflict',
            severity: 'medium',
            documents: percentages.map(p => p.doc),
            conflictingStatements: percentages.map(p => ({
              document: p.doc,
              statement: p.statement,
              location: 'Requirements Section'
            })),
            explanation: 'Documents contain different percentage requirements or thresholds.',
            suggestion: 'Review and align all percentage-based requirements across documents.'
          });
        }
      }
    }

    // Policy conflict detection
    const policyKeywords = ['required', 'mandatory', 'optional', 'prohibited', 'allowed', 'forbidden'];
    const policies = docs.flatMap(doc => {
      const policyMatches = doc.content.split('.').filter(sentence => 
        policyKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
      );
      return policyMatches.map(match => ({ doc: doc.name, statement: match.trim(), content: doc.content }));
    });

    if (policies.length > 1) {
      // Simple contradiction detection based on opposing keywords
      const opposingPairs = [
        ['required', 'optional'],
        ['mandatory', 'optional'],
        ['allowed', 'prohibited'],
        ['allowed', 'forbidden']
      ];

      for (const [positive, negative] of opposingPairs) {
        const positiveStatements = policies.filter(p => p.statement.toLowerCase().includes(positive));
        const negativeStatements = policies.filter(p => p.statement.toLowerCase().includes(negative));

        if (positiveStatements.length > 0 && negativeStatements.length > 0) {
          contradictions.push({
            id: `policy-${Date.now()}-${positive}`,
            type: 'policy_conflict',
            severity: 'high',
            documents: [...positiveStatements.map(s => s.doc), ...negativeStatements.map(s => s.doc)],
            conflictingStatements: [
              ...positiveStatements.map(s => ({
                document: s.doc,
                statement: s.statement,
                location: 'Policy Section'
              })),
              ...negativeStatements.map(s => ({
                document: s.doc,
                statement: s.statement,
                location: 'Policy Section'
              }))
            ],
            explanation: `Documents contain conflicting policies regarding ${positive} vs ${negative} requirements.`,
            suggestion: `Clarify whether the requirement is ${positive} or ${negative} and update all documents consistently.`
          });
        }
      }
    }

    return contradictions;
  }, []);

  const analyzeDocuments = useCallback(async () => {
    if (documents.length < 2) return null;

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const contradictions = detectContradictions(documents);
    
    const report: Report = {
      id: `report-${Date.now()}`,
      generatedAt: new Date(),
      documents: documents.map(d => d.name),
      contradictions,
      totalIssues: contradictions.length,
      severityBreakdown: {
        high: contradictions.filter(c => c.severity === 'high').length,
        medium: contradictions.filter(c => c.severity === 'medium').length,
        low: contradictions.filter(c => c.severity === 'low').length,
      }
    };

    setReports(prev => [report, ...prev]);
    
    // Update usage stats and billing
    const newDocumentCost = documents.length * DOCUMENT_COST;
    const newReportCost = REPORT_COST;
    
    setUsageStats(prev => ({
      documentsAnalyzed: prev.documentsAnalyzed + documents.length,
      reportsGenerated: prev.reportsGenerated + 1,
      totalBilled: prev.totalBilled + newDocumentCost + newReportCost,
      lastAnalysis: new Date(),
    }));

    setIsAnalyzing(false);
    return report;
  }, [documents, detectContradictions]);

  const addDocument = useCallback((file: File, content: string) => {
    const document: Document = {
      id: `doc-${Date.now()}`,
      name: file.name,
      content,
      uploadedAt: new Date(),
      size: file.size,
      type: file.type,
    };
    
    setDocuments(prev => [...prev, document]);
  }, []);

  const removeDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setDocuments([]);
  }, []);

  return {
    documents,
    reports,
    isAnalyzing,
    usageStats,
    analyzeDocuments,
    addDocument,
    removeDocument,
    clearAll,
    DOCUMENT_COST,
    REPORT_COST,
  };
};