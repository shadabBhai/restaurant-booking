"use client";
import { useState, FormEvent, useEffect } from "react";
import Head from "next/head";
import BookingForm from "@/components/BookingForm";

type AvailableSlots = {
  [key: string]: string[];
};

type ReservedSlots = {
  [key: string]: string[];
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [noSlotsForDate, setNoSlotsForDate] = useState<boolean>(false);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);

  // Dummy data for available and reserved slots
  const availableSlots: AvailableSlots = {
    "2025-01-01": ["10:00", "14:00"],
    "2025-01-02": ["09:00", "11:00", "16:00"],
  };

  const reservedSlots: ReservedSlots = {
    "2025-01-01": ["12:00", "16:00"], // Example: 12:00 is reserved on 2025-01-01
    "2025-01-02": ["15:00", "17:00"], // Example: 15:00 is reserved on 2025-01-02
  };

  useEffect(() => {
    if (selectedDate) {
      const slots = availableSlots[selectedDate] || [];
      setNoSlotsForDate(slots.length === 0);
      setIsAvailable(null); // Reset availability status
      setShowBookingForm(false); // Hide the booking form
    }
  }, [selectedDate]);

  const checkAvailability = () => {
    if (selectedDate && timeSlot) {
      const slots = availableSlots[selectedDate] || [];
      const isSlotAvailable = slots.includes(timeSlot); // Check if selected time slot is available
      setIsAvailable(isSlotAvailable); // Set availability state
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    checkAvailability();
    if (isAvailable) {
      setShowBookingForm(true); // Show the booking form if available
    }
  };

  const reservedSlotsForDate = reservedSlots[selectedDate] || [];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <Head>
        <title>Date and Time Slot Checker</title>
      </Head>
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!showBookingForm && (
          <div>
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
              Date and Time Slot Checker
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Select Date:
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {noSlotsForDate && (
                <p className="text-red-500 text-center mt-2">
                  No slots available for the selected date. Please select
                  another date.
                </p>
              )}

              {!showBookingForm &&
                selectedDate &&
                availableSlots[selectedDate] && (
                  <div>
                    <div className="space-y-2 mt-6">
                      <h2 className="text-xl font-semibold text-center text-gray-700">
                        Reserved and Unreserved Slots
                      </h2>
                      {reservedSlotsForDate.length > 0 && (
                        <div className="mt-4 ">
                          <h3 className="text-lg font-semibold text-gray-600">
                            Reserved Slots
                          </h3>
                          <div className="space-y-2">
                            {reservedSlotsForDate.map((slot) => (
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
                    <label
                      htmlFor="timeSlot"
                      className="text-xl font-semibold text-center text-gray-700"
                    >
                      Select Time Slots
                    </label>
                    <div className="space-y-2">
                      {availableSlots[selectedDate].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            timeSlot === slot
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-slate-900"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Proceed
              </button>
            </form>
          </div>
        )}

        {showBookingForm && isAvailable && (
          <div className="mt-6">
            <BookingForm date={selectedDate} time={timeSlot} />
          </div>
        )}

        {isAvailable === false && !showBookingForm && (
          <p className="text-red-500 text-center mt-4">
            The selected slot is not available. Try another date.
          </p>
        )}
      </main>
    </div>
  );
}
