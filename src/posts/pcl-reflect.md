---
title: 【PCL】主题、更新与CDN的破解（未完成）
date: 2026-01-19 15:12:35
tags: [PCL, 技术, 观点]
categories: [编程, PCL]
cover: "../../public/images/pcl-reflect-1.png"
---

## 反编译

~~由于太菜~~我没能知道 PCL 快照版加的什么壳，试着使用了 .NET Reactor Slayer，成功脱去了大部分内容。

脱壳后使用 dnSpy 反编译得到源代码。

先纵览 ModSecret 的源代码，得到本次反编译的目标：

- 主题相关内容

- 更新相关内容

- 网络鉴权相关内容

## 主题

主题相关内容共分两部分：秋仪金和其他主题

### 其他主题

首先可以发现主题的存储是通过 ModSetup 来注册的，注册项的名称是 `UiLauncherThemeHide2` 。

这里给出注册代码：

```vb
Me.SetupDict = New Dictionary(Of String, ModSetup.SetupEntry)() From { ...{ "UiLauncherThemeHide2", New ModSetup.SetupEntry("0|1|2|3|4", ModSetup.SetupSource.Registry, True) }  ...}
```

可以看到最后一个参数值为 True ，阅读 SetupEntry 的初始化函数定义：

```vb
Public Sub New(Value As Object, Optional Source As Object = 0, Optional Encoded As Object = False)
```

发现最后一个参数为 Encoded，也就是进行了加密。下方调用了 `ModSecret.SecretEncrypt` 这个函数，我们直接看代码：

```vb
        ' Token: 0x06000612 RID: 1554 RVA: 0x00035B34 File Offset: 0x00033D34
        Friend Function SecretEncrypt(SourceString As String, Optional Key As String = "") As String
            Key = ModSecret.SecretKeyGet(Key)
            Dim bytes As Byte() = Encoding.UTF8.GetBytes(Key)
            Dim bytes2 As Byte() = Encoding.UTF8.GetBytes("95168702")
            Dim descryptoServiceProvider As DESCryptoServiceProvider = New DESCryptoServiceProvider()
            Dim text As String
            Using memoryStream As MemoryStream = New MemoryStream()
                Dim bytes3 As Byte() = Encoding.UTF8.GetBytes(SourceString)
                Using cryptoStream As CryptoStream = New CryptoStream(memoryStream, descryptoServiceProvider.CreateEncryptor(bytes, bytes2), CryptoStreamMode.Write)
                    cryptoStream.Write(bytes3, 0, bytes3.Length)
                    cryptoStream.FlushFinalBlock()
                    text = Convert.ToBase64String(memoryStream.ToArray())
                End Using
            End Using
            Return text
        End Function

        ' Token: 0x06000613 RID: 1555 RVA: 0x00035BEC File Offset: 0x00033DEC
        Friend Function SecretDecrypt(SourceString As String, Optional Key As String = "") As String
            Key = ModSecret.SecretKeyGet(Key)
            Dim bytes As Byte() = Encoding.UTF8.GetBytes(Key)
            Dim bytes2 As Byte() = Encoding.UTF8.GetBytes("95168702")
            Dim descryptoServiceProvider As DESCryptoServiceProvider = New DESCryptoServiceProvider()
            Dim [string] As String
            Using memoryStream As MemoryStream = New MemoryStream()
                Dim array As Byte() = Convert.FromBase64String(SourceString)
                Using cryptoStream As CryptoStream = New CryptoStream(memoryStream, descryptoServiceProvider.CreateDecryptor(bytes, bytes2), CryptoStreamMode.Write)
                    cryptoStream.Write(array, 0, array.Length)
                    cryptoStream.FlushFinalBlock()
                    [string] = Encoding.UTF8.GetString(memoryStream.ToArray())
                End Using
            End Using
            Return [string]
        End Function
```

这两个函数的逻辑很简单，是 DES 加密，里面要用到这个工具函数：

```vb
        Private Function SecretKeyGet(Key As String) As String
            Dim text As String
            If ModBase.ApplicationStartTick < 1L Then
                text = "00000000"
            ElseIf String.IsNullOrEmpty(Key) Then
                text = "@;$ Abv2" '注意这里的空值处理逻辑。
            Else
                text = Strings.Mid(ModBase.StrFill(Conversions.ToString(ModBase.GetHash(Key)), "X", 8), 1, 8)
            End If
            Return text
        End Function
```

