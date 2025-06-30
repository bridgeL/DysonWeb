const probs = [
    {
        name: "常规资源点",
        probs: [
            {
                name: "铁矿脉",
                prob: 0.25,
                num: 10,
            },
            {
                name: "铜矿脉",
                prob: 0.25,
                num: 10,
            },
            {
                name: "石矿脉",
                prob: 0.25,
                num: 10,
            },
            {
                name: "煤矿脉",
                prob: 0.25,
                num: 10,
            },
        ],
    },
    {
        name: "稀有资源点",
        probs: [
            {
                name: "钛矿脉",
                prob: 0.5,
                num: 10,
            },
            {
                name: "硅矿脉",
                prob: 0.5,
                num: 10,
            },
        ],
    },
    {
        name: "珍奇资源点",
        probs: [
            {
                name: "有机晶体矿脉",
                prob: 0.5,
                num: 10,
            },
            {
                name: "光栅石矿脉",
                prob: 0.5,
                num: 10,
            },
        ],
    },
    {
        name: "液体资源点",
        probs: [
            {
                name: "原油资源",
                prob: 0.2,
                num: 10,
            },
            {
                name: "水源",
                prob: 0.8,
                num: 10,
            },
        ],
    },
];

// 检查总和
{
    for (const pps of probs) {
        let prob_sum = 0;
        for (const resource of pps.probs) {
            prob_sum += resource.prob;
        }

        if (prob_sum < 0.9999 || prob_sum > 1.0001)
            console.warn("探索资源的概率总和不为1", pps.name);
    }
}

class MachineCard {
    static css = `
    .machine {
        user-select: none;
        width: 180px;
        background: #fff;
        border-radius: 10px;
        padding: 10px 10px 0; 
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.08);
        position: absolute;
        overflow: hidden;
        font-family: 'Segoe UI', sans-serif;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
    }
    
    /* 白色面板区域 */
    .machine .panel {
        height: 100%;
        padding-bottom: 10px;
    }
    
    /* 按钮区域 */
    .machine .button-group {
        height: 30px;
        background: #495057;
        margin: 0 -10px; /* 抵消父容器的padding */
        display: flex;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow: hidden;
        flex-shrink: 0;
    }
    
    /* 添加长按状态样式 */
    .machine .control-btn.active {
        background: rgba(120, 3, 3, 0.3) !important;
    }

    .machine .control-btn {
        flex: 1;
        background: transparent;
        border: none;
        color: white;
        font-size: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }
    
    .machine .control-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .machine .control-btn:active {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .machine .control-btn:nth-child(2) {
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .machine::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #6c757d, #495057);
    }
    
    .machine .name {
        font-size: 18px;
        font-weight: 600;
        color: #212529;
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .machine .manu {
        font-size: 12px;
        color: #4b6cb7; 
        font-weight: 500;
        margin-bottom: 20px;
        line-height: 1.3;
        overflow: hidden;
       
        text-overflow: ellipsis;
        padding-right: 25px; /* 为数量显示留出空间 */
    }

    /* 数量显示样式 */
    .machine .num {
        position: absolute;
        top: 15px;
        right: 10px;
        background: #18a120;
        color: white;
        font-size: 12px;
        font-weight: bold;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .machine .num.stop{
        background: #a11818;
    }
    
    .machine .progress-container {
        width: 100%;
        height: 6px;
        background: #e9ecef;
        border-radius: 3px;
        overflow: hidden;
        margin-top: 8px;
    }
    
    .machine .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #20c997, #12b886);
        border-radius: 3px;
        width: 0%;
    }

    .machine .progress-bar.stop {
        background: linear-gradient(90deg,rgb(201, 32, 32),rgb(202, 66, 28));
    }
    
    .machine .progress-text {
        font-size: 10px;
        color: #495057;
        text-align: right;
        margin-top: 2px;
    }
`;

    static cards = {};

