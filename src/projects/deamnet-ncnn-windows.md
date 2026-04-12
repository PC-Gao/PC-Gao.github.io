# DeamNet ncnn Windows

## 项目概览

这是一个基于 `ncnn` 的 DeamNet 非官方简化实现，重点是把模型推理流程整理成更适合 Windows 环境部署和实际落地的形式。

从当前仓库内容来看，这个项目已经具备比较完整的工程信息：依赖环境、调用方式、结果对照和基础性能数据都已经给出，因此这一页可以更自然地当作一个小型技术记录来读，而不是只看仓库简介。

## 环境与使用方式

当前依赖环境主要包括：

- Visual Studio 2019 / 2022
- NCNN 预编译版本
- OpenCV 4.6.0

编译完成后，可以直接按下面的方式执行推理：

```bash
./<xxx.exe> <image-path>
```

## 灰度图结果对比

下面这组结果展示了同一输入下，原始实现与 `ncnn` 推理输出之间的对照情况。

| Input | Pytorch | ncnn |
| --- | --- | --- |
| <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/imtest/noiseimg1.png" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/denoiseimg1.png" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/denoiseimg1-ncnn.png" width="220"> |
| <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/imtest/noiseimg2.png" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/denoiseimg2.png" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/denoiseimg2-ncnn.png" width="220"> |

这部分最有价值的点在于：项目不仅实现了 `ncnn` 版本，还实际把输出结果和原始 Pytorch 结果做了可视化对照。

## 彩色图结果对比

彩色图的结果也已经给出，可以更直观看到移植后的输出情况。

| Input | Pytorch | ncnn |
| --- | --- | --- |
| <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/imtest/cnoiseimg1.jpg" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/cdenoiseimg1.jpg" width="220"> | <img src="https://raw.githubusercontent.com/PC-Gao/DeamNet-ncnn-windows/main/results/cdenoiseimg1-ncnn.png" width="220"> |

## 运行时间

项目说明里给出了一组在 `AMD Ryzen 5 5600G` 上、以 Gray25 为主的测试结果：

| 分辨率 | CPU | 核显 + Vulkan |
| --- | --- | --- |
| 256x256 (Gray) | 4.63 | 1.80 |
| 512x512 (Gray) | 18.35 | 3.72 |
| 1200x1600 (Gray) | Run failed | 24.41 |

这些数据已经能说明一个很实际的问题：在当前测试条件下，`Vulkan` 路线比纯 CPU 更有意义，但在更大输入尺寸下仍然需要继续补稳定性和完整 benchmark。

## 后续值得补充的方向

- ncnn 推理工程结构
- 模型输入输出处理
- 与其他去噪模型的速度与效果对比
- 不同后端下的稳定性记录

## 参考

- Ren et al., *Adaptive Consistency Prior Based Deep Network for Image Denoising*, CVPR 2021

## 技术栈

- C++
- ncnn
- Denoising

## 链接

- GitHub: <https://github.com/PC-Gao/DeamNet-ncnn-windows>
