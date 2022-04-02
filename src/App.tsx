import AppManager from 'components/AppManager';
import Home from 'pages/Home';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AppManager>
      <BrowserRouter>
        <Routes>
          {['/', '/:movieId', '/:movieId/:action'].map((path) => (
            <Route
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
