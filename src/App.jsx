import { Route, Routes, BrowserRouter } from "react-router-dom"
import NavBar from "./Components/NavBar"
import Body from "./Components/Body"
import Profile from "./Components/Profile"
import Login from "./Components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appstore"
import Feed from "./Components/feed"
import Connections from "./Components/Connections"


function App() {


  return (
    <>
      <Provider store={appStore}>


        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />


            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>

        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App