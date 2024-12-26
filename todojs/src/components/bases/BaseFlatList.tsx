import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {ICommonObject} from "../../../../backend/types";

interface BaseFlatListProps<ItemType extends ICommonObject> extends FlatListProps<ItemType> {
}

const BaseFlatList = <ItemType extends ICommonObject>(props: BaseFlatListProps<ItemType>) => {
    return <FlatList {...props}/>;
};

export default BaseFlatList;
