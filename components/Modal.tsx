import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  singleButton?: boolean;
  type?: 'danger' | 'info' | 'success';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  singleButton = false,
  type = 'info'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative transform transition-all scale-100 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6 text-center sm:text-left">
          <h3 className={`text-xl font-bold mb-2 ${type === 'danger' ? 'text-red-600' : type === 'success' ? 'text-brand' : 'text-gray-900'}`}>
            {title}
          </h3>
          <div className="text-gray-600 text-sm leading-relaxed">
            {description}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {!singleButton && (
            <Button variant="ghost" onClick={onCancel} className="flex-1 sm:flex-none justify-center">
              {cancelText}
            </Button>
          )}
          <Button 
            onClick={onConfirm || onCancel} 
            variant="primary"
            className={`flex-1 sm:flex-none justify-center ${type === 'danger' ? '!bg-red-500 hover:!bg-red-600 !shadow-red-500/20' : ''}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};