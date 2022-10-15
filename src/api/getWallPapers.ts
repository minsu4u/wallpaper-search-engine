import request from './request';
import { IParamObj } from '../types/index';

const BASE_URL = 'https://pixabay.com/api';
const defaultParam = {
    key: process.env.REACT_APP_PIXABAY!,
    safesearch: 'true',
};
const getWallPapers = async (paramObj: IParamObj) => {
    console.log(paramObj);
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const result = await request(`${BASE_URL}/?${params}`);
    return result;
};

export default getWallPapers;
