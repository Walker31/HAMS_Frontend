import Button from "@mui/material/Button";
export default function ModeSelector({ setUserType, setIsLogin }) {
  return (
    <>
      
      <div className="flex flex-col gap-6 w-full max-w-xs justify-center">
        <div className="text-xl justify-center font-bold">Register As</div>
        <Button
        style={{backgroundColor: 'blue'}}
          onClick={() => setUserType("Customer")}
          className=" bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          <div>Patient</div>
        </Button>
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
