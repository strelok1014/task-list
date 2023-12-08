// Елементи для проекту
const btnAddTask = document.getElementById('taskAdd');
const taskInput = document.getElementById('taskInput');
const boxTaskList = document.getElementById('tasksList');

// Масив для задач
const arrTaskList = JSON.parse(localStorage.getItem('taskList')) ?? [];



// Вивід задач до списку
function viewTaskList() {

    // Почистимо старі результати
    boxTaskList.innerHTML = '';

    // Перебираємо задачі для виводу
    arrTaskList.forEach(function (task, key) {

        // Вивести задачу в спеціальне поле "boxTaskList"
        boxTaskList.insertAdjacentHTML(
            'afterbegin',
            `<li>
                <span class="edit" data-key="${key}">${task}</span>
                <button class='delete' data-key="${key}">&#10006</button>
            </li>`
        );
    });

    // Зберегти задачу
    localStorage.setItem('taskList', JSON.stringify(arrTaskList));
};

// Задаємо нову задачу
function setTask() {

    // Вибираємо текст з поля, написаний користувачем
    const newTask = taskInput.value;

    // Очищюємо поле задачі
    taskInput.value = '';

    // Добавити в наш масив задачу "newTask"
    if (arrTaskList.includes(newTask) == false && newTask !== '') {

        // Добавляємо задачу до списку
        arrTaskList.push(newTask);

        // Перебираємо задачі для виводу
        viewTaskList();
    }
}

// Видалення задачі
function deleteTask(el) {

    // Витягуємо ключ задачі для видалення
    const key = el.getAttribute('data-key');

    // Видалити задачу з масиву
    arrTaskList.splice(key, 1);

    // Перебираємо задачі для виводу
    viewTaskList();
}

// Редагування задачі
function editTask(el) {

    // Маніпулюємо contenteditor елементами 
    el.setAttribute('contenteditable', 'true');

    // Зберігаємо при втраті фокуса
    el.onblur = () => {

        // Маніпулюємо contenteditor елементами 
        el.setAttribute('contenteditable', 'false');

        // Відбираємо відредагований текст
        const taskText = el.innerHTML;

        // Витягуємо ключ задачі для видалення
        const key = el.getAttribute('data-key');

        // Звертаємось до масива, щоб зберегти текст
        arrTaskList[key] = taskText;

        // Зберегти задачу
        localStorage.setItem('taskList', JSON.stringify(arrTaskList));
    }
}



// Перебираємо завдання для виведення
viewTaskList();

// Натискання на клавішу Enter у полі введення
taskInput.addEventListener('keyup', function (event) {

    // Перевіряємо, чи була натиснута клавіша Enter
    if (event.keyCode === 13) {

        // Викликаємо функцію setTask()
        setTask();
    }
});

// Нажимаємо на кнопку "Додати задачу"
btnAddTask.onclick = setTask;

// Події для списку задач
boxTaskList.onclick = (event) => {

    // Зберігаємо елемент по якому був клік
    const element = event.target;

    // Перехоплюємо елемент кнопки видалення
    if (element.classList.contains('delete')) {

        // Запускаємо функцію видалення
        deleteTask(element);
    }

    // Перехоплюємо елемент редагування
    if (element.classList.contains('edit')) {

        // Запускаємо функцію редагування
        editTask(element);
    }
}