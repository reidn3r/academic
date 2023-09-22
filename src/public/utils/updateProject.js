
const updateProject = async(data) => {
    await setTimeout(() => {
        window.location.href = `/v1/profile/${data.userDataId}/edit/${data.projectId}`;
    }, 1000);
}