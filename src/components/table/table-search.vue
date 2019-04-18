<template>
    <div v-if="show">
        <Modal
            v-model="modal.show"
            :title="modal.title||'高级搜索'"
            :mask-closable="false"
            :width="modal.width || 520"
        >
            <div :class="searchClasses">
                <Form
                    ref="refForm"
                    :model="form"
                    :label-width="modal.labelWidth || 100"
                    class="cp-form-half"
                >
                    <FormItem
                        :class="[item.type=='radio'||item.type=='checkbox'?'form-item-full':'']"
                        v-for="item in modal.options"
                        :label="item.label"
                        :key="item.id"
                    >
                        <Input
                            v-if="item.type=='input'"
                            :type="item.inputType||'text'"
                            v-model="form[item.name]"
                            :placeholder="item.placeholder|| '请输入'"
                            :maxlength="item.maxlength"
                            :autosize="item.autosize || {minRows: 1}"
                            clearable
                        ></Input>
                        <div v-if="item.type=='inputRange'">
                            <input-number
                                style="width: 47%"
                                :maxlen="null"
                                :max="null"
                                v-model="form[item.nameArr.split(',')[0]]"
                            ></input-number>&nbsp;-
                            <z-input-number
                                style="width: 47%"
                                :maxlen="null"
                                :max="null"
                                v-model="form[item.nameArr.split(',')[1]]"
                            ></z-input-number>
                        </div>
                        <Select
                            clearable
                            :ref="'ref' + item.name"
                            v-if="item.type=='select'||item.type=='selectRemote'"
                            v-model="form[item.name]"
                            :filterable="item.type=='selectRemote'?true:false"
                            :remote="item.type=='selectRemote'?true:false"
                            :remote-method="q=>{getSelectList(q,item.remoteMethod(q),item)}"
                            :loading="item.loading||false"
                            :placeholder="item.placeholder||'请选择'"
                            @on-clear="item.list=[]"
                            @on-open-change="resetSelect(arguments[0],item.name)"
                        >
                            <Option
                                v-show="item.list==null"
                                v-for="op in item.options"
                                :key="op.Id"
                                :value="op.Id"
                            >{{op.name}}</Option>
                            <Option
                                v-show="item.list!=null"
                                v-for="op in item.list"
                                :label="op[item.alias.label] ? op[item.alias.label] : op.name"
                                :key="op[item.alias.value]"
                                :value="op[item.alias.value]"
                            >
                                <span>{{op[item.alias.label] || op.name}}</span>
                                <span
                                    v-if="item.custom==1"
                                    class="cp-select-option"
                                >{{op[item.alias.value]}}</span>
                            </Option>
                        </Select>
                        <DatePicker
                            v-if="item.type=='date'"
                            :transfer="true"
                            v-model="form[item.name]"
                            @on-change="changeDate(arguments[0],item.name,item.nameArr)"
                            type="daterange"
                            :placeholder="item.placeholder||'请选择日期范围'"
                            format="yyyy-MM-dd"
                            style="width: 100%"
                            :editable="false"
                            :clearable="false"
                        ></DatePicker>
                        <RadioGroup v-if="item.type=='radio'" v-model="form[item.name]">
                            <Radio
                                class="c-mr-15"
                                v-for="op in item.options"
                                :key="op.Id"
                                :label="op.Id"
                            >{{op.name}}</Radio>
                        </RadioGroup>
                        <CheckboxGroup v-if="item.type=='checkbox'" v-model="form[item.name]">
                            <Checkbox
                                v-for="op in item.options"
                                :key="op.Id"
                                :label="op.Id"
                            >{{op.name}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" @click="resetForm">清空</Button>
                <Button @click="cancelForm">取消</Button>
                <Button type="primary" @click="saveForm">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from "vue-property-decorator";
import ZInputNumber from "@c/input-number/input-number.vue";

const prefixCls = 'z-table-search';

@Component({
  components: {
    ZInputNumber
  }
})
export default class TableSearch extends Vue {
  name: string = 'TableSearch';
    
  $refs: {
    refForm: any;
  };

  @Prop({ default: () => {} }) modal: any;
  @Prop({ default: false }) show: boolean;

  form: any = {};
  prefixCls: string = prefixCls;

  get searchClasses() {
    return `${prefixCls}`;
  }

  saveForm() {
    this.modal.show = false;
    this.$emit("on-confirm", this.form);
  }
  cancelForm() {
    this.modal.show = false;
    this.resetForm();
  }
  resetSelect(isOpen, name) {
    if (!isOpen && !this.form[name]) {
      this.$refs["ref" + name][0].clearSingleSelect();
    }
  }
  resetForm() {
    this.$refs.refForm.resetFields();
    for (let ele of this.modal.options) {
      // 处理默认值
      if (ele.name) {
        let value = ele.default != null ? ele.default : "";
        this.$set(this.form, ele.name, value);
      }

      // 处理两个输入框默认值
      if (ele.type === "inputRange" && ele.nameArr.indexOf(",") > -1) {
        const _this = this;
        ele.nameArr.split(",").forEach(name => {
          this.$set(this.form, name, "");
        });
      }

      // 处理日期两个字段默认值
      if (ele.type === "date" && ele.nameArr.indexOf(",") > -1) {
        this.handleDate(ele.nameArr, ele.default || ["", ""]);
      }
    }
  }
  handleDate(nameArr, date) {
    this.form[nameArr.split(",")[0]] = date[0];
    this.form[nameArr.split(",")[1]] = date[1];
  }
  changeSelect(val, name) {
    this.form[name] = val;
  }
  getSelectList(query, promise, item) {
    promise.then(datas => {
      item.list = datas;
    });
  }
  changeDate(date, name, nameArr = null) {
    this.form[name] = date;
    if (nameArr) {
      this.handleDate(nameArr, date);
    }
  }

  mounted() {
    if (this.show && this.modal.options && this.modal.options.length > 0) {
      this.resetForm();
    }
  }
}
</script>