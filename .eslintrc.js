module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
      "for-direction": "off",
      "getter-return": "off",
      "no-async-promise-executor": "off",
      "no-await-in-loop": "off",
      "no-compare-neg-zero": "off",
      "no-cond-assign": "off",                               // 禁止条件表达式中出现赋值操作符
      "no-console": "error",                                 // 禁用 console
      "no-constant-condition": "error",                      // 禁止在条件中使用常量表达式
      "no-control-regex": "off",
      "no-debugger": "error",                                // 禁用 debugger
      "no-dupe-args": "error",                               // 禁止 function 定义中出现重名参数
      "no-dupe-keys": "error",                               // 禁止对象字面量中出现重复的 key
      "no-duplicate-case": "error",                          // 禁止出现重复的 case 标签
      "no-empty": "error",                                   // 禁止出现空语句块
      "no-empty-character-class": "error",                   // 禁止在正则表达式中使用空字符集
      "no-ex-assign": "error",                               // 禁止对 catch 子句的参数重新赋值
      "no-extra-boolean-cast": "error",                      // 禁止不必要的布尔转换
      "no-extra-parens": "error",                            // 禁止不必要的括号
      "no-extra-semi": "error",                              // 禁止不必要的分号
      "no-func-assign": "error",                             // 禁止对 function 声明重新赋值
      "no-inner-declarations": "error"                       // 禁止在嵌套的块中出现变量声明或 function 声明
    }
};
