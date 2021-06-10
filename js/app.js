const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

app.get('/api/users', async (req, res) => {
    const users = await prisma.users.findMany()
    res.status(200).send(users)
});
app.get('/api/companies', async (req, res) => {
    const companies = await prisma.companies.findMany()
    res.status(200).send(companies)
});

app.get('/api/users/:id', async (req, res) => {
    const id  = Number(req.params.id)
    const user = await prisma.users.findUnique({
        where: {
            id: id
        }
    });
    if (user !== null) {
        res.send(user);
    }else{
        res.status(404).send({status:"not found"})
    }
    
});

app.post('/api/users', async (req, res) => {
    const { first_name, salary, image_url } = req.body;
    const user = await prisma.users.create({
        data: {
            first_name,
            salary,
            image_url
        }
    })
    res.send(user);
});

app.put('/api/users/:id', async (req, res) => {
    
    const id  = Number(req.params.id)
    const check_id = await prisma.users.findUnique({
        where: {
            id: id
        }
    });
    if (id !== req.body.id || check_id === null) {
        console.log(22);
    }
    const user = await prisma.users.update({
        where: {
            id: id,
        },
        data: req.body
    });
    console.log(user);
    res.send(user)
});
app.delete('/api/users/:id', async (req, res) => {
    const id  = Number(req.params.id)
    const user = await prisma.users.delete({
        where: {
            id: id
        }
    });
    if (user !== null) {
        res.send(user);
    }else{
        res.status(404).send({status:"not found"});
    }
});
app.get('/api/users/:user_id/companies/', async (req, res) => {
    const id  = Number(req.params.user_id)
    const user = await prisma.users.findUnique({
        where: {
            id: id
        },
        include:{
            Companies:true
        }
    })
    const companies = await prisma.companies.findUnique({
        where: {
            id: user.companies_id
        }
    });
    if (companies !== null) {
        res.send(companies);
    }else{
        res.status(404).send({status:"not found"})
    }
});

app.get('/api/users/:user_id/posts/', async (req, res) => {
    const id  = Number(req.params.user_id)
    const posts = await prisma.post.findMany({
        where: {
            author_id: id
        }
    });
    console.log(posts);
    if (posts !== null) {
        res.send(posts);
    }else{
        res.status(404).send({status:"not found"})
    }
});

app.delete('/api/posts/:post_id', async (req, res) => {
    const id  = Number(req.params.post_id)
    const posts = await prisma.post.delete({
        where: {
            id: id
        }
    });
    console.log(posts)
    if (posts !== null) {
        res.send(posts);
    }else{
        res.status(404).send({status:"not found"});
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})