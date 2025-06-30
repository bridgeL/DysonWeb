// 所有数据都存在这里
class Data {
    constructor() {
        this.load();
        // 每30s自动保存
        setInterval(() => this.save(), 30_000);
    }

    create() {
        // 设置属性初始值
        // ...

        // 物品
        this.items = [
            { type: "机器", name: "我", num: 3 },
            { type: "机器", name: "制造台MK.I", num: 1 },
            { type: "机器", name: "电弧熔炉", num: 1 },
            { type: "机器", name: "采矿机", num: 1 },
            { type: "机器", name: "风力涡轮机", num: 1 },
            { type: "机器", name: "太阳能板", num: 1 },
            { type: "机器", name: "火力发电站", num: 1 },
        ];

        // 机器
        this.machines = [];

        // 机器id
        this._machine_id = 0;

        this.global_offset = [0, 0];
    }

    load() {
        let data = localStorage.getItem("dyson");
        if (data == null) {
            this.create();
            this.save();
        } else {
            data = JSON.parse(data);
            // 解析数据，赋值
            // ...

            this.items = data.items;
            this.machines = data.machines;
            this._machine_id = data._machine_id;
            this.global_offset = data.global_offset;

            // TODO:
            // 修改探索难度
            // ...
        }
    }

    save() {
        let data = {};
        // 将属性变为json数据
        // ...

        // 按照item.type来排序
        data.items = this.items.sort((a, b) => a.type.localeCompare(b.type));

        data.machines = this.machines;
        data._machine_id = this._machine_id;
        data.global_offset = this.global_offset;

        data = JSON.stringify(data);
        localStorage.setItem("dyson", data);

        console.log("数据已保存");
    }

    create_machine_id() {
        let id = this._machine_id;
        this._machine_id += 1;
        return id;
    }
}
