# Haoqi “Hello” 果冻交互技术拆解

分析日期：2026-07-23  
目标站点：https://haoqi.design/  
范围：只分析首页中央 `Hello` 3D 物体与鼠标“拉扯果冻”效果；排除贴纸掉落、项目卡片和其他转场。  
状态：只读分析，未修改 GTAI 网站。

## 1. 核心判断

这个效果不是一个简单的 CSS hover，也不是把 `Hello` 模型顶点直接做软体变形。

它由三层叠加产生：

1. **静态 3D 字体模型**
   - 文件：`/model/hello.gltf`
   - 约 24,020 个顶点，内嵌约 1.04 MB buffer。
   - 没有 morph target，也没有骨骼软体动画。

2. **玻璃折射材质**
   - 把背景先渲染进离屏纹理，再用模型表面法线进行多次折射采样。
   - 加入色散、Fresnel 边缘光、高光和双色玻璃 tint。
   - 鼠标位置控制光源方向，使高光沿表面滑动。

3. **全屏 GPU 流体位移后处理**
   - 鼠标速度注入低分辨率速度场。
   - 经过 curl、vorticity、divergence、pressure、gradient subtraction 和 advection 多个 pass。
   - 最后用速度场偏移整张画面的 UV，产生局部被拖拽、回流和消散的视觉。
   - 这才是“像扯果冻”的主要来源。

结论：**模型本身是硬的，画面像液体一样被鼠标拖动。**

## 2. 从公开 bundle 定位出的真实参数

### 流体后处理

| 项目 | Haoqi 实际值 | 作用 |
|---|---:|---|
| Simulation resolution | `160` | 低分辨率速度场，刻意保留柔软与低成本 |
| Strength | `0.3` | 最终画面位移强度 |
| Splat radius | `1.5` | 鼠标力场影响范围 |
| Velocity scale | `1` | 鼠标移动速度注入力度 |
| Chromatic strength | `0.002` | 速度较高处的轻微彩色边缘 |
| Pressure iterations | `4` | 压力求解次数；够用但不追求科学精度 |
| Curl strength | `0` | 默认没有额外涡旋增强 |
| Velocity dissipation | `3` | 鼠标离开后快速消散、回稳 |
| Display samples | `4` | 最终位移采样次数 |
| Idle cutoff | `600ms` | 鼠标停止后关闭流体效果，节省 GPU |

流体步骤：

```text
pointer delta
    ↓
velocity splat
    ↓
curl / vorticity
    ↓
divergence
    ↓
pressure solve × 4
    ↓
subtract pressure gradient
    ↓
advect + dissipate
    ↓
UV displacement + slight chromatic highlight
```

### 玻璃模型

| 项目 | Haoqi 实际值 | 作用 |
|---|---:|---|
| GLTF scale | desktop `22` / mobile `19` | 大尺寸中央标志 |
| Refraction power | `0.72` | 背景透过玻璃后的弯折强度 |
| Chromatic aberration | `0.14` | RGB 分离 |
| Loop count | `3` | 每像素折射循环次数 |
| Light shininess | `120` | 很紧、很亮的高光 |
| Fresnel power | light `1` / dark `3` | 边缘反射曲线 |
| Model rotation | `[0°, 4°, 0°]` | 几乎正面，只留轻微立体角度 |
| Entry rotation | `[0°, 240°, 0°] → [0°, 4°, 0°]` | 首次出现时旋转入场 |
| Float motion | `0.18 sin(1.2t) + 0.06 sin(0.6t)` | 非常轻的上下漂浮 |

### 鼠标与相机

| 项目 | Haoqi 实际值 | 作用 |
|---|---:|---|
| Pointer coordinates | viewport UV `0–1` | 全局鼠标输入 |
| Camera parallax strength | `1.4` | 画面随鼠标轻微偏移 |
| Vertical parallax ratio | `0.6` | 垂直移动弱于水平 |
| Camera rotation factor | `0.12` | 轻微朝反方向看 |
| Follow lag | `0.18` | 鼠标在页面内时的滞后 |
| Leave lag | `0.05` | 离开页面后更慢回中 |
| Light angular damping | lambda `6` | 高光沿玻璃表面平滑追随 |

## 3. 为什么它看起来像“真的拉伸”

视觉系统把三种运动误认为物体变形：

- **局部 UV 被流速拉长**：鼠标经过的区域产生拖尾，物体边缘短暂错位。
- **高光沿曲面追鼠标**：眼睛会把移动高光理解为表面发生形变。
- **相机和物体存在相对视差**：模型整体有一点“跟手又滞后”的惯性。

如果只实现其中一层：

