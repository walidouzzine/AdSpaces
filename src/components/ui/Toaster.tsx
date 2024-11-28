import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToasterProps {
  toasts?: Toast[];
  removeToast?: (id: string) => void;
}

export function Toaster({ toasts = [], removeToast }: ToasterProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mb-2 p-4 rounded-lg shadow-lg flex items-center justify-between ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <span>{toast.message}</span>
            {removeToast && (
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white hover:text-gray-200"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}