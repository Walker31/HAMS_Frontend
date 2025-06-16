export default function ModeSelector({ setUserType, setIsLogin }) {
  return (
    <>
      <h2 className="text-xl font-bold">Register As</h2>
      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <button
          onClick={() => setUserType("Customer")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Patient
        </button>
        <button
          onClick={() => setUserType("Doctor")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Doctor
        </button>
      </div>
      <button
        onClick={() => setIsLogin(true)}
        className="text-sm text-gray-600 underline hover:text-black"
      >
        Already have an account?
      </button>
    </>
  );
}
