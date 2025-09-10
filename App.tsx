
import React, { useState } from 'react';
import CustomerForm from './components/CustomerForm';
import SuccessDisplay from './components/SuccessDisplay';

const App: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">سامانه اطلاعات مشتریان</h1>
          <p className="text-slate-500 mt-2">لطفاً فرم زیر را برای ثبت اطلاعات خود تکمیل نمایید.</p>
        </header>
        <main className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500">
          {isSubmitted ? (
            <SuccessDisplay onReset={handleReset} />
          ) : (
            <CustomerForm onSubmitSuccess={handleFormSubmit} />
          )}
        </main>
        <footer className="text-center mt-8 text-sm text-slate-400">
            <p>طراحی شده با React و Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
