<template>
    <li :class="liClass">
        <a
            :id="id"
            :class="`nav-link ${className} ${widthclass}`"
            :data-toggle="dataToggle"
            :href="url"
            :role="role"
            :aria-controls="ariaControls"
            :aria-selected="ariaSelected"
        >
            <slot v-if="hasTitleSlot" name="title" />
            <template v-else>{{ title }}</template>
        </a>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TabNavItems',
    props: {
        id: { type: String, default: 'myTab' },
        active: { type: Boolean, default: false },
        role: { type: String, default: 'tab' },
        ariaControls: { type: String, default: 'tabpanel' },
        ariaSelected: { type: Boolean, default: false },
        dataToggle: { type: String, default: 'tab' },
        href: { type: String, default: '' },
        title: { type: String, default: '' },
        liClass: { type: String, default: 'nav-item' },
        widthclass: { type: String, default: null },
    },
    data() {
        return {
            className: '',
        };
    },
    computed: {
        hasTitleSlot() {
            return !!this.$slots.title;
        },
        url() {
            if (this.href === '') {
                return `#${this.ariaControls}`;
            }
            return this.href;
        },
    },
    mounted() {
        if (this.active) {
            this.className = 'show active';
        }
    },
});
</script>
