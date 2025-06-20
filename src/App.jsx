import Footer from "./layouts/Footer/Footer";
import Header from "./layouts/Header/Header";
import AppRouter from "./routes/AppRoute";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
