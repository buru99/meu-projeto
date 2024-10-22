const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById("checkout-btn");
const cartCounter = document.getElementById("cart-count");
const cartObs = document.getElementById("obs");
const nameInput = document.getElementById("name");
const nameWarn = document.getElementById("name-warn");
const bairroInput = document.getElementById("bairro");
const bairroWarn = document.getElementById("bairro-warn");
const ruaInput = document.getElementById("rua");
const ruaWarn = document.getElementById("rua-warn");
const hnumberInput = document.getElementById("housenumber");
const hnumberWarn = document.getElementById("hnumber-warn");
const complementoInput = document.getElementById("complemento");
const foneInput = document.getElementById("fone");
const foneWarn = document.getElementById("fone-warn");
const loginWarn = document.getElementById('alertBox');

let cart = [];



//abre o modal
cartBtn.addEventListener('click', function () {
    cartModal.classList.toggle('hidden');
    cartModal.classList.add('flex')
});

//fecha o modal clicando fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.classList.add('hidden')
    }
});

//fecha o modal clicando no botao fechar
closeModalBtn.addEventListener('click', function () {
    cartModal.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Função para adicionar itens ao carrinho
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1; // Aumenta a quantidade se o item já existir no carrinho
        } else {
            // Adiciona um novo item ao carrinho
            cart.push({
                name,
                price: parseFloat(price),
                quantity: 1,
            });
        }

        updateCartModal(); // Atualiza o modal do carrinho com os itens
    }

    // Adiciona o evento de clique em cada botão de "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name'); // Obtém o nome do produto
            const price = this.getAttribute('data-price'); // Obtém o preço do produto

            // Exibe o Toastify imediatamente após o clique
            Toastify({
                text: "Item adicionado ao carrinho",
                duration: 3000,
                close: true,
                gravity: "top", // `top` ou `bottom`
                position: "right", // `left`, `center` ou `right`
                stopOnFocus: true,
                style: {
                    background: "#22c55e", // Cor verde para sucesso
                },
                onClick: function () { } // Ação ao clicar no alerta (opcional)
            }).showToast();

            addToCart(name, price); // Adiciona o item ao carrinho
        });
    });
});


// Atualizar o modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = ""; // Limpa o modal antes de adicionar itens

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col');

        cartItemElement.innerHTML = `
            <div class="items-center">
                <div>
                    <p class="font-bold">${item.name} - R$${item.price.toFixed(2)}</p>
                </div>
                
                <div class="counter flex gap-4 items-center">
                    <button id="counter-btn" class="remove-from-cart-btn font-bold" data-name="${item.name}">
                        -
                    </button>
                    <p class="flex">${item.quantity}</p>
                    <button id="counter-btn" class="add-to-cart-btn font-bold" data-name="${item.name}">
                        +
                    </button>
                </div>
            </div>
            `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    // Atualiza o total e a quantidade de itens
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price: parseFloat(price),
            quantity: 1,
        });
    }
    updateCartModal();
}

// Adiciona o evento de clique em cada botão de "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');

        // Exibe o alerta Toastify
        Toastify({
            text: "Item adicionado ao carrinho",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true,
            style: {
                background: "#22c55e",
            }
        });
    });
});

// Função para remover ou adicionar item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }

    if (event.target.classList.contains("add-to-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        addToCart(name);
    }
});

// Função para remover item do carrinho
function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

// Funções dos inputs de dados do usuário
nameInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        nameInput.classList.remove("border-red-500");
        nameWarn.classList.add("hidden");
        document.getElementById("name").focus();
    }
});

foneInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== "") {
        foneInput.classList.remove("border-red-500")
        foneWarn.classList.add("hidden");
    }
})

bairroInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        bairroWarn.classList.add("hidden");
    }
});

ruaInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        ruaWarn.classList.add("hidden");
    }
});

hnumberInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        hnumberWarn.classList.add("hidden");
    }
});

// Função formas de pagamento
const radios = document.querySelectorAll('input[name="pay"]');

radios.forEach((radio) => {
    radio.addEventListener('change', function () {
        addInput(this.value);
    });
});