而它又要用到以下函数：

```vb
        Public Function StrFill(Str As String, Code As String, Length As Byte) As String
            Dim text As String
            If Str.Length > CInt(Length) Then
                text = Strings.Mid(Str, 1, CInt(Length))
            Else
                ' The following expression was wrapped in a checked-expression
                text = Strings.Mid(Str.PadRight(CInt(Length), Conversions.ToChar(Code)), Str.Length + 1) + Str
            End If
            Return text
        End Function
        Public Function GetHash(Str As String) As ULong
            Dim num As ULong = 5381UL
            Dim num2 As Integer = Str.Length - 1
            For i As Integer = 0 To num2
                num = (num << 5) Xor num Xor CULng(Str(i))
            Next
            Return num Xor 12218072394304324399UL
        End Function
```

接下来我们来看看它是如何存储的：

```vb
        ' Token: 0x06000619 RID: 1561 RVA: 0x00036778 File Offset: 0x00034978
        Friend Function ThemeUnlock(Id As Integer, Optional ShowDoubleHint As Boolean = True, Optional UnlockHint As String = Nothing) As Boolean
            Dim flag As Boolean
            If ModMain.FrmMain Is Nothing Then
                flag = False
            Else
                ModBase.Log("[UI] 解锁隐藏主题：" + Conversions.ToString(Id), ModBase.LogLevel.Normal, "出现错误")
                If Id = 8 Then
                    Throw New Exception("不可使用此方式解锁秋仪金！")
                End If
                Dim list As List(Of String) = New List(Of String)(ModBase.Setup.[Get]("UiLauncherThemeHide2", Nothing).ToString().Split("|"))
                If list.Contains(Id.ToString()) Then
                    If ShowDoubleHint Then
                        ModMain.Hint("该隐藏主题已被解锁！", ModMain.HintType.Blue, True)
                    End If
                    flag = False
                Else
                    If UnlockHint IsNot Nothing Then
                        ModMain.Hint(UnlockHint, ModMain.HintType.Green, False)
                    End If
                    list.Add(Id.ToString())
                    ModBase.Setup.[Set]("UiLauncherThemeHide2", list.ToArray().Join("|"), False, Nothing)
                    ModSecret.ThemeCheckAll(True)
                    flag = True
                End If
            End If
            Return flag
        End Function
```

这里可以看到它使用`|`分割每个主题编号，因此我们只需要把以下内容：

```
0|1|2|3|4|5|6|7|9|10|11|12|13
```

加密并写入注册表`UiLauncherThemeHide2`即可解锁所有主题（这里不写8是因为8代表秋仪金）。

另外，这里 `SecretEncrypt` 函数的调用藏得很深，在`ModSetup`中的`Set`方法里，如下：

```vb
Value = ModSecret.SecretEncrypt(Conversions.ToString(Value), "PCL" + ModBase.Identify)
```

这里用到了`ModBase.Identity`作为`Key`的一部分，因此我们顺便来看看识别码的生成逻辑（在`ModSecret`中）：

```vb
        ' Token: 0x0600060D RID: 1549 RVA: 0x00035398 File Offset: 0x00033598
        Friend Function SecretGetIdentify() As String
            Dim text As String
            Try
                If ModBase.ApplicationStartTick < 1L Then
                    text = "0000-0000-0000-0000"
                Else
                    Dim text2 As String
                    Try
                        text2 = MyWpfExtension.Computer.Registry.GetValue(String.Format("HKEY_LOCAL_MACHINE\SYSTEM\Har{0}wareConfig", "D".ToLower()), "LastConfig", "Unknown").ToString().ToUpper().Trim(New Char() { "{"c, "}"c })
                    Catch ex As Exception
                        ModBase.Log(ex, "获取主板标识码失败", ModBase.LogLevel.Debug, "出现错误")
                        text2 = "Unknown"
                    End Try
                    Dim text3 As String
                    Try
                        text3 = Conversions.ToString(ModBase.Setup.[Get]("Identify", Nothing))
                    Catch ex2 As Exception
                        text3 = ""
                    End Try
                    If text3.Length < 3 Then
                        text3 = Conversions.ToString(ModBase.GetTimeTick()) + Conversions.ToString(MyWpfExtension.Computer.Info.AvailablePhysicalMemory)
                        ModBase.Setup.[Set]("Identify", text3, False, Nothing)
                    End If
                    Dim text4 As String = ModBase.StrFill(ModBase.GetHash(text2 + text3).ToString("X"), "7", 16)
                    text = String.Format("{0}-{1}-{2}-{3}", New Object() { Strings.Mid(text4, 5, 4), Strings.Mid(text4, 13, 4), Strings.Mid(text4, 1, 4), Strings.Mid(text4, 9, 4) })
                End If
            Catch ex3 As Exception
                ModBase.Log(ex3, "PCL 无法获取设备标识码，这可能会导致部分设置无法正常存储。" & vbCrLf & vbCrLf & "详细的错误信息", ModBase.LogLevel.Feedback, "获取标识码失败")
                text = "0000-0000-0000-0000"
            End Try
            Return text
        End Function
```

