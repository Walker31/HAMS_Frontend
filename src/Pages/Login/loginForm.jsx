export default function LoginForm({ formData, handleChange, handleLoginSubmit, handleBack }) {
  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <form className="space-y-4" onSubmit={handleLoginSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Phone (10 digits)"
          pattern="[0-9]{10}"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength="6"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
      <button onClick={handleBack} className="text-sm text-gray-600 underline hover:text-black">
        Back
      </button>
    </div>
  );
}
