
// import NavBar from "./components/Navbar"
// import Home from "./pages/HomePage"
// import DetailPage from "./pages/DetailPage"
import AppRouter from "./router/Router"
import AuthContextProvider from "./context/AuthContext";


function App() {
  return (
    <AuthContextProvider >
      <AppRouter/>
    </AuthContextProvider>
  );
}

export default App;
