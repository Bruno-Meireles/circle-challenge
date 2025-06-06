


<!-- 



<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; 
import axios from "axios";
import type { Book } from '../../types/Book';


const route = useRoute();
const router = useRouter(); 
const book = ref<Book | null>(null);

const fetchBook = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/books/${route.params.id}`);
    book.value = response.data.book;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
};

onMounted(fetchBook);
</script>
<template>
  <div v-if="book" class="details">
    <h1>{{ book.title }}</h1>
    <div class="info">
      <p><strong>Autor:</strong> {{ book.author }}</p>
      <p><strong>Isbn:</strong> {{ book.isbn }}</p>
      <p><strong>Preço:</strong> {{ book.price }}</p>
      <p><strong>Estoque:</strong> {{ book.availableStock }}</p>
    </div>
    <div class="buttons">
      <button class="buy">Comprar</button>
      <button @click="router.push('/')">Voltar</button>
    </div>
  </div>
  <p v-else>Carregando detalhes do livro...</p>
</template>

<style scoped>
.details {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.info {
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  margin: 0.4rem 0;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
}

.buy {
  background-color: #27ae60;
}

.buy:hover {
  background-color: #2ecc71;
}

button:hover {
  background-color: #34495e;
}
</style> -->


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import type { Book } from '../../types/Book';

const route = useRoute();
const router = useRouter();
const book = ref<Book | null>(null);
const successMessage = ref('');

const fetchBook = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/books/${route.params.id}`);
    book.value = response.data.book;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
  }
};

const buyBook = async () => {
  try {
    await axios.post(`http://localhost:8000/books/${route.params.id}/purchase`);
    successMessage.value = "Compra realizada com sucesso!";
    book.value!.availableStock--; 
  } catch (error) {
    console.error("Erro na compra:", error);
  }
};

onMounted(fetchBook);
</script>

<template>
  <div v-if="book" class="details">
    <h1>{{ book.title }}</h1>
    <div class="info">
      <p><strong>Autor:</strong> {{ book.author }}</p>
      <p><strong>ISBN:</strong> {{ book.isbn }}</p>
      <p><strong>Preço:</strong> R$ {{ book.price }}</p>
      <p><strong>Estoque:</strong> {{ book.availableStock }}</p>
    </div>
    <div class="buttons">
      <button class="buy" @click="buyBook">Comprar</button>
      <button @click="router.push('/')">Voltar</button>
    </div>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
  <p class="loading" v-else>Carregando detalhes do livro...</p>
</template>

<style scoped>
.details {
  padding: 2rem;
  max-width: 700px;
  margin: 40px auto;
  background-color: #2c2c2e;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  color: #f0f0f0;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 1.5rem;
  color: #f1c40f;
  text-shadow: 1px 1px 4px #000;
}
.loading {
  display: flex;
  justify-content: center;
  text-align: center;
  color: #f1c40f;
  text-shadow: 1px 1px 4px #000;} 
.info {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #1e1e20;
  border-radius: 8px;
  border: 1px solid #444;
}

.info p {
  margin: 0.5rem 0;
  color: #ddd;
}

.info strong {
  color: #ffffff;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy {
  background-color: #27ae60;
}

.buy:hover {
  background-color: #2ecc71;
  transform: scale(1.05);
}

button:not(.buy) {
  background-color: #34495e;
}

button:not(.buy):hover {
  background-color: #3d566e;
  transform: scale(1.05);
}

p[v-cloak],
p[v-if="successMessage"] {
  text-align: center;
  margin-top: 1rem;
  color: #2ecc71;
}
</style>