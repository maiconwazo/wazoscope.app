import React, {ReactNode} from 'react';
import {GroupContainer, GroupTitle} from './style';

interface GroupProps {
  children: ReactNode;
  title: string;
}

const Group = (props: GroupProps) => {
  const {children, title} = props;

  return (
    <GroupContainer>
      <GroupTitle>{title}</GroupTitle>
      {children}
    </GroupContainer>
  );
};

export default Group;