| 只做的部分 | 结果 |
|---|---|
| 只做相机跟随 | 像 3D 卡片倾斜，不像果冻 |
| 只做弹簧缩放 | 像按钮 bounce，不像被扯动 |
| 只做玻璃材质 | 质感漂亮，但鼠标没有拖拽重量 |
| 只做噪声顶点变形 | 像呼吸或融化，缺少鼠标速度方向 |
| 玻璃 + 流体 UV + 轻视差 | 接近原站观感 |

## 4. 对 GTAI 的推荐复刻方式

GTAI 当前是无打包器的原生 HTML/CSS/JS 项目，但已经在 `app.js` 中按需载入 Three.js，因此不需要为了这一效果迁移到 React Three Fiber。

### 推荐：单一 3D 标志 + 局部流体交互

把现有 Home 的多重动效收敛成一个中央视觉对象，例如：

- 3D `GTAI` 字标；
- 抽象的透明铬银/玻璃徽章；
- 五位艺人共用的“talent portal”符号。

鼠标靠近该对象时：

1. 玻璃高光跟随鼠标；
2. 鼠标速度注入流体场；
3. 只在对象周围或 Hero Canvas 内做 UV 位移；
4. 停止移动约 `500–700ms` 后自然回稳；
5. 不加入贴纸、粒子掉落、物理文字或额外 cursor trail。

### 技术结构

```text
HTML hero copy
    │
    ├── WebGL canvas
    │     ├── background capture / simple environment texture
    │     ├── GLTF wordmark mesh
    │     ├── glass shader
    │     └── fluid post-process pass
    │
    └── semantic CTA and navigation remain normal DOM
```

不建议把整个页面 DOM 截进 WebGL；只让 Hero Canvas 承担标志与其附近的视觉，更稳、更清晰。

## 5. 建议参数：借鉴手感，不照抄强度

Haoqi 的效果服务个人实验型作品集；GTAI 首页还要承载艺人入口，因此建议更克制。

| Haoqi 原效果 | GTAI 建议 |
|---|---|
| 全屏流体位移 | 限定 Hero 或中央对象影响区域 |
| `strength 0.3` | 从 `0.18–0.24` 开始 |
| `radius 1.5` | `1.0–1.3`，避免大面积晃动 |
| `chromatic 0.002` | `0.0008–0.0015` |
| camera strength `1.4` | `0.6–0.9` |
| parallax lag `0.18` | `0.12–0.18` |
| pressure iterations `4` | 保持 `4` |
| simulation `160` | 桌面 `160`，低性能设备 `96–128` |
| 600ms idle cutoff | 保持 `600ms` 左右 |

## 6. 动效质量与无障碍

| 原站行为 | GTAI 应采用 |
|---|---|
| 桌面精细指针启用流体 | 保持，仅在 `hover:hover` 且 `pointer:fine` 时启用 |
| 移动端不启用完整流体 | 保持，移动端展示静态玻璃或非常轻的自动漂浮 |
| `prefers-reduced-motion` 关闭效果 | 必须保留，退化为静态 3D/静态图片 |
| 鼠标停下后关闭模拟 | 保持，减少持续 GPU 占用 |
| 页面不可见仍可能存在渲染链 | GTAI 应在 `visibilitychange`、离开 Home 时暂停 RAF |

## 7. 性能预算

推荐目标：

- 桌面 60fps；中低端设备至少 45fps。
- DPR 上限 `1.5`，高端设备最多 `2`。
- 流体模拟纹理 `160 × aspect`，不跟屏幕像素一比一。
- 玻璃折射采样 3 次，流体最终显示采样 3–4 次。
- 单个 GLTF 控制在 1 MB 左右、25k 顶点以内。
- 首屏加载失败时，HTML 文案和 CTA 必须完整存在。

风险：

- Safari 的半浮点 render target、颜色空间和透明合成需要单独验证。
- 玻璃 FBO + 多 pass 流体比普通 Three.js 物体明显更重。
- 如果继续保留现有物理字块、角色循环和 Canvas 动画，会重新造成“Home 太乱”。

## 8. 结论

值得借鉴的不是 `Hello` 这个字，而是它把全部惊喜集中在一个对象上的方式。

对 GTAI 最合适的版本是：

> 一个中央 3D 品牌标志，带玻璃折射；鼠标移动时以低分辨率流体场产生局部拖拽和回流，叠加轻微相机视差；移动端与 reduced-motion 退化为静态效果。除此之外不加掉落贴纸、不加物理散件。

这能保留“高级、可玩、记得住”的感觉，同时不会重复当前 Home 多个动效互相抢注意力的问题。
