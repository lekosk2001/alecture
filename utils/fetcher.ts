import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true, // 겟 요청에서는 두번째 자리에 이걸 넣어줌으로서, 프론트와 백이 주소가달라도 쿠키 교환이 가능, post 함수에는 세번째 자리에 넣음.
    })
    .then((response) => response.data);

export default fetcher;