    static config_example = {
        id: 0,
        name: "制造台Mk2",
        num: 10, // 叠加了10个
        manu_name: "", // 当前正在制造什么
        position: [0, 0], // 在哪个位置
    };

    constructor(config) {
        // 根据config加载已部署的机器
        this.config = config;
        // 根据配置，找到机器详细信息
        this.detail_data = get_machine_detail_data(this.config.name);
        // 默认空配方
        this.manufacture = null;
        // 根据配置，获取合成配方
        if (this.config.manu_name)
            this.manufacture = get_manufacture(
                this.detail_data.sub_type,
                this.config.manu_name
            );

        // 创建对应的el
        this.create_el();

        // 注册样式表
        insert_css("MachineCard", MachineCard.css);

        this.is_stop = true;

        // 直接尝试开机
        this.start();

        // 保存到单例，便于查找
        MachineCard.cards[config.id] = this;
    }

    // 设置合成配方
    set_manu(manu_name) {
        this.config.manu_name = manu_name;
        this.manufacture = null;
        if (manu_name)
            this.manufacture = get_manufacture(
                this.detail_data.sub_type,
                manu_name
            );
        this.update_manu_ui();
    }

    // 当配方 / 供电率 / 机器数量改变时，调用此方法更新ui
    update_manu_ui() {
        // 空配方
        if (!this.manufacture) {
            this.manu_div.innerText = "空配方";
            return;
        }

        const name = this.manufacture.name;
        const elec = this.manufacture.elec;

        const s1 = this.manufacture.input
            .map((m) => `${m.num}${m.name}`)
            .join(", ");
        const s2 = this.manufacture.output
            .map((m) => `${m.num}${m.name}`)
            .join(", ");
        const p = (this.manufacture.period / 1000).toFixed(2);

        // 如果是发电设备
        // FIXME:
        // 为了简化设计，发电设备不会受到缺电影响
        if (elec < 0) {
            const s0 = `[${name}] +${-elec * this.config.num}MW`;
            this.manu_div.innerText = `${s0}\n每${p}s | ${s1} -> ${s2}`;
            return;
        }

        // 如果是我
        if (this.detail_data.sub_type == "我") {
            this.manu_div.innerText = `${name}\n每${p}s | ${s1} -> ${s2}`;
            return;
        }

        // FIXME:
        // 其他情况
        // 制造台 / 冶炼设备 / 采矿设备 都有 不同的加速倍率
        // 同时，他也受到当前的供电率影响（三次衰减）
        {
            const r = window.dyson.power_supply_rate;
            const pp = (p / this.detail_data.speed_up_rate / r / r / r).toFixed(
                2
            );
            const s0 = `-${elec * this.config.num}MW`;
            this.manu_div.innerText = `[${name}] ${s0}\n每${pp}s | ${s1} -> ${s2}`;
        }
    }

    update_pos() {
        let x = this.config.position[0] + window.dyson.data.global_offset[0];
        let y = this.config.position[1] + window.dyson.data.global_offset[1];
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;
    }

