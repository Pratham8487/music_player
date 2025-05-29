import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/HomePage";
import FileNotFound from "./pages/NotFound";
import { GlobalPlayerProvider } from "./context/PlayerContext";
import VideoPlayer from "./pages/VideoPlayer";
import QueuePage from "./pages/QueuePage";
import { QueueProvider } from "./context/QueueContext";
import BottomPlayer from "./components/BottomPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueueProvider>
        <GlobalPlayerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/watch/:id" element={<VideoPlayer />} />
                <Route path="/yourqueue" element={<QueuePage />} />
                <Route path="*" element={<FileNotFound />} />
              </Route>
            </Routes>
            <BottomPlayer />
          </BrowserRouter>
        </GlobalPlayerProvider>
      </QueueProvider>
    </QueryClientProvider>
  );
}

export default App;
