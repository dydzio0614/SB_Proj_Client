<template>
  <b-container fluid>
    <div class="form-wrapper">
      <b-form @submit.prevent="createBook">
        <b-form-group
          :label-cols="2"
          breakpoint="md"
          horizontal
          label="Title of the book:"
          for="title">
          <b-col :md="5">
            <b-input
              id="title"
              v-model="formData.title"
              :state="titleState"
              maxlength="50"
              aria-describedby="titleLiveFeedback"
              required />
            <b-form-invalid-feedback id="titleLiveFeedback">
              Enter between 3 and 50 letters
            </b-form-invalid-feedback>
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          breakpoint="md"
          horizontal
          label="Release date:"
          for="releaseDate">
          <b-col :md="5">
            <b-input
              id="releaseDate"
              v-model="formData.releaseDate"
              type="date"
              required />
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          breakpoint="md"
          horizontal
          label="Price:"
          for="price">
          <b-col :md="5">
            <b-input
              id="price"
              v-model="formData.price"
              :state="priceState"
              aria-describedby="priceLiveFeedback"
              required />
            <b-form-invalid-feedback id="priceLiveFeedback">
              Price has to be number greater than 0 (use . as separator)!
            </b-form-invalid-feedback>
          </b-col>
        </b-form-group>

        <b-form-group
          :label-cols="2"
          breakpoint="md"
          horizontal
          label="Amount:"
          for="amount">
          <b-col :md="5">
            <b-input
              id="amount"
              v-model="formData.amount"
              :state="amountState"
              type="number"
              aria-describedby="amountLiveFeedback"
              required />
            <b-form-invalid-feedback id="amountLiveFeedback">
              Amount cannot be less than 1!
            </b-form-invalid-feedback>
          </b-col>
        </b-form-group>
        <br><br>
        <b-col
          :md="5"
          offset="4">
          <b-button
            type="submit"
            variant="info">Save</b-button>
          <b-button
            :to="{ name: 'BookList' }"
            variant="danger">Cancel</b-button>
        </b-col>
      </b-form>
    </div>
    <b-modal
      ref="alertModal"
      :title="alertModalTitle"
      :ok-only="true"
      @ok="onAlertModalOkClick">
      <p class="my-4">{{ alertModalContent }}</p>
    </b-modal>
  </b-container>
</template>
<script>
import BookService from '@/api-services/book.service'

export default {
  computed: {
    titleState () {
      return this.formData.title.length >= 3
    },
    priceState () {
      var correctMatch = this.formData.price.match(/^\d+(\.\d{2})$/)
      if (correctMatch) {
        return true
      } else return false
    },
    amountState () {
      return this.formData.amount > 0
    }
  },
  name: 'BookCreate',
  data () {
    return {
      formData: {
        title: '',
        releaseDate: '',
        price: '',
        amount: ''
      },
      alertModalTitle: '',
      alertModalContent: '',
      isSuccessfully: false
    }
  },
  methods: {
    createBook () {
      BookService.create(this.formData).then(() => {
        this.isSuccessfully = true
        this.alertModalTitle = 'Successfully'
        this.alertModalContent = 'Successfully created Book'
        this.$refs.alertModal.show()

        this.formData = {
          title: '',
          releaseDate: '',
          price: '',
          amount: ''
        }
      }).catch((error) => {
        this.isSuccessfully = false
        this.alertModalTitle = 'Error'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      })
    },
    onAlertModalOkClick () {
      if (this.isSuccessfully) {
        this.$router.push({ name: 'BookList' })
      }
    }
  }
}
</script>
<style>
.form-wrapper {
  margin-top: 20px;
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}
</style>
