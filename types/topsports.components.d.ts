// Type definitions for ble 0.1.0
// Project: https://github.com/ble/ble
// Definitions by: zhanghan
// Definitions: https://github.com/zhanghan/ble.git
import Vue from 'vue';

export { InputNumber } from './input-number';

declare const topsports: {
    version: string;
    install: (
        Vue: Vue,
        opts: {
            size?: any;
            transfer?: any;
        }
    ) => void;
};

export default topsports;

declare module 'vue/types/vue' {
    interface Vue {
        $IVIEW: {
            size?: string;
            transfer?: string;
        };
    }
}
