<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.orderItem.home.createOrEditLabel"
          data-cy="OrderItemCreateUpdateHeading"
          v-text="t$('storeApp.orderItem.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="orderItem.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="orderItem.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.orderItem.quantity')" for="order-item-quantity"></label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="order-item-quantity"
              data-cy="quantity"
              :class="{ valid: !v$.quantity.$invalid, invalid: v$.quantity.$invalid }"
              v-model.number="v$.quantity.$model"
              required
            />
            <div v-if="v$.quantity.$anyDirty && v$.quantity.$invalid">
              <small class="form-text text-danger" v-for="error of v$.quantity.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.orderItem.totalPrice')" for="order-item-totalPrice"></label>
            <input
              type="number"
              class="form-control"
              name="totalPrice"
              id="order-item-totalPrice"
              data-cy="totalPrice"
              :class="{ valid: !v$.totalPrice.$invalid, invalid: v$.totalPrice.$invalid }"
              v-model.number="v$.totalPrice.$model"
              required
            />
            <div v-if="v$.totalPrice.$anyDirty && v$.totalPrice.$invalid">
              <small class="form-text text-danger" v-for="error of v$.totalPrice.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.orderItem.status')" for="order-item-status"></label>
            <select
              class="form-control"
              name="status"
              :class="{ valid: !v$.status.$invalid, invalid: v$.status.$invalid }"
              v-model="v$.status.$model"
              id="order-item-status"
              data-cy="status"
              required
            >
              <option
                v-for="orderItemStatus in orderItemStatusValues"
                :key="orderItemStatus"
                v-bind:value="orderItemStatus"
                v-bind:label="t$('storeApp.OrderItemStatus.' + orderItemStatus)"
              >
                {{ orderItemStatus }}
              </option>
            </select>
            <div v-if="v$.status.$anyDirty && v$.status.$invalid">
              <small class="form-text text-danger" v-for="error of v$.status.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.orderItem.product')" for="order-item-product"></label>
            <select class="form-control" id="order-item-product" data-cy="product" name="product" v-model="orderItem.product" required>
              <option v-if="!orderItem.product" v-bind:value="null" selected></option>
              <option
                v-bind:value="orderItem.product && productOption.id === orderItem.product.id ? orderItem.product : productOption"
                v-for="productOption in products"
                :key="productOption.id"
              >
                {{ productOption.name }}
              </option>
            </select>
          </div>
          <div v-if="v$.product.$anyDirty && v$.product.$invalid">
            <small class="form-text text-danger" v-for="error of v$.product.$errors" :key="error.$uid">{{ error.$message }}</small>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.orderItem.order')" for="order-item-order"></label>
            <select class="form-control" id="order-item-order" data-cy="order" name="order" v-model="orderItem.order" required>
              <option v-if="!orderItem.order" v-bind:value="null" selected></option>
              <option
                v-bind:value="orderItem.order && productOrderOption.id === orderItem.order.id ? orderItem.order : productOrderOption"
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
<script lang="ts" src="./order-item-update.component.ts"></script>