这里根据的是内存和主板信息，所以可以很轻松的在其他语言还原这段逻辑，例如 Python：

```python
def secret_get_unique_address() -> str:
    try:
        board_id = read_reg(
            winreg.HKEY_LOCAL_MACHINE,
            r"SYSTEM\HardwareConfig",
            "LastConfig",
            "Unknown"
        ).upper().strip("{}")

        identify = read_reg(
            winreg.HKEY_CURRENT_USER,
            r"Software\PCL",
            "Identify",
            ""
        )

        if len(identify) < 3:
            tick = int(time.time() * 1000)
            mem = psutil.virtual_memory().available
            identify = f"{tick}{mem}"

            write_reg(
                winreg.HKEY_CURRENT_USER,
                r"Software\PCL",
                "Identify",
                identify
            )

        h = int(get_hash_str(board_id + identify))
        hex_str = str_fill(format(h, "X"), "0", 16)

        result = (
            f"{hex_str[4:8]}-"
            f"{hex_str[12:16]}-"
            f"{hex_str[0:4]}-"
            f"{hex_str[8:12]}"
        )

        return result

    except Exception as e:
        print(f"ERROR get_unique_addr: {e}")
        print_exc()
        print("WARNING get_unique_addr: Returning value 0000-0000-0000-0000 which is invalid.")
        return "0000-0000-0000-0000"
```

这样，我们就还原了主题生成与解锁验证所需的全部流程逻辑。

