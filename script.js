//  expense model object
const expense = {
    id: generateRandomId(),
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

console.log(convertMoney("Hi", "CEDIS"));