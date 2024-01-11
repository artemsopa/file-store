<template>
    <div class="change-mode">
        <div class="custom-control custom-switch custom-switch-icon custom-control-inline">
            <div class="custom-switch-inner">
                <p class="mb-0"></p>
                <input id="dark-mode" v-model="dark" type="checkbox" class="custom-control-input" data-active="true" />
                <label class="custom-control-label" for="dark-mode" data-mode="toggle">
                    <span class="switch-icon-left"><i class="a-left ri-moon-clear-line"></i></span>
                    <span class="switch-icon-right"><i class="a-right ri-sun-line"></i></span>
                </label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
    name: 'ModeSwitch',
    data() {
        return {
            dark: false,
        };
    },
    computed: {
        ...mapGetters({
            stateDark: 'dark',
        }),
    },
    watch: {
        dark() {
            this.changeMode(this.dark);
        },
    },
    mounted() {
        this.dark = this.stateDark;
        if (this.$route.query.dark !== undefined) {
            this.dark = Boolean(this.$route.query.dark);
        }
        this.changeMode(this.dark);
    },
    methods: {
        ...mapActions({
            modeChange: 'layoutModeAction',
        }),
        changeMode(value: any) {
            this.modeChange({ dark: value });
            const body = document.querySelector('body');
            if (value) {
                body?.classList.add('dark');
            } else {
                body?.classList.remove('dark');
            }
        },
    },
});
</script>
