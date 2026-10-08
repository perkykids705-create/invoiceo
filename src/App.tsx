import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvoiceGeneratorPage } from './pages/InvoiceGeneratorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /invoice-generator */}
        <Route path="/" element={<Navigate to="/invoice-generator" replace />} />
        
        {/* Main Invoice Generator Tool */}
        <Route path="/invoice-generator" element={<InvoiceGeneratorPage />} />

        {/* Catch-all route to keep user on invoice generator */}
        <Route path="*" element={<Navigate to="/invoice-generator" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
