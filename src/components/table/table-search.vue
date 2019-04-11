<template>
    <span>
        <a
            v-if="to"
            :href="linkUrl"
            :target="target"
            :class="linkClasses"
            @click.exact="handleCheckClick($event, false)"
            @click.ctrl="handleCheckClick($event, true)"
            @click.meta="handleCheckClick($event, true)">
            <slot></slot>
        </a>
        <span v-else :class="linkClasses">
            <slot></slot>
        </span>
        <span :class="separatorClasses" v-html="separator" v-if="!showSeparator"></span>
        <span :class="separatorClasses" v-else>
            <slot name="separator"></slot>
        </span>
    </span>
</template>
<script>
    const prefixCls = 'ble-table-search';

    export default {
        name: 'TableSearch',
        props: {

        },
        data () {
            return {
                separator: '',
                showSeparator: false
            };
        },
        computed: {
            linkClasses () {
                return `${prefixCls}-link`;
            },
            separatorClasses () {
                return `${prefixCls}-separator`;
            }
        },
        mounted () {
            this.showSeparator = this.$slots.separator !== undefined;
        }
    };
</script>