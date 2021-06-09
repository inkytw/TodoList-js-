// 全域變數，動態指定check box id
let checkBoxIdNum = 8;

// 點擊按鈕新增
document.querySelector('.btn-new').addEventListener('click', () => {
    addTodos();
});

// 按 Enter 新增
document.querySelector('.todo__input').addEventListener('keypress', (e) => {
    // Enter 對應鍵盤代碼：13
    if (e.which === 13) {
      addTodos();
    }
});

const addTodos = () => {
    const inputValue = document.querySelector('.todo__input').value;
    
   // 檢查輸入欄位是否為空值
    if (inputValue.trim().length === 0){
        alert("未輸入任何值");
        return;
    }
    // 新增 todo
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo');
    let checkboxId = 'c'+ checkBoxIdNum;
    newTodo.innerHTML = `
        <input class="todo__check" id="${checkboxId}" type="checkbox">
        <label for="${checkboxId}"><img src="images/check.jpg"></label>
        <label>${escapeHtml(inputValue)}</label>
        <div class="btn-delete"><img class="btn-delete-img" src="images/cancel.jpg"></div>
    `;
    checkBoxIdNum++;
    document.querySelector('.todo__list').appendChild(newTodo);
    // 新增成功後，清空輸入欄
    document.querySelector('.todo__input').value = '';
    // 更新底部統計值
    checkCalculator();
}

// 處理html編碼
const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}

// 點擊事件
document.querySelector('.todo__list').addEventListener('click', (event) => {
    const target = event.target;
    // 按刪除鍵刪除 todo
    if (target.classList.contains('btn-delete')) {
        target.parentNode.remove();
        // 更新底部統計值
        checkCalculator();
    }
    // 勾選切換 check / uncheck todo
    else if(target.classList.contains('todo__check')) {
        target.parentNode.classList.toggle('todo__done');
        // 更新底部統計值
        checkCalculator();
    }
    /*-- tab 切換 --*/
    else if (target.id === "all") {
        const to_do = document.querySelectorAll('.todo')
        const todo_done = document.querySelectorAll('.todo__done')
        to_do.forEach(
            (item) => {
                item.style.display = "flex";
            }
        );
        todo_done.forEach(
            (item) => {
                item.style.display = "flex";
            }
        );
        tabSelected(target);
        tabUnSelected(document.getElementById("unfinished"));
        tabUnSelected(document.getElementById("done"));

    }else if(target.id === "unfinished"){
        const to_do = document.querySelectorAll('.todo')
        const todo_done = document.querySelectorAll('.todo__done')
        to_do.forEach(
            (item) => {
                item.style.display = "flex";
            }
        );
        todo_done.forEach(
            (item) => {
                item.style.display = "none";
            }
        );
        tabSelected(target);
        tabUnSelected(document.getElementById("all"));
        tabUnSelected(document.getElementById("done"));

    }else if(target.id === "done"){
        const to_do = document.querySelectorAll('.todo')
        const todo_done = document.querySelectorAll('.todo__done')
        to_do.forEach(
            (item) => {
                item.style.display = "none";
            }
        );
        todo_done.forEach(
            (item) => {
                item.style.display = "flex";
            }
        );
        tabSelected(target);
        tabUnSelected(document.getElementById("unfinished"));
        tabUnSelected(document.getElementById("all"));

    }
});

// 刪除全部
document.querySelector('.clean__all').addEventListener('click', (event) => {
    const todo_done = document.querySelectorAll('.todo__done')
    todo_done.forEach(
        (item) => {
            item.remove();
        }
    );
    checkCalculator();
});

// tab切換變色
const tabSelected = (target) => {
    target.style.borderBottomColor = "#333333";
    target.style.color = "#333333"
}

const tabUnSelected = (target) => {
    target.style.borderBottomColor = "#EFEFEF";
    target.style.color = "#9F9A91"
}

// 更新底部統計值
const checkCalculator = () => {
    var x = document.getElementById("todo__num");
    x.innerHTML = document.querySelectorAll('.todo').length - document.querySelectorAll('.todo__done').length;
}

