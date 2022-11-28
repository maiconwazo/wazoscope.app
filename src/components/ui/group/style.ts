import {View} from 'react-native';
import styled from 'styled-components';
import {CustomText} from '../text/style';

export const GroupContainer = styled(View)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  elevation: 3;
  flex-flow: row wrap;
`;

export const GroupTitle = styled(CustomText)`
  font-size: 20px;
  width: 100%;
`;
