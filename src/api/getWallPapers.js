import request from './request';

const BASE_URL = 'https://pixabay.com/api';
const defaultParam = {
    key: process.env.REACT_APP_PIXABAY,
}
const getWallPapers = async (paramObj) => {
    console.log(paramObj)
    const params = new URLSearchParams({
        ...defaultParam,
        ...paramObj,
    }).toString();
    const result = await request(`${BASE_URL}/?${params}`);
    return result;
};

export default getWallPapers;
