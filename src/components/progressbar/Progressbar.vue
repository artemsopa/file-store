<template>
    <div
        :class="`iq-progress-bar bg-${colorName}-light ${
            verticle ? `progress-bar-vertical bg-${colorName}` : '-light'
        }`"
    >
        <span
            ref="progress"
            :class="`bg-${color}` + ` ${midclass}`"
            style="transition: 'width 2s ease 0s "
            :data-value="value"
        >
            <slot name="text" />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { core } from '@/config/pluginInit.js';

export default defineComponent({
    name: 'Progressbar',
    props: {
        value: { type: Number, default: 0 },
        colorName: { type: String, default: 'null' },
        color: { type: String, default: 'null' },
        midclass: { type: String, default: null },
        verticle: { type: Boolean, default: false },
    },
    mounted() {
        this.$nextTick();
        setTimeout(() => {
            this.init();
        }, 100);
    },
    methods: {
        init() {
            if (this.verticle) {
                core.progressInitVerticle(this.$refs.progress);
            } else {
                core.progressInit(this.$refs.progress);
            }
        },
    },
});
</script>
