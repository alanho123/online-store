import { computed, defineComponent, inject, ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import ShipmentService from './shipment.service';
import { useValidation, useDateFormat } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import InvoiceService from '@/entities/invoice/invoice.service';
import { type IInvoice } from '@/shared/model/invoice.model';
import { type IShipment, Shipment } from '@/shared/model/shipment.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ShipmentUpdate',
  setup() {
    const shipmentService = inject('shipmentService', () => new ShipmentService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const shipment: Ref<IShipment> = ref(new Shipment());

    const invoiceService = inject('invoiceService', () => new InvoiceService());

    const invoices: Ref<IInvoice[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveShipment = async shipmentId => {
      try {
        const res = await shipmentService().find(shipmentId);
        res.date = new Date(res.date);
        shipment.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.shipmentId) {
      retrieveShipment(route.params.shipmentId);
    }

    const initRelationships = () => {
      invoiceService()
        .retrieve()
        .then(res => {
          invoices.value = res.data;
        });
    };

    initRelationships();

    const { t: t$ } = useI18n();
    const validations = useValidation();
    const validationRules = {
      trackingCode: {},
      date: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
      details: {},
      invoice: {
        required: validations.required(t$('entity.validation.required').toString()),
      },
    };
    const v$ = useVuelidate(validationRules, shipment as any);
    v$.value.$validate();

    return {
      shipmentService,
      alertService,
      shipment,
      previousState,
      isSaving,
      currentLanguage,
      invoices,
      v$,
      ...useDateFormat({ entityRef: shipment }),
      t$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.shipment.id) {
        this.shipmentService()
          .update(this.shipment)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(this.t$('storeApp.shipment.updated', { param: param.id }));
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.shipmentService()
          .create(this.shipment)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(this.t$('storeApp.shipment.created', { param: param.id }).toString());
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
