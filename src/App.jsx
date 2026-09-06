import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeBanner from './components/NoticeBanner';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton, { RouteScrollReset } from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Deities from './pages/Deities';
import Festivals from './pages/Festivals';
import Offerings from './pages/Offerings';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <RouteScrollReset />
      <NoticeBanner />
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/deities" element={<Deities />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/offerings" element={<Offerings />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

export default App;
