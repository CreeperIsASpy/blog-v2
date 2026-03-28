---
title: 【PCL】我对联机事件的一些看法
date: 2025-11-28 19:08:07
tags: [PCL, 技术, 观点]
categories: [编程, PCL]
cover: ../../public/images/my-thoughts-on-the-link-feature-being-shut-down-1.png
---

## 争端

2025 年 1 月 11 日，[「Terracotta｜陶瓦联机」](https://github.com/burningtnt/Terracotta)发布了第一个版本，从而开始了国内 MC 启动器重新开启联机功能的第二波潮流。它借助于 EasyTier 组网工具，实现了点对点的打洞联机功能，为后续的所有联机模块提供了基本思路。自此，启动器内置联机的竞争出现了。
7 月， PCL-CE 也实现了基于 EasyTier 联机功能，后续成功兼容了 Terracotta，并计划实现一套可以跨启动器联机的协议：Scaffolding（后面会提到）
10 月下旬， PCL （上游）官方宣布 [“联机回归！”](https://www.bilibili.com/opus/1127340164029349892)

这次， PCL 使用了自研的 [“简洁联机标记约定”（PCL 约定）]( [简洁联机标记约定 · Meloong-Git/PCL Wiki](https://github.com/Meloong-Git/PCL/wiki/%E7%AE%80%E6%B4%81%E8%81%94%E6%9C%BA%E6%A0%87%E8%AE%B0%E7%BA%A6%E5%AE%9A) ) 。但不变的是，此协议依然采用了 EasyTier 组网作为模块核心。
10 月下旬开始， EasyTier 的核心节点服务器由于持续的攻击和超过预期的流量，开始崩溃。而社区舆论也开始从赞扬开源精神，转向了质疑。

后续，PCL CE 和 PCL 都先后关闭了联机服务。

关闭的主要原因有三点，这在[龙腾猫跃的动态](https://www.bilibili.com/opus/1135872352762986504)里面说的很清楚：

![图片1](/images/my-thoughts-on-the-link-feature-being-shut-down-1.png)

这里提到了“合规性有着一些问题“，那么问题在哪里呢？

## 合规性

答案就在一切的根源：[EasyTier](https://easytier.cn)。

EasyTier 是一款“远程组网工具“。它将主机和房间成员的电脑连接到同一个”虚拟局域网“。这里的虚拟局域网和普通局域网没有本质区别，因此它也不止可以被用来进行局域网联机，还能用来进入学校、公司等的内网，访问内网中的文件等服务。

EasyTier 在服务中使用如下原理。首先，主机电脑通过 EasyTier 向“中心节点服务器“发送请求，被分配到一个子节点地址。接下来，主机电脑连接到子节点，尝试通过子节点进行“[打洞](https://easytier.cn/guide/aboutp2p.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%89%93%E6%B4%9E)”来建立一个“[P2P](https://easytier.cn/guide/aboutp2p.html#%E4%BB%80%E4%B9%88%E6%98%AF-p2p)”（点对点）连接。但是在普通情况下打洞有可能失败，于是则会使用子节点来转发流量到对方服务器（中继）。一旦建立稳定连接，则可以通过 EasyTier 来向虚拟局域网中的其他成员电脑发送信息。

因此，所谓的合规性问题就在于：**通过中继服务器在两台电脑之间建立信道，这件事到底违规不违规？**

其实，组网工具就是一个广义上的 VPN（**V**irtual **P**rivate **N**etwork）服务。如果成员主机在境外，抑或是传输了违规的信息，那么整个服务就与违法的翻墙服务没有任何区别。但是请注意，如果没有进行违规服务，也没有跨境，那么 VPN 本身并不违法。
也就是说：**VPN ≠ 翻墙。**

但是，不管是 Scaffolding、PCL 协议还是 Terracotta，这其中都没有实现任何对流量的审查。既没有限制其只能转发 Minecraft 流量，也没有检查主机是否位于境外。同样，EasyTier 的节点也没有检查通过其中的流量。
这就意味着：**只要你想，你可以通过 EasyTier 随意向位于国外的主机转递非法流量，只要你们建立了同一个虚拟局域网。**

所以，这就是各种视频里面宣传的 “请立刻停止为 PCL 贡献节点”之类的源头。里面持有的观点不外乎是：搭建节点，就等于搭建 VPN，就等于违法。如果你搭建了节点，那很可能被一起追责。就算是合规运营，很多服务商的条例里也禁止提供中继服务，这也很可能是EasyTier被服务商诟病的原因。

这其实是利用了所有人对于“VPN”这个词的恐慌心理。只要建立了恰当的流量审查，在恰当的厂商搭建，那么 EasyTier 等组网 VPN 服务，一样可以安全存在。

## 最后一根稻草

再来看第一、三个问题。

这些“带节奏”和“攻击”的源头是哪里？就是运营商……

> 那些视频 IP 都是黑龙江，发布时间和封面标题也很一致，都是云服务商（

云服务商其实本身就很抵制内网穿透这些东西，那么发视频的原因也很明确了……

事实上，大多数节点的负载是源于攻击，而不是来自 Minecraft 联机。更有通过节点走加密流量的，反正不是在联机。

接下来，经过有组织预谋的舆论导向，联机功能的齿轮开始不堪重负，渐渐停转……

11月16日，PCL CE联机入口正式关闭：
![图片2](/images/my-thoughts-on-the-link-feature-being-shut-down-2.png)

接下来，PCL 的联机入口也[相继关闭](https://www.bilibili.com/opus/1135872352762986504)。

联机崩溃的根本原因，就在于吹捧过度，运营商攻击，节点不堪重负（由于攻击）以及曲解“VPN”含义造成的群体被害妄想。

## 恢复？

11月19日，龙腾猫跃发布了一篇新动态：[**报告！最新进展！**](https://www.bilibili.com/opus/1136622211136749568)**。**

![图片3](/images/my-thoughts-on-the-link-feature-being-shut-down-3.png)

我只希望联机能够快点回归……吧。

利益这种东西，还是太复杂了。

毕竟，这只是一个**游戏**的功能而已。

## 一些其他的话

龙猫本人似乎不太满意 [谁在台前发电，谁在背后扛压力](https://www.bilibili.com/opus/1136282681104924672) 这篇文章…… 这篇文章里面有些语句似乎在暗指是各大启动器对该服务的滥用导致了 EasyTier 的崩溃。在这里澄清一下，联机功能崩溃的本质原因就是运营商的炒作和攻击（当然后者很有可能是前者引发的），而不是由于启动器造成的负载。事实上，如果节点仅仅用于打洞，负载是相当之低的，完全不可能造成崩溃。

我对此事的感想是：
一个工具只要出圈，基本就等于招致诟病和践踏。毕竟，林子大了什么鸟都有……
此事的根本原因即是联机功能被大肆炒作导致的，这让运营商注意到了这个功能，才出现后续的事件。
事实上，PCL CE 等本身就是被作为一个小工具考虑的，可是一旦被 UP 主等等注意到，就会宣传。
我非常讨厌大肆宣传炒作不成熟工具的人，例如将 PCL CE 炒作为 “PCL 增强版” 等。

这可能听起来十分反直觉，但项目出圈有时即是出局。

## 参考文献

龙腾猫跃的个人空间-bilibili：<https://space.bilibili.com/11343203>

PCL 联机功能（再次）暂时关闭的说明……-bilibili by 龙腾猫跃：<https://www.bilibili.com/opus/1135872352762986504>

EasyTier 文档-EasyTier官网：[EasyTier - 简单、安全、去中心化的异地组网方案](https://easytier.cn/)

当 PCL 联机遇上 EasyTier：谁在台前发电，谁在背后扛压力-bilibili by Qihuang02-https://www.bilibili.com/opus/1136282681104924672

简洁联机标记约定 · Meloong-Git/PCL Wiki-GitHub by 龙腾猫跃：<https://github.com/Meloong-Git/PCL/wiki/%E7%AE%80%E6%B4%81%E8%81%94%E6%9C%BA%E6%A0%87%E8%AE%B0%E7%BA%A6%E5%AE%9A>

陶瓦联机-GitHub by BurningTNT：https://github.com/burningtnt/Terracotta
