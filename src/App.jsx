import { Navigate, Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { ArticleDetail, CreateArticle, Home, Login, Register } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { authUserSuccess } from "./slice/auth";
import { getStorage } from "./utils/utils";

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.auth);

  const getUser = async () => {
    try {
      const { user } = await AuthService.getUser();
      dispatch(authUserSuccess(user));
    } catch (error) {
      console.log("something went wrong while get user data");
    }
  };

  useEffect(() => {
    const token = getStorage("token");
    if (!!token) {
      getUser();
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} />
        {loggedIn ? (
          <>
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default App;
