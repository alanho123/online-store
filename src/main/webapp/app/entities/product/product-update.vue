<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="storeApp.product.home.createOrEditLabel"
          data-cy="ProductCreateUpdateHeading"
          v-text="t$('storeApp.product.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="product.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.name')" for="product-name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.description')" for="product-description"></label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.price')" for="product-price"></label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="product-price"
              data-cy="price"
              :class="{ valid: !v$.price.$invalid, invalid: v$.price.$invalid }"
              v-model.number="v$.price.$model"
              required
            />
            <div v-if="v$.price.$anyDirty && v$.price.$invalid">
              <small class="form-text text-danger" v-for="error of v$.price.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.productSize')" for="product-productSize"></label>
            <select
              class="form-control"
              name="productSize"
              :class="{ valid: !v$.productSize.$invalid, invalid: v$.productSize.$invalid }"
              v-model="v$.productSize.$model"
              id="product-productSize"
              data-cy="productSize"
              required
            >
              <option v-for="size in sizeValues" :key="size" v-bind:value="size" v-bind:label="t$('storeApp.Size.' + size)">
                {{ size }}
              </option>
            </select>
            <div v-if="v$.productSize.$anyDirty && v$.productSize.$invalid">
              <small class="form-text text-danger" v-for="error of v$.productSize.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.image')" for="product-image"></label>
            <div>
              <img
                v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image"
                style="max-height: 100px"
                v-if="product.image"
                alt="product"
              />
              <div v-if="product.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ product.imageContentType }}, {{ byteSize(product.image) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('image', 'imageContentType', 'file_image')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <label for="file_image" v-text="t$('entity.action.addimage')" class="btn btn-primary pull-right"></label>
              <input
                type="file"
                ref="file_image"
                id="file_image"
                style="display: none"
                data-cy="image"
                v-on:change="setFileData($event, product, 'image', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="product-image"
              data-cy="image"
              :class="{ valid: !v$.image.$invalid, invalid: v$.image.$invalid }"
              v-model="v$.image.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="product-imageContentType"
              v-model="product.imageContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('storeApp.product.productCategory')" for="product-productCategory"></label>
            <select
              class="form-control"
              id="product-productCategory"
              data-cy="productCategory"
              name="productCategory"
              v-model="product.productCategory"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  product.productCategory && productCategoryOption.id === product.productCategory.id
                    ? product.productCategory
                    : productCategoryOption
                "
                v-for="productCategoryOption in productCategories"
                :key="productCategoryOption.id"
              >
                {{ productCategoryOption.name }}
              </option>
            </select>
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
<script lang="ts" src="./product-update.component.ts"></script>
