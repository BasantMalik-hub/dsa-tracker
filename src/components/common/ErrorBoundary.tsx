import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Download } from 'lucide-react';
import { getTodayISO } from '../../utils/dateUtils';

interface Props {
  children: ReactNode;
  storageKey?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Crash caught by ErrorBoundary:', error, errorInfo);
  }

  handleDownloadEmergencyBackup = () => {
    try {
      const storageKey = this.props.storageKey || 'cpp_dsa_master_tracker_v3';
      const raw = window.localStorage.getItem(storageKey) || '{}';
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cpp_dsa_emergency_backup_${getTodayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Could not export backup: ' + e);
    }
  };

  handleReset = () => {
    if (window.confirm('Reset tracker to default state? Your current data will be cleared.')) {
      try {
        const storageKey = this.props.storageKey || 'cpp_dsa_master_tracker_v3';
        window.localStorage.removeItem(storageKey);
      } catch (_e) {
        // Ignore localStorage clear errors on reset
      }
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center font-bold text-xl border border-rose-500/30">
              !
            </div>
            <h2 className="text-lg font-bold text-white">Something went wrong</h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              An unexpected display error occurred. Your study progress and notes are safely
              preserved in your browser storage.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition"
              >
                Reload App
              </button>
              <button
                type="button"
                onClick={this.handleDownloadEmergencyBackup}
                className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Emergency Backup</span>
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2 text-rose-400 hover:underline text-xs"
              >
                Reset Data &amp; Start Fresh
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
