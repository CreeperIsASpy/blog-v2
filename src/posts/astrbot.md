---
title: 【教程向】如何拥有自己的一只小一涵？
date: 2026-06-7 15:25:10
tags:
  - 技术
  - 教程
  - 人工智能
categories:
  - 教程
  - AI
cover: ../../public/images/astrbot-2.png
---
先展示：
![astrbot-2.png](/images/astrbot-2.png)
# 基本部署：NapCat
## 安装与准备
1. 按照[这个教程章节](https://napneko.github.io/guide/boot/Shell#napcat-installer-linux-%E4%B8%80%E9%94%AE%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC-%E6%94%AF%E6%8C%81ubuntu-20-debian-10-centos9)中的“Docker 安装”卡片来安装 NapCat。
2. 请 **务必** · **一定** · 肯定 注册一个 QQ 小号来绑定 NapCat 。
> 尽管目前 NapCat 在 Linux 端封禁的概率远没有以前那么高了，但账号仍然可能被风控（需要实名认证才能解除），为了不影响你的正常聊天，请一定注册一个小号来绑定 NapCat！
## 获取 WebUI Token
1. 执行`sudo docker ps | grep napcat`，然后复制第一列长 12 字符的容器 ID。
2. 执行`sudo docker logs <容器 ID> | grep "WebUi Token: "`，然后在输出结果中找到`WebUi Token: ` 字样后面的一串（同样长 12 字符的）Token。
3. 将这个 Token 保存好，这是你的 NapCat WebUI Token。

## 配置 NapCat
1. 访问 <http://localhost:6099> 就是 NapCat 的 WebUI 地址，并使用 NapCat WebUI Token 来登录，进入面板。
2. 选择“扫码登录”，在手Q**登录你的小号**，然后扫码登录，将当前账户绑定至 NapCat。
3. 进入 WebUI 面板之后，转到[网络配置](http://localhost:6099/webui/network)然后选择“新建”-“Websocket 客户端”。
4. 使用如下配置：
   ![astrbot-1.png](/images/astrbot-1.png)
   点击“保存”。
5. 可选：转到[系统配置-反检测](http://localhost:6099/webui/config?tab=bypass)并打开全部选项，点击“保存”。

# 基本部署：AstrBot
## 安装
1. 按照[这个教程章节](https://docs.astrbot.app/deploy/astrbot/docker.html#%E9%80%9A%E8%BF%87-docker-compose-%E9%83%A8%E7%BD%B2)中的“只部署 AstrBot（通用方式）”来安装。
> 不要自作聪明的使用其他方式，否则可能导致意外情况（例如部署了两个 NapCat 导致冲突，亦或是出现其他诡异 Bug），概不负责。
2. 执行`sudo docker ps | grep astrbot`，然后复制第一列长 12 字符的容器 ID。
3. 输入`sudo docker logs <容器 ID>`找到初始密码（应该挺好找的），复制。
4. 访问<http://localhost:6185>，使用初始密码（账户名是 astrbot）登录后，立刻设置你自己的账户。
5. 进入 WebUI 界面。
## 配置模型提供商
> 模型选择与提示：
> 本教程推荐您使用 DeepSeek V4 Pro/Flash 作为主聊天模型，并使用 Xiaomi Mimo V2 OMNI 作为多模态（图片描述，文档理解）辅助模型。
> DeepSeek 申请 API Key 的方式非常简单：
> 第一步：访问 <https://platform.deepseek.com> 并登录。
> 第二步：点击左侧 API keys 并选择 Create new API key。
> 第三步：复制并妥善保管你的 API Key。
> 第四步：点击左侧 Top up 并进行实名认证，然后充钱即可。
> 
> 有关定价可以看这里：<https://api-docs.deepseek.com/quick_start/pricing>
> 小米申请 API Key 的方式在官方文档里也有：<https://platform.xiaomimimo.com/docs/zh-CN/quick-start/first-api-call>
> 
> 嵌入式模型除了官方文档里推荐的硅基流动，英伟达也是一个不错的选择。
1. 转到[模型提供商](http://localhost:6185/#/providers)，选择“新增”-“DeepSeek”。
2. 在 API Key 处填入你的 API Key。
3. 往下滑，点击“获取模型列表”，并在可用模型列表中选择`deepseek-v4-pro`。
4. 往上滑，点击右上角“保存配置”。
5. 同理，再次选择“新增”-“Xiaomi”。
6. 在 API Key 处填入你的 API Key。
7. 往下滑，点击“获取模型列表”，并在可用模型列表中选择`mimo-v2-omni`。
8. 往上滑，点击右上角“保存配置”。
9. 如果你接下来打算配置知识库，请配置一个嵌入模型：
   转到“嵌入（Embedding）”标签页，然后点击“新增模型提供商”。
   配置教程请看[官方文档](https://docs.astrbot.app/use/knowledge-base.html#%E9%99%84%E5%BD%95-%E9%AB%98%E6%80%A7%E4%BB%B7%E6%AF%94%E7%9A%84%E5%B5%8C%E5%85%A5%E6%A8%A1%E5%9E%8B%E7%94%B3%E8%AF%B7) 。
# AstrBot 配置文件
1. 转到[配置文件](http://localhost:6185/#/config#normal)，然后左上角下拉框里选择“管理配置文件”，再点击“新建配置文件”，配置文件名称使用你的 Bot 名称。
2. 在开始编辑配置文件之前，请**务必确保**你当前编辑的是你机器人使用的那个配置文件（而不是`default`）！

配置文件的编辑非常复杂，你也不必处处与我保持一致。
下面是一些参考，未提到的选项即代表不做更改。
进行任何更改后，均需点击右下角保存按钮才能生效！
## AI 配置
### 模型
- 默认对话模型：`deepseek/deepseek-v4-pro`
- 默认图片转述模型：`xiaomi/mimo-v2-omni`
### 人格
转到[人格设定](http://localhost:6185/#/persona)，选择“创建人格”。
人格 ID 填写你的机器人名称。
系统提示词的编写可以参考 Shorin 大佬的 [Miyu 提示词](https://github.com/SHORiN-KiWATA/Miyu/tree/main/prompts)。
预设对话自拟即可。
人格相关的调整讲起来学问很深，经过良好调整的人格可以在较差的模型上取得非常优秀的表现，但对提示词编写者的要求又极高。
最好的做法是在使用过程中不断将需要 Bot 进行长久记忆和严格要求的内容写入人格，经过沉淀即可成为一份全面的提示词。

教程搜索词：`BROKE原则`、`角色扮演提示词`、`模型约束`
### 知识库
***前提条件：您已配置了嵌入（Embedding）模型。***
转到[知识库](http://localhost:6185/#/knowledge-base)，点击右下角加号新建知识库。
名称、图标无所谓，选择正确的嵌入和重排序模型即可。
创建后，在列表中点击刚刚创建的知识库，然后在“文档管理”中上传文档即可。

> 如果碰到了维度大小错误，请将嵌入式模型的“嵌入维度”配置更改为错误信息中提示的维度。

在配置文件的“知识库列表”里选择刚刚创建的知识库并保存。
同时，建议给聪明的模型打开“Agentic 知识库检索”。
### 网页搜索
> 如何获取 Tavily API Key
Tavily 是一个专为 AI Agent 设计的实时网页搜索 API。
第一步：访问官网 — 打开 <https://tavily.com>
第二步：注册账号 — 点击右上角 Sign Up，使用 Email 或 Google/GitHub 账号注册
第三步：进入控制台 — 登录后前往 <https://app.tavily.com/home>
 获取 API Key — 在 Dashboard 中找到并复制你的 API Key
免费套餐每月提供 1000 次 API 调用，适合开发和测试。如需更多额度可查看 [Pricing](https://tavily.com/pricing) 页面升级。
详细文档: <https://docs.tavily.com>
- 启用网络搜索：打开
- 网页搜索提供商：`tavily`
- Tavily API Key：填入你的 tavily API key
- 显示来源引用：建议打开

### 使用电脑能力
- 运行环境：`local` 
> 为什么我不建议使用沙箱：
> AI 智力足够高的情况下，其本身就是一道绝佳的验证器，并不需要其他防护。
> 配合 docker 自带的沙盒机制和“需要 AstrBot 管理员权限才能调用使用电脑能力”，可以保证安全。
> 目前的沙箱环境驱动支持尚存在诸多问题，还不如不开。
- 需要 AstrBot 管理员权限：**务必开启**
> 你也不希望群里随便哪个人都能操控你的电脑吧。
### 主动型能力
建议打开。
### 上下文管理策略
- 历史超限或上下文接近上限时的处理方式：选择“由 LLM 压缩上下文”
- 用于上下文压缩的模型提供商 ID：选择`deepseek/deepseek-v4-pro`
### 其他配置
- 显示思考内容：关闭
- 流式输出：打开
- 不支持流式回复的平台：实时分段回复
- 健康模式：关闭
- 用户识别、显示群名称、现实世界时间感知：打开
- 工具调用轮数上限：可以适当改高一些，例如改为`38`
- 启用图片压缩：打开
## 平台配置
### 基本
- 管理员 ID：添加几个管理员的  QQ 号即可
> 在 NapCat 平台，管理员的 UID 就是 QQ 号本身，不要再用 `/sid` 看了。
- 隔离会话：不建议开启
- 唤醒词：默认的斜杠建议保留，可以自己添加一个
  例如：我添加了`一涵`作为额外唤醒词
- 私聊消息需要唤醒词：关闭
- 回复时 @ 发送人、回复时引用发送人消息：
  ***非常重要***：这两个设置和流式回复是互斥的！如果你开启了流式回复，这两个设置将无效。
  不建议开启。
### 其他配置
- 是否忽略机器人自身的消息：打开
## 拓展功能-群聊上下文感知(原聊天记忆增强)
- 启用群聊上下文感知：打开
- 自动理解图片：打开
- 群聊图片转述模型：`xiaomi/mimo-v2-omni`
- 主动回复：打开（打开后下方新增的选项保持默认即可）
   
## 系统配置
转到[系统配置](http://localhost:6185/#/config#system)
- PyPI 软件仓库地址：建议使用阿里云源（填写<https://mirrors.aliyun.com/pypi/simple>）。
- HTTP 代理：还是配置一个比较稳妥，节点没有特殊要求。
# AstrBot 插件
AstrBot 有丰富的插件生态。
转到[插件市场](http://localhost:6185/#/extension#market)来安装插件，然后进入[已安装插件](http://localhost:6185/#/extension#installed)，并点击选中的插件卡片右下角的小齿轮，就可以进行插件配置。
## I Am Thinking
这个插件是 NapCat 平台的预回复表情插件。
安装后默认的预回复表情是♥️，可以在配置文件里更换。
> 更换表情使用的是 CQ 码，对应表在[这里](https://github.com/kyubotics/coolq-http-api/wiki/%E8%A1%A8%E6%83%85-CQ-%E7%A0%81-ID-%E8%A1%A8)，但是图片没了……
> 可以通过下载这个网页的 markdown 文件并批量替换其中的链接来恢复——
> 静态图片链接替换为 <https://raw.githubusercontent.com/kyubotics/coolq-http-api/master/docs/qq-face/{id}.png>
> 动态图片链接替换为 https://raw.githubusercontent.com/kyubotics/coolq-http-api/master/docs/qq-face/{id}.gif
> 就可以了。

## astrbot_plugin_livingmemory
***前提条件：您已配置了嵌入（Embedding）模型。***
如果你前面已经配置了知识库相关设置，那么这个插件你无脑装上就行了。

## 主动消息 (Proactive Chat)

安装后，进入插件配置。
在想要让一涵主动发消息的群聊里输入`/sid`获取 UMO，并将其填入群聊会话 UMO 列表中。
打开“启用群聊全局主动消息功能”即可。

## 点歌插件

无脑装上就行。

---
# 结语
折腾到这里，我们基本已经有了一个可用的机器人了。
说真的，我倒是想给一涵配一个 vtuber 皮套然后成为新一代龟父，可惜我没钱。
祝你玩得愉快。
