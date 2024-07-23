<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="invoice">
        <h2 class="jh-entity-heading" data-cy="invoiceDetailsHeading">
          <span v-text="t$('storeApp.invoice.detail.title')"></span> {{ invoice.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('storeApp.invoice.date')"></span>
          </dt>
          <dd>
            <span v-if="invoice.date">{{ formatDateLong(invoice.date) }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.details')"></span>
          </dt>
          <dd>
            <span>{{ invoice.details }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.status')"></span>
          </dt>
          <dd>
            <span v-text="t$('storeApp.InvoiceStatus.' + invoice.status)"></span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.paymentMethod')"></span>
          </dt>
          <dd>
            <span v-text="t$('storeApp.PaymentMethod.' + invoice.paymentMethod)"></span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.paymentDate')"></span>
          </dt>
          <dd>
            <span v-if="invoice.paymentDate">{{ formatDateLong(invoice.paymentDate) }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.paymentAmount')"></span>
          </dt>
          <dd>
            <span>{{ invoice.paymentAmount }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.code')"></span>
          </dt>
          <dd>
            <span>{{ invoice.code }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.invoice.order')"></span>
          </dt>
          <dd>
            <div v-if="invoice.order">
              <router-link :to="{ name: 'ProductOrderView', params: { productOrderId: invoice.order.id } }">{{
                invoice.order.code
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="invoice.id" :to="{ name: 'InvoiceEdit', params: { invoiceId: invoice.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./invoice-details.component.ts"></script>
