import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import ProductOrderService from './product-order.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CustomerService from '@/entities/customer/customer.service';
import { type ICustomer } from '@/shared/model/customer.model';
import { type IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import { OrderStatus } from '@/shared/model/enumerations/order-status.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProductOrderUpdate',
  setup() {
    const productOrderService = inject('productOrderService', () => new ProductOrderService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const productOrder: Ref<IProductOrder> = ref(new ProductOrder());

    const customerService = inject('customerService', () => new CustomerService());

    const customers: Ref<ICustomer[]> = ref([]);
    const orderStatusValues: Ref<string[]> = ref(Object.keys(OrderStatus));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveProductOrder = async productOrderId => {
      try {
        const res = await productOrderService().find(productOrderId);
        res.placedDate = new Date(res.placedDate);
        productOrder.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.productOrderId) {
      retrieveProductOrder(route.params.productOrderId);
    }

    const initRelationships = () => {
      customerService()
        .retrieve()
        .then(res => {
          customers.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      placedDate: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      status: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      code: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      customer: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
    };
    const v$ = useVuelidate(validationRules, productOrder as any);
    v$.value.$validate();

    return {
      productOrderService,
      alertService,
      productOrder,
      previousState,
      orderStatusValues,
      isSaving,
      currentLanguage,
      customers,
      v$,
      ...useDateFormat({ entityRef: productOrder }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.productOrder.id) {
        this.productOrderService()
          .update(this.productOrder)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('storeApp.productOrder.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.productOrderService()
          .create(this.productOrder)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('storeApp.productOrder.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
