
const deleteProject = async(data) => {

    try{
        await fetch('/v1/api/delete/project', {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        })
        .then((resp) => {
            if(resp.status == 200){
                window.location.reload()
            }
            else{
                console.log(resp.message);
                alert("Erro do servidor");
            }
        })
    }
    catch(err){
        alert("Erro do servidor");
    }
}