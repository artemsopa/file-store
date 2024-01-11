<template>
    <highcharts :options="option"></highcharts>
</template>
<script>
import { Chart } from 'highcharts-vue';

export default {
    name: 'HighChart',
    components: {
        highcharts: Chart,
    },
    props: {
        option: { type: Object },
    },
    mounted() {},
};
</script>
