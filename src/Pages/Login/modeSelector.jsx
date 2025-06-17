import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ModeSelector({ setUserType, setIsLogin }) {
  return (
    <div className="flex flex-col items-center w-full max-w-xs gap-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300">
      <Typography
        variant="h5"
        className="font-bold text-center text-gray-800 dark:text-gray-100 mb-2"
      >
        Register As
      </Typography>
      <div className="flex flex-col gap-4 w-full">
        <Button
          onClick={() => setUserType("Customer")}
          variant="contained"
          size="large"
          className="!bg-blue-600 !text-white rounded-lg shadow-md hover:!bg-blue-700 transition-all duration-200"
          fullWidth
        >
          Patient
        </Button>
        <Button
          onClick={() => setUserType("Doctor")}
          variant="contained"
          size="large"
          className="!bg-green-600 !text-white rounded-lg shadow-md hover:!bg-green-700 transition-all duration-200"
          fullWidth
        >
          Doctor
        </Button>
        <Button
          onClick={() => setUserType("Hospital")}
          variant="contained"
          size="large"
          className="!bg-green-600 !text-white rounded-lg shadow-md hover:!bg-green-700 transition-all duration-200"
          fullWidth
        >
          Hospital
        </Button>
      </div>
      <Button
        variant="text"
        onClick={() => setIsLogin(true)}
        className="text-sm text-gray-600 underline hover:text-black dark:hover:text-white normal-case mt-2 transition-colors duration-200"
      >
        Already have an account?
      </Button>
    </div>
  );
}
