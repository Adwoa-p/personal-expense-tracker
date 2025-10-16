//  expense model object
const expense = {
    id: "",
    description: "",
    amount: 0, // will be stored in pesewas but displayed in cedis
    date: new Date(),
    category: ""
};

const expenseFilter = {
    category : {
        eq:"",
        notEq:"",
    },
    amount: {
        eq:0,
        lt:0,
        lte:0,
        gt:0,
        gte:0
    }
}

// save the expenses in the local storage with this key
const STORAGE_KEY = "expenses"

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

const allExpenses = [];
// accept and store expense in local storage
function addExpense(expense){
    const oldExpenses = getExpenses();
    oldExpenses.push(expense);
    const newExpenses = oldExpenses;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses))
    return "Expense added successfully";
}

// retrieve expense by id
function getExpense(id){
    let expenses = localStorage.getItem(STORAGE_KEY);
    expenses = JSON.parse(expenses);
    const foundExpense = expenses.find(expense => expense.id === id)
    if (Boolean(foundExpense)){
        return foundExpense ;
    } else{
        return"Expense doesn't exist";
    }
}

// filter expenses by category and amount 
function getExpenses(filter){
    let expenses = localStorage.getItem(STORAGE_KEY);
        expenses = JSON.parse(expenses);

    // return all expenses if no filter is provided
    if (!Boolean(filter)){
        return expenses;
    } else{
        let filteredExpenses = expenses.filter(expense => {
            // filters for category
            if (filter.category) {
                const eq = filter.category.eq; 
                const notEq = filter.category.notEq;
                if ( eq && expense.category === eq) {
                    return eq && expense.category === eq;
                }
                if (notEq && expense.category !== notEq) {
                    return notEq && expense.category !== notEq;
                }
            }
            // filters for amount
            if (filter.amount) {
                const amtEq = filter.amount.eq;
                const lt = filter.amount.lt;
                const lte = filter.amount.lte;
                const gt = filter.amount.gt;
                const gte= filter.amount.gte;
                if (amtEq && expense.amount === amtEq) {
                    return amtEq && expense.amount === amtEq;
                }
                if (lt && expense.amount < lt) {
                    return lt && expense.amount < lt;
                }
                if (lte && expense.amount <= lte) {
                    return lte  && expense.amount <= lte;
                } 
                if (gt && expense.amount > gt) {
                    return gt && expense.amount > gt;
                }
                if (gte && expense.amount >= gte) {
                    return gte && expense.amount >= gte;
                }
            }
        });
        return filteredExpenses;
    }
}