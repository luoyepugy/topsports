// Type definitions for topsports 0.1.7
// Project: https://github.com/topsports/topsports
// Definitions by: zhanghan
// Definitions: https://github.com/zhanghan/topsports.git
import Vue, { VNode } from 'vue';

export declare interface Select extends Vue {
  /**
   * 下拉选项列表，由Id和name对象组成的数组
   */
  list?: Array<{ Id: number; name: string }>;
  /**
   * 当前选中的id值，可设置默认值为list中某项Id值
   */
  id?: number;
  /**
   * 下拉选项改变时的回调，返回当前id值，默认值当前id值
   */
  $emit(eventName: "on-change", id: number): this;
}
