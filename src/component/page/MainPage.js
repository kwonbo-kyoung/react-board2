import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
import Button from '../ui/Button';
// import data from '../../data.json';
import { useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 35px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  :not(:last-child) {
      margin-bottom: 16px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 720px;
  & > a {
    margin-top: 16px;
    text-decoration: none;
    font-size: 1.5rem;
  }
`;

function MainPage(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page') || 1;
  // if(page == null) {
  //   page = 1;
  // }

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(5);
  const [pagination, setPagination] = useState([]);
  
  useEffect(() => {
const fetchData = async () => {
  const data2 = await fetch(`http://localhost:8080/posts?page=${page}`);
  const res = await data2.json();
  setData(res.posts);
  setStartPage(res.startPage);
  setEndPage(res.endPage);

  const new_arr = [];
  for(let i = res.startPage; i <= res.endPage; i++) {
    new_arr.push(
      <Link to={`/?page=${i}`} key={i}>
        {i}
      </Link>
    );
  }
  new_arr.push(<Link to={`/?page=${res.totalPage}`} key={res.totalPage+100}>
    [마지막 페이지]
  </Link>);
  setPagination(new_arr);
}
fetchData();
  }, [page]);

  return (
<Wrapper>
  <Container>
    <Link to="/post-write">글 작성</Link>
    <Button
      title='글 작성하기'
      onClick={() => {
        // window.location.href = '/post-write';
        navigate('/post-write');
      }}
    />
<PostList
  posts={data}
  onClickItem={(item) => {
    navigate(`/post/${item.id}`);
  }}
/>
<br />
<Pagination>
  {pagination}
</Pagination>
  </Container>
</Wrapper>
  );
}

export default MainPage;