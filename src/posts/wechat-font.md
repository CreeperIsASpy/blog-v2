---
title: 【KUbuntu】Linux 微信实现自定义字体
date: 2026-03-28 13:27:38
tags: [操作系统, 技术, 手记, Linux体验]
categories: [手记, OS]
cover: ../../public/images/wechat-font-1.png
---

### 不说废话的原理
微信内核是 Electron，那么就可以对其使用 FONTCONFIG_FILE 这个环境变量，指向一个我们自定义的配置文件。
不想让这个字体配置污染其他软件，那就不要修改 `~/.config/fontconfig/fonts.conf`（全局字体配置），而是随便找个地方建个 conf，里面写好配置，然后 export 环境变量指向该文件即可。
通过 conf 文件，可以强制把微信请求的字体重定向到我们的自定义字体，从而实现无害替换。

### 具体步骤
1. 随便找个地方创建字体配置文件，但不要覆盖全局字体，不然你完蛋了：
```
mkdir -p ~/.config/wechat-fonts
touch ~/.config/wechat-fonts/local.conf
```

2. Linux 微信在我这默认请求了一大堆字体，里面最优先的几个是微软雅黑、思源黑体之类的，所以在字体配置里面这么写，重定向这些字体到我们的自定义字体（这里我的是霞鹭文楷`LXGW-WenKai`）：
```
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>

  <match target="pattern">
    <test qual="any" name="family"><string>Microsoft YaHei UI</string></test>
    <edit name="family" mode="assign" binding="same">
      <string>LXGW WenKai</string>
    </edit>
  </match>

  <match target="pattern">
    <test qual="any" name="family"><string>Microsoft YaHei</string></test>
    <edit name="family" mode="assign" binding="same">
      <string>LXGW WenKai</string>
    </edit>
  </match>

  <match target="pattern">
    <test qual="any" name="family"><string>Noto Sans SC</string></test>
    <edit name="family" mode="assign" binding="same">
      <string>LXGW WenKai</string>
    </edit>
  </match>

  <match target="pattern">
    <test qual="any" name="family"><string>sans-serif</string></test>
    <edit name="family" mode="prepend" binding="strong">
      <string>LXGW WenKai</string>
    </edit>
  </match>

  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>

</fontconfig>
```

3. 保存，然后用环境变量来启动微信：
```
export FONTCONFIG_FILE=$HOME/.config/wechat-fonts/local.conf
wechat
```

4. 如果一切无误，那么把环境变量加到`.desktop`文件里就好了。

自定义字体能稍微缓解一下 Linux 微信在 Wayland 下的模糊问题，但也不是很多就是了（

### 最终效果图

![wechat-font-1.png](/images/wechat-font-1.png)
