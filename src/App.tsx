import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Status from './Pages/Status/Status';
import AutoAccept from './Pages/AutoAccept/AutoAccept';
import { PortalContainer } from './Components/Portal/PortalContainer';
import { LeagueContextProvider } from './Contexts/LeagueContext';
import { Slide, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

const App = () => {
  // disable context menu on production build
  // https://github.com/tauri-apps/wry/issues/30#issuecomment-1061465700
  useEffect(() => {
    if (window.location.hostname !== 'tauri.localhost') {
      return;
    }
    document.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();
        return false;
      },
      { capture: true }
    );
    document.addEventListener(
      'selectstart',
      (e) => {
        e.preventDefault();
        return false;
      },
      { capture: true }
    );
  }, []);

  return (
    <LeagueContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="status" element={<Status />} />
            <Route path="auto-accept" element={<AutoAccept />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <PortalContainer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </LeagueContextProvider>
  );
};

export default App;
