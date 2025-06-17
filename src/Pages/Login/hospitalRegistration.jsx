export default function HospitalRegisterForm({ formData, handleChange, handleRegisterSubmit, handleBack }) {
  return (
    <div className="w-full max-w-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Hospital Registration</h2>
      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        <input
        type="text"
        name="hospitalName"
        placeholder="Name of the Hospital"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        pattern="[0-9]{10}"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      />
      
        <input type="text" name="RegId" placeholder="Registratiion Number" onChange={handleChange} className="w-full p-3 border rounded-md" required />
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
