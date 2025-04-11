document.addEventListener("DOMContentLoaded", () => {
  const url = "https://api.chucknorris.io/jokes/categories";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      return response.json();
    })
    .then((data) => {
      gerarCategoria(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const gerarCategoria = (categorias) => {
  // console.log('Lista de categorias => ', categorias)
  const select = document.getElementById("select");
  categorias.map((categoria) => {
    const option = document.createElement("option");
    option.innerHTML = `${categoria}`;
    option.value = categoria;
    option.id = categoria;
    select.appendChild(option);
  });
};

const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", () => {
  const select = document.getElementById("select").value;
  // console.log(select)
  const url = `https://api.chucknorris.io/jokes/random?category=${select}`;

  fetch(url)
  .then((response)=>{
    if(!response.ok){
        throw new Error("Erro ao gerar piada")
    }
    return response.json()
  })
  .then((data)=>{
    gerarPiada(data)
  })
  .catch((err)=>console.log(err))
});

const gerarPiada = (piada) => {
    const joke = document.getElementById('joke')
    joke.textContent = piada.value
}