import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { Post } from '../../models';
import { Section } from '../../components';

interface Props {
  post: Post;
}

const Card = styled(Section)`
  margin-bottom: 30px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Date = styled.time`
  font-size: 12px;
  align-self: center;
`;

const HorizontalLine = styled.div`
  width: 30px;
  height: 1px;
  background-color: #000000;
  margin: 0 20px 0 20px;
  align-self: center;
`;

const Item: React.FC<Props> = ({ post }) => {
  const { title, date } = post;
  const displayed_date = dayjs(date).format('YYYY / MM / DD');

  return <Card row>
    <Date dateTime={date}>{displayed_date}</Date>
    <HorizontalLine />
      <Title>{title}</Title>
  </Card>
};

export default Item;