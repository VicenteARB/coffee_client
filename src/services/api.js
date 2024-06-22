
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