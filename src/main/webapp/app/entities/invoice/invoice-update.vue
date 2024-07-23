<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.invoice.home.createOrEditLabel"
          data-cy="InvoiceCreateUpdateHeading"
          v-text="t$('storeApp.invoice.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="invoice.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="invoice.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.date')" for="invoice-date"></label>
            <div class="d-flex">
              <input
                id="invoice-date"
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
            <label class="form-control-label" v-text="t$('storeApp.invoice.details')" for="invoice-details"></label>
            <input
              type="text"
              class="form-control"
              name="details"
              id="invoice-details"
              data-cy="details"
              :class="{ valid: !v$.details.$invalid, invalid: v$.details.$invalid }"
              v-model="v$.details.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.status')" for="invoice-status"></label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !v$.status.$invalid, invalid: v$.status.$invalid }"
              v-model="v$.status.$model"
              id="invoice-status"
              data-cy="status"
              required
            >
              <option
                v-for="invoiceStatus in invoiceStatusValues"
                :key="invoiceStatus"
                v-bind:value="invoiceStatus"
                v-bind:label="t$('storeApp.InvoiceStatus.' + invoiceStatus)"
              >
                {{ invoiceStatus }}
              </option>
            </select>
            <div v-if="v$.status.$anyDirty && v$.status.$invalid">
              <small class="form-text text-danger" v-for="error of v$.status.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.paymentMethod')" for="invoice-paymentMethod"></label>
            <select
              class="form-control"
              name="paymentMethod"
              :class="{ valid: !v$.paymentMethod.$invalid, invalid: v$.paymentMethod.$invalid }"
              v-model="v$.paymentMethod.$model"
              id="invoice-paymentMethod"
              data-cy="paymentMethod"
              required
            >
              <option
                v-for="paymentMethod in paymentMethodValues"
                :key="paymentMethod"
                v-bind:value="paymentMethod"
                v-bind:label="t$('storeApp.PaymentMethod.' + paymentMethod)"
              >
                {{ paymentMethod }}
              </option>
            </select>
            <div v-if="v$.paymentMethod.$anyDirty && v$.paymentMethod.$invalid">
              <small class="form-text text-danger" v-for="error of v$.paymentMethod.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.paymentDate')" for="invoice-paymentDate"></label>
            <div class="d-flex">
              <input
                id="invoice-paymentDate"
                data-cy="paymentDate"
                type="datetime-local"
                class="form-control"
                name="paymentDate"
                :class="{ valid: !v$.paymentDate.$invalid, invalid: v$.paymentDate.$invalid }"
                required
                :value="convertDateTimeFromServer(v$.paymentDate.$model)"
                @change="updateInstantField('paymentDate', $event)"
              />
            </div>
            <div v-if="v$.paymentDate.$anyDirty && v$.paymentDate.$invalid">
              <small class="form-text text-danger" v-for="error of v$.paymentDate.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.paymentAmount')" for="invoice-paymentAmount"></label>
            <input
              type="number"
              class="form-control"
              name="paymentAmount"
              id="invoice-paymentAmount"
              data-cy="paymentAmount"
              :class="{ valid: !v$.paymentAmount.$invalid, invalid: v$.paymentAmount.$invalid }"
              v-model.number="v$.paymentAmount.$model"
              required
            />
            <div v-if="v$.paymentAmount.$anyDirty && v$.paymentAmount.$invalid">
              <small class="form-text text-danger" v-for="error of v$.paymentAmount.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.code')" for="invoice-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="invoice-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.invoice.order')" for="invoice-order"></label>
            <select class="form-control" id="invoice-order" data-cy="order" name="order" v-model="invoice.order" required>
              <option v-if="!invoice.order" v-bind:value="null" selected></option>
              <option
                v-bind:value="invoice.order && productOrderOption.id === invoice.order.id ? invoice.order : productOrderOption"
                v-for="productOrderOption in productOrders"
                :key="productOrderOption.id"
              >
                {{ productOrderOption.code }}
              </option>
            </select>
          </div>
          <div v-if="v$.order.$anyDirty && v$.order.$invalid">
            <small class="form-text text-danger" v-for="error of v$.order.$errors" :key="error.$uid">{{ error.$message }}</small>
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
<script lang="ts" src="./invoice-update.component.ts"></script>
