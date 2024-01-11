import axios from 'axios';
import { Router } from 'vue-router';
import { Store } from 'vuex';

export default function axiosInit(store: Store<any>, router: Router) {
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

    axios.interceptors.response.use(
        (resp) => resp,
        async (error) => {
            if (error.response.status === 401) {
                await store.dispatch('setAuth', false);

                const response = await axios.post(
                    'auth/refresh',
                    {},
                    {
                        withCredentials: true,
                    },
                );

                if (response.status === 200) {
                    await store.dispatch('setAuth', true);
                    return axios(error.config);
                }
                if (response.status === undefined) {
                    await router.push('/auth/sign-in');
                    return axios(error.config);
                }
            }
            return error;
        },
    );
}
