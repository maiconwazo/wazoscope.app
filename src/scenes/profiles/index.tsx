import React, {useCallback, useEffect} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import useProfiles from '~/hooks/profiles';
import Item from './item';

const PADDING = 1;
const COLUMN_COUNT = 3;

const CustomFlatList = styled(FlatList<Profile>)`
  padding: ${PADDING}px;
  min-height: 100%;
`;

const ProfilesScene = () => {
  const {loading, content, loadFirstPage, loadNextPage} = useProfiles();

  const renderItem = useCallback(({item}: ListRenderItemInfo<Profile>) => {
    return <Item profile={item} />;
  }, []);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  return (
    <View>
      <CustomFlatList
        numColumns={COLUMN_COUNT}
        data={content}
        keyExtractor={item => item.id}
        onRefresh={loadFirstPage}
        refreshing={loading}
        renderItem={renderItem}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ProfilesScene;
