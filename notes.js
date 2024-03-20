import http from "http";

console.log(process.env.NODE_ENV); // undefined for now

// In a browser, the global object is `window`,
// while in Node.js, it is `global`.

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" }); // 200 is the status code
  res.write("Hello world");
  res.end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/* 
    //! Process & Enviroment

    //! process; a global object that provides information about, 
    and control over, the current Node.js process

    ==> process.argv; an array that contains the command line
    arguments passed to the current process

    ==> process.pid; the ID of the current process

    ==> process.env; an object containing the user environment

    ==> process.exit(); terminates the current process with an optional exit code
    
*/
// run `npm init --yes` to jumpstart a package.json file
// run `npm link` to make the CLI app globally available

async function readFile() {
  const data = await fs.readFile("./db.json", "utf-8");
  console.log(data);
}

readFile();
