class Job {
    constructor(id, name, salary, description, skills, area, differentials, isPcd, isActive) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.description = description;
        this.skills = skills;
        this.area = area;
        this.differentials = differentials;
        this.isPcd = isPcd;
        this.isActive = isActive;
    }
}

module.exports = { Job }

// https://firestore.googleapis.com/v1beta1/projects/tech2019-node-95042/databases/(default)/documents/jobs?&key=AIzaSyCCLHG0_BsMFq5WlwQ46ST4vVm6OflXAUg