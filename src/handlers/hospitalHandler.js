import { createHospital } from "../apiControllers/userAPI";

export default async function hospitalHandler(formData,login) {
  const formatData = {
    hospitalName: formData.hospitalName,
    phone: formData.phone,
    email: formData.email,
    password: formData.password,
    RegId:formData.RegId,
    location: {
      coordinates: [formData.location.latitude, formData.location.longitude], // [longitude, latitude]
    },
  };
  console.log(formatData);
  try {

    const response = await createHospital(formatData,login);
    console.log("Hospital registered successfully:", response);
    alert("Hospital registration successful!");
  } catch (error) {
    console.error("Hospital registration error:", error);
    alert("Hospital registration failed.");
  }
}
