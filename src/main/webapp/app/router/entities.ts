import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Product = () => import('@/entities/product/product.vue');
const ProductUpdate = () => import('@/entities/product/product-update.vue');
const ProductDetails = () => import('@/entities/product/product-details.vue');

const ProductCategory = () => import('@/entities/product-category/product-category.vue');
const ProductCategoryUpdate = () => import('@/entities/product-category/product-category-update.vue');
const ProductCategoryDetails = () => import('@/entities/product-category/product-category-details.vue');

const Customer = () => import('@/entities/customer/customer.vue');
const CustomerUpdate = () => import('@/entities/customer/customer-update.vue');
const CustomerDetails = () => import('@/entities/customer/customer-details.vue');

const ProductOrder = () => import('@/entities/product-order/product-order.vue');
const ProductOrderUpdate = () => import('@/entities/product-order/product-order-update.vue');
const ProductOrderDetails = () => import('@/entities/product-order/product-order-details.vue');

const OrderItem = () => import('@/entities/order-item/order-item.vue');
const OrderItemUpdate = () => import('@/entities/order-item/order-item-update.vue');
const OrderItemDetails = () => import('@/entities/order-item/order-item-details.vue');

const Invoice = () => import('@/entities/invoice/invoice.vue');
const InvoiceUpdate = () => import('@/entities/invoice/invoice-update.vue');
const InvoiceDetails = () => import('@/entities/invoice/invoice-details.vue');

const Shipment = () => import('@/entities/shipment/shipment.vue');
const ShipmentUpdate = () => import('@/entities/shipment/shipment-update.vue');
const ShipmentDetails = () => import('@/entities/shipment/shipment-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-category',
      name: 'ProductCategory',
      component: ProductCategory,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-category/new',
      name: 'ProductCategoryCreate',
      component: ProductCategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-category/:productCategoryId/edit',
      name: 'ProductCategoryEdit',
      component: ProductCategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-category/:productCategoryId/view',
      name: 'ProductCategoryView',
      component: ProductCategoryDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer',
      name: 'Customer',
      component: Customer,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/new',
      name: 'CustomerCreate',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/:customerId/edit',
      name: 'CustomerEdit',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'customer/:customerId/view',
      name: 'CustomerView',
      component: CustomerDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order',
      name: 'ProductOrder',
      component: ProductOrder,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/new',
      name: 'ProductOrderCreate',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/:productOrderId/edit',
      name: 'ProductOrderEdit',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product-order/:productOrderId/view',
      name: 'ProductOrderView',
      component: ProductOrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order-item',
      name: 'OrderItem',
      component: OrderItem,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order-item/new',
      name: 'OrderItemCreate',
      component: OrderItemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order-item/:orderItemId/edit',
      name: 'OrderItemEdit',
      component: OrderItemUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order-item/:orderItemId/view',
      name: 'OrderItemView',
      component: OrderItemDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'invoice',
      name: 'Invoice',
      component: Invoice,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'invoice/new',
      name: 'InvoiceCreate',
      component: InvoiceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'invoice/:invoiceId/edit',
      name: 'InvoiceEdit',
      component: InvoiceUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'invoice/:invoiceId/view',
      name: 'InvoiceView',
      component: InvoiceDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'shipment',
      name: 'Shipment',
      component: Shipment,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'shipment/new',
      name: 'ShipmentCreate',
      component: ShipmentUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'shipment/:shipmentId/edit',
      name: 'ShipmentEdit',
      component: ShipmentUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'shipment/:shipmentId/view',
      name: 'ShipmentView',
      component: ShipmentDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
