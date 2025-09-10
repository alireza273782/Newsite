
import React from 'react';

interface SuccessDisplayProps {
  onReset: () => void;
}

const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ onReset }) => {
  return (
    <div className="text-center py-10">
      <SuccessIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-slate-800">با موفقیت ثبت شد!</h2>
      <p className="mt-2 text-slate-600">اطلاعات شما با موفقیت در سیستم ما ثبت گردید. از همکاری شما سپاسگزاریم.</p>
      <div className="mt-8">
        <button
          onClick={onReset}
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          ثبت یک پاسخ جدید
        </button>
      </div>
    </div>
  );
};

export default SuccessDisplay;
