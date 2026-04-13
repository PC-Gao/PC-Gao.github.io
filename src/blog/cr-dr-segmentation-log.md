# CR/DR 牙齿分割阶段记录

> Updated: 2026-04-13（更新日期）

## 当前进展

- 完成了 CR/DR 牙齿相关分割训练
- 当前结果已经达到阶段预期，但仍有细节问题需要继续处理

## 相关测试

- [第二版算法问题测试](./cr-dr-issue-test-v2.md)
- [第三版算法分辨率效果比较](./cr-dr-resolution-compare-v3.md)

## 遇到的问题

- 训练过程中出现过 mask 下移问题
- 部分结果会出现 box 填充异常
- mask 边缘仍然有比较明显的锯齿感

## 参考

- 相关 issue: <https://github.com/ultralytics/ultralytics/issues/20918>
