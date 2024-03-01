const INPUT_BOX_El = document.getElementById('inputBox');
const LIST_EL = document.getElementById('list');

const STORE_NAME = 'tasklist';

const taskList = getTasklistFromMemory();


INPUT_BOX_El.addEventListener('keydown', function (event) {
    let space = INPUT_BOX_El.value.trim();
    
    if (event.key === "Enter") {
        if(space==='')
    {
        alert('Space can not be stored');
        return;
    } else{
        taskList.unshift(INPUT_BOX_El.value);
        INPUT_BOX_El.value = '';
        updateDisplay();
    }
    }
})

function updateDisplay() {
    LIST_EL.innerHTML = '';
    //
    taskList.forEach(function (item, index) {
        const EL = createListItem(item, index);
        LIST_EL.append(EL);
    })
    storeInMemory();
}


function createListItem(value, index) {
    //<li> Buy Food <span>&times;</span></li>
    const LI_EL = document.createElement('li');
    // <li> </li>
    const SPAN_EL = document.createElement('span');
    // <span> </span>
    SPAN_EL.innerHTML = '&times;';
    // <span>&times;</span>
    SPAN_EL.style.cursor = 'pointer';
    // <span style="cursor:pointer">&times;</span>
    LI_EL.innerText = value;
    // <li> value </li>
    LI_EL.append(SPAN_EL);
    //<li> Buy Food <span>&times;</span></li>
    SPAN_EL.onclick = removeItem.bind(null,index);
    return LI_EL;
}

function removeItem(index) {
    taskList.splice(index, 1);
    updateDisplay();
}

function storeInMemory() {
    localStorage.setItem(STORE_NAME,taskList);
}

function getTasklistFromMemory() {
        let storeValue = localStorage.getItem(STORE_NAME);
        if(storeValue){
            return storeValue.split(',');
        }else{
            return [];
        }
}

updateDisplay();