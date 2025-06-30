const game_library = [
    // 特殊
    {
        type: "电",
        name: "用电",
        desc: "",
    },
    {
        type: "电",
        name: "发电",
        desc: "",
    },
    {
        type: "电",
        name: "供电率",
        desc: "供电率低于1时，机器的效率会大大降低",
    },
    // 资源
    {
        type: "资源",
        name: "铁矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "铜矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "钛矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "煤矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "石矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "硅矿脉",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "水源",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "原油资源",
        desc: "通过探索发现",
    },
    {
        type: "资源",
        name: "硫酸湖",
        desc: "珍奇资源。通过探索发现",
    },
    {
        type: "资源",
        name: "有机晶体矿脉",
        desc: "珍奇资源。通过探索发现",
    },
    {
        type: "资源",
        name: "光栅石矿脉",
        desc: "珍奇资源。通过探索发现",
    },
    // 材料
    {
        type: "材料",
        name: "木材",
        desc: "还未设计获取手段",
    },
    {
        type: "材料",
        name: "植物燃料",
        desc: "还未设计获取手段",
    },
    {
        type: "材料",
        name: "铁矿石",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "铜矿石",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "煤矿石",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "石头",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "硅石",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "钛矿石",
        desc: "可用于冶炼基础材料",
    },
    {
        type: "材料",
        name: "铁块",
        desc: "基础材料",
    },
    {
        type: "材料",
        name: "磁铁",
        desc: "基础磁性材料",
    },
    {
        type: "材料",
        name: "钢材",
        desc: "坚固的建筑材料",
    },
    {
        type: "材料",
        name: "齿轮",
        desc: "用于传动的标准组件",
    },
    {
        type: "材料",
        name: "铜块",
        desc: "基本原材料",
    },
    {
        type: "材料",
        name: "磁线圈",
        desc: "基本的电磁元件",
    },
    {
        type: "材料",
        name: "电动机",
        desc: "基本的动力系统部件",
    },
    {
        type: "材料",
        name: "电磁涡轮",
        desc: "用于制造更高级的磁场发生装置",
    },
    {
        type: "材料",
        name: "超级磁场环",
        desc: "制造高性能材料的必备组件",
    },
    {
        type: "材料",
        name: "高纯硅块",
        desc: "纯度更高的硅晶体",
    },
    {
        type: "材料",
        name: "钛块",
        desc: "重量轻，强度高的优质材料",
    },
    {
        type: "材料",
        name: "钛合金",
        desc: "坚韧的高强度合金材料",
    },
    {
        type: "材料",
        name: "电路板",
        desc: "基本的电学元件",
    },
    {
        type: "材料",
        name: "处理器",
        desc: "大规模集成电路器件",
    },
    {
        type: "材料",
        name: "石材",
        desc: "常见的基础材料",
    },
    {
        type: "材料",
        name: "玻璃",
        desc: "制作棱镜等光学元件的原料",
    },
    {
        type: "材料",
        name: "氢",
        desc: "宇宙中含量最多的元素",
    },
    {
        type: "材料",
        name: "重氢",
        desc: "一种稳定的氢同位素",
    },
    {
        type: "材料",
        name: "高能石墨",
        desc: "优质的晶体石墨",
    },
    {
        type: "材料",
        name: "金刚石",
        desc: "非常坚硬的晶体",
    },
    {
        type: "材料",
        name: "水",
        desc: "多喝开水",
    },
    {
        type: "材料",
        name: "硫酸",
        desc: "初级原油化工产品",
    },
    {
        type: "材料",
        name: "钛晶石",
        desc: "通过参杂精确比例的有机晶体获得的高强度材料",
    },
    {
        type: "材料",
        name: "有机晶体",
        desc: "高级原油化工产品",
    },
    {
        type: "材料",
        name: "微晶元件",
        desc: "制造处理器的重要原料",
    },
    // 机器
    {
        type: "机器",
        sub_type: "采矿设备",
        name: "采矿机",
        desc: "开采各类矿脉",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "采矿设备",
        name: "大型采矿机",
        desc: "高速开采各类矿脉",
        speed_up_rate: 10,
    },
    {
        type: "机器",
        sub_type: "冶炼设备",
        name: "电弧熔炉",
        desc: "冶炼各类矿石",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "冶炼设备",
        name: "位面设备",
        desc: "高速冶炼各类矿石",
        speed_up_rate: 3,
    },
    {
        type: "机器",
        sub_type: "制造台",
        name: "制造台MK.I",
        desc: "低速制造各类材料和机器",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "制造台",
        name: "制造台MK.II",
        desc: "高速制造各类材料和机器",
        speed_up_rate: 2,
    },
    {
        type: "机器",
        sub_type: "制造台",
        name: "制造台MK.III",
        desc: "极速制造各类材料和机器",
        speed_up_rate: 3,
    },
    {
        type: "机器",
        sub_type: "风力涡轮机",
        name: "风力涡轮机",
        desc: "通过风力发电",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "太阳能板",
        name: "太阳能板",
        desc: "接收太阳能量",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "火力发电站",
        name: "火力发电站",
        desc: "燃烧化石能源发电",
        speed_up_rate: 1,
    },
    // 我
    {
        type: "机器",
        sub_type: "我",
        name: "我",
        desc: "宇宙机器人",
        speed_up_rate: 1,
    },
    // 化工设备
    {
        type: "机器",
        sub_type: "化工设备",
        name: "化工厂",
        desc: "低速化工工厂",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "化工设备",
        name: "量子化工厂",
        desc: "高速化工工厂",
        speed_up_rate: 3,
    },
    // 其他
    {
        type: "机器",
        sub_type: "采油机",
        name: "采油机",
        desc: "采油机",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "原油精炼厂",
        name: "原油精炼厂",
        desc: "原油精炼厂",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "抽水站",
        name: "抽水站",
        desc: "抽水站",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "分馏塔",
        name: "分馏塔",
        desc: "分馏塔",
        speed_up_rate: 1,
    },
    {
        type: "机器",
        sub_type: "粒子对撞机",
        name: "粒子对撞机",
        desc: "粒子对撞机",
        speed_up_rate: 1,
    },
];

