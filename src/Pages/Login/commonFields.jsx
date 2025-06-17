export default function CommonFields({ handleChange }) {
  return (
    <>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
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
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        pattern="[0-9]{10}"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      />
      <select
        name="gender"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </>
  );
}
