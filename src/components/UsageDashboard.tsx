import React from 'react';
import { UsageStats } from '../types';
import { DollarSign, FileText, BarChart3, Calendar } from 'lucide-react';

interface UsageDashboardProps {
  usageStats: UsageStats;
  documentCost: number;
  reportCost: number;
}

export const UsageDashboard: React.FC<UsageDashboardProps> = ({
  usageStats,
  documentCost,
  reportCost
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Usage & Billing Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="bg-blue-100 p-3 rounded-lg mb-3 inline-block">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{usageStats.documentsAnalyzed}</div>
          <div className="text-sm text-blue-700">Documents Analyzed</div>
          <div className="text-xs text-blue-600 mt-1">${documentCost} per document</div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="bg-purple-100 p-3 rounded-lg mb-3 inline-block">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{usageStats.reportsGenerated}</div>
          <div className="text-sm text-purple-700">Reports Generated</div>
          <div className="text-xs text-purple-600 mt-1">${reportCost} per report</div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="bg-green-100 p-3 rounded-lg mb-3 inline-block">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">${usageStats.totalBilled.toFixed(2)}</div>
          <div className="text-sm text-green-700">Total Billed</div>
          <div className="text-xs text-green-600 mt-1">Current month</div>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="bg-gray-100 p-3 rounded-lg mb-3 inline-block">
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
          <div className="text-sm text-gray-600 font-semibold">
            {usageStats.lastAnalysis ? usageStats.lastAnalysis.toLocaleDateString() : 'Never'}
          </div>
          <div className="text-sm text-gray-700">Last Analysis</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-3">Pricing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Document Analysis:</span>
            <span className="font-semibold">${documentCost} per document</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Report Generation:</span>
            <span className="font-semibold">${reportCost} per report</span>
          </div>
        </div>
      </div>
    </div>
  );
};