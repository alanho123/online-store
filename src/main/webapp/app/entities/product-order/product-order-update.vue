<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.productOrder.home.createOrEditLabel"
          data-cy="ProductOrderCreateUpdateHeading"
          v-text="t$('storeApp.productOrder.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="productOrder.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="productOrder.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.productOrder.placedDate')" for="product-order-placedDate"></label>
            <div class="d-flex">
              <input
                id="product-order-placedDate"
                data-cy="placedDate"
                type="datetime-local"
                class="form-control"
                name="placedDate"
                :class="{ valid: !v$.placedDate.$invalid, invalid: v$.placedDate.$invalid }"
                required
                :value="convertDateTimeFromServer(v$.placedDate.$model)"
                @change="updateInstantField('placedDate', $event)"
              />
            </div>
            <div v-if="v$.placedDate.$anyDirty && v$.placedDate.$invalid">
              <small class="form-text text-danger" v-for="error of v$.placedDate.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.productOrder.status')" for="product-order-status"></label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !v$.status.$invalid, invalid: v$.status.$invalid }"
              v-model="v$.status.$model"
              id="product-order-status"
              data-cy="status"
              required
            >
              <option
                v-for="orderStatus in orderStatusValues"
                :key="orderStatus"
                v-bind:value="orderStatus"
                v-bind:label="t$('storeApp.OrderStatus.' + orderStatus)"
              >
                {{ orderStatus }}
              </option>
            </select>
            <div v-if="v$.status.$anyDirty && v$.status.$invalid">
              <small class="form-text text-danger" v-for="error of v$.status.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.productOrder.code')" for="product-order-code"></label>
            <input
              type="text"
              class="form-control"
              name="code"
              id="product-order-code"
              data-cy="code"
              :class="{ valid: !v$.code.$invalid, invalid: v$.code.$invalid }"
              v-model="v$.code.$model"
              required
            />
            <div v-if="v$.code.$anyDirty && v$.code.$invalid">
              <small class="form-text text-danger" v-for="error of v$.code.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.productOrder.customer')" for="product-order-customer"></label>
            <select
              class="form-control"
              id="product-order-customer"
              data-cy="customer"
              name="customer"
              v-model="productOrder.customer"
              required
            >
              <option v-if="!productOrder.customer" v-bind:value="null" selected></option>
              <option
                v-bind:value="
                  productOrder.customer && customerOption.id === productOrder.customer.id ? productOrder.customer : customerOption
                "
                v-for="customerOption in customers"
                :key="customerOption.id"
              >
                {{ customerOption.email }}
              </option>
            </select>
          </div>
          <div v-if="v$.customer.$anyDirty && v$.customer.$invalid">
            <small class="form-text text-danger" v-for="error of v$.customer.$errors" :key="error.$uid">{{ error.$message }}</small>
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
<script lang="ts" src="./product-order-update.component.ts"></script>
