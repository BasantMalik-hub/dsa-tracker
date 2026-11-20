import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Copy, RotateCcw, X } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportJson: () => void;
  onCopyJson: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImportJson: (text: string) => void;
  onResetAllProgress: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onExportJson,
  onCopyJson,
  onFileUpload,
  onImportJson,
  onResetAllProgress
}) => {
  const [importJsonText, setImportJsonText] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        setConfirmResetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Backup, Sync & Restore Progress"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Backup, Sync &amp; Restore Progress</span>
          </h3>
          <button
            type="button"
            onClick={() => {
              onClose();
              setConfirmResetOpen(false);
            }}
            aria-label="Close modal"
            className="p-1 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          <p className="text-xs text-stone-300">
            Your progress is automatically saved in your browser&apos;s{' '}
            <code className="text-emerald-400">localStorage</code>. Export a JSON file or copy to
            clipboard anytime to seamlessly transfer your progress between your laptop and phone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onExportJson}
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Backup</span>
            </button>
            <button
              type="button"
              onClick={onCopyJson}
              className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <Copy className="w-4 h-4 text-emerald-400" />
              <span>Copy to Clipboard</span>
            </button>
          </div>

          <div className="pt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileUpload}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Upload JSON Backup File</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-stone-800">
          <label className="text-xs font-bold text-stone-300 block">
            Restore from JSON Backup Paste:
          </label>
          <textarea
            rows={4}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder="Paste exported JSON content here..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-emerald-500"
          />
          <button
            type="button"
            onClick={() => {
              onImportJson(importJsonText);
              setImportJsonText('');
            }}
            className="w-full py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Restore Progress from JSON</span>
          </button>
        </div>

        <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
          {!confirmResetOpen ? (
            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 w-full justify-between bg-rose-950/30 border border-rose-500/40 px-3 py-2 rounded-xl">
              <span className="text-xs text-rose-200 font-semibold">Are you sure?</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetAllProgress();
                    setConfirmResetOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                >
                  Yes, Reset Everything
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
