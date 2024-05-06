export let PROJECTS = [
    {
        "id": "1",
        "tittle": "Project A",
        "description": `
        # Project Management App

        Welcome to the Project Management App, a modern and efficient tool built with Spring Reactive WebFlux for managing your projects effortlessly. This app offers a reactive and non-blocking architecture, ensuring high performance and scalability.
        
        ## Features
        
        - **Reactive Web Interface**: Utilizing Spring WebFlux, the app provides a responsive and interactive user interface.
        - **Project Management**: Create, update, and delete projects with ease.
        - **Task Tracking**: Manage tasks within each project, track progress, and mark tasks as complete.
        - **Reactive Data Access**: Leverage the power of reactive programming with Spring Data MongoDB for efficient data access.
        - **RESTful API**: Expose a RESTful API for seamless integration with other systems or client applications.
        - **Security**: Secure your app with Spring Security to protect your data and resources.
        - **Logging and Monitoring**: Monitor application health and performance with Spring Boot Actuator and Micrometer.
        
        ## Getting Started
        To get started with the Project Management App, follow these steps:
        
        # For Maven
        
        1. **Clone the Repository**: Clone this repository to your local machine using the following command:
        `,
        "icon": "project_icon_url",
        "status": true,
        "tasks": [
            {
                "id": 1,
                "tittle": "Task 1",
                "status": true,
                "description": "This is task 1 description.",
                "assignedTo": 123,
                project: 1,
                comments: [
                    "Hi",
                    "Hello"
                ]
            },
            {
                "id": 2,
                "tittle": "Task 2",
                "status": false,
                "description": "This is task 2 description.",
                "assignedTo": 123,
                project: 1,
                comments: [
                    "Hi",
                    "Hello"
                ]
            }
        ],
        "requestedDevelopers": [
            {
                "id": 12,
                "profilePicUrl": "developer1_profile_pic_url",
                "name": "John Doe",
                "username": "johndoe",
                "enabledM2F": true,
                "email": "john.doe@example.com",
                "githubProfile": "https://github.com/johndoe",
                "linkedInProfile": "https://www.linkedin.com/in/johndoe",
                "authProvider": "email"
            }
        ],
        "developers": [
            {
                "id": 12,
                "profilePicUrl": "developer2_profile_pic_url",
                "name": "Jane Smith",
                "username": "janesmith",
                "enabledM2F": false,
                "email": "jane.smith@example.com",
                "githubProfile": "https://github.com/janesmith",
                "linkedInProfile": "https://www.linkedin.com/in/janesmith",
                "authProvider": "google"
            }
        ],
        "createdBy": {
            "id": 123,
            "profilePicUrl": "admin1_profile_pic_url",
            "name": "Admin User",
            "username": "adminuser",
            "enabledM2F": true,
            "email": "admin@example.com",
            "githubProfile": "",
            "linkedInProfile": "https://github.com",
            "authProvider": "email"
        },
        "createdAt": "2024-02-10T08:00:00Z"
    },
    {
        "id": 3,
        "tittle": "Project C",
        "description": "This is project C description.",
        "icon": "project_icon_url",
        "status": true,
        "tasks": [
            {
                "id": "task1",
                "tittle": "Task 1",
                "description": "This is task 1 description.",
                "comments": "Some comments on task 1",
                "status": "in progress",
                "assignedTo": 123,
                "projectId": "1",
                "deadline": "2024-03-15",
                "updatedAt": "2024-02-18T15:30:00Z",
                "createdAt": "2024-02-15T10:00:00Z",
                comments: [
                    "Hi",
                    "Hello"
                ]
            }
        ],
        "requestedDevelopers": [
            {
                "id": 12,
                "profilePicUrl": "developer1_profile_pic_url",
                "name": "John Doe",
                "username": "johndoe",
                "enabledM2F": true,
                "email": "john.doe@example.com",
                "githubProfile": "https://github.com/johndoe",
                "linkedInProfile": "https://www.linkedin.com/in/johndoe",
                "authProvider": "email"
            }
        ],
        "developers": [
            {
                "id": 12,
                "profilePicUrl": "developer2_profile_pic_url",
                "name": "Jane Smith",
                "username": "janesmith",
                "enabledM2F": false,
                "email": "jane.smith@example.com",
                "githubProfile": "https://github.com/janesmith",
                "linkedInProfile": "https://www.linkedin.com/in/janesmith",
                "authProvider": "google"
            }
        ],
        "createdBy": {
            "id": 2,
            "profilePicUrl": "admin1_profile_pic_url",
            "name": "Admin User",
            "username": "adminuser",
            "enabledM2F": true,
            "email": "admin@example.com",
            "githubProfile": "",
            "linkedInProfile": "https://github.com",
            "authProvider": "email"
        },
    }
];

export const DEVELOPER = {
    "id": 123,
    "profilePicUrl": "https://content.tupaki.com/twdata/2020/0920/news/Rajni-To-Not-Come-Out-For-Shooting-Till-Vaccine-Arrives--1601448273-1492.jpg",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "githubProfile": "https://github.com/johndoe",
    "linkedInProfile": "https://www.linkedin.com/in/johndoe",
    "tasks": [
        {
            "id": 1,
            "tittle": "Task 1",
            "status": true,
            "description": "This is task 1 description.",
            "assignedTo": 123,
            project: 1,
            comments: [
                "Hi",
                "Hello"
            ]
        },
        {
            "id": 2,
            "tittle": "Task 2",
            "status": false,
            "description": "This is task 2 description.",
            "assignedTo": 123,
            project: 1,
            comments: [
                "Hi",
                "Hello"
            ]
        }
    ],
    "projects": [
        {
            "id": 4,
            "tittle": "Project D",
            "description": "This is project D description.",
            "icon": "project_icon_url",
            "status": "ongoing"
        },
        {
            "id": 2,
            "tittle": "Project B",
            "description": "This is project B description.",
            "icon": "project_icon_url",
            "status": "completed"
        }
    ],
    "requestedProjects": [
        {
            "id": 3,
            "tittle": "Project C",
            "description": "This is project C description.",
            "icon": "project_icon_url",
            "status": "pending"
        }
    ],
    "createdProjects": [
        {
            "id": "1",
            "tittle": "Project A",
            "description": `
            # Project Management App
    
            Welcome to the Project Management App, a modern and efficient tool built with Spring Reactive WebFlux for managing your projects effortlessly. This app offers a reactive and non-blocking architecture, ensuring high performance and scalability.
            
            ## Features
            
            - **Reactive Web Interface**: Utilizing Spring WebFlux, the app provides a responsive and interactive user interface.
            - **Project Management**: Create, update, and delete projects with ease.
            - **Task Tracking**: Manage tasks within each project, track progress, and mark tasks as complete.
            - **Reactive Data Access**: Leverage the power of reactive programming with Spring Data MongoDB for efficient data access.
            - **RESTful API**: Expose a RESTful API for seamless integration with other systems or client applications.
            - **Security**: Secure your app with Spring Security to protect your data and resources.
            - **Logging and Monitoring**: Monitor application health and performance with Spring Boot Actuator and Micrometer.
            
            ## Getting Started
            To get started with the Project Management App, follow these steps:
            
            # For Maven
            
            1. **Clone the Repository**: Clone this repository to your local machine using the following command:
            `,
            "icon": "project_icon_url",
            "status": "ongoing"
        }
    ]
}
