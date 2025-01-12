"use client";

import { useEffect } from "react";

export default function ClientProtection() {
  useEffect(() => {
    // Запретить правый клик
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Запретить выделение текста
    const disableTextSelection = () => {
      document.body.style.userSelect = "none";
    };

    // Запретить перетаскивание изображений и других элементов
    const disableDrag = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("selectstart", disableTextSelection);
    document.addEventListener("dragstart", disableDrag);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("selectstart", disableTextSelection);
      document.removeEventListener("dragstart", disableDrag);
    };
  }, []);

  return null;
}