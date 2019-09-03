
let collectionJobs = [];
const tokenValidator = require('../../config/security/tokenValidator');

module.exports = routes => { 
    //importa o db passando o path do firebaseConfig a partir do routes
    const db = routes.config.firebaseConfig.collection('jobs');

    // routes.get('/jobs/:jobId', (req, res) => {
    //     let job = collectionJobs.find(job => job.id == req.params.jobId)

    //     if(job) {
    //         res.send(job)
    //     } else {
    //         res.status(204).send('Job not found');
    //     }
    // })

    routes.get('/', (req, res) => {
        res.send('Ok');
    });

    routes.get('/jobs/:id', tokenValidator, async (req, res) => {
        try {
            await db.doc(req.params.id).get();

        } catch(error) {
            return res.status(500).send(error);
        }
    })

    routes.put('/jobs/:id', async (req, res) => {
        try {
            await db.doc(req.params.id).update(req.body);
            return res.send(`A vaga ${req.params.id} foi atualizada com sucesso, name alterado para: ${req.body.name.toString()}`);

        } catch(error) {
            return res.status(500).send(error.toString());
        }
    })

    routes.delete('/jobs/:id', async (req, res) => {
        try {
            await db.doc(req.params.id).delete();
            return res.send(`A vaga ${req.params.id} foi excluída com sucesso`);
        } catch (error) {
            return res.status(500).send(error);
        }
    })

    // routes.get('/jobs', (req, res) => {
    //     res.send(collectionJobs);
    // })

    // routes.get('/jobs', async (req, res) => {
    //     try {
    //         //vai esperar a busca terminar para exibir para o usuário
    //         let docs = await db.get();
    //         let jobs = [];  
    //         docs.forEach(doc => {
    //             let data = doc.data();

    //             jobs.push({
    //                 name: data.name
    //             })
    //         })

    //         return res.send(jobs);
            
    //     } catch(error) {
    //         return res.status(500).send(error)
    //     }
    // })

    routes.get('/jobs',  tokenValidator, async (req, res) => {
        try {
            //vai esperar a busca terminar para exibir para o usuário
            let docs = await db.get();
            let jobs = [];  
            docs.forEach(doc => {
                jobs.push(extractJob(doc));
            })
            return res.send(jobs);
            
        } catch(error) {
            return res.status(500).send(error)
        }
    })

    // routes.post('/jobs', (req, res) => {
    //     try {
    //         let newJob = new jobModel.Job(
    //             req.body.id,
    //             req.body.name,
    //             req.body.salary,
    //             req.body.description,
    //             req.body.skills,
    //             req.body.area,
    //             req.body.differentials,
    //             req.body.isPcd,
    //             req.body.isActive,
    //         );

    //         collectionJobs.push(newJob);
    //         res.send(newJob);
    //     } catch(error) {
    //         { res.status(500).send(error) }
    //     }
    // })

    routes.post('/jobs', async (req, res) => {
        try {
            await db.doc().set(req.body);
            const result = await db.add(req.body);

            // return res.send('Job added successfuly');
            return res.send(result.id);

        } catch(error) {
            return res.status(500).send(error);
        }
    })

    extractJob = job => {
        // dá um parse e mostra os dados da forma correta
        let v = job.data();

        return {
            id: job.id,
            name: v.name,
            salary: v.salary,
            description: v.description,
            skills: v .skills,
            area: v.area,
            differentials: v.area,
            isPcd: v.isPcd,
            isActive: v.isActive,
        }
    }
}