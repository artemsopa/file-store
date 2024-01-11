<template>
    <card class="card-block card-stretch card-height" body-class="image-thumb">
        <template #body>
            <div class="mb-4 text-center p-3 rounded iq-thumb">
                <a class="image-popup-vertical-fit" :href="data?.src">
                    <img :src="data?.src" class="img-fluid" alt="images" />
                    <div class="iq-image-overlay"></div>
                </a>
            </div>
            <div class="d-flex justify-content-between">
                <h6>{{ data?.name }}</h6>
                <slot name="dropdown" />
            </div>
        </template>
    </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { core } from '@/config/pluginInit';

export default defineComponent({
    name: 'CardList',
    props: {
        data: {
            type: Object,
            require: true,
        },
    },
    mounted() {
        core.verticalImagePopup();
    },
});
</script>
