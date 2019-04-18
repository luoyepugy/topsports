import Vue from "vue";
import iView from "iview";
Vue.use(iView);

import "@s/index.less";


import Table from './components/table';
import InputNumber from '@c/input-number';
import InputCalcLength from '@c/input-calc-length';
import Select from '@c/select';
import Message from 'iview/src/components/message';

const components = {
    ZTable: Table,
    ZInputNumber: InputNumber,
    ZInputCalcLength: InputCalcLength,
    ZSelect: Select
};

const install = function (Vue, opts = {}) {
    if (install.installed) return;

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key]);
    });

    Vue.prototype.$Message = Message;
    Vue.prototype.$IVIEW = {
        size: opts.size || '',
        transfer: 'transfer' in opts ? opts.transfer : ''
    };

};


// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install,
    ...components
};