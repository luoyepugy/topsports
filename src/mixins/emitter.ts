import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class EmitterMixin extends Vue {
    dispatch(componentName:string, eventName:string, params:any) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;

            if (parent) {
                name = parent.$options.name;
            }
        }
        if (parent) {
            parent.$emit.apply(parent, <any>[eventName].concat(params));
        }
    }
    broadcast(componentName:string, eventName:string, params:any) {
        this.broadcastFun.call(this, componentName, eventName, params);
    }
    broadcastFun(componentName:string, eventName:string, params:any) {
        this.$children.forEach(child => {
            const name = child.$options.name;
    
            if (name === componentName) {
                child.$emit.apply(child, <any>[eventName].concat(params));
            } else {
                // todo 如果 params 是空数组，接收到的会是 undefined
                this.broadcastFun.apply(child, <any>[componentName, eventName].concat([params]));
            }
        });
    } 
}