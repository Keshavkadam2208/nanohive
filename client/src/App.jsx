import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import SearchInfluencers from "./pages/SearchInfluencers";

function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                path="/login"
                element={<Login/>}
                />

                <Route
                path="/signup"
                element={<Signup/>}
                />

                <Route
                path="/dashboard"
                element={
                <ProtectedRoute>
                <Dashboard/>
                </ProtectedRoute>
                }
                />

                <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }
                />

                <Route
                path="/search"
                element={
                    <ProtectedRoute>
                        <SearchInfluencers/>
                    </ProtectedRoute>
                }
                />
            </Routes>

        </BrowserRouter>

    );

}

export default App;