<template>
    <div id="loading">
        <div id="loading-center"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { animation } from '@/config/pluginInit.js';

export default defineComponent({
    name: 'Loader',
    computed: {},
    watch: {
        $route() {
            this.init();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const load = document.getElementById('loading');
            load?.classList.remove('d-none');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            animation.fadeIn(load, { duration: 20 });
            setTimeout(() => {
                animation.fadeOut(load, { duration: 20 });
                load?.classList.add('d-none');
            }, 1000);
        },
    },
});
</script>
