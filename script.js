const butaoEnviar = document.getElementById('btn-enviar')
const content = document.getElementById('content')


const page = 1

const base_URL = 'http://localhost:3333/api/tarefas'

const FormSubmit = async (event) => {
    event.preventDefault()

    const campoName = document.getElementById('name').value
    const campoDescription = document.getElementById('descripiton').value

    const item = {
        name: campoName,
        description: campoDescription,
    }
    await Item(item);
}


const tarefas = (value) => {

    const resultado = fetch(`http://localhost:3333/api/tarefas`) //para começar requições
        .then((res) => res.json()) //para tranfosmar também é considerado como uma Promisse
        .then((data) => {
            console.log(data)
            return data
        })}

    
    butaoEnviar.addEventListener('click', async (event) => {
        event.preventDefault();
        const resultado = await fetchApi(tarefa.value) //puxando valores do imput 
    
    
        content.innerHTML = `item-form__input: ${JSON.stringify(resultado.item)}`
        return resultado
})


document.getElementById("conteiner").addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("mensagem-sucesso").style.display = "block"
})

const deletarItem = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`${base_URL}/items/${id}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            showMessage('Item excluido com sucesso', 'green')
            console.log("Erro ao excluir");
            return
        } else {
            showMessage('Item não excluido', 'red')
            return
        }
    } catch (error) {
        console.log(error);

    }
}

const iditar = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`${base_URL}/items/${id}`, {
            method: 'put'
        })
        if (res.ok) {
            showMessage('Item atualzado com sucesso', 'green')
            console.log("Erro ao excluir");
            return
        } else {
            showMessage('Item não editado', 'red')
            return
        }
    } catch (error) {
        console.log(error);

    }
}

const editar = async (id) => {
    const url = `pages/js/index.html?id=${id}`
    window.location = 'http://localhost:3333/api/tarefas'

}




