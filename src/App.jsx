import "./App.css";
import { Navigation } from "./components/Navigation";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateEditBlogPost } from "./pages/CreateEditBlogPost";
import { AuthProvider } from "./context/AuthProvider";
import { BlogPostDetail } from "./components/BlogPostDetail";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/new" element={<CreateEditBlogPost />} />
            <Route path="/edit" element={<CreateEditBlogPost />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
