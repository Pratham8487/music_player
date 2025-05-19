import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import FileNotFound from "./pages/NotFound";
// import YoutubeVideo from "./components/common/YoutubeVIdeo"
import VideoPlayer from "./pages/VideoPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/watch/:id" element={<VideoPlayer />} />
            <Route path="*" element={<FileNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
