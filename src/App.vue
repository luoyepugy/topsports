<template>
    <div id="app">
        <z-select :list="[{Id:1,name:'全部'},{Id:2,name:'测试'}]" :id="form.select"></z-select>
        <Form :model="form" :label-width="80">
            <FormItem label="Input">
                <z-input-number
                    :activeChange="false"
                    :precision="2"
                    :isEqualMax="true"
                    :min="0"
                    :max="100"
                    v-model="form.input"
                >
                    <span slot="append">%</span>
                </z-input-number>
            </FormItem>
            <FormItem label="备注" prop="remark">
                <Input
                    type="textarea"
                    :maxlength="50"
                    :row="2"
                    v-model="form.remark"
                    placeholder="请输入备注"
                ></Input>
                <z-input-calc-length :value="form.remark" :maxlength="50"></z-input-calc-length>
            </FormItem>
        </Form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ZInputNumber from "@c/input-number/input-number.vue";
import ZInputCalcLength from "@c/input-calc-length/input-calc-length.vue";
import ZSelect from "@c/select/select.vue";

@Component({
    components: {
        ZInputNumber,
        ZInputCalcLength,
        ZSelect
    }
})
export default class App extends Vue {
    form: any = {
        input: "",
        remark: "",
        select: 1
    };
}
</script>