    create_el() {
        // 长按状态变量
        this.changing = false;
        this.changingTimeout = null;
        this.longPressTimer = null;
        this.longPressInterval = null;
        this.isLongPressing = false;

        // 创建主元素
        const div = document.createElement("div");
        div.className = "machine";
        this.el = div;

        // 根据global offset和global scale重新计算
        this.update_pos();

        div.addEventListener("dblclick", (e) => {
            e.stopPropagation(); // 阻止事件冒泡
        });

        // 创建白色面板容器
        {
            const panel = document.createElement("div");
            panel.className = "panel";
            div.appendChild(panel);

            // 添加拖动功能
            {
                let isDragging = false;
                let startX, startY, startLeft, startTop;

                // 鼠标按下事件
                div.addEventListener("mousedown", (e) => {
                    e.stopPropagation();

                    // 如果点击的是按钮区域，则不触发拖动
                    if (
                        e.target.closest(".button-group") ||
                        e.target.closest(".control-btn")
                    ) {
                        return;
                    }

                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    startLeft = parseInt(div.style.left) || 0;
                    startTop = parseInt(div.style.top) || 0;

                    // 防止文本选中
                    document.body.style.userSelect = "none";
                });

                // 鼠标移动事件
                document.addEventListener("mousemove", (e) => {
                    if (!isDragging) return;

                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;

                    div.style.left = `${startLeft + dx}px`;
                    div.style.top = `${startTop + dy}px`;
                });

                // 鼠标释放事件
                document.addEventListener("mouseup", () => {
                    if (isDragging) {
                        isDragging = false;
                        document.body.style.userSelect = "";

                        // 更新config中的位置
                        this.config.position = [
                            parseInt(div.style.left) -
                                window.dyson.data.global_offset[0],
                            parseInt(div.style.top) -
                                window.dyson.data.global_offset[1],
                        ];

                        this.update_pos();
                    }
                });
            }

            // 机器名字
            const name_div = document.createElement("div");
            name_div.className = "name";
            name_div.innerText = this.config.name;
            panel.append(name_div);

            // 机器当前制造配方
            this.manu_div = document.createElement("div");
            this.manu_div.className = "manu";
            panel.append(this.manu_div);
            this.update_manu_ui();

            // 叠加数字
            this.num_div = document.createElement("div");
            this.num_div.className = "num stop";
            this.num_div.innerText = this.config.num;
            panel.append(this.num_div);

            // 进度条
            const progress_container = document.createElement("div");
            progress_container.className = "progress-container";
            this.progress_bar = document.createElement("div");
            this.progress_bar.className = "progress-bar";
            progress_container.append(this.progress_bar);
            panel.append(progress_container);

            this.progress_text = document.createElement("div");
            this.progress_text.className = "progress-text";
            panel.append(this.progress_text);

            this.updateProgress();
        }

        // 按钮区域
        {
            const button_group = document.createElement("div");
            button_group.className = "button-group";
            div.appendChild(button_group);

            // 减少按钮
            const decrease_btn = document.createElement("button");
            decrease_btn.className = "control-btn";
            decrease_btn.innerHTML = "−"; // 减号符号
            button_group.appendChild(decrease_btn);

            decrease_btn.addEventListener("mousedown", () =>
                this.handle_button_down(-1)
            );
            decrease_btn.addEventListener("mouseup", () =>
                this.handle_button_up()
            );

            // 修改配方按钮
            const recipe_btn = document.createElement("button");
            recipe_btn.className = "control-btn";
            recipe_btn.innerText = "配方";
            recipe_btn.addEventListener("click", () => this.change_manu());
            button_group.appendChild(recipe_btn);

            // 增加按钮
            const increase_btn = document.createElement("button");
            increase_btn.className = "control-btn";
            increase_btn.innerHTML = "+";
            button_group.appendChild(increase_btn);

            increase_btn.addEventListener("mousedown", () =>
                this.handle_button_down(1)
            );
            increase_btn.addEventListener("mouseup", () =>
                this.handle_button_up()
            );

            // 为所有控制按钮添加状态类
            [decrease_btn, increase_btn].forEach((btn) => {
                btn.addEventListener("mousedown", () =>
                    btn.classList.add("active")
                );
                btn.addEventListener("mouseup", () =>
                    btn.classList.remove("active")
                );
            });
        }
    }

    update(dt) {
        // 如果停机了就不运行
        if (this.is_stop) return;

        // 空配方自动停机
        if (!this.manufacture) {
            this.stop();
            return;
        }

        // FIXME:
        // 制造台 / 冶炼设备 / 采矿设备 都有 不同的加速倍率
        // 同时，他也受到当前的供电率影响（三次衰减）
        // 除了 我 和 发电设备，其他设备都会受到供电率的影响
        if (this.manufacture.elec > 0) {
            const r = window.dyson.power_supply_rate;
            dt = dt * this.detail_data.speed_up_rate * r * r * r;
        }

        // 增加进度条
        this.progress += dt;

        // 生产完成
        if (this.progress >= this.manufacture.period) {
            this.produce();

            // 避免bug
            if (this.config.num < 0) {
                this.stop();
                return;
            }

            // 再次生产
            let success = this.check_input();
            if (success) {
                this.spend_input();
                // 进度条回退
                // FIXME:
                // 这里容易出bug，不知道咋解决
                // this.progress -= this.manu.period;
                this.progress = 0;
            }
        }

        // 更新一下进度条
        this.updateProgress();
    }

