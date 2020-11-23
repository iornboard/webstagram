import React, { useState, useEffect } from 'react';
// Components
import Post from './Post';
// Styles
import { Content, Loading } from './ScrollList.styles';
// API
import { getUsers } from '../API';




function ScrollList() {


  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev, ...newUsers]);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  return (
    <div className='ScrollList'>
      <Content onScroll={handleScroll}>
        {users && users.map((user) => <Post key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default ScrollList;
