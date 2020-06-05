const punkmodule = require('punkmodule')
const inquirer = require('inquirer')
const clc = require('cli-color')


async function _displayPrompt (beverages){
    const displayBeverages = beverages.map(beverage=>{
        return {name: beverage.name, value: beverage.id}
    })

    return inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Select a beverage from the list below:',
        choices: displayBeverages

    }])
}

async function search(query){
    query = query.splice(1)
    if(!(query.length === 0)){
        query = query.join('_')
        const punkApiResponse = await punkmodule.search(query)
         if(!(punkApiResponse.length === 0)){
            const chosenBeverage = await _displayPrompt(punkApiResponse)
            fetch(chosenBeverage.id)
        }
        else{
            console.log(clc.red(`UH NO! the Punk API has no results for ${query}`))
        }
    }
    else{
        console.log(clc.red('Looks like you forgot to add a keyword after search!'))
    }
    
    

}

async function fetch(beverageID){
    if(!(beverageID === undefined)){
        const response = await punkmodule.fetch(beverageID)
        const beverage = response.pop()
        _print(beverage)
    }
    else{
        console.log(clc.red('Looks like you forgot to add a beverage id after fetch!'))
    }
   
}

function _print(beverage){
    console.log(clc.magenta.bold(`\n${beverage.name}`) + ` was first brewed in ${beverage.first_brewed} and it's tagline is ` + clc.cyan.bold(`${beverage.tagline}\n`) + clc.whiteBright.bold("\nDescription: ") + `${beverage.description}\n`)
    console.log(`-See how ${beverage.name} looks like at: ` + clc.blue(`${beverage.image_url}`) + ' or search for it directly later with its Id: ' + clc.yellow(`${beverage.id}\n`))
}

module.exports ={
    search,
    fetch
}