    produce() {
        // 生产
        for (let i = 0; i < this.manufacture.output.length; i++) {
            const m = this.manufacture.output[i];

            // 根据机器的总数量倍增
            const n = m.num * this.config.num;

            // FIXME:
            // 生产出产品，修改对应物品的数量
            // ...

            // 特殊
            // 资源点，资源点在这里自动打开，变成各类资源存入仓库
            if (m.name.indexOf("资源点") >= 0) {
                // 查找该资源点的随机表
                const _probs = probs.filter((p) => p.name == m.name)[0].probs;

                // 生成0-1的随机数
                const random = Math.random();

                // 根据概率选择资源
                let cumulativeProb = 0;
                let selectedResource = null;

                for (const resource of _probs) {
                    cumulativeProb += resource.prob;
                    if (random < cumulativeProb) {
                        selectedResource = resource;
                        break;
                    }
                }

                // 确保概率总和为1，否则可能需要处理未选中的情况
                if (!selectedResource) {
                    // 如果由于浮点数精度问题没有选中，选择最后一个
                    selectedResource = _probs[_probs.length - 1];
                }

                // 添加选中的资源
                if (selectedResource) {
                    ItemCard.get_item(selectedResource.name).add(
                        selectedResource.num
                    );
                }
            } else {
                const item_card = ItemCard.get_item(m.name);
                item_card.add(n);
            }
        }
    }

    updateProgress() {
        // 空配方进度为0
        let percentage = 0;

        if (this.manufacture) {
            // 计算比率
            const rate = this.progress / this.manufacture.period;
            percentage = Math.min(100, Math.max(0, rate * 100));
        }

        this.progress_bar.style.width = `${percentage}%`;
        this.progress_text.textContent = `${percentage.toFixed(1)}%`;
    }

    // 停机
    stop() {
        // 减少用电和发电
        // FIXME:
        // 这里可能有bug
        if (!this.is_stop && this.manufacture) {
            const name = this.manufacture.elec < 0 ? "发电" : "用电";
            ItemCard.get_item(name).spend(
                Math.abs(this.manufacture.elec) * this.config.num
            );

            // 重新计算供电率
            ItemCard.update_power_supply();
        }

        this.is_stop = true;
        // 进度条变成红色
        this.progress_bar.classList.add("stop");
        this.num_div.classList.add("stop");
    }

    check_input() {
        // 检查输入物资是否充足
        for (let i = 0; i < this.manufacture.input.length; i++) {
            const m = this.manufacture.input[i];
            const n = m.num * this.config.num;
            const item_card = ItemCard.get_item(m.name);
            let success = item_card.check_num(n);
            // 如果材料不足
            if (!success) {
                div_alert(`物品不足 ${m.name}`, {
                    duration: 2000,
                    type: "warning",
                });

                this.stop();
                // 等待，直到该材料的值发生变化
                item_card.add_waiting_machine(this);
                return false;
            }
        }

        return true;
    }

    spend_input() {
        // 如果可用，就直接扣除，然后开始生产
        // 这里将根据manu生产num倍的物资，消耗num倍的物资

        // 扣除
        for (let i = 0; i < this.manufacture.input.length; i++) {
            const m = this.manufacture.input[i];
            const n = m.num * this.config.num;
            const item_card = ItemCard.get_item(m.name);
            item_card.spend(n);
        }
    }

