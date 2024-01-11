<template>
    <div>
        <DonutChart
            v-if="type === 'donut'"
            :id="element"
            :data="data"
            :colors="colors"
            :resize="resize"
            :height="height"
        >
        </DonutChart>
        <BarChart
            v-if="type === 'bar'"
            :id="element"
            :data="data"
            :xkey="xKeys"
            :ykeys="yKeys"
            resize="true"
            :labels="labels"
            :bar-colors="colors"
            grid="true"
            grid-text-weight="bold"
        >
        </BarChart>
        <LineChart
            v-if="type === 'line'"
            :id="element"
            :data="data"
            :xkey="xKeys"
            :ykeys="yKeys"
            :line-colors="colors"
            :labels="labels"
            grid="true"
            grid-text-weight="bold"
            hide-hover="auto"
        >
        </LineChart>
        <AreaChart
            v-if="type === 'area'"
            :id="element"
            :data="data"
            :line-colors="colors"
            :resize="resize"
            :labels="labels"
            :xkey="xKeys"
            :ykeys="yKeys"
            hide-hover="always"
            grid="true"
            grid-text-weight="bold"
        >
        </AreaChart>
    </div>
</template>
<script>
import { DonutChart, BarChart, LineChart, AreaChart } from 'vue-morris';

export default {
    name: 'MorrisChart',
    components: {
        DonutChart,
        BarChart,
        LineChart,
        AreaChart,
    },
    props: {
        type: { type: String, default: null, required: true },
        element: { type: String, default: null },
        height: { type: Number, default: null },
        xKeys: { type: String, default: '' },
        data: { type: Array, default: () => [], required: true },
        colors: { type: Array, default: () => [], required: true },
        yKeys: { type: Array, default: () => [] },
        labels: { type: Array, default: () => [] },
        resize: { type: Boolean, default: true },
    },
    computed: {
        prettyFloorMinFollowers() {
            return this.prettyFloor(this.yMinMax.min.followers);
        },
        prettyCeilMaxFollowers() {
            return this.prettyCeil(this.yMinMax.max.followers);
        },
        yMinMax() {
            return this.minMax(this.data, 'followers');
        },
    },
    methods: {
        osColors() {},
        minMax(objects, field) {
            const result = {};
            return objects.reduce(function (valorAnterior, valorActual, indice) {
                if (indice === 1) {
                    result.min = valorAnterior;
                    result.max = valorAnterior;
                }
                // eslint-disable-next-line no-unused-expressions
                valorActual[field] < result.min[field] ? (result.min = valorActual) : '';
                // eslint-disable-next-line no-unused-expressions
                valorActual[field] > result.max[field] ? (result.max = valorActual) : '';
                return result;
            });
        },
        prettyFloor(number) {
            let l = Math.floor(Math.log10(Math.abs(number), 10)) - 1;
            if (l <= 0) {
                l++;
            }
            number /= 10 ** l;
            number = Math.floor(number);
            if (l > 0) {
                number *= 10 ** l;
            }
            return number;
        },
        prettyCeil(number) {
            let l = Math.floor(Math.log10(Math.abs(number), 10)) - 1;
            if (l <= 0) {
                l++;
            }
            number /= 10 ** l;
            number = Math.ceil(number);
            if (l > 0) {
                number *= 10 ** l;
            }
            return number;
        },
    },
};
</script>
