import React from "react";

type TimelineViewProps = {
  availableSlots: { [key: string]: string[] };
  reservedSlots: { [key: string]: string[] };
  selectedDate: string;
};

const TimelineView: React.FC<TimelineViewProps> = ({
  availableSlots,
  reservedSlots,
  selectedDate,
}) => {
  const slots = availableSlots[selectedDate] || [];
  const reserved = reservedSlots[selectedDate] || [];

  return (
    <div className="space-y-2 mt-6">
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Reserved and Unreserved and Slots
      </h2>

      {/* <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`w-full py-2 border rounded-lg ${
              reserved.includes(slot)
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
            disabled={reserved.includes(slot)}
          >
            {reserved.includes(slot) ? "Reserved" : `Available: ${slot}`}
          </button>
        ))}
      </div> */}

      {/* Reserved slots */}
      {reserved.length > 0 && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Reserved Slots
          </h3>
          <div className="space-y-2">
            {reserved.map((slot) => (
              <button
                key={slot}
                type="button"
                className="w-full py-2 bg-gray-300 text-gray-700 border rounded-lg cursor-not-allowed"
                disabled
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;
