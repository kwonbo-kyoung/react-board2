import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Wrapper = styled.div`
  width: calc(100% - 35px); padding: px; display: flex;
  flex-direction: column; align-items: flex-start;
  justify-content: center;
  border: 1px solid grey; border-radius: 8px;
  cursor: pointer; background: white;
  :hover { background: lightgrey; }
`;

const TitleText = styled.p`
  font-size: 20px; font-weight: 500;
`;

function PostListItem(props) {
  const navigate = useNavigate();
  const {post, onClick} = props;
  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title} ({post.comments.length})</TitleText>
      <button onClick={async (e) => {
        const data = await fetch("http://localhost:8080/post-delete", {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({id: post.id})
        });
        const res = await data.json();
        alert(res.msg);
        if(res.code == 200) {
          navigate("/")
        }
      }}>삭제</button>
    </Wrapper>
  );
}

export default PostListItem;