const manufacture_library = [
    // 我
    {
        name: "探索常规资源",
        machine: "我",
        period: 1_000,
        elec: 0, // 用电
        input: [],
        output: [{ name: "常规资源点", num: 1 }],
    },
    {
        name: "探索稀有资源",
        machine: "我",
        period: 10_000,
        elec: 0, // 用电
        input: [],
        output: [{ name: "稀有资源点", num: 1 }],
    },
    {
        name: "探索珍奇资源",
        machine: "我",
        period: 100_000,
        elec: 0, // 用电
        input: [],
        output: [{ name: "珍奇资源点", num: 1 }],
    },
    {
        name: "探索液体资源",
        machine: "我",
        period: 1_000,
        elec: 0, // 用电
        input: [],
        output: [{ name: "液体资源点", num: 1 }],
    },
    {
        name: "复制！！",
        machine: "我",
        period: 1_000,
        elec: 0, // 用电
        input: [{ name: "处理器", num: 100 }],
        output: [{ name: "我", num: 1 }],
    },
    // 采矿设备
    {
        name: "铁矿石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1, // 用电
        input: [{ name: "铁矿脉", num: 1 }],
        output: [{ name: "铁矿石", num: 1 }],
    },
    {
        name: "铜矿石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "铜矿脉", num: 1 }],
        output: [{ name: "铜矿石", num: 1 }],
    },
    {
        name: "钛矿石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "钛矿脉", num: 1 }],
        output: [{ name: "钛矿石", num: 1 }],
    },
    {
        name: "煤矿石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "煤矿脉", num: 1 }],
        output: [{ name: "煤矿石", num: 1 }],
    },
    {
        name: "石头采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "石矿脉", num: 1 }],
        output: [{ name: "石头", num: 1 }],
    },
    {
        name: "硅石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "硅矿脉", num: 1 }],
        output: [{ name: "硅石", num: 1 }],
    },
    {
        name: "有机晶体采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1, // 用电
        input: [{ name: "有机晶体矿脉", num: 1 }],
        output: [{ name: "有机晶体", num: 1 }],
    },
    {
        name: "光栅石采集",
        machine: "采矿设备",
        period: 1_000,
        elec: 1, // 用电
        input: [{ name: "光栅石矿脉", num: 1 }],
        output: [{ name: "光栅石", num: 1 }],
    },
    // 冶炼设备
    {
        name: "铁块",
        machine: "冶炼设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "铁矿石", num: 1 }],
        output: [{ name: "铁块", num: 1 }],
    },
    {
        name: "铜块",
        machine: "冶炼设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "铜矿石", num: 1 }],
        output: [{ name: "铜块", num: 1 }],
    },
    {
        name: "磁铁",
        machine: "冶炼设备",
        period: 1_500,
        elec: 1,
        input: [{ name: "铁矿石", num: 1 }],
        output: [{ name: "磁铁", num: 1 }],
    },
    {
        name: "钢材",
        machine: "冶炼设备",
        period: 3_000,
        elec: 1,
        input: [{ name: "铁块", num: 3 }],
        output: [{ name: "钢材", num: 1 }],
    },
    {
        name: "高纯硅块",
        machine: "冶炼设备",
        period: 2_000,
        elec: 1,
        input: [{ name: "硅石", num: 2 }],
        output: [{ name: "高纯硅块", num: 1 }],
    },
    {
        name: "硅石",
        machine: "冶炼设备",
        period: 10_000,
        elec: 1,
        input: [{ name: "石头", num: 10 }],
        output: [{ name: "硅石", num: 1 }],
    },
    {
        name: "钛块",
        machine: "冶炼设备",
        period: 2_000,
        elec: 1,
        input: [{ name: "钛矿石", num: 2 }],
        output: [{ name: "钛块", num: 1 }],
    },
    {
        name: "钛合金",
        machine: "冶炼设备",
        period: 12_000,
        elec: 1,
        input: [
            { name: "钛块", num: 4 },
            { name: "钢材", num: 4 },
            { name: "硫酸", num: 8 },
        ],
        output: [{ name: "钛合金", num: 4 }],
    },
    {
        name: "石材",
        machine: "冶炼设备",
        period: 1_000,
        elec: 1,
        input: [{ name: "石头", num: 1 }],
        output: [{ name: "石材", num: 1 }],
    },
    {
        name: "玻璃",
        machine: "冶炼设备",
        period: 2_000,
        elec: 1,
        input: [{ name: "石头", num: 2 }],
        output: [{ name: "玻璃", num: 1 }],
    },
    {
        name: "高能石墨",
        machine: "冶炼设备",
        period: 2_000,
        elec: 1,
        input: [{ name: "煤矿石", num: 2 }],
        output: [{ name: "高能石墨", num: 1 }],
    },
    {
        name: "金刚石",
        machine: "冶炼设备",
        period: 2_000,
        elec: 1,
        input: [{ name: "高能石墨", num: 1 }],
        output: [{ name: "金刚石", num: 1 }],
    },
    // 制造台
    {
        name: "齿轮",
        machine: "制造台",
        period: 1_000,
        elec: 1,
        input: [{ name: "铁块", num: 1 }],
        output: [{ name: "齿轮", num: 1 }],
    },
    {
        name: "磁线圈",
        machine: "制造台",
        period: 1_000,
        elec: 1,
        input: [
            { name: "磁铁", num: 2 },
            { name: "铜块", num: 1 },
        ],
        output: [{ name: "磁线圈", num: 2 }],
    },
    {
        name: "电动机",
        machine: "制造台",
        period: 2_000,
        elec: 1,
        input: [
            { name: "铁块", num: 2 },
            { name: "齿轮", num: 1 },
            { name: "磁线圈", num: 1 },
        ],
        output: [{ name: "电动机", num: 1 }],
    },
    {
        name: "电磁涡轮",
        machine: "制造台",
        period: 2_000,
        elec: 1,
        input: [
            { name: "电动机", num: 2 },
            { name: "磁线圈", num: 2 },
        ],
        output: [{ name: "电磁涡轮", num: 1 }],
    },
    {
        name: "超级磁场环",
        machine: "制造台",
        period: 2_000,
        elec: 1,
        input: [
            { name: "电动机", num: 2 },
            { name: "磁线圈", num: 2 },
        ],
        output: [{ name: "电磁涡轮", num: 1 }],
    },
    {
        name: "电路板",
        machine: "制造台",
        period: 1_000,
        elec: 1,
        input: [
            { name: "铁块", num: 2 },
            { name: "铜块", num: 1 },
        ],
        output: [{ name: "电路板", num: 2 }],
    },
    {
        name: "微晶元件",
        machine: "制造台",
        period: 2_000,
        elec: 1,
        input: [
            { name: "高纯硅块", num: 2 },
            { name: "铜块", num: 1 },
        ],
        output: [{ name: "微晶元件", num: 1 }],
    },
    {
        name: "处理器",
        machine: "制造台",
        period: 3_000,
        elec: 1,
        input: [
            { name: "电路板", num: 2 },
            { name: "微晶元件", num: 2 },
        ],
        output: [{ name: "处理器", num: 1 }],
    },
    {
        name: "电弧熔炉",
        machine: "制造台",
        period: 3_000,
        elec: 1,
        input: [
            { name: "铁块", num: 4 },
            { name: "石材", num: 2 },
            { name: "电路板", num: 4 },
            { name: "磁线圈", num: 2 },
        ],
        output: [{ name: "电弧熔炉", num: 1 }],
    },
    {
        name: "位面熔炉",
        machine: "制造台",
        period: 5_000,
        elec: 1,
        input: [
            { name: "单极磁石", num: 15 },
            { name: "位面过滤器", num: 4 },
            { name: "框架材料", num: 5 },
            { name: "电弧熔炉", num: 1 },
        ],
        output: [{ name: "位面熔炉", num: 1 }],
    },
    {
        name: "制造台MK.I",
        machine: "制造台",
        period: 2_000,
        elec: 1,
        input: [
            { name: "铁块", num: 4 },
            { name: "齿轮", num: 8 },
            { name: "电路板", num: 4 },
        ],
        output: [{ name: "制造台MK.I", num: 1 }],
    },
    {
        name: "制造台MK.II",
        machine: "制造台",
        period: 3_000,
        elec: 1,
        input: [
            { name: "制造台MK.I", num: 1 },
            { name: "石墨烯", num: 8 },
            { name: "处理器", num: 4 },
        ],
        output: [{ name: "制造台MK.II", num: 1 }],
    },
    {
        name: "制造台MK.III",
        machine: "制造台",
        period: 4_000,
        elec: 1,
        input: [
            { name: "制造台MK.II", num: 1 },
            { name: "粒子宽带", num: 8 },
            { name: "量子芯片", num: 2 },
        ],
        output: [{ name: "制造台MK.III", num: 1 }],
    },
    {
        name: "采矿机",
        machine: "制造台",
        period: 3_000,
        elec: 1,
        input: [
            { name: "铁块", num: 4 },
            { name: "电路板", num: 2 },
            { name: "磁线圈", num: 2 },
            { name: "齿轮", num: 2 },
        ],
        output: [{ name: "采矿机", num: 1 }],
    },
    {
        name: "大型采矿机",
        machine: "制造台",
        period: 20_000,
        elec: 1,
        input: [
            { name: "钛合金", num: 20 },
            { name: "框架材料", num: 10 },
            { name: "超级磁场环", num: 10 },
            { name: "量子芯片", num: 4 },
            { name: "光栅石", num: 40 },
        ],
        output: [{ name: "大型采矿机", num: 1 }],
    },
    {
        name: "化工厂",
        machine: "制造台",
        period: 5_000,
        elec: 1,
        input: [
            { name: "钢材", num: 8 },
            { name: "石材", num: 8 },
            { name: "玻璃", num: 8 },
            { name: "电路板", num: 2 },
        ],
        output: [{ name: "化工厂", num: 1 }],
    },
    {
        name: "量子化工厂",
        machine: "制造台",
        period: 10_000,
        elec: 1,
        input: [
            { name: "化工厂", num: 1 },
            { name: "钛化玻璃", num: 10 },
            { name: "奇异物质", num: 3 },
            { name: "量子芯片", num: 3 },
        ],
        output: [{ name: "量子化工厂", num: 1 }],
    },
    {
        name: "原油精炼厂",
        machine: "制造台",
        period: 6_000,
        elec: 1,
        input: [
            { name: "钢材", num: 10 },
            { name: "石材", num: 10 },
            { name: "电路板", num: 6 },
            { name: "电浆激发器", num: 6 },
        ],
        output: [{ name: "原油精炼厂", num: 1 }],
    },
    {
        name: "采油机",
        machine: "制造台",
        period: 8_000,
        elec: 1,
        input: [
            { name: "钢材", num: 12 },
            { name: "石材", num: 12 },
            { name: "电路板", num: 6 },
            { name: "电浆激发器", num: 4 },
        ],
        output: [{ name: "采油机", num: 1 }],
    },
    {
        name: "抽水站",
        machine: "制造台",
        period: 4_000,
        elec: 1,
        input: [
            { name: "铁块", num: 8 },
            { name: "石材", num: 4 },
            { name: "电动机", num: 4 },
            { name: "电路板", num: 2 },
        ],
        output: [{ name: "抽水站", num: 1 }],
    },
    {
        name: "分馏塔",
        machine: "制造台",
        period: 3_000,
        elec: 1,
        input: [
            { name: "钢材", num: 8 },
            { name: "石材", num: 4 },
            { name: "玻璃", num: 4 },
            { name: "处理器", num: 1 },
        ],
        output: [{ name: "分馏塔", num: 1 }],
    },
    {
        name: "粒子对撞机",
        machine: "制造台",
        period: 15_000,
        elec: 1,
        input: [
            { name: "钛合金", num: 20 },
            { name: "框架材料", num: 20 },
            { name: "超级磁场环", num: 25 },
            { name: "石墨烯", num: 10 },
            { name: "处理器", num: 8 },
        ],
        output: [{ name: "粒子对撞机", num: 1 }],
    },
    {
        name: "有机晶体(原始)",
        machine: "制造台",
        period: 6_000,
        elec: 1,
        input: [
            { name: "木材", num: 20 },
            { name: "植物燃料", num: 30 },
            { name: "水", num: 10 },
        ],
        output: [{ name: "有机晶体", num: 1 }],
    },
    {
        name: "钛晶石",
        machine: "制造台",
        period: 4_000,
        elec: 1,
        input: [
            { name: "有机晶体", num: 1 },
            { name: "钛块", num: 3 },
        ],
        output: [{ name: "钛晶石", num: 1 }],
    },
    {
        name: "风力涡轮机",
        machine: "制造台",
        period: 4_000,
        elec: 1,
        input: [
            { name: "铁块", num: 6 },
            { name: "齿轮", num: 1 },
            { name: "磁线圈", num: 3 },
        ],
        output: [{ name: "风力涡轮机", num: 1 }],
    },
    {
        name: "火力发电站",
        machine: "制造台",
        period: 5_000,
        elec: 1,
        input: [
            { name: "铁块", num: 10 },
            { name: "石材", num: 4 },
            { name: "齿轮", num: 4 },
            { name: "磁线圈", num: 4 },
        ],
        output: [{ name: "火力发电站", num: 1 }],
    },
    {
        name: "太阳能板",
        machine: "制造台",
        period: 6_000,
        elec: 1,
        input: [
            { name: "铜块", num: 10 },
            { name: "高纯硅块", num: 10 },
            { name: "电路板", num: 5 },
        ],
        output: [{ name: "太阳能板", num: 1 }],
    },
    // 发电设备
    {
        name: "风力发电",
        machine: "风力涡轮机",
        period: 1_000,
        elec: -1,
        input: [],
        output: [],
    },
    {
        name: "太阳能发电",
        machine: "太阳能板",
        period: 1_000,
        elec: -1,
        input: [],
        output: [],
    },
    {
        name: "烧煤",
        machine: "火力发电站",
        period: 1_000,
        elec: -6,
        input: [{ name: "煤矿石", num: 1 }],
        output: [],
    },
    // 化工设备
    {
        name: "塑料",
        machine: "化工设备",
        period: 3_000,
        elec: 1,
        input: [
            { name: "精炼油", num: 2 },
            { name: "高能石墨", num: 1 },
        ],
        output: [{ name: "塑料", num: 1 }],
    },
    {
        name: "有机晶体",
        machine: "化工设备",
        period: 6_000,
        elec: 1,
        input: [
            { name: "塑料", num: 2 },
            { name: "精炼油", num: 1 },
            { name: "水", num: 1 },
        ],
        output: [{ name: "有机晶体", num: 1 }],
    },
    // 原油
    {
        name: "石油",
        machine: "采油机",
        period: 1_000,
        elec: 1,
        input: [{ name: "原油资源", num: 1 }],
        output: [{ name: "原油", num: 1 }],
    },
    {
        name: "等离子精炼",
        machine: "原油精炼厂",
        period: 4_000,
        elec: 1,
        input: [{ name: "原油", num: 2 }],
        output: [
            { name: "氢", num: 1 },
            { name: "精炼油", num: 2 },
        ],
    },
    {
        name: "X射线裂解",
        machine: "原油精炼厂",
        period: 4_000,
        elec: 1,
        input: [
            { name: "氢", num: 2 },
            { name: "精炼油", num: 1 },
        ],
        output: [
            { name: "氢", num: 3 },
            { name: "高能石墨", num: 1 },
        ],
    },
    {
        name: "重整精炼",
        machine: "原油精炼厂",
        period: 4_000,
        elec: 1,
        input: [
            { name: "氢", num: 1 },
            { name: "精炼油", num: 2 },
            { name: "煤矿石", num: 1 },
        ],
        output: [{ name: "精炼油", num: 3 }],
    },
    // 分馏
    {
        name: "重氢分馏",
        machine: "分馏塔",
        period: 1_000,
        elec: 1,
        input: [{ name: "氢", num: 100 }],
        output: [
            { name: "氢", num: 99 },
            { name: "重氢", num: 1 },
        ],
    },
    // 抽水站
    {
        name: "水",
        machine: "抽水站",
        period: 100,
        elec: 1,
        input: [{ name: "水源", num: 1 }],
        output: [{ name: "水", num: 1 }],
    },
    {
        name: "硫酸",
        machine: "抽水站",
        period: 100,
        elec: 1,
        input: [{ name: "硫酸湖", num: 1 }],
        output: [{ name: "硫酸", num: 1 }],
    },
];

