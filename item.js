class ItemCard {
    static css = `
    .item {
        width: 180px;
        padding: 5px;
        background: linear-gradient(145deg, #f5f7fa, #e4e8f0);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        font-family: 'Segoe UI', sans-serif;
        cursor: pointer;
        user-select: none;
        justify-content: space-between;
        min-height: 40px;
    }

    .item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(to bottom, #6c757d, #495057);
    }

    .item.blue::before {
        background: linear-gradient(to bottom,rgb(172, 172, 241),rgb(28, 90, 235));
    }
    
    .item.red::before {
        background: linear-gradient(to bottom, #7d6c6c, #d50d51);
    }

    .item.green::before {
        background: linear-gradient(to bottom,rgb(120, 163, 112),rgb(13, 213, 30));
    }

    .item .info {
        margin-left: 10px;
    }

    .item .name {
        font-size: 14px;
        font-weight: 600;
        color: #2c3e50;
        flex: 1;
        min-width: 0;
    }

    .item .desc {
        font-size: 11px;
        color: #7f8c8d;
    }

    .item .num {
        font-size: 13px;
        font-weight: bold;
        min-width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 0 5px;
    }
`;
    static cards = {};

    static config_example = {
        type: "材料",
        name: "铁矿石",
        num: 1000,
    };

    constructor(config) {
        // 根据config加载
        this.config = config;
        // 根据配置，找到详细信息
        this.detail_data = get_item_detail_data(this.config.name);

        // 等待此资源的机器
        this.waiting_machine_cards = [];

        // 创建对应的el
        this.create_el();

        // 注册样式表
        insert_css("ItemCard", ItemCard.css);

        // 保存到单例，便于查找
        ItemCard.cards[config.name] = this;
    }

    create_el() {
        const div = document.createElement("div");
        div.className = "item";
        this.el = div;

        const info_div = document.createElement("div");
        info_div.className = "info";
        div.append(info_div);

        const name_div = document.createElement("div");
        name_div.className = "name";
        name_div.innerText = this.config.name;
        info_div.append(name_div);

        // 合成表展示
        div.addEventListener("click", (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            // 调用函数显示弹窗
            showRecipesDialog(this.config.name);
        });

        div.addEventListener("dblclick", (e) => {
            e.stopPropagation(); // 阻止事件冒泡
        });

        // 根据类型，设置颜色
        if (this.detail_data.type == "材料") div.classList.add("green");
        else if (this.detail_data.type == "机器") div.classList.add("blue");
        else if (this.detail_data.type == "电") div.classList.add("red");

        // 描述
        const desc_div = document.createElement("div");
        desc_div.className = "desc";
        desc_div.innerText = this.detail_data.desc;
        info_div.append(desc_div);

        // 数量显示（放在右侧）
        this.num_div = document.createElement("div");
        this.num_div.className = "num";
        this.num_div.innerText = formatNumber(this.config.num);
        div.append(this.num_div);
    }

    update() {
        // 当数量变化时，会调用此方法更新显示
        this.num_div.innerText = formatNumber(this.config.num);
    }

    static get_item(name, not_create = false) {
        if (ItemCard.cards.hasOwnProperty(name)) return ItemCard.cards[name];
        if (not_create) return null;

        const config = {
            name,
            num: 0,
            type: get_item_detail_data(name).type,
        };
        const card = new ItemCard(config);

        // 增加到data中
        // 特例：除了电
        if (!["发电", "用电", "供电率"].includes(config.name))
            window.dyson.data.items.push(config);

        // 自动加入 item_div
        window.dyson.item_div.append(card.el);

        return card;
    }

    static update_power_supply() {
        let a = ItemCard.get_item("发电").config.num;
        let b = ItemCard.get_item("用电").config.num;
        let r = 1;
        if (b > 0) r = Math.min(1, a / b);
        window.dyson.power_supply_rate = r;

        const c = ItemCard.get_item("供电率");
        c.config.num = r.toFixed(2);
        c.update();

        // 更新所有描述
        window.dyson.machine_cards.forEach((m) => m.update_manu_ui());
    }

    // 增加材料
    add(num) {
        this.config.num += num;
        this.update();

        // 通知正在等待该材料的机器尝试工作
        let machines = this.waiting_machine_cards;

        // 记录成功重启的机器
        let success_machine_ids = [];
        machines.forEach((machine) => {
            if (machine.start()) success_machine_ids.push(machine.config.id);
        });

        // 移除成功重启的机器
        this.waiting_machine_cards = machines.filter(
            (m) => !success_machine_ids.includes(m.config.id)
        );
    }

    // 检查材料是否充足
    check_num(num) {
        return this.config.num >= num;
    }

    // 消耗材料
    spend(num) {
        this.config.num -= num;
        this.update();
    }

    // 等待材料
    // 这里的machine必须是machine card，而不能是config
    // （大部分情况下，我们一般只需要传递config即可，所以默认我们都是在操作config，特此说明）
    add_waiting_machine(machine_card) {
        // 判断该机器是否已经处于等待列表中
        const m_ids = this.waiting_machine_cards.map((m) => m.config.id);

        if (m_ids.includes(machine_card.config.id)) return;

        // 将机器添加到该材料的等待列表中
        this.waiting_machine_cards.push(machine_card);
    }
}
