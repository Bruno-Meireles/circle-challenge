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
.home {
  padding: 2rem;
  text-align: left;
}
.title {
  text-align: center;
  margin-top: 40px;
  font-size: 32px;
  color: #333;
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
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.book-item:hover {
  transform: scale(1.01);
}

.book-info p {
  margin: 6px 0;
  color: #444;
}

.book-info p strong {
  font-size: 18px;
  color: #222;
}

button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
