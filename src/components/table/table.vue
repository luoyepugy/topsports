<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    const prefixCls = 'ble-table';

    export default {
        name: 'Table',
        props: {
            separator: {
                type: String,
                default: '/'
            }
        },
        computed: {
            classes () {
                return `${prefixCls}`;
            }
        },
        mounted () {
            this.updateChildren();
        },
        updated () {
            this.$nextTick(() => {
                this.updateChildren();
            });
        },
        methods: {
            updateChildren () {
                this.$children.forEach((child) => {
                    child.separator = this.separator;
                });
            }
        },
        watch: {
            separator () {
                this.updateChildren();
            }
        }
    };
</script>
