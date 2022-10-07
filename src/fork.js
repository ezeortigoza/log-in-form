 process.on('message',info=>{
    let aleatorio = Math.floor(Math.random()*1000);
        process.send(aleatorio);
 })

    
