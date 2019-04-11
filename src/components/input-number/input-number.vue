<template>
    <div>
        <div :class="wrapClasses">
            <i
                class="ivu-icon"
                :class="['ivu-icon-ios-close-circle', prefixCls + '-icon', prefixCls + '-icon-clear' , prefixCls + '-icon-normal']"
                v-if="clearable && currentValue && !disabled"
                @click="handleClear"
            ></i>
            <i
                class="ivu-icon"
                :class="['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']"
                v-else-if="icon"
                @click="handleIconClick"
            ></i>
            <span class="ivu-input-suffix" v-else-if="showSuffix">
                <slot name="suffix">
                    <i class="ivu-icon" :class="['ivu-icon-' + suffix]" v-if="suffix"></i>
                </slot>
            </span>
            <input
                :id="elementId"
                :class="inputClasses"
                :disabled="disabled"
                :placeholder="placeholder"
                :value="formatterValue"
                :readonly="readonly"
                :maxlength="maxlength"
                autocomplete="off"
                spellcheck="false"
                @blur="handleBlur"
                @focus="handleFocus"
                @input="handleInput"
                @change="handleInput"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @mouseup="preventDefault"
            >
            <div :class="[prefixCls + '-group-append']" v-if="append" v-show="slotReady">
                <slot name="append"></slot>
            </div>
            <span class="ivu-input-prefix" v-else-if="showPrefix">
                <slot name="prefix">
                    <i class="ivu-icon" :class="['ivu-icon-' + prefix]" v-if="prefix"></i>
                </slot>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import Emitter from "@/mixins/emitter";
import { oneOf, findComponentUpward } from "@/utils/assist";

const prefixCls = "ivu-input";
const iconPrefixCls = "ivu-icon";

@Component({})
export default class ZInputNumber extends Vue {
    name: string = "ZInputNumber";

    @Prop() precision: number;
    @Prop({ default: -Infinity }) min: number;
    @Prop({ default: Infinity }) max: number;
    @Prop({ default: true }) isEqualMax: boolean;
    @Prop({ default: "" }) value: string | number;
    @Prop() maxlength: number;
    @Prop({ default: false }) activeChange: boolean;
    @Prop() elementId: string;
    @Prop({ default: false }) disabled: boolean;
    @Prop({ default: false }) readonly: boolean;
    @Prop({ default: false }) clearable: boolean;
    @Prop({ default: "" }) placeholder: string;
    @Prop({ default: "" }) prefix: string;
    @Prop({ default: "" }) suffix: string;
    @Prop() icon: string;
    @Prop() parser: Function;
    @Prop() formatter: Function;
    @Prop({
        default: "default",
        validator: (value: string) =>
            oneOf(value, ["small", "large", "default"])
    })
    size: string;

    prefixCls: string = prefixCls;
    currentValue: string | number = this.value;
    prepend: boolean = true;
    append: boolean = true;
    showPrefix: boolean = false;
    showSuffix: boolean = false;
    slotReady: boolean = false;

    @Watch("value", { immediate: true })
    onValueChange(val, oldVal) {
        this.setValue(val);
    }

    get wrapClasses() {
        return [
            `${prefixCls}-wrapper`,
            {
                [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                [`${prefixCls}-group`]: this.prepend || this.append,
                [`${prefixCls}-group-${this.size}`]:
                    (this.prepend || this.append) && !!this.size,
                [`${prefixCls}-group-with-prepend`]: this.prepend,
                [`${prefixCls}-group-with-append`]: this.append,
                [`${prefixCls}-hide-icon`]: this.append // #554
            }
        ];
    }
    get inputClasses() {
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-${this.size}`]: !!this.size,
                [`${prefixCls}-disabled`]: this.disabled,
                [`${prefixCls}-with-prefix`]: this.showPrefix,
                [`${prefixCls}-with-suffix`]: this.showSuffix
            }
        ];
    }
    get precisionValue() {
        if (!this.currentValue) return this.currentValue;
        return this.precision
            ? Number(this.currentValue).toFixed(this.precision)
            : this.currentValue;
    }
    get formatterValue() {
        if (this.formatter && this.precisionValue !== null) {
            return this.formatter(this.precisionValue);
        } else {
            return this.precisionValue;
        }
    }

    setValue(val: any) {
        const { min, max, isEqualMax, precision } = this;

        if (val !== null) {
            if (val > max && isEqualMax) {
                val = max;
            } else if (val >= max && !isEqualMax) {
                val = 100 - Math.pow(10, -precision);
            } else if (val < min) {
                val = min;
            }
        }
        this.$nextTick(() => {
            this.currentValue = val;
            this.$emit("on-input", val);
            this.$emit("on-change", val);
            // this.dispatch('FormItem', 'on-form-change', val);
        });
    }
    handleEnter(event: Event) {
        this.$emit("on-enter", event);
    }
    handleKeydown(event: Event) {
        this.$emit("on-keydown", event);
    }
    handleKeypress(event: Event) {
        this.$emit("on-keypress", event);
    }
    handleKeyup(event: Event) {
        this.$emit("on-keyup", event);
    }
    handleIconClick(event: Event) {
        this.$emit("on-icon-click", event);
    }
    handleFocus(event: Event) {
        this.$emit("on-focus", event);
    }
    handleBlur(event: Event) {
        this.$emit("on-blur", event);
        if (
            !findComponentUpward(this, [
                "DatePicker",
                "TimePicker",
                "Cascader",
                "Search"
            ])
        ) {
            // this.dispatch('FormItem', 'on-form-blur', this.currentValue);
        }
    }
    handleInput(event: Event) {
        let val = (<any>event.target).value.trim();

        if (isNaN(Number(val))) {
            (<HTMLTextAreaElement>event.target).value = String(
                this.currentValue
            );
        }
        if (event.type === "input" && !this.activeChange) return;

        if (this.parser) {
            this.parser(val);
        }

        const isEmptyString = val.length === 0;
        if (isEmptyString) {
            this.setValue(null);
        }

        if (event.type == "input" && val.match(/^\-?\.?$|\.$/)) return;

        val = Number(val);
        if (!isNaN(val)) {
            this.setValue(val);
            this.currentValue = val;
        }
    }
    handleClear() {
        const e = { target: { value: "" } };
        this.$emit("on-input", "");
        this.setValue("");
        this.$emit("on-change", e);
    }
    preventDefault(e: Event) {
        e.preventDefault();
    }

    mounted() {
        this.prepend = this.$slots.prepend !== undefined;
        this.append = this.$slots.append !== undefined;
        this.showPrefix =
            this.prefix !== "" || this.$slots.prefix !== undefined;
        this.showSuffix =
            this.suffix !== "" || this.$slots.suffix !== undefined;
        this.slotReady = true;
    }
}
</script>

