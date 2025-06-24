import Header from "../components/header";
import TopDoc from "../components/topDoc";
import Programs from "../components/programs";
import Feedback from "../components/feedback";
import Shopping from "../components/ShoppingCart";
import Footer from "../components/footer";
import FloatingBar from "../components/FloatingBar"; // ← import it

const Home = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-12 md:gap-16 bg-[#f9fafb] relative">
        <section className="pt-6">
          <TopDoc />
        </section>
        <section>
          <Shopping />
        </section>
        <section>
          <Programs />
        </section>
        <section>
          <Feedback />
        </section>
      </main>
      <Footer />
      
      {/* Floating Sidebar */}
      <FloatingBar /> {/* ← Place it here to keep it always visible */}
    </>
  );
};

export default Home;
