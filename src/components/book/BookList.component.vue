<template>
  <div>
    <b-row>
      <b-col
        md="2"
        offset-md="10">
        <a href="#">Add book</a>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col md="12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Release Date</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="book in books"
                :key="book.bookID">
                <td>{{ book.title }}</td>
                <td>{{ book.releaseDate }}</td>
                <td>{{ book.price }}</td>
                <td>{{ book.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import BookService from '@/api-services/book.service'

export default {
  name: 'BookList',
  data () {
    return {
      books: []
    }
  },
  created () {
    BookService.getAll().then((response) => {
      this.books = response.data
    })
  }
}
</script>
