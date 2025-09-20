import React from 'react';
import { Search, Zap } from 'lucide-react';

interface AnalysisButtonProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled: boolean;
  documentCount: number;
}

export const AnalysisButton: React.FC<AnalysisButtonProps> = ({
  onAnalyze,
  isAnalyzing,
  disabled,
  documentCount
}) => {
  return (
    <div className="text-center">
      <button
        onClick={onAnalyze}
        disabled={disabled || isAnalyzing}
        className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
          disabled || isAnalyzing
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isAnalyzing ? (
          <>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Analyzing Documents...</span>
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            <span>Analyze Documents</span>
            <Zap className="w-5 h-5" />
          </>
        )}
      </button>
      
      {documentCount < 2 && !isAnalyzing && (
        <p className="mt-3 text-sm text-gray-500">
          Upload at least 2 documents to start analysis
        </p>
      )}
      
      {documentCount >= 2 && !isAnalyzing && (
        <p className="mt-3 text-sm text-gray-600">
          Ready to analyze {documentCount} document{documentCount > 1 ? 's' : ''} for contradictions
        </p>
      )}
    </div>
  );
};