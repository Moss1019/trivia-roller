import axios from "axios";

axios.defaults.headers.get['Accept'] = 'application/json';

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.defaults.headers.delete['Accept'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export default axios;
