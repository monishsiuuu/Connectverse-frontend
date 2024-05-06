import { Alert, Divider } from 'antd';


const RemarksBox = ({ validations }) => {
    console.log("validations", validations);
    return (
        <div>
            {
                validations[0]["isDeveloperValid"] ? <Alert type="success" showIcon message="Developer File Valid" /> : <Alert type="error" showIcon message="Problems in Developer File." />
            }
            {
                validations[1]["isProjectValid"] ? <Alert type="success" showIcon message="Project File Valid" /> : <Alert type="error" showIcon message="Problems in Project File." />
            }
            {
                validations[2]["isTaskValid"] ? <Alert type="success" showIcon message="Task File Valid" /> : <Alert type="error" showIcon message="Problems in Task File." />
            }
            <Divider />
            {
                validations[0]["invalidEmails"].length > 0
                &&
                <div>
                    {
                        validations[0]["invalidEmails"].map(error =>
                            <Alert
                                message="Developer File: Invalid Email"
                                description={`Invalid Email = ${error.email} in developer id ${error.id}`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[0]["nullRows"].length > 0
                &&
                <div>
                    {
                        validations[0]["nullRows"].map(error =>
                            <Alert
                                message="Developer File: Null Values"
                                description={`Row with Id = ${error.id} has null Values [${error.email}, ${error.name}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[0]["duplicateEmailEntry"].length > 0
                &&
                <div>
                    {
                        validations[0]["duplicateEmailEntry"].map(error =>
                            <Alert
                                message="Developer File: Duplicate Email"
                                description={`Row with Id = ${error.id} has Duplicate Email [${error.email}, ${error.name}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[0]["duplicateIdEntry"].length > 0
                &&
                <div>
                    {
                        validations[0]["duplicateIdEntry"].map(error =>
                            <Alert
                                message="Developer File: Duplicate ID"
                                description={`Row with Id = ${error.id} has Duplicate ID [${error.email}, ${error.name}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            <Divider />
            {
                validations[1]["nullRows"].length > 0
                &&
                <div>
                    {
                        validations[1]["nullRows"].map(error =>
                            <Alert
                                message="Project File: Null Values"
                                description={`Row with Id = ${error.id} has null Values [${error.tittle}, createdby: ${error.createdby}, developers: ${error.developers}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[1]["duplicateIdEntry"].length > 0
                &&
                <div>
                    {
                        validations[1]["duplicateIdEntry"].map(error =>
                            <Alert
                                message="Project File: Duplicate Project ID"
                                description={`Row with Id = ${error.id} has Duplicate ID [${error.tittle}, createdby: ${error.createdby}, developers: ${error.developers}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            <Divider />
            {
                validations[2]["nullRows"].length > 0
                &&
                <div>
                    {
                        validations[2]["nullRows"].map(error =>
                            <Alert
                                message="Task File: Null Values"
                                description={`Row with Id = ${error.id} has null Values [${error.tittle}, createdby: ${error.createdby}, developers: ${error.developers}]`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[2]["missingProjects"].length > 0
                &&
                <div>
                    {
                        validations[2]["missingProjects"].map(error =>
                            <Alert
                                message="Task File: Missing project ID"
                                description={`Task with [${error.tittle}, assignedTo: ${error.assignedTo}, ${error.description}] as project id ${error.projectId} which is not in file.`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[2]["missingDevelopers"].length > 0
                &&
                <div>
                    {
                        validations[2]["missingDevelopers"].map(error =>
                            <Alert
                                message="Task File: Missing Developer ID"
                                description={`Task with [${error.tittle}, assignedTo: ${error.assignedTo}, ${error.description}] as project id ${error.projectId} which is not in file.`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[2]["inValidAssignment"].length > 0
                &&
                <div>
                    {
                        validations[2]["inValidAssignment"].map(error =>
                            <Alert
                                message="Task File: Assigning Task to Developer out Of Project"
                                description={`Task with [${error.tittle}, assignedTo: ${error.assignedTo}, ${error.description}] as project id ${error.projectId} which is not in file.`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
            {
                validations[2]["invalidDeadlines"].length > 0
                &&
                <div>
                    {
                        validations[2]["invalidDeadlines"].map(error =>
                            <Alert
                                message="Task File: Assign realistic deadline after today."
                                description={`Task with [${error.tittle}, assignedTo: ${error.assignedTo}, deadline: ${error.deadline}] as project id ${error.projectId} which is not in file.`}
                                type="error"
                            />
                        )
                    }
                </div>
            }
        </div>
    );
}

export default RemarksBox;
