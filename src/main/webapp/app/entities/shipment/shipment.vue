<template>
  <div>
    <h2 id="page-heading" data-cy="ShipmentHeading">
      <span v-text="t$('storeApp.shipment.home.title')" id="shipment-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('storeApp.shipment.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'ShipmentCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-shipment"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('storeApp.shipment.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && shipments && shipments.length === 0">
      <span v-text="t$('storeApp.shipment.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="shipments && shipments.length > 0">
      <table class="table table-striped" aria-describedby="shipments">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('trackingCode')">
              <span v-text="t$('storeApp.shipment.trackingCode')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'trackingCode'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('date')">
              <span v-text="t$('storeApp.shipment.date')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('details')">
              <span v-text="t$('storeApp.shipment.details')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'details'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('invoice.code')">
              <span v-text="t$('storeApp.shipment.invoice')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoice.code'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shipment in shipments" :key="shipment.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ShipmentView', params: { shipmentId: shipment.id } }">{{ shipment.id }}</router-link>
            </td>
            <td>{{ shipment.trackingCode }}</td>
            <td>{{ formatDateShort(shipment.date) || '' }}</td>
            <td>{{ shipment.details }}</td>
            <td>
              <div v-if="shipment.invoice">
                <router-link :to="{ name: 'InvoiceView', params: { invoiceId: shipment.invoice.id } }">{{
                  shipment.invoice.code
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ShipmentView', params: { shipmentId: shipment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ShipmentEdit', params: { shipmentId: shipment.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(shipment)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="storeApp.shipment.delete.question" data-cy="shipmentDeleteDialogHeading" v-text="t$('entity.delete.title')"></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-shipment-heading" v-text="t$('storeApp.shipment.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-shipment"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeShipment()"
          ></button>
        </div>
      </template>
    </b-modal>
    <div v-show="shipments && shipments.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./shipment.component.ts"></script>
