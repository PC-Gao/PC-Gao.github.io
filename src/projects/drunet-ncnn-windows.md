# DruNet ncnn Windows

## 项目概览

这是一个基于 `ncnn` 的 DRUNet 非官方简化实现，目标是把图像去噪模型整理成更轻量、也更适合 Windows 环境部署的形式。

从当前仓库内容来看，这个项目已经不只是“把模型跑通”，而是开始进入工程整理阶段：依赖环境、调用方式和一组基础性能数据都已经明确下来，适合作为后面继续补部署细节和 benchmark 的基础版本。

## 环境与使用方式

当前项目依赖环境主要包括：

- Visual Studio 2019 / 2022
- NCNN 预编译版本
- OpenCV 4.6.0

编译完成后，当前的调用方式比较直接：

```bash
./<xxx.exe> <image-path>
```

这也说明项目当前重点更偏向推理落地，而不是封装成复杂的上层接口。

## 结果与性能

项目说明里已经给出一组基础运行时间，测试平台是 `AMD Ryzen 5 5600G`，目前公开的数据主要集中在 `Vulkan` 推理：

| 分辨率 | 核显 + Vulkan |
| --- | --- |
| 256x256 | 2.62 |
| 1200x1600 | 19.73 |

这组结果虽然还不算完整，但已经足够作为后续继续补 CPU、独显和更多输入尺寸测试的基线。

项目说明中还提到了灰度图和彩色图的结果对照，不过当前仓库公开路径下没有对应的结果图片文件，因此这里先不放失效图片，后面如果仓库补齐资源，可以直接把对比图接进来。

## 后续值得补充的方向

- 模型转换和推理流程
- Windows 端部署细节
- 速度、显存和效果对比
- 与原始 Pytorch 输出的一致性说明

## 参考

- Zhang et al., *Plug-and-Play Image Restoration with Deep Denoiser Prior*, TPAMI 2021

## 技术栈

- C++
- ncnn
- Denoising

## 链接

- GitHub: <https://github.com/PC-Gao/DruNet-ncnn-windows>
