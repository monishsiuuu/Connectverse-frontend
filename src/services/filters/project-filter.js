export const userProjectFilter = (userId, project) => {

    let returnValue = {
        isAdmin: false,
        hasRequested: false,
        isDeveloper: false,
    };

    if (project.createdBy?.id == userId)
        returnValue.isAdmin = true;
    const developer = project.developers.filter(developer => developer["id"] == userId);
    if (developer.length > 0)
        returnValue.isDeveloper = true;
    const requestedDevelopers = project.requestedDevelopers.filter(developer => developer["id"] == userId);
    if (requestedDevelopers.length > 0)
        returnValue.hasRequested = true;

    return returnValue;
}
