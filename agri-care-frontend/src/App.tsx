import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomCursor from "./components/CustomCursor"; 

function App() {
  return (
    <>
      <CustomCursor /> 
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
