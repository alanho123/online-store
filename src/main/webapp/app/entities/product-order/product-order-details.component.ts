import { defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ProductOrderService from './product-order.service';
import { useDateFormat } from '@/shared/composables';
import { type IProductOrder } from '@/shared/model/product-order.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProductOrderDetails',
  setup() {
    const dateFormat = useDateFormat();
    const productOrderService = inject('productOrderService', () => new ProductOrderService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const productOrder: Ref<IProductOrder> = ref({});

    const retrieveProductOrder = async productOrderId => {
      try {
        const res = await productOrderService().find(productOrderId);
        productOrder.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.productOrderId) {
      retrieveProductOrder(route.params.productOrderId);
    }

    return {
      ...dateFormat,
      alertService,
      productOrder,

      previousState,
      t$: useI18n().t,
    };
  },
});
