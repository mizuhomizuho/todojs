import {PAGE_HOME, PAGE_ITEMS, STORAGE_NAVIGATION_ID} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {IPageItem} from "../../../backend/types";

export async function getCurrentPage(): Promise<IPageItem> {
    let pageId = await AsyncStorage.getItem(STORAGE_NAVIGATION_ID);
    if (pageId === null) {
        return getPage(PAGE_HOME);
    }
    const page = getPage(pageId);
    // console.log(page, 111);
    // if (page.id === PAGE_AUTHENTICATE && ) {
    //
    // }
    return page;
}

export function getPage(pageId: string) {
    const page = PAGE_ITEMS.find(({id}) => id === pageId);
    if (!page) {
        throw new Error('Page is undefined');
    }
    return page;
}