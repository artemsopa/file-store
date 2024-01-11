import { App } from 'vue';
import 'flatpickr/dist/flatpickr.css';

import flatPickr from 'vue-flatpickr-component';

export function flatPickrInit(app: App<Element>) {
    app.use(flatPickr);
}