通过上面给过的 `SecretEncrypt` 函数，我们可以轻松写一个用来生成主题注册表项的 Python 小脚本。相关代码已经开源在 [GitHub](https://github.com/Ignis-Studio/PCLThemeUnlock) ，其中的`main.py`就可以生成注册表项了（生成识别码的逻辑单独放在`get_unique_address.py`中）。

概括一下所有流程：

原字符串（用`|`分割的主题编号）=> 使用`SecretEncrypt`加密（密钥为`PCL`+识别码） => 写入注册表项`UiLauncherThemeHide2`

至此，我们已经破解了除秋仪金的大部分主题。

### 秋仪金

之所以把秋仪金放在后面讲，是因为它更难破解。

我们先来观察秋仪金的解锁和验证逻辑：

```vb
        ' Token: 0x0600061A RID: 1562 RVA: 0x00036848 File Offset: 0x00034A48
        Friend Function ThemeCheckGold(Optional Code As String = Nothing) As Boolean
            Dim flag As Boolean
            Try
                Dim text As String = (If(Code, ModBase.Setup.[Get]("UiLauncherThemeGold", Nothing))).ToString().Replace("#", "")
                flag = ModSecret.SecretRsaVerify("Gold|0|" + ModBase.Identify.Replace("-", ""), text)
            Catch ex As Exception
                ModBase.Log(ex, "检查秋仪金失败", ModBase.LogLevel.Feedback, "出现错误")
                flag = False
            End Try
            Return flag
        End Function
        Friend Function SecretRsaVerify(SourceString As String, Sign As String) As Boolean
            Dim flag As Boolean
            Try
                If ModBase.ApplicationStartTick < 1L Then
                    flag = False
                Else
                    Dim rsacryptoServiceProvider As RSACryptoServiceProvider = New RSACryptoServiceProvider(512)
                    rsacryptoServiceProvider.FromXmlString(ModSecret.SecretRsaPublicKey.Replace("!", "").Replace("$", "+") + "/R1Frckd3/Sn+Zsx9aD6U2f" + Conversions.ToString(Math.Round(84D)) + "SdWMDlrRY9DfhQ==</Modulus><Exponent>AQAB<\Exponent><\RSAKeyValue>".Replace("\", "/"))
                    flag = rsacryptoServiceProvider.VerifyData(Encoding.[Default].GetBytes(SourceString), GetType(SHA256), Convert.FromBase64String(Sign))
                End If
            Catch ex As Exception
                flag = False
            End Try
            Return flag
        End Function
```

这里可以发现验证使用的是 [RSA 非对称加密](https://en.wikipedia.org/wiki/RSA_cryptosystem) ，严格意义上来说除非拥有私钥，无法进行签名。但真的是这样吗？我们不能畏难。仔细阅读，发现其中使用的是 RSA 512。这是早已被淘汰且被证实不安全的 RSA 密钥长度。

### 私钥的破解过程

接下来讲解破解 RSA 公钥的过程，不感兴趣的同学可以直接跳过。

首先观察程序，拿到其中的公钥。

```vb
        ' Token: 0x04000409 RID: 1033
        Friend SecretRsaPublicKey As String = "<RS!AKeyValu!e><Mo!dul!us>0L/cZoJUyBRAIE8OKiG8$qYOytXD$azFCBsmOuQra"
```

和处理流程：

```vb
rsacryptoServiceProvider.FromXmlString(ModSecret.SecretRsaPublicKey.Replace("!", "").Replace("$", "+") + "/R1Frckd3/Sn+Zsx9aD6U2f" + Conversions.ToString(Math.Round(84D)) + "SdWMDlrRY9DfhQ==</Modulus><Exponent>AQAB<\Exponent><\RSAKeyValue>".Replace("\", "/"))
```

进行还原后发现公钥的长度不对头，因此再次观察，发现在`ModSecret`初始化时非常隐蔽的对`SecretRsaPublicKey`的值做了修改，如下：

```vb
ModSecret.SecretRsaPublicKey = ModSecret.SecretRsaPublicKey + "qgaq".ToUpper() + "1S"
```

（在`SecretOnApplicationStart`函数的末尾，我花了很久才找到……）

因此可还原出 RSA 公钥：

```xml
<RSAKeyValue><Modulus>0L/cZoJUyBRAIE8OKiG8+qYOytXD+azFCBsmOuQraQGAQ1S/R1Frckd3/Sn+Zsx9aD6U2f84SdWMDlrRY9DfhQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>
```

提取出模数并转换为十进制，以便因式分解：

```
10933096180346127695081099708243448444467282953548374941920090181459099156162822929023598405197953653590303042837761938376403948824104176832254366232665989
```

这个数虽然可以使用 yafu 因式分解，但是这太依赖性能，需要跑整整一个月。鉴于这个数相对较小，因此我们可以去 [FactorDB](https://factordb.com) 上找一找，能找到的概率很大。

果不其然：

![pcl-reflect-1.png](/images/pcl-reflect-1.png)

这个数的状态是 FF（**F**ully **F**actored），也就是已经被分解过了。看到后面的两个 Number 值，就是这里的唯二两个因数。

通过两个因数（p）还原私钥的过程太繁琐，我这里不再赘述，感兴趣的同学可以自己搜索。还原后可以再转换为通用的 PEM 格式，方便后续使用。这里我就不把私钥放出来了。

### 私钥验证

现在我们已经有了私钥，下一步就是根据原文生成签名。

先看看函数调用：

```vb
flag = ModSecret.SecretRsaVerify("Gold|0|" + ModBase.Identify.Replace("-", ""), text)
```

这里的原文是`Gold|0|`+识别码。识别码生成流程上面说过了。

由此我们只需要使用 RSA 对 `Gold|0|`+识别码 这个字符串进行签名即可。

RSA 签名相关代码放在了  GitHub 仓库下的 gold.py（私钥已经放在 repo secret 里面了）。

## 更新

更新密钥的验证也需要使用 RSA 生成签名，这在上面已经说过。

这里放上验证逻辑：

```vb
                    CS$<>8__locals1.$VB$Local_NewUniqueMark = ModSecret.GetUniqueMark(ReceivedKey)
                    Dim array As String() = ReceivedKey.Replace("1", "=").Replace("-", "1").Replace("0", "\").Replace("*", "0").Split("\")
                    CS$<>8__locals1.$VB$Local_UpdateKey = ModSecret.SecretDecrypt(array(0), array(1))
                    If ModSecret.SecretRsaVerify(CS$<>8__locals1.$VB$Local_UpdateKey + array(1) + ModBase.Identify, array(2)) OrElse Not ModSecret.SecretRsaVerify(ModBase.Identify + CS$<>8__locals1.$VB$Local_UpdateKey + array(1), array(2)) Then
                        Throw New Exception("更新密钥验证失败。")
                    End If
```

这里的`CS$<>8__locals1.$VB$Local_UpdateKey`，为了不与更新密钥本身相混淆，我们称它作 "remote update key"，即远程更新密钥。

因此我们可以获取更新密钥的结构：

识别码 + 远程更新密钥 + array(1)

这里的 array(1) 是自验证，可以随便取一个 base64，因此是盐值（？）。

将它们按顺序组合在一起并使用`\`做分割，即可获取更新密钥明文。

对该明文使用 RSA 签名即可获取更新密钥。

此处的远程更新密钥没有直接说，但是瞎填会导致提示”更新密钥失效“，再次阅读发现它参与了更新 URL 的构成，因此如果填错会导致 404。我们只能通过解密一个已知对本机有效的更新密钥来还原出远程更新密钥的值。

这里进行还原，可以得到这个值为`linkv3`（在 2025/8/12 获取）或`linkv4`（在 2025/11/3 获取），并且有且只有这两个值才能使得更新成功进行。

该段逻辑已经放在了 GitHub 仓库下的 `update_key.py` 中。

## 网络鉴权

这部分主要依赖以下两个函数：

```vb
Friend Function SecretCdnSign(UrlWithMark As String) As String
    Dim text As String
    If ModBase.ApplicationStartTick < 1L Then
        text = UrlWithMark
    ElseIf Not UrlWithMark.EndsWithF("{CDN}", False) Then
        text = UrlWithMark
    Else
        Dim text2 As String = UrlWithMark.Replace("{CDN}", "").Replace(" ", "%20")
        Dim text3 As String = ModBase.StrFill(ModBase.RandomInteger(0, 2147483645).ToString("x"), "0", 8)
        Dim text4 As String = ModSecret.SecretDecrypt("VwHB1je1uabAr0gKijpFaQ==", "CDN")
        Dim text5 As String = Conversions.ToString(ModBase.GetUnixTimestamp())
        Dim text6 As String = text2.Substring(text2.IndexOfF("://", False) + 3)
        text6 = text6.Substring(text6.IndexOfF("/", False))
        Dim stringMD As String = ModBase.GetStringMD5(New String() { text6, text5, text3, "0", text4 }.Join("-"))
        text = text2 + If(text2.Contains("?"), "&", "?") + "sign=" + New String() { text5, text3, "0", stringMD }.Join("-")
    End If
    Return text
End Function

Friend Sub SecretHeadersSign(Url As String, ByRef Req As HttpRequestMessage, Optional SimulateBrowserHeaders As Boolean = False)
    If ModBase.ApplicationStartTick >= 1L Then
        If Not Req.Headers.UserAgent.Any() Then
            If Not Url.Contains("baidupcs.com") AndAlso Not Url.Contains("baidu.com") Then
                If SimulateBrowserHeaders Then
                    Req.Headers.Add("User-Agent", String.Format("PCL2/{0} Mozilla/5.0 AppleWebKit/537.36 Chrome/63.0.3239.132 Safari/537.36", "2.12.1.0"))
                Else
                    Req.Headers.Add("User-Agent", String.Format("PCL2/{0}", "2.12.1.0"))
                End If
            Else
                Req.Headers.Add("User-Agent", "LogStatistic")
            End If
        End If
        If Not SimulateBrowserHeaders Then
            Req.Headers.Referrer = New Uri(String.Format("http://{0}.pcl2.server/", 378))
        End If
        If Url.Contains(ModSecret.SecretDecrypt("kSHbgKrsiOuHY81i63QtJevaX2+IWvVT", "")) Then
            Req.Headers.Add(ModSecret.SecretDecrypt("hlBzlKCNcyEYEaSOd0Vx0w==", ""), ModSecret.SecretDecrypt("SA+taZSvSkfRoq0fW5pnIpFzDGDck82KzMPbuglfAqrAbQAOwcZXBXVQVzenSNP14fnexB+G1bV/ufvjrtpiUA==", ""))
        End If
    End If
End Sub
```

在上面`SecretHeadersSign`里面最后一个 If 条件判断的字符串解密出来是`curseforge.com`……

`UrlWithMark`里面的”mark“指的是`{CDN}`标识，这个表示最终会被替换为一串`sign=...`的签名字符串。

签名的逻辑太过繁杂了，这里不说了，用到的工具函数前面都讲过。

该段代码未上传 GitHub。

但是，我们来看看里面名叫`DownloadLatestPCL`函数，如果能直接下载更新包，那么都用不着生成更新密钥了，岂不美哉：

```vb
Friend Sub DownloadLatestPCL(Optional LoaderToSyncProgress As ModLoader.LoaderBase = Nothing)
    Dim objectValue As Object = RuntimeHelpers.GetObjectValue(If(File.Exists(ModBase.PathTemp + "Latest.exe"), ModBase.Setup.[Get]("SystemHighestSavedBetaVersionReg", Nothing), 0))
    Dim text As String = ModBase.ReadFile(ModBase.PathTemp + "Cache\Notice.cfg", Nothing)
    Dim num As Integer
    If text.Split("|").Count() < 3 Then
        num = 0
    Else
        num = Conversions.ToInteger(text.Split("|")(2))
    End If
    If Not Operators.ConditionalCompareObjectGreaterEqual(objectValue, num, False) Then
        ModBase.Log(Conversions.ToString(Operators.ConcatenateObject(Operators.ConcatenateObject(Operators.ConcatenateObject("[Server] 需要下载最新正式版：", objectValue), " -> "), num)), ModBase.LogLevel.Normal, "出现错误")
        ModNet.NetDownloadByLoader(New String() { "https://github.com/Meloong-Git/PCL/raw/main/%E6%9C%80%E6%96%B0%E6%AD%A3%E5%BC%8F%E7%89%88.zip", String.Format("https://pcl2-server-1253424809.file.myqcloud.com/update/{0}.zip{{CDN}}", "Publi3") }, ModBase.PathTemp + "Latest.zip", LoaderToSyncProgress, New ModBase.FileChecker(1048576L, -1L, Nothing, True, False), False)
        ModBase.ExtractFile(ModBase.PathTemp + "Latest.zip", ModBase.PathTemp, Nothing, Nothing)
        File.Delete(ModBase.PathTemp + "Latest.zip")
        File.Delete(ModBase.PathTemp + "Latest.exe")
        FileSystem.Rename(ModBase.PathTemp + "Plain Craft Launcher 2.exe", ModBase.PathTemp + "Latest.exe")
        ModBase.Setup.[Set]("SystemHighestSavedBetaVersionReg", num, False, Nothing)
    End If
End Sub
```

但是……这一部分我虽然还原出了上述两个函数，却仍未能破解出来……

这就是标题里面”（未完成）“的含义了。

## 结束语

PCL 作为一个反编译拿来练手的项目我认为是相当不错的。

首先，它的项目体积足够让人晕头转向，但是又不至于让电脑都炸掉。里面蛛丝马迹很多。同时其外表做很多鉴权的函数给人一种假象，其实破解并不是很难。这里留下了很多漏洞和可以练习的地方，因此非常适合给想要练手的人玩玩。

反编译涉及到的编程知识面非常广，例如 RSA 部分需要你学习一点数学知识，同时多语言的转换还有助于你熟悉两种语言的思维模式

作为一个之前没有反编译过任何一个项目的人，我非常喜欢这种解密的感受。

基于本文章还原的 Python 破解脚本代码已经公开在 <https://github.com/Ignis-Studio/PCLThemeUnlock> ，可供参考。

感谢阅读。

## 参考文献

- [PCL2的反编译以及主题破解(除秋仪金)(修改版)](https://www.luogu.com/article/ughew4si)  · TheZihanGu · 洛谷专栏

- [PCL 反编译——加密和解密原理记录 - 盐木的小破窝](https://blog.ski.ink/2025/04/04/pcl-encrypt-and-decrypt/) · SaltWood233 · 个人博客
