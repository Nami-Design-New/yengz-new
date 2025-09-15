import { useState } from "react";

export default function VideoPopup({ sol }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (sol.video) {
      setOpen(true);
    } else {
      window.location.href = sol.url;
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{sol?.button}</button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative max-w-2xl w-full">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-red-500 text-lg"
            >
              ✕
            </button>

            <video
              src={sol.video}
              controls
              autoPlay
              className="w-full rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
