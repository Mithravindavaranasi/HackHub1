import React, { useState } from 'react';
import { FileText, BarChart3, Globe, Search } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { DocumentList } from './components/DocumentList';
import { AnalysisButton } from './components/AnalysisButton';
import { ReportView } from './components/ReportView';
import { UsageDashboard } from './components/UsageDashboard';
import { ExternalMonitor } from './components/ExternalMonitor';
import { useDocumentAnalyzer } from './hooks/useDocumentAnalyzer';

type Tab = 'upload' | 'analysis' | 'usage' | 'monitor';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [currentReport, setCurrentReport] = useState(null);
  
  const {
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
  } = useDocumentAnalyzer();

  const handleAnalysis = async () => {
    const report = await analyzeDocuments();
    if (report) {
      setCurrentReport(report);
      setActiveTab('analysis');
    }
  };

  const tabs = [
    { id: 'upload' as Tab, label: 'Document Upload', icon: FileText },
    { id: 'analysis' as Tab, label: 'Analysis Results', icon: Search },
    { id: 'usage' as Tab, label: 'Usage & Billing', icon: BarChart3 },
    { id: 'monitor' as Tab, label: 'External Monitor', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Doc Checker Agent
                </h1>
                <p className="text-sm text-gray-600">Intelligent Document Contradiction Detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">${usageStats.totalBilled.toFixed(2)}</div>
                <div className="text-xs">Total Billed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Upload Your Documents
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload multiple documents to automatically detect contradictions, conflicts, and inconsistencies. 
                Our AI will analyze your files and provide detailed reports with actionable suggestions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FileUpload
                  onFileUpload={addDocument}
                  currentFileCount={documents.length}
                />
                
                <div className="text-center">
                  <AnalysisButton
                    onAnalyze={handleAnalysis}
                    isAnalyzing={isAnalyzing}
                    disabled={documents.length < 2}
                    documentCount={documents.length}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <DocumentList
                  documents={documents}
                  onRemove={removeDocument}
                />
                
                {documents.length > 0 && (
                  <div className="text-center">
                    <button
                      onClick={clearAll}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Clear All Documents
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <ReportView report={currentReport || (reports.length > 0 ? reports[0] : null)} />
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-8">
            <UsageDashboard
              usageStats={usageStats}
              documentCost={DOCUMENT_COST}
              reportCost={REPORT_COST}
            />
            
            {reports.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  {reports.slice(0, 5).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        setCurrentReport(report);
                        setActiveTab('analysis');
                      }}
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          Report #{report.id.split('-')[1]}
                        </div>
                        <div className="text-sm text-gray-600">
                          {report.generatedAt.toLocaleString()} • {report.documents.length} documents
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">
                          {report.totalIssues} issues
                        </div>
                        <div className="text-sm text-gray-600">
                          ${(report.documents.length * DOCUMENT_COST + REPORT_COST).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'monitor' && (
          <div className="space-y-8">
            <ExternalMonitor />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;