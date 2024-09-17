const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample in-memory database
let projects = [
    { project_id: 1,project_name: 'Project A',assigned_to:'muthuraj',role:'junior_developer',task:'buliding_a_landing_page_for_search_application',description: 'Description of Project A',start_time:23-7-2024,end_time:27-7-2024, status: 'complete',  },
    { project_id: 2,project_name: 'Project B',assigned_to:'joseph',role:'senior_developer',task:'building_a_quotes_generator_using_react',description: 'Description of Project B',start_time:1-8-2024,end_time:5-8-2024, status: 'closetodue',  },
    { project_id: 3,project_name: 'Project C',assigned_to:'rathna',role:'senior_developer',task:'creating_landing_page_for_task_board',description: 'Description of Project C',start_time:16-9-2024,end_time:22-9-2024, status: 'inprogress',  },
    { project_id: 4,project_name: 'Project D',assigned_to:'prisilla',role:'junior_developer',task:'implementation_of_creating_form',description: 'Description of Project D',start_time:12-1-2025,end_time:20-1-2025, status: 'active',  },
    { project_id: 5,project_name: 'Project E',assigned_to:'jerusha',role:'senior_developer',task:'buliding_a_landing_page_for_search_application,login,logout',description: 'Description of Project E',start_time:15-12-2024,end_time:24-12-2024, status: 'new',  },
];

// GET all projects
app.get('/projects', (req, res) => {
    res.json(projects);
});

// GET a single project by ID
app.get('/projects/:id', (req, res) => {
    const project = projects.find(p =>p.project_id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');
    res.json(project);
});

// POST a new project
app.post('/projects', (req, res) => {
    const {project_name,assigned_to,role,task,description,start_time,end_time,status} = req.body;
    const newProject = {
        project_id: projects.length + 1,
        project_name,
        assigned_to,
        role,
        task,
        description,
        start_time,
        end_time,
        status     
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// PUT (update) an existing project
app.put('/projects/:id', (req, res) => {
    const project = projects.find(p => p.project_id === parseInt(req.params.id));
    if (!project) return res.status(404).send('Project not found');

    const {project_name,assigned_to,role,task,description,start_time,end_time,status } = req.body;
    project.project_name = project_name || project.project_name;
    project.assigned_to = assigned_to || project.assigned_to;
    project.role = role || project.role;
    project.task=task||project.task;
    project.description = description || project.description;
    project.start_time = start_time || project.start_time;
    project.end_time = end_time || project.end_time;
    project.status = status || project.status;

    res.json(project);
});

// DELETE a project
app.delete('/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.project_id === parseInt(req.params.id));
    if (projectIndex === -1) return res.status(404).send('Project not found');

    projects.splice(projectIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
