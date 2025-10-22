// window.onload = localStorage.clear();

//utility functions
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

// save the expenses in the local storage with this key
const STORAGE_KEY = "expenses"

const category = ["utilities", "transportation","church", "groceries", "savings"];

// dashboard script
const initHomeScript = ()=>{
const dashboard = document.getElementById("dashboard");

function getTotalExpenses(){
    const expenses = getExpenses();
    let sum = expenses.reduce( (acc,expense) => Number(acc) + Number(expense.amount), 0);
    sum = convertMoney(sum, "PESEWAS");
    return sum;
}

function getTotalExpensesByCategory(category){
    const expenses = getExpenses(category);
    let sum = expenses.reduce( (acc,expense) => Number(acc) + Number(expense.amount), 0);
    sum = convertMoney(sum, "PESEWAS");
    return sum;
}

function getAverageExpense(){
    const totalExpenses = getTotalExpenses();
    const expenseLength = getExpenses().length;
    if (expenseLength === 0) {
        return "Can't divide by zero";
    }
    let averageExpense = Math.round(totalExpenses/expenseLength);
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

    // const category = ["utilities", "transportation","church", "groceries", "savings"];
    function updateSummary(){
        const summaryCard = document.createElement("div");
            summaryCard.innerHTML = `
            <p class="font-bold text-2xl ml-5">Summary</p>
            <div class="grid md:grid-cols-3 grid-cols-1 mt-10 place-items-center gap-10 "> 
                <div class=" w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl flex flex-col p-8 gap-10 font-bold"> TOTAL EXPENSES <span class="text-2xl"> ${getTotalExpenses()} </span></div>
                <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl flex flex-col p-8 gap-10 font-bold"> AVERAGE EXPENSES  <span class="text-2xl"> ${getAverageExpense()} </span> </div> 
            </div>
                <p class="mt-10 font-bold text-2xl ml-5">Expenses By Category</p>
            <div class="grid md:grid-cols-3 grid-cols-1 mt-10 gap-10 place-items-center">
                    <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl flex flex-col p-8 gap-10 font-bold">  ${category[0].toUpperCase()} <span class="text-2xl"> ${getTotalExpensesByCategory({category:{ eq: category[0]}})} </span></div>
                    <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl flex flex-col p-8 gap-10 font-bold"> ${category[1].toUpperCase()} <span class="text-2xl"> ${getTotalExpensesByCategory({category:{ eq: category[1]}})} </span> </div>
                    <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl  flex flex-col p-8 gap-10 font-bold"> ${category[2].toUpperCase()} <span class="text-2xl"> ${getTotalExpensesByCategory({category:{ eq: category[2]}})} </span></div>
                    <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl flex flex-col p-8 gap-10 font-bold"> ${category[3].toUpperCase()} <span class="text-2xl"> ${getTotalExpensesByCategory({category:{ eq: category[3]}})} </span> </div>
                    <div class="w-110 h-40 bg-[#FBF9FA] shadow-sm rounded-4xl  flex flex-col p-8 gap-10 font-bold"> ${category[4].toUpperCase()} <span class="text-2xl"> ${getTotalExpensesByCategory({category:{ eq: category[4]}})}</span></div>
            </div>
            
            `;
            dashboard.appendChild(summaryCard);
            return "Summary Updated";
    }

document.addEventListener('DOMContentLoaded', updateSummary);
window.addEventListener('storage', updateSummary);
console.log(getExpenses())
}

const initExpenseScript = () => {

const description = document.getElementById("descriptionTitle");
const amount = document.getElementById("amount");
const categ = document.getElementById("categories");
const date = document.getElementById("date");
const form = document.getElementById("expenseForm");
const tableRow = document.getElementById("t-body");

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
        return `Invalid expense input ${expense.amount}  and ${expense.category}`
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

function updateTable(expense){
        const tableData = document.createElement("tr");
        tableData.innerHTML = `
        <td class="border border-gray-400 md:p-2 p-1">${expense.description}</td>
        <td class="border border-gray-400 md:p-2 p-1">${convertMoney(expense.amount, "PESEWAS")}</td>
        <td class="border border-gray-400 md:p-2 p-1">  <span class="w-full h-full bg-amber-300 rounded-3xl"> ${expense.category} </span> </td>
        <td class="border border-gray-400 md:p-2 p-1">${expense.date}</td>
        `;
        tableRow.appendChild(tableData);
        return "Table updated";
}

function loadExistingExpenses() {
    const expenses = getExpenses() || [];
    expenses.forEach(expense => {
        updateTable(expense);
    });
}

form.addEventListener("submit", function(e){
    e.preventDefault(); 

    const newExpense = {
        description: description.value,
        amount: amount.value,
        date: date.value,
        category: categ.value
    };
    
    const result = addExpense(newExpense);
    const table = updateTable(newExpense);
    console.log(getExpenses());
    form.reset();
})

document.addEventListener('DOMContentLoaded', loadExistingExpenses);

}

const path = window.location.pathname;

if(path === "/expenses.html"){
    initExpenseScript();
}else{
    initHomeScript();
}