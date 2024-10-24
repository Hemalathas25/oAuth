import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          { <Outlet /> }
        </Container>
      </main>
      <Footer />
    </>
  )
};

export default App;