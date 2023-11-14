
const express = require("express")
const exp = require("node:constants")
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require("socket.io")

const PORT = 3000
const app = express()
const server = createServer(app)
const io = new Server(server)


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("chat message", (msg) => {
        console.log("message: " + msg)
        io.emit("chat message", msg)
    })
})


const getBuildPath = (pathArray) => {

    return pathArray.reduce((accumulatorPath, curentValue) => {
        return join(accumulatorPath, curentValue)
    }, __dirname)
}

const rootPath = getBuildPath(["..","index.html"])
app.get("/", (req, res) => {
    res.sendFile(rootPath)
})

const reactClientPath = getBuildPath(["..","react-client", "dist"])
const svelteClientPath = getBuildPath(["..","svelte-client",".svelte-kit", "output", "client"])
const vueClientPath = getBuildPath(["..","vue-client","dist"])
const htmlClient = getBuildPath(["..","html-client","index.html"])
const notFoundFile = getBuildPath(["..", "404.html"])

app.use(express.static(reactClientPath))
app.use(express.static(svelteClientPath))
app.use(express.static(vueClientPath))


app.use("/react-client", express.static(reactClientPath))
app.use("/svelte-client", express.static(svelteClientPath))
app.use("/vue-client", express.static(vueClientPath))
app.use("/html-client", express.static(htmlClient))

app.get("*", (req, res) => {
    res.sendFile(notFoundFile)
})


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

