import axios from 'axios';
import {BASE_URL} from '../Assets/utils/Restapi/Config';
import {_getStorage} from '../Assets/utils/storage/Storage';

const UnpaidBookingDelete = async () => {
  const token = await _getStorage('token');
  console.log(token);
  axios
    .delete(BASE_URL + `/booking/deleteMany`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => {
      console.log('Booking has been deleted', res.data);
    })
    .catch(error => {
      console.log('UnpaidBookingDelete  catch error', error.response.data);
    });
};

export const APIservice = {UnpaidBookingDelete};
