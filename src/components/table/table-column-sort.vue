<template>
    <Drawer class="cp-table-filtermodal" title="选择显示字段" :closable="false" v-model="fields.isShow">
        <Checkbox-group v-model="checkedList" @on-change="changeChecked">
            <Checkbox
                v-for="(item,index) in fields.data"
                :key="index"
                :label="item.title"
                :disabled="item.check==3"
                :value="item.check"
                :true-value="1"
                :false-value="2"
            >
                <span>{{item.title}}</span>
                <span class="arrow" v-if="item.check==1">
                    <Icon
                        @click.prevent.native="sortUp(index)"
                        v-show="index!=minIndex"
                        type="md-arrow-up"
                        size="16"
                    />
                    <Icon
                        @click.prevent.native="sortDown(index)"
                        v-show="index!=maxIndex"
                        type="md-arrow-down"
                        size="16"
                    />
                </span>
            </Checkbox>
        </Checkbox-group>
        <div class="cp-drawer-footer content-footer">
            <Button class="c-button" type="primary" @click="confirm">确定</Button>
            <Button class="c-button" @click="cancel">取消</Button>
        </div>
    </Drawer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class TableColumnSort extends Vue {
    name: string = "TableColumnSort";

    @Prop() fields: any;

    checkedList: any = [];

    // computed
    get minIndex() {
        let visibleList = this.fields.data.filter((v, i) => v.check != 3);
        return this.fields.data.indexOf(visibleList[0]);
    }
    get maxIndex() {
        let visibleList = this.fields.data.filter((v, i) => v.check != 3);
        return this.fields.data.lastIndexOf(
            visibleList[visibleList.length - 1]
        );
    }

    // method
    changeChecked() {
        this.fields.data.forEach(col => {
            if (col.check != 3) {
                col.check = this.checkedList.indexOf(col.title) > -1 ? 1 : 2;
            }
        });
    }
    sortUp(index) {
        this.fields.data[index] = this.fields.data.splice(
            index - 1,
            1,
            this.fields.data[index]
        )[0];
    }
    sortDown(index) {
        this.fields.data[index] = this.fields.data.splice(
            index + 1,
            1,
            this.fields.data[index]
        )[0];
    }
    getCheckedList() {
        let checkeds = this.fields.data.filter(
            v => v.check == 1 || v.check == 3
        );
        this.checkedList = checkeds.map(v => v.title);
    }
    confirm() {
        let checkedData = this.fields.data;
        this.fields.isShow = false;
        this.$emit("change", checkedData);
    }
    cancel() {
        this.fields.isShow = false;
    }
}
</script>