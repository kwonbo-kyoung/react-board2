import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components";

import MainPage from "./component/page/MainPage";
import PostWritePage from "./component/page/PostWritePage";
import PostViewPage from "./component/page/PostViewPage";
import MovieList from "./component/MovieList";

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function PostContainer() {
  return (
    <div>
      <MainTitleText>미니 블로그</MainTitleText>
      <Outlet></Outlet>
    </div>
  );
}

function News() {
  return <h1>News 페이지</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Link to={"/news"}>뉴스페이지</Link>
      <Link to={"/post"}>미니블로그</Link>
      <Link to={"/movie"}>영화검색</Link>

      <Routes>
        <Route path="news" element={<News />}></Route>
        <Route path="movie" element={<MovieList />}></Route>
        <Route path="post" element={<PostContainer />}>
          <Route index element={<MainPage />} />
          <Route path="write" element={<PostWritePage />} />
          <Route path=":postId" element={<PostViewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
