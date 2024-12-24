import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {IItemCommon} from "../../types/types";

interface BaseFlatListProps<ItemType extends IItemCommon> extends FlatListProps<ItemType> {
}

const BaseFlatList = <ItemType extends IItemCommon>(props: BaseFlatListProps<ItemType>) => {
    return <FlatList {...props}/>;
};

export default BaseFlatList;
