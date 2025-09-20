import React, { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void;
  maxFiles?: number;
  currentFileCount: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  maxFiles = 3,
  currentFileCount
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileRead = useCallback(async (file: File) => {
    if (currentFileCount >= maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    try {
      const content = await file.text();
      onFileUpload(file, content);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onFileUpload, maxFiles, currentFileCount]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.slice(0, maxFiles - currentFileCount).forEach(handleFileRead);
  }, [handleFileRead, maxFiles, currentFileCount]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.slice(0, maxFiles - currentFileCount).forEach(handleFileRead);
    e.target.value = '';
  }, [handleFileRead, maxFiles, currentFileCount]);

  const canUpload = currentFileCount < maxFiles;

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : canUpload
            ? 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            : 'border-gray-200 bg-gray-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          if (canUpload) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".txt,.pdf,.doc,.docx,.md"
          onChange={handleFileSelect}
          disabled={!canUpload || uploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="text-center">
          {uploading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-600">Processing file...</span>
            </div>
          ) : !canUpload ? (
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <AlertCircle className="w-6 h-6" />
              <span>Maximum {maxFiles} files allowed</span>
            </div>
          ) : (
            <>
              <Upload className={`w-12 h-12 mx-auto mb-4 ${dragOver ? 'text-blue-500' : 'text-gray-400'}`} />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Documents
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <p className="text-sm text-gray-400">
                Supported formats: TXT, PDF, DOC, DOCX, MD • Max {maxFiles} files • {currentFileCount}/{maxFiles} uploaded
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};