    // 返还消耗的资源
    refund_input() {
        for (let i = 0; i < this.manufacture.input.length; i++) {
            const m = this.manufacture.input[i];
            const n = m.num * this.config.num;
            const item_card = ItemCard.get_item(m.name);
            item_card.add(n);
        }
    }

    // 启动机器
    start() {
        // 没有配方不启动
        if (!this.manufacture) return;

        // 如果没有数量，那么就停机
        // 不过，这种状况应该是不会在正常情况下发生的，因为分区应该已经删除了这种机器才对
        if (this.config.num == 0) return;

        // 校验一下，相应的资源是否已可用
        let success = this.check_input();
        if (success) {
            // 启动
            this.progress = 0;
            this.progress_bar.classList.remove("stop");
            this.num_div.classList.remove("stop");

            // 消耗输入物资
            this.spend_input();

            // 增加用电或发电
            const name = this.manufacture.elec < 0 ? "发电" : "用电";
            ItemCard.get_item(name).add(
                Math.abs(this.manufacture.elec) * this.config.num
            );

            // 重新计算供电率
            ItemCard.update_power_supply();
            this.update_manu_ui();

            this.is_stop = false;
        }
        return success;
    }

    // 修改数量
    change_count(delta) {
        const name = this.config.name;
        const item_card = ItemCard.get_item(name);

        // 特殊情况
        if (delta < 0 && this.config.num == 0) {
            this.config.num = -1;
            return false;
        }

        // 增加
        if (delta > 0) {
            if (!item_card.check_num(delta)) {
                div_alert(`物品不足 ${name}`, {
                    duration: 2000,
                    type: "warning",
                });
                return false;
            }
            item_card.spend(delta);
            this.config.num += delta;
        }

        // 减少
        else if (delta < 0) {
            if (this.config.num + delta < 0) return false;

            // 返还
            this.config.num += delta;
            item_card.add(-delta);
        }

        // 更新ui
        this.num_div.innerText = this.config.num;
        return true;
    }

    // 修改配方
    change_manu() {
        const manus = enhanced_manufacture_library[this.detail_data.sub_type];
        const manu_names = manus.map((m) => m.name);
        choose([...manu_names, "空配方"], (name) => {
            if (!this.is_stop) {
                this.stop();
                this.refund_input();
            }

            if (name == "空配方") name = "";
            this.set_manu(name);

            // 尝试启动
            this.start();
        });
    }

    // 处理按钮按下
    handle_button_down(delta) {
        if (this.changingTimeout) {
            clearTimeout(this.changingTimeout);
        }

        // 如果它正在工作，那么需要停机，并返回当前消耗的资源，然后重新启动
        if (!this.is_stop) {
            this.stop();
            this.refund_input();
        }

        this.change_count(delta); // 立即执行一次

        this.isLongPressing = true;
        this.longPressTimer = setTimeout(() => {
            this.longPressInterval = setInterval(() => {
                let flag = this.change_count(delta);
                if (!flag) this.handle_button_up();
                // 当通过长按减少到0或者更低时，直接自动释放按钮
                if (this.config.num <= 0 && delta < 0) this.handle_button_up();
            }, 100); // 每100ms执行一次
        }, 500); // 长按500ms后开始连续变化
    }

    // 处理按钮释放
    handle_button_up() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
        if (this.longPressInterval) {
            clearInterval(this.longPressInterval);
        }
        this.isLongPressing = false;

        this.changingTimeout = setTimeout(() => {
            // 如果已经为负数了，说明用户执意要删除它
            if (this.config.num < 0) {
                // 删除
                this.remove();
            }
            // 如果大于0，那么就重新开机
            else if (this.config.num > 0) {
                this.start(); // 重新检查资源
            }
        }, 100); // 结束按下200ms后开始重新开机
    }

    // 删除自身
    remove() {
        this.el.remove();
        window.dyson.data.machines = window.dyson.data.machines.filter(
            (m) => m.id != this.config.id
        );
    }
}
