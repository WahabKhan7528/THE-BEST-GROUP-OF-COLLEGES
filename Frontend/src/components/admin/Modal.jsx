const Modal = ({ open, title, children, onClose, onConfirm, confirmLabel = 'Confirm' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="text-sm text-gray-700">{children}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-800"
            onClick={onConfirm || onClose}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

