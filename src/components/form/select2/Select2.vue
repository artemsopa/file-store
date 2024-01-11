<template>
    <select ref="select" class="w-100">
        <slot></slot>
    </select>
</template>

<script>
export default {
    name: 'Select2',
    props: ['options', 'value'],
    watch: {
        value(value) {
            // update value
            window.$(this.$el).val(value).trigger('change');
        },
        options(options) {
            // update options
            window.$(this.$el).empty().select2({ data: options });
        },
    },
    mounted() {
        const vm = this;
        window
            .$(this.$refs.select)
            // init select2
            .select2({ data: this.options })
            .val(this.value)
            .trigger('change')
            // emit event on change.
            .on('change', function () {
                vm.$emit('input', this.value);
            });
    },
    unmounted() {
        window.$(this.$el).off().select2('destroy');
    },
};
</script>
