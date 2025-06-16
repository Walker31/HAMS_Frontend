export default function PatientRegisterForm({ formData, handleChange, handleRegisterSubmit, handleBack }) {
  return (
    <div className="w-full max-w-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Patient Registration</h2>
      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        <CommonFields handleChange={handleChange} />
        <input type="date" name="dateOfBirth" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="street" placeholder="Street" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="emergencyName" placeholder="Emergency Contact Name" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="emergencyPhone" placeholder="Emergency Contact Phone" pattern="[0-9]{10}" onChange={handleChange} className="w-full p-3 border rounded-md" required />
        <input type="text" name="emergencyRelation" placeholder="Relation" onChange={handleChange} className="w-full p-3 border rounded-md" required />
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
 