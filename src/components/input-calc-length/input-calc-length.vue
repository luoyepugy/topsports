<template>
    <div>
        还能输入
        <span class="c-color-primary">{{ maxlength - length }}</span>字
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class InputCalcLength extends Vue {
    name: string = "InputCalcLength";

    @Prop({ default: "" }) value: string;
    @Prop({ default: 100 }) maxlength: number;

    length: number = this.value.length;

    @Watch("value", { immediate: true })
    onValueChange(val) {
        this.length = val.length;
    }
}
</script>
