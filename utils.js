const insert_css = (name, css) => {
    // 避免重复插入
    if (window.dyson.css.includes(name)) return;
    else window.dyson.css.push(name);

    // 插入样式表
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
};

const copy_dict = (dict) => {
    return JSON.parse(JSON.stringify(dict));
};

const formatNumber = (num) => {
    if (num < 1e3) return num.toString();
    if (num < 1e6) return (num / 1e3).toFixed(2) + "k";
    if (num < 1e9) return (num / 1e6).toFixed(2) + "M";
    if (num < 1e12) return (num / 1e9).toFixed(2) + "B";
    return num.toExponential(2).replace(/e\+/i, "E"); // 科学计数法
};

const choose = (options, callback) => {
    // 创建遮罩层
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // 创建弹窗容器
    const modal = document.createElement("div");
    modal.style.cssText = `
        background: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 80%;
        min-width: 200px;
        max-height: 80vh; /* 限制最大高度为视口的80% */
        overflow-y: auto; /* 启用垂直滚动 */
        display: flex;
        flex-direction: column;
    `;

    // 创建选项容器（单独的可滚动区域）
    const optionsContainer = document.createElement("div");
    optionsContainer.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 8px 0;
    `;

    // 添加选项按钮
    options.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.style.cssText = `
            display: block;
            width: 100%;
            padding: 10px 16px;
            margin: 8px 0;
            background: #f5f5f5;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s;
            flex-shrink: 0; /* 防止按钮被压缩 */
        `;

        btn.onmouseover = () => (btn.style.background = "#eee");
        btn.onmouseout = () => (btn.style.background = "#f5f5f5");

        btn.onclick = () => {
            document.body.removeChild(overlay);
            callback(option);
        };

        optionsContainer.appendChild(btn);
    });

    // 点击遮罩层关闭
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };

    modal.onclick = (e) => e.stopPropagation();

    modal.appendChild(optionsContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
};

/**
 * 显示一个非阻塞的alert提示框
 * @param {string} message 要显示的消息
 * @param {object} [options] 配置选项
 * @param {number} [options.duration=3000] 显示持续时间(毫秒)
 * @param {string} [options.type='info'] 类型: 'info' | 'success' | 'warning' | 'error'
 */
function div_alert(message, options = {}) {
    const { duration = 3000, type = "info" } = options;

    // 创建容器div
    const alertDiv = document.createElement("div");
    alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: fadeIn 0.3s ease-out;
    display: flex;
    align-items: center;
    max-width: 80%;
    word-break: break-word;
  `;

    // 根据类型设置样式
    const typeStyles = {
        info: {
            background: "#e6f7ff",
            color: "#1890ff",
            border: "1px solid #91d5ff",
        },
        success: {
            background: "#f6ffed",
            color: "#52c41a",
            border: "1px solid #b7eb8f",
        },
        warning: {
            background: "#fffbe6",
            color: "#faad14",
            border: "1px solid #ffe58f",
        },
        error: {
            background: "#fff2f0",
            color: "#ff4d4f",
            border: "1px solid #ffccc7",
        },
    };

    Object.assign(alertDiv.style, typeStyles[type]);

    // 添加消息内容
    alertDiv.textContent = message;

    // 添加到body
    document.body.appendChild(alertDiv);

    // 自动消失
    setTimeout(() => {
        alertDiv.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, duration);

    // 添加CSS动画
    if (!document.getElementById("alert-animations")) {
        const style = document.createElement("style");
        style.id = "alert-animations";
        style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
      }
    `;
        document.head.appendChild(style);
    }
}

/**
 * 显示合成表弹窗
 * @param {string} key 关键词
 */
function showRecipesDialog(key) {
    // 分离输入和输出相关的合成表
    const inputRecipes = manufacture_library.filter((d) =>
        d.input.some((dd) => dd.name === key)
    );
    const outputRecipes = manufacture_library.filter((d) =>
        d.output.some((dd) => dd.name === key)
    );

    // 创建遮罩层
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
        box-sizing: border-box;
        cursor: pointer;
    `;

    // 创建弹窗容器
    const dialog = document.createElement("div");
    dialog.style.cssText = `
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        width: 100%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        padding: 20px;
        cursor: default;
    `;

    // 阻止事件冒泡，防止点击弹窗内容时关闭
    dialog.addEventListener("click", (e) => e.stopPropagation());

    // 添加标题
    const title = document.createElement("h2");
    title.textContent = `"${key}"相关合成表`;
    title.style.cssText = `
        margin: 0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        color: #333;
    `;
    dialog.appendChild(title);

    // 创建输入材料相关的合成表部分
    if (inputRecipes.length > 0) {
        const inputSection = createRecipesSection(
            "作为原料的合成表",
            inputRecipes,
            key
        );
        dialog.appendChild(inputSection);
    }

    // 创建输出产品相关的合成表部分
    if (outputRecipes.length > 0) {
        const outputSection = createRecipesSection(
            "作为产物的合成表",
            outputRecipes,
            key
        );
        dialog.appendChild(outputSection);
    }

    // 如果没有找到任何合成表
    if (inputRecipes.length === 0 && outputRecipes.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.textContent = "未找到相关合成表";
        emptyMsg.style.cssText = `
            text-align: center;
            color: #999;
            padding: 20px;
        `;
        dialog.appendChild(emptyMsg);
    }

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // 点击遮罩层关闭
    overlay.addEventListener("click", () => {
        document.body.removeChild(overlay);
    });
}

/**
 * 创建合成表分区
 * @param {string} title 分区标题
 * @param {Array} recipes 合成表数组
 * @returns {HTMLElement} 分区元素
 */
function createRecipesSection(title, recipes, key) {
    const section = document.createElement("div");
    section.style.marginBottom = "24px";

    // 添加分区标题
    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = title;
    sectionTitle.style.cssText = `
        margin: 0 0 12px 0;
        color: #333;
        font-size: 16px;
        padding-bottom: 8px;
        border-bottom: 1px dashed #eee;
    `;
    section.appendChild(sectionTitle);

    // 创建卡片容器
    const cardsContainer = document.createElement("div");
    cardsContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
    `;
    section.appendChild(cardsContainer);

    // 为每个合成表创建卡片
    recipes.forEach((recipe) => {
        const card = createRecipeCard(recipe, key);
        cardsContainer.appendChild(card);
    });

    return section;
}

/**
 * 创建单个合成表卡片
 * @param {Object} recipe 合成表数据
 * @returns {HTMLElement} 卡片元素
 */
function createRecipeCard(recipe, key) {
    const card = document.createElement("div");
    card.style.cssText = `
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 16px;
        border: 1px solid #f0f0f0;
    `;

    // 添加名称（可点击）
    const name = document.createElement("h3");
    name.textContent = recipe.name;
    name.style.cssText = `
        margin: 0 0 12px 0;
        color: #333;
        font-size: 16px;
    `;
    card.appendChild(name);

    // 添加基本信息
    const infoList = document.createElement("div");
    infoList.style.cssText = `
        margin-bottom: 12px;
    `;

    addInfoItem(infoList, "适用机器", recipe.machine);
    addInfoItem(infoList, "生产周期", `${recipe.period / 1000}秒`);
    addInfoItem(infoList, "用电量", `${recipe.elec}MW`);

    card.appendChild(infoList);

    // 添加输入材料
    const inputTitle = document.createElement("div");
    inputTitle.textContent = "原料:";
    inputTitle.style.cssText = `
        font-weight: bold;
        margin: 8px 0 4px 0;
    `;
    card.appendChild(inputTitle);

    recipe.input.forEach((item) => {
        addItem(card, item, "input", key);
    });

    // 添加输出材料
    const outputTitle = document.createElement("div");
    outputTitle.textContent = "产物:";
    outputTitle.style.cssText = `
        font-weight: bold;
        margin: 8px 0 4px 0;
    `;
    card.appendChild(outputTitle);

    recipe.output.forEach((item) => {
        addItem(card, item, "output", key);
    });

    return card;
}

/**
 * 添加信息项
 */
function addInfoItem(container, label, value) {
    const item = document.createElement("div");
    item.style.cssText = `
        display: flex;
        margin-bottom: 4px;
        font-size: 14px;
    `;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = `${label}: `;
    labelSpan.style.cssText = `
        color: #666;
        margin-right: 8px;
    `;

    const valueSpan = document.createElement("span");
    valueSpan.textContent = value;
    valueSpan.style.cssText = `
        color: #333;
    `;

    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    container.appendChild(item);
}

/**
 * 添加材料项（可点击）
 */
function addItem(container, item, type, key) {
    const itemDiv = document.createElement("div");
    itemDiv.style.cssText = `
        display: flex;
        align-items: center;
        margin: 4px 0;
        padding: 4px 8px;
        background: ${type === "input" ? "#f6ffed" : "#e6f7ff"};
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
    `;

    const numSpan = document.createElement("span");
    numSpan.textContent = `${item.num}单位 `;
    numSpan.style.cssText = `
        font-weight: bold;
        margin-right: 8px;
        color: ${type === "input" ? "#52c41a" : "#1890ff"};
    `;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;
    nameSpan.style.textDecoration = "underline";

    if (key != item.name) {
        // 添加点击事件
        itemDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            showRecipesDialog(item.name);
        });
    }

    itemDiv.appendChild(numSpan);
    itemDiv.appendChild(nameSpan);
    container.appendChild(itemDiv);
}
