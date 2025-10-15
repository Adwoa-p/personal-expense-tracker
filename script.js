//  expense model object
const expense = {
    id: "",
    description: "",
    amount: 0, // will be stored in pesewas but displayed in cedis
    date: new Date(),
    category: ""
};

const category = ["Rent", "Transportation","Church", "Groceries ", "Savings","Internet"];

// random id for each expense created
function generateRandomId(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    const length = characters.length;
    for(let i=0; i<8; i++){
        let key = Math.floor(Math.random() * length);
        let character = characters.charAt(key);
        id+=character;
    }
    return id;
};

// cedi to pesewa, and vice versa convertion
function convertMoney(amount, type){
    amount = Number(amount);
    if (isNaN(amount)){
        return "Invalid currency"
    } else{
        if (type==="CEDIS"){
            const pesewasAmt = amount*100;
        return pesewasAmt;
        }else if(type==="PESEWAS"){
            const cediAmt = amount/100;
            return cediAmt;
        }else{
            return "Invalid currency type"
        }
    }
}


// accept and store expense in local storage
function addExpense(expense){
    localStorage.setItem(expense.id, JSON.stringify(expense));
    return "Expense added successfully";
}

// retrieve expense by id
function getExpense(id){
    let expense = localStorage.getItem(id);
    expense = JSON.parse(expense);
    return expense;
}

// filter expenses by category and amount varieties

function getAllExpensesCategoryEq(filter) {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.category === filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryNotEq(filter) {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.category !== filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryAmtEq(filter) {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.amount !== filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryAmtLt(filter = "") {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.amount < filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryAmtLte(filter = "") {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.category <= filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryAmtGt(filter = "") {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.amount > filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

function getAllExpensesCategoryAmtGte(filter = "") {
    const expenses = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key);
        const expense = JSON.parse(value);
        if (!filter || expense.amount >= filter) {
            expenses.push(expense);
         }
    }
    return expenses;
}

