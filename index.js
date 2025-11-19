const uniqueUsersSet = new Set();
const userDataMap = new Map();

function* genId() {
    let i = 1;
    while (true) {
        const formattedId = `U${String(i).padStart(6, '0')}`;
        yield formattedId; 
        i++;
    }
}

const idGen = genId();

function newUser(dataEntry) {
    if(uniqueUsersSet.has(dataEntry)) {
        console.log(`User already exists: ${dataEntry}`);
        return; 
    }

    const newid = idGen.next().value; 
    uniqueUsersSet.add(dataEntry);  
    
    userDataMap.set(dataEntry, { 
        id: newid, 
        score: 0,
        level: 1
    });
    
    console.log(`New user added: ${dataEntry} with ID: ${newid}`);
}

function processData(dataEntry, newData){
    if(!uniqueUsersSet.has(dataEntry)) { 
        console.log(`User does not exist. Please add the user first.`);
        return; 
    }
    
    const currentData = userDataMap.get(dataEntry); 
    
    currentData.score += newData.score || 0;
    currentData.level = Math.max(currentData.level, newData.level || currentData.level);
    
    userDataMap.set(dataEntry, currentData); 
    console.log(`Data updated for user: ${dataEntry}`);
}

function displayAllData() {
    if (userDataMap.size === 0) {
        console.log(`No users in the system.`);
        return;
    }
    
    for (const [email, userRecord] of userDataMap.entries()) {
        console.log(`ID: ${userRecord.id} | Email: ${email} | Score: ${userRecord.score} | Level: ${userRecord.level}`);
    }
}

newUser("Rakesh");
newUser("Kumar");
newUser("Rakesh"); 

processData("Rakesh", {score: 10, level: 2});
processData("Kumar", {score: 5, level: 1});
processData("Rakesh", {score: 5, level: 3}); 

displayAllData();