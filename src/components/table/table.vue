<template>
    <div>
        <div :class="wrapClasses">
            <!-- 表格 -->
            <div :class="tableClasses">
                <span
                    v-if="table.data.length>0&&operable"
                    class="cp-color-hover icon-filter-column"
                    >
                    <Icon type="ios-options-outline" size="24"></Icon>
                </span>
                <Table
                    class="cp-table-full"
                    ref="refTable"
                    :loading="table.loading"
                    :columns="table.columns"
                    :data="table.data"
                ></Table>
                <Page
                    v-if="pageable"
                    @on-change="pageNumberChange"
                    @on-page-size-change="pageSizeChange"
                    :total="page.total"
                    show-sizer
                    show-total
                    show-elevator
                    :page-size-opts="pageSizeOpts"
                    :page-size="pageSizeOpts[0]"
                />
            </div>
            <!-- /表格 -->
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { fieldMapping } from "@/utils/assist";

const prefixCls = "z-table";

@Component({})
export default class Table extends Vue {
    name: string = "Table";

    $refs: {
        refTable: any;
    };

    // 获取表格数据接口api
    @Prop({ default: null }) tableListApi: any;

    // table-columns表格列配置
    @Prop({ default: () => [] }) tableColumns: Array<any>;

    // table-list列表过滤搜索配置
    @Prop({ default: () => {} }) tableListFilterParams: any;
    // table-columns表格列配置
    @Prop({ default: () => {} }) tableHeadFilterParams: any;

    // table-是否有复选框
    @Prop({ default: true }) checkable: boolean;
    @Prop({ default: true }) filterable: boolean;
    @Prop({ default: true }) operable: boolean;
    @Prop({ default: true }) pageable: boolean;

    // table分页配置
    @Prop({ default: () => [20,50,100] }) pageSizeOpts: Array<number>;

    table: any = {
        loading: true,
        columns: this.tableColumns,
        data: []
    };
    params: any = {
        pageSize: this.pageSizeOpts[0],
        pageNumber: 0
    };
    page: any = {
        total: 0
    }
    prefixCls: string = prefixCls;

    get wrapClasses() {
        return [
            `${prefixCls}-wrap`,
            {
                [`${prefixCls}-with-filter`]: this.filterable,
                [`${prefixCls}-with-toolbar`]: this.filterable
            }
        ];
    }
    get tableClasses() {
        return [`${prefixCls}`];
    }

    created() {
        if (this.tableListFilterParams) {
            this.params = Object.assign(
                this.params,
                this.tableListFilterParams
            );
        }
        this.getTableDatas();
    }

    // methods
    pageNumberChange(page) {
        this.params.pageNumber = page;
        this.getTableDatas();
    }
    pageSizeChange(size) {
        this.params.pageSize = size;
        this.getTableDatas();
    }
    getTableDatas(params?) {
        this.table.loading = true;

        // table-api解析
        if (this.tableListApi) {
            this.tableListApi(this.params).then(res => {
                this.table.data = res && res.data ? res.data.rows : [];
                this.page.total = res && res.data ? res.data.total : 0;
                this.table.loading = false;
            });
        }
    }
}
</script>