---
title: 【KUbuntu】新系统，新体验
date: 2026-03-28 13:27:38
tags: [操作系统, 技术, Linux体验]
categories: [手记, OS]
cover: ../../public/images/trying-kubuntu-1.png
---

# 起因

在 Windows 上开发，之前就被恶心了很久。二月末退出 PCL-Community 之后，我也不开发 PCL 相关的东西了，于是就抓紧换到了 Linux 系统。
之前我一直在关注 HMCL 的开发，也很喜欢开发者兼主播的 Glavo。在发行版的选择上，我很大程度上受到了他的影响，选择了 KUbuntu 作为我的低一个系统。KUbuntu 作为一个 Ubuntu 的衍生版，对新手算是很友好的了，同时 KDE 的高度自定义能力也让它相对来说更能折腾，也更好看。
等到三月底，我对于这台系统的测试也差不多结束，进入了日用阶段。接下来说说我的体验：

# 体验

我先前有过使用 Ubuntu 的经验，当时是拿来跑 AI……所以日用 Linux 对我来说并不算特别难。
日用的软件在 Linux 上基本都能满足要求，开发方面更是如鱼得水的程度。那么先来说开发吧：

## 开发
开发方面我喜欢用 Python，所以也习惯和 PyCharm 打交道。我当然没有 PyCharm 的正版，所以就用我之前备份的一份 ja-netfilter 包做的假 license。但问题来了：这个包的安装用的是 vbs 脚本，当然是没法在 Linux 上跑的……
我于是把这个脚本扔给 Claude，果不其然它拒绝回答，但是经过我的一番 *调教* 之后，Claude 还是乖乖听话的改出了一份 install.sh。于是，问题解决。

![trying-kubuntu-1.png](/images/trying-kubuntu-1.png "激活好的 PyCharm，还有美化")

接下来是开发的工具链：
- Codex: Codex CLI
- Python: Python 3.11.2 + UV Package Manager
- Node: NVM 0.40.1 + Node v24.14.1 LTS + Pnpm v10.32.1
- Java: openjdk 25.0.2 2026-01-20 LTS

非常完美、舒服的配好了。

那接下来讲讲不太舒服的那些：

## 基础工具

该死的 Nvidia 驱动，我装了三个小时，难点各位自己去想象吧，我真的一点都不想提。
输入法的 fcitx5 也是很折磨的一个地方（和一些 GTK 软件有兼容问题），我又调整了几个小时的环境变量。
代理这块属于软件里面安装最折磨的了，一开始我用的是 Clash For Windows（对的，名字叫 For Windows，实际是都能用，Tauri 这期神了），然后发现我的代理提供商不支持这个端，于是又不得不去用 v2rayN……
v2rayN 的 TUN 模式支持稀烂，同时这期间我的输入法还一直时断时续的坏掉，导致软件安装最后烂尾了，搞了一个周末才到勉强能用的地步。
QQ 的截图在 Linux 上一点都不好用，所以我换了 Flameshot……可是 Flameshot 的剪贴板支持又有问题，这又花了我数小时解决……

已经觉得很折磨了？再来看看更折磨的：

## 美化
我一开始决定仿苹果化，所以脑子一抽就去装了一个 WhiteSur，然后……就成功的把 KDE Plasma 搞炸了。在 TTL 模式下，我折腾了一个多小时，成功的换回了 Breeze。
但是我还是觉得 Breeze 太难看了，所以换了个 Glavo 同款的 Materia 主题。总算，一切都解决了。
最后，我收获了一个看起来还不错的桌面：

![trying-kubuntu-2.png](/images/trying-kubuntu-2.png "Panel 透明是用一个叫 Panel Transparency Button 的 Widget 解决的")

## 基本日用环节

接下来进入基本日用的阶段，又得装一大堆工具

### 多媒体

默认的视频播放器肯定不够，毕竟我们是要放 4k 超时空辉夜姬的！
于是`apt install mpv`，我们成为了 MPV 大手子。
然后是音乐，我一直在寻找网易云客户端在 Linux 上的替代品，一开始我用的是`netease-music-gtk4`（从前面的图里可以看见），但是出现了图标缺失等等很严重的问题，原因是得用`libadwaita`的1.7以上版本，而 Ubuntu24.04 的核心是不支持这个库的，我显然没有手动编译安装一个底层库的条件，所以我一直在发愁，直到我找到了[SPlayer](https://github.com/imsyy/SPlayer)，一个真正完美的第三方网易云实现：

![trying-kubuntu-3.png](/images/trying-kubuntu-3.png "致敬开发者！")

接下来我还有一些基础的修图需求，所以我安装了 Krita。
我还有一些录制需求吗，于是我安装了 OBS（小插曲：[没用PPA源导致依赖库爆炸 be like](https://github.com/obsproject/obs-studio/issues/13247)）。

### 其他
微信和 QQ 装起来很方便，都是 electron。在安装微信之后遇到了字体发虚的问题，我通过换自定义字体解决了，详细可以看[另一篇博客](/posts/wechat-font)。
游戏我玩的不是很多，但是 Minecraft 我肯定是要的，所以 HMCL 启动！还有 Steam，我也不知道为什么要装，但是万一我要体验 Proton 呢？
哦对，还有 KDE Connect，特别好用，强烈推荐！

## 整活

总得整活吧？拿到新 OS 不整活怎么行？

### 超时空辉夜姬启动

是的……我通过命令行播放了超时空辉夜姬（还是 tct 纯 ASCII 字符输出

![trying-kubuntu-4.png](/images/trying-kubuntu-4.jpg "彩叶大脸好看捏")

### 尝试安装 wallpaperengine-kde-plugin
随后，我搞炸了 Plasma：

![trying-kubuntu-5.png](/images/trying-kubuntu-5.png)

### 和 Glavo 联机
正好在我装好系统的当天，Glavo 破天荒的开陶瓦房间联机了：

![trying-kubuntu-6.png](/images/trying-kubuntu-6.png "与君共渡舟，达岸各自归")

### 忠！诚！
![trying-kubuntu-7.png](/images/trying-kubuntu-7.png "不解释。")

# 结束语
Windows 拉完了！

