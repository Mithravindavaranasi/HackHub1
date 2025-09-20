import React from 'react';
import { AlertTriangle, AlertCircle, Info, FileText, Lightbulb } from 'lucide-react';
import { Contradiction } from '../types';

interface ContradictionCardProps {
  contradiction: Contradiction;
}

export const ContradictionCard: React.FC<ContradictionCardProps> = ({ contradiction }) => {
  const getSeverityIcon = () => {
    switch (contradiction.severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityColors = () => {
    switch (contradiction.severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeLabel = () => {
    switch (contradiction.type) {
      case 'time_conflict':
        return 'Time Conflict';
      case 'numerical_conflict':
        return 'Numerical Conflict';
      case 'policy_conflict':
        return 'Policy Conflict';
      case 'requirement_conflict':
        return 'Requirement Conflict';
    }
  };

  return (
    <div className={`border rounded-xl p-6 ${getSeverityColors()} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getSeverityIcon()}
          <div>
            <h3 className="font-semibold text-gray-800">{getTypeLabel()}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              contradiction.severity === 'high'
                ? 'bg-red-100 text-red-700'
                : contradiction.severity === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {contradiction.severity.toUpperCase()} PRIORITY
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Conflicting Statements
          </h4>
          <div className="space-y-2">
            {contradiction.conflictingStatements.map((statement, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm text-blue-600">{statement.document}</span>
                  <span className="text-xs text-gray-500">{statement.location}</span>
                </div>
                <p className="text-sm text-gray-800 italic">"{statement.statement}"</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Explanation</h4>
          <p className="text-sm text-gray-600">{contradiction.explanation}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
            Suggested Resolution
          </h4>
          <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200">
            {contradiction.suggestion}
          </p>
        </div>
      </div>
    </div>
  );
};