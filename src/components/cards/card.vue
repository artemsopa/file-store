<template>
    <div :class="`card ${className}`">
        <slot name="cardImage" />
        <div
            v-if="hasHeaderTitleSlot || hasHeaderActionSlot"
            :class="`card-header d-flex justify-content-between ` + ` ${headerClass}`"
        >
            <div class="header-title">
                <slot name="headerTitle" />
            </div>
            <div class="card-header-toolbar d-flex align-items-center">
                <slot name="headerAction" />
            </div>
        </div>
        <b-card-body v-if="hasBodySlot" :body-class="`card-body ${bodyClass}`">
            <slot name="body" />
        </b-card-body>
        <slot />
        <div v-if="hasFooterSlot" :class="`card-footer${footerClass}`">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Card',
    props: {
        className: { type: String, default: '' },
        bodyClass: { type: String, default: '' },
        headerClass: { type: String, default: '' },
        footerClass: { type: String, default: '' },
    },
    computed: {
        hasHeaderTitleSlot() {
            return !!this.$slots.headerTitle;
        },
        hasHeaderActionSlot() {
            return !!this.$slots.headerAction;
        },
        hasBodySlot() {
            return !!this.$slots.body;
        },
        hasFooterSlot() {
            return !!this.$slots.footer;
        },
    },
    mounted() {},
});
</script>
