export async function getUsers(){
    const res = await fetch("https://randomuser.me/api/?results=10");
    const data = await res.json();
    return data;
}


export async function loginAccount(login){
    try{
        const res = await fetch("http://localhost:8080/api/auth/login",{
            method: "POST",
            body:JSON.stringify(login),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log(error);
        return null; 
    }
}