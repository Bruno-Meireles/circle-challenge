<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; 
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: number;
  price: number;
  availableStock: number;
}
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
  <div v-if="book">
    <h1>{{ book.title }}</h1>
    <p><strong>Autor:</strong> {{ book.author }}</p>
    <p><strong>Isbn:</strong> {{ book.isbn }}</p>
    <p><strong>Preço:</strong> {{ book.price }}</p>
    <p><strong>Estoque:</strong> {{ book.availableStock }}</p>
    <button>Comprar</button>
    <button @click="router.push('/')">Voltar</button>
  </div>
  <p v-else>Carregando detalhes do livro...</p>
</template>

<style scoped>
p {
  margin: 5px 0;
}
</style>
