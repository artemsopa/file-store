<template>
    <ul
        :id="id"
        :class="
            `nav nav-${pills ? 'pills' : ''}${tabs ? 'tabs' : ''} ${vertical ? 'flex-column' : ''} ${
                align ? `justify-content-${align}` : ''
            }` + ` ${extraclass}`
        "
        :role="role"
        :aria-orientation="aria"
    >
        <slot />
    </ul>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Tab from 'bootstrap/js/src/tab';
import { Aria } from '@/models/Aria';

export default defineComponent({
    name: 'TabNav',
    props: {
        id: { type: String, default: 'myTab' },
        pills: { type: Boolean, default: false },
        vertical: { type: Boolean, default: false },
        tabs: { type: Boolean, default: false },
        align: { type: String, default: '' },
        extraclass: { type: String, default: '' },
        role: { type: String, default: '' },
        aria: { type: Object as () => Aria, default: () => ({ orientation: 'horizontal' }) },
    },
    mounted() {
        const triggerTabList = [].slice.call(document.querySelectorAll(`#${this.id} a`));
        triggerTabList.forEach(function (triggerEl: any) {
            const tabTrigger = new Tab(triggerEl);

            triggerEl.addEventListener('click', function (e: any) {
                e.preventDefault();
                tabTrigger.show();
            });
        });
    },
});
</script>
