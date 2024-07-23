import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import InvoiceService from './invoice.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import ProductOrderService from '@/entities/product-order/product-order.service';
import { type IProductOrder } from '@/shared/model/product-order.model';
import { type IInvoice, Invoice } from '@/shared/model/invoice.model';
import { InvoiceStatus } from '@/shared/model/enumerations/invoice-status.model';
import { PaymentMethod } from '@/shared/model/enumerations/payment-method.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'InvoiceUpdate',
  setup() {
    const invoiceService = inject('invoiceService', () => new InvoiceService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const invoice: Ref<IInvoice> = ref(new Invoice());

    const productOrderService = inject('productOrderService', () => new ProductOrderService());

    const productOrders: Ref<IProductOrder[]> = ref([]);
    const invoiceStatusValues: Ref<string[]> = ref(Object.keys(InvoiceStatus));
    const paymentMethodValues: Ref<string[]> = ref(Object.keys(PaymentMethod));
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveInvoice = async invoiceId => {
      try {
        const res = await invoiceService().find(invoiceId);
        res.date = new Date(res.date);
        res.paymentDate = new Date(res.paymentDate);
        invoice.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.invoiceId) {
      retrieveInvoice(route.params.invoiceId);
    }

    const initRelationships = () => {
      productOrderService()
        .retrieve()
        .then(res => {
          productOrders.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      date: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      details: {},
      status: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      paymentMethod: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      paymentDate: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      paymentAmount: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      code: {},
      order: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
    };
    const v$ = useVuelidate(validationRules, invoice as any);
    v$.value.$validate();

    return {
      invoiceService,
      alertService,
      invoice,
      previousState,
      invoiceStatusValues,
      paymentMethodValues,
      isSaving,
      currentLanguage,
      productOrders,
      v$,
      ...useDateFormat({ entityRef: invoice }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.invoice.id) {
        this.invoiceService()
          .update(this.invoice)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('storeApp.invoice.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.invoiceService()
          .create(this.invoice)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('storeApp.invoice.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