const machine_library = game_library.filter((d) => d.type == "机器");

// 获取机器的详细信息
const get_machine_detail_data = (name) => {
    const ms = machine_library.filter((d) => d.name == name);
    if (ms.length == 0) {
        console.warn("没找到对应机器", name);
        return null;
    }
    return ms[0];
};

// 获取物品的详细信息
const get_item_detail_data = (name) => {
    const ms = game_library.filter((d) => d.name == name);
    if (ms.length == 0) {
        console.warn("没找到对应物品", name);
        return null;
    }
    return ms[0];
};

const enhanced_manufacture_library = {
    // 除了部分合成表，其他的我都能造
    我: copy_dict(manufacture_library)
        .filter(
            (d) =>
                ![
                    "钢材",
                    "光子合并器",
                    "晶格硅",
                    "硅石",
                    "钛合金",
                    "卡西米尔晶体",
                    "金刚石",
                    "硫酸",
                    "粒子容器(高效)",
                    "风力发电",
                    "太阳能发电",
                    "烧煤",
                    "水",
                    "硫酸",
                    "塑料",
                    "有机晶体",
                    "等离子精炼",
                    "X射线裂解",
                    "重整精炼",
                    "重氢分馏",
                    "重氢",
                    "石油",
                ].includes(d.name)
        )
        .map((d) => {
            d.elec = 0;
            d.machine = "我";
            return d;
        }),
};

{
    [
        "制造台",
        "冶炼设备",
        "采矿设备",
        "太阳能板",
        "风力涡轮机",
        "火力发电站",
        "分馏塔",
        "采油机",
        "粒子对撞机",
        "抽水站",
        "原油精炼厂",
    ].forEach(
        (name) =>
            (enhanced_manufacture_library[name] = manufacture_library.filter(
                (d) => d.machine == name
            ))
    );
}

const get_manufacture = (machine_sub_type, manu_name) => {
    const ms = enhanced_manufacture_library[machine_sub_type];
    if (!ms) {
        console.warn("未知的机器子类型", machine_sub_type);
        return null;
    }

    const rs = ms.filter((d) => d.name == manu_name);
    if (rs.length == 0) {
        console.warn("没找到对应合成表", machine_sub_type, manu_name);
        return null;
    }

    return rs[0];
};
