<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="shipment">
        <h2 class="jh-entity-heading" data-cy="shipmentDetailsHeading">
          <span v-text="t$('storeApp.shipment.detail.title')"></span> {{ shipment.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('storeApp.shipment.trackingCode')"></span>
          </dt>
          <dd>
            <span>{{ shipment.trackingCode }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.shipment.date')"></span>
          </dt>
          <dd>
            <span v-if="shipment.date">{{ formatDateLong(shipment.date) }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.shipment.details')"></span>
          </dt>
          <dd>
            <span>{{ shipment.details }}</span>
          </dd>
          <dt>
            <span v-text="t$('storeApp.shipment.invoice')"></span>
          </dt>
          <dd>
            <div v-if="shipment.invoice">
              <router-link :to="{ name: 'InvoiceView', params: { invoiceId: shipment.invoice.id } }">{{
                shipment.invoice.code
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="shipment.id" :to="{ name: 'ShipmentEdit', params: { shipmentId: shipment.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./shipment-details.component.ts"></script>
