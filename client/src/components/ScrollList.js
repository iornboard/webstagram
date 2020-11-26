import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Content, Loading } from './ScrollList.styles';


function ScrollList()  {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [comments, setComment] = useState([]);


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }

  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      callApi().then(res => setComment(res));
      setLoading(false);

    };
   
    loadUsers();
  }, [page]);


  const callApi = async () => {
    const response = await fetch('/api/posts/get');
    const post = await response.json();
    console.log(post);
    return post;
  }

  return (
    <div className='ScrollList'>
      <Content onScroll={handleScroll}>
      { comments ?  comments.map((comment) => <Post key={comment._id} comment={comment} />).reverse() : loading && <Loading>Loading ...</Loading> }
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default ScrollList;