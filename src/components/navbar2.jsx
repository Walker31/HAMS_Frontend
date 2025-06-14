const Navbar2 = () => {
    return <>
    <div class="flex flex-row justify-between p-6">
    <h1 className="text-3xl font-bold text-black">HAMS</h1>
      <div className="flex flex-row items-center justify-between space-x-6">
        <div className="flex space-x-8 text-teal-700 font-medium">
          <span class="hover:border-b-2 border-teal-700 transition">Healthcare</span>
          <span class="hover:border-b-2 border-teal-700 transition">Medical and Health Services</span>
          <span class="hover:border-b-2 border-teal-700 transition">Services</span>
          <span class="hover:border-b-2 border-teal-700 transition">About Us</span>
        </div>
        <div className="buttons" class="flex flex-row justify-around gap-2">
        <button className="bg-blue-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition">Select Location</button>
        <button className="bg-blue-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-800 transition">
          SIGN UP / Login
        </button>
        </div>
      </div>
    </div> 
    </>
}

export default Navbar2;