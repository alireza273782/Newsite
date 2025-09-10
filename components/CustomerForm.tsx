
import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import type { CustomerData } from '../types';

interface CustomerFormProps {
  onSubmitSuccess: () => void;
}

const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);


const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<CustomerData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const onFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting data:", { ...formData, files });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    onSubmitSuccess();
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">نام و نام خانوادگی</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">آدرس ایمیل</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1">شماره تماس</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">آدرس</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} required className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">آپلود مدارک</label>
        <div 
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); }}
          onDrop={onFileDrop}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300'} border-dashed rounded-md transition-colors duration-300`}>
          <div className="space-y-1 text-center">
             <UploadIcon className="mx-auto h-12 w-12 text-slate-400"/>
            <div className="flex text-sm text-slate-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>فایل خود را انتخاب کنید</span>
                <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={(e) => handleFileChange(e.target.files)} />
              </label>
              <p className="pr-1">یا آن را بکشید و رها کنید</p>
            </div>
            <p className="text-xs text-slate-500">PNG, JPG, PDF تا 10 مگابایت</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-800">فایل‌های انتخاب شده:</h3>
          <ul className="mt-2 space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded-md text-sm">
                <div className="flex items-center min-w-0">
                  <FileIcon className="h-5 w-5 text-slate-500 mr-2 flex-shrink-0" />
                  <span className="text-slate-700 font-medium truncate">{file.name}</span>
                  <span className="text-slate-500 mx-2">-</span>
                  <span className="text-slate-500 flex-shrink-0">{formatFileSize(file.size)}</span>
                </div>
                <button type="button" onClick={() => removeFile(index)} className="ml-4 text-red-500 hover:text-red-700 transition-colors">
                    <TrashIcon className="h-5 w-5"/>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-300">
          {isLoading ? (
            <div className="flex items-center">
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال ارسال...
            </div>
          ) : (
            'ثبت اطلاعات'
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
