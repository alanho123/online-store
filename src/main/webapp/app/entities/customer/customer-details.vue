<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="customer">
        <h2 class="jh-entity-heading" data-cy="customerDetailsHeading">
          <span v-text="t$('storeApp.customer.detail.title')"></span> {{ customer.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('storeApp.customer.firstName')"></span>
          </dt>
          <dd>
            <span>{{ customer.firstName }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.lastName')"></span>
          </dt>
          <dd>
            <span>{{ customer.lastName }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.gender')"></span>
          </dt>
          <dd>
            <span v-text="t$('storeApp.Gender.' + customer.gender)"></span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.email')"></span>
          </dt>
          <dd>
            <span>{{ customer.email }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.phone')"></span>
          </dt>
          <dd>
            <span>{{ customer.phone }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.addressLine1')"></span>
          </dt>
          <dd>
            <span>{{ customer.addressLine1 }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.addressLine2')"></span>
          </dt>
          <dd>
            <span>{{ customer.addressLine2 }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.city')"></span>
          </dt>
          <dd>
            <span>{{ customer.city }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.country')"></span>
          </dt>
          <dd>
            <span>{{ customer.country }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.customer.user')"></span>
          </dt>
          <dd>
            {{ customer.user ? customer.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="customer.id" :to="{ name: 'CustomerEdit', params: { customerId: customer.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./customer-details.component.ts"></script>
