---
title: 【KUbuntu】在 Plasma 5 下实现透明面板
date: 2026-04-04 17:48:38
tags: [操作系统, 技术, 手记]
categories: [手记, OS]
cover: ../../public/images/panel-transparency-on-plasma5-1.png
---

### 解析
目前主流方法是直接使用`latte-dock`，但是这玩意太不原生了，我只是想要透明面板，那么唯一一个可用的方案就是 [Panel Transparency Button](https://github.com/psifidotos/paneltransparencybutton) 这个 Plasma 组件（顺带一提，这玩意和`latte-dock`是同一个人写的）。

### 具体步骤
1. 安装组件
```
git clone https://github.com/psifidotos/paneltransparencybutton
plasmapkg2 -i .
```

2. 解决唯一一个问题：这个组件的默认状态是“不透明”，也就是说我们每次重新启动 Plasma 会话都得手动按一下那个按钮。
解决这个问题的方法就是编辑组件文件：`./contents/config/main.xml`。
非常简单，将其中`transparencyEnabled`的`default`值改为`true`即可。
```
<?xml version="1.0" encoding="UTF-8"?>
<kcfg xmlns="http://www.kde.org/standards/kcfg/1.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.kde.org/standards/kcfg/1.0
      http://www.kde.org/standards/kcfg/1.0/kcfg.xsd" >
    <kcfgfile name=""/>

    <group name="Appearance">
        <entry name="transparencyEnabled" type="Bool">
            <default>true</default>  <!-- 这里从原来的 false 改为 true -->
        </entry>
    </group>

</kcfg>
```

3. 保存，然后更新组件：
```
plasmapkg2 -u .
```

4. 看看效果：
```
kquitapp5 plasmashell && kstart5 plasmashell & 
```
*后面记得要 disown，不然你 konsole 关掉之后你桌面就没了*


### 最终效果图

![panel-transparency-on-plasma5-1.png](/images/panel-transparency-on-plasma5-1.png "默认透明（主题：WhiteSur-dark）")
