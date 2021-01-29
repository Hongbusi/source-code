// 虚拟 DOM 构造函数
class VNode {
  constructor(tag, data, value, type) {
    this.tag = tag && tag.toLowerCase();
    this.data = data;
    this.value = value;
    this.type = type;
    this.children = [];
  }

  appendChild(vnode) {
    this.children.push(vnode);
  }
}

// 由 HTML DOM -> VNode: 将这个函数当做 compiler 函数
function getVNode(node) {
  let nodeType = node.nodeType;
  let _vnode = null;
  if (nodeType === 1) {
    // 元素
    let nodeName = node.nodeName;
    let attrs = node.attributes;
    let _attrObj = {};
    for (let i = 0; i < attrs.length; i++) { // attrs[i] 属性节点 (nodeType == 2)
      _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
    }
    _vnode = new VNode(nodeName, _attrObj, undefined, nodeType);

    // 考虑 node 的子元素
    let childNodes = node.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      _vnode.appendChild(getVNode(childNodes[i])); // 递归
    }

  } else if (nodeType === 3) {
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType);
  }

  return _vnode;
}


let rkuohao = /\{\{(.+?)\}\}/g;

// 根据路径访问对象成员
function getValueByPath(obj, path) {
  let paths = path.split('.'); // [xxx, yyy, zzz]
  let res = obj;
  let prop;
  while (prop = paths.shift()) {
    res = res[prop];
  }
  return res;
}

// 将带有坑的 Vnode 与数据 data 结合, 得到填充数据的 VNode: 模拟 AST -> VNode
function combine(vnode, data) {
  let _type = vnode.type;
  let _data = vnode.data;
  let _value = vnode.value;
  let _tag = vnode.tag;
  let _children = vnode.children;

  let _vnode = null;

  if (_type === 3) { // 文本节点

    // 对文本处理
    _value = _value.replace(rkuohao, function (_, g) {
      return getValueByPath(data, g.trim());
    });

    _vnode = new VNode(_tag, _data, _value, _type)

  } else if (_type === 1) { // 元素节点
    _vnode = new VNode(_tag, _data, _value, _type);
    _children.forEach(_subvnode => _vnode.appendChild(combine(_subvnode, data)));
  }

  return _vnode;
}


function JGVue(options) {
  this._data = options.data;
  this._template = document.querySelector(options.el); // vue 是字符串, 这里是 DOM

  this.mount(); // 挂载
}

JGVue.prototype.mount = function () {
  // 需要提供一个 render 方法: 生成 虚拟 DOM
  this.render = this.createRenderFn()

  this.mountComponent();
}
JGVue.prototype.mountComponent = function () {
  // 执行 mountComponent() 函数
  let mount = () => {
    this.update(this.render());
  }
  mount.call(this); // 本质应该交给 watcher 来调用, 但是还没有讲到这里
}

/**
 * 在真正的 Vue 中使用了二次提交的设计结构
 * 1. 在页面中的 DOM 和虚拟 DOM 是一一对应的关系
 * 2. 先有 AST 和数据生成 VNode (新, render)
 * 3. 将旧的 VNode 和新的 VNode 比较 (diff), 更新 (update)
 */

// 这里是生成 render 函数, 目的是缓存抽象语法树 (我们使用虚拟 DOM 来模拟)
JGVue.prototype.createRenderFn = function () {
  let ast = getVNode(this._template);
  // Vue: 将 AST + data => VNode
  // 我们: 带有坑的 VNode + data => 含有数据的 VNode
  return function render() {
    // 将 带有 坑的 VNode 转换为 待数据的 VNode
    let _tmp = combine(ast, this._data);
    return _tmp;
  }
}

// 将虚拟 DOM 渲染到页面中: diff 算法就在里
JGVue.prototype.update = function () {
  // 简化, 直接生成 HTML DOM replaceChild 到页面中
}

let app = new JGVue({
  el: '#root',
  data: {
    people: {
      user: {
        name: '洪布斯'
      }
    }
  }
});

app.name = '李四'; // 这个赋值已完成, 页面数据就更新
