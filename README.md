# Lazydog OCR

OCR in browser use Tesseract.js

纯离线的浏览器 OCR 方案，核心使用 [Tesseract.js](https://github.com/naptha/tesseract.js)。

没有数据安全问题，全程在浏览器中进行识别，不会上传到任何服务器。

支持识别 SIMD 并加载对应的 Tesseract-Core。

所有依赖均已下载到仓库，可以在任何无外网环境下部署使用。

支持拖拽、剪贴板粘贴、传统的文件选择器，默认自带 English、简体中文、正體中文 三种识别模型。

（英文模式识别效果最好，中文对图片比较挑剔。）

# 安装

1. 直接下载，在主机中当作静态网站部署即可。
1. 本机使用`python3 -m http.server`等本地HTTP服务器加载。
1. 部署到 S3 等对象存储中
1. 部署到 CloudFlare Pages 等云托管中

如果你只需要识别纯英文内容，可以使用部署在 CloudFlare Pages 上的 [在线](ocr.zjyl1994.com) 版本。
（由于CF Pages最大限制25MB, 所以只装载了英文的训练数据。）

# 依赖版本：

- Alpine 3.10.3
- Water.css 2
- Tesseract.js 3.03
- Tesseract-core 3.0.2
- Tesseract TrainedData 4.0.0

# 如何添加新语言？

额外的语言数据可以从[这里](https://github.com/naptha/tessdata)下载，放到 `assets/lang-data` 中。

下载后编辑 index.html 的 `#langList` 部分，增加`select`中的`option`即可。
