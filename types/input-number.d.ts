// Type definitions for topsports 0.1.7
// Project: https://github.com/topsports/topsports
// Definitions by: zhanghan
// Definitions: https://github.com/zhanghan/topsports.git
import Vue, { VNode } from 'vue';

export declare interface InputNumber extends Vue {
  /**
   * 最大值，默认值Infinity
   */
  max?: number;
  /**
   * 最小值，默认值-Infinity
   */
  min?: number;
  /**
   * 当前值，可以使用 v-model 双向绑定数据，默认值1
   */
  value?: number;
  /**
   * 输入框尺寸，可选值为large、small、default或者不填
   */
  size?: '' | 'large' | 'small' | 'default';
  /**
   * 是否显示清空按钮
   * @default false
   */
  clearable?: boolean;
  /**
   * 设置禁用状态，默认值false
   */
  disabled?: boolean;
  /**
   * 输入框占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * 最大输入长度
   */
  maxlength?: number;
  /**
   * 输入框尾部图标，仅在 text 类型下有效
   */
  icon?: string;
  /**
   * 输入框头部图标
   * @default false
   */
  prefix?: string;
  /**
   * 输入框尾部图标
   * @default false
   */
  suffix?: String;
  /**
   * 指定输入框展示值的格式
   */
  formatter?: () => void;
  /**
   * 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用
   */
  parser?: () => void;
  /**
   * 是否设置为只读
   * @default false
   */
  readonly?: boolean;
  /**
   * 数值精度
   */
  precision?: number;
  /**
   * 给表单元素设置 id，详见 Form 用法。
   */
  'element-id'?: string;
  /**
   * 是否实时响应数据，设置为 false 时，只会在失焦时更改数据
   * @default false
   */
  'active-change'?: boolean;
  /**
   * 数值改变时的回调，返回当前值，默认值当前值
   */
  $emit(eventName: 'on-change', value: number): this;
  /**
   * 聚焦时触发
   */
  $emit(eventName: 'on-focus', event: KeyboardEvent): this;
  /**
   * 失焦时触发
   */
  $emit(eventName: 'on-blur', event: KeyboardEvent): this;
  /**
   * 原生的 keyup 事件
   */
  $emit(eventName: 'on-keyup', event: KeyboardEvent): this;
  /**
   * 原生的 keydown 事件
   */
  $emit(eventName: 'on-keydown', event: KeyboardEvent): this;
  /**
   * 原生的 keypress 事件
   */
  $emit(eventName: 'on-keypress', event: KeyboardEvent): this;
  /**
   * slot插槽对象
   */
  $slots: {
    /**
     * 前置内容，仅在 text 类型下有效
     */
    prepend: VNode[];
    /**
     * 后置内容，仅在 text 类型下有效
     */
    append: VNode[];
    /**
     * 输入框头部图标
     */
    prefix: VNode[];
    /**
     * 输入框尾部图标
     */
    suffix: VNode[];
  };
}