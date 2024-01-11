/* eslint-disable @typescript-eslint/no-var-requires */
import { App } from 'vue';

export function globalInit(app: App<Element>) {
    app.component('Card', require('../components/cards/card.vue').default);
    app.component('Progressbar', require('../components/progressbar/Progressbar.vue').default);
    app.component('TabNav', require('../components/tab/tab-nav.vue').default);
    app.component('Cardlist', require('../components/listing/cardList.vue').default);
    app.component('TabNavItems', require('../components/tab/tab-nav-items.vue').default);
    app.component('TabContent', require('../components/tab/tab-content.vue').default);
    app.component('TabContentItem', require('../components/tab/tab-content-item.vue').default);
    app.component('HoverMenu', require('../components/menustyle/HoverMenu.vue').default);
    app.component('ModeSwitch', require('../components/mode/ModeSwitch.vue').default);
    app.component('Select2', require('../components/form/select2/Select2.vue').default);
    app.component('DropdownToggle', require('../components/dropdownToggle/DropdownToggle.vue').default);
}
