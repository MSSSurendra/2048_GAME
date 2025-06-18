import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Smartphone, Keyboard } from 'lucide-react';

export const GameInstructions: React.FC = () => {
  return (
    <div className="mt-6 sm:mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-lg">
      <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-3 sm:mb-4">How to Play</h3>
      
      <div className="space-y-2 sm:space-y-3 text-sm text-blue-700">
        <p>
          <strong>Goal:</strong> Combine tiles with the same number to reach <strong>2048</strong>!
        </p>
        
        <div>
          <strong>Controls:</strong>
          
          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center gap-2 mt-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <span>Arrow keys or WASD:</span>
            </div>
            <div className="flex gap-1">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                <ArrowUp className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Mobile Controls */}
          <div className="sm:hidden mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4" />
              <span>Swipe in any direction to move tiles</span>
            </div>
            <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
              <div></div>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-200 rounded border border-blue-300">
                <ArrowUp className="w-3 h-3" />
              </div>
              <div></div>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-200 rounded border border-blue-300">
                <ArrowLeft className="w-3 h-3" />
              </div>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-300 rounded border border-blue-400">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-200 rounded border border-blue-300">
                <ArrowRight className="w-3 h-3" />
              </div>
              <div></div>
              <div className="flex items-center justify-center w-6 h-6 bg-blue-200 rounded border border-blue-300">
                <ArrowDown className="w-3 h-3" />
              </div>
              <div></div>
            </div>
          </div>
          
          {/* Combined view for larger screens */}
          <div className="hidden lg:flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              <span>Keyboard:</span>
              <div className="flex gap-1">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                  <ArrowDown className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded border border-blue-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Touch: Swipe to move</span>
            </div>
          </div>
        </div>
        
        <p>
          <strong>Rules:</strong> When two tiles with the same number touch, they merge into one with double the value.
        </p>
      </div>
    </div>
  );
};