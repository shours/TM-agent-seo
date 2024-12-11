import React, { useEffect, useState } from 'react';

interface ExportNotificationProps {
  show: boolean;
  onClose: () => void;
}

const ExportNotification = ({ show, onClose }: ExportNotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg">
      Le fichier est en cours de génération
    </div>
  );
}

export default ExportNotification;