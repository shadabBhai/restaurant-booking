import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "./FormInput";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";

interface BookingFormProps {
  date: string;
  time: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ date, time }) => {
  const [username, setUsername] = useState<string>("");
  const [guestCount, setGuestCount] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleConfirmBooking = () => {
    setConfirmed(true);
    console.log();
  };

  const handleEditBooking = () => {
    setSubmitted(false);
    setConfirmed(false);
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {!submitted ? (
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Booking Form
          </h2>
          <div className="text-center text-xl text-gray-600">
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
          </div>

          <FormInput
            id="username"
            label="Name"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            required
          />

          <FormInput
            id="guestCount"
            label="Number of Guests"
            value={guestCount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGuestCount(e.target.value)
            }
            type="number"
            required
            min={1}
          />

          <FormInput
            id="mobileNumber"
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMobileNumber(e.target.value)
            }
            type="tel"
            required
            pattern="[0-9]{10}"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Confirm Booking
          </button>
        </form>
      ) : confirmed ? (
        <BookingConfirmation />
      ) : (
        <BookingSummary
          date={date}
          time={time}
          username={username}
          guestCount={guestCount}
          mobileNumber={mobileNumber}
          onConfirm={handleConfirmBooking}
          onEdit={handleEditBooking}
        />
      )}
    </div>
  );
};

export default BookingForm;
