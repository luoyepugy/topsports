// Type definitions for topsports 0.1.7
// Project: https://github.com/topsports/topsports
// Definitions by: zhanghan
// Definitions: https://github.com/zhanghan/topsports.git
import Vue, { VNode } from 'vue';

export declare interface Select extends Vue {
    /**
     * table-filter上的搜索框占位符，默认值为"请输入..."
     */
    searchPlh?: string;
    /**
     * table-filter上的搜索框key值，传递给后端接口的参数key,默认值为"serachText"
     */
    searchKey?: string;
    /**
     * table-filter上的搜索框最大长度，默认值为20
     */
    searchMaxLen?: number;
    /**
     * table列表查询接口Api
     */
    tableListApi?: any;
    /**
     * table列表表头查询接口Api
     */
    tableHeadApi?: any;
    /**
     * table列表表头保存接口Api
     */
    tableHeadSaveApi?: any;
    /**
     * table列表导出接口Api，默认值null
     */
    exportApi?: any;
    /**
     * table列配置，默认值空数组[]
     */
    tableColumns?: Array<any>;
    /**
     * table-list列表过滤参数对象
     */
    tableListFilterParams?: any;
    /**
     * table-head表头过滤参数对象
     */
    tableHeadFilterParams?: any;
    /**
     * table是否配置复选框，多选操作
     * @default true
     */
    checkable?: boolean;
    /**
     * table是否配置过滤，表格顶部的相关筛选条件
     * @default true
     */
    filterable?: boolean;
    /**
     * table是否配置列排序，及表头列最右侧的配置按钮是否显示，点击配置按钮显示列排序的组件table-column-sort
     * @default true
     */
    sortable?: boolean;
    /**
     * table是否配置操作列，表格最后的固定列，给每行配置相关的操作按钮，为false时为展示类表格
     * @default true
     */
    operable?: boolean;
    /**
     * table是否可分页，为true时显示分页组件，为表格列表分页
     * @default true
     */
    pageable?: boolean;
    /**
     * table是否配置高级搜索，为true时在table-filter块显示高级搜索文本，点击高级搜索文本打开高级搜索弹窗组件table-serach
     * @default true
     */
    searchable?: boolean;
    /**
     * table配置searchable为true时，此高级搜索配置选项才生效
     */
    searchOptions?: any;
    /**
     * 处理查询表头时的回调，返回当前接口数据值
     */
    $emit(eventName: "handleAuth", data: any): this;
    /**
     * 处理table-filter上close图标点击时的函数
     */
    $emit(eventName: "handleClose"): this;
    /**
     * 处理table有多选框，即checkable为true时，实时改变的函数
     */
    $emit(eventName: "on-selected-change", data: Array<any>): this;
    /**
     * 处理table有高级搜索，即searchable为true时，高级搜索弹窗中点击清空按钮的函数
     */
    $emit(eventName: "on-clear-search"): this;
    /**
     * 处理table有操作列，即operable为true时，操作列下拉项中每项的点击事件函数，name对应的是table-columns配置的最后一列的buttons数组<{name: '', icon: '', text: ''}>的name字段
     */
    // $emit(eventName: "on-name-click", row: any): this;
  }
  