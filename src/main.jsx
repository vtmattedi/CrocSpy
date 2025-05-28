import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './Contexts/GlobalContext.jsx'
import { ThemeProvider } from './Contexts/ThemeContext.jsx'
import { TosProvider } from './Contexts/TOSContext.jsx'
import App from './App.jsx'
import Landing from './Pages/Landing/Landing.jsx'
import Map from './Pages/Map/Map.jsx'
import NotFound from './Pages/Notfound/Notfound.jsx'
import CameraPage from './Pages/Camera/Camera.jsx'
import Info from './Pages/Info/Info.jsx'
import Home from './Pages/Home/Home.jsx'
// import i18n (needs to be bundled ;))
import './Translations/i18n.js';
import NavLayout from './Pages/NavLayout.jsx'
import Test from './Pages/Test/test.jsx'
import Result from './Pages/Result/Result.jsx'
import Identify from './Pages/Identify/Identify.jsx'
import Upload from './Pages/Upload/Upload.jsx'
import HowTo from './Pages/HowTo/HowTo.jsx'
import Ws from './Pages/Tests/ws.jsx'
if (process.env.REACT_APP_CACHE_ENABLE === 'true') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceworker.js');
    });
  }

}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: "/map",
    element: <NavLayout children={<Map />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/camera",
    element: <NavLayout children={<CameraPage />} />,
  },
  {
    path: "/info",
    element: <NavLayout children={<Info />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <NavLayout children={<Home />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/test",
    element: <NavLayout children={<Home />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/result/:id",
    element: <NavLayout children={<Result />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/Upload/:id",
    element: <NavLayout children={<Upload />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/Identify",
    element: <NavLayout children={<Identify />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/Explore",
    element: <NavLayout children={<Info />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/howto/:what",
    element: <NavLayout children={<HowTo />} />,
    errorElement: <NotFound />,

  },
  {
    path: "/404",
    element: <NotFound />,
    errorElement: <NotFound />,

  },


]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalProvider>
        <TosProvider>
          <App>
            <RouterProvider router={router} />
          </App>
        </TosProvider>
      </GlobalProvider>
    </ThemeProvider>
  </StrictMode>,
);
