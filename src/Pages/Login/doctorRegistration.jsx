import CommonFields from "./commonFields";
export default function DoctorRegisterForm({ formData, handleChange, handleRegisterSubmit, handleBack }) {
  return (
    <div className="w-full max-w-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Doctor Registration</h2>
      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        <CommonFields handleChange={handleChange} />
        <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="medicalReg" placeholder="Medical Registration Number" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="photo" placeholder="Photo URL" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="password" name="password" placeholder="Password (min 6 characters)" minLength="6" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Register
        </button>
      </form>
      <button onClick={handleBack} className="text-sm text-gray-600 underline hover:text-black mt-2">
        Back
      </button>
    </div>
  );
}