// Função para adicionar input com base na opção selecionada
function addInput(valor) {
    const inputContainer = document.getElementById('InputTroco');
    inputContainer.innerHTML = '';

    if (valor === 'Dinheiro') {
        inputContainer.innerHTML = `
            <label for="inputTroco">Troco Para:</label><br>
            <input class="border-2 p-1 rounded my-1" type="number" min="0" id="valor-troco">
        `;
    }
}

// Funções do botão finalizar pedido
checkoutBtn.addEventListener("click", function () {
    const isOpen = checkopen();
    if (!isOpen) {
        Toastify({
            text: "Estabelecimento fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
            onClick: function () { }
        }).showToast();
        return;
    }

    if (cart.length === 0) {
        Toastify({
            text: "Seu carrinho está vazio!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
            onClick: function () { }
        }).showToast();
        return;
    }

    if (nameInput.value === "") {
        nameWarn.classList.remove("hidden");
        nameInput.classList.add("border-red-500");
        return;
    }

    if(foneInput.value === "") {
        foneWarn.classList.remove("hidden");
        foneInput.classList.add("border-Red-500")
        return;
    }

    if (ruaInput.value === "") {
        ruaWarn.classList.remove("hidden");
        return;
    }

    if (bairroInput.value === "") {
        bairroWarn.classList.remove("hidden");
        return;
    }

    if (hnumberInput.value === "") {
        hnumberWarn.classList.remove("hidden");
        return;
    }

    

    let payformOption = document.querySelector('input[name="pay"]:checked');
    if (!payformOption) {
        Toastify({
            text: "Selecione a forma de pagamento",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
            onClick: function () { }
        }).showToast();
        return;
    }

    let deliveryOption = document.querySelector('input[name="delivery"]:checked');
    if (!deliveryOption) {
        Toastify({
            text: "Selecione a forma de entrega",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
            onClick: function () { }
        }).showToast();
        return;
    }

    function checkopen() {
        const data = new Date();
        const hora = data.getHours();
        return hora >= 0 && hora < 24;
        //estabelecimento aberto
    }

    let taxaEntrega = deliveryOption && deliveryOption.value === "Delivery" ? 5 : 0;
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + taxaEntrega;

    // Enviar para o WhatsApp
    const cartItems = cart.map((item) => {
        const totItem = (item.quantity * item.price).toFixed(2);
        return (
            `*${item.name} - QTD: ${item.quantity} - Preço: R$${totItem}*\n`
        )
    }).join("\n")
    const payform = document.querySelector('input[name="pay"]:checked').value;
    const data = new Date();
    const hora = String(data.getHours()).padStart(2, '0');;
    const minute = String(data.getMinutes()).padStart(2, '0');
    const retirada = document.querySelector('input[name="delivery"]:checked').value;
    const inputTroco = document.getElementById('valor-troco');
    const trocoValor = inputTroco && inputTroco.value ? parseFloat(inputTroco.value) : 0;
    const trocoTexto = trocoValor > 0 ? `*Troco para:* R$ ${trocoValor.toFixed(2)}` :"";
    const separator = "-".repeat(40);
    const message = `*Resumo do Pedido:*\n*Horário:* ${hora}:${minute}\n*Estimativa:* 60 - 80 minutos\n\n${cartItems}\n\n*Observação:* ${cartObs.value}\n*${separator}*\n*Tipo de entrega:* ${retirada}\n*Nome:* ${nameInput.value}\n*Rua:* ${ruaInput.value} - ${hnumberInput.value}\n*Bairro:* ${bairroInput.value}\n*Complemento:* ${complementoInput.value}\n*${separator}*\n*Pagamento:* ${payform}\n${trocoTexto}\n*TOTAL:* *R$${total.toFixed(2)}*\n*${separator}*\n*Continue Pedindo:*\nhttps://cardapiodigital-hazel.vercel.app/`
    const phone = "5588997349933"

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")

    cart = [];
    updateCartModal()

})

//verificar hora e manipular horario 
function checkopen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 0 && hora < 24;
    //estabelecimento aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkopen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}






