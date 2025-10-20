window.onload = localStorage.clear();

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

const category = ["Utilities", "Transportation","Church", "Food", "Savings"];

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
    const oldExpenses = getExpenses() || allExpenses;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(oldExpenses));
    if (Number(expense.amount) && category.includes(expense.category)){
        const expenseWithId = {id: generateRandomId(), ...expense}
        oldExpenses.push(expenseWithId);
        const newExpenses = oldExpenses;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses))
        return "Expense added successfully";
    }else{
        return "Invalid expense input"
    }
}

// retrieve expense by id
function getExpense(id){
    let expenses = localStorage.getItem(STORAGE_KEY);
    expenses = JSON.parse(expenses);
    const foundExpense = (expenses || []).find(expense => expense.id === id)
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
        let filteredExpenses = (expenses || []).filter(expense => {
            // filters for category
            if (filter.category) {
                const eq = filter.category.eq; 
                const notEq = filter.category.notEq;
                if ( eq && expense.category === eq) {
                    return expense.category === eq;
                }
                if (notEq && expense.category !== notEq) {
                    return expense.category !== notEq;
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
                    return expense.amount === amtEq;
                }
                if (lt && expense.amount < lt) {
                    return expense.amount < lt;
                }
                if (lte && expense.amount <= lte) {
                    return expense.amount <= lte;
                } 
                if (gt && expense.amount > gt) {
                    return expense.amount > gt;
                }
                if (gte && expense.amount >= gte) {
                    return expense.amount >= gte;
                }
            }
        });
        return filteredExpenses;
    }
}

function getTotalExpenses(){
    const expenses = getExpenses();
    let sum = expenses.reduce( (acc,expense) => acc + expense.amount, 0);
    sum = convertMoney(sum, "PESEWAS");
    return sum;
}

function getTotalExpensesByCategory(category){
    const expenses = getExpenses(category);
    let sum = expenses.reduce( (acc,expense) => acc + expense.amount, 0);
    sum = convertMoney(sum, "PESEWAS");
    return sum;
}

function getAverageExpense(){
    const totalExpenses = getTotalExpenses();
    const expenseLength = getExpenses().length;
    if (expenseLength === 0) {
        return "Can't divide by zero";
    }
    let averageExpense = totalExpenses/expenseLength;
    return averageExpense;
}

function getExpenseSummary(){
    const totalExpenses = getTotalExpenses();
    const averageExpense = getAverageExpense();
    const totalExpensesByCategory = category.map(
        (cat) =>  `- ${cat}: ${getTotalExpensesByCategory({category:{eq:cat}})}`
        
    );
    return `Total spent: ${totalExpenses}  
            Average expense: ${averageExpense}  
            By category:  
            ${totalExpensesByCategory}`
}

function  updateExpense(id, updatedFields){ // updatedFields obj containing fields for new values, al attrs or not
    const oldExpense = getExpense(id); // returns the object
    const expenses = getExpenses();
    const index = (expenses || []).findIndex(expense => expense.id === id);
    // clone and merge expenses
    if (Number(updatedFields.amount) && category.includes(updatedFields.category)){
        const newExpense = {
            ...oldExpense,
            ...updatedFields
        }
        expenses[index] = newExpense;
    }else{
        console.log("Invalid update fields")
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return `Expense updated successfully`;
}

const expense1 = {
    amount: 3000, // will be stored in pesewas but displayed in cedis
    category: "Food"
};

const expense2 = {
    description: "Something",
    amount: "5400", 
    date: new Date(),
    category: category[2]
}

// let updatedExpense = updateExpense("A1B2C2D4", expense1);
// console.log(updatedExpense);
// console.log(addExpense(expense2));
console.log(addExpense(expense2));
console.log(getExpenses());
// console.log(getExpense("A1B2C2D4"));
