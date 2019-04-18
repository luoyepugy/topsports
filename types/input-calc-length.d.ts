// Type definitions for topsports 0.1.7
// Project: https://github.com/topsports/topsports
// Definitions by: zhanghan
// Definitions: https://github.com/zhanghan/topsports.git
import Vue, { VNode } from 'vue';

export declare interface InputCalcLength extends Vue {
  /**
   * 计算输入长度的值，默认值''
   */
  value?: string;
  /**
   * 输入最大长度，默认值100
   */
  maxlength?: number;
}
