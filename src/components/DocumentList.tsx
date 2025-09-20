import React from 'react';
import { File, X, Calendar, HardDrive } from 'lucide-react';
import { Document } from '../types';

interface DocumentListProps {
  documents: Document[];
  onRemove: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onRemove }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <File className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Uploaded Documents ({documents.length})
      </h3>
      
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="bg-blue-100 p-2 rounded-lg">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {doc.name}
                </h4>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <HardDrive className="w-4 h-4" />
                    <span>{formatFileSize(doc.size)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{doc.uploadedAt.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {doc.content.substring(0, 150)}...
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onRemove(doc.id)}
              className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};