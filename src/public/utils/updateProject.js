
const updateProject = async(data) => {
    window.location.href = `/v1/profile/${data.userDataId}/edit/${data.projectId}`;
}