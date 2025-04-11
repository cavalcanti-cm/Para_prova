const BASE_URL = 'http://localhost:3333/api'

const formCad = document.getElementById('item-form')
const message = document.getElementById('message')

//funções utilitarias
const showMessage = (text, cor) => {
    message.textContent = text
    message.style.color = cor
}
//inicio do cadrasto de itens
const handleFormSubmit = async (event) => {
    event.preventDefault()

    const campoName = document.getElementById('name').value
    const campoDescription = document.getElementById('descripiton').value

    const item = {
        name: campoName,
        description: campoDescription,
    }

    await sentItem(item);
    // console.log(JSON.stringify(item)) 
}
const sentItem = async (objItem) => {
    //console.log(objItem);
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                Connection: "close",
            },
            body: JSON.stringify(objItem),
        });
        if (!res.ok) {
            const error = await res.json().catch(() => ({
                message: 'Erro desconhecido'
            }))
            console.log(error);

            if (error.messages && Array.isArray(error.messages)) {
                const errorContainer = document.getElementById('message')
                errorContainer.innerHTML = ''

                error.messages.forEach((err) => {
                    const errorMessage = document.createElement('p')
                    errorMessage.textContent = `Campo: ${err.field} Vazio: ${err.error}`
                    errorMessage.style.color = 'red'
                    errorContainer.appendChild(errorMessage)
                })
            } else {
                showMessage(`Error: ${error.messages} || Erro insesperado`,)
            }
            return
        }
        console.log("item cadrastado");

    } catch (error) {
        console.log(error);

    }

    showMessage('Atividade cadrastada', 'green')
}
//fim do cadrasto de itens

//iniciar a buscar dos itens
const listItems = async () => {
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!res.ok) {
            showMessage('Para começar cadraste um item', 'green')
            return
        }
        const items = await res.json()
        console.log((items));
        await showItems(items)
    } catch (error) {
        console.log('Erro: ', error);

    }
}
const showItems = async (items) => {
    const itemList = document.getElementById('item-list')
    itemList.innerHTML = ''

    const cards = items.map((item) => `
        <article class="item-card">
                    <header class="item-card__header">
                        <h2 class="item-card__title">${item.name}</h2>
                    </header>

                    <section class="item-card__body">
                        <p>${item.description}</p>
                    </section>

                    <footer class="item-card">
                        <button onclick="editItem(${item.id})"" class="item-card__button item-card__button--edit">
                            Editar
                        </button>
                        <button onclick="deleteItem(${item.id})" class="item-card__button item-card__button--delete">
                            Excluir
                        </button>
                    </footer>
                </article>
    `).join("")
    itemList.innerHTML = cards
}
//fim da busca dos itens

//inicio da função de deletar item
const deleteItem = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
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
//fim da função de deletar item

//inicio da função de editar
const editItem = async (id) => {
    const url = `pages/item.html?id=${id}`
    window.location = url

}
//fim da função de editar

//eventos
formCad.addEventListener('submit', handleFormSubmit)
document.addEventListener('DOMContentLoaded', listItems)