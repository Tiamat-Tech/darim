import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as api from '../../api/post';
import ListItem from './ListItem';
import { SummarizedPost, Session } from '../../models';
import { Container } from '../../components';

interface Props {
  session: Session;
}

const StyledContainer = styled(Container)`
  padding: 0 20px 0 20px;
`;

const List: React.FC<Props> = ({ session }) => {
  const [posts, setPosts] = useState<SummarizedPost[]>([]);

  const load = async () => {
    const post_list = await api.fetchPosts(session.user.public_key || '', session.accessToken);
    setPosts(post_list);
  };

  useEffect(() => {
    load();
  }, []);

  return <StyledContainer top={50}>
    {posts.map((post) => {
      return <ListItem key={post.id} post={post}/>
    })}
  </StyledContainer>
};

export default List;
