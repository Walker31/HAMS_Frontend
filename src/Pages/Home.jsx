import Header from "../components/header";
import TopDoc from "../components/topDoc";
import Programs from "../components/programs";
import NavbarAlt from "../components/navbarAlternate";
import Navbar from '../components/navbar';
import Navbar2 from "../components/navbar2";
import Shopping from "../components/shopping";
import shopping from "../components/shopping";


const Home = () => {
  return (
    <>
      <main className="px-4 sm:px-8 md:px-12 lg:px-16 space-y-10 pt-6">
        <Header />
      <TopDoc />
      <Programs />
      <Shopping />

      </main>
      
    </>
  );
};
export default Home;
