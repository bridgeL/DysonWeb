// 程序入口
const init = () => {
    // 全局变量
    window.dyson = {};

    // 存储数据
    const data = new Data();
    // 放入全局引用
    window.dyson.data = data;

    // main div
    const main_div = document.querySelector("#main");
    window.dyson.main_div = main_div;
    main_div.style = "width: 100vw; height: 100vh;";

    // item div
    const item_div = document.createElement("div");
    window.dyson.item_div = item_div;
    item_div.style =
        "display: flex; flex-direction: column; position: absolute; top: 0; right: 0; flex-wrap: wrap-reverse; height: 100vh; z-index: 100;";
    main_div.append(item_div);

    // 避免重复插入css
    window.dyson.css = [];

    // 当前时间戳
    window.dyson.t = Date.now();

    // 供电率
    window.dyson.power_supply_rate = 1;

    // 所有机器
    const machine_cards = [];
    window.dyson.machine_cards = machine_cards;

    // 根据data还原之前的物品
    for (let i = 0; i < data.items.length; i++) {
        item_div.append(new ItemCard(data.items[i]).el);
    }

    // 根据data还原之前的机器
    for (let i = 0; i < data.machines.length; i++) {
        const m = new MachineCard(data.machines[i]);
        machine_cards.push(m);
        main_div.append(m.el);
    }

    {
        // 全局变量记录拖拽状态
        let isDragging = false;
        let dragStartPos = { x: 0, y: 0 };
        let dragStartOffset = { x: 0, y: 0 };

        // 在main_div上添加鼠标事件监听
        main_div.addEventListener("mousedown", startDrag);
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", endDrag);
        document.addEventListener("mouseleave", endDrag); // 防止鼠标离开窗口时卡住

        function startDrag(e) {
            // 排除按钮点击（如果需要在按钮上操作不要触发拖拽）
            if (e.target.tagName === "BUTTON") return;

            isDragging = true;
            dragStartPos = {
                x: e.clientX,
                y: e.clientY,
            };
            dragStartOffset = {
                x: data.global_offset[0],
                y: data.global_offset[1],
            };

            // 更改光标样式为抓取
            main_div.style.cursor = "grabbing";
            e.preventDefault(); // 防止文本选中
        }

        function handleDrag(e) {
            if (!isDragging) return;

            // 计算偏移量
            const dx = e.clientX - dragStartPos.x;
            const dy = e.clientY - dragStartPos.y;

            // 更新全局偏移量
            data.global_offset = [
                dragStartOffset.x + dx,
                dragStartOffset.y + dy,
            ];

            // 更新所有机器卡片位置
            machine_cards.forEach((m) => {
                if (m.update_pos) m.update_pos();
            });
        }

        function endDrag() {
            if (!isDragging) return;

            isDragging = false;
            main_div.style.cursor = ""; // 恢复默认光标
        }
    }

    main_div.addEventListener("dblclick", (e) => {
        // 获取鼠标相对于main_div的位置
        const rect = main_div.getBoundingClientRect();
        const pos = [
            e.clientX - rect.left, // X坐标（相对于main_div左边）
            e.clientY - rect.top, // Y坐标（相对于main_div顶部）
        ];

        // 通过检查库存过滤
        const names = machine_library
            .filter((d) => {
                const c = ItemCard.get_item(d.name, true);
                if (!c) return false;
                return c.config.num > 0;
            })
            .map((d) => d.name);
        // 需要用户选择一个机器
        choose(names, (name) => {
            const item_card = ItemCard.get_item(name);
            if (!item_card.check_num(1)) {
                div_alert(`物品不足 ${name}`, {
                    duration: 2000,
                    type: "warning",
                });
                return;
            }

            item_card.spend(1);

            const config = {
                id: data.create_machine_id(),
                name,
                num: 1,
                manu_name: "",
                position: pos, // 使用获取到的鼠标位置
            };

            const m = new MachineCard(config);
            data.machines.push(config);
            machine_cards.push(m);
            main_div.append(m.el);
        });
    });

    // debug
    // 时间倍速
    window.dyson.debug_time_rate = 1;

    // 总时间循环, 10ms一次
    setInterval(() => {
        // 精准计算距离上次触发的时间
        let t = Date.now();
        let dt = t - window.dyson.t;
        window.dyson.t = t;

        // 时间倍速
        dt *= window.dyson.debug_time_rate;

        // 更新
        machine_cards.forEach((m) => {
            m.update(dt);
        });
    }, 10);
};

init();
