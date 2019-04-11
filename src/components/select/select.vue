<template>
    <div :class="wrapClasses">
        <Dropdown
            trigger="click"
            @on-visible-change="changeVisible"
            :class="{'ivu-dropdown-visible': visible}"
            @on-click="changeDropdownItem"
            placement="bottom-start"
        >
            <a href="javascript:void(0)">
                {{currentText}}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem
                    :selected="item.Id==selectedId"
                    :name="item.Id"
                    v-for="item in list"
                    :key="item.Id"
                >{{ item.name }}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

const prefixCls = "z-select";

@Component
export default class Select extends Vue {
    name: string = "Select";

    @Prop({ default: [] }) list: Array<{ Id: number; name: string }>;
    @Prop({ default: null }) id: number;

    prefixCls: string = prefixCls;
    visible: boolean = false;
    currentText: string = this.list && this.list[0].name;
    selectedId: number = this.id || (this.list && this.list[0].Id);

    @Watch("id", { immediate: true })
    onIdChange(val) {
        this.handleSelected(val);
    }

    get wrapClasses() {
        return `${prefixCls}-wrap`;
    }

    handleSelected(id) {
        this.selectedId = id;
        this.currentText = this.list.filter(v => v.Id == id)[0].name;
    }
    changeVisible(visible) {
        this.visible = visible;
    }
    changeDropdownItem(id) {
        this.handleSelected(id);
        this.$emit("on-change", id);
    }
}
</script>
