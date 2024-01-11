<template>
    <div class="dashboard1-dropdown d-flex align-items-center">
        <div v-menu-toggle class="dashboard1-info rounded">
            <div class="collapsed iq-toggle">
                <i class="ri-arrow-down-s-line"></i>
            </div>
            <ul id="calander" class="iq-dropdown collapse list-inline m-0 p-0 mt-2" style="z-index: 98">
                <li class="mb-2">
                    <a v-b-tooltip.left href="#" data-toggle="tooltip" title="Calander" data-placement="right"
                        ><i class="las la-calendar iq-arrow-left"></i
                    ></a>
                </li>
                <li class="mb-2">
                    <a v-b-tooltip.left href="#" data-toggle="tooltip" data-placement="right" title="Keep"
                        ><i class="las la-lightbulb iq-arrow-left"></i
                    ></a>
                </li>
                <li>
                    <a v-b-tooltip.left href="#" data-toggle="tooltip" data-placement="right" title="Tasks"
                        ><i class="las la-tasks iq-arrow-left"></i
                    ></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DropdownToggle',
});
</script>
