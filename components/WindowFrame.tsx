"use client";

import React from "react";
import { Minus, Square, X } from "lucide-react";

declare global {
  interface Window {
    electron: {
      windowControls: (command: string) => void;
    };
  }
}

const WindowFrame: React.FC = () => {
  const handleWindowControl = (command: string) => {
    window.electron.windowControls(command);
  };

  return (
    <div
      className="border fixed top-0 left-0 right-0 h-8 bg-muted flex justify-between items-center px-2 z-50"
      style={{
        WebkitAppRegion: "drag",
        zIndex: 9999, // Типизация исправлена
      } as React.CSSProperties} // Приведение типа
    >

      <div className="text-foreground font-semibold text-sm">
        NETcord
      </div>

      <div
        className="flex items-center space-x-1"
        style={{
          WebkitAppRegion: "no-drag", // Отключаем перетаскивание для элементов управления
        } as React.CSSProperties}
      >
        <button
          className="p-1 hover:bg-yellow-950 rounded"
          onClick={() => handleWindowControl("minimize")}
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
        <button
          className="p-1 hover:bg-yellow-950  rounded"
          onClick={() => handleWindowControl("maximize")}
        >
          <Square className="w-3.5 h-3.5 text-white" />
        </button>
        <button
          className="p-1 hover:bg-red-600 rounded"
          onClick={() => handleWindowControl("close")}
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default WindowFrame;