require("colors");
const inquirer = require("inquirer");

const questions = [
    {
        type: "list",
        name: "opcion",
        message: `¿Qué desea realizar?`.bold,
        choices: [
            {
                value: "1",
                name: `${"1".green}. Buscar ciudad`
            },
            {
                value: "2",
                name: `${"2".green}. Historial`
            },
            {
                value: "0",
                name: `${"0".green}. Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {
    console.clear();
    console.log("===============================".blue);
    console.log("     Seleccione una opción      ".yellow);
    console.log("===============================\n".blue);
    const {opcion} = await inquirer.prompt(questions)
    return opcion;
}

const pause = async () => {
    const enterInput = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar`
        }
    ]

    console.log("\n")
    await inquirer.prompt(enterInput);
}
const readInput = async (message) => {
    console.clear();
    const question =[
        {
            type: "input",
            name: "desc",
            message,
            validate(value){
                if ( value.length === 0){
                    return "Por favor ingrese un valor"
                }else{
                    return true;
                }
            }
        }
    ]
    const {desc} = await inquirer.prompt(question);
    return desc;
}



const confirmAction = async (message) => {
    const confirmation = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(confirmation);
    return ok;
}

const selectPlace = async (arr = []) =>{
    const choices = arr.map( (choice, index) => {
        const idx = `${index +1}.`.green;
        return {
            value: choice.id,
            name: `${idx} ${choice.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })
    const places = [
        {
            type: "list",
            name: "opcion",
            message: `Seleccione el lugar`.bold,
            choices
        }
    ]
    const {opcion} = await inquirer.prompt(places)
    return opcion;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    confirmAction,
    selectPlace
}