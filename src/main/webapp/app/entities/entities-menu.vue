<template>
  <div>
    <b-dropdown-item to="/product">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.product')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/product-category">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.productCategory')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/customer">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.customer')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/product-order">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.productOrder')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/order-item">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.orderItem')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/invoice">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.invoice')"></span>
    </b-dropdown-item>
    <b-dropdown-item to="/shipment">
      <font-awesome-icon icon="asterisk" />
      <span v-text="t$('global.menu.entities.shipment')"></span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
