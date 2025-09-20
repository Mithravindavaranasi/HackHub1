import React from 'react';
import { Report } from '../types';
import { ContradictionCard } from './ContradictionCard';
import { Calendar, FileText, AlertTriangle, CheckCircle, Download } from 'lucide-react';

interface ReportViewProps {
  report: Report | null;
}

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  if (!report) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No Analysis Report</h3>
        <p>Upload documents and run analysis to see results here</p>
      </div>
    );
  }

  const downloadReport = () => {
    const reportData = {
      id: report.id,
      generatedAt: report.generatedAt.toISOString(),
      documents: report.documents,
      summary: {
        totalIssues: report.totalIssues,
        severityBreakdown: report.severityBreakdown
      },
      contradictions: report.contradictions.map(c => ({
        type: c.type,
        severity: c.severity,
        documents: c.documents,
        explanation: c.explanation,
        suggestion: c.suggestion,
        conflictingStatements: c.conflictingStatements
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contradiction-report-${report.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
          <button
            onClick={downloadReport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-gray-100 p-3 rounded-lg mb-2">
              <Calendar className="w-6 h-6 text-gray-600 mx-auto" />
            </div>
            <p className="text-sm text-gray-500">Generated</p>
            <p className="font-semibold">{report.generatedAt.toLocaleDateString()}</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-lg mb-2">
              <FileText className="w-6 h-6 text-blue-600 mx-auto" />
            </div>
            <p className="text-sm text-gray-500">Documents</p>
            <p className="font-semibold">{report.documents.length}</p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 p-3 rounded-lg mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600 mx-auto" />
            </div>
            <p className="text-sm text-gray-500">Issues Found</p>
            <p className="font-semibold">{report.totalIssues}</p>
          </div>

          <div className="text-center">
            <div className={`p-3 rounded-lg mb-2 ${report.totalIssues === 0 ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <CheckCircle className={`w-6 h-6 mx-auto ${report.totalIssues === 0 ? 'text-green-600' : 'text-yellow-600'}`} />
            </div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold">{report.totalIssues === 0 ? 'Clean' : 'Issues Found'}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-3">Documents Analyzed:</h3>
          <div className="flex flex-wrap gap-2">
            {report.documents.map((doc, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
              >
                {doc}
              </span>
            ))}
          </div>
        </div>

        {report.totalIssues > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{report.severityBreakdown.high}</div>
              <div className="text-sm text-red-700">High Priority</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{report.severityBreakdown.medium}</div>
              <div className="text-sm text-yellow-700">Medium Priority</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{report.severityBreakdown.low}</div>
              <div className="text-sm text-blue-700">Low Priority</div>
            </div>
          </div>
        )}
      </div>

      {/* Contradictions */}
      {report.totalIssues > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Contradictions Found</h3>
          {report.contradictions.map((contradiction) => (
            <ContradictionCard key={contradiction.id} contradiction={contradiction} />
          ))}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">No Contradictions Found!</h3>
          <p className="text-green-700">All documents appear to be consistent with each other.</p>
        </div>
      )}
    </div>
  );
};