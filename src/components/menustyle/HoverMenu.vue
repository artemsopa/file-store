<template>
    <ul :id="idName" tag="ul" :class="className">
        <li v-for="(item, index) in items" :key="index" :class="item.is_heading ? 'iq-menu-title' : ''">
            <i v-if="item.is_heading && hideListMenuTitle" class="ri-subtract-line" />
            <span v-if="item.is_heading">{{ item.name }}</span>
            <router-link v-if="!item.is_heading" :to="item.link" :class="`iq-waves-effect`">
                <i v-if="item.name && hideListMenuTitle" :class="item.icon_class ? item.icon_class : ''"></i>
                <template v-else v-html="item.icon"> </template>
                <span>{{ item.title }}</span>
                <template v-if="item.children && enableIcon">
                    <template v-if="enableCustomIcon">
                        <i :class="item.expanded_icon_class"></i>
                        <i :class="item.collapse_icon_class"></i>
                    </template>
                    <i v-else class="ri-arrow-right-s-line iq-arrow-right" />
                </template>
                <small v-if="hideListMenuTitle" :class="item.append_class" v-html="item.append" />
            </router-link>
            <List
                v-if="item.children"
                :items="item.children"
                :sidebar-group-title="hideListMenuTitle"
                :id-name="item.name"
                :class-name="`iq-submenu ${item.class_name}`"
            />
        </li>
    </ul>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import List from './CollapseMenu.vue';
import { core } from '@/config/pluginInit';

export default defineComponent({
    name: 'List',
    components: {
        List,
    },
    props: {
        items: Array as PropType<Array<any>>,
        className: { type: String, default: 'iq-menu d-flex' },
        open: { type: Boolean, default: false },
        idName: { type: String, default: 'iq-sidebar-toggle' },
        sidebarGroupTitle: { type: Boolean, default: true },
        enableCustomIcon: { type: Boolean, default: false },
        enableIcon: { type: Boolean, default: true },
    },
    computed: {
        hideListMenuTitle() {
            return this.sidebarGroupTitle;
        },
    },
    methods: {
        activeLink(item: any) {
            return core.getActiveLink(item, this.$route.name);
        },
    },
});
</script>

<style scoped>
.iq-submenu {
    max-height: 300px;
    overflow-y: scroll;
}
</style>
