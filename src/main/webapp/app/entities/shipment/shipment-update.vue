<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.shipment.home.createOrEditLabel"
          data-cy="ShipmentCreateUpdateHeading"
          v-text="t$('storeApp.shipment.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="shipment.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="shipment.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.shipment.trackingCode')" for="shipment-trackingCode"></label>
            <input
              type="text"
              class="form-control"
              name="trackingCode"
              id="shipment-trackingCode"
              data-cy="trackingCode"
              :class="{ valid: !v$.trackingCode.$invalid, invalid: v$.trackingCode.$invalid }"
              v-model="v$.trackingCode.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.shipment.date')" for="shipment-date"></label>
            <div class="d-flex">
              <input
                id="shipment-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !v$.date.$invalid, invalid: v$.date.$invalid }"
                required
                :value="convertDateTimeFromServer(v$.date.$model)"
                @change="updateInstantField('date', $event)"
              />
            </div>
            <div v-if="v$.date.$anyDirty && v$.date.$invalid">
              <small class="form-text text-danger" v-for="error of v$.date.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.shipment.details')" for="shipment-details"></label>
            <input
              type="text"
              class="form-control"
              name="details"
              id="shipment-details"
              data-cy="details"
              :class="{ valid: !v$.details.$invalid, invalid: v$.details.$invalid }"
              v-model="v$.details.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.shipment.invoice')" for="shipment-invoice"></label>
            <select class="form-control" id="shipment-invoice" data-cy="invoice" name="invoice" v-model="shipment.invoice" required>
              <option v-if="!shipment.invoice" v-bind:value="null" selected></option>
              <option
                v-bind:value="shipment.invoice && invoiceOption.id === shipment.invoice.id ? shipment.invoice : invoiceOption"
                v-for="invoiceOption in invoices"
                :key="invoiceOption.id"
              >
                {{ invoiceOption.code }}
              </option>
            </select>
          </div>
          <div v-if="v$.invoice.$anyDirty && v$.invoice.$invalid">
            <small class="form-text text-danger" v-for="error of v$.invoice.$errors" :key="error.$uid">{{ error.$message }}</small>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./shipment-update.component.ts"></script>
