import React, { lazy, Suspense } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Loading from './Loading'
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { ThanksP, ThanksT } from "./pages/Thanks"
import ThanksCP from "./pages/thanksCode/Preg";
import ThanksCT from "./pages/thanksCode/Tel";
import Error from "./pages/Error"
import ThanksTsbk from './pages/ThanksTsbk'
const Pay = lazy(() => import('./pages/pay/Pay'));
const Page404 = lazy(() => import('./pages/Page404'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Hubo un error en la aplicación.</h1>
          <button onClick={this.handleReload}>Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="begin" element={<Pay />} />
            <Route path="profile" element={<Profile />} />
            <Route path="thanksp"  element={<ThanksP />} />
            <Route path="thankst" element={<ThanksT />} />
            <Route path="thanksCp"  element={<ThanksCP />} />
            <Route path="thanksCt"  element={<ThanksCT />} />
            <Route path="thanksTbk" element={<ThanksTsbk />} />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
