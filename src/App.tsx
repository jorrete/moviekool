import AppManager from 'components/AppManager';
import Home from 'pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AppManager>
      <BrowserRouter>
        <Routes>
          {['/', '/:movieId'].map((path) => (
            <Route
              key={path}
              path={path}
              element={(
                <Home />
              )}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AppManager>
  );
}

export default App;
