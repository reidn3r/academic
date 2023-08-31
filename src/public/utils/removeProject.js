
const deleteProject = async(data) => {
    /* requisição AJAX? */
    console.log(JSON.stringify(data));

    try{
        const response = await fetch('/v1/api/delete/project', {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                // "Content-Type": "text/html; charset=utf-8"
            },
            body: JSON.stringify(data)
        });
        // .then((res) => {
        //     if(res.redirected){
        //         window.location.href = response.url;
        //     }})
        // .catch(function(err) {
        //     console.info(err + " url: " + url);
        // });
        
        const result = await response.json();
        console.log(`Success: ${result}`)
    }
    catch(err){
        console.log(`Error: ${err}`);
    }
}

// module.exports = deleteProject;
