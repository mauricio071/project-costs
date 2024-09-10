import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NewProject from './pages/NewProject';
import Container from './layout/Container';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Projects from './pages/Projects';
import Project from './pages/Project';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/NewProject' element={<NewProject />} />
          <Route path='/project/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
