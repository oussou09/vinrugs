


export default function AlertMessage({ AlrType, AlrMessage, onClose }) {
  const alertColor =
        AlrType == 1
        ? 'bg-teal-500'
        : AlrType == 2
        ? 'bg-yellow-500'
        : AlrType == 3
        ? 'bg-red-500'
        : 'bg-stone-700';

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full ${alertColor} text-sm text-white rounded-xl shadow-lg`}
      role="alert"
      tabIndex={-1}
    >
        <div className="flex items-center p-4 gap-3">
            <p className="flex-1">{AlrMessage}</p>

            <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex justify-center items-center size-5 opacity-70 hover:opacity-100"
            aria-label="Close"
            >
            ✕
            </button>
        </div>
    </div>
  );
}