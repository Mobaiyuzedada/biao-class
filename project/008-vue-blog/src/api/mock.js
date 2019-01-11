import $ from 'axios'
import Axios from 'axios';

let appKey = "7e6bea229695a1fa61255e8dd12a6ac7132d6f5d64ed4f00ae4b9956b9dc0148";


export default function api(url, data) {
    let timestamp = Date.now();
    return $.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
        headers: {
            'BIAO-MOCK-APP-KEY': appKey,
            'BIAO-MOCK-TIMESTAMP': timestamp,
            'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
        }
    }).then(r => {
        return r.data;
    });
}

function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}