const BASE_URL = 'http://localhost:3333/api/items'

const pegarValorDaUrl = (name) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

const itemId = pegarValorDaUrl("id")
if (!itemId) {
    console.log('Falta o ID');
}

const listItem = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            console.log("Erro ao buscar item");
            return
        }
        const item = await res.json()
        console.log(item);
        mostrarItem(item)
    } catch (error) {
        console.log(error);
    }
}

const mostrarItem = (item) => {
    const formContainer = document.getElementById('form_container')
    formContainer.innerHTML = `
    <h2 class="for-container__title">Atualizar Atividade</h2>
    <br>
    <form class="item-form" id="item-form" method="post">
        <input type="text" name="name" id="name" class="item-form__input" placeholder="Digite a atividade" value="${item.name}">
        <textarea id="descripiton" class="item-form__textarea" placeholder="Descreva a sua atividade">${item.description || ""}</textarea>
        <button type="submit" class="item-form__button item-form__button--edit">Atualizar</button>
    </form>
    <div id="message" class="message"></div>`

    const form = document.getElementById('item-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        salvarItem(item.id)
    })
}

const salvarItem = async (itemId) => {
    const name = document.getElementById("name").value
    const description = document.getElementById("descripiton").value;

    try {
        const res = await fetch(`${BASE_URL}/${itemId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description })
        })

        if (!res.ok) {
            console.log("Erro ao atualizar item");
            const messageElement = document.getElementById('message');
            messageElement.textContent = "Erro ao atualizar item. Tente novamente.";
            return;
        }

        const updatedItem = await res.json();
        console.log("Item atualizado:", updatedItem);
        const messageElement = document.getElementById('message');
        messageElement.textContent = "Item atualizado com sucesso!";
    } catch (error) {
        console.log("Erro de requisição:", error);
        const messageElement = document.getElementById('message');
        messageElement.textContent = "Ocorreu um erro. Tente novamente mais tarde.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (itemId) {
        listItem(itemId)
    } else {
        console.log("ID da atividade não foi encontrado");
    }
})