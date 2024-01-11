<template>
    <div :id="id" :class="`tab-content` + ` ${extraclass}`">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TabContent',
    props: {
        id: { type: String, default: 'myTabContent' },
        extraclass: { type: String, default: 'null' },
    },
});
</script>
