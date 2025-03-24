<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Definição do tipo de um livro
interface Book {
  id: number;
  title: string;
  author: string;
}

const books = ref<Book[]>([]);
const router = useRouter();

const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/books"); 
    books.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
};

// Chamar a API quando a página carregar
onMounted(fetchBooks);
</script>

<template>
  <div>
    <h1>Livraria</h1>
    <ul v-if="books.length">
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - {{ book.author }}
        <button @click="router.push(`/book/${book.id}`)">Ver detalhes</button>
      </li>
    </ul>
    <p v-else>Carregando livros...</p>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
