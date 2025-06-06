<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import type { Book } from '../../types/Book';


const books = ref<Book[]>([]);
const router = useRouter();

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/books");
    books.value = response.data.books;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
};

onMounted(fetchBooks);
</script>

<template>
  <div>
    <h1 class="title">Livraria</h1>
    <div>
    <ul v-if="books.length" class="book-list">
  <li v-for="book in books" :key="book.id" class="book-item">
    <div class="book-info">
      <p><strong>{{ book.title }}</strong> - {{ book.author }}</p>
      <p><small>ISBN:</small> {{ book.isbn }}</p>
      <p><small>Preço:</small> R$ {{ book.price }} | <small>Estoque:</small> {{ book.availableStock }}</p>
    </div>
    <button @click="router.push(`/book/${book.id}`)">Ver detalhes</button>
  </li>
</ul>
    <p v-else>Carregando livros...</p>
    </div>
 
  </div>
</template>

<style scoped>
body {
  background-color: #1c1c1c;
  color: #f0f0f0;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  margin-top: 40px;
  font-size: 36px;
  color: #f1c40f;
  text-shadow: 1px 1px 4px #000;
}

.book-list {
  list-style: none;
  padding: 0;
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-item {
  border: 1px solid #333;
  padding: 20px;
  border-radius: 10px;
  background-color: #2c2c2e;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.05);
}

.book-info p {
  margin: 6px 0;
  color: #ddd;
}

.book-info p strong {
  font-size: 18px;
  color: #ffffff;
}

button {
  margin-top: 10px;
  background-color: #2980b9;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #3498db;
  transform: scale(1.03);
}
</style>