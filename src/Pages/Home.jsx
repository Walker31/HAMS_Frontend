import Header from "../components/header";
import TopDoc from "../components/topDoc";
import Programs from "../components/programs";
import NavbarAlt from "../components/navbarAlternate";
import Navbar from '../components/navbar';
import Navbar2 from "../components/navbar2";

const Home = () => {
  return (
    <>
      <Navbar/>
      <Navbar2/>
      <main className="px-4 sm:px-8 md:px-12 lg:px-16 space-y-10 pt-6">
        <Header />
      <TopDoc />
      <Programs />
      </main>
      
    </>
  );
};
export default Home;
