document.addEventListener("DOMContentLoaded", (e) => {
    let url = "/v1/api/";

    let userUnivSelect = document.querySelector('.user-univ-select');
    let userCourseSelect = document.querySelector('.user-course');

    let userStateSelect = document.querySelector('.user-state');
    let userCitySelect = document.querySelector('.user-city');

    
    // Lista de cursos - renderizados após o carregamento da página
    $.post({
        url: url + 'courses',
        data: {universityName: userUnivSelect.value }
    })
    .done((res) => {                
        res.courses.forEach((course) => {
            if(course.course_name!= userCourseSelect.value.toUpperCase()){
                const option = document.createElement('option');
                option.value = course.course_name;
                option.textContent = course.course_name.toUpperCase();
                userCourseSelect.appendChild(option);
            }
        });
    })
    .fail(() => {
        alert("Falha na busca, tente novamente.");
    })

    // Lista de cidades - renderizados após o carregamento da página
    $.post({
        url: url + 'city',
        data: {stateName: userStateSelect.value}
    })
    .done((res) => {
        res.Cities.forEach((city) => {
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
        $.post({
            url: url + 'courses',
            data: {universityName: e.target.value }
        })
        .done((res) => {
            $("#course-list").find('option').remove();
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Selecione o Curso";
            userCourseSelect.appendChild(option);
            
            res.courses.forEach((course) => {
                const option = document.createElement('option');
                option.value = course.course_name;
                option.textContent = course.course_name;
                userCourseSelect.appendChild(option);
            });
        })
        .fail(() => {
            alert("Falha na busca, tente novamente.");
        })
    })

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

