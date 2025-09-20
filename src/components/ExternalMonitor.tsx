import React, { useState, useEffect } from 'react';
import { Globe, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { ExternalSource } from '../types';

export const ExternalMonitor: React.FC = () => {
  const [sources, setSources] = useState<ExternalSource[]>([
    {
      id: 'college-rules',
      name: 'College Rules & Policies',
      url: 'https://college.edu/rules',
      lastChecked: new Date(Date.now() - 3600000), // 1 hour ago
      hasUpdates: true,
      content: 'Updated attendance policy: Minimum 70% attendance required (previously 75%)'
    },
    {
      id: 'hr-handbook',
      name: 'HR Employee Handbook',
      url: 'https://company.com/hr-handbook',
      lastChecked: new Date(Date.now() - 7200000), // 2 hours ago
      hasUpdates: false,
      content: 'No recent changes detected'
    }
  ]);

  const [checking, setChecking] = useState<string | null>(null);

  const checkForUpdates = async (sourceId: string) => {
    setChecking(sourceId);
    
    // Simulate checking for updates
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSources(prev => prev.map(source => {
      if (source.id === sourceId) {
        // Randomly simulate updates
        const hasUpdates = Math.random() > 0.5;
        return {
          ...source,
          lastChecked: new Date(),
          hasUpdates,
          content: hasUpdates 
            ? `New update detected: Policy changes as of ${new Date().toLocaleDateString()}`
            : 'No new changes detected'
        };
      }
      return source;
    }));
    
    setChecking(null);
  };

  const checkAllSources = async () => {
    for (const source of sources) {
      if (!checking) {
        await checkForUpdates(source.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Simulate periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSource = sources[Math.floor(Math.random() * sources.length)];
      if (!checking && Math.random() > 0.8) {
        setSources(prev => prev.map(source => {
          if (source.id === randomSource.id) {
            return {
              ...source,
              hasUpdates: true,
              content: `Auto-detected update: ${new Date().toLocaleTimeString()}`
            };
          }
          return source;
        }));
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [sources, checking]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-blue-600" />
          External Document Monitor
        </h2>
        <button
          onClick={checkAllSources}
          disabled={!!checking}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          <span>Check All</span>
        </button>
      </div>

      <div className="space-y-4">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              source.hasUpdates
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {source.hasUpdates ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <h3 className="font-medium text-gray-800">{source.name}</h3>
                  {source.hasUpdates && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                      UPDATE DETECTED
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{source.url}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Last checked: {source.lastChecked.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{source.content}</p>
                </div>
              </div>
              
              <button
                onClick={() => checkForUpdates(source.id)}
                disabled={checking === source.id}
                className="ml-4 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <RefreshCw className={`w-4 h-4 ${checking === source.id ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            {source.hasUpdates && (
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ This source has updates that may affect your document consistency. 
                  Consider re-running analysis with updated content.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Monitors external documents and policy pages for changes</li>
          <li>• Automatically detects updates and content modifications</li>
          <li>• Alerts you when changes might affect document consistency</li>
          <li>• Triggers re-analysis when significant changes are detected</li>
        </ul>
      </div>
    </div>
  );
};