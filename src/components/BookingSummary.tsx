interface BookingSummaryProps {
  date: string;
  time: string;
  username: string;
  guestCount: string;
  mobileNumber: string;
  onConfirm: () => void;
  onEdit: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  date,
  time,
  username,
  guestCount,
  mobileNumber,
  onConfirm,
  onEdit,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      console.table({
        date,
        time,
        username,
        guestCount,
        mobileNumber,
      });
      onConfirm(); // Call the passed onConfirm function
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Booking Summary</h2>
      <p className="text-gray-800">
        <strong>Date:</strong> {date}
      </p>
      <p className="text-gray-800">
        <strong>Time:</strong> {time}
      </p>
      <p className="text-gray-800">
        <strong>Name:</strong> {username}
      </p>
      <p className="text-gray-800">
        <strong>Guests:</strong> {guestCount}
      </p>
      <p className="text-gray-800">
        <strong>Mobile:</strong> {mobileNumber}
      </p>

      <button
        onClick={handleConfirm}
        className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Confirm Booking
      </button>

      <button
        onClick={onEdit}
        className="w-full py-3 mt-4 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        Edit Booking
      </button>
    </div>
  );
};

export default BookingSummary;
