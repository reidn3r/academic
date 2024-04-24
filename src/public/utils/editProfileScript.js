document.addEventListener("DOMContentLoaded", (e) => {
    let url = "/v1/api/";

    let userUnivSelect = document.querySelector('.user-univ-select');
    let userCourseSelect = document.querySelector('.user-course');

    let userStateSelect = document.querySelector('.user-state');
    let userCitySelect = document.querySelector('.user-city');
    
    // Lista de cursos - renderizados após o carregamento da página
    $.post({
        url: url + 'courses',
        data: { university: userUnivSelect.value }
    })
    .done((res) => {      
        res.courses.forEach((course) => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course.toUpperCase();
            userCourseSelect.appendChild(option);
        });
    })
    .fail(() => {
        alert("Falha na busca de possíveis cursos, tente novamente.");
    })

    // Lista de cidades - renderizados após o carregamento da página
    $.post({
        url: url + 'city',
        data: { state: userStateSelect.value }
    })
    .done((res) => {
        console.log(res);
        res.data.forEach((city) => {
            if(city.city_name != userCitySelect.value){
                const option = document.createElement('option');
                option.value = city.city_name;
                option.textContent = city.city_name;
                userCitySelect.appendChild(option);
            }
        })
    })
    .fail(() => {
        alert("Falha na busca, tente novamente.");
    })

    //Lista de cursos atualizados ao ocorrer alteração no select
    userUnivSelect.addEventListener('change', (e) => {
        const requestData = { university: e.target.value };
    
        fetch(url + 'courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na busca, tente novamente.');
            }
            return response.json();
        })
        .then(data => {
            const courseList = document.getElementById('course-list');
            courseList.innerHTML = ''; // Limpa a lista de cursos
    
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Selecione o Curso";
            courseList.appendChild(defaultOption);
    
            data.courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseList.appendChild(option);
            });
        })
        .catch(error => {
            alert(error.message);
        });
    });
    

    //Lista de cidades atualizadas ao ocorrer alteração no select
    userStateSelect.addEventListener('change', (e) => {
        $.post({
            url: url + 'city',
            data: {stateName: e.target.value}
        })
        .done((res) => {
            $("#user-city-select").find('option').remove();
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Selecione a Cidade";
            userCitySelect.appendChild(option);

            res.Cities.forEach((city) => {
                const option = document.createElement('option');
                option.value = city.city_name;
                option.textContent = city.city_name;
                userCitySelect.appendChild(option);
            })
        })
        .fail(() => {
            alert("Falha na busca, tente novamente.");
        })
    })
})

